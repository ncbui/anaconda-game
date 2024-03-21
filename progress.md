1. Fix the Keyboard Bug
    `this` bug in Game.start() 
    eventListener - added arrow function to keep context to Game instead of document

2. Die When You Crash Into Yourself
    added checkCrashIntoSelf() method to Snake class
        uses logic from move() method, consider consolidating

3. Don’t Allow Changing 180 Degrees
    modified handleKey() method in Snake class

4. Allow Different Colored Snake
    added color attribute to constructor

5. Make Food Creation Smarter 
    modify refillFood() in Snake class

6. Add Start Button
    onclick starts game
    when snake dies, button text updates and onclick refreshes page

7. Build Easy Mode Snake
    subclassed snake to make snakePrime
    snakePrime has a chance to grow twice as big when eating food 
    will also detect if it will run into walls and attempt to avoid them.

8. Build Super Easy Mode Snake
    can detect its own body
    also cheats and sometimes doesn't lose if it bites itself

9. Build Chaos Mode Snake
    picks a random direction to move in every 12 moves

10. Build a game mode toggler
    single player mode, just a snake toggler

11. Build a snakeNPC
    avoids walls, itself, and the other player
    need an algorithm to find closest pellet


12. Add score and display it on game end


13. DRYing up classes and functions
    Single class for player snake now accepts type argument to determine movement pattern

14. Rebranding to Anaconda
    directions for play added
    limit game to always being player vs snake
    styled directions and explanations

15. Pathfinding functionality
    add method to find the neighbors of a point
    implement priority queue using an array as a heap (math is rad)

16. Convert game to react native app using https://blog.logrocket.com/react-native-game-development-tutorial/ guide. 

    


### Upcoming features

Adding an A* search algo to the snakeNPC to prevent it from trapping itself. 
    See:
    https://www.redblobgames.com/pathfinding/grids/graphs.html

Decide when path recalculation should occur
    When food list changes?
    Schedule for every X moves?

Path recalculation:
- Follows a local repair strategy when the path needs to be recalculated. 
- Finds a good path nearby by recalculating the first FIXME: X steps on the path and slices it into stored path.
    See:
    https://www.redblobgames.com/pathfinding/grids/graphs.html
    https://www.redblobgames.com/pathfinding/early-exit/

Changes to scoring:
- Penalty to the snake that crashed
- ?? Track user's highest score with browser?
