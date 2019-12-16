<%@page contentType="text/html;charset=GBK" language="java"%>

<%@include file="/frame/Init.jsp"%>
<html>
<head>
<meta http-equiv="X-UA-Compatible" content="IE=EmulateIE7">
<title></title>
<sw:cssjs/>
<meta http-equiv="Content-Type" content="text/html; charset=gbk">
</head>
<body  style="background-color: #DFE6F8">
<form id="form2">
<table width="100%" cellpadding="2" cellspacing="0">
    <tr height="10">
      <td   ><input id="tip.id" type="hidden"></input><input id="tip.type" <%-- value="<%=request.getParameter("type") %>" --%> type="hidden"></input></td>
      <td></td>
    </tr>
    <tr height="25">
      <td align="right" style="width:30%">模板名称：</td>
      <td><input type="text"  class="input1" id="tip.name" verify="模板名称|NotNull" tyle="width:120px"/></td>
    </tr>
    <tr height="25">
      <td align="right" >功能名称：</td>
      <td><input type="text"  class="input1" id="tip.funName" style="width:125px"  verify="功能名称|NotNull" /></td>
    </tr>
    <tr height="25">
      <td align="right" >代码：</td>
      <td><input type="text"  class="input1" id="tip.code"  tyle="width:120px" verify="代码|NotNull" readOnly/></td>
    </tr>
    <tr height="25">
      <td align="right" >提示信息：</td>
      <td><input type="text"  class="input1" id="tip.message" style="width:260px"  verify="NotNull" /></td>
    </tr>
    <tr><td colspan="2">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<b>动态参数:</b> [卡号],[会员姓名],[票种名称],[套票名称],[次数],[日期]</td></tr>
</table>
</form>
</body>
</html>
