oninstall=function(e){

};
activate=function(e){
	e.waitUntil(clients.claim());
};
onfetch=function(e){
	console.log(e.request);
	e.respondWith(fetch(e.request));
};