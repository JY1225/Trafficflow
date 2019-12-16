<%@page contentType="text/html;charset=GBK" language="java"%>

<%@include file="/frame/Init.jsp"%>
<%@page import="com.erican.auth.vo.*"%>
<%@page import="com.sweii.framework.helper.*"%>
<html> 
<head>
<meta http-equiv="X-UA-Compatible" content="IE=EmulateIE7">
<title></title>
<link href="/frame/css/frame.css" rel="stylesheet" type="text/css" />
<script src="/frame/js/Main.js"></script>
<meta http-equiv="Content-Type" content="text/html; charset=gbk">
</head>
<body class="dialogBody">
<sw:pwrite reqAttr="admin">
<form id="form2">
<input type="hidden" value="${id}" name="admin.id" id="admin.id">
<table width="570" height="227" align="center" cellpadding="2" cellspacing="0">
    <tr>
      <td height="10"></td>
      <td></td>
    </tr>
    <tr>
      <td  width="321">
   <fieldset>
    <legend><label>基本信息</label></legend>
      <table width="100%" border="0" cellpadding="0" cellspacing="0" height="300">
        <tr>
          <td width="30%" height="30" align="right" >编号：</td>
          <td width="61%"><input name="admin.username"  type="text"  style="width:100px;" value="${username}" class="input1" id="admin.username" verify="用户名最多20位，仅限英文字母，数字，汉字，半角“_”、“.”、“@”|Regex=\S{1,20}&&NotNull" /></td>
        </tr>
        <tr>
          <td height="30" align="right" >姓名：</td>
          <td><input name="admin.name"  type="text" value="${name}" style="width:100px;" class="input1" id="admin.name" verify="NotNull" /></td>
        </tr>
         
         <tr id ="tr_Password2">
          <td height="30" align="right" >密码：</td>
          <td><input name="admin.password" type="password" style="width:150px;" class="input1" id="admin.password" verify="密码为4-20位|Regex=\S{4,20}&&NotNull" value="$111111" /></td>
        </tr>
        <tr id ="tr_ConfirmPassword2">
          <td height="30" align="right" >重复密码：</td>
          <td><input name="confirmPassword" type="password" style="width:150px;" class="input1" id="confirmPassword" verify="重复密码为4-20位|Regex=\S{4,20}&&NotNull" value="$111111"/></td>
        </tr>
         <tr>
          <td height="30" align="right" >是否停用：</td>
          <td ><sw:radio list="[['1','正常'],['2','停用']]" name="admin.status" value="${status}"/></td>
        </tr>
        
         <tr>
          <td height="30" align="right" >用户类型：</td>
          <td ><sw:radio list="[['3','售票员'],['1','管理员'],['2','超级管理员']]" name="admin.type" value="${type}"/></td>
        </tr>
        <tr>
          <td height="30" align="right" >联系电话：</td>
          <td><input name="admin.phone"  type="text"  style="width:150px;"  value="${phone}" class="input1" id="admin.phone" size="12" /></td>
        </tr>
        <tr>
          <td height="30" align="right" >备注信息：</td>
          <td><textarea id="admin.remark" cols="27" style="height:40px;overflow-y:auto" id="admin.remark">${remark}</textarea></td>
        </tr>
      </table></fieldset></td>
      <td  width="270"  valign="top">
	  <fieldset>
		<legend><label>所属角色</label></legend>
		  <table width="100%" border="0" cellpadding="2" cellspacing="0">
			<tr>
			<td>
	    	<sw:tree id="tree1" style="width:230px;height:300px" level="2" rootText="角色">
		  		<p cid='${id}'><input type="checkbox" name="roleIds" value='${id}' ${checked}>${name}</p>
		  </sw:tree>
		</td>
		 </tr>
      </table></fieldset>
	  </td>
    </tr>
	</table>
</form>
</sw:pwrite>
</body>
</html>