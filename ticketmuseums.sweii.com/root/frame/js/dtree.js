/*--------------------------------------------------|| dTree 2.05 | www.destroydrop.com/javascript/tree/ ||---------------------------------------------------|| 

Copyright (c) 2002-2003 Geir Landr?              ||                                                   || This script can be used freely as long as all     || copyright 

messages are intact.                    ||                                                   || Updated: 17.04.2003                               

||--------------------------------------------------*/// Node objectfunction Node(id, pid, name, url, title, target, icon, iconOpen, open) {	this.id = id;	

this.pid = pid;	this.name = name;	this.url = url;	this.title = title;	this.target = target;	this.icon = icon;	this.iconOpen = iconOpen;	

this._io = open || false;	this._is = false;	this._ls = false;	this._hc = false;	this._ai = 0;	this._p;};// Tree
																													// objectfunction
																													// dTree(objName)

{	this.config = {		target					: null,		folderLinks			: true,		useSelection		: true,	

	useCookies			: true,		useLines				: true,		useIcons				: true,		

useStatusText		: false,		closeSameLevel	: false,		inOrder					: false,
check					: true	}	this.icon = {		root				: 'img/base.gif',		folder			

: 'img/folder.gif',		folderOpen	: 'img/folderopen.gif',		node				: 'img/page.gif',		empty			

	: 'img/empty.gif',		line				: 'img/line.gif',		join				: 'img/join.gif',		

joinBottom	: 'img/joinbottom.gif',		plus				: 'img/plus.gif',		plusBottom	: 'img/plusbottom.gif',		minus	

			: 'img/minus.gif',		minusBottom	: 'img/minusbottom.gif',		nlPlus			: 'img/nolines_plus.gif',	

	nlMinus			: 'img/nolines_minus.gif'	};	this.obj = objName;	this.aNodes = [];	this.aIndent = [];	this.root = new Node(-

1);	this.selectedNode = null;	this.selectedFound = false;	this.completed = false;};
pid, name, url, title, target, icon, iconOpen, open) {	this.aNodes[this.aNodes.length] = new Node(id, pid, name, url, title, target, icon, iconOpen, open);};// 

Open/close all nodesdTree.prototype.openAll = function() {	this.oAll(true);};dTree.prototype.closeAll = function() {	this.oAll(false);};
to the pagedTree.prototype.toString = function() {	var str = '<div class="dtree">\n';	if (document.getElementById) {		if (this.config.useCookies) 

this.selectedNode = this.getSelected();		str += this.addNode(this.root);	} else str += 'Browser not supported.';	str += '</div>';	if (!

this.selectedFound) this.selectedNode = null;	this.completed = true;	return str;};
= '';	var n=0;	if (this.config.inOrder) n = pNode._ai;	for (n; n<this.aNodes.length; n++) {		if (this.aNodes[n].pid == pNode.id) {			

var cn = this.aNodes[n];			cn._p = pNode;			cn._ai = n;			this.setCS(cn);			if (!cn.target && 

this.config.target) cn.target = this.config.target;			if (cn._hc && !cn._io && this.config.useCookies) cn._io = this.isOpen(cn.id);			

if (!this.config.folderLinks && cn._hc) cn.url = null;			if (this.config.useSelection && cn.id == this.selectedNode && !this.selectedFound) {		

			cn._is = true;					this.selectedNode = n;					this.selectedFound = true;		

	}			str += this.node(cn, n);			if (cn._ls) break;		}	}	return str;};// Creates
																									// the
																									// node
																									// icon,

url and textdTree.prototype.node = function(node, nodeId) {	var str = '<div class="dTreeNode">' + this.indent(node, nodeId);	if (this.config.useIcons) {	

	if (!node.icon) node.icon = (this.root.id == node.pid) ? this.icon.root : ((node._hc) ? this.icon.folder : this.icon.node);		if (!node.iconOpen) 

node.iconOpen = (node._hc) ? this.icon.folderOpen : this.icon.node;		if (this.root.id == node.pid) {			node.icon = this.icon.root;		

	node.iconOpen = this.icon.root;		}		str += '<img  width="10px" id="i' + this.obj + nodeId + '" src="' + ((node._io) ? node.iconOpen : node.icon) + '" 

alt="" />';	}	if (node.url) {		str += '<a id="s' + this.obj + nodeId + '" class="' + ((this.config.useSelection) ? ((node._is ? 'nodeSel' : 'node')) : 

'node') + '" href="' + node.url + '"';		if (node.title) str += ' title="' + node.title + '"';		if (node.target) str += ' target="' + node.target + 

'"';		if (this.config.useStatusText) str += ' onmouseover="window.status=\'' + node.name + '\';return true;" onmouseout="window.status=\'\';return true;" ';	

	if (this.config.useSelection && ((node._hc && this.config.folderLinks) || !node._hc))			str += ' onclick="javascript: ' + this.obj + '.s(' + 

nodeId + ');"';		str += '>';	}	else if ((!this.config.folderLinks || !node.url) && node._hc && node.pid != this.root.id)		str += '<a 

href="javascript: ' + this.obj + '.o(' + nodeId + ');" class="node">';	str += node.name;	if (node.url || ((!this.config.folderLinks || !node.url) && node._hc)) 

str += '</a>';	str += '</div>';	if (node._hc) {		str += '<div id="d' + this.obj + nodeId + '" class="clip" style="display:' + ((this.root.id == node.pid 

|| node._io) ? 'block' : 'none') + ';">';		str += this.addNode(node);		str += '</div>';	}	this.aIndent.pop();	return str;};// 

Adds the empty and line iconsdTree.prototype.indent = function(node, nodeId) {	var str = '';	if (this.root.id != node.pid) {		for (var n=0; 

n<this.aIndent.length; n++)			str += '<img src="' + ( (this.aIndent[n] == 1 && this.config.useLines) ? this.icon.line : this.icon.empty ) + '" alt="" 

/>';		(node._ls) ? this.aIndent.push(0) : this.aIndent.push(1);		if (node._hc) {			str += '<a href="javascript: ' + this.obj + 

'.o(' + nodeId + ');"><img id="j' + this.obj + nodeId + '" src="';			if (!this.config.useLines) str += (node._io) ? this.icon.nlMinus : 

this.icon.nlPlus;			else str += ( (node._io) ? ((node._ls && this.config.useLines) ? this.icon.minusBottom : this.icon.minus) : ((node._ls && 

this.config.useLines) ? this.icon.plusBottom : this.icon.plus ) );			str += '" alt="" /></a>';		} else str += '<img src="' + ( 

(this.config.useLines) ? ((node._ls) ? this.icon.joinBottom : this.icon.join ) : this.icon.empty) + '" alt="" />';	}	return str;};
any children and if it is the last siblingdTree.prototype.setCS = function(node) {	var lastId;	for (var n=0; n<this.aNodes.length; n++) {		if 

(this.aNodes[n].pid == node.id) node._hc = true;		if (this.aNodes[n].pid == node.pid) lastId = this.aNodes[n].id;	}	if (lastId==node.id) node._ls = 

true;};
the selected nodedTree.prototype.s = function(id) {	if (!this.config.useSelection) return;	var cn = this.aNodes[id];	if (cn._hc && !this.config.folderLinks) 

return;	if (this.selectedNode != id) {		if (this.selectedNode || this.selectedNode==0) {			eOld = document.getElementById("s" + this.obj + 

this.selectedNode);			eOld.className = "node";		}		eNew = document.getElementById("s" + this.obj + id);		

eNew.className = "nodeSel";		this.selectedNode = id;		if (this.config.useCookies) this.setCookie('cs' + this.obj, cn.id);	}};// Toggle
																																	// Open
																																	// or

closedTree.prototype.o = function(id) {	var cn = this.aNodes[id];	this.nodeStatus(!cn._io, id, cn._ls);	cn._io = !cn._io;	if (this.config.closeSameLevel) 

this.closeLevel(cn);	if (this.config.useCookies) this.updateCookie();};
n<this.aNodes.length; n++) {		if (this.aNodes[n]._hc && this.aNodes[n].pid != this.root.id) {			this.nodeStatus(status, n, this.aNodes[n]._ls)	

		this.aNodes[n]._io = status;		}	}	if (this.config.useCookies) this.updateCookie();};// Opens
																										// the
																										// tree
																										// to a
																										// specific

nodedTree.prototype.openTo = function(nId, bSelect, bFirst) {	if (!bFirst) {		for (var n=0; n<this.aNodes.length; n++) {			if 

(this.aNodes[n].id == nId) {				nId=n;				break;			}		}	}	var cn=this.aNodes

[nId];	if (cn.pid==this.root.id || !cn._p) return;	cn._io = true;	cn._is = bSelect;	if (this.completed && cn._hc) this.nodeStatus(true, cn._ai, cn._ls);	

if (this.completed && bSelect) this.s(cn._ai);	else if (bSelect) this._sn=cn._ai;	this.openTo(cn._p._ai, false, true);};// Closes
																															// all
																															// nodes
																															// on
																															// the
																															// same
																															// level
																															// as

certain nodedTree.prototype.closeLevel = function(node) {	for (var n=0; n<this.aNodes.length; n++) {		if (this.aNodes[n].pid == node.pid && 

this.aNodes[n].id != node.id && this.aNodes[n]._hc) {			this.nodeStatus(false, n, this.aNodes[n]._ls);			this.aNodes[n]._io = false;	

		this.closeAllChildren(this.aNodes[n]);		}	}}// Closes all
															// children of a
															// nodedTree.prototype.closeAllChildren
															// = function(node)
															// { for

(var n=0; n<this.aNodes.length; n++) {		if (this.aNodes[n].pid == node.id && this.aNodes[n]._hc) {			if (this.aNodes[n]._io) 

this.nodeStatus(false, n, this.aNodes[n]._ls);			this.aNodes[n]._io = false;			this.closeAllChildren(this.aNodes[n]);			

	}	}}
this.obj + id);	eJoin	= document.getElementById('j' + this.obj + id);	if (this.config.useIcons) {		eIcon	= document.getElementById('i' + this.obj + id);	

	eIcon.src = (status) ? this.aNodes[id].iconOpen : this.aNodes[id].icon;	}	eJoin.src = (this.config.useLines)?	((status)?((bottom)?

this.icon.minusBottom:this.icon.minus):((bottom)?this.icon.plusBottom:this.icon.plus)):	((status)?this.icon.nlMinus:this.icon.nlPlus);	eDiv.style.display = (status) ? 

'block': 'none';};

* 24);	this.setCookie('co'+this.obj, 'cookieValue', yesterday);	this.setCookie('cs'+this.obj, 'cookieValue', yesterday);};// [Cookie]
																																// Sets
																																// value
																																// in a

cookiedTree.prototype.setCookie = function(cookieName, cookieValue, expires, path, domain, secure) {	document.cookie =		escape(cookieName) + '=' + 

escape(cookieValue)		+ (expires ? '; expires=' + expires.toGMTString() : '')		+ (path ? '; path=' + path : '')		+ (domain ? '; domain=' 

+ domain : '')		+ (secure ? '; secure' : '');};

var posName = document.cookie.indexOf(escape(cookieName) + '=');	if (posName != -1) {		var posValue = posName + (escape(cookieName) + '=').length;	

	var endPos = document.cookie.indexOf(';', posValue);		if (endPos != -1) cookieValue = unescape(document.cookie.substring(posValue, endPos));		

else cookieValue = unescape(document.cookie.substring(posValue));	}	return (cookieValue);};
stringdTree.prototype.updateCookie = function() {	var str = '';	for (var n=0; n<this.aNodes.length; n++) {		if (this.aNodes[n]._io && this.aNodes

[n].pid != this.root.id) {			if (str) str += '.';			str += this.aNodes[n].id;		}	}	this.setCookie('co' + 

this.obj, str);};
(var n=0; n<aOpen.length; n++)		if (aOpen[n] == id) return true;	return false;};


Array.prototype.push) {	Array.prototype.push = function array_push() {		for(var i=0;i<arguments.length;i++)			this[this.length]=arguments[i];	

	return this.length;	}};if (!Array.prototype.pop) {	Array.prototype.pop = function array_pop() {		lastElement = this[this.length-1];		

this.length = Math.max(this.length-1,0);		return lastElement;	}};
dTree.prototype.node = function(node, nodeId) {

	var str = '<div class="dTreeNode">' + this.indent(node, nodeId);

	if (this.config.useIcons) {

		if (!node.icon)
			node.icon = (this.root.id == node.pid) ? this.icon.root
					: ((node._hc) ? this.icon.folder : this.icon.node);

		if (!node.iconOpen)
			node.iconOpen = (node._hc) ? this.icon.folderOpen : this.icon.node;

		if (this.root.id == node.pid) {

			node.icon = this.icon.root;

			node.iconOpen = this.icon.root;

		}

		str += '<img id="i' + this.obj + nodeId + '" src="'
				+ ((node._io) ? node.iconOpen : node.icon) + '" alt="" />';

		// 添加上复选框
		if (this.config.check == true) {

			str += '<input type="checkbox" id="c' + this.obj + node.id
					+ '" onclick="javascript:' + this.obj + '.cc(' + node.id
					+ ',' + node.pid + ')"/>';
		}

	}
}

dTree.prototype.cc = function(nodeId, nodePid) {

	// 首先获取这个多选框的id
	var cs = document.getElementById("c" + this.obj + nodeId).checked;

	var n, node = this.aNodes[nodeId];

	var len = this.aNodes.length;

	for (n = 0; n < len; n++) { // 如果循环每一个节点
		if (this.aNodes[n].pid == nodeId) { // 如果选中的是非叶子节点,则要将所有的子节点选择和父节点一样
			document.getElementById("c" + this.obj + this.aNodes[n].id).checked = cs;
			this.cc(this.aNodes[n].id, nodeId);
		}
	}

	if (cs == true) { // 当前是选中状态
		var pid = nodePid;
		var bSearch;
		do {
			bSearch = false;
			for (n = 0; n < len; n++) { // 循环每一个节点
				if (this.aNodes[n].id == pid) { // 如果循环的节点的id等于PID
					document.getElementById("c" + this.obj + pid).checked = true; // 那么这个循环的节点应该被选中
					pid = this.aNodes[n].pid;
					bSearch = true;
					break;
				}
			}
		} while (bSearch == true);
	}

	if (cs == false) { // 如果被取消选择
		var pid = nodePid;
		do {
			for (j = 0; j < len; j++) { // 循环每一个多选框 如果这个节点的子节点有其他是选中的,则不取消
				if (this.aNodes[j].pid == pid
						&& document.getElementById("c" + this.obj
								+ this.aNodes[j].id).checked == true) {
					return;
				}
			}
			if (j == len) { // 循环结束
				for (k = 0; k < len; k++) {
					if (this.aNodes[k].id == pid) { // 如果找到父节点
						document.getElementById("c" + this.obj
								+ this.aNodes[k].id).checked = false;
						pid = this.aNodes[k].pid;
						break;
					}
				}
			}
		} while (pid != -1);
	}
}
