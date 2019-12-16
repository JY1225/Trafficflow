<%@page contentType="text/html;charset=GBK" language="java"%>
<%@include file="/frame/Init.jsp"%>
<sw:init id="dg1">
<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">
	<head>
	<meta http-equiv="X-UA-Compatible" content="IE=EmulateIE7">
	<meta http-equiv="Content-Type" content="text/html; charset=gb2312" />
	<title>用户</title>
 <link href="/style/style.css" rel="stylesheet" type="text/css" />
	<script type="text/javascript" src="/frame/js/Main.js"></script>
       <sw:confirm method="del" action="common/changeAdmin.do" confirm="你确定要删除选择的用户吗？"  field="deleteFlag" value="1"  success="删除用户成功！" failure="删除用户失败！"   multi="true"/>
    
	<script>
function add(){
	var diag = new Dialog("Diag1");
	diag.Width = 600;
	diag.Height = 380;
	diag.Title = "新建"+this.document.title;
	diag.URL = "admin/prepareAddAdmin.do";
	diag.onLoad = function(){
		$DW.$NS("admin.status","1");
		$DW.$S("admin.password","");
		$DW.$("admin.username").focus();
	};
	diag.OKEvent = addSave;
	diag.show();
}

function addSave(){
	var dc = $DW.Form.getData("form2");
	if($DW.Verify.hasError()){
	  return;
     }
	if ($DW.$V("confirmPassword") != $DW.$V("admin.password")){
	   Dialog.alert("两次输入密码不相同，请重新输入...");
	   return ;
	}
	dc.add('message','新增用户');
	Server.sendRequest("common/addAdmin.do",dc,function(response){
		Dialog.alert(response.message,function(){
			if(response.status==1){
				$D.close();
				DataGrid.loadData('dg1');
			}
		});	
	},'json');
}


function edit(){
	var arr = DataGrid.getSelectedValue("dg1");
	if(!arr||arr.length==0){
		Dialog.alert("请先选择要编辑的用户！");
		return;
	}
	var diag = new Dialog("Diag1");
	diag.Width = 600;
	diag.Height = 380;
	diag.Title = "编辑用户"+arr[0];
	diag.URL = "admin/prepareEditAdmin.do?id="+arr[0];
	diag.onLoad = function(){
		//$DW.$("admin.name").focus();
	};
	diag.OKEvent = editSave;
	diag.show();
}

function editSave(){
	var dc = $DW.Form.getData("form2");
	if($DW.Verify.hasError()){
	  return;
    }
    if ($DW.$V("confirmPassword") != $DW.$V("admin.password")){
	   Dialog.alert("两次输入密码不相同，请重新输入",function(){
	       $DW.$S("admin.password","");
		   $DW.$S("confirmPassword","");
		   return;
	   });
	   return;
	}
	Server.sendRequest("admin/editAdmin.do",dc,function(response){
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
	<body style="background-color: #DFE6F8;">
    <div class="box01"  align="center"><span align="left">&nbsp;</span> <span class="tit" style="font-size: 20px">用户管理</span></div>
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
				<td width="4%" align="center" ztype="RowNo">&nbsp;<b>序号</b></td>
				<td width="3%" align="center" ztype="selector" field="id">&nbsp;</td>
				<td width="9%">&nbsp;<b>编号</b></td>
                <td width="9%">&nbsp;<b>密码</b></td>
				<td width="9%">&nbsp;<b>姓名</b></td>
				<td width="9%">&nbsp;<b>状态</b></td>
				<td width="9%">&nbsp;<b>所属角色</b></td>
				<td width="9%">&nbsp;<b>联系电话</b></td>
				<td width="12%">&nbsp;<b>创建时间</b></td>
				<td width="17%">&nbsp;<b>备注</b></td>
			</tr>
			<tr >
				<td align="center">&nbsp;</td>
				<td align="center">&nbsp;</td>
				<td>&nbsp;${username}</td>
                <td>&nbsp;******</td>
				<td>&nbsp;${name}</td>
				<td>&nbsp;${status}</td>
				<td>&nbsp;${roleStr}</td>		
				<td>&nbsp;${phone}</td>	
				<td>&nbsp;${createTime}</td>	
				<td>&nbsp;${remark}</td>		
			</tr>
			<tr ztype="pagebar" align="left" height="30px" style="background-color: #D3E1F1;">
                <td colspan="7" align="left" height="30px">${PageBar}</td>
            </tr>
        </table>
    </sw:datagrid>
	</body>
	</html>
</sw:init>
