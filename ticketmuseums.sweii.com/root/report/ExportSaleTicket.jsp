<%@page contentType="text/html;charset=GBK" language="java"%>
<%@include file="/frame/Init.jsp"%>
<%@ page import="java.util.*"%>
<%@ page import="com.sweii.framework.helper.*"%>
<%@ page import="com.sweii.bean.*"%>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="X-UA-Compatible" content="IE=EmulateIE7">
<meta http-equiv="Content-Type" content="text/html; charset=gb2312" />
<title>测试01</title>
<link href="/style/style.css" rel="stylesheet" type="text/css" />
<link rel="stylesheet" href="/ztree/zTreeStyle/zTreeStyle.css" type="text/css">
<script type="text/javascript" src="/frame/datepicker/WdatePicker.js"></script>
<script type="text/javascript" src="/ztree/jquery-1.4.4.min.js"></script>
<script type="text/javascript" src="/ztree/jquery.ztree.core-3.4.js"></script>
<script type="text/javascript" src="/ztree/jquery.ztree.excheck-3.4.js"></script>
<script type="text/javascript" src="/js/Report.js"></script>
<script type="text/javascript" src="/js/Move.js"></script>
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
<%
Integer type=(Integer)request.getAttribute("type");
%>
<body style="background-color: #DFE6F8;">
<jsp:include page="/frame/Printer.jsp" />
<div class="box01" align="center"><span class="left">&nbsp;</span> <span class="tit" style="font-size: 20px"><b>
 <s:if test="type==1">
	日售票统计表
   </s:if>
   <s:elseif test="type==2">
   	月售票统计表
   </s:elseif> 
   <s:elseif test="type==3">
   	 年售票统计表
   </s:elseif> 
</b></span></div>

<center>
<div style="height:<%=(Integer.valueOf(height)) %>px;overflow-y:scroll;overflow-x:hidden;overflow:scroll;">
<form action="/report/reportTimeSaleTicket.do" method="post" id="form">
<s:hidden name="type"/>
<jsp:include page="SearchPage.jsp"></jsp:include>
</form>


    <table width="99%" border="0" cellspacing="0"  >
        <tr>
            <td width="15%" style="font-weight: bold;" align="left"></td>
            <td align="center" width="50%" style="font-weight: bold; font-size: 25px">
               <s:if test="type==1">
           		日售票统计表
           	   </s:if>
               <s:elseif test="type==2">
               	月售票统计表
               </s:elseif> 
               <s:elseif test="type==3">
               	 年售票统计表
               </s:elseif> 
            </td>
            <td width="20%" style="font-weight: bold;font-size:12px" align="right"><a href="javascript:void(0);" onclick="printHA4('print');" class="printBtn"><img src="/Icons/icon013a1.gif" />打印</a><a href="javascript:void(0);" onclick="saveAsFile('print','<s:if test="type==1">日售票统计表</s:if><s:elseif test="type==2">月售票统计表</s:elseif><s:elseif test="type==3">年售票统计表</s:elseif> .xls');" class="printBtn"><img src="/Icons/icon018a7.gif" />导出</a></td>
        </tr>       
        <tr>
            <td colspan="4" align="center">
            <span id="print">
            <table width="98%" border="0" cellspacing="0" class="table-border" style="height: 25px; text-align: left">
                <tr height="25px" style="font-weight: bold;font-size:12px;background-color: white">
               		 <td align="center">
	                	<s:if test="type==1">
                			售票日期
                		</s:if>
                        <s:elseif test="type==2">
                    		售票月份
                        </s:elseif> 
                        <s:elseif test="type==3">
                    		售票年份
                        </s:elseif>    
                    </td>                
                    <td align="center">票种</td>
                    <td align="center">售票数量</td>
                    <td align="center">售票金额</td>
                    <td align="center">退票数量</td>
                    <td align="center">退票金额</td>
                    <td align="center">退押金金额</td>
                    <td align="center">续费人数</td>
                    <td align="center">续费金额</td>
                    <td align="center">补卡人数</td>
                    <td align="center">补卡金额</td>
                    <td align="center">押金金额</td>
                    <td align="center">实收金额</td>
                </tr>
                <%
               		StatBean statBean=(StatBean)request.getAttribute("statBean");
                	
                	Map<Integer,String> tsMap=(Map<Integer,String>)request.getAttribute("tsMap");
                	Map<Integer,Integer> priceMap=(Map<Integer,Integer>)request.getAttribute("priceMap");
                	Map<Integer,Integer> typeMap=(Map<Integer,Integer>)request.getAttribute("typeMap");
                	List<CategoryBean> cbList=statBean.list;
               		for(CategoryBean cb:cbList){
               			int i=0;
               			boolean wrsend=false;
               			for(TypeBean tb:cb.list){%>
               			 <tr height="25px" style="font-size:12px;background-color: white">
               				<%
               				if(!wrsend){
               					wrsend=true;
               				%>
               				<td align="center"   rowspan="<%=(cb.list.size())%>"><%=tb.getTime() %></td>
               				<%}
               				
               				%>
               				<td align="center" ><%=tsMap.get(tb.getId())%></td>
			                <td align="center"><%=NumbericHelper.getIntValue(tb.getSaleCount(),0)%></td>
		                    <td align="center"><%=NumbericHelper.getIntValue(tb.getSaleAmount(),0)%></td>
		                    <td align="center"><%=NumbericHelper.getIntValue(tb.getBackTCount(),0)%></td>
		                    <td align="center"><%=NumbericHelper.getIntValue(tb.getBackTAmount(),0)%></td>
		                    <td align="center"><%=NumbericHelper.getIntValue(tb.getBackCAmount(),0)%></td>
		                    <td align="center"><%=NumbericHelper.getIntValue(tb.getAddCount(),0)%></td>
		                    <td align="center"><%=NumbericHelper.getIntValue(tb.getAddAmount(),0)%></td>
		                    <td align="center"><%=NumbericHelper.getIntValue(tb.getMendCount(),0)%></td>
		                    <td align="center"><%=NumbericHelper.getIntValue(tb.getMendAmount(),0)%></td>
		                    <td align="center"><%=NumbericHelper.getIntValue(tb.getPreAmount(),0)%></td>
		                    <td align="center"><%=NumbericHelper.getIntValue(tb.getRealAmount(),0)%></td>
		                </tr>
               			<%}%>
                		<tr height="25px" style="font-size:12px;background-color: white">
                		<td align="center" colspan="2" style='color:blue;font-weight:bold'>小计:</td> 
		                <td align="center" style='color:blue;font-weight:bold'><%=NumbericHelper.getIntValue(cb.getSaleCount(),0)%></td>
	                    <td align="center" style='color:blue;font-weight:bold'><%=NumbericHelper.getIntValue(cb.getSaleAmount(),0)%></td>
	                    <td align="center" style='color:blue;font-weight:bold'><%=NumbericHelper.getIntValue(cb.getBackTCount(),0)%></td>
	                    <td align="center" style='color:blue;font-weight:bold'><%=NumbericHelper.getIntValue(cb.getBackTAmount(),0)%></td>
	                    <td align="center" style='color:blue;font-weight:bold'><%=NumbericHelper.getIntValue(cb.getBackCAmount(),0)%></td>
	                    <td align="center" style='color:blue;font-weight:bold'><%=NumbericHelper.getIntValue(cb.getAddCount(),0)%></td>
	                    <td align="center" style='color:blue;font-weight:bold'><%=NumbericHelper.getIntValue(cb.getAddAmount(),0)%></td>
	                    <td align="center" style='color:blue;font-weight:bold'><%=NumbericHelper.getIntValue(cb.getMendCount(),0)%></td>
	                    <td align="center" style='color:blue;font-weight:bold'><%=NumbericHelper.getIntValue(cb.getMendAmount(),0)%></td>
	                    <td align="center" style='color:blue;font-weight:bold'><%=NumbericHelper.getIntValue(cb.getPreAmount(),0)%></td>
	                    <td align="center" style='color:blue;font-weight:bold'><%=NumbericHelper.getIntValue(cb.getRealAmount(),0)%></td>
	                    </tr>
                	<%}
                %>
                <tr height="25px" style="font-size:12px;background-color: white">
               		<td align="center" colspan="2" style='color:red;font-weight:bold'>总计:</td> 
	                <td align="center" style='color:red;font-weight:bold'><%=NumbericHelper.getIntValue(statBean.getSaleCount(),0)%></td>
                    <td align="center" style='color:red;font-weight:bold'><%=NumbericHelper.getIntValue(statBean.getSaleAmount(),0)%></td>
                    <td align="center" style='color:red;font-weight:bold'><%=NumbericHelper.getIntValue(statBean.getBackTCount(),0)%></td>
                    <td align="center" style='color:red;font-weight:bold'><%=NumbericHelper.getIntValue(statBean.getBackTAmount(),0)%></td>
                    <td align="center" style='color:red;font-weight:bold'><%=NumbericHelper.getIntValue(statBean.getBackCAmount(),0)%></td>
                    <td align="center" style='color:red;font-weight:bold'><%=NumbericHelper.getIntValue(statBean.getAddCount(),0)%></td>
                    <td align="center" style='color:red;font-weight:bold'><%=NumbericHelper.getIntValue(statBean.getAddAmount(),0)%></td>
                    <td align="center" style='color:red;font-weight:bold'><%=NumbericHelper.getIntValue(statBean.getMendCount(),0)%></td>
                    <td align="center" style='color:red;font-weight:bold'><%=NumbericHelper.getIntValue(statBean.getMendAmount(),0)%></td>
                    <td align="center" style='color:red;font-weight:bold'><%=NumbericHelper.getIntValue(statBean.getPreAmount(),0)%></td>
                    <td align="center" style='color:red;font-weight:bold'><%=NumbericHelper.getIntValue(statBean.getRealAmount(),0)%></td>
                </tr>
            </table>
            </span>
            </td>
        </tr>
    </table>

    <br>
    
    
    <table width="99%" border="0" cellspacing="0"  >
        <tr>
            <td width="15%" style="font-weight: bold;" align="left"></td>
            <td align="center" width="50%" style="font-weight: bold; font-size: 25px">
               <s:if test="type==1">
           		日售票转移表
           	   </s:if>
            </td>
            <td width="20%" style="font-weight: bold;font-size:12px" align="right"><a href="javascript:void(0);" onclick="printHA4('print');" class="printBtn"><img src="/Icons/icon013a1.gif" />打印</a><a href="javascript:void(0);" onclick="saveAsFile('print','<s:if test="type==1">日售票统计表</s:if><s:elseif test="type==2">月售票统计表</s:elseif><s:elseif test="type==3">年售票统计表</s:elseif> .xls');" class="printBtn"><img src="/Icons/icon018a7.gif" />导出</a></td>
        </tr>       
        <tr>
            <td colspan="4" align="center">
            <span id="print">
            <table width="98%" border="0" cellspacing="0" class="table-border" style="height: 25px; text-align: left">
                <tr height="25px" style="font-weight: bold;font-size:12px;background-color: white">
               		 <td align="center">
	                	<s:if test="type==1">
                			售票日期
                		</s:if>
                        <s:elseif test="type==2">
                    		售票月份
                        </s:elseif> 
                        <s:elseif test="type==3">
                    		售票年份
                        </s:elseif>    
                    </td>                
                    <td align="center">票种</td>
                    <td align="center">售票数量</td>
                    <td align="center">售票金额</td>
                    <td align="center">退票数量</td>
                    <td align="center">退票金额</td>
                    <td align="center">退押金金额</td>
                    <td align="center">续费人数</td>
                    <td align="center">续费金额</td>
                    <td align="center">补卡人数</td>
                    <td align="center">补卡金额</td>
                    <td align="center">押金金额</td>
                    <td align="center">实收金额</td>
                </tr>
                <%
               		statBean=(StatBean)request.getAttribute("statBean");
                	
                	tsMap=(Map<Integer,String>)request.getAttribute("tsMap");
                
                	cbList=statBean.list;
               		for(CategoryBean cb:cbList){
               			int i=0;
               			boolean wrsend=false;
               			for(TypeBean tb:cb.list){%>
               			 <tr height="25px" style="font-size:12px;background-color: white">
               				<%
               				if(!wrsend){
               					wrsend=true;
               				%>
               				<td align="center"   rowspan="<%=(cb.list.size())%>"><%=tb.getTime() %></td>
               				<%}
               				
               				%>
               				<td align="center" ><%=tsMap.get(tb.getId())%><input type='hidden' value="<%=tb.getId() %>" name='ticketId'></input></td>
			                <td align="center">
			                <% if(tb.getSaleCount()!=null&&tb.getSaleCount()>0){ %>
			                <% if(typeMap.get(tb.getId()).intValue()==5||typeMap.get(tb.getId()).intValue()==4){ %>
			                <%=NumbericHelper.getIntValue(tb.getSaleCount(),0)%><input id='saleCount<%=tb.getId() %>' type='hidden' value='<%=NumbericHelper.getIntValue(tb.getSaleCount(),0)%>' size="<%=NumbericHelper.getIntValue(tb.getSaleCount(),0)%>" onpropertychange="checkSaleCount(this,<%=tb.getId() %>,<%=priceMap.get(tb.getId()) %>,1);"  ticketId=<%=tb.getId() %> price="<%=priceMap.get(tb.getId()) %>" style='width:70px;text-align:center'></input>
			                <%}else{ %>
			                      <% if(tsMap.get(tb.getId()).indexOf("情侣")>-1){ %>
			                       <input id='saleCount<%=tb.getId() %>' value='<%=NumbericHelper.getIntValue(tb.getSaleCount(),0)/2%>' size="<%=NumbericHelper.getIntValue(tb.getSaleCount(),0)/2%>" onpropertychange="checkSaleCount(this,<%=tb.getId() %>,<%=priceMap.get(tb.getId()) %>,1);"  ticketId=<%=tb.getId() %> price="<%=priceMap.get(tb.getId()) %>" style='width:60px;text-align:center'></input>套
			                      <%}else if(tsMap.get(tb.getId()).indexOf("家庭")>-1){ %>
			                      <input id='saleCount<%=tb.getId() %>' value='<%=NumbericHelper.getIntValue(tb.getSaleCount(),0)/3%>' size="<%=NumbericHelper.getIntValue(tb.getSaleCount(),0)/3%>" onpropertychange="checkSaleCount(this,<%=tb.getId() %>,<%=priceMap.get(tb.getId()) %>,1);"  ticketId=<%=tb.getId() %> price="<%=priceMap.get(tb.getId()) %>" style='width:60px;text-align:center'></input>套 
			                      <%}else{ %>
			                      <input id='saleCount<%=tb.getId() %>' value='<%=NumbericHelper.getIntValue(tb.getSaleCount(),0)%>' size="<%=NumbericHelper.getIntValue(tb.getSaleCount(),0)%>" onpropertychange="checkSaleCount(this,<%=tb.getId() %>,<%=priceMap.get(tb.getId()) %>,1);"  ticketId=<%=tb.getId() %> price="<%=priceMap.get(tb.getId()) %>" style='width:70px;text-align:center'></input>
			                       <%} }%>
			                <%}else{ %>
			                      <%=NumbericHelper.getIntValue(tb.getSaleCount(),0)%>
			                <%} %>
			                </td>
		                    <td align="center" id='saleAmount<%=tb.getId() %>'><%=NumbericHelper.getIntValue(tb.getSaleAmount(),0)%></td>
		                    <td align="center">
		                    <% if(tb.getBackTCount()!=null&&tb.getBackTCount()>0){ %>
		                        <% if(tsMap.get(tb.getId()).indexOf("情侣")>-1){ %>
			                       <input id='backTCount<%=tb.getId() %>' value='<%=NumbericHelper.getIntValue(tb.getBackTCount(),0)/2%>' size="<%=NumbericHelper.getIntValue(tb.getBackTCount(),0)/2%>" onpropertychange="checkSaleCount(this,<%=tb.getId() %>,<%=priceMap.get(tb.getId()) %>,2);" ticketId=<%=tb.getId() %> price="<%=priceMap.get(tb.getId()) %>" style='width:70px;text-align:center'></input>套
			                      <%}else if(tsMap.get(tb.getId()).indexOf("家庭")>-1){ %>
			                      <input id='backTCount<%=tb.getId() %>' value='<%=NumbericHelper.getIntValue(tb.getBackTCount(),0)/3%>' size="<%=NumbericHelper.getIntValue(tb.getBackTCount(),0)/3%>" onpropertychange="checkSaleCount(this,<%=tb.getId() %>,<%=priceMap.get(tb.getId()) %>,2);" ticketId=<%=tb.getId() %> price="<%=priceMap.get(tb.getId()) %>" style='width:70px;text-align:center'></input>套 
			                      <%}else{ %>
			                     <input id='backTCount<%=tb.getId() %>' value='<%=NumbericHelper.getIntValue(tb.getBackTCount(),0)%>' size="<%=NumbericHelper.getIntValue(tb.getBackTCount(),0)%>" onpropertychange="checkSaleCount(this,<%=tb.getId() %>,<%=priceMap.get(tb.getId()) %>,2);" ticketId=<%=tb.getId() %> price="<%=priceMap.get(tb.getId()) %>" style='width:70px;text-align:center'></input>
			                       <%} %>
		                      
		                        
		                    <%}else{ %>
		                        <%=NumbericHelper.getIntValue(tb.getBackTCount(),0)%>
		                    <%} %>
		                    </td>
		                    <td align="center" id='backTAmount<%=tb.getId() %>'><%=NumbericHelper.getIntValue(tb.getBackTAmount(),0)%></td>
		                    <td align="center"><%=NumbericHelper.getIntValue(tb.getBackCAmount(),0)%></td>
		                    <td align="center">
		                    <% if(tb.getAddCount()!=null&&tb.getAddCount()>0){ %>
		                    <%=NumbericHelper.getIntValue(tb.getAddCount(),0)%>  <input  id='addCount<%=tb.getId() %>' type='hidden' value='<%=NumbericHelper.getIntValue(tb.getAddCount(),0)%>' size="<%=NumbericHelper.getIntValue(tb.getAddCount(),0)%>" onpropertychange="checkSaleCount(this,<%=tb.getId() %>,<%=priceMap.get(tb.getId()) %>,3);" ticketId=<%=tb.getId() %> price="<%=priceMap.get(tb.getId()) %>" style='width:70px;text-align:center'></input>
		                    <%}else{ %>
		                    <%=NumbericHelper.getIntValue(tb.getAddCount(),0)%>
		                    <%} %>
		                    </td>
		                    <td align="center" id='addAmount<%=tb.getId() %>'><%=NumbericHelper.getIntValue(tb.getAddAmount(),0)%></td>
		                    <td align="center">
		                    <% if(tb.getMendCount()!=null&&tb.getMendCount()>0){ %>
		                   <%=NumbericHelper.getIntValue(tb.getMendCount(),0)%> <input  id='mendCount<%=tb.getId() %>' type='hidden' value='<%=NumbericHelper.getIntValue(tb.getMendCount(),0)%>' size="<%=NumbericHelper.getIntValue(tb.getMendCount(),0)%>" onpropertychange="checkSaleCount(this,<%=tb.getId() %>,<%=priceMap.get(tb.getId()) %>,4);" ticketId=<%=tb.getId() %> price="<%=priceMap.get(tb.getId()) %>" style='width:70px;text-align:center'></input>
		                    <% }else{ %>
		                        <%=NumbericHelper.getIntValue(tb.getMendCount(),0)%>
		                    <%} %>
		                    </td>
		                    <td align="center" id="mendAmount<%=tb.getId() %>"><%=NumbericHelper.getIntValue(tb.getMendAmount(),0)%></td>
		                    <td align="center"><%=NumbericHelper.getIntValue(tb.getPreAmount(),0)%></td>
		                    <td align="center" id='realAmount<%=tb.getId() %>'><%=NumbericHelper.getIntValue(tb.getRealAmount(),0)%></td>
		                </tr>
               			<%}%>
                		<tr height="25px" style="font-size:12px;background-color: white">
                		<td align="center" colspan="2" style='color:blue;font-weight:bold'>小计:</td> 
		                <td align="center" id='saleCount' style='color:blue;font-weight:bold'><%=NumbericHelper.getIntValue(cb.getSaleCount(),0)%></td>
	                    <td align="center" id='saleAmount' style='color:blue;font-weight:bold'><%=NumbericHelper.getIntValue(cb.getSaleAmount(),0)%></td>
	                    <td align="center" id='backTCount' style='color:blue;font-weight:bold'><%=NumbericHelper.getIntValue(cb.getBackTCount(),0)%></td>
	                    <td align="center" id='backTAmount' style='color:blue;font-weight:bold'><%=NumbericHelper.getIntValue(cb.getBackTAmount(),0)%></td>
	                    <td align="center" style='color:blue;font-weight:bold'><%=NumbericHelper.getIntValue(cb.getBackCAmount(),0)%></td>
	                    <td align="center" id='addCount' style='color:blue;font-weight:bold'><%=NumbericHelper.getIntValue(cb.getAddCount(),0)%></td>
	                    <td align="center" id='addAmount' style='color:blue;font-weight:bold'><%=NumbericHelper.getIntValue(cb.getAddAmount(),0)%></td>
	                    <td align="center" id='mendCount' style='color:blue;font-weight:bold'><%=NumbericHelper.getIntValue(cb.getMendCount(),0)%></td>
	                    <td align="center" id='mendAmount' style='color:blue;font-weight:bold'><%=NumbericHelper.getIntValue(cb.getMendAmount(),0)%></td>
	                    <td align="center"  style='color:blue;font-weight:bold'><%=NumbericHelper.getIntValue(cb.getPreAmount(),0)%></td>
	                    <td align="center" id='realAmount' style='color:blue;font-weight:bold'><%=NumbericHelper.getIntValue(cb.getRealAmount(),0)%></td>
	                    </tr>
                	<%}
                %>
                <tr height="25px" style="font-size:12px;background-color: white"> 
               		<td align="center" colspan="2" style='color:red;font-weight:bold'>总计:</td> 
	                <td align="center" id='saleCountTotal' style='color:red;font-weight:bold'><%=NumbericHelper.getIntValue(statBean.getSaleCount(),0)%></td>
                    <td align="center" id='saleAmountTotal' style='color:red;font-weight:bold'><%=NumbericHelper.getIntValue(statBean.getSaleAmount(),0)%></td>
                    <td align="center" id="backTCountTotal" style='color:red;font-weight:bold'><%=NumbericHelper.getIntValue(statBean.getBackTCount(),0)%></td>
                    <td align="center" id='backTAmountTotal' style='color:red;font-weight:bold'><%=NumbericHelper.getIntValue(statBean.getBackTAmount(),0)%></td>
                    <td align="center" style='color:red;font-weight:bold'><%=NumbericHelper.getIntValue(statBean.getBackCAmount(),0)%></td>
                    <td align="center" id="addCountTotal" style='color:red;font-weight:bold'><%=NumbericHelper.getIntValue(statBean.getAddCount(),0)%></td>
                    <td align="center" id='addAmountTotal' style='color:red;font-weight:bold'><%=NumbericHelper.getIntValue(statBean.getAddAmount(),0)%></td>
                    <td align="center" id="mendCountTotal" style='color:red;font-weight:bold'><%=NumbericHelper.getIntValue(statBean.getMendCount(),0)%></td>
                    <td align="center" id="mendAmountTotal" style='color:red;font-weight:bold'><%=NumbericHelper.getIntValue(statBean.getMendAmount(),0)%></td>
                    <td align="center" style='color:red;font-weight:bold'><%=NumbericHelper.getIntValue(statBean.getPreAmount(),0)%></td>
                    <td align="center" id="realAmountTotal" style='color:red;font-weight:bold'><%=NumbericHelper.getIntValue(statBean.getRealAmount(),0)%></td>
                </tr>
            </table>
            </span>
            </td>
        </tr>
        <tr>
         	<td colspan="3" align="center"><sw:button onClick="moveData()">转移</sw:button>&nbsp;&nbsp;<sw:button onClick="deleteData()">清空当天数据</sw:button>  &nbsp;&nbsp;<span id='fshowing' style='display:none'>正在转移数据...(<span id='finishSize'>34/9873</span>张)</span></td>
         	</tr>
    </table>
    <br></br>
    <br></br>
    <br></br>
    <br></br>
    <br></br>
        </div>
    </center>
</body>
</html>