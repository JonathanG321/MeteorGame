import { isObjectCollidingWithHero, isValidPosition } from "../utils/lib";
import {
  ContextValues,
  FallingObject,
  FallingObjectType,
  NullablePosition,
  ObjectWithRefs,
} from "../utils/types";
import { OBJECT_SIZE, SCREEN_HEIGHT } from "../utils/variables";

export default function objectGravityLogic(
  contextRefs: ObjectWithRefs<ContextValues>,
  gameStageMultiplier: number
): {
  type: FallingObjectType | null;
  isPlayerTwo: boolean;
} {
  const {
    heroOriginPoints: { current: heroOriginPoints },
    slowCount: { current: slowCount },
    setFallingObjectPositions: { current: setFallingObjectPositions },
  } = contextRefs;

  const isSlow = !!slowCount;
  let type: FallingObjectType | null = null;
  let isPlayerTwo = false;

  const speedMultiplier = isSlow ? 0.5 : 1;
  const calcDifficultyModifier = gameStageMultiplier * speedMultiplier;

  function filterAndCheckHeroCollisions(object: FallingObject) {
    if (isObjectOutOfBounds(object)) {
      return false;
    } else if (isMeteorOrSpecialMeteor(object)) {
      return true;
    }

    const { isHittingHero, isHittingHeroTwo } = heroCollisionCalcs(
      object,
      heroOriginPoints[0],
      heroOriginPoints[1]
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

function isObjectOutOfBounds(object: FallingObject) {
  return !(object.Y <= SCREEN_HEIGHT + OBJECT_SIZE);
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
    Y: object.Y + object.speed * calcDifficultyModifier,
  };
}

function heroCollisionCalcs(
  object: FallingObject,
  heroOriginPoint: NullablePosition,
  heroTwoOriginPoint: NullablePosition
) {
  const isHeroValid = isValidPosition(heroOriginPoint);
  const isHeroTwoValid = isValidPosition(heroTwoOriginPoint);

  const isHittingHero =
    isHeroValid && isObjectCollidingWithHero(object, heroOriginPoint);
  const isHittingHeroTwo =
    isHeroTwoValid && isObjectCollidingWithHero(object, heroTwoOriginPoint);
  return { isHittingHero, isHittingHeroTwo };
}
