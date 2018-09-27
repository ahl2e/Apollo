const Game = require("./game.js");

class GameView{
  constructor(game, ctx){
    this.ctx = ctx;
    this.game = new Game();
  }


  start(ctx){
    setInterval(this.game.animate(this.ctx), 162);
    setInterval(console.log("tick"), 1000/Game.FPS);
  }
}

module.exports = GameView;
