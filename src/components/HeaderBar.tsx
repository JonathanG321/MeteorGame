import ScoreDisplay from "./ScoreDisplay";
import parchment from "../assets/images/PixelParchment.png";

type Props = { highScore: number; width: number; height: number };

export default function HeaderBar({ highScore, width, height }: Props) {
  return (
    <div
      style={{ width, height, backgroundImage: `url(${parchment})` }}
      className="font-outline-1 flex w-full items-center justify-between border-4 border-black bg-cover bg-center bg-no-repeat text-white"
    >
      <h1 className="font-outline-2 ml-4 text-4xl">Meteor Hero</h1>
      <ScoreDisplay header="High Score" displayPoints={highScore} />
    </div>
  );
}
