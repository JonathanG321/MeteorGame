import { isObjectCollidingWithHero } from "../utils/lib";
import { FallingObject, FallingObjectType, Position } from "../utils/types";
import { OBJECT_GRAVITY, OBJECT_SIZE, SCREEN_HEIGHT } from "../utils/variables";

export default function useObjectGravity(
  setObjectPositions: React.Dispatch<React.SetStateAction<FallingObject[]>>,
  setHitObjectType: React.Dispatch<
    React.SetStateAction<FallingObjectType | null>
  >,
  heroOriginPoint: Position,
  isSlow: boolean,
  isCollectible = false
) {
  setObjectPositions((oldValue) => {
    const updatedObjects = oldValue.map((object) => ({
      ...object,
      Y: object.Y + (isSlow ? OBJECT_GRAVITY / 2 : OBJECT_GRAVITY),
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
      if (isHittingHero) setHitObjectType(object.type);
      return !isHittingHero;
    });

    return filteredObjects;
  });
}
