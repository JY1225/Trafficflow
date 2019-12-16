<%@page contentType="text/html;charset=GBK" language="java"%>
<%@include file="/frame/Init.jsp"%>

<%
	String format="yyyy-MM-dd";
	String dateName="时间";
	String uri=request.getRequestURI();
	int treeWidth=383;
	int width=150;
	if(uri.indexOf("ReportSaleTicket")!=-1){
		format="yyyy-MM-dd HH:mm:ss";
	}else if(uri.indexOf("ReportAdminTicket")!=-1){
		format="yyyy-MM-dd HH:mm:ss";
	}else{
			Integer type=(Integer)request.getAttribute("type");
			if(type==1){
				format="yyyy-MM-dd";
				dateName="日期";
				width=80;
			}else if(type==2){
				format="yyyy-MM";
				dateName="月份";
				width=60;
			}else if(type==3){
				dateName="年份";
				format="yyyy";
				width=40;
			}
			//System.out.println(type);
		}
		//System.out.println(type);
%>

<script type="text/javascript">
 <s:property value="#request.saleAdminTree" escape="false"/>
</script>
<s:hidden  name="tripStrIds" id="tripStrIds"/>
<% if(request.getParameter("jspType")!=null){ %>
<input id="jspType" name="jspType" type='hidden' value="1"></input>
<%} %>
<s:hidden name="categoryTypeIds" id="categoryTypeIds"/>
<table width="98%" style="font-size:12px" algin="center">
    <tr>
        <td width="90%">
        <fieldset><legend><label>&nbsp;&nbsp;<b style="font-size: 14px">查询条件</b></label></legend>
        <table>
            <tr height="50px" style='font-size:12px'>
            <td colspan="2">
                	售票员编号：&nbsp;<input id="saleAdmin" name="saleAdmin" value="<s:property value="saleAdmin"/>" type="text" style="width: 150px" />
                	&nbsp;&nbsp;开始<%=dateName%>：<input id="startTime" name="startTime" type="text" style="width: <%=width %>px"  class="Wdate" value="<s:property value="startTime"/>" onclick="WdatePicker({dateFmt:'<%=format%>'})" /><img onclick="WdatePicker({dateFmt:'<%=format%>',el:'startTime'})" src="/images/Calendar.gif" align='absmiddle' style='cursor:pointer'  vspace='1' >
                	&nbsp;&nbsp;结束<%=dateName%>：<input id="endTime" name="endTime" type="text" style="width:  <%=width %>px" class="Wdate" value="<s:property value="endTime"/>"  onclick="WdatePicker({dateFmt:'<%=format%>'})" /><img onclick="WdatePicker({dateFmt:'<%=format%>',el:'endTime'})" src="/images/Calendar.gif" align='absmiddle' style='cursor:pointer'  vspace='1' >
                	&nbsp;&nbsp;
             </td>
            </tr>
         	<tr style='font-size:12px'>
         		<td width="50%" valign="middle">选择售票员：
         		<s:textarea id="tripStr" name="tripStr" readonly="true" onclick="showMenu('tripStr');"  cols="52" rows="3" />
         		</td>
         	</tr>
         	<tr>
         	<td colspan="3" align="center"><sw:button onClick="query()">查询</sw:button></td>
         	</tr>
        </table>
        </fieldset>
        </td>
    </tr>
</table>
 <div id="adminContent" class="menuContent" style="margin-top:-35px; display:none; position: absolute;">
		<ul id="adminTree" class="ztree" style="width:357px; height: 300px;"></ul>
</div>