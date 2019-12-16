<%@ page isELIgnored="true" pageEncoding="UTF-8"%>
<!-- 打印控件 -->
<script language="javascript" type="text/javascript" src="/lodop/SweiiLodopFuncs.js"></script>
<object id="LODOP" classid="clsid:2105C259-1E0C-4534-8141-A753534CB4CA" width=0 height=0> <embed
		id="LODOP_EM" type="application/x-print-lodop" width=0 height=0 style="display: none;"
		pluginspage="/lodop/install_lodop.exe"
	></embed> </object>
<script src="/frame/js/Utils.js"></script>
<script language="javascript" type="text/javascript">  
 var LODOP=getLodop(document.getElementById('LODOP'),document.getElementById('LODOP_EM'));  ; //声明为全局变量 
//var LODOP;
var printStyle="";
var printBillStyle="";
//系统标准样式
printStyle+="<link href=\"/frame/css/frame.css\" rel=\"stylesheet\" type=\"text/css\" />";
printStyle+="<link href=\"/frame/css/ext-all.css\" rel=\"stylesheet\" type=\"text/css\" />";
//打印特有样式
printStyle+="<style type=\"text/css\">";
printStyle+=".printBtn{/*隐藏打印按钮*/";
printStyle+="	  display: none;";
printStyle+="  }";
printStyle+="#printBtn{/*隐藏打印按钮*/";
printStyle+="	  display: none;";
printStyle+="  }";
 
printStyle+="a:link {/*链接不要下划线*/";
printStyle+=" color: black;";
printStyle+="text-decoration: none;";
printStyle+="} ";
printStyle+="a:visited{/*访问过的样式链接不要下划线*/";
printStyle+=" color: black;";
printStyle+="text-decoration: none;";
printStyle+="} ";
 
printStyle+="table {";
printStyle+="	font-size:13px;";
printStyle+="	}";

printStyle+="body {";
//printStoreSteelStyle+="	font-weight:bold;";
printStyle+="background-color:write;";
printStyle+="color:#000000;";
printStyle+="	}";
printStyle+="</style>";

/*出仓单/放行条 字体*/
printBillStyle+="<style type=\"text/css\">";
printBillStyle+="table {";
printBillStyle+="font-size:11pt;";
printBillStyle+="font-weight: normal; ";
printBillStyle+="	}";


printBillStyle+=".billTitle{";
printBillStyle+="font-weight: bold; ";
printBillStyle+="font-size: 22px;";
printBillStyle+="height:40px; ";
printBillStyle+="border:1px solid #000;";
printBillStyle+="position:fixed; ";
printBillStyle+="left:50%; ";
printBillStyle+="margin-left:-100px;";
	/* margin-top:-100px;*/
printBillStyle+="_position:absolute;";
printBillStyle+="top:25px;";
printBillStyle+="	 }";
printBillStyle+="</style>";
/*库存打印Css 
 * 
 */
 var printStoreSteelStyle="";
 printStoreSteelStyle+="<style type=\"text/css\">";
 printStoreSteelStyle+="table {";
 printStoreSteelStyle+="	font-size:12pt;";
 printStoreSteelStyle+="	}";
 printStoreSteelStyle+="</style>";

 

/**
 * 预览参数设置
 */
function setPreviewParams(){
	 LODOP.SET_SHOW_MODE("HIDE_PAPER_BOARD",0);//1\去掉底图上有模拟走纸板的条纹线
	 LODOP.SET_PREVIEW_WINDOW(1,0,1,0,0,"");	//第三个参数.打印按钮是否“直接打印” 1-是 0-否 
	 LODOP.SET_SHOW_MODE("HIDE_PAGE_PERCENT",true);//隐藏预览窗口上的缩放比例选项
}

/**
 * 
 */
function updatePrintCount(entity,id,field,count,reload){
     if(!entity)return;
     if(!id)return;
	 if(count==0)return;
     Utils.updatePrintCount(entity,id,field,count,reload)
}

/**
 * 打印名牌
 */
function printLabelDuXin(id,left,updateLableFlag){
	 //LODOP=getLodop(document.getElementById('LODOP'),document.getElementById('LODOP_EM'));  
	if ((LODOP==null)||(typeof(LODOP.VERSION)=="undefined")) return;
	 setPreviewParams();
	var top="0mm";
	if(!left)left=0;//5.5mm
	 // LODOP.PRINT_INITA(top,left,0,0,"打印铭牌任务");
	  
		LODOP.PRINT_INITA(10,0,715,437,"打印标签任务");
		LODOP.SET_PRINT_PAGESIZE(0,"189mm","119mm","");//单据纸张大小  2横向
		createLabelDuXin(id);
		 LODOP.SET_PREVIEW_WINDOW(1,0,1,0,0,"");	//第三个参数.打印按钮是否“直接打印” 1-是 0-否 
	    // LODOP.PRINT_DESIGN();		
	   var count=LODOP.PREVIEW();//返回打印次数
	   if(count>0){
		   if($("printCount"+id)){//设置页面printCount
			  // alert("设置printcount");
			   $S("printCount"+id,count);
		   }

		       if(updateLableFlag&&updateLableFlag==true){//更新打印label
		    	   updatePrintCount('Steel',id,'printCount',count,false);
					Dialog.confirm("是否确认标签打印成功?", function() {
							var dc = new DataCollection();
							dc.add('ids', id);
							dc.add('fields', 'labelFlag');
							dc.add('values', '1');
							Server.sendRequest('common/changeSteel.do', dc, function(
									response) {
								location.reload();
							}, 'json');
					});
		    	   
		       }else{
		    	   updatePrintCount('Steel',id,'printCount',count,false);
		       }
			  
			 // reload();
			 // parent.DataGrid.loadData('dg1');
				 
		  }
}
/**
 * 导出excel
 */
function saveAsFile(id,name){
	var content=document.getElementById(id).innerHTML;
	LODOP.PRINT_INIT("");
	LODOP.ADD_PRINT_TABLE(190,80,1000,800,content);
	LODOP.SAVE_TO_FILE(name);
};

function createLabelDuXin(id){
	 LODOP.ADD_PRINT_SETUP_BKIMG("<img border='0' src='/label/duxin2.jpg'>");
	 LODOP.SET_SHOW_MODE('BKIMG_IN_PREVIEW',1);//预览有背景
	LODOP.SET_PRINT_STYLEA(0,"Bold",1);
   
  LODOP.ADD_PRINT_TEXT(200,491,165,35,document.getElementById('length'+id).value);
  LODOP.SET_PRINT_STYLEA(0,"FontSize",14);
  LODOP.SET_PRINT_STYLEA(0,"FontColor","#8000FF");
  LODOP.SET_PRINT_STYLEA(0,"Bold",1);
  LODOP.ADD_PRINT_TEXT(248,153,165,35,document.getElementById('number'+id).value);
  LODOP.SET_PRINT_STYLEA(0,"FontSize",14);
  LODOP.SET_PRINT_STYLEA(0,"FontColor","#8000FF");
  LODOP.SET_PRINT_STYLEA(0,"Bold",1);
  LODOP.ADD_PRINT_TEXT(290,155,165,35,document.getElementById('date'+id).value);
  LODOP.SET_PRINT_STYLEA(0,"FontSize",14);
  LODOP.SET_PRINT_STYLEA(0,"FontColor","#8000FF");
  LODOP.SET_PRINT_STYLEA(0,"Bold",1);
  LODOP.ADD_PRINT_TEXT(248,491,165,35,document.getElementById('qa'+id).value);//QA
  LODOP.SET_PRINT_STYLEA(0,"FontSize",14);
  LODOP.SET_PRINT_STYLEA(0,"FontColor","#8000FF");
  LODOP.SET_PRINT_STYLEA(0,"Bold",1);
  LODOP.ADD_PRINT_TEXT(290,491,165,35,"");//合同document.getElementById('ht').value
  LODOP.SET_PRINT_STYLEA(0,"FontSize",14);
  LODOP.SET_PRINT_STYLEA(0,"FontColor","#8000FF");
  LODOP.SET_PRINT_STYLEA(0,"Bold",1);
  LODOP.SET_PRINT_STYLEA(0,"Horient",2);
  // LODOP.ADD_PRINT_IMAGE(360,400,283,40,"<img border='0' width='283' height='40' src='"+document.getElementById('barcode').src+"'/>");
  var barlength=283;
  var barleft=420;
 var number= document.getElementById('number'+id).value.replace(" ","");;
   // alert(number.length);
   if(number.length==9){
	     barlength=283;
	     barleft=420;
   }else if(number.length==10){
	     barlength=290;
	     barleft=395;
   }else if(number.length==11){
	     barlength=313;
	     barleft=375;
   }else if(number.length==12){
	     barlength=337;
	     barleft=355;
    }else if(number.length==13){
	     barlength=359;
	     barleft=330;
    }else if(number.length==14){
	     barlength=382;
	     barleft=305;
    }else if(number.length==15){
	     barlength=400;
	     barleft=285;
    }
   
    LODOP.ADD_PRINT_BARCODE(365,barleft,barlength,40, '128A', number);
  LODOP.ADD_PRINT_TEXT(200,154,165,35,document.getElementById('realWeight'+id).value);
  LODOP.SET_PRINT_STYLEA(0,"FontSize",14);
  LODOP.SET_PRINT_STYLEA(0,"FontColor","#8000FF");
  LODOP.SET_PRINT_STYLEA(0,"Bold",1);
  LODOP.ADD_PRINT_TEXT(155,156,165,35,document.getElementById('style'+id).value);
  LODOP.SET_PRINT_STYLEA(0,"FontSize",14);
  LODOP.SET_PRINT_STYLEA(0,"FontColor","#8000FF");
  LODOP.SET_PRINT_STYLEA(0,"Bold",1);
  LODOP.ADD_PRINT_TEXT(155,491,165,35,document.getElementById('grade'+id).value);
  LODOP.SET_PRINT_STYLEA(0,"FontSize",14);
  LODOP.SET_PRINT_STYLEA(0,"FontColor","#8000FF");
  LODOP.SET_PRINT_STYLEA(0,"Bold",1);
}


function printBill(printId,left,entity,eid,field) {	
	// LODOP=getLodop(document.getElementById('LODOP'),document.getElementById('LODOP_EM'));  
	if(!LODOP.Version)return;
	genPrintBillContent(printId,left);
	setPreviewParams();
	  var count=LODOP.PREVIEW();//返回打印次数
	  if(count>0){
		  updatePrintCount(entity,eid,field,count);
	  }

      
    //var design=	LODOP.PRINT_DESIGN();
};

/*
 * 单据打印内容
 */
function genPrintBillContent(ids,left){
	var top="0mm";
	if(!left)left=0;//5.5mm
	  LODOP.PRINT_INITA(top,left,0,0,"打印单据任务");
	 LODOP.SET_PRINT_PAGESIZE(0,"212mm","140mm","");//单据纸张大小  2横向
	 /* if(left!=0){//指定边距
		 LODOP.SET_PRINT_STYLE("HOrient",0);//0--左边距锁定
	 }else{
		  //alert("水平居中")
		 LODOP.SET_PRINT_STYLE("HOrient",0);//0--左边距锁定 2--水平居中
	 } */
	  LODOP.SET_PRINT_STYLE("HOrient",0);
	// LODOP.SET_PRINT_STYLE("VOrient",2);//2--垂直方向居中
	 LODOP.SET_SHOW_MODE("LANDSCAPE_DEFROTATED",1);//横向时的正向显示
	  //判断ids是否包含逗号
	       var idsplit=ids.split(",");
	       var printContent="";
	       for(var i=0;i<idsplit.length;i++){
		       id=idsplit[i];
		       if(i!=0){
			       printContent+="<div style='page-break-before: always;'>";
		       }
		       printContent+=document.getElementById(id).innerHTML;
		       if(i!=0){
			        printContent+="</div>";
		       }
	       }
		// alert(printContent);
	//创建打印内容	 
	var printHtm=printStyle+printBillStyle+"<body>";//
      printHtm+=printContent;
	  printHtm=printHtm+ "</body>";
	// LODOP.ADD_PRINT_HTM(5,5,850,500,printHtm);
	  //LODOP.ADD_PRINT_HTM(0,0,835,500,printHtm);
	 // LODOP.ADD_PRINT_HTM(0,0,840,500,printHtm);//打印内容大小
	//LODOP.ADD_PRINT_TABLE(0,"0","235mm","133mm",printHtm);
		 LODOP.ADD_PRINT_HTM(0,0,"275mm","133mm",printHtm);//打印内容大小
	  
	
};	   


function printContract(id) {	
	 //LODOP=getLodop(document.getElementById('LODOP'),document.getElementById('LODOP_EM'));  
	if(!LODOP.Version)return;
	genPrintContractContent(id);
	setPreviewParams();	
	var count=LODOP.PREVIEW();//返回打印次数
};

/*
 * 单据打印内容
 */
function genPrintContractContent(id){
	  LODOP.PRINT_INITA(0,10,0,0,"打印合同");
	  LODOP.SET_PRINT_PAGESIZE(1,0,0,"A4");//单据纸张大小
	  LODOP.SET_PRINT_STYLE("HOrient",0);//0--左边距锁定 2--水平居中
	 // LODOP.SET_PRINT_STYLE("VOrient",2);//2--垂直方向居中
	 LODOP.SET_SHOW_MODE("LANDSCAPE_DEFROTATED",1);//横向时的正向显示
		var printContent=document.getElementById(id).innerHTML;
		// alert(printContent);
	//创建打印内容	 
	var printHtm=printStyle+"<body>";//
      printHtm+=printContent;
	  printHtm=printHtm+ "</body>";
	 // alert(printHtm);
	  LODOP.ADD_PRINT_HTM(0,0,"200mm","295mm",printHtm);//打印内容大小
	  
	
};	   

/**
 * A4打印<BR>
 * id 和content 二选一
 */
function printA4(id,content,left){
	// LODOP=getLodop(document.getElementById('LODOP'),document.getElementById('LODOP_EM'));  
	if(!LODOP.Version)return;
	genPrintA4(id,content,left);
	
	setPreviewParams();	
	 // LODOP.PRINT_DESIGN();
	var count=LODOP.PREVIEW();//返回打印次数
	return count;
}
 function printStoreSteel(tables,left){
		// LODOP=getLodop(document.getElementById('LODOP'),document.getElementById('LODOP_EM'));  
		if(!LODOP.Version)return;
		  var strFormHtml= "";//
			 for(var i=0;i<tables.length;i++){
				 tb=tables[i];
				 if(i!=0){
				 }
				 strFormHtml=strFormHtml+tb+"<BR>";
			 } 

		//printStyle+=printStoreSteelStyle;
		
		// genPrintA4(null,strFormHtml,left);
		//genPrintStoreSteel(tables);
		 
		if(!left){
			left=0;
		}
			  LODOP.PRINT_INITA(20,left,730,1120,"打印板材明细");
			 //LODOP.PRINT_INIT("打印板材明细");
			 //LODOP.PRINT_INITA(20,left,"210mm","297mm","打印板材");
			  LODOP.SET_PRINT_PAGESIZE(1,0,0,"A4");//单据纸张大小
		 
		
		      LODOP.SET_PRINT_STYLE("HOrient",0);//0--左边距锁定 2--水平居中
		  
		 // LODOP.SET_PRINT_STYLE("FontSize",13);//
		//  LODOP.SET_PRINT_STYLE("Bold",1);//
		 LODOP.SET_SHOW_MODE("LANDSCAPE_DEFROTATED",1);//横向时的正向显示
		    
		  
		//创建打印内容	 
		 var printHtm=printStyle+printStoreSteelStyle+"<body>";//
	        printHtm+=strFormHtml;
		   printHtm+= "</body>";
		   
		 LODOP.ADD_PRINT_HTM(0,0,730,1100,printHtm);//打印内容大小
		  
		 LODOP.ADD_PRINT_TEXT(42,610,90,30,"第 # 页/共 & 页");//添加页码
		// LODOP.ADD_PRINT_TEXT(1060,346,90,30,"第 # 页/共 & 页");//添加页码
		  LODOP.SET_PRINT_STYLEA(0,"ItemType",2);
		  //LODOP.SET_PRINT_MODE("PRINT_PAGE_PERCENT",'Auto-Width'); 
		 setPreviewParams();	
		// LODOP.PRINT_DESIGN();
	 var count=LODOP.PREVIEW();//返回打印次数
	}

function genPrintStoreSteel(tables){
 
	  var strFormHtml= "";//
		 for(var i=0;i<tables.length;i++){
			 tb=tables[i];
			 if(i!=0){
			 }
			 strFormHtml=strFormHtml+tb+"<BR>";
			 
		 } 

		 if(!left){
				left=0;
			}
			 //正向
				 LODOP.PRINT_INITA(20,left,820,1120,"A4打印任务");
				  LODOP.SET_PRINT_PAGESIZE(1,0,0,"A4");//单据纸张大小
			     LODOP.SET_PRINT_STYLE("HOrient",2);//0--左边距锁定 2--水平居中
			  LODOP.SET_PRINT_STYLE("VOrient",2);//2--垂直方向居中
			    LODOP.SET_SHOW_MODE("LANDSCAPE_DEFROTATED",1);//横向时的正向显示
			    
			 
			//创建打印内容	 
			 var printHtm=printStyle+"<body>";//
		        printHtm+=printContent;
			   printHtm+= "</body>";
			LODOP.ADD_PRINT_HTM(0,0,800,1100,printHtm);//打印内容大小
		 
}


 
/**
 * A4 横向打印
 *
 */
function printHA4(id,content,left){
		// LODOP=getLodop(document.getElementById('LODOP'),document.getElementById('LODOP_EM'));  
		if(!LODOP.Version)return;
		genPrintA4(id,content,left,true);
		setPreviewParams();	
		 //LODOP.PRINT_DESIGN();
		 var count=LODOP.PREVIEW();//返回打印次数
}

function genPrintA4(id,content,left,isH){//isH 是佛横向
	//alert("A4");
	if(!left){
		left=0;
	}
	  if(isH){//横向
		  LODOP.PRINT_INITA(20,left,"297mm","200mm","A4打印任务");
		  LODOP.SET_PRINT_PAGESIZE(2,0,0,"A4");//单据纸张大小
	  }else{//正向
		  LODOP.PRINT_INITA(20,left,800,1120,"A4打印任务");
		  LODOP.SET_PRINT_PAGESIZE(1,0,0,"A4");//单据纸张大小
	  }
	
	  LODOP.SET_PRINT_STYLE("HOrient",2);//0--左边距锁定 2--水平居中
	 // LODOP.SET_PRINT_STYLE("VOrient",2);//2--垂直方向居中
	 LODOP.SET_SHOW_MODE("LANDSCAPE_DEFROTATED",1);//横向时的正向显示
	    
		var printContent;
        if(id){
        	printContent=document.getElementById(id).innerHTML;
        }else{
        	printContent=content;
        }
	//创建打印内容	 
	 var printHtm=printStyle+"<body>";//
        printHtm+=printContent;
	   printHtm+= "</body>";
	   if(isH){//横向
		   LODOP.ADD_PRINT_HTM(0,0,"280mm","200mm",printHtm);//打印内容大小
	   }else{
		   LODOP.ADD_PRINT_HTM(0,0,780,1100,printHtm);//打印内容大小
	   }
};	

function printA4AutoPage(id,left){
    if(!LODOP.Version)return;
    if(!left){
        left=0;
    }
     
          LODOP.PRINT_INITA(20,left,800,1120,"A4打印任务");
          LODOP.SET_PRINT_PAGESIZE(1,0,0,"A4");//单据纸张大小
     
    
      LODOP.SET_PRINT_STYLE("HOrient",0);//0--左边距锁定 2--水平居中
     // LODOP.SET_PRINT_STYLE("VOrient",2);//2--垂直方向居中
     LODOP.SET_SHOW_MODE("LANDSCAPE_DEFROTATED",1);//横向时的正向显示
        
        var printContent=document.getElementById(id).innerHTML;
         
    //创建打印内容     
     var printHtm=printStyle+"<body>";//
        printHtm+=printContent;
       printHtm+= "</body>";
        
           LODOP.ADD_PRINT_TABLE(5,20,750,1050,printHtm);//打印内容大小
         
    
    setPreviewParams(); 
     // LODOP.PRINT_DESIGN();
    var count=LODOP.PREVIEW();//返回打印次数
    return count;
}
</script>