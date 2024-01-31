import { isValidPosition } from "../utils/lib";
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
    heroOriginPoint,
    pressedKeys,
    slowCount,
    lastDirection,
    heroTwoOriginPoint,
    lastDirectionTwo,
    isTwoPlayers,
  } = contextRefs;
  const {
    setHeroOriginPoint,
    setLastDirection,
    setHeroTwoOriginPoint,
    setLastDirectionTwo,
  } = contextValues;

  if (isValidPosition(heroOriginPoint.current))
    singleHeroLogicX(
      heroOriginPoint.current.X,
      pressedKeys.current.ArrowLeft,
      pressedKeys.current.ArrowRight,
      !!slowCount.current,
      lastDirection.current,
      setHeroOriginPoint,
      setLastDirection
    );
  if (isTwoPlayers.current && isValidPosition(heroTwoOriginPoint.current))
    singleHeroLogicX(
      heroTwoOriginPoint.current.X,
      pressedKeys.current.a,
      pressedKeys.current.d,
      !!slowCount.current,
      lastDirectionTwo.current,
      setHeroTwoOriginPoint,
      setLastDirectionTwo
    );
}

function singleHeroLogicX(
  heroPositionX: Position["X"],
  pressedKeyLeft: boolean,
  pressedKeyRight: boolean,
  isSlow: boolean,
  lastDirection: Direction,
  updatePosition: StateSetter<NullablePosition>,
  setLastDirection: StateSetter<Direction>
) {
  if (!pressedKeyLeft && !pressedKeyRight) return;

  const speed = isSlow ? HERO_SPEED / 2 : HERO_SPEED;
  const direction = pressedKeyLeft ? "left" : "right";

  if (lastDirection !== direction) setLastDirection(direction);

  let newX = Math.min(
    WIDTH_MINUS_HERO,
    Math.max(0, heroPositionX + (pressedKeyLeft ? -speed : speed))
  );

  if (newX !== heroPositionX) updatePosition((prev) => ({ ...prev, X: newX }));
}
