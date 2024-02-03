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

export type Position = {
  X: number;
  Y: number;
};
export type NullablePosition = {
  X: null | number;
  Y: null | number;
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
  fallingObjectPositions: FallingObject[];
  setFallingObjectPositions: StateSetter<FallingObject[]>;
  lives: number[];
  setLives: StateSetter<number[]>;
  setInvincibleCounts: StateSetter<number[]>;
  invincibleCounts: number[];
  setShieldCounts: StateSetter<number[]>;
  shieldCounts: number[];
  mousePressPosition: NullablePosition;
  pressedKeys: PressedKeys;
  setPressedKeys: StateSetter<PressedKeys>;
  points: number[];
  setPoints: StateSetter<number[]>;
  highScore: number;
  setHighScore: StateSetter<number>;
  heroOriginPoints: NullablePosition[];
  setHeroOriginPoints: StateSetter<NullablePosition[]>;
  isGameOver: boolean;
  setIsGameOver: StateSetter<boolean>;
  shouldStopGame: boolean;
  isMainMenu: boolean;
  setIsMainMenu: StateSetter<boolean>;
  heroVelocityDowns: number[];
  setHeroVelocityDowns: StateSetter<number[]>;
  slowCount: number;
  setSlowCount: StateSetter<number>;
  lastDirections: Direction[];
  setLastDirections: StateSetter<Direction[]>;
  gameCounter: number;
  setGameCounter: StateSetter<number>;
  gameStage: number;
  isTwoPlayers: boolean;
  setIsTwoPlayers: StateSetter<boolean>;
};
