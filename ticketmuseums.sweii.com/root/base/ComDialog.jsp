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
          串口：</td>
        <td width="250" align="left">
        
        <select id="com" style="width:80px">
        <option value="">请选择</option>
        <option value="COM1">COM1</option>
        <option value="COM2">COM2</option>
        <option value="COM3">COM3</option>
        <option value="COM4">COM4</option>
        <option value="COM5">COM5</option>
        <option value="COM6">COM6</option>
        <option value="COM7">COM7</option>
        <option value="COM8">COM8</option>
        <option value="COM9">COM9</option>
        <option value="COM10">COM10</option>
        <option value="COM11">COM11</option>
        <option value="COM12">COM12</option>
        <option value="COM13">COM13</option>
        <option value="COM14">COM14</option>
        <option value="COM15">COM15</option>
        <option value="COM16">COM16</option>
        <option value="COM17">COM17</option>
        <option value="COM18">COM18</option>
        <option value="COM19">COM19</option>
        <option value="COM20">COM20</option>
        </select>        
        </td>
      </tr>
      <tr >
        <td align="right">
         波特率：</td>
        <td align="left">
        <select id="comBit"  style="width:80px">
        <option value="">请选择</option>
        <option value="9600">9600</option>
        <option value="19200">19200</option>
        <option value="38400">38400</option>
        <option value="57600">57600</option>
        <option value="57600">84000</option>
        <option value="115200">115200</option>
        <option value="230400">230400</option>
        </select>
        </td>
      </tr>
      <tr>
 <td align="right">
         是否打开串口：</td>
        <td align="left">
        <select id="comOpen"  style="width:80px">
        <option value="1">是</option>
        <option value="0">否</option>
        </select>
        </td>
      </tr>
    </table></td>
  </tr>
  </form>
</table>

</body>
</html>