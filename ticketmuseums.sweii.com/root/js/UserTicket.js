window.onload=function(){
	$("name1").focus();
}

//添加票
var userTicketMap=new Hash();
var i=0;
var ticketEndTime="";
function addUserTicket(number,time){
	var row=$('rows0');
	if(row==null){// 父窗口
		contentFrame.window.subAddUserTicket(number,time);
	}else{
		subAddUserTicket(number,time);
	}
}

function subAddUserTicket(number,time){
	var ticketSize=parseInt($('rows0').size);
	
    var index=0;
    var price=0;    
    for(var i=0;i<ticketSize;i++){
    	if($('check'+i).checked){
    		index=i;    		
    		break;
    	}
    }
    var numbers=userTicketMap.getItem("numbers");
    if(numbers!=null&&numbers.indexOf(number)>-1){
    	try{
    		Dialog.getInstance("_DialogAlert" + (Dialog.AlertNo-1)).close();
    	}catch(e){};
    	Dialog.alert("该卡已在会员资料中!");
    	return true;
    }
    var  size=parseInt($('size'+index).innerText);
	$S('number1',number);
	$S('endTime1',time);
	$('name1').readOnly=false;
	$('sex1').disabled=false;
	$('phone1').readOnly=false;
	$('personNo1').readOnly=false;
    
    if(numbers==null||numbers.length==0){
    	numbers=number;
    }else{
    	numbers=numbers+","+number;
    }
    userTicketMap.add("numbers",numbers);
    setAbled('submitButton');    
    setAbled('clearButton');
}
function checkTotal(){
	var value=$V("total");
	if(value.length>0){
		 if (!isNumber(value)) {
			 Dialog.alert("请输入数字!",function(){
				 $('total').focus();
					var r = $('total').createTextRange(); 
					r.moveStart('character', $('total').value.length); 
					r.collapse(false); 
					r.select();
			 });
			 return;
		 }
		var total=parseInt($V("total"));
		var shouldTotal=parseInt($V("shouldTotal"));
		$S('returnTotal',(total-shouldTotal));
	}else{
		$S('returnTotal','');
	}
	cardNumber="";	
}

function sumbitUserTicket(){
	var total=$V("total");
	var total=parseInt(total);
	var shouldTotal=parseInt($V("shouldTotal"));
	if(total<shouldTotal){
		Dialog.alert("收款金额必须大于应收金额!",function(){
			$('total').focus();
			var r = $('total').createTextRange(); 
			r.moveStart('character', $('total').value.length); 
			r.collapse(false); 
			r.select();		
		});
		return;
	}
	var index=0;
	var ticketSize=parseInt($('rows0').size);
    for(var i=0;i<ticketSize;i++){
    	if($('check'+i).checked){
    		index=i;    		
    		break;
    	}
    }
    var  size=parseInt($('size'+index).innerText);
    var dc=new DataCollection();
    dc.add('cardNumber',$V('number1'));
	dc.add('name',$V('name1'));
	dc.add('sex',$V('sex1'));
	dc.add('phone',$V('phone1'));
	dc.add('personNo',$V('personNo1'));
	var name=$V('name1');
    var id=$('rows'+index).ticketId;
	dc.add('id',id);
	setDisabled('submitButton');
	Server.sendRequest("ticket/addUserTicket.do",dc,function(response){
		if(response.status==1){//有效
			$S('userSize',response.userSize);
			$S('totalSize',response.total);
			//printTicket(response);
			clearUserTicket();
			Dialog.alert("办理会员卡成功!",function(){
				 var team= $("teamSize");
				   var user= $("userSize");
				   var common= $("commonSize");
				   alert(parseInt(common.value)+parseInt(user.value)+parseInt(team.value));
				   $S("totalSize",parseInt(common.value)+parseInt(user.value)+parseInt(team.value));
				$("name1").focus();
			});
		}else{//无效
			clearUserTicket();
			Dialog.alert(response.message,function(){
				$("name1").focus();
			});
		}
	},'json');
}
function clearUserTicket(){
	userTicketMap.clear();
	var ticketSize=parseInt($('rows0').size);
	
	$('name1').readOnly=true;
	$('phone1').readOnly=true;
	$('personNo1').readOnly=true;
	$('sex1').disabled=true;
	$S('number1',''); 
	$S('endTime1','');
	$S('sex1','男');
	$S('phone1','');
	$S('name1','');
	$S('personNo1','');
	$S('photo1','');
	if(ticketSize>=2){
		$('name2').readOnly=true;
		$('phone2').readOnly=true;
		$('personNo2').readOnly=true;
		$('sex2').disabled=true;
		$S('number2','');
		$S('endTime2','');
		$S('sex2','男');
		$S('phone2','');
		$S('name2','');
		$S('personNo2','');
		$S('photo2','');
	}
	if(ticketSize==3){
		$('name3').readOnly=true;
		$('phone3').readOnly=true;
		$('personNo3').readOnly=true;
		$('sex3').disabled=true;
		$S('number3','');
		$S('endTime3','');
		$S('sex3','男');
		$S('phone3','');
		$S('name3','');
		$S('personNo3','');
		$S('photo3','');
	}
    $S('total',$V('shouldTotal'));
    $S('returnTotal',"0");
    setDisabled('submitButton');
    setDisabled('clearButton');
}
function selectTicket(tr,index){
    var size=parseInt(tr.size);
    for(var i=0;i<size;i++){
        $('rows'+i).style.backgroundColor="#FFFFFF";
        $('rows'+i).style.fontWeight='';
        $('check'+i).checked=false;
    }
    $('rows'+index).style.backgroundColor="#61A4E4";
    $('rows'+index).style.fontWeight='bold';
    $('check'+index).checked=true;
    var userSize=parseInt($('size'+index).innerText);
    if(userSize==1){
    	$('user2').style.display="none";
    	$('user3').style.display="none";
    	var numbers=userTicketMap.getItem("numbers");    
    	var number=$V('number2');
    	if(number!=null&&number.length>0){
    		numbers=numbers.replace(","+number,"");
    	}
    	userTicketMap.add("numbers",numbers);
    	$('name2').readOnly=true;
		$('phone2').readOnly=true;
		$('personNo2').readOnly=true;
		$('sex2').disabled=true;
		$('photoTd2').innerHTML="点击选择照片";
		
		$S('number2','');
		$S('endTime2','');
		$S('sex2','男');
		$S('phone2','');
		$S('name2','');
		$S('personNo2','');
		$S('photo2','');
		$('name3').readOnly=true;
		$('phone3').readOnly=true;
		$('personNo3').readOnly=true;
		$('sex3').disabled=true;
		$('photoTd3').innerHTML="点击选择照片";	
    	number=$V('number3');
    	if(number!=null&&number.length>0){
    		numbers=numbers.replace(","+number,"");
    	}
    	userTicketMap.add("numbers",numbers);
		$S('number3','');
		$S('endTime3','');
		$S('sex3','男');
		$S('phone3','');
		$S('name3','');
		$S('personNo3','');
		$S('photo3','');
    }else if(userSize==2){
    	$('user2').style.display="";
    	$('user3').style.display="none";
    	$('name3').readOnly=true;
		$('phone3').readOnly=true;
		$('personNo3').readOnly=true;
		$('sex3').disabled=true;
		$('photoTd3').innerHTML="点击选择照片";
		var numbers=userTicketMap.getItem("numbers");    	
    	var number=$V('number3');
    	if(number!=null&&number.length>0){
    		numbers=numbers.replace(","+number,"");
    	}
    	userTicketMap.add("numbers",numbers);
    	
		$S('number3','');
		$S('endTime3','');
		$S('sex3','男');
		$S('phone3','');
		$S('name3','');
		$S('personNo3','');
		$S('photo3','');
    }else if(userSize==3){
    	$('user2').style.display="";
    	$('user3').style.display="";
    }
    var price=parseInt($('price'+index).innerText);
    var prePriceTotal=parseInt($('prePrice'+index).innerText);
    $S('prePriceTotal',prePriceTotal);
    $S('sizeTotal',1);
    $S('priceTotal',price);
    $S('shouldTotal',price+prePriceTotal);
    $S('total',price+prePriceTotal);
    ticketTypeId=$("rows"+index).ticketId;
    parent.ticketTypeId=$("rows"+index).ticketId;
}
function showImage(image,index){
	var img="<img border='0' width='120' height='160' src='"+image+"'/>"
	$('photoTd'+index).innerHTML=img;
	$S('photo'+index,image);
}
function setDisabled(id){
	$(id).className='da-button gray large';
	$(id).onmouseover='';
	$(id).onmouseout='';
	$(id).style.cursor='';
	$(id).disabled=true;
}
function setAbled(id){
	$(id).className='da-button blue large';
	$(id).onmouseover="this.className='da-button red large";
	$(id).onmouseout="this.className='da-button blue large";
	$(id).style.cursor='hand';
	$(id).disabled=false;
}

function printTicket(user){
	try{
	LODOP=getLodop(document.getElementById('LODOP_OB'),document.getElementById('LODOP_EM'));  
	LODOP.PRINT_INIT("打印票据");
	LODOP.SET_PRINT_STYLE("FontSize",8);
	var top=80;
	LODOP.ADD_PRINT_TEXT(top+25,20,350,25,"梦幻欢乐世界(会员卡)");
	top=105;
	LODOP.ADD_PRINT_TEXT(top+25,20,349,25,"会员姓名："+user.user1.name);
	LODOP.ADD_PRINT_TEXT(top+45,20,350,25,"卡   号："+user.user1.number);
	LODOP.ADD_PRINT_TEXT(top+65,20,350,25,"性   别："+user.user1.sex);
	LODOP.ADD_PRINT_TEXT(top+85,20,350,25,"电   话："+user.user1.phone);
	LODOP.ADD_PRINT_TEXT(top+105,20,350,25,"证件号码："+user.user1.personNo);	
	var h=105;
	if(user.size>=2){
		LODOP.ADD_PRINT_TEXT(top+125,20,349,25,"会员姓名："+user.user2.name);
		LODOP.ADD_PRINT_TEXT(top+145,20,350,25,"卡   号："+user.user2.number);
		LODOP.ADD_PRINT_TEXT(top+165,20,350,25,"性   别："+user.user2.sex);
		LODOP.ADD_PRINT_TEXT(top+185,20,350,25,"电   话："+user.user2.phone);
		LODOP.ADD_PRINT_TEXT(top+205,20,350,25,"证件号码："+user.user2.personNo);		
		h=205;
	}
	if(user.size==3){
		LODOP.ADD_PRINT_TEXT(top+225,20,349,25,"会员姓名："+user.user3.name);
		LODOP.ADD_PRINT_TEXT(top+245,20,350,25,"卡   号："+user.user3.number);
		LODOP.ADD_PRINT_TEXT(top+265,20,350,25,"性   别："+user.user3.sex);
		LODOP.ADD_PRINT_TEXT(top+285,20,350,25,"电   话："+user.user3.phone);
		LODOP.ADD_PRINT_TEXT(top+305,20,350,25,"证件号码："+user.user3.personNo);		
		h=305;
	}
	LODOP.ADD_PRINT_TEXT(top+h+25,20,350,25,"票种名称："+user.ticketName);
	LODOP.ADD_PRINT_TEXT(top+h+45,20,350,25,"套票名称："+user.linkTicketName);
	LODOP.ADD_PRINT_TEXT(top+h+65,20,350,25,"票价金额："+user.price+"元");
	LODOP.ADD_PRINT_TEXT(top+h+85,20,350,25,"票有效期："+user.endTime);
	LODOP.ADD_PRINT_TEXT(top+h+105,20,350,25,"购票时间："+user.saleTime);
	var top=top+h+105+25;
	LODOP.ADD_PRINT_TEXT(top,20,350,25,"==============================");
	LODOP.ADD_PRINT_TEXT(top+20,20,350,25,"售票员编号       "+user.sellerName);
	LODOP.ADD_PRINT_TEXT(top+40,20,350,25,"合计            "+user.total+" 元");
	LODOP.SET_LICENSES("广州时为信息科技有限公司","864677580837475919278901905623","","");
	var flag=Cookies.getCookie('userTicket');
	if(flag=='true'){
		LODOP.PRINT();
		//LODOP.PREVIEW();
	}
	}catch(e){
		
	}
}

Page.onLoad(function(){
	var flag=Cookies.getCookie('userTicket');
	if(flag=='true'){
		$('printFlag').checked=true;
	}else{
		$('printFlag').checked=false;
	}
});
function setPrintFlag(){
	if($('printFlag').checked){
		Cookies.addCookie('userTicket',"true");
	}else{
		Cookies.addCookie('userTicket',"false");
	}
}