if(define && define.amd !== undefined){
	//amd
	define("index", ["mod1"], function(mod1){
		console.log(define.amd);
		mod1.geo();
	})
}else{
	//cmd
	define(function(require, exports, module){
		var mod1 = require("./mod1");
		mod1.change();
	})
}
