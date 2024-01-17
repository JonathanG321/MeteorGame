import { NullablePosition } from "../utils/types";
import { METEORS_PER_SECOND } from "../utils/variables";
import useFallingObjectPositions from "./useFallingObjectPositions";

export default function useMeteorPositions(
  isGameOver: boolean,
  mousePressPosition: NullablePosition
) {
  const {
    objectPositions: meteorPositions,
    setObjectPositions: setMeteorPositions,
  } = useFallingObjectPositions(
    isGameOver,
    mousePressPosition,
    METEORS_PER_SECOND,
    ["meteor"]
  );

  return { meteorPositions, setMeteorPositions };
}
