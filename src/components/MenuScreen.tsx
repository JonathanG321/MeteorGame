import { useContext, useEffect } from "react";
import { BASE_PRESSED_KEYS } from "../utils/variables";
import { GameStateContext } from "../context/GameStateContext";
import sounds from "../utils/sounds";
import {
  playAudio,
  getFontSize,
  getDefaultOnePlayer,
  getDefaultTwoPlayers,
} from "../utils/lib";
import SelectButton from "./SelectButton";

export default function MenuScreen() {
  const {
    setIsMainMenu,
    setFallingObjectPositions,
    setPressedKeys,
    setPlayers,
    setIsTwoPlayers,
    isTwoPlayers,
    scale,
  } = useContext(GameStateContext);

  function selectPlayers(playerSetting: boolean) {
    if (isTwoPlayers !== playerSetting) {
      setIsTwoPlayers(playerSetting);
      playAudio(sounds.uIBeep);
    }
  }

  useEffect(() => {
    function handleKeyUp(e: KeyboardEvent) {
      if (e.code === "Space") {
        setFallingObjectPositions([]);
        setPressedKeys(BASE_PRESSED_KEYS);
        setPlayers(
          !isTwoPlayers
            ? getDefaultOnePlayer(scale)
            : getDefaultTwoPlayers(scale)
        );
        setIsMainMenu(false);
        playAudio(sounds.theme, 0.5);
      } else if (e.code === "ArrowRight") {
        selectPlayers(true);
      } else if (e.code === "ArrowLeft") {
        selectPlayers(false);
      }
    }

    document.addEventListener("keyup", handleKeyUp);

    return () => {
      document.removeEventListener("keyup", handleKeyUp);
    };
  }, [isTwoPlayers]);

  return (
    <div className="flex flex-col items-center">
      <div
        style={{ ...getFontSize("5xl", scale), marginBottom: `${4 * scale}px` }}
        className="font-extrabold"
      >
        Meteor
      </div>
      <div
        style={{
          ...getFontSize("5xl", scale),
          marginBottom: `${16 * scale}px`,
        }}
        className="font-extrabold"
      >
        Hero
      </div>
      <div
        style={{
          ...getFontSize("sm", scale),
          marginLeft: `${8 * scale}px`,
          marginRight: `${8 * scale}px`,
        }}
        className="flex w-full justify-around"
      >
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
      <div
        style={{ ...getFontSize("xl", scale), marginTop: `${16 * scale}px` }}
        className="font-semibold"
      >
        Press Space to Start
      </div>
    </div>
  );
}
