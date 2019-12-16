<%@page contentType="text/html;charset=GBK" language="java"%>

<%@include file="/frame/Init.jsp"%>
<%@page import="com.erican.auth.vo.*"%>
<%@page import="com.erican.framework.helper.*"%>
<%
Module module=(Module)request.getAttribute("module");
%>
<html>
<head>
<meta http-equiv="X-UA-Compatible" content="IE=EmulateIE7">
<title></title>
<link href="/frame/css/frame.css" rel="stylesheet" type="text/css" />
<script src="/frame/js/Main.js"></script>
<meta http-equiv="Content-Type" content="text/html; charset=gbk">
</head>
<body class="dialogBody">
<form id="form2">
<input name="moduleId" type="hidden" value="<%=module.getId()%>" id="moduleId">
<table width="580" cellpadding="2" cellspacing="0">
    <tr>
      <td width="150" height="10"></td>
      <td width="500"></td>
    </tr>
    <tr>
      <td align="right" >所属模块：</td>
      <td height="30"><%=module.getName()%></td>
    </tr>
    <tr>
      <td align="right">功能名称：</td>
      <td height="30"><input id="function.name" name="function.name"  type="text" value="" class="input1" verify="功能名称|NotNull" size=36 /></td>
    </tr>
    <tr>
      <td align="right">功能代码：</td>
      <td height="30"><input id="function.code" name="function.code"  type="text" value="" verify="功能代码|NotNull" class="input1" size=36 /></td>
    </tr>
    <tr>
      <td align="right">模块权限描述：</td>
      <td><textarea name="function.permission" cols="65" rows="6" id="function.permission" style="width:450px"><permission><page><location></location></page></permission></textarea></td>
      
    </tr>
     <tr>
      <td align="right">模块功能描述：</td>
      <td><textarea name="function.description" cols="65" rows="4" id="function.description" style="width:450px"></textarea></td>
    </tr>
</table>
  </form>
</body>
</html>