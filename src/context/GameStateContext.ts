import { createContext } from "react";
import {
  BASE_PRESSED_KEYS,
  DEFAULT_ONE_PLAYER,
  NULL_POSITION,
} from "../utils/variables";
import {
  FallingObject,
  NullablePosition,
  PressedKeys,
  ContextValues,
  NullablePlayer,
} from "../utils/types";

function stateSetterNumber(_: React.SetStateAction<number>): void {}
function stateSetterPlayers(_: React.SetStateAction<NullablePlayer[]>): void {}
function stateSetterBoolean(_: React.SetStateAction<boolean>): void {}
function stateSetterPressedKeys(_: React.SetStateAction<PressedKeys>): void {}
function stateSetterFallingObject(
  _: React.SetStateAction<FallingObject[]>
): void {}

export const GameStateContext = createContext({
  players: DEFAULT_ONE_PLAYER,
  setPlayers: stateSetterPlayers,
  setSlowCount: stateSetterNumber,
  slowCount: 0,
  mousePressPosition: NULL_POSITION as NullablePosition,
  highScore: 0,
  setHighScore: stateSetterNumber,
  pressedKeys: BASE_PRESSED_KEYS,
  setPressedKeys: stateSetterPressedKeys,
  fallingObjectPositions: [] as FallingObject[],
  setFallingObjectPositions: stateSetterFallingObject,
  isGameOver: false,
  setIsGameOver: stateSetterBoolean,
  isMainMenu: true,
  setIsMainMenu: stateSetterBoolean,
  gameCounter: 0,
  setGameCounter: stateSetterNumber,
  isTwoPlayers: false,
  setIsTwoPlayers: stateSetterBoolean,
  isHit: false,
  isHitTwo: false,
  gameStage: 1,
} as ContextValues);
