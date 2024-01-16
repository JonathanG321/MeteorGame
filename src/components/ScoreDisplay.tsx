import { useContext } from "react";
import { GameStateContext } from "../GameStateContext";

type Props = {
  header?: string;
  displayPoints?: number;
};

export default function ScoreDisplay({ header, displayPoints }: Props) {
  const { points } = useContext(GameStateContext);
  return (
    <div className="flex min-w-36 flex-col items-center justify-center">
      <div className="text-lg font-bold">{header ?? "Score"}</div>
      <div className="text-2xl font-bold">
        {(displayPoints ?? points).toLocaleString()}
      </div>
    </div>
  );
}
