oninstall=function(e){

	start();
	function start(){
	var ii,cnt=4;
	ii=setInterval(function(){
		if(cnt--){
			registration.showNotification('Vibration Sample '+cnt, {
				body: 'Moon',
				icon: 'icon-192.png',
				vibrate: [200, 100, 200, 100, 200, 100, 200],
				tag: 'vibration-sample'+cnt
			});
		}else{
			clearInterval(ii);
		}
	},5000);
	}
};
onfetch=function(e){

};