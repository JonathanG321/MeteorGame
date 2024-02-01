import { useEffect, useRef } from "react";
import { NullablePosition } from "../utils/types";
import { NULL_POSITION } from "../utils/variables";

export default function useClick() {
  const mousePressPositionRef = useRef<NullablePosition>(NULL_POSITION);
  const mousePressedRef = useRef(false);

  useEffect(() => {
    function moveMousePosition(e: MouseEvent) {
      const rect = (e.target as HTMLElement)
        .closest("#canvas")
        ?.getBoundingClientRect();
      const Y = e.y - Math.floor(rect?.y ?? 0);
      const X = e.x - Math.floor(rect?.x ?? 0);
      mousePressPositionRef.current = { X, Y };
    }

    function handleMouseMove(e: MouseEvent) {
      if (mousePressedRef.current) {
        moveMousePosition(e);
      }
    }

    function handleMouseDown(e: MouseEvent) {
      mousePressedRef.current = true;
      moveMousePosition(e);
    }

    function handleMouseUp() {
      mousePressedRef.current = false;
      mousePressPositionRef.current = NULL_POSITION;
    }

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mousedown", handleMouseDown);
    document.addEventListener("mouseup", handleMouseUp);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mousedown", handleMouseDown);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);

  return { mousePressPosition: mousePressPositionRef.current };
}
