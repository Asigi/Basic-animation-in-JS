

/*
  Computational World - Herobound gladators, Ansher Wars
  JavaScript - interpreted language, not compiled into binary file
  JavaScript provides interactive elements of web page
  */

//Purpose of Animation oject - track how long animation has been running, draw appropriate frame
function Animation(spriteSheet, frameWidth, frameHeight, sheetWidth, frameDuration, frames, loop, scale) {
    this.spriteSheet = spriteSheet;
    this.frameWidth = frameWidth;
    this.frameDuration = frameDuration;
    this.frameHeight = frameHeight;
    this.sheetWidth = sheetWidth;
    this.frames = frames;
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
    yindex = Math.floor(frame / this.sheetWidth);

    ctx.drawImage(this.spriteSheet,
                 xindex * this.frameWidth, yindex * this.frameHeight,  // source from sheet
                 this.frameWidth, this.frameHeight,
                 x, y,
                 this.frameWidth * this.scale,
                 this.frameHeight * this.scale);
}

Animation.prototype.currentFrame = function () {
    return Math.floor(this.elapsedTime / this.frameDuration);
};

Animation.prototype.isDone = function () {
    return (this.elapsedTime >= this.totalTime);
};





function Background(game, backg) {
    this.game = game;
    this.ctx = game.ctx;
    this.image = backg;
}
Background.prototype.draw = function (ctx) {
    ctx.drawImage(this.image, 0, 0);
};
Background.prototype.update = function () {};







function Alien(game, sprite, direction) {
	this.leftward = new Animation(sprite, 262, 262, 8, 0.03, 24, true, 1);
  this.rightward = new Animation(sprite, 262, 262, 8, 0.03, 24, true, 2);
  this.game = game;
	this.direction = direction;
  this.ctx = game.ctx;

  if (direction == "left") {
      this.x = 1000;
      this.speed = 200;
      this.y  = 140;
  } else if (direction == "right") {
      this.x = -200;
      this.speed = 100;
      this.y = 210;
  }
}

Alien.prototype.update = function() {

	if(this.direction == "right") {
		this.x += this.game.clockTick * this.speed;
	} else { //left
		this.x -= this.game.clockTick * this.speed;
	}


	if(this.x > 1100 || this.x < -300) {
    if (this.direction == "left") {
        this.x = 1100;
    } else{
        this.x = -300;
    }
	}

};

Alien.prototype.draw = function (ctx) {
	if(this.direction == "left") {
		this.leftward.drawFrame(this.game.clockTick, this.ctx, this.x, this.y);
	} else {
    this.rightward.drawFrame(this.game.clockTick, this.ctx, this.x, this.y);
  }
};





var AM = new AssetManager();
AM.queueDownload("./img/alienSprite.png");
AM.queueDownload("./img/bgd.jpg");

AM.downloadAll(function () {
    var canvas = document.getElementById("gameWorld");

    var ctx = canvas.getContext("2d");
    var gameEngine = new GameEngine();
    gameEngine.init(ctx);
    gameEngine.start();

    gameEngine.addEntity(new Background(gameEngine, AM.getAsset("./img/bgd.jpg")));
    gameEngine.addEntity(new Alien(gameEngine, AM.getAsset("./img/alienSprite.png"), "left"));
    gameEngine.addEntity(new Alien(gameEngine, AM.getAsset("./img/alienSprite.png"), "right"));

});
