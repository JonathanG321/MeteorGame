import { createContext } from "react";
import { BASE_PRESSED_KEYS, HERO_SPAWN_POINT } from "./utils/variables";
import {
  FallingObject,
  NullablePosition,
  Position,
  PressedKeys,
} from "./utils/types";

export const GameStateContext = createContext({
  setInvincibleCount: (newInvincibleCount: number) => {},
  invincibleCount: 0,
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
  meteorPositions: [] as FallingObject[],
  setMeteorPositions: (meteorPositions: FallingObject[]) => {},
  powerUpPositions: [] as FallingObject[],
  setPowerUpPositions: (powerUpPositions: FallingObject[]) => {},
  isGameOver: false,
  setIsGameOver: (newIsGameOver: boolean) => {},
  isMainMenu: true,
  setIsMainMenu: (isMainMenu: boolean) => {},
});
