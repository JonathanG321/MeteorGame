import { detectCollision, isValidPosition } from "../utils/lib";
import { ContextValues } from "../utils/types";
import useBasicState from "./useBasicState";
import useClick from "./useClick";
import usePressedKeys from "./usePressedKeys";

export default function useContextValues(): ContextValues {
  const basicState = useBasicState();
  const { heroOriginPoint, heroTwoOriginPoint } = basicState;
  const pressedKeys = usePressedKeys();
  const click = useClick();

  const isHit = isValidPosition(heroOriginPoint)
    ? !!detectCollision(basicState.meteorPositions, heroOriginPoint)
    : false;
  const isHitTwo = isValidPosition(heroTwoOriginPoint)
    ? !!detectCollision(basicState.meteorPositions, heroTwoOriginPoint)
    : false;

  return {
    ...basicState,
    ...pressedKeys,
    ...click,
    isHit,
    isHitTwo,
  };
}
