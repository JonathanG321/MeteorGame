import { MutableRefObject } from "react";

export type Direction = "right" | "left";

export type PressedKeys = {
  ArrowUp: boolean;
  ArrowDown: boolean;
  ArrowLeft: boolean;
  ArrowRight: boolean;
  w: boolean;
  a: boolean;
  s: boolean;
  d: boolean;
};

export type Box = { topLeft: Position; bottomRight: Position };

export type Position = { X: number; Y: number };
export type NullablePosition = Position | { X: null; Y: null };

export type NullablePlayer = NullablePosition & {
  velocityDown: number;
  points: number;
  shieldCount: number;
  invincibleCount: number;
  direction: Direction;
  lives: number;
};
export type Player = Position & {
  velocityDown: number;
  points: number;
  shieldCount: number;
  invincibleCount: number;
  direction: Direction;
  lives: number;
};

export type Object = Position & {
  size: number;
  id: string;
};

export type FallingObject = Object & {
  type: FallingObjectType;
  speed: number;
};

export type FallingObjectType =
  | "meteor"
  | "specialMeteor"
  | "health"
  | "pointsSmall"
  | "pointsMedium"
  | "pointsLarge"
  | "shield"
  | "slow";

export type FallingObjectOptionsNoCollectable = {
  spawnChance?: number;
  isCollectible?: false;
};
export type FallingObjectOptionsIsCollectable = {
  spawnChance?: number;
  isCollectible: true;
  heroOriginPoint: Position;
};
export type FallingObjectOptions =
  | FallingObjectOptionsNoCollectable
  | FallingObjectOptionsIsCollectable;

export type ObjectWithRefs<T> = {
  [K in keyof T]: MutableRefObject<T[K]>;
};

export type StateSetter<T> = React.Dispatch<React.SetStateAction<T>>;

export type ContextValues = {
  isHit: boolean;
  isHitTwo: boolean;
  players: NullablePlayer[];
  setPlayers: StateSetter<NullablePlayer[]>;
  fallingObjectPositions: FallingObject[];
  setFallingObjectPositions: StateSetter<FallingObject[]>;
  mousePressPosition: NullablePosition;
  pressedKeys: PressedKeys;
  setPressedKeys: StateSetter<PressedKeys>;
  highScore: number;
  setHighScore: StateSetter<number>;
  isGameOver: boolean;
  isMainMenu: boolean;
  setIsMainMenu: StateSetter<boolean>;
  slowCount: number;
  setSlowCount: StateSetter<number>;
  gameCounter: number;
  setGameCounter: StateSetter<number>;
  gameStage: number;
  isTwoPlayers: boolean;
  setIsTwoPlayers: StateSetter<boolean>;
};
