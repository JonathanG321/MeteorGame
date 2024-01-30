import { isValidPosition } from "../utils/lib";
import { ContextValues } from "../utils/types";
import useBasicState from "./useBasicState";
import useClick from "./useClick";
import useDetectCollision from "./useDetectCollision";
import usePressedKeys from "./usePressedKeys";

export default function useContextValues(): ContextValues {
  const basicState = useBasicState();
  const { heroOriginPoint, heroTwoOriginPoint } = basicState;
  const pressedKeys = usePressedKeys();
  const click = useClick();

  const isHit = isValidPosition(heroOriginPoint)
    ? !!useDetectCollision(basicState.meteorPositions, heroOriginPoint)
    : false;
  const isHitTwo = isValidPosition(heroTwoOriginPoint)
    ? !!useDetectCollision(basicState.meteorPositions, heroTwoOriginPoint)
    : false;

  return {
    ...basicState,
    ...pressedKeys,
    ...click,
    isHit,
    isHitTwo,
  };
}
