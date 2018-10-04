const Game = require("./game.js");
const Sound = require("./sound.js");

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
