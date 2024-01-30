import { createContext } from "react";
import {
  BASE_PRESSED_KEYS,
  HERO_SPAWN_POINT,
  NULL_POSITION,
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
function stateSetterBoolean(_: React.SetStateAction<boolean>): void {}
function stateSetterPosition(_: React.SetStateAction<Position>): void {}
function stateSetterDirection(_: React.SetStateAction<Direction>): void {}
function stateSetterPressedKeys(_: React.SetStateAction<PressedKeys>): void {}
function stateSetterFallingObject(
  _: React.SetStateAction<FallingObject[]>
): void {}

export const GameStateContext = createContext({
  setSlowCount: stateSetterNumber,
  slowCount: 0,
  setShieldCount: stateSetterNumber,
  shieldCount: 0,
  setInvincibleCount: stateSetterNumber,
  invincibleCount: 0,
  lives: 3,
  setLives: stateSetterNumber,
  mousePressPosition: NULL_POSITION as NullablePosition,
  setMousePressPosition: stateSetterPosition,
  highScore: 0,
  setHighScore: stateSetterNumber,
  setHeroOriginPoint: stateSetterPosition,
  heroVelocityDown: 0,
  setHeroVelocityDown: stateSetterNumber,
  points: 0,
  setPoints: stateSetterNumber,
  pressedKeys: BASE_PRESSED_KEYS,
  setPressedKeys: stateSetterPressedKeys,
  meteorPositions: [] as FallingObject[],
  setMeteorPositions: stateSetterFallingObject,
  powerUpPositions: [] as FallingObject[],
  setPowerUpPositions: stateSetterFallingObject,
  isGameOver: false,
  setIsGameOver: stateSetterBoolean,
  isMainMenu: true,
  setIsMainMenu: stateSetterBoolean,
  lastDirection: "right" as Direction,
  setLastDirection: stateSetterDirection,
  gameCounter: 0,
  setGameCounter: stateSetterNumber,
  isTwoPlayers: false,
  setIsTwoPlayers: stateSetterBoolean,
  isHit: false,
  heroOriginPoint: HERO_SPAWN_POINT,
  shouldStopGame: false,
  gameStage: 1,
  heroTwoOriginPoint: HERO_SPAWN_POINT,
  setHeroTwoOriginPoint: stateSetterPosition,
  lastDirectionTwo: "right" as Direction,
  setLastDirectionTwo: stateSetterDirection,
  heroVelocityDownTwo: 0,
  setHeroVelocityDownTwo: stateSetterNumber,
  pointsTwo: 0,
  setPointsTwo: stateSetterNumber,
  livesTwo: 3,
  setLivesTwo: stateSetterNumber,
  invincibleCountTwo: 0,
  setInvincibleCountTwo: stateSetterNumber,
  shieldCountTwo: 0,
  setShieldCountTwo: stateSetterNumber,
} as ContextValues);
