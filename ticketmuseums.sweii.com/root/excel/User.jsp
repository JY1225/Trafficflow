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
  <sw:search fields="user.name,user.number" method="search" />   
</head>
<body  style="background-color: #DFE6F8;">
<div class="box01" align="center"><span class="left">&nbsp;</span> <span class="tit" style="font-size:20px"><b>会员售票报表 </b></span></div>
<table class="tools" style="width:100%">
        <tr>
            <td>
<input id="user.name" tip="姓名" style="width:80px" type="text"></input>
<input id="user.number" tip="卡号" style="width:100px"  type="text" ></input>
<sw:button onClick="search()">查询</sw:button>
</td>
        </tr>
    </table>
    
<sw:datagrid multiSelect="false">       
           <table class="table" cellpadding="0" cellspacing="0" style="table-layout: fixed">
              <tr ztype="head" class="tr">
                <td width="34px" ztype="RowNo">&nbsp;<b>序号</td>
                <td width="34px" ztype="selector" field="id">&nbsp;</td>
                <td width="70px">&nbsp;<b>姓名</b></td>
                <td width="40px">&nbsp;<b>性别</b></td>
                <td width="70px">&nbsp;<b>卡号</b></td>
                 <td width="80px">&nbsp;<b>票种名称</b></td>
                <td width="50px">&nbsp;<b>票价</b></td>
                <td width="50px">&nbsp;<b>押金</b></td>                
                <td width="80px">&nbsp;<b>开始有效期</b></td>
                <td width="80px">&nbsp;<b>结束有效期</b></td>
                <td width="50px">&nbsp;<b>使用次数</b></td>
                <td width="60px">&nbsp;<b>售票员</b></td>
                <td width="120px">&nbsp;<b>售票时间</b></td>
            </tr>
            <tr>
                <td align="center">&nbsp;</td>
                <td >&nbsp;</td>
                <td>&nbsp;${name}</td>
                <td>&nbsp;${sex}</td>
                 <td>&nbsp;${number}</td>
                 <td>&nbsp;${ticket.name}</td>
                 <td>&nbsp;${price}</td>
                 <td>&nbsp;${prePrice}</td>
                 <td>&nbsp;${startTime}</td>
                 <td>&nbsp;${endTime}</td>
                 <td>&nbsp;${times}</td>
                 <td>&nbsp;${admin.name}</td>
                 <td>&nbsp;${createTime}</td>
            </tr>
            <tr ztype="pagebar" align="left" height="30px" style="background-color: #D3E1F1;">
                <td colspan="17" align="left" height="30px">${PageBar}</td>
            </tr>
        </table>
    </sw:datagrid>
</body>
</html>
</sw:init>
