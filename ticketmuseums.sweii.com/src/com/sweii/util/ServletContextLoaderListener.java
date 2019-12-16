package com.sweii.util;
import javax.servlet.ServletContext;
import javax.servlet.ServletContextEvent;
import javax.servlet.ServletContextListener;

import org.springframework.web.context.WebApplicationContext;
import org.springframework.web.context.support.WebApplicationContextUtils;

import com.sweii.dao.BaseServiceImpl;
import com.sweii.framework.helper.SpringHelper;
import com.sweii.service.impl.CommonServiceImpl;
/**
 * 
 *@author kfz
 *@date 2010-10-19
 * 
 **/
public class ServletContextLoaderListener implements ServletContextListener {
    public void contextInitialized(ServletContextEvent paramServletContextEvent) {
    	
    	ServletContext localServletContext = paramServletContextEvent.getServletContext();
	      SpringHelper.bindSessionContext(localServletContext);
	      WebApplicationContext wac = WebApplicationContextUtils.getRequiredWebApplicationContext(localServletContext);
	      CommonServiceImpl service=(CommonServiceImpl)wac.getBean("commonService");
	      service.getServer();
    }
    public void contextDestroyed(ServletContextEvent paramServletContextEvent) {
    }
}
