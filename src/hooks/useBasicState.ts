import { useState } from "react";
import { Direction, FallingObject, FallingObjectType } from "../utils/types";
import { HERO_SPAWN_POINT } from "../utils/variables";

export default function useBasicState() {
  const [gameCounter, setGameCounter] = useState(0);
  const [heroOriginPoint, setHeroOriginPoint] = useState(HERO_SPAWN_POINT);
  const [lastDirection, setLastDirection] = useState<Direction>("right");
  const [isGameOver, setIsGameOver] = useState(false);
  const [isMainMenu, setIsMainMenu] = useState(true);
  const [hitObjectType, setHitObjectType] = useState<FallingObjectType | null>(
    null
  );
  const [heroVelocityDown, setHeroVelocityDown] = useState(0);
  const [slowCount, setSlowCount] = useState(0);
  const [points, setPoints] = useState(0);
  const [highScore, setHighScore] = useState(
    parseInt(localStorage.getItem("highScore") ?? "0")
  );
  const [lives, setLives] = useState(3);
  const [invincibleCount, setInvincibleCount] = useState(0);
  const [shieldCount, setShieldCount] = useState(0);
  const [powerUpPositions, setPowerUpPositions] = useState<FallingObject[]>([]);
  const [meteorPositions, setMeteorPositions] = useState<FallingObject[]>([]);
  const shouldStopGame = isGameOver || isMainMenu;

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
    hitObjectType,
    setHitObjectType,
    heroVelocityDown,
    setHeroVelocityDown,
    slowCount,
    setSlowCount,
    shouldStopGame,
    lastDirection,
    setLastDirection,
    gameCounter,
    setGameCounter,
  };
}
