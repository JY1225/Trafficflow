<%@page contentType="text/html;charset=GBK" language="java"%>
<%@include file="/frame/Init.jsp"%>
<sw:init id="dg1">
<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=gb2312" />
<title>菜单管理</title>
 <link href="/style/style.css" rel="stylesheet" type="text/css" />
<script src="/frame/js/Main.js"></script>
<script>

function add(){
	var diag = new Dialog("Diag1");
	diag.Width = 550;
	diag.Height = 300;
	diag.Title = "新建根菜单";
	diag.URL = "admin/prepareAddMenu.do?ROOT=ROOT";
	diag.OKEvent = addSave;
	diag.onLoad=function(){
	    $DW.$('menu.name').focus();
	}
	diag.show();
}

function addSave(){
	var dc = Form.getData($DW.$F("form2"));
	if($DW.Verify.hasError()){
		return;
	}
	var menuType=dc.get('menu.type');
	var parentId=dc.get('parentId');
	var moduleId=dc.get('moduleId');
	if(menuType=='ROOT' && parentId!='0'){
		Dialog.alert('请选择分级菜单或子菜单');
		return;
	}
	if(menuType=='LEAF'){
		if(!isInt(moduleId)){
			Dialog.alert('请选择子菜单必需选择模块');
			return;
		}
	}
	Server.sendRequest("admin/addMenu.do",dc,function(response){
		Dialog.alert(response.message,function(){
			if(response.status==1){
				$D.close();
				DataGrid.loadData('dg1');
			}
		});
	},'json');
}

function save(){
	DataGrid.save("dg1","admin/editMenu.do",function(){DataGrid.loadData('dg1');});
}

function del(){
	var arr = DataGrid.getSelectedValue("dg1");
	if(!arr||arr.length==0){
		Dialog.alert("请先选择要删除的菜单！");
		return;
	}
	Dialog.confirm("您确认要删除此菜单吗？</br><b style='color:#F00'></b>",function(){
		var dc = new DataCollection();
		dc.add("id",arr[0]);
		Server.sendRequest("admin/deleteMenu.do",dc,function(response){
			Dialog.alert(response.message,function(){
				if(response.status==1){
					DataGrid.loadData('dg1');
				}
			});
		},'json');
	});
}

function sortMenu(rowIndex,oldIndex){
	if(rowIndex==oldIndex){
		return;
	}
	var ds = $("dg1").DataSource;
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
		alert("不在同一级别下的菜单不能排序！");
		DataGrid.loadData("dg1");
		return;
	}
	var dc = new DataCollection();
	dc.add("orderType",type);
	dc.add("orderMenuId",orderBranch);
	dc.add("nextMenuId",nextBranch);
	DataGrid.showLoading("dg1");
	Server.sendRequest("admin/sortMenu.do",dc,function(response){
		var message="排序成功";
		if(response!='1'){
			message="排序失败"
		}
		Dialog.alert(message,function(){
			if(response=='1'){
				DataGrid.loadData("dg1");
			}
		});
	},'json');
}

function edit(){
	var arr = DataGrid.getSelectedValue("dg1");
	if(!arr||arr.length==0){
		Dialog.alert("请先选择要编辑的菜单！");
		return;
	}
	var diag = new Dialog("Diag1");
	diag.Width = 550;
	diag.Height = 300;
	diag.Title = "编辑菜单"+arr[0];
	diag.URL = "admin/prepareEditMenu.do?ROOT=ROOT&id="+arr[0];
	diag.onLoad = function(){
		$DW.$("menu.name").focus();
	};
	diag.OKEvent = editSave;
	diag.show();
}

function editSave(){
	var dc = $DW.Form.getData("form2");
	if($DW.Verify.hasError()){
	  return;
    }
	var menuType=dc.get('menu.type');
	if(menuType=='LEAF'){
		if(!isInt(moduleId)){
			Dialog.alert('请选择选择模块');
			return;
		}
	}
	Server.sendRequest("admin/editMenu.do",dc,function(response){
		Dialog.alert(response.message,function(){
			if(response.status==1){
				$D.close();
				DataGrid.loadData("dg1");
			}
		})
	},'json');
}

function viewSubList(id,categoryId,name){
    var diag = new Dialog("viewSubList"+id);
	diag.Width = 650;
	diag.Height =292;
	diag.Title = name+"子菜单";
	diag.URL = "admin/queryMenuPage.do?id="+id+"&categoryId="+categoryId;
	diag.CancelEvent = function(){
	    diag.close();
	}
	diag.ShowOKButton=false;
	diag.CanceButtonText="关 闭";
	diag.show();//显示层
}

</script>
</head>
<body  style="background-color: #DFE6F8;">
    <div class="box01"  align="center"><span align="left">&nbsp;</span> <span class="tit" style="font-size: 20px">菜单管理</span></div>
<table class="tools" style="width:100%">
    <tr>
        <td>
        <sw:button limit="true" onClick="add();">新增</sw:button>
        <sw:button limit="true" onClick="edit();">修改</sw:button>
        <sw:button limit="true" onClick="del();">删除</sw:button>
        </td>
    </tr>
</table>
    <sw:datagrid>       
        <table class="table" cellpadding="0" cellspacing="0" style="table-layout: fixed">
            <tr ztype="head" class="tr">
                <td width="35" align="center" ztype="RowNo"><b>序号</b></td>
			      <td width="30" ztype="selector" align="center" field="id">&nbsp;</td>
			      <td width="20"><b>&nbsp;菜单名称</b></td>
			      <td width="20"><b>&nbsp;菜单类型</b></td>
			      <td width="20"><b>&nbsp;模块分类</b></td>
			      <td width="30"><b>&nbsp;创建时间</b></td>
			      <td width="30"><b>&nbsp;描述信息</b></td>
            </tr>
            <tr>
                 <td align="center">&nbsp;</td>
				<td align="center">&nbsp;</td>
			      <td><a href="javascript:viewSubList(${id},${category.id},'${name}')" style="color:green">&nbsp;${name}</a></td>
			      <td>&nbsp;${menuType}</td>
			      <td>&nbsp;${category.name}</td>
			      <td>&nbsp;${createTime}</td>
			      <td>&nbsp;${description}</td>
            </tr>
            <tr ztype="pagebar" align="left" height="30px" style="background-color: #D3E1F1;">
                <td colspan="7" align="left" height="30px">${PageBar}</td>
            </tr>
        </table>
    </sw:datagrid>
</body>
</html>
</sw:init>
