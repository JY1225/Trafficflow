package com.sweii.util;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Map;
import org.apache.struts2.util.StrutsTypeConverter;

public class DateConverter extends StrutsTypeConverter {  
    private static final String FORMATDATE = "yyyy-MM-dd";
    private static final String FORMATTIME = "yyyy-MM-dd HH:mm:ss";
    
    @SuppressWarnings("unchecked")
	@Override  
    public Object convertFromString(Map context, String[] values, Class toClass) {
    	if (values == null || values.length == 0) { 
            return null; 
        }    	
    	 
        Date date = null;   
        String dateString = values[0];
        if (dateString != null) {
        	dateString=dateString.trim();
        	String format=this.getFormat(dateString);
        	if(format==null) return null;
        	try {   
        		SimpleDateFormat sdf = new SimpleDateFormat(format);
                date = sdf.parse(dateString);   
            } catch (ParseException e) {   
                date = null;   
            }
        }
        return date;   
    }   
  
    @SuppressWarnings("unchecked")
	@Override  
    public String convertToString(Map context, Object o) {
    	if (o instanceof Date) {
    		SimpleDateFormat sdf = new SimpleDateFormat(FORMATTIME); 
    		return sdf.format((Date)o);
    	} 
    	return ""; 
    }
    
    public String getFormat(String s){
    	if(s==null) return null;
    	s=s.trim();
    	String[] matches={"^\\d{4}\\-\\d{2}\\-\\d{2}$",
    			"^\\d{4}\\-\\d{2}\\-\\d{2} \\d{2}:\\d{2}:\\d{2}$","^\\d{4}\\-\\d{2}\\-\\d{2} \\d{2}:\\d{2}}$"};
    	String[] format={"yyyy-MM-dd","yyyy-MM-dd HH:mm:ss","yyyy-MM-dd HH:mm"};
    	for(int i=0;i<matches.length;i++){
    		if(s.matches(matches[i])){
    			return format[i];
    		}
    	}
    	return null;
    }
    public static void main(String[] s){
    	String[] matches={"^\\d{4}\\-\\d{2}\\-\\d{2}$",
    			"^\\d{4}\\-\\d{2}\\-\\d{2} \\d{2}:\\d{2}:\\d{2}$","^\\d{4}\\-\\d{2}\\-\\d{2} \\d{2}:\\d{2}}$"};
    	String[] format={"yyyy-MM-dd","yyyy-MM-dd HH:mm:ss","yyyy-MM-dd HH:mm"};
    	String date="2009-02-12 13:14:44";
    	for(int i=0;i<matches.length;i++){
    		if(date.matches(matches[i])){
    			System.out.println(format[i]);
    		}
    	}
    	
    }

}