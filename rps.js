var canvas = document.createElement("canvas");
canvas.width = 640;
canvas.height = 480;
var ctx = canvas.getContext('2d');
var GameTime;

document.body.appendChild(canvas);

resources.load([
	'assets/img/ring.jpg',
	'assets/img/rock.png',
	'assets/img/Scissors2.png'
]);
resources.onReady(init);

var requestAnimFrame = window.requestAnimationFrame       ||
          window.webkitRequestAnimationFrame ||
          window.mozRequestAnimationFrame    ||
          function( callback ){
            window.setGameTimeout(callback, 1000 / 60);
          };

var playerObject = {},
	  opponentObject = {};
var Sprites = {};

function init(){
	console.log('running init');
	var rockImg = resources.get('assets/img/rock.png')
	var rock =  new Sprite(ctx, rockImg, [canvas.width/4, canvas.height -120],  [100, 100], 1, 0, [0,0], [rockImg.width, rockImg.height], 0, 'loop');
	var scissors = new Sprite(ctx, resources.get( 'assets/img/Scissors2.png'), [200,100], [200,150], 3, 0, [0, 0] , [412, 260], 10, 'loop');
	scissors.walk('horizontal');
	Sprites.rock = rock;
	Sprites.scissors = scissors;
	GameTime = Date.now();
	main();
}

function main() {
    var now = Date.now();
    var dt = (now - GameTime) / 1000.0;

    update(dt);
    render();

    GameTime = now;
    requestAnimFrame(main);
};

function update(dt){
	for(var go in Sprites){
		Sprites[go].update(dt);
	}
}

function render(){
	ctx.drawImage(resources.get('assets/img/ring.jpg'), 0, 0, canvas.width, canvas.height);
	for(var go in Sprites){
		Sprites[go].render();
	}
}