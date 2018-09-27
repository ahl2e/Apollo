class Lander {
  constructor(options){
    this.pos = options.pos;
    this.velo = options.velo;
    this.angle = options.angle;
    this.fuel = options.fuel;
    this.engineOn = false;
  }

  move(){

  }

  draw(ctx){
    ctx.fillRect(this.pos[0],this.pos[1], 25,25);
  }

}

module.exports = Lander;
