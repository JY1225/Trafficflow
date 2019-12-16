package com.sweii.vo;
import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import com.erican.auth.vo.Admin;
import com.sweii.framework.annotation.Sweii;
@Entity
@org.hibernate.annotations.Entity(dynamicInsert = true, dynamicUpdate = true)
public class User {
    private Integer id;
    private String number;
    private Integer price;
    private Ticket ticket;
    private Admin admin;
    private Integer size;
    private Date startTime;
    private Date endTime;
    private Date createTime;
    private Date saleTime;
    private Date lastTime;
    private Integer status;
    private Integer flag;
    
    public Integer getSize() {
		return size;
	}
	public void setSize(Integer size) {
		this.size = size;
	}
	@ManyToOne(optional = true, fetch = FetchType.LAZY)
    @JoinColumn(name = "creator_id", nullable = true)
    public Admin getAdmin() {
        return admin;
    }
    public void setAdmin(Admin admin) {
        this.admin = admin;
    }
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    public Integer getId() {
	return id;
    }
    public void setId(Integer id) {
	this.id = id;
    }
    public Integer getPrice() {
	return price;
    }
    public void setPrice(Integer price) {
	this.price = price;
    }
    @Sweii(format = "yyyy-MM-dd")
    public Date getStartTime() {
	return startTime;
    }
    public void setStartTime(Date startTime) {
	this.startTime = startTime;
    }
    @Sweii(format = "yyyy-MM-dd")
    public Date getEndTime() {
	return endTime;
    }
    public void setEndTime(Date endTime) {
	this.endTime = endTime;
    }
    @ManyToOne(optional = true, fetch = FetchType.LAZY)
    @JoinColumn(name = "ticket_id", nullable = true)
    public Ticket getTicket() {
	return ticket;
    }
    public void setTicket(Ticket ticket) {
	this.ticket = ticket;
    }
    @Sweii(format = "yyyy-MM-dd HH:mm:ss")
    public Date getCreateTime() {
	return createTime;
    }
    public void setCreateTime(Date createTime) {
	this.createTime = createTime;
    }
    
    
    @Sweii(format = "yyyy-MM-dd HH:mm:ss")
    public Date getLastTime() {
        return lastTime;
    }
    public void setLastTime(Date lastTime) {
        this.lastTime = lastTime;
    }
	@Sweii(format = "yyyy-MM-dd HH:mm:ss")
	public Date getSaleTime() {
		return saleTime;
	}
	public void setSaleTime(Date saleTime) {
		this.saleTime = saleTime;
	}
	public Integer getStatus() {
		return status;
	}
	public void setStatus(Integer status) {
		this.status = status;
	}
	public Integer getFlag() {
		return flag;
	}
	public void setFlag(Integer flag) {
		this.flag = flag;
	}
	public String getNumber() {
		return number;
	}
	public void setNumber(String number) {
		this.number = number;
	}
}
