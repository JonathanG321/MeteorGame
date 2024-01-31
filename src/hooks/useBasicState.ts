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
  const [heroOriginPoint, setHeroOriginPoint] =
    useState<NullablePosition>(NULL_POSITION);
  const [heroTwoOriginPoint, setHeroTwoOriginPoint] =
    useState<NullablePosition>(NULL_POSITION);
  const [lastDirection, setLastDirection] = useState<Direction>("right");
  const [lastDirectionTwo, setLastDirectionTwo] = useState<Direction>("right");
  const [isGameOver, setIsGameOver] = useState(false);
  const [isMainMenu, setIsMainMenu] = useState(true);
  const [heroVelocityDown, setHeroVelocityDown] = useState(0);
  const [heroVelocityDownTwo, setHeroVelocityDownTwo] = useState(0);
  const [slowCount, setSlowCount] = useState(0);
  const [points, setPoints] = useState(0);
  const [pointsTwo, setPointsTwo] = useState(0);
  const [highScore, setHighScore] = useState(
    parseInt(localStorage.getItem("highScore") ?? "0")
  );
  const [lives, setLives] = useState(3);
  const [invincibleCount, setInvincibleCount] = useState(0);
  const [shieldCount, setShieldCount] = useState(0);
  const [livesTwo, setLivesTwo] = useState(3);
  const [invincibleCountTwo, setInvincibleCountTwo] = useState(0);
  const [shieldCountTwo, setShieldCountTwo] = useState(0);
  const [powerUpPositions, setPowerUpPositions] = useState<FallingObject[]>([]);
  const [meteorPositions, setMeteorPositions] = useState<FallingObject[]>([]);
  const shouldStopGame = isGameOver || isMainMenu;
  const gameStage = Math.ceil(gameCounter / STAGE_LENGTH);

  return {
    powerUpPositions,
    setPowerUpPositions,
    meteorPositions,
    setMeteorPositions,
    lives,
    setLives,
    invincibleCount,
    setInvincibleCount,
    shieldCount,
    setShieldCount,
    points,
    setPoints,
    highScore,
    setHighScore,
    heroOriginPoint,
    setHeroOriginPoint,
    isGameOver,
    setIsGameOver,
    isMainMenu,
    setIsMainMenu,
    heroVelocityDown,
    setHeroVelocityDown,
    slowCount,
    setSlowCount,
    shouldStopGame,
    lastDirection,
    setLastDirection,
    gameCounter,
    setGameCounter,
    gameStage,
    isTwoPlayers,
    setIsTwoPlayers,
    heroTwoOriginPoint,
    setHeroTwoOriginPoint,
    lastDirectionTwo,
    setLastDirectionTwo,
    heroVelocityDownTwo,
    setHeroVelocityDownTwo,
    pointsTwo,
    setPointsTwo,
    livesTwo,
    setLivesTwo,
    invincibleCountTwo,
    setInvincibleCountTwo,
    shieldCountTwo,
    setShieldCountTwo,
  };
}
