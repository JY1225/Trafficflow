<%@page contentType="text/html;charset=GBK" language="java"%>
<%@include file="/frame/Init.jsp"%>
<html>
<head>
<meta http-equiv="X-UA-Compatible" content="IE=EmulateIE7">
<meta http-equiv="Content-Type" content="text/html; charset=gb2312" />
<title></title>
<style>
*{ box-sizing: border-box; -moz-box-sizing: border-box; -khtml-box-sizing: border-box; -webkit-box-sizing: border-box; }
body{_overflow:auto;}
</style>
<link href="/frame/css/frame.css" rel="stylesheet" type="text/css" />
<script src="/frame/js/Main.js"></script>
<script>
function onTreeClick(ele){
	var v =  ele.getAttribute("cid");
	if(v==null || parseInt(v)>10000){
		return;
	}
	var t = ele.innerText;
	if(v==null){
		Selector.setReturn(t,"0");
	}else{
		Selector.setReturn(t,v);
	}
}
</script>
</head>
<body>
<sw:tree id="tree1"   rootText="模块" style="height:350px;" level="2" lazy="true">
	<p cid='${id}' onClick="onTreeClick(this);">${name}</p>
</sw:tree>
</body>
</html>