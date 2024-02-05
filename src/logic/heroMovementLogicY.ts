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
  if (shouldNotCalcY(pressedKeyUp, pressedKeyDown, player.Y, slowCount)) return;

  const shouldHeroStopFalling = getShouldHeroStopFalling(player, pressedKeyUp);
  const shouldHeroJump = pressedKeyUp && player.Y === HEIGHT_MINUS_HERO;

  const newVelocityDown = getNewVelocityDown(
    player.velocityDown,
    shouldHeroStopFalling,
    shouldHeroJump,
    pressedKeyDown
  );

  updatePlayerPosition(player, index, newVelocityDown, setPlayer);
}

function getNewVelocityDown(
  oldVelocityDown: number,
  shouldHeroStopFalling: boolean,
  shouldHeroJump: boolean,
  shouldFallFast: boolean
) {
  if (shouldHeroStopFalling) {
    return 0;
  } else if (shouldHeroJump) {
    playAudio(sounds.jump);
    return -HERO_JUMP_SPEED;
  } else if (shouldFallFast) {
    return oldVelocityDown + HERO_GRAVITY * 2;
  } else {
    return Math.min(oldVelocityDown + HERO_GRAVITY, MAX_HERO_VELOCITY_DOWN);
  }
}

function shouldNotCalcY(
  pressedKeyUp: boolean,
  pressedKeyDown: boolean,
  playerY: number,
  slowCount: number
) {
  const isNotFallingOrJumping =
    !pressedKeyUp && !pressedKeyDown && playerY === HEIGHT_MINUS_HERO;
  const isSlowEffect = slowCount % 2 !== 0 || isNotFallingOrJumping;

  return isNotFallingOrJumping || isSlowEffect;
}

function getShouldHeroStopFalling(player: Player, pressedKeyUp: boolean) {
  return (
    player.Y === HEIGHT_MINUS_HERO && player.velocityDown !== 0 && !pressedKeyUp
  );
}

function updatePlayerPosition(
  player: Player,
  index: number,
  newVelocityDown: number,
  setPlayer: StateSetter<NullablePlayer[]>
) {
  const newY = calcNewY(player.Y, newVelocityDown);

  if (player.velocityDown !== newVelocityDown || player.Y !== newY) {
    setPlayerValueFunction(
      index,
      { velocityDown: newVelocityDown, Y: newY },
      setPlayer
    );
  }
}

function calcNewY(oldY: number, newVelocity: number) {
  return Math.max(0, Math.min(oldY + newVelocity, HEIGHT_MINUS_HERO));
}
