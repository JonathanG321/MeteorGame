import { getPowerUpList, randomInRange } from "../utils/lib";
import {
  ContextValues,
  FallingObject,
  FallingObjectType,
  NullablePosition,
  ObjectWithRefs,
  StateSetter,
} from "../utils/types";
import {
  METEOR_SPAWN_CHANCE,
  NULL_POSITION,
  OBJECT_GRAVITY,
  OBJECT_SIZE,
  OBJECT_STARTING_HEIGHT,
  POWER_UP_SPAWN_CHANCE,
  SCREEN_WIDTH,
  STAGE_DIFFICULTY_SCALE,
} from "../utils/variables";

export default function spawnFallingObjectLogic(
  contextRefs: ObjectWithRefs<ContextValues>,
  contextValues: ContextValues,
  gameStageMultiplier: number
) {
  const { slowCount, gameStage } = contextRefs;
  const isSlow = !!slowCount.current;
  const { setMeteorPositions, setPowerUpPositions } = contextValues;
  const powerUpList = getPowerUpList(gameStage.current);

  spawnFallingObjectGroup(
    setMeteorPositions,
    ["meteor"],
    contextRefs.mousePressPosition.current,
    METEOR_SPAWN_CHANCE,
    isSlow,
    gameStageMultiplier * STAGE_DIFFICULTY_SCALE ** 2,
    gameStageMultiplier
  );
  spawnFallingObjectGroup(
    setPowerUpPositions,
    powerUpList,
    NULL_POSITION,
    POWER_UP_SPAWN_CHANCE,
    isSlow,
    gameStageMultiplier * STAGE_DIFFICULTY_SCALE ** 2
  );
}

function spawnFallingObjectGroup(
  setObjectPositions: StateSetter<FallingObject[]>,
  possibleTypes: FallingObjectType[],
  mousePressPosition: NullablePosition,
  spawnChance: number,
  isSlow: boolean,
  gameStageMultiplier: number,
  sizeStageMultiplier?: number
) {
  if (!shouldObjectSpawn(spawnChance, isSlow, gameStageMultiplier)) return;

  const newObjectSize = calculateObjectSize(sizeStageMultiplier);
  const newObjectX = calculateObjectX(mousePressPosition, newObjectSize);
  const newGravity = calculateObjectGravity(sizeStageMultiplier);

  const newObjectPosition: FallingObject = {
    Y: OBJECT_STARTING_HEIGHT,
    X: newObjectX,
    id: crypto.randomUUID(),
    type: getRandomType(possibleTypes),
    size: newObjectSize,
    speed: calculateObjectSpeed(newGravity),
  };

  setObjectPositions((oldValue) => [...oldValue, newObjectPosition]);
}

function shouldObjectSpawn(
  spawnChance: number,
  isSlow: boolean,
  gameStageMultiplier: number
): boolean {
  const stageSpawnChance = spawnChance * gameStageMultiplier;
  const calcSpawnChance = isSlow ? stageSpawnChance / 2 : stageSpawnChance;
  return Math.random() * 100 < (calcSpawnChance || 100);
}

function calculateObjectSize(sizeStageMultiplier?: number): number {
  if (!sizeStageMultiplier) return OBJECT_SIZE;

  const minSizeModifier = -8;
  const maxSizeModifier = 15 * sizeStageMultiplier;
  return OBJECT_SIZE + randomInRange(minSizeModifier, maxSizeModifier);
}

function calculateObjectX(
  mousePressPosition: NullablePosition,
  newObjectSize: number
): number {
  const mouseX = mousePressPosition?.X;

  if (mouseX) {
    const minX = Math.max(0, mouseX - newObjectSize / 2);
    return Math.min(minX, SCREEN_WIDTH - newObjectSize);
  }

  return Math.round(Math.random() * (SCREEN_WIDTH - newObjectSize));
}

function calculateObjectGravity(sizeStageMultiplier?: number): number {
  const multiplier = sizeStageMultiplier || 1;
  return OBJECT_GRAVITY + randomInRange(-0.25 * multiplier, 0.25 * multiplier);
}

function getRandomType(possibleTypes: FallingObjectType[]): FallingObjectType {
  return possibleTypes[Math.floor(Math.random() * possibleTypes.length)];
}

function calculateObjectSpeed(newGravity: number): number {
  return newGravity < 0.5 ? 0.5 : newGravity;
}
