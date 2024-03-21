const randomPositions = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
  };


export default function (entities, { events, dispatch }) {
    const head = entities.head;
    const food = entities.food;

    head.nextMove -= 1;
    if (head.nextMove === 0) {
        head.nextMove = head.updateFrequency;
        if (
            head.position[0] + head.xspeed < 0 ||
            head.position[0] + head.xspeed >= Constants.GRID_SIZE ||
            head.position[1] + head.yspeed < 0 ||
            head.position[1] + head.yspeed >= Constants.GRID_SIZE
          ) {
            dispatch("game-over");
          } else {
    
         head.position[0] += head.xspeed;
         head.position[1] += head.yspeed;
         if (
              head.position[0] == food.position[0] &&
              head.position[1] == food.position[1]
            ) {
    
              food.position = [
                randomPositions(0, Constants.GRID_SIZE - 1),
                randomPositions(0, Constants.GRID_SIZE - 1),
              ];
            }}
    return entities;
  }}