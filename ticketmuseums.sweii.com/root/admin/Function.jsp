<%@page contentType="text/html;charset=GBK" language="java"%>
<%@include file="/frame/Init.jsp"%>
<%@page import="com.erican.auth.vo.*"%>
<%
Module module=(Module)request.getAttribute("module");
%>
<sw:init id="dg1">

<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="X-UA-Compatible" content="IE=EmulateIE7">
<meta http-equiv="Content-Type" content="text/html; charset=gb2312" />
<title>功能点</title>
<link href="/style/style.css" rel="stylesheet" type="text/css" />
<script src="/frame/js/Main.js"></script>
<script>
var moduleId='<%=module.getId()%>';
function add(){
	var diag = new Dialog("DiagFun");
	diag.Width = 600;
	diag.Height =292;
	diag.Title = "新建"+this.document.title;
	diag.URL = "admin/prepareAddFunction.do?moduleId="+moduleId;
	diag.onLoad = function(){
		$DW.$("function.name").focus();
	};
	diag.OKEvent = addSave;
	diag.show();
}

function addSave(){
	var dc = $DW.Form.getData("form2");
	if($DW.Verify.hasError()){
	  return;
     }
	Server.sendRequest("admin/addFunction.do",dc,function(response){
		Dialog.alert(response.message,function(){
			if(response.status==1){
				$D.close();
				DataGrid.loadData('dg1');
			}
		});	
	},'json');
}
function del(){
	var arr = DataGrid.getSelectedValue("dg1");
	if(!arr||arr.length==0){
		Dialog.alert("请先选择要删除的功能点！");
		return;
	}
	Dialog.confirm("您确认要删除这些功能点吗？</br><b style='color:#F00'>"+arr.join(',</br>')+"</b>",function(){
		var dc = new DataCollection();
		dc.add("funIds",arr.join());
		Server.sendRequest("admin/deleteFunction.do",dc,function(response){
			Dialog.alert(response.message,function(){
				if(response.status==1){
					DataGrid.loadData('dg1');
				}
			});
		},'json');
	});
}
function edit(){
	var arr = DataGrid.getSelectedValue("dg1");
	if(!arr||arr.length==0){
		Dialog.alert("请先选择要编辑的功能点！");
		return;
	}
	var diag = new Dialog("DiagFun");
	diag.Width = 600;
	diag.Height =292;
	diag.Title = "编辑模块功能点";
	diag.URL = "admin/prepareEditFunction.do?id="+arr[0];
	diag.onLoad = function(){
		$DW.$("function.name").focus();
	};
	diag.OKEvent = editSave;
	diag.show();
}

function editSave(){
	var dc = $DW.Form.getData("form2");
	if($DW.Verify.hasError()){
	  return;
    }
	Server.sendRequest("admin/editFunction.do",dc,function(response){
		Dialog.alert(response.message,function(){
			if(response.status==1){
				$D.close();
				DataGrid.loadData("dg1");
			}
		})
	},'json');
}
</script>
</head>
<body>
<table class="tools" style="width:100%">
        <tr>
            <td>
<sw:button onClick="add()">新建</sw:button>		  
							  <sw:button  onClick="edit()">修改</sw:button>
							  <sw:button   onClick="del()">删除</sw:button>	</td>
        </tr>
    </table>
		
    <sw:datagrid>       
         <table class="table" cellpadding="0" cellspacing="0" style="table-layout: fixed">
            <tr ztype="head" class="tr">
				   	        <td width="6%" ztype="RowNo">序号</td>
					        <td width="4%" ztype="selector" field="id">&nbsp;</td>
				            <td width="15%" >功能名称</td>
							<td width="20%" >功能代码</td>
							<td width="45%" >权限描述</td>
					    </tr>
					    <tr>
				          <td >&nbsp;</td>
					      <td>&nbsp;</td>
						  <td>${name}</td>
						  <td>${code}</td>
						  <td>${permission}</td>
					    </tr>
						<tr ztype="pagebar" align="left" height="30px" style="background-color: #D3E1F1;">
                <td colspan="17" align="left" height="30px">${PageBar}</td>
            </tr>
					</table>
				</sw:datagrid>
</body>
</html>
</sw:init>
