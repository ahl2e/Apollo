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
        this.lander.engineOn = true;
      }
      if (e.keyCode == 39){
        this.lander.rotateRight = true;
      }
      if (e.keyCode == 37){
        this.lander.rotateLeft = true;
      }
    }
    keyUpHandler(e) {
      if (e.keyCode == 38) {
        this.lander.engineOn = false;
      }
      if (e.keyCode == 39){
        this.lander.rotateRight = false;
      }
      if (e.keyCode == 37){
        this.lander.rotateLeft = false;
      }
    }
  preview(ctx){
    requestAnimationFrame(this.splash.bind(this));
  }

  splash(){
    this.game.preview(this.ctx);
    this.game.preview(this.ctx);
    requestAnimationFrame(this.splash.bind(this));
  }


  start(ctx){
    requestAnimationFrame(this.animate.bind(this));
  }

  animate(){
    // this.game.move();
    this.game.draw(this.ctx);
    this.handleInput();
    this.lander.checkLanding();
    this.lander.fly();
    requestAnimationFrame(this.animate.bind(this));
  }
}

module.exports = GameView;
