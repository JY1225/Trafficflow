<%@ page isELIgnored="true" %>
<%@page import="java.io.*"%>
<%@page import="java.util.*"%>
<%@page import="com.sweii.vo.*"%>
<%@page import="com.sweii.bean.*"%>
<%@page import="com.sweii.framework.*"%>
<%@ page import="com.sweii.util.MapCookie"%>
<%@ page import="com.sweii.util.MapCookieUtil"%>
<%@ page import="com.sweii.util.Environment"%>
<%@ taglib  prefix="s" uri="/struts-tags" %>
<%@ taglib uri="controls" prefix="sw" %>
<%

	response.setHeader("Pragma","No-Cache");
	response.setHeader("Cache-Control","No-Cache");
	response.setDateHeader("Expires", 0);
	MapCookieUtil mcu = new MapCookieUtil(request,response);
	MapCookie loginSecurityMapCookie = mcu.getSecurityMapCookie(Environment.COOKIE_NAME_ONLINE_ADMIN);
	Integer onlineAdminId =loginSecurityMapCookie.getInt(Environment.COOKIE_KEY_ADMIN_ID, 0);
	String onlineAdminName =loginSecurityMapCookie.getString(Environment.COOKIE_KEY_USERNAME, "");
	String height =loginSecurityMapCookie.getString("height", "");
	if(onlineAdminId.intValue()==0){
	   // response.sendRedirect(Environment.LOGIN_URL);
	}
%>