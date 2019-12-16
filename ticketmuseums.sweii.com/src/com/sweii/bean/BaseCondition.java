package com.sweii.bean;
/**
 *通用查询条件
 * 
 * @author kfz
 *@date 2010-12-23
 * 
 **/
public class BaseCondition {
    private int pageNo;// 第几页
    private int pageSize;// 每页数
    private int id;
    public int getPageNo() {
	return pageNo;
    }
    public void setPageNo(int pageNo) {
	this.pageNo = pageNo;
    }
    public int getPageSize() {
	return pageSize;
    }
    public void setPageSize(int pageSize) {
	this.pageSize = pageSize;
    }
    public int getId() {
	return id;
    }
    public void setId(int id) {
	this.id = id;
    }
}
