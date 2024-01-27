import { useContext } from "react";
import { GameStateContext } from "../context/GameStateContext";
import classNames from "classnames";

type Props = {
  header?: string;
  displayPoints?: number;
  className?: string;
  left?: boolean;
  large?: boolean;
};

export default function ScoreDisplay({
  header,
  displayPoints,
  left = false,
  large = false,
  className,
}: Props) {
  const { points } = useContext(GameStateContext);
  return (
    <div
      className={classNames(
        "flex min-w-48 flex-col justify-center",
        className,
        { "items-center": !left, "ml-6": left }
      )}
    >
      <div className="text-lg font-bold">{header ?? "Score"}</div>
      <div
        className={classNames("font-outline-1 flex font-bold", {
          "text-3xl": large,
          "text-2xl": !large,
        })}
      >
        {(displayPoints ?? points)
          .toLocaleString()
          .split("")
          .map((char) => (
            <div
              className={classNames("flex justify-center text-center", {
                "w-[22px]": char !== "," && !large,
                "w-[26px]": char !== "," && large,
                "w-2": char === "," && !large,
                "w-3": char === "," && large,
              })}
            >
              {char}
            </div>
          ))}
      </div>
    </div>
  );
}
