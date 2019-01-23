const Lander = require("./lander");

class Game{
  constructor() {
    this.lander = new Lander({
      height:30,
      width:20,
      pos:[10,10],
      velo:[1,0],
      angle:13,
      fuel:650,
      engineOn:false,
      rotateLeft: false,
      rotateRight:false,
      landed: false,
      gameOver: false,
      crashed: false,
      landings:0,
      score:0
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
      landed: false,
      crashed: false,
      gameOver: false,
    });
    this.surface = [];
    this.surface = this.points();
  }

  instrumentDraw(ctx){
    ctx.fillStyle = "grey";
    ctx.fillRect(0,620,1300,250);
    ctx.fillStyle = "white";
    ctx.fillRect(0,625,320,100);
    ctx.fillStyle = "black";
    ctx.font = "13px Share Tech Mono";
    ctx.fillText("Land on the Moon without crashing",8,640);
    ctx.fillText("Left and Right arrow keys rotate lander.",8,670);
    ctx.fillText("Up arrow activates thrust",8,700);
    ctx.font = " bold 20px Share Tech Mono, sans-serif";

    ctx.fillText("Lunar Contact",380,660);
    // ctx.beginPath();
    // ctx.arc(445,730,50,0,2*Math.PI);
    ctx.closePath();
    ctx.fillStyle = "grey";
    // ctx.fill();
    ctx.stroke();
    ctx.fillStyle = "black";
    ctx.font = "18px Noto Sans, sans-serif";
    ctx.fillText("Fuel Remaining",605,660);
    ctx.fillText("Vertical Velocity",810,660);
    ctx.fillText("Horizontal Velocity",1030,660);
    ctx.fillRect(570,680,200,80);
    ctx.fillRect(790,680,200,80);
    ctx.fillRect(1010,680,200,80);

    ctx.fillStyle = "green";
    ctx.font = "50px Share Tech Mono";
    // ctx.fillText(`${Math.floor(this.lander.fuel)}`,630,735);
    if(this.lander.fuel < 100){
      ctx.fillStyle = "red";
      ctx.fillText(`${Math.floor(this.lander.fuel)}`,630,735);
    }else{
      ctx.fillStyle = "green";
      ctx.fillText(`${Math.floor(this.lander.fuel)}`,630,735);
    }

      if(this.lander.velo[1] > 0.25){
        ctx.fillStyle = "red";
        ctx.fillText(`${Math.floor(this.lander.velo[1]*100)}`,810,735);
      }else{
        ctx.fillStyle = "green";
        ctx.fillText(`${Math.floor(this.lander.velo[1]*100)}`,810,735);
      }
      if(this.lander.velo[0] > 0.25){
        ctx.fillStyle = "red";
        ctx.fillText(`${Math.floor(this.lander.velo[0]*100)}`,1025,735);
      }else{
        ctx.fillStyle = "green";
        ctx.fillText(`${Math.floor(this.lander.velo[0]*100)}`,1025,735);
      }
      ctx.fillStyle = "green";
    ctx.fillText(`m/s`,1120,735);
    ctx.fillText(`m/s`,890,735);
    if (this.lander.landed == true){
      const grd = ctx.createRadialGradient(450,735,50,420,705,50);
      grd.addColorStop(0,"grey");
      grd.addColorStop(1,"#42bcf4");
      ctx.beginPath();
      ctx.arc(445,730,50,0,2*Math.PI);
      ctx.fillStyle = grd;
      ctx.fill();
      ctx.stroke();
      ctx.closePath();
    }

  }



  surfaceDraw(ctx){
    ctx.moveTo(0,620);
    // ctx.fillStyle = "none";
    var lastHeight = 0;
    this.surface.forEach(point => {
      ctx.strokeStyle = "white";
      ctx.lineTo(point[0],point[1]);
      if(point[1] == lastHeight){
        ctx.font = "12px Share Tech Mono";
        ctx.fillText('LZ', point[0]-20,point[1]+ 20);
      }
      lastHeight = point[1];
      ctx.stroke();
    });
    ctx.lineTo(1300,618);
    ctx.closePath();
  }

  draw(ctx){
    // ctx.fillStyle = "black";
    // ctx.fillRect(0,0,1300,615);
    ctx.closePath();
    const earth = new Image();
    earth.src = "images/lander.png";
    ctx.drawImage(earth,180,0,65, 35, 1200, 50,65,45);
    if (this.lander.landed == false){
      this.move();
    }
    ctx.clearRect(this.lander.pos[0],this.lander.pos[1],20,20);
    ctx.fillRect(this.lander.pos[0],this.lander.pos[1],25,25);
    this.lander.draw(ctx);
    ctx.closePath();
    this.instrumentDraw(ctx);
    // this.surfaceDraw(ctx);
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
    ctx.font = "40px Share Tech Mono";
    ctx.fillText('Welcome to the Lunar Landing Simulator', 200,180);
    ctx.fillStyle = "white";
    ctx.font = "25px Share Tech Mono";
    ctx.fillText('Directions', 200,240);
    ctx.font = "17px Share Tech Mono";
    ctx.fillText('1) Find a suitable flat landing zone.', 200, 270);
    ctx.fillText("2) If you pass your landing zone, don't worry.  The moon is a circle.  You'll come back around."  , 200, 300);
    ctx.fillText('3) Slow down to fall out of orbit.', 200, 330);
    ctx.fillText('4) Come down softly and land with less than 10 m/s of vertical velocity.', 200, 360);
    ctx.fillText('5) Land Succesfully to gain points', 200, 390);
    ctx.fillText('6) Land as many times as you can before running out of fuel', 200, 420);


    ctx.fillStyle = "green";
    ctx.font = "50px Share Tech Mono";
    ctx.fillText(`Click to Start Training Sequence`,200,550);
    ctx.closePath();
  }

  move(){
    this.lander.move([this.lander.velo[0],this.lander.velo[1]]);
    if(this.lander.pos[0] == 1300){
      this.lander.pos[0]= 0;
    }
  }

  points(){
    var points = [];
    var xCoord = 0;
    for (var i = 0; i < 64; i++) {
      // the argument defines highest possible elevation.
      const minElevation = 600;
      const maxElevation = 500;
      const roll = Math.floor(Math.random() * (21));
        if(roll > 15 && points.length > 2){
          var yCoord = points[points.length-1][1];
        } else {
          yCoord = Math.floor(Math.random() * (maxElevation-minElevation) + minElevation);
    }
      points.push([xCoord,yCoord]);
      xCoord += 30;
    }
    return points;
  }


}

Game.X_DIMENSION = 1300;
Game.Y_DIMENSION = 800;
Game.FPS = 60;

module.exports = Game;
