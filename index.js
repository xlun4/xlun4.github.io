start();
function start(){
	var ii,cnt=4;
	ii=setInterval(function(){
		if(cnt--){
			new Notification('Vibration Sample', {
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