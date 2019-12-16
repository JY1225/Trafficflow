package com.sweii.server;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.mina.common.IdleStatus;
import org.apache.mina.common.IoFilter;
import org.apache.mina.common.IoHandlerAdapter;
import org.apache.mina.common.IoSession;
import org.apache.mina.common.TransportType;
import org.apache.mina.filter.codec.ProtocolCodecFilter;
import org.apache.mina.transport.socket.nio.SocketSessionConfig;

import com.sweii.bean.TicketBean;
import com.sweii.dao.BaseServiceImpl;
import com.sweii.dao.IBaseDao;
import com.sweii.vo.Equipment;
import com.sweii.vo.RecordLog;
import com.sweii.vo.Ticket;
import com.sweii.vo.User;

public class ServerHandler extends IoHandlerAdapter {
	private IBaseDao<RecordLog, Integer> recordLogDao;
	private IBaseDao<Equipment, Integer> equipmentDao;
	private IBaseDao<User, Integer> userDao;
	private IBaseDao<Ticket, Integer> ticketDao;
	public static Map<String, String> show = new HashMap<String, String>();
	public static Map<String, Equipment> equipments = new HashMap<String, Equipment>();// IP地址对应项目ID
	 public static Map<String,IoSession> sessions=new HashMap<String, IoSession>();//IP地址对应Sesiion项目
	IoFilter CODEC_FILTER = new ProtocolCodecFilter(
			new ServerProtocalCodecFactory());
	private Server server;
	public static Map<String, Date> connects = new HashMap<String, Date>();

	public void sessionCreated(IoSession session) throws Exception {
		session.setAttribute("server", this.server);
		session.getFilterChain().addLast("codec", CODEC_FILTER);
		if (session.getTransportType() == TransportType.SOCKET)
			((SocketSessionConfig) session.getConfig())
					.setReceiveBufferSize(102048);
		session.setIdleTime(IdleStatus.BOTH_IDLE, 10);
		String ip = session.getRemoteAddress().toString();
		ip = ip.substring(1, ip.indexOf(":"));
		Equipment equipment = this.equipmentDao.findEntiry(
				"from Equipment where ip=?", ip);
		if (equipment == null) {
			System.out.println("断开连接原因:设备IP为:" + ip + "与系统设置不一致");
			session.close();
		} else {
			System.out.println("连接[" + equipment.getName() + "]设备成功!");
			equipments.put(ip, equipment);
			connects.put(ip, new Date());
		}
	}

	/**
	 * 接收信息
	 */
	public void messageReceived(IoSession session, Object message) {
		String ip = session.getRemoteAddress().toString();
		ip = ip.substring(1, ip.indexOf(":"));
		connects.put(ip, new Date());
		if (equipments.get(ip) == null) {// 尝试查找
			Equipment equipment = this.equipmentDao.findEntiry(
					"from Equipment where e.ip=?", ip);
			if (equipment == null) {
				System.out.println("断开连接原因:设备IP为:" + ip + "与系统设置不一致");
				session.close();
				return;
			} else {
				System.out.println("重新连接[" + equipment.getName() + "]设备成功!");
				equipments.put(ip, equipment);
			}
		}
		String data = (String) message;
		System.out.println("data="+data);
		String init = data.substring(0, data.length() - 2);
		if (init.endsWith("005b11")) {
			String mess = data.substring(data.length() - 2);
			System.out.println("接收信号:" + mess);
			if (mess.equals("80")) {// 表示返回信号
				// 查找出哪台机的最后过机时间
				RecordLog log = recordLogDao
						.findEntiry(
								"from RecordLog as l  left join fetch l.user where l.equipment.id=? and l.status=1 order by l.createTime desc ",
								equipments.get(ip).getId());
					 log.setPassTime(new Date());
					 log.setStatus(2);
					 recordLogDao.saveOrUpdate(log);
					 User u=log.getUser();
					 u.setLastTime(new Date());
					 u.setStatus(2);
					 userDao.update(u);
			} else {
				session.write("efefefefeeeeeeee00100000003c1100");// 第一次连接成功
				session.write("efefefefeeeeeeee0010000000051100");// 请求自动上传
			}
		} else if (init.endsWith("006211")) {
			String tip = show.get(ip);
			if (tip != null && tip.length() > 0) {
				String tipCode = UdpUtil.byte2hex(tip.getBytes());
				Integer length = ("efefefefeeeeeeee182800000062110102e825fa0c3520292036"
						+ tipCode + "03").length() / 2;
				Integer codeLength = tipCode.length() / 2;
				session.write("efefefefeeeeeeee"
						+ UdpUtil.toHex(codeLength + 11, 16)
						+ UdpUtil.toHex(length, 16)
						+ "00000062110102e825fa0c3520292036" + tipCode + "03");// 显示剩余次数
				session.write("efefefefeeeeeeee051500000062110102e824fa03");
				show.remove(ip);
			}
			
		}  else if(data.startsWith("01006111")){//二维码
			String code=new String(UdpUtil.hex2byte(data.substring(8,data.length()).getBytes()));
			User user=userDao.findEntiry("from User u left join fetch u.ticket where u.number=? and u.status=1 and u.startTime<=? and u.endTime>=? ", code,new Date(),new Date());
			if (user!=null) {
				session.write("efefefefeeeeeeee00120000001411016400");//开门,继电器1
				RecordLog recordLog=new RecordLog();
				recordLog.setTicket(user.getTicket());
				recordLog.setCreateTime(new Date());
				recordLog.setStatus(1);
				recordLog.setUser(user);
				recordLog.setNumber(code);	
				recordLog.setEquipment(equipments.get(ip));
				recordLogDao.save(recordLog);
			}	
	}
	}
	public void showScreen(IoSession session, String message, String ip) {// 显示屏内容
		String tipCode = UdpUtil.byte2hex(message.getBytes());
		Integer length = ("efefefefeeeeeeee0c1c00000062110002e825fa0c3520292036"
				+ tipCode + "03").length() / 2;
		Integer codeLength = tipCode.length() / 2;
		session.write("efefefefeeeeeeee" + UdpUtil.toHex(codeLength + 11, 16)
				+ UdpUtil.toHex(length, 16)
				+ "00000062110102e825fa0c3520292036" + tipCode + "03");// 显示剩余次数
		show.put(ip, message);
	}

	public static boolean isTime(String startTime, String endTime) {
		Integer start = Integer.valueOf(startTime.replaceAll(":", ""));
		Integer end = Integer.valueOf(endTime.replaceAll(":", ""));
		SimpleDateFormat timeFormat = new SimpleDateFormat("HHmm");
		Integer time = Integer.valueOf(timeFormat.format(new Date()));
		if (time >= start && time <= end) {
			return true;
		}
		return false;
	}
	@Override
	public void exceptionCaught(IoSession session, Throwable cause) throws Exception {
		cause.getStackTrace();
	}

	public void sessionClosed(IoSession session) throws Exception {//
		String ip = session.getRemoteAddress().toString();
		if (equipments.get(ip) != null) {
			Equipment equipment = equipments.get(ip);
			System.out.println("远程断开[" + equipment.getName() + "]设备成功!");
		}
		super.sessionClosed(session);
		ip = ip.substring(1, ip.indexOf(":"));
		equipments.remove(ip);
		sessions.remove(ip);
		connects.remove(ip);
	}

	public Server getServer() {
		return server;
	}

	public void setServer(Server server) {
		this.server = server;
	}

	public IBaseDao<Equipment, Integer> getEquipmentDao() {
		return equipmentDao;
	}

	public void setEquipmentDao(IBaseDao<Equipment, Integer> equipmentDao) {
		this.equipmentDao = equipmentDao;
	}

	public IBaseDao<User, Integer> getUserDao() {
		return userDao;
	}

	public void setUserDao(IBaseDao<User, Integer> userDao) {
		this.userDao = userDao;
	}



	public IBaseDao<Ticket, Integer> getTicketDao() {
		return ticketDao;
	}

	public void setTicketDao(IBaseDao<Ticket, Integer> ticketDao) {
		this.ticketDao = ticketDao;
	}

	public IBaseDao<RecordLog, Integer> getRecordLogDao() {
		return recordLogDao;
	}

	public void setRecordLogDao(IBaseDao<RecordLog, Integer> recordLogDao) {
		this.recordLogDao = recordLogDao;
	}
}
