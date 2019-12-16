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
<sw:search fields="customer.name,customer.linkMan" method="search" />  
</head>
<body  style="background-color: #DFE6F8;">
<table class="tools" style="width:100%">
        <tr>
            <td>
名称:<input id="customer.name" type="text" size="20"></input>
联系人:<input id="customer.linkMan" type="text" size="10"></input>
<sw:button onClick="search()">查询</sw:button>
</td>
        </tr>
    </table>
<sw:datagrid multiSelect="false" height="117">       
        <table class="table" cellpadding="0" cellspacing="0" style="table-layout: fixed">
            <tr ztype="head" class="tr">
                <td width="5%" ztype="RowNo"  align="center"><b>序号</b></td>
                <td width="4" ztype="selector" field="id">&nbsp;</td>
                <td width="31%">&nbsp;<b>名称</b></td>
                <td width="20%">&nbsp;<b>联系人</b></td>
                <td width="20%">&nbsp;<b>联系电话</b></td>
                <td width="20%">&nbsp;<b>联系手机</b></td>
            </tr>
            <tr >
                <td align="center">&nbsp;</td>
                <td>&nbsp;</td>
                <td>&nbsp;${name}</td>
                <td>&nbsp;${linkMan}</td>    
                <td>&nbsp;${phone}</td>    
                <td>&nbsp;${mobile}</td>    
            </tr>
            <tr ztype="pagebar" align="left" height="30px" style="background-color: #D3E1F1;">
                <td colspan="7" align="left" height="30px">${PageBar}</td>
            </tr>
        </table>
    </sw:datagrid>
</body>
</html>
</sw:init>
