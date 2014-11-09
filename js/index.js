if(define && define.amd !== undefined){
	//amd
	define("index", ["mod1", "config", "../lib/zepto"], function(mod1, config, $){
		//console.log(define.amd);
		//mod1.geo();
		$(function(){		
			config.check_location();
		})
	})
}else{
	//cmd
	define(function(require, exports, module){
		var mod1 = require("./mod1");
		mod1.change();
	})
}
