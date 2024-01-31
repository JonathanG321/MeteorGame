import React, { useContext } from "react";
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
  const pointsToDisplay =
    displayPoints ?? (isSecondPlayer ? pointsTwo : points);
  const pointsDigits = pointsToDisplay.toLocaleString().split("").reverse();
  const formattedPoints = !!displayPoints
    ? undefined
    : formatPoints(pointsDigits);

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
        <DisplayPoints
          displayPoints={displayPoints}
          formattedPoints={formattedPoints}
          large
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

function getClassNamesForChar(char: string, large: boolean): string {
  const widthClass =
    char === "," ? (large ? "w-3" : "w-2") : large ? "w-[26px]" : "w-[22px]";
  return classNames("flex justify-center text-center", widthClass);
}

type DisplayPointsProps = {
  large: boolean;
  formattedPoints?: string[];
  displayPoints?: number;
};

function DisplayPoints({
  large,
  formattedPoints,
  displayPoints,
}: DisplayPointsProps) {
  if (!!displayPoints || !formattedPoints)
    return <>{displayPoints?.toLocaleString()}</>;
  return (
    <>
      {formattedPoints.map((char, i) => (
        <div key={char + i} className={getClassNamesForChar(char, large)}>
          {char}
        </div>
      ))}
    </>
  );
}
