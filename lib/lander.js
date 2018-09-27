class Lander {
  constructor(options){
    this.pos = options.pos;
    this.velo = options.velo;
    this.angle = options.angle;
    this.fuel = options.fuel;
    this.engineOn = options.engineOn;
  }

  move(vector){
    const newX = this.pos[0] + vector[0];
    const newY = this.pos[1] + vector[1];
    this.pos[0] = newX;
    this.pos[1] = newY;
  }

  draw(ctx){
    ctx.fillStyle = "gold";
    ctx.fillRect(this.pos[0],this.pos[1], 12,15);
  }

}

module.exports = Lander;
