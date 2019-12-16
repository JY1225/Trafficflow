package com.sweii.vo;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
/**
 * 
 * @author duncan
 * @createTime 2010-7-3
 * @version 1.0
 */
@Entity
public class Qos {
    private Integer id;
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    public Integer getId() {
	return id;
    }
    public void setId(Integer id) {
	this.id = id;
    }
}
