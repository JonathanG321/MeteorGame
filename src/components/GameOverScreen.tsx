import { useContext, useEffect } from "react";
import { GameStateContext } from "../context/GameStateContext";
import { BASE_PRESSED_KEYS, DEFAULT_ONE_PLAYER } from "../utils/variables";
import sounds from "../utils/sounds";

export default function GameOverScreen() {
  const context = useContext(GameStateContext);
  const { isTwoPlayers, players } = context;
  const points1 = players[0].points;
  const points2 = players[1].points;

  useEffect(() => {
    function handleKeyUp(e: KeyboardEvent) {
      if (e.code === "Space") {
        context.setFallingObjectPositions([]);
        context.setPlayers(DEFAULT_ONE_PLAYER);
        context.setSlowCount(0);
        context.setPressedKeys(BASE_PRESSED_KEYS);
        context.setGameCounter(1);
        context.setIsMainMenu(true);
        sounds.theme.playbackRate = 1;
      }
    }

    document.addEventListener("keyup", handleKeyUp);

    return () => {
      document.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  return (
    <div className="flex flex-col items-center">
      <div className="mb-4 text-4xl font-extrabold">Game Over!</div>
      {isTwoPlayers && (
        <>
          <div className="mb-2 text-xl font-bold">
            Player {points1 > points2 ? "1" : "2"} wins with:
          </div>
          <div className="mb-2 text-lg font-bold">
            {(points1 > points2 ? points1 : points2).toLocaleString()} Points
          </div>
        </>
      )}
      {!isTwoPlayers && (
        <>
          <div className="mb-2 text-xl font-bold">Score</div>
          <div className="mb-2 text-lg font-bold">
            {(points1 > points2 ? points1 : points2).toLocaleString()} Points
          </div>
        </>
      )}
      <div className="text-lg font-semibold">Press Space to Restart</div>
    </div>
  );
}
