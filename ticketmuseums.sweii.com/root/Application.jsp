<%@page contentType="text/html;charset=GBK" language="java"%>
<%@page import="java.io.*"%>
<%@page import="java.util.*"%>  
<%@page import="com.erican.auth.vo.Admin"%>
<%@page import="com.erican.auth.vo.Menu"%>
<%@page import="com.sweii.framework.helper.StringHelper"%>
<%@page import="com.erican.auth.service.ServiceCenter"%>
<%@page import="java.io.*"%> 
<%@page import="java.util.*"%> 
<%@page import="com.sweii.vo.*"%>  
<%@page import="com.sweii.dao.*"%>   
<%@page import="com.sweii.util.*"%>
<%@page import="com.sweii.service.*"%>
<%@page import="com.sweii.framework.helper.StringHelper"%>
<%@page import="org.springframework.web.context.WebApplicationContext"%>
<%@page import="org.springframework.web.context.support.WebApplicationContextUtils"%>
<%
    OnlineAdmin onlineAdmin = new OnlineAdmin(request, response);
    Admin admin = new Admin();
    admin.setUsername(onlineAdmin.getUsername());
    admin.setId(onlineAdmin.getId());
    admin.setUsername(onlineAdmin.getName());
    admin.setUsername(onlineAdmin.getUsername());
    admin.setId(onlineAdmin.getId());
    admin.setName(onlineAdmin.getName());
    List<Menu> menus = ServiceCenter.getMenuService().getMenusByAdmin(admin);
%>
<!DOCTYPE html>
<html>
<head>
<script src="/frame/js/Main.js"></script>
<script type="text/javascript" src="/js/Hash.js"></script>
<script type="text/javascript" src="/js/CommonTicket.js"></script>
<script type="text/javascript" src="/js/UserTicket.js"></script>
<script type="text/javascript" src="/js/ReturnPrice.js"></script>
<script type="text/javascript" src="/js/QueryUser.js"></script>
<script type="text/javascript" src="/js/MendTicket.js"></script>
<script type="text/javascript" src="/js/ExtendTicket.js"></script>
<script type="text/javascript" src="/frame/datepicker/WdatePicker.js"></script>
<script type="text/javascript">
function getAdmin(){
	return "<%=admin.getUsername() %>";
}
        window.onload = function () {
            var height = document.documentElement.scrollHeight;//屏幕显示高度
            var header = document.getElementById("Header").offsetHeight;//头部高度
            var Iframe = document.getElementById("contentFrame");//Iframe对象
            Iframe.style.height = height - header + "px";
            if (navigator.userAgent.indexOf("Chrome") != -1)
            {
                var h = document.body.scrollHeight;
                Iframe.style.height = h - header + "px";
            }
        }
        function changePassword() {
			var a = new Dialog("ChangePassword");
			a.Widht = 480;
			a.Height = 160;
			a.Title = "修改密码";
			a.URL = "base/AdminDialog.jsp";
			a.OKEvent = function() {
				if ($DW.Verify.hasError()) {
					return
				}
				var b = $DW.Form.getData("FChangePassword");
				Server.sendRequest("admin/changePassword.do", b,
				function(c) {
					if (c.status == 1) {
						Dialog.alert(c.message);
						$D.close()
					} else {
						Dialog.alert(c.message)
					}
				},'json')
			};
			a.onLoad = function() {
				$DW.$("oldPassword").focus()
			};
			a.show()
		};
		function setCom() {
			var a = new Dialog("setCom");
			a.Widht = 180;
			a.Height = 90;
			a.Title = "设置串口";
			a.URL = "base/ComDialog.jsp";
			a.OKEvent = function() {
				comPort=$DW.$V("com");
				comBit=$DW.$V("comBit");
				comOpen=$DW.$V("comOpen");
				$('setCom').click();
			};
			a.onLoad = function() {
				$DW.$S("com",comPort);
				$DW.$S("comBit",comBit);
				$DW.$S("comOpen",comOpen);
			};
			a.show()
		};
    </script>

<meta http-equiv="Content-Type" content="text/html; charset=GBK">
<title>电子票务管理系统</title>
<%@include file="/frame/Init.jsp"%>
<link href="/style/style.css" rel="stylesheet" type="text/css" />

<script>
function change(index){
   for(var i=0;i<menuIds.length;i++){
       var id=menuIds[i];
       if(document.getElementById('menu'+id)!=null){
           document.getElementById('menu'+id).style.display='none';
       }
   }
   document.getElementById('menu'+index).style.display='';   
}
</script>
<body scroll="no" style="overflow:hidden;margin-top:0px;margin-left:0px;margin-right:0px;margin:0px; padding:0px;overflow-y:hidden;background:url(/image/bodybg.gif) repeat-y scroll 0 0 #4369b4; overflow :hidden;">
    <div style='display:none'><a id='setCom' href="#setCom"></a></div>
    <div class="Header" id="Header"  style="overflow:hidden">
        <span class="tit"></span>
        
        <div class="tui bg">
            <a href="#exit" class="t" onfocus="this.blur();"></a>
            <div>退出</div>
        </div>
        <div class="qie bg">
            <a href="javascript:changePassword()" onfocus="this.blur();" class="q"></a>
            <div>修改密码</div>
        </div>
        <div class="qie1 bg">
            <a href="javascript:setCom();" onfocus="this.blur();" class="q"></a>
            <div>设置串口</div>
        </div>
        <div class="tui bg" style='width:300px'>
            <div style='width:300px;font-size:14px;margin-top: 35px' align="right">
            <table><tr><td valign="bottom">
           登录账号:<%=admin.getUsername() %>&nbsp;&nbsp;姓名:<%=admin.getName() %>&nbsp;&nbsp;
            </td></tr></table>
            </div>
        </div>
    </div>
    <div class="main" id="MainBox" style="overflow:hidden">
        <div class="Left" id="Left">
            <div class="tab"><span>主功能选项</span></div>            
            <% 
            String ids="";
            for(int i=0;i<menus.size();i++){
        	Menu menu=menus.get(i);
        	if (menu.isRootMenu()) {
                ids=ids+menu.getId()+",";
            %>
            <div class="List">
                <div class="Tit">
                    <span style="background:url(<%=menu.getIcon() %>) no-repeat scroll left center;"><a href="javascript:change(<%=menu.getId() %>)"  onfocus="this.blur();"><b>&nbsp;&nbsp;<%=menu.getName() %></b></a></span>
                </div>
                <ul id="menu<%=menu.getId() %>"<% if(i!=0&&i!=1){ %>style="display:none"<%} %>>
                    <%for(Menu m:menu.getChilds()){ %>
                    <li style="background:url(<%=m.getIcon() %>) no-repeat scroll 27px 6px transparent;cursor:hand;">
                    <% if(m.getModule().getEntryURL().indexOf("/ticket/prepareSaleTicket.do")>-1) {%>
                    <a onfocus="this.blur()" href="<%=m.getModule().getEntryURL()%>">
                    <span style="color:white;font-size:16px"  ><b><%=m.getName() %></b></span>
                      </a>
                    <%}else{ %>
                    <a onfocus="this.blur()" href="javascript:void(0)">
                    <span style="color:white;font-size:16px"  onclick="saleType=0;cardField='';  document.getElementById('contentFrame').src='<%=m.getModule().getEntryURL() %>';"><b><%=m.getName() %></b></span>
                      </a>
                    <%} %>
                    
                    </li>
                    <%} %>
                </ul>
            </div>
            <div class="lineHeight" style="height: 2px; overflow: hidden;"></div>
            
            <%}} %>
            <% if(ids.length()>0){ %>
            <script>var menuIds=[<%=ids.substring(0,ids.length()-1) %>];</script>
            <%}else{ %>
             <div class="List">
             <div class="Tit">
                    <span style="background:url(image/Iconj.gif) no-repeat scroll left center;"><a href="javascript:void(0)"  onfocus="this.blur();"><b>&nbsp;&nbsp;未分配权限</b></a></span>
                </div>
             
             </div>
             <script>var menuIds=[];</script>
            <%} %>
      </div>
        <div class="Right"  id="Right"  style="overflow:hidden">
            <iframe id="contentFrame" name="contentFrame"  scrolling="no" width="100%" height="1400" frameborder="0" src="/Welcome.jsp" ></iframe>
        </div>
    </div>
</body>
</html>