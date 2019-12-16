<%@page contentType="text/html;charset=GBK" language="java"%>

<%@include file="/frame/Init.jsp"%>
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
      <td  height="10" ></td>
      <td></td>
    </tr>
    <tr>
      <td align="right" >角色名称：</td>
      <td><input name="name"  type="text"  class="input1" id="name" style="width:180px;" verify="角色名称|NotNull" /></td>
    </tr>
    <tr>
      <td align="right" >备注：</td>
      <td><input name="description" type="text"  class="input1" style="width:180px;" id="description"/></td>
    </tr>
    <tr>
      <td height="10" colspan="2" align="center"></td>
    </tr>
</table>
</form>
</body>
</html>
