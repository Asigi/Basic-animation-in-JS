

/*
  Computational World - Herobound gladators, Ansher Wars
  JavaScript - interpreted language, not compiled into binary file
  JavaScript provides interactive elements of web page
  */

//Purpose of Animation oject - track how long animation has been running, draw appropriate frame
function Animation(spriteSheet, frameStartY, frameWidth, frameHeight, sheetWidth, frameDuration, frames, loop, scale) {
    this.spriteSheet = spriteSheet;
    this.frameWidth = frameWidth;
    this.frameDuration = frameDuration;
    this.frameHeight = frameHeight;
    this.sheetWidth = sheetWidth;
    this.frames = frames;
    this.frameStartY = frameStartY;
    this.totalTime = frameDuration * frames;
    this.elapsedTime = 0;
    this.loop = loop;
    this.scale = scale;
}
Animation.prototype.drawFrame = function (tick, ctx, x, y) {
    this.elapsedTime += tick;
    if (this.isDone()) {
        if (this.loop) this.elapsedTime = 0;
    }
	   var frame = this.currentFrame();
    var xindex = 0;
    var yindex = 0;
    xindex = frame % this.sheetWidth;
    ctx.drawImage(this.spriteSheet,
                 xindex * this.frameWidth, this.frameStartY,  // source from sheet
                 this.frameWidth, this.frameHeight,
                 x, y, 300, 300);
};

Animation.prototype.currentFrame = function () {
    return Math.floor(this.elapsedTime / this.frameDuration);
};

Animation.prototype.isDone = function () {
    return (this.elapsedTime >= this.totalTime);
};


function Background(game) {
    this.game = game;
    this.ctx = game.ctx;
    this.image = AM.getAsset("./img/bgd.jpg");
}

Background.prototype.draw = function (ctx) {
    ctx.drawImage(this.image, 0, 0);
};
Background.prototype.update = function () {};







function Alien(game, sprite, direction) {
	this.walkLeftAnimation = new Animation(sprite, 0, 262, 262, 8, 0.10, 30, false, 1);
  this.walkRightAnimation = new Animation(sprite, 0, 262, 262, 8, 0.10, 30, false, 1);
  this.game = game;
	this.direction = direction;
  this.ctx = game.ctx;

  if (direction == 2) { //left
      this.x = 900;
      this.speed = 100;
      this.y  = 200;
  } 
}

Alien.prototype.update = function() {
	if(this.direction == 1) {
		this.x += this.game.clockTick * this.speed;
	} else if(this.direction == 2) {
		this.x -= this.game.clockTick * this.speed;
	} else if(this.direction == 3) {
		this.y += this.game.clockTick * this.speed;
	} else {
		this.y -= this.game.clockTick * this.speed;
	}
	if(this.x > 1800 || this.x < 0) {
		this.x = 900;
	}
	if(this.y > 600 || this.y < 0) {
		this.y = 250;
	}
};

Alien.prototype.draw = function (ctx) {
	if(this.direction == 2) {
		this.walkLeftAnimation.drawFrame(this.game.clockTick, this.ctx, this.x, this.y);
	}
};




// the "main" code starts here...

var AM = new AssetManager();

AM.queueDownload("./img/alienSprite.png");
AM.queueDownload("./img/bgd.jpg");

AM.downloadAll(function () {
    var canvas = document.getElementById("gameWorld");

	  //2d context
    var ctx = canvas.getContext("2d");
    var gameEngine = new GameEngine();
    gameEngine.init(ctx);
    gameEngine.start();

    gameEngine.addEntity(new Background(gameEngine));
    gameEngine.addEntity(new Alien(gameEngine, AM.getAsset("./img/alienSprite.png"), 2));

});
