<%@page contentType="text/html;charset=GBK" language="java"%>
<%@include file="/frame/Init.jsp"%>
<sw:init id="dg1">
<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="X-UA-Compatible" content="IE=EmulateIE7">
<meta http-equiv="Content-Type" content="text/html; charset=gb2312" />
<title>设置管理</title>
 <link href="/style/style.css" rel="stylesheet" type="text/css" />
<script type="text/javascript" src="/frame/js/Main.js"></script>
<script type="text/javascript" src="/frame/datepicker/WdatePicker.js"></script>
   <sw:dialog method="add" width="480" height="170"  title="新建设置" url="base/TipDialog.jsp" action="common/addtip.do"/> 
    <sw:dialog method="edit" width="380" height="250"  title="修改设置" url="base/TipDialog.jsp" action="common/edittip.do" fields="id,name,funName,code,message"/> 
    <sw:confirm method="del" action="common/deletetip.do" confirm="你确定要删除选择的设置吗？"  success="删除设置成功！" failure="删除设置失败！"   multi="true"/>   
  <sw:search fields="tip.name" method="search" />   

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
<div class="box01" align="center"><span class="left">&nbsp;</span> <span class="tit" style="font-size:20px"><b>显示屏管理 </b></span></div>

<table class="tools" style="width:100%">
        <tr>
            <td>
<sw:button src="/Icons/icon002a2.gif"  limit="true" onClick="add()">新建</sw:button>
<sw:button src="/Icons/icon018a4.gif"  limit="true" onClick="edit()">修改</sw:button>
<sw:button src="/Icons/icon018a3.gif" limit="true"  onClick="del()">删除</sw:button>
名称:<input id="tip.name" type="text" size="10"></input>
<sw:button onClick="search()">查询</sw:button>
</td>
        </tr>
    </table>
    
<sw:datagrid editFields="tip,id,type,name,funName,code,message" multiSelect="false">       
        <table class="table" width="100%" cellpadding="0" cellspacing="0">
            <tr ztype="head" class="tr">
                <td width="4%" align="center" ztype="RowNo"><b>序号</b></td>
                <td width="2%" ztype="selector" field="id">&nbsp;</td>
                <td width="15%">&nbsp;<b>模块名称</b></td>
                <td width="15%">&nbsp;<b>功能名称</b></td>
                <td width="15%">&nbsp;<b>代码</b></td>
                <td width="50%">&nbsp;<b>提示信息</b></td>
            </tr>
            <tr >
                <td  align="center">&nbsp;</td>
                <td>&nbsp;</td>
                <td>&nbsp;${name}</td>
                <td>&nbsp;${funName}</td>
                <td>&nbsp;${code}</td>
                <td>&nbsp;${message}</td>         
            </tr>
            <tr ztype="pagebar" align="left" height="30px" style="background-color: #D3E1F1;">
                <td colspan="7" align="left" height="30px">${PageBar}</td>
            </tr>
        </table>
    </sw:datagrid>
</body>
</html>
</sw:init>
