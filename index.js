var res_empty=new Response("",{status:200})
,	url_core={
	"/notify":function(){
		this.json().then(function(j){registration.showNotification(j[0],j[1]);});
		return res_empty;
	}
},	url_list=[url_core];
oninstall=function(e){

};
onactivate=function(e){
	e.waitUntil(clients.claim());
};
onfetch=function(e){
	console.log(e.request);
	var path=e.request.url.replace(/^[^\/]+\/\/[^\/]+/,"");

	for(var i=url_list.length-1;i>=0;i--){
		if(!url_list[i][path])continue;
		e.respondWith(fetch(url_list[i][path].call(e.request)));
		return;
	}
	e.respondWith(fetch(e.request));
};