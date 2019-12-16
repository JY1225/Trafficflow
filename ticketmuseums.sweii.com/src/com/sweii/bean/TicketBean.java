package com.sweii.bean;

import java.util.Date;

public class TicketBean {
    private Integer id;
    private String number;
    private Date endTime;
    private Integer ticketId;
    private String ticketName;
    private Integer linkId;
    private String linkTicketName;
    private Integer type;
    private int limitSize;
    private Integer category;    
	public Integer getLinkId() {
		return linkId;
	}
	public void setLinkId(Integer linkId) {
		this.linkId = linkId;
	}
	public Integer getCategory() {
		return category;
	}
	public void setCategory(Integer category) {
		this.category = category;
	}
	public Integer getType() {
		return type;
	}
	public void setType(Integer type) {
		this.type = type;
	}
	public String getLinkTicketName() {
        return linkTicketName;
    }
    public void setLinkTicketName(String linkTicketName) {
        this.linkTicketName = linkTicketName;
    }
    private int size=0;
    
    public Date getEndTime() {
		return endTime;
	}
	public void setEndTime(Date endTime) {
		this.endTime = endTime;
	}
	public Integer getId() {
        return id;
    }
    public void setId(Integer id) {
        this.id = id;
    }
    public String getNumber() {
        return number;
    }
    public void setNumber(String number) {
        this.number = number;
    }
    public Integer getTicketId() {
        return ticketId;
    }
    public void setTicketId(Integer ticketId) {
        this.ticketId = ticketId;
    }
    public String getTicketName() {
        return ticketName;
    }
    public void setTicketName(String ticketName) {
        this.ticketName = ticketName;
    }
    public int getSize() {
        return size;
    }
    public void setSize(int size) {
        this.size = size;
    }
	public int getLimitSize() {
		return limitSize;
	}
	public void setLimitSize(int limitSize) {
		this.limitSize = limitSize;
	}
    
}
