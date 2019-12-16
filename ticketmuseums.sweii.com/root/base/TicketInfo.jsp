<%@page contentType="text/html;charset=GBK" language="java"%>
<%@include file="/frame/Init.jsp"%>
<sw:init id="dg1">
	<!DOCTYPE html>
	<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="X-UA-Compatible" content="IE=EmulateIE7">
<meta http-equiv="Content-Type" content="text/html; charset=gb2312" />
<title></title>
<link href="/style/style.css" rel="stylesheet" type="text/css" />
<script type="text/javascript" src="/frame/js/Main.js"></script>
<script type="text/javascript" src="/frame/datepicker/WdatePicker.js"></script>
<sw:search fields="ticketInfo.type,condition.startTime,condition.endTime,ticketInfo.number" method="search" />
</head>
<body style="background-color: #DFE6F8;">
	<div class="box01" align="center">
		<span class="left">&nbsp;</span> <span class="tit"
			style="font-size: 20px"><b>入库详细列表 </b></span>
	</div>

	<table class="tools" style="width: 100%">
		<tr>
			<td> <input id="condition.startTime" type="text" field="inDate"
				tip="开始日期" ztype="date" format="yyyy-MM-dd" style="width: 75px"></input>
				<input id="condition.endTime" type="text" tip="结束日期" ztype="date"
				format="yyyy-MM-dd" style="width: 75px"></input> <input id="ticketInfo.number" tip="条形码" type="text" size="10"></input>
				<sw:select id="ticketInfo.type">
				<span value=''>请选择</span>
				</sw:select> <sw:button onClick="search()">查询</sw:button></td>
		</tr>
	</table>

	<sw:datagrid>
		<table class="table" cellpadding="0" cellspacing="0"
			style="table-layout: fixed">
			<tr ztype="head" class="tr">
				<td width="34px" ztype="RowNo">&nbsp;<b>序号</td>
				<td width="34px" ztype="selector" field="id">&nbsp;</td>
				<td width="100px">&nbsp;<b>条形码</b></td>
				<td width="100px">&nbsp;<b>次数</b></td>
				<td width="100px">&nbsp;<b>类型</b></td>
				<td width="100px">&nbsp;<b>状态</b></td>
				<td width="100px">&nbsp;<b>操作人</b></td>
				<td width="100px">&nbsp;<b>入库时间</b></td>
			</tr>
			<tr>
				<td>&nbsp;${id}</td>
				<td>&nbsp;</td>
				<td>&nbsp;${number}</td>
				<td>&nbsp;${size}</td>
				<td>&nbsp;${type}</td>
				<td>&nbsp;${status}</td>
				<td>&nbsp;${admin.name}</td>
				<td>&nbsp;${inDate}</td>
			</tr>
			<tr ztype="pagebar" align="left" height="30px"
				style="background-color: #D3E1F1;">
				<td colspan="17" align="left" height="30px">${PageBar}</td>
			</tr>
		</table>
	</sw:datagrid>
</body>
	</html>
</sw:init>
