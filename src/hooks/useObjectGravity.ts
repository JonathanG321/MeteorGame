import { isObjectCollidingWithHero, isValidPosition } from "../utils/lib";
import {
  FallingObject,
  FallingObjectType,
  NullablePosition,
  StateSetter,
} from "../utils/types";
import { OBJECT_SIZE, SCREEN_HEIGHT } from "../utils/variables";

export default function useObjectGravity(
  setObjectPositions: StateSetter<FallingObject[]>,
  heroOriginPoint: NullablePosition,
  heroTwoOriginPoint: NullablePosition,
  isSlow: boolean,
  gameStageMultiplier: number,
  isCollectible = false
): { hitObjectType: FallingObjectType | null; isHeroTwo: boolean } {
  let hitObjectType: FallingObjectType | null = null;
  let isHeroTwo = false;
  setObjectPositions((oldValue) => {
    const updatedObjects = oldValue.map((object) => {
      const speed = object.speed * gameStageMultiplier;
      return {
        ...object,
        Y: object.Y + (isSlow ? speed / 2 : speed),
      };
    });

    if (!isCollectible) {
      return updatedObjects.filter(
        (object) => object.Y <= SCREEN_HEIGHT + OBJECT_SIZE
      );
    }

    const filteredObjects = updatedObjects.filter((object) => {
      const isObjectInBounds = object.Y <= SCREEN_HEIGHT + OBJECT_SIZE;

      if (!isObjectInBounds || !isValidPosition(heroOriginPoint)) return false;

      const isHittingHero = !!isObjectCollidingWithHero(
        object,
        heroOriginPoint
      );
      if (isHittingHero) hitObjectType = object.type;

      if (!isValidPosition(heroTwoOriginPoint)) return !isHittingHero;

      const isHittingHeroTwo = !!isObjectCollidingWithHero(
        object,
        heroTwoOriginPoint
      );
      isHeroTwo = isHittingHeroTwo;
      return !(isHittingHero || isHittingHeroTwo);
    });

    return filteredObjects;
  });
  return { hitObjectType, isHeroTwo };
}
