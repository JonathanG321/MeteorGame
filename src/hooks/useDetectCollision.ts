import { Box, Position, PositionWithID } from "../utils/types";
import {
  HERO_SIZE,
  METEOR_SIZE,
  METEOR_COLLISION_THRESHOLD,
} from "../utils/variables";

export default function useDetectCollision(
  meteorPositions: PositionWithID[],
  heroPosition: Position
) {
  return meteorPositions.some((meteor) =>
    isMeteorCollidingWithHero(meteor, heroPosition)
  );
}

function isMeteorCollidingWithHero(meteor: Position, heroPosition: Position) {
  const heroBox = createBoxFromPositionAndSize(heroPosition, HERO_SIZE);
  const meteorBox = createBoxFromPositionAndSize(
    {
      X: meteor.X + METEOR_COLLISION_THRESHOLD,
      Y: meteor.Y + METEOR_COLLISION_THRESHOLD,
    },
    METEOR_SIZE - METEOR_COLLISION_THRESHOLD * 2
  );

  return doBoxesOverlap(heroBox, meteorBox);
}

function createBoxFromPositionAndSize(position: Position, size: number) {
  return {
    topLeft: position,
    bottomRight: { X: position.X + size, Y: position.Y + size },
  };
}

function doBoxesOverlap(box1: Box, box2: Box) {
  const topRight = { ...box1.topLeft, X: box1.bottomRight.X };
  const bottomLeft = { ...box1.topLeft, Y: box1.bottomRight.Y };
  return (
    isPointInsideBox(box1.topLeft, box2) ||
    isPointInsideBox(box1.bottomRight, box2) ||
    isPointInsideBox(topRight, box2) ||
    isPointInsideBox(bottomLeft, box2)
  );
}

function isPointInsideBox(point: Position, box: Box) {
  return (
    point.X >= box.topLeft.X &&
    point.X <= box.bottomRight.X &&
    point.Y >= box.topLeft.Y &&
    point.Y <= box.bottomRight.Y
  );
}
