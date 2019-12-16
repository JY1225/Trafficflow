<%@page contentType="text/html;charset=GBK" language="java"%>
<%@include file="/frame/Init.jsp"%>
<sw:init id="dg1">
<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="X-UA-Compatible" content="IE=EmulateIE7">
<meta http-equiv="Content-Type" content="text/html; charset=gb2312" />
<title>会员管理</title>
 <link href="/style/style.css" rel="stylesheet" type="text/css" />
<script type="text/javascript" src="/frame/js/Main.js"></script>
<script type="text/javascript" src="/frame/datepicker/WdatePicker.js"></script>
   <sw:dialog method="add" width="500" height="320"  title="新添加会员" url="excel/RecordLogDialog.jsp" action="common/addRecordLog.do"/> 
    <sw:dialog method="edit" width="500" height="320"  title="修改会员" url="excel/RecordLogDialog.jsp" action="common/editRecordLog.do" fields="id,name,number,phone,remark"/> 
    <sw:confirm method="del" action="common/deleteRecordLog.do" confirm="你确定要删除选择的会员吗？"  success="删除会员成功！" failure="删除会员失败！"   multi="true"/>   
  <sw:search fields="RecordLog.userId" method="search" />   
</head>
<body  style="background-color: #DFE6F8;">
<div class="box01" align="center"><span class="left">&nbsp;</span> <span class="tit" style="font-size:20px"><b>进馆流量报表</b></span></div>
<table class="tools" style="width:100%">
        <tr>
            <td>
会员名称:<input id="user.name" type="text"></input>
卡号:<input id="user.number" type="text" ></input>
<sw:button onClick="search()">查询</sw:button>
</td>
        </tr>
    </table>
    
<sw:datagrid multiSelect="false">       
           <table class="table" cellpadding="0" cellspacing="0" style="table-layout: fixed">
              <tr ztype="head" class="tr">
                <td width="34px" ztype="RowNo">&nbsp;<b>序号</td>
                <td width="34px" ztype="selector" field="id">&nbsp;</td>
                <td width="100px">&nbsp;<b>会员姓名</b></td>
                <td width="100px">&nbsp;<b>客户类型</b></td>
                <td width="100px">&nbsp;<b>卡号</b></td>
                <td width="100px">&nbsp;<b>刷卡时间</b></td>
                <td width="100px">&nbsp;<b>进场时间</b></td>
            </tr>
            <tr>
                <td align="center">&nbsp;</td>
                <td >&nbsp;</td>
                <td>&nbsp;${user.name}</td>
                <td>&nbsp;${type}</td>
                 <td>&nbsp;${number}</td>
                 <td>&nbsp;${createTime}</td>
                 <td>&nbsp;${passTime}</td>

            </tr>
            <tr ztype="pagebar" align="left" height="30px" style="background-color: #D3E1F1;">
                <td colspan="17" align="left" height="30px">${PageBar}</td>
            </tr>
        </table>
    </sw:datagrid>
</body>
</html>
</sw:init>
