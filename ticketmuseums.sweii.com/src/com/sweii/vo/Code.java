package com.sweii.vo;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
/**
 * 数据字典
 * 
 * @author duncan
 * @createTime 2009-11-24
 * @version 1.0
 */
@Entity
@org.hibernate.annotations.Entity(dynamicInsert = true, dynamicUpdate = true)
public class Code {
    private Integer id;// ID号
    private Integer parentId;// 父类ID
    private String codeType;// 代码
    private String codeName;// 名称
    private String codeValue;// 值
    private Integer showType;// 是否显示,1表示显示
    private Integer type;
    public Integer getType() {
        return type;
    }
    public void setType(Integer type) {
        this.type = type;
    }
    public Integer getShowType() {
	return showType;
    }
    public void setShowType(Integer showType) {
	this.showType = showType;
    }
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    public Integer getId() {
	return id;
    }
    public void setId(Integer id) {
	this.id = id;
    }
    public String getCodeName() {
	return codeName;
    }
    public void setCodeName(String codeName) {
	this.codeName = codeName;
    }
    public String getCodeType() {
	return codeType;
    }
    public void setCodeType(String codeType) {
	this.codeType = codeType;
    }
    public String getCodeValue() {
	return codeValue;
    }
    public void setCodeValue(String codeValue) {
	this.codeValue = codeValue;
    }
    public Integer getParentId() {
	return parentId;
    }
    public void setParentId(Integer parentId) {
	this.parentId = parentId;
    }
}
