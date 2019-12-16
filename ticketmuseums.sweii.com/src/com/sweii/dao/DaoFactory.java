package com.sweii.dao;
import com.erican.auth.dao.AdminDao;
import com.erican.auth.dao.AdminFunctionDao;
import com.erican.auth.dao.AdminRoleDao;
import com.erican.auth.dao.BranchDao;
import com.erican.auth.dao.FunctionDao;
import com.erican.auth.dao.MenuDao;
import com.erican.auth.dao.ModuleCategoryDao;
import com.erican.auth.dao.ModuleDao;
import com.erican.auth.dao.RoleDao;
import com.erican.auth.dao.RoleFunctionDao;
import com.sweii.framework.helper.SpringHelper;
import com.sweii.service.CommonService;
public class DaoFactory {
    public static CommonService getCommonService() {
	return (CommonService) SpringHelper.getBean("commonService");
    }
    public static AdminDao getAdminDao() {
	return (AdminDao) SpringHelper.getBean("adminDao");
    }
    public static ModuleDao getModuleDao() {
	return (ModuleDao) SpringHelper.getBean("moduleDao");
    }
    public static ModuleCategoryDao getModuleCategoryDao() {
	return (ModuleCategoryDao) SpringHelper.getBean("moduleCategoryDao");
    }
    public static FunctionDao getFunctionDao() {
	return (FunctionDao) SpringHelper.getBean("functionDao");
    }
    public static RoleDao getRoleDao() {
	return (RoleDao) SpringHelper.getBean("roleDao");
    }
    public static RoleFunctionDao getRoleFunctionDao() {
	return (RoleFunctionDao) SpringHelper.getBean("roleFunctionDao");
    }
    public static MenuDao getMenuDao() {
	return (MenuDao) SpringHelper.getBean("menuDao");
    }
    public static AdminRoleDao getAdminRoleDao() {
	return (AdminRoleDao) SpringHelper.getBean("adminRoleDao");
    }
    public static AdminFunctionDao getAdminFunctionDao() {
	return (AdminFunctionDao) SpringHelper.getBean("adminFunctionDao");
    }
    public static BranchDao getBranchDao() {
	return (BranchDao) SpringHelper.getBean("branchDao");
    }
    public static ReportDao getReportDao() {
    	return (ReportDao) SpringHelper.getBean("reportDao");
    }
}
