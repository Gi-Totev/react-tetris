import { useState } from "react";
import Stage from "./Stage";
import Display from "./Display";
import StartButton from "./StartButton";
import { useGameStatus } from "../hooks/useGameStatus";
import { useInterval } from "../hooks/useInterval";
import { usePlayer } from "../hooks/usePlayer";
import { useStage } from "../hooks/useStage";
import { createStage, collision } from "../gameHelpers";
import { StyledTetrisWrapper, StyledTetris } from "./Styles/tetris";

const Tetris = () => {
  const [dropTime, setDropTime] = useState(null);
  const [gameOver, setGameOver] = useState(false);
  const [player, updatePlayerPos, resetPlayer, playerRotate] = usePlayer();
  const [stage, setStage, rowsCleared] = useStage(player, resetPlayer);
  const [score, setScore, rows, setRows, level, setLevel] =
    useGameStatus(rowsCleared);

  const movePlayer = (dir) => {
    if (!collision(player, stage, { x: dir, y: 0 })) {
      updatePlayerPos({ x: dir, y: 0, collided: false });
    }
  };

  const startGame = () => {
    setGameOver(false);
    setDropTime(800);
    setStage(createStage());
    resetPlayer();
    setScore(0);
    setRows(0);
    setLevel(0);
  };

  const drop = () => {
    if (rows > (level + 1) * 10) {
      setLevel((prev) => prev + 1);
      setDropTime(800 / (level + 1) + 200);
    }

    if (!collision(player, stage, { x: 0, y: 1 })) {
      updatePlayerPos({ x: 0, y: 1, collided: false });
    } else {
      if (player.pos.y < 1) {
        setGameOver(true);
        setDropTime(null);
      }
      updatePlayerPos({ x: 0, y: 0, collided: true });
    }
  };

  const keyUp = ({ keyCode }) => {
    if (!gameOver) {
      if (keyCode === 40 || keyCode === 83) {
        setDropTime(800 / (level + 1) + 200);
      }
    }
  };

  const dropPlayer = () => {
    setDropTime(null);
    drop();
  };

  const move = (keyCode) => {
    if (!gameOver) {
      switch (keyCode) {
        case 37:
        case 65:
          movePlayer(-1);
          break;
        case 68:
        case 39:
          movePlayer(1);
          break;
        case 83:
        case 40:
          dropPlayer();
          break;
        case 38:
        case 87:
          playerRotate(stage, 1);
          break;
        case 81:
          playerRotate(stage, -1);
          break;
        default:
          return;
      }
    }
  };

  useInterval(() => {
    drop();
  }, dropTime);

  return (
    <StyledTetrisWrapper
      role="button"
      tabIndex="0"
      onKeyDown={(e) => move(e.keyCode)}
      onKeyUp={keyUp}
    >
      <StyledTetris>
        <Stage stage={stage} />
        <aside>
          {gameOver ? (
            <Display gameOver={true} text="Game Over" />
          ) : (
            <div>
              <Display text={`SCORE: ${score}`} />
              <Display text={`ROWS: ${rows}`} />
              <Display text={`LEVEL: ${level}`} />
            </div>
          )}
          <StartButton callback={() => startGame()} />
          <Display text="Move: A S D / Arrow Keys" />
          <Display text="Rotate: Q = Left W = Right" />
        </aside>
      </StyledTetris>
    </StyledTetrisWrapper>
  );
};

export default Tetris;
