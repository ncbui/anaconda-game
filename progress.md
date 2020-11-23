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