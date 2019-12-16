package com.sweii.action;

import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.hibernate.util.StringHelper;

import com.erican.auth.vo.Admin;
import com.sweii.bean.CategoryBean;
import com.sweii.bean.StatBean;
import com.sweii.dao.DaoFactory;
import com.sweii.framework.helper.DateHelper;
import com.sweii.vo.Ticket;

public class ReportAction extends CommonVo {
	private Integer type; // 类型 1为日，2为月，3为年        /报表
	private String tripStrIds;		//隐藏属性
	private String saleAdmin;	//售票员编号
	private Integer jspType;
	private String categoryTypeIds; //隐藏属性
	private String deviceStrIds;
	private String deviceTree;
	
	
	//获取全部售票信息
	  public List<Ticket> getSimpleAllTickets(){
			String hql="select t.id as id,t.number as number,t.size as size,t.type as type,t.status as status,t.createTime as createTime,t.inDate as inDate from User as t ORDER BY t.type ASC";
	    	return ticketDao.find(hql,Ticket.class);
		}
	  
	  /**
	   * 年月日报表
	   * @return
	   * @throws Exception
	   */
	  public String reportTimeSaleTicket() {
			Date now = DateHelper.getToday();
			if (StringHelper.isEmpty(this.getStartTime())
					|| StringHelper.isEmpty(this.getEndTime())) {
				if (type == 1) {
					if (!DateHelper.isDateFormat(this.getStartTime(), DATE_FORMAT)
							|| !DateHelper.isDateFormat(this.getEndTime(),
									DATE_FORMAT)) {
						this.setStartTime(DateHelper.toString(now, DATE_FORMAT));
						this.setEndTime(DateHelper.toString(now, DATE_FORMAT));
					}
				} else if (type == 2) {
					if (!DateHelper.isDateFormat(this.getStartTime(), MONTH_FORMAT)
							|| !DateHelper.isDateFormat(this.getEndTime(),
									MONTH_FORMAT)) {
						this.setStartTime(DateHelper.toString(now, MONTH_FORMAT));
						this.setEndTime(DateHelper.toString(now, MONTH_FORMAT));
					}
				} else if (type == 3) {
					if (!DateHelper.isDateFormat(this.getStartTime(), YEAR_FORMAT)
							|| !DateHelper.isDateFormat(this.getEndTime(),
									YEAR_FORMAT)) {
						this.setStartTime(DateHelper.toString(now, YEAR_FORMAT));
						this.setEndTime(DateHelper.toString(now, YEAR_FORMAT));
					}
				}
			}
			String realstime = "";	//开始时间
			String realetime = "";	//结束时间
			if (type == 1) {
				realstime = this.getStartTime();
				realetime = DateHelper.toString(DateHelper.add(
						DateHelper.toDate(this.getEndTime(), DATE_FORMAT),
						DateHelper.DAY, 1), DATE_FORMAT);
			} else if (type == 2) {
				realstime = DateHelper.toString(
						DateHelper.toDate(this.getStartTime(), MONTH_FORMAT),
						DATE_FORMAT);
				realetime = DateHelper.toString(DateHelper.add(
						DateHelper.toDate(this.getEndTime(), MONTH_FORMAT),
						DateHelper.MONTH, 1), DATE_FORMAT);
			} else if (type == 3) {
				realstime = DateHelper.toString(
						DateHelper.toDate(this.getStartTime(), YEAR_FORMAT),
						DATE_FORMAT);
				realetime = DateHelper.toString(DateHelper.add(
						DateHelper.toDate(this.getEndTime(), YEAR_FORMAT),
						DateHelper.YEAR, 1), DATE_FORMAT);
			}
			List<Ticket> listTs=getSimpleAllTicket();
			String saleAdminTree=getSaleAdminTree();
			Map<Integer,String> tsMap=new HashMap<Integer,String>();
	    	Map<Integer,Integer> typeMap=new HashMap<Integer,Integer>();
	    	Map<Integer,Integer> priceMap=new HashMap<Integer,Integer>();
	   	 	for(Ticket vo:listTs){
		   	 		priceMap.put(vo.getId(),vo.getPrice());
		        tsMap.put(vo.getId(),vo.getName());
		 	}
	   	 	StatBean statBean=null;
	   	 	if(this.categoryTypeIds==null)categoryTypeIds="";
	   	 	if(!StringHelper.isEmpty(saleAdmin)){
	   	 		Admin admin = this.adminService.queryAdminByUserName(saleAdmin);
	   	 		if(admin==null){
	   	 			statBean=new StatBean();
	   	 		}else{
	   	 			statBean=DaoFactory.getReportDao().reportTimeTickets(type,
	   	 				categoryTypeIds,admin.getId().toString(), this.getStartTime(),
							this.getEndTime());
	   	 		}
	   	 	}else{
	   	 		//System.out.println("tripStrIds="+tripStrIds);
	   	 		
	   	 	statBean= DaoFactory.getReportDao().reportTimeTickets(type,categoryTypeIds, 
	   	 			tripStrIds, realstime, realetime);
	   	 	tripStrIds = "";
	   	 	//System.out.println("tripStrIds2222="+tripStrIds);
	   	 	
	   	 	}
	   		for(CategoryBean cb:statBean.list){
				cb.doReport(cb.list);
				cb.setTotalCount(cb.list.size());
			}
	 		statBean.doReport(statBean.list);
	 		super.setRequestAttribute("type", type);
	    	super.setRequestAttribute("tsMap", tsMap);
	    	super.setRequestAttribute("priceMap", priceMap);    
	    	super.setRequestAttribute("statBean", statBean);
	    	super.setRequestAttribute("saleAdminTree", saleAdminTree);
	    	super.setRequestAttribute("typeMap", typeMap);
	    	
	    	if(jspType==null){
	    		return SUCCESS;
	    	}else{
	    		return "export";
	    	}
		}
	  /**
	   * 售票员交班表
	   * @return
	   * @throws Exception
	   */
	    public String reportAdminTicket() throws Exception {
	    	this.validateDay();
	    	List<Ticket> listTs=getSimpleAllTicket();
	    	String saleAdminTree=getSaleAdminTree();
	    
	    	Map<Integer,String> adminMap=new HashMap<Integer,String>();
	    	List<Admin> listAdmins=DaoFactory.getAdminDao().find("select new Admin(id,name) from Admin");
	   	 	for(Admin vo:listAdmins){
	   	 		adminMap.put(vo.getId(),vo.getName());
	   	 	}
		   	 Map<Integer,String> tsMap=new HashMap<Integer,String>();
		   	 
		 	for(Ticket vo:listTs){
		 		tsMap.put(vo.getId(),vo.getName());
		 		
		 	}
	    	StatBean statBean=null;
	   	 	if(!StringHelper.isEmpty(saleAdmin)){
	   	 		Admin admin=DaoFactory.getAdminDao().findByUsername(saleAdmin);
	   	 		if(admin==null){
	   	 			statBean=new StatBean();
	   	 		}else{
	   	 		statBean= DaoFactory.getReportDao().reportAdminTicket(categoryTypeIds, 
	   	   	 			admin.getId()+"", this.getStartTime(), this.getEndTime());
	   	 		}
	   	 	}else{
	   	 		statBean= DaoFactory.getReportDao().reportAdminTicket(categoryTypeIds, 
		   	 			tripStrIds, this.getStartTime(), this.getEndTime());
		   	 	
	   	 	}
	   	 	for(CategoryBean cb:statBean.list){
				cb.doReport(cb.list);
				cb.setTotalCount(cb.list.size());
			}
			statBean.doReport(statBean.list);
	   		super.setRequestAttribute("tsMap", tsMap);
	   		super.setRequestAttribute("adminMap", adminMap);
	    	super.setRequestAttribute("statBean", statBean);
	    	super.setRequestAttribute("saleAdminTree", saleAdminTree);
	    	System.out.println(saleAdminTree);
	    	return SUCCESS;
	    }
	  
	    private void validateDay(){
	    	Date now=DateHelper.getToday();
	    	if(StringHelper.isEmpty(this.getStartTime()) || StringHelper.isEmpty(this.getEndTime())
	    			|| !DateHelper.isDateFormat(this.getStartTime(),DATE_TIME_FORMAT)||
	    			 !DateHelper.isDateFormat(this.getEndTime(),DATE_TIME_FORMAT)){
	    		this.setStartTime(DateHelper.toString(now, DATE_FORMAT)+" 00:00:00");
	    		this.setEndTime(DateHelper.toString(now, DATE_FORMAT)+" 23:59:59");
	    	}
	    }
	  
	  //售票类型
	  public List<Ticket> getSimpleAllTicket(){
			String hql="select id as id,name as name,price as price,size  as size from Ticket";
	    	return ticketDao.find(hql,Ticket.class);
		}
	  //售票人树形菜单
	  private String getSaleAdminTree(){
			StringBuffer ids=new StringBuffer();
			StringBuffer sb=new StringBuffer("var saleAdminNodes=[");
			sb.append("{id:0, pId:-1, name:\"全部售票员\", open:true,icon:\"/Icons/icon021a11.gif\"}");
			if(this.tripStrIds==null)tripStrIds="";
			List<Admin> adminList=DaoFactory.getAdminDao().getSaleAdmin();
			for(Admin vo:adminList){
				//ids.append(vo.getId()).append(",");
				//sb.append("saleAdminTree.add(").append(vo.getId()).append(",0,'").append(vo.getName()+"(").append(vo.getUsername()).append(")');\n");
				int id=vo.getId();
				sb.append(",{id:"+id+", pId:0, name:\""+vo.getName()+"("+vo.getUsername()+")\"");
				if(tripStrIds.indexOf(","+id+",")!=-1 || tripStrIds.startsWith(id+",") ||
						tripStrIds.endsWith(","+id)){
	    			sb.append(",checked:true");
	    			
	    		}
	    		sb.append(",icon:\"/Icons/icon021a1.gif\"}");
			}
			if(ids.length()>0){
	    		ids.deleteCharAt(ids.length()-1);
	    	}
			sb.append("];");
			return sb.toString();
		}
	public String getDeviceTree() {
		return deviceTree;
	}

	public void setDeviceTree(String deviceTree) {
		this.deviceTree = deviceTree;
	}

	public String getDeviceStrIds() {
		return deviceStrIds;
	}

	public void setDeviceStrIds(String deviceStrIds) {
		this.deviceStrIds = deviceStrIds;
	}

	public String getCategoryTypeIds() {
		return categoryTypeIds;
	}

	public void setCategoryTypeIds(String categoryTypeIds) {
		this.categoryTypeIds = categoryTypeIds;
	}

	public Integer getJspType() {
		return jspType;
	}

	public void setJspType(Integer jspType) {
		this.jspType = jspType;
	}

	public String getSaleAdmin() {
		return saleAdmin;
	}

	public void setSaleAdmin(String saleAdmin) {
		this.saleAdmin = saleAdmin;
	}

	public String getTripStrIds() {
		return tripStrIds;
	}

	public void setTripStrIds(String tripStrIds) {
		this.tripStrIds = tripStrIds;
	}

	public Integer getType() {
		return type;
	}

	public void setType(Integer type) {
		this.type = type;
	}

	public String YEAR_FORMAT = "yyyy";
	public String MONTH_FORMAT = "yyyy-MM";
	
	
}
