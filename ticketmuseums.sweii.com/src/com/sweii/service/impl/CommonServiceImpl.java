package com.sweii.service.impl;
import java.io.File;
import java.io.IOException;
import java.lang.annotation.Annotation;
import java.lang.reflect.Field;
import java.lang.reflect.Method;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.regex.Pattern;

import org.apache.struts2.ServletActionContext;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import com.sweii.bean.Condition;
import com.sweii.dao.BaseServiceImpl;
import com.sweii.dao.IBaseDao;
import com.sweii.framework.utility.DateUtil;
import com.sweii.service.CommonService;
import com.sweii.util.PageUtil;
import com.sweii.vo.BakDatabase;
import com.sweii.vo.Code;
import com.sweii.vo.Setting;
/**
 * 
 * @author duncan
 * @createTime 2009-11-24
 * @version 1.0
 */
@Service("commonService")
public class CommonServiceImpl extends BaseServiceImpl implements CommonService {
    protected static Map<String, List<Code>> codes = new HashMap<String, List<Code>>();// 数据字典
    protected static Map<Integer, String> branchs = new HashMap<Integer, String>();// 缓存分支机构
    public static final Pattern PatternPropField = Pattern.compile("\\$\\{(\\w|.+?)\\}");
    private Setting setting=null;
    public CommonServiceImpl() {
    }
    /**
     * 不分页查询所有实体
     * @param entity
     * @param orderField
     * @param order
     * @return
     * @author kfz
     * @createTime 2011-4-1
     */
    public List queryEntityList(Object entity, String orderField, String order) {
	List list = new ArrayList();
	if (entity == null) {
	    return list;
	}
	List params = new ArrayList();//引用传递,查询参数
	String hql = genQueryHQl(entity, orderField, order, params);
	list = this.codeDao.findEntityList(hql, params.toArray());
	return list;
    }
    /**
     * 分页查询
     * @author duncan
     * @createTime 2011-1-28
     * @version 1.0
     */
    public PageUtil queryEntityPage(Object entity, String orderField, String order, int pageNo, int pageSize) throws Throwable {
	if (entity == null) {
	    return new PageUtil();
	}
	String entityName = entity.getClass().getSimpleName();
	String serviceName = entityName.substring(0, 1).toLowerCase() + entityName.substring(1) + "Service";
	List params = new ArrayList();//引用传递,查询参数
	
	this.invokeService(serviceName, "beforeQuery" + entityName, new Object[] { entity, "", params.toArray() });//执行之前调用
	String hql = genQueryHQl(entity, orderField, order, params);
	PageUtil pageUtil = this.codeDao.pagedQuery(hql, pageNo, pageSize, params.toArray());	
	this.getRequest().setAttribute("resultPage", pageUtil);
	this.invokeService(serviceName, "afterQuery" + entityName, new Object[] { entity, hql, params.toArray() });//执行之后调用
	return pageUtil;
    }
    /**
     * 生成列表查询语句
     * @param entity
     * @param orderField
     * @param order 
     * @return
     * @author duncan
     * @createTime 2011-4-1
     */
    private String genQueryHQl(Object entity, String orderField, String order, List params) {
	StringBuffer hql = new StringBuffer();
	hql.append("from " + entity.getClass().getSimpleName() + " as e where 1=1");
	for (Method method : entity.getClass().getMethods()) {
	    if (method.getName().startsWith("get") && !method.getName().equals("getClass")) {
		try {
		    Object obj = method.invoke(entity);
		    if (obj == null) {
			continue;
		    }
		    String annotationName = "";
		    for (Annotation a : method.getDeclaredAnnotations()) {
			annotationName = a.annotationType().getSimpleName();
		    }
		    String name = method.getName().substring(3);
		    name = name.substring(0, 1).toLowerCase() + name.substring(1);
		    if (obj != null && !annotationName.equals("Transient")) {
			String type = obj.getClass().getName();
			if (type.equals("java.util.HashSet")) {
			    break;
			} else if (type.equals("java.lang.String")) {//字符串类型，统一使用like
			    if (obj.toString().length() > 0) {
				hql.append(" and e." + name + " like ?");
				params.add("%" + obj + "%");
			    }
			} else if (type.indexOf(".vo.") > -1) {//关联实体查询
			    for (Method thod : obj.getClass().getMethods()) {
				if (thod.getName().startsWith("get") && !thod.getName().equals("getClass")) {
				    Object obj1 = thod.invoke(obj);
				    if (obj1 == null) {
					continue;
				    }
				    type = obj1.getClass().getName();
				    if (type.indexOf(".vo.") > -1) {//实体关系
					String subName = thod.getName().substring(3);
					subName = subName.substring(0, 1).toLowerCase() + subName.substring(1);
					for (Method thod2 : obj1.getClass().getMethods()) {
					    if (thod2.getName().startsWith("get") && !thod2.getName().equals("getClass")) {
						Object obj2 = thod2.invoke(obj1);
						if (obj2 == null) {
						    continue;
						}
						annotationName = "";
						for (Annotation a : thod2.getDeclaredAnnotations()) {
						    annotationName = a.annotationType().getSimpleName();
						}
						String joinName = thod2.getName().substring(3);
						joinName = joinName.substring(0, 1).toLowerCase() + joinName.substring(1);
						if (obj2 != null && !annotationName.equals("Transient")) {
						    type = obj2.getClass().getName();
						    if (type.equals("java.lang.String")) {//字符串类型，统一使用like
							if (obj2.toString().length() > 0) {
							    hql.append(" and e." + name + "." + subName + "." + joinName + " like ?");
							    params.add("%" + obj2 + "%");
							}
						    } else if (!type.equals("java.util.List")) {
							hql.append(" and e." + name + "." + subName + "." + joinName + "=?");
							params.add(obj2);
						    }
						}
					    }
					}
				    } else {
					annotationName = "";
					for (Annotation a : thod.getDeclaredAnnotations()) {
					    annotationName = a.annotationType().getSimpleName();
					}
					String joinName = thod.getName().substring(3);
					joinName = joinName.substring(0, 1).toLowerCase() + joinName.substring(1);
					if (obj1 != null && !annotationName.equals("Transient")) {
					    type = obj1.getClass().getName();
					    if (type.equals("java.lang.String")) {//字符串类型，统一使用like
						if (obj1.toString().length() > 0) {
						    hql.append(" and e." + name + "." + joinName + " like ?");
						    params.add("%" + obj1 + "%");
						}
					    } else if (!type.equals("java.util.List")) {
						hql.append(" and e." + name + "." + joinName + "=?");
						params.add(obj1);
					    }
					}
				    }
				}
			    }
			} else if (!type.equals("java.util.List")) {
			    hql.append(" and e." + name + "=?");
			    params.add(obj);
			}
		    }
		} catch (Exception e) {
		    e.printStackTrace();
		}
	    }
	}
	String con = (String) ServletActionContext.getRequest().getAttribute("con");
	if (con != null && con.length() > 0) {
	    if (con.endsWith("loginId")) {
		con = con.substring(0, con.indexOf("loginId")) + this.getLoginAdminId();
	    }
	    hql.append(" and " + con);
	}
	Condition condition = (Condition) ServletActionContext.getRequest().getAttribute("condition");
	if (condition != null) {
	    if (condition.getStartTime() != null && condition.getTimeField() != null & condition.getEndTime() != null) {
		hql.append(" and e." + condition.getTimeField() + ">=?");
		hql.append(" and e." + condition.getTimeField() + "<=?");
		params.add(condition.getStartTime());
		condition.getEndTime().setDate(condition.getEndTime().getDate() + 1);
		params.add(condition.getEndTime());
	    }
	    if (condition.getStartTime() != null && condition.getTimeField() != null && condition.getEndTime() == null) {
		hql.append(" and e." + condition.getTimeField() + ">=?");
		hql.append(" and e." + condition.getTimeField() + "<=?");
		params.add(condition.getStartTime());
		Date endTime = new Date(condition.getStartTime().getTime());
		endTime.setSeconds(0);
		endTime.setMinutes(0);
		endTime.setHours(0);
		endTime.setDate(endTime.getDate() + 1);
		params.add(endTime);
	    }
	    if (condition.getStartFloat() != null && condition.getFloatField() != null && condition.getEndFloat() != null) {
		hql.append(" and e." + condition.getFloatField() + ">=?");
		hql.append(" and e." + condition.getFloatField() + "<=?");
		params.add(condition.getStartFloat());
		params.add(condition.getEndFloat());
	    }
	    if (condition.getStartFloat() != null && condition.getFloatField() != null && condition.getEndFloat() == null) {
		hql.append(" and e." + condition.getFloatField() + "=?");
		params.add(condition.getStartFloat());
	    }
	    if (condition.getStartFloat1() != null && condition.getFloatField1() != null && condition.getEndFloat1() != null) {
		hql.append(" and e." + condition.getFloatField1() + ">=?");
		hql.append(" and e." + condition.getFloatField1() + "<=?");
		params.add(condition.getStartFloat1());
		params.add(condition.getEndFloat1());
	    }
	    if (condition.getEndFloat1() == null && condition.getFloatField1() != null && condition.getStartFloat1() != null) {
		hql.append(" and e." + condition.getFloatField1() + "=?");
		params.add(condition.getStartFloat1());
	    }
	    if (condition.getStartInt() != null && condition.getIntField() != null && condition.getEndInt() != null) {
		hql.append(" and e." + condition.getIntField() + ">=?");
		hql.append(" and e." + condition.getIntField() + "<=?");
		params.add(condition.getStartInt());
		params.add(condition.getEndInt());
	    }
	    if (condition.getEndInt() == null && condition.getIntField() != null && condition.getStartInt() != null) {
		hql.append(" and e." + condition.getIntField() + "=?");
		params.add(condition.getStartInt());
	    }
	    if (condition.getStartInt1() != null && condition.getIntField1() != null && condition.getEndInt1() != null) {
		hql.append(" and e." + condition.getIntField1() + ">=?");
		hql.append(" and e." + condition.getIntField1() + "<=?");
		params.add(condition.getStartInt1());
		params.add(condition.getEndInt1());
	    }
	    if (condition.getEndInt1() == null && condition.getIntField1() != null && condition.getStartInt1() != null) {
		hql.append(" and e." + condition.getIntField1() + "=?");
		params.add(condition.getStartInt1());
	    }
	    if (condition.getStartDouble() != null && condition.getDoubleField() != null && condition.getEndDouble() != null) {
		hql.append(" and e." + condition.getDoubleField() + ">=?");
		hql.append(" and e." + condition.getDoubleField() + "<=?");
		params.add(condition.getStartDouble());
		params.add(condition.getEndDouble());
	    }
	    if (condition.getEndDouble() == null && condition.getDoubleField() != null && condition.getStartDouble() != null) {
		hql.append(" and e." + condition.getDoubleField() + "=?");
		params.add(condition.getStartDouble());
	    }
	}
	if (orderField != null && order != null) {
	    hql.append(" order by e." + orderField + " " + order);
	} else {
	    hql.append(" order by e.id desc");
	}
	//System.out.println("queryHQL:" + hql.toString());
	return hql.toString();
    }
    /**
     * 新建保存实体
     * @author duncan
     * @createTime 2011-1-28
     * @version 1.0
     */
    @Transactional(readOnly = false, propagation = Propagation.REQUIRED)
    public void addEntity(Object entity) throws Throwable {
	String entityName = entity.getClass().getSimpleName();
	String serviceName = entityName.substring(0, 1).toLowerCase() + entityName.substring(1) + "Service";
	this.invokeService(serviceName, "beforeAdd" + entityName, new Object[] { entity });//执行之前调用
	this.codeDao.saveEntity(entity);
	this.invokeService(serviceName, "afterAdd" + entityName, new Object[] { entity });//执行之后调用
    }
    /**
     * 新建保存实体，一对多关系
     * @author duncan
     * @createTime 2011-2-14
     * @version 1.0
     */
    @Transactional(readOnly = false, propagation = Propagation.REQUIRED)
    public void moreAddEntity(Object entity, List list) throws Throwable {
	String entityName = entity.getClass().getSimpleName();
	String serviceName = entityName.substring(0, 1).toLowerCase() + entityName.substring(1) + "Service";
	this.invokeService(serviceName, "beforeAdd" + entityName, new Object[] { entity, list });//执行之前调用
	this.codeDao.saveEntity(entity);
	String name = entity.getClass().getSimpleName();
	for (Object object : list) {
	    for (Method method : object.getClass().getMethods()) {
		if (method.getName().equals("set" + name)) {
		    method.invoke(object, entity);
		} else if (method.getName().startsWith("get") && !method.getName().equals("getClass") && method.getReturnType().getName().indexOf(".vo.") > -1) {
		    Object obj = method.invoke(object);
		    if (obj != null) {
			Object id = obj.getClass().getMethod("getId").invoke(obj);
			if (id == null) {
			    this.codeDao.saveEntity(obj);
			}
		    }
		}
	    }
	    Integer id = (Integer) object.getClass().getMethod("getId").invoke(object);
	    if (id == null) {//新建
		this.codeDao.saveEntity(object);
	    } else {//修改关联
		Object subEntity = this.codeDao.findObjectEntiry("from " + object.getClass().getSimpleName() + " where id=?", id);
		if (subEntity != null) {
		    subEntity.getClass().getMethod("set" + name, entity.getClass()).invoke(subEntity, entity);//关联
		}
	    }
	}
	this.invokeService(serviceName, "afterAdd" + entityName, new Object[] { entity, list });//执行之后调用
    }
    /**
     * 修改实体信息
     * @param Object entity 实体类
     * @param fields 需要更新的属性名
     * @author duncan
     * @createTime 2011-1-28
     * @version 1.0
     */
    @Transactional(readOnly = false, propagation = Propagation.REQUIRED)
    public void editEntity(Object entity, List<String> fields) throws Throwable {
	String entityName = entity.getClass().getSimpleName();
	String serviceName = entityName.substring(0, 1).toLowerCase() + entityName.substring(1) + "Service";
	this.invokeService(serviceName, "beforeEdit" + entityName, new Object[] { entity, fields });//执行之前调用
	Integer id = (Integer) entity.getClass().getMethod("getId", null).invoke(entity, null);
	Object en = this.codeDao.findObjectEntiry("from " + entity.getClass().getSimpleName() + " where id=?", id);
	if (en != null) {
	    for (Method method : entity.getClass().getMethods()) {
		if (method.getName().startsWith("get") && !method.getName().equals("getClass")) {
		    String name = method.getName().substring(3);
		    name = name.substring(0, 1).toLowerCase() + name.substring(1);
		    Object obj = method.invoke(entity);
		    if (fields.contains(name)) {
			if (obj != null) {//不等于null时直接修改
			    en.getClass().getMethod("set" + name.substring(0, 1).toUpperCase() + name.substring(1), obj.getClass()).invoke(en, obj);//修改值
			} else {//等于null时需要通过get的方法获到类型
			    Class c = en.getClass().getMethod("get" + name.substring(0, 1).toUpperCase() + name.substring(1)).getReturnType();
			    en.getClass().getMethod("set" + name.substring(0, 1).toUpperCase() + name.substring(1), c).invoke(en, obj);//修改值null
			}
		    } else if (obj != null && obj.getClass().getName().indexOf(".vo.") > -1) {
			if (fields.contains(name + ".id")) {
			    en.getClass().getMethod("set" + name.substring(0, 1).toUpperCase() + name.substring(1), obj.getClass()).invoke(en, obj);
			}
		    }
		}
	    }
	}
	this.invokeService(serviceName, "afterEdit" + entityName, new Object[] { en, fields });//执行之前调用
    }
    /**
     * 修改实体
     * @author duncan
     * @createTime 2011-2-16
     * @version 1.0
     */
    @Transactional(readOnly = false, propagation = Propagation.REQUIRED)
    public void moreEditEntity(Object entity, List list, List<String> fields, String joinFields) throws Throwable {
	String entityName = entity.getClass().getSimpleName();
	String serviceName = entityName.substring(0, 1).toLowerCase() + entityName.substring(1) + "Service";
	Object[] objects = new Object[] { entity, list, fields, joinFields };
	this.invokeService(serviceName, "beforeEdit" + entityName, objects);//执行之前调用
	Integer id = (Integer) entity.getClass().getMethod("getId", null).invoke(entity, null);
	Object en = this.codeDao.findObjectEntiry("from " + entityName + " where id=?", id);
	if (en != null) {
	    for (Method method : entity.getClass().getMethods()) {
		if (method.getName().startsWith("get") && !method.getName().equals("getClass")) {
		    Object obj = method.invoke(entity);
		    String name = method.getName().substring(3);
		    name = name.substring(0, 1).toLowerCase() + name.substring(1);
		    if (fields.contains(name)) {
			if (obj != null) {//不等于null时直接修改
			    en.getClass().getMethod("set" + name.substring(0, 1).toUpperCase() + name.substring(1), obj.getClass()).invoke(en, obj);//修改值
			} else {//等于null时需要通过get的方法获到类型
			    Class c = en.getClass().getMethod("get" + name.substring(0, 1).toUpperCase() + name.substring(1)).getReturnType();
			    en.getClass().getMethod("set" + name.substring(0, 1).toUpperCase() + name.substring(1), c).invoke(en, obj);//修改值null
			}
		    } else if (obj != null && obj.getClass().getName().indexOf(".vo.") > -1) {
			if (fields.contains(name + ".id")) {
			    en.getClass().getMethod("set" + name.substring(0, 1).toUpperCase() + name.substring(1), obj.getClass()).invoke(en, obj);
			}
		    }
		}
	    }
	}
	if (list.size() > 0) {
	    List<String> subFields = new ArrayList<String>();
	    for (String field : joinFields.split(",")) {
		subFields.add(field);
	    }
	    List dbList = this.codeDao.findEntityList("from " + list.get(0).getClass().getSimpleName() + " where " + entityName.substring(0, 1).toLowerCase() + entityName.substring(1) + ".id=?", id);
	    List<Integer> rmIds = new ArrayList<Integer>();//删除的ID列表
	    List<Integer> ids = new ArrayList<Integer>();//ID列表
	    for (Object obj : dbList) {
		id = (Integer) obj.getClass().getMethod("getId").invoke(obj);
		ids.add(id);
	    }
	    for (Object obj : list) {
		id = (Integer) obj.getClass().getMethod("getId").invoke(obj);
		if (id != null) {
		    rmIds.add(id);
		}
	    }
	    ids.removeAll(rmIds);
	    for (Object object : list) {
		id = (Integer) object.getClass().getMethod("getId").invoke(object);
		if (id == null) {//新增记录，保存
		    for (Method method : object.getClass().getMethods()) {
			if (method.getName().equals("set" + entityName)) {
			    method.invoke(object, entity);
			} else if (method.getName().startsWith("get") && !method.getName().equals("getClass") && method.getReturnType().getName().indexOf(".vo.") > -1) {
			    Object obj = method.invoke(object);
			    if (obj != null) {
				Object idd = obj.getClass().getMethod("getId").invoke(obj);
				if (idd == null) {
				    this.codeDao.saveEntity(obj);
				}
			    }
			}
		    }
		    this.codeDao.saveEntity(object);
		} else {//修改对应列
		    Object sub = this.codeDao.findObjectEntiry("from " + object.getClass().getSimpleName() + " where id=?", id);
		    if (sub != null) {
			for (Method method : sub.getClass().getMethods()) {
			    if (method.getName().startsWith("get") && !method.getName().equals("getClass")) {
				String name = method.getName().substring(3);
				name = name.substring(0, 1).toLowerCase() + name.substring(1);
				Object obj = method.invoke(object);
				Object vo = sub.getClass().getMethod(method.getName()).invoke(sub);
				if (vo != null && obj != null && obj.getClass().getName().indexOf(".vo.") > -1) {
				    for (Method mod : obj.getClass().getMethods()) {
					if (mod.getName().startsWith("get") && !mod.getName().equals("getClass")) {
					    String subName = mod.getName().substring(3);
					    subName = subName.substring(0, 1).toLowerCase() + subName.substring(1);
					    Object subObj = mod.invoke(obj);
					    if (subFields.contains(name + "." + subName)) {
						if (subObj != null) {
						    vo.getClass().getMethod("set" + subName.substring(0, 1).toUpperCase() + subName.substring(1), subObj.getClass()).invoke(vo, subObj);//修改值
						} else {
						    Class c = obj.getClass().getMethod("get" + subName.substring(0, 1).toUpperCase() + subName.substring(1)).getReturnType();
						    vo.getClass().getMethod("set" + subName.substring(0, 1).toUpperCase() + subName.substring(1), c).invoke(vo, subObj);//修改值null
						}
					    }
					}
				    }
				} else if (subFields.contains(name)) {
				    if (obj != null) {//不等于null时直接修改
					sub.getClass().getMethod("set" + name.substring(0, 1).toUpperCase() + name.substring(1), obj.getClass()).invoke(sub, obj);//修改值
				    } else {//等于null时需要通过get的方法获到类型
					Class c = sub.getClass().getMethod("get" + name.substring(0, 1).toUpperCase() + name.substring(1)).getReturnType();
					sub.getClass().getMethod("set" + name.substring(0, 1).toUpperCase() + name.substring(1), c).invoke(sub, obj);//修改值null
				    }
				}
			    }
			}
		    }
		}
	    }
	    for (Integer delId : ids) {//删除子
		if (!entity.getClass().getSimpleName().equals("MakeTask")) {
		    this.codeDao.delete("delete from " + list.get(0).getClass().getSimpleName() + " where id=?", delId);
		}
	    }
	}
	this.invokeService(serviceName, "afterEdit" + entityName, new Object[] { entity, list, fields, joinFields });//执行之前调用
    }
    /**
     * 删除
     * @param String entity 实体名称
     * @param String joinEntity 级联删除的实体名称
     * @param ids 删除记录
     * @author duncan
     * @createTime 2011-1-28
     * @version 1.0
     */
    @Transactional(readOnly = false, propagation = Propagation.REQUIRED)
    public void deleteEntity(String entity, String joinEntity, List<Integer> ids) throws Throwable {
	String entityName = entity.toString();
	String serviceName = entityName.substring(0, 1).toLowerCase() + entityName.substring(1) + "Service";
	this.invokeService(serviceName, "beforeDelete" + entityName, new Object[] { entity, joinEntity, ids });//执行之前调用
	for (Integer id : ids) {//删除关联对象
	    if (joinEntity != null) {
		this.codeDao.delete("delete from " + joinEntity + " where " + entity.substring(0, 1).toLowerCase() + entity.substring(1) + ".id=?", id);
	    }
	    this.codeDao.delete("delete from " + entity + " where id=?", id);
	}
	this.invokeService(serviceName, "afterDelete" + entityName, new Object[] { entity, joinEntity, ids });//执行之前调用
    }
    /**
     * @param String entity 实体名称
     * @param String joinEntity 级联的实体名称
     * @param ids 记录
     * @author duncan
     * @createTime 2011-1-28
     * @version 1.0
     */
    @Transactional(readOnly = false, propagation = Propagation.REQUIRED)
    public void confirmEntity(String entity, List<Integer> ids) throws Throwable {
	String serviceName = entity.substring(0, 1).toLowerCase() + entity.substring(1) + "Service";
	this.invokeService(serviceName, "confirm" + entity, new Object[] { ids });//执行之前调用
    }
    /**
     * 修改列内容
     * @author duncan
     * @createTime 2011-2-22
     * @version 1.0
     */
    @Transactional(readOnly = false, propagation = Propagation.REQUIRED)
    public void changeEntity(String entity, List<String> fields, List<String> values, List<Integer> ids) throws Throwable {
	String entityName = entity;
	String serviceName = entityName.substring(0, 1).toLowerCase() + entityName.substring(1) + "Service";
	this.invokeService(serviceName, "beforeChange" + entityName, new Object[] { entity, fields, values, ids });//执行之前调用
	for (Integer id : ids) {
	    Object object = this.codeDao.findObjectEntiry("from " + entity + " where id=?", id);
	    if (object != null) {
		for (int i = 0; i < fields.size(); i++) {
		    String field = fields.get(i);
		    String name = field.substring(0, 1).toUpperCase() + field.substring(1);
		    Method method = object.getClass().getMethod("get" + name);
		    if (method != null) {
			String value = values.get(i);
			if (value.equals("${day}")) {
			    value = DateUtil.toString(new Date(), "yyyy-MM-dd");
			} else if (value.equals("${dateTime}")) {
			    value = DateUtil.toString(new Date(), "yyyy-MM-dd HH:mm:ss");
			} else if (value.equals("${month}")) {
			    value = DateUtil.toString(new Date(), "yyyy-MM");
			}
			String typeName = method.getReturnType().getSimpleName();
			Object v = null;
			if (typeName.equals("String")) {
			    v = value;
			} else if (typeName.equals("Integer")) {
			    v = Integer.valueOf(value);
			} else if (typeName.equals("Float")) {
			    v = Float.valueOf(value);
			} else if (typeName.equals("Double")) {
			    v = Double.valueOf(value);
			} else if (typeName.equals("Short")) {
			    v = Short.valueOf(value);
			} else if (typeName.equals("Date")) {
			    if (value.length() == 7) {
				System.out.println("$month");
				v = DateUtil.parse(value, "yyyy-MM");
			    } else if (value.length() == 10) {
				System.out.println("$day");
				v = DateUtil.parse(value, "yyyy-MM-dd");
			    } else {
				System.out.println("$dayTime");
				v = DateUtil.parse(value, "yyyy-MM-dd HH:mm:ss");
			    }
			}
			if (v != null) {
			    object.getClass().getMethod("set" + name, method.getReturnType()).invoke(object, v);//修改列  
			}
		    }
		}
	    }
	}
	this.invokeService(serviceName, "afterChange" + entityName, new Object[] { entity, fields, values, ids });//执行之前调用
	if(entity.equals("Setting")){
	    this.setting=this.settingDao.getById(1);
	}
    }
    /**
     * 通过ID查询实体
     * @author duncan
     * @createTime 2011-2-16
     * @version 1.0
     */
    public Object queryEntityById(String entity, Integer id) {
	return this.codeDao.findObjectEntiry("from " + entity + " where id=?", id);
    }
    /**
     * 通过ID查询关联实体列表
     * @author duncan
     * @createTime 2011-2-16
     * @version 1.0
     */
    public List queryJoinEntityList(String entity, String joinEntity, Integer id) {
	return this.codeDao.findEntityList("from " + joinEntity + " where " + entity.substring(0, 1).toLowerCase() + entity.substring(1) + ".id=?", id);
    }
    /**
     * 重新更新内存数据字典
     * 
     * @author duncan
     * @createTime 2009-11-24
     * @version 1.0
     * @return void
     */
    public synchronized void reloadCode() {
	List<Code> pCodes = this.codeDao.find("from Code where parentId=0");// 查询所有父数据字典
	List<Code> cCodes = this.codeDao.find("from Code where parentId!=0");// 查询所有子父数据字典
	this.codeDao.evict(pCodes);// 取消session关联
	this.codeDao.evict(cCodes);// 取消session关联
	Map<Integer, String> idCode = new HashMap<Integer, String>();
	codes = new HashMap<String, List<Code>>();// 数据字典
	for (Code code : pCodes) {
	    codes.put(code.getCodeType(), new ArrayList<Code>());
	    idCode.put(code.getId(), code.getCodeType());
	}
	for (Code code : cCodes) {
	    String codeType = idCode.get(code.getParentId());
	    if (codeType != null) {
		List<Code> cs = codes.get(codeType);
		if (cs != null) {
		    cs.add(code);
		}
	    }
	}
    }
    /**
     * 通过数据字典父类代码CodeType查询子字典列表
     * 
     * @param String
     *            codeType 数据字典父类代码
     * @author duncan
     * @createTime 2009-11-25
     * @version 1.0
     * @return List<Code> 返回子列表,用于动态下位菜单选择数据
     */
    public List<Code> queryCodeList(String codeType) {
	if (this.codes.size() == 0) {
	    reloadCode();// 刷新缓存
	}
	List<Code> clist = this.codes.get(codeType);
	return clist;
    }
    /**
     * 通过数据字典父类代码CodeType查询子字典列表
     * 
     * @param String
     *            codeType 数据字典父类代码
     * @author duncan
     * @createTime 2009-11-25
     * @version 1.0
     * @return List<Code> 返回子列表,用于动态下位菜单选择数据
     */
    public List<Code> queryCodeList(String codeType, Integer type) {
	if (this.codes.size() == 0) {
	    reloadCode();// 刷新缓存
	}
	List<Code> clist = this.codes.get(codeType);
	if (type != null) {
	    List<Code> list = new ArrayList<Code>();
	    for (Code code : clist) {
		if (code.getType().intValue() == type.intValue()) {
		    list.add(code);
		}
	    }
	    return list;
	}
	return clist;
    }
    /**
     * 通过类型和值,查询数据字典名称
     * 
     * @author duncan
     * @createTime 2010-1-1
     * @version 1.0
     * @return String
     */
    public String queryCodeName(String codeType, String value) {
	if (this.codes.size() == 0) {
	    reloadCode();// 刷新缓存
	}
	List<Code> codes = this.codes.get(codeType);
	if (codes != null && codes.size() > 0) {
	    for (Code code : codes) {
		if (code.getCodeValue().equals(value)) {
		    return code.getCodeName();
		}
	    }
	}
	return "";
    }
    /**
     * 查询一级代码列表
     * 
     * @author duncan
     * @createTime 2010-1-1
     * @version 1.0
     * @return PageUtil<Code>
     */
    public PageUtil<Code> queryCodePage(Integer parentId, String searchKey, int pageNo, int pageSize) {
	if (searchKey == null || searchKey.length() == 0) {
	    String hql = "from Code where parentId=? and showType=1";
	    return codeDao.pagedQuery(hql, pageNo, pageSize, parentId);
	} else {
	    String hql = "from Code where parentId=? and (codeType like ? or codeName like ? )  and showType=1";
	    return codeDao.pagedQuery(hql, pageNo, pageSize, parentId, "%" + searchKey + "%", "%" + searchKey + "%");
	}
    }
    /**
     *添加代码
     * 
     * @author duncan
     * @createTime 2010-1-1
     * @version 1.0
     * @return void
     */
    public void doAddCode(Code vo) {
	if (vo.getParentId() != null) {
	    Code code = this.codeDao.findEntiry("from Code where parentId=? and codeType=?  order by codeValue desc", vo.getParentId(), vo.getCodeType());
	    if (code != null) {
		vo.setCodeType(code.getCodeType());
		vo.setShowType(code.getShowType());
		Integer value = Integer.valueOf(code.getCodeValue()).intValue() + 1;
		vo.setCodeValue(value.toString());
	    } else {
		code = this.codeDao.findEntiry("from Code where id=? order by codeValue desc", vo.getParentId());
		if (code != null) {
		    vo.setCodeType(code.getCodeType());
		    vo.setShowType(code.getShowType());
		    // vo.setShowType("1");//默认显示
		} else {
		    vo.setShowType(1);
		}
	    }
	}
	codeDao.save(vo);
	this.codeDao.commit();
	reloadCode();// 刷新缓存
    }
    /**
     * 修改代码
     * 
     * @author duncan
     * @createTime 2010-1-1
     * @version 1.0
     * @return void
     */
    public void doEditCode(Code code) {
	Code c = codeDao.getById(code.getId());
	if (c != null) {
	    c.setCodeName(code.getCodeName());
	}
	this.codeDao.commit();
	reloadCode();// 刷新缓存
    }
    /**
     * 删除代码,如果是父类,则删除所有子类
     * 
     * @author duncan
     * @createTime 2010-1-1
     * @version 1.0
     * @return void
     */
    public void doDeleteCode(Integer[] ids) {
	for (Integer id : ids) {
	    Code code = codeDao.getById(id);
	    if (code != null) {
		if (code.getParentId() == 0) {
		    codeDao.delete("delete from Code where parentId=?", code.getId());
		}
		codeDao.delete(code);
	    }
	}
	this.codeDao.commit();
	reloadCode();// 刷新缓存
    }
    /**
     * 分页查询代码列表
     * 
     * @author duncan
     * @createTime 2010-1-1
     * @version 1.0
     * @return PageUtil<Code>
     */
    public PageUtil<Code> queryCodePage(int pageNo, int pageSize) {
	String hql = "from Code where showType=1";
	return codeDao.pagedQuery(hql, pageNo, pageSize);
    }
    /**
     * 
     * @author duncan
     * @createTime 2010-8-22
     * @version 1.0
     */
    @Transactional(readOnly = false, propagation = Propagation.REQUIRED)
    public void editEntity(Integer id, String entity, String field, String value, String javaType, String type, String format) throws Throwable {
	if (id != null && entity != null && field != null) {
	    String hql = "from " + entity + " where id=?";
	    Object object = this.codeDao.findObjectEntiry(hql, id);
	    String entityName = entity;
	    String serviceName = entityName.substring(0, 1).toLowerCase() + entityName.substring(1) + "Service";
	    boolean result = this.invokeService(serviceName, "beforeEdit" + field.substring(0, 1).toUpperCase() + field.substring(1), new Object[] { object, value });//执行之前调用
	    if (!result) {
		return;
	    }
	    if (field.length() > 0) {
		field = field.toUpperCase().substring(0, 1) + field.substring(1);
	    }
	    if (object != null) {
		if (format == null) {
		    format = "yyyy-MM-dd";
		}
		if (javaType == null) {
		    javaType = "String";
		}
		if (javaType.equals("String") || javaType.equals("string")) {
		    Method m = object.getClass().getMethod("set" + field, String.class);
		    m.invoke(object, value);
		} else if (javaType.equals("int") || javaType.equals("Integer") || javaType.equals("integer")) {
		    Method m = object.getClass().getMethod("set" + field, Integer.class);
		    m.invoke(object, Integer.valueOf(value));
		} else if (javaType.equals("Date") || javaType.equals("date")) {
		    Method m = object.getClass().getMethod("set" + field, Date.class);
		    SimpleDateFormat dateFormat = new SimpleDateFormat(format);
		    Date time = dateFormat.parse(value);
		    m.invoke(object, time);
		} else if (javaType.equals("Float") || javaType.equals("float")) {
		    Method m = object.getClass().getMethod("set" + field, Float.class);
		    m.invoke(object, Float.valueOf(value));
		} else if (javaType.equals("Long") || javaType.equals("long")) {
		    Method m = object.getClass().getMethod("set" + field, Float.class);
		    m.invoke(object, Float.valueOf(value));
		} else if (javaType.equals("Double") || javaType.equals("double")) {
		    Method m = object.getClass().getMethod("set" + field, Double.class);
		    m.invoke(object, Double.valueOf(value));
		} else if (javaType.equals("Short") || javaType.equals("short")) {
		    Method m = object.getClass().getMethod("set" + field, Short.class);
		    m.invoke(object, Short.valueOf(value));
		}
	    }
	    this.invokeService(serviceName, "afterEdit" + field.substring(0, 1).toUpperCase() + field.substring(1), new Object[] { object, value });//执行之前调用
	}
    }
    public IBaseDao<Code, Integer> getCodeDao() {
	return codeDao;
    }
    public void setCodeDao(IBaseDao<Code, Integer> codeDao) {
	this.codeDao = codeDao;
    }
    public void deleteHoliday(Integer id) {
	// TODO Auto-generated method stub
    }
    /**
     * 通过分支机构名称
     * 
     * @author duncan
     * @createTime 2010-1-1
     * @version 1.0
     * @return String
     */
    public String queryBranchName(Integer id) {
	if (this.branchs.size() == 0) {
	    reloadCode();// 刷新缓存
	}
	if (branchs.get(id) != null) {
	    return branchs.get(id);
	}
	return "";
    }
    public List<Code> queryCodeListByValue(String codeType, String values) {
	List<Code> codeList = queryCodeList(codeType);
	List<Code> newList = new ArrayList<Code>();
	if (values != null) {
	    String[] split = values.split(",");
	    for (String value : split) {
		for (Code code : codeList) {
		    if (value.equals(code.getCodeValue())) {
			newList.add(code);
			break;
		    }
		}
	    }
	} else {
	    newList = codeList;
	}
	return newList;
    }
    /**
     * 更改status为1
     */
    @Transactional(readOnly = false, propagation = Propagation.REQUIRED)
    public void confirmEntity(Object entity, List<Integer> ids) {
	String idsStr = "";
	for (int i = 0; i < ids.size(); i++) {
	    if (i != 0) {
		idsStr += ",";
	    }
	    idsStr += ids.get(i);
	}
	try {
	    Integer id = (Integer) entity.getClass().getMethod("getId", null).invoke(entity, null);
	    List list = this.codeDao.findEntityList("from " + entity.getClass().getSimpleName() + " where id in(" + idsStr + ")");
	    Object en = null;
	    if (en != null) {
		for (Method method : entity.getClass().getMethods()) {
		    if (method.getName().startsWith("get") && method.getName().equals("getStatus")) {
			try {
			    Object obj = method.invoke(entity);
			    String name = method.getName().substring(3);
			    name = name.substring(0, 1).toLowerCase() + name.substring(1);
			    if (obj != null && name.equals("status")) {
				String type = obj.getClass().getSimpleName();
				if (type.equals("String")) {//字符串类型，统一使用like
				    en.getClass().getMethod("set" + name.substring(0, 1).toUpperCase() + name.substring(1), String.class).invoke(en, obj);//修改值
				} else if (type.equals("Date")) {
				    en.getClass().getMethod("set" + name.substring(0, 1).toUpperCase() + name.substring(1), Date.class).invoke(en, obj);//修改值
				} else if (type.equals("Integer")) {
				    en.getClass().getMethod("set" + name.substring(0, 1).toUpperCase() + name.substring(1), Integer.class).invoke(en, obj);//修改值
				} else if (type.equals("Float")) {
				    en.getClass().getMethod("set" + name.substring(0, 1).toUpperCase() + name.substring(1), Float.class).invoke(en, obj);//修改值
				} else if (type.equals("Double")) {
				    en.getClass().getMethod("set" + name.substring(0, 1).toUpperCase() + name.substring(1), Double.class).invoke(en, obj);//修改值
				} else if (type.equals("Short")) {
				    en.getClass().getMethod("set" + name.substring(0, 1).toUpperCase() + name.substring(1), Short.class).invoke(en, obj);//修改值
				}
			    }
			} catch (Exception e) {
			    e.printStackTrace();
			}
		    }
		}
	    }
	} catch (Exception e) {
	    e.printStackTrace();
	}
    }
    /**
     * 调用Service方法
     * @serviceName 接口名称
     * @methodName 调用方法名
     * @Object[] args 传递参数
     * @author duncan
     * @createTime 2011-2-19
     * @version 1.0
     */
    @Transactional(readOnly = false, propagation = Propagation.REQUIRED)
    protected boolean invokeService(String serviceName, String methodName, Object[] args) throws Throwable {
	for (Field field : this.getClass().getSuperclass().getDeclaredFields()) {//查询父类BaseService对应的service
	    if (field.getName().equals(serviceName)) {
		field.setAccessible(true);
		Object service = field.get(this);
		if (service != null) {
		    for (Method method : service.getClass().getMethods()) {
			if (method.getName().equals(methodName)) {//
			    if (method.getParameterTypes().length != args.length) {
				System.out.println(serviceName + "接口的" + methodName + "(参数长度必须为" + args.length + ")");
				return false;
			    }
			    Object object = method.invoke(service, args);//调用
			    if (object != null && object instanceof Boolean) {
				return (Boolean) object;//调用 
			    }
			}
		    }
		}
	    }
	}
	return true;
    }
    public boolean backup(Integer type) throws Exception {
	Setting setting = this.settingDao.getById(1);
	SimpleDateFormat dateFormat = new SimpleDateFormat("yyyyMMddHHmmss");
	String fileName = dateFormat.format(new Date()) + ".sql";
	try {
	    File file = new File(setting.getBakPath());
	    if (!file.isDirectory()) {
		file.mkdirs();
	    }
	    String str = "mysqldump -udengddq -p111111 --opt  ticket_active > " + setting.getBakPath() + "/" + fileName;
	    Runtime rt = Runtime.getRuntime();
	    Process p = rt.exec(new String[] { "cmd", "/C", str });
	    p.waitFor();
	    BakDatabase base = new BakDatabase();
	    base.setBakTime(new Date());
	    base.setFileName(fileName);
	    base.setPath(setting.getBakPath());
	    base.setType(type);
	    file = new File(setting.getBakPath() + "/" + fileName);
	    if (file != null && file.length() > 0) {
		base.setFileSize(file.length() / 1024 + "kb");
		this.bakDatabaseDao.save(base);
		return true;
	    }
	} catch (IOException e) {
	    e.printStackTrace();
	}
	return false;
    }
    public Setting getSetting(){
	if(this.setting==null){
	    this.setting=this.settingDao.getById(1);
	}
	return this.setting;
    }
}
