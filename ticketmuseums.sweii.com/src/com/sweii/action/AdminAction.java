package com.sweii.action;
import java.util.Date;

import org.apache.struts2.ServletActionContext;
import org.hibernate.util.StringHelper;

import com.erican.auth.common.ActionResponse;
import com.erican.auth.online.MapCookie;
import com.erican.auth.online.MapCookieUtil;
import com.erican.auth.vo.Admin;
import com.sweii.framework.helper.DateHelper;
import com.sweii.framework.helper.MD5Helper;
import com.sweii.framework.utility.ErrorMessageHandler;
import com.sweii.framework.utility.ServiceException;
import com.sweii.util.Environment;
import com.sweii.util.ErrorCode;
import com.sweii.util.PageUtil;
/**
 * 
 * @author duncan
 * @createTime 2010-8-6
 * @version 1.0
 */
public class AdminAction extends BaseAction {
    private String username;
    private String password;
    private String oldPassword;
    private Admin admin;
    private String width;//浏览器宽度
    private String height;//高度
    /**
     * 登陆
     * @author duncan
     * @createTime 2010-8-6
     * @version 1.0
     */
    public void login() {
	try {
	    if (StringHelper.isEmpty(this.username) || this.getPassword() == null) throw new ServiceException("请输入用户名或密码");
	    Admin admin = this.adminService.queryAdminByUserName(this.getUsername());
	    if (admin == null || !MD5Helper.encode(this.getPassword()).equals(admin.getPassword())) throw new ServiceException("用户名或密码错误");
	    if(admin!=null&&admin.getStatus().intValue()==2){
	    	throw new ServiceException("用户已被停用。");
	    }
	    MapCookie securityMapCookie = new MapCookie(Environment.COOKIE_NAME_ONLINE_ADMIN);
	    securityMapCookie.put(Environment.COOKIE_KEY_ADMIN_ID, admin.getId().intValue() + "");
	    securityMapCookie.put(Environment.COOKIE_KEY_USERNAME, admin.getUsername());
	    securityMapCookie.put(Environment.COOKIE_KEY_REALNAME, admin.getName());
	    securityMapCookie.put(Environment.COOKIE_KEY_LOGINTIME, DateHelper.toString(new Date(), "yyyyMMddHHmmss"));
	    securityMapCookie.put("width", width);
	    securityMapCookie.put("height", height);
	    MapCookieUtil mcutil = new MapCookieUtil(ServletActionContext.getRequest(), response);//当前浏览器有效,关闭浏览器后失效
	    mcutil.addSecurityMapCookie(securityMapCookie);
	    super.responseJson(new ActionResponse(ActionResponse.SUCCESS, "登陆成功"));
	} catch (ServiceException e) {
	    super.responseJson(new ActionResponse(ActionResponse.FALIURE, ErrorMessageHandler.getMessage(e)));
	    e.printStackTrace();
	} catch (Exception e) {
	    e.printStackTrace();
	    super.responseJson(new ActionResponse(ActionResponse.FALIURE, ErrorMessageHandler.getMessage(ErrorCode.EXCEPTION)));
	}
    }
    /**
     * 保存浏览器高度
     * @author duncan
     * @createTime 2011-1-25
     * @version 1.0
     */
    public void saveClientHeight(){
	MapCookieUtil mcu = new MapCookieUtil(ServletActionContext.getRequest(), ServletActionContext.getResponse());
	mcu.addCookie("height", height);
    }
    public void addAdmin() {
	this.adminService.addAdmin(admin);
	super.responseJson(new ActionResponse(ActionResponse.SUCCESS, "新增用户成功!"));
    }
    public String prepareEditAdmin() {
	this.setRequestAttribute("admin", this.adminService.queryAdminById(super.getId()));
	return SUCCESS;
    }
    public void editAdmin() {
	this.adminService.editAdmin(admin);
	super.responseJson(new ActionResponse(ActionResponse.SUCCESS, "修改用户成功!"));
    }
    public void deleteAdmin() {
	this.adminService.deleteAdmin(super.getId());
	super.responseJson(new ActionResponse(ActionResponse.SUCCESS, "删除用户成功!"));
    }
    /**
     * 查询管理员列表
     * @author duncan
     * @createTime 2010-8-6
     * @version 1.0
     */
    public String queryAdminPage() {
	System.out.println(super.getPageSize());
	PageUtil<Admin> pages = this.adminService.queryAdminPage(super.getPageNo(), super.getPageSize());
	super.setDataGrid(pages);
	return SUCCESS;
    }
    /**
     * 退出
     * @author duncan
     * @createTime 2010-8-6
     * @version 1.0
     */
    public String logout() {
	MapCookieUtil mcu = new MapCookieUtil(ServletActionContext.getRequest(), ServletActionContext.getResponse());
	mcu.deleteCookie(Environment.COOKIE_NAME_ONLINE_ADMIN);
	ServletActionContext.getRequest().getSession().invalidate();
	return SUCCESS;
    }
    /**
     * 修改密码
     * @author duncan
     * @createTime 2010-8-6
     * @version 1.0
     */
    public void changePassword() {
	try {
	    Integer adminId = super.getLoginAdminId();
	    if (adminId == null) throw new ServiceException(ErrorCode.INVALID_REQUEST);
	    if (StringHelper.isEmpty(oldPassword) || StringHelper.isEmpty(password)) throw new ServiceException("请输入旧密码和新密码");
	    Admin admin = this.adminService.queryAdminById(adminId);
	    if (admin == null) throw new ServiceException(ErrorCode.INVALID_REQUEST);
	    if (!MD5Helper.encode(this.getOldPassword()).equals(admin.getPassword())) throw new ServiceException("输入旧密码不正确");
	    admin.setPassword(MD5Helper.encode(this.getPassword()));
	    super.responseJson(new ActionResponse(ActionResponse.SUCCESS, "修改密码成功"));
	} catch (ServiceException se) {
	    super.responseJson(new ActionResponse(ActionResponse.FALIURE, ErrorMessageHandler.getMessage(se)));
	    se.printStackTrace();
	} catch (Exception se) {
	    super.responseJson(new ActionResponse(ActionResponse.FALIURE, ErrorMessageHandler.getMessage(ErrorCode.EXCEPTION)));
	    se.printStackTrace();
	}
    }
    public Admin getAdmin() {
	return admin;
    }
    public void setAdmin(Admin admin) {
	this.admin = admin;
    }
    public String getPassword() {
	return password;
    }
    public void setPassword(String password) {
	this.password = password;
    }
    public String getUsername() {
	return username;
    }
    public void setUsername(String username) {
	this.username = username;
    }
    public String getOldPassword() {
	return oldPassword;
    }
    public void setOldPassword(String oldPassword) {
	this.oldPassword = oldPassword;
    }
    public String getWidth() {
	return width;
    }
    public void setWidth(String width) {
	this.width = width;
    }
    public String getHeight() {
	return height;
    }
    public void setHeight(String height) {
	this.height = height;
    }
}
