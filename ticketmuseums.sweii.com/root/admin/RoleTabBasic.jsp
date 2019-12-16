<%@page contentType="text/html;charset=GBK" language="java"%>
<%@page import="com.erican.auth.vo.*"%>
<%@page import="com.sweii.framework.helper.*"%>
<%@include file="/frame/Init.jsp"%>
<sw:init id="dg1">

<%
	Role role=(Role)request.getAttribute("role");
	if(role==null)role=new Role();
	Branch branch=(Branch)request.getAttribute("branch");
	if(branch==null)branch=new Branch();
%>
<html>
<head>
<meta http-equiv="X-UA-Compatible" content="IE=EmulateIE7">
<meta http-equiv="Content-Type" content="text/html; charset=gb2312" />
<title></title>
<link href="/frame/css/ext-all.css" rel="stylesheet" type="text/css" />
<link href="/frame/css/frame.css" rel="stylesheet" type="text/css" />
<script src="/frame/js/Main.js"></script>
<script>
function save(){
	DataGrid.save("dg1","com.zving.platform.Role.dg1Edit",function(){DataGrid.loadData('dg1');});
}


var topFrame = window.parent;

function add(){
   topFrame.add();	
}

function del(){
	var id = $V("id");
	var name = $V("name");
	topFrame.del(id,name);
}

function showEditDialog(){
    var param = $V("id");
	topFrame.showEditDialog(param);
}

function addUserToRole(){
	var diag = new Dialog("Diag1");
	diag.Width = 680;
	diag.Height = 350;
	diag.Title = "用户列表";
	diag.URL = "admin/prepareAddRoleAdmin.do?id="+$V("id");
	diag.OKEvent = addUserToRoleSave;
	diag.show();
}

function addUserToRoleSave(){
	var arr = $DW.DataGrid.getSelectedValue("dg1");
	if(!arr||arr.length==0){
		Dialog.alert("请先选中用户！");
		return;
	}
	var dc = new DataCollection();
	dc.add("id",$V("id"));
	dc.add("adminIds",arr.join());
	Server.sendRequest("admin/addRoleAdmin.do",dc,function(response){
		Dialog.alert(response.message,function(){
			if(response.status==1){
				$D.close();
				DataGrid.loadData("dg1");
			}		
		});
	},'json');
}

function delUserFromRole(){
	var arr = DataGrid.getSelectedValue("dg1");
	if(!arr||arr.length==0){
		Dialog.alert("请先选择要删除的行！");
		return;
	}
	Dialog.confirm("确认删除吗？",function(){
		var dc = new DataCollection();
		dc.add("id",$V("id"));
		dc.add("adminIds",arr.join());
		Server.sendRequest("admin/deleteRoleAdmin.do",dc,function(response){
			Dialog.alert(response.message,function(){
				if(response.status==1){
					DataGrid.loadData("dg1");
				}
			});
		},'json');		
	});
}
</script>
</head>
<body>

<input type="hidden" id="id" value="<%=NumbericHelper.getIntValue(role.getId(),0)%>" />
<input type="hidden" id="name" value="<%=StringHelper.formatNullValue(role.getName(),"")%>" />
<table width="100%" border='0' cellpadding='0' cellspacing='0'>
	<tr>
			<td>
				<div class="x-panel-header x-unselectable" style="-moz-user-select: none;">
						<table align="left">
							<tr>
							   <td><sw:button src="/Icons/icon025a2.gif" onClick="add()">新建</sw:button></td>			  
							   <td><sw:button  src="/Icons/icon025a4.gif"  onClick="showEditDialog()">修改</sw:button></td>	
							   <td><sw:button  src="/Icons/icon025a3.gif"  onClick="del()">删除</sw:button></td>		       
							</tr>
						</table>
				     </div>	
			</td>
	</tr>
	<tr>
		<td style="padding: 0px 5px;">
		<table width="100%" cellpadding="2"  border="0" cellspacing="0" class="table-border">
			<tr class="dataTableHead">
				<td width="19%"><b>名称</b></td>
				<td width="35%"><b>值</b></td>
				<td width="12%"><b>名称</b></td>
				<td width="38%"><b>值</b></td>
			</tr>
			
			<tr>
				<td><strong>角色名：</strong></td>
				<td><%=StringHelper.formatNullValue(role.getName(),"")%></td>
				<td><strong>所属机构：</strong></td>
				<td><%=StringHelper.formatNullValue(branch.getName(),"")%></td>
			</tr>
			<tr>
				<td><strong>用户数：</strong></td>
				<td>0</td>
				<td><strong>备注：</strong></td>
				<td><%=StringHelper.formatNullValue(role.getDescription(),"")%></td>
			</tr>
		</table>
		</td>
	</tr>
	<tr>
	<td>
				    <div class="x-panel-header x-unselectable" style="-moz-user-select: none;">
						<table align="left">
							<tr>
							   <td><sw:button src="/Icons/icon021a2.gif" onClick="addUserToRole()">添加用户到角色</sw:button></td>			  
							   <td><sw:button  src="/Icons/icon021a3.gif"  onClick="delUserFromRole()">从角色中删除用户</sw:button></td>		       
							</tr>
						</table>
				     </div>			
		<sw:datagrid>
			<table width="100%" cellpadding="2" cellspacing="0" class="dataTable" >
				<tr ztype="head" class="">
					<td width="6%" ztype="RowNo">序号</td>
					<td width="6%" ztype="selector" field="id">&nbsp;</td>
					<td width="15%">用户名</td>
					<td width="15%">真实姓名</td>
					<td width="20%">电子邮件</td>
					<td width="19%" >所属机构</td>
					<td width="19%">手机号码</td>
				</tr>
				<tr>
					<td>&nbsp;</td>
					<td>&nbsp;</td>
					<td>${username}</td>
					<td>${name}</td>
					<td>${email}</td>
					<td>${branchName}</td>
					<td>${mobile}</td>
				</tr>
				<tr ztype="pagebar">
					<td colspan="12" align="center">${PageBar}</td>
				</tr>
			</table>
		</sw:datagrid>
		<td>
		</tr>
		</table>
</body>
</html>
</sw:init>

