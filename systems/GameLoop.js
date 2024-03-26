import Constants from "../Constants";

const randomPositions = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

const gameOver = (head) => {
  return (
    head.position[0] + head.xspeed < 0 ||
    head.position[0] + head.xspeed >= Constants.GRID_SIZE-1 ||
    head.position[1] + head.yspeed < 0 ||
    head.position[1] + head.yspeed >= Constants.GRID_SIZE-1)
}

export default function (entities, { events, dispatch }) {
    const head = entities.head;
    const food = entities.food;

    if (events.length) {
      events.forEach((e) => {
        switch (e) {
          case "move-up":
            if (head.yspeed === 1) return;
            head.yspeed = -1;
            head.xspeed = 0;
            return;
          case "move-right":
            if (head.xspeed === -1) return;
            head.xspeed = 1;
            head.yspeed = 0;
            return;
          case "move-down":
            if (head.yspeed === -1) return;
            head.yspeed = 1;
            head.xspeed = 0;
            return;
          case "move-left":
            if (head.xspeed === 1) return;
            head.xspeed = -1;
            head.yspeed = 0;
            return;
        }
      });
    }
    
    head.nextMove -= 1;
    if (head.nextMove === 0) {
      head.nextMove = head.updateFrequency;
      if (gameOver(head)) {
            dispatch("game-over");
          } else {
          head.position[0] += head.xspeed;
          head.position[1] += head.yspeed;
        }
    }
  
    return entities;
  }