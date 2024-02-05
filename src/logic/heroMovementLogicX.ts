import { isValidPosition, setPlayerValueFunction } from "../utils/lib";
import {
  ContextValues,
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
  const { setPlayers } = contextValues;
  const { ArrowLeft, ArrowRight, a, d } = pressedKeys.current;
  const isSlow = !!slowCount.current;

  players.current.forEach((player, index) => {
    if (!isValidPosition(player)) return;
    const left = index === 0 ? ArrowLeft : a;
    const right = index === 0 ? ArrowRight : d;
    singleHeroLogicX(player, left, right, isSlow, index, setPlayers);
  });
}

function singleHeroLogicX(
  player: Player,
  pressedKeyLeft: boolean,
  pressedKeyRight: boolean,
  isSlow: boolean,
  index: number,
  setPlayer: StateSetter<NullablePlayer[]>
) {
  if (!pressedKeyLeft && !pressedKeyRight) return;

  const speed = isSlow ? HERO_SPEED / 2 : HERO_SPEED;
  const direction = pressedKeyLeft ? "left" : "right";

  if (player.direction !== direction)
    setPlayerValueFunction(index, { direction: direction }, setPlayer);

  let newX = Math.min(
    WIDTH_MINUS_HERO,
    Math.max(0, player.X + (pressedKeyLeft ? -speed : speed))
  );

  if (newX !== player.X) setPlayerValueFunction(index, { X: newX }, setPlayer);
}
