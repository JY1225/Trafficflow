<%@page contentType="text/html;charset=GBK" language="java"%>
<%@page import="com.erican.auth.vo.*"%>
<%@page import="com.sweii.vo.*"%>
<%@page import="java.util.*"%>
<%@include file="/frame/Init.jsp"%>
<%
    List<ModuleCategory> categorys = (List<ModuleCategory>) request.getAttribute("categorys");
    Set<Integer> roleSet = (Set<Integer>) request.getAttribute("functions");
%>
<html>
<head>
<meta http-equiv="X-UA-Compatible" content="IE=EmulateIE7">
<title></title>
<sw:cssjs />
<script>
function setFunction(obj,id){
   var flag=1;
   if(obj.checked){
       flag=2;
   }
   Server.sendRequest("admin/setFunction.do?id="+id+"&flag="+flag+"&roleId=<%=request.getParameter("id") %>", "",
			function(c) {
				
			},'json');
}

</script>
<meta http-equiv="Content-Type" content="text/html; charset=gbk">
<style type="text/css">
.buttonClass td {
	border-top: 0px;
	border-left: 0px;
	border-right: 0px;
	border-bottom: 0px;
}
</style>
</head>
<body>
<center>
<br>
<table width="680" border="0" border="0" cellpadding="0" cellspacing="0" class="table-border">
    <tr height="25">
        <td width="105px" align="center"><b>分类</b></td>
        <td width="105px" align="center"><b>模块</b></td>
        <td width="405px" align="center"><b>功能                              </b>(勾选或取消系统会自动保存权限)</td>
    </tr>
    <%
        for (ModuleCategory category:categorys) {
    %>
    <%
        int i=0;
        for (Module module:category.getModules()) {
            
    %>
    <tr height="25">
        <%
            if (i++ == 0) {
        %>
        <td width="105px" align="center" rowspan="<%=category.getModules().size()%>"><%=category.getName()%></td>
        <%
            }
        %>
        <td width="105px" align="center"><%=module.getName()%></td>
        <td>&nbsp;<% for(Function function:module.getFunctions()){ %>
          <input  type="checkbox" onclick="setFunction(this,<%=function.getId() %>);" <% if(roleSet.contains(function.getId())){out.print("checked");} %>/><%=function.getName() %>
        <%} %>
        </td>
    </tr>
    <%
        }
    %>
    <%
        }
    %>
</table>
</center>
</body>
</html>