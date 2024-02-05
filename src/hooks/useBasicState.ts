import { useState } from "react";
import { FallingObject, NullablePlayer } from "../utils/types";
import {
  STAGE_LENGTH,
  STARTING_POINT,
  DEFAULT_ONE_PLAYER,
} from "../utils/variables";

export default function useBasicState() {
  const [gameCounter, setGameCounter] = useState(STARTING_POINT);
  const [isTwoPlayers, setIsTwoPlayers] = useState(false);
  const [players, setPlayers] = useState<NullablePlayer[]>(DEFAULT_ONE_PLAYER);
  const [isMainMenu, setIsMainMenu] = useState(true);
  const [slowCount, setSlowCount] = useState(0);
  const [highScore, setHighScore] = useState(
    parseInt(localStorage.getItem("highScore") ?? "0")
  );
  const [fallingObjectPositions, setFallingObjectPositions] = useState<
    FallingObject[]
  >([]);
  const gameStage = Math.ceil(gameCounter / STAGE_LENGTH);
  const isP1Alive = players[0].lives > 0;
  const isP2Alive = players[1].lives > 0;
  const isGameOver = !isTwoPlayers ? !isP1Alive : !isP1Alive && !isP2Alive;

  return {
    players,
    setPlayers,
    fallingObjectPositions,
    setFallingObjectPositions,
    highScore,
    setHighScore,
    isGameOver,
    isMainMenu,
    setIsMainMenu,
    slowCount,
    setSlowCount,
    gameCounter,
    setGameCounter,
    gameStage,
    isTwoPlayers,
    setIsTwoPlayers,
  };
}
