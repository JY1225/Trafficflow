package com.sweii.util;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * 在线用户基本信息
 * 
 * @author duncan
 * 2010-1-7 上午01:06:12
 */
public class OnlineAdmin {
	public static String superAdmin="administrator";
	/**
	 * 管理员ID
	 */
	private Integer id;
	
	/**
	 * 管理员账号
	 */
	private String username;
	
	/**
	 * 管理员姓名
	 */
	private String name;
	private Integer width;
	public Integer getWidth() {
		return width;
	}
	public void setWidth(Integer width) {
		this.width = width;
	}
	public Integer getId() {
		return id;
	}
	public void setId(Integer id) {
		this.id = id;
	}
	public String getUsername() {
		return username;
	}
	public void setUsername(String username) {
		this.username = username;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	private String loginTime;
	
	public String getLoginTime() {
		return loginTime;
	}
	public void setLoginTime(String loginTime) {
		this.loginTime = loginTime;
	}
	public OnlineAdmin(HttpServletRequest request,HttpServletResponse response){
	 	MapCookieUtil mcu = new MapCookieUtil(request,response);
	 	MapCookie loginSecurityMapCookie = mcu.getSecurityMapCookie(Environment.COOKIE_NAME_ONLINE_ADMIN);
	 	int adminId=loginSecurityMapCookie.getInt(Environment.COOKIE_KEY_ADMIN_ID, 0);
	 	if(adminId>0){
	 		this.username=loginSecurityMapCookie.getString(Environment.COOKIE_KEY_USERNAME, "");
	 		this.name=loginSecurityMapCookie.getString(Environment.COOKIE_KEY_REALNAME, "");
	 		this.id=adminId;
	 		this.loginTime=loginSecurityMapCookie.getString(Environment.COOKIE_KEY_LOGINTIME, "");
	 		this.width=loginSecurityMapCookie.getInt("width", 0);
	 	}
	}
	public boolean isSuperAdmin(){
		if(superAdmin.equals(username)) return true;	
		return false;
	}
}
