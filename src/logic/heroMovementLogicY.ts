import {
  isValidPosition,
  playAudio,
  playNewAudio,
  setPlayerValueFunction,
} from "../utils/lib";
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
import jump from "../assets/sounds/Jump.mp3";

export default function heroMovementLogicY(
  contextRefs: ObjectWithRefs<ContextValues>,
  contextValues: ContextValues
) {
  const { players, pressedKeys, slowCount } = contextRefs;
  const { setPlayers, scale } = contextValues;
  const { ArrowUp, ArrowDown, w, s } = pressedKeys.current;

  players.current.forEach((player, index) => {
    if (!isValidPosition(player)) return;
    const up = index === 0 ? ArrowUp : w;
    const down = index === 0 ? ArrowDown : s;
    singleHeroLogicY(
      player,
      up,
      down,
      slowCount.current,
      index,
      scale,
      setPlayers
    );
  });
}

function singleHeroLogicY(
  player: Player,
  pressedKeyUp: boolean,
  pressedKeyDown: boolean,
  slowCount: number,
  index: number,
  scale: number,
  setPlayer: StateSetter<NullablePlayer[]>
) {
  if (shouldNotCalcY(pressedKeyUp, pressedKeyDown, player.Y, slowCount, scale))
    return;

  const shouldHeroStopFalling = getShouldHeroStopFalling(
    player,
    pressedKeyUp,
    scale
  );
  const shouldHeroJump = pressedKeyUp && player.Y === HEIGHT_MINUS_HERO * scale;

  const newVelocityDown = getNewVelocityDown(
    player.velocityDown,
    shouldHeroStopFalling,
    shouldHeroJump,
    pressedKeyDown,
    scale
  );

  updatePlayerPosition(player, index, newVelocityDown, scale, setPlayer);
}

function getNewVelocityDown(
  oldVelocityDown: number,
  shouldHeroStopFalling: boolean,
  shouldHeroJump: boolean,
  shouldFallFast: boolean,
  scale: number
) {
  if (shouldHeroStopFalling) {
    return 0;
  } else if (shouldHeroJump) {
    playNewAudio(jump);
    return -HERO_JUMP_SPEED * scale;
  } else if (shouldFallFast) {
    return oldVelocityDown + HERO_GRAVITY * scale * 2;
  } else {
    return Math.min(
      oldVelocityDown + HERO_GRAVITY * scale,
      MAX_HERO_VELOCITY_DOWN * scale
    );
  }
}

function shouldNotCalcY(
  pressedKeyUp: boolean,
  pressedKeyDown: boolean,
  playerY: number,
  slowCount: number,
  scale: number
) {
  const isNotFallingOrJumping =
    !pressedKeyUp && !pressedKeyDown && playerY === HEIGHT_MINUS_HERO * scale;
  const isSlowEffect = slowCount % 2 !== 0 || isNotFallingOrJumping;

  return isNotFallingOrJumping || isSlowEffect;
}

function getShouldHeroStopFalling(
  player: Player,
  pressedKeyUp: boolean,
  scale: number
) {
  return (
    player.Y === HEIGHT_MINUS_HERO * scale &&
    player.velocityDown !== 0 &&
    !pressedKeyUp
  );
}

function updatePlayerPosition(
  player: Player,
  index: number,
  newVelocityDown: number,
  scale: number,
  setPlayer: StateSetter<NullablePlayer[]>
) {
  const newY = calcNewY(player.Y, newVelocityDown, scale);

  if (player.velocityDown !== newVelocityDown || player.Y !== newY) {
    setPlayerValueFunction(
      index,
      { velocityDown: newVelocityDown, Y: newY },
      setPlayer
    );
  }
}

function calcNewY(oldY: number, newVelocity: number, scale: number) {
  return Math.max(0, Math.min(oldY + newVelocity, HEIGHT_MINUS_HERO * scale));
}
