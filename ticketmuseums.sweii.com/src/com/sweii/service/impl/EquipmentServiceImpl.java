package com.sweii.service.impl;
import java.util.Date;
import java.util.List;

import org.apache.mina.common.IoSession;
import org.springframework.stereotype.Service;

import com.sweii.dao.BaseServiceImpl;
import com.sweii.server.ServerHandler;
import com.sweii.util.PageUtil;
import com.sweii.vo.Equipment;
@Service("equipmentService")
public class EquipmentServiceImpl extends BaseServiceImpl {
    public void beforeAddEquipment(Equipment equipment) {
	equipment.setCreateTime(new Date());
    }
    public void beforeEditEquipment(Equipment equipment,List<String> fields) {
    	equipment.setCreateTime(new Date());
    	Equipment ment=this.equipmentDao.getById(equipment.getId());
    	if(!ment.getIp().equals(equipment.getIp())){
    		IoSession session=ServerHandler.sessions.get(ment.getIp());
    		if(session!=null){
    			session.close();
    		}
    	}
   }
    public void afterQueryEquipment(Equipment equipment,String hql,Object[] params) {
	PageUtil<Equipment> page=(PageUtil<Equipment>)this.getRequest().getAttribute("resultPage");
	for(Equipment ment:page.getResult()){
	    if(ServerHandler.equipments.get(ment.getIp())!=null){
		ment.setStatusStr("<span style='color:red;'>已连接</span>");
	    }else{
		ment.setStatusStr("未连接");
	    }
	}
    }
}
