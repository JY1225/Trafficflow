<%@page contentType="text/html;charset=GBK" language="java"%>
<%@page import="java.util.*"%>
<%@page import="com.sweii.vo.*"%>
<%@include file="/frame/Init.jsp"%>
<html>
<head>
<meta http-equiv="X-UA-Compatible" content="IE=EmulateIE7">
<title></title>
<link rel="stylesheet" type="text/css" href="/jquery/themes/default/easyui.css">
<link rel="stylesheet" type="text/css" href="/jquery/themes/icon.css">
<link type="text/css" rel="stylesheet" href="/frame/css/frame.css">
<link type="text/css" rel="stylesheet" href="/frame/css/ext-all.css">
<script type="text/javascript" src="/jquery/jquery-1.4.2.min.js"></script>
<script type="text/javascript" src="/jquery/jquery.easyui.min.js"></script>
<script src="/frame/js/Main.js"></script>
<script type="text/javascript" src="/frame/datepicker/WdatePicker.js"></script>
<meta http-equiv="Content-Type" content="text/html; charset=gbk">
<style>
.day {
	background-color: #A2C5FF
}
</style>
<script>
function setting(obj,field){
    var value=1;
    if(!obj.checked){
        value=2;
    }
    var ids='1';
    var dc = new DataCollection();
    dc.add('ids',ids);
    dc.add('fields',field);
    dc.add('values',value);
    Server.sendRequest('common/changeSetting.do',dc,function(response){},'json');
}
function bakup(){
    Server.sendRequest('common/backup.do',"",function(response){
        Dialog.alert(response.message);
        },'json');
}
function edit(field,javaType){
	var dc = new DataCollection();
	dc.add("id","1");
	dc.add("entity","Setting");
	dc.add("field",field);
	dc.add("value",$V(field));
    if(javaType!=null){
    	dc.add("javaType",javaType);
    }
	Server.sendRequest("common/fieldEditEntity.do",dc,function(response){
           if(response.status==1){
               Dialog.alert("保存成功。");
           }
  },'json');
}
function view(){
    parent.addMyTab({id:'View',text:'备份数据库',href:'common/querySettingBakDatabase.do'});
}
</script>
<%
    Setting setting = (Setting) request.getAttribute("sweii_entity");
%>
</head>
<body class="dialogBody">
<table width="1" border="0" cellspacing="0" cellpadding="0" style="border-collapse: separate; border-spacing: 6px; margin-left: 70px">
    <tr valign="top">
        <td width="2px">&nbsp;<br></br>
        </td>
        <td width="470px">
        <table>
            <tr>
                <td align="center">
                <fieldset><legend><label>定时任务</label></legend>
                <table width="450px" cellpadding="0" cellspacing="0">
                    <tr height="25">
                        <td align="left" width="50%">
                        <table>
                            <tr>
                                <td>每天上传卡号时间：<input id="time1" type="text" value="<% if(setting.getTime1()!=null){out.print(setting.getTime1());} %>" ztype="date" format="HH:mm" style="width: 60px"></input></td>
                                <td><sw:button src="/Icons/icon403a2.gif" onClick="edit('time1')">保存</sw:button></td>
                            </tr>
                        </table>
                        </td>
                    </tr>
                    <tr height="25">
                        <td align="left" width="50%">
                        <table>
                            <tr>
                                <td>每天下载记录时间：<input id="time2" type="text" value="<% if(setting.getTime2()!=null){out.print(setting.getTime2());} %>" ztype="date" format="HH:mm" style="width: 60px"></input></td>
                                <td><sw:button src="/Icons/icon403a2.gif" onClick="edit('time2')">保存</sw:button></td>
                            </tr>
                        </table>
                        </td>
                    </tr>
                </table>
                </fieldset>
                </td>
            </tr>
        </table>
        </td>
    </tr>
</table>
</body>
</html>
