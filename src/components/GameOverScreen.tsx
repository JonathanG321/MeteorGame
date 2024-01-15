import { useContext, useEffect } from "react";
import { GameStateContext } from "../GameStateContext";
import {
  BASE_PRESSED_KEYS,
  SCREEN_HEIGHT,
  SCREEN_WIDTH,
} from "../utils/variables";

export default function GameOverScreen() {
  const { setIsGameOver, isGameOver, setMeteorPositions, setPressedKeys } =
    useContext(GameStateContext);
  useEffect(() => {
    function handleKeyUp(e: KeyboardEvent) {
      if (e.code === "Space") {
        setMeteorPositions([]);
        setPressedKeys(BASE_PRESSED_KEYS);
        setIsGameOver(false);
      }
    }

    document.addEventListener("keyup", handleKeyUp);

    return () => {
      document.removeEventListener("keyup", handleKeyUp);
    };
  }, [isGameOver]);

  return (
    <div className="absolute z-10 flex h-full w-full items-center justify-center">
      <div className="absolute z-10 h-full w-full bg-gray-500 opacity-30" />
      <div
        style={{ width: SCREEN_WIDTH / 2, height: SCREEN_HEIGHT / 2 }}
        className="z-10 flex flex-col items-center justify-center border-4 border-black bg-white p-5"
      >
        <div className="text-5xl font-extrabold">Game Over!</div>
        <div className="text-xl font-semibold">Press Space to Restart</div>
      </div>
    </div>
  );
}
