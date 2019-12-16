<%@page contentType="text/html;charset=GBK" language="java"%>
<%@include file="/frame/Init.jsp"%>
<sw:init id="dg1">
    <!DOCTYPE html>
    <html xmlns="http://www.w3.org/1999/xhtml">
    <head>
    <meta http-equiv="X-UA-Compatible" content="IE=EmulateIE7">
    <meta http-equiv="Content-Type" content="text/html; charset=gb2312" />
    <title>模块管理</title>
    <link href="/style/style.css" rel="stylesheet" type="text/css" />
    <script src="/frame/js/Main.js"></script>
    <script>
function add(){
    var diag = new Dialog("Diag1");
    diag.Width = 400;
	diag.Height = 200;
    diag.Title = "新建"+this.document.title;
    diag.URL = "admin/prepareAddModule.do";
    diag.onLoad = function(){
       $DW.$("module.name").focus();
    };
    
    diag.OKEvent = addSave;
    diag.show();
}

function addSave(){
    var dc = $DW.Form.getData("form2");
    if($DW.Verify.hasError()){
      return;
     }
    var entryURL=dc.get('module.entryURL');
    entryURL=entryURL.replace(/&/g,'##');
    dc.add('module.entryURL',entryURL);
    Server.sendRequest("admin/addModule.do",dc,function(response){
        Dialog.alert(response.message,function(){
            if(response.status==1){
                $D.close();
                DataGrid.loadData('dg1');
            }
        }); 
    },'json');
}


function doSearch(){
    var name = "";
    if ($V("searchContent") != "请输入用户名或真实姓名") {
        name = $V("searchContent").trim();
    }
    DataGrid.setParam("dg1",Constant.PageIndex,0);
    DataGrid.setParam("dg1","title",name);
    DataGrid.loadData("dg1");
}

document.onkeydown = function(event){
    event = getEvent(event);
    if(event.keyCode==13){
        var ele = event.srcElement || event.target;
        if(ele.id == 'searchContent'||ele.id == 'Submibutton'){
            doSearch();
        }
    }
}

function delKeyWord() {
    if ($V("searchContent") == "请输入用户名或真实姓名") {
        $S("searchContent","");
    }
}

function edit(){
    var arr = DataGrid.getSelectedValue("dg1");
    if(!arr||arr.length==0){
        Dialog.alert("请先选择要编辑的模块！");
        return;
    }
    var diag = new Dialog("Diag1");
    diag.Width = 400;
    diag.Height = 200;
    diag.Title = "编辑模块";
    diag.URL = "admin/prepareEditModule.do?id="+arr[0];
    diag.onLoad = function(){
        $DW.$("module.name").focus();
    };
    diag.OKEvent = editSave;
    diag.show();
}

function editSave(){
    var dc = $DW.Form.getData("form2");
    if($DW.Verify.hasError()){
      return;
    }
    var entryURL=dc.get('module.entryURL');
    entryURL=entryURL.replace(/&/g,'##');
    dc.add('module.entryURL',entryURL);
    Server.sendRequest("admin/editModule.do",dc,function(response){
        Dialog.alert(response.message,function(){
            if(response.status==1){
                $D.close();
                DataGrid.loadData("dg1");
            }
        })
    },'json');
}
function delKeyWord() {
    if ($V("searchContent") == "请输入模块名称") {
        $S("searchContent","");
    }
}
function functionList(id,name){
    var diag = new Dialog("Diag1");
    diag.Width = 650;
    diag.Height =295;
    diag.Title = name+"的功能列表";
    diag.URL = "admin/queryFunction.do?moduleId="+id;
    diag.OKEvent = editSave;
    diag.show();
}
</script>
    </head>
    <body style="background-color: #DFE6F8;">
    <div class="box01"  align="center"><span align="left">&nbsp;</span> <span class="tit" style="font-size: 20px">模块管理</span></div>
<table class="tools" style="width:100%">
    <tr>
        <td>
        <sw:button limit="true" onClick="add();">新增</sw:button>
        <sw:button limit="true" onClick="edit();">修改</sw:button>
        </td>
    </tr>
</table>
    <sw:datagrid>
        <table class="table" cellpadding="0" cellspacing="0" style="table-layout: fixed">
            <tr ztype="head" class="tr">
                <td width="3%" align="center" ztype="RowNo">&nbsp;<b>序号</b></td>
                <td width="2%" align="center" ztype="selector" field="id">&nbsp;</td>
                <td width="15%">&nbsp;<b>模块名称</b></td>
                <td width="15%">&nbsp;<b>所属分类</b></td>
                <td width="45%">&nbsp;<b>模块链接</b></td>
                <td width="20%">&nbsp;<b>描述信息</b></td>
            </tr>
            <tr>
                <td align="center">&nbsp;</td>
				<td align="center">&nbsp;</td>
                <td><span class="fc_bl3"><a href="javascript:void(0);" onClick="functionList('${id}','${name}');">&nbsp;${name}</a></span></td>
                <td>&nbsp;${categoryName}</td>
                <td align="left">
                <div class="worddiv">&nbsp;${entryURL}</div>
                </td>
                <td>&nbsp;${description}</td>
            </tr>
            <tr ztype="pagebar" align="left" height="30px" style="background-color: #D3E1F1;">
                <td colspan="6" align="left" height="30px">${PageBar}</td>
            </tr>
        </table>
    </sw:datagrid>
    </body>
    </html>
</sw:init>
