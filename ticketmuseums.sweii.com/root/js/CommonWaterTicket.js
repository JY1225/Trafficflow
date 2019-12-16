//添加票
var ticketMap=new Hash();
var i=0;
function addWaterTicket(number){
	var row=$('rows0');
	if(row==null){// 父窗口
		contentFrame.window.subAddWaterTicket(number);
	}else{
		subAddWaterTicket(number);
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

function addTicket(ticket){
	var size=parseInt(ticket.value);
	for(var i=0;i<size;i++){
		subAddTicket("10000"+i)
	}
}

function  showMessage(number,message){
	if(message!=0){
		Dialog.alert(message,function(){
			$("ticketInfo").focus();
		});
	return;
	}
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
    	Dialog.alert("该卡已在卡号列表中!",function(){
			$("ticketInfo").focus();
		});
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
    $('size'+index).innerText=size;
    $('amount'+index).innerText=size*price;
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
	    	 prePriceTotal=prePriceTotal;
	    	 priceTotal=priceTotal+price;
	    	 total=total+price;
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
	$('ticketInfo').focus();
    if(sizeTotal>0){
    	setAbled('submitTicket');
    	setAbled('clearButton');
    }
}
function checkTotal(){
	var value=$V("total");
	if(value.length>0){
		 if (!isNumber(value)) {
			 setDisabled($("submitTicket"));
			 setDisabled($("clearButton"));
			 return;
		 }
		var total=parseInt($V("total"));
		if($V("shouldTotal").length>0){
		   var shouldTotal=parseInt($V("shouldTotal"));
		   $S('returnTotal',(total-shouldTotal));
		 if (total-shouldTotal>=0) {
			 setAbled($("submitTicket"));
			 setAbled($("clearButton"));
			 }
		}
	}else{
		$S('returnTotal','');
	}
	cardNumber="";	
}

var cardNumbers="";
document.onkeypress=function(){
    var e = window.event;   
    if (e.keyCode>=48&&e.keyCode<=57) {
    	 cardNumbers+=(parseInt(e.keyCode)-48);
	}else if(e.keyCode>=65&&e.keyCode<=90){
		cardNumbers+=String.fromCharCode(e.keyCode);
	}else if(e.keyCode==13){
		$("cardNumber","");
		$S("cardNumber",cardNumbers);
		sumbitTicket();
		cardNumbers="";
		$("shouldTotal").focus();
	}
}
function sumbitTicket(){
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
	setDisabled('submitTicket');
	var dc=new DataCollection();
	var id=$("hiddenType").value;
	var colnum=$("colnumType").value;
	var cardNumber=$("cardNumber").value
	dc.add("cardNumber",$("cardNumber").value);
	dc.add("price",$("priceTotal").value);
	dc.add("hiddenType",id);
	Server.sendRequest("ticket/addSaleTicket.do",dc,function(response){
		if (response.message!=null) {
			clearTicket();
			$S("status",response.message);
			selectTicket(response.ticketSize,colnum,id);
			return;
		}else{
		if(response.status==1){//有效
			$S("cardNumber",cardNumber);
			$S('totalSize',response.totalSize);
			$S('status',"出票成功");
			clearTicket();
			selectTicket(response.ticketSize,colnum,id);
		}else{//无效
			selectTicket(response.ticketSize,colnum,id);
			$S('cardNumber',"");
			clearTicket();
		}
		}
	},'json');
	
	
}
function clearTicket(){
	ticketMap.clear();
	var ticketSize=parseInt($('rows0').size);
	for(var i=0;i<ticketSize;i++){
		$('amount'+i).innerText="0";
	}
	$S('name',"");
    $S('sex',"");
    $S('address',"");
    $S('price',"");
    $S('total',"");
    $S('priceTotal',"");
    $S('shouldTotal',"");
    $S('returnTotal',"");
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
