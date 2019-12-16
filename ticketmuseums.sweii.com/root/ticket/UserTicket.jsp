<%@page contentType="text/html;charset=GBK" language="java"%>
<%@include file="/frame/Init.jsp"%>
<%@page import="java.text.SimpleDateFormat"%>
<sw:init id="dg1">
<% 
List<Ticket> tickets = (List<Ticket>) request.getAttribute("tickets");
AdminStatBean bean = (AdminStatBean) request.getSession().getAttribute("adminStat");
SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
Date date=new Date();
date.setYear(date.getYear()+1);
%>
<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="X-UA-Compatible" content="IE=EmulateIE7">
<meta http-equiv="Content-Type" content="text/html; charset=gb2312" />
<title>办理会员卡</title>
<link href="/style/style.css" rel="stylesheet" type="text/css" />
<script type="text/javascript" src="/frame/js/Main.js"></script>
<script type="text/javascript" src="/js/Hash.js"></script>
<script type="text/javascript" src="/frame/js/Cookies.js"></script>
<script language="javascript" src="/lodop/LodopFuncs.js"></script>
<script type="text/javascript" src="/js/UserTicket.js"></script>
<script> parent.saleType=3;</script>
<script> saleType=3;
ticketEndTime="<%=dateFormat.format(date) %>";
parent.ticketEndTime="<%=dateFormat.format(date) %>";
document.onkeydown = function(event){
	event = getEvent(event);
	if(event.keyCode==13){
		var ele = event.srcElement || event.target;
		if(ele.id == 'total'&&!$('submitButton').disabled){
			sumbitUserTicket();
		}
		try{
			Dialog.getInstance("_DialogAlert" + (Dialog.AlertNo)).close();
    		Dialog.getInstance("_DialogAlert" + (Dialog.AlertNo-1)).close();    		
    	}catch(e){};
	}
}
ticketTypeId=<%=tickets.get(0).getId() %>;
parent.ticketTypeId=<%=tickets.get(0).getId() %>;
</script>
</head>
<body style="background-color: #DFE6F8">

<object id="LODOP_OB" classid="clsid:2105C259-1E0C-4534-8141-A753534CB4CA" width=0 height=0> 
	<embed id="LODOP_EM" type="application/x-print-lodop" width=0 height=0 pluginspage="install_lodop.exe"></embed>
</object> 
<div class="box01" align="center"><span class="left">&nbsp;</span> <span class="tit" style="font-size: 20px"><b>办理会员卡窗口</b></span></div>


        <table width="100%" style="table-layout: fixed;">
            <tr>
                <td width="100%" valign="top" >
                <div class="box03" >
           
                <table  border="0" cellpadding="0" cellspacing="0"  style="table-layout: fixed;">
    <tr class="trborder tools"  height="40px"    style="background-color: #E3EAF4">

        <td class="trborder" style="border-top:1px solid #21629c;border-left:1px solid #21629c; " width="2%">&nbsp;</td>
        <% if(request.getParameter("category")!=null&&request.getParameter("category").equals("2")){ %>
        <td class="trborder" style="border-top:1px solid #21629c; " width="16%" align="center" style="font-size:20px"><b>票种名称</b></td>
        <%}else{ %>
        <td class="trborder" style="border-top:1px solid #21629c; " width="18%" align="center" style="font-size:20px"><b>票种名称</b></td>
        <%} %>
        <td class="trborder" style="border-top:1px solid #21629c; " width="6%" align="center" style="font-size:20px"><b>票价</b></td>
        <td class="trborder" style="border-top:1px solid #21629c; " width="6%" align="center" style="font-size:20px"><b>次数</b></td>
        <td class="trborder" style="border-top:1px solid #21629c; " width="6%" align="center" style="font-size:20px"><b>张数</b></td>
        <td class="trborder" style="border-top:1px solid #21629c; " width="6%" align="center" style="font-size:20px"><b>金额</b></td>
        <td class="trborder" style="border-top:1px solid #21629c; " width="36%" align="center" style="font-size:20px"><b>票号信息</b></td>
    </tr>
    <% for(int i=0;i<tickets.size();i++){
	Ticket ticket=tickets.get(i);
    %>
    <tr  height="40px" id="rows<%=i %>" ticketId="<%=ticket.getId() %>" size="<%=tickets.size() %>" onClick="selectTicket(this,<%=i %>);" style="cursor:hand;background-color: <% if(i==0){out.print("#61A4E4;font-weight:bold");}else{out.print("#FFFFFF");} %>">
        <td  class="trborder" style="border-left:1px solid #21629c; "><input onFocus='this.blur();' id="check<%=i %>" type='checkbox'  <% if(i==0){out.print("checked");} %>></td>
        <td class="trborder" align="center" style="font-size:20px" id="ticketName<%=i %>"><%=ticket.getName() %></td>
        <td class="trborder" align="center" style="font-size:20px" id="Price<%=i %>"><%=ticket.getPrice() %></td>
        <td class="trborder" align="center" style="font-size:20px" id="ticketName<%=i %>"><%=ticket.getSize() %></td>
        <td class="trborder" align="center" style="font-size:20px" id="size<%=i %>">0</td>
        <td class="trborder" align="center" style="font-size:20px" id="amount<%=i %>">0</td>
        <td class="trborder" align="left" style="font-size:18px;" id="number<%=i %>" >&nbsp;</td>
    </tr>
    <%} %>
    
</table>
</div>
</td>
</tr>
</table>
</td></tr>
<tr><td>

<table><tr>
<td width="260">
   <fieldset style="height:360px">
    <legend><label><b style="font-size:20px">收款信息</b></label></legend>
      <table width="100%">
    <tr><td align="right">票价金额:</td><td><input id="priceTotal"  type="text" style="width:100px;font-weight:bold;color:red" value="<% if(tickets.size()>0){ out.print(tickets.get(0).getPrice());} %>" readonly></input>(元)</td></tr>
    <tr><td align="right">应收金额:</td><td><input id="shouldTotal"  type="text" style="width:100px;font-weight:bold;color:red" value="<%if(tickets.size()>0){ out.print(tickets.get(0).getPrice() );}%>" readonly></input>(元)</td></tr>
    <tr><td align="right">收款金额:</td><td><input id="total" onBlur="checkTotal();"  onpropertychange="checkTotal();" type="text" value="<%if(tickets.size()>0){ out.print(tickets.get(0).getPrice());} %>" style="width:100px;font-weight:bold;color:red"></input>(元)</td></tr>
    <tr><td align="right">应找金额:</td><td><input id="returnTotal" type="text" style="width:100px;font-weight:bold;color:red" value="0" readonly></input>(元)</td></tr>
    <tr><td align="right">本次票数:</td><td><input id="sizeTotal"  type="text" style="width:100px;font-weight:bold;color:red" value="1" readonly></input>(张)</td></tr>
    
    </table>
    <br></br>
    <table  width="100%"><tr>
    
    <td>
  <span disabled="true"  id="submitButton" class="da-button gray large"  onclick='sumbitUserTicket()'  style='font-weight:bold;font-size:20px'>
                                        	出票
                                        </span>&nbsp;
                                        <span disabled="true" id="clearButton"   onclick='clearUserTicket();' class="da-button gray large" style='font-weight:bold;font-size:20px'>
                                        	清空
                                        </span>             
</td></tr>
<tr><td>  <span style='font-size:12px;'><input id="printFlag" onclick="setPrintFlag();" type="checkbox"></input>需打印</span></td></tr>
</table>
    </fieldset>
</td>
<td width="260">
<fieldset style="height:360px">
    <legend ><label><b style="font-size:20px">统计信息</b></label></legend>
    <table width="100%"><tr><td align="right"  width="55%">散客金额累计:</td><td><input id="commonSize" type="text" value="<%=bean.getCommonSize() %>" style="width:65px;font-weight:bold;color:red" readonly></input>(元)</td></tr>
    <tr><td align="right">团票金额累计:</td><td><input id="teamSize" type="text" style="width:65px;font-weight:bold;color:red" value="<%=bean.getTeamSize() %>" readonly></input>(元)</td></tr>
    <tr><td align="right">办理会员金额累计:</td><td><input id="userSize" type="text" style="width:65px;font-weight:bold;color:red" value="<%=bean.getUserSize() %>" readonly></input>(元)</td></tr>
    <tr><td align="right" style="color:red">退票金额累计:</td><td><input type="text" style="width:65px;font-weight:bold;color:red" value="<% if(bean.getReturnPrice()>0){out.print("-"+bean.getReturnPrice());}else{out.print("0");} %>" readonly></input>(元)</td></tr>
    <tr><td align="right">今日总计:</td><td><input id="totalSize" type="text" style="width:65px;font-weight:bold;color:red" value="<%=bean.getTotal() %>" readonly></input>(元)</td></tr>
    </table>
    </fieldset>
</td>
<td width="300">
<fieldset style="height:360px">
                <legend ><label>&nbsp;&nbsp;<b style="font-size:20px">会员</b></label></legend>
                <table>
                   <tr><td align="right">卡号：</td><td><input id="number1"  type="text" style="width:130px"  readonly/></td></tr>
                   <tr><td align="right">有效期：</td><td><input  id="endTime1" type="text" value="" style="width:130px" readonly/></td></tr>
                   <tr><td align="right">姓名：</td><td><input  id="name1" onBlur="cardNumber='';" type="text" style="width:130px" readonly/></td></tr>
                   <tr><td align="right">性别：</td><td>
                   <select id="sex1" disabled>
                   <option value="男">男</option>
                   <option value="女">女</option>
                   </select>
                   </td></tr>
                   <tr><td align="right">电话：</td><td><input id="phone1"  onBlur="cardNumber='';" type="text" style="width:130px" readonly/></td></tr>
                   <tr><td align="right">证件号：</td><td colspan="3"><input id="personNo1" onBlur="cardNumber='';" type="text" style="width:150px" readonly/></td></tr>
                </table>
        </fieldset>
</td>
<td width="200" id="user2" style="display:none">
<fieldset style="height:360px">
                <legend ><label>&nbsp;&nbsp;<b style="font-size:20px">会员2</b></label></legend>
                <table>
                   <tr><td align="right">卡号：</td><td><input id="number2"  type="text" style="width:130px"  readonly/></td></tr>
                   <tr><td align="right">有效期：</td><td><input  id="endTime2" value="" type="text" style="width:130px" readonly/></td></tr>
                   <tr><td align="right">姓名：</td><td><input  id="name2"  onBlur="cardNumber='';" type="text" style="width:130px" readonly/></td></tr>
                   <tr><td align="right">性别：</td><td>
                   <select id="sex2" disabled>
                   <option value="男">男</option>
                   <option value="女">女</option>
                   </select>
                   </td></tr>
                   <tr><td align="right">电话：</td><td><input id="phone2" onBlur="cardNumber='';" type="text" style="width:130px" readonly/></td></tr>
                   <tr><td align="right">证件号：</td><td colspan="3"><input id="personNo2" onBlur="cardNumber='';" type="text" style="width:130px" readonly/></td></tr>
                </table>
        </fieldset>
</td>
<td width="200" id="user3" style="display:none">
<fieldset style="height:360px">
                <legend ><label>&nbsp;&nbsp;<b style="font-size:20px">会员3</b></label></legend>
                <table>
                   <tr><td align="right">卡号：</td><td><input id="number3"  type="text" style="width:130px"  readonly/></td></tr>
                   <tr><td align="right">有效期：</td><td><input  id="endTime3" value="" type="text" style="width:130px" readonly/></td></tr>
                   <tr><td align="right">姓名：</td><td><input  onBlur="cardNumber='';" id="name3"type="text" style="width:130px" readonly/></td></tr>
                   <tr><td align="right">性别：</td><td>
                   <select id="sex3" disabled>
                   <option value="男">男</option>
                   <option value="女">女</option>
                   </select>
                   </td></tr>
                   <tr><td align="right">电话：</td><td><input id="phone3" onBlur="cardNumber='';" type="text" style="width:130px" readonly/></td></tr>
                   <tr><td align="right">证件号：</td><td colspan="3"><input id="personNo3" onBlur="cardNumber='';" type="text" style="width:130px" readonly/></td></tr>
                </table>
        </fieldset>
</td>

</tr></table>

</td></tr>
</table>
<div style='display:none'>
<iframe id="photoFrame1" name="photoFrame1" src="/ticket/uploadPhoto.jsp?type=1" frameborder="0"  scrolling="no" height="25px"></iframe> 
</div>
<!-- 
<script>
 if(parent.comPort.length>0){
     Dialog.alert("无法打开串口"+parent.comPort);
 }
</script>
 -->
</body>
</html>
</sw:init>