package com.sweii.util;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.dao.InvalidDataAccessApiUsageException;
import org.springframework.jdbc.support.KeyHolder;
/**
 * 
 * $Header:
 * $Revision:
 * @Author:于金平
 * @version:1.0
 * <BR/>创建时间：2006-9-4 20:22:57<BR/>
 * 
 * 功能说明：<BR/>
 * <BR/>
 * 实现 @see org.springframework.jdbc.support.KeyHolder ,能够获得SQL语句产生的主键<BR/>
 */
public final class JdbcKeyHolder implements KeyHolder{
	List keyList = new ArrayList();
	public Number getKey() throws InvalidDataAccessApiUsageException {
		return (Number)(((Map)keyList.get(0)).get("GENERATED_KEY"));
	}

	public Map getKeys() throws InvalidDataAccessApiUsageException {
		return (Map)keyList.get(0);
	}

	public List getKeyList() {
		return keyList;
	}
}