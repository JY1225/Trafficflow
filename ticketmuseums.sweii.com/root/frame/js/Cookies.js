//create by duncan
/*
 * cookies类
 */
var Cookies=new Object();

/**
 * 通过名称取cookie值
 * cookieName    cookie名
 */
Cookies.getCookie=function(/*String*/ cookieName){
  document.cookie= "history='' path=/;expires="+new Date((new Date()).getTime() - 10000) ;
  var cookies = document.cookie;
  var finder = cookies.indexOf(cookieName + '=');
  if (finder == -1) // 找不到
    return null;
  finder += cookieName.length + 1;
  var end = cookies.indexOf(';', finder);
  if (end == -1) return unescape(cookies.substring(finder));
  var value = unescape(cookies.substring(finder, end));
 
  if(!value){
  	value = '';
  }
  return unescape(value);
	
};
/**
 * 向cookie写入数据
 * @param cookieName  cookie名
 * @param value    cookie值
 * @param time    保存时间 如果为null 则保存一年
 */
Cookies.addCookie=function(/*String*/ cookieName,/*String*/ value,/*String*/ time){
	var expires = null;
	if(time!=null){
		expires = time;
	}else{
		expires = new Date((new Date()).getTime() + 1*56*24*60* 60000);//设置cookis保存的时间为一年
	}
	document.cookie= cookieName + "="+escape(value)+ "; expires=" + expires.toGMTString() + "; path=/; " ;
};

/**
 * @param cookieName    cookie名
 */
Cookies.deleteCookie=function(/*String*/ cookieName){
	var value = Cookies.getCookie(cookieName);
	var expires = new Date();
	expires.setTime  (expires.getTime()  -  1);
	Cookies.addCookie(cookieName,value,expires);
};
