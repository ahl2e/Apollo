const Game = require("./game.js");

class GameView{
  constructor(game, ctx){
    this.ctx = ctx;
    this.game = new Game();
    this.lander = this.game.lander;
    }

    handleInput(){
      document.addEventListener("keydown", this.keyDownHandler.bind(this));
      document.addEventListener("keyup", this.keyUpHandler.bind(this));
    }

    keyDownHandler(e) {
      if (e.keyCode == 38) {
        e.preventDefault();
        this.lander.engineOn = true;
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
    this.game.surfaceDraw(this.ctx);
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
