import { isValidPosition, setPlayerValueFunction } from "../utils/lib";
import {
  ContextValues,
  Direction,
  NullablePlayer,
  ObjectWithRefs,
  Player,
  StateSetter,
} from "../utils/types";
import { HERO_SPEED, WIDTH_MINUS_HERO } from "../utils/variables";

export default function heroMovementLogicX(
  contextRefs: ObjectWithRefs<ContextValues>,
  contextValues: ContextValues
) {
  const { players, pressedKeys, slowCount } = contextRefs;
  const { setPlayers, scale } = contextValues;
  const { ArrowLeft, ArrowRight, a, d } = pressedKeys.current;
  const isSlow = !!slowCount.current;

  players.current.forEach((player, index) => {
    if (!isValidPosition(player)) return;
    const left = index === 0 ? ArrowLeft : a;
    const right = index === 0 ? ArrowRight : d;
    singleHeroLogicX(player, left, right, isSlow, index, scale, setPlayers);
  });
}

function singleHeroLogicX(
  player: Player,
  pressedKeyLeft: boolean,
  pressedKeyRight: boolean,
  isSlow: boolean,
  index: number,
  scale: number,
  setPlayer: StateSetter<NullablePlayer[]>
) {
  if (!pressedKeyLeft && !pressedKeyRight) return;
  const heroSpeed = HERO_SPEED * scale;

  const speed = isSlow ? heroSpeed / 2 : heroSpeed;
  const direction = pressedKeyLeft ? "left" : "right";

  updatePlayerDirection(index, direction, player, setPlayer);

  const newX = calculateNewX(player.X, pressedKeyLeft, speed, scale);
  updatePlayerPosition(index, newX, player.X, setPlayer);
}

function updatePlayerDirection(
  index: number,
  direction: Direction,
  player: Player,
  setPlayer: StateSetter<NullablePlayer[]>
) {
  if (player.direction !== direction) {
    setPlayerValueFunction(index, { direction }, setPlayer);
  }
}

function calculateNewX(
  currentX: number,
  pressedKeyLeft: boolean,
  speed: number,
  scale: number
): number {
  return Math.min(
    WIDTH_MINUS_HERO * scale,
    Math.max(0, currentX + (pressedKeyLeft ? -speed : speed))
  );
}

function updatePlayerPosition(
  index: number,
  newX: number,
  currentX: number,
  setPlayer: StateSetter<NullablePlayer[]>
) {
  if (newX !== currentX) {
    setPlayerValueFunction(index, { X: newX }, setPlayer);
  }
}
