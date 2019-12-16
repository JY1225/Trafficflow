<%@page contentType="text/html;charset=GBK" language="java"%>

<%@include file="/frame/Init.jsp"%>
<html>
<head>
<meta http-equiv="X-UA-Compatible" content="IE=EmulateIE7">
<title></title>
<sw:cssjs/>
<meta http-equiv="Content-Type" content="text/html; charset=gbk">
</head>
<body style="background-color: #DFE6F8">
  <table width="100%" height="100%" border="0">
  <form id="FChangePassword">
  <tr>
    <td valign="middle" style="text-align:center"><table width="340" >
      <tr>
        <td width="140" align="right">
          旧密码：</td>
        <td width="250" align="left"><input name="oldPassword"  type="password" value="" class="input1" id="oldPassword"  verify="NotNull" /></td>
      </tr>
      <tr >
        <td align="right">
         新密码：</td>
        <td align="left"><input name="password" type="password" class="input1" id="password" verify="NotNull" /></td>
      </tr>
      <tr >
        <td align="right">
          重复新密码：</td>
        <td align="left"><input name="ConfirmPassword" type="password" class="input1" id="ConfirmPassword" verify="NotNull&&两次输入的密码不一致|Script=$V('ConfirmPassword')==$V('password')" /></td>
      </tr>

    </table></td>
  </tr>
  </form>
</table>

</body>
</html>