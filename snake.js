"use strict";

/** Multiplayer Snake game. */

const WIDTH = 30;
const HEIGHT = 30;

// translate game board size to pixels
const SCALE = 12;

const GAME_DELAY_MS = 200;

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
const startBtn = document.getElementById("start")
startBtn.innerText = "Start ";
startBtn.addEventListener("click", gameStart)

const modeBtn = document.getElementById("dropdownMenuLink")
modeBtn.innerText = "Play Mode";

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
  constructor(keymap, start, dir = "right", color = "orange") {
    this.keymap = keymap;
    this.parts = [start]; // list of Points in snake body
    this.dir = dir;       // direction currently moving
    this.nextDir = dir;   // direction we'll start moving on next tick
    this.growBy = 0; // how many to grow by (goes up after eating)
    this.color = color;
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
    let newHead = this._calculateNewHead(); 
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
    if (pellet) this.growBy += 2;
    return pellet;
  }
}

/** SnakePrime. Anything Snake can do, Prime can do better
 * When it eats good, it sometimes grows by twice as much
 * It avoids hitting a wall by automatically picking a random direction
 * 
 * @param color - CSS color of this snake
 * @param keymap - mapping of keys to directions, eg
 *    { w: "up", a: "left", s: "right", z: "down" }
 * @param start - starting Point for snake
 * @param dir - direction snake moves: "up", "left", "right", "down"
 *
 **/

class SnakePrime extends Snake {
  constructor(keymap, start, dir, color = "red") {
    super(keymap, start, dir, color) // inherit from snake
  }

  /** Move snake one move in its current direction. */

  move() {
    // Calculate where the new head will be, and  add that point to front of body
    this.dir = this.nextDir; // snake's current direction
    let newHead = this._calculateNewHead(this.head());

    while (newHead.willCrashIntoWall()) {
      this.changeRandomDir(this.dir)
      this.dir = this.nextDir; // snake's current direction

      newHead = this._calculateNewHead(this.head());
    }

    this.parts.unshift(newHead);

    // If we're not growing (didn't recently eat a pellet), remove the tail of
    // the snake body, so it moves and doesn't grow. If we're growing, decrement
    // growth so we're closer to not-growing-any-more.
    if (this.growBy === 0) this.parts.pop();
    else this.growBy--;
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
    if (pellet) Math.random > .5 ? this.growBy += 3 : this.growBy += 2;
    return pellet;
  }

}

/** SnakeDoublePrime. OK now you've got to be cheating
 * When it eats food, it sometimes grows a bit more than usual
 * It avoids hitting a wall or itself by automatically picks a random direction
 * 
 * @param color - CSS color of this snake
 * @param keymap - mapping of keys to directions, eg
 *    { w: "up", a: "left", s: "right", z: "down" }
 * @param start - starting Point for snake
 * @param dir - direction snake moves: "up", "left", "right", "down"
 *
 **/

class SnakeDoublePrime extends SnakePrime {
  constructor(keymap, start, dir, color = "red") {
    super(keymap, start, dir, color) // inherit from snake
  }

  /** Move snake one move in its current direction. */

  move() {
    // Calculate where the new head will be, and  add that point to front of body
    this.dir = this.nextDir; // snake's current direction
    let newHead = this._calculateNewHead(this.head());
    let numDirChanges = 0;

    while (newHead.willCrashIntoWall() || this.checkCrashIntoSelf(newHead)) {
      if (numDirChanges > 8) break;
      this.changeRandomDir(this.dir)
      this.dir = this.nextDir; // snake's current direction

      newHead = this._calculateNewHead(this.head());
      numDirChanges++;
    }

    this.parts.unshift(newHead);

    // If we're not growing (didn't recently eat a pellet), remove the tail of
    // the snake body, so it moves and doesn't grow. If we're growing, decrement
    // growth so we're closer to not-growing-any-more.
    if (this.growBy === 0) this.parts.pop();
    else this.growBy--;
  }

  eats(food) {
    const head = this.head();
    const pellet = food.find(f => f.pt.x === head.x && f.pt.y === head.y);
    // console.log("eats pellet=", pellet);
    if (pellet) Math.random > .5 ? this.growBy += 4 : this.growBy += 2;
    return pellet;
  }

}


/** SnakeChaos. SnakePrime with a short attention span
 * Easily distracted, will pick a random direction after every 16 moves
 * 
 * @param color - CSS color of this snake
 * @param keymap - mapping of keys to directions, eg
 *    { w: "up", a: "left", s: "right", z: "down" }
 * @param start - starting Point for snake
 * @param dir - direction snake moves: "up", "left", "right", "down"
 *
 **/

class SnakeChaos extends SnakeDoublePrime {
  constructor(keymap, start, dir, color = "yellow") {
    super(keymap, start, dir, color) // inherit from snake
    this.tickCount = 0;
  }

  /** Move snake one move in its current direction. */

  move() {
    const { x, y } = this.head();

    this.tickCount % 16 === 0 ? this.changeRandomDir(this.dir) : this.dir = this.nextDir

    this.dir = this.nextDir;
    let newHead = this._calculateNewHead(this.head());

    while (newHead.willCrashIntoWall() || this.checkCrashIntoSelf(newHead)) {
      this.changeRandomDir(this.dir);
      this.dir = this.nextDir; // snake's current direction
      if (this.dir === "left") newHead = new Point(x - 1, y);
      if (this.dir === "right") newHead = new Point(x + 1, y);
      if (this.dir === "up") newHead = new Point(x, y - 1);
      if (this.dir === "down") newHead = new Point(x, y + 1);
    }

    this.parts.unshift(newHead);

    // If we're not growing (didn't recently eat a pellet), remove the tail of
    // the snake body, so it moves and doesn't grow. If we're growing, decrement
    // growth so we're closer to not-growing-any-more.
    if (this.growBy === 0) this.parts.pop();
    else this.growBy--;

    this.tickCount++;
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
        snake.checkCrashIntoSelf()  ||
        // find other snake, check if snake has crashed into other snake
        this.snakes.filter(other => other !== snake).some(other => snake.checkCrashIntoOtherSnake(other))
      )}
    )

    if (isDead) {
      window.clearInterval(this.timerId);
      window.removeEventListener("keydown", this.keyListener);
      ctx.fillText("GAME OVER", (WIDTH * SCALE ) / 2 , ( HEIGHT * SCALE )/ 2 )
      startBtn.innerText = "Oh no! Restart";
      startBtn.addEventListener("click", () => document.location.href = ""); // FIXME: clear board without refresh
      return;
    }

    ctx.clearRect(0, 0, SCALE * WIDTH, SCALE * HEIGHT);
    for (const f of this.food) {
      f.draw();
    }

    for (const snake of this.snakes) {
      snake.move();
      snake.draw();
      
      const pellet = snake.eats(this.food);
      if (pellet) this.removeFood(pellet);
  }

    this.refillFood();
  }
}


function gameStart(){
  /// Set up snakes, game, and start game
  startBtn.removeEventListener("click", gameStart);

  // console.log($('.dropdown')[0].innerText);
  const mode = $('.dropdown')[0].innerText;

  const p1Snake = () => {
    if (mode.includes('Chaotic')) return new SnakeChaos(PLAYER_ONE_KEYMAP, new Point(12, 12));
    if (mode.includes('Classic')) return new Snake(PLAYER_ONE_KEYMAP, new Point(12, 12));
    if (mode.includes('Play')) $('.dropdown-toggle').html("Easy");
    return new SnakePrime(PLAYER_ONE_KEYMAP, new Point(12, 12))
  }

  const p2Snake = () => {
    // if (mode.includes('Chaotic')) return new SnakeChaos(PLAYER_TWO_KEYMAP, new Point(6, 6));
    if (mode.includes('Classic')) return;
    return new SnakeChaos(PLAYER_TWO_KEYMAP, new Point(6, 6), "left", "thistle")
  }
  console.log(p1Snake())

  const snakes = [p1Snake()];
  if (p2Snake()) snakes.push(p2Snake());

  
  const game = new Game(snakes);

  game.start();
}