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
  const landerEl = document.getElementsByTagName('lander'[0]);
  landerEl.width = 20;
  landerEl.height = 20;

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
      fuel:650,
      engineOn:false,
      rotateLeft: false,
      rotateRight:false,
      landed: false,
      gameOver: false,
      crashed: false,
      landings:0,
      score:0
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
      crashed: false,
      gameOver: false,
    });
    this.surface = [];
    this.surface = this.points();
  }

  instrumentDraw(ctx){
    ctx.fillStyle = "grey";
    ctx.fillRect(0,620,1300,250);
    ctx.fillStyle = "white";
    ctx.fillRect(0,625,320,100);
    ctx.fillStyle = "black";
    ctx.font = "13px Share Tech Mono";
    ctx.fillText("Land on the Moon without crashing",8,640);
    ctx.fillText("Left and Right arrow keys rotate lander.",8,670);
    ctx.fillText("Up arrow activates thrust",8,700);
    ctx.font = " bold 20px Share Tech Mono, sans-serif";

    ctx.fillText("Lunar Contact",380,660);
    // ctx.beginPath();
    // ctx.arc(445,730,50,0,2*Math.PI);
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
    ctx.font = "50px Share Tech Mono";
    // ctx.fillText(`${Math.floor(this.lander.fuel)}`,630,735);
    if(this.lander.fuel < 100){
      ctx.fillStyle = "red";
      ctx.fillText(`${Math.floor(this.lander.fuel)}`,630,735);
    }else{
      ctx.fillStyle = "green";
      ctx.fillText(`${Math.floor(this.lander.fuel)}`,630,735);
    }

      if(this.lander.velo[1] > 0.25){
        ctx.fillStyle = "red";
        ctx.fillText(`${Math.floor(this.lander.velo[1]*100)}`,810,735);
      }else{
        ctx.fillStyle = "green";
        ctx.fillText(`${Math.floor(this.lander.velo[1]*100)}`,810,735);
      }
      if(this.lander.velo[0] > 0.25){
        ctx.fillStyle = "red";
        ctx.fillText(`${Math.floor(this.lander.velo[0]*100)}`,1025,735);
      }else{
        ctx.fillStyle = "green";
        ctx.fillText(`${Math.floor(this.lander.velo[0]*100)}`,1025,735);
      }
      ctx.fillStyle = "green";
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
      ctx.closePath();
    }

  }



  surfaceDraw(ctx){
    ctx.moveTo(0,620);
    // ctx.fillStyle = "none";
    var lastHeight = 0;
    this.surface.forEach(point => {
      ctx.strokeStyle = "white";
      ctx.lineTo(point[0],point[1]);
      if(point[1] == lastHeight){
        ctx.font = "12px Share Tech Mono";
        ctx.fillText('LZ', point[0]-20,point[1]+ 20);
      }
      lastHeight = point[1];
      ctx.stroke();
    });
    ctx.lineTo(1300,618);
    ctx.closePath();
  }

  draw(ctx){
    // ctx.fillStyle = "black";
    // ctx.fillRect(0,0,1300,615);
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
    // this.surfaceDraw(ctx);
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
    ctx.font = "40px Share Tech Mono";
    ctx.fillText('Welcome to the Lunar Landing Simulator', 200,180);
    ctx.fillStyle = "white";
    ctx.font = "25px Share Tech Mono";
    ctx.fillText('Directions', 200,240);
    ctx.font = "17px Share Tech Mono";
    ctx.fillText('1) Find a suitable flat landing zone.', 200, 270);
    ctx.fillText("2) If you pass your landing zone, don't worry.  The moon is a circle.  You'll come back around."  , 200, 300);
    ctx.fillText('3) Slow down to fall out of orbit.', 200, 330);
    ctx.fillText('4) Come down softly and land with less than 10 m/s of vertical velocity.', 200, 360);
    ctx.fillText('5) Land Succesfully to gain points', 200, 390);
    ctx.fillText('6) Land as many times as you can before running out of fuel', 200, 420);


    ctx.fillStyle = "green";
    ctx.font = "50px Share Tech Mono";
    ctx.fillText(`Click to Start Training Sequence`,200,550);
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
        if(roll > 15 && points.length > 2){
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
    this.theme = document.getElementById('theme');
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
            if (this.lander.engineOn == true){
              this.rocketSound.play();
            }else{
              this.rocketSound.stop();
            }
          }
      }
      if (e.keyCode == 39){
        e.preventDefault();
        this.lander.rotateRight = true;
      }else if(e.keyCode == 37){
        e.preventDefault();
        this.lander.rotateLeft = true;
      } else if(e.keyCode == 40){
        e.preventDefault();
      }else if (e.keyCode == 32){
        e.preventDefault();
        location.reload();
      }else if (e.keyCode == 77){
        e.preventDefault();
        this.togglePlay();

    }

}
    togglePlay(){
      const toggle = document.getElementById("music-toggle");
      if(this.theme.volume == 1){
        this.theme.volume = 0;
        $(toggle).toggleClass("off");
      }else{
        this.theme.volume = 1;
        $(toggle).toggleClass("off");
      }
    }

    keyUpHandler(e) {
      if (e.keyCode == 38) {
        e.preventDefault();
        this.lander.engineOn = false;
        this.rocketSound.stop();
      } else if (e.keyCode == 39){
        e.preventDefault();
        this.lander.rotateRight = false;
      } else if (e.keyCode == 37){
        e.preventDefault();
        this.lander.rotateLeft = false;
      } else if (e.keyCode == 40){
        e.preventDefault();
      }

    }
  preview(ctx){
    this.splash();
  }

  splash(){
    let theme = document.getElementById('theme');
    // document.getElementById("music-toggle").addEventListener("click",theme.play())
    this.game.preview(this.ctx);
    this.handleInput();
    window.frames = requestAnimationFrame(this.splash.bind(this));
  }


  start(ctx){
    window.cancelAnimationFrame(window.frames);
    this.theme.autoplay = true;
    this.theme.play();
    this.ctx.closePath();
    this.animate();
    this.game.surfaceDraw(this.ctx);
  }

  showLanding(){
    this.game.draw(this.ctx);
    this.game.surfaceDraw(this.ctx);
    if (this.lander.gameOver == true && this.lander.fuel < 1){
      this.ctx.fillStyle = "green";
      this.ctx.font = "50px Share Tech Mono";
      this.ctx.fillText(`You're Ready to Launch, Commander`,200,300);
      this.ctx.font = "30px Share Tech Mono";
      this.ctx.fillText(`Press Space to Play Again`,200,400);
    }else{
      setTimeout(this.resetLander.bind(this),2000);
    }
  }

  showCrash(){
    this.game.draw(this.ctx);
    this.ctx.fillStyle = "red";
    this.ctx.font = "50px Share Tech Mono";
    this.ctx.fillText(`CRASH`,300,300);
    this.ctx.fillStyle = "white";
    this.ctx.font = "30px Share Tech Mono";
    this.ctx.fillText(`100 fuel lost`,300,400);
    this.ctx.closePath();
    this.game.surfaceDraw(this.ctx);
    cancelAnimationFrame(window.frames);
    setTimeout(this.resetLander.bind(this),900);
  }

  gameEnd(){
    this.game.draw(this.ctx);
    this.ctx.fillStyle = "red";
    this.ctx.font = "50px Share Tech Mono";
    this.ctx.fillText(`Game Over`,300,300);
    this.ctx.fillStyle = "white";
    this.ctx.font = "30px Share Tech Mono";
    this.ctx.fillText(`Final Score: ${Math.floor(this.lander.score)}`,300,430);
    this.ctx.fillText(`Press Space to Play Again`,300,400);
    this.ctx.closePath();
    this.game.surfaceDraw(this.ctx);
    cancelAnimationFrame(window.frames);
  }

  animate(){
    // window.frames = requestAnimationFrame(this.animate.bind(this));
    this.ctx.fillStyle = "black";
    this.ctx.fillRect(0,0,1300,615);
    this.ctx.fillStyle = "green";
    this.ctx.font = "25px Share Tech Mono";
    this.ctx.fillText(`Score: ${Math.floor(this.lander.score)}`,50,70);
    this.ctx.fillStyle = "black";
    if (this.lander.gameOver == true){
        if (this.lander.landed == true){
          this.showLanding();
          cancelAnimationFrame(window.frames);
        }else if (this.lander.fuel < 1) {
          this.gameEnd();
        }else{
          this.showCrash();
          cancelAnimationFrame(window.frames);
        }
      }else{
        this.game.draw(this.ctx);
        this.handleInput();
        this.lander.checkLanding(this.ctx);
        this.lander.fly();
      }
      window.frames = requestAnimationFrame(this.animate.bind(this));
    }



  resetLander(){
    this.lander.gameOver = false;
    this.lander.landed = false;
    this.lander.crashed = false;
    this.lander.pos = [0,10];
    this.lander.velo = [1,0];
    this.lander.angle = 13;
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
    this.crashed = options.crashed;
    this.gameOver = options.gameOver;
    this.landings = options.landings;
    this.score = options.score;
  }

  move(vector){
    const newX = this.pos[0] + vector[0];
    const newY = this.pos[1] + vector[1];
    this.pos[0] = newX;
    this.pos[1] = newY;

    if(this.pos[0] > 1300){
      this.pos[0] = 0;
    }

    if(this.pos[0] < 0){
      this.pos[0] = 1299;
    }

    if(this.pos[1] < 0){
      this.pos[1] = 0;
      this.velo[1] = 0;
    }
  }

  draw(ctx){
    const lemImage = new Image();
    lemImage.src = `images/lem${this.angle}${this.engineOn}.png`;
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

      that.render = function(pos) {
        that.context.drawImage(
           that.image,
           0,
           0,
           that.width,
           that.height,
           pos[0],
           pos[1],
           that.width,
           that.height);
      };
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

    const thrustMultiplyer = 0.0013;
    if(this.fuel < 0){
      this.engineOn = false;
    }
    if(this.engineOn == true  && this.angle < 16){
      this.fuel -= 0.25;
      this.velo[0] += Lander.DELTAV[this.angle][1] * thrustMultiplyer;
      this.velo[1] += Lander.DELTAV[this.angle][0] * thrustMultiplyer;
    } else if (this.engineOn == true && this.angle == 16){
      this.fuel -= 0.25;
      this.velo[0] += Lander.DELTAV[16][1] * thrustMultiplyer;
      this.velo[1] += Lander.DELTAV[16][0] * thrustMultiplyer;
      this.fuel -= 0.25;
      if(this.fuel == 0){
        this.engineOn = false;
      }
    }
    // this is gravity
    if(this.landed == false && this.velo[0] < 1){
      this.velo[1]+= 0.0025;
    }
  }

  checkLanding(ctx){
    if(ctx.isPointInPath(this.pos[0],this.pos[1]+21) || ctx.isPointInPath(this.pos[0] + 21,this.pos[1]+21)){
      if(this.angle == 1 && this.velo[1] < 0.25 && this.velo[0] < 0.25 && ctx.isPointInPath(this.pos[0],this.pos[1]+21) && this.crashed== false){
        this.landed = true;
        this.velo = [0,0];
        this.gameOver = true;
        this.landings ++;
        this.score += 50;
      }else{
        this.gameOver = true;
        this.crashed = true;
        this.fuel -=100
        this.velo = [0,0];
      }
    }
  }


}
Lander.DELTAV={
  1: [-8,0],
  2: [-6,2],
  3: [-4,4],
  4: [-2,6],
  5: [0,8],
  6: [2,6],
  7: [4,4],
  8: [6,2],
  9: [8,0],
  10: [6,-2],
  11: [4,-4],
  12: [2,-6],
  13: [0,-8],
  14: [-2,-6],
  15: [-4,-4],
  16: [-6,-2]
};
// Lander.DELTAV={
//   1: [-8,0],
//   2: [-7,1],
//   3: [-6,2],
//   4: [-5,3],
//   5: [-4,4],
//   6: [-3,5],
//   7: [-2,6],
//   8: [-1,7],
//   9: [0,8],
//   10: [1,7],
//   11: [2,6],
//   12: [3,5],
//   13: [4,4],
//   14: [5,3],
//   15: [6,2],
//   16: [7,1],
//   17: [8,0],
//   18: [7,-1],
//   19: [6,-2],
//   20: [5,-3],
//   21: [4,-4],
//   22: [3,-5],
//   23: [2,-6],
//   24: [1,-7],
//   25: [0,-8],
//   26: [-1,-7],
//   27: [-2,-6],
//   28: [-3,-5],
//   29: [-4,-4],
//   30: [-5,-3],
//   31: [-6,-2],
//   32: [-7,-1]
// };


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