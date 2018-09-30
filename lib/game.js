const Lander = require("./lander");

class Game{
  constructor() {
    this.lander = new Lander({
      height:30,
      width:20,
      pos:[10,10],
      velo:[1,0],
      angle:13,
      fuel:1000,
      engineOn:false,
      rotateLeft: false,
      rotateRight:false,
      landed: false
    });
  }

  draw(ctx){
    ctx.clearRect(0,0,Game.X_DIMENSION,Game.Y_DIMENSION);
    this.move();
    this.lander.draw(ctx);
    const earth = new Image();
    earth.src = "images/lander.png";
    ctx.drawImage(earth,180,0,65, 35, 1200, 50,65,45);

  }

  move(){
    this.lander.move([this.lander.velo[0],this.lander.velo[1]]);
    if(this.lander.pos[0] == 1300){
      this.lander.pos[0]= 0;
    }
  }

}

Game.X_DIMENSION = 1300;
Game.Y_DIMENSION = 615;
Game.FPS = 60;

module.exports = Game;
