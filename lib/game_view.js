const Game = require("./game.js");

class GameView{
  constructor(game, ctx){
    this.ctx = ctx;
    this.game = game;
    this.lander = this.game.lander;
  }

  start(ctx){
    setInterval(Game.prototype.draw(ctx), 1000/Game.FPS);
  }
}

module.exports = GameView;
