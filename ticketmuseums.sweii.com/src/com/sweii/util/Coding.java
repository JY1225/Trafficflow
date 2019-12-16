package com.sweii.util;


/**
 * 
 * @author KK
 * @date 2010-7-11
 * 
 **/
public class Coding {
	public static String toHex(String value){
		String ids=Long.toHexString(Long.valueOf(value));
		String kk=new String(ids);
		for(int i=0;i<8-ids.length();i++){
		    kk="0"+kk;
		}
		kk=kk.toUpperCase();
		return kk.substring(6,8)+kk.substring(4,6)+kk.substring(2,4)+kk.substring(0,2);
	}

	public static void main(String[] args)throws Exception {
	    System.out.println(Coding.toHex("0705217810"));
	}
	
}















