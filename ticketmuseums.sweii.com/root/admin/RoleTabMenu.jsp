
<%@include file="/frame/Init.jsp"%>
<html>
<head>
<meta http-equiv="X-UA-Compatible" content="IE=EmulateIE7">
<meta http-equiv="Content-Type" content="text/html; charset=gb2312" />
<title> </title>
<link href="/frame/css/frame.css" rel="stylesheet" type="text/css" />
<script src="/frame/js/Main.js"></script>
<script >
Page.onLoad(init);

function init(){
	DataGrid.showLoading("dg1");
	$("AllSelect").checked = false;
	var dc = new DataCollection();
	dc.add("RoleCode",$V("RoleCode"));
	dc.add("Role.LastRoleCode",Cookie.get("Role.LastRoleCode"));
	Server.sendRequest("com.zving.platform.RoleTabMenu.getCheckedMenu",dc,function(response){
		var checkedMenu= response.get("checkedMenu");
		var menuTree = $N("dg1_TreeRowCheck");
		var menuTreeLength = menuTree.length;
		if(!checkedMenu){
			for(var i=0;i<menuTreeLength;i++){
				menuTree[i].checked = false;
			}
			DataGrid.closeLoading();
			return;
		}
		var checkedArray = checkedMenu.split(",");
		var checkedArrayLength = checkedArray.length;
		for(var i=0;i<menuTreeLength;i++){
			menuTree[i].checked = false;
			for(var j = 0;j<checkedArrayLength;j++){
				if(menuTree[i].getAttribute("value")==checkedArray[j]){
					menuTree[i].checked = true;
					break;
				}
			}
		}
		
		DataGrid.closeLoading();
	});
}

function treeCheckBoxClick(ele){
	var id = ele.id;
	var index = id.substring(id.lastIndexOf("_")+1);
	var checked = ele.checked;
	var level = ele.getAttribute("level");
	var arr = $N(ele.name);
	var length = arr.length;
	// 选中
	if(checked){
		for(var i=index-2;i>=0;i--){
			if(arr[i].getAttribute("level")<level){
				arr[i].checked = true;
				level = arr[i].getAttribute("level");
				if(level==0){
					break;
				}
			}
		}
		level = ele.getAttribute("level");
		for(var i=index;i<length;i++){
			if(arr[i].getAttribute("level")>level){
				arr[i].checked = true;
			}else {
				break;
			}
		}
	}else{
	// 取消选中
		for(var i=index-2;i>=0;i--){
			if(arr[i].getAttribute("level")<level){
				var check_flag = false;
				var tmp_index = arr[i].id.substring(arr[i].id.lastIndexOf("_")+1);
				for(var j=tmp_index;j<length;j++){
					if(level<=arr[j].getAttribute("level")){
						if(arr[j].checked){
							check_flag = true;
							break;
						}
					}else{
						break;
					}
				}
				arr[i].checked = check_flag;
				
				level = arr[i].getAttribute("level");
				if(level==0){
					break;
				}
			}
		}
		level = ele.getAttribute("level");
		for(var i=index;i<length;i++){
			if(arr[i].getAttribute("level")>level){
				arr[i].checked = false;
			}else{
				break;
			}
		}
	}
}

function save(){
	if(!$V("RoleCode")){
		Dialog.alert("请先选择一个角色！");
		return;
	}
	var dc = new DataCollection();
	var arr = $N("dg1_TreeRowCheck");
	if(!arr||arr.length==0){
		Dialog.alert("您还没有选择菜单项！");
		return;
	};
	
	var dt = new DataTable();
	var cols=[];
	cols.push(["ID","1"]);
	cols.push(["<%=Priv.MENU_BROWSE%>","1"]);
	var values =[];
	for(var i=0;i<arr.length;i++){
		if(arr[i].checked){
			values.push([arr[i].value,"1"]);
		}else{
			values.push([arr[i].value,"0"]);
		}
	}
	dt.init(cols,values);
	dc.add("RoleCode",$V("RoleCode"));
	dc.add("dt",dt,"DataTable");
	Server.sendRequest("com.zving.platform.RoleTabMenu.save",dc,function(response){
		Dialog.alert(response.Message,function(){
			if(response.Status==1){
				init();					
			}
		});
	});
}

function clickAllSelect(){
	var f = $("AllSelect").checked;
	var menuTree = $N("dg1_TreeRowCheck");
	var menuTreeLength = menuTree.length;
	for(var i=0;i<menuTreeLength;i++){
		menuTree[i].checked = f;
	}
}
</script>
</head>
<body>
<table  width="100%" border='0' cellpadding='0' cellspacing='0'>
  <tr>
    <td style="padding:4px 5px;"><sw:button onClick="save()"><img src="../Icons/icon018a4.gif"/>保存</sw:button>
      <input type = "hidden" id ="RoleCode" value = "">
      <span style="line-height:24px;">&nbsp;&nbsp;&nbsp;<label>全选&nbsp;<input type="checkbox" id="AllSelect" onClick="clickAllSelect();"/></label></span>
  	</td>
  </tr>
  <tr >   <td style="padding:0px 5px;">
<sw:datagrid id="dg1" method="com.zving.platform.RoleTabMenu.dg1DataBind">
			  <table width="100%" cellpadding="2" cellspacing="0"  class="dataTable">
				<tr ztype="head" class="dataTableHead">
				  <td  width="6%" ztype="RowNo">序号</td>
				  <td width="94%" ztype="tree"  field="ID" level="treelevel">菜单名称</td>
			    </tr>
				<tr>
				  <td >&nbsp;</td>
				  <td><img src="../${Icon}" align="absmiddle"/>&nbsp;${Name}</td>
			    </tr>
			  </table>
			</sw:datagrid></td>
  </tr>
</table>
</body>
</html>
