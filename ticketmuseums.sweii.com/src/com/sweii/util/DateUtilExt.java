package com.sweii.util;
import java.util.Calendar;
import java.util.Date;

import com.sweii.framework.utility.DateUtil;
/**
 *扩展framework的dateutil功能
 * 
 * @author Administrator
 *@date 2010-3-29
 * 
 **/
public class DateUtilExt extends DateUtil {
    /**
     * 计算出当月最后一天
     * 
     * @param date
     * @return
     */
    public static Date getEndOfMonth(Date date) {
	Calendar cal = Calendar.getInstance();
	cal.setTime(date);
	cal.set(Calendar.DATE, cal.getActualMaximum(Calendar.DAY_OF_MONTH));
	cal.set(Calendar.HOUR_OF_DAY, 23);
	cal.set(Calendar.MINUTE, 59);
	cal.set(Calendar.SECOND, 59);
	cal.set(Calendar.MILLISECOND, 0);
	return cal.getTime();
    }
    /**
     * 获得当月第一天
     * 
     * @param date
     * @return
     */
    public static Date getFirstOfMonth(Date date) {
	Calendar cal = Calendar.getInstance();
	cal.setTime(date);
	cal.set(Calendar.DATE, 1);
	cal.set(Calendar.HOUR_OF_DAY, 0);
	cal.set(Calendar.MINUTE, 0);
	cal.set(Calendar.SECOND, 0);
	cal.set(Calendar.MILLISECOND, 0);
	return cal.getTime();
    }
    public static Date getFirstOfWeek(Date date) {
	Calendar cal = Calendar.getInstance();
	cal.setTime(date);
	// System.out.println("今天的日期: " + cal.getTime());
	int day_of_week = cal.get(Calendar.DAY_OF_WEEK) - 2;
	System.out.println("day_of_week: " + day_of_week);
	cal.add(Calendar.DATE, -day_of_week);
	System.out.println("本周第一天: " + cal.getTime());
	return cal.getTime();
    }
    public static Date getEndOfWeek(Date date) {
	Calendar cal = Calendar.getInstance();
	cal.setTime(getFirstOfWeek(date));
	cal.add(Calendar.DATE, 6);
	cal.set(Calendar.HOUR, 23);
	cal.set(Calendar.MINUTE, 59);
	cal.set(Calendar.SECOND, 59);
	cal.set(Calendar.MILLISECOND, 99);
	System.out.println("本周末: " + cal.getTime());
	return cal.getTime();
    }
    /**
     * 本月第几周
     * 
     * @param date
     * @return
     */
    public static int getMonthWeek(Date date) {
	int w = date.getDay(),d = date.getDate();
	return (d + 6 - w) / 7;
    }
    /**
     * 获得传入时间的零点
     * 
     * @param date
     * @return
     */
    public static Date getStartOfDay(Date date) {
	Calendar cal = Calendar.getInstance();
	cal.setTime(date);
	cal.set(Calendar.HOUR_OF_DAY, 0);
	cal.set(Calendar.MINUTE, 0);
	cal.set(Calendar.SECOND, 0);
	cal.set(Calendar.MILLISECOND, 0);
	return cal.getTime();
    }
    /**
     * 获得传入时间的23:59
     * 
     * @param date
     * @return
     */
    public static Date getEndOfDay(Date date) {
	Calendar cal = Calendar.getInstance();
	cal.setTime(date);
	cal.set(Calendar.HOUR_OF_DAY, 23);
	cal.set(Calendar.MINUTE, 59);
	cal.set(Calendar.SECOND, 59);
	cal.set(Calendar.MILLISECOND, 999);
	return cal.getTime();
    }
    /**
     * 获得日期所在月份第一天是星期几 <br>
     * 1 是星期天
     * 
     * @param date
     * @return
     */
    public static int getWeekNumOfFirstDayInMonth(Date date) {
	Calendar cal = Calendar.getInstance();
	cal.setTime(date);
	int week_num;
	cal.set(Calendar.DATE, 1);// // 设置时间为所要查询的年月的第一天
	cal.set(Calendar.HOUR_OF_DAY, 0);
	cal.set(Calendar.MINUTE, 0);
	cal.set(Calendar.SECOND, 0);
	cal.set(Calendar.MILLISECOND, 0);
	week_num = (int) (cal.get(Calendar.DAY_OF_WEEK));// 得到第一天的星期
	return week_num;
    }
    /**
     * 日期所在是周几，1为周日
     * @param date
     * @return
     */
    public static int getWeekNumOfDay(Date date) {
	Calendar cal = Calendar.getInstance();
	cal.setTime(date);
	int week_num;
	//cal.set(Calendar.DATE, 1);// // 设置时间为所要查询的年月的第一天
	cal.set(Calendar.HOUR_OF_DAY, 0);
	cal.set(Calendar.MINUTE, 0);
	cal.set(Calendar.SECOND, 0);
	cal.set(Calendar.MILLISECOND, 0);
	week_num = (int) (cal.get(Calendar.DAY_OF_WEEK));// 得到星期
	return week_num;
    }
    /**
     * 获得当月的天数
     * @param date
     * @return
     */
    public static int getDayNumOfMonth(Date date) {
	Calendar cal = Calendar.getInstance();
	cal.setTime(date);
	int month_day_score;
	cal.set(Calendar.DATE, 1);// // 设置时间为所要查询的年月的第一天
	cal.set(Calendar.HOUR_OF_DAY, 0);
	cal.set(Calendar.MINUTE, 0);
	cal.set(Calendar.SECOND, 0);
	cal.set(Calendar.MILLISECOND, 0);
	month_day_score = cal.getActualMaximum(Calendar.DAY_OF_MONTH);// 
	return month_day_score;
    }
    public static int checkWeek(Date date, String days) {
	int weekNum = DateUtilExt.getWeekNumOfDay(date);
	return 0;
    }
    /**
     * 
     * 
     * @param month
     * @return
     */
    public static String genHoliday1(Date month) {
	String defRest = "";
	int dayCount = DateUtilExt.getDayNumOfMonth(month);
	Calendar cal = Calendar.getInstance();
	cal.setTime(month);
	cal.set(Calendar.DATE, 1);
	cal.set(Calendar.HOUR_OF_DAY, 0);
	cal.set(Calendar.MINUTE, 0);
	cal.set(Calendar.SECOND, 0);
	cal.set(Calendar.MILLISECOND, 0);
	defRest="1";
	for (int i = 1; i < dayCount; i++) {
	    defRest += ",";
	    cal.set(Calendar.DATE, i + 1);
	    int weekNum = DateUtilExt.getWeekNumOfDay(cal.getTime());
	    if (weekNum == 1 || weekNum == 7) {// 周日，周六
		defRest += "2";
	    } else {
		defRest += "1";
	    }
	}
	return defRest;
    }
    /**
     * 
     * 
     * @param month
     * @return
     */
    /**
     * 生成默认休息设置
     * 
     * @param month
     * @return
     */
    public static String genWeeks(Date month) {
	String defRest = "";
	int dayCount = DateUtilExt.getDayNumOfMonth(month);
	Calendar cal = Calendar.getInstance();
	cal.setTime(month);
	cal.set(Calendar.DATE, 1);
	cal.set(Calendar.HOUR_OF_DAY, 0);
	cal.set(Calendar.MINUTE, 0);
	cal.set(Calendar.SECOND, 0);
	cal.set(Calendar.MILLISECOND, 0);
	for (int i = 0; i < dayCount; i++) {
	    if (i != 0) {	
		defRest += ",";
	    }
	    cal.set(Calendar.DATE, i + 1);
	    int weekNum = DateUtilExt.getWeekNumOfDay(cal.getTime());
	    if (weekNum == 6) {// 周日，周六
		defRest += "0";
	    } else {
		defRest += "1";
	    }
	}
	return defRest;
    }
    /**
     * 生成默认休息设置
     * 
     * @param month
     * @return
     */
    public static String genMonths(Date month) {
	String defRest = "";
	int dayCount = DateUtilExt.getDayNumOfMonth(month);
	Calendar cal = Calendar.getInstance();
	cal.setTime(month);
	cal.set(Calendar.DATE, 1);
	cal.set(Calendar.HOUR_OF_DAY, 0);
	cal.set(Calendar.MINUTE, 0);
	cal.set(Calendar.SECOND, 0);
	cal.set(Calendar.MILLISECOND, 0);
	boolean flag = false;
	for (int i = dayCount - 1; i >= 0; i--) {
	    if (i != dayCount - 1) {
		defRest += ",";
	    }
	    cal.set(Calendar.DATE, i + 1);
	    int weekNum = DateUtilExt.getWeekNumOfDay(cal.getTime());
	    if (flag == true || weekNum == 1 || weekNum == 7) {// 周日，周六
		defRest += "1";
	    } else {
		defRest += "0";
		flag = true;
	    }
	}
	String[] keys = defRest.split(",");
	String set = "";
	for (int i = keys.length - 1; i >= 0; i--) {
	    if (i != keys.length - 1) {
		set += ",";
	    }
	    set += keys[i];
	}
	return set;
    }
}
