package com.sweii.util;

import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;

/**
 * UDP通信帮助类
 * @author duncan 
 * @createTime 2010-12-19
 * @version 1.0
 */
public class UdpUtil {
	public static void main(String[] args) throws Exception{//a701  /01a7
		/*String record="8A0B62013316FC880006";
		Date time= UdpUtil.decodeDate("8A0B62013316FC880006".substring(8,16));	
		String card=record.substring(6,8)+record.substring(4,6)+record.substring(2,4)+record.substring(0, 2);
		card=Integer.valueOf(card, 16).toString();*/
		/*
		String record="8A0AE8023316DC88";
		String card=record.substring(0, 6);
		card=UdpUtil.decodeCard(card);
		Date time= UdpUtil.decodeDate(record.substring(8,16));	
		SimpleDateFormat dateFormat=new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		System.out.println("cardId="+card+",time="+dateFormat.format(time));*/
	    
	    System.out.println(encodeCard("04313035333030303234310D0A"));
	    //System.out.println("e699afe58cbae4b889e8be8ae997b8");
	}
	/**
	 * 校验和,长度为60
	 * @author duncan
	 * @createTime 2010-12-19
	 * @version 1.0
	 */
	public static String checkSum(String data){
		int num=0;
		for(int i=0;i<data.length();i+=2){
			num+=Integer.valueOf(data.substring(i,i+2), 16);
		}
		num = num % 0x10000;
		
		String key= Integer.toString(num, 16);
		StringBuffer result=new StringBuffer();
		if(key.length()==1){
			return "00"+key+"0";
		}
		if(key.length()==2){
			return key+"00";
		}
		if(key.length()==3){
			result.append(key.charAt(1));
			result.append(key.charAt(2));
			result.append("0");
			result.append(key.charAt(0));
			return result.toString();
		}
		if(key.length()==4){
			result.append(key.charAt(2));
			result.append(key.charAt(3));
			result.append(key.charAt(0));
			result.append(key.charAt(1));
			return result.toString();
		}
		return key;
	}
	public static String toHex(Integer id){
		String key= Integer.toString(id, 16);
		StringBuffer result=new StringBuffer();
		if(key.length()==1){
			return key.toUpperCase()+"000";
		}
		if(key.length()==2){
			return key.toUpperCase()+"00";
		}
		if(key.length()==3){
			result.append(key.charAt(1));
			result.append(key.charAt(2));
			result.append("0");
			result.append(key.charAt(0));
			return result.toString().toUpperCase();
		}
		if(key.length()==4){
			result.append(key.charAt(2));
			result.append(key.charAt(3));
			result.append(key.charAt(0));
			result.append(key.charAt(1));
			return result.toString().toUpperCase();
		}
		return "";
	}
	/**
	 * 原始卡号编码
	 * @author duncan
	 * @createTime 2010-11-29
	 * @version 1.0
	 */
	public static String encodeCard(String cardNumber){
		String hex=Long.toHexString(Long.valueOf(cardNumber));
		String start=hex.substring(0,hex.length()-4);
		if(start.length()==4){
			start=start.substring(2);
		}else if(start.length()==3){
			start=start.substring(1);
		}
		String end=hex.substring(hex.length()-4);
		//System.out.println("start="+start+",end="+end);//be0497   97 04be  +  539704BE    43D2374E  //D9C6C2  21750882=
		long card=Long.valueOf(start, 16)*0x186a0L+Long.valueOf(end, 16);
		return ""+card;
	}
	/**
	 * 16进制返编码
	 * @author duncan
	 * @createTime 2010-11-29
	 * @version 1.0
	 */
	public static String decodeCard(String hex){
		if(hex.length()==6){
			String start=hex.substring(4);
			String end=hex.substring(2,4)+hex.substring(0,2);
			long card=Long.valueOf(start, 16)*0x186a0L+Long.valueOf(end, 16);
			return ""+card;
		}
		return "";
	}
	/**
	 * 转换成门禁卡号
	 * @author duncan
	 * @createTime 2011-1-4
	 * @version 1.0
	 */
	public static String toAccessNumber(String number){
		String key=UdpUtil.encodeCardHex2(Integer.valueOf(number));
		String hex=key.substring(4,6)+key.substring(2,4)+key.substring(0,2);
		return Integer.valueOf(hex, 16).toString();
	}
	/**
	 * 
	 * @author duncan
	 * @createTime 2010-12-28   123
	 * @version 1.0
	 */
	public static String encodeCardHex(Integer cardNumber){
		String hex=Integer.toString(cardNumber, 16);
		int size=8-hex.length();
		for(int i=0;i<size;i++){
			hex="0"+hex;
		}
		StringBuffer buf=new StringBuffer();
		if(hex.length()==8){
			buf.append(hex.substring(6,8)+hex.substring(4,6)+hex.substring(2,4)+hex.substring(0,2));
		}
		return buf.toString().toUpperCase();
	}
	/**
	 * 长度为6
	 * @author duncan
	 * @createTime 2010-12-28   123
	 * @version 1.0
	 */
	public static String encodeCardHex2(Integer cardNumber){
		int remain=cardNumber% 0x186a0;
		String hex=Integer.toString(remain, 16);
		int size=4-hex.length();
		for(int i=0;i<size;i++){
			hex="0"+hex;
		}
		StringBuffer buf=new StringBuffer();
		if(hex.length()==4){
			buf.append(hex.substring(2,4)+hex.substring(0,2));
		}
		int in=cardNumber/100000;
		hex=Integer.toString(in, 16);
		if(hex.length()==1){
			buf.append("0"+hex);
		}else{
			buf.append(hex);
		}
		return buf.toString().toUpperCase();
	}
	
	/**
	 * 编码时间
	 * @author duncan
	 * @createTime 2010-11-26
	 * @version 1.0
	 */
	public static String encodeDate(Date date){
		SimpleDateFormat format=new SimpleDateFormat("yyyy");
		int year=Integer.valueOf(format.format(date));
		format=new SimpleDateFormat("MM");
		int month=Integer.valueOf(format.format(date));
		format=new SimpleDateFormat("dd");
		int day=Integer.valueOf(format.format(date));
		format=new SimpleDateFormat("hh");
		int hour=Integer.valueOf(format.format(date));
		format=new SimpleDateFormat("mm");
		double minute=Integer.valueOf(format.format(date));
		format=new SimpleDateFormat("ss");
		int second=Integer.valueOf(format.format(date));
		Integer[] times=new Integer[4];
        times[3] = (year % 100) * 2 +month / 8;        
        times[2] = (month % 8) * 0x20 + day;
        times[1] = new Long(Math.round(hour * 8 +  minute/8)).intValue();
        times[0] = new Long(Math.round((minute % 8) * 0x20 +  second/2)).intValue();
        String key1=Integer.toHexString(times[2]);
        if(key1.length()==1){
        	key1="0"+key1;
        }
        String key2=Integer.toHexString(times[3]);
        if(key2.length()==1){
        	key2="0"+key2;
        }
        String key3=Integer.toHexString(times[0]);
        if(key3.length()==1){
        	key3="0"+key3;
        }
        String key4=Integer.toHexString(times[1]);
        if(key4.length()==1){
        	key4="0"+key4;
        }
        return key1+key2+key3+key4;
	}
	/**
	 * 时间解码
	 * @author duncan
	 * @createTime 2010-11-26
	 * @version 1.0
	 */
	public static Date decodeDate(String value){
		int year=Integer.valueOf(value.substring(2,4), 16);
		int num=(year&0x7f)/2;
		SimpleDateFormat format=new SimpleDateFormat("yyyy");
		int y=Integer.valueOf(format.format(new Date()));
		if(((y%100+100)%100)>60&&(num < 60)){
			num=num+64;
		}
		int yyyy=(2000+num);
		int month=Integer.valueOf(value.substring(0,2),16);
		int MM=(((year%2+2)%2)*8+month/32);
		int dd=(month%32+32)%32;
		int hour=Integer.valueOf(value.substring(6,8),16);
		int second=Integer.valueOf(value.substring(4,6),16);
		int hh=hour/8;
		int mm=((hour%8+8)%8)*8+second/32;
		int ss=(second%32+32)%32*2;
		if(year>128){
			ss+=1;
		}
		format=new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		try {
			return format.parse(yyyy+"-"+MM+"-"+dd+" "+hh+":"+mm+":"+ss);
		} catch (Exception e) {
			
		}
		return null;
	}
	/**
	 * java字节码转字符串
	 * 
	 * @param b
	 * @return
	 */
	public static String byte2hex(byte[] b) { // 一个字节的数，

		// 转成16进制字符串

		String hs = "";
		String tmp = "";
		for (int n = 0; n < b.length; n++) {
			// 整数转成十六进制表示

			tmp = (java.lang.Integer.toHexString(b[n] & 0XFF));
			if (tmp.length() == 1) {
				hs = hs + "0" + tmp;
			} else {
				hs = hs + tmp;
			}
		}
		tmp = null;
		return hs.toUpperCase(); // 转成大写

	}
	/**
	 * 字符串转java字节码
	 * 
	 * @param b
	 * @return
	 */
	public static byte[] hex2byte(byte[] b) {
		
		if ((b.length % 2) != 0) {
			throw new IllegalArgumentException("长度不是偶数");
		}
		byte[] b2 = new byte[b.length / 2];
		for (int n = 0; n < b.length; n += 2) {
			String item = new String(b, n, 2);
			// 两位一组，表示一个字节,把这样表示的16进制字符串，还原成一个进制字节

			b2[n / 2] = (byte) Integer.parseInt(item, 16);
		}
		b = null;
		return b2;
	}
	public static String getDayOfWeek(){
		  Calendar c = Calendar.getInstance();
		  c.setTime(new Date());
		  int dayOfWeek = c.get(Calendar.DAY_OF_WEEK);
		  if(dayOfWeek==1){
			  return "00";
		  }
          if(dayOfWeek==2){
    	     return "01";
		  }
          if(dayOfWeek==3){
    	     return "02";
		  }
          if(dayOfWeek==4){
    	     return "03";
		  }
          if(dayOfWeek==5){
    	     return "04"; 
		  }
          if(dayOfWeek==6){
    	     return "05";
		  }
          if(dayOfWeek==7){
    	     return "06";
		  }
      return "00";
	}
}
