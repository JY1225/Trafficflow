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
      <td height="10"> <input id="returnTicket.id" type="hidden"/></td>
    </tr>
    <tr height="25">
      <td align="right" >会员id：</td>
      <td><input   type="text" class="input1" id="returnTicket.userId"  verify="名称|NotNull"/></td>
    </tr>
    <tr height="25">
      <td align="right" >票据id：</td>
      <td>
      	<select class="input1" id="returnTicket.ticketId">
      	<option>请选择</option>
      	<option value="1">会员卡</option>
      	<option value="2">月票卡</option>
      	<option value="3">培训卡</option>
      	<option value="4">员工卡</option>
      	<option value="5">临时卡</option>
    	  </select>
      </td>
    </tr>
    <tr height="25">
      <td align="right" >卡号：</td>
      <td><input   type="text" class="input1" id="returnTicket.number" verify="名称|NotNull"/></td>
    </tr>
    <tr height="25">
      <td align="right" >旧卡号：</td>
      <td><input   type="text" class="input1" id="returnTicket.oldNumber" verify="名称|NotNull"/></td>
    </tr>
    <tr height="25">
      <td align="right" >补卡工本费：</td>
      <td><input   type="text" class="input1" id="returnTicket.price" /></td>
    </tr>
    <tr height="25">
      <td align="right" >补卡押金：</td>
      <td><input   type="text" class="input1" id="returnTicket.prePrice" verify="名称|NotNull"/></td>
    </tr>
    <tr height="25">
      <td align="right" >操作人：</td>
      <td><input   type="text" class="input1" id="returnTicket.creator" verify="名称|NotNull"/></td>
    </tr>
    
    <tr height="25">
      <td align="right" >补卡时间：</td>
      <td><input  type="text" ztype="date" format="yyyy-MM-dd HH:mm:ss"  class="input1 inputText" size="18" id="returnTicket.createTime" /></td>
    </tr>
    <tr height="25">
      <td align="right" >补卡日期：</td>
      <td><input   type="text" ztype="date" format="yyyy-MM-dd HH:mm:ss"  class="input1 inputText" size="18" id="returnTicket.mendTime" /></td>
    </tr>
    
  
</table>
</form>
</body>
</html>