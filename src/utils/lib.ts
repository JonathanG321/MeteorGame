import {
  Box,
  FallingObject,
  FallingObjectOptions,
  FallingObjectType,
  NullablePosition,
  Position,
} from "./types";
import {
  FRAME_RATE,
  HERO_SIZE,
  OBJECT_COLLISION_THRESHOLD,
  OBJECT_GRAVITY,
  OBJECT_SIZE,
  OBJECT_STARTING_HEIGHT,
  SCREEN_HEIGHT,
  SCREEN_WIDTH,
} from "./variables";

export function objectFallingEffect(
  isGameOver: boolean,
  latestMousePressPosition: React.MutableRefObject<NullablePosition>,
  setObjectPositions: React.Dispatch<React.SetStateAction<FallingObject[]>>,
  possibleTypes: FallingObjectType[],
  spawnRate: number,
  options?: React.MutableRefObject<FallingObjectOptions | undefined>
) {
  if (isGameOver) return;

  const spawnIntervalId = setInterval(() => {
    if (!(Math.random() * 100 < (options?.current?.spawnChance || 100))) return;
    const mouseX = latestMousePressPosition.current.X;

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
  }, 1000 / spawnRate);

  const gravityIntervalId = setInterval(() => {
    setObjectPositions((oldValue) =>
      oldValue
        .map((object) => ({ ...object, Y: object.Y + 1 }))
        .filter((object) => {
          const isObjectInBounds = object.Y <= SCREEN_HEIGHT + OBJECT_SIZE;
          if (options?.current?.isCollectible) {
            const isHittingHero = !!isObjectCollidingWithHero(
              object,
              options.current?.heroOriginPoint
            );
            return isObjectInBounds && !isHittingHero;
          }
          return isObjectInBounds;
        })
    );
  }, FRAME_RATE / OBJECT_GRAVITY);

  return () => {
    clearInterval(spawnIntervalId);
    clearInterval(gravityIntervalId);
  };
}

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
