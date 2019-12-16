package com.sweii.dao;

import java.io.Serializable;
import java.util.Collection;
import java.util.HashMap;
import java.util.List;

import org.hibernate.Session;
import org.springframework.orm.hibernate3.HibernateTemplate;

import com.sweii.util.PageUtil;

/**
 * BaseDao接口类
 * 
 * @author duncan
 * @createTime 2009-11-24
 */
public interface IBaseDao<T, PK extends Serializable> {
    
	public Session openSession();
	/**
	 * 清空当前线程Session的缓存中所有持久化对象，从而及时释放它占用的内存空间
	 * 
	 * @author duncan
	 * @createTime 2009-11-24
	 */
	public void clear();

	/**
	 * 立即提交当前线程Session的操作,提交后不可rollback,如果需要rollback操作，
	 * 则在commit之前先写log，有需要时可根据log进行数据恢复。
	 * 
	 * @author duncan
	 * @createTime 2009-11-24
	 */
	public void commit();

	/**
	 *当前线程Session的操作立即与数据库同步更新,但未提交,可rollback
	 * 目的:可调用些方法控制Session缓存中的持久化对象过多,使用内存过大,以致造成系统性能下降,
	 * 调用flush()后，可调用evict()将持久化对象从Session缓存中删除，从而及时释放它占用的内存空间。
	 * 加载大量数据进行更新操作时,可使用此方法优化系统
	 * 
	 * @author duncan
	 * @lastEdit 2007-05-26
	 */
	public void flush();

	/**
	 * 立即执行查询延迟加载对象,支持集合操作
	 * 
	 * @param object
	 *            立即加载对象
	 * @author duncan
	 * @createTime 2009-11-24
	 */
	public void initialize(T entityObject);

	/**
	 * 从当前线程Session缓存中清除参数指定的持久化对象
	 * 
	 * @param object
	 *            持久化对象延迟加载对象
	 * @author duncan
	 * @createTime 2009-11-24
	 */
	public void evict(T entityObject);

	/**
	 * 从当前线程Session缓存中清除参数指定的持久化对象
	 * 
	 * @param entities
	 *            持久化对象延迟加载对象
	 * @author duncan
	 * @createTime 2009-11-24
	 */
	public void evict(Collection<T> entities);

	/**
	 * 判断Session缓存中是否存在参数指定的持久化对象 用途：可以于判断是否已加载（即是否使用过initialize()加载过该对象）
	 * 
	 * @param object
	 *            持久化对象
	 * @author duncan
	 * @createTime 2009-11-24
	 * @return boolean true表示存在,false表示不存在
	 */
	public boolean contain(T entityObject);

	/**
	 * 通过ID加载持久化对象，执行过程：
	 * 将ID作为Key查询当前线程Session缓存(一级缓存）是否命中,是则从session缓存中直接返回该持久化对象,
	 * 否则查询二级缓存中的"类缓存"是否命中，命中则从二级缓存中返回该持久化对象，不命中则发送一条select * from table where
	 * id=? 的sql语句加载该持久化对象，如果数据库没有对应ID的数据记录，则返回null，如果存在记录则根据配置文件信息加载持久化对象，
	 * 并将该对象放入session 缓存，如果配置了"类缓存"，并将该对象放入"类缓存"中，供iterator()方法使用和"查询缓存"使用。
	 * 
	 * @param id
	 *            类ID
	 * @author duncan
	 * @createTime 2009-11-24
	 * @return T 返回持久化对象,可能为null值
	 */
	public T getById(PK id);

	/**
	 * 通过ID加载持久化对象，执行过程与getByPk()相似，唯一不同的就是当数据库没有对应ID的记录时，getByPk()返回null值，而
	 * loadByPk()向外抛出异常。
	 * 
	 * @param id
	 *            类ID
	 * @author duncan
	 * @createTime 2009-11-24
	 * @return object 返回持久化对象,不可能为null值
	 */
	public T load(PK id);

	/**
	 * 获取实体类型的全部对象列表
	 * 
	 * @author duncan
	 * @createTime 2009-11-24
	 * @version 1.0
	 * @return List<T>
	 */
	public List<T> getAll();

	/**
	 * 向数据库持久化对象（即向数据库添加一条记录） 如果对象已在本session中持久化了,不做任何事。<br>
	 * 如果另一个seesion拥有相同的持久化标识,抛出异常。<br>
	 * 如果没有持久化标识属性,调用save()。<br>
	 * 如果持久化标识表明是一个新的实例化对象,调用save()。<br>
	 * 如果是附带版本信息的(version或timestamp)且版本属性表明为新的实例化对象就save()。<br>
	 * 否则调用update()重新关联托管对象
	 * 
	 * @param object
	 *            游离对象
	 * @author duncan
	 * @createTime 2009-11-24
	 * 
	 */
	public void save(T entityObject);
	/**
	 * 
	 * @author duncan
	 * @createTime 2011-1-28
	 * @version 1.0
	 */
	public void saveEntity(Object entity);

	/**
	 * 批量保存实体,执行saveOrUpdate方法
	 * 
	 * @param coll
	 *            集合
	 * @author duncan
	 * @createTime 2009-11-24
	 */
	public void saveAll(Collection<T> coll);

	/**
	 * 向数据库持久化对象或更新记录,操作过程:
	 * 先判断entityObject对象ID是否为空，为空则执行与save()方法相同的操作（即向数据库添加一条记录,生成新的ID），如果ID不为空，
	 * 则发送一条select * from table where
	 * id=?的SQL语句加载该记录，如果不存在指定ID的记录，则执行与save()方法相同的操作（即向数据库添加一条记录,生成新的ID），
	 * 如果记录存在，则加载从数据库中加载持久化对象并与参数object的值对比,对值不同的属性生成更新SQL语句,并进行更新操作。
	 * 
	 * @param object
	 *            游离对象
	 * @author duncan
	 * @createTime 2009-11-24
	 * 
	 */
	public void saveOrUpdate(T entityObject);

	/**
	 * 批量更新数据记录,hql语句以?方式接受参数
	 * 
	 * @param hql
	 *            hibernate批量更新语句
	 * @param values
	 *            参数值
	 * @author duncan
	 * @createTime 2009-11-24
	 * 
	 */
	public void update(String hql, Object... values);

	/**
	 * 更新实体
	 * 
	 * @param entityObject
	 * @author lizhongren 2009-12-17 下午04:17:55
	 */
	public void update(T entityObject);
	/**
	 * 更新实体
	 * 
	 * @param entityObject
	 * @author lizhongren 2009-12-17 下午04:17:55
	 */
	public void updateEntity(Object entityObject);

	/**
	 * 通过ID删除对象
	 * 
	 * @param PK
	 *            id号
	 * @author duncan
	 * @createTime 2009-11-24
	 * 
	 */
	public void deleteById(PK id);

	/**
	 * 删除对象
	 * 
	 * @param T
	 *            持久对象
	 * @author duncan
	 * @createTime 2009-11-24
	 * 
	 */
	public void delete(T entityObject);

	/**
	 * 批量删除数据记录,hql语句以?方式接受参数
	 * 
	 * @param hql
	 *            hibernate批量删除语句,如delete Entity,则删除所有记录
	 * @param values
	 *            参数值
	 * @author duncan
	 * @createTime 2009-11-24
	 * 
	 */
	public void delete(String hql, Object... values);

	/**
	 * 删除多个实体
	 * 
	 * @param entities
	 * @author lizhongren 2009-12-20 上午11:10:42
	 */
	public void deleteAll(Collection<T> entities);

	/**
	 * 根据hql查询语句查询数据库并返回查询结果所包含的单个持久化对象（即是返回查询结果的第一个记录）,
	 * 直接使用HibernateTemplate的find函数. 成生的部分SQL语句：mysql为limit 0,1
	 * 
	 * @param hql
	 *            指定查询语句
	 * @author duncan
	 * @createTime 2009-11-24
	 * @return T 只返回查询结果第一条记录,不存在记录返回null
	 */
	public T findEntiry(String hql, Object... values);
	/**
	 * 根据hql查询语句查询数据库并返回查询结果所包含的单个持久化对象（即是返回查询结果的第一个记录）,
	 * 直接使用HibernateTemplate的find函数. 成生的部分SQL语句：mysql为limit 0,1
	 * 
	 * @param hql
	 *            指定查询语句
	 * @author duncan
	 * @createTime 2009-11-24
	 * @return T 只返回查询结果第一条记录,不存在记录返回null
	 */
	public Object findObjectEntiry(String hql, Object... values);

	/**
	 * 根据hql查询语句查询数据库并返回查询结果所包含的持久化对象集合,直接使用HibernateTemplate的find函数.
	 * 
	 * @param hql
	 *            指定查询语句
	 * @param params
	 *            参数值
	 * @author duncan
	 * @createTime 2009-11-24
	 * @return 返回查询结果包含的持久化对象集合
	 */
	public List<T> find(String hql, Object... values);
	/**
	 * 根据hql查询语句查询数据库并返回查询结果所包含的持久化对象集合,直接使用HibernateTemplate的find函数.
	 * 
	 * @param hql
	 *            指定查询语句
	 * @param params
	 *            参数值
	 * @author duncan
	 * @createTime 2009-11-24
	 * @return 返回查询结果包含的持久化对象集合
	 */
	public List findEntityList(String hql, Object... values);

	/**
	 * 根据hql查询语句查询数据库并返回查询结果所包含的持久化对象集合,并将查询结果集合放入"查询缓存",供下次查询时使用。
	 * 说明：使用此方法需要注意，对于经常更新的数据不要使用此方法，因为经常更新的数据，缓存数据就没有什么意思了，还会影响系统性能。
	 * 
	 * @param hql
	 *            指定查询语句
	 * @return 返回查询结果包含的持久化对象集合
	 * @author duncan
	 * @createTime 2009-11-24
	 * @return 返回查询结果包含的持久化对象集合
	 */
	public List<T> findByCache(String hql, Object... values);

	/**
	 * 分页查询,执行过程:先查询总数,再查询分页数据
	 * 
	 * @param countHql
	 *            计算数据总条数的hql语句(就是带count(*)的hql)
	 * @param hql
	 *            查询分页数据hql
	 * @param pageNo
	 *            第几页
	 * @param pageSize
	 *            每页显示数
	 * @param values
	 *            hql参数值,countHql和hql参数量要一致
	 * @author duncan
	 * @createTime 2009-11-24
	 * @return Page<T> 返回分页查询后的结果
	 */
	public PageUtil<T> pagedQuery(String countHql, String hql, int pageNo,
			int pageSize, Object... values);

	/**
	 * 查询分页数据
	 * 
	 * @param hql
	 *            查询分页数据hql
	 * @param pageNo
	 *            第几页
	 * @param pageSize
	 *            每页显示数
	 * @param values
	 *            hql参数值,countHql和hql参数量要一致
	 * @author duncan
	 * @createTime 2009-11-24
	 * @return Page<T> 返回分页查询后的结果
	 */
	public PageUtil<T> pagedQuery(String hql, int pageNo, int pageSize,
			Object... values);

	/**
	 * 分页查询,把结果保存在指定Bean中.
	 * 
	 * @param countHql
	 *            计算数据总条数的hql语句(就是带count(*)的hql)
	 * @param hql
	 *            查询结果hql
	 * @param pageNo
	 *            第几页
	 * @param pageSize
	 *            页面数量
	 * @param values
	 *            hql查询参数值
	 * @param clazz
	 *            需要转换的类 使用aliasToBean转换的类
	 * @return Page<Class>
	 */
	@SuppressWarnings("unchecked")
	public PageUtil pagedQuery(String countHql, String hql,
			java.lang.Class clazz, int pageNo, int pageSize, Object... values);

	/**
	 * 分页查询,把结果保存在指定Bean中.
	 * 
	 * @param countHql
	 *            计算数据总条数的hql语句(就是带count(*)的hql)
	 * @param hql
	 *            查询结果hql
	 * @param pageNo
	 *            第几页
	 * @param pageSize
	 *            页面数量
	 * @param values
	 *            hql查询参数值
	 * @param clazz
	 *            需要转换的类 使用aliasToBean转换的类
	 * @return Page<Class>
	 */
	@SuppressWarnings("unchecked")
	public PageUtil pagedQuery(String hql, java.lang.Class clazz, int pageNo,
			int pageSize, Object... values);

	/**
	 * 根椐hql语句查询总数
	 * 
	 * @param hql
	 *            指定查询语句
	 * @param values
	 *            hql参数值
	 * @return 返回hql查询结果总行数
	 * @author duncan
	 * @createTime 2009-11-24
	 */
	public int getCountByHQL(String hql, Object... values);

	/**
	 * 根据select 字段 hql 语句封装结果集到target对象中, 注意字段后一定要跟as 别名,同时别名在target对象中一定要存在
	 * 
	 * @param hql
	 *            hql查询语句
	 * @param target
	 *            指向结果set目标Bean属性中
	 * @param values
	 *            hql查询语句的参数
	 * @author duncan
	 * @createTime 2009-11-24
	 * @return List<Class> target
	 */
	@SuppressWarnings("unchecked")
	public List find(String hql, Class target, Object... values);

	/**
	 * 根据查询语句返回查询的第一个结果
	 * 
	 * @param hql
	 *            查询语句（满足HQL格式）
	 * @param values
	 * @return
	 * @author lizhongren 2009-12-17 下午04:26:33
	 */
	public T findFirstByQuery(final String hql, Object... values);

	/**
	 * 查找所有的记录
	 * 
	 * @return
	 * @author lizhongren 2009-12-18 上午12:35:57
	 */
	public List<T> findAll();

	/**
	 * 获取HibernateTemplate
	 * 
	 * @return
	 * @author lizhongren 2009-12-20 下午03:03:59
	 */
	public HibernateTemplate getMyHibernateTemplate();

	/**
	 * JDBC模板
	 * 
	 * @return
	 * @author lizhongren 2009-12-22 下午01:39:29
	 */
	public SimpleJdbcDao getSimpleJdbcDaoTemp();

	/**
	 * sql 分页查询
	 * 
	 * @param sql
	 * @param target
	 * @param pageNo
	 * @param pageSize
	 * @param values
	 * @return
	 * @author lizhongren 2009-12-23 下午02:05:09
	 */
	@SuppressWarnings("unchecked")
	public PageUtil pagedSQLQuery(String sql, Class target, int pageNo,
			int pageSize, Object... values);

	/**
	 * 主要解决sql的数据类型和Hibernate的封装 如test类型,bigInteger 类型
	 * 
	 * @param sql
	 * @param target
	 * @param types
	 *            要映射的字段和类型
	 * @param pageNo
	 * @param pageSize
	 * @param values
	 * @return
	 * @author duncan
	 * @return Page 2009-12-11下午12:36:13
	 */
	@SuppressWarnings("unchecked")
	public PageUtil pagedSQLQuery(String sql, Class target,
			HashMap<String, org.hibernate.type.NullableType> types, int pageNo,
			int pageSize, Object... values);

	/**
	 * 查询指定记录
	 * 
	 * @param hql
	 * @param pageNo
	 * @param pageSize
	 * @param values
	 * @return
	 * @author lizhongren 2010-1-8 上午12:06:54
	 */
	@SuppressWarnings("unchecked")
	public List queryLimit(String hql, int start, int limit, Object... values);

	/**
	 * 查询当前实体是否存在
	 * 
	 * @param id
	 * @return
	 * @author lizhongren 2010-2-11 上午10:27:57
	 */
	public boolean isExistEntity(Integer id);

	public Object merge(T entityObject);
}
