import { Position, PressedKeys } from "../utils/types";
import {
  frameRate,
  heroJumpHeight,
  heroSize,
  heroSpeed,
  screenWidth,
} from "../utils/variables";
import $ from "jquery";

export default function handleHeroControls(
  pressedKeys: PressedKeys,
  isGrounded: boolean,
  heroOriginPoint: Position,
  setIsGrounded: (isGrounded: boolean) => void,
  setVelocityDown: (newVelocity: number) => void,
  setHeroOriginPoint: (newOriginPoint: Position) => void
) {
  const intervalId = setInterval(() => {
    const hero = $("#hero");
    let newX = parseInt(hero.css("left"));

    // handle controls
    if (pressedKeys["ArrowUp"] && isGrounded) {
      setIsGrounded(false);
      setVelocityDown(-heroJumpHeight);
    }
    if (pressedKeys["ArrowLeft"]) newX -= heroSpeed;
    if (pressedKeys["ArrowRight"]) newX += heroSpeed;

    if (newX < 0) newX = 0;
    if (newX > screenWidth - heroSize) newX = screenWidth - heroSize;

    setHeroOriginPoint({ ...heroOriginPoint, X: newX });
    hero.css("left", newX);
  }, frameRate);

  return () => {
    clearInterval(intervalId);
  };
}
