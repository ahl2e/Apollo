# Apollo

![Apollo Logo](https://github.com/ahl2e/Apollo/raw/master/images/Apollo_logo.png)

Live!: (https://www.adamhlong.com/Apollo/)


Apollo is a version of the old arcade classic 'Lunar Lander'.  Players take control of a lander and are tasked with finding a landing site on the moon and landing softly.

  * Players take control of the Lunar Landing Simulator to qualify for their mission.
  * Players attempt to make three successful landings with limited fuel.

  ![Apollo Screenshot](https://github.com/ahl2e/Apollo/raw/master/images/Screen_Shot.jpg)


## Functionality

  * HTML Canvas to render space and lunar surface
  * Lander can rotate and thrust in a single direction
  * Lunar surface is procedurally generated with each new game.  The collection of points which make up the terrain are created on initialization of the game.  In order to create landing zones, there is a dice roll ensures the elevation of a point is the same as the previous point creating a flat zone.
  ```javascript
  points(){
    var points = [];
    var xCoord = 0;
    for (var i = 0; i < 64; i++) {
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
  ```
  * Velocity of the lander adjusts with every frame allowing for fluid feeling physics.

  ```javascript
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

  Lander.DELTAV={
    1: [-8,0],
    2: [-6,2],
    3: [-4,4],
    4: [-2,6],
    5: [0,8],
    6: [2,6],
    7: [4,4],
    8: [6,2],
    9: [8,0],
    10: [6,-2],
    11: [4,-4],
    12: [2,-6],
    13: [0,-8],
    14: [-2,-6],
    15: [-4,-4],
    16: [-6,-2]
  };
  ```

  * Instrument panel displays, horizontal speed, vertical speed, remaining fuel, and contact light.

## Technologies

  * Canvas to render game screen and lander
  * JavaScript to handle game logic.
