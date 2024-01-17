import { NullablePosition, Position } from "../utils/types";
import useDetectCollision from "./useDetectCollision";
import useFallingObjectPositions from "./useFallingObjectPositions";

export default function usePowerUpPositions(
  isGameOver: boolean,
  mousePressPosition: NullablePosition,
  heroOriginPoint: Position
) {
  const {
    objectPositions: powerUpPositions,
    setObjectPositions: setPowerUpPositions,
  } = useFallingObjectPositions(
    isGameOver,
    mousePressPosition,
    0.3,
    ["health"],
    { spawnChance: 100, isCollectible: true, heroOriginPoint }
  );

  return { powerUpPositions, setPowerUpPositions };
}
