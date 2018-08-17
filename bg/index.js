start();
function start(){
	var ii,cnt=4;
	ii=setInterval(function(){
		if(cnt--){
		var notification = new Notification("Hi there! "+cnt);
		}else{
		clearInterval(ii);
		}
	},5000);
}