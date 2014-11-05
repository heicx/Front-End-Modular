define(function(require, exports, module){
	//cmd with modular id
	var geoCoding = function(){
		console.log("ensure the location.");
	}

	var changePage = function(){
		console.log("use transform with css3.");
	}

	module.exports = {
		change : changePage,
		geo : geoCoding
	};
})