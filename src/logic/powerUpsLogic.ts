import {
  isCountAtThreshold,
  playAudio,
  resetAudio,
  setPlayerValue,
} from "../utils/lib";
import sounds from "../utils/sounds";
import {
  ContextValues,
  FallingObjectType,
  NullablePlayer,
  StateSetter,
} from "../utils/types";
import { NEW_SHIELD_COUNT, NEW_SLOW_COUNT } from "../utils/variables";

export default function powerUpsLogic(
  contextValues: ContextValues,
  hitObject: { type: FallingObjectType | null; isPlayerTwo: boolean },
  gameStage: number,
  slowCount: number
) {
  handleSlowCountEffects(slowCount);
  if (!hitObject.type) return;

  const { setSlowCount, setPlayers } = contextValues;
  const bonus = calculateBonus(gameStage);

  const index = hitObject.isPlayerTwo ? 1 : 0;

  switch (hitObject.type) {
    case "health":
      handleHealthPowerUp(setPlayers, index, bonus);
      break;
    case "pointsSmall":
    case "pointsMedium":
    case "pointsLarge":
      handlePointsPowerUp(setPlayers, index, bonus, hitObject.type);
      break;
    case "shield":
      handleShieldPowerUp(setPlayers, index, bonus);
      break;
    case "slow":
      handleSlowPowerUp(setSlowCount, setPlayers, index, bonus);
      break;
  }
}

function handleSlowCountEffects(slowCount: number) {
  if (isCountAtThreshold(slowCount, 75)) playAudio(sounds.timeResume, 1);
  if (isCountAtThreshold(slowCount, 60)) resetAudio(sounds.clockTicking);
  if (isCountAtThreshold(slowCount, 1)) sounds.theme.playbackRate = 1;
}

function calculateBonus(gameStage: number): number {
  return gameStage > 5 ? (gameStage - 5) * 1000 : 0;
}

function handleHealthPowerUp(
  setPlayers: StateSetter<NullablePlayer[]>,
  index: number,
  bonus: number
) {
  setPlayers((prev) =>
    setPlayerValue(prev, index, {
      lives: Math.min(3, prev[index].lives + 1),
      points: prev[index].points + 1000 + bonus,
    })
  );
  playAudio(sounds.life);
}

function handlePointsPowerUp(
  setPlayers: StateSetter<NullablePlayer[]>,
  index: number,
  bonus: number,
  type: FallingObjectType
) {
  const baseValue = getBasePointsValue(type);
  setPlayers((prev) =>
    setPlayerValue(prev, index, {
      points: prev[index].points + baseValue + bonus,
    })
  );
  const sound = getPointsAudio(type);
  if (sound) playAudio(sound);
}

function handleShieldPowerUp(
  setPlayers: StateSetter<NullablePlayer[]>,
  index: number,
  bonus: number
) {
  setPlayers((prev) =>
    setPlayerValue(prev, index, {
      shieldCount: NEW_SHIELD_COUNT,
      points: prev[index].points + 1000 + bonus,
    })
  );
  playAudio(sounds.shield);
}

function handleSlowPowerUp(
  setSlowCount: StateSetter<number>,
  setPlayers: StateSetter<NullablePlayer[]>,
  index: number,
  bonus: number
) {
  setSlowCount(NEW_SLOW_COUNT);
  setPlayers((prev) =>
    setPlayerValue(prev, index, {
      points: prev[index].points + 1000 + bonus,
    })
  );

  if (sounds.clockTicking.paused) playAudio(sounds.timeSlow, 1);
  sounds.theme.playbackRate = 0.7;

  setTimeout(() => {
    if (sounds.clockTicking.paused) playAudio(sounds.clockTicking, 1);
  }, 1000);
}

function getBasePointsValue(type: FallingObjectType): number {
  switch (type) {
    case "pointsSmall":
      return 3000;
    case "pointsMedium":
      return 5000;
    case "pointsLarge":
      return 10000;
    default:
      return 0;
  }
}

function getPointsAudio(type: FallingObjectType): HTMLAudioElement | null {
  switch (type) {
    case "pointsSmall":
      return sounds.coin;
    case "pointsMedium":
      return sounds.coins;
    case "pointsLarge":
      return sounds.coinBag;
    default:
      return null;
  }
}
