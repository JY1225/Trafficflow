<%@page contentType="text/html;charset=GBK" language="java"%>
 <%@include file="/frame/Init.jsp"%>
<%@page import="java.io.*"%>
<%@page import="java.util.*"%>
<!DOCTYPE html>
<html>
<head>
 
<meta http-equiv="X-UA-Compatible" content="IE=EmulateIE7">
<meta http-equiv="Content-Type" content="text/html; charset=gb2312" />
<title>电子票务管理系统-登陆</title> 
<link href="/style/style.css" rel="stylesheet" type="text/css" />
<style type="text/css"> 
/*container*/
#ym-window{
	background:#fff;overflow:hidden;
	font-size:12px;font-family:'宋体'
}

/*header*/
.ym-tl{padding-left:3px;background:#CFD7EC url(images/title_bg_left.gif) no-repeat 0 0}
.ym-tr{padding-right:3px;background:#CFD7EC url(images/title_bg_right.gif) no-repeat right 0;}
.ym-tc{background:#CFD7EC url(images/title_bg_center.gif) repeat-x 0 0;overflow:hidden;height:25px;line-height:25px;}
.ym-ttc{height:3px}
.ym-header-text{font-size:12px;font-weight:bold;color:#fff;margin-left:5px;float:left}
.ym-header-tools{float:right;margin-top:5px}
.ym-header-tools strong{display:none}

/*body*/
.ym-ml{background:url(images/win_l.gif) repeat-y 0 0;padding-left:3px;}
.ym-mr{background:url(images/win_r.gif) repeat-y right 0;padding-right:3px;}
.ym-mc{background:url(images/content_bg.gif) repeat-x 0 0;padding:0}
.ym-body{overflow:auto;padding:0;font-size:12px;}

/*button*/
.ym-btn{text-align:center}

/*footer*/
.ym-bl{background:url(images/win_lb.gif) no-repeat 0 bottom;padding-left:3px}
.ym-br{background:url(images/win_rb.gif) no-repeat right bottom;padding-right:3px}
.ym-bc{background:url(images/win_b.gif) repeat-x 0 bottom;height:3px;font-size:3px}


.ymPrompt_alert .ym-content,.ymPrompt_succeed .ym-content,.ymPrompt_error .ym-content,.ymPrompt_confirm .ym-content{padding:50px 0 0}
/*图标公共定义*/
.ym-header-tools div{
	cursor:pointer;
	width:16px;height:16px;float:left;margin:0 1px;
	background:url(images/ico.gif) no-repeat 0 0;
}
.ymPrompt_close{
	background-position:-16px 0 !important;
}
.ymPrompt_max{
	background-position:0 -16px !important;
}
.ymPrompt_min{
	background-position:0 0 !important;
}
.ymPrompt_normal{
	background-position:-16px -16px !important;
}
.input1{ border:1px solid #84A1BD; width:100px; height:20px; line-height:23px;}
.input2{ border:1px solid #84A1BD; width:68px; height:20px; line-height:23px;}
.button1{
	border:none;
	width:70px;
	height:27px;
	line-height:23px;
	color:#525252;
	font-size:12px;
	font-weight:bold;
	background-image: url(images/bt001.jpg);
	background-repeat: no-repeat;
	background-position: 0px 0px;
}
.button2{
	border:none;
	width:70px;
	height:27px;
	line-height:23px;
	color:#525252;
	font-size:12px;
	font-weight:bold;
	background-image: url(images/bt002.jpg);
	background-repeat: no-repeat;
	background-position: 0px 0px;
}
.STYLE3 {
	color: #FF0000;
	font-weight: bold;
}
</style>
<script src="/frame/js/Main.js" type="text/javascript"></script>

<script>
function login(){
	alert("1111111");
	var dc = Form.getData("form1");
	var width=window.screen.width;
	var height=window.screen.height;
	dc.add('width',width-197);
	dc.add('height',height-111);
    
	Server.sendRequest("admin/login.do",dc,function(response){
		alert("2222:"+response.status);
		if(response.status==1){
	       try{
		        location.href="@max";
		    }catch(e){
		    }
		    var h=height-116;
			location.href="Application.jsp?height="+h;
		}else{
			Dialog.alert(response.message);
		}
	},'json');
}
document.onkeydown = function(event){
	event = getEvent(event);
	if(event.keyCode==13){
		login();
	}
}
Page.onLoad(function(){
	if(window.top.location != window.self.location){
		window.top.location = window.self.location;
	}
	$('username').focus();
});
 
function refeshSeed(img){
	img.src='randomSeed.jsp?time='+(new Date()).getTime();
}   
</script>
</head>
<body  style="vertical-align:center; background-color: #DFE6F8;margin-top:0px;margin-left:0px;margin-right:0px;margin:0px; padding:0px;overflow:scroll;overflow-y:hidden;overflow :hidden;">
<br></br>
<br></br>
<center>
<form id="form1" method="post">
    <div class="Login">
        <div class="tab"></div>
        <div class="body">
            <div class="tel"><span></span></div>
            <input id="username" name="username"  type="text"  class="user" />
            <input type="password"  id="password" class="pwd"/>
            <br></br><br></br><br></br><br></br>
            &nbsp;&nbsp; 
            <sw:button  onClick="login();">登录</sw:button> &nbsp;&nbsp;
            <a href="#exit" class="da-button blue" onmouseover="this.className='da-button red'" onmouseout="this.className='da-button blue'"  style='cursor:hand;font-weight:bold'>退出</a>

            <div class="com"><span>CopyRight&copy2012</span></div>
        </div>
    </div>
</form>
</center>
</body>
</html>
