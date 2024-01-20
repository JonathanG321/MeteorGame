import {
  Box,
  FallingObject,
  FallingObjectType,
  NullablePosition,
  Position,
} from "./types";
import {
  HERO_SIZE,
  OBJECT_COLLISION_THRESHOLD,
  OBJECT_GRAVITY,
  OBJECT_SIZE,
  OBJECT_STARTING_HEIGHT,
  SCREEN_HEIGHT,
  SCREEN_WIDTH,
} from "./variables";

export function createObjectStyle(position: Position, size: number) {
  return {
    top: position.Y + "px",
    left: position.X + "px",
    height: size + "px",
    width: size + "px",
  };
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

export function countDownTo0(prevCount: number, isSlow: boolean) {
  const dropAmount = isSlow ? 1 : 2;
  return prevCount > 0 ? prevCount - dropAmount : 0;
}

export function spawnFallingObjectInterval(
  setObjectPositions: React.Dispatch<React.SetStateAction<FallingObject[]>>,
  possibleTypes: FallingObjectType[],
  mousePressPosition: NullablePosition,
  spawnChance: number,
  isSlow: boolean
) {
  const calcSpawnChance = isSlow ? spawnChance / 2 : spawnChance;
  if (!(Math.random() * 100 < (calcSpawnChance || 100))) return;
  const mouseX = mousePressPosition.X;

  let newObjectX = mouseX
    ? mouseX - OBJECT_SIZE / 2
    : Math.round(Math.random() * (SCREEN_WIDTH - OBJECT_SIZE));

  if (newObjectX < 0) {
    newObjectX = 0;
  } else if (newObjectX > SCREEN_WIDTH - OBJECT_SIZE) {
    newObjectX = SCREEN_WIDTH - OBJECT_SIZE;
  }

  const newObjectPosition = {
    Y: OBJECT_STARTING_HEIGHT,
    X: newObjectX,
    id: crypto.randomUUID(),
    type: possibleTypes[Math.floor(Math.random() * possibleTypes.length)],
  };

  setObjectPositions((oldValue) => oldValue.concat([newObjectPosition]));
}

export function objectGravityInterval(
  setObjectPositions: React.Dispatch<React.SetStateAction<FallingObject[]>>,
  setHitObjectType: React.Dispatch<
    React.SetStateAction<FallingObjectType | null>
  >,
  heroOriginPoint: Position,
  isSlow: boolean,
  isCollectible = false
) {
  setObjectPositions((oldValue) =>
    oldValue
      .map((object) => ({
        ...object,
        Y: object.Y + (isSlow ? OBJECT_GRAVITY / 2 : OBJECT_GRAVITY),
      }))
      .filter((object) => {
        const isObjectInBounds = object.Y <= SCREEN_HEIGHT + OBJECT_SIZE;
        if (isCollectible) {
          const isHittingHero = !!isObjectCollidingWithHero(
            object,
            heroOriginPoint
          );
          if (isHittingHero) setHitObjectType(object.type);
          return isObjectInBounds && !isHittingHero;
        }
        return isObjectInBounds;
      })
  );
}
