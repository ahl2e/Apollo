const Game = require("./game.js");
const Sound = require("./sound.js");

class GameView{
  constructor(game, ctx){
    this.ctx = ctx;
    this.game = new Game();
    this.lander = this.game.lander;
    this.rocketSound = new Sound('rocket-sound.mp3');
    this.theme = document.getElementById('theme');
    }

    handleInput(){
      document.addEventListener("keydown", this.keyDownHandler.bind(this));
      document.addEventListener("keyup", this.keyUpHandler.bind(this));
    }

    keyDownHandler(e) {
      if (e.keyCode == 38) {
        e.preventDefault();
          if (this.lander.fuel > 0){
            this.lander.engineOn = true;
            if (this.lander.engineOn == true){
              this.rocketSound.play();
            }else{
              this.rocketSound.stop();
            }
          }
      }
      if (e.keyCode == 39){
        e.preventDefault();
        this.lander.rotateRight = true;
      }else if(e.keyCode == 37){
        e.preventDefault();
        this.lander.rotateLeft = true;
      } else if(e.keyCode == 40){
        e.preventDefault();
      }else if (e.keyCode == 32){
        e.preventDefault();
        location.reload();
      }else if (e.keyCode == 77){
        e.preventDefault();
        this.togglePlay();

    }

}
    togglePlay(){
      const toggle = document.getElementById("music-toggle");
      if(this.theme.volume == 1){
        this.theme.volume = 0;
        $(toggle).toggleClass("off");
      }else{
        this.theme.volume = 1;
        $(toggle).toggleClass("off");
      }
    }

    keyUpHandler(e) {
      if (e.keyCode == 38) {
        e.preventDefault();
        this.lander.engineOn = false;
        this.rocketSound.stop();
      } else if (e.keyCode == 39){
        e.preventDefault();
        this.lander.rotateRight = false;
      } else if (e.keyCode == 37){
        e.preventDefault();
        this.lander.rotateLeft = false;
      } else if (e.keyCode == 40){
        e.preventDefault();
      }

    }
  preview(ctx){
    this.splash();
  }

  splash(){
    let theme = document.getElementById('theme');
    // document.getElementById("music-toggle").addEventListener("click",theme.play())
    this.game.preview(this.ctx);
    this.handleInput();
    window.frames = requestAnimationFrame(this.splash.bind(this));
  }


  start(ctx){
    window.cancelAnimationFrame(window.frames);
    this.theme.autoplay = true;
    this.theme.play();
    this.ctx.closePath();
    this.animate();
    this.game.surfaceDraw(this.ctx);
  }

  showLanding(){
    this.game.draw(this.ctx);
    this.game.surfaceDraw(this.ctx);
    if (this.lander.gameOver == true && this.lander.fuel < 1){
      this.ctx.fillStyle = "green";
      this.ctx.font = "50px Share Tech Mono";
      this.ctx.fillText(`You're Ready to Launch, Commander`,200,300);
      this.ctx.font = "30px Share Tech Mono";
      this.ctx.fillText(`Press Space to Play Again`,200,400);
    }else{
      setTimeout(this.resetLander.bind(this),2000);
    }
  }

  showCrash(){
    this.game.draw(this.ctx);
    this.ctx.fillStyle = "red";
    this.ctx.font = "50px Share Tech Mono";
    this.ctx.fillText(`CRASH`,300,300);
    this.ctx.fillStyle = "white";
    this.ctx.font = "30px Share Tech Mono";
    this.ctx.fillText(`100 fuel lost`,300,400);
    this.ctx.closePath();
    this.game.surfaceDraw(this.ctx);
    cancelAnimationFrame(window.frames);
    setTimeout(this.resetLander.bind(this),900);
  }

  gameEnd(){
    this.game.draw(this.ctx);
    this.ctx.fillStyle = "red";
    this.ctx.font = "50px Share Tech Mono";
    this.ctx.fillText(`Game Over`,300,300);
    this.ctx.fillStyle = "white";
    this.ctx.font = "30px Share Tech Mono";
    this.ctx.fillText(`Final Score: ${Math.floor(this.lander.score)}`,300,400);
    this.ctx.fillText(`Press Space to Play Again`,300,400);
    this.ctx.closePath();
    this.game.surfaceDraw(this.ctx);
    cancelAnimationFrame(window.frames);
  }

  animate(){
    // window.frames = requestAnimationFrame(this.animate.bind(this));
    this.ctx.fillStyle = "black";
    this.ctx.fillRect(0,0,1300,615);
    this.ctx.fillStyle = "green";
    this.ctx.font = "25px Share Tech Mono";
    this.ctx.fillText(`Score: ${Math.floor(this.lander.score)}`,50,70);
    this.ctx.fillStyle = "black";
    if (this.lander.gameOver == true){
        if (this.lander.landed == true){
          this.showLanding();
          cancelAnimationFrame(window.frames);
        }else if (this.lander.fuel < 1) {
          this.gameEnd();
        }else{
          this.showCrash();
          cancelAnimationFrame(window.frames);
        }
      }else{
        this.game.draw(this.ctx);
        this.handleInput();
        this.lander.checkLanding(this.ctx);
        this.lander.fly();
      }
      window.frames = requestAnimationFrame(this.animate.bind(this));
    }



  resetLander(){
    this.lander.gameOver = false;
    this.lander.landed = false;
    this.lander.crashed = false;
    this.lander.pos = [0,10];
    this.lander.velo = [1,0];
    this.lander.angle = 13;
  }
}





module.exports = GameView;
