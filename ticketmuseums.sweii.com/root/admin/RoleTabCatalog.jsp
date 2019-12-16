
<%@include file="/frame/Init.jsp"%>
<html>
<head>
<meta http-equiv="X-UA-Compatible" content="IE=EmulateIE7">
<meta http-equiv="Content-Type" content="text/html; charset=gb2312" />
<title>角色权限</title>
<link href="/frame/css/frame.css" rel="stylesheet" type="text/css" />
<script src="/frame/js/Main.js"></script>
<script>
function init(){
	$("AllSelect").checked = false;
	var dc = new DataCollection();
	dc.add("RoleCode",$V("RoleCode"));
	dc.add("Role.LastRoleCode",Cookie.get("Role.LastRoleCode"));
	Server.sendRequest("com.zving.platform.RoleTabCatalog.getSites",dc,function(response){
		$("SiteID").innerHTML = response.get("Sites");
		Selector.initCtrl("SiteID");
		DataGrid.setParam("dg1","RoleCode",$V("RoleCode"));
		DataGrid.setParam("dg1","Role.LastRoleCode",Cookie.get("Role.LastRoleCode"));
		DataGrid.setParam("dg1","SiteID",$V("SiteID"));
		DataGrid.loadData("dg1");
	});
}

function onSiteChange(){
	$("AllSelect").checked = false;
	DataGrid.setParam("dg1","RoleCode",$V("RoleCode"));
	DataGrid.setParam("dg1","SiteID",$V("SiteID"));
	DataGrid.loadData("dg1");
}

Page.onLoad(function(){
	$("dg1").beforeEdit = function(tr,dr){
		$("visRight").checked = dr.get("visRight")=='√'; 
		$("manageRight").checked = dr.get("manageRight")=='√';
		return true;
	}
	$("dg1").afterEdit = function(tr,dr){
		dr.set("visRight",$("manageRight").checked ? '√':'');
		return true;
	}
});


function save(){
	if(DataGrid.EditingRow!=null){
		if(!DataGrid.changeStatus(DataGrid.EditingRow)){
			return;
		}
	}
	var ds = $("dg1").DataSource;
	var dc = new DataCollection();
	dc.add("DT",ds);
	dc.add("RoleCode",$V("RoleCode"));
	dc.add("PrivType","");
	Server.sendRequest("com.zving.platform.RoleTabCatalog.dg1Edit",dc,function(response){
		$("AllSelect").checked =false;
		Dialog.alert(response.Message,function(){
			if(response.Status==1){
				DataGrid.loadData('dg1');
			}
		});
	});
}

function clickCheckBox(ele){
	var flag = ele.checked;
	var zindex = ele.getParent("td").$A("zindex");
	var tr = ele.getParent("tr");
	var level = parseInt(tr.$A("level"));
	var tbody = ele.getParent("tbody");
	var trs = tbody.children;
	var length = trs.length-1;
	var tds = null;
	var ds = $("dg1").DataSource;
	var dr = null;
	var v = "";	
	for(var i=1;i<length;i++){
		if(tr==trs[i]){
			for(var j=i+1;j<length;j++){
				tr = trs[j];
				if(parseInt($(tr).$A("level"))<=level){
					break;
				}
				tds = tr.children;
				v = flag? "√":"";
				tds[zindex].innerHTML=v;
				dr = ds.getDataRow(j-1);
				dr.set2(parseInt(zindex)+3,v);
			}
			break;
		}
	}
	//当取消每一行的第一个权限时，自动取消后面所有的权限
	if(!flag&&ele.id=='visRight'){
		$("visRight").checked = false;
		clickCheckBox($("visRight"));
	}
	if(!flag&&ele.id=='manageRight'){
		$("manageRight").checked = false;
		clickCheckBox($("manageRight"));
	}
}

function clickAllSelect(){
	var v = $("AllSelect").checked? "√":"";
	var trs = $("dg1").children[0].children;
	var length = trs.length-1;
	var ds = $("dg1").DataSource;
	var dr = null;
	for(var i=1;i<length;i++){
		tr = trs[i];
		dr = ds.getDataRow(i-1);
		var tds = tr.children;
		for(var j=0;j<tds.length;j++){
			if(tds[j].getAttribute("zindex")){
				tds[j].innerHTML=v;
				dr.set2(j+3,v);
			}
		}
	}
}
</script>
</head>
<body>
<table  width="100%" border='0' cellpadding='0' cellspacing='0'>
<tr>
    <td style="padding:4px 5px;"><sw:button onClick="save()"><img src="../Icons/icon018a2.gif"/>保存</sw:button>
      	 模块分类：<sw:select id="SiteID" style="width:150px;" onChange="onSiteChange();"> </sw:select>
      <input type = "hidden" id ="RoleCode" value = "">
      <span style="line-height:24px;">&nbsp;&nbsp;&nbsp;<label>全选&nbsp;<input type="checkbox" id="AllSelect" onClick="clickAllSelect();"/></label></span>
  	</td>
</tr>
<tr>   <td style="padding:0px 5px;">
<sw:datagrid>
			  <table width="100%" cellpadding="2" cellspacing="0" class="dataTable">
				<tr ztype="head" class="dataTableHead">
				  <td  width="5%" ztype="RowNo">序号</td>
				  <td width="40%" ztype="tree"  level="TreeLevel"><b>模块名称</b></td>
				  <td width="30%" align="center" ><b>访问权限</b></td>
				  <td width="30%" align="center" ><b>授权权限</b></td>
			    </tr>
				<tr style1="background-color:#FFFFFF"
					style2="background-color:#F9FBFC">
				  <td >&nbsp;</td>
				  <td>${name}</td>
				  <td align="center" zindex="2">${visRight}</td>
				  <td align="center" zindex="3">${manageRight}</td>
			    </tr>
			    <tr ztype="edit" bgcolor="#E1F3FF">
				  <td >&nbsp;</td>
				  <td>${name}</td>
				  <td align="center" ><input type='checkbox' name='visRight' id ='visRight' onclick='clickCheckBox(this);'></td> 
				  <td align="center" ><input type='checkbox' name='manageRight' id ='manageRight' onclick='clickCheckBox(this);'></td> 
			    </tr>
	    </table>
	  </sw:datagrid></td>
 </tr>
</table>	
</body>
</html>
