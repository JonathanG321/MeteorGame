import { useEffect, useState } from "react";
import { BASE_PRESSED_KEYS } from "../utils/variables";

export default function usePressedKeys() {
  const [pressedKeys, setPressedKeys] = useState(BASE_PRESSED_KEYS);

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

  return { pressedKeys, setPressedKeys };
}
