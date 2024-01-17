import { isObjectCollidingWithHero } from "../utils/lib";
import { FallingObject, Position } from "../utils/types";

export default function useDetectCollision(
  objectPositions: FallingObject[],
  heroPosition: Position
) {
  return objectPositions.reduce(
    (result, object) =>
      result || isObjectCollidingWithHero(object, heroPosition),
    ""
  );
}
