import { useEffect, useState } from "react";
import { PressedKeys } from "../utils/types";

export default function usePressedKeys() {
  const [pressedKeys, setPressedKeys] = useState({
    ArrowUp: false,
    ArrowDown: false,
    ArrowLeft: false,
    ArrowRight: false,
  });

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      setPressedKeys((prevKeys) => ({ ...prevKeys, [e.key]: true }));
    }
    function handleKeyUp(e: KeyboardEvent) {
      setPressedKeys((prevKeys) => ({ ...prevKeys, [e.key]: false }));
    }

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("keyup", handleKeyUp);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  return pressedKeys;
}
