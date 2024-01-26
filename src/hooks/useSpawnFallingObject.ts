import {
  FallingObject,
  FallingObjectType,
  NullablePosition,
  StateSetter,
} from "../utils/types";
import {
  OBJECT_SIZE,
  OBJECT_STARTING_HEIGHT,
  SCREEN_WIDTH,
} from "../utils/variables";

export default function useSpawnFallingObject(
  setObjectPositions: StateSetter<FallingObject[]>,
  possibleTypes: FallingObjectType[],
  mousePressPosition: NullablePosition,
  spawnChance: number,
  isSlow: boolean,
  gameStageMultiplier: number,
  sizeStageMultiplier?: number
) {
  const stageSpawnChance = spawnChance * gameStageMultiplier;
  const calcSpawnChance = isSlow ? stageSpawnChance / 2 : stageSpawnChance;
  if (!(Math.random() * 100 < (calcSpawnChance || 100))) return;
  const mouseX = mousePressPosition.X;

  let newObjectSize = OBJECT_SIZE;
  if (sizeStageMultiplier) {
    const min = OBJECT_SIZE * 0.95;
    const max = OBJECT_SIZE * 1.05 * sizeStageMultiplier;
    newObjectSize = Math.round(Math.random() * (max - min + 1) + min);
  }

  let newObjectX = mouseX
    ? mouseX - newObjectSize / 2
    : Math.round(Math.random() * (SCREEN_WIDTH - newObjectSize));

  if (newObjectX < 0) {
    newObjectX = 0;
  } else if (newObjectX > SCREEN_WIDTH - newObjectSize) {
    newObjectX = SCREEN_WIDTH - newObjectSize;
  }

  const newObjectPosition: FallingObject = {
    Y: OBJECT_STARTING_HEIGHT,
    X: newObjectX,
    id: crypto.randomUUID(),
    type: possibleTypes[Math.floor(Math.random() * possibleTypes.length)],
    size: newObjectSize,
  };

  setObjectPositions((oldValue) => oldValue.concat([newObjectPosition]));
}
