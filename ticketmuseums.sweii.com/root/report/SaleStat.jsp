<%@page contentType="text/html;charset=GBK" language="java"%>
<%@include file="/frame/Init.jsp"%>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="X-UA-Compatible" content="IE=EmulateIE7">
<meta http-equiv="Content-Type" content="text/html; charset=gb2312" />
<title>售票统计表</title>
<link href="/style/style.css" rel="stylesheet" type="text/css" />
<script type="text/javascript" src="/frame/js/Main.js"></script>
<script type="text/javascript" src="/frame/datepicker/WdatePicker.js"></script>
<script type="text/javascript" src="/dtree/dtree.js"></script>
<style type="text/css">
.table-border { /*border-top:1px solid #000;  */
    border-bottom: 1px solid #000; /*下部边框*/
    border-left: 1px solid #000; /*左部边框*/
    border-right: 0px solid #000; /* */
}

.table-border td {
    border-top: 1px solid #000; /*上部边框*/
    border-right: 1px solid #000; /*右部边框*/
}
</style>
</head>
<body style="background-color: #DFE6F8;">
<jsp:include page="/frame/Printer.jsp" />
<div class="box01" align="center"><span class="left">&nbsp;</span> <span class="tit" style="font-size: 20px"><b>售票统计表</b></span></div>

<center>
<div style="height:600px;overflow-y:scroll;overflow-x:hidden;overflow:scroll;">
<table width="800px" style="font-size:12px">
    <tr>
        <td width="100%">
        <fieldset><legend><label>&nbsp;&nbsp;<b style="font-size: 14px">查询条件</b></label></legend>
        <table>
            <tr>
                <td style="font-size: 12px">开始时间:</td>
                <td><input id="startTime" type="text" style="width: 150px" value="2012-11-06 00:00:00" ztype="date" format="yyyy-MM-dd HH:mm:ss" /></td>
                <td style="font-size: 12px">结束时间:</td>
                <td><input id="endTime" type="text" style="width: 150px" value="2012-11-06 23:59:59" ztype="date" format="yyyy-MM-dd HH:mm:ss" /></td>
            </tr>
            <tr>
                <td style="font-size: 12px" colspan="2">
                <fieldset style="width:200px"><legend><label>&nbsp;&nbsp;<b style="font-size: 12px">选择售票员</b></label></legend>
                     <div style="height:150px;width:200px;overFlow-y: scroll; overFlow-x: hidden">
                     
                      
                     <script type="text/javascript">
                        <!--
                        d = new dTree('seller');
                        d.check=true;
                        d.add(0,-1,'全部售票员');
                        d.add(1,0,'第三(编号)','');
                        d.add(2,0,'李四(0001)','');
                        d.add(3,0,'王五(0002)','');
                        d.add(4,0,'小李(0003)','');
                        d.add(5,0,'第三(0004)','');
                        d.add(6,0,'李四(0005)','');
                        d.add(7,0,'王五','');
                        d.add(8,0,'小李','');
                        d.add(9,0,'第三','');
                        d.add(10,0,'李四','');
                        d.add(11,0,'王五','');
                        d.add(12,0,'小李','');
                        document.write(d);
                        var ids="1,2,3,4,5,6,7,8";//
                        //-->
                </script>
    </div>
    <script>         //查询前调用方法获到选择ID列表
                     function getSellerCheckedIds(){
                         var idss=ids.split(",");
                         var checkIds="";
                         for(var i=0;i<idss.length;i++){
                             if(document.getElementById('cseller'+idss[i]).checked){
                                 checkIds+=idss[i]+",";
                             }
                         }
                         alert(checkIds);
                     }
                     //初始化选择售票员,
                     function initCheckSeller(){
                         
                     }
                     </script>
                     </fieldset>
                </td>
                <td style="font-size: 12px" colspan="2">
                  <fieldset style="width:260px"><legend><label>&nbsp;&nbsp;<b style="font-size: 12px">选择票种</b></label></legend>
                     <div style="height:150px;width:260px;overFlow-y: scroll; overFlow-x: hidden">
                     <script type="text/javascript">
                        <!--
                        var ticket = new dTree('ticket');
                        ticket.check=true;
                        ticket.add(0,-1,'陆地公园');
                        ticket.add(-11,0,'散客','');
                        ticket.add(-12,0,'团体','');
                        ticket.add(-13,0,'会员','');
                        ticket.add(-14,0,'赠票','');
                        ticket.add(5,1,'陆-欢乐卡','');
                        ticket.add(6,1,'陆-梦幻卡','');
                        ticket.add(7,2,'小学生-梦幻卡','');
                        ticket.add(8,2,'中学生-梦幻卡','');
                        ticket.add(9,2,'大学生-梦幻卡','');
                        ticket.add(10,2,'直销单位-梦幻卡','');
                        ticket.add(11,2,'经销商-梦幻卡','');
                        ticket.add(12,3,'陆地公园-单人vip','');
                        ticket.add(12,3,'陆地公园-情侣vip','')
                        ticket.add(12,3,'陆地公园-家庭vip','')
                        ticket.add(12,4,'陆-梦幻-赠票','')
                        ticket.add(30,-1,'水公园');
                        ticket.add(31,30,'散客','');
                        ticket.add(32,30,'团体','');
                        ticket.add(33,30,'会员','');
                        ticket.add(44,30,'赠票','');
                        document.write(ticket);
                        var ticketIds="1,2,3,4,5,6,7,8";
                        //-->
                </script>
    </div>
    <script>
                     //查询前调用方法获到选择ID列表
                     function getTicketCheckedIds(){
                         var idss=ticketIds.split(",");
                         var checkIds="";
                         for(var i=0;i<idss.length;i++){
                             if(document.getElementById('cticket'+idss[i]).checked){
                                 checkIds+=idss[i]+",";
                             }
                         }
                         alert(checkIds);
                     }
                     </script>
                     </fieldset>                  
                </td>
            </tr>
            <tr><td>售票员编号:</td><td><input id="adminName" type="text" style="width: 150px" /></td><td><input type="button" value="查询"></input></td></tr>
        </table>
        </fieldset>
        </td>
    </tr>
</table>
    <table width="1000px" border="0" cellspacing="0"  >
        <tr>
            <td width="15%" style="font-weight: bold;" align="left"></td>
            <td align="center" width="50%" style="font-weight: bold; font-size: 25px">售票统计表</td>
            <td width="20%" style="font-weight: bold;font-size:14px" align="right"><a href="javascript:void(0);" onclick="printHA4('print');" class="printBtn"><img src="/Icons/icon013a1.gif" />打印</a></td>
        </tr>       
        <tr>
            <td colspan="4" align="center">
            <span id="print">
            <table width="98%" border="0" cellspacing="0" class="table-border" style="height: 25px; text-align: left">
                <tr height="25px" style="font-weight: bold;font-size:12px;background-color: white">
                    <td align="center">公园类型</td>
                    <td align="center">客户类型</td>                   
                    <td align="center">票种</td>
                     <td align="center">售票数量</td>
                    <td align="center">售票金额</td>
                    <td align="center">退票数量</td>
                    <td align="center">退票金额</td>
                    <td align="center">退卡数量</td>
                    <td align="center">退押金金额</td>
                    <td align="center">续费人数</td>
                    <td align="center">续费金额</td>
                    <td align="center">补卡人数</td>
                    <td align="center">补卡金额</td>
                    <td align="center">押金金额</td>
                    <td align="center">实收金额</td>
                </tr>
                <%for(int i=0;i<12;i++){ %>
                 <tr height="25px" style="font-size:12px;background-color: white">
                    <% if(i==0) {%>
                       <td align="center"   rowspan="12">陆公园</td>
                       <td align="center"  rowspan="2">散客</td>  
                       
                    <%} %>
                    <% if(i==2){ %>
                     <td align="center"  rowspan="5">团体</td>  
                    <%} %>
                    <% if(i==7){ %>
                     <td align="center"  rowspan="3">会员</td>  
                    <%} %>
                    <% if(i==10){ %>
                     <td align="center"  rowspan="1">赠票</td>  
                    <%} %>
                    <% if(i==11){ %>
                     <td align="center" colspan="2" style='color:blue;font-weight:bold'>小计:</td>  
                    
                    <%}else{ %>
                     <td align="center" >票种<%=i %></td>
                    <%} %>
                     <td align="center">0</td>
                    <td align="center">0</td>
                    <td align="center">0</td>
                    <td align="center">0</td>
                    <td align="center">0</td>
                    <td align="center">0</td>
                    <td align="center">0</td>
                    <td align="center">0</td>
                    <td align="center">0</td>
                    <td align="center">0</td>
                    <td align="center">0</td>
                    <td align="center">0</td>
                </tr>
                <%} %>
            </table>
            </span>
            </td>
        </tr>
    </table>
    </div>
    </center>
    
</body>
</html>