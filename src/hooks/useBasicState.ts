import { useState } from "react";
import { FallingObject, NullablePlayer, Animation } from "../utils/types";
import { GAME_HEIGHT, STAGE_LENGTH, STARTING_POINT } from "../utils/variables";
import { getDefaultOnePlayer } from "../utils/lib";

export default function useBasicState(screenHeight: number) {
  const scale = screenHeight / GAME_HEIGHT;
  const [gameCounter, setGameCounter] = useState(STARTING_POINT);
  const [isTwoPlayers, setIsTwoPlayers] = useState(false);
  const [isSettings, setIsSettings] = useState(false);
  const [players, setPlayers] = useState<NullablePlayer[]>(
    getDefaultOnePlayer(scale)
  );
  const [isMainMenu, setIsMainMenu] = useState(true);
  const [slowCount, setSlowCount] = useState(0);
  const [highScore, setHighScore] = useState(
    parseInt(localStorage.getItem("highScore") ?? "0")
  );
  const [fallingObjectPositions, setFallingObjectPositions] = useState<
    FallingObject[]
  >([]);
  const [animationPositions, setAnimationPositions] = useState<Animation[]>([]);
  const gameStage = Math.ceil(gameCounter / STAGE_LENGTH);
  const isP1Alive = players[0].lives > 0;
  const isP2Alive = players[1].lives > 0;
  const isGameOver = !isTwoPlayers ? !isP1Alive : !isP1Alive && !isP2Alive;

  return {
    scale,
    players,
    setPlayers,
    fallingObjectPositions,
    setFallingObjectPositions,
    animationPositions,
    setAnimationPositions,
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
    isSettings,
    setIsSettings,
  };
}
