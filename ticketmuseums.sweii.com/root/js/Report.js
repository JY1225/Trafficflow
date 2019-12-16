var setting = {
	check: {
	enable: true,
	chkboxType: {"Y":"ps", "N":"ps"}
	},
	view: {
		dblClickExpand: false
	},
	data: {
		simpleData: {
			enable: true
		}
	},
	callback: {
		beforeClick: beforeClick,
		onCheck: onCheck
	}
};
function beforeClick(treeId, treeNode) {
	var zTree = $.fn.zTree.getZTreeObj(treeId);
	zTree.checkNode(treeNode, !treeNode.checked, null, true);
	return false;
}

function onCheck(e, treeId, treeNode) {
	var zTree = $.fn.zTree.getZTreeObj(treeId),
	nodes = zTree.getCheckedNodes(true),
	v = "",
	ids="";
	for (var i=0, l=nodes.length; i<l; i++) {
		if(nodes[i].id<=0)continue;
		v += nodes[i].name + ",";
		ids += nodes[i].id + ",";
	}
	if (v.length > 0 ) v = v.substring(0, v.length-1);
	if (ids.length > 0 ) ids = ids.substring(0, ids.length-1);
	if(treeId=='adminTree'){
		var htmlObj = $("#tripStr");
		htmlObj.attr("value", v);
		var htmlObj = $("#tripStrIds");
		htmlObj.attr("value", ids);
	}else{
		var htmlObj = $("#categoryType");
		htmlObj.attr("value", v);
		var htmlObj = $("#categoryTypeIds");
		htmlObj.attr("value", ids);
	}
}

function showMenu(id) {
	var htmlObj = $("#"+id);
	var htmlOffset = $("#"+id).offset();
	if(id=="tripStr"){
		$("#ticketContent").fadeOut("fast");
		$("#adminContent").css({left:htmlOffset.left + "px", top:htmlOffset.top + htmlObj.outerHeight() + "px"}).slideDown("fast");
	}else{
		$("#adminContent").fadeOut("fast");
		$("#ticketContent").css({left:htmlOffset.left + "px", top:htmlOffset.top + htmlObj.outerHeight() + "px"}).slideDown("fast");
	}
	$("body").bind("mousedown", onBodyDown);
}
function hideMenu() {
	$("#adminContent").fadeOut("fast");
	$("#ticketContent").fadeOut("fast");
	$("body").unbind("mousedown", onBodyDown);
}
function onBodyDown(event) {
	if (!(event.target.id == "menuBtn" ||event.target.id == "menuBtn01" || event.target.id == "tripStr"
		|| event.target.id == "categoryType"|| event.target.id == "adminContent" || event.target.id == "ticketContent"
			|| $(event.target).parents("#adminContent").length>0 || $(event.target).parents("#ticketContent").length>0)) {
		hideMenu();
	}
}

$(document).ready(function(){
	$.fn.zTree.init($("#adminTree"), setting, saleAdminNodes);
});
