import { randomInRange } from "../utils/lib";
import {
  FallingObject,
  FallingObjectType,
  NullablePosition,
  StateSetter,
} from "../utils/types";
import {
  OBJECT_GRAVITY,
  OBJECT_SIZE,
  OBJECT_STARTING_HEIGHT,
  SCREEN_WIDTH,
} from "../utils/variables";

export default function spawnFallingObjectLogic(
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
    const min = -8;
    const max = 15 * sizeStageMultiplier;
    newObjectSize = OBJECT_SIZE + randomInRange(min, max);
  }

  let newObjectX = mouseX
    ? mouseX - newObjectSize / 2
    : Math.round(Math.random() * (SCREEN_WIDTH - newObjectSize));

  if (newObjectX < 0) {
    newObjectX = 0;
  } else if (newObjectX > SCREEN_WIDTH - newObjectSize) {
    newObjectX = SCREEN_WIDTH - newObjectSize;
  }

  const multiplier = sizeStageMultiplier || 1;
  const newGravity =
    OBJECT_GRAVITY + randomInRange(-0.25 * multiplier, 0.25 * multiplier);

  const newObjectPosition: FallingObject = {
    Y: OBJECT_STARTING_HEIGHT,
    X: newObjectX,
    id: crypto.randomUUID(),
    type: possibleTypes[Math.floor(Math.random() * possibleTypes.length)],
    size: newObjectSize,
    speed: newGravity < 0.5 ? 0.5 : newGravity,
  };

  setObjectPositions((oldValue) => oldValue.concat([newObjectPosition]));
}
