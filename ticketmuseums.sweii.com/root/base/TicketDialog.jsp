<%@page contentType="text/html;charset=GBK" language="java"%>

<%@include file="/frame/Init.jsp"%>

<html>
<head>
<meta http-equiv="X-UA-Compatible" content="IE=EmulateIE7">
<title></title>
<sw:cssjs/>
<meta http-equiv="Content-Type" content="text/html; charset=gbk">
</head>
<body class="dialogBody" style="background-color: #DFE6F8">
<form id="form2">
<table width="100%" cellpadding="2" cellspacing="0">
	<tr>
      <td width="30%" height="10" align="right" ></td>
      <td height="10"> <input id="ticket.id" type="hidden"/></td>
    </tr>
    <tr height="25">
      <td align="right" >名称：</td>
      <td><input   type="text" class="input1" id="ticket.name"  verify="名称|NotNull"/></td>
    </tr>
    <tr height="25">
      <td align="right" >票价：</td>
      <td><input   type="text" class="input1" id="ticket.price" />(元)</td>
    </tr>
    <tr height="25">
      <td align="right" >次数：</td>
      <td><input   type="text" class="input1" id="ticket.size" /></td>
    </tr>
</table>
</form>
</body>
</html>