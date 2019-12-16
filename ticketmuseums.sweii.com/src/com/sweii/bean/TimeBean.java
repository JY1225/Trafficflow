package com.sweii.bean;

import java.util.HashMap;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;

public class TimeBean extends ReportBean{
	public static Map<Integer,String> CATEGORY_MAP=new HashMap<Integer,String>();
	public static Map<Integer,String> TYPE_MAP=new HashMap<Integer,String>();
	static{
		CATEGORY_MAP.put(1, "陆地公园");
		CATEGORY_MAP.put(2, "水公园");
		TYPE_MAP.put(1, "散客");
		TYPE_MAP.put(2, "团体");
		TYPE_MAP.put(3, "会员");
		TYPE_MAP.put(4, "散客赠票");
		TYPE_MAP.put(5, "会员赠票");
		TYPE_MAP.put(6, "团体预售");
	}
   
    public Map<Integer,StatBean> map=new HashMap<Integer,StatBean>();
    public List<StatBean> list=new LinkedList<StatBean>();
}
