
<%@include file="/frame/Init.jsp"%>
<html>
<head>
<meta http-equiv="X-UA-Compatible" content="IE=EmulateIE7">
<meta http-equiv="Content-Type" content="text/html; charset=gb2312" />
<title>无标题文档</title>
<link href="/frame/css/frame.css" rel="stylesheet" type="text/css" />
<script src="/frame/js/Main.js"></script>
<style>
img{ border:1px solid #CCCCCC; margin:3px; padding:2px; position:relative; float:left; display:block; background:#FFFFFF ;cursor:pointer}
.s1{ border:1px solid #CCCCCC; margin:3px; padding:2px; position:relative; float:left; display:block; background:#FFFFFF ;cursor:pointer}
.s2{ border:1px solid #FF9900; margin:3px; padding:2px; position:relative; float:left; display:block; background:#FFCC66 ;cursor:pointer}
</style>
</head><script>
var arr = [];
arr.push(17);
arr.push(22);
arr.push(22);
arr.push(21);
arr.push(22);
arr.push(21);
arr.push(17);
arr.push(20);
arr.push(18);
arr.push(20);
arr.push(17);
arr.push(17);
arr.push(18);
arr.push(18);
arr.push(17);
arr.push(18);
arr.push(16);
arr.push(20);
arr.push(16);
arr.push(20);
arr.push(22);
arr.push(16);
arr.push(16);
arr.push(16);
arr.push(16);
arr.push(22);
arr.push(16);
arr.push(16);
arr.push(15);
arr.push(16);
arr.push(16);
arr.push(16);
arr.push(17);
arr.push(18);
arr.push(16);
arr.push(16);
arr.push(19);
arr.push(17);
arr.push(16);
arr.push(16);
arr.push(16);
arr.push(18);
arr.push(17);
arr.push(22);
arr.push(16);
arr.push(17);
arr.push(22);
arr.push(16);
arr.push(16);
arr.push(18);
arr.push(19);
var lastEle =null;
function changeType(str){
	if(lastEle){
		lastEle.className = "s1";
	}
	lastChildEle =null;
	$("d"+str).className = "s2";
	lastEle = $("d"+str);
	if(str=="000"){
		$E.show($("dIcons2"));
		$E.hide($("dIcons1"));
	}else{
		$E.show($("dIcons1"));
		$E.hide($("dIcons2"));
		var html = [];
		for(var i=1;i<=arr[parseInt("1"+str)-1001];i++){
			html.push("<img onclick=\"returnSrc(this)\" src='../Icons/icon"+str+"a"+i+".gif' width=20 height=20 />");
		}
		$("dIcons1").innerHTML = html.join('');
	}
}

var lastChildEle =null;
function returnSrc(ele){
	if(lastChildEle){
		lastChildEle.className = "s1";
	}
	ele.className = "s2";
	lastChildEle = ele;
	window.Icon = ele.src;
}

Page.onLoad(function(){
	changeType('000');
});
</script>
<body bgcolor="#E4E4E4">
<table width="600" height="250" border="0" cellpadding="0" cellspacing="0">
  <tr>
    <td align="center" valign="middle" bgcolor="#F7F7F7"><script>
	for(var i=1;i<52;i++){
		var str = "0"+i;
		if(i<10){
			str = "0"+str;
		}
		document.write("<img  id='d"+str+"' onclick=\"changeType('"+str+"')\" src='../Icons/icon"+str+"a1.gif' width=20 height=20 />");
	}
	</script>
    <div id="d000" class="s1" onClick="changeType('000')" style="height:20px;width:85px; line-height:20px; text-align:center;">常用图标</div></td>
  </tr>
  <tr>
    <td height="150" bgcolor="#FFFFFF">
	<div id="dIcons1" style="display:none"></div>
	<div id="dIcons2">
        <table width="100%" border="0" cellspacing="0" cellpadding="0" bordercolor="#999999" style="margin-top:10px;">
          <tr>
            <td><img onClick="returnSrc(this)" src="../Icons/icon400a1.gif" width="20" height="20" /><img onClick="returnSrc(this)" src="../Icons/icon400a2.gif" width="20" height="20" /><img onClick="returnSrc(this)" src="../Icons/icon400a3.gif" width="20" height="20" /><img onClick="returnSrc(this)" src="../Icons/icon400a4.gif" width="20" height="20" /><img onClick="returnSrc(this)" src="../Icons/icon400a5.gif" width="20" height="20" /><img onClick="returnSrc(this)" src="../Icons/icon400a6.gif" width="20" height="20" /><img onClick="returnSrc(this)" src="../Icons/icon400a7.gif" width="20" height="20" /><img onClick="returnSrc(this)" src="../Icons/icon400a8.gif" width="20" height="20" /><img onClick="returnSrc(this)" src="../Icons/icon400a9.gif" width="20" height="20" /><img onClick="returnSrc(this)" src="../Icons/icon400a10.gif" width="20" height="20" /><img onClick="returnSrc(this)" src="../Icons/icon400a11.gif" width="20" height="20" /><img onClick="returnSrc(this)" src="../Icons/icon400a12.gif" width="20" height="20" /><img onClick="returnSrc(this)" src="../Icons/icon400a13.gif" width="20" height="20" /><img onClick="returnSrc(this)" src="../Icons/icon400a14.gif" width="20" height="20" /><img onClick="returnSrc(this)" src="../Icons/icon400a15.gif" width="20" height="20" /><img onClick="returnSrc(this)" src="../Icons/icon400a16.gif" width="20" height="20" /><img onClick="returnSrc(this)" src="../Icons/icon400a17.gif" width="20" height="20" /><img onClick="returnSrc(this)" src="../Icons/icon400a18.gif" width="20" height="20" /></td>
          </tr>
          <tr>
            <td><img onClick="returnSrc(this)" src="../Icons/icon401a1.gif" width="20" height="20" /><img onClick="returnSrc(this)" src="../Icons/icon401a2.gif" width="20" height="20" /><img onClick="returnSrc(this)" src="../Icons/icon401a3.gif" width="20" height="20" /><img onClick="returnSrc(this)" src="../Icons/icon401a4.gif" width="20" height="20" /><img onClick="returnSrc(this)" src="../Icons/icon401a5.gif" width="20" height="20" /><img onClick="returnSrc(this)" src="../Icons/icon401a6.gif" width="20" height="20" /><img onClick="returnSrc(this)" src="../Icons/icon401a7.gif" width="20" height="20" /><img onClick="returnSrc(this)" src="../Icons/icon401a8.gif" width="20" height="20" /><img onClick="returnSrc(this)" src="../Icons/icon401a9.gif" width="20" height="20" /><img onClick="returnSrc(this)" src="../Icons/icon401a10.gif" width="20" height="20" /><img onClick="returnSrc(this)" src="../Icons/icon401a11.gif" width="20" height="20" /><img onClick="returnSrc(this)" src="../Icons/icon401a12.gif" width="20" height="20" /><img onClick="returnSrc(this)" src="../Icons/icon401a13.gif" width="20" height="20" /><img onClick="returnSrc(this)" src="../Icons/icon401a14.gif" width="20" height="20" /><img onClick="returnSrc(this)" src="../Icons/icon401a15.gif" width="20" height="20" /><img onClick="returnSrc(this)" src="../Icons/icon401a16.gif" width="20" height="20" /><img onClick="returnSrc(this)" src="../Icons/icon401a17.gif" width="20" height="20" /><img onClick="returnSrc(this)" src="../Icons/icon401a18.gif" width="20" height="20" /></td>
          </tr>
          <tr>
            <td><img onClick="returnSrc(this)" src="../Icons/icon404a1.gif" width="20" height="20" /><img onClick="returnSrc(this)" src="../Icons/icon404a2.gif" width="20" height="20" /><img onClick="returnSrc(this)" src="../Icons/icon404a3.gif" width="20" height="20" /><img onClick="returnSrc(this)" src="../Icons/icon404a4.gif" width="20" height="20" /><img onClick="returnSrc(this)" src="../Icons/icon404a5.gif" width="20" height="20" /><img onClick="returnSrc(this)" src="../Icons/icon404a6.gif" width="20" height="20" /><img onClick="returnSrc(this)" src="../Icons/icon404a7.gif" width="20" height="20" /><img onClick="returnSrc(this)" src="../Icons/icon404a8.gif" width="20" height="20" /><img onClick="returnSrc(this)" src="../Icons/icon402a1.gif" width="20" height="20" /><img onClick="returnSrc(this)" src="../Icons/icon402a2.gif" width="20" height="20" /><img onClick="returnSrc(this)" src="../Icons/icon402a3.gif" width="20" height="20" /><img onClick="returnSrc(this)" src="../Icons/icon402a4.gif" width="20" height="20" /></td>
          </tr>
          <tr>
            <td><img onClick="returnSrc(this)" src="../Icons/icon403a1.gif" width="20" height="20" /><img onClick="returnSrc(this)" src="../Icons/icon403a2.gif" width="20" height="20" /><img onClick="returnSrc(this)" src="../Icons/icon403a3.gif" width="20" height="20" /><img onClick="returnSrc(this)" src="../Icons/icon403a4.gif" width="20" height="20" /><img onClick="returnSrc(this)" src="../Icons/icon403a5.gif" width="20" height="20" /><img onClick="returnSrc(this)" src="../Icons/icon403a6.gif" width="20" height="20" /><img onClick="returnSrc(this)" src="../Icons/icon403a7.gif" width="20" height="20" /><img onClick="returnSrc(this)" src="../Icons/icon403a8.gif" width="20" height="20" /><img onClick="returnSrc(this)" src="../Icons/icon403a9.gif" width="20" height="20" /><img onClick="returnSrc(this)" src="../Icons/icon403a10.gif" width="20" height="20" /><img onClick="returnSrc(this)" src="../Icons/icon403a11.gif" width="20" height="20" /><img onClick="returnSrc(this)" src="../Icons/icon403a12.gif" width="20" height="20" /><img onClick="returnSrc(this)" src="../Icons/icon403a13.gif" width="20" height="20" /><img onClick="returnSrc(this)" src="../Icons/icon403a14.gif" width="20" height="20" /><img onClick="returnSrc(this)" src="../Icons/icon403a15.gif" width="20" height="20" /><img onClick="returnSrc(this)" src="../Icons/icon403a16.gif" width="20" height="20" /><img onClick="returnSrc(this)" src="../Icons/icon403a17.gif" width="20" height="20" /><img onClick="returnSrc(this)" src="../Icons/icon403a18.gif" width="20" height="20" /></td>
          </tr>
        </table>
      </div></td>
  </tr>
</table>
</body>
</html>
