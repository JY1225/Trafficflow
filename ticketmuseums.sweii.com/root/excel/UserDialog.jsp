<%@page contentType="text/html;charset=GBK" language="java"%>
<%@include file="/frame/Init.jsp"%>
<html>
<head>
<meta http-equiv="X-UA-Compatible" content="IE=EmulateIE7">
<title></title>
<sw:cssjs/>
<meta http-equiv="Content-Type" content="text/html; charset=gbk">
</head>
<body class="dialogBody">
<form id="form2">
<table width="100%" cellpadding="2" cellspacing="0">
	<tr>
      <td width="30%" height="10" align="right" ></td>
      <td height="10"> <input id="user.id" type="hidden"/></td>
    </tr>
    <tr height="25">
      <td align="right" >姓名：</td>
      <td><input   type="text" class="input1" id="user.name"  verify="名称|NotNull"/></td>
    </tr>
    <tr height="25">
      <td align="right" >卡号：</td>
      <td><input   type="text" class="input1" id="user.number" verify="名称|NotNull"/></td>
    </tr>
    <tr height="25">
      <td align="right" >性别：</td>
      <td><input   type="text" class="input1" id="user.sex" /></td>
    </tr>
    <tr height="25">
      <td align="right" >售票价格：</td>
      <td><input   type="text" class="input1" id="user.price" verify="名称|NotNull"/></td>
    </tr>
    <tr height="25">
      <td align="right" >联系电话：</td>
      <td><input   type="text" class="input1" id="user.phone" verify="名称|NotNull"/></td>
    </tr>
    <tr height="25">
      <td align="right" >证件号：</td>
      <td><input   type="text" class="input1" id="user.personNo" verify="名称|NotNull"/></td>
    </tr>
    <tr height="25">
      <td align="right" >开始时间：</td>
      <td><input  type="text" ztype="date" format="yyyy-MM-dd HH:mm:ss"  class="input1 inputText" size="18" id="user.startTime" /></td>
    </tr>
    <tr height="25">
      <td align="right" >结束时间：</td>
      <td><input   type="text" ztype="date" format="yyyy-MM-dd HH:mm:ss"  class="input1 inputText" size="18" id="user.endTime" /></td>
    </tr>
    <tr height="25">
      <td align="right" style="width:30%">票种：</td>
      <td>
      <sw:select id="user.ticketId" hql="from Code where codeType ='ticketType' order by codeType asc" fields="id,codeName" style="width:130px">
      </sw:select>
      </td>
    </tr>
    
    <tr height="25">
      <td align="right" >使用次数：</td>
      <td><input   type="text" class="input1" id="user.times" /></td>
    </tr>
    <tr height="25">
      <td align="right" >备注：</td>
      <td><input   type="text" class="input1" id="user.remark" /></td>
    </tr>
  <!--   <tr height="25">
      <td align="right" >时间：</td>
      <td><input id="user.createTime"  type="text" ztype="date" format="yyyy-MM-dd HH:mm:ss"  class="input1 inputText" size="18"></td>
    </tr> -->
</table>
</form>
</body>
</html>