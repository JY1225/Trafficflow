<%@page contentType="text/html;charset=GBK" language="java"%>
<%@include file="/frame/Init.jsp"%>

<html>
<head>
<meta http-equiv="X-UA-Compatible" content="IE=EmulateIE7">
<meta http-equiv="Content-Type" content="text/html; charset=gb2312" />
<title> </title>
<link href="/frame/css/frame.css" rel="stylesheet" type="text/css" />
<script src="/frame/js/Main.js"></script>
<script src="/frame/js/Tabpage.js"></script>
<script>
var treeItem = null;

Page.onLoad(function(){
	var tree = $("tree1");
	var arr = tree.getElementsByTagName("p");
	for(var i=0;i<arr.length;i++){
		var p = arr[i];
		if(i==1){
			p.className = "cur";
			Tree.CurrentItem = p;
			p.onclick.apply(p);
			break;
		}
	}
});

Page.onClick(function(){
	var div = $("_DivContextMenu");
	if(div){
			$E.hide(div);
	}
});

function showMenu(event,ele){
	var cid = ele.getAttribute("cid");
	if(!cid){
		return ;
	}
	var menu = new Menu();
	menu.setEvent(event);
	menu.setParam(cid);
	menu.addItem("新建角色",add,"Icons/icon018a2.gif");
	menu.addItem("修改角色",showEditDialog,"Icons/icon018a2.gif");
	menu.addItem("删除角色",del,"Icons/icon018a2.gif");
	menu.show();
}
function add(param){
	var diag = new Dialog("Diag1");
	diag.Width = 380;
	diag.Height = 150;
	diag.Title = "新建角色";
	diag.URL = "admin/prepareAddRole.do";
	diag.onLoad = function(){
		$DW.$("name").focus();
	};
	diag.OKEvent = addSave;
	diag.show();
}

function addSave(){
	var dc = Form.getData($DW.$F("form2"));
	if($DW.Verify.hasError()){
	  return;
     }
	Server.sendRequest("admin/addRole.do",dc,function(response){
		var message="新建角色成功";
		if(response!='1'){
			message="新建角色失败"
		}
		Dialog.alert(message,function(){
			if(response=='1'){
				$D.close();
				window.location.reload();
			}
		});
	});
}

function del(id,name){
	if(!id){
		Dialog.alert("请先选择一个角色！");
		return ;
	}
	Dialog.confirm("确认删除<b style='color:#F00'> "+name+"</b> 角色吗？",function(){
		var dc = new DataCollection();
		dc.add("id",id);
		Server.sendRequest("admin/deleteRole.do",dc,function(response){
			var message="删除角色成功";
			if(response!='1'){
				message="删除角色失败"
			}
			Dialog.alert(message,function(){
				if(response=='1'){
					window.parent.parent.location.reload();
				}
			});
		});
	});
}

function showEditDialog(param){
	if(!param){
		Dialog.alert("请先选择一个角色！");
		return ;
	}
	var diag = new Dialog("Diag1");
	diag.Width = 350;
	diag.Height = 80;
	diag.Title = "修改角色";
	diag.URL = "admin/prepareEditRole.do?id="+param;
	diag.onLoad = function(){
		$DW.$("name").focus();
	};
	diag.OKEvent = editSave;
	diag.show();
}

function editSave(){
	var dc = Form.getData($DW.$F("form2"));
	if($DW.Verify.hasError()){
	  	return;
     }
	Server.sendRequest("admin/editRole.do",dc,function(response){
		var message="修改角色成功";
		if(response!='1'){
			message="修改角色失败"
		}
		Dialog.alert(message,function(){
			if(response=='1'){
				$D.close();
				window.parent.location.reload();
			}
		});
	});
}
function attribute(param){
	var RoleCode = param;
	var diag = new Dialog("Diag1");
	diag.Width = 260;
	diag.Height = 130;
	diag.Title = "属性";
	diag.URL = "Platform/RoleAttribute.jsp?RoleCode="+param;
	diag.ShowButtonRow = false;
	diag.show();
}

function onRoleTabClick(){
	var cid = "";
	if(treeItem){
		cid = treeItem.getAttribute("cid");
	}
	var currentTab = Tab.getCurrentTab().contentWindow;
	if(currentTab.$("id"))currentTab.$S("id",cid);
	if(Tab.getCurrentTab()==Tab.getChildTab("Basic")){
		Tab.getCurrentTab().src = "/admin/viewRole.do?id="+cid;
	}else if(currentTab.init){
		currentTab.init();
	}
}

function onTreeClick(ele){
	var cid = ele.getAttribute("cid");
	if(!cid){
		return ;
	}
	treeItem = ele;
	var currentTab = Tab.getCurrentTab().contentWindow;
	if(currentTab.$("id"))currentTab.$S("id",cid);
	if(Tab.getCurrentTab()==Tab.getChildTab("Basic")){
			Tab.getCurrentTab().src = "/admin/viewRole.do?id="+cid;
	}else if(currentTab.init){
		currentTab.init();
	}
}


//../admin/queryRoleFunction.do
</script>
</head>
<body >
  <table width="100%" border="0" cellspacing="6" cellpadding="0" style="border-collapse: separate; border-spacing: 6px;">
    <tr valign="top">
    <td width="180">
<table width="180" border="0" cellspacing="0" cellpadding="6" class="blockTable">
        <tr>
          <td style="padding:6px;" class="blockTd">
		  <sw:tree id="tree1" style="height:430px" level="2"  rootText="角色列表"
		  branchIcon="Icons/icon025a1.gif" leafIcon="Icons/icon025a1.gif">
		  	<p cid='${id}' cname='${name}' onClick="onTreeClick(this);" oncontextmenu="showMenu(event,this);">&nbsp;${name}</p>
		  </sw:tree>
		  </td>
        </tr>
      </table>	
	</td>
    <td>
	<sw:tab>
	<sw:childtab id="Basic" src="../admin/viewRole.do" afterClick="onRoleTabClick()">
	<img src='../Icons/icon018a1.gif' /><b>基本信息</b>
	</sw:childtab>
    <sw:childtab id="RoleFunction" src="../admin/queryRoleFunction.do"  selected="true" afterClick="onRoleTabClick()"><img src="../Icons/icon018a1.gif" /><b>菜单权限</b></sw:childtab>
	</sw:tab>
	</td>
    </tr>
  </table>
</body>
</html>

