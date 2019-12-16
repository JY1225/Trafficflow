var CONTEXTPATH = '/';
var isIE = navigator.userAgent.toLowerCase().indexOf("msie") != -1;
var isIE6 = navigator.userAgent.toLowerCase().indexOf("msie 6.0") != -1;
var isIE7 = navigator.userAgent.toLowerCase().indexOf("msie 7.0") != -1
		&& !window.XDomainRequest;
var isIE8 = !!window.XDomainRequest;
var isGecko = navigator.userAgent.toLowerCase().indexOf("gecko") != -1;
var isQuirks = document.compatMode == "BackCompat";
	// 获到Window事件
function $D(a) {

	if (typeof(a) == "string") {
		a = document.getElementById(a);
		if (!a) {
			return null
		}
	}
	if (a) {
		Core.attachMethod(a)
	}
	return a
}	
var Core = {};
Core.attachMethod = function(b) {
	if (!b || b["$DA"]) {
		return
	}
	if (b.nodeType == 9) {
		return
	}
	var c;
	try {
		if (isGecko) {
			c = b.ownerDocument.defaultView
		} else {
			c = b.ownerDocument.parentWindow
		}
		for (var d in $DE) {
			b[d] = c.$DE[d]
		}
	} catch (a) {
	}
};

var $DE = {};
$DE.$DA = function(a, b) {
	b = b || this;
	b = $D(b);
	return b.getAttribute ? b.getAttribute(a) : null
};
$DE.$DT = function(a, b) {
	b = b || this;
	b = window.$D(b);
	return window.$DT(a, b)
};
$DE.visible = function(a) {
	a = a || this;
	a = $D(a);
	if (a.style.display == "none") {
		return false
	}
	return true
};
$DE.toggle = function(a) {
	a = a || this;
	a = $D(a);
	$DE[$DE.visible(a) ? "hide" : "show"](a)
};
$DE.toString = function(b, d, h) {
	h = h || this;
	var a = [];
	var g = 0;
	for (var j in h) {
		if (!d || g >= d) {
			var c = null;
			try {
				c = h[j]
			} catch (f) {
			}
			if (!b) {
				if (typeof(c) == "function") {
					c = "function()"
				} else {
					if (("" + c).length > 100) {
						c = ("" + c).substring(0, 100) + "..."
					}
				}
			}
			a.push(j + ":" + c)
		}
		g++
	}
	return a.join("\n")
};
$DE.hide = function(a) {
	a = a || this;
	a = $D(a);
	a.style.display = "none"
};
$DE.focusEx = function(b) {
	b = b || this;
	b = $D(b);
	try {
		b.focus()
	} catch (a) {
	}
};
$DE.show = function(a) {
	a = a || this;
	a = $D(a);
	a.style.display = ""
};
$DE.getForm = function(a) {
	a = a || this;
	a = $D(a);
	if (isIE) {
		a = a.parentElement
	} else {
		if (isGecko) {
			a = a.parentNode
		}
	}
	if (!a) {
		return null
	}
	if (a.tagName.toLowerCase() == "form") {
		return a
	} else {
		return $DE.GetForm(a)
	}
};
$DE.disable = function(d) {
	d = d || this;
	d = $D(d);
	if (d.tagName.toLowerCase() == "form") {
		var c = d.elements;
		for (var b = 0; b < c.length; b++) {
			var a = c[b];
			d.blur();
			d.disabled = "true"
		}
	} else {
		d.disabled = "true"
	}
};
$DE.enable = function(d) {
	d = d || this;
	d = $D(d);
	if (d.tagName.toLowerCase() == "form") {
		var c = d.elements;
		for (var b = 0; b < c.length; b++) {
			var a = c[b];
			d.disabled = ""
		}
	} else {
		d.disabled = ""
	}
};
$DE.scrollTo = function(b) {
	b = b || this;
	b = $D(b);
	var a = b.x ? b.x : b.offsetLeft, c = b.y ? b.y : b.offsetTop;
	window.scrollTo(a, c)
};
$DE.getDimensions = function(g) {
	g = g || this;
	g = $D(g);
	var j;
	if (g.tagName.toLowerCase() == "script") {
		j = {
			width : 0,
			height : 0
		}
	} else {
		if ($DE.visible(g)) {
			if (isIE && g.offsetWidth == 0 && g.offsetHeight == 0) {
				j = {
					width : g.currentStyle.width.replace(/\D/g, ""),
					height : g.currentStyle.height.replace(/\D/g, "")
				}
			} else {
				j = {
					width : g.offsetWidth,
					height : g.offsetHeight
				}
			}
		} else {
			var d = g.style;
			var f = d.visibility;
			var k = d.position;
			var b = d.display;
			d.visibility = "hidden";
			d.position = "absolute";
			d.display = "block";
			var a = g.clientWidth;
			var c = g.clientHeight;
			d.display = b;
			d.position = k;
			d.visibility = f;
			j = {
				width : a,
				height : c
			}
		}
	}
	return j
};
$DE.getPosition = function(m) {
	m = m || this;
	m = $D(m);
	var k = m.ownerDocument;
	if (m.parentNode === null || m.style.display == "none") {
		return false
	}
	var l = null;
	var j = [];
	var g;
	if (m.getBoundingClientRect) {
		g = m.getBoundingClientRect();
		var c = Math.max(k.documentElement.scrollTop, k.body.scrollTop);
		var d = Math.max(k.documentElement.scrollLeft, k.body.scrollLeft);
		var b = g.left + d - k.documentElement.clientLeft;
		var a = g.top + c - k.documentElement.clientTop;
		if (isIE) {
			b--;
			a--
		}
		return {
			x : b,
			y : a
		}
	} else {
		if (k.getBoxObjectFor) {
			g = k.getBoxObjectFor(m);
			var h = (m.style.borderLeftWidth)
					? parseInt(m.style.borderLeftWidth)
					: 0;
			var f = (m.style.borderTopWidth)
					? parseInt(m.style.borderTopWidth)
					: 0;
			j = [g.x - h, g.y - f]
		}
	}
	if (m.parentNode) {
		l = m.parentNode
	} else {
		l = null
	}
	while (l && l.tagName != "BODY" && l.tagName != "HTML") {
		j[0] -= l.scrollLeft;
		j[1] -= l.scrollTop;
		if (l.parentNode) {
			l = l.parentNode
		} else {
			l = null
		}
	}
	return {
		x : j[0],
		y : j[1]
	}
};
$DE.getPositionEx = function(c) {
	c = c || this;
	c = $D(c);
	var f = $DE.getPosition(c);
	var d = window;
	var a, b;
	while (d != d.parent) {
		if (d.frameElement) {
			pos2 = $DE.getPosition(d.frameElement);
			f.x += pos2.x;
			f.y += pos2.y
		}
		a = Math.max(d.document.body.scrollLeft,
				d.document.documentElement.scrollLeft);
		b = Math.max(d.document.body.scrollTop,
				d.document.documentElement.scrollTop);
		f.x -= a;
		f.y -= b;
		d = d.parent
	}
	return f
};
$DE.getParent = function(a, b) {
	b = b || this;
	b = $D(b);
	while (b) {
		if (b.tagName.toLowerCase() == a.toLowerCase()) {
			return $D(b)
		}
		b = b.parentElement
	}
	return null
};
$DE.getParentByAttr = function(a, c, b) {
	b = b || this;
	b = $D(b);
	while (b) {
		if (b.getAttribute(a) == c) {
			return $D(b)
		}
		b = b.parentElement
	}
	return null
};
$DE.getTopLevelWindow = function() {
	var a = window;
	while (a != a.parent) {
		a = a.parent
	}
	return a
};
$DE.hasClassName = function(a, b) {
	b = b || this;
	b = $D(b);
	return (new RegExp(("(^|\\s)" + a + "(\\s|$D)"), "i").test(b.className))
};
$DE.addClassName = function(b, d, c) {
	c = c || this;
	c = $D(c);
	var a = c.className;
	a = a ? a : "";
	if (!new RegExp(("(^|\\s)" + b + "(\\s|$D)"), "i").test(a)) {
		if (d) {
			c.className = b + ((a.length > 0) ? " " : "") + a
		} else {
			c.className = a + ((a.length > 0) ? " " : "") + b
		}
	}
	return c.className
};
$DE.removeClassName = function(b, c) {
	c = c || this;
	c = $D(c);
	var a = new RegExp(("(^|\\s)" + b + "(?=\\s|$D)"), "i");
	c.className = c.className.replace(a, "").replace(/^\s+|\s+$D/g, "");
	return c.className
};
$DE.computePosition = function(c, m, b, l, k, q, g, j) {
	var o = j ? j.document : document;
	var d = isQuirks ? o.body.clientWidth : o.documentElement.clientWidth;
	var a = isQuirks ? o.body.clientHeight : o.documentElement.clientHeight;
	var n = Math.max(o.documentElement.scrollLeft, o.body.scrollLeft);
	var f = Math.max(o.documentElement.scrollTop, o.body.scrollTop);
	if (!k || k.toLowerCase() == "all") {
		if (l - f + g - a < 0) {
			if (b - n + q - d < 0) {
				return {
					x : b,
					y : l
				}
			} else {
				return {
					x : b - q,
					y : l
				}
			}
		}
		if (c - n + q - d < 0) {
			return {
				x : c,
				y : m - g
			}
		} else {
			return {
				x : c - q,
				y : m - g
			}
		}
	} else {
		if (k.toLowerCase() == "right") {
			if (l - f + g - a < 0) {
				if (b - n + q - d < 0) {
					return {
						x : b,
						y : l
					}
				}
			}
			return {
				x : c,
				y : m - g
			}
		} else {
			if (k.toLowerCase() == "left") {
				if (l - f + g - a < 0) {
					if (b - n - q > 0) {
						return {
							x : b,
							y : l
						}
					}
				}
				return {
					x : c - q,
					y : m - g
				}
			}
		}
	}
};
function getEvent(a) {
	return window.event || a
}	
var Tree = {};
var Constant={};
Constant.TreeLevel = "_ERICAN_TREE_LEVEL";
Constant.TreeStyle = "_ERICAN_TREE_STYLE";
Constant.Icon_Branch_NotLast_NotExpand = "Icons/treeicon01.gif";
Constant.Icon_Branch_NotLast_Expand = "Icons/treeicon02.gif";
Constant.Icon_Branch_Last_NotExpand = "Icons/treeicon04.gif";
Constant.Icon_Branch_Last_Expand = "Icons/treeicon05.gif";
Constant.Branch_NotLast_NotExpand = "1";
Constant.Branch_NotLast_Expand = "2";
Constant.Branch_Last_NotExpand = "3";
Constant.Branch_Last_Expand = "4";
Tree.CurrentItem = null;
Tree.onItemClick = function(a, b) {
	if (Tree.CurrentItem) {
		Tree.CurrentItem.className = ""
	}
	Tree.CurrentItem = b;
	b.className = "cur"
	
};
Tree.onItemDblClick = function(b, f) {
	b = getEvent(b);
	Tree.CurrentItem = f;
	if (Tree.hasChild(f) && !Tree.isRoot(f)) {
		var c;
		var a = f.$DT("img");
		for (var d = 0; d < a.length; d++) {
			var g = a[d];
			if (g.src.indexOf("Icons/treeicon01") > 0
					|| g.src.indexOf("Icons/treeicon02") > 0
					|| g.src.indexOf("Icons/treeicon04") > 0
					|| g.src.indexOf("Icons/treeicon05") > 0) {
				c = g;
				break
			}
		}
		Tree.onBranchIconClick(b, c)
	}
};
Tree.onContextMenu = function(a) {
	a = getEvent(a);
	Tree.CurrentItem = a.srcElement
};
Tree.onMouseOver = function(b) {
	b = getEvent(b);
	var c = b.srcElement;
	if (c == Tree.CurrentItem) {
		return
	}
	var a = c.getAttribute("ztype");
	if (a && a.toLowerCase() == "rootmenu") {
		return
	} else {
		c.className = "over"
	}
};
Tree.onMouseOut = function(b) {
	b = getEvent(b);
	var c = b.srcElement;
	if (c == Tree.CurrentItem) {
		return
	}
	var a = c.getAttribute("ztype");
	if (a && a.toLowerCase() == "rootmenu") {
		return
	} else {
		c.className = ""
	}
};
Tree.isRoot = function(a) {
	return $D(a).$DA("level") === "0"
};
Tree.hasChild = function(a) {
	if (a.getAttribute("lazy") == "1") {
		return true
	}
	if (a.nextSibling && a.nextSibling.tagName.toLowerCase() == "div") {
		return true
	}
	return false
};
Tree.onBranchIconClick = function(a, f) {
	a = getEvent(a);
	if (!f) {
		f = a.srcElement
	}
	var b = f;
	f = $D(f).getParent("p");
	var c = f.getAttribute("lazy");
	if (c == "1") {
		Tree.lazyLoad(f, function() {
					f.setAttribute("lazy", "0")
				})
	} else {
		if (f.nextSibling && Tree.hasChild(f)) {
			$DE.toggle(f.nextSibling)
		}
	}
	
	
	var d = f.getAttribute("expand");
	var g;
	if (d == Constant.Branch_NotLast_NotExpand) {
		g = Constant.Icon_Branch_NotLast_Expand;
		d = Constant.Branch_NotLast_Expand
	} else {
		if (d == Constant.Branch_NotLast_Expand) {
			g = Constant.Icon_Branch_NotLast_NotExpand;
			d = Constant.Branch_NotLast_NotExpand
		} else {
			if (d == Constant.Branch_Last_Expand) {
				g = Constant.Icon_Branch_Last_NotExpand;
				d = Constant.Branch_Last_NotExpand
			} else {
				if (d == Constant.Branch_Last_NotExpand) {
					g = Constant.Icon_Branch_Last_Expand;
					d = Constant.Branch_Last_Expand
				}
			}
		}
	}
	f.setAttribute("expand", d);
};
Tree.init = function(a) {
	a = $D(a);
	Tree.setParam(a, Constant.ID, a.id);
	Tree.setParam(a, Constant.Method, a.getAttribute("method"));
	Tree.setParam(a, Constant.TagBody, a.TagBody)
};
Tree.getParam = function(b, a) {
	b = $D(b);
	return b.Params.get(a)
};
Tree.setParam = function(c, a, b) {

};
Tree.loadData = function(b, a) {
	b = $D(b);
	var c = b.id;
	Server.sendRequest("com.sweii.framework.controls.TreePage.doWork",
			b.Params, function(g) {
				var f = document.createElement("div");
				f.setAttribute("ztype", "_Tree");
				f.innerHTML = g.get("HTML");
				var d = $DE.getParentByAttr(b, "ztype", "_Tree");
				if (d) {
					b = d
				}
				b.parentElement.replaceChild(f, b);
				if (isIE) {
					execScript(f.getElementsByTagName("script")[0].text)
				}
				b = null;
				Tree.CurrentItem = null;
				if (a) {
					a()
				}
			})
};
Tree.lazyLoad = function(c, b) {
	c = $D(c);
	var a = c.getParentByAttr("ztype", "_Tree");
	Tree.setParam(a, "ParentLevel", c.getAttribute("level"));
	Tree.setParam(a, "ParentID", c.getAttribute("cid"));
	Tree.setParam(a, "LevelStr", c.getAttribute("levelstr"));
	Server.sendRequest("com.sweii.framework.controls.TreePage.doWork",
			a.Params, function(f) {
				var d = document.createElement("div");
				d.innerHTML = f.get("HTML");
				c.insertAdjacentElement("afterEnd", d);
				Tree.setParam(a, "ParentLevel", "");
				Tree.setParam(a, "ParentID", "");
				Tree.setParam(a, "LevelStr", "");
				if (b) {
					b()
				}
			})
};
Tree.select = function(c, b, d, g) {
	c = $D(c);
	var a = c.getElementsByTagName("p");
	for (var f = 0; f < a.length; f++) {
		var h = a[f];
		if (h.getAttribute(b) == d) {
			h.className = "cur";
			Tree.CurrentItem = h;
			if (g) {
				h.onclick.apply(h)
			}
			break
		}
	}
};
Tree.clear = function(a) {
	a = $D(a);
	a.innerHTML = "";
	Tree.CurrentItem = null
};
Tree.dragEnd = function(evt) {
	var afterDrag = $D(this).$DA("afterDrag");
	if (!afterDrag) {
		return
	}
	var func = eval(afterDrag);
	func.apply(this, arguments)
};
Tree.dragOver = function(a) {
	this.style.fontWeight = "bold";
	this.style.backgroundColor = "#EDFBD2"
};
Tree.dragOut = function(a) {
	this.style.fontWeight = "normal";
	this.style.backgroundColor = "#FFF"
};