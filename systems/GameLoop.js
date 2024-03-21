

export default function (entities, { events, dispatch }) {
    const head = entities.head;
    const food = entities.food;
    const tail = entities.tail;

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
    if (head.newMove === 0) {
      head.nextMove = head.updateFrequency;
      if (
        head.position[0] + head.xspeed < 0  ||
        head.position[0] + head.xspeed >= Constants.GRID_SIZE  ||
        head.position[0] + head.yspeed < 0  ||
        head.position[0] + head.yspeed >= Constants.GRID_SIZE
       ) {
        dispatch("game-over");
        } else 
        head.position[0] += head.xspeed;
        head.position[1] += head.yspeed;
      }
    
    return entities;
  }