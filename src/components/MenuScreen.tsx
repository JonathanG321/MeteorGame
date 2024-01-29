import { useContext, useEffect } from "react";
import { BASE_PRESSED_KEYS, HERO_SPAWN_POINT } from "../utils/variables";
import { GameStateContext } from "../context/GameStateContext";
import { themeSound } from "../utils/sounds";
import { playAudio } from "../utils/lib";

export default function MenuScreen() {
  const {
    setIsMainMenu,
    setMeteorPositions,
    setPressedKeys,
    setHeroOriginPoint,
  } = useContext(GameStateContext);

  useEffect(() => {
    function handleKeyUp(e: KeyboardEvent) {
      if (e.code === "Space") {
        setMeteorPositions([]);
        setPressedKeys(BASE_PRESSED_KEYS);
        setHeroOriginPoint(HERO_SPAWN_POINT);
        setIsMainMenu(false);
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
      <div className="mb-1 text-5xl font-extrabold">Meteor</div>
      <div className="mb-4 text-5xl font-extrabold">Hero</div>
      <div className="text-xl font-semibold">Press Space to Start</div>
    </div>
  );
}
