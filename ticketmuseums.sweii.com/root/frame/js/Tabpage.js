var Tab = {};

Tab.onTabMouseOver = function(ele){
	if(ele.className=="divtab"){
		ele.className="divtabHover";
	}
}

Tab.onTabMouseOut = function(ele){
	if(ele.className=="divtabHover"){
		ele.className="divtab";
	}
}

Tab.onTabClick = function(ele){
	var arr = $T("div",ele.parentElement);
	var len = arr.length;
	for(var i=0;i<len;i++){
		var c = arr[i];
		var cn = c.className;
		if(cn=="divtabCurrent"){
			c.className = "divtab";
			c.style.zIndex=""+(len-i)+"";
		}
	}
	ele.className="divtabCurrent";
	ele.style.zIndex="33";
}

Tab.initTab = function(ele){
	var arr = $T("div",ele.parentElement);
	var arrleng=arr.length;
	for(var i=0;i<arrleng;i++){
		var cn = arr[i].className;
		if(cn=="divtab" || cn=="divtabDisabled"){
			arr[i].style.zIndex=""+(arrleng-i)+"";
		}else if(cn=="divtabCurrent"){
			arr[i].style.zIndex="33";
		}
	}
}

Tab.parentpadding = function(ele){
	if(ele.parentElement.style.paddingLeft!="30px"){
		ele.parentElement.style.paddingLeft="30px";
	}
}
Tab.setDivtabWidth = function(tab){//用于调整标签按钮宽度
	tab = $(tab);
	var noTitWidth=50;//标签宽度-文字宽度=noTitWidth
	var minSpanWidth=6;//最小文本显示宽度
	if(Application.isHMenu == true){
		var allTabWidth=0;//所有横向标签相加宽度
		var tabArr = tab.$T("div");
		var tabArrLen=tabArr.length;
		var cw=document.compatMode == "BackCompat"?document.body.clientWidth:document.documentElement.clientWidth;
		for(var i=0; i<tabArrLen;i++){
				allTabWidth+=tabArr[i].clientWidth;
		}
		//alert("标签个数"+tabArrLen+" 标签总宽"+allTabWidth+" 文档可视宽度"+document.body.clientWidth)
		if (allTabWidth+50 > cw){
			if(cw-120-tabArrLen*noTitWidth>0){
				minSpanWidth=Math.ceil((cw-120-tabArrLen*noTitWidth)/tabArrLen);
			}
			for(var i=0; i<tabArrLen;i++){
				$T("span",tabArr[i])[0].style.cssText="width:"+minSpanWidth+"px;";
			}
		}else{
			for(var i=0; i<tabArrLen;i++){
				$T("span",tabArr[i])[0].style.cssText="";
			}
		}
	}
}

Tab.onChildTabMouseOver = function(ele){
	if(ele.className=="divchildtab")	ele.className="divchildtabHover"
}

Tab.onChildTabMouseOut = function(ele){
	if(ele.className=="divchildtabHover")	ele.className="divchildtab"
}

Tab.onChildTabClick = function(ele){
	ele = $(ele);
	var arr = $T("div",ele.parentElement);
	var lastHeight;
	for(var i=0;i<arr.length;i++){
		var t = $(arr[i]);
		var cn = t.className;
		var f = $("_ChildTabFrame_"+t.$A("id"));
		if(cn=="divchildtabCurrent"){
			t.className = "divchildtab"
			lastHeight = f.getDimensions().height;
		}		
		f.style.height = 0;
	}
	ele.className="divchildtabCurrent";
	var f = $("_ChildTabFrame_"+ele.$A("id"));
	f.style.width = "100%";
	f.style.height = lastHeight + "px";
}

Tab.initFrameHeight = function(id){
	var f = $(id);
	var b = document.body;
	var ch  = document.compatMode == "BackCompat"?document.body.clientHeight:document.documentElement.clientHeight;
	var pos = f.getPosition();
	f.scrolling = "auto";
	f.height = ch-f.getPosition().y;
	var p = f.offsetParent;
	while (p.offsetParent!=document.body){
		p = p.offsetParent;
	}
	p = $(p);
	var d = p.getDimensions().height + p.getPosition().y - f.getDimensions().height - f.getPosition().y;
	f.height = f.height - d - (isIE?1:0);//IE8需要-1
}

Tab.getChildTab = function(id){
	return $("_ChildTabFrame_"+id);
}

Tab.getCurrentTab = function(){
	var arr = $T("div");
	var arrleng = arr.length;
	for(var i=0;i<arrleng;i++){
		var cn = arr[i].className;
		if(cn=="divchildtabCurrent"){
			return $("_ChildTabFrame_"+arr[i].id);
		}
	}
}

Tab.disableTab = function(ele){
	ele = $(ele);
	ele.className="divchildtabDisabled";
	ele.onclick2 = ele.onclick;
	ele.onclick = null;
}

Tab.enableTab = function(ele){
	ele = $(ele);
	ele.className="divchildtab";
	if(ele.onclick2){
		ele.onclick = ele.onclick2;
		ele.onclick2 = null;
	}
}

Page.onLoad(function(){
	var arr = $T("div");
	var arrleng = arr.length;
	for(var i=0;i<arrleng;i++){
		var cn = arr[i].className;
		if(cn=="divtab" || cn=="divtabDisabled"){
			arr[i].style.zIndex=""+(arrleng-i)+"";
		}else if(cn=="divtabCurrent"){
			arr[i].style.zIndex="33";
		}
	}
});