import { useContext, useEffect } from "react";
import { GameStateContext } from "../context/GameStateContext";
import { BASE_PRESSED_KEYS } from "../utils/variables";
import sounds from "../utils/sounds";

export default function GameOverScreen() {
  const context = useContext(GameStateContext);
  const { isTwoPlayers, points } = context;

  useEffect(() => {
    function handleKeyUp(e: KeyboardEvent) {
      if (e.code === "Space") {
        context.setMeteorPositions([]);
        context.setPowerUpPositions([]);
        context.setHeroVelocityDowns([0, 0]);
        context.setPoints([0, 0]);
        context.setLives([3, 3]);
        context.setInvincibleCounts([0, 0]);
        context.setSlowCount(0);
        context.setPressedKeys(BASE_PRESSED_KEYS);
        context.setGameCounter(1);
        context.setIsGameOver(false);
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
            Player {points[0] > points[1] ? "1" : "2"} wins with:
          </div>
          <div className="mb-2 text-lg font-bold">
            {(points[0] > points[1] ? points[0] : points[1]).toLocaleString()}{" "}
            Points
          </div>
        </>
      )}
      {!isTwoPlayers && (
        <>
          <div className="mb-2 text-xl font-bold">Score</div>
          <div className="mb-2 text-lg font-bold">
            {(points[0] > points[1] ? points[0] : points[1]).toLocaleString()}{" "}
            Points
          </div>
        </>
      )}
      <div className="text-lg font-semibold">Press Space to Restart</div>
    </div>
  );
}
