
<%@include file="/frame/Init.jsp"%>
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
<table cellpadding="2" cellspacing="0">
    <tr>
      <td width="116" height="10" align="right" ></td>
      <td></td>
    </tr>
    <tr>
      <td align="right" >用户名：</td>
      <td width="194"><input name="UserName"  type="text" value="" class="input1" id="UserName" readonly=true verify="用户名|NotNull" /></td>
    </tr>
	<tr id ="tr_Password">
      <td align="right" >密码：</td>
      <td>
	  <input name="Password" type="password" class="input1" id="Password" verify="用户密码|NotNull" /></td>
    </tr>
    <tr id ="tr_ConfirmPassword">
      <td align="right" >重复密码：</td>
      <td>
	  <input name="ConfirmPassword" type="password" class="input1" id="ConfirmPassword" verify="重复密码|NotNull" /></td>
    </tr>
    <tr>
      <td height="10" colspan="2" align="center"  type="Data" field="type"></td>
    </tr>
</table>
</form>
</body>
</html>