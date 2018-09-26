const canvas = document.getElementById("game-canvas");
const c = canvas.getContext("2d");

// c.rect(100, 100, 100, 100);
// c.fillStyle = "white";
// c.fill();

c.fillStyle = '#ccddff';
c.beginPath();
c.moveTo(50,20);
c.lineTo(220,50);
c.lineTo(150,80);
c.closePath();
c.fill();
c.strokeStyle = 'rgb(0,128,0)';
c.lineWidth = 5;
c.stroke();


module.exports = Game;
