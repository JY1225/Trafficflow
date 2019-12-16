<%@page contentType="text/html;charset=GBK" language="java"%>
<%@include file="/frame/Init.jsp"%>
<sw:init id="dg1">


	<html>
	<head>
	<meta http-equiv="X-UA-Compatible" content="IE=EmulateIE7">
	<meta http-equiv="Content-Type" content="text/html; charset=gb2312" />
	<title>用户</title>
	<link href="/frame/css/ext-all.css" rel="stylesheet" type="text/css" />
	<script type="text/javascript" src="/frame/js/Main.js"></script>
	<script>


function doSearch(){
	var name = "";
	if ($V("searchContent") != "请输入用户名或真实姓名") {
		name = $V("searchContent").trim();
	}
	DataGrid.setParam("dg1",Constant.PageIndex,0);
	DataGrid.setParam("dg1","searchContent",name);
	DataGrid.loadData("dg1");
}

document.onkeydown = function(event){
	event = getEvent(event);
	if(event.keyCode==13){
		var ele = event.srcElement || event.target;
		if(ele.id == 'searchContent'||ele.id == 'Submibutton'){
			doSearch();
		}
	}
}

function delKeyWord() {
	if ($V("searchContent") == "请输入用户名或真实姓名") {
		$S("searchContent","");
	}
}


</script>
	</head>
	<body>

	<div class="x-panel-header x-unselectable"
		style="-moz-user-select: none;">

	<table align="right" style="font-size: 12px;">
		<tr>
			<td><input name="searchContent" type="text" id="searchContent"
				value="请输入用户名或真实姓名" onFocus="delKeyWord();" style="width: 150px"></td>

			<td><sw:button src="/Icons/icon403a3.gif" onClick="doSearch()">搜索</sw:button></td>
		</tr>
	</table>
	</div>

	<sw:datagrid id="dg1" size="18"
		fields="id,worker.name,worker.branchId,phone"
		ajax="admin/selectAdminPage.do">
		<table width="100%" cellpadding="2" cellspacing="0" class="dataTable">
			<tr ztype="head" class="x-grid3-hd-row">
				<td width="5%" ztype="RowNo">序号</td>
				<td width="5%" ztype="selector" field="id">&nbsp;</td>
				<td width="45%">真实姓名</td>
				<td width="45%" code="branch">部门</td>

			</tr>
			<tr >
				<td>&nbsp;</td>
				<td>&nbsp;</td>
				<td>${worker.name}</td>
				<td>${worker.branchId}</td>
			</tr>
			<tr ztype="pagebar">
				<td colspan="9" align="center">${PageBar}</td>
			</tr>
		</table>
	</sw:datagrid>

	</body>
	</html>
</sw:init>
