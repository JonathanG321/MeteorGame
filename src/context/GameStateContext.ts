import { createContext } from "react";
import { BASE_PRESSED_KEYS, NULL_POSITION } from "../utils/variables";
import {
  FallingObject,
  NullablePosition,
  PressedKeys,
  ContextValues,
  NullablePlayer,
  Animation,
} from "../utils/types";
import { getDefaultOnePlayer } from "../utils/lib";

function stateSetterNumber(_: React.SetStateAction<number>): void {}
function stateSetterPlayers(_: React.SetStateAction<NullablePlayer[]>): void {}
function stateSetterBoolean(_: React.SetStateAction<boolean>): void {}
function stateSetterPressedKeys(_: React.SetStateAction<PressedKeys>): void {}
function stateSetterAnimations(_: React.SetStateAction<Animation[]>): void {}
function stateSetterFallingObjects(
  _: React.SetStateAction<FallingObject[]>
): void {}

export const GameStateContext = createContext({
  scale: 1,
  screenWidth: 0,
  screenHeight: 0,
  players: getDefaultOnePlayer(1),
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
