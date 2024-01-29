import { useEffect, useState } from "react";
import { NullablePosition } from "../utils/types";
import { NULL_POSITION } from "../utils/variables";

export default function useClick() {
  const [mousePressPosition, setMousePressPosition] =
    useState<NullablePosition>(NULL_POSITION);
  const [mousePressed, setMousePressed] = useState(false);

  useEffect(() => {
    function moveMousePosition(e: MouseEvent) {
      const rect = (e.target as HTMLElement)
        .closest("#canvas")
        ?.getBoundingClientRect();
      const Y = e.y - Math.floor(rect?.y ?? 0);
      const X = e.x - Math.floor(rect?.x ?? 0);
      setMousePressPosition({ X, Y });
    }
    function handleMouseMove(e: MouseEvent) {
      if (mousePressed) {
        moveMousePosition(e);
      }
    }
    function handleMouseDown(e: MouseEvent) {
      setMousePressed(true);
      moveMousePosition(e);
    }
    function handleMouseUp() {
      setMousePressed(false);
      setMousePressPosition(NULL_POSITION);
    }

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mousedown", handleMouseDown);
    document.addEventListener("mouseup", handleMouseUp);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mousedown", handleMouseDown);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [mousePressed]);

  return { mousePressPosition, setMousePressPosition };
}
