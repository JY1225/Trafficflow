<%@page contentType="text/html;charset=GBK" language="java"%>
<%@include file="/frame/Init.jsp"%>
<%@ page import="java.util.*"%>
<%@ page import="com.sweii.framework.helper.*"%>
<%@ page import="com.sweii.bean.*"%>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="X-UA-Compatible" content="IE=EmulateIE7">
<meta http-equiv="Content-Type" content="text/html; charset=gb2312" />
<title></title>
<link href="/style/style.css" rel="stylesheet" type="text/css" />
<link rel="stylesheet" href="/ztree/zTreeStyle/zTreeStyle.css" type="text/css">
<script type="text/javascript" src="/frame/datepicker/WdatePicker.js"></script>
<script type="text/javascript" src="/ztree/jquery-1.4.4.min.js"></script>
<script type="text/javascript" src="/ztree/jquery.ztree.core-3.4.js"></script>
<script type="text/javascript" src="/ztree/jquery.ztree.excheck-3.4.js"></script>
<script type="text/javascript" src="/js/Report.js"></script>
<style type="text/css">
.table-border { /*border-top:1px solid #000;  */
    border-bottom: 1px solid #000; /*下部边框*/
    border-left: 1px solid #000; /*左部边框*/
    border-right: 0px solid #000; /* */
}

.table-border td {
    border-top: 1px solid #000; /*上部边框*/
    border-right: 1px solid #000; /*右部边框*/
}
ul.ztree {margin-top: 10px;border: 1px solid #617775;background: #f0f6e4;width:365px;height:300px;overflow-y:scroll;overflow-x:auto;}
</style>
<script type="text/javascript">
function query(){
	$("form").submit();
}
</script>
</head>
<body style="background-color: #DFE6F8;">
<jsp:include page="/frame/Printer.jsp" />
<div class="box01" align="center"><span class="left">&nbsp;</span> <span class="tit" style="font-size: 20px"><b>售票统计表</b></span></div>

<center>
<div style="height:<%=(Integer.valueOf(height)-30) %>px;overflow-y:scroll;overflow-x:hidden;overflow:scroll;">
<form action="/report/reportSaleTicket.do" method="post" id="form">
<jsp:include page="SearchPage.jsp">
	<jsp:param value="reportSaleTicket" name="pageType"/>
</jsp:include>
</form>
    <table width="99%" border="0" cellspacing="0"  >
        <tr>
            <td width="15%" style="font-weight: bold;" align="left"></td>
            <td align="center" width="50%" style="font-weight: bold; font-size: 25px">售票统计表</td>
            <td width="20%" style="font-weight: bold;font-size:12px" align="right"><a href="javascript:void(0);" onclick="printHA4('print');" class="printBtn"><img src="/Icons/icon013a1.gif" />打印</a><a href="javascript:void(0);" onclick="saveAsFile('print','售票统计表.xls');" class="printBtn"><img src="/Icons/icon018a7.gif" />导出</a></td>
        </tr>       
        <tr>
            <td colspan="4" align="center">
            <span id="print">
            <table width="98%" border="0" cellspacing="0" class="table-border" style="height: 25px; text-align: left">
                <tr height="25px" style="font-weight: bold;font-size:12px;background-color: white">
                    <td align="center">客户类型</td>                   
                    <td align="center">票种</td>
                     <td align="center">售票数量</td>
                    <td align="center">售票金额</td>
                    <td align="center">退押金金额</td>
                    <td align="center">续费人数</td>
                    <td align="center">续费金额</td>
                    <td align="center">补卡人数</td>
                    <td align="center">补卡金额</td>
                    <td align="center">押金金额</td>
                    <td align="center">实收金额</td>
                </tr>
                <%
                	TimeBean timeBean=(TimeBean)request.getAttribute("timeBean");
                	Map<Integer,String> tsMap=(Map<Integer,String>)request.getAttribute("tsMap");
                	List<StatBean> sbList=timeBean.list;
                	for(StatBean sb:sbList){
                		boolean wrtop=false;
                		for(CategoryBean cb:sb.list){
                			int i=0;
                			boolean wrsend=false;
                			for(TypeBean tb:cb.list){%>
                			 <tr height="25px" style="font-size:12px;background-color: white">
                				<%
                				if(!wrsend){
                					wrsend=true;
                				%>
                				<td align="center"   rowspan="<%=(cb.getTotalCount())%>"><%=cb.getName() %></td>
                				<%}
                				
                				%>
                				<td align="center" ><%=tsMap.get(tb.getId())%></td>
				                <td align="center"><%=NumbericHelper.getIntValue(tb.getSaleCount(),0)%></td>
			                    <td align="center"><%=NumbericHelper.getIntValue(tb.getSaleAmount(),0)%></td>
			                    <td align="center"><%=NumbericHelper.getIntValue(tb.getBackCAmount(),0)%></td>
			                    <td align="center"><%=NumbericHelper.getIntValue(tb.getAddCount(),0)%></td>
			                    <td align="center"><%=NumbericHelper.getIntValue(tb.getAddAmount(),0)%></td>
			                    <td align="center"><%=NumbericHelper.getIntValue(tb.getMendCount(),0)%></td>
			                    <td align="center"><%=NumbericHelper.getIntValue(tb.getMendAmount(),0)%></td>
			                    <td align="center"><%=NumbericHelper.getIntValue(tb.getPreAmount(),0)%></td>
			                    <td align="center"><%=NumbericHelper.getIntValue(tb.getRealAmount(),0)%></td>
			                </tr>
                			<%}
                		}%>
                		<tr height="25px" style="font-size:12px;background-color: white">
                		<td align="center" colspan="2" style='color:blue;font-weight:bold'>小计:</td> 
		                <td align="center" style='color:blue;font-weight:bold'><%=NumbericHelper.getIntValue(sb.getSaleCount(),0)%></td>
	                    <td align="center" style='color:blue;font-weight:bold'><%=NumbericHelper.getIntValue(sb.getSaleAmount(),0)%></td>
	                    <td align="center" style='color:blue;font-weight:bold'><%=NumbericHelper.getIntValue(sb.getBackCAmount(),0)%></td>
	                    <td align="center" style='color:blue;font-weight:bold'><%=NumbericHelper.getIntValue(sb.getAddCount(),0)%></td>
	                    <td align="center" style='color:blue;font-weight:bold'><%=NumbericHelper.getIntValue(sb.getAddAmount(),0)%></td>
	                    <td align="center" style='color:blue;font-weight:bold'><%=NumbericHelper.getIntValue(sb.getMendCount(),0)%></td>
	                    <td align="center" style='color:blue;font-weight:bold'><%=NumbericHelper.getIntValue(sb.getMendAmount(),0)%></td>
	                    <td align="center" style='color:blue;font-weight:bold'><%=NumbericHelper.getIntValue(sb.getPreAmount(),0)%></td>
	                    <td align="center" style='color:blue;font-weight:bold'><%=NumbericHelper.getIntValue(sb.getRealAmount(),0)%></td>
	                    </tr>
                	<%}
                %>
                <tr height="25px" style="font-size:12px;background-color: white">
               		<td align="center" colspan="2" style='color:red;font-weight:bold'>总计:</td> 
	                <td align="center" style='color:red;font-weight:bold'><%=NumbericHelper.getIntValue(timeBean.getSaleCount(),0)%></td>
                    <td align="center" style='color:red;font-weight:bold'><%=NumbericHelper.getIntValue(timeBean.getSaleAmount(),0)%></td>
                    <td align="center" style='color:red;font-weight:bold'><%=NumbericHelper.getIntValue(timeBean.getBackCAmount(),0)%></td>
                    <td align="center" style='color:red;font-weight:bold'><%=NumbericHelper.getIntValue(timeBean.getAddCount(),0)%></td>
                    <td align="center" style='color:red;font-weight:bold'><%=NumbericHelper.getIntValue(timeBean.getAddAmount(),0)%></td>
                    <td align="center" style='color:red;font-weight:bold'><%=NumbericHelper.getIntValue(timeBean.getMendCount(),0)%></td>
                    <td align="center" style='color:red;font-weight:bold'><%=NumbericHelper.getIntValue(timeBean.getMendAmount(),0)%></td>
                    <td align="center" style='color:red;font-weight:bold'><%=NumbericHelper.getIntValue(timeBean.getPreAmount(),0)%></td>
                    <td align="center" style='color:red;font-weight:bold'><%=NumbericHelper.getIntValue(timeBean.getRealAmount(),0)%></td>
                </tr>
            </table>
            </span>
            </td>
        </tr>
    </table>
    </div>
    </center>
    
</body>
</html>