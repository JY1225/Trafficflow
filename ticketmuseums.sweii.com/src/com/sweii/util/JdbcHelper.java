package com.sweii.util;

import java.util.ArrayList;
import java.util.List;

import javax.sql.DataSource;

import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.PreparedStatementCreator;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.jdbc.support.KeyHolder;

/**
 * 
 * @author 于金平
 * @version 1.0
 * 功能说明：<BR/>
 * <BR/>
 * 根据springframework <a href="http://www.springframework.org" target="_blank">http://www.springframework.org</a> 框架中对于JDBC 3.0的封装类
 * 再次进行封装，其目的是能够更好的使用不同的数据源，方便数据库的切换。<BR/>
 * 
 */
public final class JdbcHelper {
	
	/**
	 * 根据指定的数据源创建一个新的 JdbcTemplate ,参考 springframework 1.2x中的JDBC章节
	 * @param ds 创建所需的数据源
	 * @return JdbcTemplate 返回一个JdbcTemplate的实例
	 */
	public static final JdbcTemplate createJdbcTemplate(final DataSource ds){
		return new JdbcTemplate(ds);
	}
	
	/**
	 * 根据指定的数据源和Native SQL 进行单表对象搜索，如果没有找到任何对象的话，将返回null.
	 * @param ds	搜索所要使用的数据源
	 * @param sql	搜索要使用的Native SQL
	 * @param params	SQL 中对应参数的值
	 * @param mapper	单表数据和JAVA实体对象之间的映射关系类
	 * @return	Object 返回实体对象，如果没有找到，就返回null
	 */
	public static final Object load(final DataSource ds,final String sql,final Object[] params,RowMapper mapper){
		List results = queryForList(ds,sql,params,mapper);
		if(results!=null && !results.isEmpty())
			return results.get(0);
		else
			return null;
	}
	

	/**
	 * 根据指定的Native SQL 进行实体对象的查询，并获得一个列表。
	 * @param ds	搜索所要使用的数据源
	 * @param sql	搜索要使用的Native SQL
	 * @param params	SQL 中对应参数的值
	 * @param mapper	单表数据和JAVA实体对象之间的映射关系类
	 * @return	List 如果没有找到任何对象，那么返回一个 new ArrayList();
	 */
	public static final List queryForList(final DataSource ds,final String sql,final Object[] params,RowMapper mapper){
		JdbcTemplate jt = createJdbcTemplate(ds);
		if(mapper!=null)
			return jt.query(sql, params,mapper);
		else
			return jt.queryForList(sql,params);
	}
	/**
	 * 根据指定的Native SQL 进行实体对象的查询，并获得一个列表。
	 * @param ds	搜索所要使用的数据源
	 * @param sql	搜索要使用的Native SQL
	 * @param params	SQL 中对应参数的值
	 * @param mapper	单表数据和JAVA实体对象之间的映射关系类
	 * @return	List 如果没有找到任何对象，那么返回一个 new ArrayList();
	 */
	public static final List queryForList(final DataSource ds,final String sql, Object[] values, RowMapper rowMapper,int pageNo,int pageSize) {
		String paged_sql = sql;
		int start=(pageNo-1)*pageSize;
		int end  =pageNo*pageSize;
		start = start<=0?0:start;
		end   = pageSize;
		Integer firstResult = new Integer(start);
		Integer maxResults = new Integer(end);
		Object[] params = null;
			paged_sql =sql +" limit ?,?";
			if (values == null) {
				params = new Object[]{firstResult, maxResults};
			} else {
				int index = 0;
				params = new Object[values.length + 2];
				for (index = 0; index < values.length; index++) {
					params[index] = values[index];
				}
				params[index + 0] = firstResult;
				params[index + 1] = maxResults;
			}
		List result = JdbcHelper.queryForList(ds,paged_sql, params, rowMapper);
		if (result == null)
			result = new ArrayList();
		return result;
	}
	/**
	 * 根据指定的Native SQL 进行实体对象的查询，并获得一个列表。
	 * @param ds	搜索所要使用的数据源
	 * @param sql	搜索要使用的Native SQL
	 * @param params	SQL 中对应参数的值
	 * @param mapper	单表数据和JAVA实体对象之间的映射关系类
	 * @return	List 如果没有找到任何对象，那么返回一个 new ArrayList();
	 */
	public static final int queryForInt(final DataSource ds,final String sql,final Object[] params){
		JdbcTemplate jt = createJdbcTemplate(ds);
		return jt.queryForInt(sql,params);
	}
	/**
	 * 根据指定的数据源和Native SQL,进行数据库的单条数据的 INSERT 操作
	 * @param ds	搜索所要使用的数据源
	 * @param sql	搜索要使用的Native SQL
	 * @param params	SQL 中对应参数的值
	 * @return Integer 如果插入数据成功，将返回该数据的主键值(Integer 类型),否则将返回null.
	 */
	public static final Integer save(final DataSource ds,final String sql,final Object[] params){
		JdbcTemplate jt = createJdbcTemplate(ds);
		PreparedStatementCreator psc = new JdbcPreparedStatementCreator(sql,params);
		KeyHolder k = new JdbcKeyHolder();
		jt.update(psc, k);
		if(k.getKey()!=null)
			return new Integer(k.getKey().intValue());
		else
			return null;
	}
	
	/**
	 * 根据指定的数据源和Native SQL,进行数据库数据的 UPDATE 或 EXECUTE 操作
	 * @param ds	搜索所要使用的数据源
	 * @param sql	搜索要使用的Native SQL
	 * @param params	SQL 中对应参数的值
	 * @return int 返回该Native SQL语句所影响的数据的行数
	 */
	public static final int update(final DataSource ds,final String sql,final Object[] params){
		JdbcTemplate jt = createJdbcTemplate(ds);
		return jt.update(sql, params);
	}
	/**
	 * 得到统计的Native SQL字符串
	 * @param sql
	 * @return
	 */
	private static final String getCountSql(String sql){
		String s = sql.toLowerCase();
		int index = s.indexOf(" from ");
		if(-1 == index)
			throw new RuntimeException("Not a select sql string !");
		index = s.indexOf(" order ");
		String temp = sql;
		if(-1 != index){
			temp = s.substring(0, index);
		}
		s = "select count(*) as total from ( " + temp + " )temp_table_v";
		return s;
	}

}
