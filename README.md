# Snake Game

A arcade snake game built with object-oriented principles and the HTML Canvas library.

Choose between two play modes: Classic (1P) and PvE (Player vs NPC)
Choose between three snakes: Classic, Helpful, Chaotic

## Demo

Play the [demo](https://ncbui.github.io/JS-OO-Snake/)

## More on the NPC

The snake NPC changes directions to avoid crashing into things or to reach food.

When it detects the possibility of crashing into things, a random direction will be generated for its next move.

Food detection currently involves:
- calculating Euclidean distance for all of the pellets during each 'move' and choosing the nearest pellet
- calculating a vector to the nearest pellet
- picking a direction based on whether the horizontal or vertical length is shortest
