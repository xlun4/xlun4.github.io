oninstall=function(e){

};
onfetch=function(e){
	console.log(e.request);
	e.responseWith(fetch(e.request));
};