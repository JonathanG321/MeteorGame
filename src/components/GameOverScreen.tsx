import { useContext, useEffect } from "react";
import { BASE_PRESSED_KEYS, HERO_SPAWN_POINT } from "../utils/variables";
import { GameStateContext } from "../GameStateContext";

export default function GameOverScreen() {
  const {
    setIsGameOver,
    isGameOver,
    setMeteorPositions,
    setPressedKeys,
    setHeroOriginPoint,
    setHeroVelocityDown,
    setPoints,
  } = useContext(GameStateContext);

  useEffect(() => {
    function handleKeyUp(e: KeyboardEvent) {
      if (e.code === "Space") {
        setMeteorPositions([]);
        setHeroOriginPoint(HERO_SPAWN_POINT);
        setHeroVelocityDown(0);
        setPoints(0);
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
    <div className="flex flex-col items-center">
      <div className="text-5xl font-extrabold">Game Over!</div>
      <div className="text-xl font-semibold">Press Space to Restart</div>
    </div>
  );
}
