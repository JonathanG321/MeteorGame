import { useContext } from "react";
import { GameStateContext } from "../GameStateContext";

export default function Score() {
  const { points } = useContext(GameStateContext);
  return (
    <div className="absolute z-20 m-2 flex w-40 flex-col items-center justify-center border-4 border-black bg-white p-2">
      <div className="text-lg font-bold">Score</div>
      <div className="text-2xl font-bold">{points.toLocaleString()}</div>
    </div>
  );
}
