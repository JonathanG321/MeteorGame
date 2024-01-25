import { useContext, useEffect } from "react";
import { BASE_PRESSED_KEYS, HERO_SPAWN_POINT } from "../utils/variables";
import { GameStateContext } from "../context/GameStateContext";
import { gameOverSound, themeSound } from "../utils/sounds";
import { playAudio } from "../utils/lib";

export default function GameOverScreen() {
  const {
    setIsGameOver,
    setMeteorPositions,
    setPressedKeys,
    setHeroOriginPoint,
    setHeroVelocityDown,
    setPoints,
    setLives,
    setInvincibleCount,
    setPowerUpPositions,
    setSlowCount,
  } = useContext(GameStateContext);

  useEffect(() => {
    function handleKeyUp(e: KeyboardEvent) {
      if (e.code === "Space") {
        setMeteorPositions([]);
        setPowerUpPositions([]);
        setHeroOriginPoint(HERO_SPAWN_POINT);
        setHeroVelocityDown(0);
        setPoints(0);
        setLives(3);
        setInvincibleCount(0);
        setSlowCount(0);
        setPressedKeys(BASE_PRESSED_KEYS);
        setIsGameOver(false);
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
      <div className="text-5xl font-extrabold">Game Over!</div>
      <div className="text-xl font-semibold">Press Space to Restart</div>
    </div>
  );
}
