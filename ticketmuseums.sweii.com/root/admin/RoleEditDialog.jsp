<%@page contentType="text/html;charset=GBK" language="java"%>

<%@include file="/frame/Init.jsp"%>
<%@page import="com.erican.auth.vo.*"%>
<%@page import="com.sweii.framework.helper.*"%>

<%
Role role=(Role)request.getAttribute("role");
%>
<html>
<head>
<meta http-equiv="X-UA-Compatible" content="IE=EmulateIE7">
<title></title>
<script src="/frame/js/Main.js"></script>
<link href="/frame/css/frame.css" rel="stylesheet" type="text/css" />
<meta http-equiv="Content-Type" content="text/html; charset=gbk">
</head>
<body class="dialogBody">
<form id="form2">
<table width="100%" cellpadding="2" cellspacing="0">
    <tr>
      <td width="448" height="10" ></td>
      <td></td>
    </tr>
    <tr>
      <td align="right" >角色名称：</td>
      <td width="581">
	  <input name="name"  type="text"  class="input1" id="name" value="<%=StringHelper.formatNullValue(role.getName(),"")%>" verify="角色名称|NotNull" />
	  <input type="hidden" id="id" name="id" value="<%=role.getId()%>" /></td>
    </tr>
    <tr>
      <td align="right" >备注：</td>
      <td><input name="description" type="text"  class="input1" id="description" value="<%=StringHelper.formatNullValue(role.getDescription(),"")%>"/></td>
    </tr>
    <tr>
      <td height="10" colspan="2" align="center"></td>
    </tr>
</table>
</form>
</body>
</html>