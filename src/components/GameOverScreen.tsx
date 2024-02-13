import { useContext, useEffect } from "react";
import { GameStateContext } from "../context/GameStateContext";
import { BASE_PRESSED_KEYS } from "../utils/variables";
import { getDefaultOnePlayer, getFontSize } from "../utils/lib";
import setSounds from "../utils/sounds";

export default function GameOverScreen() {
  const context = useContext(GameStateContext);
  const { isTwoPlayers, players, scale } = context;
  const points1 = players[0].points;
  const points2 = players[1].points;

  useEffect(() => {
    function handleKeyUp(e: KeyboardEvent) {
      if (e.code === "Space") {
        context.setFallingObjectPositions([]);
        context.setPlayers(getDefaultOnePlayer(scale));
        context.setSlowCount(0);
        context.setPressedKeys(BASE_PRESSED_KEYS);
        context.setGameCounter(1);
        context.setIsMainMenu(true);
        setSounds.theme.playbackRate = 1;
      }
    }

    document.addEventListener("keyup", handleKeyUp);

    return () => {
      document.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  const marginBottomTwo = { marginBottom: `${8 * scale}px` };

  return (
    <div className="flex flex-col items-center">
      <div
        style={{
          ...getFontSize("4xl", scale),
          marginBottom: `${16 * scale}px`,
        }}
        className="font-extrabold"
      >
        Game Over!
      </div>
      {isTwoPlayers && (
        <>
          <div
            style={{
              ...getFontSize("xl", scale),
              ...marginBottomTwo,
            }}
            className="font-bold"
          >
            Player {points1 > points2 ? "1" : "2"} wins with:
          </div>
          <div
            style={{ ...getFontSize("lg", scale), ...marginBottomTwo }}
            className="font-bold"
          >
            {(points1 > points2 ? points1 : points2).toLocaleString()} Points
          </div>
        </>
      )}
      {!isTwoPlayers && (
        <>
          <div
            style={{ ...getFontSize("xl", scale), ...marginBottomTwo }}
            className="font-bold"
          >
            Score
          </div>
          <div
            style={{ ...getFontSize("lg", scale), ...marginBottomTwo }}
            className="font-bold"
          >
            {(points1 > points2 ? points1 : points2).toLocaleString()} Points
          </div>
        </>
      )}
      <div
        style={{ ...getFontSize("lg", scale), marginTop: `${16 * scale}px` }}
        className="font-semibold"
      >
        Press Space to Restart
      </div>
    </div>
  );
}
