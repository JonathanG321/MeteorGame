import { useContext } from "react";
import { GameStateContext } from "../context/GameStateContext";
import ScoreDisplay from "./ScoreDisplay";
import LivesDisplay from "./LivesDisplay";
import { getFontSize } from "../utils/lib";

export default function UI() {
  const { players, gameStage, isTwoPlayers, scale } =
    useContext(GameStateContext);
  const marginStyles = { marginTop: `${8 * scale}px` };
  const paddingStyle = `${12 * scale}px`;
  return (
    <div
      style={{
        paddingLeft: paddingStyle,
        paddingRight: paddingStyle,
        paddingTop: paddingStyle,
      }}
      className="absolute z-10 flex w-full justify-between"
    >
      <div className="flex h-full w-1/3 flex-col">
        {isTwoPlayers && <LivesDisplay start lives={players[0].lives} />}
        <ScoreDisplay
          style={marginStyles}
          large
          left
          className="text-white"
          header=""
        />
      </div>
      <div
        style={{
          ...getFontSize("3xl", scale),
          WebkitTextStroke: `${1 * scale}px black`,
          ...marginStyles,
        }}
        className="flex h-full w-1/3 items-center justify-center font-bold text-white"
      >
        STAGE {gameStage}
      </div>
      <div className="flex w-1/3 flex-col items-end justify-end">
        <LivesDisplay
          lives={isTwoPlayers ? players[1].lives : players[0].lives}
        />
        {isTwoPlayers && (
          <ScoreDisplay
            isSecondPlayer
            large
            left
            style={marginStyles}
            className="text-white"
            header=""
          />
        )}
      </div>
    </div>
  );
}
