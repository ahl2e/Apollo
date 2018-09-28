const Game = require("./game.js");

class GameView{
  constructor(game, ctx){
    this.ctx = ctx;
    this.game = new Game();
  }


  start(ctx){
    requestAnimationFrame(this.animate.bind(this));
  }

  animate(){
    this.game.step();
    this.game.draw(this.ctx);
    requestAnimationFrame(this.animate.bind(this));
  }
}

module.exports = GameView;
