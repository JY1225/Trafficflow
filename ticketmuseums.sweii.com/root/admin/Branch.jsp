<%@page contentType="text/html;charset=GBK" language="java"%>
<%@include file="/frame/Init.jsp"%>
<sw:init id="dg1">

<html>
<head>
<meta http-equiv="X-UA-Compatible" content="IE=EmulateIE7">
<meta http-equiv="Content-Type" content="text/html; charset=gb2312" />
<title>机构管理</title>
<link href="/frame/css/ext-all.css" rel="stylesheet" type="text/css" />
<script src="/frame/js/Main.js"></script>
<script>
Page.onLoad(function(){
	$("dg1").afterEdit = function(tr,dr){
		dr.set("name",$V("name"));
		dr.set("memo",$V("memo"));
		return true;
	}
});

function add(){
	var diag = new Dialog("Diag1");
	diag.Width = 450;
	diag.Height = 150;
	diag.Title = "新建机构";
	diag.URL = "admin/prepareAddBranch.do";
	diag.OKEvent = addSave;
	diag.show();
}

function addSave(){
	var dc = Form.getData($DW.$F("form2"));
	if($DW.Verify.hasError()){
		return;
	}
	Server.sendRequest("admin/addBranch.do",dc,function(response){
		var message="新建成功";
		if(response!='1'){
			message="新建失败"
		}
		Dialog.alert(message,function(){
			if(response=="1"){
				$D.close();
				DataGrid.loadData('dg1');
			}
		});
	});
}

function save(){
	DataGrid.save("dg1","admin/editBranch.do",function(){DataGrid.loadData('dg1');});
}

function del(){
	var arr = DataGrid.getSelectedValue("dg1");
	if(!arr||arr.length==0){
		Dialog.alert("请先选择要删除的行！");
		return;
	}
	var dc = new DataCollection();
	dc.add("ids",arr.join());
	Dialog.confirm("注意：已有子机构或者关联用户的不能删除，您确认要删除吗？",function(){
		Server.sendRequest("admin/deleteBranch.do",dc,function(response){
			var message="删除成功";
			if(response!='1'){
				message="删除失败"
			}
			Dialog.alert(message,function(){
				if(response=='1'){
					DataGrid.loadData('dg1');
				}				
			});
		});
	});
}

function sortBranch(rowIndex,oldIndex){
	if(rowIndex==oldIndex){
		return;
	}
	
	var ds = $("dg1").DataSource;
	if (ds.get(rowIndex-1,"id")== 1) {
		alert("您选择的是总机构，总机构不需要排序！");
		DataGrid.loadData("dg1");
		return;
	}
	
	if (rowIndex-1 == 0) {
		alert("任何子机构都不能排在总机构前面");
		DataGrid.loadData("dg1");
		return;
	}
	
	var type = "";
	var orderBranch = "";
	var nextBranch = "";
	if (oldIndex>rowIndex && ds.get(rowIndex-1,"parentId") == ds.get(rowIndex,"parentId")) {
		type = "Before";
		orderBranch = ds.get(rowIndex-1,"id");
		nextBranch = ds.get(rowIndex,"id");
	} else if (oldIndex<rowIndex && ds.get(rowIndex-1,"parentId") == ds.get(rowIndex-2,"parentId")) {
		type = "After";
		orderBranch = ds.get(rowIndex-1,"id");
		nextBranch = ds.get(rowIndex-2,"id");
	} else {
		alert("不在同一机构下的子机构不能排序！");
		DataGrid.loadData("dg1");
		return;
	}
	var dc = new DataCollection();
	dc.add("orderType",type);
	dc.add("orderBranchId",orderBranch);
	dc.add("nextBranchId",nextBranch);
	DataGrid.showLoading("dg1");
	Server.sendRequest("admin/sortBranch.do",dc,function(response){
		var message="排序成功";
		if(response!='1'){
			message="排序失败"
		}
		Dialog.alert(message,function(){
			if(response=='1'){
				DataGrid.loadData("dg1");
			}
		});
	});
}
</script>
</head>
<body oncontextmenu="return false;">

				    <div class="x-panel-header x-unselectable" style="-moz-user-select: none;">
						<table align="left">
							<tr>
							   <td><sw:button src="/Icons/icon002a2.gif" onClick="add()">新建</sw:button></td>			  
							   <td><sw:button  src="/Icons/icon002a4.gif"  onClick="save()">保存</sw:button></td>
							   <td><sw:button  src="/Icons/icon002a3.gif"   onClick="del()">删除</sw:button></td>			       
							</tr>
						</table>
				     </div>	               
			  <sw:datagrid id="dg1"   format="{'createTime':'yyyy-MM-dd'}"
			  ajax="admin/queryBranch.do" size="18"  fields="id,treeLevel,name,childrenCount,memo,createTime,userCount,parentId">
			  <table width="100%" cellpadding="2" cellspacing="0" afterdrag="sortBranch">
			    <tr ztype="head" class="x-grid3-hd-row">
			      <td width="3%" ztype="RowNo" drag="true"><img src="/frameImages/icon_drag.gif" width="16" height="16"></td>
			      <td width="3%" ztype="selector" field="id">&nbsp;</td>
			      <td width="25%" ztype="tree" level="treeLevel">名称</td>
			      <td width="8%">子机构数</td>
			      <td width="8%">用户数</td>
			      <td width="20%">备注</td>
			      <td width="18%">创建时间</td>
			    </tr>
			    <tr>
			      <td>&nbsp;</td>
			      <td>&nbsp;</td>
			      <td>${name}</td>
			      <td>${childrenCount}</td>
			      <td>${userCount}</td>
			      <td>${memo}</td>
			      <td>${createTime}</td>
			    </tr>
			    <tr ztype="edit">
			      <td>&nbsp;</td>
			      <td>&nbsp;</td>
			      <td><input type="text" class="input1"	id="name" value="${name}" maxlength="20"></td>
			      <td>${childrenCount}</td>
			      <td>${userCount}</td>
			      <td><input type="text" class="input1"	id="memo" value="${memo}" ></td>
			      <td>${createTime}</td>
			    </tr>
			  </table>
			</sw:datagrid>
</body>
</html>
</sw:init>
