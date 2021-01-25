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

Play the [demo](https://ncbui.github.io/JS-OO-Snake/)

## Pathfinding NPC

The Snake NPC uses the A* search algorithm and obstacle detection to find the shortest path to nearby food.

Food Detection:
- on each move, calculates Manhattan taxicab distance for all of the food pellets to find the nearest pellet
- FIXME: comparing horizontal or vertical distance to the nearest pellet pick direction for next move

Path calculation:
redblobgames.com/pathfinding/a-star/introduction.html


When there is possibility of it crashing into things, FIXME: random direction will be generated for its next move.

Path recalculation:
- Follows a local repair strategy when the path needs to be recalculated. 
- Finds a good path nearby by recalculating the first FIXME: X steps on the path and slices it into stored path.


When the NPC (FIXME: criteria for recalculation), the A* search algorithm is used to calculate a path to the the nearest food pellet. 
