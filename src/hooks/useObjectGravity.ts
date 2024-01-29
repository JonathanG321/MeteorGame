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
  isSlow: boolean,
  gameStageMultiplier: number,
  isCollectible = false
): FallingObjectType | null {
  let hitObjectType: FallingObjectType | null = null;
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
      return !isHittingHero;
    });

    return filteredObjects;
  });
  return hitObjectType;
}
