package com.sweii.util;

public class ActionResponse {
	private int status = 0;
	public void setStatus(int status){
		this.status = status;
	}
	public int getStatus(){
		return this.status;
	}
	private String message = null;
	public void setMessage(String message){
		this.message = message;
	}
	public String getMessage(){
		return this.message;
	}
	
	public ActionResponse(int status,String message){
		this.status = status;
		this.message = message;
	}
	public ActionResponse(int status){
		this.status = status;
	}
	public static int SUCCESS = 1;
	public static int FALIURE =0;
	
	public static String success = "1";
	public static String faliure ="0";
	

}
