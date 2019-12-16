package com.sweii.util;

import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;
import java.net.URLEncoder;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.sweii.framework.helper.DESHelper;

/**
 * Cooike 辅助类
 * 
 * @author duncan
 * 2010-1-3 上午11:32:06
 */
public class MapCookieUtil {
	//private Log logger = LogFactory.getLog(MapCookieUtil.class);
	private HttpServletRequest request = null;
	private HttpServletResponse response = null;
	//private String cookie_domain = Environment.DOMAIN_NAME;
	private static final String COOKIE_PATH   = "/";
	private static final int COOKIE_MAX_AGE_DELETE = 0;
	private int cookiesMaxAge=-1;//cookies有效期
	public MapCookieUtil(HttpServletRequest request,HttpServletResponse response){
		this.request = request;
		this.response=response;
	}
	public MapCookieUtil(HttpServletRequest request,HttpServletResponse response,int maxAge){
		this.request = request;
		this.response=response;
		this.cookiesMaxAge=maxAge;
	}
	private String generateMapCookieValue(final MapCookie map_cookie){
		String name=map_cookie.getName();
		Map<String,String> value = map_cookie.getMap();
		String k ="";
		String v ="";
		if(value!=null && value.size()>0){
			StringBuffer values = new StringBuffer();
			for(Map.Entry<String,String> entry:value.entrySet()){
				if(entry.getKey()==null)continue;
				k = encode(entry.getKey());
				v = encode(entry.getValue()==null?"":entry.getValue());
				values.append(k).append("=").append(v).append("|");
			}
			k=name;
			v = values.toString();
			if(v.endsWith("|")){
				v = v.substring(0,v.length()-1);
			}
		} else {
			k=name;
			v="";
		}
		v = encode(v);
		return v;
	}

	public void addCookie(String k,String v){
		Cookie cookie = new Cookie(k,v);
		//cookie.setDomain(cookie_domain);
		cookie.setPath(COOKIE_PATH);
		cookie.setMaxAge(this.cookiesMaxAge);
		response.addCookie(cookie);
	}
	
	public void addMapCookie(final MapCookie map_cookie){
		String k=map_cookie.getName();
		String v =generateMapCookieValue(map_cookie);
		addCookie(k,v);
	}
	
	public void addSecurityMapCookie(final MapCookie map_cookie){
		String v = generateMapCookieValue(map_cookie);
		String k = map_cookie.getName();
		addCookie(k,DESHelper.encode(v, DESHelper.createSecretKey(Environment.DES_KEY_ONLINE)));
	}
	public void deleteCookie(final String name){
		Cookie cookie = new Cookie(name,"");
		//cookie.setDomain(cookie_domain);
		cookie.setPath(COOKIE_PATH);
		cookie.setMaxAge(COOKIE_MAX_AGE_DELETE);
		response.addCookie(cookie);
	}
	
	public String getCookie(String key){
		Cookie[] cookies = request.getCookies();
		if (cookies != null && cookies.length > 0) {
			for (int i = 0; i < cookies.length; i++) {
				if (key.equals(cookies[i].getName())) {
					return decode(cookies[i].getValue());
				}
			}
		}
		return null;
	}
	public MapCookie getSecurityMapCookie(final String key){
		Cookie[] cookies = request.getCookies();
		Cookie cookie = null;
		Map<String,String> result = new HashMap<String,String>();
		if (cookies != null && cookies.length > 0) {
			for (int i = 0; i < cookies.length; i++) {
				if(key==null)continue;
				if (key.equals(cookies[i].getName())) {
					cookie = cookies[i];
					break;
				}
			}
		}
		if(cookie!=null){
			String des_decoded = DESHelper.decode(cookie.getValue(),DESHelper.createSecretKey(Environment.DES_KEY_ONLINE));
			if(des_decoded!=null){
				String[] cookie_values = decode(des_decoded).split("\\|");
				if(cookie_values!=null && cookie_values.length>0){
					String k ="";
					String v ="";
					for (int i = 0; i < cookie_values.length; i++) {
						if(cookie_values[i]!=null){
							String[] val = cookie_values[i].split("=");
							if(val!=null && val.length==2){
								k = decode(val[0]);
								v = decode(val[1]);
								result.put(k, v);
							}
						}
					}
				}
			}
		}
		return new MapCookie(key,result);
	}
	
	public MapCookie getMapCookie(final String key){
		Cookie[] cookies = request.getCookies();
		Cookie cookie = null;
		Map<String,String> result = new HashMap<String,String>();
		if (cookies != null && cookies.length > 0) {
			for (int i = 0; i < cookies.length; i++) {
				if (cookies[i].getName()!=null && (key.equals(cookies[i].getName())||key.equals(decode(cookies[i].getName())))) {
					cookie = cookies[i];
					break;
				}
			}
		}
		if(cookie!=null){
			String temp = decode(cookie.getValue());
			String[] cookie_values = temp.split("\\|");
			if(cookie_values!=null && cookie_values.length>0){
				String k ="";
				String v ="";
				for (int i = 0; i < cookie_values.length; i++) {
					String[] val = cookie_values[i].split("=");
					if(val!=null && val.length==2){
						k = decode(val[0]);
						v = decode(val[1]);
						result.put(k, v);
					}
				}
			}
		}
		return new MapCookie(key,result);
	}
	public static final String encode(String v){
		String t = v;
			try {
				t = URLEncoder.encode(v,"GBK");
			} catch (UnsupportedEncodingException e) {
				t = v;
				e.printStackTrace();
			}

		return t;
	}
	
	public static final String decode(String v){
		String t = v;
		if(t!=null){
		try {
			t = URLDecoder.decode(v,"GBK");
		} catch (UnsupportedEncodingException e) {
			t = v;
			e.printStackTrace();
		}	
		}
		return t;
	}
}
