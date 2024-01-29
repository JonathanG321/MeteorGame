import { MutableRefObject } from "react";

export type Direction = "right" | "left";

export type PressedKeys = {
  ArrowUp: boolean;
  ArrowDown: boolean;
  ArrowLeft: boolean;
  ArrowRight: boolean;
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
  powerUpPositions: FallingObject[];
  setPowerUpPositions: StateSetter<FallingObject[]>;
  meteorPositions: FallingObject[];
  setMeteorPositions: StateSetter<FallingObject[]>;
  lives: number;
  setLives: StateSetter<number>;
  setInvincibleCount: StateSetter<number>;
  invincibleCount: number;
  setShieldCount: StateSetter<number>;
  shieldCount: number;
  mousePressPosition: NullablePosition;
  setMousePressPosition: StateSetter<NullablePosition>;
  pressedKeys: PressedKeys;
  setPressedKeys: StateSetter<PressedKeys>;
  points: number;
  setPoints: StateSetter<number>;
  highScore: number;
  setHighScore: StateSetter<number>;
  heroOriginPoint: NullablePosition;
  setHeroOriginPoint: StateSetter<NullablePosition>;
  isGameOver: boolean;
  setIsGameOver: StateSetter<boolean>;
  shouldStopGame: boolean;
  isMainMenu: boolean;
  setIsMainMenu: StateSetter<boolean>;
  heroVelocityDown: number;
  setHeroVelocityDown: StateSetter<number>;
  slowCount: number;
  setSlowCount: StateSetter<number>;
  lastDirection: Direction;
  setLastDirection: StateSetter<Direction>;
  gameCounter: number;
  setGameCounter: StateSetter<number>;
  gameStage: number;
  isTwoPlayers: boolean;
  setIsTwoPlayers: StateSetter<boolean>;
};
