import { useContext } from "react";
import { GameStateContext } from "../context/GameStateContext";
import GameOverScreen from "./GameOverScreen";
import MenuScreen from "./MenuScreen";
import { BORDER_WIDTH } from "../utils/variables";

export default function Menu() {
  const { isGameOver, isMainMenu, screenHeight, screenWidth, scale } =
    useContext(GameStateContext);

  return (
    <div className="absolute z-20 flex h-full w-full items-center justify-center">
      <div className="absolute z-20 h-full w-full bg-gray-500 opacity-30" />
      <div
        style={{
          width: screenWidth / 2,
          height: screenHeight / 2,
          borderWidth: `${BORDER_WIDTH * scale}px`,
          padding: `${20 * scale}px`,
        }}
        className="z-20 flex flex-col items-center justify-center border-black bg-white"
      >
        {isGameOver && <GameOverScreen />}
        {isMainMenu && <MenuScreen />}
      </div>
    </div>
  );
}
