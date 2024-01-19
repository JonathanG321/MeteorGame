import { useEffect, useRef } from "react";
import { ObjectWithRefs } from "../utils/types";

export function useUpdatingRefsForObject<T extends Record<string, any>>(
  obj: T,
  isGameOver: boolean
): ObjectWithRefs<T> {
  const refObject: ObjectWithRefs<T> = {} as ObjectWithRefs<T>;

  Object.entries(obj).forEach(([key, value]) => {
    refObject[key as keyof T] = useRef<T[keyof T]>(value as T[keyof T]);
  });

  useEffect(() => {
    if (isGameOver) return;
    Object.keys(refObject).forEach((key) => {
      const typedKey = key as keyof T;
      refObject[typedKey].current = obj[typedKey];
    });
  }, [obj, refObject, isGameOver]);

  return refObject;
}
