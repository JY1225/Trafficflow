<%@include file="/frame/Init.jsp"%>
<html>
<head>
<meta http-equiv="X-UA-Compatible" content="IE=EmulateIE7">
<title></title>
<link href="/frame/css/frame.css" rel="stylesheet" type="text/css" />
<script src="/frame/js/Main.js"></script>
<meta http-equiv="Content-Type" content="text/html; charset=gbk">
</head>
<sw:init method="com.zving.platform.RoleTabBasic.initEditDialog">
<body class="dialogBody">
<form id="form2">
<table width="100%" cellpadding="2" cellspacing="0">
    <tr>
      <td width="448" height="10" ></td>
      <td></td>
    </tr>
    <tr class="dataTableHead">
		  <td  width="23%">&nbsp;</td>
		  <td width="37%" ><b>名称</b></td>
		  <td width="40%" ><b>值</b></td>
	    </tr>
		<tr style="background-color:#FFFFFF">
		  <td >&nbsp;</td>
		  <td >角色名：</td>
		  <td>${RoleName}
		    <input type="hidden" id="RoleCode" value="${RoleCode}" />
			<input type="hidden" id="RoleName" value="${RoleName}" /></td>
	    </tr>
		<tr style="background-color:#FFFFFF">
		  <td >&nbsp;</td>
		  <td >所属机构：</td>
		  <td>${BranchName}</td>
	    </tr><tr style="background-color:#FFFFFF">
		  <td >&nbsp;</td>
		  <td >用户数：</td>
		  <td>${UserCount}</td>
	    </tr>
		<tr style="background-color:#FFFFFF">
		  <td >&nbsp;</td>
		  <td >备注：</td>
		  <td>${Memo}</td>
	    </tr>
    <tr>
      <td height="10" colspan="2" align="center"></td>
    </tr>
</table>
</form>
</body>
</html>
</sw:init>