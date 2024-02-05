import {
  isValidPosition,
  playAudio,
  setPlayerValueFunction,
} from "../utils/lib";
import sounds from "../utils/sounds";
import {
  ContextValues,
  ObjectWithRefs,
  Player,
  NullablePlayer,
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
  const { players, pressedKeys, slowCount } = contextRefs;
  const { setPlayers } = contextValues;
  const { ArrowUp, ArrowDown, w, s } = pressedKeys.current;

  players.current.forEach((player, index) => {
    if (!isValidPosition(player)) return;
    const up = index === 0 ? ArrowUp : w;
    const down = index === 0 ? ArrowDown : s;
    singleHeroLogicY(player, up, down, slowCount.current, index, setPlayers);
  });
}

function singleHeroLogicY(
  player: Player,
  pressedKeyUp: boolean,
  pressedKeyDown: boolean,
  slowCount: number,
  index: number,
  setPlayer: StateSetter<NullablePlayer[]>
) {
  const isNotFallingOrJumping =
    !pressedKeyUp && !pressedKeyDown && player.Y === HEIGHT_MINUS_HERO;
  if (slowCount % 2 !== 0 || isNotFallingOrJumping) return;

  let newVelocityDown = player.velocityDown;

  const shouldHeroStopFalling =
    player.Y === HEIGHT_MINUS_HERO &&
    player.velocityDown !== 0 &&
    !pressedKeyUp;
  const shouldHeroJump = pressedKeyUp && player.Y === HEIGHT_MINUS_HERO;

  if (shouldHeroStopFalling) {
    newVelocityDown = 0;
  } else if (shouldHeroJump) {
    newVelocityDown = -HERO_JUMP_SPEED;
    playAudio(sounds.jump);
  } else if (pressedKeyDown) {
    newVelocityDown = newVelocityDown + HERO_GRAVITY * 2;
  } else {
    newVelocityDown = Math.min(
      newVelocityDown + HERO_GRAVITY,
      MAX_HERO_VELOCITY_DOWN
    );
  }

  let newY = player.Y + newVelocityDown;

  newY = Math.max(0, Math.min(newY, HEIGHT_MINUS_HERO));

  if (player.velocityDown !== newVelocityDown)
    setPlayerValueFunction(index, { velocityDown: newVelocityDown }, setPlayer);

  setPlayerValueFunction(index, { Y: newY }, setPlayer);
}
