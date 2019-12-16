package com.sweii.vo;
import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Transient;

import com.sweii.framework.annotation.Sweii;
@Entity
@org.hibernate.annotations.Entity(dynamicInsert = true, dynamicUpdate = true)
public class Equipment {
    private Integer id;
    private String name;
    private String ip;
    private Integer port;
    
    private Date createTime;
    private Integer flag;
    
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    public Integer getId() {
	return id;
    }
    public void setId(Integer id) {
	this.id = id;
    }
    public String getName() {
	return name;
    }
    public void setName(String name) {
	this.name = name;
    }
    public String getIp() {
	return ip;
    }
    public void setIp(String ip) {
	this.ip = ip;
    }
    public Integer getPort() {
	return port;
    }
    public void setPort(Integer port) {
	this.port = port;
    }
    @Sweii(format = "yyyy-MM-dd HH:mm:ss")
    public Date getCreateTime() {
	return createTime;
    }
    public void setCreateTime(Date createTime) {
	this.createTime = createTime;
    }
    public Integer getFlag() {
	return flag;
    }
    public void setFlag(Integer flag) {
	this.flag = flag;
    }
    private String statusStr;
    @Transient
    public String getStatusStr() {
        return statusStr;
    }
    public void setStatusStr(String statusStr) {
        this.statusStr = statusStr;
    }
    
}
