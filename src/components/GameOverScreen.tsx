import { useContext, useEffect } from "react";
import { GameStateContext } from "../context/GameStateContext";
import { BASE_PRESSED_KEYS, HERO_SPAWN_POINT } from "../utils/variables";
import { themeSound } from "../utils/sounds";
import { playAudio } from "../utils/lib";

export default function GameOverScreen() {
  const context = useContext(GameStateContext);

  useEffect(() => {
    function handleKeyUp(e: KeyboardEvent) {
      if (e.code === "Space") {
        context.setMeteorPositions([]);
        context.setPowerUpPositions([]);
        context.setHeroOriginPoint(HERO_SPAWN_POINT);
        context.setHeroVelocityDown(0);
        context.setPoints(0);
        context.setLives(3);
        context.setInvincibleCount(0);
        if (context.isTwoPlayers) {
          context.setHeroTwoOriginPoint(HERO_SPAWN_POINT);
          context.setHeroVelocityDownTwo(0);
          context.setPointsTwo(0);
          context.setLivesTwo(3);
          context.setInvincibleCountTwo(0);
        }
        context.setSlowCount(0);
        context.setPressedKeys(BASE_PRESSED_KEYS);
        context.setGameCounter(1);
        context.setIsGameOver(false);
        themeSound.playbackRate = 1;
        playAudio(themeSound, 0.5);
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
      <div className="text-lg font-semibold">Press Space to Restart</div>
    </div>
  );
}
