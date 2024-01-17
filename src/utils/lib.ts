import {
  FallingObject,
  FallingObjectType,
  NullablePosition,
  Position,
} from "./types";
import {
  FRAME_RATE,
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
  spawnRate: number
) {
  if (isGameOver) return;

  const spawnIntervalId = setInterval(() => {
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
        .filter((object) => object.Y <= SCREEN_HEIGHT + OBJECT_SIZE)
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
