<%@page contentType="text/html;charset=GBK" language="java"%>

<%@include file="/frame/Init.jsp"%>

<html>
<head>
<meta http-equiv="X-UA-Compatible" content="IE=EmulateIE7">
<title></title>
<sw:cssjs/>
<meta http-equiv="Content-Type" content="text/html; charset=gbk">
</head>
<body class="dialogBody">
<iframe src="javascript:void(0);" name="targetFrame"
		width="0" height="0" frameborder="0"></iframe>
<form name="form2" enctype="multipart/form-data" target="targetFrame"
		action="/ticket/importCard.do" method="POST"
		onSubmit="return check();">
		</br></br></br>
<table width="100%" cellpadding="2" cellspacing="0">	
    <tr>
		<td width="20%" align="right" class="tdgrey1">卡号文件：</td>
		<td width="80%" class="tdgrey2"><input type="file" id="file"
			name="file" style="width: 220px;" class="input1" verify="卡号文件|NotNull"/></td>
	</tr> 
</table>
</form>
</body>
</html>