var SelectDialog = {
	selectStudent : function(myFun) {
		var diag = new Dialog("DialogStudent");
		diag.Width = 685;
		diag.Height = 397;
		diag.Title = "选择学生";
		diag.URL = "common/selectStudentPage.do?student.status=0&multiSelect=false&selectSize=15&orderField=grade.id&order=asc";
		diag.OKEvent = function() {// 点击确定调用方法
			var dataTable = $DW.DataGrid.getSelectedData("dg1");
			if (dataTable.getRowCount() == 0) {
				Dialog.alert("请选择一位幼儿！");
				return;
			}
			myFun(dataTable);
			$D.close();// 关闭层
		}
		diag.show();
	}
}