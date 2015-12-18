(function (){
var Sprite = function(context, img, pos, size, frameCount, frameIndex, framePos, frameSize, loopSpeed, loop){
	this.ctx = context;
	this.img = img;
	this.pos = pos;
	this.size = (size) ? size : [this.img.width, this.img.height]; //The size of the image on the canvas.
	this.rotation = 0;
	this.rotated = false;
	this.spinning = false;
	this.render = this.spriteRender; //The function to use for walking through the sprite sheet
	this.frameIndex = frameIndex; //The current frame we are using in the sprite sheet
	this.framePos = framePos; //The x/y values to start from on the sprite sheet
	this.frameSize = frameSize; // The size of each frame in the sprite sheet
	this.frameCount = frameCount; //The number of frames in the sprite sheet
	this.loopSpeed = loopSpeed; // The speed of the sprite animation
	this.loop = (loop) ? loop : 'loop'; // How many times it will loop. The options are 'once' to play once and 'loop' to loop forever
	this.stopped = false; //To stop the animation
}

Sprite.prototype.update = function(dt){
	this.frameIndex += this.loopSpeed * dt;
	if(this.spinning){
		this.rotation += this.speed * dt;
		this.rotate(this.rotation);
	}
}

Sprite.prototype.rotate = function(rotateAmount){
	this.rotation = rotateAmount;
	this.rotated = true;
}

Sprite.prototype.spriteRender = function(){
	//if(!this.rotated){
	//	this.ctx.drawImage(this.img, this.framePos[0], this.framePos[1], this.frameSize[0], this.frameSize[1], this.pos[0], this.pos[1], this.size[0], this.size[1]);
	//} else{
		this.ctx.save();
		this.ctx.translate((this.pos[0] + this.size[0] / 2), (this.pos[1] + this.size[1] / 2));
		this.ctx.rotate(this.rotation);
		this.ctx.drawImage(this.img, this.framePos[0], this.framePos[1], this.frameSize[0], this.frameSize[1], -(this.pos[0]/2), -(this.pos[1]/2), this.size[0], this.size[1]);
		this.ctx.restore();
	//}
}

Sprite.prototype.spin = function(_speed){
	this.spinning = true;
	this.speed = _speed;
}

function walk_horizontal(){
	if(!this.stopped) {
		var idx = Math.floor(this.frameIndex);
		var frame = idx % this.frameCount;
		this.framePos[0] = frame * this.frameSize[0];
		if(frame == this.frameCount - 1 && this.loop == 'once'){
			this.stopped = true;
		}
	}		
	this.spriteRender();
}

function walk_vertical(){
	if(!this.stopped) {
		var idx = Math.floor(this.frameIndex);
		var frame = idx % this.frameCount;
		this.framePos[1] = frame * this.frameSize[1];
		if(frame == this.frameCount -1 && this.loop == 'once'){
			this.stopped = true;
		}
	}		
	this.spriteRender();
}

function walk_lines(){
		if(!this.stopped) {
		var idx = Math.floor(this.frameIndex);
		var frame = idx % this.frameCount;
		this.framePos[0] = frame * this.frameSize[0];
		if(frame == this.frameCount - 1 && this.loop == 'once'){
			this.stopped = true;
		}
	}		
	this.spriteRender();
}


function walkFrames(){
	if(!this.stopped){
		var idx = Math.floor(this.frameIndex);
		var currentFrame = idx % this.frames.length;
		this.framePos[0] = this.frames[currentFrame][0];
		this.framePos[1] = this.frames[currentFrame][1];
		this.frameSize[0] =  this.frames[currentFrame][2];
		this.frameSize[1] =  this.frames[currentFrame][1];
	}
	this.spriteRender();
}


Sprite.prototype.stopWalk = function(){
	this.stopped = true;
	this.render = this.spriteRender;
}

Sprite.prototype.walkLines = function(){
	if(frames != undefined){
		this.frameCount = frames;
		this.render = walk_lines;
	}
	else{
		console.error("Usage: spriteName.walk('lines', []) ");
		this.render = this.spriteRender;
	}
}

Sprite.prototype.walk = function(direction, frames){
	this.stopped = false;
	switch(direction){
		case 'horizontal':
			this.render = walk_horizontal;
			break;
		case 'vertical':
			this.render = walk_vertical;
			break;
		case 'frames':
			if(frames != undefined){
				this.render = walkFrames;
				this.frames = frames;
				this.frameCount = frames.length;
				this.frameIndex = 0;
			}
			else{
				console.error("Usage: spriteName.walk('frames', [ [top_x0, top_y0, bottom_x0, bottom_y0], [top_x1, top_y1, bottom_x1, bottom_y1] ... ]) ");
				this.render = this.spriteRender;
			}
			break;
		default:
			this.render = walk_horizontal;
	}
}

function tween_linear(dt){
	
}

Sprite.prototype.tweenTo = function(parameters){
	if(!paramters){
		this.tween = tween_linear;
	}
}

window.Sprite = Sprite;

})();