import { playAudio } from "../utils/lib";
import { jumpSound } from "../utils/sounds";
import { NullablePosition, Position, StateSetter } from "../utils/types";
import {
  HERO_GRAVITY,
  HERO_JUMP_SPEED,
  HERO_SIZE,
  MAX_HERO_VELOCITY_DOWN,
  SCREEN_HEIGHT,
} from "../utils/variables";

export default function useHeroMovementLogicY(
  heroPositionY: Position["Y"],
  pressedKeyUp: boolean,
  pressedKeyDown: boolean,
  velocityDown: number,
  slowCount: number,
  setVelocityDown: StateSetter<number>,
  updatePosition: StateSetter<NullablePosition>
) {
  if (
    slowCount % 2 !== 0 ||
    (!pressedKeyUp &&
      !pressedKeyDown &&
      heroPositionY === SCREEN_HEIGHT - HERO_SIZE)
  )
    return;
  if (
    heroPositionY === SCREEN_HEIGHT - HERO_SIZE &&
    velocityDown !== 0 &&
    !pressedKeyUp
  ) {
    setVelocityDown(0);
  } else if (pressedKeyUp && heroPositionY === SCREEN_HEIGHT - HERO_SIZE) {
    setVelocityDown(-HERO_JUMP_SPEED);
    playAudio(jumpSound);
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
  if (newY !== heroPositionY) updatePosition((prev) => ({ ...prev, Y: newY }));
}
