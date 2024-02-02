import { useContext } from "react";
import { GameStateContext } from "../context/GameStateContext";
import ScoreDisplay from "./ScoreDisplay";
import LivesDisplay from "./LivesDisplay";

export default function UI() {
  const { lives, gameStage, isTwoPlayers } = useContext(GameStateContext);
  return (
    <div className="absolute z-10 flex w-full justify-between px-3 pt-3">
      <div className="flex h-full w-1/3 flex-col">
        {isTwoPlayers && <LivesDisplay start lives={lives[0]} />}
        <ScoreDisplay large left className="mt-2 text-white" header="" />
      </div>
      <div className="font-outline-1 mt-2 flex h-full w-1/3 items-center justify-center text-3xl font-bold text-white">
        STAGE {gameStage}
      </div>
      <div className="flex w-1/3 flex-col items-end justify-end">
        <LivesDisplay lives={isTwoPlayers ? lives[1] : lives[0]} />
        {isTwoPlayers && (
          <ScoreDisplay
            isSecondPlayer
            large
            left
            className="mt-2 text-white"
            header=""
          />
        )}
      </div>
    </div>
  );
}
