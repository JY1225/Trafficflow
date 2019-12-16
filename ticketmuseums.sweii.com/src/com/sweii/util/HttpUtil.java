package com.sweii.util;

import java.io.DataInputStream;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.io.OutputStreamWriter;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;

import org.apache.commons.httpclient.DefaultHttpMethodRetryHandler;
import org.apache.commons.httpclient.HttpClient;
import org.apache.commons.httpclient.HttpException;
import org.apache.commons.httpclient.HttpStatus;
import org.apache.commons.httpclient.methods.GetMethod;
import org.apache.commons.httpclient.params.HttpMethodParams;
public class HttpUtil {
	
    public static String doHttpGet(String url){
		String result = "";
		try
		{
			String inline_temp=null;
			URL firstURL = new URL(url);
			InputStream ins = firstURL.openStream();
			
			DataInputStream instream = new DataInputStream(ins);
//			int i=0;
			while((inline_temp=instream.readLine())!=null ){
				result = result+inline_temp;
			}
			//instream.close();
			//ins.close();
			
			result = new String(result.getBytes("iso8859-1"),"GBK");
		}catch(Exception e)
		{
			//Ignore the error!
		   //	e.printStackTrace();
		}
		return result;
    }
	public static String httpPost(String url,String sendStr, Map reqHeaders, Map resHeaders,String encode){
		try {
			String result = "";
			String getData =  httpSend(url, "POST", sendStr, reqHeaders, resHeaders, null);
			if(getData!=null&&getData.length()>0){
				result = new String(getData.getBytes("iso8859-1"),encode);
			}
			return result;
		} catch (Exception e) {
			
		}
		return "";
	}
	public static String httpSend(String url, String method, String sendStr, Map reqHeaders, Map resHeaders, OutputStream out) throws Exception{
		StringBuffer sb = new StringBuffer();
		URL uurl = new URL(url);
		HttpURLConnection conn = (HttpURLConnection) uurl.openConnection();
		conn.setRequestMethod(method);
		conn.setDoInput(true);
		conn.setDoOutput(true);
		
		
		if (reqHeaders != null){
			for (Iterator itor = reqHeaders.keySet().iterator(); itor.hasNext();){
				String key = (String) itor.next();
				String value = (String) reqHeaders.get(key);
				if (value != null){
					conn.setRequestProperty(key, value);
				}
			}
		}
		if ("POST".equals(method)&&!"".equals(sendStr)){
			OutputStreamWriter writer = new OutputStreamWriter(conn.getOutputStream());
			conn.getOutputStream().write(sendStr.getBytes("GBK"));
			conn.getOutputStream().close();
		}
		if (resHeaders != null){
			String key;
			String value;
			for (Iterator itor = conn.getHeaderFields().keySet().iterator(); itor.hasNext(); resHeaders.put(key, value)){
				key = (String) itor.next();
				value = conn.getHeaderField(key);
			}
		}
		if (conn.getResponseCode() == 200){
			InputStream in = conn.getInputStream();
			if (out == null){
				for (int c = -1;(c = in.read()) != -1;){
					sb.append((char) c);
				}
			} else{
				byte bytes[] = new byte[8192];
				for (int l = -1;(l = in.read(bytes, 0, bytes.length)) != -1;){
					out.write(bytes, 0, l);
				}
				out.close();
			}
			in.close();
		}
		return sb.toString();
	}
	public static byte[] doGetByByte(String url) {
		byte[] bytes=null;
		if(url==null || url.equals("")){
			return bytes;
		}
		//构造HttpClient的实例
		HttpClient httpClient = new HttpClient();
		//创建GET方法的实例
		GetMethod getMethod = new GetMethod(url);
		//使用系统提供的默认的恢复策略
		getMethod.getParams().setParameter(HttpMethodParams.RETRY_HANDLER,
				new DefaultHttpMethodRetryHandler());
		try {
			//执行getMethod
			int statusCode = httpClient.executeMethod(getMethod);
			if (statusCode != HttpStatus.SC_OK) {
				return bytes;
			}
			//读取内容 
			bytes=getMethod.getResponseBody();
		} catch (HttpException e) {
			//发生致命的异常，可能是协议不对或者返回的内容有问题
			e.printStackTrace();
		} catch (IOException e) {
			//发生网络异常
			e.printStackTrace();
		} finally {
			//释放连接
			getMethod.releaseConnection();
		}
		return bytes;
	}
	
	
	public static void main(String[] args) throws Exception{
		try{
			//String json="{\"birthday\":\"2005-11-10\",\"sex\":\"女\",\"grandfatherOpen\":0,\"gradeId\":1,\"grandfather\":\"\",\"father\":\"刘日广\",\"cardId2\":628,\"id\":1,\"startTime\":\"2010-09-01\",\"cardId1\":1,\"grandmotherOpen\":0,\"motherOpen\":1,\"name\":\"刘月坤\",\"cardId4\":\"\",\"grandfatherPhone\":\"\",\"cardId3\":\"\",\"status\":0,\"grandmother\":\"\",\"grandmotherPhone\":\"\",\"housePhone\":\"\",\"fatherPhone\":\"15994637362\",\"mother\":\"陈\",\"address\":\"四新队\",\"leaveTime\":\"\",\"fatherOpen\":1,\"motherPhone\":\"13788170655\"}";
	        String json="{\"id\":402,\"startTime\":\"2010-11-08 20:25:50\",\"loseTime\":\"2010-11-08 20:25:50\",\"createTime\":\"2010-10-19 17:20:48\",\"pkNumber\":\"502c3ad7cc803755d291eb30f9c8fcc8\",\"gradeId\":\"1\",\"studentId\":\"5\",\"status\":1,\"number\":\"2610107660\",\"workerId\":\"\",\"type\":1,\"cardNumber\":\"A010002\"}";
			String result=HttpUtil.httpPost("http://service.sweiibb.com/student/updateCardInfo.do","schoolId=2&data="+json,null,null,"GBK");
			System.out.println(result);
        /*
			//String content=HttpUtil.doHttpGet("http://service.winic.org:8009/sys_port/gateway/vipsms.asp?id=duncan&pwd=123456&to=15918694780&content=测试&time=");
		    String result="000/Send:1/Consumption:.15/Tmoney:.7/sid:0914200857652746";
		    if(result.startsWith("000")){//
		    	String[] results=result.split("\\/");
		    	Integer total=Integer.valueOf(results[1].split("\\:")[1]);
		    	String ps=results[2].split("\\:")[1];
		    	if(ps.startsWith(".")){
		    		ps="0"+ps;
		    	}
		    	Float amount=Float.valueOf(ps);
		    	ps=results[3].split("\\:")[1];
		    	if(ps.startsWith(".")){
		    		ps="0"+ps;
		    	}
		    	Float remain=Float.valueOf(ps);
		    	String msg=results[4].split("\\:")[1];
		    	System.out.println("条数："+total);
		    	System.out.println("发送费用："+amount);
		    	System.out.println("余额:"+remain);
		    	System.out.println("msgId:"+msg);
		    }*/
		}catch(Exception e){
			e.printStackTrace();
		}


	}
}
