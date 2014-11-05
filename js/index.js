if(define && define.amd !== undefined){
	//amd
	define("index", ["mod1"], function(mod1){
		console.log(define.amd);
		mod1.geo();
	})
}else{
	//cmd
	define(function(require, exports, module){
		console.log(define.cmd);
		mod1.change();
	})
}
