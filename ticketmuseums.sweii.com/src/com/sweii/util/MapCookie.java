package com.sweii.util;

import java.util.HashMap;
import java.util.Map;

/**
 * 
 * 
 * @author duncan
 * 2010-1-3 ÉÏÎç11:35:23
 */
public final class MapCookie {
	private String name ="";
	private Map<String,String> map = new HashMap<String,String>();
	public MapCookie(String name){
		this.name = name;
		this.map = new HashMap<String,String>();
	}
	protected MapCookie(final String name,final Map<String,String> values){
		this.name = name;
		if(values==null){
			this.map = new HashMap<String,String>();
		} else {
			this.map  = values;
		}
	}
	public void put(String key,String value){
		if(value==null)
			this.map.put(key, "");
		this.map.put(key, value);
	}
	public void remove(String key){
		if(map.containsKey(key)){
			map.remove(key);
		}
	}
	public String getString(String key,String defaultValue){
		String v = (String)map.get(key);
		if(v==null)
			v =defaultValue;
		return v;
	}
	public int getInt(String key,int defaultValue){
		String v = getString(key,String.valueOf(defaultValue));
		if(v.trim().length()==0)
			return defaultValue;
		int result = defaultValue;
		try{
			result = Integer.parseInt(v.trim());
		}catch(Throwable e){
			result = defaultValue;
		}
		return result;
	}
	public String getName(){
		return this.name;
	}
	protected Map<String,String> getMap(){
		return this.map;
	}
	public String toString(){
		StringBuffer s = new StringBuffer(this.name);
		s.append("={");
		if(this.map!=null && this.map.size()>0){
			for(Map.Entry<String,String> e:this.map.entrySet()){
				s.append(e.getKey().toString()).append("=").append(e.getValue().toString()).append("|");
			}
		}
		String v = s.toString();
		if(v.endsWith("|")){
			v = v.substring(0,v.length()-1);
		}
		return v+"}";
	}
}