# Apollo

## Background

Apollo is a version of the old arcade classic 'Lunar Lander'.  Players take control of a lander and are tasked with finding a landing site on the moon and landing softly.

  * Players attempt to make three successful landings with limited fuel.


## Functionality

  * HTML Canvas to render space and lunar surface
  * Lander can rotate and thrust in a single direction
  * Simulated gravity adjusts with vertical speed.
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
