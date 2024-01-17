import { useEffect, useRef, useState } from "react";
import {
  FallingObject,
  FallingObjectType,
  NullablePosition,
} from "../utils/types";
import { objectFallingEffect } from "../utils/lib";

export default function useFallingObjectPositions(
  isGameOver: boolean,
  mousePressPosition: NullablePosition,
  spawnRate: number,
  possibleTypes: FallingObjectType[]
) {
  const [objectPositions, setObjectPositions] = useState<FallingObject[]>([]);
  const latestMousePressPosition = useRef<NullablePosition>(mousePressPosition);

  useEffect(() => {
    if (isGameOver) return;
    latestMousePressPosition.current = mousePressPosition;
  }, [mousePressPosition, isGameOver]);

  useEffect(() => {
    return objectFallingEffect(
      isGameOver,
      latestMousePressPosition,
      setObjectPositions,
      possibleTypes,
      spawnRate
    );
  }, [isGameOver]);

  return { objectPositions, setObjectPositions };
}
