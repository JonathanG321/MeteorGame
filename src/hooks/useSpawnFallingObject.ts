import {
  FallingObject,
  FallingObjectType,
  NullablePosition,
} from "../utils/types";
import {
  OBJECT_SIZE,
  OBJECT_STARTING_HEIGHT,
  SCREEN_WIDTH,
} from "../utils/variables";

export default function useSpawnFallingObject(
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
