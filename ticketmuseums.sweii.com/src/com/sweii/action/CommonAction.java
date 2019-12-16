package com.sweii.action;
import java.lang.reflect.Method;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.apache.struts2.ServletActionContext;
import org.hibernate.exception.ConstraintViolationException;

import com.erican.auth.vo.Admin;
import com.sweii.bean.Condition;
import com.sweii.framework.annotation.Sweii;
import com.sweii.framework.helper.MD5Helper;
import com.sweii.framework.utility.ServiceException;
import com.sweii.util.ActionResponse;
import com.sweii.util.ArrayVo;
import com.sweii.util.JsonUtil;
import com.sweii.util.PageUtil;
/**
 * 通用处理Action
 * @author duncan
 * @createTime 2011-1-27
 * @version 1.0
 */
public class CommonAction extends CommonVo {
    private String message;//提示消息
    private String fields;//修改列名
    private String values;//修改列值
    private String joinEntity;//关联实体名
    private String path;//路径
    private String entity;//实体
    private String joinFields;//关联实体列
    private String format;//格式化
    private String orderField;//排序列
    private String order;//升降
    private String con;//查询条件,hql where 条件
    private String successMsg;//成功
    private String failureMsg;//失败
    private static List<String> entities = new ArrayList<String>();
    private String jsp;//
    private String url;
    private Integer count;
    private Condition condition;
    /**
     * 选择分页分页
     * @author duncan
     * @createTime 2011-1-28
     * @version 1.0
     */
    public String selectEntityPage() throws Throwable {
	if (this.getSelectSize() == 0) {
	    super.setPageSize(10);
	} else {
	    super.setPageSize(this.getSelectSize());
	}
	if (condition != null) {
	    this.getRequest().setAttribute("condition", condition);
	}
	String uri = this.getRequest().getRequestURI();
	String entity = uri.substring(uri.indexOf("select") + 6, uri.indexOf("Page"));
	PageUtil page = this.commonService.queryEntityPage(queryPathEntity(entity), orderField, order, super.getPageNo(), super.getPageSize());
	this.setDataGrid(page);
	if (this.entity == null || this.entity.length() == 0) {
	    this.responseText("<html><body>CommonVo.java类未定义实体：" + uri.substring(uri.indexOf("select") + 6, uri.indexOf(".do")) + "<body></html>");
	    return null;
	}
	if (jsp != null) {
	    return "jsp";
	} else {
	    return SUCCESS;
	}
    }
    /**
     * 查询实体分类
     * @author duncan
     * @createTime 2011-1-28
     * @version 1.0
     */
    public String queryEntityPage() throws Throwable {
    	
	String uri = this.getRequest().getRequestURI();
	String entity = uri.substring(uri.indexOf("query") + 5, uri.indexOf(".do"));
	if (condition != null) {
	    this.getRequest().setAttribute("condition", condition);
	}
	PageUtil page = this.commonService.queryEntityPage(queryPathEntity(entity), orderField, order, super.getPageNo(), super.getPageSize());
	this.setDataGrid(page);
	ServletActionContext.getRequest().setAttribute("con", con);
	if (this.entity == null || this.entity.length() == 0) {
	    this.responseText("<html><body>CommonVo.java类未定义实体：" + uri.substring(uri.indexOf("query") + 5, uri.indexOf(".do")) + "<body></html>");
	    return null;
	}
	if (jsp != null) {
	    return "jsp";
	} else {
	    return SUCCESS;
	}
    }
    /**
     * 不分页查询所以实体<BR>
     * 在request设置 名为 “entityList” 的List对象
     * @return
     * @author kfz
     * @createTime 2011-4-1
     */
    public String listEntity() {
	String uri = this.getRequest().getRequestURI();
	String entity = uri.substring(uri.indexOf("list") + 4, uri.indexOf(".do"));
	if (condition != null) {
	    this.getRequest().setAttribute("condition", condition);
	}
	List list = this.commonService.queryEntityList(queryPathEntity(entity), orderField, order);
	super.setRequestAttribute("entityList", list);
	ServletActionContext.getRequest().setAttribute("con", con);
	if (this.entity == null || this.entity.length() == 0) {
	    this.responseText("<html><body>CommonVo.java类未定义实体：" + uri.substring(uri.indexOf("list") + 4, uri.indexOf(".do")) + "<body></html>");
	    return null;
	}
	if (jsp != null) {
	    return "jsp";
	} else {
	    return SUCCESS;
	}
    }
    /**
     * 新建保存实体信息量
     * @author duncan
     * @createTime 2011-1-28
     * @version 1.0
     */
    public void addEntity() {
	String uri = this.getRequest().getRequestURI();
	String entity = uri.substring(uri.indexOf("add") + 3, uri.indexOf(".do"));
	Object obj = queryEntity(entity);
	if (obj != null) {
	    try {
	    	if(entity.equals("Admin")){
	    		Admin a=(Admin)obj;
	    		 Admin admin=this.adminDao.findEntiry("from Admin where username=?", a.getUsername());
	    		 if(admin!=null){
	    			 super.responseJson(new ActionResponse(ActionResponse.FALIURE, "用户编号已存在。"));
	 	    		return;
	    		 }
	    		 a.setPassword(MD5Helper.encode(a.getPassword()));
	    	}
		    this.commonService.addEntity(obj);
		    super.responseJson(new ActionResponse(ActionResponse.SUCCESS, message + "成功!"));
	    } catch (Throwable e) {
		e.printStackTrace();
		super.responseJson(new ActionResponse(ActionResponse.FALIURE, message + "失败!"));
	    }
	} else {
	    super.responseJson(new ActionResponse(ActionResponse.FALIURE, message + "失败!实体名称不存在。"));
	}
    }
    /**
     * 一对多新增
     * @author duncan
     * @createTime 2011-2-14
     * @version 1.0
     */
    public void moreAddEntity() {
	try {
	    String uri = this.getRequest().getRequestURI();
	    String entity = uri.substring(uri.indexOf("moreAdd") + 7, uri.indexOf(".do"));
	    Object obj = queryEntity(entity);
	    List list = this.findEntityList();
	    List remove = new ArrayList();
	    System.out.print("old list size=" + list.size());
	    if (obj != null && list != null) {
		for (Object object : list) {
		    for (Method method : object.getClass().getMethods()) {
			if (method.getName().startsWith("get") && !method.getName().equals("getClass")) {
			    if (method.isAnnotationPresent(Sweii.class)) {//判断是否存在sweii
				Sweii sweii = method.getAnnotation(Sweii.class);
				boolean notNull = sweii.notNull();
				if (notNull) {
				    try {
					Object re = method.invoke(object, null);
					if (re == null || (re.getClass().getSimpleName().equals("String") && re.toString().length() == 0)) {
					    remove.add(object);
					}
				    } catch (Exception e) {
				    }
				}
			    }
			}
		    }
		}
		list.removeAll(remove);
		if (list.size() == 0) {
		    super.responseJson(new ActionResponse(ActionResponse.FALIURE, message + "失败!子列表参数名不正确或CommonVo未定义。"));
		    return;
		}
		this.commonService.moreAddEntity(obj, list);
		super.responseJson(new ActionResponse(ActionResponse.SUCCESS, message + "成功!"));
	    } else {
		super.responseJson(new ActionResponse(ActionResponse.FALIURE, message + "失败!参数名不正确或CommonVo未定义。"));
	    }
	} catch (Throwable e) {
	    e.printStackTrace();
	    super.responseJson(new ActionResponse(ActionResponse.FALIURE, message + "失败!可能操作数据库失败。"));
	}
    }
    public void moreEditEntity() {
	try {
	    String uri = this.getRequest().getRequestURI();
	    String entity = uri.substring(uri.indexOf("moreEdit") + 8, uri.indexOf(".do"));
	    Object obj = queryEntity(entity);
	    List list = this.findEntityList();
	    List remove = new ArrayList();
	    System.out.print("old edit size=" + list.size());
	    if (obj != null && list != null) {
		for (Object object : list) {
		    for (Method method : object.getClass().getMethods()) {
			if (method.getName().startsWith("get") && !method.getName().equals("getClass")) {
			    if (method.isAnnotationPresent(Sweii.class)) {//判断是否存在sweii
				Sweii sweii = method.getAnnotation(Sweii.class);
				boolean notNull = sweii.notNull();
				if (notNull) {
				    try {
					Object re = method.invoke(object, null);
					if (re == null || (re.getClass().getSimpleName().equals("String") && re.toString().length() == 0)) {
					    remove.add(object);
					}
				    } catch (Exception e) {
				    }
				}
			    }
			}
		    }
		}
		list.removeAll(remove);
		System.out.println(",new edit size=" + list.size());
		if (list.size() == 0) {
		    super.responseJson(new ActionResponse(ActionResponse.FALIURE, message + "失败!子列表参数名不正确或CommonVo未定义。"));
		    return;
		}
		List<String> fs = new ArrayList<String>();
		if (this.fields != null && this.fields.length() > 0) {
		    for (String field : this.fields.split(",")) {
			fs.add(field);
		    }
		}
		this.commonService.moreEditEntity(obj, list, fs, joinFields);
		super.responseJson(new ActionResponse(ActionResponse.SUCCESS, message + "成功!"));
	    } else {
		super.responseJson(new ActionResponse(ActionResponse.FALIURE, message + "失败!参数名不正确或CommonVo未定义。"));
	    }
	} catch (Throwable e) {
	    e.printStackTrace();
	    super.responseJson(new ActionResponse(ActionResponse.FALIURE, this.message + "失败!" + message));
	}
    }
    /**
     * 修改实体信息
     * @author duncan
     * @createTime 2011-1-28
     * @version 1.0
     */
    public void editEntity() {
	String uri = this.getRequest().getRequestURI();
	String entity = uri.substring(uri.indexOf("edit") + 4, uri.indexOf(".do"));
	Object obj = queryEntity(entity);
	if (obj != null) {
	    try {
		List<String> fs = new ArrayList<String>();
		if (this.fields != null && this.fields.length() > 0) {
		    for (String field : this.fields.split(",")) {
			fs.add(field);
		    }
		}
		this.commonService.editEntity(obj, fs);
		super.responseJson(new ActionResponse(ActionResponse.SUCCESS, message + "成功!"));
	    } catch (Throwable e) {
		e.printStackTrace();
		super.responseJson(new ActionResponse(ActionResponse.FALIURE, message + "失败!"));
	    }
	} else {
	    super.responseJson(new ActionResponse(ActionResponse.FALIURE, message + "失败!实体名称不存在。"));
	}
    }
    private String field;//实体属性
    private String value;//实体值
    private String javaType;//java类型
    private String type;//类型
    public void fieldEditEntity() throws Throwable {
	try {
	    this.commonService.editEntity(super.getId(), entity, field, value, javaType, type, format);
	    super.responseJson(new ActionResponse(ActionResponse.SUCCESS));
	} catch (Exception e) {
	    String message = (String) request.getAttribute("sweiiException");
	    e.printStackTrace();
	    if (message != null) {
		super.responseJson(new ActionResponse(ActionResponse.FALIURE, message));
	    } else {
		super.responseJson(new ActionResponse(ActionResponse.FALIURE));
	    }
	}
    }
    /**
     * 删除实体
     * @author duncan
     * @createTime 2011-1-28
     * @version 1.0
     */
    public void deleteEntity() {
	String uri = this.getRequest().getRequestURI();
	String entity = uri.substring(uri.indexOf("delete") + 6, uri.indexOf(".do"));
	try {
	    List<Integer> ids = new ArrayList<Integer>();
	    if (this.getIds() != null && this.getIds().length() > 0) {
		for (String id : this.getIds().split(",")) {
		    ids.add(Integer.valueOf(id));
		}
	    }
	    this.commonService.deleteEntity(entity, joinEntity, ids);
	    super.responseJson(new ActionResponse(ActionResponse.SUCCESS, this.getSuccessMsg()));
	} catch (Throwable e) {
	    e.printStackTrace();
	    super.responseJson(new ActionResponse(ActionResponse.FALIURE, this.getFailureMsg()));
	}
    }
    /**
     * 
     * @author duncan
     * @createTime 2011-2-22
     * @version 1.0
     */
    public void confirmEntity() {
	String uri = this.getRequest().getRequestURI();
	String entity = uri.substring(uri.indexOf("confirm") + 7, uri.indexOf(".do"));
	try {
	    List<Integer> ids = new ArrayList<Integer>();
	    if (this.getIds() != null && this.getIds().length() > 0) {
		for (String id : this.getIds().split(",")) {
		    ids.add(Integer.valueOf(id));
		}
	    }
	    this.commonService.confirmEntity(entity, ids);
	    super.responseJson(new ActionResponse(ActionResponse.SUCCESS, this.getSuccessMsg()));
	} catch (Throwable e) {
	    e.printStackTrace();
	    super.responseJson(new ActionResponse(ActionResponse.FALIURE, this.getFailureMsg()));
	}
    }
    /**
     * 
     * @author duncan
     * @createTime 2011-2-22
     * @version 1.0
     */
    public void changeEntity() {
	String uri = this.getRequest().getRequestURI();
	String entity = uri.substring(uri.indexOf("change") + 6, uri.indexOf(".do"));
	try {
	    List<Integer> ids = new ArrayList<Integer>();
	    if (this.getIds() != null && this.getIds().length() > 0) {
		for (String id : this.getIds().split(",")) {
		    ids.add(Integer.valueOf(id));
		}
	    }
	    List<String> fs = new ArrayList<String>();
	    if (this.getFields() == null || this.getFields().length() == 0) {
		super.responseJson(new ActionResponse(ActionResponse.SUCCESS, this.getFailureMsg() + ",原因fields值没有设置。"));
		return;
	    } else {
		for (String v : this.getFields().split(",")) {
		    fs.add(v);
		}
	    }
	    List<String> vs = new ArrayList<String>();
	    if (this.getValues() == null || this.getValues().length() == 0) {
		super.responseJson(new ActionResponse(ActionResponse.SUCCESS, this.getFailureMsg() + ",原因values值没有设置。"));
		return;
	    } else {
		if (fs.size() == 1) {//不需要分
		    vs.add(this.getValues());
		} else {
		    for (String v : this.getValues().split(",")) {
			vs.add(v);
		    }
		}
	    }
	    if (this.getFields().split(",").length != this.getValues().split(",").length) {
		super.responseJson(new ActionResponse(ActionResponse.SUCCESS, this.getFailureMsg() + ",原因fields与values长度不一致。"));
	    }
	    this.commonService.changeEntity(entity, fs, vs, ids);
	    super.responseJson(new ActionResponse(ActionResponse.SUCCESS, this.getSuccessMsg()));
	} catch (Throwable e) {
	    e.printStackTrace();
	    super.responseJson(new ActionResponse(ActionResponse.SUCCESS, this.getFailureMsg()));
	}
    }
    /**
     * 
     * @author duncan
     * @createTime 2011-2-16
     * @version 1.0
     */
    public void prepareEditEntity() {
	if (entity == null || super.getId() == null) return;
	Object object = this.commonService.queryEntityById(entity, super.getId());
	if (object == null) {
	    return;
	}
	List joins = null;
	if (this.getJoinFields() != null) {
	    joins = this.commonService.queryJoinEntityList(entity, joinEntity, super.getId());
	}
	ArrayVo vo = new ArrayVo();
	if (this.getFields() != null && this.fields.length() > 0) {
	    for (String field : this.getFields().split(",")) {
		try {
		    if (field.indexOf(".") > -1) {
			String f = field.substring(0, field.indexOf("."));
			String subField = field.substring(field.indexOf(".") + 1);
			Method method = object.getClass().getMethod("get" + f.substring(0, 1).toUpperCase() + f.substring(1));
			if (method != null) {
			    Object sub = method.invoke(object);
			    if (sub != null) {//判断对象为空--kfz
				String[] subFields = subField.split("\\.");
				if (subFields.length > 1) {
				    sub = sub.getClass().getMethod("get" + subFields[0].substring(0, 1).toUpperCase() + subFields[0].substring(1)).invoke(sub);
				    subField = subFields[1];
				}
				method = sub.getClass().getMethod("get" + subField.substring(0, 1).toUpperCase() + subField.substring(1));
				if (method != null) {
				    vo.getValues().add(method.invoke(sub));
				    vo.getFields().add(field);
				}
			    }
			}
		    } else {
			Method method = object.getClass().getMethod("get" + field.substring(0, 1).toUpperCase() + field.substring(1));
			if (method != null) {
			    vo.getValues().add(method.invoke(object));
			    vo.getFields().add(field);
			}
		    }
		} catch (Exception e) {
		    e.printStackTrace();
		}
	    }
	}
	if (this.getJoinFields() != null) {
	    for (Object obj : joins) {
		List values = new ArrayList();
		for (String field : this.getJoinFields().split(",")) {
		    if (field.indexOf(".") > -1) {
			String f = field.substring(0, field.indexOf("."));
			String subField = field.substring(field.indexOf(".") + 1);
			try {
			    Method method = null;
			    if (obj.getClass().getName().indexOf("$$") > -1) {
				method = obj.getClass().getSuperclass().getMethod("get" + f.substring(0, 1).toUpperCase() + f.substring(1));
			    } else {
				method = obj.getClass().getMethod("get" + f.substring(0, 1).toUpperCase() + f.substring(1));
			    }
			    if (method != null) {
				Object sub = method.invoke(obj);
				if (sub == null) {
				    values.add("");
				    if (!vo.getJoinFields().contains(field)) {
					vo.getJoinFields().add(field);
				    }
				    continue;
				}
				try {
				    if (subField.indexOf(".") > 1) {
					f = subField.substring(0, subField.indexOf("."));
					subField = subField.substring(subField.indexOf(".") + 1);
					if (sub.getClass().getName().indexOf("$$") > -1) {
					    method = sub.getClass().getSuperclass().getMethod("get" + f.substring(0, 1).toUpperCase() + f.substring(1));
					} else {
					    method = sub.getClass().getMethod("get" + f.substring(0, 1).toUpperCase() + f.substring(1));
					}
					if (method != null) {
					    sub = method.invoke(sub);
					}
				    }
				    if (sub.getClass().getName().indexOf("$$") > -1) {
					method = sub.getClass().getSuperclass().getMethod("get" + subField.substring(0, 1).toUpperCase() + subField.substring(1));
				    } else {
					method = sub.getClass().getMethod("get" + subField.substring(0, 1).toUpperCase() + subField.substring(1));
				    }
				    if (method != null) {
					values.add(method.invoke(sub));
					if (!vo.getJoinFields().contains(field)) {
					    vo.getJoinFields().add(field);
					}
				    }
				} catch (Exception e) {
				    // e.printStackTrace();
				    if (e.getClass().getSimpleName().equals("NoSuchMethodException")) {
					Method[] methods = null;
					if (sub.getClass().getName().indexOf("$$") > -1) {
					    methods = sub.getClass().getSuperclass().getMethods();
					} else {
					    methods = sub.getClass().getMethods();
					}
					for (Method mod : methods) {
					    if (mod.isAnnotationPresent(Sweii.class)) {
						Sweii sweii = mod.getAnnotation(Sweii.class);
						if (sweii.codeName().equals(subField)) {
						    values.add(this.commonService.queryCodeName(sweii.code(), mod.invoke(sub).toString()));
						    if (!vo.getJoinFields().contains(field)) {
							vo.getJoinFields().add(field);
						    }
						    break;
						}
					    }
					}
				    }
				}
			    }
			} catch (Exception e) {
			    e.printStackTrace();
			}
		    } else {
			try {
			    Method method = obj.getClass().getMethod("get" + field.substring(0, 1).toUpperCase() + field.substring(1));
			    if (method != null) {
				values.add(method.invoke(obj));
				if (!vo.getJoinFields().contains(field)) {
				    vo.getJoinFields().add(field);
				}
			    }
			} catch (Exception e) {
			    //e.printStackTrace();
			    if (e.getClass().getSimpleName().equals("NoSuchMethodException")) {
				Method[] methods = null;
				if (obj.getClass().getName().indexOf("$$") > -1) {
				    methods = obj.getClass().getSuperclass().getMethods();
				} else {
				    methods = obj.getClass().getMethods();
				}
				for (Method mod : methods) {
				    if (mod.isAnnotationPresent(Sweii.class)) {
					Sweii sweii = mod.getAnnotation(Sweii.class);
					if (sweii.codeName().equals(field)) {
					    try {
						values.add(this.commonService.queryCodeName(sweii.code(), mod.invoke(obj).toString()));
						if (!vo.getJoinFields().contains(field)) {
						    vo.getJoinFields().add(field);
						}
					    } catch (Exception ex) {
						ex.printStackTrace();
					    }
					    break;
					}
				    }
				}
			    }
			}
		    }
		}
		vo.getJoinValues().add(values);
	    }
	}
	this.responseJson(JsonUtil.changeToJson(vo));
	//System.out.println(JsonUtil.changeToJson(vo));
    }
    protected Object queryEntity(String entity) {
	try {
	    for (Method method : this.getClass().getSuperclass().getMethods()) {
		if (method.getName().equals("get" + entity)) {
		    return method.invoke(this);
		}
	    }
	} catch (Exception e) {
	    e.printStackTrace();
	}
	return null;
    }
    protected Object queryPathEntity(String entity) {
	try {
	    if (entities.size() == 0) {
		for (Method method : this.getClass().getSuperclass().getMethods()) {
		    if (method.getName().startsWith("get")) {
			entities.add(method.getName().substring(3));
		    }
		}
	    }
	    List<String> ens = new ArrayList<String>();
	    List<Integer> indexs = new ArrayList<Integer>();
	    for (String en : entities) {
		if (entity.endsWith(en)) {
		    ens.add(en);
		    indexs.add(entity.lastIndexOf(en));
		}
	    }
	    String en = "";
	    if (ens.size() > 1) {
		int s = 0;
		int index = indexs.get(0);
		for (int i = 1; i < indexs.size(); i++) {
		    if (index > indexs.get(i)) {
			s = i;
		    }
		}
		en = ens.get(s);
	    } else if (ens.size() == 1) {
		en = ens.get(0);
	    }
	    String path = entity.substring(0, entity.lastIndexOf(en));
	    if (path.length() > 0) {
		path = path.substring(0, 1).toLowerCase() + path.substring(1);
	    }
	    if (jsp == null && path.equals("")) {//不带路径请求，默认跳转到base
		path = "base";
	    }
	    this.setPath(path);
	    this.setEntity(en);
	    entity = en;
	    for (Method method : this.getClass().getSuperclass().getMethods()) {
		if (method.getName().equals("get" + entity)) {
		    return method.invoke(this);
		}
	    }
	} catch (Exception e) {
	    e.printStackTrace();
	}
	return null;
    }
    protected List findEntityList() {
	for (Method method : this.getClass().getSuperclass().getMethods()) {
	    if (method.getReturnType().getSimpleName().equals("List")) {
		try {
		    List list = (List) method.invoke(this, null);
		    if (list != null && list.size() > 0) {
			return list;
		    }
		} catch (Exception e) {
		    e.printStackTrace();
		}
	    }
	}
	return null;
    }
    /**
     * 
     * @author duncan
     * @createTime 2011-2-17
     * @version 1.0
     */
    public String viewEntity() throws Exception {
	String uri = this.getRequest().getRequestURI();
	String entity = uri.substring(uri.indexOf("view") + 4, uri.indexOf(".do"));
	Object object = this.commonService.queryEntityById(entity, super.getId());
	if (this.joinEntity != null && this.joinEntity.length() > 0) {
	    String[] entities = this.getJoinEntity().split(",");
	    for (String en : entities) {
		if (en.indexOf(".") > 0) {
		    String p = en.substring(0, en.indexOf("."));
		    p = p.substring(0, 1).toUpperCase() + p.substring(1);
		    this.setRequestAttribute("index", 0);
		    List ens = (List) this.getRequest().getAttribute(p);
		    if (ens != null) {
			String sub = en.substring(en.indexOf(".") + 1);
			for (int i = 0; i < ens.size(); i++) {
			    Object obj = ens.get(i);
			    Integer id = (Integer) obj.getClass().getMethod("getId").invoke(obj);
			    p = p.substring(0, 1).toLowerCase() + p.substring(1);
			    List list = this.codeDao.findEntityList("from " + sub + " where " + p + ".id=?", id);
			    this.setRequestAttribute(sub + i, list);
			}
			this.setRequestAttribute(sub + "size", ens.size());
		    }
		} else {
		    entity = entity.substring(0, 1).toLowerCase() + entity.substring(1);
		    List list = this.codeDao.findEntityList("from " + en + " where " + entity + ".id=?", super.getId());
		    this.setRequestAttribute(en, list);
		}
	    }
	}
	this.setRequestAttribute("sweii_entity", object);
	if (jsp != null) {
	    return "jsp";
	} else {
	    if (!url.startsWith("/")) {
		url = "/" + url;
	    }
	    return SUCCESS;
	}
    }
    public void backup() throws Exception {
	boolean result = this.commonService.backup(2);
	if (result) {
	    super.responseJson(new ActionResponse(ActionResponse.SUCCESS, "已成功备份数据库!"));
	} else {
	    super.responseJson(new ActionResponse(ActionResponse.FALIURE, "备份数据库失败!"));
	}
    }
    public String getJoinEntity() {
	return joinEntity;
    }
    public void setJoinEntity(String joinEntity) {
	this.joinEntity = joinEntity;
    }
    public String getMessage() {
	return message;
    }
    public void setMessage(String message) {
	this.message = message;
    }
    public String getFields() {
	return fields;
    }
    public void setFields(String fields) {
	this.fields = fields;
    }
    public String getEntity() {
	return entity;
    }
    public void setEntity(String entity) {
	this.entity = entity;
    }
    public String getPath() {
	return path;
    }
    public void setPath(String path) {
	this.path = path;
    }
    public List<String> getEntities() {
	return entities;
    }
    public void setEntities(List<String> entities) {
	this.entities = entities;
    }
    public String getJoinFields() {
	return joinFields;
    }
    public void setJoinFields(String joinFields) {
	this.joinFields = joinFields;
    }
    public String getFormat() {
	return format;
    }
    public void setFormat(String format) {
	this.format = format;
    }
    public String getJsp() {
	return jsp;
    }
    public void setJsp(String jsp) {
	this.jsp = jsp;
    }
    public String getOrder() {
	return order;
    }
    public void setOrder(String order) {
	this.order = order;
    }
    public String getOrderField() {
	return orderField;
    }
    public void setOrderField(String orderField) {
	this.orderField = orderField;
    }
    public String getField() {
	return field;
    }
    public void setField(String field) {
	this.field = field;
    }
    public String getJavaType() {
	return javaType;
    }
    public void setJavaType(String javaType) {
	this.javaType = javaType;
    }
    public String getType() {
	return type;
    }
    public void setType(String type) {
	this.type = type;
    }
    public String getValue() {
	return value;
    }
    public void setValue(String value) {
	this.value = value;
    }
    public String getUrl() {
	return url;
    }
    public void setUrl(String url) {
	this.url = url;
    }
    public String getCon() {
	return con;
    }
    public void setCon(String con) {
	this.con = con;
    }
    public String getFailureMsg() {
	return failureMsg;
    }
    public void setFailureMsg(String failureMsg) {
	this.failureMsg = failureMsg;
    }
    public String getSuccessMsg() {
	return successMsg;
    }
    public void setSuccessMsg(String successMsg) {
	this.successMsg = successMsg;
    }
    public String getValues() {
	return values;
    }
    public void setValues(String values) {
	this.values = values;
    }
    public Condition getCondition() {
	return condition;
    }
    public void setCondition(Condition condition) {
	this.condition = condition;
    }
    public Integer getCount() {
	return count;
    }
    public void setCount(Integer count) {
	this.count = count;
    }
}
