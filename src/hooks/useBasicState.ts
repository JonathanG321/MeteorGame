import { useState } from "react";
import { FallingObjectType } from "../utils/types";
import { HERO_SPAWN_POINT } from "../utils/variables";

export default function useBasicState() {
  const [heroOriginPoint, setHeroOriginPoint] = useState(HERO_SPAWN_POINT);
  const [isGameOver, setIsGameOver] = useState(false);
  const [isMainMenu, setIsMainMenu] = useState(true);
  const [hitObjectType, setHitObjectType] = useState<FallingObjectType | null>(
    null
  );
  const [heroVelocityDown, setHeroVelocityDown] = useState(0);
  const shouldStopGame = isGameOver || isMainMenu;

  return {
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
    shouldStopGame,
  };
}
