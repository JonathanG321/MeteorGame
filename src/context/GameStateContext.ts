import { createContext } from "react";
import {
  BASE_PRESSED_KEYS,
  HERO_SPAWN_POINT,
  NULL_POSITION,
  SECOND_PLAYER_SPAWN_POINT,
} from "../utils/variables";
import {
  FallingObject,
  NullablePosition,
  Position,
  PressedKeys,
  Direction,
  ContextValues,
} from "../utils/types";

function stateSetterNumber(_: React.SetStateAction<number>): void {}
function stateSetterNumbers(_: React.SetStateAction<number[]>): void {}
function stateSetterBoolean(_: React.SetStateAction<boolean>): void {}
function stateSetterPositions(_: React.SetStateAction<Position[]>): void {}
function stateSetterDirections(_: React.SetStateAction<Direction[]>): void {}
function stateSetterPressedKeys(_: React.SetStateAction<PressedKeys>): void {}
function stateSetterFallingObject(
  _: React.SetStateAction<FallingObject[]>
): void {}

export const GameStateContext = createContext({
  setSlowCount: stateSetterNumber,
  slowCount: 0,
  setShieldCounts: stateSetterNumbers,
  shieldCounts: [0, 0],
  setInvincibleCounts: stateSetterNumbers,
  invincibleCounts: [0, 0],
  lives: [3, 3],
  setLives: stateSetterNumbers,
  mousePressPosition: NULL_POSITION as NullablePosition,
  highScore: 0,
  setHighScore: stateSetterNumber,
  setHeroOriginPoints: stateSetterPositions,
  heroVelocityDowns: [0, 0],
  setHeroVelocityDowns: stateSetterNumbers,
  points: [0, 0],
  setPoints: stateSetterNumbers,
  pressedKeys: BASE_PRESSED_KEYS,
  setPressedKeys: stateSetterPressedKeys,
  fallingObjectPositions: [] as FallingObject[],
  setFallingObjectPositions: stateSetterFallingObject,
  isGameOver: false,
  setIsGameOver: stateSetterBoolean,
  isMainMenu: true,
  setIsMainMenu: stateSetterBoolean,
  lastDirections: ["right", "right"] as Direction[],
  setLastDirections: stateSetterDirections,
  gameCounter: 0,
  setGameCounter: stateSetterNumber,
  isTwoPlayers: false,
  setIsTwoPlayers: stateSetterBoolean,
  isHit: false,
  isHitTwo: false,
  heroOriginPoints: [HERO_SPAWN_POINT, SECOND_PLAYER_SPAWN_POINT],
  shouldStopGame: false,
  gameStage: 1,
} as ContextValues);
