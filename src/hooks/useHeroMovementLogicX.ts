import {
  Direction,
  NullablePosition,
  Position,
  StateSetter,
} from "../utils/types";
import { HERO_SIZE, HERO_SPEED, SCREEN_WIDTH } from "../utils/variables";

export default function useHeroMovementLogicX(
  heroPositionX: Position["X"],
  pressedKeyLeft: boolean,
  pressedKeyRight: boolean,
  isSlow: boolean,
  lastDirection: Direction,
  updatePosition: StateSetter<NullablePosition>,
  setLastDirection: StateSetter<Direction>
) {
  if (!pressedKeyLeft && !pressedKeyRight) return;
  let newX = heroPositionX;
  if (pressedKeyLeft) {
    newX -= isSlow ? HERO_SPEED / 2 : HERO_SPEED;
    if (lastDirection === "right") setLastDirection("left");
  } else if (pressedKeyRight) {
    newX += isSlow ? HERO_SPEED / 2 : HERO_SPEED;
    if (lastDirection === "left") setLastDirection("right");
  }
  if (newX < 0) newX = 0;
  if (newX > SCREEN_WIDTH - HERO_SIZE) newX = SCREEN_WIDTH - HERO_SIZE;
  if (newX !== heroPositionX) updatePosition((prev) => ({ ...prev, X: newX }));
}
