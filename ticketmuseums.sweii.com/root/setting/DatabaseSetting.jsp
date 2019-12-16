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
 <link href="/style/style.css" rel="stylesheet" type="text/css" />
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
    location.href='common/querySettingBakDatabase.do?subHeight=100';
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
                <fieldset><legend><label>数据库备份</label></legend>
                <table width="450px" cellpadding="0" cellspacing="0">
                    <tr height="25">
                        <td align="left" width="50%"><input type="checkbox" onclick="setting(this,'autoBak')" <%if (setting.getAutoBak().intValue() == 1) {
				out.print("checked");
			}%>></input>是否自动备份数据库</td>
                    </tr>
                    <tr height="25">
                        <td align="left" width="50%">
                        <table>
                            <tr>
                                <td>备份保存路径:<input id="bakPath" type="text" value="<%=setting.getBakPath()%>" style="width: 250px"></input></td>
                                <td><sw:button src="/Icons/icon403a2.gif" onClick="edit('bakPath')">保存</sw:button></td>
                            </tr>
                        </table>
                        </td>
                    </tr>
                    <tr height="25">
                        <td align="left" width="50%">
                        <table>
                            <tr>
                                <td>每天备份时间1:<input id="time1" type="text" value="<% if(setting.getTime1()!=null){out.print(setting.getTime1());} %>" ztype="date" format="HH:mm" style="width: 60px"></input></td>
                                <td><sw:button src="/Icons/icon403a2.gif" onClick="edit('time1')">保存</sw:button></td>
                            </tr>
                        </table>
                        </td>
                    </tr>
                    <tr height="25">
                        <td align="left" width="50%">
                        <table>
                            <tr>
                                <td>每天备份时间2:<input id="time2" type="text" value="<% if(setting.getTime2()!=null){out.print(setting.getTime2());} %>" ztype="date" format="HH:mm" style="width: 60px"></input></td>
                                <td><sw:button src="/Icons/icon403a2.gif" onClick="edit('time2')">保存</sw:button></td>
                            </tr>
                        </table>
                        </td>
                    </tr>
                    <tr height="25">
                        <td align="left" width="50%">
                        <table>
                            <tr>
                                <td>每天备份时间3:<input id="time3" type="text" value="<% if(setting.getTime3()!=null){out.print(setting.getTime3());} %>" ztype="date" format="HH:mm" style="width: 60px"></input></td>
                                <td><sw:button src="/Icons/icon403a2.gif" onClick="edit('time3')">保存</sw:button></td>
                            </tr>
                        </table>
                        </td>
                    </tr>
                    <tr height="25">
                        <td align="left" width="50%">
                        <table>
                            <tr>
                                <td>每天备份时间4:<input id="time4" type="text" value="<% if(setting.getTime4()!=null){out.print(setting.getTime4());} %>" ztype="date" format="HH:mm" style="width: 60px"></input></td>
                                <td><sw:button src="/Icons/icon403a2.gif" onClick="edit('time4')">保存</sw:button></td>
                            </tr>
                        </table>
                        </td>
                    </tr>
                    <tr height="25">
                        <td align="left" width="50%">
                        <table>
                            <tr>
                                <td>每天备份时间5:<input id="time5" type="text" value="<% if(setting.getTime5()!=null){out.print(setting.getTime5());} %>" ztype="date" format="HH:mm" style="width: 60px"></input></td>
                                <td><sw:button src="/Icons/icon403a2.gif" onClick="edit('time5')">保存</sw:button></td>
                            </tr>
                        </table>
                        </td>
                    </tr>
                    <tr height="25">
                        <td align="left" width="50%">
                        <table>
                            <tr>
                                <td>每天备份时间6:<input id="time6" type="text" value="<% if(setting.getTime6()!=null){out.print(setting.getTime6());} %>" ztype="date" format="HH:mm" style="width: 60px"></input></td>
                                <td><sw:button src="/Icons/icon403a2.gif" onClick="edit('time6')">保存</sw:button></td>
                            </tr>
                        </table>
                        </td>
                    </tr>
                    <tr height="25">
                        <td align="left" width="50%">
                        <table>
                            <tr>
                                <td>每天备份时间7:<input id="time7" type="text" value="<% if(setting.getTime7()!=null){out.print(setting.getTime7());} %>" ztype="date" format="HH:mm" style="width: 60px"></input></td>
                                <td><sw:button src="/Icons/icon403a2.gif" onClick="edit('time7')">保存</sw:button></td>
                            </tr>
                        </table>
                        </td>
                    </tr>
                    <tr height="25">
                        <td align="left" width="50%">
                        <table>
                            <tr>
                                <td>每天备份时间8:<input id="time8" type="text" value="<% if(setting.getTime8()!=null){out.print(setting.getTime8());} %>" ztype="date" format="HH:mm" style="width: 60px"></input></td>
                                <td><sw:button src="/Icons/icon403a2.gif" onClick="edit('time8')">保存</sw:button></td>
                            </tr>
                        </table>
                        </td>
                    </tr>
                    <tr height="25">
                        <td align="left" width="50%">
                        <table>
                            <tr>
                                <td>每天备份时间9:<input id="time9" type="text" value="<% if(setting.getTime9()!=null){out.print(setting.getTime9());} %>" ztype="date" format="HH:mm" style="width: 60px"></input></td>
                                <td><sw:button src="/Icons/icon403a2.gif" onClick="edit('time9')">保存</sw:button></td>
                            </tr>
                        </table>
                        </td>
                    </tr>
                    <tr height="25">
                        <td align="left" width="50%">
                        <table>
                            <tr>
                                <td>每天备份时间10:<input id="time10" type="text" value="<% if(setting.getTime10()!=null){out.print(setting.getTime10());} %>" ztype="date" format="HH:mm" style="width: 60px"></input></td>
                                <td><sw:button src="/Icons/icon403a2.gif" onClick="edit('time10')">保存</sw:button></td>
                            </tr>
                        </table>
                        </td>
                    </tr>
                    <tr height="5">
                        <td>&nbsp;</td>
                    </tr>
                    <tr height="25">
                        <td align="left">
                        <table align="center">
                            <tr>
                                <td><sw:button src="/Icons/icon005a2.gif" onClick="bakup()">立即手动备份一次</sw:button></td>
                                <td>&nbsp;&nbsp;&nbsp;</td>
                                <td><sw:button src="/Icons/icon005a1.gif" onClick="view()">查看已备份数据库</sw:button></td>
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
