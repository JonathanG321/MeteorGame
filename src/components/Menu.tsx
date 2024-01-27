import { useContext } from "react";
import { GameStateContext } from "../context/GameStateContext";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "../utils/variables";
import GameOverScreen from "./GameOverScreen";
import MenuScreen from "./MenuScreen";

export default function Menu() {
  const { isGameOver, isMainMenu } = useContext(GameStateContext);

  return (
    <div className="absolute z-20 flex h-full w-full items-center justify-center">
      <div className="absolute z-20 h-full w-full bg-gray-500 opacity-30" />
      <div
        style={{ width: SCREEN_WIDTH / 2, height: SCREEN_HEIGHT / 2 }}
        className="z-20 flex flex-col items-center justify-center border-4 border-black bg-white p-5"
      >
        {isGameOver && <GameOverScreen />}
        {isMainMenu && <MenuScreen />}
      </div>
    </div>
  );
}
