import { useContext } from "react";
import { GameStateContext } from "../context/GameStateContext";
import ScoreDisplay from "./ScoreDisplay";
import heart from "../assets/images/powerUps/PixelHeart.png";
import darkHeart from "../assets/images/powerUps/PixelHeartDark.png";

export default function UI() {
  const { lives, gameStage } = useContext(GameStateContext);
  return (
    <div className="absolute z-10 flex w-full items-center justify-between">
      <ScoreDisplay large left className="w-1/3 text-white" header="" />
      <div className="font-outline-1 ml-3 flex h-full w-1/3 items-center justify-center text-3xl font-bold text-white">
        STAGE {gameStage}
      </div>
      <div className="mr-3 mt-3 flex w-1/3 items-end justify-end">
        {Array.from({ length: 3 }).map((_, i) => {
          return (
            <div key={i + heart} className="m-1 h-12 w-12">
              <img src={i < lives ? heart : darkHeart} width={48} height={48} />
            </div>
          );
        })}
      </div>
    </div>
  );
}
