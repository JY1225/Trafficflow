<%@page contentType="text/html;charset=GBK" language="java"%>

<%@include file="/frame/Init.jsp"%>
<%@page import="com.erican.auth.vo.*"%>
<%@page import="com.sweii.framework.helper.*"%>
<%
Module module=(Module)request.getAttribute("module");
String categoryId=module.getCategory().getId().intValue()+"";
%>
<html>
<head>
<meta http-equiv="X-UA-Compatible" content="IE=EmulateIE7">
<title></title>
<link href="/frame/css/frame.css" rel="stylesheet" type="text/css" />
<script src="/frame/js/Main.js"></script>
<meta http-equiv="Content-Type" content="text/html; charset=gbk">
</head>
<body class="dialogBody" style="background-color: #F0F0F0;">
<form id="form2">
<input type="hidden" name="id" value="<%=module.getId()%>" id="id">
<table width="378" cellpadding="2" cellspacing="0">
    <tr>
      <td height="10">&nbsp;</td>
      <td></td>
    </tr>
    <tr>
      <td width="101" height="10"></td>
      <td width="267"></td>
    </tr>
    <tr>
      <td align="right" >所属于分类：</td>
      <td height="30"><sw:select id="categoryId" value="<%=categoryId%>" name="categoryId" reqAttr="combox" style="width:200px;"> </sw:select></td>
    </tr>
    <tr>
      <td align="right">模块名称：</td>
      <td height="30"><input id="module.name" name="module.name"  type="text" value="<%=StringHelper.formatNullValue(module.getName(),"") %>" class="input1" verify="模块名称|NotNull" size=36 /></td>
    </tr>
    <tr>
      <td align="right">模块地址：</td>
      <td height="30"><input id="module.entryURL" name="module.entryURL"  type="text" value="<%=StringHelper.formatNullValue(module.getEntryURL(),"") %>" class="input1" size=36 /></td>
    </tr>
    <tr>
      <td align="right">描述说明：</td>
      <td height="30"><input id="module.description" name="module.description"  type="text" value="<%=StringHelper.formatNullValue(module.getDescription(),"") %>" class="input1" size=36 /></td>
    </tr>
</table>
  </form>
</body>
</html>