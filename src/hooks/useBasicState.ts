import { useState } from "react";
import { Direction, FallingObject, NullablePosition } from "../utils/types";
import {
  NULL_POSITION,
  STAGE_LENGTH,
  STARTING_POINT,
} from "../utils/variables";

export default function useBasicState() {
  const [gameCounter, setGameCounter] = useState(STARTING_POINT);
  const [isTwoPlayers, setIsTwoPlayers] = useState(false);
  const [heroOriginPoints, setHeroOriginPoints] = useState<NullablePosition[]>([
    NULL_POSITION,
    NULL_POSITION,
  ]);
  const [lastDirections, setLastDirections] = useState<Direction[]>([
    "right",
    "right",
  ]);
  const [isGameOver, setIsGameOver] = useState(false);
  const [isMainMenu, setIsMainMenu] = useState(true);
  const [heroVelocityDowns, setHeroVelocityDowns] = useState([0, 0]);
  const [slowCount, setSlowCount] = useState(0);
  const [points, setPoints] = useState([0, 0]);
  const [highScore, setHighScore] = useState(
    parseInt(localStorage.getItem("highScore") ?? "0")
  );
  const [lives, setLives] = useState([3, 3]);
  const [invincibleCounts, setInvincibleCounts] = useState([0, 0]);
  const [shieldCounts, setShieldCounts] = useState([0, 0]);
  const [fallingObjectPositions, setFallingObjectPositions] = useState<
    FallingObject[]
  >([]);
  const shouldStopGame = isGameOver || isMainMenu;
  const gameStage = Math.ceil(gameCounter / STAGE_LENGTH);

  return {
    fallingObjectPositions,
    setFallingObjectPositions,
    lives,
    setLives,
    invincibleCounts,
    setInvincibleCounts,
    shieldCounts,
    setShieldCounts,
    points,
    setPoints,
    highScore,
    setHighScore,
    heroOriginPoints,
    setHeroOriginPoints,
    isGameOver,
    setIsGameOver,
    isMainMenu,
    setIsMainMenu,
    heroVelocityDowns,
    setHeroVelocityDowns,
    slowCount,
    setSlowCount,
    shouldStopGame,
    lastDirections,
    setLastDirections,
    gameCounter,
    setGameCounter,
    gameStage,
    isTwoPlayers,
    setIsTwoPlayers,
  };
}
