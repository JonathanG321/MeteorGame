import { notEmpty } from "../utils/lib";
import { Position } from "../utils/types";
import {
  frameRate,
  meteorGravity,
  meteorSize,
  screenHeight,
} from "../utils/variables";
import $ from "jquery";

export function handleMeteorGravity(
  setMeteorOriginPoints: (newOriginPoints: Position[]) => void
) {
  const intervalId = setInterval(() => {
    const meteors = $(".meteor").toArray();
    const newMeteorPositions = meteors
      .map((meteor) => {
        let newY = parseInt(meteor.style.top.slice(0, -2));
        const X = parseInt(meteor.style.left.slice(0, -2));
        if (newY < 0) newY = 0;
        if (newY > screenHeight - meteorSize) {
          meteor.remove();
          return null;
        }

        newY += meteorGravity;

        meteor.style.top = newY + "px";
        return { X, Y: newY };
      })
      .filter(notEmpty);

    setMeteorOriginPoints(newMeteorPositions);
  }, frameRate);

  return () => {
    clearInterval(intervalId);
  };
}
