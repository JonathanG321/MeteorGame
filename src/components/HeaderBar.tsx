import ScoreDisplay from "./ScoreDisplay";
import parchment from "../assets/images/PixelParchment.png";
import { useContext } from "react";
import { GameStateContext } from "../context/GameStateContext";
import { getFontSize } from "../utils/lib";
import { BORDER_WIDTH } from "../utils/variables";

type Props = { highScore: number; width: number; height: number };

export default function HeaderBar({ highScore, width, height }: Props) {
  const { scale } = useContext(GameStateContext);
  return (
    <div
      style={{
        width,
        height,
        backgroundImage: `url(${parchment})`,
        borderWidth: `${BORDER_WIDTH * scale}px`,
        WebkitTextStroke: `${1 * scale}px black`,
      }}
      className="flex w-full items-center justify-between border-black bg-cover bg-center bg-no-repeat text-white"
    >
      <h1
        style={{
          ...getFontSize("4xl", scale),
          WebkitTextStroke: `${2 * scale}px black`,
          marginLeft: `${16 * scale}px`,
        }}
      >
        Meteor Hero
      </h1>
      <ScoreDisplay header="High Score" displayPoints={highScore} />
    </div>
  );
}
