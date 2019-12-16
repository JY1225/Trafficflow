<%@page contentType="text/html;charset=GBK" language="java"%>
<%@page import="com.erican.auth.vo.*"%>
<%@include file="/frame/Init.jsp"%>
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
function  ChangeAdType(){
	var type = $V("menu.type");
	if(type=='LEAF'){
		Selector.setDisabled($("moduleId"),false);
	}else{
		Selector.setValue($("moduleId"),'','');
		Selector.setDisabled($("moduleId"),true);
	}
}
Page.onLoad(function(){
    <% if(request.getParameter("ROOT")!=null){ %>
	Selector.setDisabled($("moduleId"),true);
	<%}else{%>
	   Selector.setValue($("parentId"),'<%=request.getParameter("parentId") %>');
	   $("parentId").value='<%=request.getParameter("parentId") %>';
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
<input id="menu.icon" type="hidden" value="" name="menu.icon">
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
        <td width="260"><input name="menu.name" verify="名称|NotNull" type="text" value="" style="width:150px" class="input1" id="menu.name" size=15 />
      </tr>
      <tr>
        <td align="right" >上级菜单：</td>
        <td>&nbsp;</td>
        <td>
        
        	<sw:select id="parentId" name="parentId" reqAttr="menuCombox" style="width:120px;"><span value="0" selected="true">根菜单</span></sw:select>
	
        </td>
      </tr>
      <tr>
        <td align="right" >菜单类型：</td>
        <td>&nbsp;</td>
        <td>
         <% if(request.getParameter("ROOT")!=null){ %>
             <div ztype="select" name="menu.type" id="menu.type"  onchange="ChangeAdType();" disabled>
        		<span value="CATEGORY"  selected="true">分级菜单</span>
      		</div>
      	<%}else{ %>
      	    <div ztype="select" name="menu.type" id="menu.type"  onchange="ChangeAdType();"  disabled>
        		<span value="LEAF"  selected="true">子菜单</span>
      		</div>
      	<%} %>	
        </td>
      </tr>
      <tr>
        <td align="right" >图标：</td>
        <td>&nbsp;</td>
        <td><label></label>
            <label><img src="../Icons/icon018a4.gif" style="border:1px" onClick="selectIcon()" name="Icon" width="24" height="24" align="absmiddle" id="Icon">（单击选择图标）</label></td>
      </tr>
      <tr id="tr_ModuleValue" style="display:">
     <% if(request.getParameter("ROOT")!=null){ %>
        <td align="right">模块分类：</td>
        <td>&nbsp;</td>
        <td><sw:select id="categoryId" name="categoryId" style="width:150px;"  reqAttr="combox" >&nbsp;</sw:select></td>
      <%}else{ %>
        <td align="right">所属模块：</td>
        <td>&nbsp;</td>
        <td><sw:select id="moduleId" name="moduleId" style="width:150px;" reqAttr="modules">&nbsp;</sw:select></td>
      <%} %>  
      </tr>
      <tr>
        <td align="right" >描述信息：</td>
        <td>&nbsp;</td>
        <td><textarea name="menu.description" cols="45" rows="2" id="menu.description" style="width:300px"></textarea></td>
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
