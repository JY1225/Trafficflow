package com.sweii.util;

import java.util.Date;
import java.util.List;

import org.springframework.stereotype.Service;

import com.sweii.dao.BaseServiceImpl;
import com.sweii.vo.Setting;

/**
 * 
 * @author duncan
 * @createTime 2010-7-3
 * @version 1.0
 */
@Service("qosService")
public class QosTask extends BaseServiceImpl {
	public static int i = 0;
    public static boolean flag=true;
    public static boolean downloadFlag=true;
	public void checkQos() throws Exception {	
		if(i++==0){
			  // HttpUtil.httpPost(Environment.INIT_URL,"POST",null,null,null);
			   
		}
		Date date =new Date();
		date.setMinutes(date.getMinutes()-3);
		/*
		this.siteDao.update("update Site set siteStatus=1,lockTime=null,lockId=null where siteStatus=3 and lockTime<=?",date);
	    List<PreOrder> orders=this.preOrderDao.find("from PreOrder where status=1 and lockTime<?", this.getNowDate());
	    for(PreOrder order:orders){//解锁
	    	this.preOrderDao.update("update PreOrder set status=3 where id=?", order.getId());
	    	this.orderSiteDao.update("update OrderSite set status=2 where order.id=?", order.getId());
	    }
	    if(HHmm.format(new Date()).equals("00:00")){//每天删除临时表
			this.tempLogDao.delete("delete from TempLog");
		}*/
		Setting setting = this.settingDao.getById(1);
		if (setting!=null&&setting.getAutoBak().intValue() == 1) {
		    if (setting.getTime1() != null&&setting.getTime1().equals(HHmm.format(new Date()))) {
			this.commonService.backup(1);
		    }
		    if (setting.getTime2() != null&&setting.getTime2().equals(HHmm.format(new Date()))) {
			this.commonService.backup(1);
		    }
		    if (setting.getTime3() != null&&setting.getTime3().equals(HHmm.format(new Date()))) {
			this.commonService.backup(1);
		    }
		    if (setting.getTime4() != null&&setting.getTime4().equals(HHmm.format(new Date()))) {
			this.commonService.backup(1);
		    }
		    if (setting.getTime5() != null&&setting.getTime5().equals(HHmm.format(new Date()))) {
			this.commonService.backup(1);
		    }
		    if (setting.getTime6() != null&&setting.getTime6().equals(HHmm.format(new Date()))) {
			this.commonService.backup(1);
		    }
		    if (setting.getTime7() != null&&setting.getTime7().equals(HHmm.format(new Date()))) {
			this.commonService.backup(1);
		    }
		    if (setting.getTime8() != null&&setting.getTime8().equals(HHmm.format(new Date()))) {
			this.commonService.backup(1);
		    }
		    if (setting.getTime9() != null&&setting.getTime9().equals(HHmm.format(new Date()))) {
			this.commonService.backup(1);
		    }
		    if (setting.getTime10() != null&&setting.getTime10().equals(HHmm.format(new Date()))) {
			this.commonService.backup(1);
		    }
		}
	}
	
}
