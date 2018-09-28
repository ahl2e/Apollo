const Lander = require("./lander");



// ctx.fillStyle = "red";
// ctx.fillRect(0, 0, 300, 150);


class Game{
  constructor() {
    this.lander = new Lander({
      height:30,
      width:20,
      pos:[5,10],
      velo:[1,0],
      angle:13,
      fuel:1000,
      engineOn:false
    });
    
  }



  draw(ctx){
    ctx.clearRect(0,0,Game.X_DIMENSION,Game.Y_DIMENSION);
    // this.lander.rotate(ctx)
    this.lander.draw(ctx);

  }

  move(){
    this.lander.move([this.lander.velo[0],this.lander.velo[1]]);
  }

  step(){
    this.move();
  }

}

Game.X_DIMENSION = 1300;
Game.Y_DIMENSION = 615;
Game.FPS = 60;

module.exports = Game;
