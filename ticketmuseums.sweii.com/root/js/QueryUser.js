function queryUser(user) {
	var info = $('queryUser');
	if (info == null) {// ∏∏¥∞ø⁄
		contentFrame.window.querySubUser(user);
	} else {
		querySubUser(user);
	}
}
function querySubUser(user){
	
    $S('name',user.name);
    $S('number',user.number);
    $S('sex',user.sex);
    $S('phone',user.phone);
    $S('personNo',user.personNo);
    $S('endTime',user.endTime);
    $S('price',user.price);
    $S('ticketName',user.ticketName);
    $S('saleTime',user.createTime);
    if(user.photo.length>0){
    	var img="<img border='0' width='120' height='160' src='"+user.photo+"'/>"
    	$('photo').innerHTML=img;
    }else{
    	$('photo').innerHTML='œ‡∆¨';
    }
    
    setAbled('clearButton');
}
function clearUserActive(){
	$S('id','');
    $S('name','');
    $S('number','');
    $S('sex','');
    $S('phone','');
    $S('personNo','');
    $S('endTime','');
    $S('price','');
    $S('ticketName','');
    $S('linkTicketName','');
    $S('saleTime','');
    $S('icStatus','');
    $S('activeTimes','');
    $('photo').innerHTML='œ‡∆¨';
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
