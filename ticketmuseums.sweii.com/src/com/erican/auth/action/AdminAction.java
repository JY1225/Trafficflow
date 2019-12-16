package com.erican.auth.action;
import java.util.Date;
import java.util.LinkedList;
import java.util.List;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

import com.erican.auth.bean.AdminBean;
import com.erican.auth.common.ActionResponse;
import com.erican.auth.common.TreeNode;
import com.erican.auth.service.ServiceCenter;
import com.erican.auth.vo.Admin;
import com.erican.auth.vo.AdminRole;
import com.sweii.action.BaseAction;
import com.sweii.dao.DaoFactory;
import com.sweii.framework.helper.NumbericHelper;
import com.sweii.framework.helper.StringHelper;
import com.sweii.framework.utility.ErrorMessageHandler;
import com.sweii.framework.utility.ServiceException;
import com.sweii.util.ErrorCode;
import com.sweii.util.PageUtil;
/**
 * 处理管理员所有操作
 * 
 * @author duncan
 * 2009-12-17 下午04:01:24
 */
public class AdminAction extends BaseAction {
    private static final long serialVersionUID = 1L;
    private static final Log loger = LogFactory.getLog(AdminAction.class);
    private String searchContent;
    private Integer workerId;
    public Integer getWorkerId() {
	return workerId;
    }
    public void setWorkerId(Integer workerId) {
	this.workerId = workerId;
    }
    private String roleIds;
    public String getRoleIds() {
	return roleIds;
    }
    public void setRoleIds(String roleIds) {
	this.roleIds = roleIds;
    }
    public String getSearchContent() {
	return searchContent;
    }
    public void setSearchContent(String searchContent) {
	this.searchContent = searchContent;
    }
    private Admin admin = null;
    public void setAdmin(Admin admin) {
	this.admin = admin;
    }
    public Admin getAdmin() {
	return this.admin;
    }
    public String ids;
    public String getIds() {
	return ids;
    }
    public void setIds(String ids) {
	this.ids = ids;
    }
    private Integer id = null;
    public void setId(Integer id) {
	this.id = id;
    }
    public Integer getId() {
	return this.id;
    }
    /**
     * 
     * @return
     * @author lizhongren
     * 2009-12-23 下午01:48:30
     */
    public String doPageAction() {
	PageUtil<Admin> page = DaoFactory.getAdminDao().queryAdminPage(super.getLoginAdminId(), searchContent, super.getPageNo(), super.getPageSize());
	List<AdminBean> list = new LinkedList<AdminBean>();
	for (Admin vo : page.getResult()) {
	    AdminBean bean = new AdminBean();
	    bean.setId(vo.getId());
	    bean.setUsername(vo.getUsername());
	    int type = NumbericHelper.getIntValue(vo.getType(), 0);
	    if (type == 2) {
		bean.setTypeValue("超级管理员");
	    } else if (type == 1) {
		bean.setTypeValue("部门管理员");
	    } else {
		bean.setTypeValue("一般用户");
	    }
	    int status = NumbericHelper.getIntValue(vo.getStatus(), 0);
	    if (status == 1) {
		bean.setStatusValue("正常");
	    } else {
		bean.setStatusValue("停用");
	    }
	    list.add(bean);
	}
	PageUtil<AdminBean> page1 = new PageUtil<AdminBean>(page.getStart(), page.getTotalCount(), page.getPageSize(), list);
	super.setDataGrid(page1);
	return SUCCESS;
    }
    public String doPrepareAddAction() {
	List<TreeNode> result = DaoFactory.getRoleDao().queryRoleTree(this.getLoginAdminId());
	super.setDataGrid(result);
	return SUCCESS;
    }
    public void doAddAction() {
	try {
		this.getAdmin().setCreateTime(new Date());
	    ServiceCenter.getAdminService().doAddAdmin(this.getAdmin(), this.getLoginAdminId(), StringHelper.splitInt(roleIds, ","));
	    super.responseJson(new ActionResponse(ActionResponse.SUCCESS, "新增用户成功"));
	} catch (ServiceException e) {
	    super.responseJson(new ActionResponse(ActionResponse.FALIURE, ErrorMessageHandler.getMessage(e)));
	    e.printStackTrace();
	} catch (Exception e) {
	    super.responseJson(new ActionResponse(ActionResponse.FALIURE, ErrorMessageHandler.getMessage(ErrorCode.EXCEPTION)));
	    e.printStackTrace();
	}
    }
    public void doDeleteAction() {
	try {
	    super.responseJson(new ActionResponse(ActionResponse.SUCCESS, "删除用户成功"));
	} catch (ServiceException e) {
	    super.responseJson(new ActionResponse(ActionResponse.FALIURE, ErrorMessageHandler.getMessage(e)));
	    loger.debug(e);
	} catch (Exception e) {
	    super.responseJson(new ActionResponse(ActionResponse.FALIURE, ErrorMessageHandler.getMessage(ErrorCode.EXCEPTION)));
	    loger.debug(e);
	}
    }
    public void doViewAction() {
	try {
	} catch (ServiceException e) {
	    loger.debug(e);
	} catch (Exception e) {
	    loger.debug(e);
	}
    }
    public String doPrepareEditAction() {
	Admin admin = DaoFactory.getAdminDao().findById(this.getId());
	List<TreeNode> treeNodes = DaoFactory.getRoleDao().queryRoleTree(this.getLoginAdminId());
	if (treeNodes.size() > 0) {
	    List<AdminRole> adminRoles = DaoFactory.getAdminDao().getAdminRolesByAdmin(this.getId());
	    for (TreeNode tree : treeNodes) {
		for (AdminRole ar : adminRoles) {
		    if (tree.getId().intValue() == ar.getRole().getId().intValue()) {
			tree.setChecked(TreeNode.CHECKED);
		    }
		}
	    }
	}
	AdminBean adminBean = new AdminBean();
	adminBean.setUsername(admin.getUsername());
	adminBean.setStatus(admin.getStatus());
	adminBean.setType(admin.getType());
	adminBean.setId(admin.getId());
	adminBean.setName(admin.getName()); 
	adminBean.setPhone(admin.getPhone());
	adminBean.setRemark(admin.getRemark());
	int type = NumbericHelper.getIntValue(admin.getType(), 0);
	if (type == 1) {
	    adminBean.setTypeValue("普通管理员");
	} else if (type == 2) {
	    adminBean.setTypeValue("超级管理员");
	} else if (type == 3) {
	    adminBean.setTypeValue("售票员");
	}
	super.setRequestAttribute("admin", adminBean);
	super.setDataGrid(treeNodes);
	return SUCCESS;
    }
    public void doEditAction() {
	try {
	    if (this.getAdmin() == null || this.getAdmin().getId() == null) throw new ServiceException(ErrorCode.INVALID_REQUEST);
	    ServiceCenter.getAdminService().doEditAdminById(this.getAdmin(), super.getLoginAdminId(), StringHelper.splitInt(roleIds, ","));
	    super.responseJson(new ActionResponse(ActionResponse.SUCCESS, "修改用户信息成功"));
	} catch (ServiceException e) {
	    super.responseJson(new ActionResponse(ActionResponse.FALIURE, ErrorMessageHandler.getMessage(e)));
	    e.printStackTrace();
	} catch (Exception e) {
	    super.responseJson(new ActionResponse(ActionResponse.FALIURE, ErrorMessageHandler.getMessage(ErrorCode.EXCEPTION)));
	    e.printStackTrace();
	}
    }
}
