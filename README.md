# Anaconda Game

Blockade meets Snake.
Browser-based game built with the Canvas API and javascipt.

## How to Play

Play as one of three snakes:

- Classic: the classic arcade snake
- Helpful: a helpful buddy who will turn to avoid hitting walls
- Chaotic: this buddy delights in mixing it up a bit. Will turn in a random direction every now and then.

1. Use the arrow keys to move your snake around the board.
2. Eat food to grow larger.
3. Outgrow the other snake.
4. The game ends when one of the snake runs into something that isn't food.


## Demo

Play the [demo](https://ncbui.github.io/Anaconda-game/)

## NPC Movement

The Snake NPC uses obstacle detection to find the shortest path to nearby food.

Food Detection:
- on each move, find the nearest pellet.
- move towards the pellet.
- if an obstacle is detected, change directions and continue to move towards the pellet.

When there is possibility of it crashing into things, random direction will be generated for its next move.

## Upcoming features

