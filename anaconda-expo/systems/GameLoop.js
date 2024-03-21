

export default function (entities, { events, dispatch }) {
    const head = entities.head;

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
    head.nextMove = head.updateFrequency;
    head.position[0] += head.xspeed;
    head.position[1] += head.yspeed;
    
    return entities;
  }