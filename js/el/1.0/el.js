if(!$)var $;
(function(){
function u(a){return "["+a+"]"}
function cls(inst,prot,pro2){
	var r,v;

	for(var v in pro2){
		prot[v]=pro2[v];
	}

	inst.prototype=prot;

	return r=function(a,b,c,d){
		return new inst(a,b,c,d);
	};
}


var
	d_el="data-el"
,	d_el_only="data-el-only"
,	d_el_on="data-el-on"
,	d_el_scan="data-el-scan"
,	q_af=u("autofocus")
,	q_el=u(d_el)
,	q_el_scan=u(d_el_scan)
,	e_checked="el-checked"
,	e_selected="el-selected"
,	popup=[],dom=[]
,	$$={
// async http
www_form:"application/x-www-form-urlencoded",
rq:function(op,w){
	var x=new (w||window).XMLHttpRequest();
	x.addEventListener("readystatechange",function(){
		if(this.readyState==4)
		switch(~~(this.status/100)){
			case 1:case 3:break;
			case 2:if(op.onload)op.onload.call(this);break;
			default:if(op.onerror)op.onerror.call(this);
		}
	});
	function err(){
		var b;
		if(op.onerror){
			b=x.onerror.call(this);
		}
		if(!b&&op.proc_send){
			op.proc_send();
		}
	}
	x.addEventListener("timeout",err),
	x.addEventListener("error",err);

	for(var v in op.header){
		x.setRequestHeader(v,op.header[v].join(", "));
	}

	if(op.send)op.proc_send();

	return x;
},
// Native
__call:function(e,node,p){
	p=p.split(";");
	for(var len=p.length,i=0,v,path;i<len;i++){
		if(!p[i])continue;
		v=this.parse_query(p[i]);

		path="$"+v.__path;
		if(path in this)this[path](e,node,v);

		path="$"+path;
		if(path in this)this[path](e,node,v);
	}
},
__proc:function(e2){
	return function(e){
		var node=e.target;

		if(!e2)
		for(var c=0,i=popup.length-1,r;i>=0;i--){
			r=popup[i];
			for(var i2=0,l2=r.type.length;i2<l2;i2++){
				if(r.list[i2].contains(node)||r.node.contains(node))continue;
				$["$class-"+(r.type[i2]?"remove":"add")](e,node,r);
				c++;
			}
			if(c)popup.splice(i,1);
		}

		for(var p=node,i=16;p&&p.tagName&&i>0;p=p.parentNode,i--){
			if(p.getAttribute(d_el)=="break")return;
		}

		if("type" in node==false)
		for(var p=node,i=16;p&&p.tagName&&i>0;p=p.parentNode,i--){
			if(p.className.match&&p.className.match(/el-(check|option)/)){
				if(p=p.querySelector("[type='checkbox'],[type='option']"))p.click();
				break;
			}
		}

		for(var b,p=node,i=16;p&&p.tagName&&i>0;p=p.parentNode,i--){
			if(b=p.getAttribute(d_el)){
				$.__call(e,p,b);
				break;
			}
		}
	};
},
// DOM
"$resource":function(e,node,j){
	if(!j)return;
	var a,b,arg;

	if(a=document.querySelector("[data-el-resource=\""+j.query+"\"]"))
	if(b=a.getAttribute(d_el)){
		this.__call(e,a,b);
	}
},"$class-toggle":function(e,node,j,k){
	var a,b=[],v,cb;

	if(!k)k="toggle";

	a=j.query?document.querySelectorAll(j.query):[node];
	for(var i=0,i2,v;i<a.length;i++){
		v=(j.class||"on").split("|");
		for(i2=0;i2<v.length;i2++){
			b[i]=a[i].classList[k](v[i2]);
		}
	}

	if(j.type=="popup"){
		j.type=b,j.list=a,j.node=node;
		popup.push(j);
	}

	for(v in cb=document.querySelectorAll(".el-class-toggle")){
		try{
			if(cb[v].onclick)cb[v].onclick(e,j,k);
		}catch(e){}
	}
},"$class-switch":function(e,node,j){
	var v=j.node.split("|");
	j.node=v[0];
	this["$class-toggle"](e,node,j,"remove");
	j.node=v[1];
	this["$class-toggle"](e,node,j,"add");
},"$class-add":function(e,node,j){
	this["$class-toggle"](e,node,j,"add");
},"$class-remove":function(e,node,j){
	this["$class-toggle"](e,node,j,"remove");
},"$click":function(e,node,j){

},"$include":function(e,node,j){
	if(j.state)j.state=j.state+"State";
	var p=document.querySelector(j.node),state1=j.state in history;

	j.url=this.lang_print(decodeURIComponent(j.url));
	j.url=this.query_print(j.url);
	j.data=decodeURIComponent(j.data);

	this.native.callback(j,"onrun");

	if(j.form_query){
		j.url+=this.parse_form(document.querySelector(j.form_query),j.url?1:0);
	}
	if(j.form){
		if(!j.data)j.data="";
		j.data+=this.parse_form(document.querySelector(j.form),j.data?1:0);
	}

	if(j.state_url=="*"){
		j.state_url=j.url;
	}else if(j.state_url){
		j.state_url=decodeURIComponent(j.state_url);
	}

	this.history_replace(p.innerHTML,j.node);

	this.ajax(j.url,{
		type:j.type,
		data:j.data,
		onload:function(){
			p.innerHTML=this.responseText;
			if(state1){
				history[j.state]({html:p.innerHTML,node:j.node},"",j.state_url||"/");
			}
			this.run(p);
			this.native.callback(j,"onload");
		}
	});
},"$list-select":function(e,node,j){
	var li=node.querySelectorAll(j.node);
	for(var i=0;i<li.length;i++){
		if(li==e.target){
			li.classList.toggle(j.class||e_selected);
			break;
		}
	}
},"$on":function(e,node,j){
	//j.type
},"$focus":function(e,node,j){
	var v=document.querySelector(j.query);

	//this.native.callback(j,"onbefore");
	if(v)v.focus();
	//this.native.callback(j,"onafter");
},
// API
stopPrevent:function(a,b){
	if(a)a.stopPropagation();
	if(b)b.preventDefault();
},
Array_from:function(a){
	return Array.prototype.slice.call(a);
},
run:function(t){
	//this.lang_parse(t);
	this.run_script(t);
	this.run_lang(t);
	if(f=t.querySelector(q_af))f.focus();
},
run_script:function(t){
	for(var c,s=t.querySelectorAll("script"),i=s.length-1;i>=0;i--){
		c=document.createElement("script");
		if(s[i].src){
			c.src=s[i].src;
		}else{
			c.textContent=s[i].textContent;
		}
		s[i].parentNode.insertBefore(c,s[i]);
		s[i].remove();
	}
},
run_lang:function(t){
	for(var a,c,s=t.querySelectorAll("[data-el^='lang?']"),i=s.length-1;i>=0;i--){
		if(a=s[i].getAttribute(d_el))a=this.parse_query(a);
		c=this.lang(a[""]);
		c.setAttribute(d_el,a[""]);
		c.className=s[i].className;
		s[i].parentNode.insertBefore(c,s[i]);
		s[i].remove();
	}
},
var_update:function(r,t,m){
	for(var rule,s=(t||document).querySelectorAll("style"),i=s.length-1;i>=0;i--){
		rule = s[i].sheet.cssRules;

		if(rule==null)continue;

		for(var j=rule.length-1,n;j>=0;j--){
			n=rule[j].selectorText;
			if(!n)continue;
			if(m.exec(n)){
				n=n.split(",");
				r[n[0]]=rule[j];
				rule[j].selectorText=n[1];
			}
		}
	}

	for(var s=(t||document).querySelectorAll("[class*='-']"),i=s.length-1;i>=0;i--){
		for(var li=s[i].classList,j=li.length-1;j>=0;j--){
			n=li[j];
			if(m.exec(n)){
				r[n]=s[i];
			}
		}
	}
},
on1:function(a,b,c){
	var p=function(){
		if(a==this)c.call(a);
		a.removeEventListener(b,p);
	};
	a.addEventListener(b,p);

	return p;
},
retry:function(a,b,c){
	var l=c||3,i=setInterval(function(){
		try{
			a();
			clearInterval(i);
		}catch(e){
			if(--l<=0)clearInterval(i);
		}
	},b||1000);
	return i;
},
blur:function(){
	document.activeElement.blur();
},
host_get:function(s){
	return document.querySelector("[src$='"+s+"']").src.replace(/[^\/]+$/,"");
},
// Element
new_link:function(p){
	var c=document.createElement("link");
	c.rel="stylesheet",
	this.node_insert(p?p:document.head,c);
	return c;
},new_style:function(p){
	var c=document.createElement("style");
	this.node_insert(p?p:document.head,c);
	return c;
},new_script:function(p,s){
	var c=document.createElement("script");
	if(s)c.type=s;
	this.node_insert(p?p:document.head,c);
	return c;
},str_script_remove:function(a){
	return a.replace(/<[^>]+/g,function(match){
		return match.replace(/ (on|data)\w+="[^"]*"/g,'');
	});
},str_formdata:function(a){
	return a.replace(/\&/g,"%26");;
},str_regex:function(w){
	return w.replace(/(.)/g,"\\$1");
},str_filter:function(s,allow){
	var r="!\"#$%&'()*+,-./:;<=>?@[\\]^_`{|}~s";
	if(!allow)allow="s";
	r=r.replace(new RegExp(u(this.str_regex(allow)),"g"),"");
	return s.replace(new RegExp(u(this.str_regex(r)),"g"),"");
},
// Language
lang:function(path){
var l=document.createElement("link");
/*	l.onload=function(){
		l.onload=null;
		for(var c=this.sheet.cssRules,i=0;i<c.length;i++){
			this.lang_trans[c[i].selectorText.split(":")[0].substr(1)]=
			c[i].style.content.replace(/^.|.$/g,"");
		}
	};*/
	l.rel="stylesheet",
	l.href=this.lang_print(path);
	return l;
},/*lang_parse:function(a){
	a=a.querySelectorAll("[data-span]");
	var ar=[],l=this.lang_trans;

	for(var v in l){
		ar.push({rx:new RegExp(v,"ig"),st:l[v]});
	}
	
	for(var i=0,s;i<a.length;i++){
		s=a[i].getAttribute("data-span");
		for(var j=0;j<ar.length;j++){
			s=s.replace(ar[j].rx,ar[j].st);
		}
		a[i].textContent=s;
	}
},*/lang_print:function(a){
	return a.replace(/\[el-lang\]/ig,this.lang_default(1));
},lang_span:function(a,b){
	return b.replace(new RegExp("("+a+"[\\w\\-]+)","g"),'<span class="$1"></span>').replace(/\x08/g,"");
},lang_default:function(l){
	var a=navigator.languages,r=this.cookie_get("lang"),v;
	if(r)return r;
	if(!a||!a[0])a=[navigator.language];
	if(r=a[0],l)
	for(v in this.lang_s){
		if(r==v||r==v.split("-")[0]){
			return v;
		}
	}
	return r?r:"en-US";
},lang_s:{
	"en-US":"English",
	"ko-KR":"한국어"
},lang_trans:{}
,
// Parser
parse:function(){
	
},parse_query:function(a){
	var r={},p=a.indexOf("?");

	if(p>=0){
		r.__path=a.substr(0,p);
		p=(r.__query=a.substr(p+1)).split("&");
		for(var len=p.length,j,i=0;i<len;i++){
			j=p[i].indexOf("=");
			if(j<0){
				r[""]=p[i];
			}else{
				r[p[i].substr(0,j)]=p[i].substr(j+1);
			}
		}
	}else{
		r.__query=r.__path=a;
	}
	return r;
},parse_form:function(f,ct,st){
	var a="";
	for(var s=f.elements,l=s.length,i=st||0;i<l;i++){
		if(s[i].name&&s[i].value)a+="&"+this.str_formdata(s[i].name)+"="+this.str_formdata(s[i].value);
	}
	return ct?a:a.substr(1);
},parse_dom:function(a){
	return (new DOMParser()).parseFromString(a,"text/html");
},
// Time
time:function(){
	
},time_item:{s:1000,m:60000,h:3600000,d:86400000}
,time_value:function(v){
	var m;
	if(v.constructor==String){
		if(m=v.substr(-1))
		if(m in this.time_item){
			v=v.substr(0,v.length-1);
			v*=this.time_item[m];
		}
	}
	return v;
},time_print_data:{
	yyyy:function(t){return t.getFullYear().toString();}
,	yy:function(t){return this.yyyy(t).substr(-2);}
,	MM:function(t){return ("0"+(t.getMonth()+1)).substr(-2);}
,	M:function(t){return (t.getMonth()+1).toString();}
,	dd:function(t){return ("0"+t.getDate()).substr(-2);}
,	d:function(t){return t.getDate().toString();}
,	hh:function(t){return ("0"+t.getHours()).substr(-2);}
,	h:function(t){return t.getHours().toString();}
,	mm:function(t){return ("0"+t.getMinutes()).substr(-2);}
,	m:function(t){return t.getMinutes().toString();}
,	ss:function(t){return ("0"+t.getSeconds()).substr(-2);}
,	s:function(t){return t.getSeconds().toString();}
,	sss:function(t){return ("00"+t.getMilliseconds()).substr(-3);}
},time_print:function(f,t){
	if(!t)t=new Date();

	var idx,a="",m,w=/\w+/g,q=this.time_print_data;
	while(m=w.exec(f)){
		if(idx){
			a+=f.substring(idx,m.index);
		}
		idx=w.lastIndex;
		if(m[0] in q){
			a+=q[m[0]](t);
		}else{
			a+=m[0];
		}
	}
	return a;
},time_parse:function(time){
	var d=new Date(),i,v=d.getTime();
	if(time=time.match(/\d+\w?/g)){
		for(i=0;i<time.length;i++){
			v+=this.time_value(time[i])|0;
		}
		d.setTime(v);
	}
	return d;
},
// history
pushState:history.pushState
,replaceState:history.replaceState
,history_replace:function(a,b){
	history.replaceState({html:a||document.body.innerHTML,node:b||"body"},"",location.pathname+location.search+location.hash);
},
// Query
query_update:function(){
	return this.query_string=this.parse_query(location.search);
},
query_string:{},
query_print:function(a){
	var q=this.query_string,r=a.replace(/\[([^\]]+)\]/g,function(match,m){
		return m in q?m+"="+q[m]:m;
	});
	return r.replace(/&&/g,"&").replace(/&$/,"");
},
// Cookie
cookie:function(){
	var c=arguments.length;
	if(c!=0)
	return (c>1?this.cookie_set:this.cookie_get).apply(this,arguments);
},cookie_result:function(){
	var a,c=document.cookie.split(";"),i,r={};
	for(i=0;i<c.length;i++){
		a=c[i].trim().split("=");
		r[a[0]]=(a[1]?a[1]:"");
	}
	return r;
},cookie_set:function(name,value,par){
	var v,d=name+"="+value;
	if(par){
		if(v=par.time_raw)d="; expires="+v;
		if(v=par.time)d="; expires="+Date.parse(v).toGMTString();
		if(v=par.domain)d="; domain="+v;
		if(v=par.path)d="; path="+v;
	}
	document.cookie=d;
},cookie_get:function(name){
	var c=document.cookie,i,r;
	i=c.indexOf(name+"=");
	if(i>-1){
		c=c.substr(i);
		i=c.indexOf(";");
		if(i>-1){
			c=c.substr(0,i);
		}
		r=c.substr(name.length+1);
	}
	return r;
},cookie_delete:function(name){
	this.cookie_set(name,"",{time_raw:(new Date).toGMTString()});
},
// Scan
scan:cls(function(p){
	var d=this.node(q_el_scan,p);
	this.root=p;
	for(var c=d.length,i=0;i<c;i++){
		this.node[d[i].getAttribute(d_el_scan)]=d[i];
	}
},{
	root:null,
	node:{},
	html_set:function(j){
		var i=0,l=this.node,n,w;
		for(var v in l){
			n=l[v];
			if(v in j&&(w=j[v])||i in j&&(w=j[i])){
				n.innerHTML=w;
			}
			i++;
		}
	},
	html_get:function(){
		var r={};
		for(var v in this.node){
			r[v]=this.node[v].innerHTML;
		}
		return r;
	},
	text_set:function(j){
		var i=0,l=this.node,n,w;
		for(var v in l){
			n=l[v];
			if(v in j&&(w=j[v])||i in j&&(w=j[i])){
				n.innerText=w;
			}
			i++;
		}
	},
	text_get:function(){
		var r={};
		for(var v in this.node){
			r[v]=this.node[v].innerText;
		}
		return r;
	},clone:function(){
		var p=this.root.cloneNode(true);
		return this.scan(this.root);
	}
}),
// Node
node:cls(function(s,p){
	this.push.apply(this,(p?p:document).querySelectorAll(s));
},[],{
	on:function(o){
		this.node_on(this,o);
	},
	remove:function(){
		this.node_remove(this);
		this.splice(0,this.length);
	}
}),
node_from:function(a,b){
	switch(a.constructor){
		case String:return this.Array_from(document.querySelectorAll(a));
		case Array:
			for(var c=b||document,n,i=a.length-1;i>=0;i--)
			switch(n=a[i],n.constructor){
				case String:a[i]=c.querySelector(n);break;
				case Object:a[i]=n;break;
			}
			return a;
	}
	return [a];
},node_insert:function(o,p,s){
	if(!o)o=document["script,link,style".indexOf(p.tagName)<0?"body":"head"];

	if(s){
		o.insertBefore(p,s);
	}else{
		o.appendChild(p);
	}
},
node_on:function(s,o){
	var a=this.node_from(s);
	for(var i=a.length-1;i>=0;i--)
	for(var b in o)a[i]["on"+b]=o[b];
},
node_event:function(o,n,proc,w,d){
	var a=this.node_from(o);

	w=w||[];
	d=d||[HTMLButtonElement,HTMLAnchorElement];

	for(var i=a.length-1;i>=0;i--)
	proc.node=a,
	a[i].addEventListener(n,function(e){
		for(var p=e.target,i=16;p&&i>0;p=p.parentNode,i--){
			if(d.indexOf(p.constructor)>=0||w.indexOf(p.constructor)>=0){
				for(var b,cn=p.classList,j=cn.length-1;j>=0;j--)
				if(cn[j] in proc)b=proc[cn[j]].call(p,e);
				if(proc["*"])proc["*"].call(p,e);
				return b;
			}
		}
	});
},
node_property:function(s,n,p){
	for(var len=s.length,i=0;i<len;i++)s[i][n]=p;
},
node_remove:function(s){
	for(var len=s.length,i=0;i<len;i++)s[i].remove();
},
// CSS
css:cls(function(s){
	this.element=s;
},{
	insert:function(s,p){
		var v=this.element.sheet;
		if(isNaN(p))p=v.cssRules.length;
		v.insertRule(s,p);
		return this.rule(v.cssRules[p],p);
	},replace:function(s,p){
		
	}
}),
// CSS Rule
rule:cls(function(s,p){
	this.rule=s;
	this.index=p;
},{
	selector_set:function(a,s){
		var i=this.index
		,	r=this.rule
		,	p=r.parentStyleSheet
		,	slt=r.selectorText.split(" ")
		,	css=r.cssText.match(/\{.*\}/);

		css=css?css[0]:"{}";
		slt[a]=s,slt=slt.join(" ");
		p.deleteRule(i);
		p.insertRule(slt+css,i);
		this.rule=p.cssRules[i];
	},css_set:function(s){
		var i=this.index,
			r=this.rule,
			p=r.parentStyleSheet,
			slt=r.selectorText;
		p.deleteRule(i);
		p.insertRule(slt+"{"+s+"}",i);
		this.rule=p.cssRules[i];
	}
})
};

if($)for(var n in $$)$[n]=$$[v];else $=$$;


$.init_dir=$.host_get("el.js");
$.css_lang=$.new_link();
$.query_update();

function prState(n){
	history[n]=function(a,b,c){
		var r=el[n].call(history,a,b,c);
		$.query_update();
		return r;
	};
}
prState("pushState"),prState("replaceState");



function el_on_resize(){
	var a=d_el_on+"-resize",b,c,i;
	c=document.querySelectorAll(u(a));
	for(i=0;i<c.length;i++){
		if(b=c[i].getAttribute(a)){
			Function(b).call(c[i]);
			break;
		}
	}
}

window.addEventListener("click",$.__proc());

$.on1(window,"load",function(){
	el_on_resize();
	$.run_lang(document);
});
window.addEventListener("resize",el_on_resize),
window.addEventListener("popstate",function(e){
	$.query_update();

	if(!e.state)return;
	var a=document.querySelector(e.state.node);
	if(a){
		a.innerHTML=e.state.html;
		$.run(a);
	}
},false);
})();