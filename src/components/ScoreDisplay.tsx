import { useContext } from "react";
import { GameStateContext } from "../context/GameStateContext";
import classNames from "classnames";

type Props = {
  header?: string;
  displayPoints?: number;
  className?: string;
  left?: boolean;
  large?: boolean;
  isSecondPlayer?: boolean;
};

export default function ScoreDisplay({
  header,
  displayPoints,
  left = false,
  large = false,
  isSecondPlayer = false,
  className,
}: Props) {
  const { points, pointsTwo } = useContext(GameStateContext);
  const pointsDigits = (displayPoints ?? (isSecondPlayer ? pointsTwo : points))
    .toLocaleString()
    .split("")
    .reverse();
  const finalDigits = Array.from({ length: 9 })
    .map((_, i) => {
      if ((i + 1) % 4 === 0) return ",";
      return pointsDigits[i] ?? "0";
    })
    .reverse()
    .join("");
  return (
    <div
      className={classNames(
        "flex min-w-48 flex-col justify-center",
        className,
        { "items-center": !left }
      )}
    >
      <div className="text-lg font-bold">{header ?? "Score"}</div>
      <div
        className={classNames("font-outline-1 flex font-bold", {
          "text-3xl": large,
          "text-2xl": !large,
        })}
      >
        {/* {Array.from({ length: 9 }).map((_, i) => {
          const char = pointsDigits[i];
          if (i === 5 || i === 1) {
            return (
              <div
                key={"," + i}
                className={classNames("flex justify-center text-center", {
                  "w-2": !large,
                  "w-3": large,
                })}
              >
                ,
              </div>
            );
          } else if (i + pointsDigits.length < 9) {
            return (
              <div
                key={"0" + i}
                className={classNames("flex justify-center text-center", {
                  "w-[22px]": !large,
                  "w-[26px]": large,
                })}
              >
                0
              </div>
            );
          }
          return (
            <div
              key={char + i}
              className={classNames("flex justify-center text-center", {
                "w-[22px]": char !== "," && !large,
                "w-[26px]": char !== "," && large,
                "w-2": char === "," && !large,
                "w-3": char === "," && large,
              })}
            >
              {char}
            </div>
          );
        })} */}
        {(displayPoints || finalDigits)
          .toLocaleString()
          .split("")
          .map((char, i) => (
            <div
              key={char + i}
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
