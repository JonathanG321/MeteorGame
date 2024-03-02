import { useContext, useEffect, useState } from "react";
import { BASE_PRESSED_KEYS } from "../utils/variables";
import { GameStateContext } from "../context/GameStateContext";
import setSounds from "../utils/sounds";
import SelectButton from "./SelectButton";
import uIBeep from "../assets/sounds/UIBeep.mp3";
import {
  playAudio,
  getFontSize,
  getDefaultOnePlayer,
  getDefaultTwoPlayers,
  playNewAudio,
} from "../utils/lib";

export default function MenuScreen() {
  const {
    setIsMainMenu,
    setFallingObjectPositions,
    setPressedKeys,
    setPlayers,
    setIsTwoPlayers,
    setIsSettings,
    isTwoPlayers,
    scale,
  } = useContext(GameStateContext);
  const [selected, setSelected] = useState(0);

  useEffect(() => {
    function handleKeyUp(e: KeyboardEvent) {
      if (e.code === "Space") {
        if (selected === 0) {
          setIsSettings(true);
          setIsMainMenu(false);
        } else {
          if (selected === 1) {
            setIsTwoPlayers(false);
          } else {
            setIsTwoPlayers(false);
          }
          setFallingObjectPositions([]);
          setPressedKeys(BASE_PRESSED_KEYS);
          setPlayers(
            selected === 1
              ? getDefaultOnePlayer(scale)
              : getDefaultTwoPlayers(scale)
          );
          setIsMainMenu(false);
          playAudio(setSounds.theme, 0.5);
        }
      } else if (e.code === "ArrowRight" || e.code === "ArrowDown") {
        setSelected((prev) => {
          if (prev >= 2) return prev;
          playNewAudio(uIBeep, 0.5);
          return prev + 1;
        });
      } else if (e.code === "ArrowLeft" || e.code === "ArrowUp") {
        setSelected((prev) => {
          if (prev <= 0) return prev;
          playNewAudio(uIBeep, 0.5);
          return prev - 1;
        });
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
        className="flex w-full justify-center"
      >
        <SelectButton
          isSelected={selected === 0}
          onClick={() => setSelected(0)}
          title="Settings"
        />
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
          isSelected={selected === 1}
          onClick={() => setSelected(1)}
          title="1 Player"
        />
        <SelectButton
          isSelected={selected === 2}
          onClick={() => setSelected(2)}
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
