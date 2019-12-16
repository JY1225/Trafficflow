function repairTicket(number) {
	var info = $('repair');
	if (info == null) {// 父窗口
		contentFrame.window.repairSubTicket(number);
	} else {
		repairSubTicket(number);
	}
}
function repairSubTicket(number){
	$S('number',number);
	setAbled('clearButton');
	if($V('id').length>0){
		setAbled('submitButton');
	}
}

function searchUser(){
	var personNo=$V('personNo');
	var name=$V('name');
	var phone=$V('phone');
	if(personNo==''&&name==''&&phone==''){
		Dialog.alert("请输入查询条件!",function(){
			$('personNo').focus();
		});
		return;
	}
	var dc=new DataCollection();
	
	if(personNo.length>0){
		dc.add('user.personNo',personNo);
	}else{
		dc.add('user.personNo','');
	}
	if(name.length>0){
		dc.add('user.name',name);
	}else{
		dc.add('user.name','');
	}
	if(phone.length>0){
		dc.add('user.phone',phone);
	}else{
		dc.add('user.phone','');
	}
	Server.sendRequest("ticket/searchUser.do",dc,function(response){
		if(response.status==1){//有效
			var user=response.user;
			$S('id',user.id);
		    $S('name',user.name);
		    $S('sex',user.sex);
		    $S('phone',user.phone);
		    $S('personNo',user.personNo);
		    $S('endTime',user.endTime);
		    $S('price',user.price);
		    $S('repairPrice',user.repairPrice);
		    $S('ticketName',user.ticketName);
		    $S('oldNumber',user.number);
		    $S('saleTime',user.createTime);
		    if(user.photo.length>0){
		    	var img="<img border='0' width='120' height='160' src='"+user.photo+"'/>"
		    	$('photo').innerHTML=img;
		    }
		    setAbled('clearButton');
		    if($V('number').length>0){
		    	setAbled('submitButton');				
			}
		    if(personNo.length>0){
				DataGrid.setParam('dg1','user.personNo',personNo);
			}else{
				DataGrid.setParam('dg1','user.personNo','');
			}
			if(name.length>0){
				DataGrid.setParam('dg1','user.name',name);
			}else{
				DataGrid.setParam('dg1','user.name','');
			}
			if(phone.length>0){
				DataGrid.setParam('dg1','user.phone',phone);
			}else{
				DataGrid.setParam('dg1','user.phone','');
			}
		    DataGrid.loadData('dg1',function(){
		    	if($('rowId1')!=null){
		    		$('rowId1').click();
		    	}
		    });
		}else{//无效
			Dialog.alert(response.message);
		}
	},'json');
}


function sumbitRepair(){
	var dc=new DataCollection();
	dc.add('id',$V('id'));
	dc.add('price',$V('repairPrice'));
	dc.add('number',$V('number'));
	dc.add('type',1);
	Server.sendRequest("ticket/repairTicket.do",dc,function(response){
		if(response.status==1){//有效
			Dialog.alert(response.message,function(){
				clearRepair();
			});
		}else{//无效
			Dialog.alert(response.message);
		}
	},'json');
}
function clearRepair(){
	$S('id','');
    $S('name','');
    $S('sex','');
    $S('phone','');
    $S('personNo','');
    $S('endTime','');
    $S('price','');
    $S('ticketName','');
    $S('saleTime','');
    $S('repairPrice','');
    $S('oldNumber','');
    $S('number','');
    $('photo').innerHTML='相片';
    setDisabled('submitButton');
    setDisabled('clearButton');
	DataGrid.setParam('dg1','user.personNo','');
	DataGrid.setParam('dg1','user.name','');
	DataGrid.setParam('dg1','user.phone','');
    DataGrid.loadData('dg1');
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
function checkPrice(){
	var value=$V('repairPrice');
	if (!isNumber(value)) {
		Dialog.alert("请输入数字金额。",function(){
			var r = $('repairPrice').createTextRange(); 
			r.moveStart('character', $('repairPrice').value.length); 
			r.collapse(false); 
			r.select();
		});
	}
}