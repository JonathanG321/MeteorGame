import { MutableRefObject } from "react";

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

export type FallingObject = Position & {
  id: string;
  type: FallingObjectType;
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
  setHitObjectType: (hitObjectType: FallingObjectType) => void;
};
export type FallingObjectOptions =
  | FallingObjectOptionsNoCollectable
  | FallingObjectOptionsIsCollectable;

export type ObjectWithRefs<T> = {
  [K in keyof T]: MutableRefObject<T[K]>;
};

export type ContextValues = {
  isHit: boolean;
  powerUpPositions: FallingObject[];
  setPowerUpPositions: React.Dispatch<React.SetStateAction<FallingObject[]>>;
  meteorPositions: FallingObject[];
  setMeteorPositions: React.Dispatch<React.SetStateAction<FallingObject[]>>;
  lives: number;
  setLives: React.Dispatch<React.SetStateAction<number>>;
  setInvincibleCount: React.Dispatch<React.SetStateAction<number>>;
  invincibleCount: number;
  setShieldCount: React.Dispatch<React.SetStateAction<number>>;
  shieldCount: number;
  mousePressPosition: NullablePosition;
  setMousePressPosition: React.Dispatch<React.SetStateAction<NullablePosition>>;
  pressedKeys: PressedKeys;
  setPressedKeys: React.Dispatch<React.SetStateAction<PressedKeys>>;
  points: number;
  setPoints: React.Dispatch<React.SetStateAction<number>>;
  highScore: number;
  setHighScore: React.Dispatch<React.SetStateAction<number>>;
  heroOriginPoint: Position;
  setHeroOriginPoint: React.Dispatch<React.SetStateAction<Position>>;
  isGameOver: boolean;
  setIsGameOver: React.Dispatch<React.SetStateAction<boolean>>;
  shouldStopGame: boolean;
  isMainMenu: boolean;
  setIsMainMenu: React.Dispatch<React.SetStateAction<boolean>>;
  hitObjectType: FallingObjectType | null;
  setHitObjectType: React.Dispatch<
    React.SetStateAction<FallingObjectType | null>
  >;
  heroVelocityDown: number;
  setHeroVelocityDown: React.Dispatch<React.SetStateAction<number>>;
  slowCount: number;
  setSlowCount: React.Dispatch<React.SetStateAction<number>>;
  hero: {
    position: Position;
    updatePosition: (partialPosition: Partial<Position>) => void;
  };
};
