import { FallingObjectType, NullablePosition, Position } from "../utils/types";
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
    0.3,
    ["health"],
    { spawnChance: 100, isCollectible: true, heroOriginPoint, setHitObjectType }
  );

  return { powerUpPositions, setPowerUpPositions };
}
