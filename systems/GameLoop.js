

export default function (entities, { events, dispatch }) {
    const head = entities.head;
    head.nextMove -= 1;
    if (head.nextMove === 0) {
      head.nextMove = head.updateFrequency;

      head.position[0] += head.xspeed;
      head.position[1] += head.yspeed;
    }
  
    return entities;
  }