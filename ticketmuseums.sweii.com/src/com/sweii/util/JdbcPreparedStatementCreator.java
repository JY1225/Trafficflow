package com.sweii.util;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;

import org.springframework.jdbc.core.PreparedStatementCreator;
import org.springframework.jdbc.core.SqlTypeValue;
import org.springframework.jdbc.core.StatementCreatorUtils;

public final class JdbcPreparedStatementCreator implements PreparedStatementCreator {
	String sql = null;
	Object[] params = null;

	public JdbcPreparedStatementCreator(String sql_string, Object[] parameters) {
		this.sql = sql_string;
		this.params = parameters;
	}

	public PreparedStatement createPreparedStatement(Connection connection) throws SQLException {
		PreparedStatement ps = connection.prepareStatement(sql);
		for (int i = 0; i < params.length; i++) {
			StatementCreatorUtils.setParameterValue(ps, i + 1, SqlTypeValue.TYPE_UNKNOWN, null, params[i]);
		}
		return ps;
	}

}