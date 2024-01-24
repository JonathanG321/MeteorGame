import { ContextValues, Position } from "../utils/types";
import useBasicState from "./useBasicState";
import useClick from "./useClick";
import useDetectCollision from "./useDetectCollision";
import usePressedKeys from "./usePressedKeys";

export default function useContextValues(): ContextValues {
  const basicState = useBasicState();
  const { heroOriginPoint } = basicState;
  const pressedKeys = usePressedKeys();
  const click = useClick();

  const isHit = !!useDetectCollision(
    basicState.meteorPositions,
    heroOriginPoint
  );

  return {
    ...basicState,
    ...pressedKeys,
    ...click,
    isHit,
  };
}
