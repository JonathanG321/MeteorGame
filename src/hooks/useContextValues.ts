import { detectCollision, isValidPosition } from "../utils/lib";
import { ContextValues } from "../utils/types";
import useBasicState from "./useBasicState";
import useClick from "./useClick";
import usePressedKeys from "./usePressedKeys";

export default function useContextValues(): ContextValues {
  const basicState = useBasicState();
  const { heroOriginPoints } = basicState;
  const pressedKeys = usePressedKeys();
  const click = useClick();

  const isHit = isValidPosition(heroOriginPoints[0])
    ? !!detectCollision(basicState.meteorPositions, heroOriginPoints[0])
    : false;
  const isHitTwo = isValidPosition(heroOriginPoints[1])
    ? !!detectCollision(basicState.meteorPositions, heroOriginPoints[1])
    : false;

  return {
    ...basicState,
    ...pressedKeys,
    ...click,
    isHit,
    isHitTwo,
  };
}
