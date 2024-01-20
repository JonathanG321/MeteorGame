import { Position } from "../utils/types";
import {
  HERO_GRAVITY,
  HERO_JUMP_SPEED,
  HERO_SIZE,
  MAX_HERO_VELOCITY_DOWN,
  SCREEN_HEIGHT,
} from "../utils/variables";

export function useHeroMovementLogicY(
  heroPositionY: Position["Y"],
  pressedKeyUp: boolean,
  pressedKeyDown: boolean,
  velocityDown: number,
  slowCount: number,
  setVelocityDown: React.Dispatch<React.SetStateAction<number>>,
  updatePosition: (newPosition: Partial<Position>) => void
) {
  if (slowCount % 2 !== 0) return;
  if (
    heroPositionY === SCREEN_HEIGHT - HERO_SIZE &&
    velocityDown !== 0 &&
    !pressedKeyUp
  ) {
    setVelocityDown(0);
  } else if (pressedKeyUp && heroPositionY === SCREEN_HEIGHT - HERO_SIZE) {
    setVelocityDown(-HERO_JUMP_SPEED);
  } else if (velocityDown < MAX_HERO_VELOCITY_DOWN && !pressedKeyDown) {
    setVelocityDown(velocityDown + HERO_GRAVITY);
  } else if (pressedKeyDown) {
    setVelocityDown(velocityDown + HERO_GRAVITY * 2);
  } else {
    setVelocityDown(MAX_HERO_VELOCITY_DOWN);
  }

  let newY = heroPositionY;

  newY += velocityDown;
  if (newY < 0) newY = 0;
  if (newY > SCREEN_HEIGHT - HERO_SIZE) newY = SCREEN_HEIGHT - HERO_SIZE;
  if (newY !== heroPositionY) updatePosition({ Y: newY });
}
