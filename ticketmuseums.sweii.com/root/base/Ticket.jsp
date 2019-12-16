<%@page contentType="text/html;charset=GBK" language="java"%>
<%@include file="/frame/Init.jsp"%>
<sw:init id="dg1">
<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="X-UA-Compatible" content="IE=EmulateIE7">
<meta http-equiv="Content-Type" content="text/html; charset=gb2312" />
<title>票种管理</title>
 <link href="/style/style.css" rel="stylesheet" type="text/css" />
<script type="text/javascript" src="/frame/js/Main.js"></script>
<script type="text/javascript" src="/frame/datepicker/WdatePicker.js"></script>
   <sw:dialog method="add" width="450" height="250"  title="新建票种" url="base/TicketDialog.jsp" action="common/addTicket.do"/> 
    <sw:dialog method="edit" width="450" height="250"  title="修改票种" url="base/TicketDialog.jsp" action="common/editTicket.do" fields="id,name,price,size"/> 
    <sw:confirm method="del" action="common/deleteTicket.do" confirm="你确定要删除选择的票种吗？"  success="删除票种成功！" failure="删除票种失败！"   multi="true"/>   
  <sw:search fields="ticket.name,ticket.type" method="search" />   

   <script>
        /*
         弹出供应商名称，并选择填充
         */
        $(function() {
            $(".provider").bind('click',function() {
                $("#dialog").dialog("open");
            });
            $( "#dialog" ).dialog({autoOpen:false});
        });
        $(function(){
            $(".ant").bind('click',function(){
                $(".provider").val($(this).text()) ;
            })
        });

        /*
         弹出商品名称，并选择填充
         */
        $(function() {
            $(".goods").bind('click',function() {
                $("#dialog2").dialog("open");
            });
            $( "#dialog2" ).dialog({autoOpen:false});
        });
        $(function(){
            $(".ant2").bind('click',function(){
                $(".goods").val($(this).text()) ;
            })
        });
    </script>
</head>
<body  style="background-color: #DFE6F8;">
<div class="box01" align="center"><span class="left">&nbsp;</span> <span class="tit" style="font-size:20px"><b>票种管理 </b></span></div>

<table class="tools" style="width:100%">
        <tr>
            <td>
<sw:button src="/Icons/icon002a2.gif"  limit="true" onClick="add()">新建</sw:button>
<sw:button src="/Icons/icon018a4.gif"  limit="true" onClick="edit()">修改</sw:button>
<sw:button src="/Icons/icon018a3.gif" limit="true"  onClick="del()">删除</sw:button>
名称:<input id="ticket.name" type="text" size="10"></input>
票类型:<input id="ticket.type" type="text" size="10"></input>
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
                <td width="60px">&nbsp;<b>票价</b></td>
                <td width="60px">&nbsp;<b>次数</b></td>
            </tr>
            <tr>
                <td align="center">&nbsp;</td>
                <td >&nbsp;</td>
                <td>&nbsp;${name}</td>
                 <td>&nbsp;${price}</td>
                 <td>&nbsp;${size}</td>
            </tr>
            <tr ztype="pagebar" align="left" height="30px" style="background-color: #D3E1F1;">
                <td colspan="17" align="left" height="30px">${PageBar}</td>
            </tr>
        </table>
    </sw:datagrid>
</body>
</html>
</sw:init>
