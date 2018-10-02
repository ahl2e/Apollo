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
    this.cm = new Lander({
      height:30,
      width:20,
      pos:[10,80],
      velo:[1,0],
      angle:13,
      fuel:1000,
      engineOn:false,
      rotateLeft: false,
      rotateRight:false,
      landed: false
    });
  }

  instrumentDraw(ctx){
    ctx.fillStyle = "grey";
    ctx.fillRect(0,620,1300,250);
    ctx.fillStyle = "white";
    ctx.fillRect(0,625,320,100);
    ctx.fillStyle = "black";
    ctx.font = "13px Andale Mono";
    ctx.fillText("Land on the Moon without crashing",8,640);
    ctx.fillText("Left and Right arrow keys rotate lander.",8,670);
    ctx.fillText("Up arrow activates thrust",8,700);
    ctx.font = " bold 20px Noto Sans, sans-serif";

    ctx.fillText("Lunar Contact",380,660);
    ctx.arc(445,730,50,0,2*Math.PI);
    ctx.fillStyle = "grey";
    ctx.fill();
    ctx.stroke();
    if (this.lander.landed == true){
      const grd = ctx.createRadialGradient(450,735,50,420,705,50);
      grd.addColorStop(0,"grey");
      grd.addColorStop(1,"#42bcf4");
      ctx.beginPath();
      ctx.arc(445,730,50,0,2*Math.PI);
      ctx.fillStyle = grd;
      ctx.fill();
      ctx.stroke();
  }
    ctx.fillStyle = "black";
    ctx.font = "18px Noto Sans, sans-serif";
    ctx.fillText("Fuel Remaining",605,660);
    ctx.fillText("Vertical Velocity",810,660);
    ctx.fillText("Horizontal Velocity",1030,660);
    ctx.fillRect(570,680,200,80);
    ctx.fillRect(790,680,200,80);
    ctx.fillRect(1010,680,200,80);

    ctx.fillStyle = "green";
    ctx.font = "50px Andale Mono";
    ctx.fillText(`${Math.floor(this.lander.fuel)}`,630,735);
    ctx.fillText(`${Math.floor(this.lander.velo[1]*100)}`,810,735);
    ctx.fillText(`${Math.floor(this.lander.velo[0]*100)}`,1025,735);
    ctx.fillText(`m/s`,1120,735);
    ctx.fillText(`m/s`,890,735);


  }

  draw(ctx){
    ctx.clearRect(0,0,Game.X_DIMENSION,Game.Y_DIMENSION);
    ctx.fillStyle = "black";
    ctx.fillRect(0,0,1300,615);
    const earth = new Image();
    earth.src = "images/lander.png";
    ctx.drawImage(earth,180,0,65, 35, 1200, 50,65,45);
    this.move();
    this.lander.draw(ctx);
    this.instrumentDraw(ctx);
  }

  preview(ctx){
    ctx.clearRect(0,0,Game.X_DIMENSION,Game.Y_DIMENSION);
    ctx.fillStyle = "black";
    ctx.fillRect(0,0,1300,615);
    const earth = new Image();
    earth.src = "images/lander.png";
    ctx.drawImage(earth,180,0,65, 35, 1200, 50,65,45);
    const cm = new Image();
    cm.src = "images/lander.png";
    ctx.drawImage(cm,0,0,20, 50, this.cm.pos[0],this.cm.pos[1],20,50);
    this.cm.pos[0]+=2;
    if(this.cm.pos[0]==1300){
      this.cm.pos[0]= -500;
    }
    ctx.fillStyle = "green";
    ctx.font = "50px Andale Mono";
    ctx.fillText(`Click to Start Landing Sequence`,200,550);
  }

  move(){
    this.lander.move([this.lander.velo[0],this.lander.velo[1]]);
    if(this.lander.pos[0] == 1300){
      this.lander.pos[0]= 0;
    }
  }

}

Game.X_DIMENSION = 1300;
Game.Y_DIMENSION = 800;
Game.FPS = 60;

module.exports = Game;
