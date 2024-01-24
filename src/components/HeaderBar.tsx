import { useContext } from "react";
import { GameStateContext } from "../context/GameStateContext";
import ScoreDisplay from "./ScoreDisplay";
import heart from "../assets/powerUps/PixelHeart.png";

export default function HeaderBar() {
  const { highScore, lives } = useContext(GameStateContext);
  return (
    <div className="bg-green flex h-20 w-full items-center justify-between border-4 border-black">
      <ScoreDisplay />
      <div className="flex">
        {Array.from({ length: 3 }).map((_, i) => {
          return (
            <div key={i + heart} className="m-1 h-12 w-12">
              {i < lives && <img src={heart} width={48} height={48} />}
            </div>
          );
        })}
      </div>
      <ScoreDisplay header="High Score" displayPoints={highScore} />
    </div>
  );
}
