import { useContext } from "react";
import { GameStateContext } from "../context/GameStateContext";
import GameOverScreen from "./GameOverScreen";
import MenuScreen from "./MenuScreen";
import { BORDER_WIDTH } from "../utils/variables";
import PauseScreen from "./PauseScreen";
import classNames from "classnames";

export default function Menu() {
  const { isGameOver, isMainMenu, screenHeight, screenWidth, scale, isPaused } =
    useContext(GameStateContext);

  const shouldShowPanel = !isPaused && (isGameOver || isMainMenu);

  const panelStyles = {
    width: screenWidth / 2,
    height: screenHeight / 2,
    borderWidth: `${BORDER_WIDTH * scale}px`,
    padding: `${20 * scale}px`,
  };

  const pausedStyles = { WebkitTextStroke: `${1 * scale}px black` };

  const styles = shouldShowPanel ? panelStyles : pausedStyles;

  return (
    <div className="absolute z-20 flex h-full w-full items-center justify-center">
      <div className="absolute z-20 h-full w-full bg-gray-500 opacity-30" />
      <div
        style={styles}
        className={classNames(
          "z-20 flex flex-col items-center justify-center",
          {
            "border-black": shouldShowPanel,
            "bg-white": shouldShowPanel,
            "text-white": isPaused,
          }
        )}
      >
        {isGameOver && <GameOverScreen />}
        {isPaused && <PauseScreen />}
        {isMainMenu && <MenuScreen />}
      </div>
    </div>
  );
}
