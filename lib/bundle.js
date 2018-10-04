/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./lib/apollo.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./lib/apollo.js":
/*!***********************!*\
  !*** ./lib/apollo.js ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const Game = __webpack_require__(/*! ./game.js */ "./lib/game.js");
const GameView = __webpack_require__(/*! ./game_view */ "./lib/game_view.js");

document.addEventListener("DOMContentLoaded", () => {
  const canvasEl = document.getElementsByTagName("canvas")[0];
  canvasEl.width = Game.X_DIMENSION;
  canvasEl.height = Game.Y_DIMENSION;
  const ctx = canvasEl.getContext("2d");
  const game = new Game();
  var preview = new GameView(game, ctx);
  preview.preview();
});

document.addEventListener("click", () => {
  const canvasEl = document.getElementsByTagName("canvas")[0];
  canvasEl.width = Game.X_DIMENSION;
  canvasEl.height = Game.Y_DIMENSION;
  const ctx = canvasEl.getContext("2d");
  const game = new Game();
  const session = new GameView(game,ctx);
  session.start();
});


/***/ }),

/***/ "./lib/game.js":
/*!*********************!*\
  !*** ./lib/game.js ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const Lander = __webpack_require__(/*! ./lander */ "./lib/lander.js");

class Game{
  constructor() {
    this.lander = new Lander({
      height:30,
      width:20,
      pos:[10,10],
      velo:[1,0],
      angle:13,
      fuel:1000,
      engineOn:false,
      rotateLeft: false,
      rotateRight:false,
      landed: false,
      gameOver: false,
    });
    this.cm = new Lander({
      height:30,
      width:20,
      pos:[10,80],
      velo:[1,0],
      angle:13,
      fuel:1000,
      engineOn:false,
      rotateLeft: false,
      rotateRight:false,
      landed: false,
      gameOver: false,
    });
    this.surface = [];
  }

  instrumentDraw(ctx){
    ctx.fillStyle = "grey";
    ctx.fillRect(0,620,1300,250);
    ctx.fillStyle = "white";
    ctx.fillRect(0,625,320,100);
    ctx.fillStyle = "black";
    ctx.font = "13px Andale Mono";
    ctx.fillText("Land on the Moon without crashing",8,640);
    ctx.fillText("Left and Right arrow keys rotate lander.",8,670);
    ctx.fillText("Up arrow activates thrust",8,700);
    ctx.font = " bold 20px Noto Sans, sans-serif";

    ctx.fillText("Lunar Contact",380,660);
    // ctx.beginPath();
    ctx.arc(445,730,50,0,2*Math.PI);
    ctx.closePath();
    ctx.fillStyle = "grey";
    // ctx.fill();
    ctx.stroke();
    ctx.fillStyle = "black";
    ctx.font = "18px Noto Sans, sans-serif";
    ctx.fillText("Fuel Remaining",605,660);
    ctx.fillText("Vertical Velocity",810,660);
    ctx.fillText("Horizontal Velocity",1030,660);
    ctx.fillRect(570,680,200,80);
    ctx.fillRect(790,680,200,80);
    ctx.fillRect(1010,680,200,80);

    ctx.fillStyle = "green";
    ctx.font = "50px Andale Mono";
    ctx.fillText(`${Math.floor(this.lander.fuel)}`,630,735);
    ctx.fillText(`${Math.floor(this.lander.velo[1]*100)}`,810,735);
    ctx.fillText(`${Math.floor(this.lander.velo[0]*100)}`,1025,735);
    ctx.fillText(`m/s`,1120,735);
    ctx.fillText(`m/s`,890,735);
    if (this.lander.landed == true){
      const grd = ctx.createRadialGradient(450,735,50,420,705,50);
      grd.addColorStop(0,"grey");
      grd.addColorStop(1,"#42bcf4");
      ctx.beginPath();
      ctx.arc(445,730,50,0,2*Math.PI);
      ctx.fillStyle = grd;
      ctx.fill();
      ctx.stroke();
    }

  }



  surfaceDraw(ctx){
    if (this.surface.length === 0){
      this.surface = this.points();
    }
    ctx.moveTo(0,620);
    ctx.fillStyle = "none";
    ctx.strokeStyle = "white";
    this.surface.forEach(point => {
      ctx.lineTo(point[0],point[1]);
      ctx.stroke();
    });
    ctx.lineTo(1300,618);
    ctx.closePath();
  }

  draw(ctx){
    ctx.fillStyle = "black";
    ctx.fillRect(0,0,1300,615);
    ctx.closePath();
    const earth = new Image();
    earth.src = "images/lander.png";
    ctx.drawImage(earth,180,0,65, 35, 1200, 50,65,45);
    if (this.lander.landed == false){
      this.move();
    }
    ctx.clearRect(this.lander.pos[0],this.lander.pos[1],20,20);
    ctx.fillRect(this.lander.pos[0],this.lander.pos[1],25,25);
    this.lander.draw(ctx);
    ctx.closePath();
    this.instrumentDraw(ctx);
  }

  preview(ctx){
    ctx.clearRect(0,0,Game.X_DIMENSION,Game.Y_DIMENSION);
    ctx.fillStyle = "black";
    ctx.fillRect(0,0,1300,615);
    const earth = new Image();
    earth.src = "images/lander.png";
    ctx.drawImage(earth,180,0,65, 35, 1200, 50,65,45);
    const cm = new Image();
    cm.src = "images/lander.png";
    ctx.drawImage(cm,0,0,20, 50, this.cm.pos[0],this.cm.pos[1],20,50);
    this.cm.pos[0]+=2;
    if(this.cm.pos[0]==1300){
      this.cm.pos[0]= -500;
    }
    ctx.fillStyle = "green";
    ctx.font = "50px Andale Mono";
    ctx.fillText(`Click to Start Landing Sequence`,200,550);
    ctx.closePath();
  }

  move(){
    this.lander.move([this.lander.velo[0],this.lander.velo[1]]);
    if(this.lander.pos[0] == 1300){
      this.lander.pos[0]= 0;
    }
  }

  points(){
    var points = [];
    var xCoord = 0;
    for (var i = 0; i < 64; i++) {
      // the argument defines highest possible elevation.
      const minElevation = 600;
      const maxElevation = 500;
      const roll = Math.floor(Math.random() * (21));
        if(roll === 20){
          var yCoord = points[points.length-1][1];
        } else {
          yCoord = Math.floor(Math.random() * (maxElevation-minElevation) + minElevation);
    }
      points.push([xCoord,yCoord]);
      xCoord += 30;
    }
    return points;
  }


}

Game.X_DIMENSION = 1300;
Game.Y_DIMENSION = 800;
Game.FPS = 60;

module.exports = Game;


/***/ }),

/***/ "./lib/game_view.js":
/*!**************************!*\
  !*** ./lib/game_view.js ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const Game = __webpack_require__(/*! ./game.js */ "./lib/game.js");
const Sound = __webpack_require__(/*! ./sound.js */ "./lib/sound.js");

class GameView{
  constructor(game, ctx){
    this.ctx = ctx;
    this.game = new Game();
    this.lander = this.game.lander;
    this.rocketSound = new Sound('rocket-sound.mp3');
    // this.splashTheme = new Sound('theme.m4a');
    }

    handleInput(){
      document.addEventListener("keydown", this.keyDownHandler.bind(this));
      document.addEventListener("keyup", this.keyUpHandler.bind(this));
    }

    keyDownHandler(e) {
      if (e.keyCode == 38) {
        e.preventDefault();
          if (this.lander.fuel > 0){
            this.lander.engineOn = true;
            this.rocketSound.play();
          }
      }
      if (e.keyCode == 39){
        e.preventDefault();
        this.lander.rotateRight = true;
      }
      if (e.keyCode == 37){
        e.preventDefault();
        this.lander.rotateLeft = true;
      }
      if (e.keyCode == 40){
        e.preventDefault();
      }
    }
    keyUpHandler(e) {
      if (e.keyCode == 38) {
        e.preventDefault();
        this.lander.engineOn = false;
        this.rocketSound.stop();
      }
      if (e.keyCode == 39){
        e.preventDefault();
        this.lander.rotateRight = false;
      }
      if (e.keyCode == 37){
        e.preventDefault();
        this.lander.rotateLeft = false;
      }
      if (e.keyCode == 40){
        e.preventDefault();
      }
    }
  preview(ctx){
    requestAnimationFrame(this.splash.bind(this));
  }

  splash(){
    this.game.preview(this.ctx);
    requestAnimationFrame(this.splash.bind(this));
  }


  start(ctx){
    let theme = document.getElementById('theme');
    theme.autoplay = true;
    // theme.fastSeek(10);
    theme.play();
    this.game.surfaceDraw(this.ctx);
    this.ctx.closePath();
    requestAnimationFrame(this.animate.bind(this));
  }

  showLanding(){
    this.game.draw(this.ctx);
    this.game.surfaceDraw(this.ctx);
    this.lander.fly();
    requestAnimationFrame(this.showLanding.bind(this));

  }

  animate(){
    this.game.draw(this.ctx);
    this.handleInput();
    this.lander.checkLanding(this.ctx);
    this.lander.fly();
    if (this.lander.gameOver == true){
      location.reload();
    }
    if (this.lander.landed == true){
      this.showLanding();
    }
    requestAnimationFrame(this.animate.bind(this));
  }


}



module.exports = GameView;


/***/ }),

/***/ "./lib/lander.js":
/*!***********************!*\
  !*** ./lib/lander.js ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const Sound = __webpack_require__(/*! ./sound.js */ "./lib/sound.js");
class Lander {
  constructor(options){
    this.height = options.height;
    this.width = options.width;
    this.pos = options.pos;
    this.velo = options.velo;
    this.angle = options.angle;
    this.fuel = options.fuel;
    this.engineOn = options.engineOn;
    this.rotateLeft = options.rotateLeft;
    this.rotateRight = options.rotateRight;
    this.landed = options.landed;
    this.gameOver = options.gameOver;
  }

  move(vector){
    const newX = this.pos[0] + vector[0];
    const newY = this.pos[1] + vector[1];
    this.pos[0] = newX;
    this.pos[1] = newY;

    if(this.pos[0] > 1300){
      this.pos[0]= 0;
    }
  }

  draw(ctx){
    const lemImage = new Image();
    lemImage.src = `images/lem${this.angle}.png`;
    const spriteSheet = new Image();
    spriteSheet.src = "images/lander.png";

    const lemSprite = this.sprite({
      context: ctx,
      width: 20,
      height:21,
      image: lemImage
    });
    ctx.drawImage(lemImage,0,0,20,21,this.pos[0],this.pos[1],21,21);
    if (this.landed == true){
      ctx.drawImage(spriteSheet,100,0,30, 20, this.pos[0]+3, this.pos[1]+8,30,20);

      const grd = ctx.createRadialGradient(450,735,50,420,705,50);
      grd.addColorStop(0,"white");
      grd.addColorStop(1,"#42bcf4");
      ctx.beginPath();
      ctx.arc(445,730,50,0,2*Math.PI);
      ctx.fillStyle = grd;
      ctx.fill();
      ctx.stroke();
    }
  }

  sprite(options){
    var that = {};
    that.context = options.context;
    that.width = options.width;
    that.height = options.height;
    that.image = options.image;
    return that;
  }

  fly(){
    if(this.rotateLeft == true){
      this.angle -= 1;
      this.rotateLeft = false;
        if(this.angle == 0){
          this.angle = 16;
        }
    }
    if(this.rotateRight == true){
      this.angle += 1;
      this.rotateRight = false;
      if(this.angle == 17){
        this.angle = 1;
      }
    }

    const thrustMultiplyer = 0.35;
    if(this.engineOn == true  && this.angle < 16){
      this.fuel -= 0.25;
      // this.rocketSound();
        if(this.fuel == 0){
          this.engineOn = false;
        }
      this.velo[0] += Lander.DELTAV[this.angle][1] * thrustMultiplyer;
      this.velo[1] += Lander.DELTAV[this.angle][0] * thrustMultiplyer;
    } else if (this.engineOn == true && this.angle == 16){
      this.fuel -= 0.25;
      // this.rocketSound();
      this.velo[0] += Lander.DELTAV[16][1] * thrustMultiplyer;
      this.velo[1] += Lander.DELTAV[16][0] * thrustMultiplyer;
      this.fuel -= 0.25;
      if(this.fuel == 0){
        this.engineOn = false;
      }
    }
    // this is gravity
    if(this.landed == false){
      this.velo[1]+= 0.0025;
    }
  }

  checkLanding(ctx){
    if(ctx.isPointInPath(this.pos[0] + 21,this.pos[1]+21)){
      if(this.angle == 1 && this.velo[1] < 0.25 && this.velo[0] < 0.25 && ctx.isPointInPath(this.pos[0],this.pos[1]+21)){
        this.landed = true;
        this.velo = [0,0];
      }else{
        this.this.gameOver = true;
      }
    }
  }

  startRocketSound(){
    const rocketSound = new Sound("rocket-sound.mp3");
    rocketSound.play();
  }

  stopRocketSound(){
    const rocketSound = new Sound("rocket-sound.mp3");
    rocketSound.stop();
  }




}
Lander.DELTAV={
  1: [-0.02,0],
  2: [-0.015,0.005],
  3: [-0.01,0.01],
  4: [-0.005,0.015],
  5: [0,0.02],
  6: [0.005,0.015],
  7: [0.01,0.01],
  8: [0.015,0.005],
  9: [0.02,0],
  10: [0.015,-0.005],
  11: [0.01,-0.01],
  12: [0.005,-0.015],
  13: [0,-0.020],
  14: [-0.005,-0.015],
  15: [-0.01,-0.01],
  16: [-0.015,-0.005]
};


module.exports = Lander;


/***/ }),

/***/ "./lib/sound.js":
/*!**********************!*\
  !*** ./lib/sound.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports) {

class Sound {
  constructor(src){
    this.sound = document.createElement("audio");
    this.sound.src = src;
    this.sound.setAttribute("preload", "auto");
    this.sound.setAttribute("controls", "none");
    this.sound.style.display = "none";
    document.body.appendChild(this.sound);
  }
    play(){
      this.sound.play();
    }

    stop(){
      this.sound.pause();
    }
}

module.exports = Sound;


/***/ })

/******/ });
//# sourceMappingURL=bundle.js.map