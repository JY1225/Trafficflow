//添加票
var returnPriceMap=new Hash();
var i=0;
function addInDate(number,size,type,message){
	var row=$('InSize');
	if(row==null){// 父窗口
		contentFrame.window.subAddInDate(number,size,type,message);
	}else{
		subAddInDate(number,size,type,message);
	}
}

var list=null;
function subAddInDate(number,size,type,message){
	if (message!=null) {
			Dialog.alert(message,function(){
				$("InSize").focus();
			});
		return;
	}
	if (type==2) {
		var numbers=returnPriceMap.getItem("numbers");
		if(numbers==null||numbers.length==0){
			numbers=number;
		}else{
			numbers=numbers+","+number;
		}
		var ns=numbers.split(",");
		var info="";
		returnPriceMap.add("numbers",numbers);
		for(var i=0;i<ns.length;i++){
			info=info+ns[i];
			if(i!=ns.length-1){
				info=info+"\r\n";
			}
		}
		$('numbers').value=info;
		$S("InSize",size);
	}else if(type==3){
		 var numbers=returnPriceMap.getItem("number");
		  if(numbers==null||numbers.length==0){
		    	numbers=number;
		    }else{
		    	numbers=numbers+","+number;
		    }
		  var ns=numbers.split(",");
		  var info="";
		  returnPriceMap.add("number",numbers);
		  for(var i=0;i<ns.length;i++){
		    	info=info+ns[i];
		    	if(i!=ns.length-1){
		    		info=info+"\r\n";
		    	}
		    }
		$('teamNumbers').value=info;
		$S("InTeamSize",size);
	}else{
		 var numbers=returnPriceMap.getItem("numberUser");
		  if(numbers==null||numbers.length==0){
		    	numbers=number;
		    }else{
		    	numbers=numbers+","+number;
		    }
		  var ns=numbers.split(",");
		  var info="";
		  returnPriceMap.add("numberUser",numbers);
		  for(var i=0;i<ns.length;i++){
		    	info=info+ns[i];
		    	if(i!=ns.length-1){
		    		info=info+"\r\n";
		    	}
		    }
		$('userNumbers').value=info;
		$S("InUserSize",size);
	}
	 
}

function sumbitReturnPrice(){
	var ids=returnPriceMap.getItem("ids");
	if(ids==null||ids.length==0){
		return;
	}
	var dc=new DataCollection();
	dc.add('ids',ids);
	dc.add('price',$V('prePrice'));
	Server.sendRequest("ticket/returnPrice.do",dc,function(response){
		if(response.status==1){//有效
			Dialog.alert(response.message,function(){
				clearReturnPrice();
			});
		}else{//无效
			Dialog.alert(response.message);
		}
	},'json');
}
function clearReturnPrice(){
	returnPriceMap.clear();
	$S('number','');
    $S('price','');
    $S('saleTime','');
    $S('ticketName','');
    $S('name','');
    $S('endTime','');
    $S('prePrice','');
    $S('returnPrice','')
    $S('returnTotal','');
    $S('returnSize','');
    $('numbers').value='';
    setDisabled('submitButton');
    setDisabled('clearButton');
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

