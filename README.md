# Apollo

Live!: (https://www.adamhlong.com/Apollo/)


Apollo is a version of the old arcade classic 'Lunar Lander'.  Players take control of a lander and are tasked with finding a landing site on the moon and landing softly.

  * Players take control of the Lunar Landing Simulator to qualify for their mission.
  * Players attempt to make three successful landings with limited fuel.



## Functionality

  * HTML Canvas to render space and lunar surface
  * Lander can rotate and thrust in a single direction
  * Lunar surface is procedurally generated with each new game.
  * Velocity of the lander adjusts with every frame allowing for fluid feeling physics.

  
  * Instrument panel displays, horizontal speed, vertical speed, remaining fuel, and contact light.

## Technologies

  * Canvas to render game screen and lander
  * JavaScript to handle game logic.

## Architecture

  * apollo.js
  * lander.js (keeps track of position, rotation, and vector)
  * gameview.js
  * game.js
  * sound.js
