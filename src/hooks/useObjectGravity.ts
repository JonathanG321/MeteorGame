import { isObjectCollidingWithHero, isValidPosition } from "../utils/lib";
import {
  ContextValues,
  FallingObject,
  FallingObjectType,
  ObjectWithRefs,
} from "../utils/types";
import { OBJECT_SIZE, SCREEN_HEIGHT } from "../utils/variables";

export default function useObjectGravity(
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

  function objectSetter(oldValue: FallingObject[]) {
    return oldValue
      .map((object) => ({
        ...object,
        Y: object.Y + object.speed * gameStageMultiplier * speedMultiplier,
      }))
      .filter((object) => object.Y <= SCREEN_HEIGHT + OBJECT_SIZE);
  }

  function objectSetterCollectable(oldValue: FallingObject[]) {
    return oldValue
      .map((object) => ({
        ...object,
        Y: object.Y + object.speed * gameStageMultiplier * speedMultiplier,
      }))
      .filter((object) => {
        const isHeroValid = isValidPosition(heroOriginPoint);
        const isHeroTwoValid = isValidPosition(heroTwoOriginPoint);

        const isHittingHero =
          isHeroValid && isObjectCollidingWithHero(object, heroOriginPoint);
        const isHittingHeroTwo =
          isHeroTwoValid &&
          isObjectCollidingWithHero(object, heroTwoOriginPoint);

        if (isHittingHero || isHittingHeroTwo) {
          type = object.type;
          if (isHittingHeroTwo) isPlayerTwo = true;
          return false;
        }

        return true;
      });
  }

  setPowerUpPositions(objectSetterCollectable);
  setMeteorPositions(objectSetter);

  return { type, isPlayerTwo };
}
