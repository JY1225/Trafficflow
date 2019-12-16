var CONTEXTPATH = '/';
var isIE = navigator.userAgent.toLowerCase().indexOf("msie") != -1;
var isIE6 = navigator.userAgent.toLowerCase().indexOf("msie 6.0") != -1;
var isIE7 = navigator.userAgent.toLowerCase().indexOf("msie 7.0") != -1
		&& !window.XDomainRequest;
var isIE8 = !!window.XDomainRequest;
var isGecko = navigator.userAgent.toLowerCase().indexOf("gecko") != -1;
var isQuirks = document.compatMode == "BackCompat";
if (isGecko) {
	var p = HTMLElement.prototype;
	p.__defineSetter__("innerText", function(a) {
				this.textContent = a
			});
	p.__defineGetter__("innerText", function() {
				return this.textContent
			});
	p.insertAdjacentElement = function(a, b) {
		switch (a) {
			case "beforeBegin" :
				this.parentNode.insertBefore(b, this);
				break;
			case "afterBegin" :
				this.insertBefore(b, this.firstChild);
				break;
			case "beforeEnd" :
				this.appendChild(b);
				break;
			case "afterEnd" :
				if (this.nextSibling) {
					this.parentNode.insertBefore(b, this.nextSibling)
				} else {
					this.parentNode.appendChild(b)
				}
				break
		}
	};
	p.insertAdjacentHTML = function(b, d) {
		var c = this.ownerDocument.createRange();
		c.setStartBefore(this);
		var a = c.createContextualFragment(d);
		this.insertAdjacentElement(b, a)
	};
	p.attachEvent = function(b, a) {
		b = b.substring(2);
		this.addEventListener(b, a, false)
	};
	p.detachEvent = function(b, a) {
		b = b.substring(2);
		this.removeEventListener(b, a, false)
	};
	p.__defineGetter__("currentStyle", function() {
				return this.ownerDocument.defaultView.getComputedStyle(this,
						null)
			});
	p.__defineGetter__("children", function() {
				var b = [];
				for (var a = 0; a < this.childNodes.length; a++) {
					var c = this.childNodes[a];
					if (c.nodeType == 1) {
						b.push(c)
					}
				}
				return b
			});
	p.__defineSetter__("outerHTML", function(b) {
				var a = this.ownerDocument.createRange();
				a.setStartBefore(this);
				var c = a.createContextualFragment(b);
				this.parentNode.replaceChild(c, this);
				return b
			});
	p.__defineGetter__("outerHTML", function() {
				var a;
				var b = this.attributes;
				var d = "<" + this.tagName.toLowerCase();
				for (var c = 0; c < b.length; c++) {
					a = b[c];
					if (a.specified) {
						d += " " + a.name + '="' + a.value + '"'
					}
				}
				if (!this.hasChildNodes) {
					return d + ">"
				}
				return d + ">" + this.innerHTML + "</"
						+ this.tagName.toLowerCase() + ">"
			});
	p.__defineGetter__("canHaveChildren", function() {
				switch (this.tagName.toLowerCase()) {
					case "area" :
					case "base" :
					case "basefont" :
					case "col" :
					case "frame" :
					case "hr" :
					case "img" :
					case "br" :
					case "input" :
					case "isindex" :
					case "link" :
					case "meta" :
					case "param" :
						return false
				}
				return true
			});
	Event.prototype.__defineGetter__("srcElement", function() {
				var a = this.target;
				while (a&& a.nodeType &&a.nodeType != 1) {
					a = a.parentNode
				}
				return a
			});
	p.__defineGetter__("parentElement", function() {
				if (this.parentNode == this.ownerDocument) {
					return null
				}
				return this.parentNode
			})
} else {
	try {
		document.documentElement.addBehavior("#default#userdata");
		document.execCommand("BackgroundImageCache", false, true)
	} catch (e) {
		// alert(e)
	}
}
var _setTimeout = setTimeout;
window.setTimeout = function(f, c, d) {
	var b = Array.prototype.slice.call(arguments, 2);
	var a = function() {
		f.apply(null, b)
	};
	return _setTimeout(a, c)
};
var Core = {};
Core.attachMethod = function(b) {
	if (!b || b["$A"]) {
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
		for (var d in $E) {
			b[d] = c.$E[d]
		}
	} catch (a) {
	}
};
var Constant = {};
Constant.Null = "_ERICAN_NULL";
// 通过$ ID获到元素
function $(a) {
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
// 通过ID获取 from值元素值方法
function $V(b) {
	var a = b;
	b = $(b);
	if (!b) {
		// alert("表单元素不存在:" + a);
		return null
	}
	switch (b.type.toLowerCase()) {
		case "submit" :
		case "hidden" :
		case "password" :
		case "textarea" :
		case "file" :
		case "image" :
		case "select-one" :
		case "text" :
			return b.value;
		case "checkbox" :
		case "radio" :
			if (b.checked) {
				return b.value
			} else {
				return null
			}
		default :
			return ""
	}
}
// 将b值赋给form的c元素
/**
 * @param c
 *            为元素ID号
 * @param b为设置值
 * 
 */
function $S(c, b) {
	var a = c;
	c = $(c);
	if (!c) {
		// alert("表单元素不存在:" + a);
		return
	}
	switch (c.type.toLowerCase()) {
		case "submit" :
		case "hidden" :
		case "password" :
		case "textarea" :
		case "button" :
		case "file" :
		case "image" :
		case "select-one" :
		case "text" :
			c.value = b;
			break;
		case "checkbox" :
		case "radio" :
			if (c.value == "" + b) {
				c.checked = true
			} else {
				c.checked = false
			}
			c.value=b;
			break
	}
}
// 通过标签名称获到所有元素
/**
 * param d 元素Tag名称,如input,select param g 为返回某个元素下的所有子元素Tag名称
 */
function $T(d, g) {
	g = $(g);
	g = g || document;
	// 处理firefox下的问题,IE没不需要
	var f=null;
	try{
		f = g.getElementsByTagName(d);
	}catch(e){
		f=document.getElementsByTagName(d);
	}
	// ----------------------------------------
	var b = [];
	var a = f.length;
	for (var c = 0; c < a; c++) {
		b.push($(f[c]))
	}
	return b
}
// 通过元素名称返回所有同名元素
function $N(c) {
	if (typeof(c) == "string") {
		c = document.getElementsByName(c);
		if (!c || c.length == 0) {
			return null
		}
		var a = [];
		for (var b = 0; b < c.length; b++) {
			var d = c[b];
			if (d.getAttribute("ztype") == "select") {
				d = d.parentNode
			}
			Core.attachMethod(d);
			a.push(d)
		}
		c = a
	}
	return c
}

// 获取所以同名元素值
function $NV(d) {
	d = $N(d);
	if (!d) {
		return null
	}
	var a = [];
	for (var c = 0; c < d.length; c++) {
		var b = $V(d[c]);
		if (b != null) {
			a.push(b)
		}
	}
	return a.length == 0 ? null : a
}

function $NS(f, d) {
	f = $N(f);
	if (!f) {
		return
	}
	if (!f[0]) {
		return $S(f, d)
	}
	if (f[0].type == "checkbox") {
		if (d == null) {
			d = new Array(4)
		}
		var a = d;
		if (!isArray(d)) {
			a = d.split(",")
		}
		for (var b = 0; b < a.length; b++) {
			for (var c = 0; c < f.length; c++) {
				if (f[c].checked) {
					continue
				}
				$S(f[c], a[b])
			}
		}
		return
	}
	for (var c = 0; c < f.length; c++) {
		$S(f[c], d)
	}
}
// 返回form对象
function $F(a) {
	if (!a) {
		return document.forms[0]
	} else {
		a = $(a);
		if (a && a.tagName.toLowerCase() != "form") {
			return null
		}
		return a
	}
}
// 替换特殊字符
function encodeURL(a) {
	return encodeURI(a).replace(/=/g, "%3D").replace(/\+/g, "%2B").replace(
			/\?/g, "%3F").replace(/\&/g, "%26")
}
// 替换特殊字符
function htmlEncode(a) {
	return a.replace(/&/g, "&amp;").replace(/\"/g, "&quot;").replace(/</g,
			"&lt;").replace(/>/g, "&gt;").replace(/ /g, "&nbsp;")
}
// 替换特殊字符
function htmlDecode(a) {
	return a.replace(/\&quot;/g, '"').replace(/\&lt;/g, "<").replace(/\&gt;/g,
			">").replace(/\&nbsp;/g, " ").replace(/\&amp;/g, "&")
}
// 判断值是否为整数
function isInt(a) {
	return /^\-?\d+$/.test("" + a)
}
// 判断值是否为数字
function isNumber(d) {
	var b = "" + d;
	for (var a = 0; a < d.length; a++) {
		var c = d.charAt(a);
		if(a==0&&c=="-"){// kfz 判断负数
			continue;
		}
		if (c != "." && c != "E" && isNaN(parseInt(c))) {
			return false
		}
	}
	return true
}
// 判断值是否为时间
function isTime(c) {
	var a = c.split(":");
	if (a.length != 3) {
		return false
	}
	var b = new Date();
	b.setHours(a[0]);
	b.setMinutes(a[1]);
	b.setSeconds(a[2]);
	return b.toString().indexOf("Invalid") < 0
}
// 判断值是否为日期
function isDate(c) {
	var a = c.split("-");
	if (a.length != 3) {
		return false
	}
	var b = new Date();
	b.setFullYear(a[0]);
	b.setMonth(a[1]);
	b.setDay(a[2]);
	return b.toString().indexOf("Invalid") < 0
}
// 判断是否为数组
function isArray(a) {
	if (!a) {
		return false
	}
	if (a.constructor.toString().indexOf("Array") == -1) {
		return false
	} else {
		return true
	}
}
// 判断是否为手机号码
function isPhone(a){
if((/^13\d{9}$/g.test(a))||(/^18\d{9}$/g.test(a))||(/^15\d{9}$/g.test(a))) {
   return true;
}else{
  return false;
}

}
// 获到Window事件
function getEvent(a) {
	return window.event || a
}
// 停止 Event
function stopEvent(a) {
	a = getEvent(a);
	if (!a) {
		return
	}
	if (isGecko) {
		a.preventDefault();
		a.stopPropagation()
	}
	a.cancelBubble = true;
	a.returnValue = false
}

function cancelEvent(a) {
	a = getEvent(a);
	a.cancelBubble = true
}
function getEventPosition(b) {
	b = getEvent(b);
	var f = {
		x : b.clientX,
		y : b.clientY
	};
	var d;
	if (isGecko) {
		d = b.srcElement.ownerDocument.defaultView
	} else {
		d = b.srcElement.ownerDocument.parentWindow
	}
	var a, c;
	while (d != d.parent) {
		if (d.frameElement) {
			pos2 = $E.getPosition(d.frameElement);
			f.x += pos2.x;
			f.y += pos2.y
		}
		a = Math.max(d.document.body.scrollLeft,
				d.document.documentElement.scrollLeft);
		c = Math.max(d.document.body.scrollTop,
				d.document.documentElement.scrollTop);
		f.x -= a;
		f.y -= c;
		d = d.parent
	}
	return f
}
// 将xml字符串转换为Dom对象
function toXMLDOM(a) {
	var f;
	try {
		try {
			f = new ActiveXObject("Microsoft.XMLDOM")
		} catch (b) {
			f = new ActiveXObject("Msxml2.DOMDocument")
		}
		f.loadXML(a)
	} catch (d) {
		var c = new DOMParser();
		f = c.parseFromString(a, "text/xml")
	}
	return f
}
// 判断字符串是否以a开始
String.prototype.startWith = function(a) {
	return this.indexOf(a) == 0
};
// 判断字符串是否以a结束
String.prototype.endWith = function(a) {
	return this.charAt(this.length - 1) == a
};
// 去掉字符串空格
String.prototype.trim = function() {
	return this.replace(/(^\s*)|(\s*$)/g, "")
};
//
String.prototype.leftPad = function(g, f) {
	if (!isNaN(f)) {
		var b = "";
		for (var d = this.length; d < f; d++) {
			b = b.concat(g)
		}
		b = b.concat(this);
		return b
	}
	return null
};
String.prototype.rightPad = function(g, f) {
	if (!isNaN(f)) {
		var b = this;
		for (var d = this.length; d < f; d++) {
			b = b.concat(g)
		}
		return b
	}
	return null
};
// 复制数组
Array.prototype.clone = function() {
	var a = this.length;
	var c = [];
	for (var b = 0; b < a; b++) {
		if (typeof(this[b]) == "undefined" || this[b] == null) {
			c[b] = this[b];
			continue
		}
		if (this[b].constructor == Array) {
			c[b] = this[b].clone()
		} else {
			c[b] = this[b]
		}
	}
	return c
};
// 将元素b插入d位置
Array.prototype.insert = function(b, d) {
	if (isNaN(b) || b < 0 || b > this.length) {
		this.push(d)
	} else {
		var a = this.slice(b);
		this[b] = d;
		for (var c = 0; c < a.length; c++) {
			this[b + 1 + c] = a[c]
		}
	}
	return this
};
// 删除数组b位置元素
Array.prototype.remove = function(b) {
	for (var a = 0; a < this.length; a++) {
		if (b == this[a]) {
			this.splice(a, 1)
		}
	}
};
// 历遍数组
Array.prototype.each = function(d) {
	var a = this.length;
	for (var c = 0; c < a; c++) {
		try {
			d(this[c], c)
		} catch (b) {
			// alert("Array.prototype.each:" + b.message)
		}
	}
};
var Form = {};

Form.setValue = function(d, b) {
	b = $F(b);
	for (var a = 0; a < b.elements.length; a++) {
		var g = $(b.elements[a]);
		if (g.$A("ztype") == "select") {
			g = g.parentElement
		}
		if (g.type == "checkbox" || g.type == "radio") {
			if (g.name) {
				$NS(g.name, d.get(g.name));
				continue
			}
		}
		var f = g.id.toLowerCase();
		if (d.get(f)) {
			$S(g, d.get(f))
		}
	}
};
Form.getData = function(g) {
	g = $F(g);
	if (!g) {
		// alert("查找表单元素失败!" + g);
		return
	}
	var d = new DataCollection();
	var b = g.elements;
	for (var f = 0; f < b.length; f++) {
		var h = $(b[f]);
		var a = h.id;
		if (!h.type) {
			continue
		}
		if (h.type == "checkbox" || h.type == "radio") {
			if (h.name) {
				d.add(h.name, $NV(h.name));
				continue
			}
		}
		if (!a) {
			continue
		}
		if (h.$A("ztype") == "select") {
			h = h.parentElement
		}
		d.add(h.id, $V(h))
	}
	return d
};

var $E = {};
$E.$A = function(a, b) {
	b = b || this;
	b = $(b);
	return b.getAttribute ? b.getAttribute(a) : null
};
$E.$T = function(a, b) {
	b = b || this;
	b = window.$(b);
	return window.$T(a, b)
};
$E.visible = function(a) {
	a = a || this;
	a = $(a);
	if (a.style.display == "none") {
		return false
	}
	return true
};
$E.toggle = function(a) {
	a = a || this;
	a = $(a);
	$E[$E.visible(a) ? "hide" : "show"](a)
};
$E.toString = function(b, d, h) {
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
$E.hide = function(a) {
	a = a || this;
	a = $(a);
	a.style.display = "none"
};
$E.focusEx = function(b) {
	b = b || this;
	b = $(b);
	try {
		b.focus()
	} catch (a) {
	}
};
$E.show = function(a) {
	a = a || this;
	a = $(a);
	a.style.display = ""
};
$E.getForm = function(a) {
	a = a || this;
	a = $(a);
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
		return $E.GetForm(a)
	}
};
$E.disable = function(d) {
	d = d || this;
	d = $(d);
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
$E.enable = function(d) {
	d = d || this;
	d = $(d);
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
$E.scrollTo = function(b) {
	b = b || this;
	b = $(b);
	var a = b.x ? b.x : b.offsetLeft, c = b.y ? b.y : b.offsetTop;
	window.scrollTo(a, c)
};
$E.getDimensions = function(g) {
	g = g || this;
	g = $(g);
	var j;
	if (g.tagName.toLowerCase() == "script") {
		j = {
			width : 0,
			height : 0
		}
	} else {
		if ($E.visible(g)) {
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
$E.getPosition = function(m) {
	m = m || this;
	m = $(m);
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
$E.getPositionEx = function(c) {
	c = c || this;
	c = $(c);
	var f = $E.getPosition(c);
	var d = window;
	var a, b;
	while (d != d.parent) {
		if (d.frameElement) {
			pos2 = $E.getPosition(d.frameElement);
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
$E.getParent = function(a, b) {
	b = b || this;
	b = $(b);
	while (b) {
		if (b.tagName.toLowerCase() == a.toLowerCase()) {
			return $(b)
		}
		b = b.parentElement
	}
	return null
};
$E.getParentByAttr = function(a, c, b) {
	b = b || this;
	b = $(b);
	while (b) {
		if (b.getAttribute(a) == c) {
			return $(b)
		}
		b = b.parentElement
	}
	return null
};
$E.getTopLevelWindow = function() {
	var a = window;
	while (a != a.parent) {
		a = a.parent
	}
	return a
};
$E.hasClassName = function(a, b) {
	b = b || this;
	b = $(b);
	return (new RegExp(("(^|\\s)" + a + "(\\s|$)"), "i").test(b.className))
};
$E.addClassName = function(b, d, c) {
	c = c || this;
	c = $(c);
	var a = c.className;
	a = a ? a : "";
	if (!new RegExp(("(^|\\s)" + b + "(\\s|$)"), "i").test(a)) {
		if (d) {
			c.className = b + ((a.length > 0) ? " " : "") + a
		} else {
			c.className = a + ((a.length > 0) ? " " : "") + b
		}
	}
	return c.className
};
$E.removeClassName = function(b, c) {
	c = c || this;
	c = $(c);
	var a = new RegExp(("(^|\\s)" + b + "(?=\\s|$)"), "i");
	c.className = c.className.replace(a, "").replace(/^\s+|\s+$/g, "");
	return c.className
};
$E.computePosition = function(c, m, b, l, k, q, g, j) {
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

var Server = {};
Server.RequestMap = {};
Server.MainServletURL = "MainServlet.jsp";
Server.ContextPath = CONTEXTPATH;
Server.Pool = [];
Server.getXMLHttpRequest = function() {
	for (var b = 0; b < Server.Pool.length; b++) {
		if (Server.Pool[b][1] == "0") {
			Server.Pool[b][1] = "1";
			return Server.Pool[b][0]
		}
	}
	var c;
	if (window.XMLHttpRequest) {
		c = new XMLHttpRequest()
	} else {
		if (window.ActiveXObject) {
			for (var b = 5; b > 1; b--) {
				try {
					if (b == 2) {
						c = new ActiveXObject("Microsoft.XMLHTTP")
					} else {
						c = new ActiveXObject("Msxml2.XMLHTTP." + b + ".0")
					}
				} catch (a) {
				}
			}
		}
	}
	Server.Pool.push([c, "1"]);
	return c
};
Server.loadURL = function(a, c) {
	var b = Server.getXMLHttpRequest();
	b.open("GET", Server.ContextPath + a, true);
	b.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	b.onreadystatechange = function() {
		if (b.readyState == 4 && b.status == 200) {
			try {
				if (c) {
					c(b.responseText)
				}
			} finally {
				for (var d = 0; d < Server.Pool.length; d++) {
					if (Server.Pool[d][0] == b) {
						Server.Pool[d][1] = "0";
						break
					}
				}
				b = null;
				c = null
			}
		}
	};
	b.send(null)
};
Server.loadScript = function(a) {
	document.write('<script type="text/javascript" src="' + Server.ContextPath
			+ a + '"><\/script>')
};
Server.loadCSS = function(a) {
	if (isGecko) {
		var b = document.createElement("LINK");
		b.rel = "stylesheet";
		b.type = "text/css";
		b.href = a;
		document.getElementsByTagName("HEAD")[0].appendChild(b)
	} else {
		document.createStyleSheet(a)
	}
};
Server.getOneValue = function(c, b, d) {
	if (b && b.prototype == DataCollection.prototype) {
		Server.sendRequest(c, b, d)
	} else {
		var a = new DataCollection();
		a.add("_Param0", b);
		Server.sendRequest(c, a, d)
	}
};
// "message/sendMessage.do",dc,function,'json'
Server.sendRequest = function(b, d, g, h, a,s,diagWin,msg) {
	 
	if(diagWin){
		 showLoading(diagWin,msg);// closeing 不处理，窗口关闭时，自动关闭
	}
	var f;
	if (h!='json' && h != null && Server.RequestMap[h]) {
		f = Server.RequestMap[h];
		f.abort()
	} else {
		f = Server.getXMLHttpRequest()
	}
	if(s!=null){
	   f.open("POST", Server.ContextPath + b, s);
	}else{
	   f.open("POST", Server.ContextPath + b, true);
	}
	
	f.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	f.setRequestHeader("x-requested-with", "XMLHttpRequest");
	var c='';
	if (d) {
		c += d.toForm();
	}
	Server._ResponseDC = null;
	f.onreadystatechange = function() {
		if(h=='json'){
			a=h;
		}
		Server.onRequestComplete(f, g,a,diagWin)
	};
	c=encodeURI(c);
	f.send(c)
};
Server.onRequestComplete = function(Request,func,a,diagWin) {
	if (Request.readyState == 4 && Request.status == 200) {
		try {
			var textDoc = Request.responseText;
			if (func) {
				if(a=='json'){
					if(diagWin){
						closeLoading(diagWin);
					}
					func(eval('(' + textDoc + ')'));
				}else{
					func(textDoc);
				}
			}
		} finally {
			for (var i = 0; i < Server.Pool.length; i++) {
				if (Server.Pool[i][0] == Request) {
					Server.Pool[i][1] = "0";
					break
				}
			}
			Request = null;
			func = null
		}
	}
};
Server.getResponse = function() {
	return Server._ResponseDC
};
var Page = {};
Page.clickFunctions = [];
Page.click = function(b) {
	for (var a = 0; a < Page.clickFunctions.length; a++) {
		Page.clickFunctions[a](b)
	}
	if (window != window.parent) {
		window.parent.Page.click()
	}
};
Page.onClick = function(a) {
	Page.clickFunctions.push(a)
};
Page._Sort = function(b, a) {
	var d = b[1];
	var c = a[1];
	if (typeof(d) == "number") {
		if (typeof(c) == "number") {
			if (d > c) {
				return 1
			} else {
				if (d == c) {
					return 0
				} else {
					return -1
				}
			}
		}
		return -1
	} else {
		if (typeof(c) == "number") {
			return 1
		} else {
			return 0
		}
	}
};
Page.loadFunctions = [];
Page.load = function() {
	if (window._OnLoad) {
		try {
			window._OnLoad()
		} catch (b) {
		}
	}
	Page.loadFunctions.sort(Page._Sort);
	for (var a = 0; a < Page.loadFunctions.length; a++) {
		try {
			Page.loadFunctions[a][0]()
		} catch (b) {
		}
	}
};
Page.onLoad = function(b, a) {
	Page.loadFunctions.push([b, a])
};
Page.mouseDownFunctions = [];
Page.mousedown = function(b) {
	for (var a = 0; a < Page.mouseDownFunctions.length; a++) {
		Page.mouseDownFunctions[a](b)
	}
};
Page.onMouseDown = function(a) {
	Page.mouseDownFunctions.push(a)
};
Page.mouseUpFunctions = [];
Page.mouseup = function(b) {
	for (var a = 0; a < Page.mouseUpFunctions.length; a++) {
		Page.mouseUpFunctions[a](b)
	}
};
Page.onMouseUp = function(a) {
	Page.mouseUpFunctions.push(a)
};
Page.mouseMoveFunctions = [];
Page.mousemove = function(b) {
	for (var a = 0; a < Page.mouseMoveFunctions.length; a++) {
		Page.mouseMoveFunctions[a](b)
	}
};
Page.onMouseMove = function(a) {
	Page.mouseMoveFunctions.push(a)
};
if (document.attachEvent) {
	document.attachEvent("onclick", Page.click);
	document.attachEvent("onmousedown", Page.mousedown);
	window.attachEvent("onload", Page.load);
	document.attachEvent("onmouseup", Page.mouseup);
	document.attachEvent("onmousemove", Page.mousemove)
} else {
	document.addEventListener("click", Page.click, false);
	document.addEventListener("mousedown", Page.mousedown, false);
	window.addEventListener("load", Page.load, false);
	document.addEventListener("mouseup", Page.mouseup, false);
	document.addEventListener("mousemove", Page.mousemove, false)
}
document.onkeydown = check;   
function check(e) { 
    var code;   
   if (!e) var e = window.event;   
    if (e.keyCode) code = e.keyCode;   
    else if (e.which) code = e.which;   
   if (((event.keyCode == 8) &&                                                    // BackSpace
        ((event.srcElement.type != "text" &&    
         event.srcElement.type != "textarea" &&    
         event.srcElement.type != "password") ||    
        event.srcElement.readOnly == true)) ||    
        ((event.ctrlKey) && ((event.keyCode == 78) || (event.keyCode == 82)) ) ||    // CtrlN,CtrlR
        (event.keyCode == 116) ) {                                                   // F5
       event.keyCode = 0;    
       event.returnValue = false;    
   }   
    return true;   
}
function DataTable() {
	this.Columns = null;
	this.Values = null;
	this.Rows = null;
	this.ColMap = {};
	DataTable.prototype.getRowCount = function() {
		return this.Rows.length
	};
	DataTable.prototype.getColCount = function() {
		return this.Columns.length
	};
	DataTable.prototype.getColName = function(a) {
		return this.Columns[a]
	};
	DataTable.prototype.get2 = function(b, a) {
		return this.Rows[b].get2(a)
	};
	DataTable.prototype.get = function(a, b) {
		return this.Rows[a].get(b)
	};
	DataTable.prototype.getDataRow = function(a) {
		return this.Rows[a]
	};
	DataTable.prototype.init = function(d, a) {
		this.Values = a;
		this.Columns = [];
		this.Rows = [];
		for (var c = 0; c < d.length; c++) {
			var b = {};
			// b.Name = d[c][0].toLowerCase();
			b.Name = d[c][0];
			b.Type = d[c][1];
			this.Columns[c] = b;
			this.ColMap[b.Name] = c
		}
		for (var c = 0; c < a.length; c++) {
			var f = new DataRow(this, c);
			this.Rows[c] = f
		}
	};
	DataTable.prototype.toString = function() {
		var a = [];
		a.push("[");
		for (var c = 0; c < this.Values.length; c++) {
			if (c != 0) {
				a.push(",")
			}
			a.push("{");
			var addsplit=false;
			for (var b = 0; b < this.Columns.length; b++) {
				if(this.Columns[b].Name=='_RowNo')continue;
				if (addsplit) {
					a.push(",");
				}
				a.push('"' + this.Columns[b].Name + '":');
				addsplit=true;
				if (this.Values[c][b] == null
						|| typeof(this.Values[c][b]) == "undefined") {
					a.push('""');
				} else {
					if (typeof(this.Values[c][b]) == "string") {
						a.push('"' +this.Values[c][b].replace(/\"/g,   "\\\"")+ '"');
					}else{
						a.push('"' +this.Values[c][b]+ '"');
					}
					
				}
			}
			a.push("}")
		}
		a.push("]");
		return a.join("")
	}
}
function DataRow(b, a) {
	this.DT = b;
	this.Index = a;
	DataRow.prototype.get2 = function(c) {
		return this.DT.Values[this.Index][c]
	};
	DataRow.prototype.getColCount = function() {
		return this.DT.Columns.length
	};
	DataTable.prototype.getColName = function(c) {
		return this.DT.Columns[c]
	};
	DataRow.prototype.get = function(d) {
		// d = d.toLowerCase();
		var f = this.DT.ColMap[d];
		if (typeof(f) == "undefined") {
			return null
		}
		return this.DT.Values[this.Index][f]
	};
	DataRow.prototype.set = function(f, d) {
		// f = f.toLowerCase();
		var g = this.DT.ColMap[f];
		if (typeof(g) == "undefined") {
			return
		}
		this.DT.Values[this.Index][g] = d
	};
	DataRow.prototype.set2 = function(c, d) {
		this.DT.Values[this.Index][c] = d
	}
}
function DataCollection() {
	this.map = {};
	this.valuetype = {};
	this.keys = [];
	DataCollection.prototype.get = function(ID) {
		if (typeof(ID) == "number") {
			return this.map[this.keys[ID]]
		}
		return this.map[ID]
	};
	DataCollection.prototype.getKey = function(index) {
		return this.keys[index]
	};
	DataCollection.prototype.size = function() {
		return this.keys.length
	};
	DataCollection.prototype.remove = function(ID) {
		if (typeof(ID) == "number") {
			this.map[this.keys[ID]] = null;
			this.keys[ID]
		}
		return this.map[ID]
	};
	DataCollection.prototype.toQueryString = function() {
		var arr = [];
		for (var i = 0; i < this.keys.length; i++) {
			if (this.map[this.keys[i]] == null || this.map[this.keys[i]] == "") {
				continue
			}
			if (i != 0) {
				arr.push("&")
			}
			arr.push(this.keys[i] + "=" + this.map[this.keys[i]])
		}
		return arr.join("")
	};
	DataCollection.prototype.parseXML = function(xmlDoc) {
		var coll = xmlDoc.documentElement;
		if (!coll) {
			return false
		}
		var nodes = coll.childNodes;
		var len = nodes.length;
		for (var i = 0; i < len; i++) {
			var node = nodes[i];
			var Type = node.getAttribute("Type");
			var ID = node.getAttribute("ID");
			this.valuetype[ID] = Type;
			if (Type == "String") {
				var v = node.firstChild.nodeValue;
				if (v == Constant.Null) {
					v = null
				}
				this.map[ID] = v
			} else {
				if (Type == "StringArray") {
					this.map[ID] = eval("[" + node.firstChild.nodeValue + "]")
				} else {
					if (Type == "DataTable" || Type == "Schema"
							|| Type == "SchemaSet") {
						this.parseDataTable(node, "DataTable")
					} else {
						this.map[ID] = node.getAttribute("Value")
					}
				}
			}
			this.keys.push(ID)
		}
		return true
	};
	DataCollection.prototype.toForm = function() {
		var arr = [];
		for (var ID in this.map) {
			try {
				var v = this.map[ID];
				if(ID.indexOf('_ERICAN_')!=-1){
					if(ID=='_ERICAN_PAGEINDEX'){
						v=parseInt(v)+1;
						ID="pageNo";
					}else if(ID=='_ERICAN_SIZE'){
						ID="pageSize";
					}/*
						 * else if(ID=='_ERICAN_SORTSTRING'){ ID="sortString" }
						 */else{
						continue;
					}
				}else if(ID=='undefined'){
					continue;
				}
				arr.push("&"+ID+"=");
				arr.push(v)
			} catch (ex) {
				// alert("DataCollection.toForm():" + ID + "," + ex.message)
			}
		}
		return arr.join("")
	};
	DataCollection.prototype.parseDataTable = function(node, strType) {
		var cols = node.childNodes[0].childNodes[0].nodeValue;
		cols = "var _TMP1 = " + cols + "";
		eval(cols);
		cols = _TMP1;
		var values = node.childNodes[1].childNodes[0].nodeValue;
		values = "var _TMP2 = " + values + "";
		eval(values);
		values = _TMP2;
		var obj;
		obj = new DataTable();
		obj.init(cols, values);
		this.add(node.getAttribute("ID"), obj)
	};
	DataCollection.prototype.toXML = function() {
		var arr = [];
		arr.push('<?xml version="1.0" encoding="UTF-8"?>');
		arr.push("<collection>");
		for (var ID in this.map) {
			try {
				var v = this.map[ID];
				arr.push('<element ID="' + ID + '" Type="' + this.valuetype[ID]
						+ '">');
				if (this.valuetype[ID] == "DataTable") {
					arr.push(v.toString())
				} else {
					if (this.valuetype[ID] == "String") {
						if (v == null || typeof(v) == "undefined") {
							arr.push("<![CDATA[" + Constant.Null + "]]>")
						} else {
							arr.push("<![CDATA[" + v + "]]>")
						}
					} else {
						arr.push(v)
					}
				}
				arr.push("</element>")
			} catch (ex) {
				// alert("DataCollection.toXML():" + ID + "," + ex.message)
			}
		}
		arr.push("</collection>");
		return arr.join("")
	};
	DataCollection.prototype.add = function(ID, Value, Type) {
		this.map[ID] = Value;
		this.keys.push(ID);
		if (Type) {
			this.valuetype[ID] = Type
		} else {
			if (Value && Value.getDataRow) {
				this.valuetype[ID] = "DataTable"
			} else {
				this.valuetype[ID] = "String"
			}
		}
	}
}
var Cookie = {};
Cookie.Spliter = "_ERICAN_SPLITER_";
Cookie.get = function(c) {
	var d = document.cookie.split("; ");
	for (i = 0; i < d.length; i++) {
		var a = d[i].split("=");
		var f = a[0].trim();
		var b = a[1] ? a[1].trim() : "";
		if (f == c) {
			return unescape(b)
		}
	}
	return null
};
Cookie.getAll = function() {
	var f = document.cookie.split("; ");
	var g = [];
	for (i = 0; i < f.length; i++) {
		var b = f[i].split("=");
		var k = b[0].trim();
		var c = b[1] ? b[1].trim() : "";
		if (k.indexOf(Cookie.Spliter) >= 0) {
			continue
		}
		if (c.indexOf("^" + Cookie.Spliter) == 0) {
			var a = c.substring(Cookie.Spliter.length + 1, c.indexOf("$"));
			var h = [c];
			for (var d = 1; d < a; d++) {
				h.push(Cookie.get(k + Cookie.Spliter + d))
			}
			c = h.join("");
			c = c.substring(c.indexOf("$") + 1)
		}
		g.push([k, unescape(c)])
	}
	return g
};
Cookie.set = function(b, l, c, m, f, a, k) {
	if (!k) {
		var l = escape(l)
	}
	if (!b || !l) {
		return false
	}
	if (!m) {
		m = "/"
	}
	if (c != null) {
		if (/^[0-9]+$/.test(c)) {
			c = new Date(new Date().getTime() + c * 1000).toGMTString()
		} else {
			var d = DateTime.parseDate(c);
			if (d) {
				c = d.toGMTString()
			} else {
				c = undefined
			}
		}
	}
	if (!k) {
		Cookie.remove(b, m, f)
	}
	var h = b + "=" + l + ";" + ((c) ? " expires=" + c + ";" : "")
			+ ((m) ? "path=" + m + ";" : "") + ((f) ? "domain=" + f + ";" : "")
			+ ((a && a != 0) ? "secure" : "");
	if (h.length < 4096) {
		document.cookie = h
	} else {
		var j = Math.ceil(l.length * 1 / 3800);
		for (var g = 0; g < j; g++) {
			if (g == 0) {
				Cookie.set(b, "^" + Cookie.Spliter + "|" + j + "$"
								+ l.substr(0, 3800), c, m, f, a, true)
			} else {
				Cookie.set(b + Cookie.Spliter + g, l.substr(g * 3800, 3800), c,
						m, f, a, true)
			}
		}
	}
	return true
};
Cookie.remove = function(c, f, d) {
	var b = Cookie.get(c);
	if (!c || b == null) {
		return false
	}
	if (escape(b).length > 3800) {
		var a = Math.ceil(escape(b).length * 1 / 3800);
		for (i = 1; i < a; i++) {
			document.cookie = c + Cookie.Spliter + i + "=;"
					+ ((f) ? "path=" + f + ";" : "")
					+ ((d) ? "domain=" + d + ";" : "")
					+ "expires=Thu, 01-Jan-1970 00:00:01 GMT;"
		}
	}
	document.cookie = c + "=;" + ((f) ? "path=" + f + ";" : "")
			+ ((d) ? "domain=" + d + ";" : "")
			+ "expires=Thu, 01-Jan-1970 00:00:01 GMT;";
	return true
};
var Misc = {};
Misc.setButtonText = function(a, b) {
	$(a).childNodes[1].innerHTML = b + "&nbsp;"
};
Misc.withinElement = function(c, d) {
	return false;
	var b = c.relatedTarget;
	while (b && b != d && b != document.body) {
		try {
			b = b.parentNode
		} catch (a) {
			// alert("Misc.withinElement:" + a.message);
			return false
		}
	}
	return b == d
};
Misc.copyToClipboard = function(h) {
	if (h == null) {
		return
	}
	if (window.clipboardData) {
		window.clipboardData.setData("Text", h)
	} else {
		if (window.netscape) {
			try {
				netscape.security.PrivilegeManager
						.enablePrivilege("UniversalXPConnect")
			} catch (c) {
				Dialog
						.alert("Firefox自动复制功能未启用！<br>请<a href='about:config' target='_blank'>点击此处</a> 将’signed.applets.codebase_principal_support’设置为’true’")
			}
			var d = Components.classes["@mozilla.org/widget/clipboard;1"]
					.createInstance(Components.interfaces.nsIClipboard);
			if (!d) {
				return
			}
			var b = Components.classes["@mozilla.org/widget/transferable;1"]
					.createInstance(Components.interfaces.nsITransferable);
			if (!b) {
				return
			}
			b.addDataFlavor("text/unicode");
			var g = new Object();
			var a = new Object();
			var g = Components.classes["@mozilla.org/supports-string;1"]
					.createInstance(Components.interfaces.nsISupportsString);
			var j = h;
			g.data = j;
			b.setTransferData("text/unicode", g, j.length * 2);
			var f = Components.interfaces.nsIClipboard;
			if (!d) {
				return
			}
			d.setData(b, null, f.kGlobalClipboard)
		} else {
			// alert("该浏览器不支持自动复制功能！");
			return
		}
	}
	Dialog.alert(
			"己复制文字：<br><br><font color='red'>" + h + "</font><br><br>到剪贴板",
			null, 400, 200)
};
Misc.lockSelect = function(a) {
	if (!a) {
		a = document.body
	}
	if (isGecko) {
		a.style.MozUserSelect = "none";
		a.style.MozUserInput = "none"
	} else {
		document.selection.empty();
		a.onselectstart = stopEvent
	}
};
Misc.unlockSelect = function(a) {
	if (!a) {
		a = document.body
	}
	if (isGecko) {
		a.style.MozUserSelect = "";
		a.style.MozUserInput = ""
	} else {
		a.onselectstart = null
	}
};
Misc.lockScroll = function(a) {
	if (!a) {
		a = window
	}
	if (isIE) {
		a.document.body.attachEvent("onmousewheel", a.stopEvent)
	} else {
		a.addEventListener("DOMMouseScroll", a.stopEvent, false)
	}
};
Misc.unlockScroll = function(a) {
	if (!a) {
		a = window
	}
	if (isIE) {
		a.document.body.detachEvent("onmousewheel", a.stopEvent);
		a.document.body.detachEvent("onmousewheel", a.stopEvent)
	} else {
		a.removeEventListener("DOMMouseScroll", a.stopEvent, false)
	}
};
Misc.debug = function(event) {
	if (event.altKey && event.shiftKey && event.ctrlKey && event.keyCode == 68) {
		alert(eval(prompt("请输入要执行的JavaScript语句:")))
	}
};
if (isIE) {
	document.attachEvent("onkeyup", Misc.debug)
} else {
	document.addEventListener("keyup", Misc.debug, false)
}
var Application = {};
Application.isHMenu = false;
Application.onMainMenuClick = function(k, g) {
	if (Application.LastClickMainMenu) {
		Application.LastClickMainMenu.className = ""
	}
	Application.LastClickMainMenu = k;
	k.className = "liOver";
	var j = $("_ChildMenu");
	var b = $("_Child" + k.id);
	if (!b) {
		var d = k.ChildArray;
		var h = [];
		for (var c = 0; c < d.length; c++) {
			var a = "_ChildMenuItem_" + d[c][0];
			h
					.push("<div id='"
							+ a
							+ "' class='divtab' onClick='Application.onChildMenuClick(this)' onMouseOver='Application.onChildMenuMouseOver(this)' onMouseOut='Application.onChildMenuMouseOut(this)' url='"
							+ d[c][2] + "'><img src='" + d[c][3]
							+ "' /><b><span>" + d[c][1] + "</span></b></div>")
		}
		b = document.createElement("div");
		b.id = "_Child" + k.id;
		b.innerHTML = h.join("");
		j.appendChild(b)
	}
	var f = j.childNodes;
	for (var c = 0; c < f.length; c++) {
		$E.hide(f[c])
	}
	$E.show(b);
	Tab.setDivtabWidth(b);
	if (!k.CurrentItem) {
		k.CurrentItem = "_ChildMenuItem_" + d[0][0]
	}
	
	Application.onChildMenuClick($(k.CurrentItem), g)
};
Application.onMainMenuMouseOver = function(a) {
	a.className = "liOver"
};
Application.onMainMenuMouseOut = function(a) {
	if (a != Application.LastClickMainMenu) {
		a.className = ""
	}
};
var StartTime;
Application.onChildMenuClick = function(c, a) {
	StartTime = new Date().getTime();
	if (Application.LastClickMainMenu) {
		Application.LastClickMainMenu.CurrentItem = c.id
	}
	window.location.hash = c.parentElement.id.substr("_Child_Menu_".length)
			+ "_" + c.id.substr("_ChildMenuItem_".length);
	if (!a) {
		var b = c.getAttribute("url");
		$("_MainArea").src = b
	}
	Tab.onTabClick(c)
};
Application.onChildMenuMouseOver = function(a) {
	Tab.onTabMouseOver(a)
};
Application.onChildMenuMouseOut = function(a) {
	Tab.onTabMouseOut(a)
};
Page.onLoad(function() {
	if ($("_Navigation")) {
		if (window.location.hash) {
			var a = window.location.hash.split("_");
			var c = $("_Menu_" + a[0].substr(1));
			c.CurrentItem = "_ChildMenuItem_" + a[1];
			
			Application.onMainMenuClick(c)
		} else {
			Application.onMainMenuClick($("_Navigation").$T("li")[0])
		}
	} else {
		if (window.frameElement && window.frameElement.id == "_MainArea") {
			// Application.CurrentSite = parent.$V("_SiteSelector");
			Page.mousedown();
			if (!_DialogInstance && parent.Dialog._Array) {
				for (var b = 0; b < parent.Dialog._Array.length; b++) {
					parent.$("_DialogDiv_" + parent.Dialog._Array[b]).outerHTML = "";
					parent.$("_AlertBGDiv").hide();
					parent.$("_DialogBGDiv").hide()
				}
			}
			parent.Application.setCurrentMenu(window.location.href)
		}
	}
	Application.layoutAdjust()
});
Application.setCurrentMenu = function(d) {
	if (d.indexOf("#") > 0) {
		d = d.substring(0, d.indexOf("#"))
	}
	if ($("_Navigation")) {
		var b = $("_Navigation").$T("li");
		for (var f = 0; f < b.length; f++) {
			var a = b[f].ChildArray;
			for (var c = 0; c < a.length; c++) {
				if (d.indexOf(a[c][2]) >= 0 && a[c][2]!='/') {
					Application.onMainMenuClick(b[f], true);
					Application.onChildMenuClick(
							$("_ChildMenuItem_" + a[c][0]), true);
					return
				}
			}
		}
	}
};
window.onresize = function() {
	Application.layoutAdjust()
};
Application.layoutAdjust = function() {
	if ($("_Navigation")) {
		if (document.body.clientWidth < 900) {
			if ($("_VMenutable").innerHTML.length > 40) {
				$("_HMenutable").innerHTML = $("_VMenutable").innerHTML;
				$("_VMenutable").innerHTML = "<div style='width:3px'></div>";
				Application.isHMenu = true
			}
			Tab.setDivtabWidth($("_ChildMenu"))
		} else {
			if ($("_HMenutable").innerHTML.length > 0) {
				$("_VMenutable").innerHTML = $("_HMenutable").innerHTML;
				$("_HMenutable").innerHTML = ""
			}
			Application.isHMenu = false
		}
		Tab.initFrameHeight("_MainArea")
	}
};
Application.SiteChange = [];
Application.CurrentSite;
Application.onSiteChange = function(a) {
	Application.SiteChange.push(a)
};
Application.onChildSiteChange = function() {
	for (var a = 0; a < Application.SiteChange.length; a++) {
		Application.SiteChange[a]()
	}
};
Application.onParentSiteChange = function() {
	if ($("_Navigation")) {
		var a = new DataCollection();
		a.add("SiteID", $V("_SiteSelector"));
		Cookie.set("SiteID", $V("_SiteSelector"), "2100-01-01");
		Cookie.set("DocList.LastCatalog", "0", "2100-01-01");
		Cookie.set("Resource.LastImageLib", "0", "2100-01-01");
		Cookie.set("Resource.LastVideoLib", "0", "2100-01-01");
		Cookie.set("Resource.LastAudioLib", "0", "2100-01-01");
		Cookie.set("Resource.LastAttachLib", "0", "2100-01-01");
		Server.sendRequest("com.sweii.platform.Application.changeSite", a,
				function() {
					$("_MainArea").contentWindow.Application.CurrentSite = $V("_SiteSelector");
					$("_MainArea").contentWindow.Application
							.onChildSiteChange();
					getAllPriv()
				})
	}
};
function setAllPriv(f, a) {
	if (!a) {
		a = "0"
	}
	var c = $T("div");
	var d = $E.getTopLevelWindow();
	if (d.Priv) {
		for (var b = 0; b < c.length; b++) {
			if (c[b].$A("priv")) {
				d.Priv.setBtn(f, a, c[b].$A("priv"), c[b])
			}
		}
	}
}
var DragManager = {};
DragManager.DragProxy = null;
DragManager.onMouseOver = function(evt, ele) {
	if (DragManager.DragFlag) {
		var dragOver = ele.getAttribute("dragOver");
		if (dragOver) {
			var func = eval(dragOver);
			func.apply(ele, arguments)
		}
	}
};
DragManager.onMouseOut = function(evt, ele) {
	if (DragManager.DragFlag) {
		var dragOut = ele.getAttribute("dragOut");
		if (dragOut) {
			var func = eval(dragOut);
			func.apply(ele, arguments)
		}
	}
};
DragManager.onMouseDown = function(a, c) {
	var a = getEvent(a);
	var b = $(a.srcElement).getParentByAttr("drag", "false");
	if (b) {
		return
	}
	DragManager.DragSource = c;
	DragManager.StartFlag = true
};
DragManager.onMouseMove = function(evt) {
	evt = getEvent(evt);
	if (DragManager.StartFlag) {
		DragManager.DragFlag = true;
		DragManager.StartFlag = false;
		var dragStart = DragManager.DragSource.getAttribute("dragStart");
		if (dragStart) {
			var func = eval(dragStart);
			func.apply(DragManager.DragSource, arguments)
		}
	} else {
		if (DragManager.DragFlag) {
			if (DragManager.DragProxy) {
				var pos = getEventPosition(evt);
				DragManager.DragProxy.style.left = (pos.x - DragManager.DragProxy.cx)
						+ "px";
				if (DragManager.DragProxy == DragManager.DragSource) {
					DragManager.DragProxy.style.top = (pos.y - DragManager.DragProxy.cy)
							+ "px"
				} else {
					DragManager.DragProxy.style.top = (pos.y + 5) + "px"
				}
			}
		} else {
			if (DragManager.ChildDragFlag) {
				if (DragManager.DragProxy) {
					var pos = getEventPosition(evt);
					DragManager.DragProxy.style.left = (pos.x - DragManager.DragProxy.cx)
							+ "px";
					if (DragManager.DragProxy == DragManager.DragSource) {
						DragManager.DragProxy.style.top = (pos.y - DragManager.DragProxy.cy)
								+ "px"
					} else {
						DragManager.DragProxy.style.top = (pos.y + 5) + "px"
					}
				}
			} else {
				var pw = $E.getTopLevelWindow();
				if (pw.DragManager != null && pw.DragManager.DragFlag) {
					pw.DragManager.onMouseMove(evt)
				}
			}
		}
	}
};
DragManager.onMouseUp = function(evt, ele) {
	if (DragManager.DragFlag) {
		DragManager.onMouseOut.apply(ele, arguments);
		var dragEnd = ele.getAttribute("dragEnd");
		var func = eval(dragEnd);
		func.apply(ele, arguments);
		if (DragManager.DragProxy
				&& DragManager.DragSource != DragManager.DragProxy) {
			DragManager.DragProxy.style.display = "none"
		}
	}
	Misc.unlockSelect();
	DragManager.DragProxy = null;
	DragManager.DragSource = null;
	DragManager.DragFlag = false;
	DragManager.StartFlag = false
};
DragManager.onDragExit = function() {
	var pw = $E.getTopLevelWindow();
	DragManager.DragFlag = false;
	pw.DragManager.DragFlag = false;
	if (!DragManager.DragSource) {
		return
	}
	var dragExit = DragManager.DragSource.getAttribute("dragExit");
	if (dragExit) {
		var func = eval(dragExit);
		func.apply(this, arguments)
	}
	var dragOut = DragManager.DragSource.getAttribute("dragOut");
	if (dragOut) {
		var func = eval(dragOut);
		func.apply(this, arguments)
	}
	if (DragManager.DragProxy
			&& DragManager.DragSource != DragManager.DragProxy) {
		DragManager.DragProxy.style.display = "none"
	}
	Misc.unlockSelect();
	DragManager.DragProxy = null;
	DragManager.DragSource = null;
	DragManager.DragFlag = false;
	DragManager.StartFlag = false
};
DragManager.doDrag = function(a, c) {
	var g;
	var f = $E.getPositionEx(DragManager.DragSource);
	var b = getEventPosition(a);
	if (!c) {
		g = DragManager.DragSource;
		g.style.position = "absolute"
	} else {
		var d = $E.getTopLevelWindow();
		if (typeof(c) == "string") {
			c = c.replace(/on\w*?=([\'\"]).*?\1/gi, "");
			c = c.replace(/drag\w*?=([\'\"]).*?\1/gi, "");
			var h = $("_DragProxy");
			if (!h) {
				h = d.document.createElement("div");
				h.id = "_DragProxy";
				h.style.position = "absolute";
				h.style.zIndex = 999;
				Misc.lockSelect(h);
				d.document.body.appendChild(h)
			}
			h.innerHTML = c;
			h.style.display = "";
			h.style.left = (2 * f.x - b.x) + "px";
			h.style.top = (2 * f.y - b.y) + "px";
			g = h
		} else {
			g = c;
			g.style.position = "absolute"
		}
	}
	g.cx = b.x - f.x;
	g.cy = b.y - f.y;
	DragManager.DragProxy = g;
	Misc.lockSelect()
};
Page.onMouseUp(DragManager.onDragExit);
Page.onMouseMove(DragManager.onMouseMove);
var Effect = {};
Effect.NextID = 0;
Effect.initCtrlStyle = function(a) {
	a = $(a);
	var b = a.type;
	switch (b) {
		case "text" :
		case "password" :
		case "" :
			a.addClassName("inputText");
			a.onmouseenter = function() {
				//this.style.borderColor = "#00aaee"
			};
			a.onmouseleave = function() {
				//this.style.borderColor = ""
			};
			a.onfocusFunc = a.onfocus;
			a.onfocus = function() {
				if (typeof(a.onfocusFunc) == "function") {
					try {
						a.onfocusFunc()
					} catch (c) {
					}
				}
				
			//if(this.style!=null)	this.style.borderColor = "#ff8800";
			
				this.onmouseenter = null;
				this.onmouseleave = null
			};
			a.onblurFunc = a.onblur;
			a.onblur = function() {
				if (typeof(a.onblurFunc) == "function") {
					try {
						a.onblurFunc()
					} catch (c) {
					}
				}
				//this.style.borderColor = "";
				this.onmouseenter = function() {
					//this.style.borderColor = "#00aaee"
				};
				this.onmouseleave = function() {
				//	this.style.borderColor = ""
				}
			};
			if (a.disabled == true) {
				a.addClassName("inputTextDisabled")
			}
			break;
		case "submit" :
		case "reset" :
		case "button" :
			a.addClassName("inputButton");
			a.hideFocus = true;
			if (a.parentElement.tagName != "A") {
				a.outerHTML = "<a href='javascript:void(0);'  style='TEXT-DECORATION:none'  class='zButton"
						+ (isIE8 ? " zButtonIE8fix" : "")
						+ "' hidefocus='true'  tabindex='-1'>"
						+ a.outerHTML
						+ "</a>"
			}
			break;
		case "checkbox" :
			a.addClassName("inputCheckbox");
			break;
		case "radio" :
			a.addClassName("inputRadio");
			break;
		case "file" :
			a.addClassName("inputFile");
			break;
		case "image" :
			a.addClassName("inputImage");
			break;
		default :
	}
};
Effect.opacity = function(d, g, f, a, c) {
	g = g > 100 ? 100 : g;
	f = f > 100 ? 100 : f;
	g = g < 0 ? 0 : g;
	f = f < 0 ? 0 : f;
	var b = (f - g) * 20 / a;
	Effect._opacity(d, b, g, f, c)
};
Effect._opacity = function(d, c, g, f, b) {
	var a = true;
	g += c;
	if (c >= 0 && g >= f) {
		g = f;
		a = false
	}
	if (c < 0 && g <= f) {
		g = f;
		a = false
	}
	if (isIE) {
		d.style.filter = "alpha(opacity=0)"
	}
	if (isGecko) {
		d.style.opacity = g / 100
	}
	if (!a) {
		if (b) {
			b()
		}
	} else {
		Effect._opacityID = setTimeout(function() {
					Effect._opacity(d, c, g, f, b)
				}, 10)
	}
};
Effect.onBtnMouseover = function(a) {
	if (a.className == "divbtn") {
		a.addClassName("divbtnHover")
	}
};
Effect.onBtnMouseout = function(a) {
	if (a.hasClassName("divbtnHover")) {
		a.removeClassName("divbtnHover")
	}
};
$E.hide = function(a) {
	if (!a) {
		a = this
	}
	a = $(a);
	if (a.tagName.toLowerCase() == "input" && a.type == "button") {
		if (a.parentElement
				&& a.parentElement.getAttribute("ztype") == "ButtonWrapper") {
			a.parentElement.style.display = "none"
		}
	}
	a.style.display = "none"
};
$E.show = function(a) {
	if (!a) {
		a = this
	}
	a = $(a);
	if (a.tagName.toLowerCase() == "input" && a.type == "button") {
		if (a.parentElement
				&& a.parentElement.getAttribute("ztype") == "ButtonWrapper") {
			a.parentElement.style.display = ""
		}
	}
	a.style.display = ""
};
$E.disable = function(d) {
	d = d || this;
	d = $(d);
	if (d.tagName.toLowerCase() == "form") {
		var c = d.elements;
		for (var b = 0; b < c.length; b++) {
			var a = c[b];
			d.blur();
			if (d.hasClassName("divbtn")) {
				d.addClassName("divbtnDisabled");
				if (d.onclick) {
					d.onclickbak = d.onclick
				}
				d.onclick = null
			} else {
				d.disabled = "true"
			}
		}
	} else {
		if (d.$A("ztype") == "select") {
			Selector.setDisabled(d, true)
		} else {
			if (d.hasClassName("divbtn")) {
				d.addClassName("divbtnDisabled");
				if (d.onclick) {
					d.onclickbak = d.onclick
				}
				d.onclick = null
			} else {
				d.disabled = "true"
			}
		}
	}
};
$E.enable = function(d) {
	d = d || this;
	d = $(d);
	if (d.tagName.toLowerCase() == "form") {
		var c = d.elements;
		for (var b = 0; b < c.length; b++) {
			var a = c[b];
			if (d.hasClassName("divbtnDisabled")) {
				d.className = "divbtn";
				if (d.onclickbak) {
					d.onclick = d.onclickbak
				}
			} else {
				d.disabled = ""
			}
		}
	} else {
		if (d.$A("ztype") == "select") {
			Selector.setDisabled(d, false)
		} else {
			if (d.hasClassName("divbtnDisabled")) {
				d.className = "divbtn";
				if (d.onclickbak) {
					d.onclick = d.onclickbak
				}
			} else {
				d.disabled = ""
			}
		}
	}
};
Effect.initCtrl = function(b) {
	b = $(b);
	try{
		var a = b.$T("input").concat(b.$T("textarea"));
		a.each(Effect.initOneCtrl)
	}catch(e){
		// alert(e);
	}
};
Effect.initOneCtrl = function(a) {
	Effect.initCtrlStyle(a);
	
	DateTime.initCtrl(a);
	Verify.initCtrl(a)
};
Page.onLoad(function() {
			Effect.initCtrl(document.body)
		}, 2);
Page.onLoad(function() {
			try {
				if (window.frameElement && isIE6 && !isQuirks) {
					var b = Math.max(document.documentElement.scrollHeight,
							document.body.scrollHeight);
					if (b > window.frameElement.offsetHeight) {
						$T("html")[0].style.overflowY = "scroll";
						$T("html")[0].style.overflowX = "hidden"
					}
				}
			} catch (a) {
				// alert("脚本无法跨域操作！")
			}
		}, 10);
var Verify = {};
Verify.autoCloseOther = function(b, c) {
	if (!c) {
		b = getEvent(b);
		c = $(b.srcElement)
	}
	var a = c.$A("ztype");
	if (a) {
		a = a.toLowerCase()
	}
	if (a != "select") {
		Selector.close()
	}
	if (a != "date") {
		Calendar.close()
	}
	if (a != "time") {
		TimeSelector.close()
	}
};
Verify.check = function(evt, ele) {
	if (!ele) {
		evt = getEvent(evt);
		ele = $(evt.srcElement)
	}
	var v = ele.$A("verify");
	if (!v) {
		Verify.closeTip(ele);
		return
	}
	var condition = ele.$A("condition");
	if (condition && !eval(condition)) {
		Verify.closeTip(ele);
		return
	}
	var msg = [];
	var sqlFlag = true;
	var Features = v.split("&&");
	var value = $V(ele);
	if (ele.$A("ztype") && ele.$A("ztype").toLowerCase() == "select") {
		value = $V(ele.parentElement)
	}
	if (value) {
		value = ("" + value).trim()
	}
	for (var i = 0; i < Features.length; i++) {
		var arr = Features[i].split("|");
		var name = "";
		var rule;
		if (arr.length == 2) {
			name = arr[0];
			rule = arr[1]
		} else {
			rule = Features[i]
		}
		var op = "=";
		if (rule.indexOf(">") > 0) {
			op = ">"
		} else {
			if (rule.indexOf("<") > 0) {
				op = "<"
			}
		}
		var f = rule.split(op);
		var fName = f[0];
		var fValue = null;
		if (f.length > 1) {
			fValue = f[1]
		}
		 
		if (fName == "Any") {
			sqlFlag = false
		} else {
			if (fName == "Regex") {
				fValue = rule.substring(6);
				if (value == null || value == "" || !fValue) {
					continue
				}
				var reg = fValue;
				if (!reg.startWith("^")) {
					reg = "^" + reg
				}
				if (!reg.endWith("$")) {
					reg += "$"
				}
				if (!new RegExp(reg).test(value)) {
					msg.push(name)
				}
			} else {
				if (fName == "Script") {
					fValue = rule.substring(7);
					if (value == null || value == "" || !fValue) {
						continue
					}
					if (!eval(fValue)) {
						msg.push(name)
					}
				}
				else {
					if (fName == "NotNull") {
						if (value == null || value == "") {
							if (ele.$A("ztype")
									&& ele.$A("ztype").toLowerCase() == "select") {
								msg.push("必须选择" + name)
							} else {
								msg.push(name + "不能为空")
							}
						}
					} else {
						if (fName == "Number") {
							if (value == null || value == "") {
								continue
							}
							if (!isNumber(value)) {
								msg.push(name + "必须是数字")
							}
						} else if(fName=="Phone"){
						   if (value == null || value == "") {
								continue
							}  
							if (!isPhone(value)) {
								msg.push(name + "必须是手机号码")
							}
						}else {
							if (fName == "Time") {
								if (value == null || value == "") {
									continue
								}
								var timearr = value.split(":");
								if (timearr.length != 3) {
									msg.push(name + "的值" + value + "不是正确的时间!")
								} else {
									if (!isInt(timearr[0]) || timearr[0] < 0
											|| timearr[0] > 23) {
										msg.push(name + "的值" + value + "错误，小时数"
												+ timearr[0] + "不正确!");
										ele.focusEx()
									} else {
										if (!isInt(timearr[1])
												|| timearr[1] < 0
												|| timearr[1] > 59) {
											msg.push(name + "的值" + value
													+ "错误，分钟数" + timearr[1]
													+ "不正确!")
										}
									}
								}
							} else {
								if (fName == "Int") {
									if (value == null || value == "") {
										continue
									}
									if (!isInt(value)) {
										msg.push(name + "必须是整数")
									}
								}else if(fName == "intMax"){// 大于等0的整数
								    if (value == null || value == "") {
										continue
									}
									if (!isNumber(value)) {
										msg.push(name + "必须是数字")
									}else{
										var num=parseFloat(value);
										if(num<0){
										   msg.push(name + "必须是正数字")
										}
										
									}
									var maxValue=parseFloat(ele.maxValue);
									var num=parseFloat(value);
									if(num>maxValue){
									   msg.push("必须是小于等于"+maxValue); 
									}
								} else if(fName == "gInt"){// 
								    if (value == null || value == "") {
										continue
									}
									if (!isNumber(value)) {
										msg.push(name + "必须是数字")
									}
								}else if(fName == "dInt"){// 大于等0的整数
								    if (value == null || value == "") {
										continue
									}
									if (!isNumber(value)) {
										msg.push(name + "必须是数字")
									}	
									else{
										var num=parseFloat(value);
										if(num<=0){
										   msg.push(name + "必须是大于0")
										}
										
									}
								} else {
									if (fName == "Date") {
										if (value == null || value == "") {
											continue
										}
										if (!/\d{4}\-\d{2}\-\d{2}/.test(value)) {
											msg.push(name + "必须是正确的日期")
										} else {
											var ts = value.split("-");
											var d = new Date(ts[0], --ts[1],
													ts[2]);
											if (d.getMonth() != ts[1]
													|| d.getDate() != ts[2]) {
												msg.push(name + "必须是正确的日期")
											}
										}
									} else {
										if (fName == "Email") {
											if (value == null || value == "") {
												continue
											}
											var pattern = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
											if (value
													&& value.match(pattern) == null) {
												msg.push(name + "不是正确的电子邮箱地址")
											}
										} else {
											if (fName == "Length") {
												if (value == null
														|| value == "") {
													continue
												}
												if (isNaN(fValue)) {
													msg
															.push("校验规则错误，Length后面必须是数字")
												} else {
													try {
														var len = parseInt(fValue);
														if (op == "="
																&& value.length != len) {
															msg.push(name
																	+ "长度必须是"
																	+ len)
														} else {
															if (op == ">"
																	&& value.length <= len) {
																msg
																		.push(name
																				+ "长度必须大于"
																				+ len)
															} else {
																if (op == "<"
																		&& value.length >= len) {
																	msg
																			.push(name
																					+ "长度必须小于"
																					+ len)
																}
															}
														}
													} catch (ex) {
														msg
																.push("校验规则错误，Length后面必须是整数"
																		+ ex.message)
													}
												}
											}else{
												 
													  if(fName=="Between") {
														if (value==null||value=="") {continue;}
														if(isNaN(fValue)) {
															msg.push("校验规则错误，Between后面必须是数字");
														}else{
															try{
																var len = parseInt(fValue);
																if(op=="="&&value!=len) {
																  msg.push(name+"数值必须是" + len);
																}else if (op==">"&&value<=len) {
																	msg.push(name+"数值必须大于" + len);
																}else if (op=="<"&& value>=len) {
																	msg.push(name+"数值必须小于" + len);
																}
															} catch (ex) {
																msg.push("校验规则错误，Between后面必须是整数"+ex.message);
															}
														}
													}
												 
												
												
											}
										}
									}
								}
							}
						}
					}
				}
			}
		}
	}
	if (msg.length > 0) {
		var txt = msg.join("<br>");
		if (txt != ele._VerifyMsg) {
			Verify.closeTip(ele);
			var tip;
			var afterEle = ele.$A("element");
			if (afterEle) {
				tip = Tip.show($(afterEle), txt)
			} else {
				tip = Tip.show(ele, txt)
			}
			ele._VerifyTip = tip;
			ele._VerifyMsg = txt
		}
	} else {
		Verify.closeTip(ele)
	}
};
Verify.closeTip = function(b, a) {
	if (!b) {
		a = getEvent(a);
		b = $(a.srcElement)
	}
	if (b.type == "blur") {
		b = $(b.srcElement)
	}
	if (b._VerifyTip) {
		b._VerifyTip.close();
		b._VerifyTip = null;
		b._VerifyMsg = null
	}
};
Verify.hasError = function(h, m) {
	var g;
	if (m) {
		m = $(m);
		g = m.$T("input").concat(m.$T("textarea"))
	} else {
		g = $T("input").concat($T("textarea"))
	}
	var b = false;
	for (var f = 0; f < g.length; f++) {
		var l = $(g[f]);
		var a = l.id;
		if (l.$A("ztype") == "select") {
			a = l.parentElement.id
		}
		var k = false;
		if (h) {
			for (var d = 0; d < h.length; d++) {
				if (a == $(h[d]).id) {
					k = true
				}
			}
		}
		if (k) {
			Verify.closeTip(l);
			continue
		}
		Verify.check(null, l);
		if (!b && l._VerifyTip) {
			b = l
		}
	}
	if (b) {
		Dialog.alert("还有未正确填写的项，请参照提示修改!", function() {
					$(b).focusEx()
				});
		return true
	}
	return false
};
Verify.initCtrl = function(c) {
	c = $(c);
	c.attachEvent("onfocus", Verify.autoCloseOther);
	var b = c.$A("verify");
	if (b) {
		c.attachEvent("onfocus", Verify.check);
		c.attachEvent("onkeyup", Verify.check);
		c.attachEvent("onchange", Verify.check);
		c.attachEvent("onblur", Verify.closeTip);
		var f = c.$A("condition");
		if (b.indexOf("NotNull") >= 0 && !f) {
			var a = c.$A("ztype");
			if (a) {
				a = a.toLowerCase()
			}
			if (a == "select") {
				c = c.getParent("div")
			}
			if (a == "date" || a == "time") {
				c = c.nextSibling
			}
			if (!c.nextSibling || !c.nextSibling.getAttribute
					|| c.nextSibling.getAttribute("ztype") != "Verify") {
				var d = "";
				if (!$E.visible(c)) {
					d = "display:none"
				}
				c.insertAdjacentHTML("afterEnd",
						"<span style='color:red;padding-left:2px;padding-top:13px;"
								+ d + "' ztype='Verify'>*</span>")
			}
		}
	}
};
window.setInterval(function() {
			var a = $T("input").concat($T("textarea"));
			a.each(function(b) {
						b = $(b);
						if (b._VerifyTip) {
							Verify.check(null, b)
						}
					})
		}, 500);
var DataGrid = {};
Constant.SortString = "_ERICAN_SORTSTRING";
Constant.PageIndex = "_ERICAN_PAGEINDEX";
Constant.PageTotal = "_ERICAN_PAGETOTAL";
Constant.TagBody = "_ERICAN_TAGBODY";
Constant.ID = "_ERICAN_ID";
Constant.Ajax = "_ERICAN_AJAX";
Constant.ClassName = "_ERICAN_CLASSNAME";
Constant.Page = "_ERICAN_PAGE";
Constant.Size = "_ERICAN_SIZE";
Constant.Null = "_ERICAN_NULL";
Constant.InsertRow = "_ERICAN_INSERTROW";
Constant.DataTable = "_ERICAN_DataTable";
DataGrid.onAllCheckClick = function(b) {
	b = $(b);
	var a = b.id;
	if ($(a + "_AllCheck").checked) {
		DataGrid.selectAll(b,a)
	} else {
		DataGrid.unselectAll(b)
	}
};
DataGrid.selectAll = function(d) {
	d = $(d);
	var c = d.id;
	var a = $N(c + "_RowCheck");
	for (var b = 0; a && b < a.length; b++) {
		if (!a[b].disabled) {
			a[b].checked = true;
			DataGrid.onSelectorClick(a[b],c)
		}
	}
};
DataGrid.unselectAll = function(d) {
	d = $(d);
	var c = d.id;
	var a = $N(c + "_RowCheck");
	for (var b = 0; a && b < a.length; b++) {
		if (!a[b].disabled) {
			a[b].checked = false;
			DataGrid.onSelectorClick(a[b],c)
		}
	}
};
DataGrid.getSelectedValue = function(b) {
	b = $(b);
	var a = b.id;
	return $NV(a + "_RowCheck")
};
DataGrid.getSelectedTreeValue = function(a) {
	a = $(a);
	return $NV(a.id + "_TreeRowCheck")
};
DataGrid.getSelectedRows = function(c) {
	c = $(c);
	var a = [];
	for (var b = 1; b < c.rows.length; b++) {
		if (c.rows[b].Selected) {
			a.push(c.rows[b])
		}
	}
	return a
};
DataGrid.getSelectedData = function(f) {
	f = $(f);
	var d = f.DataSource;
	var a = [];
	for (var b = 1; b <= d.Values.length; b++) {
		if ($(f.id+"_RowCheck"+b).checked) {
			a.push(d.Values[b - 1])
		}
	}
	var c = new DataTable();
	var g = [];
	for (var b = 0; b < d.Columns.length; b++) {
		g.push([d.Columns[b].Name, d.Columns[b].Type])
	}
	c.init(g, a);
	
	return c
};
DataGrid.getAddData = function(f) {
	f = $(f);
	var d = f.DataSource;
	var a = [];
	for (var b = 1; b <= d.Values.length; b++) {
			a.push(d.Values[b - 1])
	}
	var c = new DataTable();
	var g = [];
	for (var b = 0; b < d.Columns.length; b++) {
		g.push([d.Columns[b].Name, d.Columns[b].Type])
	}
	c.init(g, a);
	
	return c
};
DataGrid.SelectedBgColor = "#dfe8f6";
DataGrid.MouseOverBgColor = "#EDFBD2";
DataGrid.onSelectorClick = function(c, a) {
	var b = $(c).getParent("tr");
	var rowindex=b.$A("rowindex");
	var f = $(a);
	if (c.tagName.toLowerCase() == "input") {
	   
		b.Selected = c.checked
	} else {
		b.Selected = !b.Selected;
		$(a + "_RowCheck" + rowindex).checked = b.Selected
	}
	DataGrid.onRowSelected(b, a);
	var d = f.$A("multiSelect") != "false";
	if (a && d) {
		b.SelectorFlag = true
	}
};
DataGrid.onRowSelected = function(b, a) {//选中样式
    var rowIndex=b.$A("rowindex");
	if (typeof($('rowId'+rowIndex).DefaultClass) == "undefined") {
		$('rowId'+rowIndex).DefaultClass = $('rowId'+rowIndex).className;
	}
	if (b.Selected) {
		$('rowId'+rowIndex).className=$('rowId'+rowIndex).DefaultClass+" selectcolor";
	} else {
		$('rowId'+rowIndex).className = $('rowId'+rowIndex).DefaultClass;
	}
};
DataGrid.onRowClick = function(d, a,id,fields) {
	a = getEvent(a);
	var g = $(id);
	var f = g.$A("multiSelect") != "false";
	var size=parseInt($(d).$A("size"));
	for (var c = 1; c <= size; c++) {
		var h = $("rowId"+c);
		var rowindex=h.$A("rowindex");
		if (a) {
			if (!a.ctrlKey || !f) {
				if (h != d && h.Selected) {
					if (d.SelectorFlag) {
						continue
					}
					h.Selected = false;
					var b = $(g.id + "_RowCheck" + rowindex);
					if (b) {
						b.checked = false
					}
					DataGrid.onRowSelected(h)
				}
			}
		}
	}
	var rowindex=$(d).$A("rowindex");
	if (a && !d.SelectorFlag) {
		if (a.ctrlKey) {
			if (d.Selected) {
				d.Selected = false;
				var b = $(g.id + "_RowCheck" + rowindex);
				if (b) {
					b.checked = false
				}
				DataGrid.onRowSelected(d);
				d.SelectorFlag = false;
				return
			}
		}
	}
	var b = $(g.id + "_RowCheck" + rowindex);
	if (b) {
		if (a && !d.SelectorFlag) {
			b.checked = true
		}
		d.Selected = b.checked
	} else {
		d.Selected = true
	}
	DataGrid.onRowSelected(d, a);
	d.SelectorFlag = false
	if(fields!=null&&fields.length>0){
		var fs=fields.split(",");
		for(var i=1;i<fs.length;i++){
			if(d.Selected){
				var value=$('dg1').DataSource.get(rowindex-1,fs[i]);
				$S(fs[0]+'.'+fs[i],value);
			}else{
				$S(fs[0]+'.'+fs[i],"");
			}
		}
	}
};
DataGrid.onSort = function(h) {
	var j = h.getAttribute("direction");
	if (!j) {
		j = ""
	}
	if (j=='' || j.toUpperCase() == "ASC") {
		j = " DESC"
	} else {
		j = " ASC"
	}
	var f = h.parentNode.parentNode.parentNode;
	var b = h.getAttribute("sortField");
	if(!b||b=='')return;
	DataGrid.setParam(f, 'sortField', b);
	DataGrid.setParam(f, 'direction', j);
	DataGrid.loadData(f)
};
DataGrid.init = function(g) {
	g = $(g);
	DataGrid.setParam(g, Constant.ID, g.id);
	DataGrid.setParam(g, Constant.Method, g.getAttribute("method"));
	DataGrid.setParam(g, Constant.Page, g.getAttribute("page"));
	DataGrid.setParam(g, Constant.Size, g.getAttribute("size"));
	DataGrid.setParam(g, Constant.TagBody, g.TagBody);
	var d = parseInt(DataGrid.getParam(g, Constant.Size));
	var f = g.getAttribute("page");
	var c = g.$A("autoFill") != "false";
	if (c) {
		if (f == "true") {
			if (g.rows.length - 2 < d && g.rows.length > 3) {
				var h = g.rows[g.rows.length - 2];				
				//h.cells[0].style.height = $E.getDimensions(g.rows[1]).height* (d - g.rows.length + 3) + "px"//设置行高
			}
		} else {
			d = 15;
			if (g.rows.length < 16 && g.rows.length > 2) {
				var h = g.rows[g.rows.length - 1];
				//h.cells[0].style.height = $E.getDimensions(g.rows[0]).height* (d + 2 - g.rows.length)//设置行高
			}
		}
	}
	if (isGecko) {
		for (var b = 0; b < g.rows.length; b++) {
			for (var a = 0; a < g.rows[b].cells.length; a++) {
				g.rows[b].cells[a].style.MozUserSelect = "none"
			}
		}
	}
};
DataGrid.getParam = function(b, a) {
	b = $(b);
	return b.Params.get(a)
};
DataGrid.setParam = function(c, a, b) {
	c = $(c);
	if (!c.Params) {
		c.Params = new DataCollection()
	}
	c.Params.add(a, b)
};
DataGrid.getParams = function(c) {
	c = $(c);
	if (!c.Params) {
		c.Params = new DataCollection()
	}
	return c.Params;
};
DataGrid.removeParam = function(b, a) {
	b = $(b);
	return b.Params.remove(a);
};
DataGrid.toExcel = function(j, b) {
	j = $(j);
	var g = "_Excel_";
	var k = window.document.body;
	var h = $(g + "_Form");
	if (!h) {
		h = document.createElement("form")
	}
	h.id = g + "_Form";
	h.method = "post";
	h.action = Server.ContextPath + "Framework/Controls/DataGridToExcel.jsp";
	k.appendChild(h);
	var a = j.Params.keys;
	for (var d = 0; d < a.length; d++) {
		var c = $(g + a[d]);
		if (!c) {
			c = document.createElement("input")
		}
		c.type = "hidden";
		c.id = g + a[d];
		c.name = g + a[d];
		c.value = DataGrid.getParam(j, a[d]);
		h.appendChild(c)
	}
	var c = $(g + "_ERICAN_ToExcelPageFlag");
	if (!c) {
		c = document.createElement("input")
	}
	c.type = "hidden";
	c.id = g + "_ERICAN_ToExcelPageFlag";
	c.name = g + "_ERICAN_ToExcelPageFlag";
	c.value = b ? "1" : "0";
	h.appendChild(c);
	c = $(g + "_ERICAN_ToExcelWidth");
	if (!c) {
		c = document.createElement("input")
	}
	c.type = "hidden";
	c.id = g + "_ERICAN_ToExcelWidth";
	c.name = g + "_ERICAN_ToExcelWidth";
	c.value = j.offsetWidth;
	h.appendChild(c);
	h.submit()
};
DataGrid.showLoading = function(c) {
	c = $(c);
	var bg = $("loadingBg");
	var msg = $("loadingMsg");
	var warpper=$("warpper");
	 if (!bg) {

		bg = document.createElement("div");
		bg.id = "loadingBg";
		bg.className="datagrid-mask";

		bg.style.display='block'
		 document.body.appendChild(bg);
		msg = document.createElement("div");
		msg.id = "loadingMsg";
		msg.className="datagrid-mask-msg";
		 
		msg.style.display='block';
 
		msg.innerHTML = "正在加载中,请稍候 ...";
		
		 document.body.appendChild(msg)
	}else{
		bg.style.display='block';
		msg.style.display='block';
	}
	 
	var f = c.getPosition();
	var d = c.getDimensions();
	// alert("x:"+f.x+","+f.y+','+"wh:"+d.width+','+d.height+',')
	
	 bg.style.top = f.y + "px";
	bg.style.left = f.x + "px";
	bg.style.width = d.width + "px";
	bg.style.height = d.height + "px";
	 
	var msgWidth=170;
	var msgHeight=25;
    msg.style.width=msgWidth+"px";
	msg.style.top =(f.y+d.height/2-15)+"px";// f.y+((d.height)/2)+ "px";
	 
	var p=window.parent;
	 
	 // alert(msg.style.top);
	 if(window.name!=''&&window.name.indexOf("-frame")>0){
		 var availWidth= window.screen.availWidth;
			availWidth=availWidth-150;// 减去左测菜单长度
			msg.style.left = (availWidth/2 -msgWidth/2)+ "px"
	 }else{
		  // msg.style.top=f.y+(d.height)/2-msgHeight/2+"px";
			msg.style.left =f.x+ ((d.width)/2 -msgWidth/2)+ "px"
	 }
	 

};
DataGrid.closeLoading = function() {
	var lbg = $("loadingBg");
	if (lbg) {
		$E.hide(lbg);
		$("loadingMsg").hide()
	}
};
DataGrid.loadData = function(ele, func) {
	if (DataGrid.isLoading) {
		return
	}
	DataGrid.isLoading = true;
	try {
		ele = $(ele);
		var id = ele.id;
		if (!DataGrid.getParam(ele, Constant.Ajax)) {
			return
		}
		DataGrid.showLoading(ele);
		Server.sendRequest(DataGrid.getParam(ele, Constant.Ajax),
				ele.Params, function(response) {
					var dg = ele.getParentByAttr("ztype", "_DataGrid");
					if (dg) {
						ele = dg
					}
					if (!ele.parentNode) {
						return
					}
					if(response.length < 50) {
						return
					}
					
					var newEle = document.createElement("div");
					newEle.setAttribute("ztype", "_DataGrid");
					DataGrid.closeLoading();
					newEle.innerHTML = response;
					var table = ele.tagName.toLowerCase() == "table"
							? ele
							: ele.childNodes[0];
					var afterEdit = table.afterEdit;
					var cancelEdit = table.cancelEdit;
					var beforeEdit = table.beforeEdit;
					ele.parentNode.replaceChild(newEle, ele);
					ele = null;
					if (isIE) {
						execScript($(newEle).$T("script")[0].text)
					}
					eval("DataGrid_" + id + "_Init();");
					table = $(newEle.childNodes[0]);
					table.afterEdit = afterEdit;
					table.cancelEdit = cancelEdit;
					table.beforeEdit = beforeEdit;
					Effect.initCtrl(table);
					table.$T("div").each(function(div) {
						var ztype = $(div).$A("ztype");
						if (ztype && ztype.toLowerCase() == "select") {
							Selector.initCtrl(div)
						}
					});
					
					if (func) {
						func();
					}
					
					
					table = null;
					newEle = null;
					ele = null;
					func = null
				})
	} finally {
		DataGrid.isLoading = false
	}
};
DataGrid.clear = function(h) {
	h = $(h);
	var f = parseInt(DataGrid.getParam(h, Constant.Size));
	var g = DataGrid.getParam(h, Constant.Page);
	if (!g) {
		f = 15
	}
	if (!h.RowHeight) {
		if (g && h.rows.length <= 3) {
			h.RowHeight = $E.getDimensions(h.rows[0]).height
		} else {
			if (!g && h.rows.length == 1) {
				h.RowHeight = $E.getDimensions(h.rows[0]).height
			} else {
				h.RowHeight = $E.getDimensions(h.rows[1]).height
			}
		}
	}
	for (var d = h.rows.length - 2; d > 0; d--) {
		h.deleteRow(d)
	}
	var b = h.rows[0].cells.length;
	var k = h.insertRow(h.rows.length - 1);
	for (var c = 0; c < b; c++) {
		var a = k.insertCell(-1);
		a.innerHTML = "&nbsp;"
	}
	k.cells[0].style.height = h.RowHeight * (f) + "px"
};
DataGrid.firstPage = function(a) {
	a = $(a);
	DataGrid.setParam(a, Constant.PageIndex, 0);
	DataGrid.loadData(a)
};
DataGrid.lastPage = function(d) {
	d = $(d);
	var c = DataGrid.getParam(d, Constant.PageTotal);
	var b = DataGrid.getParam(d, Constant.Size);
	var a = Math.ceil(parseInt(c) * 1 / parseInt(b));
	DataGrid.setParam(d, Constant.PageIndex, a - 1);
	
	DataGrid.loadData(d)
};
DataGrid.previousPage = function(b) {
	b = $(b);
	var a = DataGrid.getParam(b, Constant.PageIndex);
	DataGrid.setParam(b, Constant.PageIndex, parseInt(a) - 1);
	DataGrid.loadData(b)
};
DataGrid.nextPage = function(b) {
	b = $(b);
	var a = DataGrid.getParam(b, Constant.PageIndex);
	DataGrid.setParam(b, Constant.PageIndex, parseInt(a) + 1);
	DataGrid.loadData(b)
};
DataGrid._onContextMenu = function(b, a) {
	if (!b.Selected) {
		DataGrid.onRowClick(b, a)
	}
	a = getEvent(a);
	if (DataGrid.onContextMenu) {
		DataGrid.onContextMenu(b, a)
	} else {
		a = getEvent(a);
		var c = b.parentNode.parentNode;
		var g = c.id;
		var f = new Menu();
		f.Width = 150;
		f.setEvent(a);
		var d = a.srcElement.innerText;
		f.addItem("复制文本", function() {
					Misc.copyToClipboard(d)
				}, "Icons/icon003a2.gif");
		f.addItem("导出本页成Excel", function() {
					DataGrid.toExcel(g)
				}, "Icons/icon003a4.gif");
		f.addItem("导出全部成Excel", function() {
					DataGrid.toExcel(g, true)
				}, "Icons/icon003a3.gif");
		f.show()
	}
	stopEvent(a)
};
DataGrid.treeClick = function(n) {
	var c = n.parentNode;
	var l, m;
	try {
		while (c) {
			var d = c.tagName.toLowerCase();
			if (d == "tr") {
				l = c
			}
			if (d == "table") {
				m = c;
				break
			}
			c = c.parentNode
		}
	} catch (k) {
		// alert(k.message)
	}
	var f = false;
	if (n.src.indexOf("butExpand") > 0) {
		n.src = "" + Server.ContextPath + "images/butCollapse.gif";
		f = true
	} else {
		n.src = "" + Server.ContextPath + "images/butExpand.gif"
	}
	var o = m.rows;
	var b = parseInt(l.getAttribute("level"));
	for (var h = 0; h < o.length; h++) {
		if (o[h] === l) {
			for (var g = h + 1; g < o.length; g++) {
				var a = $(o[g]);
				if (parseInt(a.$A("level")) > b) {
					if (f) {
						if ($E.visible(a)) {
							a.setAttribute("_TreeHideLevel", b);
							$E.hide(a)
						}
					} else {
						if (a.$A("_TreeHideLevel") == b) {
							$E.show(a);
							a.setAttribute("_TreeHideLevel", null)
						}
					}
				} else {
					break
				}
			}
			break
		}
	}
};
DataGrid.getSelectors = function(a) {
	a = $(a);
	return $N(a.id + "_RowCheck")
};
DataGrid.deleteRow = function(h, c) {
	h = $(h);
	var g = h.rows[0];
	var b;
	for (var d = 0; d < g.cells.length; d++) {
		var a = g.cells[d].getAttribute("ztype");
		if (a && a.toLowerCase() == "rowno") {
			b = d;
			break
		}
	}
	if (b != null) {
		var f = parseInt(h.rows[c + 1].cells[b].innerText);
		for (var d = c + 2; d < h.DataSource.Rows.length + 1; d++) {
			h.rows[d].cells[b].innerText = "" + f++
		}
	}
	h.deleteRow(c + 1);
	h.DataSource.Values.splice(c, 1);
	h.DataSource.Rows.splice(c, 1)
};
DataGrid.insertRow = function(c, a, f, b) {
	c = $(c);
	if (!a) {
		a = c.DataSource.Rows.length
	}
	DataGrid.setParam(c, Constant.InsertRow, a);
	DataGrid.setParam(c, Constant.DataTable, c.DataSource);
	var d = c.id;
	DataGrid.loadData(d, function() {
				if (f) {
					DataGrid.changeStatus($(d).rows[a + 1])
				}
				if (b) {
					b()
				}
			})
};
DataGrid.changeStatus = function(x, n) {
	x = $(x);
	var K = x.parentNode.parentNode;
	var z = K.DataSource;
	var y = x.rowIndex - 1;
	if (DataGrid.EditingRow && x != DataGrid.EditingRow) {
		DataGrid.changeStatus(DataGrid.EditingRow)
	}
	var C, J, B;
	try {
		for (var F = 0; F < K.rows.length; F++) {
			var s = K.rows[F];
			if (s.getAttribute("ztype") == "edit") {
				C = s
			}
			if (s.getAttribute("ztype") == "template") {
				J = s
			}
			if (s.getAttribute("ztype") == "head") {
				B = s
			}
		}
		if (!B) {
			B = table.rows[0]
		}
	} catch (I) {
		// alert(I.message)
	}
	var A = new DataRow(z, y);
	if (!K.OldValues) {
		K.OldValues = []
	}
	if (!x.EditStatus) {
		x.EditStatus = true;
		DataGrid.EditingRow = x
	} else {
		x.EditStatus = false;
		if (!K.OldValues[y]) {
			var g = z.Values[y].clone();
			K.OldValues[y] = g
		}
		if (n != "Cancel" && K.afterEdit) {
			if (!K.afterEdit(x, A)) {
				return false
			}
		}
		DataGrid.EditingRow = null
	}
	var h = K.OldValues[y];
	for (var F = 0; F < B.cells.length; F++) {
		var d = B.cells[F];
		var w = d.getAttribute("ztype");
		var f = d.getAttribute("field");
		var r = false;
		if (w && w.toLowerCase() == "selector") {
			$(K.id + "_RowCheck" + x.rowIndex).disabled = x.EditStatus
					? true
					: false
		} else {
			if (w && w.toLowerCase() == "rowno") {
				x.cells[F].innerHTML = x.cells[F].getAttribute("rowno")
			} else {
				if (w && w.toLowerCase() == "checkbox") {
					var H = x.cells[F].getAttribute("checkedvalue");
					if (H == null) {
						H = "Y"
					}
					if (h) {
						r = h[z.ColMap[f]] != A.get(f)// f.toLowerCase()
					}
					var t = H == A.get(f) ? "checked" : "";
					$(K.id + "_" + f + "_Checkbox" + x.rowIndex).disabled = x.EditStatus
							? false
							: true
				} else {
					if (w && w.toLowerCase() == "dropdownlist") {
						if (h) {
							r = h[z.ColMap[f]] != A.get(f)// f.toLowerCase()
						}
						$(K.id + "_" + f + "_DropDownList" + x.rowIndex).disabled = x.EditStatus
								? false
								: true
					} else {
						var b = [];
						if (w && w.toLowerCase() == "tree") {
							var a = parseInt(x.getAttribute("level"));
							var l = 0;
							var c = true;
							if (x.rowIndex != K.rows.length - 1) {
								l = parseInt(K.rows[x.rowIndex + 1]
										.getAttribute("level"));
								c = K.rows[x.rowIndex + 1].style.display != "none"
							}
							for (var D = 0; D < a; D++) {
								b.push("&nbsp;&nbsp;")
							}
							if (a < l) {
								if (c) {
									b
											.push("<img src='"
													+ Server.ContextPath
													+ "images/butExpand.gif' onclick='DataGrid.treeClick(this)'/>&nbsp;")
								} else {
									b
											.push("<img src='"
													+ Server.ContextPath
													+ "images/butCollapse.gif' onclick='DataGrid.treeClick(this)'/>&nbsp;")
								}
							} else {
								b
										.push("<img src='"
												+ Server.ContextPath
												+ "images/butNoChild.gif'/>&nbsp;")
							}
						}
						var v = unescape(x.EditStatus
								? K.EditArray[F]
								: K.TemplateArray[F]);
						var q = /\$\{(\w.+?)\}/gi;
						var u = 0;
						b.push(v.replace(q, function(k, j) {
									if (h) {
										if (h[z.ColMap[j]] != A// j.toLowerCase()
												.get(j)) {
											r = true
										}
									}
									var L = A.get(j);
									if ((L === "" || L === null)
											&& !x.EditStatus) {
										L = "&nbsp;"
									}
									return L
								}));
						x.cells[F].innerHTML = b.join("")
					}
				}
			}
		}
		if (r) {
			x.cells[F].style.backgroundColor = "#FEB34E"
		} else {
			x.cells[F].style.backgroundColor = ""
		}
		if (!x.ModifyFlag && r) {
			x.ModifyFlag = true
		}
	}
	var b = x.$T("div");
	var G = b.length;
	for (var F = G; F > 0; F--) {
		var o = $(b[F - 1]);
		var n = o.$A("ztype");
		if (n && n.toLowerCase() == "select") {
			Selector.initCtrl(o)
		}
	}
	if (isIE) {
		x.onselectstart = x.EditStatus ? null : stopEvent
	} else {
		for (var E = 0; E < x.cells.length; E++) {
			x.cells[E].style.MozUserSelect = x.EditStatus ? "" : "none"
		}
	}
	if (x.EditStatus) {
		x.oldClickEvent = x.onclick;
		x.onclick = function(j) {
			j = getEvent(j);
			cancelEvent(j)
		}
	} else {
		x.onclick = x.oldClickEvent
	}
	var m = x.$T("input");
	for (var F = 0; F < m.length; F++) {
		if (m[F].type == "text"
				&& (m[F].value == unescape("%A0") || m[F].value == " ")) {
			m[F].value = ""
		}
		m[F].ondblclick = stopEvent;
		Effect.initCtrlStyle(m[F])
	}
	if (!x.EditStatus && K.cancelEdit) {
		K.cancelEdit(x, A)
	}
	if (x.EditStatus && K.beforeEdit) {
		K.beforeEdit(x, A)
	}
	return true
};
Page.onClick(function() {
			if (DataGrid.EditingRow != null) {
				DataGrid.changeStatus(DataGrid.EditingRow)
			}
		});
DataGrid.edit = function(b, c) {
	c = $(c);
	if (!c) {
		alert("DataGrid.edit的参数必须是一个DataGrid对象")
	}
	var a = DataGrid.getSelectedRows(c);
	if (a.length < 1) {
		Dialog.alert("请先选择一条记录!");
		return
	}
	var d = a[0];
	d.ondblclick.apply(d, []);
	stopEvent(b)
};
DataGrid.editRow = function(g, b) {
	if (b) {
		var f = g.parentNode.parentNode;
		var c = f.DataSource;
		var a = g.rowIndex - 1;
		var d = new DataRow(c, a);
		b(d)
	} else {
		DataGrid.changeStatus(g)
	}
};
DataGrid.cancel = function(a) {
	var b = $E.getParent("tr", a);
	DataGrid.changeStatus(b, "Cancel")
};
DataGrid.save = function(b, a, f) {
	if (DataGrid.EditingRow != null) {
		if (!DataGrid.changeStatus(DataGrid.EditingRow)) {
			return
		}
	}
	var h = $(b);
	var d = h.DataSource;
	var j = [];
	for (var g = 1; g < h.rows.length; g++) {
		if (h.rows[g].ModifyFlag) {
			j.push(d.Values[g - 1])
		}
	}
	if (j.length == 0) {
		Dialog.alert("数据未被修改过!");
		return
	}
	var c = new DataTable();
	c.Columns = d.Columns;
	c.Values = j;
	var k = new DataCollection();
	k.add("jsonData", c, "DataTable");
	Server.sendRequest(a, k, function(l) {
		if (l && l.status==0) {
			Dialog.alert(l.message, f)
		} else {
			var msg="修改成功!";
			if(l && l.message!=''){
				msg=l.message;
			}
			Dialog.alert(msg, function() {
					for (var n = 1; n < h.rows.length; n++) {
						if (h.rows[n].ModifyFlag) {
							h.rows[n].ModifyFlag = false;
							for (var m = 0; m < h.rows[n].cells.length; m++) {
								h.rows[n].cells[m].style.backgroundColor = ""
							}
						}
					}
					h.OldValues = [];
					if (f) {
						f()
					}
				})
		}
	},'json')
};
DataGrid.discard = function(b, a) {
	DataGrid.loadData(b, a)
};
DataGrid.getRowDragProxy = function(g) {
	var d = g.parentNode.parentNode;
	var a = [];
	var f = $E.getDimensions(d);
	var c = d.outerHTML.split(">")[0];
	c = c.replace(/width\=[\'\"].*?[\"\']/gi, "width='" + f.width + "'");
	c = c.replace(/align\=[\'\"].*?[\"\']/gi, "");
	a.push(c);
	a.push(g.outerHTML.split(">")[0] + " style='background-color:"
			+ DataGrid.SelectedBgColor + "' >");
	for (var b = 0; b < g.cells.length; b++) {
		a.push(g.cells[b].outerHTML.split(">")[0]);
		a
				.push(" width='" + d.rows[0].cells[b].width
						+ "' style='background-color:"
						+ DataGrid.SelectedBgColor + "'");
		a.push(">");
		a.push(g.cells[b].innerHTML);
		a.push("</td>")
	}
	a.push("</tr></table>");
	return a.join("")
};
DataGrid.moveRow = function(f, b) {
	var d = f.parentNode.parentNode;
	if (isIE) {
		d.moveRow(f.rowIndex, b)
	} else {
		var c = f.outerHTML;
		d.deleteRow(f.rowIndex);
		var a = d.insertRow(b);
		a.outerHTML = c
	}
};
DataGrid.dragStart = function(a) {
	var d = this.parentNode;
	var b = d.parentNode.parentNode;
	var c = b.rows;
	DataGrid.onRowClick(d, a);
	DragManager.doDrag(a, DataGrid.getRowDragProxy(d))
};
DataGrid.dragEnd = function(evt) {
	var row = $(this);
	if (DragManager.DragSource.tagName != "TD") {
		return
	}
	var rowSource = $(DragManager.DragSource.parentNode);
	if (row.getParent("table") != rowSource.getParent("table")) {
		return
	}
	var table = row.parentNode.parentNode;
	var si = rowSource.rowIndex;
	var ni = row.rowIndex;
	if (ni > table.DataSource.Rows.length) {
		ni = table.DataSource.Rows.length
	}
	DataGrid.moveRow(rowSource, ni);
	var ds = table.DataSource;
	var vs = ds.Values;
	var arr = vs[si - 1];
	vs.splice(si - 1, 1);
	vs.insert(ni - 1, arr);
	for (var i = 0; i < vs.length; i++) {
		ds.Rows[i] = new DataRow(ds, i)
	}
	var arr = table.rows;
	for (var i = 1; i < arr.length; i++) {
		$(arr[i]).$T("input").each(function(ele) {
					if (ele.id && ele.id.toString().indexOf("_RowCheck") > 0) {
						ele.id = table.id + "_RowCheck" + i
					}
				})
	}
	row = table.rows[ni];
	DataGrid.onRowClick(row, evt);
	row.DefaultBgColor = "#fff";
	var afterDrag = table.getAttribute("afterDrag");
	if (afterDrag) {
		var func = eval(afterDrag);
		func.apply(row, [ni, si])
	}
};
DataGrid.dragOver = function(b, f) {
	if (isGecko) {
		return
	}
	var g = f || this;
	if (DragManager.DragSource.tagName != "TD") {
		return
	}
	for (var c = 0; c < g.cells.length; c++) {
		var a = g.cells[c];
		var d = isGecko
				? document.defaultView.getComputedStyle(a, null)
				: a.currentStyle;
		if (g.rowIndex > DragManager.DragSource.parentNode.rowIndex) {
			if (!a.borderBottomStyle) {
				a.borderBottomStyle = d.borderBottomStyle;
				a.borderBottomColor = d.borderBottomColor;
				a.borderBottomWidth = d.borderBottomWidth;
				a.style.borderBottom = "dashed 2px #f90"
			}
		} else {
			if (!a.borderTopStyle) {
				a.borderTopStyle = d.borderTopStyle;
				a.borderTopColor = d.borderTopColor;
				a.borderTopWidth = d.borderTopWidth;
				a.style.borderTop = "dashed 2px #f90"
			}
		}
	}
};
DataGrid.dragOut = function(b) {
	if (isGecko) {
		return
	}
	var d = this;
	if (DragManager.DragSource.tagName != "TD") {
		return
	}
	for (var c = 0; c < d.cells.length; c++) {
		var a = d.cells[c];
		if (d.rowIndex > DragManager.DragSource.parentNode.rowIndex) {
			if (a.borderBottomStyle) {
				a.style.borderBottomStyle = a.borderBottomStyle;
				a.style.borderBottomColor = a.borderBottomColor;
				a.style.borderBottomWidth = a.borderBottomWidth;
				a.borderBottomStyle = ""
			}
		} else {
			if (a.borderTopStyle) {
				a.style.borderTopStyle = a.borderTopStyle;
				a.style.borderTopColor = a.borderTopColor;
				a.style.borderTopWidth = a.borderTopWidth;
				a.borderTopStyle = ""
			}
		}
	}
};
DataGrid.onSortHeadMouseOver = function(a) {
	a.className = "thOver"
};
DataGrid.onSortHeadMouseOut = function(a) {
	a.className = ""
};
var DataList = {};
DataList.init = function(a) {
	a = $(a);
	DataList.setParam(a, Constant.ID, a.id);
	DataList.setParam(a, Constant.Method, a.getAttribute("method"));
	DataList.setParam(a, Constant.TagBody, a.TagBody)
};
DataList.getParam = function(b, a) {
	b = $(b);
	return b.Params.get(a)
};
DataList.setParam = function(c, a, b) {
	c = $(c);
	if (!c.Params) {
		c.Params = new DataCollection()
	}
	c.Params.add(a, b)
};
DataList.loadData = function(ele, func) {
	ele = $(ele);
	var id = ele.id;
	Server.sendRequest("com.sweii.framework.controls.DataListPage.doWork",
			ele.Params, function(response) {
				var html = response.get("HTML");
				var p = ele.parentNode;
				while (p) {
					if (p.tagName && p.tagName != "TR" && p.tagName != "TABLE"
							&& p.tagName != "TBODY") {
						var phtml = p.innerHTML;
						var i1 = phtml.indexOf("<!--_ERICAN_DATALIST_START_"
								+ id + "-->");
						var i2 = phtml.indexOf("<!--_ERICAN_DATALIST_END_" + id
								+ "-->");
						i2 = phtml.indexOf("-->", i2) + 3;
						phtml = phtml.substring(0, i1) + html
								+ phtml.substring(i2);
						p.innerHTML = phtml;
						break
					}
					p = p.parentNode
				}
				ele = $(id);
				p = ele.parentNode;
				while (p) {
					if (p.tagName) {
						break
					}
					p = p.parentNode
				}
				eval(p.getElementsByTagName("script")[0].text);
				ele = null;
				p = null;
				if (func) {
					func()
				}
			})
};
DataList.firstPage = function(a) {
	a = $(a);
	DataList.setParam(a, Constant.PageIndex, 0);
	DataList.loadData(a)
};
DataList.lastPage = function(d) {
	d = $(d);
	var c = DataList.getParam(d, Constant.PageTotal);
	var b = DataList.getParam(d, Constant.Size);
	var a = Math.ceil(parseInt(c) * 1 / parseInt(b));
	DataList.setParam(d, Constant.PageIndex, a - 1);
	DataList.loadData(d)
};
DataList.previousPage = function(b) {
	b = $(b);
	var a = DataList.getParam(b, Constant.PageIndex);
	DataList.setParam(b, Constant.PageIndex, parseInt(a) - 1);
	DataList.loadData(b)
};
DataList.nextPage = function(b) {
	b = $(b);
	var a = DataList.getParam(b, Constant.PageIndex);
	DataList.setParam(b, Constant.PageIndex, parseInt(a) + 1);
	DataList.loadData(b)
};
DataList.clear = function(a) {
	a = $(a);
	a.innerHTML = ""
};
$E.computePositionEx = function(a, f) {
	var d = $E.getPositionEx(a);
	var c = $E.getDimensions(a);
	var b = $E.getDimensions(f);
	return $E.computePosition(d.x + c.width, d.y, d.x + c.width,
			d.y + c.height, "all", b.width, b.height, $E.getTopLevelWindow())
};
var Calendar = {
	monthNames : ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月",
			"11月", "12月"],
	weekNames : ["日", "一", "二", "三", "四", "五", "六"]
};
var TimeSelector = {};
var DateTime = {};
DateTime.getCurrentDate = function() {
	return DateTime.toString(new Date())
};
DateTime.getCurrentTime = function() {
	var c = new Date();
	var f = c.getHours();
	var b = c.getMinutes();
	var d = c.getSeconds();
	var a = [];
	a.push(f > 9 ? f : "0" + f);
	a.push(b > 9 ? b : "0" + b);
	a.push(d > 9 ? d : "0" + d);
	return a.join(":")
};
DateTime.toString = function(c) {
	var g = c.getFullYear();
	var b = c.getMonth() + 1;
	var f = c.getDate();
	var a = [];
	a.push(g);
	a.push(b > 9 ? b : "0" + b);
	a.push(f > 9 ? f : "0" + f);
	return a.join("-")
};
DateTime.parseDate = function(j) {
	var l = /^(\d{4})-(\d{1,2})-(\d{1,2})(\s(\d{1,2}):(\d{1,2})(:(\d{1,2}))?)?$/;
	if (!l.test(j)) {
		// alert("DateTime.parseDate:错误的日期" + j)
	}
	l.exec(j);
	var k = RegExp.$1;
	var f = RegExp.$2;
	var g = RegExp.$3;
	var c = RegExp.$5;
	var b = RegExp.$6;
	var n = RegExp.$8;
	var a = new Date();
	a.setYear(k);
	a.setMonth(f - 1);
	a.setDate(g);
	if (c) {
		a.setHours(c);
		a.setMinutes(b)
	}
	if (n) {
		a.setSeconds(n)
	}
	return a
};
DateTime.initCtrl = function(ele) {
	ele = $(ele);
	var ztype = ele.$A("ztype");
	var format=ele.$A("format");
	if (ztype) {
		var str;
		var date = new Date();
		if (ztype.toLowerCase() == "date") {
			str = "Calendar"
		} else {
			if (ztype.toLowerCase() == "time") {
				str = "TimeSelector"
			} else {
				return
			}
		}
		var id = ele.id;
		ele
				.insertAdjacentHTML(
						"afterEnd",
						"<img src='"
								+ Server.ContextPath
								+ "images/"
								+ str
								+ ".gif' align='absmiddle' style='cursor:pointer'  vspace='1' onmousedown=\"DateTime.onImageMouseDown(event,'"
								+ str + "','" + id + "','" + format + "');\">");
		ele.attachEvent("onfocus", function() {
				try{
					if(format!=''){
						WdatePicker({el:id,dateFmt:format});
					}else{
						WdatePicker({el:id});
					}
				}catch(e){
					eval(str + ".show('" + id + "')");
				}
				});
		ele.onmousedown = DateTime.onMouseDown
	}
};
DateTime.onImageMouseDown = function(evt, str, id,format) {
	try{
		if(format!=''){
			var fArr= format.split("-"); // 2010-9 月份只有一个杠
			if(fArr.length==2){
				// alert("月格式或");
				// ,quickSel:['2010-8','2010-9','2010-10']//快速选择
				// var midMonth=new Date();
				// midMonth.setFullYear(fArr[0]);
				// midMonth.setFullYear(fArr[0]);
				WdatePicker({el:id,dateFmt:format});
			}else{
				WdatePicker({el:id,dateFmt:format});
			}
			
			
			
		}else{
			WdatePicker({el:id});
		}
	}catch(e){
		Calendar.close();
		TimeSelector.close();
		var pw = $E.getTopLevelWindow();
		if (pw.DateTime && id == pw.DateTime.showingID) {
			return
		}
		eval(str + ".show('" + id + "')");
	}
	stopEvent(evt)
};
DateTime.onMouseDown = function(a) {
	var b = $E.getTopLevelWindow();
	if (this.id == b.DateTime.showingID && b.SourceWindow == window) {
		cancelEvent(a)
	}
};
Page.onMouseDown(function() {
			Calendar.close();
			TimeSelector.close()
		});
function _LeftPad(b, d, a) {
	b = "" + b;
	return b.leftPad(d, a)
}
TimeSelector.setTime = function(a) {
	var f, b, n;
	if (a) {
		if (!/\d{1,2}\:\d{1,2}(\:\d{1,2})?/.test(a)) {
			Dialog.alert("错误的时间:" + a)
		}
		var g = a.split(":");
		f = parseInt(g[0]);
		b = parseInt(g[1]);
		n = parseInt(g[2])
	} else {
		var l = new Date();
		f = l.getHours();
		b = 0;
		n = 0
	}
	f = f > 23 ? 23 : f;
	b = b > 59 ? 59 : b;
	n = n > 59 ? 59 : n;
	b = b >= 10 ? b : "0" + b;
	n = n >= 10 ? n : "0" + n;
	var j = $("_TimeSelector_Frame").contentWindow;
	var g = j.$("divWrapper").getElementsByTagName("td");
	var k = g.length;
	for (var c = 0; c < k; c++) {
		g[c].className = ""
	}
	j.$("selectorHour").innerHTML = f;
	j.$("selectorMinute").innerHTML = b;
	j.$("selectorSecond").innerHTML = n;
	j.$("_TimeSelector_Tip").innerHTML = f + ":" + b + ":" + n;
	j.$("divHour").getElementsByTagName("td")[parseInt(f)].className = "selected";
	j.$("divMinute").getElementsByTagName("td")[parseInt(b)].className = "selected";
	j.$("divSecond").getElementsByTagName("td")[parseInt(n)].className = "selected";
	TimeSelector.showType("Hour");
	return true
};
TimeSelector.setTip = function() {
	$("_TimeSelector_Tip").innerText = [$V("_TimeSelector_Hour"),
			$V("_TimeSelector_Minute"), $V("_TimeSelector_Second")].join(":")
};
TimeSelector.setNow = function() {
	$S(Control, DateTime.getCurrentTime());
	var _evt = Control.getAttribute("onchange");
	if (_evt) {
		eval(_evt)
	}
	TimeSelector.close()
};
TimeSelector.returnTime = function(b) {
	var c = $("_TimeSelector_Frame").contentWindow;
	if (b) {
		$S(c.Control, DateTime.getCurrentTime())
	} else {
		var a = [c.$("selectorHour").innerHTML,
				c.$("selectorMinute").innerHTML,
				c.$("selectorSecond").innerHTML];
		$S(c.Control, a.join(":"))
	}
	TimeSelector.close()
};
TimeSelector.showType = function(c) {
	var d = $("_TimeSelector_Frame").contentWindow;
	var a = ["Hour", "Minute", "Second"];
	for (var b = 0; b < a.length; b++) {
		d.$("selector" + a[b]).className = "selector";
		d.$("div" + a[b]).style.display = "none"
	}
	d.$("div" + c).style.display = "";
	d.$("selector" + c).className = "selector_current";
	TimeSelector.adjustSize()
};
TimeSelector.show = function(a, c) {
	var m = $E.getTopLevelWindow();
	a = $(a);
	try {
		a.onfocus.apply(a, [])
	} catch (j) {
	}
	c = c ? c : $V(a);
	var n;
	if (!m.$("_TimeSelector")) {
		n = m.document.createElement("div");
		n.id = "_TimeSelector";
		n.style.position = "absolute";
		n.style.zIndex = 999;
		n.innerHTML = "<iframe id='_TimeSelector_Frame' frameborder=0 scrolling=no width=194 height=153></iframe>";
		n.style.width = "194px";
		m.document.body.appendChild(n);
		n.style.display = "";
		var h = m.$("_TimeSelector_Frame").contentWindow;
		var l = h.document;
		l.open();
		var g = [];
		g.push("<style>");
		g.push("body {margin: 0px;}");
		g.push(".timetable {}");
		g
				.push(".timetable {position: absolute;	border-top: 1px solid #777;	border-right: 1px solid #555;border-bottom: 1px solid #444;font-family: tahoma,verdana,sans-serif;");
		g
				.push("border-left: 1px solid #666;font-size: 11px;cursor: default;background: #fff;}");
		g
				.push(".timetable .buttonNow {text-align: center;	background-color:#def;	border-right: 1px solid #999;color:#000;font-size: 12px;}");
		g
				.push(".timetable .buttonConfirm {text-align: center;	background-color:#def;	border-left: 1px solid #999;color:#000;font-size: 12px;}");
		g
				.push(".timetable .buttonclose {color:#06c;text-align: center;	background-color:#def;border-left: 1px solid #999;font-size:9px;width:16px}");
		g
				.push(".timetable td.selected {font-weight: bold;border: 1px solid #39f;	background: #c3e4FF;}");
		g.push(".timetable td.now {font-weight: bold; color: #03f;}");
		g
				.push(".timetable .tipnow {font-weight: bold;font-size:12px;color: #258;text-align: left;}");
		g
				.push(".timetable td.over {border:1px solid #06c;background: #EDFBD2;}");
		g
				.push(".selector {color:#258;padding:0 8px;border-right: 1px solid #999;border-left: 1px solid #999;background: #def;}");
		g
				.push(".selector_current {color:#fff;padding:0 8px;border-right: 1px solid #999;border-left: 1px solid #999;background: #ff8800;}");
		g
				.push(".wrapper {background-color:#fff;border-top: 1px solid #999;	border-bottom: 1px solid #999;text-align: center;}");
		g
				.push(".wrapper td{border: 1px solid #fff;	font-size: 12px;text-align: center;	color: #06c;}");
		g.push("</style>");
		g.push("<body><div class='timetable' id='_TimeSelector_Table'>");
		g
				.push("<table border='0' cellpadding='0' cellspacing='0' onselectstart='return false;' oncontextmenu='return false'>");
		g
				.push("<tr><td><table width='100%' border='0' cellpadding='0' cellspacing='0'>");
		g.push("<tr><td height='18' class='tipnow'>");
		g
				.push("<table width='100' height='100%' border='0' cellpadding='0' cellspacing='0'>");
		g.push("<tr class='tipnow'>");
		g
				.push("<td valign='middle' class='selector_current' id='selectorHour' onclick=\"TopWindow.TimeSelector.showType('Hour')\">0</td>");
		g
				.push("<td valign='middle' align='center'><span style='padding:3px;'>:</span></td>");
		g
				.push("<td valign='middle' class='selector' id='selectorMinute' onclick=\"TopWindow.TimeSelector.showType('Minute')\">00</td>");
		g
				.push("<td valign='middle' align='center'><span style='padding:3px;'>:</span></td>");
		g
				.push("<td valign='middle' class='selector' id='selectorSecond' onclick=\"TopWindow.TimeSelector.showType('Second')\">00</td>");
		g.push("</tr></table></td>");
		g
				.push("<td width='16'><table height='100%' height='100%' border='0' cellpadding='0' cellspacing='0'><tr><td class='buttonclose' title='取消' valign='middle' onclick=\"TopWindow.TimeSelector.close();this.style.backgroundColor='#def'\" onmouseover=\"this.style.backgroundColor='#9cf'\" onmouseout=\"this.style.backgroundColor='#def'\">×</td></tr></table></td>");
		g.push("</tr></table>");
		g.push("<div class='wrapper' id='divWrapper'>");
		g.push("<div id='divHour'>");
		g
				.push("<table width='210' height='60' border='0' cellpadding='0' cellspacing='0' style='font-size:13px'>");
		for (var d = 0; d < 24; d++) {
			if (d % 8 == 0) {
				g.push("<tr>")
			}
			if (d % 12 == 0) {
				g
						.push("<td onclick='TopWindow.TimeSelector.onClick(this)' onmouseover='TopWindow.TimeSelector.onMouseOver(this)' onmouseout='TopWindow.TimeSelector.onMouseOut(this)' style='color: #e70'>"
								+ d + "</td>")
			} else {
				g
						.push("<td onclick='TopWindow.TimeSelector.onClick(this)' onmouseover='TopWindow.TimeSelector.onMouseOver(this)' onmouseout='TopWindow.TimeSelector.onMouseOut(this)'>"
								+ d + "</td>")
			}
			if (d % 8 == 7) {
				g.push("</tr>")
			}
		}
		g.push("</table>");
		g.push("</div>");
		g.push("<div id='divMinute' style='display:none'>");
		var f = [];
		f
				.push("<table width='210' height='120' border='0' cellpadding='0' cellspacing='0'>");
		for (var d = 0; d < 60; d++) {
			if (d % 10 == 0) {
				f.push("<tr>");
				f
						.push("<td onclick='TopWindow.TimeSelector.onClick(this)' onmouseover='TopWindow.TimeSelector.onMouseOver(this)' onmouseout='TopWindow.TimeSelector.onMouseOut(this)' style='color: #e70'>"
								+ (d >= 10 ? d : "0" + d) + "</td>")
			} else {
				f
						.push("<td onclick='TopWindow.TimeSelector.onClick(this)' onmouseover='TopWindow.TimeSelector.onMouseOver(this)' onmouseout='TopWindow.TimeSelector.onMouseOut(this)'>"
								+ (d >= 10 ? d : "0" + d) + "</td>")
			}
			if (d % 10 == 9) {
				f.push("</tr>")
			}
		}
		f.push("</table>");
		f.push("</div>");
		g.push(f.join("\n"));
		g.push("<div id='divSecond' style='display:none'>");
		g.push(f.join("\n"));
		g.push("</div>");
		g
				.push("<table width='100%' border='0' align='left' cellpadding='0' cellspacing='0'>");
		g.push("<tr>");
		g
				.push("<td width='17%' height='20' class='buttonNow' onclick=\"TopWindow.TimeSelector.returnTime(true);this.style.backgroundColor='#def'\" onmouseover=\"this.style.backgroundColor='#9cf'\" onmouseout=\"this.style.backgroundColor='#def'\">现在</td>");
		g
				.push("<td width='66%' style='font-size:11px;background-color:#fff6cc;font-weight:bold;color:#258;' id='_TimeSelector_Tip' align='center'>0:00:00</td>");
		g
				.push("<td width='17%' height='20' class='buttonConfirm' onclick=\"TopWindow.TimeSelector.returnTime();this.style.backgroundColor='#def'\" onmouseover=\"this.style.backgroundColor='#9cf'\" onmouseout=\"this.style.backgroundColor='#def'\">确定</td>");
		g.push("</tr>");
		g.push("</table>");
		g.push("</td>");
		g.push("</tr>");
		g.push("</table>");
		g.push("</div></body>");
		g
				.push("<script>function $(ele){return document.getElementById(ele);};function setTime(){if(!TopWindow.TimeSelector.setTime(Control.value)){alert('时间填写错误!');}TopWindow.TimeSelector.adjustSize();}<\/script>");
		l.write(g.join("\n"));
		l.close();
		h.Control = a;
		h.TopWindow = m;
		h.setTime()
	} else {
		n = m.$("_TimeSelector");
		n.show();
		var b = m.$("_TimeSelector_Frame");
		b.show();
		b.contentWindow.Control = a;
		b.contentWindow.setTime()
	}
	var k = $E.computePositionEx(a, n);
	n.style.top = k.y + "px";
	n.style.left = k.x + "px";
	m.DateTime.showingID = a.id;
	m.SourceWindow = window;
	Misc.lockScroll(window)
};
TimeSelector.onMouseOver = function(b) {
	var c = $("_TimeSelector_Frame").contentWindow;
	var d = b.parentNode.parentNode.parentNode.parentNode.id;
	var a = [c.$("selectorHour").innerHTML, c.$("selectorMinute").innerHTML,
			c.$("selectorSecond").innerHTML];
	if (d == "divHour") {
		a[0] = b.innerHTML
	} else {
		if (d == "divMinute") {
			a[1] = b.innerHTML
		} else {
			if (d == "divSecond") {
				a[2] = b.innerHTML
			}
		}
	}
	c.$("_TimeSelector_Tip").innerHTML = a.join(":");
	$E.addClassName("over", true, b)
};
TimeSelector.onMouseOut = function(a) {
	$E.removeClassName("over", a)
};
TimeSelector.onClick = function(a) {
	var c = $("_TimeSelector_Frame").contentWindow;
	$E.addClassName("selected", true, a);
	var d = a.parentNode.parentNode.parentNode.parentNode.id;
	if (d == "divHour") {
		c.$("divHour").getElementsByTagName("td")[parseInt(c.$("selectorHour").innerHTML)].className = "";
		c.$("selectorHour").innerHTML = a.innerHTML;
		TimeSelector.showType("Minute")
	} else {
		if (d == "divMinute") {
			c.$("divMinute").getElementsByTagName("td")[parseInt(c
					.$("selectorMinute").innerHTML)].className = "";
			c.$("selectorMinute").innerHTML = a.innerHTML;
			TimeSelector.showType("Second")
		} else {
			if (d == "divSecond") {
				c.$("divSecond").getElementsByTagName("td")[parseInt(c
						.$("selectorSecond").innerHTML)].className = "";
				c.$("selectorSecond").innerHTML = a.innerHTML;
				TimeSelector.returnTime()
			}
		}
	}
	var b = $E.getTopLevelWindow();
	Misc.unlockScroll(b.SourceWindow)
};
TimeSelector.close = function() {
	var b = $E.getTopLevelWindow();
	if (b.DateTime && b.$("_TimeSelector") && b.$("_TimeSelector").visible()) {
		var c = b.$("_TimeSelector_Frame");
		try {
			c.contentWindow.Control.onblur.apply(c.contentWindow.Control, [])
		} catch (a) {
		}
		$E.hide(b.$("_TimeSelector"));
		Misc.unlockScroll(b.SourceWindow);
		b.SourceWindow = null;
		b.DateTime.showingID = false
	}
};
Calendar.showYearSelector = function() {
	var f = $("_Calendar_Frame").contentWindow;
	var d = f.$("_Calendar_Year"), c = f.$("_Calendar_YearSelector");
	d.style.display = "none";
	c.style.display = "";
	var b = d.Year;
	for (var a = b > 50 ? b - 50 : 0; a <= 50 + parseInt(b); a++) {
		c.options.add(new Option(a, a))
	}
	c.focus();
	c.selectedIndex = 50;
	Calendar.adjustSize()
};
Calendar.showMonthSelector = function() {
	var c = $("_Calendar_Frame").contentWindow;
	var b = c.$("_Calendar_Month"), a = c.$("_Calendar_MonthSelector");
	b.style.display = "none";
	a.style.display = "";
	a.focus();
	a.selectedIndex = b.Month;
	Calendar.adjustSize()
};
Calendar.hideYearSelector = function() {
	var d = $("_Calendar_Frame").contentWindow;
	var c = d.$("_Calendar_Year"), b = d.$("_Calendar_YearSelector");
	c.style.display = "";
	b.style.display = "none";
	for (var a = b.options.length; a > -1; a--) {
		b.remove(a)
	}
	Calendar.adjustSize()
};
Calendar.hideMonthSelector = function() {
	var a = $("_Calendar_Frame").contentWindow;
	a.$("_Calendar_Month").style.display = "";
	a.$("_Calendar_MonthSelector").style.display = "none";
	Calendar.adjustSize()
};
Calendar.adjustSize = function() {
	var b = $("_Calendar_Frame").contentWindow;
	var a = $E.getDimensions(b.$("_Calendar_Table"));
	b.frameElement.height = a.height + 1;
	b.frameElement.width = a.width + 3
};
TimeSelector.adjustSize = function() {
	var b = $("_TimeSelector_Frame").contentWindow;
	var a = $E.getDimensions(b.$("_TimeSelector_Table"));
	b.frameElement.height = a.height;
	b.frameElement.width = a.width + 3
};
Calendar.onYearSelectorChange = function() {
	var d = $("_Calendar_Frame").contentWindow;
	var c = d.$("_Calendar_Year"), b = d.$("_Calendar_YearSelector");
	c.Year = b.value;
	var a = c.Year + "-" + _LeftPad(d.$("_Calendar_Month").Month + 1, "0", 2)
			+ "-01";
	Calendar.setDate(a);
	c.style.display = "";
	b.style.display = "none";
	Calendar.adjustSize()
};
Calendar.onMonthSelectorChange = function() {
	var d = $("_Calendar_Frame").contentWindow;
	var c = d.$("_Calendar_Month"), b = d.$("_Calendar_MonthSelector");
	c.Month = parseInt(b.value);
	var a = d.$("_Calendar_Year").Year + "-" + _LeftPad(c.Month + 1, "0", 2)
			+ "-01";
	Calendar.setDate(a);
	c.style.display = "";
	b.style.display = "none";
	Calendar.adjustSize()
};
Calendar.getDateString = function(a) {
	var j = $("_Calendar_Frame").contentWindow;
	var f = j.Control;
	var h = f.$A("format");
	if (!h) {
		h = "yyyy-MM-dd"
	}
	if (a.Day) {
		var b = a.Day, g = j.$("_Calendar_Month").Month, c = j
				.$("_Calendar_Year").Year;
		if (b < 0) {
			b = -b;
			if (g == 0) {
				g = 11;
				c--
			} else {
				g--
			}
		} else {
			if (b > 32) {
				b -= 40;
				if (g == 11) {
					g = 0;
					c++
				} else {
					g++
				}
			}
		}
		h = h.replace("yyyy", c);
		h = h.replace("MM", _LeftPad(g + 1, "0", 2));
		h = h.replace("dd", _LeftPad(b, "0", 2));
		return h
	} else {
		if (a.id == "_Calendar_Today") {
			var k = new Date();
			h = h.replace("yyyy", isGecko ? k.getYear() + 1900 : k.getYear());
			h = h.replace("MM", _LeftPad(k.getMonth() + 1, "0", 2));
			h = h.replace("dd", _LeftPad(k.getDate(), "0", 2));
			return h
		} else {
			return false
		}
	}
};
Calendar.onMouseOver = function(a) {
	var b = $("_Calendar_Frame").contentWindow;
	a.oldCssText = a.style.cssText;
	var c = Calendar.getDateString(a);
	if (c) {
		b.$("_Calendar_Tip").innerHTML = c
	}
	if (a.Day) {
		a.style.cssText = "border-top: 1px solid #06c;border-right: 1px solid #06c;border-bottom: 1px solid #06c;border-left: 1px solid #06c;padding: 2px 2px 0px 2px;background: #EDFBD2;"
	} else {
		a.style.cssText = "background: #9cf;"
	}
	Calendar.isMouseOut = false
};
Calendar.onMouseOut = function(a) {
	a.style.cssText = a.oldCssText
};
Calendar.returnDate = function(cell) {
	var win = $("_Calendar_Frame").contentWindow;
	var Control = win.Control;
	$S(Control, Calendar.getDateString(cell));
	var _evt = Control.$A("onchange");
	if (_evt) {
		eval(_evt)
	}
	cell.style.cssText = cell.oldCssText;
	Calendar.close()
};
Calendar.previousYear = function() {
	var b = $("_Calendar_Frame").contentWindow;
	var a = (--b.$("_Calendar_Year").Year) + "-"
			+ _LeftPad(++b.$("_Calendar_Month").Month, "0", 2) + "-01";
	Calendar.setDate(a);
	Calendar.adjustSize()
};
Calendar.nextYear = function() {
	var b = $("_Calendar_Frame").contentWindow;
	var a = (++b.$("_Calendar_Year").Year) + "-"
			+ _LeftPad(++b.$("_Calendar_Month").Month, "0", 2) + "-01";
	Calendar.setDate(a);
	Calendar.adjustSize()
};
Calendar.previousMonth = function() {
	var d = $("_Calendar_Frame").contentWindow;
	var c = d.$("_Calendar_Month").Month, b = d.$("_Calendar_Year").Year;
	if (c == 0) {
		c = 11;
		b--
	} else {
		c--
	}
	var a = "" + b + "-" + _LeftPad(c + 1, "0", 2) + "-01";
	Calendar.setDate(a);
	Calendar.adjustSize()
};
Calendar.nextMonth = function() {
	var d = $("_Calendar_Frame").contentWindow;
	var c = d.$("_Calendar_Month").Month, b = d.$("_Calendar_Year").Year;
	if (c == 11) {
		c = 0;
		b++
	} else {
		c++
	}
	var a = "" + b + "-" + _LeftPad(c + 1, "0", 2) + "-01";
	Calendar.setDate(a);
	Calendar.adjustSize()
};
Calendar.setDate = function(w) {
	var b = $("_Calendar_Frame").contentWindow;
	var z = b.Control;
	var f;
	if (!w) {
		var v = new Date();
		f = [isGecko ? v.getYear() + 1900 : v.getYear(), v.getMonth() + 1,
				v.getDate()]
	} else {
		var s = z.$A("format");
		if (!s) {
			s = "yyyy-MM-dd"
		}
		f = new Array(3);
		var k = s.indexOf("yyyy");
		if (k >= 0) {
			f[0] = w.substr(k, 4)
		} else {
			// alert("日期格式错误，没有年!")
		}
		var u = s.indexOf("MM");
		if (u >= 0) {
			f[1] = w.substr(u, 2)
		} else {
			// alert("日期格式错误，没有月!")
		}
		var t = s.indexOf("dd");
		if (t >= 0) {
			f[2] = w.substr(t, 2)
		} else {
			// alert("日期格式错误，没有日!")
		}
	}
	var l = f[0];
	var x = true;
	if (isNaN(l)) {
		l = "2000";
		x = false
	}
	b.$("_Calendar_Year").innerHTML = l;
	b.$("_Calendar_Year").Year = l;
	var y = f.length > 1 ? f[1] - 1 : 0;
	if (f.length == 1) {
		x = false
	}
	if (isNaN(y) || y < 0 || y > 11) {
		y = 0;
		x = false
	}
	b.$("_Calendar_Month").innerHTML = Calendar.monthNames[y];
	b.$("_Calendar_Month").Month = y;
	var q = f.length > 2 ? f[2] : 0;
	var A = new Date();
	A.setYear(l);
	A.setMonth(y);
	A.setDate(1);
	var m = A.getDay();
	if (y == 0) {
		A.setYear(l - 1);
		A.setMonth(11)
	} else {
		A.setYear(l);
		A.setMonth(y - 1)
	}
	var c = [], r, n;
	for (r = 28; r < 33; r++) {
		A.setDate(r);
		if (A.getMonth() == y) {
			for (n = r - m; n < r; n++) {
				c.push([0, n])
			}
			break
		}
	}
	A.setYear(l);
	A.setMonth(y);
	for (r = 1; r < 32; r++) {
		if (r >= 28) {
			A.setDate(r);
			if (A.getMonth() != y) {
				break
			}
		}
		if ((m + r) % 7 == 0 || (m + r) % 7 == 1) {
			c.push([1, r])
		} else {
			c.push([2, r])
		}
	}
	for (n = 0; n < 7 - ((r - 1 + m) % 7 == 0 ? 7 : (r - 1 + m) % 7); n++) {
		c.push([3, n + 1])
	}
	var h = [], g = b.$("_Calendar_Table").rows;
	for (r = 0; r < c.length; r++) {
		var o = c[r][0];
		var a = g[Math.floor(2 + r / 7)].cells[r % 7];
		a.innerHTML = c[r][1];
		if (o == 0) {
			a.className = "day disabled";
			a.Day = -c[r][1]
		}
		if (o == 3) {
			a.className = "day disabled";
			a.Day = 40 + c[r][1]
		}
		if (o == 1) {
			a.className = "day weekend";
			a.Day = c[r][1]
		}
		if (o == 2) {
			a.className = "day";
			a.Day = c[r][1]
		}
	}
	for (n = 4; n < 6; n++) {
		if (n > c.length / 7 - 1) {
			b.$("_Calendar_DayRow" + n).style.display = "none"
		} else {
			b.$("_Calendar_DayRow" + n).style.display = ""
		}
	}
	if (f.length == 2) {
		x = false
	}
	if (isNaN(q) || q < 1 || q > 31) {
		q = 1;
		x = false
	}
	b.$("_Calendar_Day" + (q - 1 + m)).className += " selected";
	b.$("_Calendar_Tip").innerHTML = l + "-" + _LeftPad(y + 1, "0", 2) + "-"
			+ _LeftPad(q, "0", 2);
	A = new Date();
	if ((isGecko ? A.getYear() + 1900 : A.getYear()) == l && A.getMonth() == y) {
		b.$("_Calendar_Day" + (A.getDate() - 1 + m)).className += " today"
	}
	return x
};
Calendar.show = function(a, c) {
	var n = $E.getTopLevelWindow();
	a = $(a);
	try {
		a.onfocus.apply(a, [])
	} catch (k) {
	}
	c = c ? c : $V(a);
	var o;
	if (!n.$("_Calendar")) {
		o = n.document.createElement("div");
		o.id = "_Calendar";
		o.style.position = "absolute";
		o.style.zIndex = 999;
		o.innerHTML = "<iframe id='_Calendar_Frame' frameborder=0 scrolling=no width=194 height=153></iframe>";
		o.style.width = "194px";
		n.document.body.appendChild(o);
		o.style.display = "";
		var h = n.$("_Calendar_Frame").contentWindow;
		var m = h.document;
		m.open();
		var g = [];
		g.push("<style>");
		g.push(".nostyle{}");
		g
				.push(".calendar {position: absolute; border-top: 1px solid #777; border-right: 1px solid #555; border-bottom: 0px solid #444; border-left: 1px solid #666; font-size: 11px; cursor: default; background: #ddd;}");
		g
				.push(".calendar table { font-size: 11px; color: #06c; cursor: default; background: #def; font-family: tahoma,verdana,sans-serif;}");
		g.push(".daynames{color:555;}");
		g
				.push(".calendar .button {text-align: center;padding: 1px;border-top: 1px solid #fff; border-right: 1px solid #999; border-bottom: 1px solid #999; border-left: 1px solid #fff;}");
		g
				.push(".calendar .buttontoday {text-align: center; padding: 1px; border-top: 1px solid #999; border-right: 1px solid #999; border-bottom: 1px solid #666; color:#000;}");
		g
				.push(".calendar .buttonclose {text-align: center; padding: 1px; border-top: 1px solid #fff; border-right: 0px solid #999; border-bottom: 1px solid #999; border-left: 1px solid #fff;}");
		g
				.push(".calendar thead .title {font-weight: bold; border-right: 1px solid #999; border-bottom: 1px solid #999; background: #B3D4FF; color: #258; text-align: center;}");
		g
				.push(".calendar thead .name {border-bottom: 1px solid #ccc; padding: 2px; text-align: right; background: #E8EEF4;}");
		g.push(".calendar .weekend {color: #e70;}");
		g
				.push(".calendar tbody .day {width: 2em; text-align: right; padding: 2px 4px 2px 2px; background: #fff;}");
		g
				.push(".calendar tbody td.selected {font-weight: bold; border-top: 1px solid #06c; border-right: 1px solid #06c; border-bottom: 1px solid #06c; border-left: 1px solid #06c; padding: 2px 2px 0px 2px; background: #B3D4FF;}");
		g.push(".calendar tbody td.weekend {color: #e70;}");
		g.push(".calendar tbody td.today {font-weight: bold;color: #03f;}");
		g.push(".calendar tbody .disabled { color: #999; }");
		g
				.push(".calendar tfoot .tiptoday {padding: 2px; border-top: 1px solid #999; border-right: 0px solid #999; border-bottom: 1px solid #666; border-left: 0px solid #999; background: #fff6cc; font-weight: bold; color: #258; text-align: center;}");
		g.push("body {margin: 0px; }");
		g.push("</style>");
		g.push("<div class='calendar'>");
		g
				.push("<TABLE oncontextmenu='return false' onselectstart='return false;' id=_Calendar_Table cellSpacing=0 cellPadding=0 width=190>");
		g.push("  <THEAD>");
		g.push("    <TR><TD colSpan=7>");
		g
				.push("      <TABLE class=nostyle cellSpacing=0 cellPadding=0 width='100%'>");
		g.push("        <TBODY>");
		g.push("          <TR height=20>");
		g
				.push("            <TD class=button onmouseover=TopWindow.Calendar.onMouseOver(this); onclick=TopWindow.Calendar.previousYear(); onmouseout=TopWindow.Calendar.onMouseOut(this); width=12>&#8249;</TD>");
		g
				.push("            <TD class=title><DIV id=_Calendar_Year style='WIDTH: 63px' onclick=TopWindow.Calendar.showYearSelector();>2006</DIV>");
		g
				.push("              <SELECT id=_Calendar_YearSelector onBlur='TopWindow.Calendar.hideYearSelector()' style='DISPLAY: none; FONT-SIZE: 11px; WIDTH: 63px' onChange='TopWindow.Calendar.onYearSelectorChange()'>");
		g.push("              </SELECT></TD>");
		g
				.push("            <TD class=button onmouseover=TopWindow.Calendar.onMouseOver(this); onclick=TopWindow.Calendar.nextYear(); onmouseout=TopWindow.Calendar.onMouseOut(this); width=12>&#8250;</TD>");
		g
				.push("            <TD class=button onmouseover=TopWindow.Calendar.onMouseOver(this); onclick=TopWindow.Calendar.previousMonth(); onmouseout=TopWindow.Calendar.onMouseOut(this); width=12>&#8249;</TD>");
		g
				.push("            <TD class=title><DIV id=_Calendar_Month style='WIDTH: 63px' onclick=TopWindow.Calendar.showMonthSelector();>12月</DIV>");
		g
				.push("              <SELECT id=_Calendar_MonthSelector onblur=TopWindow.Calendar.hideMonthSelector() style='DISPLAY: none; FONT-SIZE: 11px; WIDTH: 63px' onchange=TopWindow.Calendar.onMonthSelectorChange()>");
		g.push("                <OPTION value=0 selected>1月</OPTION>");
		for (var f = 1; f < 12; f++) {
			g.push("                <OPTION value=" + f + ">" + (f + 1)
					+ "月</OPTION>")
		}
		g.push("              </SELECT></TD>");
		g
				.push("        <TD class=button onmouseover=TopWindow.Calendar.onMouseOver(this); onclick=TopWindow.Calendar.nextMonth(); onmouseout=TopWindow.Calendar.onMouseOut(this); width=12>&#8250;</TD>");
		g
				.push("          <TD class=buttonclose onmouseover=TopWindow.Calendar.onMouseOver(this); onclick=TopWindow.Calendar.close(); onmouseout=TopWindow.Calendar.onMouseOut(this); width=16>×</TD>");
		g.push("        </TR>");
		g.push("        </TBODY>");
		g.push("      </TABLE>");
		g.push("      </TD>");
		g.push("    </TR>");
		g.push("    <TR class=daynames>");
		g.push("      <TD class='name weekend'>日</TD>");
		g.push("      <TD class=name>一</TD>");
		g.push("      <TD class=name>二</TD>");
		g.push("      <TD class=name>三</TD>");
		g.push("      <TD class=name>四</TD>");
		g.push("      <TD class=name>五</TD>");
		g.push("      <TD class='name weekend'>六</TD>");
		g.push("    </TR>");
		g.push("  </THEAD>");
		g.push("  <TBODY id=_Calendar_Body>");
		for (var f = 0; f < 6; f++) {
			g.push("    <TR class=daysrow id=_Calendar_DayRow" + f + ">");
			for (var d = 0; d < 7; d++) {
				g
						.push("      <TD class=day id=_Calendar_Day"
								+ (f * 7 + d)
								+ " onmouseover=TopWindow.Calendar.onMouseOver(this); onclick=TopWindow.Calendar.returnDate(this); onmouseout=TopWindow.Calendar.onMouseOut(this);>&nbsp;</TD>")
			}
			g.push("    </TR>")
		}
		g.push("  </TBODY>");
		g.push("  <TFOOT>");
		g.push("    <TR class=footrow>");
		g
				.push("      <TD class=buttontoday id=_Calendar_Today onmouseover=TopWindow.Calendar.onMouseOver(this); onclick=TopWindow.Calendar.returnDate(this); onmouseout=TopWindow.Calendar.onMouseOut(this); colSpan=2>今日</TD>");
		g
				.push("      <TD class=tiptoday id=_Calendar_Tip align=middle colSpan=5>&nbsp;</TD>");
		g.push("    </TR>");
		g.push("  </TFOOT>");
		g.push("</TABLE>");
		g.push("</div>");
		g
				.push("<script>function $(ele){return document.getElementById(ele);};function setDate(){if(!TopWindow.Calendar.setDate(Control.value)){alert('日期填写错误!');}TopWindow.Calendar.adjustSize();}<\/script>");
		m.write(g.join("\n"));
		m.close();
		h.Control = a;
		h.TopWindow = n;
		h.setDate()
	} else {
		o = n.$("_Calendar");
		o.show();
		var b = n.$("_Calendar_Frame");
		b.show();
		b.contentWindow.Control = a;
		b.contentWindow.setDate()
	}
	var l = $E.computePositionEx(a, o);
	o.style.top = l.y + "px";
	o.style.left = l.x + "px";
	n.DateTime.showingID = a.id;
	n.SourceWindow = window;
	Misc.lockScroll(window)
};
Calendar.close = function() {
	var b = $E.getTopLevelWindow();
	if (b.DateTime && b.$("_Calendar") && b.$("_Calendar").visible()) {
		var c = b.$("_Calendar_Frame");
		try {
			c.contentWindow.Control.onblur.apply(c.contentWindow.Control, [])
		} catch (a) {
		}
		$E.hide(b.$("_Calendar"));
		Misc.unlockScroll(b.SourceWindow);
		b.SourceWindow = null;
		b.DateTime.showingID = false
	}
};
function Dialog(a) {
	if (!a) {
	// alert("错误的Dialog ID！");
		return
	}
	this.ID = a;
	this.isModal = true;
	this.Width = 400;
	this.Height = 300;
	this.Top = 0;
	this.Left = 0;
	this.ParentWindow = null;
	this.onLoad = null;
	this.Window = null;
	this.Title = "";
	this.URL = null;
	this.DialogArguments = {};
	this.WindowFlag = false;
	this.Message = null;
	this.MessageTitle = null;
	this.ShowMessageRow = false;
	this.ShowButtonRow = true;
	this.ShowOKButton=true;
	this.OKButtonText="确 定";
	this.CanceButtonText="取 消";
	this.ShowCancelButton=true;
	this.Icon = null
}
Dialog._Array = [];
Dialog.prototype.showWindow = function() {
	if (isIE) {
		this.ParentWindow.showModalessDialog(this.URL, this.DialogArguments,
				"dialogWidth:" + this.Width + ";dialogHeight:" + this.Height
						+ ";help:no;scroll:no;status:no")
	}
	if (isGecko) {
		var b = "location=no,menubar=no,status=no;toolbar=no,dependent=yes,dialog=yes,minimizable=no,modal=yes,alwaysRaised=yes,resizable=no";
		this.Window = this.ParentWindow.open("", this.URL, b, true);
		var a = this.Window;
		if (!a) {
			alert("发现弹出窗口被阻止，请更改浏览器设置，以便正常使用本功能!");
			return
		}
		a.moveTo(this.Left, this.Top);
		a.resizeTo(this.Width, this.Height + 30);
		a.focus();
		a.location.href = this.URL;
		a.Parent = this.ParentWindow;
		a.dialogArguments = this.DialogArguments
	}
};
Dialog.prototype.show = function() {
	var m = $E.getTopLevelWindow();
	var k = m.document;
	var c = k.compatMode == "BackCompat"
			? k.body.clientWidth
			: k.documentElement.clientWidth;
	var a = k.compatMode == "BackCompat"
			? k.body.clientHeight
			: k.documentElement.clientHeight;
	var l = Math.max(k.documentElement.scrollLeft, k.body.scrollLeft);
	var d = Math.max(k.documentElement.scrollTop, k.body.scrollTop);
	if (!this.ParentWindow) {
		this.ParentWindow = window
	}
	this.DialogArguments._DialogInstance = this;
	this.DialogArguments.ID = this.ID;
	if (!this.Height) {
		this.Height = this.Width / 2
	}
	if (this.Top == 0) {
		this.Top = (a - this.Height - 30) / 2 + d - 8
	}
	if (this.Left == 0) {
		this.Left = (c - this.Width - 12) / 2 + l
	}
	if (this.ShowButtonRow) {
		this.Top -= 18
	}
	if (this.WindowFlag) {
		this.showWindow();
		return
	}
	var f = [];

	f.push('    <div class="UIBox" style="width:'+this.Width+'px;">');
	f.push('    <div class="Card">');
	f.push('        <div class="tab">');
	f.push('            <span class="le icon"></span>');
	f.push('            <div class="tabs">');
	f.push('                <span class="tit">'+this.Title+'</span>');
	f.push('            </div>');
	f.push('           <span class="ri icon"><a onFocus="this.blur();" href="javascript:Dialog.getInstance(\'' + this.ID+'\').close();" class="a"></a></span>');
	f.push('        </div>');
	f.push('        <div class="Card">');
	f.push('           <div class="BodyBox">');
	f.push('              <div class="body">');
	f.push("          <iframe src='");
	if (this.URL.indexOf(":") == -1) {
		f.push(Server.ContextPath + this.URL)
	} else {
		f.push(this.URL)
	}
	f.push("' id='_DialogFrame_"
					+ this.ID
					+ "' allowTransparency='true'  width='"
					+ (this.Width-8)
					+ "' height='"
					+ this.Height
					+ "' frameborder='0' style=\" border:none;\"></iframe>");
	f.push('<div  class="dialogClass" style="background-color: #DFE6F8" align="center">');
	f.push('<table ><tr><td>');
	f.push('<div id="_DialogButtons_'+ this.ID+ '">');
	f.push('<em unselectable="on" class=""><span  id="_ButtonOK_'+this.ID+'" class="da-button blue" onmouseover="this.className=\'da-button red\'" onmouseout="this.className=\'da-button blue\'"  style=\'cursor:hand;font-weight:bold\'>');
	f.push(this.OKButtonText);
	f.push('</span>');
	f.push('</em></div>');	
	f.push('</td>');    
	f.push('<td align="right">');
	f.push('<em unselectable="on" class=""><span  class="da-button blue"  onclick="Dialog.getInstance(\'' + this.ID+'\').close();"  id="_ButtonCancel_'+this.ID+'" onmouseover="this.className=\'da-button red\'" onmouseout="this.className=\'da-button blue\'"  style=\'cursor:hand;font-weight:bold\'>');
	f.push(this.CanceButtonText);
	f.push('</span>');
	f.push('																						</em>');	
	f.push('</td></tr></table>');
	
	
	
	
	f.push('              </div>');
	f.push('           </div>');
	f.push('        </div>');
	f.push('         <div class="foot"></div>');
	f.push('    </div>');
	f.push('    </div>');	
	this.TopWindow = m;
	var j = m.$("_DialogBGDiv");
	if (!j) {
		j = m.document.createElement("div");
		j.id = "_DialogBGDiv";
		$E.hide(j);
		m.$T("body")[0].appendChild(j)
	}
	var b = m.$("_DialogDiv_" + this.ID);
	if (!b) {
		b = m.document.createElement("div");
		$E.hide(b);
		b.id = "_DialogDiv_" + this.ID;
		b.className = "dialogdiv";
		b.setAttribute("dragStart", "Dialog.dragStart");
		m.$T("body")[0].appendChild(b)
	}
	b.onmousedown = function(o) {
		var n = $E.getTopLevelWindow();
		n.DragManager.onMouseDown(o || n.event, this)
	};
	this.DialogDiv = b;
	b.innerHTML = f.join("\n");
	m.$("_DialogFrame_" + this.ID).DialogInstance = this;
	m.Effect.initCtrlStyle(m.$("_ButtonOK_" + this.ID));
	m.Effect.initCtrlStyle(m.$("_ButtonCancel_" + this.ID));
	this.OKButton = m.$("_ButtonOK_" + this.ID);
	this.CancelButton = m.$("_ButtonCancel_" + this.ID);
	if (this.ShowMessageRow) {
		$E.show(m.$("_MessageRow_" + this.ID));
		if (this.MessageTitle) {
			m.$("_MessageTitle_" + this.ID).innerHTML = this.MessageTitle
		}
		if (this.Message) {
			m.$("_Message_" + this.ID).innerHTML = this.Message
		}
	}
	if (!this.ShowButtonRow) {
		m.$("_ButtonRow_" + this.ID).hide()
	}
	if (!this.ShowOKButton) {
		m.$("_ButtonOK_" + this.ID).hide()
	}
	if (!this.ShowCancelButton) {
		m.$("_ButtonCancel_" + this.ID).hide()
	}
	if (this.OKEvent) {
		this.OKButton.onclick = this.OKEvent
	}
	if (this.CancelEvent) {
		this.CancelButton.onclick = this.CancelEvent
	}
	if (!this.AlertFlag) {
		$E.show(j)
	} else {
		j = m.$("_AlertBGDiv");
		if (!j) {
			j = m.document.createElement("div");
			j.id = "_AlertBGDiv";
			$E.hide(j);
			m.$T("body")[0].appendChild(j);
			j.style.cssText = "background-color:#DFE6F8;position:absolute;left:0px;top:0px;opacity:0;filter:alpha(opacity=0);width:"
					+ c + "px;height:" + a + "px;z-index:991"
		}
	}
	this.DialogDiv.style.cssText = "position:absolute; display:block;z-index:9002;height:"+(this.Height)+"px;width:"+(this.Width+15)+"px;left:" + this.Left + "px;top:"
			+ this.Top + "px";
	if (!this.AlertFlag) {
		var g = window;
		var h = false;
		while (g != g.parent) {
			if (g._DialogInstance) {
				g._DialogInstance.DialogDiv.style.zIndex = 959;
				h = true;
				break
			}
			g = g.parent
		}
		if (!h) {
			j.style.cssText = "background-color:#DFE6F8;position:absolute;left:0px;top:0px;opacity:0;filter:alpha(opacity=0);width:"
					+ c + "px;height:" + a + "px;z-index:960;"
		}
	}
	m.Dialog._Array.push(this.ID)
};
Dialog.hideAllFlash = function(f) {
	if (!f || !f.$T) {
		return
	}
	var d = f.$T("embed");
	for (var c = 0; c < d.length; c++) {
		try {
			d[c].OldStyle = d[c].style.display;
			d[c].style.display = "none"
		} catch (b) {
		}
	}
	var a = f.$T("iframe");
	for (var c = 0; a && c < a.length; c++) {
		Dialog.hideAllFlash(a[c].contentWindow)
	}
};
Dialog.showAllFlash = function(f) {
	if (!f || !f.$T) {
		return
	}
	var d = f.$T("embed");
	for (var c = 0; c < d.length; c++) {
		try {
			d[c].style.display = d[c].OldStyle
		} catch (b) {
		}
	}
	var a = f.$T("iframe");
	for (var c = 0; a && c < a.length; c++) {
		Dialog.hideAllFlash(a[c].contentWindow)
	}
};
Dialog.prototype.addParam = function(a, b) {
	this.DialogArguments[a] = b
};
Dialog.prototype.close = function() {
	if (this.WindowFlag) {
		this.ParentWindow.$D = null;
		this.ParentWindow.$DW = null;
		this.Window.opener = null;
		this.Window.close();
		this.Window = null
	} else {
		var pw = $E.getTopLevelWindow();
		var win = window;
		var flag = false;
		while (win != win.parent) {
			if (win._DialogInstance) {
				flag = true;
				win._DialogInstance.DialogDiv.style.zIndex = 960;
				break
			}
			win = win.parent
		}
		if (this.AlertFlag) {
			$E.hide(pw.$("_AlertBGDiv"))
		}
		if (!flag && !this.AlertFlag) {
			pw
					.eval('window._OpacityFunc = function(){var w = $E.getTopLevelWindow();$E.hide(w.$("_DialogBGDiv"));}');
			pw.Effect
					.opacity(pw.$("_DialogBGDiv"), 40, 0, 100, pw._OpacityFunc)
		}
		this.DialogDiv.outerHTML = "";
		pw.Dialog._Array.remove(this.ID)
	}
};
Dialog.prototype.addButton = function(f, a, d) {
	var b = "<input id='_Button_" + this.ID + "_" + f
			+ "' type='button' value='" + a + "'> ";
	var c = $E.getTopLevelWindow();
	c.$("_DialogButtons_" + this.ID).$T("input")[0].getParent("a")
			.insertAdjacentHTML("beforeBegin", b);
	Effect.initCtrlStyle(c.$("_Button_" + this.ID + "_" + f));
	c.$("_Button_" + this.ID + "_" + f).onclick = d
};
Dialog.close = function(a) {
	window.Args._DialogInstance.close()
};
Dialog.getInstance = function(c) {
	var a = $E.getTopLevelWindow();
	var b = a.$("_DialogFrame_" + c);
	if (!b) {
		return null
	}
	return b.DialogInstance
};
Dialog.AlertNo = 0;
Dialog.alert = function(b, c, l, f) {
	
	var m = $E.getTopLevelWindow();
	var g = new Dialog("_DialogAlert" + Dialog.AlertNo++);
	g.ParentWindow = m;
	g.Width = l ? l : 300;
	g.Height = f ? f : 120;
	g.Title = "系统提示";
	g.URL = "javascript:void(0);";
	g.AlertFlag = true;
	g.CancelEvent = function() {
		g.close();
		if (c) {
			c()
		}
	};
	g.CanceButtonText = "确 定";
	g.show();
	m.$("_AlertBGDiv").show();
	$E.hide(m.$("_ButtonOK_" + g.ID));
	var j = m.$("_DialogFrame_" + g.ID).contentWindow;
	var k = j.document;
	k.open();
	k.write("<body oncontextmenu='return false;' style='background-color: #DFE6F8;'></body>");
	var d = [];
	d
			.push("<table height='100%' border='0' align='center' cellpadding='10' cellspacing='0'>");
	d
			.push("<tr><td align='right'><img id='Icon' src='/frame/images/window/icon-info.gif' width='34' height='34' align='absmiddle'></td>");
	d.push("<td align='left' id='Message' style='font-size:9pt'>" + b
			+ "</td></tr></table>");
	var a = k.createElement("div");
	a.innerHTML = d.join("");
	k.body.appendChild(a);
	k.close();
	var f = Math.max(k.documentElement.scrollHeight, k.body.scrollHeight);
	var l = Math.max(k.documentElement.scrollWidth, k.body.scrollWidth);
	if (l > 300) {
		j.frameElement.width = l
	}
	if (f > 120) {
		j.frameElement.height = f
	}
	g.CancelButton.value = "确 定";
	m.$("_DialogButtons_" + g.ID).style.textAlign = "center"
};

/* b 消息,n= ok function,=m,cancel function */
Dialog.confirm = function(b, n, m, k, d) {
	var l = $E.getTopLevelWindow();
	var f = new Dialog("_DialogConfirm" + Dialog.AlertNo++);
	f.Width = k ? k : 300;
	f.Height = d ? d : 120;
	f.Title = "信息确认";
	f.URL = "javascript:void(0);";
	f.AlertFlag = true;
	f.CancelEvent = function() {
		if (m) {
			m()
		}
		f.close()
	};
	f.OKEvent = function() {
		if (n) {
			n()
		}
		f.close()
	};
	f.show();
	l.$("_AlertBGDiv").show();
	var g = l.$("_DialogFrame_" + f.ID).contentWindow;
	var j = g.document;
	j.open();
	j.write("<body  style='background-color: #DFE6F8;' oncontextmenu='return false;'></body>");
	var c = [];
	c
			.push("<table height='100%' border='0' align='center' cellpadding='10' cellspacing='0'>");
	c
			.push("<tr><td align='right'><img id='Icon' src='/frame/images/window/icon-question.gif' width='34' height='34' align='absmiddle'></td>");
	c.push("<td align='left' id='Message' style='font-size:9pt'>" + b
			+ "</td></tr></table>");
	var a = j.createElement("div");
	a.innerHTML = c.join("");
	j.body.appendChild(a);
	j.close();
	l.$("_DialogButtons_" + f.ID).style.textAlign = "center"
};
var _DialogInstance = window.frameElement
		? window.frameElement.DialogInstance
		: null;
Page.onDialogLoad = function() {
	if (_DialogInstance) {
		if (_DialogInstance.Title) {
			document.title = _DialogInstance.Title
		}
		window.Args = _DialogInstance.DialogArguments;
		_DialogInstance.Window = window;
		window.Parent = _DialogInstance.ParentWindow
	}
};
Page.onDialogLoad();
Page.onLoad(function() {
			var f = _DialogInstance;
			if (f) {
				try {
					f.ParentWindow.$D = f;
					f.ParentWindow.$DW = f.Window;
					var a = false;
					if (!this.AlertFlag) {
						var c = f.ParentWindow;
						while (c != c.parent) {
							if (c._DialogInstance) {
								a = true;
								break
							}
							c = c.parent
						}
						if (!a) {
							Effect.opacity($E.getTopLevelWindow().$("_DialogBGDiv"), 0, 40, 400)
						}
					}
					if (f.AlertFlag) {
						$E.show($E.getTopLevelWindow().$("_AlertBGDiv"))
					}
					if (f.ShowButtonRow && $E.visible(f.CancelButton)) {
						f.CancelButton.focus()
					}
					if (f.onLoad) {
						f.onLoad()
					}
				} catch (b) {
					alert("DialogOnLoad:" + b.message + "\t(" + b.fileName
							+ " " + b.lineNumber + ")")
				}
			}
		}, 4);
Dialog.onKeyUp = function(b) {
	if (b.keyCode == 27) {
		var a = $E.getTopLevelWindow();
		if (a.Dialog._Array.length > 0) {
			Page.mousedown();
			Page.click();
			var c = a.Dialog.getInstance(a.Dialog._Array[a.Dialog._Array.length
					- 1]);
			c.CancelButton.onclick.apply(c.CancelButton, [])
		}
	}
};
Dialog.dragStart = function(a) {
	DragManager.doDrag(a, this.getParent("div"))
};
if (isIE) {
	document.attachEvent("onkeyup", Dialog.onKeyUp)
} else {
	document.addEventListener("keyup", Dialog.onKeyUp, false)
}
function Menu() {
	this.X = null;
	this.Y = null;
	this.Param = null;
	this.Items = [];
	this.Event = null;
	Menu.prototype.setEvent = function(a) {
		var b = getEventPosition(a);
		this.X = b.x;
		this.Y = b.y;
		this.Event = a
	};
	Menu.prototype.setPosition = function(a, b) {
		this.X = a;
		this.Y = b
	};
	Menu.prototype.setParam = function(a) {
		this.Param = a
	};
	Menu.prototype.addItem = function(d, c, b, a) {
		this.Items.push([d, c, b, a])
	};
	Menu.prototype.onClick = function(a) {
		if (!this.Items[a][3]) {
			var b = this.Items[a][1];
			Menu.close();
			b.apply(this, [this.Param])
		}
	};
	Menu.prototype.getHtml = function() {
		var b = [];
		b.push("<html><head><style>");
		b.push("body {margin: 0px;background: #FFFFFF;color: #444444}");
		b.push("td {font-size: 12px;}");
		b
				.push(".imgdisabled img{opacity: 0.5; filter: gray Alpha(Opacity=50);}");
		b.push("</style></head><body>");
		b
				.push("<table border='0' id='_ContextMenu_Table' cellspacing='1' cellpadding='0' oncontextmenu='TopWindow.stopEvent(event);' onselectstart='TopWindow.stopEvent(event);' style='-moz-user-select:none;border:1px solid #8F8F73;background:#FFFFFF;'><tr><td>");
		for (var a = 0; a < this.Items.length; a++) {
			if (this.Items[a][0] == "-") {
				b
						.push("<table width='100%' border='0' cellspacing='0' cellpadding='0' height='1' style='padding-top:0px;padding-bottom:0px;height:1px; font-size:0px;background:#B9B99D;'><tr><td style='background:#D6DFF7; width:24px;' width='24'></td><td style='background:#B9B99D; width:66px;'></td></tr></table>");
				continue
			}
			if (true == this.Items[a][3]) {
				b
						.push("<table width='100%' border='0' cellspacing='0' cellpadding='0' class='imgdisabled' style='font-size:12px'><tr>");
				if (this.Items[a][2]) {
					b
							.push("<td height='22' width='24' align='center' valign='middle' style='background:#DDF;'><img src='"
									+ Server.ContextPath
									+ this.Items[a][2]
									+ "' width='20' height='20' hspace='2' vspace='1'/></td>")
				} else {
					b
							.push("<td height='22' width='24' align='center' valign='middle' style='background:#DDF;'><img src='"
									+ Server.ContextPath
									+ "images/blank.gif' width='20' height='20' hspace='2' vspace='1'/></td>")
				}
				b
						.push("<td style='background:#F7F8FD; color:#999999; padding-left:10px;' nowrap='true'>"
								+ this.Items[a][0] + "</td>");
				b
						.push("<td style='background:#F7F8FD; width:15px; text-align:center' width='15'>&nbsp;</td>")
			} else {
				b
						.push("<table width='100%' border='0' cellspacing='0' cellpadding='0' style='cursor:pointer;font-size:12px' onclick='TopWindow.Menu.getInstance().onClick("
								+ a
								+ ")' onmouseout='TopWindow.Menu.onMouseOut(this)' onmouseover='TopWindow.Menu.onMouseOver(this)'><tr>");
				if (this.Items[a][2]) {
					b
							.push("<td height='22' width='24' align='center' valign='middle' style='background:#DDF;'><img src='"
									+ Server.ContextPath
									+ this.Items[a][2]
									+ "' width='20' height='20' hspace='2' vspace='1'/></td>")
				} else {
					b
							.push("<td height='22' width='24' align='center' valign='middle' style='background:#DDF;'><img src='"
									+ Server.ContextPath
									+ "images/blank.gif' width='20' height='20' hspace='2' vspace='1'/></td>")
				}
				b
						.push("<td style='background:#F7F8FD; padding-left:10px;cursor:pointer;' nowrap='true'>"
								+ this.Items[a][0] + "</td>");
				b
						.push("<td style='background:#F7F8FD; width:15px; text-align:center' width='15'>&nbsp;</td>")
			}
			b.push("</tr></table>")
		}
		b.push("</td></tr></table>");
		b
				.push("<script>function $(ele){return document.getElementById(ele);}function init(){TopWindow.Menu.adjustSize();}<\/script></body></html>");
		return b.join("\n")
	};
	Menu.prototype.setPosition = function() {
		var j = $E.getTopLevelWindow();
		var a = j.$("_DivContextMenu");
		$E.show(a);
		var g = j.$("_ContextMenu_Frame").contentWindow;
		var l = g.$("_ContextMenu_Table").offsetHeight;
		var f = g.$("_ContextMenu_Table").offsetWidth;
		var c = Math.max(document.documentElement.scrollLeft,
				document.body.scrollLeft);
		var k = Math.max(document.documentElement.scrollTop,
				document.body.scrollTop);
		var d = 0;
		var b = 0;
		var h = $E.computePosition(this.X, this.Y, this.X, this.Y, "all", f, l,
				j);
		d = h.x + c;
		b = h.y + k;
		j.$("_DivContextMenu").style.width = f + "px";
		j.$("_DivContextMenu").style.height = l + "px";
		d = d < 0 ? 0 : d;
		a.style.left = d + "px";
		a.style.top = b + "px"
	};
	Menu.prototype.show = function() {
		if (this.Items.length == 0) {
			return
		}
		var a = $E.getTopLevelWindow();
		var b;
		if (!a.$("_DivContextMenu")) {
			b = a.document.createElement("div");
			b.id = "_DivContextMenu";
			b.style.position = "absolute";
			b.style.zIndex = "999";
			b.style.left = 0;
			b.style.top = 0;
			b.style.backgroundColor = "#890";
			b.innerHTML = "<iframe id='_ContextMenu_Frame' frameborder='0' scrolling='no' width='100'></iframe>";
			a.document.body.appendChild(b);
			var d = a.$("_ContextMenu_Frame").contentWindow;
			var c = d.document;
			c.open();
			c.write(this.getHtml());
			c.close();
			d.TopWindow = a;
			d.init()
		} else {
			b = a.$("_DivContextMenu");
			b.show();
			var f = a.$("_ContextMenu_Frame");
			f.show();
			var d = a.$("_ContextMenu_Frame").contentWindow;
			var c = d.document;
			c.open();
			c.write(this.getHtml());
			c.close();
			d.TopWindow = a;
			d.init()
		}
		b.onclick = stopEvent;
		b.Instance = this;
		this.setPosition()
	}
}
Menu.adjustSize = function() {
	var b = $("_ContextMenu_Frame").contentWindow;
	var a = $E.getDimensions(b.$("_ContextMenu_Table"));
	b.frameElement.height = a.height;
	b.frameElement.width = a.width
};
Menu.close = function() {
	var a = $E.getTopLevelWindow().$("_DivContextMenu");
	if (a) {
		a.hide()
	}
};
Menu.getInstance = function() {
	var a = $E.getTopLevelWindow().$("_DivContextMenu");
	if (a) {
		return a.Instance
	}
};
Menu.onMouseOver = function(b) {
	var a = b.rows[0].cells;
	a[0].style.backgroundColor = "#466CA6";
	a[1].style.backgroundColor = "#7096FA";
	a[1].style.color = "#FFFFFF";
	a[2].style.backgroundColor = "#7096FA"
};
Menu.onMouseOut = function(b) {
	var a = b.rows[0].cells;
	a[0].style.backgroundColor = "#D6DFF7";
	a[1].style.backgroundColor = "#F7F8FD";
	a[1].style.color = "";
	a[2].style.backgroundColor = "#F7F8FD"
};
Page.onClick(Menu.close);
document.oncontextmenu = function(a) {
};
function Progress(b, d, a, c) {
	this.TaskID = b;
	this.Title = d;
	if (c) {
		this.Height = c
	} else {
		this.Height = 150
	}
	if (a) {
		this.Width = a
	} else {
		this.Width = 400
	}
}
Progress.prototype.show = function() {
	var b = $E.getTopLevelWindow();
	b.clearTimeout(b.Effect._opacityID);
	var f = new Dialog("DialogProgress" + this.TaskID);
	f.Width = this.Width;
	f.Height = this.Height;
	f.Title = this.Title;
	f.URL = "javascript:void(0);";
	var h = this.TaskID;
	f.OKEvent = function() {
		Progress.stop(h)
	};
	f.show();
	Effect.opacity(b.$("_DialogBGDiv"), 0, 40, 400);
	var d = b.$("_DialogFrame_" + f.ID).contentWindow;
	var c = d.document;
	c.open();
	c.write("<style>.progressBox{border:#ddd 1px solid}");
	c.write(".progressBg{ background:#ddd url(" + Server.ContextPath
			+ "images/progressBg.gif);}");
	c
			.write(".progressLight{font-size:5px; line-height:5px; color:#99bb00; background:#99bb00}");
	c
			.write(".progressShadow{font-size:5px; line-height:6px; color:#779911; background:#779911}");
	c.write("table,td{border-collapse: collapse; border-spacing: 0;}</style>");
	c.write("<body oncontextmenu='return false;'></body>");
	var a = [];
	a.push("<table width='100%' height='100%' border='0'><tr>");
	a.push("  <td align='center' valign='middle'>");
	a
			.push("	<div id='Info' style='text-align:left;width:100%;font-size:12px'>&nbsp;</div><br>");
	a
			.push("      <table width='100%' border='1' cellpadding='1' cellspacing='0' class='progressBox'>");
	a.push("      <tr><td class='progressBg'>");
	a
			.push("				<table width='1%' border='0' cellpadding='0' cellspacing='0' id='tableP'>");
	a.push("          <tr><td class='progressLight'>-</td></tr>");
	a.push("          <tr><td class='progressShadow'>-</td></tr>");
	a.push("        </table></td></tr></table></td></tr></table>");
	var g = c.createElement("div");
	g.innerHTML = a.join("");
	c.body.appendChild(g);
	c.close();
	f.ParentWindow.$D = f;
	f.ParentWindow.$DW = d;
	f.OKButton.value = "取消当前任务";
	f.CancelButton.value = "关闭进度窗口";
	Progress.getInfo(this.TaskID)
};
Progress.getInfo = function(b) {
	var a = new DataCollection();
	a.add("TaskID", b);
	Server.sendRequest("com.sweii.framework.messages.LongTimeTaskPage.getInfo",
			a, function(c) {
				if (c.Status == 0) {
					Dialog.alert(c.Message)
				} else {
					if (Dialog.getInstance("DialogProgress" + b) == null) {
						return
					}
					var f = c.get("CurrentInfo");
					if (f != null) {
						$DW.document.getElementById("Info").innerHTML = f
					}
					if (c.get("CompleteFlag") == "1") {
						$DW.document.getElementById("tableP").width = "100%";
						Dialog.getInstance("DialogProgress" + b).OKButton
								.hide()
					} else {
						var d = c.get("Percent");
						if (d == "0") {
							d = "1"
						}
						$DW.document.getElementById("tableP").width = d + "%";
						window.setTimeout(Progress.getInfo, 1000, b)
					}
				}
			})
};
Progress.stop = function(b) {
	var a = new DataCollection();
	a.add("TaskID", b);
	Server.sendRequest("com.sweii.framework.messages.LongTimeTaskPage.stop", a,
			function(c) {
				function d() {
					Server
							.sendRequest(
									"com.sweii.framework.messages.LongTimeTaskPage.stop",
									a, function(f) {
										if (f.Status == 1) {
											Dialog.alert("任务己取消");
											Dialog.getInstance("DialogProgress"
													+ b).close()
										} else {
											window.setTimeout(d, 1000, b)
										}
									})
				}
				Dialog.getInstance("DialogProgress" + b).CancelButton.value = "正在取消任务...";
				Dialog.getInstance("DialogProgress" + b).CancelButton.disable();
				d()
			})
};
var Selector = {};
Selector.show = function(c) {
	var b = $E.getTopLevelWindow();
	c = $E.getParent("div", c);
	var a = c.$A("listurl");
	b.SourceWindow = window;
	if (c.id != b.Selector.showingID || !b.Selector.showingID) {
		var h = b.$("_SelectorDiv_");
		if (!h) {
			h = b.document.createElement("div");
			h.id = "_SelectorDiv_";
			h.style.position = "absolute";
			h.style.left = 0;
			h.style.top = 0;
			h.style.width = 0;
			h.style.height = 0;
			var edit=c.getAttribute("edit");
			if(edit=="true"){
			    h.edit="true";
			    h.fieldId=c.getAttribute("fieldId");
			}
			b.$T("body")[0].appendChild(h);
			h = $(h)
		}else{
		    var edit=c.getAttribute("edit");
			if(edit=="true"){
			    h.edit="true";
			    h.fieldId=c.getAttribute("fieldId");
			}
		}
		$(h).show();
		if (a != null && a.length > 0) {
			if (!b.$("_SelectorFrame" + c.id)
					|| b.$("_SelectorFrame" + c.id).SourcePathName != window.location.pathname) {
				if (a.indexOf(":") == -1) {
					a = Server.ContextPath + a
				}
				h.innerHTML = "<iframe id='_SelectorFrame" + c.id
						+ "' frameborder='0' width='100%' src='" + a
						+ "'></iframe>";
				var g = b.$("_SelectorFrame" + c.id).contentWindow;
				b.$("_SelectorFrame" + c.id).SourcePathName = window.location.pathname;
				g._OnLoad = function() {
					Selector.removeFrameMouseDownEvent(g);
					g.SelectedText = c.textField.value;
					g.SelectedValue = c.value;
					g.SelectorID = c.id;
					Selector.setListURLStyle(c.id)
				}
			} else {
				Selector.setListURLStyle(c.id);
				var g = b.$("_SelectorFrame" + c.id).contentWindow;
				g.SelectedText = c.textField.value;
				g.SelectedValue = c.value
			}
		} else {
			if (!b.$("_SelectorFrame")) {
				h.innerHTML = "<iframe id='_SelectorFrame' frameborder='0' width='100%' src='about:blank'></iframe>";
				var f = b.$("_SelectorFrame").contentWindow;
				var d = f.document;
				d.open();
				d
						.write("<style type='text/css'>* { box-sizing: border-box; -moz-box-sizing: border-box; -khtml-box-sizing: border-box; -webkit-box-sizing: border-box; }");
				d
						.write("html,body {scrollbar-arrow-color: #68a;scrollbar-3dlight-color: #acd;scrollbar-shadow-color: #9bc;scrollbar-face-color: #def;scrollbar-darkshadow-color: #def;scrollbar-highlight-color: #fff;scrollbar-track-color: #eee;}");
				d
						.write("body{margin: 0;padding: 0;color: #444;min-height:100%;height: auto;_height:100%;_overflow:auto;text-align: justify;text-justify: inter-ideograph;font: 12px/1.4 Tahoma, SimSun, Verdana, sans-serif;background: #ffffff;}");
				d
						.write("body,a,div,img{ margin: 0; padding: 0;box-sizing: border-box; -moz-box-sizing: border-box; -khtml-box-sizing: border-box; -webkit-box-sizing: border-box;}");
				d
						.write("div,p,span{font: 12px/1.4 Tahoma, SimSun, Verdana, sans-serif;word-break: break-all;};");
				d
						.write(".optgroup {position:absolute;z-index:666;left:0;top:0;color: #369;}");
				d
						.write(".optgroup div{padding:2px;overflow: auto;overflow-x: hidden;max-height:300px;color: #369;border: 1px solid #678;background: #f7fafc url("
								+ Server.ContextPath
								+ "Platform/Images/textarea_bg.gif) repeat 0 2px;width:auto;z-index:888;}");
				d
						.write(".optgroup a{cursor:default;display:block;color: #369;white-space: nowrap;padding:1px 3px 2px 6px;_padding:0 3px 0 6px;height:18px;min-width:2em;text-decoration:none;}");
				d
						.write(".optgroup a:hover,.optgroup a.ahover{color: #cff;text-decoration:none;background:#49e url("
								+ Server.ContextPath
								+ "images/optionbg_over.gif) repeat-x center;}");
				d.write(".optgroup a.ahover{background-image:none;}</style>");
				d
						.write("<body onselectstart='return false;' style='margin: 0px;-moz-user-select:none;' oncontextmenu='return false;'></body>");
				d.close();
				Selector.setListStyle(c.id)
			} else {
				Selector.setListStyle(c.id)
			}
		}
	}
	Misc.lockScroll(window)
};
Selector.setListURLStyle = function(b) {
	var m = $E.getTopLevelWindow();
	m.Selector.showingID = b;
	var a = m.$("_SelectorDiv_");
	var g = $E.getDimensions(b);
	var j = $E.getPositionEx(b);
	a.style.cssText = "position:absolute;display:inline-block;z-index:100000;width:"
			+ g.width + "px;left:" + j.x + "px;top:" + (j.y + g.height) + "px;";
	a = Selector.getSourceDiv(b);
	var c = m.$("_SelectorFrame" + b);
	var k = c.contentWindow.document;
	var l = Math.max(k.documentElement.scrollWidth, k.body.scrollWidth);
	var f = Math.max(k.documentElement.scrollHeight, k.body.scrollHeight);
	var d = a.$A("listwidth") ? parseInt(a.$A("listwidth")) : 0;
	var n = a.$A("listheight") ? parseInt(a.$A("listheight")) : 0;
	if (d > 0) {
		l = d
	}
	c.width = l;
	if (n > 0 && n < f) {
		f = n
	}
	c.height = f;
	j = $E.computePosition(j.x, j.y, j.x, j.y + g.height, "right", l, f, m);
	if (a._ScrollTop) {
		k.body.scrollTop = a._ScrollTop
	}
	a = m.$("_SelectorDiv_");
	a.style.left = j.x + "px";
	a.style.top = j.y + "px";
	c.style.border = "1px solid #678"
};
Selector.setListStyle = function(b) {
	var n = $E.getTopLevelWindow();
	n.Selector.showingID = b;
	var g = $(b + "_list").outerHTML;
	var a = n.$("_SelectorDiv_");
	var f = $E.getDimensions(b);
	var l = $E.getPositionEx(b);
	a.style.cssText = "position:absolute; display:inline-block;z-index:100000;width:"
			+ f.width + "px;left:-1000px;top:-1000px";
	var c = n.$("_SelectorFrame");
	var m = c.contentWindow.document;
	c.contentWindow.TopWindow = n;
	g = g.replace(/Selector\./g, "TopWindow.Selector.");
	if (m.body.childNodes.length == 0) {
		var k = m.createElement("div");
		k.innerHTML = g;
		m.body.appendChild(k)
	} else {
		m.body.childNodes[0].innerHTML = g
	}
	var j = m.getElementById(b + "_list");
	j.style.display = "inline";
	j = m.getElementById(b + "_ul");
	var h = $E.getDimensions(j);
	a = Selector.getSourceDiv(b);
	var d = a.$A("listwidth") ? parseInt(a.$A("listwidth")) : 0;
	var o = a.$A("listheight") ? parseInt(a.$A("listheight")) : 0;
	if (!d || (d > f.width)) {
		d = f.width
	}
	c.width = d;
	j.style.width = d + "px";
	if (!o || o > h.height) {
		o = h.height
	}
	j.style.height = o + "px";
	c.height = o;
	if (a.options.length > 0) {
		j.childNodes[a.selectedIndex].className = "ahover";
		if (a._ScrollTop) {
			j.scrollTop = a._ScrollTop
		}
	}
	l = $E.computePosition(l.x, l.y, l.x, l.y + f.height, "right", d, o, n);
	a = n.$("_SelectorDiv_");
	a.style.left = l.x + 1 + "px";
	a.style.top = l.y + "px"
};
Selector.removeFrameMouseDownEvent = function(c) {
	var a = c.Page.mouseDownFunctions;
	if (a) {
		for (var b = 0; b < a.length; b++) {
			if (a[b] == c.Selector.close) {
				a.remove(a[b])
			}
		}
	}
};
Selector.onArrowMouseOver = function(a) {
	var b = a.parentElement;
	if (b.options.length > 0) {
		b.options[b.selectedIndex].className = ""
	}
	a.style.backgroundImage = "url(" + Server.ContextPath
			+ "images/arow_over.gif)";
	b.style.backgroundImage = "url(" + Server.ContextPath
			+ "images/zSelectBg_left_over.gif)"
};
Selector.onArrowMouseOut = function(a) {
	var b = a.parentElement;
	a.style.backgroundImage = "url(" + Server.ContextPath
			+ "images/arow.gif)";
	b.style.backgroundImage = "url(" + Server.ContextPath
			+ "images/zSelectBg_left.gif)"
};
Selector.getSourceDiv = function(c) {
	var b = null;
	var a = $E.getTopLevelWindow();
	if (a.SourceWindow && a.SourceWindow.$) {
		b = a.SourceWindow.$(c)
	}
	if (!b) {
		b = $(c);
		if (!b || !b.InitFlag) {
		// alert("发生致命错误，显示列表时未找到" + c + "对应的Selector元素!")
		}
	}
	return b
};
Selector.setSelectedIndex = function(f, b) {
	var a = f.value;
	var d = $(f.Items[b]);
	f.ItemClickFlag = true;
	if (isIE) {
		f.value = d.$A("value")
	} else {
		f._value = d.$A("value")
	}
	f.textField.value = d.innerText;
	f.ItemClickFlag = false;
	if (a != d.$A("value")) {
		try {
			Selector.invokeOnChange(f)
		} catch (c) {
			// alert("Selector.invokeOnChange():" + c.message)
		}
	}
};
Selector.onItemClick = function(k, h) {
	var c = k.parentNode.id;
	c = c.substring(0, c.lastIndexOf("_"));
	var j = $E.getTopLevelWindow();
	var b = j.$("_SelectorDiv_");
	b = Selector.getSourceDiv(c);
	var a = b.value;
	b.textField.value = k.innerHTML;
	b.ItemClickFlag = true;
	if (isIE) {
		b.value = k.getAttribute("value")
	} else {
		b._value = k.getAttribute("value")
	}
	var g = b.childNodes[2].childNodes[0].childNodes;
	for (var d = 0; d < g.length; d++) {
		g[d].className = "";
		if ($(g[d]).$A("value") === k.getAttribute("value")) {
			b._selectedIndex = d;
			if (isIE) {
				b.selectedIndex = d
			}
		}
	}
	b.ItemClickFlag = false;
	if (j.$("_SelectorFrame")) {
		b._ScrollTop = k.parentNode.scrollTop
	}
	 var edit=j.$("_SelectorDiv_").getAttribute("edit");
	 if(edit=="true"){
	      Selector.invokeOnChange(b);
	 }else{
		if (a != k.getAttribute("value")) {
			try {
				Selector.invokeOnChange(b)
			} catch (f) {
				// alert("Selector.invokeOnChange():" + f.message)
			}
		}
	}
	Selector.close();
};
Selector.close = function() {
	var b = $E.getTopLevelWindow();
	if (b.Selector && b.Selector.showingID) {
		$E.hide(b.$("_SelectorDiv_"));
		if (b.SourceWindow) {
			var c = b.SourceWindow.$(b.Selector.showingID).textField;
			try {
				c.onblur.apply(c, [])
			} catch (a) {
			}
			Misc.unlockScroll(b.SourceWindow)
		}
		b.SourceWindow = null;
		b.Selector.showingID = false
		var edit=b.$("_SelectorDiv_").getAttribute("edit");
		if(edit=="true"){
		    var id= b.$("_SelectorDiv_").getAttribute("fieldId");
		    if($(id)!=null){
              var d=$(id).parentNode; 
              var value=$V(id+'_textField');
              d.innerHTML="<div class='x-grid3-cell-inner'>"+value+"</div>";
            }
		}
		
	}
};
Selector.onItemMouseOver = function(a) {
	var c = a.parentNode.id;
	c = c.substring(0, c.lastIndexOf("_"));
	var b = Selector.getSourceDiv(c);
	if(b!=null){
		a.parentNode.childNodes[b.selectedIndex].className = "";
		a.className = "liOver"
	}
};
Selector.setInput = function(b, a) {
	if (!a || a == "false") {
		if (isIE) {
			b.textField.onselectstart = stopEvent;
			b.textField.onmousedown = stopEvent
		} else {
			b.textField.style.MozUserSelect = "none";
			b.textField.onmousedown = function(c) {
				c = getEvent(c);
				var d = $E.getTopLevelWindow();
				var f = c.srcElement.parentElement;
				if (f.id == d.Selector.showingID && d.SourceWindow == window) {
					return stopEvent(c)
				}
			}
		}
		b.textField.oncontextmenu = stopEvent
	} else {
		if (isIE) {
			b.textField.onselectstart = null;
			b.textField.onmousedown = null
		} else {
			b.textField.style.MozUserSelect = ""
		}
	}
	b.textField.onkeydown = Selector.onKeyDown
};
Selector.onDoubleClick = function(a) {
	a = getEvent(a);
	Selector.show(a.srcElement)
};
Selector.onKeyDown = function(b) {
	b = getEvent(b);
	var a = b.srcElement;
	var c = a.parentElement;
	if (b.keyCode == 37 || b.keyCode == 38) {
		if (c.selectedIndex > 0) {
			c.selectedIndex = c.selectedIndex - 1
		}
	} else {
		if (b.keyCode == 39 || b.keyCode == 40) {
			if (c.selectedIndex < c.length - 1) {
				c.selectedIndex = c.selectedIndex + 1
			}
		}
	}
	if (b.keyCode != 9) {
		stopEvent(b)
	}
};
Selector.invokeOnChange = function(_ele) {
	if (!_ele.InitFlag) {
		var _cv = _ele.getAttribute("onChange");
		if (_cv) {
			var pw = $E.getTopLevelWindow();
			if (pw.SourceWindow) {
				pw.SourceWindow.eval(_cv)
			} else {
				eval(_cv)
			}
		}
	}
};
Selector.setValueEx = function(c, a, b) {
	c = $(c);
	c.value = a;
	c.textField.value = b
};
Selector.setValue = function(d, b) {
	if (d.$A("listURL")) {
		d.textField.value = b;
		d._value = b
	} else {
		var a = false;
		for (var c = 0; c < d.Items.length; c++) {
			if ($(d.Items[c]).$A("value") == b) {
				d.textField.value = d.Items[c].innerText;
				d._value = b;
				if (isGecko) {
					d._selectedIndex = c
				} else {
					d.ItemClickFlag = true;
					d.selectedIndex = c;
					d.ItemClickFlag = false
				}
				a = true;
				break
			}
		}
		if (!a && d.input) {
			d.textField.value = b;
			d._value = b
		}
	}
	Selector.invokeOnChange(d);
};
Selector.setDisabled = function(b, a) {
	if (a || a == "true") {
		b.textField.disabled = true;
		b.style.backgroundImage = "url(" + Server.ContextPath
				+ "images/zSelectBg_left_disab.gif)";
		b.arrow.style.backgroundImage = "url(" + Server.ContextPath
				+ "images/arow_disab.gif)";
		b.arrow.onmouseover = stopEvent;
		b.arrow.onmouseout = stopEvent;
		b.arrow.onclick = stopEvent;
		b.arrow.onmousedown = stopEvent;
		b.textField.style.color = "#aaa";
		b.textField.ondblclick = stopEvent;
		b.textField.onkeydown = stopEvent
	} else {
		b.textField.disabled = false;
		b.style.backgroundImage = "url(" + Server.ContextPath
				+ "images/zSelectBg_left.gif)";
		b.arrow.style.backgroundImage = "url(" + Server.ContextPath
				+ "images/arow.gif)";
		b.textField.ondblclick = Selector.onDoubleClick;
		b.arrow.onmouseover = function() {
			Selector.onArrowMouseOver(this)
		};
		b.arrow.onmouseout = function() {
			Selector.onArrowMouseOut(this)
		};
		b.arrow.onmousedown = function(c) {
			var d = $E.getTopLevelWindow();
			var f = $E.getParent("div", this);
			if (d.Selector && d.Selector.showingID == f.id) {
				return
			}
			Selector.show(this);
			this.parentElement.textField.onfocus.apply(
					this.parentElement.textField, arguments);
			stopEvent(c)
		};
		b.textField.style.color = "";
		b.textField.onkeydown = Selector.onKeyDown
	}
};
Selector.initHtml = function(s) {
	var l = [];
	var d = s.id;
	var c = s.$A("name");
	if (!c) {
		c = d
	} else {
		s.removeAttribute("name")
	}
	var q = s.$A("value");
	var o = s.$A("verify");
	var f = s.$A("condition");
	var j = "";
	if (o) {
		j = 'verify="' + o + '"';
		if (f) {
			j += ' condition="' + f + '"'
		}
	}
	var h = s.$A("zclass");
	if (h) {
		h = 'class="' + h + '"'
	} else {
		h = ""
	}
	var b = "";
	if (s.$A("styleOriginal") && s.$A("styleOriginal") != "NULL") {
		b = s.$A("styleOriginal")
	} else {
		var n = s.style.cssText;
		var a = /(.*width: *)([0-9]+)(px *;*.*)/gi;
		if (a.test(n)) {
			n = n.replace(a, function(t, w, v, u) {
						return v
					});
			b = "width:" + n + "px;"
		}
	}
	s.style.cssText = "display:inline-block; *zoom: 1;*display: inline;vertical-align:middle;position:relative;height:20px;white-space: nowrap;padding:0 0 0 5px;margin-right:3px;background:url("
			+ Server.ContextPath
			+ "images/zSelectBg_left.gif) no-repeat 0 0;";
	l
			.push("<input type='text' id='"
					+ d
					+ "_textField' ztype='select' "
					+ j
					+ " "
					+ h
					+ " name='"
					+ c
					+ "' autocomplete='off' style='height:18px; line-height:18px; _line-height:12px; padding:0;padding-top:2px;vertical-align:middle;border:0 none; background:transparent none; cursor:default;"
					+ (isIE8 ? "line-height:18px;" : "") + b + "' value=''/>");
	l
			.push("<img class='arrowimg' src='"
					+ Server.ContextPath
					+ "images/blank.gif' width='18' height='20' id='"
					+ d
					+ "_arrow' style='position:relative; left:-17px; _top:-2px;margin-right:-18px; cursor:pointer; width:18px; height:20px;vertical-align:middle; background:url("
					+ Server.ContextPath
					+ "images/arow.gif) no-repeat 0 0;"
					+ (isIE8 ? "top:0;" : "") + "'/>");
	l.push("<div id='" + d
			+ "_list' class='optgroup' style='text-align:left;display:none;'>");
	l.push("<div id='" + d + "_ul' style='left:-1px; width:-1px;'>");
	var m = s.$T("span");
	var g = 0;
	var r = true;
	for (var k = 0; k < m.length; k++) {
		$(m[k]);
		if (r && m[k].$A("value") == q) {
			g = k;
			r = false
		}
		if (r && m[k].$A("selected")) {
			g = k
		}
		l
				.push('<a href="javascript:void(0);" onclick="Selector.onItemClick(this);" onmouseover=\'Selector.onItemMouseOver(this)\' hidefocus value="'
						+ m[k].$A("value") + '">' + m[k].innerHTML + "</a>")
	}
	l.push("</div>");
	l.push("</div>");
	s.innerHTML = l.join("");
	s.InitFlag = true;
	if (isGecko) {
		s._selectedIndex = g
	} else {
		s.selectedIndex = g
	}
};
Selector.initMethod = function(b) {
	b.textField = b.childNodes[0];
	b.name = b.textField.name;
	b.type = "select-one";
	b.arrow = b.childNodes[1];
	b.Items = $(b.id + "_ul").childNodes;
	if (isIE) {
		b.value = b.Items.length > 0
				? $(b.Items[b.selectedIndex]).$A("value")
				: null
	} else {
		b._value = b.Items.length > 0 ? $(b.Items[b._selectedIndex]).$A("value") : null
	}
	b.form = b.getParent("form");
	b.options = b.Items;
	b.length = b.options.length;
	b.textField.onfocus = function() {
		Selector.show(this)
	};
	b.clear = function() {
		this.value = "";
		this.childNodes[2].childNodes[0].innerHTML = "";
		this.Items = this.childNodes[2].childNodes[0].childNodes;
		this.value = "";
		this.textField.value = ""
	};
	b.add = function(g, f, c) {
		var d = '<a href="javascript:void(0);" onclick="Selector.onItemClick(this);" hidefocus value="'
				+ f + '">' + (g == "" ? "&nbsp;" : g) + "</a>";
		if (!this.Items || this.Items.length == 0) {
			this.childNodes[2].childNodes[0].innerHTML = d;
			this.Items = this.childNodes[2].childNodes[0].childNodes;
			return
		}
		var h = this.Items.length - 1;
		if (c != null) {
			c = parseInt(c);
			if (c > h) {
				c = h
			}
		} else {
			c = h
		}
		this.Items[c].insertAdjacentHTML("afterEnd", d);
		this.Items = this.childNodes[2].childNodes[0].childNodes;
		if (this.Items.length > 10) {
			this.childNodes[2].childNodes[0].style.height = "15em"
		}
	};
	var a = b.$A("disabled");
	b.disabled = false;
	if (isIE) {
		Selector.initMethodIE(b)
	} else {
		Selector.initMethodGecko(b)
	}
	b.selectedIndex = b.selectedIndex;
	b.input = b.$A("input") || b.$A("input") == "true" ? true : false;
	b.disabled = a;
	Selector.setDisabled(b, b.disabled);
	Selector.setInput(b, b.input);
	b.InitFlag = false
};
Selector.initMethodIE = function(a) {
	a.onpropertychange = function() {
		var c = event.srcElement;
		var b = c[event.propertyName];
		switch (event.propertyName.toLowerCase()) {
			case "disabled" :
				Selector.setDisabled(c, b);
				break;
			case "selectedindex" :
				if (!c.ItemClickFlag) {
					if (c.Items.length > 0) {
						Selector.setSelectedIndex(c, c.selectedIndex)
					}
				}
				break;
			case "input" :
				Selector.setInput(c, c.input);
				break;
			case "size" :
				break;
			case "value" :
				if (!c.ItemClickFlag) {
					Selector.setValue(c, b)
				}
				break
		}
	}
};
Selector.initMethodGecko = function(a) {
	a.__defineGetter__("disabled", function(b) {
				return this.textField.disabled
			});
	a.__defineSetter__("disabled", function(b) {
				Selector.setDisabled(this, b)
			});
	a.__defineGetter__("selectedIndex", function() {
				return this._selectedIndex
			});
	a.__defineSetter__("selectedIndex", function(b) {
				b = parseInt(b);
				if (b >= 0 && b < this.Items.length) {
					this._selectedIndex = b
				} else {
					return
				}
				Selector.setSelectedIndex(this, this._selectedIndex)
			});
	a.__defineGetter__("input", function() {
				return this._input
			});
	a.__defineSetter__("input", function(b) {
				this._input = b && b.toLowerCase() == "true";
				Selector.setInput(this, this._input)
			});
	a.__defineGetter__("size", function() {
				return this._size
			});
	a.__defineSetter__("size", function(b) {
				this._Size = b
			});
	a.__defineGetter__("value", function() {
				return this._value
			});
	a.__defineSetter__("value", function(b) {
				Selector.setValue(this, b)
			})
};
Selector.initCtrl = function(a) {
	a = $(a);
	Selector.initHtml(a);
	Selector.initMethod(a)
};
Selector.setReturn = function(d, a) {
	var h = window.SelectorID;
	var f = $E.getTopLevelWindow();
	var g = Selector.getSourceDiv(h);
	var b = g.value;
	g.textField.value = d;
	if (isIE) {
		g.ItemClickFlag = true;
		g.value = a;
		g.ItemClickFlag = false
	} else {
		g._value = a
	}
	g._ScrollTop = Math.max(document.documentElement.scrollTop,
			document.body.scrollTop);
	if (b != a) {
		try {
			Selector.invokeOnChange(g)
		} catch (c) {
			// alert("Selector.invokeOnChange():" + c.message)
		}
	}
	if (f.Selector.showingID) {
		$E.hide(f.$("_SelectorDiv_"));
		f.Selector.showingID = 0
	}
};
Selector.CtrlArray = [];
Selector.initHtmlAll = function() {
	var b = $T("div");
	var a = b.length;
	for (var c = a; c > 0; c--) {
		var f = $(b[c - 1]);
		var d = f.$A("ztype");
		if (d && d.toLowerCase() == "select") {
			var g = f.id;
			Selector.initHtml(f);
			Selector.CtrlArray.push(g)
		}
	}
	b = $T("input");
	a = b.length;
	for (var c = a; c > 0; c--) {
		var f = $(b[c - 1]);
		var d = f.$A("tip");
		var id = f.$A("id");
		if(d){
		    f.value=d;
		    
		    f.attachEvent("onfocus",function(){onFocus(event.srcElement);});
		    f.attachEvent("onblur",function(){onBlur(event.srcElement);});
		}
	}
};
Selector.initMethodAll = function() {
	var a = Selector.CtrlArray.length;
	for (var b = 0; b < a; b++) {
		var c = $(Selector.CtrlArray[b]);
		Selector.initMethod(c);
		if (c.Items.length > 10) {
			$(c.id + "_ul").style.height = "15em"
		}
	}
};
Page.onLoad(Selector.initHtmlAll, 0);
Page.onLoad(Selector.initMethodAll, 1);
Page.onMouseDown(Selector.close);
var Tab = {};
Tab.onTabMouseOver = function(a) {
	if (a.className == "divtab") {
		a.className = "divtabHover"
	}
};
Tab.onTabMouseOut = function(a) {
	if (a.className == "divtabHover") {
		a.className = "divtab"
	}
};
Tab.onTabClick = function(f) {
	var b = $T("div", f.parentElement);
	var a = b.length;
	for (var d = 0; d < a; d++) {
		var h = b[d];
		var g = h.className;
		if (g == "divtabCurrent") {
			h.className = "divtab";
			h.style.zIndex = "" + (a - d) + ""
		}
	}
	f.className = "divtabCurrent";
	f.style.zIndex = "33"
};
Tab.initTab = function(d) {
	var a = $T("div", d.parentElement);
	var b = a.length;
	for (var c = 0; c < b; c++) {
		var f = a[c].className;
		if (f == "divtab" || f == "divtabDisabled") {
			a[c].style.zIndex = "" + (b - c) + ""
		} else {
			if (f == "divtabCurrent") {
				a[c].style.zIndex = "33"
			}
		}
	}
};
Tab.parentpadding = function(a) {
	if (a.parentElement.style.paddingLeft != "30px") {
		a.parentElement.style.paddingLeft = "30px"
	}
};
Tab.setDivtabWidth = function(f) {
	f = $(f);
	var a = 50;
	var j = 6;
	if (Application.isHMenu == true) {
		var h = 0;
		var d = f.$T("div");
		var g = d.length;
		var b = document.compatMode == "BackCompat"
				? document.body.clientWidth
				: document.documentElement.clientWidth;
		for (var c = 0; c < g; c++) {
			h += d[c].clientWidth
		}
		if (h + 50 > b) {
			if (b - 120 - g * a > 0) {
				j = Math.ceil((b - 120 - g * a) / g)
			}
			for (var c = 0; c < g; c++) {
				$T("span", d[c])[0].style.cssText = "width:" + j + "px;"
			}
		} else {
			for (var c = 0; c < g; c++) {
				$T("span", d[c])[0].style.cssText = ""
			}
		}
	}
};
Tab.onChildTabMouseOver = function(a) {
	if (a.className == "divchildtab") {
		a.className = "divchildtabHover"
	}
};
Tab.onChildTabMouseOut = function(a) {
	if (a.className == "divchildtabHover") {
		a.className = "divchildtab"
	}
};
Tab.onChildTabClick = function(h) {
	h = $(h);
	var a = $T("div", h.parentElement);
	var g;
	for (var c = 0; c < a.length; c++) {
		var b = $(a[c]);
		var j = b.className;
		var d = $("_ChildTabFrame_" + b.$A("id"));
		if (j == "divchildtabCurrent") {
			b.className = "divchildtab";
			g = d.getDimensions().height
		}
		d.style.height = 0
	}
	h.className = "divchildtabCurrent";
	var d = $("_ChildTabFrame_" + h.$A("id"));
	d.style.width = "100%";
	d.style.height = g + "px"
};
Tab.initFrameHeight = function(l) {
	var g = $(l);
	var a = document.body;
	var c = document.compatMode == "BackCompat"
			? document.body.clientHeight
			: document.documentElement.clientHeight;
	var k = g.getPosition();
	g.scrolling = "auto";
	g.height = c - g.getPosition().y;
	var h = g.offsetParent;
	while (h.offsetParent != document.body) {
		h = h.offsetParent
	}
	h = $(h);
	var j = h.getDimensions().height + h.getPosition().y
			- g.getDimensions().height - g.getPosition().y;
	g.height = g.height - j - (isIE ? 1 : 0)
};
Tab.getChildTab = function(a) {
	return $("_ChildTabFrame_" + a)
};
Tab.getCurrentTab = function() {
	var a = $T("div");
	var b = a.length;
	for (var c = 0; c < b; c++) {
		var d = a[c].className;
		if (d == "divchildtabCurrent") {
			return $("_ChildTabFrame_" + a[c].id)
		}
	}
};
Tab.disableTab = function(a) {
	a = $(a);
	a.className = "divchildtabDisabled";
	a.onclick2 = a.onclick;
	a.onclick = null
};
Tab.enableTab = function(a) {
	a = $(a);
	a.className = "divchildtab";
	if (a.onclick2) {
		a.onclick = a.onclick2;
		a.onclick2 = null
	}
};
Page.onLoad(function() {
			var a = $T("div");
			var b = a.length;
			for (var c = 0; c < b; c++) {
				var d = a[c].className;
				if (d == "divtab" || d == "divtabDisabled") {
					a[c].style.zIndex = "" + (b - c) + ""
				} else {
					if (d == "divtabCurrent") {
						a[c].style.zIndex = "33"
					}
				}
			}
		});
var _TipIDCounter = 0;
function Tip(a, b) {
	this.Element = $(a);
	this.Message = b;
	this.AutoClose = false;
	this.Clock = 9;
	this.initHtml()
}
Tip.AutoCloseTips = [];
Tip.prototype.initHtml = function() {
	var a = [];
	a
			.push("  <table border='0' cellspacing='0' cellpadding='0' class='tooltiptable'>");
	a
			.push("  	<tr><td class='corner topleft'> </td><td class='topcenter'> </td>");
	a
			.push("  			<td class='corner topright'> </td></tr><tr><td class='bodyleft'> </td>");
	a.push("				<td class='tooltipcontent'>" + this.Message + "</td>");
	a.push("				<td class='bodyright'> </td></tr>");
	a
			.push("		<tr><td class='corner footerleft'> </td><td class='footercenter'> </td>");
	a.push("				<td class='corner footerright'> </td></tr></table>");
	a.push("		<div class='tooltipfang'></div>");
	this.Html = a.join("")
};
Tip.prototype.show = function() {
	var k = document.createElement("div");
	k.id = "" + _TipIDCounter++;
	k.style.position = "absolute";
	k.style.left = "0px";
	k.style.top = "0px";
	k.className = "tooltip callout" + this.Clock;
	$T("body")[0].appendChild(k);
	k = $(k);
	k.innerHTML = this.Html;
	var j = this.Element.getPosition();
	var f = this.Element.getDimensions();
	if (this.Element.$A("ztype")
			&& this.Element.$A("ztype").toLowerCase() == "date") {
		var b = $(this.Element.nextSibling).getDimensions();
		f.width += b.width
	}
	var d = k.getDimensions();
	var h = this.Clock;
	var a, g;
	if (h == 2 || h == 3 || h == 4) {
		a = j.x - f.width
	}
	if (h == 8 || h == 9 || h == 10) {
		a = j.x + f.width
	}
	if (h == 11 || h == 12 || h == 1) {
		g = j.y + f.height
	}
	if (h == 5 || h == 6 || h == 7) {
		g = j.y - f.height
	}
	if (h == 9 || h == 3) {
		g = j.y + f.height / 2 - d.height / 2
	}
	k.style.left = a + "px";
	k.style.top = g + "px";
	k.style.zIndex = 850;
	$(k).show();
	this.Div = k;
	if (this.AutoClose) {
		Tip.AutoCloseTips.push(this)
	}
};
Tip.prototype.close = function() {
	if (this.Div) {
		this.Div.outerHTML = "";
		this.Div = null
	}
};
Tip.show = function(d, f, a, b) {
	d = $(d);
	var c = new Tip(d, f);
	c.AutoClose = a;
	if (b) {
		c.Clock = b
	}
	c.show();
	if (!c.AutoClose) {
		if (!d._Tips) {
			d._Tips = []
		}
		d._Tips.push(c)
	}
	return c
};
Tip.getTipCount = function(a) {
	a = $(a);
	if (!a._Tips) {
		return 0
	}
	return a._Tips.length
};
Tip.close = function(b) {
	b = $(b);
	if (b._Tips) {
		for (var a = 0; a < b._Tips.length; a++) {
			if (b._Tips[a]) {
				b._Tips[a].close()
			}
		}
		b._Tips = []
	}
};
Page.onMouseDown(function() {
			var a = Tip.AutoCloseTips;
			for (var b = a.length; b > 0; b--) {
				a[b - 1].close();
				a.splice(b - 1, 1)
			}
		});
		
var Tree = {};
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
		var a = f.$T("img");
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
	return $(a).$A("level") === "0"
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
	f = $(f).getParent("p");
	var c = f.getAttribute("lazy");
	if (c == "1") {
		Tree.lazyLoad(f, function() {
					f.setAttribute("lazy", "0")
				})
	} else {
		if (f.nextSibling && Tree.hasChild(f)) {
			$E.toggle(f.nextSibling)
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
	b.src = Server.ContextPath + g;
	stopEvent(a)
};
Tree.init = function(a) {
	a = $(a);
	Tree.setParam(a, Constant.ID, a.id);
	Tree.setParam(a, Constant.Method, a.getAttribute("method"));
	Tree.setParam(a, Constant.TagBody, a.TagBody)
};
Tree.getParam = function(b, a) {
	b = $(b);
	return b.Params.get(a)
};
Tree.setParam = function(c, a, b) {
	c = $(c);
	if (!c.Params) {
		c.Params = new DataCollection()
	}
	c.Params.add(a, b)
};
Tree.loadData = function(b, a) {
	b = $(b);
	var c = b.id;
	Server.sendRequest("com.sweii.framework.controls.TreePage.doWork",
			b.Params, function(g) {
				var f = document.createElement("div");
				f.setAttribute("ztype", "_Tree");
				f.innerHTML = g.get("HTML");
				var d = $E.getParentByAttr(b, "ztype", "_Tree");
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
	c = $(c);
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
	c = $(c);
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
	a = $(a);
	a.innerHTML = "";
	Tree.CurrentItem = null
};
Tree.dragEnd = function(evt) {
	var afterDrag = $(this).$A("afterDrag");
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
function onFocus(obj){
   if(obj.value==obj.tip){
      obj.value="";
   }
}
function onBlur(obj){
   if(obj.value==""){
     obj.value=obj.tip;
   }
}
// 鼠标到行显示样式
function gridRowOver(row){
    var rowIndex=row.rowindex;
	if (typeof($('rowId'+rowIndex).DefaultClass) == "undefined") {
		$('rowId'+rowIndex).DefaultClass = $('rowId'+rowIndex).className;
	}
	if (row.Selected) {
		$('rowId'+rowIndex).className="item selectcolor";
	} else {
		$('rowId'+rowIndex).className =$('rowId'+rowIndex).DefaultClass;
	}
}
// 鼠标离开行显示样式
function gridRowOut(row){
   var rowIndex=row.rowindex;
	if (typeof($('rowId'+rowIndex).DefaultClass) == "undefined") {
		$('rowId'+rowIndex).DefaultClass = $('rowId'+rowIndex).className;
	}
	if (row.Selected) {
		$('rowId'+rowIndex).className="item selectcolor";
	} else {
		$('rowId'+rowIndex).className = $('rowId'+rowIndex).DefaultClass;
	}
}

function buttonOver(button){
    button.className=button.defaultClass+" x-btn-over";
}

function buttonOut(button){
    button.className=button.defaultClass;
}
function buttonDown(button){
    button.className=button.defaultClass+" x-btn-over x-btn-click";
}

function buttonUp(button){
    button.className=button.defaultClass+" x-btn-over";
}



// 编辑列表
/*
 * {id:'每行实体ID',field:'属性名',entity:'实体名',ztype:'类型',style:'样式',width:'宽度',format:'时间格式',select:[['',''],['下拉名称','下拉值']],value:'当前值'}
 */
function editDataGrid(obj,params){
    if(params.javaType==null||params.javaType.length==0){
            params.javaType="String";
    }
    
    if(params.type==""||params.type==null||params.type=="date"){// 默认text类型
        var input='<input id="'+params.field+'" type="text"';
        if(params.style!=null&&params.style.length>0){
             input+=' style="width:340px;'+params.style+';" ';
        }else{
             input+=' style="width:340px" ';
        }       
        if(params.value!=null&&params.value.length>0){
             params.value=params.value.replace('.00','');
             input+=' value="'+params.value+'" ';
        }
        if(params.type=="date"){
             input+=' ztype="'+params.type+'" ';
             input+=' onchange="afterEdit('+params.id+',\''+params.entity+'\',\''+params.field+'\',\''+params.value+'\'';
             input+=',\''+params.javaType+'\'';
             input+=',\'date\'';   
             if(params.format!=null&&params.format.length>0){
                  input+=',\''+params.format+'\'';
             }
             input+=')" ';
        }else{
             input+=' onblur="afterEdit('+params.id+',\''+params.entity+'\',\''+params.field+'\',\''+params.value+'\',\''+params.javaType+'\')" ';
        }
        if(params.format!=null&&params.format.length>0){
             input+=' format="'+params.format+'" ';
        }
        if(params.verify!=null&&params.verify.length>0){
            input+=' verify="'+params.verify+'" ';
        }
        input+='>';
        obj.innerHTML=input;
        if(params.type=="date"){
            DateTime.initCtrl(params.field);
        }else{
            Effect.initOneCtrl(params.field);            
        }
        $(params.field).focus();  
	    var r = $(params.field).createTextRange(); 
		r.moveStart('character', $(params.field).value.length); 
		r.collapse(false); 
		r.select();
    }else if(params.type=="select"){// 下拉列表
        
        if($(params.field)!=null){
              var d=$(params.field).parentNode;              
              var value=$V(params.field+'_textField');
              d.innerHTML="<div class='x-grid3-cell-inner'>"+value+"</div>";
              return;
        }
        var width="100px";
        if(params.width!=null){
            width=params.width;
        }
        if(params.style!=null&&params.style.indexOf('width:')>-1){
            var w=params.style.substring(params.style.indexOf('width:'));
            if(w.indexOf('px')>-1){
                width=w.substring(6,w.indexOf('px'))+"px";
                // alert(width);
            }
        }
        var html="";
		if(params.select!=null&&params.select.length>0){
	        while(params.select.indexOf('|')>-1){
	            params.select=params.select.replace('|','\'');
	        }
		}
	    try{
	         var values=eval('(' + params.select+")");
	         var flag=false;
	        
	         for(var i=0;i<values.length;i++){
	             if(values[i][0]==params.value){
	                flag=true;
	                break;
	             }
	         }
	        
	         html+="<div id='"+params.field+"' fieldId='"+params.field+"' edit='true' value='"+params.value+"' initValue='"+params.value+"' ztype='Select'  onChange='afterEdit("+params.id+",\""+params.entity+"\",\""+params.field+"\",\""+params.value+"\",\""+params.javaType+"\",\""+params.type+"\")'  style='z-index:66;display:inline-block; *zoom: 1;*display: inline;vertical-align:middle;position:relative;white-space: nowrap;width:"+width+"' styleOriginal='width:"+width+"'><input type='text'  value='"+params.value+"' class='inputText' id='"+params.field+"_textField' ztype='select'  autocomplete='off' name='"+params.field+"' style='vertical-align:middle;border:0 none #fff; background:transparent none;width:"+width+"'/><img src='/images/blank.gif' width='18' height='20' id='education_arrow' style='position:relative; left:-17px; margin-right:-18px; cursor:pointer; width:18px; height:20px;vertical-align:middle; background:url(/images/arow.gif) no-repeat 0 0;' /><div id='"+params.field+"_list' class='optgroup' style='text-Align:left;display:none;'><div id='"+params.field+"_ul' style='left:-1px; width:-1px;'>";
	         if(!flag){
	             html+="<span value='' >请选择</span>";
	         }
	         for(var i=0;i<values.length;i++){
	              html+="<span value='"+values[i][0]+"' >"+values[i][1]+"</span>";
	         }
	    }catch(e){
	       // alert('下位设值有错，请更改。');
	        return;
	    }
	    html+="</div></div></div>";
	   
		obj.innerHTML=html;
		Selector.initCtrl(params.field);
		Selector.show(params.field);		
    }
    
    
}
function afterEdit(id,entity,field,value,javaType,type,format){
    if(Verify.hasError()){
		return;
	}
	if($V(field)==value){
          DataGrid.loadData('dg1');// 重新刷新列表数据
          return;
    }
    
    var dc = new DataCollection();
	dc.add("id",id);
	dc.add("entity",entity);
	dc.add("field",field);
	dc.add("value",$V(field));
	dc.add("javaType",javaType);
	if(type!=null){ 
	    dc.add("type",type);
	}
	if(format!=null){
	   dc.add("format",format);
	}
	Selector.close();
	Server.sendRequest("common/fieldEditEntity.do",dc,function(response){
           if(response.status==1){
               DataGrid.loadData('dg1');// 重新刷新列表数据
           }else if(response.message!=null){
        	   Dialog.alert(response.message,function(){
        		   DataGrid.loadData('dg1');// 重新刷新列表数据
        	   })
           }
    },'json');
}

 showLoading = function(doc,message) {
	 c = $(doc.document.body);
	var bg = doc.$("dloadingBg");
	var msg = doc.$("dloadingMsg");
	 var warpper=doc.$("dwarpper");
	 if (!bg) {
        
		bg = doc.document.createElement("div");
		bg.id = "dloadingBg";
		bg.className="datagrid-mask";

		bg.style.display='block'
		 doc.document.body.appendChild(bg);
		msg = doc.document.createElement("div");
		msg.id = "dloadingMsg";
		msg.className="datagrid-mask-msg";
		 
		msg.style.display='block';
		var mg="正在提交,请稍候..."
        if(message){
        	mg=message
        } 
		msg.innerHTML = mg;
		
		 doc.document.body.appendChild(msg)
	}else{
	    if(message){
	       msg.innerHTML=message;
	    }
		bg.style.display='block';
		msg.style.display='block';
	}
	 
	var f = c.getPosition();
	var d = c.getDimensions();
	// alert("x:"+f.x+","+f.y+','+"wh:"+d.width+','+d.height+',')
	
	 bg.style.top = f.y + "px";
	bg.style.left = f.x + "px";
	bg.style.width = d.width + "px";
	bg.style.height = d.height + "px";
	 
	var msgWidth=170;
	var msgHeight=25;
    msg.style.width=msgWidth+"px";
	msg.style.top =(f.y+d.height/2-15)+"px";// f.y+((d.height)/2)+ "px";
	 
	var p=window.parent;
	 
// //alert(msg.style.top);
// if(window.name!=''&&window.name.indexOf("-frame")>0){
// alert("dd");
// var availWidth= window.screen.availWidth;
// availWidth=availWidth-150;//减去左测菜单长度
// msg.style.left = (availWidth/2 -msgWidth/2)+ "px"
// }else{
		  // msg.style.top=f.y+(d.height)/2-msgHeight/2+"px";
			msg.style.left =f.x+ ((d.width)/2 -msgWidth/2)+ "px"
	 // }
	 

};
closeLoading = function(pwin) {
	var lbg = pwin.$("dloadingBg");
	if (lbg) {
		$E.hide(lbg);
		pwin.$("dloadingMsg").hide()
	}
};
// +---------------------------------------------------
// | 字符串转成日期类型
// | 格式 MM/dd/YYYY MM-dd-YYYY YYYY/MM/dd YYYY-MM-dd
// +---------------------------------------------------
function stringToDate(DateStr)  
{   

  var converted = Date.parse(DateStr);  
  var myDate = new Date(converted);  
  if (isNaN(myDate))  
  {   
      // var delimCahar = DateStr.indexOf('/')!=-1?'/':'-';
      var arys= DateStr.split('-');  
      myDate = new Date(arys[0],--arys[1],arys[2]);  
  }  
  return myDate;  
}  
/* 返回不host的URL */
function getNoHostURL(){
	var url=location.pathname+location.search;
	 url= url.substr( 1, url.length );// 去掉第一个/
	 return url;
}
function formatNumber(srcStr, nAfterDot){
	var srcStr,nAfterDot;
	var resultStr,nTen;
	srcStr = ""+srcStr+"";
	strLen = srcStr.length;
	dotPos = srcStr.indexOf(".",0);
	if (dotPos == -1){
	   resultStr = srcStr+".";
	   for (i=0;i<nAfterDot;i++){
	    resultStr = resultStr+"0";
	   }
	}else{
	   if ((strLen - dotPos - 1) >= nAfterDot){
	    nAfter = dotPos + nAfterDot + 1;
	    nTen =1;
	    for(j=0;j<nAfterDot;j++){
	     nTen = nTen*10;
	    }
	    resultStr = Math.round(parseFloat(srcStr)*nTen)/nTen;
	   }else{
	    resultStr = srcStr;
	    for (i=0;i<(nAfterDot - strLen + dotPos + 1);i++){
	     resultStr = resultStr+"0";
	    }
	   }
	}
	return resultStr;
	} 
function formatWeight(srcStr, nAfterDot){
	var srcStr,nAfterDot;
	var resultStr,nTen;
	srcStr = ""+srcStr+"";
	strLen = srcStr.length;
	dotPos = srcStr.indexOf(".",0);
	   if ((strLen - dotPos - 1) >= nAfterDot){
	    nAfter = dotPos + nAfterDot + 1;
	    nTen =1;
	    for(j=0;j<nAfterDot;j++){
	     nTen = nTen*10;
	    }
	    resultStr = Math.round(parseFloat(srcStr)*nTen)/nTen;
	   }else{
	    resultStr = srcStr;
	   }
	return resultStr;
	} 
function fmoney(s, n)
{
n = n > 0 && n <= 20 ? n : 2;
s = parseFloat((s + "").replace(/[^\d\.-]/g, "")).toFixed(n) + "";
var l = s.split(".")[0].split("").reverse(),
r = s.split(".")[1];
t = "";
for(i = 0; i < l.length; i ++ )
{
t += l[i] + ((i + 1) % 3 == 0 && (i + 1) != l.length ? "," : "");
}
var money= t.split("").reverse().join("") + "." + r;
if(money.startWith(',')){
	return money.substring(1);
}else if(money.startWith('-,')){
	return "-"+money.substring(2);
}else{
	return money;
}
}
Date.prototype.format = function(format){  
    var o = {  
         "M+" : this.getMonth()+1, // month
         "d+" : this.getDate(),    // day
         "H+" : this.getHours(),   // hour
         "m+" : this.getMinutes(), // minute
         "s+" : this.getSeconds(), // second
         "q+" : Math.floor((this.getMonth()+3)/3), // quarter
         "S" : this.getMilliseconds() // millisecond
      }  
      if(/(y+)/.test(format)) 
        format=format.replace(RegExp.$1,(this.getFullYear()+"").substr(4 - RegExp.$1.length));  
      for(var k in o)
        if(new RegExp("("+ k +")").test(format))  
        format = format.replace(RegExp.$1, RegExp.$1.length==1 ? o[k] : ("00"+ o[k]).substr((""+ o[k]).length));  
      return format;  
   }

function getParam(paras){ 
	var url = location.href;  
	var paraString = url.substring(url.indexOf("?")+1,url.length).split("&");  
	var paraObj = {}  
	for (i=0; j=paraString[i]; i++){  
	paraObj[j.substring(0,j.indexOf("=")).toLowerCase()] = j.substring(j.indexOf("=")+1,j.length);  
	}  
	var returnValue = paraObj[paras.toLowerCase()];  
	if(typeof(returnValue)=="undefined"){  
	return "";  
	}else{ 
		returnValue=returnValue.replace("=","");
	return returnValue; 
	}
	}
/* 返回不host的URL */
function getNoHostURL(){
	var url=location.pathname+location.search;
	 url= url.substr( 1, url.length );// 去掉第一个/
	 return url;
}
showLoading = function(doc,message) {
	 c = $(doc.document.body);
	var bg = doc.$("dloadingBg");
	var msg = doc.$("dloadingMsg");
	 var warpper=doc.$("dwarpper");
	 if (!bg) {
       
		bg = doc.document.createElement("div");
		bg.id = "dloadingBg";
		bg.className="datagrid-mask";

		bg.style.display='block'
		 doc.document.body.appendChild(bg);
		msg = doc.document.createElement("div");
		msg.id = "dloadingMsg";
		msg.className="datagrid-mask-msg";
		 
		msg.style.display='block';
		var mg="正在提交,请稍候..."
       if(message){
       	mg=message
       } 
		msg.innerHTML = mg;
		
		 doc.document.body.appendChild(msg)
	}else{
	    if(message){
	       msg.innerHTML=message;
	    }
		bg.style.display='block';
		msg.style.display='block';
	}
	 
	var f = c.getPosition();
	var d = c.getDimensions();
	bg.style.top = f.y + "px";
	bg.style.left = f.x + "px";
	bg.style.width = d.width + "px";
	bg.style.height = d.height + "px";
	 
	var msgWidth=170;
	var msgHeight=25;
   msg.style.width=msgWidth+"px";
	msg.style.top =(f.y+d.height/2-15)+"px";// f.y+((d.height)/2)+ "px";
	 
	var p=window.parent;
	 
// //alert(msg.style.top);
// if(window.name!=''&&window.name.indexOf("-frame")>0){
// alert("dd");
// var availWidth= window.screen.availWidth;
// availWidth=availWidth-150;//减去左测菜单长度
// msg.style.left = (availWidth/2 -msgWidth/2)+ "px"
// }else{
		  // msg.style.top=f.y+(d.height)/2-msgHeight/2+"px";
			msg.style.left =f.x+ ((d.width)/2 -msgWidth/2)+ "px"
	 // }
	 

};
closeLoading = function(pwin) {
	var lbg = pwin.$("dloadingBg");
	if (lbg) {
		$E.hide(lbg);
		pwin.$("dloadingMsg").hide()
	}
};
// +---------------------------------------------------
// | 字符串转成日期类型
// | 格式 MM/dd/YYYY MM-dd-YYYY YYYY/MM/dd YYYY-MM-dd
// +---------------------------------------------------

function stringToDate(DateStr)  
{   

 var converted = Date.parse(DateStr);  
 var myDate = new Date(converted);  
 if (isNaN(myDate))  
 {   
     // var delimCahar = DateStr.indexOf('/')!=-1?'/':'-';
     var arys= DateStr.split('-');  
     myDate = new Date(arys[0],--arys[1],arys[2]);  
 }  
 return myDate;  
}

var cardNumber="";
var saleType=0;
var ticketTypeId="";
var lastIndex=0;
/*
document.onkeypress=function(){
    var e = window.event;   
    if(e.keyCode>=48&&e.keyCode<=57){
        cardNumber+=(parseInt(e.keyCode)-48);
    }else if(e.keyCode==13&&cardNumber.length==12){
    	var dc=new DataCollection();
		dc.add('number',cardNumber);
		Server.sendRequest("ticket/checkCardNumber.do?type="+saleType,dc,function(response){
			if(response.status==1){//有效
				if(saleType==1){//散客售票
					addTicket(response.number);
				}else if(saleType==2){//团体售票
					addTeamTicket(response.number);
				}else if(saleType==3){//用户售票
					addUserTicket(response.number);
				}else if(saleType==4){//激活
					userActive(response.user);
				}else if(saleType==5){//补卡
					repairTicket(response.number);
				}else if(saleType==6){//续期
					extendTicket(response.user);
				}else if(saleType==7){//退押金
					addReturnPrice(response.ticket);
				}else if(saleType==8||saleType==9){//
					addReturnTicket(response.ticket);
				}else if(saleType==10){//
					queryUser(response.user);
				}else if(saleType==11){//
					queryTicket(response.ticket);
				}else if(saleType==12){//
					queryNoCardTicket(response.ticket);
				}
			}else{//无效
				Dialog.alert(response.message);
			}
			cardNumber="";
		},'json');
    }else{
    	cardNumber="";
    }   
}*/

document.onkeypress=function(){
    var e = window.event;   
    if(e.keyCode>=48&&e.keyCode<=57){
        cardNumber+=(parseInt(e.keyCode)-48);
    }else if(e.keyCode==13&&(cardNumber.length==10||cardNumber.length==9||cardNumber.length==8)){
    	var dc=new DataCollection();
		dc.add('cardNumber',cardNumber);
		dc.add('saleType',saleType);
		Server.sendRequest("ticket/checkCardNumber.do",dc,function(response){
			if(response.status==1){//有效
				if(saleType==1){//散客售票
					//js/CommonWaterTicket.js
					showMessage(response.number,response.message);
				}else if(saleType==2){//团体售票
				}else if(saleType==3){//用户售票
					//UserTicket.js
					addUserTicket(response.number,response.time);
				}else if(saleType==4){//激活
				}else if(saleType==5){//补卡
				}else if(saleType==6){//续期
				}else if(saleType==7){//退押金
				}else if(saleType==8||saleType==9){//
				}else if(saleType==10||saleType==11||saleType==12){//入库、10散客、11团体、12会员
					//js/ReturnPrice.js
					addInDate(response.number,response.size,response.type,response.message);
				}else if(saleType==0){
					if(cardField!=null&&cardField.length>0){
						if($(cardField)!=null){
							$S(cardField,response.number);
							search();
						}else{
							contentFrame.window.$S(cardField,response.number);
							contentFrame.window.search();
						}
					}
				}
			}else{//无效
				if(closeFlag){
					closeFlag=false;
					Dialog.alert(response.message,function(){
						closeFlag=true;						
					});
				}
			}
			cardNumber="";
		},'json');
    }else{
    	cardNumber="";
    }   
}

function checkCode(cardNumber){
	var dc=new DataCollection();
	dc.add('cardNumber',cardNumber);
	Server.sendRequest("ticket/checkCardNumber.do?type="+saleType+"&ticketId="+ticketTypeId,dc,function(response){
		if(response.status==1){//有效
			if(saleType==1){//散客售票
				addTicket(cardNumber);
			}else if(saleType==2){//团体售票
				addTeamTicket(cardNumber);
			}else if(saleType==3){//用户售票
				addUserTicket(cardNumber);
			}else if(saleType==4){//激活
				userActive(response.user);
			}else if(saleType==5){//补卡
				repairTicket(cardNumber);
			}else if(saleType==6){//续期
				extendTicket(response.user);
			}else if(saleType==7){//退押金
				addReturnPrice(response.ticket);
			}else if(saleType==8||saleType==9){//
				addReturnTicket(response.ticket);
			}else if(saleType==10){//
				queryUser(response.user);
			}else if(saleType==11){//
				queryTicket(response.ticket);
			}else if(saleType==12){//
				queryNoCardTicket(response.ticket);
			}else if(saleType==0){
				if(cardField!=null&&cardField.length>0){
					if($(cardField)!=null){
						$S(cardField,response.number);
						search();
					}else{
						contentFrame.window.$S(cardField,response.number);
						contentFrame.window.search();
					}
				}
			}
		}else{//无效
			if(closeFlag){
				closeFlag=false;
				Dialog.alert(response.message,function(){
					closeFlag=true;						
				});
			}
		}
		cardNumber="";
	},'json');
}
function str_pad( hex ){
	   var zero = '00000000';
	   var tmp  = 8-hex.length;
	   return zero.substr(0,tmp) + hex;
}
function initType(t){
	saleType=t;
}
function addCardNumber(cardNumber){
	var dc=new DataCollection();
	dc.add('number',cardNumber);
	Server.sendRequest("ticket/checkCardNumber.do?type="+saleType+"&ticketId="+ticketTypeId,dc,function(response){
		if(response.status==1){//有效
			if(saleType==1){//散客售票
				addTicket(response.number);
			}else if(saleType==2){//团体售票
				addTeamTicket(response.number);
			}else if(saleType==3){//用户售票
				addUserTicket(response.number);
			}else if(saleType==4){//激活
				userActive(response.user);
			}else if(saleType==5){//补卡
				repairTicket(response.number);
			}else if(saleType==6){//续期
				extendTicket(response.user);
			}else if(saleType==7){//退押金
				addReturnPrice(response.ticket);
			}else if(saleType==8||saleType==9){//
				addReturnTicket(response.ticket);
			}else if(saleType==10){//
				queryUser(response.user);
			}else if(saleType==11){//
				queryTicket(response.ticket);
			}else if(saleType==12){//
				queryNoCardTicket(response.number);
			}else if(saleType==0){
				if(cardField!=null&&cardField.length>0){
					if($(cardField)!=null){
						$S(cardField,response.number);
						search();
					}else{
						contentFrame.window.$S(cardField,response.number);
						contentFrame.window.search();
					}
				}
			}
		}else{//无效
			try{
	    		Dialog.getInstance("_DialogAlert" + (Dialog.AlertNo-1)).close();
	    	}catch(e){};
			Dialog.alert(response.message,function(){
				if(saleType==8){
					$S('number','');
				}
			});
		}
		cardNumber="";
	},'json');
}
var closeFlag=true;
var comPort="";//串口
var comBit="";//波特率
var comOpen="";//是否打开
function getCom(){
	return comPort;
}
function getComBit(){
	return comBit;
}
function getComOpen(){
	return comOpen;
}
var cardField='';