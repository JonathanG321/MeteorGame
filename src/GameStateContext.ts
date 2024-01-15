import { createContext } from "react";
import { BASE_PRESSED_KEYS, HERO_SPAWN_POINT } from "./utils/variables";
import { Position, PositionWithID, PressedKeys } from "./utils/types";

export const GameStateContext = createContext({
  hero: {
    position: HERO_SPAWN_POINT,
    updatePosition: (newPosition: Partial<Position>) => {},
  },
  pressedKeys: BASE_PRESSED_KEYS,
  setPressedKeys: (pressedKeys: PressedKeys) => {},
  meteorPositions: [] as PositionWithID[],
  setMeteorPositions: (meteorPositions: PositionWithID[]) => {},
  isGameOver: false,
  setIsGameOver: (newIsGameOver: boolean) => {},
});
