import { calcIsHits } from "../utils/lib";
import { ContextValues } from "../utils/types";
import useBasicState from "./useBasicState";
import useClick from "./useClick";
import usePressedKeys from "./usePressedKeys";

export default function useContextValues(): ContextValues {
  const basicState = useBasicState();
  const { players, fallingObjectPositions } = basicState;
  const pressedKeys = usePressedKeys();
  const mousePressPosition = useClick();
  const meteorPositions = fallingObjectPositions.filter(
    (object) => object.type === "meteor" || object.type === "specialMeteor"
  );

  const isHits = calcIsHits(meteorPositions, players);

  return {
    ...basicState,
    ...pressedKeys,
    mousePressPosition,
    isHits,
  };
}
