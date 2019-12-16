<%@page contentType="text/html;charset=GBK" language="java"%>
<%@page import="java.text.SimpleDateFormat"%>
<%@include file="/frame/Init.jsp"%>
<% SimpleDateFormat timeFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");%>
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
      <td  height="10" ><input id="role.id" type="hidden"></input><input id="role.createTime" type="hidden" value="<%=timeFormat.format(new Date())%>"></input></td>
      <td></td>
    </tr>
    <tr>
      <td align="right" >角色名称：</td>
      <td><input id="role.name"  type="text"  class="input1"style="width:150px;" verify="角色名称|NotNull" /></td>
    </tr>
    <tr>
      <td align="right" >角色描述：</td>
      <td><input id="role.description" type="text"  class="input1" style="width:250px;"/></td>
    </tr>
    <tr>
      <td height="10" colspan="2" align="center"></td>
    </tr>
</table>
</form>
</body>
</html>
