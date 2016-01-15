(function(){

var requestAnimFrame = window.requestAnimationFrame       ||
          window.webkitRequestAnimationFrame ||
          window.mozRequestAnimationFrame    ||
          function( callback ){
            window.setGameTimeout(callback, 1000 / 60);
          };

var Stage = function(id, width, height){
	if(arguments.length < 3){
		return new Error("Stage function requires 3 arguments: id, width, height");
	}
	var query,
		el;
	if (id.indexOf(".") > -1){
		query = id.split(".")[1];
		el = document.getElementsByClassName(query);
	} else {
		console.log("indexOf failed")
	}
}

window.Stage = Stage;

})();