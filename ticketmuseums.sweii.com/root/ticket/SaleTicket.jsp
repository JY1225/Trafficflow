<%@page contentType="text/html;charset=GBK" language="java"%>
<%@include file="/frame/Init.jsp"%>
<!DOCTYPE html> 
<% 
List<Ticket> tickets = (List<Ticket>) request.getAttribute("tickets");
AdminStatBean bean = (AdminStatBean) request.getSession().getAttribute("adminStat");
%>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="X-UA-Compatible" content="IE=EmulateIE7">
<meta http-equiv="Content-Type" content="text/html; charset=gb2312" />
<title>散客</title>
<link href="/style/style.css" rel="stylesheet" type="text/css" />
<script type="text/javascript" src="/frame/js/Main.js"></script>
<script type="text/javascript" src="/js/Hash.js"></script>
<script type="text/javascript" src="/frame/js/Cookies.js"></script>
<script type="text/javascript" src="/js/CommonWaterTicket.js" charset="gb2312"></script>
<script language="javascript" src="/lodop/LodopFuncs.js"></script>
<script> parent.saleType=1;</script>
<script> saleType=1;</script>
<script>
function selectTicket(tr,index,id){
    var size=parseInt(tr.size);
    for(var i=0;i<size;i++){
        $('rows'+i).style.backgroundColor="#FFFFFF";
        $('rows'+i).style.fontWeight='';
        $('check'+i).checked=false;
    }
    $('rows'+index).style.backgroundColor="#61A4E4";
    $('rows'+index).style.fontWeight='bold';
    $('check'+index).checked=true;
   	var price= $("Price"+index).innerHTML;
  	 $S("priceTotal",price);
  	 $S("shouldTotal",price);
  	 $S("total",price);
  	 $S('hiddenType',id);
  	 $S('colnumType',index);
}
</script>
</head>
<body style="background-color: #DFE6F8">

<object id="LODOP_OB" classid="clsid:2105C259-1E0C-4534-8141-A753534CB4CA" width=0 height=0> 
	<embed id="LODOP_EM" type="application/x-print-lodop" width=0 height=0 pluginspage="install_lodop.exe"></embed>
</object> 
<div class="box01" align="center"><span class="left">&nbsp;</span> <span class="tit" style="font-size: 20px"><b><% if(request.getParameter("category").equals("2")){out.print("散客售票");}else{out.print("团体售票");} %>窗口</b></span></div>


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
        <td class="trborder" style="border-top:1px solid #21629c; " width="6%" align="center" style="font-size:20px"><b>金额</b></td>
    </tr>
    <% for(int i=0;i<tickets.size();i++){
	Ticket ticket=tickets.get(i);
    %>
    <tr  height="40px" id="rows<%=i %>" ticketId="<%=ticket.getId() %>" size="<%=tickets.size() %>" onClick="selectTicket(this,<%=i %>,<%=ticket.getId()%>);" style="cursor:hand;background-color: <% if(i==0){out.print("#61A4E4;font-weight:bold");}else{out.print("#FFFFFF");} %>">
        <td  class="trborder" style="border-left:1px solid #21629c; "><input onFocus='this.blur();' id="check<%=i %>" type='checkbox'  <% if(i==0){out.print("checked");} %>></td>
        <td class="trborder" align="center" style="font-size:20px" id="ticketName<%=i %>"><%=ticket.getName() %></td>
        <td class="trborder" align="center" style="font-size:20px" id="Price<%=i %>"><%=ticket.getPrice() %></td>
        <td class="trborder" align="center" style="font-size:20px" id="ticketName<%=i %>"><%=ticket.getSize() %></td>
        <td class="trborder" align="center" style="font-size:20px" id="amount<%=i %>">0</td>
    </tr>
    <%} %>
    
</table>
</div>
</td>
</tr>
</table>
<table width="500px" style="font-size:16px">
<tr>
   <td>&nbsp;&nbsp;&nbsp;</td>                <td><table  width="100%"   style="font-size:16px"><tr valign="top" height="30%" ><td  width="100%" >
        
        <fieldset  style="height:220px">
    <legend ><label><b>收款信息</b></label></legend>
      <table width="100%">
      <tr > <td><input type="hidden" id="hiddenType" value="" /></td></tr>
      <tr > <td><input type="hidden" id="colnumType" value="" /></td></tr>
    <tr><td align="right">卡号:</td><td><input id="cardNumber"   type="text" style="width:240px;font-weight:bold;color:red" value=""></input></td></tr>
    <tr><td align="right">票价金额:</td><td><input id="priceTotal"  type="text" style="width:240px;font-weight:bold;color:red" value="" readonly></input>(元)</td></tr>
    <tr><td align="right">应收金额:</td><td><input id="shouldTotal"  type="text" style="width:240px;font-weight:bold;color:red" value="" readonly></input>(元)</td></tr>
    <tr><td align="right">收款金额:</td><td><input id="total" onBlur="checkTotal();"  onpropertychange="checkTotal();" type="text" style="width:240px;font-weight:bold;color:red"></input>(元)</td></tr>
    <tr><td align="right">应找金额:</td><td><input id="returnTotal" type="text" style="width:240px;font-weight:bold;color:red" value="" readonly></input>(元)</td></tr>
    <tr><td align="right">本次票数:</td><td><input id="sizeTotal"  type="text" style="width:240px;font-weight:bold;color:red" value="" readonly></input>(张)</td></tr>
    <tr><td align="right">票据状态:</td><td><input id="status"  type="text" style="width:240px;font-weight:bold;color:red" value="" readonly></input></td></tr>
    </table>
    </fieldset>
        </td></tr>
        
        <tr><td >
        <span  id="submitTicket" class="da-button gray large"  onclick='sumbitTicket()'  value="" style='font-weight:bold;font-size:25px' disabled="true">
                                        	出票
                                        </span>&nbsp;
                                        <span id="clearButton"   onclick='clearTicket();' class="da-button gray large" style='font-weight:bold;font-size:25px' disabled="true">
                                        	清空
                                        </span>
        </td>
        </tr>
        
        </table></td>
        
        </tr>
</table>
<!-- 
<script>
 if(parent.comPort.length>0){
     Dialog.alert("无法打开串口"+parent.comPort);
 }
</script>
 -->
</body>
</html>