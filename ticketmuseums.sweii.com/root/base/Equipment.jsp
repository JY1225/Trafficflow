<%@page contentType="text/html;charset=GBK" language="java"%>
<%@include file="/frame/Init.jsp"%>
<sw:init id="dg1">
<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="X-UA-Compatible" content="IE=EmulateIE7">
<meta http-equiv="Content-Type" content="text/html; charset=gb2312" />
<title>设备管理</title>
 <link href="/style/style.css" rel="stylesheet" type="text/css" />
<script type="text/javascript" src="/frame/js/Main.js"></script>
<script type="text/javascript" src="/frame/datepicker/WdatePicker.js"></script>
   <sw:dialog method="add" width="380" height="160"  title="新建设备" url="base/EquipmentDialog.jsp" action="common/addEquipment.do" /> 
    <sw:dialog method="edit" width="380" height="160"  title="修改设备" url="base/EquipmentDialog.jsp" action="common/editEquipment.do" fields="name,ip,port,createTime"/> 
    <sw:confirm method="del" action="common/deleteEquipment.do" confirm="你确定要删除选择的设备吗？"  success="删除设备成功！" failure="删除设备失败！"   multi="true"/>   
  <sw:search fields="equipment.name,equipment.ip" method="search" />   
</head>
<body  style="background-color: #DFE6F8;">
<div class="box01" align="center"><span class="left">&nbsp;</span> <span class="tit" style="font-size:20px"><b>设备管理 </b></span></div>
<table class="tools" style="width:100%">
    <tr>
       <td>
				<sw:button src="/Icons/icon002a2.gif"  limit="true" onClick="add()">新建</sw:button>
				<sw:button src="/Icons/icon018a4.gif"  limit="true" onClick="edit()">修改</sw:button>
				<sw:button src="/Icons/icon018a3.gif" limit="true"  onClick="del()">删除</sw:button>
				名称:<input id="equipment.name" type="text" size="10"></input>
				IP:<input id="equipment.ip" type="text" size="10"></input>
				<sw:button onClick="search()">查询</sw:button>
		</td>
	</tr>
</table>
<sw:datagrid>       
           <table class="table" cellpadding="0" cellspacing="0" style="table-layout: fixed">
              <tr ztype="head" class="tr">
                <td width="34px" ztype="RowNo">&nbsp;<b>序号</td>
                <td width="34px" ztype="selector" field="id">&nbsp;</td>
                <td width="100px">&nbsp;<b>名称</b></td>
                <td width="100px">&nbsp;<b>IP地址</b></td>
                <td width="100px">&nbsp;<b>端口</b></td>
                <td width="100px">&nbsp;<b>创建时间</b></td>
                <td width="100px">&nbsp;<b>连接状态</b></td>
            </tr>
            <tr>
                <td align="center">&nbsp;</td>
                <td >&nbsp;</td>
                <td>&nbsp;${name}</td>
                <td>&nbsp;${ip}</td>
                 <td>&nbsp;${port}</td>
                 <td>&nbsp;${createTime}</td>
                 <td>&nbsp;${statusStr}</td>
            </tr>
            <tr ztype="pagebar" align="left" height="30px" style="background-color: #D3E1F1;">
                <td colspan="17" align="left" height="30px">${PageBar}</td>
            </tr>
        </table>
    </sw:datagrid>
</body>
</html>
</sw:init>
