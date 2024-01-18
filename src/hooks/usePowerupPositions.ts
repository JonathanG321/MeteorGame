import { FallingObjectType, NullablePosition, Position } from "../utils/types";
import { POWER_UP_SPAWN_CHANCE, POWER_UP_SPAWN_RATE } from "../utils/variables";
import useFallingObjectPositions from "./useFallingObjectPositions";

export default function usePowerUpPositions(
  isGameOver: boolean,
  mousePressPosition: NullablePosition,
  heroOriginPoint: Position,
  setHitObjectType: (hitObjectType: FallingObjectType | null) => void
) {
  const {
    objectPositions: powerUpPositions,
    setObjectPositions: setPowerUpPositions,
  } = useFallingObjectPositions(
    isGameOver,
    mousePressPosition,
    POWER_UP_SPAWN_RATE,
    ["health"],
    {
      spawnChance: POWER_UP_SPAWN_CHANCE,
      isCollectible: true,
      heroOriginPoint,
      setHitObjectType,
    }
  );

  return { powerUpPositions, setPowerUpPositions };
}
