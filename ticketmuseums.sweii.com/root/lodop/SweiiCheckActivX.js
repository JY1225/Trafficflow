function CheckLodop(){
   var oldVersion=LODOP.Version;
       newVerion="5.0.5.5";	
    var msg="";
    var ret=true;
   if (oldVersion==null){
	   {
	msg="<h3><font color='#FF00FF'>打印控件未安装!<BR>点击这里<a href='/lodop/install_lodop.exe'>执行安装</a>,<BR>安装后请刷新页面。</font></h3>";
	ret=false;
	   }
	if (navigator.appName=="Netscape"){
		msg="<h3><font color='#FF00FF'>（Firefox浏览器用户需先点击这里<a href='/lodop/npActiveXFirefox4x.xpi'>安装运行环境</a>）</font></h3>";
	ret=false;
	}
   } else if (oldVersion<newVerion){
	   msg="<h3><font color='#FF00FF'>打印控件需要升级!<BR>点击这里<a href='/lodop/install_lodop.exe'>执行升级</a>,<BR>升级后请重新进入。</font></h3>";
	   ret=false;
   }
   if(!ret){
	   Dialog.alert(msg);
   }
   return ret;
}

