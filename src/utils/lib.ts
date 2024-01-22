import { Box, FallingObject, Position } from "./types";
import {
  HERO_SIZE,
  OBJECT_COLLISION_THRESHOLD,
  OBJECT_SIZE,
} from "./variables";

export function createObjectStyle(position: Position, size: number) {
  return {
    top: position.Y + "px",
    left: position.X + "px",
    height: size + "px",
    width: size + "px",
  };
}

export function countDownTo0(prevCount: number, isSlow: boolean) {
  const dropAmount = isSlow ? 1 : 2;
  return prevCount > 0 ? prevCount - dropAmount : 0;
}

export function isObjectCollidingWithHero(
  object: FallingObject,
  heroPosition: Position
) {
  const heroBox = createBoxFromPositionAndSize(heroPosition, HERO_SIZE);
  const objectBox = createBoxFromPositionAndSize(
    {
      X: object.X + OBJECT_COLLISION_THRESHOLD,
      Y: object.Y + OBJECT_COLLISION_THRESHOLD,
    },
    OBJECT_SIZE - OBJECT_COLLISION_THRESHOLD * 2
  );

  return doBoxesOverlap(heroBox, objectBox) ? object.id : "";
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
