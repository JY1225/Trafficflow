<%@page contentType="text/html;charset=GBK" language="java"%>
<%@include file="/frame/Init.jsp"%>
<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="X-UA-Compatible" content="IE=EmulateIE7">
<meta http-equiv="Content-Type" content="text/html; charset=gb2312" />
<title>会员查询</title>
<link href="/style/style.css" rel="stylesheet" type="text/css" />
<script type="text/javascript" src="/frame/js/Main.js"></script>
<script type="text/javascript" src="/js/QueryUser.js"></script>
<script>parent.saleType=10;</script>
<script>saleType=10;</script>
</head>
<body style="background-color: #DFE6F8;">
<div class="box01" align="center"><span class="left">&nbsp;</span> <span id="queryUser" class="tit" style="font-size: 20px"><b>会员卡查询窗口</b></span></div>
<center>
<table><tr>
<td width="380px">
<table width="380px" style="font-size:14px;table-layout:fixed; word-break:break-all">

    <tr>
        <td>
        <fieldset style="height: 350px"><legend><label>&nbsp;&nbsp;<b style="font-size: 16px">会员卡查询信息</b></label></legend>
        
        <table  style="font-size:14px;table-layout:fixed; word-break:break-all">
            <tr height="15px"><td></td><td></td><td rowspan="6"><table border="1"  cellpadding="0" cellspacing="0"  style="font-size:14px;table-layout:fixed; word-break:break-all"><tr><td width="110" height="160" id="photo">
             相片
            </td></tr></table></td></tr>
            <tr><td  align="right">会员卡号:</td><td align="left"><input id="id" type="hidden"></input><input id="number" type="text" style="width:120px;font-weight:bold;color:red"  readonly/></td></tr>
            <tr><td align="right">会员姓名:</td><td align="left"><input id="name" type="text" style="width:120px;font-weight:bold;;color:red"  readonly/></td></tr>
            <tr><td align="right">性别:</td><td align="left"><input id="sex" type="text" style="width:120px;font-weight:bold;;color:red"  readonly/></td></tr>
            <tr><td align="right">电话:</td><td align="left"><input id="phone" type="text" style="width:120px;font-weight:bold;;color:red"  readonly/></td></tr>
            <tr><td align="right">有效期:</td><td align="left"><input id="endTime" type="text" style="width:120px;font-weight:bold;;color:red"  readonly/></td></tr>
            <tr><td align="right">证件号码:</td><td colspan="2" align="left"><input id="personNo" type="text" style="width:240px;font-weight:bold;;color:red"  readonly/></td></tr>
            <tr><td align="right">购票金额:</td><td align="left"><input id="price" type="text" style="width:80px;font-weight:bold;;color:red"  readonly/>(元)</td><td></td></tr>
             
            <tr><td align="right">购票时间:</td><td align="left" colspan="2"><input id="saleTime" type="text" style="width:160px;font-weight:bold;;color:red"  readonly/></td></tr>
            <tr><td align="right">票种名称:</td><td align="left" colspan="2" ><input id="ticketName" type="text" style="width:340px;font-weight:bold;color:red"  readonly/></td></tr>
                       </table>
        </fieldset>
        </td>
    </tr>
    
    

</table>
</td>
<td width="380px"  id="user1" style='display:none'>
<table width="380px" style="font-size:14px;table-layout:fixed; word-break:break-all">

    <tr>
        <td>
        <fieldset style="height: 400px"><legend><label>&nbsp;&nbsp;<b style="font-size: 16px">附属卡信息</b></label></legend>
        
        <table  style="font-size:14px;table-layout:fixed; word-break:break-all">
            <tr height="15px"><td></td><td></td><td rowspan="6"><table border="1"  cellpadding="0" cellspacing="0"  style="font-size:14px;table-layout:fixed; word-break:break-all"><tr><td width="110" height="160" id="photo1">
             相片
            </td></tr></table></td></tr>
            <tr><td  align="right">会员卡号:</td><td align="left"><input id="id1" type="hidden"></input><input id="number1" type="text" style="width:120px;font-weight:bold;color:red"  readonly/></td></tr>
            <tr><td align="right">会员姓名:</td><td align="left"><input id="name1" type="text" style="width:120px;font-weight:bold;;color:red"  readonly/></td></tr>
            <tr><td align="right">性别:</td><td align="left"><input id="sex1" type="text" style="width:120px;font-weight:bold;;color:red"  readonly/></td></tr>
            <tr><td align="right">电话:</td><td align="left"><input id="phone1" type="text" style="width:120px;font-weight:bold;;color:red"  readonly/></td></tr>
            <tr><td align="right">有效期:</td><td align="left"><input id="endTime1" type="text" style="width:120px;font-weight:bold;;color:red"  readonly/></td></tr>
            <tr><td align="right">证件号码:</td><td colspan="2" align="left"><input id="personNo1" type="text" style="width:240px;font-weight:bold;;color:red"  readonly/></td></tr>
            <tr><td align="right">购票金额:</td><td align="left"><input id="price1" type="text" style="width:80px;font-weight:bold;;color:red"  readonly/>(元)</td><td></td></tr>
            <tr><td align="right">购票时间:</td><td align="left" colspan="2"><input id="saleTime1" type="text" style="width:160px;font-weight:bold;;color:red"  readonly/></td></tr>
            <tr><td align="right">票种名称:</td><td align="left" colspan="2" ><input id="ticketName1" type="text" style="width:340px;font-weight:bold;color:red"  readonly/></td></tr>
            <tr><td align="right">套票名称:</td><td align="left" colspan="2" ><input  id="linkTicketName1" type="text" style="width:340px;font-weight:bold;color:red"  readonly/></td></tr>
            <tr><td align="right">IC卡状态:</td><td align="left"><input id="icStatus1" type="text" style="width:120px;font-weight:bold;color:red"  readonly/></td><td></td></tr>
            <tr><td align="right">激活次数:</td><td align="left"><input id="activeTimes1" type="text" style="width:120px;font-weight:bold;color:red"  readonly/></td><td></td></tr>
        </table>
        </fieldset>
        </td>
    </tr>
    
    

</table>
</td>
<td width="380px" id="user2" style='display:none'>
<table width="380px" style="font-size:14px;table-layout:fixed; word-break:break-all">

    <tr>
        <td>
        <fieldset style="height: 400px"><legend><label>&nbsp;&nbsp;<b style="font-size: 16px">附属卡信息</b></label></legend>
        
        <table  style="font-size:14px;table-layout:fixed; word-break:break-all">
            <tr height="15px"><td></td><td></td><td rowspan="6"><table border="1"  cellpadding="0" cellspacing="0"  style="font-size:14px;table-layout:fixed; word-break:break-all"><tr><td width="110" height="160" id="photo2">
             相片
            </td></tr></table></td></tr>
            <tr><td  align="right">会员卡号:</td><td align="left"><input id="id2" type="hidden"></input><input id="number2" type="text" style="width:120px;font-weight:bold;color:red"  readonly/></td></tr>
            <tr><td align="right">会员姓名:</td><td align="left"><input id="name2" type="text" style="width:120px;font-weight:bold;;color:red"  readonly/></td></tr>
            <tr><td align="right">性别:</td><td align="left"><input id="sex2" type="text" style="width:120px;font-weight:bold;;color:red"  readonly/></td></tr>
            <tr><td align="right">电话:</td><td align="left"><input id="phone2" type="text" style="width:120px;font-weight:bold;;color:red"  readonly/></td></tr>
            <tr><td align="right">有效期:</td><td align="left"><input id="endTime2" type="text" style="width:120px;font-weight:bold;;color:red"  readonly/></td></tr>
            <tr><td align="right">证件号码:</td><td colspan="2" align="left"><input id="personNo2" type="text" style="width:240px;font-weight:bold;;color:red"  readonly/></td></tr>
            <tr><td align="right">购票金额:</td><td align="left"><input id="price2" type="text" style="width:80px;font-weight:bold;;color:red"  readonly/>(元)</td><td></td></tr>
            <tr><td align="right">购票时间:</td><td align="left" colspan="2"><input id="saleTime2" type="text" style="width:160px;font-weight:bold;;color:red"  readonly/></td></tr>
            <tr><td align="right">票种名称:</td><td align="left" colspan="2" ><input id="ticketName2" type="text" style="width:340px;font-weight:bold;color:red"  readonly/></td></tr>
            <tr><td align="right">套票名称:</td><td align="left" colspan="2" ><input  id="linkTicketName2" type="text" style="width:340px;font-weight:bold;color:red"  readonly/></td></tr>
            <tr><td align="right">IC卡状态:</td><td align="left"><input id="icStatus2" type="text" style="width:120px;font-weight:bold;color:red"  readonly/></td><td></td></tr>
            <tr><td align="right">激活次数:</td><td align="left"><input id="activeTimes2" type="text" style="width:120px;font-weight:bold;color:red"  readonly/></td><td></td></tr>
        </table>
        </fieldset>
        </td>
    </tr>
    
    

</table>
</td>
</tr>
    <tr><td align="center" colspan="3">

                                        <span disabled="true" id="clearButton"   onclick='clearUserActive();' class="da-button gray large" style='font-weight:bold;font-size:20px'>
                                        	清空
                                        </span>  
    </td></tr>
</table>

</center>
<!-- 
<script>
 if(parent.comPort.length>0){
     Dialog.alert("无法打开串口"+parent.comPort);
 }
</script>
 -->
</body>
</html>