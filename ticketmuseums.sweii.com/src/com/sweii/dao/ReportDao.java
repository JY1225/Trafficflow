package com.sweii.dao;

import java.util.List;

import com.sweii.bean.ReportBean;
import com.sweii.bean.StatBean;
import com.sweii.bean.TimeBean;

public interface ReportDao {
	public TimeBean reportTicket(
			String ticketIds,String saleAdminIds,String startTime,String endTime);
	public StatBean reportTimeTicket(Integer type,String ticketIds,String saleAdminIds,String startTime,String endTime);
	public StatBean reportTimeTickets(Integer type,String ticketIds,String saleAdminIds,String startTime,String endTime);
	public StatBean reportAdminTicket(String ticketIds,String saleAdminIds,String startTime,String endTime);
	public List<ReportBean> reportTripMac(String deviceStrIds,String startTime,String endTime);
}
