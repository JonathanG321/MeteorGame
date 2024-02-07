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
  Animation,
} from "../utils/types";

function stateSetterNumber(_: React.SetStateAction<number>): void {}
function stateSetterPlayers(_: React.SetStateAction<NullablePlayer[]>): void {}
function stateSetterBoolean(_: React.SetStateAction<boolean>): void {}
function stateSetterPressedKeys(_: React.SetStateAction<PressedKeys>): void {}
function stateSetterAnimations(_: React.SetStateAction<Animation[]>): void {}
function stateSetterFallingObjects(
  _: React.SetStateAction<FallingObject[]>
): void {}

export const GameStateContext = createContext({
  screenWidth: 0,
  screenHeight: 0,
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
  setFallingObjectPositions: stateSetterFallingObjects,
  animationPositions: [] as Animation[],
  setAnimationPositions: stateSetterAnimations,
  isGameOver: false,
  setIsGameOver: stateSetterBoolean,
  isMainMenu: true,
  setIsMainMenu: stateSetterBoolean,
  gameCounter: 0,
  setGameCounter: stateSetterNumber,
  isTwoPlayers: false,
  setIsTwoPlayers: stateSetterBoolean,
  isHits: [false, false],
  gameStage: 1,
} as ContextValues);
