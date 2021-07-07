import { useState, useCallback } from "react";
import { collision, STAGE_WIDTH } from "../gameHelpers";
import { TETROMINOS, randomTetromino } from "../tetrominos";

export const usePlayer = () => {
  const [player, setPlayer] = useState({
    pos: { x: 0, y: 0 },
    tetromino: TETROMINOS[0].shape,
    collided: false,
  });

  const updatePlayerPos = ({ x, y, collided }) => {
    setPlayer((prev) => ({
      ...prev,
      pos: { x: prev.pos.x + x, y: prev.pos.y + y },
      collided,
    }));
  };

  const resetPlayer = useCallback(() => {
    setPlayer({
      pos: { x: STAGE_WIDTH / 2 - 2, y: 0 },
      tetromino: randomTetromino().shape,
      collided: false,
    });
  }, []);

  const rotate = (matrix, dir) => {
    const rotated = [];
    for (let i = 0; i < matrix.length; i++) {
      rotated.push([]);
      for (let j = 0; j < matrix[i].length; j++) {
        rotated[i].push(matrix[j][i]);
      }
    }

    if (dir > 0) {
      for (let i = 0; i < rotated.length; i++) {
        rotated[i].reverse();
      }
      return rotated;
    } else {
      return rotated.reverse();
    }
  };

  const playerRotate = (stage, dir) => {
    const temp = JSON.parse(JSON.stringify(player));

    temp.tetromino = rotate(temp.tetromino, dir);
    const pos = temp.pos.x;
    let offSet = 1;

    while (collision(temp, stage, { x: 0, y: 0 })) {
      temp.pos.x += offSet;
      offSet = -(offSet + (offSet > 0 ? 1 : -1));
      if (offSet > temp.tetromino[0].length) {
        rotate(temp, -dir);
        temp.pos.x = pos;
        return;
      }
    }

    setPlayer(temp);
  };

  return [player, updatePlayerPos, resetPlayer, playerRotate];
};
