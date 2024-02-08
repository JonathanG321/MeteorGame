import { isObjectCollidingWithHero, isValidPosition } from "../utils/lib";
import {
  ContextValues,
  FallingObject,
  FallingObjectType,
  NullablePosition,
  ObjectWithRefs,
} from "../utils/types";
import { OBJECT_SIZE } from "../utils/variables";

export default function objectGravityLogic(
  contextRefs: ObjectWithRefs<ContextValues>,
  gameStageMultiplier: number
): {
  type: FallingObjectType | null;
  isPlayerTwo: boolean;
} {
  const {
    players: { current: players },
    slowCount: { current: slowCount },
    setFallingObjectPositions: { current: setFallingObjectPositions },
    screenHeight: { current: screenHeight },
    screenWidth: { current: screenWidth },
    scale: { current: scale },
  } = contextRefs;

  const isSlow = !!slowCount;
  let type: FallingObjectType | null = null;
  let isPlayerTwo = false;

  const speedMultiplier = isSlow ? 0.5 : 1;
  const calcDifficultyModifier = gameStageMultiplier * speedMultiplier;

  function filterAndCheckHeroCollisions(object: FallingObject) {
    if (isObjectOutOfBounds(object, screenHeight, screenWidth, scale)) {
      return false;
    } else if (isMeteorOrSpecialMeteor(object)) {
      return true;
    }

    const { isHittingHero, isHittingHeroTwo } = heroCollisionCalcs(
      object,
      players[0],
      players[1],
      scale
    );

    if (!isHittingHero && !isHittingHeroTwo) {
      return true;
    }

    type = object.type;
    if (isHittingHeroTwo) {
      isPlayerTwo = true;
    }

    return false;
  }

  function objectSetterCollectable(oldValue: FallingObject[]) {
    return oldValue
      .map((object) => calcObjectsFalling(object, calcDifficultyModifier))
      .filter(filterAndCheckHeroCollisions);
  }

  setFallingObjectPositions(objectSetterCollectable);

  return { type, isPlayerTwo };
}

function isObjectOutOfBounds(
  object: FallingObject,
  screenHeight: number,
  screenWidth: number,
  scale: number
) {
  return (
    object.Y >= screenHeight + OBJECT_SIZE * scale ||
    object.X >= screenWidth ||
    object.X <= -object.size
  );
}

function isMeteorOrSpecialMeteor(object: FallingObject) {
  return object.type === "meteor" || object.type === "specialMeteor";
}

function calcObjectsFalling(
  object: FallingObject,
  calcDifficultyModifier: number
) {
  return {
    ...object,
    X: object.X + object.angleOffset,
    Y: object.Y + object.speed * calcDifficultyModifier,
  };
}

function heroCollisionCalcs(
  object: FallingObject,
  heroOriginPoint: NullablePosition,
  heroTwoOriginPoint: NullablePosition,
  scale: number
) {
  const isHeroValid = isValidPosition(heroOriginPoint);
  const isHeroTwoValid = isValidPosition(heroTwoOriginPoint);

  const isHittingHero =
    isHeroValid && isObjectCollidingWithHero(object, heroOriginPoint, scale);
  const isHittingHeroTwo =
    isHeroTwoValid &&
    isObjectCollidingWithHero(object, heroTwoOriginPoint, scale);
  return { isHittingHero, isHittingHeroTwo };
}
