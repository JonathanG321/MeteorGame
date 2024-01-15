import { useContext, useEffect } from "react";
import { GameStateContext } from "../GameStateContext";
import {
  BASE_PRESSED_KEYS,
  SCREEN_HEIGHT,
  SCREEN_WIDTH,
} from "../utils/variables";
import GameOverScreen from "./GameOverScreen";
import MenuScreen from "./MenuScreen";

export default function Menu() {
  const {
    setIsGameOver,
    isGameOver,
    setMeteorPositions,
    setPressedKeys,
    isMainMenu,
    setIsMainMenu,
  } = useContext(GameStateContext);
  useEffect(() => {
    function handleKeyUp(e: KeyboardEvent) {
      if (e.code === "Space") {
        setMeteorPositions([]);
        setPressedKeys(BASE_PRESSED_KEYS);
        setIsGameOver(false);
        setIsMainMenu(false);
      }
    }

    document.addEventListener("keyup", handleKeyUp);

    return () => {
      document.removeEventListener("keyup", handleKeyUp);
    };
  }, [isGameOver, isMainMenu]);

  return (
    <div className="absolute z-10 flex h-full w-full items-center justify-center">
      <div className="absolute z-10 h-full w-full bg-gray-500 opacity-30" />
      <div
        style={{ width: SCREEN_WIDTH / 2, height: SCREEN_HEIGHT / 2 }}
        className="z-10 flex flex-col items-center justify-center border-4 border-black bg-white p-5"
      >
        {isGameOver && <GameOverScreen />}
        {isMainMenu && <MenuScreen />}
      </div>
    </div>
  );
}
