import { useContext, useEffect } from "react";
import {
  BASE_PRESSED_KEYS,
  FIRST_PLAYER_SPAWN_POINT,
  HERO_SPAWN_POINT,
  SECOND_PLAYER_SPAWN_POINT,
} from "../utils/variables";
import { GameStateContext } from "../context/GameStateContext";
import sounds from "../utils/sounds";
import { playAudio } from "../utils/lib";
import SelectButton from "./SelectButton";

export default function MenuScreen() {
  const {
    setIsMainMenu,
    setMeteorPositions,
    setPressedKeys,
    setHeroOriginPoint,
    setHeroTwoOriginPoint,
    setIsTwoPlayers,
    isTwoPlayers,
  } = useContext(GameStateContext);

  useEffect(() => {
    function handleKeyUp(e: KeyboardEvent) {
      if (e.code === "Space") {
        setMeteorPositions([]);
        setPressedKeys(BASE_PRESSED_KEYS);
        setHeroOriginPoint(
          isTwoPlayers ? FIRST_PLAYER_SPAWN_POINT : HERO_SPAWN_POINT
        );
        setIsMainMenu(false);
        playAudio(sounds.theme, 0.5);
      } else if (e.code === "ArrowRight") {
        setIsTwoPlayers(true);
      } else if (e.code === "ArrowLeft") {
        setIsTwoPlayers(false);
      }
      if (e.code === "Space" && isTwoPlayers) {
        setHeroTwoOriginPoint(SECOND_PLAYER_SPAWN_POINT);
      }
    }

    document.addEventListener("keyup", handleKeyUp);

    return () => {
      document.removeEventListener("keyup", handleKeyUp);
    };
  }, [isTwoPlayers]);

  return (
    <div className="flex flex-col items-center">
      <div className="mb-1 text-5xl font-extrabold">Meteor</div>
      <div className="mb-4 text-5xl font-extrabold">Hero</div>
      <div className="my-2 flex w-full justify-around text-sm">
        <SelectButton
          isSelected={!isTwoPlayers}
          onClick={() => setIsTwoPlayers(false)}
          title="1 Player"
        />
        <SelectButton
          isSelected={isTwoPlayers}
          onClick={() => setIsTwoPlayers(true)}
          title="2 Players"
        />
      </div>
      <div className="text-xl font-semibold">Press Space to Start</div>
    </div>
  );
}
