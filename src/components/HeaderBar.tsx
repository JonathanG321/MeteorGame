import { useContext } from "react";
import { GameStateContext } from "../context/GameStateContext";
import ScoreDisplay from "./ScoreDisplay";

export default function HeaderBar() {
  const { highScore, gameStage } = useContext(GameStateContext);
  return (
    <div className="flex h-20 w-full items-center justify-end border-4 border-black">
      <ScoreDisplay header="High Score" displayPoints={highScore} />
    </div>
  );
}
