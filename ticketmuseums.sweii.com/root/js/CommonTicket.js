//添加票
var ticketMap=new Hash();
var i=0;
function addTicket(number){
	var row=$('rows0');
	if(row==null){// 父窗口
		contentFrame.window.subAddCommonTicket(number);
	}else{
		subAddCommonTicket(number);
	}
}
function commonCloseTicket(){
	var row=$('rows0');
	if(row==null){// 父窗口
		var m = $E.getTopLevelWindow();
		if(m!=null&&m.$("_AlertBGDiv")==null){		
			if(!contentFrame.window.$('submitTicket').disabled){
				contentFrame.window.sumbitTicket();
			}
		}else{
		    contentFrame.window.closeD();
		}
	}else{		
		if(!$('submitTicket').disabled){
			sumbitTicket();
		}else{
			closeD();
		}
	}
}
/*
function addTicket(ticket){
	var size=parseInt(ticket.value);
	for(var i=0;i<size;i++){
		subAddTicket("10000"+i)
	}
}
*/
function subAddCommonTicket(number){
	var ticketSize=parseInt($('rows0').size);
	
    var index=0;
    var price=0;    
    for(var i=0;i<ticketSize;i++){
    	if($('check'+i).checked){
    		index=i;    		
    		break;
    	}
    }
    var numbers=ticketMap.getItem("numbers");
    if(numbers!=null&&numbers.indexOf(number)>-1){
    	try{
    		Dialog.getInstance("_DialogAlert" + (Dialog.AlertNo-1)).close();
    	}catch(e){};
    	Dialog.alert("该卡已在卡号列表中!");
    	return true;
    }
    if(numbers==null||numbers.length==0){
    	numbers=number;
    }else{
    	numbers=numbers+","+number;
    }
    ticketMap.add("numbers",numbers);
    var cards=ticketMap.getItem("number"+index);
    if(cards==null||cards.length==0){
    	cards=number;
    }else{
    	cards=cards+","+number;
    }
    ticketMap.add("number"+index,cards);
    var size=cards.split(",").length;
    var price=parseInt($('price'+index).innerText);
    var prePrice=parseInt($('prePrice'+index).innerText);
    $('size'+index).innerText=size;
    $('amount'+index).innerText=size*price+size*prePrice;
    var nums=cards.split(",");
    var numStr="";
    for(var i=0;i<nums.length;i++){
    	numStr+=nums[i];
    	if(i!=nums.length-1){
    		if(i%4==3){
    			numStr+="<br>";
    		}else{
    			numStr+=",";
    		}
    	}
    }
    $('number'+index).innerHTML=numStr;
    var prePriceTotal=0;
    var priceTotal=0;
    var total=0;
    var sizeTotal=0;
    var info = "";
    for(var i=0;i<ticketSize;i++){
    	 cards=ticketMap.getItem("number"+i);
    	 if(cards!=null&&cards.length>0){
	    	 var size=cards.split(",").length;
	    	 var price=parseInt($('price'+i).innerText)*size;
	    	 var prePrice=parseInt($('prePrice'+i).innerText)*size;
	    	 prePriceTotal=prePriceTotal+prePrice;
	    	 priceTotal=priceTotal+price;
	    	 total=total+price+prePrice;
	    	 sizeTotal=sizeTotal+size;
	    	 var ticketName=$('ticketName'+i).innerText;
	    	 info += ticketName+"数量【" + size + "】张\r\n";
    	 }
    }
    
    $S('prePriceTotal',prePriceTotal);
    $S('priceTotal',priceTotal);
    $S('total',total);
    $S('sizeTotal',sizeTotal);
    $S('shouldTotal',total);
    $S('returnTotal',"0");
    
	$('ticketInfo').value = info;
    if(sizeTotal>0){
    	setAbled('submitTicket');
    	setAbled('clearButton');
    }
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
		if($V("shouldTotal").length>0){
		   var shouldTotal=parseInt($V("shouldTotal"));
		   $S('returnTotal',(total-shouldTotal));
		}
	}else{
		$S('returnTotal','');
	}
	cardNumber="";	
}

function sumbitTicket(){
	var total=$V("total");
	if(total==null||total.length==0){
		Dialog.alert("卡号信息为空 ，请把卡片放到发卡器上读卡!");
		return;
	}
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
	var ticketSize=parseInt($('rows0').size);
	var ids="";
	var numbers="";
	for(var i=0;i<ticketSize;i++){
		var cards=ticketMap.getItem("number"+i);
		if(cards!=null&&cards.length>0){
			numbers=numbers+"|"+cards;
			ids=ids+","+$('rows'+i).ticketId;
		}
	}
	ids=ids.substring(1);
	numbers=numbers.substring(1);
	setDisabled('submitTicket');
	
	var dc=new DataCollection();
	dc.add('numbers',numbers);
	dc.add('ids',ids);
	Server.sendRequest("ticket/addTicket.do",dc,function(response){
		if(response.status==1){//有效
			$S('commonSize',response.commonSize);
			$S('totalSize',response.total);
			clearTicket();
			Dialog.alert("售票成功!",function(){});
		}else{//无效
			Dialog.alert(response.message);
		}
	},'json');
	
	
}
function clearTicket(){
	ticketMap.clear();
	var ticketSize=parseInt($('rows0').size);
	for(var i=0;i<ticketSize;i++){
		$('size'+i).innerText="0";
		$('amount'+i).innerText="0";
		$('number'+i).innerHTML="&nbsp;";
	}
	$S('prePriceTotal',"");
    $S('priceTotal',"");
    $S('total',"");
    $S('sizeTotal',"");
    $S('shouldTotal',"");
    $S('returnTotal',"");
    $('ticketInfo').value='';
    setDisabled('submitTicket');
    setDisabled('clearButton');
}
function closeD(){
	try{
		Dialog.getInstance("_DialogAlert" + (Dialog.AlertNo-1)).close();
	}catch(e){};
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
function printTicket(tickets,name,size,total){
	try{
	LODOP=getLodop(document.getElementById('LODOP_OB'),document.getElementById('LODOP_EM'));  
	LODOP.PRINT_INIT("打印票据");
	LODOP.SET_PRINT_STYLE("FontSize",8);
	var top=85;
	LODOP.ADD_PRINT_TEXT(top+25,20,350,25,"梦幻欢乐世界(散客票)");
	top=115;
	for(var i=0;i<tickets.length;i++){
		var p=top+125*i;	
		LODOP.ADD_PRINT_TEXT(p+25,20,349,25,"票    号："+tickets[i].number);
		LODOP.ADD_PRINT_TEXT(p+45,20,350,25,"票种名称："+tickets[i].name);
		LODOP.ADD_PRINT_TEXT(p+65,20,350,25,"套票名称："+tickets[i].linkName);
		LODOP.ADD_PRINT_TEXT(p+85,20,350,25,"购票金额："+tickets[i].price+"元");
		LODOP.ADD_PRINT_TEXT(p+105,20,350,25,"票有效期："+tickets[i].endTime);
		LODOP.ADD_PRINT_TEXT(p+125,20,350,25,"购票时间："+tickets[i].saleTime);
		top=top+6;
	}
	var top=top+125*tickets.length+6+25;
	LODOP.ADD_PRINT_TEXT(top,20,350,25,"==============================");
	LODOP.ADD_PRINT_TEXT(top+20,20,350,25,"售票员编号       "+name);
	LODOP.ADD_PRINT_TEXT(top+40,20,350,25,"票数            "+size+"张");
	LODOP.ADD_PRINT_TEXT(top+60,20,350,25,"合计            "+total+"元");
	LODOP.SET_LICENSES("广州时为信息科技有限公司","864677580837475919278901905623","","");
	var flag=Cookies.getCookie('commonTicket');
	if(flag=='true'){
		//LODOP.PRINT();
		LODOP.PREVIEW();
	}
	}catch(e){
		
	}
}
Page.onLoad(function(){
	var flag=Cookies.getCookie('commonTicket');
	if(flag=='true'){
		$('printFlag').checked=true;
	}else{
		$('printFlag').checked=false;
	}
});
function setPrintFlag(){
	if($('printFlag').checked){
		Cookies.addCookie('commonTicket',"true");
	}else{
		Cookies.addCookie('commonTicket',"false");
	}
}