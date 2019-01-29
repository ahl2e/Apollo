const Game = require("./game.js");
const GameView = require("./game_view");
const PracticeView = require("./practice_view");
const Practice = require("./practice.js");

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

keyDownHandler = (e) =>{
  if (e.keyCode == 13) {
    e.preventDefault;
    const canvasEl = document.getElementsByTagName("canvas")[0];
    canvasEl.width = Practice.X_DIMENSION;
    canvasEl.height = Practice.Y_DIMENSION;
    const ctx = canvasEl.getContext("2d");
    const practice = new Practice();
    const session = new PracticeView(practice,ctx);
    session.start();
  }
};

document.addEventListener("click", () => {
  const canvasEl = document.getElementsByTagName("canvas")[0];
  canvasEl.width = Game.X_DIMENSION;
  canvasEl.height = Game.Y_DIMENSION;
  const ctx = canvasEl.getContext("2d");
  const game = new Game();
  const session = new GameView(game,ctx);
  session.start();
});

document.addEventListener("keydown", keyDownHandler.bind(this));
