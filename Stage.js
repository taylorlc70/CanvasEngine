(function(){

var requestAnimFrame = window.requestAnimationFrame       ||
          window.webkitRequestAnimationFrame ||
          window.mozRequestAnimationFrame    ||
          function( callback ){
            window.setGameTimeout(callback, 1000 / 60);
          };

var Stage = function(id, width, height){

}

window.Stage = Stage;

})();