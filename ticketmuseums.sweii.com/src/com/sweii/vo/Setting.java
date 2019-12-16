package com.sweii.vo;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
@org.hibernate.annotations.Entity(dynamicInsert = true, dynamicUpdate = true)
public class Setting {
    private Integer id;//ID号
    private Integer autoBak;//是否备份数据库
    private String bakPath;//备份路经
    private Integer days;//备份天数   
    private String time1;//时间
    private String time2;
    private String time3;
    private String time4; 
    private String time5;
    private String time6;
    private String time7;
    private String time8;
    private String time9;
    private String time10;
    
    public String getTime1() {
        return time1;
    }
    public void setTime1(String time1) {
        this.time1 = time1;
    }
    public String getTime2() {
        return time2;
    }
    public void setTime2(String time2) {
        this.time2 = time2;
    }
    public String getTime3() {
        return time3;
    }
    public void setTime3(String time3) {
        this.time3 = time3;
    }
    public String getTime4() {
        return time4;
    }
    public void setTime4(String time4) {
        this.time4 = time4;
    }
    public String getTime5() {
        return time5;
    }
    public void setTime5(String time5) {
        this.time5 = time5;
    }
    public String getTime6() {
        return time6;
    }
    public void setTime6(String time6) {
        this.time6 = time6;
    }
    public String getTime7() {
        return time7;
    }
    public void setTime7(String time7) {
        this.time7 = time7;
    }
    public String getTime8() {
        return time8;
    }
    public void setTime8(String time8) {
        this.time8 = time8;
    }
    public String getTime9() {
        return time9;
    }
    public void setTime9(String time9) {
        this.time9 = time9;
    }
    public String getTime10() {
        return time10;
    }
    public void setTime10(String time10) {
        this.time10 = time10;
    }
    public Integer getAutoBak() {
        return autoBak;
    }
    public void setAutoBak(Integer autoBak) {
        this.autoBak = autoBak;
    }
    public Integer getDays() {
        return days;
    }
    public void setDays(Integer days) {
        this.days = days;
    }
    public String getBakPath() {
        return bakPath;
    }
    public void setBakPath(String bakPath) {
        this.bakPath = bakPath;
    }
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    public Integer getId() {
        return id;
    }
    public void setId(Integer id) {
        this.id = id;
    }
 
    
}
