const Game = require("./game.js");

class GameView{
  constructor(game, ctx){
    this.ctx = ctx;
    this.game = new Game();
    this.lander = this.game.lander;
    this.rightPressed = false;
    this.leftPressed = false;
    this.throttle = false;
    }

    handleInput(){
      document.addEventListener("keydown", this.keyDownHandler);
      document.addEventListener("keyup", this.keyUpHandler);
    }

    keyDownHandler(e) {

      if (e.keyCode == 38) {
        this.throttle = true;
      }
      if (this.keyCode == 39){
        this.rightPressed = true;
      }
      if (this.keyCode == 37){
        this.leftPressed = true;
      }
    }
    keyUpHandler(e) {

      if (e.keyCode == 38) {
        this.throttle = false;
      }
      if (this.keyCode == 39){
        this.rightPressed = false;
      }
      if (this.keyCode == 37){
        this.leftPressed = false;
      }
    }

  start(ctx){
    requestAnimationFrame(this.animate.bind(this));
  }

  animate(){
    this.game.step();
    this.handleInput();
    this.game.draw(this.ctx);
    requestAnimationFrame(this.animate.bind(this));
  }



}

module.exports = GameView;
