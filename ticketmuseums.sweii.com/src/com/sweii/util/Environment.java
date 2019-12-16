package com.sweii.util;
import com.sweii.framework.helper.ClassHelper;
import com.sweii.framework.helper.StringHelper;
import com.sweii.framework.utility.PropertyManager;
import com.sweii.framework.utility.XMLPropertyManager;

public class Environment {
	public static String DES_KEY_ONLINE = "B3K6H$M$";
	
	public static String COOKIE_NAME_ONLINE_ADMIN = "COOKIE_NAME_ONLINE_ADMIN";
	public static String COOKIE_KEY_WORKER_ID= "COOKIE_KEY_WORKER_ID";
	
	public static String COOKIE_KEY_ADMIN_ID="COOKIE_KEY_ADMIN_ID";
	
	public static String COOKIE_KEY_BRANCH_ID="COOKIE_KEY_BRANCH_ID";
	
	public static String COOKIE_KEY_USERNAME="COOKIE_KEY_USERNAME";
	
	public static String COOKIE_KEY_REALNAME="COOKIE_KEY_REALNAME";
	
	public static String COOKIE_KEY_LOGINTIME="COOKIE_KEY_LOGINTIME";
	
	public static String ATTR_NAME_ONLINE_ADMIN = "ATTR_NAME_ONLINE_ADMIN";
	
	public static String ATTRI_NAME_PAGE_CONTEXT = "ATTRI_NAME_PAGE_CONTEXT";
	public static String INIT_URL = "/";
	public static String IP = "localhost";
	public static String USER = "root";
	public static String PASSWORD = "";
	public static String DATABASE="";
	public static String AUTH_HOST = "";
	public static int INIT_PORT = 1776;
	public static String LOGIN_URL = "/Login.jsp";//登录页面
	
	public static String ERROR_URL = "/Error.jsp";//错误提示页面
	
	public static String ROOT_PATH = ClassHelper.getWebAppRootPath();
	
	public static PropertyManager manager = new XMLPropertyManager("auth-environment.xml",true);
	
	public static Integer PERMISSIONCACHE_TIME=new Integer(60);//单位分
	static {
		if(!StringHelper.isEmpty(manager.getProperty("AUTH_HOST"))){
			AUTH_HOST = manager.getProperty("AUTH_HOST");
		}
		if(!StringHelper.isEmpty(manager.getProperty("IP"))){
			IP = manager.getProperty("IP");
		}
		if(!StringHelper.isEmpty(manager.getProperty("USER"))){
			USER = manager.getProperty("USER");
		}
		if(!StringHelper.isEmpty(manager.getProperty("PASSWORD"))){
			PASSWORD = manager.getProperty("PASSWORD");
		}
		if(!StringHelper.isEmpty(manager.getProperty("DATABASE"))){
			DATABASE = manager.getProperty("DATABASE");
		}
		if(!StringHelper.isEmpty(manager.getProperty("INIT_URL"))){
			INIT_URL = manager.getProperty("INIT_URL");
		}
		if(!StringHelper.isEmpty(manager.getProperty("LOGIN_URL"))){
			LOGIN_URL = manager.getProperty("LOGIN_URL");
		}
		if(!StringHelper.isEmpty(manager.getProperty("ERROR_URL"))){
			ERROR_URL = manager.getProperty("ERROR_URL");
		}
		
		if(!StringHelper.isEmpty(manager.getProperty("INIT_PORT"))){
			INIT_PORT = Integer.valueOf(manager.getProperty("INIT_PORT"));
		}
		LOGIN_URL = AUTH_HOST+LOGIN_URL;
		ERROR_URL = AUTH_HOST+ERROR_URL;
	}			
}
