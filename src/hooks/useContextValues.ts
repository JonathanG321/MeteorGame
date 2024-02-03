import { calcIsHit } from "../utils/lib";
import { ContextValues } from "../utils/types";
import useBasicState from "./useBasicState";
import useClick from "./useClick";
import usePressedKeys from "./usePressedKeys";

export default function useContextValues(): ContextValues {
  const basicState = useBasicState();
  const { heroOriginPoints, meteorPositions } = basicState;
  const pressedKeys = usePressedKeys();
  const mousePressPosition = useClick();

  const isHit = calcIsHit(meteorPositions, heroOriginPoints[0]);
  const isHitTwo = calcIsHit(meteorPositions, heroOriginPoints[1]);

  return {
    ...basicState,
    ...pressedKeys,
    mousePressPosition,
    isHit,
    isHitTwo,
  };
}
