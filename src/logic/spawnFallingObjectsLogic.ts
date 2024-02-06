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
  MAX_OBJECT_SIZE_MODIFIER,
  METEOR_SPAWN_CHANCE,
  MIN_GRAVITY_INTERVAL,
  MIN_OBJECT_SIZE_MODIFIER,
  OBJECT_GRAVITY,
  OBJECT_SIZE,
  OBJECT_SIZE_VARIATION,
  OBJECT_STARTING_HEIGHT,
  POWER_UP_SPAWN_CHANCE,
  SCREEN_WIDTH,
  STAGE_DIFFICULTY_SCALE,
  SPECIAL_METEOR_SPAWN_CHANCE,
  SPECIAL_METEOR_SIZE,
  OBJECT_ANGLE_VARIATION,
} from "../utils/variables";

export default function spawnFallingObjectLogic(
  contextRefs: ObjectWithRefs<ContextValues>,
  contextValues: ContextValues,
  gameStageMultiplier: number
) {
  const { slowCount, gameStage } = contextRefs;
  const isSlow = !!slowCount.current;
  const { setFallingObjectPositions } = contextValues;
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
      contextRefs.mousePressPosition.current,
      gameStageMultiplier,
      SPECIAL_METEOR_SIZE
    );
  }
  if (shouldSpawnPowerUp) {
    spawnFallingObjectGroup(
      setFallingObjectPositions,
      powerUpList,
      contextRefs.mousePressPosition.current
    );
  }
  if (shouldMeteorsSpawn) {
    spawnFallingObjectGroup(
      setFallingObjectPositions,
      ["meteor"],
      contextRefs.mousePressPosition.current,
      gameStageMultiplier
    );
  }
}

function spawnFallingObjectGroup(
  setObjectPositions: StateSetter<FallingObject[]>,
  possibleTypes: FallingObjectType[],
  mousePressPosition: NullablePosition,
  sizeStageMultiplier?: number,
  setSize?: number
) {
  const newObjectSize = setSize ?? calculateObjectSize(sizeStageMultiplier);
  const newObjectX = calculateObjectX(mousePressPosition, newObjectSize);
  const newGravity = calculateObjectGravity(sizeStageMultiplier);
  const newSpeed = calculateObjectSpeed(newGravity);
  const newType = getRandomType(possibleTypes);

  const setMultiplier = sizeStageMultiplier || 1;

  const angleVariation = Math.max(
    0,
    OBJECT_ANGLE_VARIATION * setMultiplier - OBJECT_ANGLE_VARIATION * 1.75
  );

  const newObjectPosition: FallingObject = {
    Y: OBJECT_STARTING_HEIGHT,
    X: newObjectX,
    id: crypto.randomUUID(),
    type: newType,
    size: newObjectSize,
    speed: newSpeed,
    angleOffset:
      newType === "meteor" ? randomInRange(-angleVariation, angleVariation) : 0,
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
  newObjectSize: number
): number {
  const mouseX = mousePressPosition?.X;
  const maxPosition = SCREEN_WIDTH;

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
