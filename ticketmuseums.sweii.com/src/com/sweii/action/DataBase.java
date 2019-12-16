package com.sweii.action;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Map;

import javax.sql.DataSource;

import org.springframework.jdbc.core.JdbcTemplate;

import com.erican.auth.vo.Admin;
import com.sweii.dao.BaseServiceImpl;
/**
 * 
 * @author mr_li
 * 本地与服务器之间的相互同步
 *
 */
public class DataBase  extends BaseServiceImpl{
	
	/**
	 * 加载驱动获取数据库连接
	 * @return Connection
	 */
	public static final Connection getSQL2000() {
		Connection con =  null; 
		String url = "jdbc:sqlserver://win-gms2k-HKWG01.xincache.cn:1433;databaseName=net3106025";
		String uid = "net3106025";
		String pwd = "C4M6T2p4";
		String driver = "com.microsoft.sqlserver.jdbc.SQLServerDriver";
	     try{   
	    	 Class.forName(driver);   
	         con = DriverManager.getConnection(url , uid , pwd);   
	     }catch(SQLException se){   
		    System.out.println("数据库连接失败！");   
		    se.printStackTrace() ;   
	     } catch (ClassNotFoundException e) {
	    	 System.out.println("加载驱动失败！");   
			e.printStackTrace();
		}
		return con;   
     }
	/**
	 * 预订同步添加数据功能
	 * @param synId 同步列
	 * @param roodId 房间id
	 * @param size 票数
	 * @param price 票价
	 * @param total 总额
	 * @param preTiem 预定时间
	 * @param linkMan 联系人
	 * @param phone 手机
	 * @param mobile 电话
	 * @param address 地址
	 * @return int  1 为成功，0为失败
	 */
	public int addPreOrder(Integer synId,Integer roodId,Integer 
			size,Integer price,Integer total,Date preTiem,
			String linkMan,String phone,String mobile,String address){
		Connection con=getSQL2000();
		int i=0;
		PreparedStatement pstmt = null;
		String sql="insert into Pre_order(syn_id,room_id,size,price,total,pre_time,link_man,phone,mobile,address)  values(?,?,?,?,?,?,?,?,?,?)";
		try {
			pstmt = con.prepareStatement(sql) ;   
			pstmt.setInt(1, synId);
			pstmt.setInt(2, roodId);
			pstmt.setInt(3, size);
			pstmt.setInt(4, price);
			pstmt.setInt(5, total);
			Timestamp time=new Timestamp(preTiem.getTime());
			pstmt.setTimestamp(6,time);
			pstmt.setString(7, linkMan);
			pstmt.setString(8, phone);
			pstmt.setString(9, mobile);
			pstmt.setString(10, address);
			i=pstmt.executeUpdate();
			close(null,pstmt,con);
		} catch (SQLException e) {
			System.out.println("没有需要更新的数据！");
		}finally{
			close(null,pstmt,con);
		}
		return i;
	}
	/**
	 * 返回最大id,知道服务器上有多少数据
	 * @return int  数据表有多少条数据
	 */
	public int getmaxPreId(){
		int max=0;
		Connection con=getSQL2000();
		PreparedStatement pstmt =null;
		ResultSet rs = null;
		String sql = "select max(id) as id  from Pre_order";
		try {
			pstmt=con.prepareStatement(sql);
			rs=pstmt.executeQuery();
			while(rs.next()){
				max = rs.getInt("id");
			}
			close(rs,pstmt,con);
		} catch (SQLException e) {
			e.printStackTrace();
			System.out.println("数据表为空，请插入数据！");
		}finally{
			close(rs,pstmt,con);
		}
		return max;
	}
	/**
	 * 更新服务器上的同步列，表示数据已同步功能
	 * @param synId 同步列
	 * @param id  同步的数据id
	 * @return int  
	 */
	public int updatePreOrder(Integer synId,Integer id){
			Connection con=getSQL2000();
			PreparedStatement pstmt=null;
			int i=0;
			try {
				String sql="update Pre_order set syn_id = ? where id = ?";
				pstmt = con.prepareStatement(sql) ;   
				pstmt.setInt(1, synId);
				pstmt.setInt(2, id);
				i=pstmt.executeUpdate();
				close(null,pstmt,con);
			} catch (SQLException e) {
				e.printStackTrace();
				System.out.println("更新失败，没有需要更新的数据！");
			}finally{
				close(null,pstmt,con);
			}
			return i;
	}
	/**
	 * 添加房间
	 * @return
	 * @throws SQLException
	 */
	public int addRoom(){
		PreparedStatement pstmt=null;
		Connection con=getSQL2000();
		int i=0;
		try {
			String sql="insert into Room(name,Short_name)  values('八室','偷天换日')";
			pstmt= con.prepareStatement(sql) ;   
			i=pstmt.executeUpdate();
			close(null,pstmt,con);
		} catch (Exception e) {
			e.printStackTrace();
		}finally{
			close(null,pstmt,con);
		}
		return i;
	}
	/**
	 * 添加时间段费用
	 * @return int
	 */
	public int addTicketPrice(){
		int i=0;
		Connection con=getSQL2000();
		PreparedStatement pstmt=null;
		try {
			String sql="insert into ticket_price(week,start_time,end_time,price)  values('星期日','18:00','23:59','120')";
			pstmt= con.prepareStatement(sql) ;   
			i=pstmt.executeUpdate();
			close(null,pstmt,con);
		} catch (Exception e) {
			e.printStackTrace();
		}finally{
			close(null,pstmt,con);
		}
			return i;
	}
	/**
	 * 显示房间
	 * @return int
	 */
	public int selectRoom(){
		Connection con=getSQL2000();
		String sql="select * from Room ";
		PreparedStatement pstmt = null;
		ResultSet rs = null;
		try {
			pstmt = con.prepareStatement(sql);
			rs=pstmt.executeQuery();
			while(rs.next()){
				  String name = rs.getString("name") ;   
				  System.out.println("name="+name);
			}
		} catch (SQLException e) {
			e.printStackTrace();
		}finally{
			close(rs,pstmt,con);
		}
		return 0;   
	}
	/**
	 * 释放资源
	 * @param rs
	 * @param pstmt
	 * @param conn
	 */
	public void close(ResultSet rs,PreparedStatement pstmt,Connection conn){
		try {
			 if(rs != null){   // 关闭数据集   
			 	  rs.close() ;   
			 }if(pstmt != null){   // 关闭声明   
			      pstmt.close() ;   
			 }if(conn != null){  // 关闭连接对象   
			      conn.close() ;   
			 }
		} catch (SQLException e) {
			e.printStackTrace();
		} 
	}
	public static void main(String[] args) throws SQLException {
		DataBase  db=new DataBase();
		System.out.println(db.getmaxPreId());
	}
	/**
	 * 自动同步方法 交给spring管理
	 */
	public  boolean flag=true;
	public void check() throws Exception{
		/*
			if(flag){
				flag=false;
				try {
					System.out.println("定时器触发！");
					int maxid=0;
					DataBase  db=new DataBase();
					maxid=db.getmaxPreId();  // 查出服务器上最大id，
					List<PreOrder> list=db.selectPreOrder(maxid); //查出服务器上新增而本地没有新增的数据 而且同步列为null的 ，表示要同步的
					for(PreOrder pre : list){
						if(pre.getPreTime()!=null){
							int temid=pre.getId();
							pre.setCreateTime(new Date());
							pre.setType(2);
							pre.setStatus(1);
							Admin admin=new Admin();
							admin.setId(1);
							pre.setAdmin(admin);
							Room room=new Room();
							room.setId(pre.getRoomId());
							pre.setRoom(room);
							pre.setSynId(1);
							this.preOrderDao.save(pre); //保存进本地， 
							db.updatePreOrder( pre.getId(), temid);//获取刚刚保存的一条数据，然后再更新服务器上的数据,第一个参数为update的值，第二个为条件值
						}else {
							System.out.println(pre.getId()+"\t"+pre.getLinkMan()+":客户订票时间已经为空，请联系管理员！");
						}
						
					}
					//本地上传服务器
					List<PreOrder> listpre=selectPreOrder();
					for(PreOrder preor : listpre){
						db.addPreOrder(preor.getId(), preor.getRoom().getId(), preor.getSize(), 
								preor.getPrice(), preor.getTotal(), preor.getPreTime(), 
								preor.getLinkMan(), preor.getPhone(), preor.getMobile(), preor.getAddress());
						updatePreOrder(preor.getId()); //更新本地一个字段，表示已同步，数据已上传到服务器
					}
				} catch (Exception e) {
					e.printStackTrace();
				}finally{
					flag=true;
				}
			}	*/
		}	
}
