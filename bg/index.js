start();
function start(){
	switch(Notification.permission){
		case "granted":test();break;
		case "denied":break;
		default:
		Notification.requestPermission(function(permission){
			if(permission=="granted")test();
		});
	}
}
function test(){
	var ii,cnt=4;
	ii=setInterval(function(){
		if(cnt--){
		var notification = new Notification("Hi there! "+cnt);
		}else{
		clearInterval(ii);
		}
	},5000);
}