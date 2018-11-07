const Sound = require("./sound.js");
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
    this.crashed = options.crashed;
    this.gameOver = options.gameOver;
    this.landings = options.landings;
  }

  move(vector){
    const newX = this.pos[0] + vector[0];
    const newY = this.pos[1] + vector[1];
    this.pos[0] = newX;
    this.pos[1] = newY;

    if(this.pos[0] > 1300){
      this.pos[0] = 0;
    }

    if(this.pos[0] < 0){
      this.pos[0] = 1299;
    }

    if(this.pos[1] < 0){
      this.pos[1] = 0;
      this.velo[1] = 0;
    }
  }

  draw(ctx){
    const lemImage = new Image();
    lemImage.src = `images/lem${this.angle}${this.engineOn}.png`;
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
      ctx.drawImage(spriteSheet,100,0,30, 20, this.pos[0]+3, this.pos[1]+8,30,20);

      const grd = ctx.createRadialGradient(450,735,50,420,705,50);
      grd.addColorStop(0,"white");
      grd.addColorStop(1,"#42bcf4");
      ctx.beginPath();
      ctx.arc(445,730,50,0,2*Math.PI);
      ctx.fillStyle = grd;
      ctx.fill();
      ctx.stroke();
    }
  }

  sprite(options){
    var that = {};
    that.context = options.context;
    that.width = options.width;
    that.height = options.height;
    that.image = options.image;

      that.render = function(pos) {
        that.context.drawImage(
           that.image,
           0,
           0,
           that.width,
           that.height,
           pos[0],
           pos[1],
           that.width,
           that.height);
      };
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

    const thrustMultiplyer = 0.5;
    if(this.fuel < 0){
      this.engineOn = false;
    }
    if(this.engineOn == true  && this.angle < 16){
      this.fuel -= 0.25;
      this.velo[0] += Lander.DELTAV[this.angle][1] * thrustMultiplyer;
      this.velo[1] += Lander.DELTAV[this.angle][0] * thrustMultiplyer;
    } else if (this.engineOn == true && this.angle == 16){
      this.fuel -= 0.25;
      this.velo[0] += Lander.DELTAV[16][1] * thrustMultiplyer;
      this.velo[1] += Lander.DELTAV[16][0] * thrustMultiplyer;
      this.fuel -= 0.25;
      if(this.fuel == 0){
        this.engineOn = false;
      }
    }
    // this is gravity
    if(this.landed == false && this.velo[0] < 1){
      this.velo[1]+= 0.0025;
    }
  }

  checkLanding(ctx){
    if(ctx.isPointInPath(this.pos[0],this.pos[1]+21) || ctx.isPointInPath(this.pos[0] + 21,this.pos[1]+21)){
      if(this.angle == 1 && this.velo[1] < 0.25 && this.velo[0] < 0.25 && ctx.isPointInPath(this.pos[0],this.pos[1]+21) && this.crashed== false){
        this.landed = true;
        this.velo = [0,0];
        this.gameOver = true;
        this.landings ++;
      }else{
        this.gameOver = true;
        this.crashed = true;
        this.velo = [0,0];
      }
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
