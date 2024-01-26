import { useContext } from "react";
import { GameStateContext } from "../context/GameStateContext";
import ScoreDisplay from "./ScoreDisplay";
import heart from "../assets/images/powerUps/PixelHeart.png";
import darkHeart from "../assets/images/powerUps/PixelHeartDark.png";

export default function HeaderBar() {
  const { highScore, lives } = useContext(GameStateContext);
  return (
    <div className="bg-green flex h-20 w-full items-center justify-between border-4 border-black">
      <div className="ml-2 flex">
        {Array.from({ length: 3 }).map((_, i) => {
          return (
            <div key={i + heart} className="m-1 h-12 w-12">
              <img src={i < lives ? heart : darkHeart} width={48} height={48} />
            </div>
          );
        })}
      </div>
      <div className="flex">
        <ScoreDisplay />
        <ScoreDisplay header="High Score" displayPoints={highScore} />
      </div>
    </div>
  );
}
