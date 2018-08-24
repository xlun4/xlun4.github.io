var url_core={
	"/notify":function(){
		this.json().then(function(j){registration.showNotification(j[0],j[1]);});
		return new Response("");
	}
},	url_list=[url_core];
oninstall=function(e){

};
onactivate=function(e){
	e.waitUntil(clients.claim());
};
onfetch=function(e){
	var u=new URL(e.request.url);

	for(var i=url_list.length-1;i>=0;i--){
		if(!url_list[i][u.pathname])continue;
		e.respondWith(url_list[i][u.pathname].call(e.request));
		break;
	}
};