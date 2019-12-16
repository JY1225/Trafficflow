<%@page contentType="text/html;charset=GBK" language="java"%>

<%@include file="/frame/Init.jsp"%>
<%@page import="com.erican.auth.vo.*"%>
<%@page import="com.sweii.framework.helper.*"%>

<%
Menu menu=(Menu)request.getAttribute("menu");
Module m=menu.getModule();
String moduleName="";
String moduleId="";
if(m!=null){
	moduleName=m.getName();
	moduleId=m.getId().intValue()+"";
}
%>
<html>
<head>
<meta http-equiv="X-UA-Compatible" content="IE=EmulateIE7">
<title></title>
<script src="/frame/js/Main.js"></script>
<script>
function selectIcon(){
	var diag = new Dialog("Diag2");
	diag.Width = 600;
	diag.Height = 300;
	diag.Title = "选择图标";
	diag.URL = "admin/Icon.jsp";
	diag.OKEvent = afterSelectIcon;
	diag.show();
}

function afterSelectIcon(){
	$("Icon").src = $DW.Icon;
	var icon=$DW.Icon;
	var index=icon.indexOf('/Icons/');
	if(index!=-1){
		$S('menu.icon',icon.substring(index+1,icon.length));
	}
	$D.close();
}
Page.onLoad(function(){
	if($("moduleId")!=null){
		Selector.setValueEx("moduleId",'<%=moduleId%>','<%=moduleName%>');
	}
	 <% if(request.getParameter("ROOT")!=null){ %>
	Selector.setDisabled($("moduleId"),true);
	<%}else{%>
   <%
	    }
	%>
});
</script>
<link href="/frame/css/frame.css" rel="stylesheet" type="text/css" />
<meta http-equiv="Content-Type" content="text/html; charset=gbk">
</head>
<body class="dialogBody" style="background-color: #F0F0F0;">
<form id="form2" >
<input id="menu.icon" type="hidden" value="<%=StringHelper.formatNullValue(menu.getIcon(),"")%>" name="menu.icon">
<input id="id" name="id" value="<%=menu.getId()%>" type="hidden">
<input id="menuType" name="menuType" value="<%=menu.getType()%>" type="hidden">
<table width="100%" height="100%" border="0">
  <tr>
    <td valign="middle"><table width="400" height="197" align="center" cellpadding="2" cellspacing="0">
      <tr>
        <td width="104" height="10" ></td>
        <td width="6"></td>
        <td></td>
      </tr>
      <tr>
        <td align="right" >名称：</td>
        <td>&nbsp;</td>
        <td width="260"><input name="menu.name" verify="名称|NotNull" type="text"  style="width:150px" class="input1" value="<%=menu.getName()%>" id="menu.name" size=15 />
      </tr>
      <tr>
        <td align="right" >上级菜单：</td>
        <td>&nbsp;</td>
        <td>
        	<%
        		if(menu.getParentId().intValue()==0){
        			out.print("根菜单");
        		}else{
        			out.print(menu.getParentName());
        		}
        	%>
        </td>
      </tr>
      <tr>
        <td align="right" >菜单类型：</td>
        <td>&nbsp;</td>
        <td><%=menu.getMenuType()%></td>
      </tr>
      <tr>
        <td align="right" >图标：</td>
        <td>&nbsp;</td>
        <td><label></label>
            <label><img src="../<%=menu.getIcon()%>" style="border:1px;display: none;" onerror="this.src='../Icons/icon018a4.gif'" onload="this.style.display=''" onClick="selectIcon()" name="Icon" width="24" height="24" align="absmiddle" id="Icon">（单击选择图标）</label></td>
      </tr>
      <%
      	if(menu.isLeafMenu()){
      	%>
	      <tr >
	        <td align="right">所属模块：</td>
	        <td>&nbsp;</td>
	        <td><sw:select id="moduleId" name="moduleId" style="width:150px;" reqAttr="modules">&nbsp;</sw:select></td>
	      </tr>
	   <%}%>
      <tr>
        <td align="right" >描述信息：</td>
        <td>&nbsp;</td>
        <td><textarea name="menu.description" cols="45" rows="2" id="menu.description" style="width:300px"><%=StringHelper.formatNullValue(menu.getDescription(),"")%></textarea></td>
      </tr>
      <tr>
        <td colspan="3" align="center"  height="10"></td>
      </tr>
    </table></td>
  </tr>
</table>
</form>
</body>
</html>
