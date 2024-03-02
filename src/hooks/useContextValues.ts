import { calcIsHits } from "../utils/lib";
import { ContextValues } from "../utils/types";
import useBasicState from "./useBasicState";
import useClick from "./useClick";
import usePause from "./usePause";
import usePressedKeys from "./usePressedKeys";

export default function useContextValues(
  screenHeight: number,
  screenWidth: number
): ContextValues {
  const basicState = useBasicState(screenHeight);
  const { players, fallingObjectPositions } = basicState;
  const pressedKeys = usePressedKeys();
  const mousePressPosition = useClick();
  const isPaused = usePause();
  const meteorPositions = fallingObjectPositions.filter(
    (object) => object.type === "meteor" || object.type === "specialMeteor"
  );

  const isHits = calcIsHits(meteorPositions, players, basicState.scale);

  return {
    ...basicState,
    ...pressedKeys,
    isPaused,
    scale: basicState.scale,
    mousePressPosition,
    isHits,
    screenHeight,
    screenWidth,
  };
}
