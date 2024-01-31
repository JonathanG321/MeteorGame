import { isValidPosition, playAudio } from "../utils/lib";
import sounds from "../utils/sounds";
import {
  ContextValues,
  NullablePosition,
  ObjectWithRefs,
  Position,
  StateSetter,
} from "../utils/types";
import {
  HEIGHT_MINUS_HERO,
  HERO_GRAVITY,
  HERO_JUMP_SPEED,
  MAX_HERO_VELOCITY_DOWN,
} from "../utils/variables";

export default function heroMovementLogicY(
  contextRefs: ObjectWithRefs<ContextValues>,
  contextValues: ContextValues
) {
  const {
    heroOriginPoint,
    pressedKeys,
    heroVelocityDown,
    heroVelocityDownTwo,
    slowCount,
    heroTwoOriginPoint,
    isTwoPlayers,
  } = contextRefs;
  const {
    setHeroOriginPoint,
    setHeroTwoOriginPoint,
    setHeroVelocityDown,
    setHeroVelocityDownTwo,
  } = contextValues;
  if (isValidPosition(heroOriginPoint.current))
    singleHeroLogicY(
      heroOriginPoint.current.Y,
      pressedKeys.current.ArrowUp,
      pressedKeys.current.ArrowDown,
      heroVelocityDown.current,
      slowCount.current,
      setHeroVelocityDown,
      setHeroOriginPoint
    );
  if (isValidPosition(heroTwoOriginPoint.current) && isTwoPlayers.current)
    singleHeroLogicY(
      heroTwoOriginPoint.current.Y,
      pressedKeys.current.w,
      pressedKeys.current.s,
      heroVelocityDownTwo.current,
      slowCount.current,
      setHeroVelocityDownTwo,
      setHeroTwoOriginPoint
    );
}

function singleHeroLogicY(
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
    (!pressedKeyUp && !pressedKeyDown && heroPositionY === HEIGHT_MINUS_HERO)
  ) {
    return;
  }

  let newVelocityDown = velocityDown;

  const shouldHeroStopFalling =
    heroPositionY === HEIGHT_MINUS_HERO && velocityDown !== 0 && !pressedKeyUp;
  const shouldHeroJump = pressedKeyUp && heroPositionY === HEIGHT_MINUS_HERO;

  if (shouldHeroStopFalling) {
    newVelocityDown = 0;
  } else if (shouldHeroJump) {
    newVelocityDown = -HERO_JUMP_SPEED;
    playAudio(sounds.jump);
  } else if (pressedKeyDown) {
    newVelocityDown = newVelocityDown + HERO_GRAVITY;
  } else {
    newVelocityDown = Math.min(
      newVelocityDown + HERO_GRAVITY,
      MAX_HERO_VELOCITY_DOWN
    );
  }

  let newY = heroPositionY + newVelocityDown;

  newY = Math.max(0, Math.min(newY, HEIGHT_MINUS_HERO));

  if (velocityDown !== newVelocityDown) setVelocityDown(newVelocityDown);
  updatePosition((prev) => ({ ...prev, Y: newY }));
}
