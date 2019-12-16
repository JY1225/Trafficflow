<%@page contentType="text/html;charset=GBK" language="java"%>

<%@include file="/frame/Init.jsp"%>
<html>
<head>
<meta http-equiv="X-UA-Compatible" content="IE=EmulateIE7">
<title></title>
<link href="/frame/css/frame.css" rel="stylesheet" type="text/css" />
<script src="/frame/js/Main.js"></script>
<meta http-equiv="Content-Type" content="text/html; charset=gbk">
</head>
<body class="dialogBody">
<form id="form2">
<table width="378" cellpadding="2" cellspacing="0">
    <tr>
      <td height="10">&nbsp;</td>
      <td></td>
    </tr>
    <tr>
      <td width="101" height="10"></td>
      <td width="267"></td>
    </tr>
    <tr>
      <td align="right" >上级机构：</td>
      <td height="30"><sw:select id="parentId" name="parentId" reqAttr="combox" style="width:200px;"> </sw:select></td>
    </tr>
    <tr>
      <td align="right">机构名称：</td>
      <td height="30"><input id="name" name="name"  type="text" value="" class="input1" verify="机构名称|NotNull" size=36 /></td>
    </tr>
    <tr>
      <td align="right">备　　注：</td>
      <td height="30"><input id="memo" name="memo"  type="text" value="" class="input1" size=36 /></td>
    </tr>
</table>
  </form>
</body>
</html>