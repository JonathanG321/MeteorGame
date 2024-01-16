import { useContext, useEffect } from "react";
import { BASE_PRESSED_KEYS } from "../utils/variables";
import { GameStateContext } from "../GameStateContext";

export default function MenuScreen() {
  const { setIsMainMenu, isMainMenu, setMeteorPositions, setPressedKeys } =
    useContext(GameStateContext);

  useEffect(() => {
    function handleKeyUp(e: KeyboardEvent) {
      if (e.code === "Space") {
        setMeteorPositions([]);
        setPressedKeys(BASE_PRESSED_KEYS);
        setIsMainMenu(false);
      }
    }

    document.addEventListener("keyup", handleKeyUp);

    return () => {
      document.removeEventListener("keyup", handleKeyUp);
    };
  }, [isMainMenu]);

  return (
    <div className="flex flex-col items-center">
      <div className="text-5xl font-extrabold">Meteor Hero</div>
      <div className="text-xl font-semibold">Press Space to Start</div>
    </div>
  );
}