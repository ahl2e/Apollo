const Game = require("./game.js");
const GameView = require("./game_view");

document.addEventListener("DOMContentLoaded", () => {
  const canvasEl = document.getElementsByTagName("canvas")[0];
  canvasEl.width = Game.X_DIMENSION;
  canvasEl.height = Game.Y_DIMENSION;
  const landerEl = document.getElementsByTagName('lander'[0]);
  landerEl.width = Game.X_DIMENSION;
  landerEl.height = Game.Y_DIMENSION;
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
