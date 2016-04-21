

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
}

Animation.prototype.isDone = function () {
    return (this.elapsedTime >= this.totalTime);
}




function Background(game) {
    this.game = game;
    this.ctx = game.ctx;
    this.image = AM.getAsset("./img/bgd.jpg");
}

Background.prototype.draw = function (ctx) {
    ctx.drawImage(this.image, 0, 0);
};

Background.prototype.update = function () {};







function Alien(game, spritesheet, direction) {
    this.RightAnimation = new Animation(spritesheet, 0, 262, 262, 8, 0.10, 30, false, 1);
    this.LeftAnimation = new Animation(spritesheet, 0, 262, 262, 8, 0.10, 30, false, 1);

    this.game = game;
  	this.direction = direction;
    this.ctx = game.ctx;

    if (direction == "left") {
        this.x = 900;
  	    this.speed = 100;
  	    this.y  = 200;
    } else  { //must be right
        this.x = 100;
        this.speed = 100;
        this.y  = 400;
    }
}


Alien.prototype.draw = function (ctx) {
	if(this.direction == "right") {
		  this.RightAnimation.drawFrame(this.game.clockTick, this.ctx, this.x, this.y);
	} else { //must be going left
      this.LeftAnimation.drawFrame(this.game.clockTick, this.ctx, this.x, this.y);
  }
};


Alien.prototype.update = function() {
	if(this.direction == "right") {
		  this.x += this.game.clockTick * this.speed;
	} else { //must be going left
		  this.x -= this.game.clockTick * this.speed;
	}

	if(this.x > 1000 || this.x < 0) {
      if (this.direction = "left") {
        this.x = 900;
      } else{
		      this.x = 100;
      }
	}
	if(this.y > 600 || this.y < 0) {
      if (this.direction = "left") {
          this.y = 200;
      } else{
          this.y = 400;
      }
	}
};





//main
var AM = new AssetManager();

AM.queueDownload("./img/alienSprite.png");
AM.queueDownload("./img/bgd.jpg");

AM.downloadAll(function () {
    var canvas = document.getElementById("gameWorld");

    //2d
    var ctx = canvas.getContext("2d");

    var gameEngine = new GameEngine();
    gameEngine.init(ctx);
    gameEngine.start();

    gameEngine.addEntity(new Background(gameEngine));

    //gameEngine.addEntity(new Alien(gameEngine, AM.getAsset("./img/alienSprite.png"), "left"));
    //gameEngine.addEntity(new Alien(gameEngine, AM.getAsset("./img/alienSprite.png"), "right"));

    console.log("All Done!");
});
