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
  const heroLeft = heroPosition.X;
  const heroTop = heroPosition.Y;
  const heroRight = heroLeft + HERO_SIZE;
  const heroBottom = heroTop + HERO_SIZE;

  const objectLeft = object.X + OBJECT_COLLISION_THRESHOLD;
  const objectTop = object.Y + OBJECT_COLLISION_THRESHOLD;
  const objectRight = objectLeft + OBJECT_SIZE - OBJECT_COLLISION_THRESHOLD * 2;
  const objectBottom = objectTop + OBJECT_SIZE - OBJECT_COLLISION_THRESHOLD * 2;

  const isHeroColliding =
    heroLeft < objectRight &&
    heroRight > objectLeft &&
    heroTop < objectBottom &&
    heroBottom > objectTop;

  return isHeroColliding ? object.id : "";
}
