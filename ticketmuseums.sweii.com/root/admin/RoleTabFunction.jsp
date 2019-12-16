<%@page contentType="text/html;charset=GBK" language="java"%>
<%@include file="/frame/Init.jsp"%>
<sw:init id="dg1">

<html>
<head>
<meta http-equiv="X-UA-Compatible" content="IE=EmulateIE7">
<meta http-equiv="Content-Type" content="text/html; charset=gb2312" />
<title>角色权限</title>
<link href="/frame/css/frame.css" rel="stylesheet" type="text/css" />
<link href="/frame/css/ext-all.css" rel="stylesheet" type="text/css" />
<script src="/frame/js/Main.js"></script>
<script><!--
function init(){
	DataGrid.setParam("dg1","roleId",$V("id"));
	DataGrid.setParam("dg1","categoryId",$V("categoryId"));
	DataGrid.loadData("dg1");
}

function onCategoryChange(){
	$("AllSelect").checked = false;
	DataGrid.setParam("dg1","roleId",$V("id"));
	DataGrid.setParam("dg1","categoryId",$V("categoryId"));
	DataGrid.loadData("dg1");
}

Page.onLoad(function(){
	
});


function save(){
	if(!$V("id")){
		Dialog.alert("请先选择一个角色！");
		return;
	}
	var visRightarr = $N("visRight");
	if(visRightarr==null){
		Dialog.alert("没有角色权限项保存！");
		return;
	}
	var manageRightarr = $N("manageRight");
	var dc = new DataCollection();
	var vis='';
	var mag='';
	for(var i=0;i<visRightarr.length;i++){
		if(visRightarr[i].checked){
			if(parseInt(visRightarr[i].value)>0){
				vis+=visRightarr[i].value+",";
			}
		}
	}
	dc.add('visRight',vis);
	for(var i=0;i<manageRightarr.length;i++){
		if(manageRightarr[i].checked){
			if(parseInt(manageRightarr[i].value)>0){
				mag+=manageRightarr[i].value+',';
			}
		}
	}
	dc.add('manageRight',mag);
	dc.add("roleId",$V("id"));
	dc.add("categoryId",$V("categoryId"));
	Server.sendRequest("admin/editRoleFunction.do",dc,function(response){
		$("AllSelect").checked =false;
		Dialog.alert(response.message,function(){
			if(response.status==1){
				DataGrid.loadData('dg1');
			}
		});
	},'json');
}

function clickCheckBox(ele){
	var flag = ele.checked;
	var cid=ele.id;
	var zindex = ele.getParent("td").$A("zindex");
	var tr = ele.getParent("tr");
	var level = parseInt(tr.$A("level"));
	var tbody = ele.getParent("tbody");
	var trs = tbody.children;
	var length = trs.length-1;
	for(var i=1;i<length;i++){
		if(tr==trs[i]){
			for(var j=i+1;j<length;j++){
				tr = trs[j];
				if(parseInt($(tr).$A("level"))<=level){
					break;
				}
				var tds=tr.children;
				if(cid=='visRight'){
					tds[2].children[0].checked = flag;
				}else if(cid=='manageRight'){
					tds[3].children[0].checked = flag;
				}
			}
			break;
		}
	}
}

function clickAllSelect(){

	var f = $("AllSelect").checked;
	var visRightCheck = $N("visRight");
	var visRightCheckLen = visRightCheck.length;
	for(var i=0;i<visRightCheckLen;i++){
		visRightCheck[i].checked = f;
	}
	var manageRightCheck = $N("manageRight");
	var manageRightCheckLen = manageRightCheck.length;
	for(var i=0;i<manageRightCheckLen;i++){
		manageRightCheck[i].checked = f;
	}
}
</script>
</head>
<body>
<table  width="100%" border='0' cellpadding='0' cellspacing='0'>
<tr>
    <td style="padding:4px 5px;">
        <table>
        <tr>
        <td><sw:button src="/Icons/icon002a2.gif" onClick="save()">保存</sw:button></td>
        <td>模块分类：<sw:select id="categoryId" name="categoryId" reqAttr="combox" style="width:200px;" onChange="onCategoryChange();"><span value="0" selected="true">所有分类...</span></sw:select>
      <input type = "hidden" id ="id" value = "">
      <span style="line-height:24px;">&nbsp;&nbsp;&nbsp;<label>全选&nbsp;<input type="checkbox" id="AllSelect" onClick="clickAllSelect();"/></label></span></td>
        </tr>
        </table>
       
      	 
  	</td>
</tr>
<tr>   <td style="padding:0px 5px;">
<sw:datagrid>
			  <table width="100%" cellpadding="2" cellspacing="0" class="dataTable">
				<tr ztype="head" class="x-grid3-hd-row">
				  <td  width="5%" ztype="RowNo">序号</td>
				  <td width="65%" ztype="tree"  level="treeLevel">模块名称</td>
				  <td width="15%" align="center" >访问权限</td>
				  <td width="15%" align="center" >授权权限</td>
			    </tr>
				<tr style1="background-color:#FFFFFF"
					style2="background-color:#F9FBFC">
				  <td >&nbsp;</td>
				  <td>${name}</td>
				  <td align="center" zindex="2"><input type='checkbox' name='visRight' value="${id}" id ='visRight'  onclick='clickCheckBox(this);' ${visRight}></td>
				  <td align="center" zindex="3"><input type='checkbox' name='manageRight' value="${id}" id ='manageRight' onclick='clickCheckBox(this);' ${manageRight}></td>
			    </tr>
	    </table>
	  </sw:datagrid></td>
 </tr>
</table>	
</body>
</html>
</sw:init>
