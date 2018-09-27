# Apollo

## Background

Apollo is a version of the old arcade classic 'Lunar Lander'.  Players take control of a lander and are tasked with finding a landing site on the moon and landing softly.

  1. Players gain points by landing without crashing.
  2. Players can multiply their points by landing on smaller flat patches.  
  These zones are marked with the score multiplier.
  3. Players have a limited amount of fuel which carries over through each landing attempt.
  This encourages players to land as efficiently as possible.
  4. Game is over when a player has crashed three times.

## Wireframe
![Wireframe](https://github.com/ahl2e/Apollo/blob/master/Apollo%20wireframe.png "Apollo Wireframe")

## Functionality and MVP

  * HTML Canvas to render space and lunar surface
  * Lander can rotate and thrust in a single direction
  * Simulated gravity adjusts with vertical speed.
  * Instrument panel displays, horizontal speed, vertical speed, remaining fuel, and contact light.

## Technologies

  * Canvas to render game screen and lander
  * JavaScript to handle game logic.

## Architecture

  * screen.js
  * lander.js (keeps track of position, rotation, and vector)

## Timeline
  #### Day 1 - Day is dedicated to learning Canvas.  This includes drawing and animating shapes
  #### Day 2 - Create Lander object and implement physics.
  #### Day 3 - Implement controls for lander
  #### aDay 4 - Implement game restrictions and game rules (fuel, landing limits, lives)

## Bonus
  * Sound effects/music
  * Replace lander with sprite.
