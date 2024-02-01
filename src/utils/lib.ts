import {
  FallingObject,
  FallingObjectType,
  NullablePosition,
  Object,
  Position,
} from "./types";
import { HERO_SIZE, OBJECT_COLLISION_THRESHOLD } from "./variables";

export function createObjectStyle(object: Object) {
  return {
    top: object.Y + "px",
    left: object.X + "px",
    height: object.size + "px",
    width: object.size + "px",
  };
}

export function isValidPosition(
  position: NullablePosition
): position is Position {
  return position.X !== null && position.X !== null;
}

export function countDownTo0(prevCount: number, isSlow: boolean) {
  const dropAmount = isSlow ? 1 : 2;
  return prevCount > 0 ? prevCount - dropAmount : 0;
}

export function shouldShowFlash(count: number, isSlow: boolean) {
  const countMod = (count / 2) % 8;
  if (!isSlow) return countMod < 4;

  const slowCountMod = (count / 2) % 16;
  return slowCountMod < 8;
}

export function getPowerUpList(gameStage: number) {
  let powerUpList: FallingObjectType[] = ["pointsSmall", "health"];
  if (gameStage >= 2) powerUpList = powerUpList.concat(["pointsMedium"]);
  if (gameStage >= 3) powerUpList = powerUpList.concat(["shield"]);
  if (gameStage >= 4)
    powerUpList = powerUpList.concat(["pointsLarge", "pointsSmall"]);
  if (gameStage >= 5)
    powerUpList = powerUpList.concat(["slow", "pointsMedium", "pointsSmall"]);
  return powerUpList;
}

export function randomInRange(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

export function isCountAtThreshold(currentCount: number, threshold: number) {
  return currentCount <= threshold && currentCount + 1 > threshold;
}

export function resetAudio(audio: HTMLAudioElement) {
  audio.pause();
  audio.currentTime = 0;
}
export function playAudio(audio: HTMLAudioElement, volume = 0.7) {
  audio.currentTime = 0;
  audio.volume = volume;
  audio.play();
}

export function detectCollision(
  objectPositions: FallingObject[],
  heroPosition: Position
) {
  return objectPositions.reduce(
    (result, object) =>
      result || isObjectCollidingWithHero(object, heroPosition),
    ""
  );
}

export function isObjectCollidingWithHero(
  object: Object,
  heroPosition: Position
) {
  const heroLeft = heroPosition.X;
  const heroTop = heroPosition.Y;
  const heroRight = heroLeft + HERO_SIZE;
  const heroBottom = heroTop + HERO_SIZE;

  const objectLeft = object.X + OBJECT_COLLISION_THRESHOLD;
  const objectTop = object.Y + OBJECT_COLLISION_THRESHOLD;
  const objectRight = objectLeft + object.size - OBJECT_COLLISION_THRESHOLD * 2;
  const objectBottom = objectTop + object.size - OBJECT_COLLISION_THRESHOLD * 2;

  const isHeroColliding =
    heroLeft < objectRight &&
    heroRight > objectLeft &&
    heroTop < objectBottom &&
    heroBottom > objectTop;

  return isHeroColliding ? object.id : "";
}
