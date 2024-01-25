import { isObjectCollidingWithHero } from "../utils/lib";
import {
  FallingObject,
  FallingObjectType,
  Position,
  StateSetter,
} from "../utils/types";
import { OBJECT_GRAVITY, OBJECT_SIZE, SCREEN_HEIGHT } from "../utils/variables";

export default function useObjectGravity(
  setObjectPositions: StateSetter<FallingObject[]>,
  heroOriginPoint: Position,
  isSlow: boolean,
  gameStageMultiplier: number,
  isCollectible = false
): FallingObjectType | null {
  let hitObjectType: FallingObjectType | null = null;
  setObjectPositions((oldValue) => {
    const objectGravity = OBJECT_GRAVITY * gameStageMultiplier;
    const updatedObjects = oldValue.map((object) => ({
      ...object,
      Y: object.Y + (isSlow ? objectGravity / 2 : objectGravity),
    }));

    if (!isCollectible) {
      return updatedObjects.filter(
        (object) => object.Y <= SCREEN_HEIGHT + OBJECT_SIZE
      );
    }

    const filteredObjects = updatedObjects.filter((object) => {
      const isObjectInBounds = object.Y <= SCREEN_HEIGHT + OBJECT_SIZE;

      if (!isObjectInBounds) return false;

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
