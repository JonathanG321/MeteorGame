import { createContext } from "react";
import { HERO_SPAWN_POINT } from "./utils/variables";
import { Position, PositionWithID } from "./utils/types";

export const GameStateContext = createContext({
  hero: {
    position: HERO_SPAWN_POINT,
    updatePosition: (newPosition: Partial<Position>) => {},
  },
  pressedKeys: {
    ArrowUp: false,
    ArrowDown: false,
    ArrowLeft: false,
    ArrowRight: false,
  },
  meteorPositions: [] as PositionWithID[],
  isGameOver: false,
});
