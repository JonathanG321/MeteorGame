import { useEffect, useRef, useState } from "react";
import {
  FallingObject,
  FallingObjectOptions,
  FallingObjectType,
  NullablePosition,
} from "../utils/types";
import { objectFallingEffect } from "../utils/lib";

export default function useFallingObjectPositions(
  isGameOver: boolean,
  mousePressPosition: NullablePosition,
  spawnRate: number,
  possibleTypes: FallingObjectType[],
  options?: FallingObjectOptions
) {
  const [objectPositions, setObjectPositions] = useState<FallingObject[]>([]);
  const latestMousePressPosition = useRef<NullablePosition>(mousePressPosition);
  const latestOptions = useRef<FallingObjectOptions | undefined>(options);

  useEffect(() => {
    if (isGameOver) return;
    latestMousePressPosition.current = mousePressPosition;
    if (options?.isCollectible) {
      latestOptions.current = options;
    }
  }, [mousePressPosition, isGameOver, options]);

  useEffect(() => {
    return objectFallingEffect(
      isGameOver,
      latestMousePressPosition,
      setObjectPositions,
      possibleTypes,
      spawnRate,
      latestOptions
    );
  }, [isGameOver]);

  return { objectPositions, setObjectPositions };
}
