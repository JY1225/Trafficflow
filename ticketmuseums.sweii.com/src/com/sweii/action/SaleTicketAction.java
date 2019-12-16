package com.sweii.action;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.LineNumberReader;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.GregorianCalendar;
import java.util.List;
import java.util.Random;

import org.springframework.web.context.request.RequestAttributes;


import com.erican.auth.vo.Admin;
import com.sun.jna.Native;
import com.sweii.bean.AdminStatBean;
import com.sweii.bean.Termb;
import com.sweii.vo.CardInfo;
import com.sweii.vo.Ticket;
import com.sweii.vo.User;

public class SaleTicketAction extends CommonVo {
	private String cardNumber;
	private int saleType;
	private String ids;
	private String phone;
	private Integer id;
	private Integer hiddenType;
	private File file;
	private String price;
	
	public String prepareCommonSaleTicket() throws Exception {
	// ServletActionContext.getContext().getSession().values();
	List<Ticket> tickets = this.ticketDao.find("from Ticket");
	this.setRequestAttribute("tickets", tickets);
	
	AdminStatBean bean = (AdminStatBean) this.getRequest().getSession().getAttribute("adminStat");
	return SUCCESS;
	}
	
	public void readCardInfo(){
		Termb lib = (Termb) Native.loadLibrary ("termb", Termb.class);
		Termb.IdCardTxtInfo info = new Termb.IdCardTxtInfo();
		if (lib.InitComm(1001) != 1){
			System.out.println ("InitComm error!");		
			super.responseJson("{message:'连接失败，请检查身份证读卡器是否打开'}");
			return;
		}
		lib.Authenticate();
		if (lib.Read_Content(1) != 1){
			System.out.println ("Read_Content error!");	
			super.responseJson("{message:'读卡失败，请检查身份证读卡器是否放置了身份证'}");
			return;
		}
		lib.GetIdCardTxtInfo(info);
		String name="";
		String sex="";
		String address="";
		String personNo="";
		try{
			name=new String(info.name, "gb2312");
			sex=new String(info.Sex, "gb2312");
			address=new String(info.address, "gb2312");
			personNo=new String(info.idno, "gb2312");
		}catch(IOException e){   
			e.printStackTrace();   
		}  
		this.responseJson("{name:'" + name.trim() + "',sex:'"+sex.trim()+"',address:'"+address.trim()+"',personNo:'"+personNo.trim()+"'}");
	}
	public void addSaleTicket(){
		CardInfo cardInfo=cardInfoDao.findEntiry("from CardInfo where number=? and status=1", cardNumber);
		List<Ticket> tickets=ticketDao.find("from Ticket ");
		if (cardInfo==null) {
			this.responseJson("{message:'卡号无效或未入库',ticketSize:"+tickets.size()+"}");
			return;
		}else{
    	Ticket ticket=ticketDao.findEntiry("from Ticket where id=?", hiddenType);
    	System.out.println(hiddenType);
    	Admin admin=getAdminId();
    	User user =new User();
    	Date date=new Date();	//销售时间 汇总表字段
    	date.setMinutes(0);
    	date.setHours(0);
    	date.setSeconds(0);
    	user.setAdmin(admin);
    	user.setTicket(ticket);
    	user.setSaleTime(date);
    	user.setStatus(1);
    	user.setNumber(cardNumber);
    	user.setSize(ticket.getSize());
    	user.setCreateTime(new Date());
    	user.setStartTime(new Date());	//开始时间 过闸时间字段
    	Date data=new Date();	
    	data.setHours(23);
    	data.setMinutes(59);
    	data.setSeconds(59);
    	user.setEndTime(data);//最后时间 过闸时间字段
    	cardInfo.setStatus("2");
		cardInfoDao.saveOrUpdate(cardInfo);
    	userDao.save(user);
    	this.responseJson("{status:1,ticketSize:"+tickets.size()+"}");
		}
	}
	
	public void importCard(){
		if (file!=null) {
			try {
				InputStreamReader in=new InputStreamReader(new FileInputStream(file));
				LineNumberReader input = new LineNumberReader(in);
				String line = "";
				int size=0;
				while ((line = input.readLine()) != null) {
					String numbers[]=line.split(" ");
					CardInfo count=cardInfoDao.findEntiry("from CardInfo where number=?", numbers[0]);
					if (count==null) {
						CardInfo card=new CardInfo();
						card.setNumber(numbers[0]);
						card.setCreateTime(new Date());
						cardInfoDao.save(card);
						size++;
					}
				}
				input.close();
				 this.getResponse().setHeader("Cache-Control", "no-cache");
				 this.getResponse().setContentType("text/html;charset=GBK");
				this.getResponse().getWriter().println("<script>parent.Parent.closeDialog(" + size + ");</script>");
				 return;
			} catch (Exception e) {
				e.printStackTrace();
			}
		}
	}
	/**
	 * 获取admin对象
	 * @return
	 */
	private Admin getAdminId(){
		Integer id = this.getLoginAdminId();// 获取销售员ID
	 	Admin admin = adminDao.findEntiry("from Admin where id=?", id);
	 	return admin;
	}
	public String getCardNumber() {
		return cardNumber;
	}

	public void setCardNumber(String cardNumber) {
		this.cardNumber = cardNumber;
	}

	public int getSaleType() {
		return saleType;
	}

	public void setSaleType(int saleType) {
		this.saleType = saleType;
	}


	public String getIds() {
		return ids;
	}

	public void setIds(String ids) {
		this.ids = ids;
	}


	public String getPhone() {
		return phone;
	}

	public void setPhone(String phone) {
		this.phone = phone;
	}



	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}



	public Integer getHiddenType() {
		return hiddenType;
	}

	public void setHiddenType(Integer hiddenType) {
		this.hiddenType = hiddenType;
	}

	public File getFile() {
		return file;
	}

	public void setFile(File file) {
		this.file = file;
	}
}
