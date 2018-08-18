navigator.serviceWorker.ready.then(function(registration) {
	start();
function start(){
	var ii,cnt=4;
	ii=setInterval(function(){
		if(cnt--){
			registration.showNotification('Vibration Sample', {
				body: 'Moon',
				icon: 'icon-192.png',
				vibrate: [200, 100, 200, 100, 200, 100, 200],
				tag: 'vibration-sample'
			});
		}else{
			clearInterval(ii);
		}
	},5000);
}
});
