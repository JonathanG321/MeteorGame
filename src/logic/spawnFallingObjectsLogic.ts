import { calcRotationAngle, getPowerUpList, randomInRange } from "../utils/lib";
import {
  ContextValues,
  FallingObject,
  FallingObjectType,
  NullablePosition,
  ObjectWithRefs,
  StateSetter,
} from "../utils/types";
import {
  MAX_OBJECT_SIZE_MODIFIER,
  METEOR_SPAWN_CHANCE,
  MIN_GRAVITY_INTERVAL,
  MIN_OBJECT_SIZE_MODIFIER,
  OBJECT_GRAVITY,
  OBJECT_SIZE,
  OBJECT_SIZE_VARIATION,
  OBJECT_STARTING_HEIGHT,
  POWER_UP_SPAWN_CHANCE,
  STAGE_DIFFICULTY_SCALE,
  SPECIAL_METEOR_SPAWN_CHANCE,
  SPECIAL_METEOR_SIZE,
  OBJECT_ANGLE_VARIATION,
} from "../utils/variables";

export default function spawnFallingObjectsLogic(
  contextRefs: ObjectWithRefs<ContextValues>,
  contextValues: ContextValues,
  gameStageMultiplier: number
) {
  const { slowCount, gameStage } = contextRefs;
  const isSlow = !!slowCount.current;
  const { setFallingObjectPositions, screenWidth, scale } = contextValues;
  const powerUpList = getPowerUpList(gameStage.current);
  const difficultyModifier = gameStageMultiplier * STAGE_DIFFICULTY_SCALE ** 2;

  const specialMeteorSpawnChance = Math.max(
    0,
    SPECIAL_METEOR_SPAWN_CHANCE * gameStageMultiplier -
      SPECIAL_METEOR_SPAWN_CHANCE * 1.75
  );

  function getShouldSpawn(chance: number) {
    return shouldObjectSpawn(chance, isSlow, difficultyModifier);
  }

  const shouldSpawnSpecial = getShouldSpawn(specialMeteorSpawnChance);
  const shouldSpawnPowerUp = getShouldSpawn(POWER_UP_SPAWN_CHANCE);
  const shouldMeteorsSpawn = getShouldSpawn(METEOR_SPAWN_CHANCE);

  if (shouldSpawnSpecial) {
    spawnFallingObjectGroup(
      setFallingObjectPositions,
      ["specialMeteor"],
      scale,
      contextRefs.mousePressPosition.current,
      screenWidth,
      gameStageMultiplier,
      SPECIAL_METEOR_SIZE
    );
  }
  if (shouldSpawnPowerUp) {
    spawnFallingObjectGroup(
      setFallingObjectPositions,
      powerUpList,
      scale,
      contextRefs.mousePressPosition.current,
      screenWidth
    );
  }
  if (shouldMeteorsSpawn) {
    spawnFallingObjectGroup(
      setFallingObjectPositions,
      ["meteor"],
      scale,
      contextRefs.mousePressPosition.current,
      screenWidth,
      gameStageMultiplier
    );
  }
}

function spawnFallingObjectGroup(
  setObjectPositions: StateSetter<FallingObject[]>,
  possibleTypes: FallingObjectType[],
  scale: number,
  mousePressPosition: NullablePosition,
  screenWidth: number,
  sizeStageMultiplier?: number,
  setSize?: number
) {
  const setMultiplier = sizeStageMultiplier || 1;
  const angleVariation = Math.max(
    0,
    OBJECT_ANGLE_VARIATION * setMultiplier - OBJECT_ANGLE_VARIATION * 1.75
  );
  const newObjectSize = setSize ?? calculateObjectSize(sizeStageMultiplier);
  const newObjectX = calculateObjectX(
    mousePressPosition,
    newObjectSize,
    screenWidth
  );
  const newGravity = calculateObjectGravity(sizeStageMultiplier);
  const newSpeed = calculateObjectSpeed(newGravity);
  const newType = getRandomType(possibleTypes);
  const newAngleOffset =
    newType === "meteor" ? randomInRange(-angleVariation, angleVariation) : 0;

  const newObjectPosition: FallingObject = {
    Y: OBJECT_STARTING_HEIGHT * scale,
    X: newObjectX * scale,
    id: crypto.randomUUID(),
    type: newType,
    size: newObjectSize * scale,
    speed: newSpeed * scale,
    angleOffset: newAngleOffset,
    rotationAngle: calcRotationAngle(newAngleOffset, newSpeed * scale),
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
  return Math.random() * 100 < (calcSpawnChance ?? 100);
}

function calculateObjectSize(sizeStageMultiplier?: number): number {
  if (!sizeStageMultiplier) return OBJECT_SIZE;

  const maxSizeModifier = MAX_OBJECT_SIZE_MODIFIER * sizeStageMultiplier;
  return OBJECT_SIZE + randomInRange(MIN_OBJECT_SIZE_MODIFIER, maxSizeModifier);
}

function calculateObjectX(
  mousePressPosition: NullablePosition,
  newObjectSize: number,
  screenWidth: number
): number {
  const mouseX = mousePressPosition?.X;
  const maxPosition = screenWidth;

  if (!mouseX) return Math.round(Math.random() * maxPosition);

  const minX = Math.max(-newObjectSize, mouseX - newObjectSize / 2);
  return Math.min(minX, maxPosition);
}

function calculateObjectGravity(sizeStageMultiplier?: number): number {
  const multiplier = sizeStageMultiplier || 1;
  const objectSizeRange = OBJECT_SIZE_VARIATION * multiplier;
  return OBJECT_GRAVITY + randomInRange(-objectSizeRange, objectSizeRange);
}

function getRandomType(possibleTypes: FallingObjectType[]): FallingObjectType {
  return possibleTypes[Math.floor(Math.random() * possibleTypes.length)];
}

function calculateObjectSpeed(newGravity: number): number {
  return Math.max(MIN_GRAVITY_INTERVAL, newGravity);
}
