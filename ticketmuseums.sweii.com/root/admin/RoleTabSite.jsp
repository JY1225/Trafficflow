
<%@include file="/frame/Init.jsp"%>
<html>
<head>
<meta http-equiv="X-UA-Compatible" content="IE=EmulateIE7">
<meta http-equiv="Content-Type" content="text/html; charset=gb2312" />
<title>站点权限</title>
<%
String PrivType = request.getParameter("PrivType");
Mapx map = Priv.SITE_MAP;
%>
<link href="/frame/css/frame.css" rel="stylesheet" type="text/css" />
<script src="/frame/js/Main.js"></script>
<script>
Page.onLoad(function(){
	$("dg1").beforeEdit = function(tr,dr){
		<%for(int i=0;i<map.size();i++){%>
			$("<%=map.keyArray()[i]%>").checked = dr.get("<%=map.keyArray()[i]%>")=='√'; 
		<%}%>
		return true;
	}
	$("dg1").afterEdit = function(tr,dr){
		<%for(int i=0;i<map.size();i++){%>
			dr.set("<%=map.keyArray()[i]%>",$("<%=map.keyArray()[i]%>").checked ? '√':'');
		<%}%>
		return true;
	}
});

function init(){
	DataGrid.setParam("dg1","RoleCode",$V("RoleCode"));
	DataGrid.setParam("dg1","Role.LastRoleCode",Cookie.get("Role.LastRoleCode"));
	DataGrid.loadData("dg1");
}

function save(){
	if(DataGrid.EditingRow!=null){
		if(!DataGrid.changeStatus(DataGrid.EditingRow)){
			return;
		}
	}
	var ds = $("dg1").DataSource;
	var dc = new DataCollection();
	dc.add("DT",ds);
	dc.add("RoleCode",$V("RoleCode"));
	dc.add("PrivType","<%=PrivType%>");
	Server.sendRequest("com.zving.platform.RoleTabSite.dg1Edit",dc,function(response){
		$("AllSelect").checked =false;
		Dialog.alert(response.Message,function(){
			if(response.Status==1){
				DataGrid.loadData('dg1');
			}
		});
	});
}

function clickCheckBox(ele){
	var flag = ele.checked;
	//当取消每一行的第一个权限时，自动取消后面所有的权限
	<%
	if(map.size()>0){
	%>
		if(!flag&&ele.id=='<%=map.keyArray()[0]%>'){
			<%for(int i=1;i<map.size();i++){%>
				$("<%=map.keyArray()[i]%>").checked = false;
			<%}%>
		}
	<%
	}
	%>
}

function clickAllSelect(){
	var v = $("AllSelect").checked? "√":"";
	var trs = $("dg1").children[0].children;
	var length = trs.length-1;
	var ds = $("dg1").DataSource;
	var dr = null;
	for(var i=1;i<length;i++){
		tr = trs[i];
		dr = ds.getDataRow(i-1);
		var tds = tr.children;
		for(var j=0;j<tds.length;j++){
			if(tds[j].getAttribute("zindex")){
				tds[j].innerHTML=v;
				dr.set2(j+3,v);
			}
		}
	}
}
</script>
</head>
<body>
<table  width="100%" border='0' cellpadding='0' cellspacing='0'>
<tr>
    <td style="padding:4px 5px;"><sw:button onClick="save()"><img src="../Icons/icon018a2.gif"/>保存</sw:button>
      <input type = "hidden" id ="RoleCode" value = "">
      <span style="line-height:24px;">&nbsp;&nbsp;&nbsp;<label>全选&nbsp;<input type="checkbox" id="AllSelect" onClick="clickAllSelect();"/></label></span>
  	</td>
</tr>
<tr>   <td style="padding:0px 5px;">
<sw:datagrid id="dg1" method="com.zving.platform.RoleTabSite.dg1DataBind" size="14">
			  <table width="100%" cellpadding="2" cellspacing="0" class="dataTable">
				<tr ztype="head" class="dataTableHead">
				  <td  width="4%" ztype="RowNo">序号</td>
				  <td width="13%"><b>站点名称</b></td>
				  <%for(int i=0;i<map.size();i++){%>
						<td width="15%" align="center" ><b><%=map.getString(map.keyArray()[i])%></b></td>
					<%}%>
			    </tr>
				<tr style1="background-color:#FFFFFF" style2="background-color:#F9FBFC">
				  <td >&nbsp;</td>
				  <td>${Name}</td>
				  <%
				  for(int i=0;i<map.size();i++){
					  String t = "${"+map.keyArray()[i]+"}";
				  %>
				  		<td align="center" zindex="<%=i+2%>"><%=t%></td>
				  <%}%>
			    </tr>
			    <tr ztype="edit" bgcolor="#E1F3FF">
				  <td >&nbsp;</td>
				  <td>${Name}</td>
				  <%
				  for(int i=0;i<map.size();i++){
				  %>
				  		<td align="center" ><input type='checkbox' name='<%=map.keyArray()[i] %>' id ='<%=map.keyArray()[i] %>' onClick='clickCheckBox(this);'></td>
				  <%}%>
			    </tr>
			    <tr ztype="pagebar">
					<td colspan="<%=map.size()+2%>">${PageBar}</td>
				</tr>
	    </table>
	  </sw:datagrid></td>
 </tr>
</table>	
</body>
</html>
