import { useContext } from "react";
import { GameStateContext } from "../GameStateContext";
import ScoreDisplay from "./ScoreDisplay";

export default function HeaderBar() {
  const { highScore } = useContext(GameStateContext);
  return (
    <div className="bg-green flex h-20 w-full items-center justify-between border-4 border-black">
      <ScoreDisplay />
      <ScoreDisplay header="High Score" displayPoints={highScore} />
    </div>
  );
}
