define(function(require, exports, module){
	var check_location=function(){  
	    var options={  
	            enableHighAccuracy:true,  
	            maximunAge:1000,  
	            timeout:45000  
	    };  
	    if(window.navigator.geolocation){  
	        navigator.geolocation.getCurrentPosition(successCallback,errorCallback,options);  
	    }else{  
	        alert("你的浏览器不支持定位!");  
	    }  
	}

	function successCallback(position){  
		cosnole.log(position);
	    var output="";  
	    output +="Your position has bean located . \r\n";  
	    output+=" Latitude:"+position.coords.latitude+" ";  
	    output+=" Longitude:"+position.coords.longitude+" ";  
	    output+=" Accuracy :"+position.coords.accuracy +" meters";  
	    if(position.coords.latitude){  
	        output+=" Accuracy :"+position.coords.altitudeAccuracy +" meters";  
	    }  
	    if(position.coords.heading){  
	        output+=" Heading :"+position.coords.Heading +" meters";  
	    }  
	    if(position.coords.speed){  
	        output+=" Speed :"+position.coords.Speed +" m/s";  
	    }  
	    output+=" Time of Position "+position.timestamp +" m/s";  
	    alert(output);  
	}  
	function errorCallback(error){  
	   switch(error.code){  
	   case error.PERMISSION_DENIED:  
	       alert("you have denied access to your position .");  
	       break;  
	   case error.POSITION_UNAVAILABLE:  
	       alert("there was a problem getting yout position .");  
	       break;  
	   case error.TIMEOUT:  
	       alert("The application has timed out attempting to get your location .");  
	       break;  
	         
	   }  
	}  

	exports.check_location = check_location;	
})