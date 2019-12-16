package com.sweii.action;
import java.io.PrintWriter;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
import net.sf.json.JsonConfig;
import net.sf.json.util.JSONUtils;
import org.apache.struts2.ServletActionContext;
import org.hibernate.util.StringHelper;
import com.sweii.dao.BaseServiceImpl;
import com.sweii.framework.Constant;
import com.sweii.framework.utility.DateMorpher;
import com.sweii.framework.utility.JsonUtil;
import com.sweii.framework.utility.Mapx;
import com.sweii.framework.utility.ServletUtil;
import com.sweii.util.Environment;
import com.sweii.util.MapCookie;
import com.sweii.util.MapCookieUtil;
import com.sweii.util.OnlineAdmin;
import com.sweii.util.PageUtil;
import com.opensymphony.xwork2.Action;
import com.opensymphony.xwork2.Preparable;
/**
 * 
 * @author duncan
 * @createTime 2009-11-25
 * @version 1.0
 */
public class BaseAction extends BaseServiceImpl implements Action, Preparable {
    private static final long serialVersionUID = 1L;
    /**
     * 分页
     */
    private int pageNo;//第几页
    private int pageSize;//每页数
    private String endTime;// 
    private String startTime;
    private int selectSize;
    private int subHeight;
    public int getSubHeight() {
	return subHeight;
    }
    public void setSubHeight(int subHeight) {
	this.subHeight = subHeight;
    }
    public int getSelectSize() {
	return selectSize;
    }
    public void setSelectSize(int selectSize) {
	this.selectSize = selectSize;
    }
    public SimpleDateFormat yearFormat = new SimpleDateFormat("yyyy");
    public SimpleDateFormat monthFormat = new SimpleDateFormat("yyyy-MM");
    public SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
    public SimpleDateFormat timeFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
    public SimpleDateFormat tFormat = new SimpleDateFormat("HH:mm");
    public SimpleDateFormat getTimeFormat() {
        return timeFormat;
    }
    public void setTimeFormat(SimpleDateFormat timeFormat) {
        this.timeFormat = timeFormat;
    }
    public SimpleDateFormat getDateFormat() {
        return dateFormat;
    }
    public void setDateFormat(SimpleDateFormat dateFormat) {
        this.dateFormat = dateFormat;
    }
    private Integer id;
    public Integer getId() {
	return id;
    }
    public void setId(Integer id) {
	this.id = id;
    }
    public int getPageNo() {
	if (pageNo == 0) return 1;
	return pageNo;
    }
    public void setPageNo(int pageNo) {
	this.pageNo = pageNo;
    }
    public int getPageSize() {
	if (pageSize != 0) return pageSize;//参数有pagesize
	int height = this.getBrowseHeight()-this.subHeight;
	this.pageSize = height / 21;	
	if (this.pageSize == 0) return (int) PageUtil.DEFAULT_PAGE_SIZE;
	return pageSize;
    }
    public void setPageSize(int pageSize) {
	this.pageSize = pageSize;
    }
    public void prepare() throws Exception {
	this.request = ServletActionContext.getRequest();
	this.response = ServletActionContext.getResponse();
    }
    private String ids;
    protected String sortField;//排序字段
    protected String direction;//排序类型 ASC,DESC
    public String getSortField() {
	return sortField;
    }
    public void setSortField(String sortField) {
	this.sortField = sortField;
    }
    public String getDirection() {
	return direction;
    }
    public void setDirection(String direction) {
	this.direction = direction;
    }
    /**
     * HttpServletRequest 变量, 在运行Action主体方法之前被初始化,成为默认值
     */
    protected HttpServletRequest request = null;
    /**
     * HttpServletResponse 变量, 在运行Action主体方法之前被初始化,成为默认值
     */
    protected HttpServletResponse response = null;
    /**
     * <p>Title:返回json对象/p>
     * <p>Description:返回json对象</p>
     * @version 1.0
     */
    protected void responseJson(String json) {
	HttpServletResponse response = ServletActionContext.getResponse();
	response.setHeader("Cache-Control", "no-cache");
	response.setContentType("application/x-json;charset=GBK");
	try {
	    PrintWriter out = response.getWriter();
	    out.print(json);
	    out.close();
	} catch (Exception e) {
	    e.printStackTrace();
	}
    }
    /**
     * <p>Title:返回文本内容/p>
     * <p>Description:返回文本内容</p>
     * @version 1.0
     */
    protected void responseText(String text) {
	HttpServletResponse response = ServletActionContext.getResponse();
	response.setHeader("Cache-Control", "no-cache");
	response.setContentType("text/html;charset=GBK");
	try {
	    PrintWriter out = response.getWriter();
	    out.write(text);
	    out.close();
	} catch (Exception e) {
	    e.printStackTrace();
	}
    }
    protected void responseJson(Object object, final String[] filterFiled) {
	responseJson(object, filterFiled, null);
    }
    protected void responseJson(Object object) {
	responseJson(object, null, null);
    }
    protected void responseJson(Object object, final String[] filterFiled, String dateFormat) {
	JsonConfig jsonConfig = null;
	if (dateFormat == null) {
	    dateFormat = DATE_TIME_FORMAT;
	}
	if (filterFiled != null) {
	    jsonConfig = JsonUtil.configJson(filterFiled, dateFormat);
	} else {
	    jsonConfig = JsonUtil.configJson(dateFormat);
	}
	if (object instanceof java.util.List) {//判断输入的是List数组类型
	    responseJson(JSONArray.fromObject(object, jsonConfig).toString());
	} else {
	    responseJson(JSONObject.fromObject(object, jsonConfig).toString());
	}
    }
    /**
     * 获到登录用户ID
     * @author duncan
     * @createTime 2009-11-24
     * @version 1.0
     * @return Integer
     */
    protected Integer getLoginAdminId() {
	HttpServletResponse response = ServletActionContext.getResponse();
	MapCookieUtil mcu = new MapCookieUtil(ServletActionContext.getRequest(), response);
	MapCookie loginSecurityMapCookie = mcu.getSecurityMapCookie(Environment.COOKIE_NAME_ONLINE_ADMIN);
	int adminId = loginSecurityMapCookie.getInt(Environment.COOKIE_KEY_ADMIN_ID, 0);
	if (adminId == 0) return null;
	return adminId;
    }
    protected int getBrowseHeight() {
	HttpServletResponse response = ServletActionContext.getResponse();
	MapCookieUtil mcu = new MapCookieUtil(ServletActionContext.getRequest(), response);
	MapCookie loginSecurityMapCookie = mcu.getSecurityMapCookie(Environment.COOKIE_NAME_ONLINE_ADMIN);
	int height = loginSecurityMapCookie.getInt("height", 0);
	if (height == 0) return 768;
	return height;
    }
    /**
     * 取在线用户ID,账号,名称
     * @return
     * @author lizhongren
     * 2010-1-7 上午01:04:24
     */
    protected OnlineAdmin getOnlineAdmin() {
	HttpServletResponse response = ServletActionContext.getResponse();
	OnlineAdmin onlineAdmin = new OnlineAdmin(ServletActionContext.getRequest(), response);
	if (onlineAdmin.getId() == null) return null;
	return onlineAdmin;
    }
    /**
     * 获到登录管理员名称
     * @author duncan
     * @createTime 2009-11-24
     * @version 1.0
     * @return String
     */
    protected String getLoginUserName() {
	HttpServletResponse response = ServletActionContext.getResponse();
	MapCookieUtil mcu = new MapCookieUtil(ServletActionContext.getRequest(), response);
	MapCookie loginSecurityMapCookie = mcu.getSecurityMapCookie(Environment.COOKIE_NAME_ONLINE_ADMIN);
	return loginSecurityMapCookie.getString(Environment.COOKIE_KEY_USERNAME, "");
    }
    /**
     * 获到登录管理员名称
     * @author duncan
     * @createTime 2009-11-24
     * @version 1.0
     * @return String
     */
    protected String getLoginWorkerName() {
	HttpServletResponse response = ServletActionContext.getResponse();
	MapCookieUtil mcu = new MapCookieUtil(ServletActionContext.getRequest(), response);
	MapCookie loginSecurityMapCookie = mcu.getSecurityMapCookie(Environment.COOKIE_NAME_ONLINE_ADMIN);
	return loginSecurityMapCookie.getString(Environment.COOKIE_KEY_REALNAME, "");
    }
    protected HttpServletResponse getResponse() {
	return ServletActionContext.getResponse();
    }
    /**
     * 设置请求对象属性值
     * @author duncan
     * @createTime 2009-11-24
     * @version 1.0
     * @return void
     */
    protected void setRequestAttribute(String name, Object value) {
	ServletActionContext.getRequest().setAttribute(name, value);
    }
    @SuppressWarnings("unchecked")
    protected void setDataGrid(PageUtil page, String reqAttr) {
	if (page != null && page.getTotalCount() == 0) {
	    page.setPageSize(this.getPageSize());
	}
	if (StringHelper.isEmpty(reqAttr)) {
	    reqAttr = Constant.GRID_ERICAN_MAP;
	} else {
	    reqAttr = "page" + reqAttr;
	}
	Mapx map = ServletUtil.getParameterMap(request);
	map.put(Constant.GRID_ERICAN_PAGE, page);
	if (this.isAjaxRequest()) {
	    map.put(Constant.IS_AJAXR_EQUEST, "1");
	}
	this.setRequestAttribute(reqAttr, map);
    }
    @SuppressWarnings("unchecked")
    protected void setDataGrid(List result, String reqAttr) {
	if (StringHelper.isEmpty(reqAttr)) {
	    reqAttr = Constant.GRID_ERICAN_MAP;
	}
	Mapx map = ServletUtil.getParameterMap(request);
	map.put(Constant.GRID_ERICAN_LIST, result);
	map.put("zpageSize", result.size());
	if (this.isAjaxRequest()) {
	    map.put(Constant.IS_AJAXR_EQUEST, "1");
	}
	this.setRequestAttribute(reqAttr, map);
    }
    @SuppressWarnings("unchecked")
    protected void setDataGrid(PageUtil page) {
	this.setDataGrid(page, null);
    }
    @SuppressWarnings("unchecked")
    protected void setDataGrid(List result) {
	this.setDataGrid(result, null);
    }
    private static final String IE_CONTENT_TYPE = "application/x-www-form-urlencoded";
    private static final String FF_AJAX_CONTENT_TYPE = "application/x-www-form-urlencoded; charset=UTF-8";
    private static final String XMLHTTP_REQUEST = "XMLHttpRequest";
    protected boolean isAjaxRequest() {
	String requestedWith = request.getHeader("x-requested-with");
	String type = request.getContentType();
	if (XMLHTTP_REQUEST.equals(requestedWith) && (FF_AJAX_CONTENT_TYPE.equals(type) || IE_CONTENT_TYPE.equals(type))) {
	    return true;
	}
	return false;
    }
    private String jsonData;
    public String getJsonData() {
	return jsonData;
    }
    public void setJsonData(String jsonData) {
	this.jsonData = jsonData;
    }
    public static String DATE_FORMAT = "yyyy-MM-dd";
    public static String DATE_TIME_FORMAT = "yyyy-MM-dd HH:mm:ss";
    @SuppressWarnings("unchecked")
    protected Object[] getJSONArrays(Class z) {
	return this.getJSONArrays(z, DATE_FORMAT);
    }
    @SuppressWarnings("unchecked")
    protected Object[] getJSONArrays(Class z, String dateFormat) {
	JSONArray array = JSONArray.fromObject(this.getJsonData());
	String[] dateFormats = new String[] { DATE_FORMAT, DATE_TIME_FORMAT };
	JSONUtils.getMorpherRegistry().registerMorpher(new DateMorpher(dateFormats, new Date()));
	Object[] obj = new Object[array.size()];
	for (int i = 0; i < array.size(); i++) {
	    JSONObject jsonObject = array.getJSONObject(i);
	    obj[i] = JSONObject.toBean(jsonObject, z);
	}
	return obj;
    }
    public String getIds() {
	return ids;
    }
    public void setIds(String ids) {
	this.ids = ids;
    }
    public List<Integer> getIdList() {
	List<Integer> ids = new ArrayList<Integer>();
	if (this.getIds() != null && this.getIds().length() > 0) {
	    for (String id : this.getIds().split(",")) {
		ids.add(Integer.valueOf(id));
	    }
	}
	return ids;
    }
    public String getTypeName(Integer type){
    	if(type.intValue()==1){
    		return "甲票";
    	}else if(type.intValue()==2){
    		return "乙票";
    	}else if(type.intValue()==3){
    		return "丙票";
    	}
    	return "";
    }
    public String execute() throws Exception {
	return null;
    }
    public String getRealPath() {
	return getRequest().getRealPath("/store");
    }
    public String getEndTime() {
	return endTime;
    }
    public void setEndTime(String endTime) {
	this.endTime = endTime;
    }
    public String getStartTime() {
	return startTime;
    }
    public void setStartTime(String startTime) {
	this.startTime = startTime;
    }
    public Date getEnd() {
	if (endTime != null) {
	    try {
		return dateFormat.parse(endTime);
	    } catch (Exception e) {
	    }
	}
	return null;
    }
    public Date getStart() {
	if (startTime != null) {
	    try {
		return dateFormat.parse(startTime);
	    } catch (Exception e) {
	    }
	}
	return null;
    }
    public String getBasepath() {
	String aSoPath = this.getClass().getResource("").getPath();
	int part = aSoPath.indexOf("WEB-INF");
	String path = aSoPath.substring(0, part - 1);// root路径
	return path;
    }
}
