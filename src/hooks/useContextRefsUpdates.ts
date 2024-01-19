import { useEffect } from "react";
import { ObjectWithRefs } from "../utils/types";

export default function useContextRefsUpdates<T extends Record<string, any>>(
  contextValues: T,
  contextRefs: ObjectWithRefs<T>,
  isGameOver: boolean
) {
  useEffect(() => {
    if (isGameOver) return;
    Object.keys(contextRefs).forEach((key) => {
      const typedKey = key as keyof T;
      contextRefs[typedKey].current = contextValues[typedKey];
    });
  }, [contextValues, contextRefs, isGameOver]);
}
