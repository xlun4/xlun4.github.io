oninstall=function(e){

};
onfetch=function(e){
	console.log(e.request);
	e.respondWith(fetch(e.request));
};