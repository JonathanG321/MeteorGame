import { Position } from "../utils/types";
import {
  frameRate,
  heroGravity,
  heroSize,
  maxHeroVelocityDown,
  screenHeight,
} from "../utils/variables";
import $ from 'jquery'

export function handleHeroGravity(
  velocityDown: number,
  heroOriginPoint: Position,
  setIsGrounded: (isGrounded: boolean) => void,
  setVelocityDown: (newVelocity: number) => void,
  setHeroOriginPoint: (newOriginPoint: Position) => void
) {
  const intervalId = setInterval(() => {
    const hero = $("#hero");
    let newY = parseInt(hero.css("top"));

    newY += velocityDown;

    if (newY < 0) newY = 0;
    if (newY > screenHeight - heroSize) {
      newY = screenHeight - heroSize;
      setIsGrounded(true);
      setVelocityDown(0);
    } else {
      if (velocityDown < maxHeroVelocityDown) {
        setVelocityDown(velocityDown + heroGravity);
      } else {
        setVelocityDown(maxHeroVelocityDown);
      }
    }

    setHeroOriginPoint({ ...heroOriginPoint, Y: newY });
    hero.css("top", newY);
  }, frameRate);

  return () => {
    clearInterval(intervalId);
  };
}
