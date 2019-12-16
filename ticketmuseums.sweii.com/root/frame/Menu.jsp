
<%@page import="com.sweii.util.OnlineAdmin"%><%@page contentType="text/html;charset=GBK" language="java"%>
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
%>
<%!public void printMenu(Menu menu, StringBuffer childBuffer) {
	int i = 0;
	childBuffer.append(",children:[\n");
	for (Menu child : menu.getChilds()) {
	    
		String url = child.getModule() != null ? child.getModule().getEntryURL() : "";
		childBuffer.append("{");
		childBuffer.append("id:'MenuItem-" + child.getId() + "',\n");
		childBuffer.append("text:'" + child.getName() + "',\n");
		childBuffer.append("icon:'" + StringHelper.formatNullValue(child.getIcon(), "") + "',\n");
		childBuffer.append("href:'" + url + "'");
		if (child.getChilds() != null && child.getChilds().size() > 0) {
		    printMenu(child, childBuffer);
		} else {
		    childBuffer.append("},");
		}
	}
	childBuffer.deleteCharAt(childBuffer.length() - 1);
	childBuffer.append("]\n");
    }%>
<%
    admin.setUsername(onlineAdmin.getUsername());
    admin.setId(onlineAdmin.getId());
    admin.setName(onlineAdmin.getName());
    List<Menu> menus = ServiceCenter.getMenuService().getMenusByAdmin(admin);
    StringBuffer treeHtml = new StringBuffer();
    StringBuffer script = new StringBuffer("<script>").append("\n");
    script.append("var RootMenuList=[];").append("\n");
    int i = 0;
    for (Menu menu : menus) {
		if (menu.isRootMenu()) {
		    treeHtml.append("<div  title=\"" + menu.getTitle() + "\" selected=\"" + (i == 0 ? "true" : "false") + "\"  split=\"true\" style=\"width:180px;padding1:15px;\">");
		    treeHtml.append("<ul id=\"MenuTree_" + i + "\"></ul>");
		    treeHtml.append("</div>").append("\n");
		    StringBuffer childBuffer = new StringBuffer("");
		    childBuffer.append("[");
		    for (Menu child : menu.getChilds()) {
			String url = child.getModule() != null ? child.getModule().getEntryURL() : "";
			childBuffer.append("{\n");
			childBuffer.append("id:'MenuItem-" + child.getId() + "',\n");
			childBuffer.append("text:'" + child.getName() + "',\n");
			childBuffer.append("icon:'" + StringHelper.formatNullValue(child.getIcon(), "") + "',\n");
			if (child.getChilds() != null && child.getChilds().size() > 0) {
			    childBuffer.append("href:'openChild',\n");
			    childBuffer.append("state:'open'");
			    printMenu(child, childBuffer);
			} else {
			    if (child.getModule() == null) {
				childBuffer.append("href:'#'");
			    } else {
				childBuffer.append("href:'" + child.getModule().getEntryURL() + "'");
			    }
			}
			childBuffer.append("},");
		    }
		    childBuffer.deleteCharAt(childBuffer.length() - 1);
		    childBuffer.append("]");
		    if (!childBuffer.toString().equals("]")) {
			script.append("RootMenuList.push(" + childBuffer.toString() + ");\n");
		    } else {//没子元素的情况
			script.append("RootMenuList.push(" + null + ");\n");
		    }
		    i++;
		}
    }
    script.append("</script>").append("\n");
    out.println(script.toString());
%>
