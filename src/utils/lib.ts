import {
  FallingObject,
  FallingObjectType,
  NullablePosition,
  Object,
  Player,
  NullablePlayer,
  Position,
  StateSetter,
  FontSize,
} from "./types";
import {
  HALF_OVER_PI,
  HEIGHT_MINUS_HERO,
  HERO_SIZE,
  OBJECT_COLLISION_THRESHOLD,
  SCREEN_WIDTH,
  NULL_POSITION,
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
export function pauseAudio(audio: HTMLAudioElement, volume = 0.7) {
  audio.pause();
}
export function resumeAudio(audio: HTMLAudioElement, volume = 0.7) {
  if (audio.currentTime !== 0) audio.play();
}

export function detectCollision(
  objectPositions: FallingObject[],
  heroPosition: Position,
  scale: number
) {
  return objectPositions.reduce(
    (result, object) =>
      result || isObjectCollidingWithHero(object, heroPosition, scale),
    ""
  );
}

export function isObjectCollidingWithHero(
  object: Object,
  heroPosition: Position,
  scale: number
) {
  const heroSize = HERO_SIZE * scale;
  const heroLeft = heroPosition.X;
  const heroTop = heroPosition.Y;
  const heroRight = heroLeft + heroSize;
  const heroBottom = heroTop + heroSize;

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
  players: NullablePlayer[],
  scale: number
) {
  return players.map((player) =>
    isValidPosition(player)
      ? !!detectCollision(meteorPositions, player, scale)
      : false
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

export function getFontSize(size: FontSize, scale: number) {
  switch (size) {
    case "sm":
      return { fontSize: `${14 * scale}px`, lineHeight: `${20 * scale}px` };
    case "md":
      return { fontSize: `${16 * scale}px`, lineHeight: `${24 * scale}px` };
    case "lg":
      return { fontSize: `${18 * scale}px`, lineHeight: `${28 * scale}px` };
    case "xl":
      return { fontSize: `${20 * scale}px`, lineHeight: `${28 * scale}px` };
    case "2xl":
      return { fontSize: `${24 * scale}px`, lineHeight: `${32 * scale}px` };
    case "3xl":
      return { fontSize: `${30 * scale}px`, lineHeight: `${36 * scale}px` };
    case "4xl":
      return { fontSize: `${36 * scale}px`, lineHeight: `${40 * scale}px` };
    case "5xl":
      return { fontSize: `${48 * scale}px`, lineHeight: 1 };
  }
}
export function getHeroSpawnPoint(scale: number): NullablePosition {
  return {
    X: (SCREEN_WIDTH * scale) / 2 - HERO_SIZE * scale,
    Y: HEIGHT_MINUS_HERO * scale,
  };
}
export function getFirstPlayerSpawnPoint(scale: number): NullablePosition {
  return {
    X: (SCREEN_WIDTH * scale) / 3 - HERO_SIZE * scale,
    Y: HEIGHT_MINUS_HERO * scale,
  };
}
export function getSecondPlayerSpawnPoint(scale: number): NullablePosition {
  return {
    X: ((SCREEN_WIDTH * scale) / 3) * 2 - HERO_SIZE * scale,
    Y: HEIGHT_MINUS_HERO * scale,
  };
}
const basicPlayerValues: Omit<Player, "X" | "Y"> = {
  points: 0,
  velocityDown: 0,
  direction: "right",
  invincibleCount: 0,
  lives: 3,
  shieldCount: 0,
};
export function getDefaultOnePlayer(scale: number): NullablePlayer[] {
  return [
    {
      ...getHeroSpawnPoint(scale),
      ...basicPlayerValues,
    },
    {
      ...NULL_POSITION,
      ...basicPlayerValues,
    },
  ];
}
export function getDefaultTwoPlayers(scale: number): NullablePlayer[] {
  return [
    {
      ...getHeroSpawnPoint(scale),
      ...basicPlayerValues,
    },
    {
      ...getSecondPlayerSpawnPoint(scale),
      ...basicPlayerValues,
    },
  ];
}
