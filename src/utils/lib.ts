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

export function shouldShowFlash(count: number, isSlow: boolean) {
  const countMod = (count / 2) % 8;
  if (!isSlow)
    return countMod === 0 || countMod === 1 || countMod === 2 || countMod === 3;

  const slowCountMod = (count / 2) % 16;
  return (
    slowCountMod === 0 ||
    slowCountMod === 1 ||
    slowCountMod === 2 ||
    slowCountMod === 3 ||
    slowCountMod === 4 ||
    slowCountMod === 5 ||
    slowCountMod === 6 ||
    slowCountMod === 7
  );
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
