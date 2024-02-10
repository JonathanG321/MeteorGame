import { useContext } from "react";
import { GameStateContext } from "../context/GameStateContext";
import { getFontSize } from "../utils/lib";
import SelectButton from "./SelectButton";

export default function PauseScreen() {
  const { setIsTwoPlayers, isTwoPlayers, scale } = useContext(GameStateContext);

  return (
    <div className="flex flex-col items-center">
      <div style={getFontSize("5xl", scale)} className="font-extrabold">
        Paused
      </div>
    </div>
  );
}
