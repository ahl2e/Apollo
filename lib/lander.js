class Lander {
  constructor(options){
    this.height = options.height;
    this.width = options.width;
    this.pos = options.pos;
    this.velo = options.velo;
    this.angle = options.angle;
    this.fuel = options.fuel;
    this.engineOn = options.engineOn;
    this.rotateLeft = options.rotateLeft;
    this.rotateRight = options.rotateRight;
    this.landed = options.landed;
  }

  move(vector){
    const newX = this.pos[0] + vector[0];
    const newY = this.pos[1] + vector[1];
    this.pos[0] = newX;
    this.pos[1] = newY;

    if(this.pos[0] > 1300){
      this.pos[0]= 0;
    }
  }

  draw(ctx){
    const lemImage = new Image();
    lemImage.src = `images/lem${this.angle}.png`;
    const spriteSheet = new Image();
    spriteSheet.src = "images/lander.png";

    const lemSprite = this.sprite({
      context: ctx,
      width: 20,
      height:21,
      image: lemImage
    });
    ctx.drawImage(lemImage,0,0,20,21,this.pos[0],this.pos[1],21,21);
    if (this.landed == true){
      ctx.drawImage(spriteSheet,100,0,30, 20, this.pos[0]+30, this.pos[1]+8,30,20);
    }
  }

  sprite(options){
    var that = {};
    that.context = options.context;
    that.width = options.width;
    that.height = options.height;
    that.image = options.image;
    return that;
  }

  fly(){
    if(this.rotateLeft == true){
      this.angle -= 1;
      this.rotateLeft = false;
        if(this.angle == 0){
          this.angle = 16;
        }
    }
    if(this.rotateRight == true){
      this.angle += 1;
      this.rotateRight = false;
      if(this.angle == 17){
        this.angle = 1;
      }
    }

    const thrustMultiplyer = 0.45;
    if(this.engineOn == true  && this.angle < 16){
      this.velo[0] += Lander.DELTAV[this.angle][1] * thrustMultiplyer;
      this.velo[1] += Lander.DELTAV[this.angle][0] * thrustMultiplyer;
    } else if (this.engineOn == true && this.angle == 16){
      this.velo[0] += Lander.DELTAV[16][1] * thrustMultiplyer;
      this.velo[1] += Lander.DELTAV[16][0] * thrustMultiplyer;
    }
    // this is gravity
    this.velo[1]+= 0.0025;
  }

  checkLanding(){
    if(this.pos[1] > 614 - 20){
      if(this.velo[1] > 0.25 || this.velo[0] > 0.25){
        alert("You crashed!");
      }else{
        this.landed = true;
      }
      this.velo = [0,0];
    }
  }
}
Lander.DELTAV={
  1: [-0.02,0],
  2: [-0.015,0.005],
  3: [-0.01,0.01],
  4: [-0.005,0.015],
  5: [0,0.02],
  6: [0.005,0.015],
  7: [0.01,0.01],
  8: [0.015,0.005],
  9: [0.02,0],
  10: [0.015,-0.005],
  11: [0.01,-0.01],
  12: [0.005,-0.015],
  13: [0,-0.020],
  14: [-0.005,-0.015],
  15: [-0.01,-0.01],
  16: [-0.015,-0.005]
};


module.exports = Lander;
