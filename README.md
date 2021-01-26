# Anaconda Game

Snake x Blockade
Browser-based game built with the Canvas API and javascipt.

## How to Play

1. Use the arrow keys to move your snake around the board.
2. Eat food to grow larger.
3. Outgrow the other snake.
4. The game ends when one of the snake runs into a wall or eats itself or the other.

Play as one of three snakes: Classic, Helpful, Chaotic

## Demo

Play the [demo](https://ncbui.github.io/Anaconda-game/)

## NPC Movement

The Snake NPC uses obstacle detection to find the shortest path to nearby food.

Food Detection:
- on each move, find the nearest pellet
- move towards the pellet
- if an obstacle is detected, change directions and continue to move towards the pellet


When there is possibility of it crashing into things, random direction will be generated for its next move.

