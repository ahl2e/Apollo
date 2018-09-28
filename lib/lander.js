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

    if(this.pos[0]=== 1300){
      this.pos[0]= 0;
    }
  }

  draw(ctx){
    // ctx.fillStyle = "gold";
    // ctx.fillRect(this.pos[0],this.pos[1], 12,15);

    const lemImage = new Image();
    lemImage.src = "images/lander.png";

    const lemSprite = this.sprite({
      context: ctx,
      width: 240,
      height:110,
      image: lemImage
    });

    ctx.drawImage(lemImage, 0, 57,20,30,this.pos[0],this.pos[1],20,30);
  }

  sprite(options){
    var that = {};
    that.context = options.context;
    that.width = options.width;
    that.height = options.height;
    that.image = options.image;

    return that;
  }

  rotate(ctx,delta){
    ctx.rotate(20 * Math.PI / 6);
  }

  thrust(){
    this.engineOn = true;
  }

}

module.exports = Lander;
