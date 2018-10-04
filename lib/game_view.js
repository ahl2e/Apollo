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
            this.rocketSound.play();
          }
      }
      if (e.keyCode == 39){
        e.preventDefault();
        this.lander.rotateRight = true;
      }
      if (e.keyCode == 37){
        e.preventDefault();
        this.lander.rotateLeft = true;
      }
      if (e.keyCode == 40){
        e.preventDefault();
      }
      if (e.keyCode == 77){
        e.preventDefault();
        this.togglePlay();

    }

}
    togglePlay(){
      const toggle = document.getElementById("music-toggle");
      if(this.theme.paused ){
        this.theme.play();
        $(toggle).toggleClass("off");
        return;
      }else{
        this.theme.pause();
        $(toggle).toggleClass("off");
        return;
      }
    }

    keyUpHandler(e) {
      if (e.keyCode == 38) {
        e.preventDefault();
        this.lander.engineOn = false;
        this.rocketSound.stop();
      }
      if (e.keyCode == 39){
        e.preventDefault();
        this.lander.rotateRight = false;
      }
      if (e.keyCode == 37){
        e.preventDefault();
        this.lander.rotateLeft = false;
      }
      if (e.keyCode == 40){
        e.preventDefault();
      }

    }
  preview(ctx){
    // debugger
    this.splash();
  }

  splash(){
    // debugger
    let theme = document.getElementById('theme');
    // document.getElementById("music-toggle").addEventListener("click",theme.play())
    this.game.preview(this.ctx);
    requestAnimationFrame(this.splash.bind(this));
  }


  start(ctx){
    // let theme = document.getElementById('theme');
    this.theme.autoplay = true;
    this.theme.play();
    this.game.surfaceDraw(this.ctx);
    this.ctx.closePath();
    requestAnimationFrame(this.animate.bind(this));
  }

  showLanding(){
    this.game.draw(this.ctx);
    this.game.surfaceDraw(this.ctx);
    // window.setTimeout(this.lander.resetLander,3000);
  }

  animate(){
    let frames;
    if (this.lander.landed == false){
    this.game.draw(this.ctx);
    this.handleInput();
    this.lander.checkLanding(this.ctx);
    this.lander.fly();
    }else{
      this.showLanding();
      cancelAnimationFrame(frames);
      setTimeout(this.resetLander.bind(this),3001);
    }
    if (this.lander.gameOver == true){
      location.reload();
    }
    frames = requestAnimationFrame(this.animate.bind(this));
  }

  resetLander(){
    // debugger
    this.lander.landed = false;
    this.lander.pos = [0,10];
    this.lander.velo = [1,0];
    this.lander.angle = 13;
    // this.animate();
  }


}



module.exports = GameView;
