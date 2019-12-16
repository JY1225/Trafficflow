package com.sweii.dao;

import java.text.DecimalFormat;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.struts2.ServletActionContext;

import com.erican.auth.service.AdminService;
import com.erican.auth.vo.Admin;
import com.sweii.bean.TicketBean;
import com.sweii.server.Server;
import com.sweii.server.ServerHandler;
import com.sweii.service.CommonService;
import com.sweii.service.impl.EquipmentServiceImpl;
import com.sweii.util.Environment;
import com.sweii.util.MapCookie;
import com.sweii.util.MapCookieUtil;
import com.sweii.vo.BakDatabase;
import com.sweii.vo.CardInfo;
import com.sweii.vo.Category;
import com.sweii.vo.Code;
import com.sweii.vo.Equipment;
import com.sweii.vo.Qos;
import com.sweii.vo.RecordLog;
import com.sweii.vo.Setting;
import com.sweii.vo.Ticket;
import com.sweii.vo.User;

/**
 * 
 * @author duncan
 * @createTime 2010-5-8
 * @version 1.0
 */
public class BaseServiceImpl {
	public static Map<String, TicketBean> ticketsMap = new HashMap<String, TicketBean>();// 缓存今天所有临时票
	public static Map<String,TicketBean> cardsMap=new HashMap<String,TicketBean>();//缓存今天所有临时卡
	public static Date today = null;
	public SimpleDateFormat HHmm = new SimpleDateFormat("HH:mm");
	public SimpleDateFormat timeFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
	public SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
	public SimpleDateFormat monthFormat = new SimpleDateFormat("yyyy-MM");
	@Resource(name = "adminDao")
	protected IBaseDao<Admin, Integer> adminDao;
	@Resource(name = "qosDao")
	protected IBaseDao<Qos, Integer> qosDao;
	@Resource(name = "codeDao")
	protected IBaseDao<Code, Integer> codeDao;
	@Resource(name = "settingDao")
	protected IBaseDao<Setting, Integer> settingDao;
	@Resource(name = "bakDatabaseDao")
	protected IBaseDao<BakDatabase, Integer> bakDatabaseDao;
	@Resource(name = "ticketDao")
	protected IBaseDao<Ticket, Integer> ticketDao;
	@Resource(name = "categoryDao")
	protected IBaseDao<Category, Integer> categoryDao;
	@Resource(name = "userDao")
	protected IBaseDao<User, Integer> userDao;
	@Resource(name = "equipmentDao")
	protected IBaseDao<Equipment, Integer> equipmentDao;
	@Resource(name = "recordLogDao")
	protected IBaseDao<RecordLog, Integer> recordLogDao;
	@Resource(name = "cardInfoDao")
	protected IBaseDao<CardInfo, Integer> cardInfoDao;
	@Resource(name = "commonService")
	protected CommonService commonService;
	@Resource(name = "adminService")
	protected AdminService adminService;
	@Resource(name = "equipmentService")
	protected EquipmentServiceImpl equipmentService;
	public HttpServletRequest getRequest() {
		return ServletActionContext.getRequest();
	}
	
	public Server server;
    public Server getServer() {
	if (server == null) {
	    ServerHandler handler = new ServerHandler();
	    handler.setUserDao(userDao);
	    handler.setTicketDao(ticketDao);
	    handler.setRecordLogDao(recordLogDao);
	    handler.setEquipmentDao(equipmentDao);
	    System.out.println(Environment.INIT_PORT);
	   server = new Server(Environment.INIT_PORT, handler);
	}
	return server;
    }

	/**
	 * 获到登录用户ID
	 * 
	 * @author duncan
	 * @createTime 2009-11-24
	 * @version 1.0
	 * @return Integer
	 */
	protected Integer getLoginAdminId() {
		HttpServletResponse response = ServletActionContext.getResponse();
		MapCookieUtil mcu = new MapCookieUtil(ServletActionContext.getRequest(), response);
		MapCookie loginSecurityMapCookie = mcu.getSecurityMapCookie(Environment.COOKIE_NAME_ONLINE_ADMIN);
		int adminId = loginSecurityMapCookie.getInt(Environment.COOKIE_KEY_ADMIN_ID, 0);
		if (adminId == 0)
			return null;
		return adminId;
	}

	/**
	 * 获到登录管理员名称
	 * 
	 * @author duncan
	 * @createTime 2009-11-24
	 * @version 1.0
	 * @return String
	 */
	protected String getLoginWorkerName() {
		HttpServletResponse response = ServletActionContext.getResponse();
		MapCookieUtil mcu = new MapCookieUtil(ServletActionContext.getRequest(), response);
		MapCookie loginSecurityMapCookie = mcu.getSecurityMapCookie(Environment.COOKIE_NAME_ONLINE_ADMIN);
		return loginSecurityMapCookie.getString(Environment.COOKIE_KEY_REALNAME, "");
	}

	/**
	 * 根据传入的ID list返回以逗号分隔的id串
	 * 
	 * @param ids
	 * @return
	 * @author kfz
	 * @createTime 2011-3-11
	 */
	protected String genIdStr(List<Integer> ids) {
		String idsStr = "";
		for (int i = 0; i < ids.size(); i++) {
			if (i != 0) {
				idsStr += ",";
			}
			idsStr += "" + ids.get(i);
		}
		return idsStr;
	}

	public String format(Float value, String mat) {
		DecimalFormat f = new DecimalFormat(mat);
		String t = f.format(value);
		return t;
	}

	public String format(Double value, String mat) {
		DecimalFormat f = new DecimalFormat(mat);
		String t = f.format(value);
		return t;
	}

	public Date getNowDate() {
		Date date = new Date();
		date.setHours(0);
		date.setMinutes(0);
		date.setSeconds(0);
		return date;
	}

	public Admin getAdmin() {
		Admin admin = new Admin();
		HttpServletResponse response = ServletActionContext.getResponse();
		MapCookieUtil mcu = new MapCookieUtil(ServletActionContext.getRequest(), response);
		MapCookie loginSecurityMapCookie = mcu.getSecurityMapCookie(Environment.COOKIE_NAME_ONLINE_ADMIN);
		int adminId = loginSecurityMapCookie.getInt(Environment.COOKIE_KEY_ADMIN_ID, 0);
		admin.setId(adminId);
		return admin;
	}
}
