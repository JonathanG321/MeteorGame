import { useContext } from "react";
import classNames from "classnames";
import { GameStateContext } from "../context/GameStateContext";
import { getFontSize } from "../utils/lib";

type Props = {
  header?: string;
  displayPoints?: number;
  className?: string;
  left?: boolean;
  large?: boolean;
  isSecondPlayer?: boolean;
  style?: React.CSSProperties;
};

export default function ScoreDisplay({
  header,
  displayPoints,
  left = false,
  large = false,
  isSecondPlayer = false,
  className,
  style,
}: Props) {
  const { players, scale } = useContext(GameStateContext);
  const pointsToDisplay =
    displayPoints ?? (isSecondPlayer ? players[1].points : players[0].points);
  const pointsDigits = pointsToDisplay.toLocaleString().split("").reverse();
  const formattedPoints = !!displayPoints
    ? undefined
    : formatPoints(pointsDigits);

  return (
    <div
      style={{ minWidth: `${192 * scale}px`, ...style }}
      className={classNames("flex flex-col justify-center", className, {
        "items-center": !left,
      })}
    >
      <div style={{ ...getFontSize("lg", scale) }} className="font-bold">
        {header ?? "Score"}
      </div>
      <div
        style={{
          ...getFontSize(large ? "3xl" : "2xl", scale),
          WebkitTextStroke: `${1 * scale}px black`,
        }}
        className="flex font-bold"
      >
        <DisplayPoints
          displayPoints={displayPoints}
          formattedPoints={formattedPoints}
          large
          scale={scale}
        />
      </div>
    </div>
  );
}

function formatPoints(pointsDigits: string[]): string[] {
  return Array.from({ length: 9 })
    .map((_, i) => {
      const char = pointsDigits[i] ?? "0";
      if ((i + 1) % 4 === 0) return ",";
      return char;
    })
    .reverse();
}

type DisplayPointsProps = {
  large: boolean;
  formattedPoints?: string[];
  displayPoints?: number;
  scale: number;
};

function DisplayPoints({
  large,
  formattedPoints,
  displayPoints,
  scale,
}: DisplayPointsProps) {
  if (!!displayPoints || !formattedPoints)
    return <>{displayPoints?.toLocaleString()}</>;
  return (
    <>
      {formattedPoints.map((char, i) => (
        <div
          key={char + i}
          style={getStylesForChar(char, large, scale)}
          className="flex justify-center text-center"
        >
          {char}
        </div>
      ))}
    </>
  );
}

function getStylesForChar(char: string, large: boolean, scale: number) {
  if (char === ",") {
    return { width: large ? `${12 * scale}px` : `${8 * scale}px` };
  }
  return { width: large ? `${26 * scale}px` : `${22 * scale}px` };
}
