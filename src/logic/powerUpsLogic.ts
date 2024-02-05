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
  if (isCountAtThreshold(slowCount, 75)) playAudio(sounds.timeResume, 1);
  if (isCountAtThreshold(slowCount, 60)) resetAudio(sounds.clockTicking);
  if (isCountAtThreshold(slowCount, 1)) sounds.theme.playbackRate = 1;
  if (!hitObject.type) return;
  const { setSlowCount, setPlayers } = contextValues;
  const bonus = gameStage > 5 ? (gameStage - 5) * 1000 : 0;

  const index = hitObject.isPlayerTwo ? 1 : 0;

  switch (hitObject.type) {
    case "health":
      setPlayers((prev) =>
        setPlayerValue(prev, index, {
          lives: prev[index].lives >= 3 ? 3 : prev[index].lives + 1,
        })
      );
      pointsUpdate(setPlayers, index, bonus, 1000);
      playAudio(sounds.life);
      break;
    case "pointsSmall":
      pointsUpdate(setPlayers, index, bonus, 3000);
      playAudio(sounds.coin);
      break;
    case "pointsMedium":
      pointsUpdate(setPlayers, index, bonus, 5000);
      playAudio(sounds.coins);
      break;
    case "pointsLarge":
      pointsUpdate(setPlayers, index, bonus, 10000);
      playAudio(sounds.coinBag);
      break;
    case "shield":
      setPlayers((prev) =>
        setPlayerValue(prev, index, {
          shieldCount: NEW_SHIELD_COUNT,
          points: prev[index].points + 1000 + bonus,
        })
      );
      playAudio(sounds.shield);
      break;
    case "slow":
      setSlowCount(NEW_SLOW_COUNT);
      pointsUpdate(setPlayers, index, bonus, 1000);
      if (sounds.clockTicking.paused) playAudio(sounds.timeSlow, 1);
      sounds.theme.playbackRate = 0.7;
      setTimeout(() => {
        if (sounds.clockTicking.paused) playAudio(sounds.clockTicking, 1);
      }, 1000);
      break;
  }
}

function pointsUpdate(
  setPlayers: StateSetter<NullablePlayer[]>,
  index: number,
  bonus: number,
  baseValue: number
) {
  setPlayers((prev) =>
    setPlayerValue(prev, index, {
      points: prev[index].points + baseValue + bonus,
    })
  );
}
