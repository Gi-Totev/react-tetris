export const STAGE_WIDTH = 12;
export const STAGE_HEIGHT = 20;

export const createStage = () =>
  Array.from(new Array(STAGE_HEIGHT), () =>
    new Array(STAGE_WIDTH).fill([0, "clear"])
  );

export const collision = (player, stage, { x: moveX, y: moveY }) => {
  const { tetromino } = player;
  for (let i = 0, maxI = tetromino.length; i < maxI; i++) {
    for (let j = 0, maxJ = tetromino[i].length; j < maxJ; j++) {
      if (tetromino[i][j] !== 0) {
        let h = i + player.pos.y + moveY;
        let w = j + player.pos.x + moveX;
        if (!stage[h] || !stage[h][w] || stage[h][w][1] !== "clear") {
          return true;
        }
      }
    }
  }
  return false;
};
