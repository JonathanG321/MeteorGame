import {
  FallingObject,
  FallingObjectType,
  NullablePosition,
  Object,
  Player,
  NullablePlayer,
  Position,
  StateSetter,
} from "./types";
import {
  HALF_OVER_PI,
  HERO_SIZE,
  OBJECT_COLLISION_THRESHOLD,
} from "./variables";

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
  return !!position && position.X !== null && position.X !== null;
}

export function countDownTo0(prevCount: number, isSlow: boolean) {
  const dropAmount = isSlow ? 1 : 2;
  return Math.max(prevCount - dropAmount, 0);
}

export function shouldShowFlash(count: number, isSlow: boolean): boolean {
  const countMod = (count / 2) % 8;
  const slowCountMod = (count / 2) % 16;

  return isSlow ? slowCountMod < 8 : countMod < 4;
}

export function getPowerUpList(gameStage: number): FallingObjectType[] {
  const powerUpList: FallingObjectType[] = ["pointsSmall", "health"];

  if (gameStage >= 2) powerUpList.push("pointsMedium");
  if (gameStage >= 3) powerUpList.push("shield");
  if (gameStage >= 4) powerUpList.push("pointsLarge", "pointsSmall");
  if (gameStage >= 5) powerUpList.push("slow", "pointsMedium", "pointsSmall");

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

  const collisionThreshold = object.size * OBJECT_COLLISION_THRESHOLD;

  const objectLeft = object.X + collisionThreshold;
  const objectTop = object.Y + collisionThreshold;

  const calcObjectSize = object.size - collisionThreshold * 2;

  const objectRight = objectLeft + calcObjectSize;
  const objectBottom = objectTop + calcObjectSize;

  const isHeroColliding =
    heroLeft < objectRight &&
    heroRight > objectLeft &&
    heroTop < objectBottom &&
    heroBottom > objectTop;

  return isHeroColliding ? object.id : "";
}

export function calcIsHits(
  meteorPositions: FallingObject[],
  players: NullablePlayer[]
) {
  return players.map((player) =>
    isValidPosition(player) ? !!detectCollision(meteorPositions, player) : false
  );
}

export function calcRotationAngle(offset: number, speed: number) {
  return Math.atan(offset / -speed) * HALF_OVER_PI;
}

export function notEmpty<TValue>(
  value: TValue | null | undefined
): value is TValue {
  return value !== null && value !== undefined;
}

export function setPlayerValue(
  prev: NullablePlayer[],
  index: number,
  newPlayer: Partial<Player>
): NullablePlayer[] {
  return prev.map((player, i) => {
    if (i !== index || !player) return player;
    return { ...(player as Player), ...newPlayer };
  });
}
export function setPlayerValueFunction(
  index: number,
  newPlayer: Partial<Player>,
  setPlayer: StateSetter<NullablePlayer[]>
) {
  setPlayer((prev) => setPlayerValue(prev, index, newPlayer));
}
