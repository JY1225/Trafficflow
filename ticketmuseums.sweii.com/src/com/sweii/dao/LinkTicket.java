package com.sweii.dao;

import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import com.sweii.framework.annotation.Sweii;

@Entity
@org.hibernate.annotations.Entity(dynamicInsert = true, dynamicUpdate = true)
public class LinkTicket {
    private Integer id;
    private Integer limitType;
    private Integer type;
    private String name;
    private Integer size;
    private Integer itemSize;
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
    public Integer getSize() {
        return size;
    }
    public void setSize(Integer size) {
        this.size = size;
    }
    @Sweii(format="yyyy-MM-dd HH:mm:ss")
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
    
    

    @Sweii(code="itemType")
    public Integer getType() {
        return type;
    }
    @Sweii(code="limitType")
    public Integer getLimitType() {
        return limitType;
    }
    
    public void setLimitType(Integer limitType) {
        this.limitType = limitType;
    }
    public void setType(Integer type) {
        this.type = type;
    }
	public Integer getItemSize() {
		return itemSize;
	}
	public void setItemSize(Integer itemSize) {
		this.itemSize = itemSize;
	}
    
}
