import { isValidPosition, playAudio, updateItemInArray } from "../utils/lib";
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
    heroOriginPoints,
    pressedKeys,
    heroVelocityDowns,
    slowCount,
    isTwoPlayers,
  } = contextRefs;
  const { setHeroOriginPoints, setHeroVelocityDowns } = contextValues;
  if (isValidPosition(heroOriginPoints.current[0]))
    singleHeroLogicY(
      heroOriginPoints.current[0].Y,
      pressedKeys.current.ArrowUp,
      pressedKeys.current.ArrowDown,
      heroVelocityDowns.current[0],
      slowCount.current,
      0,
      setHeroVelocityDowns,
      setHeroOriginPoints
    );
  if (isValidPosition(heroOriginPoints.current[1]) && isTwoPlayers.current)
    singleHeroLogicY(
      heroOriginPoints.current[1].Y,
      pressedKeys.current.w,
      pressedKeys.current.s,
      heroVelocityDowns.current[1],
      slowCount.current,
      1,
      setHeroVelocityDowns,
      setHeroOriginPoints
    );
}

function singleHeroLogicY(
  heroPositionY: Position["Y"],
  pressedKeyUp: boolean,
  pressedKeyDown: boolean,
  velocityDown: number,
  slowCount: number,
  index: number,
  setVelocityDown: StateSetter<number[]>,
  updatePosition: StateSetter<NullablePosition[]>
) {
  const isNotFallingOrJumping =
    !pressedKeyUp && !pressedKeyDown && heroPositionY === HEIGHT_MINUS_HERO;
  if (slowCount % 2 !== 0 || isNotFallingOrJumping) return;

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

  if (velocityDown !== newVelocityDown)
    setVelocityDown((prev) => updateItemInArray(prev, index, newVelocityDown));
  updatePosition((prev) =>
    updateItemInArray(prev, index, { ...prev[index], Y: newY })
  );
}
