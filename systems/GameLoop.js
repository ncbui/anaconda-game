

export default function (entities, { events, dispatch }) {
    const head = entities.head;
    head.position[0] += head.xspeed;
    head.position[1] += head.yspeed;
  
    return entities;
  }