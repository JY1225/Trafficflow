package com.sweii.dao;


import java.util.List;

import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.simple.ParameterizedBeanPropertyRowMapper;

import com.erican.auth.vo.Role;
import com.sweii.bean.CategoryBean;
import com.sweii.bean.ReportBean;
import com.sweii.bean.StatBean;
import com.sweii.bean.TimeBean;
import com.sweii.bean.TypeBean;
import com.sweii.dao.BaseDao;
import com.sweii.dao.ReportDao;
import com.sweii.framework.helper.StringHelper;
import com.sweii.util.MyBeanUtils;

public class ReportDaoImpl extends BaseDao<Role, Integer> implements ReportDao {
	/*
	public CategoryBean reportHandPrice(String saleAdminIds,String startTime,String endTime){
		JdbcTemplate jt=super.getSimpleJdbcDao().getJdbcTemplate();
		StringBuffer sql=new StringBuffer();
		StringBuffer where=this.getWhere(null, saleAdminIds, startTime, endTime);
		//押金金额
		sql=new StringBuffer();
		sql.append("SELECT SUM(st.pre_price) AS preAmount,sum(st.price) as addAmount,st.seller_id as creatorId,");
		sql.append("count(*) AS preCount ");
		sql.append("FROM hand_log st ");
		sql.append("WHERE st.pre_price>0 and ").append(where.toString().replaceAll("px1.", "st.").replaceAll("px2.", "st.").replaceAll("create_time", "sell_time").replaceAll("creator_id", "seller_id"));
		sql.append("GROUP BY st.seller_id ");
		CategoryBean cbean=new CategoryBean();
		ParameterizedBeanPropertyRowMapper objRowMapper=ParameterizedBeanPropertyRowMapper.newInstance(TypeBean.class);
		List<TypeBean> list1=jt.query(sql.toString(),
				objRowMapper);
		handPrePriceMapData(cbean,list1);
		
		
		sql=new StringBuffer();
		sql.append("SELECT SUM(l.pre_price) AS backCAmount,l.back_id as creatorId,");
		sql.append("count(*) AS backCCount ");
		sql.append("FROM hand_log l ");
		sql.append("WHERE l.pre_price>0 and l.status=2 and ");
		sql.append(where.toString().replaceAll("px1.create_time", "l.back_time").replaceAll("px1.", "rt.").replaceAll("px2.", "l.").replaceAll("rt.", "l.").replaceAll("creator_id", "back_id"));
		sql.append(" GROUP BY l.back_id ");
		list1=jt.query(sql.toString(),objRowMapper);
		handPrePriceMapData(cbean,list1);
		return cbean;
	}
	*/
	/*
	public CategoryBean reportAdminPrePrice(String saleAdminIds,String startTime,String endTime){
		JdbcTemplate jt=super.getSimpleJdbcDao().getJdbcTemplate();
		StringBuffer sql=new StringBuffer();
		StringBuffer where=this.getWhere(null, saleAdminIds, startTime, endTime);
		//押金金额
		sql=new StringBuffer();
		sql.append("SELECT SUM(st.pre_price) AS preAmount,st.creator_id as creatorId,");
		sql.append("count(*) AS preCount ");
		sql.append("FROM sale_ticket st ");
		sql.append("WHERE st.pre_price>0 and ").append(where.toString().replaceAll("px1.", "st.").replaceAll("px2.", "st.").replaceAll("create_time", "sale_date"));
		sql.append("GROUP BY st.creator_id ");
		CategoryBean cbean=new CategoryBean();
		ParameterizedBeanPropertyRowMapper objRowMapper=ParameterizedBeanPropertyRowMapper.newInstance(TypeBean.class);
		List<TypeBean> list1=jt.query(sql.toString(),
				objRowMapper);
		prePriceMapData(cbean,list1);
		sql=new StringBuffer();
	
		sql.append("SELECT SUM(rt.pre_price) AS BackCAmount,rt.creator_id as creatorId,");
		sql.append("count(*) AS backCCount ");
		sql.append("FROM  return_ticket rt ");
		sql.append("LEFT JOIN user u ON rt.user_id=u.id ");
		sql.append("WHERE u.pre_price>0 and ");
		sql.append(where.toString().replaceAll("px1.create_time", "rt.return_time").replaceAll("px1.", "rt.").replaceAll("px2.", "u."));
		sql.append(" GROUP BY rt.creator_id ");
		System.out.println("退押金金额："+sql.toString());
		list1=jt.query(sql.toString(),objRowMapper);
		prePriceMapData(cbean,list1);
		
		sql=new StringBuffer();
		sql.append("SELECT SUM(rt.pre_price) AS preAmount,rt.creator_id as creatorId,");
		sql.append("count(*) AS preCount ");
		sql.append("FROM  mend_ticket rt ");
		sql.append("LEFT JOIN sale_ticket st ON rt.sale_ticket_id=st.id ");
		sql.append("WHERE rt.type=2 and ");
		sql.append(where.toString().replaceAll("px1.create_time", "rt.create_time").replaceAll("px1.", "rt.").replaceAll("px2.", "st."));
		sql.append(" GROUP BY rt.creator_id ");
		list1=jt.query(sql.toString(),objRowMapper);
		prePriceMapData(cbean,list1);
		return cbean;
	}*/
	@SuppressWarnings({ "rawtypes", "unchecked" })
	public StatBean reportAdminTicket(String ticketIds,String saleAdminIds,String startTime,String endTime){
		JdbcTemplate jt=super.getSimpleJdbcDao().getJdbcTemplate();
		StringBuffer sql=new StringBuffer();
		StringBuffer where=this.getWhere(ticketIds, saleAdminIds, startTime, endTime);
		//售票数据
		sql.append("SELECT SUM(price) AS saleAmount,COUNT(*) AS saleCount,ticket_id as id,creator_id as creatorId  FROM `user` WHERE flag=1 and ");
		sql.append(where.toString().replaceAll("px1.", "").replaceAll("px2.", ""));
		sql.append("GROUP BY creator_id,ticket_id");
		//System.out.println("售票数据SQL="+sql.toString());
		StatBean sbean=new StatBean();
		ParameterizedBeanPropertyRowMapper objRowMapper=ParameterizedBeanPropertyRowMapper.newInstance(TypeBean.class);
		objRowMapper.setMappedClass(TypeBean.class);
		List<TypeBean> list1=jt.query(sql.toString(),
				objRowMapper);
		
		newAdminMapData(sbean,list1);
		return sbean;
	
	}
	/**
	 * 入库统计报表
	 */
	//1-day,2-month,3-year
	@SuppressWarnings({ "rawtypes", "unchecked" })
	public StatBean reportTimeTicket(Integer type,String ticketIds,String saleAdminIds,String startTime,String endTime){
		String format="'%Y-%m-%d'";
		JdbcTemplate jt=super.getSimpleJdbcDao().getJdbcTemplate();
		StringBuffer sql=new StringBuffer();
		StringBuffer where=this.getWhere(ticketIds, saleAdminIds, startTime, endTime,false);
		//售票数据
		sql.append("SELECT  COUNT(*) AS saleCount,type as id,in_date FROM 'user' WHERE ");
		sql.append(where.toString().replaceAll("px1.", "").replaceAll("px2.", "").replaceAll("create_time", "in_date"));
		sql.append("GROUP BY time,type ORDER BY time asc");
		//System.out.println("售票数据SQL="+sql.toString());
		StatBean sbean=new StatBean();
		ParameterizedBeanPropertyRowMapper objRowMapper=ParameterizedBeanPropertyRowMapper.newInstance(TypeBean.class);
		objRowMapper.setMappedClass(TypeBean.class);
		List<TypeBean> list1=jt.query(sql.toString(),
				objRowMapper);
		if(!ticketIds.equals("10000")){
		newTimeMapData(sbean,list1);
		}
		return sbean;
	}
	/**
	 * 年月日报表
	 */
	@SuppressWarnings({ "rawtypes", "unchecked" })
	public StatBean reportTimeTickets(Integer type,String ticketIds,String saleAdminIds,String startTime,String endTime){
		String format="";
		if(type==1){
			format="'%Y-%m-%d'";
		}else if(type==2){
			format="'%Y-%m'";
		}else{
			format="'%Y'";
		}
		JdbcTemplate jt=super.getSimpleJdbcDao().getJdbcTemplate();
		StringBuffer sql=new StringBuffer();
		StringBuffer where=this.getWhere(ticketIds, saleAdminIds, startTime, endTime,false);
		
		//售票数据
		sql.append("SELECT SUM(price) AS saleAmount,COUNT(*) AS saleCount,ticket_id as id,DATE_FORMAT(create_time,"+format+") as time FROM `user` WHERE flag=1 and ");
		sql.append(where.toString().replaceAll("px1.", "").replaceAll("px2.", ""));
		sql.append("GROUP BY time,ticket_id ORDER BY time asc");
		//System.out.println("售票数据SQL="+sql.toString());
		StatBean sbean=new StatBean();
		ParameterizedBeanPropertyRowMapper objRowMapper=ParameterizedBeanPropertyRowMapper.newInstance(TypeBean.class);
		objRowMapper.setMappedClass(TypeBean.class);
		List<TypeBean> list1=jt.query(sql.toString(),
				objRowMapper);
		if(!ticketIds.equals("10000")){
		newTimeMapData(sbean,list1);
		}
		

		
		//补卡的押金金额
//		sql=new StringBuffer();
//		sql.append("SELECT SUM(st.pre_price) AS preAmount,st.ticket_id as id,st.creator_id as creatorId,DATE_FORMAT(st.mend_date,"+format+") as time  ");
//		sql.append("FROM mend_ticket st ");
//		sql.append("WHERE ").append(where.toString().replaceAll("px1.", "st.").replaceAll("px2.", "st.").replaceAll("create_time", "mend_date"));
//		sql.append("GROUP BY DATE_FORMAT(st.create_time,"+format+") ,st.ticket_id ");
//		//System.out.println("押金金额SQL1="+sql.toString());
//		list1=jt.query(sql.toString(),
//				objRowMapper);
//		if(!ticketIds.equals("10000")){
//		newTimeMapData(sbean,list1);
//		}
		
		//退押金金额
//		sql=new StringBuffer();
//		sql.append("SELECT SUM(rt.pre_price) AS backCAmount,u.ticket_id as id,DATE_FORMAT(rt.return_time,"+format+") as time,rt.creator_id as creatorId,");
//		sql.append("count(*) AS backCCount ");
//		sql.append("FROM  return_ticket rt ");
//		sql.append("LEFT JOIN user u ON rt.user_id=u.id ");
//		sql.append("and ");
//		sql.append(where.toString().replaceAll("px1.create_time", "rt.return_time").replaceAll("px1.", "rt.").replaceAll("px2.", "u."));
//		sql.append(" GROUP BY  DATE_FORMAT(rt.return_time,"+format+"),rt.creator_id ");
//		//System.out.println("退押金金额："+sql.toString());
//		list1=jt.query(sql.toString(),objRowMapper);
//		if (!ticketIds.equals("10000")) {
//			newTimeMapData(sbean,list1);
//		}
//     
//		//押金金额
//		sql=new StringBuffer();
//		sql.append("SELECT u.ticket_id as id,DATE_FORMAT(u.create_time,"+format+") as time ");
//		sql.append("FROM user u ");
//		sql.append("WHERE  ").append(where.toString().replaceAll("px1.", "u.").replaceAll("px2.", "u."));
//		sql.append("GROUP BY DATE_FORMAT(u.create_time,"+format+") ,u.ticket_id ");
//		System.out.println("押金金额SQL="+sql.toString());
//		list1=jt.query(sql.toString(),
//				objRowMapper);
//		if(!ticketIds.equals("10000")){
//		newTimeMapData(sbean,list1);
//		}
		/**
		 * //退票
		sql=new StringBuffer();
		sql.append("SELECT count(*) AS backTCount,st.ticket_id as id, ");
		sql.append("DATE_FORMAT(rt.return_time,"+format+") as time ");
		sql.append("FROM  return_ticket rt ");
		sql.append("LEFT JOIN sale_ticket st ON rt.sale_ticket_id=st.id ");
		sql.append("WHERE ");
		sql.append(where.toString().replaceAll("px1.create_time", "rt.return_time").replaceAll("px1.", "rt.").replaceAll("px2.", "st."));
		sql.append(" GROUP BY DATE_FORMAT(rt.return_time,"+format+"),st.ticket_id ");
		//System.out.println("退票SQL="+sql.toString());
		list1=jt.query(sql.toString(),
				objRowMapper);
		if(!ticketIds.equals("10000")){
		newTimeMapData(sbean,list1);
		}
		//退卡
		sql=new StringBuffer();
		sql.append("SELECT SUM(rt.pre_price) AS backCAmount,count(*) AS backCCount,st.ticket_id as id, ");
		sql.append("DATE_FORMAT(rt.return_time,"+format+") as time ");
		sql.append("FROM  return_ticket rt ");
		sql.append("LEFT JOIN sale_ticket st ON rt.sale_ticket_id=st.id ");
		sql.append("WHERE ");
		sql.append(where.toString().replaceAll("px1.create_time", "rt.return_time").replaceAll("px1.", "rt.").replaceAll("px2.", "st."));
		sql.append(" GROUP BY DATE_FORMAT(rt.return_time,"+format+"),st.ticket_id ");
	//	System.out.println("退卡SQL="+sql.toString());
		list1=jt.query(sql.toString(),
				objRowMapper);
		if(!ticketIds.equals("10000")){
		newTimeMapData(sbean,list1);
		}*/
		//续费
//		sql=new StringBuffer();
//		sql.append("SELECT SUM(et.price) AS addAmount,count(*) AS addCount,u.ticket_id as id, ");
//		sql.append("DATE_FORMAT(et.create_time,"+format+") as time ");
//		sql.append("FROM  extend_ticket et ");
//		sql.append("LEFT JOIN user u ON et.user_id=u.id WHERE ");
//		sql.append(where.toString().replaceAll("px1.", "et.").replaceAll("px2.", "u."));
//		sql.append(" GROUP BY DATE_FORMAT(et.create_time,"+format+"),u.ticket_id ");
//		//System.out.println("续费SQL="+sql.toString());
//		list1=jt.query(sql.toString(),
//				objRowMapper);
//		if(!ticketIds.equals("10000")){
//		newTimeMapData(sbean,list1);
//		}
		//补卡
//		sql=new StringBuffer();
//		sql.append("SELECT SUM(mt.price) AS mendAmount,count(*) AS mendCount,mt.ticket_id as id, ");
//		sql.append("DATE_FORMAT(mt.create_time,"+format+") as time ");
//		sql.append("FROM  mend_ticket mt ");
//		sql.append(" WHERE  mt.price>0 and ");
//		sql.append(where.toString().replaceAll("px1.", "mt.").replaceAll("px2.", "mt."));
//		sql.append(" GROUP BY DATE_FORMAT(mt.create_time,"+format+"),mt.ticket_id ");
//		System.out.println("补卡SQL="+sql.toString());
//		list1=jt.query(sql.toString(),
//				objRowMapper);
//		if(!ticketIds.equals("10000")){
//		newTimeMapData(sbean,list1);		
//		}
		return sbean;
	}
	
	@SuppressWarnings({ "rawtypes", "unchecked" })	
	public TimeBean reportTicket(
			String ticketIds,String saleAdminIds,String startTime,String endTime){
		JdbcTemplate jt=super.getSimpleJdbcDao().getJdbcTemplate();
		StringBuffer sql=new StringBuffer();
		
		StringBuffer where=this.getWhere(ticketIds, saleAdminIds, startTime, endTime);
		//售票数据
		sql.append("SELECT SUM(u.price) AS saleAmount,COUNT(*) AS saleCount,t.id,t.type FROM `user` u WHERE u.flag=1 and ");
		sql.append(where.toString().replaceAll("px1.", "u.").replaceAll("px2.", "u.").replaceAll("sale_date", "create_time"));
		sql.append("LEFT JOIN ticket t ON u.ticket_id=t.id ");
		sql.append("GROUP BY t.type,t.id ");
		//System.out.println("售票数据SQL="+sql.toString());
		TimeBean tbean=new TimeBean();
		ParameterizedBeanPropertyRowMapper objRowMapper=ParameterizedBeanPropertyRowMapper.newInstance(TypeBean.class);
		objRowMapper.setMappedClass(TypeBean.class);
		List<TypeBean> list1=jt.query(sql.toString(),
				objRowMapper);
		if(!ticketIds.equals("10000")){
			newMapData(tbean,list1);
		}
		
		//补卡的工本费、人数
//		sql=new StringBuffer();
//		sql.append("SELECT SUM(st.price) AS mendAmount,count(*) as mendCount,t.id,t.type ");
//		sql.append("FROM mend_ticket st ");
//		sql.append("LEFT JOIN ticket t ON st.ticket_id=t.id ");
//		sql.append("WHERE st.price>0 and  ").append(where.toString().replaceAll("px1.", "st.").replaceAll("px2.", "st.").replaceAll("create_time", "mend_date"));
//		sql.append("GROUP BY t.type,t.id ");
//		System.out.println("押金金额SQL="+sql.toString());
//		list1=jt.query(sql.toString(),
//				objRowMapper);
//		if(!ticketIds.equals("10000")){
//		newMapData(tbean,list1);
//		}
//	
		/*
		//押金金额
		sql=new StringBuffer();
		sql.append("SELECT t.id,t.type,sum(u.pre_price) as preAmount ");
		sql.append("FROM user u ");
		sql.append("LEFT JOIN ticket t ON u.ticket_id=t.id ");
		sql.append("WHERE ").append(where.toString().replaceAll("px1.", "u.").replaceAll("px2.", "u."));
		sql.append("GROUP BY t.type,t.id ");
		//System.out.println("押金金额SQL="+sql.toString());
		list1=jt.query(sql.toString(),
				objRowMapper);
		if(!ticketIds.equals("10000")){
			newMapData(tbean,list1);
		}
		//退押金金额,user表,ticker表,return_ticker表
		sql=new StringBuffer();
		sql.append("SELECT SUM(rt.pre_price) AS backCAmount,t.type,u.ticket_id as id,rt.creator_id as creatorId,");
		sql.append("count(*) AS backCCount ");
		sql.append("FROM user u ");
		sql.append("LEFT JOIN (return_ticket rt,ticket t) ");
		sql.append("ON (rt.user_id=u.id and u.ticket_id=t.id) ");
		sql.append("WHERE u.pre_price>0 and ");
		sql.append(where.toString().replaceAll("px1.create_time", "rt.return_time").replaceAll("px1.", "rt.").replaceAll("px2.", "u."));
		sql.append(" GROUP BY rt.creator_id ");
		//System.out.println("退押金金额："+sql.toString());
		list1=jt.query(sql.toString(),objRowMapper);
		if(!ticketIds.equals("10000")){
			newMapData(tbean,list1);
		}
		*/
		/**
		//退票
		sql=new StringBuffer();
		sql.append("SELECT SUM(rt.return_price) AS backTAmount,count(*) AS backTCount,t.id,t.type,t.category ");
		sql.append("FROM  return_ticket rt ");
		sql.append("LEFT JOIN sale_ticket st ON rt.sale_ticket_id=st.id ");
		sql.append("LEFT JOIN ticket t ON st.ticket_id=t.id WHERE  rt.type>1 AND ");
		sql.append(where.toString().replaceAll("px1.create_time", "rt.return_time").replaceAll("px1.", "rt.").replaceAll("px2.", "st."));
		sql.append(" GROUP BY t.category,t.type,t.id ");
		//System.out.println("退票SQL="+sql.toString());
		list1=jt.query(sql.toString(),
				objRowMapper);
		if(!ticketIds.equals("10000")){
		newMapData(tbean,list1);
		}
		//退卡
		sql=new StringBuffer();
		sql.append("SELECT SUM(rt.pre_price) AS backCAmount,count(*) AS backCCount,t.id,t.type,t.category ");
		sql.append("FROM  return_ticket rt ");
		sql.append("LEFT JOIN sale_ticket st ON rt.sale_ticket_id=st.id ");
		sql.append("LEFT JOIN ticket t ON st.ticket_id=t.id WHERE  ");
		sql.append(where.toString().replaceAll("px1.create_time", "rt.return_time").replaceAll("px1.", "rt.").replaceAll("px2.", "st."));
		sql.append(" GROUP BY t.category,t.type,t.id ");
		//System.out.println("退卡SQL="+sql.toString());
		list1=jt.query(sql.toString(),
				objRowMapper);
		if(!ticketIds.equals("10000")){
		newMapData(tbean,list1);
		}
		*/
		/*
		//续费
		sql=new StringBuffer();
		sql.append("SELECT SUM(et.price) AS addAmount,count(*) AS addCount,t.id,t.type ");
		sql.append("FROM  extend_ticket et ");
		sql.append("LEFT JOIN user u ON et.user_id=u.id ");
		sql.append("LEFT JOIN ticket t ON u.ticket_id=t.id WHERE ");
		sql.append(where.toString().replaceAll("px1.", "et.").replaceAll("px2.", "u."));
		sql.append(" GROUP BY t.type,t.id ");
		//System.out.println("续费SQL="+sql.toString());
		list1=jt.query(sql.toString(),
				objRowMapper);
		if(!ticketIds.equals("10000")){
		newMapData(tbean,list1);
		}
		//补卡
		sql=new StringBuffer();
		sql.append("SELECT SUM(mt.price) AS mendAmount,count(*) AS mendCount,t.id,t.type ");
		sql.append("FROM  mend_ticket mt ");
		sql.append("LEFT JOIN ticket t ON mt.ticket_id=t.id WHERE mt.price>0 and ");
		sql.append(where.toString().replaceAll("px1.", "mt.").replaceAll("px2.", "mt."));
		sql.append(" GROUP BY t.type,t.id ");
		//System.out.println("补卡SQL="+sql.toString());
		list1=jt.query(sql.toString(),
				objRowMapper);
		if(!ticketIds.equals("10000")){
		newMapData(tbean,list1);
		}
		*/
		return tbean;
	}
	public StringBuffer getWhere(String ticketIds,String saleAdminIds,String startTime,String endTime){
		return this.getWhere(ticketIds, saleAdminIds, startTime, endTime,true);
	}
	public StringBuffer getWhere(String ticketIds,String saleAdminIds,String startTime,String endTime,boolean equals){
		StringBuffer where=new StringBuffer();
		if(equals){
			where.append(" px1.create_time between '").append(startTime).append("' AND ");
			where.append("'").append(endTime).append("'");
		}else{
			where.append(" px1.create_time >= '").append(startTime).append("' AND ");
			where.append(" px1.create_time <'").append(endTime).append("' ");
		}
		if(!StringHelper.isEmpty(saleAdminIds) && saleAdminIds.indexOf("-1")==-1){
			if(StringHelper.isNumberic(saleAdminIds)){
				where.append(" AND px1.creator_id =").append(saleAdminIds).append(" ");
			}else{
				where.append(" AND px1.creator_id in (").append(saleAdminIds).append(") ");
			}
		}
		return where;
	}
	
	private void newMapData(TimeBean tbean,List<TypeBean> list1){
		for(TypeBean vo:list1){
			StatBean sbean=tbean.map.get(vo.getCategory());
			if(sbean==null){
				sbean=new StatBean();
				sbean.setId(vo.getCategory());
				sbean.setName(TimeBean.CATEGORY_MAP.get(sbean.getId()));
				tbean.map.put(sbean.getId(), sbean);
				tbean.list.add(sbean);
			}
			CategoryBean cbean=sbean.map.get(vo.getType()+"");
			if(cbean==null){
				cbean=new CategoryBean();
				cbean.setId(vo.getType());
				cbean.setName(TimeBean.TYPE_MAP.get(cbean.getId()));
				sbean.map.put(vo.getType()+"", cbean);
				sbean.list.add(cbean);
			}
			TypeBean tt=cbean.map.get(vo.getId());
			if(tt==null){
				tt=vo;
				cbean.map.put(vo.getId(), tt);
				cbean.list.add(tt);
				MyBeanUtils.copyProperties(vo, tt);
			}else{
				if(vo.getPreAmount()!=null){					
					if(tt.getPreAmount()==null){
						tt.setPreAmount(vo.getPreAmount());
					}else{
						tt.setPreAmount(tt.getPreAmount()+vo.getPreAmount());
					}
				}				
				if(vo.getBackCAmount()!=null){					
					if(tt.getBackCAmount()==null){
						tt.setBackCAmount(vo.getBackCAmount());
					}else{
						tt.setBackCAmount(tt.getBackCAmount()+vo.getBackCAmount());
					}
				}
				
				if(vo.getAddAmount()!=null){					
					if(tt.getAddAmount()==null){
						tt.setAddAmount(vo.getAddAmount());
					}else{
						tt.setAddAmount(tt.getAddAmount()+vo.getAddAmount());
					}
				}
				if(vo.getMendAmount()!=null){					
					if(tt.getMendAmount()==null){
						tt.setMendAmount(vo.getMendAmount());
					}else{
						tt.setMendAmount(tt.getMendAmount()+vo.getMendAmount());
					}
				}
				
				if(vo.getBackTAmount()!=null){					
					if(tt.getBackTAmount()==null){
						tt.setBackTAmount(vo.getBackTAmount());
					}else{
						tt.setBackTAmount(tt.getBackTAmount()+vo.getBackTAmount());
					}
				}
				if(vo.getBackTCount()!=null){					
					if(tt.getBackTCount()==null){
						tt.setBackTCount(vo.getBackTCount());
					}else{
						tt.setBackTCount(tt.getBackTCount()+vo.getBackTCount());
					}
				}
				
				if(vo.getBackCCount()!=null){					
					if(tt.getBackCCount()==null){
						tt.setBackCCount(vo.getBackCCount());
					}else{
						tt.setBackCCount(tt.getBackCCount()+vo.getBackCCount());
					}
				}
				if(vo.getAddCount()!=null){					
					if(tt.getAddCount()==null){
						tt.setAddCount(vo.getAddCount());
					}else{
						tt.setAddCount(tt.getAddCount()+vo.getAddCount());
					}
				}
				
				if(vo.getMendCount()!=null){					
					if(tt.getMendCount()==null){
						tt.setMendCount(vo.getMendCount());
					}else{
						tt.setMendCount(tt.getMendCount()+vo.getMendCount());
					}
				}
				
			}
		}
	}
	
	private void newTimeMapData(StatBean sbean,List<TypeBean> list1){
		for(TypeBean vo:list1){//2
			CategoryBean cbean=sbean.map.get(vo.getTime());
			if(cbean==null){
				cbean=new CategoryBean();
				cbean.setName(vo.getTime());
				sbean.map.put(vo.getTime(), cbean);
				sbean.list.add(cbean);
			}
			TypeBean tt=cbean.map.get(vo.getId());
			if(tt==null){
				tt=vo;
				cbean.map.put(vo.getId(), tt);
				cbean.list.add(tt);
				MyBeanUtils.copyProperties(vo, tt);
			}else{
				if(vo.getPreAmount()!=null){					
					if(tt.getPreAmount()==null){
						tt.setPreAmount(vo.getPreAmount());
					}else{
						tt.setPreAmount(tt.getPreAmount()+vo.getPreAmount());
					}
				}				
				if(vo.getBackCAmount()!=null){					
					if(tt.getBackCAmount()==null){
						tt.setBackCAmount(vo.getBackCAmount());
					}else{
						tt.setBackCAmount(tt.getBackCAmount()+vo.getBackCAmount());
					}
				}
				
				if(vo.getAddAmount()!=null){					
					if(tt.getAddAmount()==null){
						tt.setAddAmount(vo.getAddAmount());
					}else{
						tt.setAddAmount(tt.getAddAmount()+vo.getAddAmount());
					}
				}
				if(vo.getMendAmount()!=null){					
					if(tt.getMendAmount()==null){
						tt.setMendAmount(vo.getMendAmount());
					}else{
						tt.setMendAmount(tt.getMendAmount()+vo.getMendAmount());
					}
				}
				
				if(vo.getBackTAmount()!=null){					
					if(tt.getBackTAmount()==null){
						tt.setBackTAmount(vo.getBackTAmount());
					}else{
						tt.setBackTAmount(tt.getBackTAmount()+vo.getBackTAmount());
					}
				}
				if(vo.getBackTCount()!=null){					
					if(tt.getBackTCount()==null){
						tt.setBackTCount(vo.getBackTCount());
					}else{
						tt.setBackTCount(tt.getBackTCount()+vo.getBackTCount());
					}
				}
				
				if(vo.getBackCCount()!=null){					
					if(tt.getBackCCount()==null){
						tt.setBackCCount(vo.getBackCCount());
					}else{
						tt.setBackCCount(tt.getBackCCount()+vo.getBackCCount());
					}
				}
				if(vo.getAddCount()!=null){					
					if(tt.getAddCount()==null){
						tt.setAddCount(vo.getAddCount());
					}else{
						tt.setAddCount(tt.getAddCount()+vo.getAddCount());
					}
				}
				
				if(vo.getMendCount()!=null){					
					if(tt.getMendCount()==null){
						tt.setMendCount(vo.getMendCount());
					}else{
						tt.setMendCount(tt.getMendCount()+vo.getMendCount());
					}
				}
				
			}
		}
	}
	
	private void newAdminMapData(StatBean sbean,List<TypeBean> list1){
		for(TypeBean vo:list1){
			CategoryBean cbean=sbean.map.get(vo.getCreatorId()+"");
			if(cbean==null){
				cbean=new CategoryBean();
				cbean.setId(vo.getCreatorId());
				sbean.map.put(vo.getCreatorId()+"", cbean);
				sbean.list.add(cbean);
			}
			TypeBean tt=cbean.map.get(vo.getId());
			if(tt==null){
				tt=vo;
				cbean.map.put(vo.getId(), tt);
				cbean.list.add(tt);
				MyBeanUtils.copyProperties(vo, tt);
			}else{
				if(vo.getPreAmount()!=null){					
					if(tt.getPreAmount()==null){
						tt.setPreAmount(vo.getPreAmount());
					}else{
						tt.setPreAmount(tt.getPreAmount()+vo.getPreAmount());
					}
				}				
				if(vo.getBackCAmount()!=null){					
					if(tt.getBackCAmount()==null){
						tt.setBackCAmount(vo.getBackCAmount());
					}else{
						tt.setBackCAmount(tt.getBackCAmount()+vo.getBackCAmount());
					}
				}
				
				if(vo.getAddAmount()!=null){					
					if(tt.getAddAmount()==null){
						tt.setAddAmount(vo.getAddAmount());
					}else{
						tt.setAddAmount(tt.getAddAmount()+vo.getAddAmount());
					}
				}
				if(vo.getMendAmount()!=null){					
					if(tt.getMendAmount()==null){
						tt.setMendAmount(vo.getMendAmount());
					}else{
						tt.setMendAmount(tt.getMendAmount()+vo.getMendAmount());
					}
				}
				
				if(vo.getBackTAmount()!=null){					
					if(tt.getBackTAmount()==null){
						tt.setBackTAmount(vo.getBackTAmount());
					}else{
						tt.setBackTAmount(tt.getBackTAmount()+vo.getBackTAmount());
					}
				}
				if(vo.getBackTCount()!=null){					
					if(tt.getBackTCount()==null){
						tt.setBackTCount(vo.getBackTCount());
					}else{
						tt.setBackTCount(tt.getBackTCount()+vo.getBackTCount());
					}
				}
				
				if(vo.getBackCCount()!=null){					
					if(tt.getBackCCount()==null){
						tt.setBackCCount(vo.getBackCCount());
					}else{
						tt.setBackCCount(tt.getBackCCount()+vo.getBackCCount());
					}
				}
				if(vo.getAddCount()!=null){					
					if(tt.getAddCount()==null){
						tt.setAddCount(vo.getAddCount());
					}else{
						tt.setAddCount(tt.getAddCount()+vo.getAddCount());
					}
				}
				
				if(vo.getMendCount()!=null){					
					if(tt.getMendCount()==null){
						tt.setMendCount(vo.getMendCount());
					}else{
						tt.setMendCount(tt.getMendCount()+vo.getMendCount());
					}
				}
				
			}
		}
	}
	
	private void handPrePriceMapData(CategoryBean cbean,List<TypeBean> list1){
		for(TypeBean vo:list1){
			TypeBean tt=cbean.map.get(vo.getCreatorId());
			if(tt==null){
				tt=vo;
				cbean.map.put(vo.getCreatorId(), tt);
				cbean.list.add(tt);
				MyBeanUtils.copyProperties(vo, tt);
			}else{
				if(vo.getPreAmount()!=null){					
					if(tt.getPreAmount()==null){
						tt.setPreAmount(vo.getPreAmount());
					}else{
						tt.setPreAmount(tt.getPreAmount()+vo.getPreAmount());
					}
				}	
				if(vo.getAddAmount()!=null){					
					if(tt.getAddAmount()==null){
						tt.setAddAmount(vo.getAddAmount());
					}else{
						tt.setAddAmount(tt.getAddAmount()+vo.getAddAmount());
					}
				}	
				if(vo.getBackCAmount()!=null){					
					if(tt.getBackCAmount()==null){
						tt.setBackCAmount(vo.getBackCAmount());
						tt.setBackCCount(vo.getBackCCount());
					}else{
						tt.setBackCAmount(tt.getBackCAmount()+vo.getBackCAmount());
						tt.setBackCCount(tt.getBackCCount()+vo.getBackCCount());
					}
					
				}	
				
			}
			
		}
	}

	private void prePriceMapData(CategoryBean cbean,List<TypeBean> list1){
		for(TypeBean vo:list1){
			TypeBean tt=cbean.map.get(vo.getCreatorId());
			if(tt==null){
				tt=vo;
				cbean.map.put(vo.getCreatorId(), tt);
				cbean.list.add(tt);
				MyBeanUtils.copyProperties(vo, tt);
			}else{
				if(vo.getPreAmount()!=null){					
					if(tt.getPreAmount()==null){
						tt.setPreAmount(vo.getPreAmount());
					}else{
						tt.setPreAmount(tt.getPreAmount()+vo.getPreAmount());
					}
				}	
				if(vo.getBackCAmount()!=null){					
					if(tt.getBackCAmount()==null){
						tt.setBackCAmount(vo.getBackCAmount());
						tt.setBackCCount(vo.getBackCCount());
					}else{
						tt.setBackCAmount(tt.getBackCAmount()+vo.getBackCAmount());
						tt.setBackCCount(tt.getBackCCount()+vo.getBackCCount());
					}
					
				}	
				
			}
			
		}
	}
	public static void main(String[] s){
		TypeBean tt=new TypeBean();
		tt.setId(3);
		tt.setName("33333333");
		TypeBean tt2=new TypeBean();
		tt2.setName("44444444");
		try {
			MyBeanUtils.copyProperties(tt2, tt);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		System.out.println("tt.id="+tt.getId()+":name="+tt.getName());
	}

	@SuppressWarnings({ "unchecked", "rawtypes" })
	public List<ReportBean> reportTripMac(String deviceStrIds,String startTime,String endTime){
		JdbcTemplate jt=super.getSimpleJdbcDao().getJdbcTemplate();
		StringBuffer sql=new StringBuffer();
		sql.append("SELECT t.*, e.name FROM ( ");
		if(!StringHelper.isEmpty(startTime)){
			sql.append(" AND rl.pass_time >='").append(startTime).append("'");
		}
		if(!StringHelper.isEmpty(endTime)){
			sql.append(" AND rl.pass_time <='").append(endTime).append("'");
		}
		sql.append(" ) t ");
		ParameterizedBeanPropertyRowMapper objRowMapper=ParameterizedBeanPropertyRowMapper.newInstance(ReportBean.class);
		List<ReportBean> list1=jt.query(sql.toString(),
				objRowMapper);
		return list1;
	}
}
