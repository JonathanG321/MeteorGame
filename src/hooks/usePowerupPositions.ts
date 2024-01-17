import { NullablePosition } from "../utils/types";
import { METEORS_PER_SECOND } from "../utils/variables";
import useFallingObjectPositions from "./useFallingObjectPositions";

export default function usePowerUpPositions(
  isGameOver: boolean,
  mousePressPosition: NullablePosition
) {
  const {
    objectPositions: powerUpPositions,
    setObjectPositions: setPowerUpPositions,
  } = useFallingObjectPositions(
    isGameOver,
    mousePressPosition,
    0.3,
    ["health"],
    50
  );

  return { powerUpPositions, setPowerUpPositions };
}
