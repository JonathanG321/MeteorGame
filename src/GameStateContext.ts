import { createContext } from "react";
import { BASE_PRESSED_KEYS, HERO_SPAWN_POINT } from "./utils/variables";
import {
  NullablePosition,
  Position,
  PositionWithID,
  PressedKeys,
} from "./utils/types";

export const GameStateContext = createContext({
  setInvincibleCount: (newInvincibleCount: number) => {},
  isInvincible: false,
  setIsInvincible: (isInvincible: boolean) => {},
  lives: 3,
  setLives: (newLives: number) => {},
  mousePressPosition: { X: null, Y: null } as NullablePosition,
  setMousePressPosition: (newMouse: Position) => {},
  highScore: 0,
  setHighScore: (newHighScore: number) => {},
  hero: {
    position: HERO_SPAWN_POINT,
    updatePosition: (newPosition: Partial<Position>) => {},
  },
  setHeroOriginPoint: (newHeroPoint: Position) => {},
  heroVelocityDown: 0,
  setHeroVelocityDown: (newVelocity: number) => {},
  points: 0,
  setPoints: (newPoints: number) => {},
  pressedKeys: BASE_PRESSED_KEYS,
  setPressedKeys: (pressedKeys: PressedKeys) => {},
  meteorPositions: [] as PositionWithID[],
  setMeteorPositions: (meteorPositions: PositionWithID[]) => {},
  isGameOver: false,
  setIsGameOver: (newIsGameOver: boolean) => {},
  isMainMenu: true,
  setIsMainMenu: (isMainMenu: boolean) => {},
});
