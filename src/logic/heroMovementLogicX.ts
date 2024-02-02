import {
  isValidPosition,
  updateItemInArray,
  updateItemInArrayFunction,
} from "../utils/lib";
import {
  ContextValues,
  Direction,
  NullablePosition,
  ObjectWithRefs,
  Position,
  StateSetter,
} from "../utils/types";
import { HERO_SPEED, WIDTH_MINUS_HERO } from "../utils/variables";

export default function heroMovementLogicX(
  contextRefs: ObjectWithRefs<ContextValues>,
  contextValues: ContextValues
) {
  const {
    heroOriginPoints,
    pressedKeys,
    slowCount,
    lastDirections,
    isTwoPlayers,
  } = contextRefs;
  const { setHeroOriginPoints, setLastDirections } = contextValues;

  if (isValidPosition(heroOriginPoints.current[0]))
    singleHeroLogicX(
      heroOriginPoints.current[0].X,
      pressedKeys.current.ArrowLeft,
      pressedKeys.current.ArrowRight,
      !!slowCount.current,
      lastDirections.current[0],
      0,
      setHeroOriginPoints,
      setLastDirections
    );
  if (isTwoPlayers.current && isValidPosition(heroOriginPoints.current[1]))
    singleHeroLogicX(
      heroOriginPoints.current[1].X,
      pressedKeys.current.a,
      pressedKeys.current.d,
      !!slowCount.current,
      lastDirections.current[1],
      1,
      setHeroOriginPoints,
      setLastDirections
    );
}

function singleHeroLogicX(
  heroPositionX: Position["X"],
  pressedKeyLeft: boolean,
  pressedKeyRight: boolean,
  isSlow: boolean,
  lastDirection: Direction,
  index: number,
  updatePosition: StateSetter<NullablePosition[]>,
  setLastDirection: StateSetter<Direction[]>
) {
  if (!pressedKeyLeft && !pressedKeyRight) return;

  const speed = isSlow ? HERO_SPEED / 2 : HERO_SPEED;
  const direction = pressedKeyLeft ? "left" : "right";

  if (lastDirection !== direction)
    setLastDirection(updateItemInArrayFunction(index, direction));

  let newX = Math.min(
    WIDTH_MINUS_HERO,
    Math.max(0, heroPositionX + (pressedKeyLeft ? -speed : speed))
  );

  if (newX !== heroPositionX)
    updatePosition((prev) =>
      updateItemInArray(prev, index, { ...prev[index], X: newX })
    );
}
