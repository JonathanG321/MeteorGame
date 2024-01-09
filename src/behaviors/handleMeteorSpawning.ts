import { Position } from "../utils/types";
import { meteorSize, screenWidth } from "../utils/variables";
import $ from "jquery";

export function handleMeteorSpawning(
  meteorOriginPoints: Position[],
  setMeteorOriginPoints: (newOriginPoints: Position[]) => void
) {
  const intervalId = setInterval(() => {
    const newMeteorPosition = {
      Y: 40,
      X: Math.round(Math.random() * (screenWidth - meteorSize)),
    };
    $(
      `<div style="top: ${newMeteorPosition.Y}px; left: ${newMeteorPosition.X}px;" class="h-[${meteorSize}px] w-[${meteorSize}px] bg-red-500 absolute meteor"></div>`
    ).appendTo("#canvas");
    setMeteorOriginPoints(meteorOriginPoints.concat([newMeteorPosition]));
  }, 1000);

  return () => {
    clearInterval(intervalId);
  };
}
