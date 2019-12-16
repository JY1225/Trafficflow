package com.sweii.util;


import org.hibernate.FlushMode;
import org.hibernate.Session;
import org.hibernate.SessionFactory;

import org.springframework.dao.DataAccessResourceFailureException;
import org.springframework.orm.hibernate3.SessionFactoryUtils;

import org.springframework.orm.hibernate3.support.OpenSessionInViewFilter;

public class MyOpenSessionInViewFilter extends OpenSessionInViewFilter {
	
	/**
	 * we do a different flushmode than in the codebase
	 * here
	 */
	protected Session getSession(SessionFactory sessionFactory)
			throws DataAccessResourceFailureException {
		Session session = SessionFactoryUtils.getSession(sessionFactory, true);
		session.setFlushMode(FlushMode.COMMIT);
		return session;
	}
	
	/**
	 * we do an explicit flush here just in case
	 * we do not have an automated flush
	 */
	protected void closeSession(Session session, SessionFactory factory) {
		try {
			session.flush();
		} catch (Exception e) {
		}
		super.closeSession(session, factory);
	}
	
}
