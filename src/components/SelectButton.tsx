import { useContext } from "react";
import { getFontSize } from "../utils/lib";
import { GameStateContext } from "../context/GameStateContext";

type Props = {
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  isSelected: boolean;
  title: string;
};

export default function SelectButton({ isSelected, onClick, title }: Props) {
  const { scale } = useContext(GameStateContext);
  return (
    <button
      style={{ ...getFontSize("sm", scale), width: `${124 * scale}px` }}
      className="mr-2 flex justify-end"
      onClick={onClick}
    >
      {isSelected && <div className="w-1/12">{">"}</div>}
      <div className="w-11/12">{title}</div>
    </button>
  );
}
