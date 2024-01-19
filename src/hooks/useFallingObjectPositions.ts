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
  slowCount: number,
  mousePressPosition: NullablePosition,
  spawnRate: number,
  possibleTypes: FallingObjectType[],
  options?: FallingObjectOptions
) {
  const [objectPositions, setObjectPositions] = useState<FallingObject[]>([]);
  const latestMousePressPosition = useRef<NullablePosition>(mousePressPosition);
  const latestOptionsRef = useRef<FallingObjectOptions | undefined>(options);

  useEffect(() => {
    if (isGameOver) return;
    latestMousePressPosition.current = mousePressPosition;
    if (options?.isCollectible) {
      latestOptionsRef.current = options;
    }
  }, [mousePressPosition, isGameOver, options, slowCount]);

  useEffect(() => {
    return objectFallingEffect(
      isGameOver,
      slowCount,
      latestMousePressPosition,
      setObjectPositions,
      possibleTypes,
      spawnRate,
      latestOptionsRef
    );
  }, [isGameOver, slowCount]);

  return { objectPositions, setObjectPositions };
}
