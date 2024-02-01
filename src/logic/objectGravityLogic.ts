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
    heroOriginPoint: { current: heroOriginPoint },
    heroTwoOriginPoint: { current: heroTwoOriginPoint },
    slowCount: { current: slowCount },
    setPowerUpPositions: { current: setPowerUpPositions },
    setMeteorPositions: { current: setMeteorPositions },
  } = contextRefs;

  const isSlow = !!slowCount;
  let type: FallingObjectType | null = null;
  let isPlayerTwo = false;

  const speedMultiplier = isSlow ? 0.5 : 1;
  const calcDifficultyModifier = gameStageMultiplier * speedMultiplier;

  function objectSetterCollectable(oldValue: FallingObject[]) {
    return oldValue
      .map((object) => calcObjectsFalling(object, calcDifficultyModifier))
      .filter((object) => {
        const isInBounds = object.Y <= SCREEN_HEIGHT + OBJECT_SIZE;
        if (!isInBounds) return false;

        const { isHittingHero, isHittingHeroTwo } = heroCollisionCalcs(
          object,
          heroOriginPoint,
          heroTwoOriginPoint
        );

        if (!isHittingHero && !isHittingHeroTwo) return true;

        type = object.type;
        if (isHittingHeroTwo) isPlayerTwo = true;
        return false;
      });
  }

  setPowerUpPositions(objectSetterCollectable);
  setMeteorPositions((object) => objectSetter(object, calcDifficultyModifier));

  return { type, isPlayerTwo };
}

function objectSetter(
  oldValue: FallingObject[],
  calcDifficultyModifier: number
) {
  return oldValue
    .map((object) => calcObjectsFalling(object, calcDifficultyModifier))
    .filter(outOfBoundsFilter);
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

function outOfBoundsFilter(object: FallingObject) {
  return object.Y <= SCREEN_HEIGHT + OBJECT_SIZE;
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
