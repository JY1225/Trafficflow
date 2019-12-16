package com.sweii.util;

/**
 * <p>Title: 异常代码</p>
 * <p>Description: </p>
 * <p>Copyright: Copyright (c) 2005</p>
 * <p>Company: </p>
 * <p>CreateTime: 
 * @author 
 * @version 1.0
 */
public interface ErrorCode {
	/**
	 * 攻击性请求
	 */
	public String ATTACK_REQUEST = "ATTACK_REQUEST";
	/**
	 * 无效的请求
	 */
	public String INVALID_REQUEST = "INVALID_REQUEST";
	/**
	 * 未知错误
	 */
	public String UNKNOWN_ERRORS = "UNKNOWN_ERRORS";
	/**
	 * 系统错误
	 */
	public String SYSTEM_ERRORS = "SYSTEM_ERRORS";
	
	/**
	 * EXCEPTION 异常处理
	 */
	public String EXCEPTION = "EXCEPTION";
	
	public String ADMIN_IS_EXISTED = "ADMIN_IS_EXISTED";
	
	public String ADMIN_IS_NOT_EXIST = "ADMIN_IS_NOT_EXIST";
	
	public String MODULE_IS_NOT_EXIST = "MODULE_IS_NOT_EXIST";
	
	public String DUPLICATE_FUNCTION = "DUPLICATE_FUNCTION";
	
	public String ROLE_IS_NOT_EXIST = "ROLE_IS_NOT_EXIST";
	
	public String MODULE_CATEGORY_IS_NOT_EXIST = "MODULE_CATEGORY_IS_NOT_EXIST";
	
	public String MODULE_CATEGORY_HAS_CHILDS = "MODULE_CATEGORY_HAS_CHILDS";
	
	public String APPLICATION_IS_NOT_EXIST = "APPLICATION_IS_NOT_EXIST";
	
	public String USERNAME_IS_NOT_MATCH_PASSWORD = "USERNAME_IS_NOT_MATCH_PASSWORD";
	
	public String VERIFY_CODE_WRONG = "VERIFY_CODE_WRONG";
	
	public String ADMIN_IS_DISABLE = "ADMIN_IS_DISABLE";
	
	public String ADMIN_IS_EXPIRED = "ADMIN_IS_EXPIRED";
	
	public String FUNCTION_IS_NOT_EXIST = "FUNCTION_IS_NOT_EXIST";
	
	public String MENU_HAS_CHILDS = "MENU_HAS_CHILDS";
	
	public String MENU_IS_NOT_EXIST = "MENU_IS_NOT_EXIST";
	
	public String PASSWORD_VALIDATE_FAILURE = "PASSWORD_VALIDATE_FAILURE";
	
	public String NEW_PASSWORD_EQUALS_OLD = "NEW_PASSWORD_EQUALS_OLD";
	
	public String NEW_PASSWORD_EQUALS_PRE = "NEW_PASSWORD_EQUALS_PRE";
	
	public String PARENT_NOT_EXIST="PARENT_NOT_EXIST";
	
	
	/**
	 * 机构管理
	 * 
	 */
	public String BRANCH_NOT_EXIST="BRANCH_NOT_EXIST";
	
	
	/**
	 * 菜单管理
	 * 
	 */
	public String PARENT_MENU_NOT_EXIST="PARENT_MENU_NOT_EXIST";
	
	public String PARENT_MENU_NOT_LEVEL="PARENT_MENU_NOT_LEVEL";
}
