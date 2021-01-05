"use strict";

/** Multiplayer Snake game. */

const WIDTH = 30;
const HEIGHT = 24;

// translate game board size to pixels
const SCALE = 12;

const GAME_DELAY_MS = 175;

const PLAYER_ONE_KEYMAP = {
  ArrowLeft: "left", ArrowRight: "right", ArrowUp: "up", ArrowDown: "down",
};
const PLAYER_TWO_KEYMAP = {
  w: "up", a: "left", s: "right", z: "down",
};


// One-time setup to HTML canvas element: make it the right size (given settings
// above) and center it on the screen.
const canvas = document.getElementById("board");
canvas.setAttribute("height", `${HEIGHT * SCALE}`);
canvas.style.marginTop = `${(HEIGHT * SCALE) / -2}px`;
canvas.setAttribute("width", `${WIDTH * SCALE}`);
canvas.style.marginLeft = `${(WIDTH * SCALE) / -2}px`;

// This is the "drawing context" for the HTML canvas library: essentially, it's
// the object where drawing commands happen. The "2d" is because we are drawing
// on a two dimensional canvas, rather than a 3d one.
const ctx = canvas.getContext("2d");


// On-load, setup button to display start message
const startBtn = document.getElementById("start");
startBtn.innerText = "Start ";
startBtn.addEventListener("click", gameStart);

const modeBtn = document.getElementById("dropdownMenuLink");
modeBtn.innerText = "Play Mode";

// const dropDown = document.getElementById("dropdownMenu");

$('.dropdown-menu').on('click', 'a', function () {
  var text = $(this).html();
  var htmlText = text + ' <span class="caret"></span>';
  $(this).closest('.dropdown').find('.dropdown-toggle').html(htmlText);
});


/** Point: a single element on the game board.
 *
 * This is used to draw a circle on the game board at x,y. It is used by both
 * the food Pellet class (which has one point), and by the Snake class (which
 * has a point for each link in the snake).
 *
 * x - x coord (0 is left)
 * y - y coord (0 is top)
 *
 * */

class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  /** Make a point at a random x,y and return it. */

  static newRandom() {
    const randRange = (low, hi) =>
      low + Math.floor((Math.random() * (hi - low)));
    return new Point(randRange(1, WIDTH), randRange(1, HEIGHT));
  }

  /** Draw the point in the provided color.
   *
   * @param color - CSS color
   *
   * This uses SCALE to translate the x,y of the point to where that should
   * appear and the size of the circle on the canvas.
   */
  draw(color) {
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(
      this.x * SCALE,
      this.y * SCALE,
      SCALE / 2,
      0,
      Math.PI * 2,
    );
    ctx.fill();
  }

  /** Return t/f if this point is outside of the game board coords. */

  isOutOfBound() {
    return (this.x <= 0 || this.x >= WIDTH || this.y <= 0 || this.y >= HEIGHT);
  }

  /** Return t/f if this point is outside of the game board coords. */

  willCrashIntoWall() {
    return this.isOutOfBound();
  }

  /** Return Manhattan distance to another point*/

  distanceFrom(pt) {
    const dx = Math.abs(this.x - pt.x);
    const dy = Math.abs(this.y - pt.y);

    const D = 1; // cost for moving from one space to next;  using simple case

    return parseFloat(D * (dx + dy));
  }

  /** Return object containing a vector to another point */

  vectorTo(pt) {
    return {
      x: (this.x - pt.x),
      y: (this.y - pt.y)
    }
  }

}


/** Food pellet. When the snake eats these, it will grow. */

class Pellet {
  constructor(x, y) {
    this.pt = new Point(x, y);
  }

  /** Make a new pellet at a random location and return it. */

  static newRandom() {
    const pt = Point.newRandom();
    return new Pellet(pt.x, pt.y);
  }

  /** Draw pellet on board. */

  draw() {
    this.pt.draw("green");
  }
}


/** Snake. Central actor in game: moves, eats pellets, and grows.
 *
 * @param color - CSS color of this snake
 * @param keymap - mapping of keys to directions, eg
 *    { w: "up", a: "left", s: "right", z: "down" }
 * @param start - starting Point for snake
 * @param dir - direction snake moves: "up", "left", "right", "down"
 *
 **/

class Snake {
  constructor(keymap, type, start, dir = "right", color = "orange") {
    this.keymap = keymap;
    this.type = type;
    this.parts = [start]; // list of Points in snake body
    this.dir = dir;       // direction currently moving
    this.nextDir = dir;   // direction we'll start moving on next tick
    this.growBy = 0; // how many to grow by (goes up after eating)
    this.color = color;
    this.score = this.parts.length;
    this.tickCount = 0; // used by chaotic snake
  }

  /** Draw the body of the snake in its color. */

  draw() {
    for (const p of this.parts) p.draw(this.color);
  }

  /** Does the snake body contain this Point? t/f */

  contains(pt) {
    return this.parts.some(me => me.x === pt.x && me.y === pt.y);
  }

  /** Head (first Point) of the snake. */

  head() {
    return this.parts[0];
  }

  /** Did the snake crash into a border wall? t/f */

  checkCrashIntoWall() {
    return (this.head().isOutOfBound());
  }

  /** Did the snake crash into self? t/f */

  checkCrashIntoSelf(head = this.head()) {
    const self = this.parts.slice(1);

    return self.some(me => head.x === me.x && head.y === me.y);
  }



  /** Did the snake crash into the other snake? t/f 
   * @param otherSnake - other Snake
   */
  checkCrashIntoOtherSnake(otherSnake, head = this.head()) {
    return otherSnake.parts.some(other => other.x === head.x && other.y === head.y);
  }

  /** Move snake one move in its current direction. */

  move() {

    let newHead;

    if (this.type === "chaotic") {

      this.tickCount % 16 === 0 ? this.changeRandomDir(this.dir) : this.dir = this.nextDir

      this.dir = this.nextDir;
      newHead = this._calculateNewHead(this.head());

      // Keeping to test out this mode
      // while (newHead.willCrashIntoWall() ) {
      //   this.changeRandomDir(this.dir);
      //   this.dir = this.nextDir; // snake's current direction

      //   newHead = this._calculateNewHead(this.head())
      // }

      this.tickCount++;

    } else if (this.type === "helpful") {
      let numDirChanges = 0;

      this.dir = this.nextDir;
      newHead = this._calculateNewHead(this.head());

      while (newHead.willCrashIntoWall()) {
        if (numDirChanges > 8) break;

        this.changeRandomDir(this.dir)
        this.dir = this.nextDir;

        newHead = this._calculateNewHead(this.head());
        numDirChanges++;
      }

    } else {
      newHead = this._calculateNewHead();
    }

    this.parts.unshift(newHead);

    // If we're not growing (didn't recently eat a pellet), remove the tail of
    // the snake body, so it moves and doesn't grow. If we're growing, decrement
    // growth so we're closer to not-growing-any-more.
    if (this.growBy === 0) this.parts.pop();
    else this.growBy--;
  }

  /** Calculate where the new head would be if snake continues
   * 
   * @param {*} currentHead 
   */

  _calculateNewHead(currentHead = this.head()) {
    const { x, y } = currentHead;

    this.dir = this.nextDir;
    let newHead;
    if (this.dir === "left") newHead = new Point(x - 1, y);
    if (this.dir === "right") newHead = new Point(x + 1, y);
    if (this.dir === "up") newHead = new Point(x, y - 1);
    if (this.dir === "down") newHead = new Point(x, y + 1);

    return newHead;
  }

  /** If a valid key and direction was used, change direction to that. */

  handleKey(key) {
    if (this.keymap[key] !== undefined) {
      if (this.dir === "left" && this.keymap[key] !== "right") this.changeDir(this.keymap[key]);
      if (this.dir === "right" && this.keymap[key] !== "left") this.changeDir(this.keymap[key]);
      if (this.dir === "up" && this.keymap[key] !== "down") this.changeDir(this.keymap[key]);
      if (this.dir === "down" && this.keymap[key] !== "up") this.changeDir(this.keymap[key]);
    };
  }

  /** Change direction:
   *
   * @param dir - new direction
   *
   */

  changeDir(dir) {
    this.nextDir = dir;
  }

  /** (Pseudo)-Randomly change direction:
*
* @param dir - current direction
*
* FIXME: snake avoids walls, but sometimes turns on itself at corners
*/

  changeRandomDir(dir) {
    if (dir === "up" || dir === "down") Math.random() > .5 ? this.nextDir = "left" : this.nextDir = "right";
    if (dir === "left" || dir === "right") Math.random() > .5 ? this.nextDir = "down" : this.nextDir = "up";

  }

  /** Handle potentially eating a food pellet:
   *
   * - if head is currently on pellet: start growing snake, and return pellet.
   * - otherwise, returns undefined.
   *
   * @param food - list of Pellet on board.
   */

  eats(food) {
    const head = this.head();
    const pellet = food.find(f => f.pt.x === head.x && f.pt.y === head.y);
    // console.log("eats pellet=", pellet);
    if (pellet) this.growBy += 1;
    return pellet;
  }
}


/** SnakeNPC. Snake that knows how to avoid walls and other snakes
 * Tries to move towards food
 * 
 * @param color - CSS color of this snake
 * @param keymap - mapping of keys to directions, eg
 *    { w: "up", a: "left", s: "right", z: "down" }
 * @param start - starting Point for snake
 * @param dir - direction snake moves: "up", "left", "right", "down"
 * @param other - the other snake
 *
 **/

class SnakeNPC extends Snake {
  constructor(keymap, type, start, dir, color, other) {
    super(keymap, type, start, dir, color) // inherit from snake
    this.tickCount = 0;
    this.other = other;
  }

  /** Did snake crash into wall, self, or other snake? */

  checkCrashIntoThings(otherSnake, newHead) {
    return (newHead.willCrashIntoWall() ||
      this.checkCrashIntoSelf(newHead) ||
      this.checkCrashIntoOtherSnake(otherSnake, newHead))
  }

  /** Move snake one move towards food or safety */

  move(food) {

    const dirToFood = this.findFood(food);
    let numDirChanges = 0;

    if (dirToFood === "left" && this.nextDir !== "right") {
      this.nextDir = dirToFood;
    } else if (dirToFood === "right" && this.nextDir !== "left") {
      this.nextDir = dirToFood;
    } else if (dirToFood === "down" && this.nextDir !== "up") {
      this.nextDir = dirToFood;
    } else if (dirToFood === "up" && this.nextDir !== "down") {
      this.nextDir = dirToFood
    };

    this.dir = this.nextDir;
    let newHead = this._calculateNewHead(this.head());

    // if this direction causes death, find another
    while (this.checkCrashIntoThings(this.other, newHead)) {
      if (numDirChanges > 8) break;
      this.changeRandomDir(this.dir);
      this.dir = this.nextDir;

      newHead = this._calculateNewHead(this.head());

      numDirChanges++;
    }

    this.parts.unshift(newHead);

    // If we're not growing (didn't recently eat a pellet), remove the tail of
    // the snake body, so it moves and doesn't grow. If we're growing, decrement
    // growth so we're closer to not-growing-any-more.
    if (this.growBy === 0) this.parts.pop();
    else this.growBy--;

    this.tickCount++;
  }

  /** Calculate the closest food point and returns a list of possible directions  */

  findFood(food, head = this.head()) {
    // if (food) console.log("findFood", head, food[0].pt);

    let nearestPellet;
    let dToPellet;

    food.forEach(f => {
      const distance = head.distanceFrom(f.pt);

      if (!nearestPellet || distance < dToPellet) {
        dToPellet = distance;
        nearestPellet = f.pt;
      }
    });

    let vector = head.vectorTo(nearestPellet);
    // console.log(vector, this.dir);
    let newDirs;

    // if snakeNPC is horizontally aligned with the pellet
    // check to see how it should move vertically
    // if snakeNPC is vertically aligned w pellet
    // check to see how it should more horizontally
    // else, check the for the smallest bit of the vector
    // prefer to move in a way that reduces that further

    if (vector.x === 0) {
      vector.y < 0 ? newDirs = "down" : newDirs = "up";
    } else if (vector.y === 0) {
      vector.x < 0 ? newDirs = "right" : newDirs = "left"
    } else if (Math.abs(vector.x) < Math.abs(vector.y)) {
      vector.x < 0 ? newDirs = "right" : newDirs = "left"
    } else {
      vector.y < 0 ? newDirs = "down" : newDirs = "up";
    };



    return newDirs;
  }

}



/** Overall game.
 *
 * @param snake - Snake instance playing
 * @param numFood - how much food should always be on board?
 */

class Game {
  constructor(snakes, numFood = 3) {
    this.snakes = snakes;

    // array of Pellet instances on board
    this.food = [];
    this.numFood = numFood;

    this.timerId = null;
    this.tickCount = 0;
  }

  start() {
    document.addEventListener("keydown", (evt) => this.keyListener(evt));
    this.timerId = window.setInterval(this.tick.bind(this), GAME_DELAY_MS);
  }

  /** Refill board with food (don't allow food to be on same spot as snake). */

  refillFood() {
    while (this.food.length < this.numFood) {
      let newPellet = Pellet.newRandom()
      if (this.snakes.every(snake => !snake.contains(newPellet))) this.food.push(newPellet);
    }
  }

  /** Let snake try to handle the keystroke. */

  keyListener(evt) {
    for (const snake of this.snakes) snake.handleKey(evt.key);
  }

  /** Remove Pellet from board. */

  removeFood(pellet) {
    this.food = this.food.filter(
      f => f.pt.x !== pellet.pt.x && f.pt.y !== pellet.pt.y);
  }

  /** A "tick" of the game: called by interval timer.
   *
   * - check if snake has crashed into something & if so, end game
   * - move snakes forward
   * - check if snake has eaten a pellet and if so, remove it
   * - refill food, if needed
   */

  tick() {

    const isDead = this.snakes.some(snake => {
      return (
        snake.checkCrashIntoWall() ||
        snake.checkCrashIntoSelf() ||
        // find other snake, check if snake has crashed into other snake
        this.snakes.filter(other => other !== snake).some(other => snake.checkCrashIntoOtherSnake(other))
      )
    }
    )

    if (isDead) {
      window.clearInterval(this.timerId);
      window.removeEventListener("keydown", this.keyListener);
      ctx.font = "18px Arial";
      ctx.textAlign = "center";
      ctx.fillStyle = "white";
      ctx.fillText("GAME OVER", ((WIDTH * SCALE) / 2), ((HEIGHT * SCALE) / 2 - (4 * SCALE)))
      ctx.fillText(`Player Score: ${this.snakes[0].score}`, ((WIDTH * SCALE) / 2), ((HEIGHT * SCALE) / 2 + (.5 * SCALE)))
      ctx.fillText(`NPC Score: ${this.snakes[1].score}`, ((WIDTH * SCALE) / 2), ((HEIGHT * SCALE) / 2 + (2 * SCALE)))
      ctx.fillText(`${this.snakes[0].score > this.snakes[1].score ? "PLAYER" : "SnakeNPC"} WINS`, ((WIDTH * SCALE) / 2), ((HEIGHT * SCALE) / 2 + (5 * SCALE)))
      startBtn.innerText = "Restart";
      startBtn.addEventListener("click", () => document.location.href = ""); // FIXME: clear board without refresh
      return;
    }

    ctx.clearRect(0, 0, SCALE * WIDTH, SCALE * HEIGHT);
    for (const f of this.food) {
      f.draw();
    }

    this.refillFood();

    for (const snake of this.snakes) {

      snake.move(this.food); // FIXME: Only snakeNPC accepts an argument atm
      snake.draw();

      const pellet = snake.eats(this.food);
      if (pellet) {
        this.removeFood(pellet);
        snake.score += snake.growBy;
      };
    }

  }
}


function gameStart() {
  /// Set up snakes, game, and start game
  startBtn.removeEventListener("click", gameStart);
  startBtn.addEventListener("click", () => document.location.href = ""); // FIXME: clear board without refresh
  startBtn.innerText = "Restart";

  const mode = $('.dropdown')[0].innerText;

  const p1Snake = () => {
    if (mode.includes('Play')) $('.dropdown-toggle').html("Classic");
    if (mode.includes('Classic')) return new Snake(PLAYER_ONE_KEYMAP, "classic", new Point(12, 12));
    if (mode.includes('Helpful')) return new Snake(PLAYER_ONE_KEYMAP, "helpful", new Point(12, 12));
    if (mode.includes('Chaotic')) return new Snake(PLAYER_ONE_KEYMAP, "chaotic", new Point(12, 12));
  }

  let snakes = [p1Snake()];

  const p2Snake = () => {
    return new SnakeNPC(PLAYER_TWO_KEYMAP, "npc", new Point(6, 6), "left", "thistle", snakes[0]);
  }

  snakes.push(p2Snake())

  console.log({ snakes })

  const game = new Game(snakes, 4);

  game.start();
}
