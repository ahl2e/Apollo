const Lander = require("./lander");



// ctx.fillStyle = "red";
// ctx.fillRect(0, 0, 300, 150);


class Game{
  constructor() {
    this.lander = [];
  }

  addLander(){
    const lander = new Lander({
      pos: [5, 50],
      velo:[10, 0],
      heading: 270,
      fuel: 1000
    });
    this.lander.push(lander);
  }

  draw(ctx){
    ctx.clearRect(0,0,Game.X_DIMENSION,Game.Y_DIMENSION);
    context.beginPath();
    context.arc(x, 100, 25, 0, 2*Math.PI);
    context.fillStyle = "black";
    context.fill();

  }

  move(){
    this.lander.move();
  }

}

Game.X_DIMENSION = 1300;
Game.Y_DIMENSION = 615;
Game.FPS = 60;


module.exports = Game;
