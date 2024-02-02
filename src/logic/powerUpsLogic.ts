import {
  isCountAtThreshold,
  playAudio,
  resetAudio,
  updateItemInArrayFunction,
} from "../utils/lib";
import sounds from "../utils/sounds";
import { ContextValues, FallingObjectType } from "../utils/types";
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
  const { setSlowCount, setLives, setPoints, setShieldCounts } = contextValues;
  const bonus = gameStage > 5 ? (gameStage - 5) * 1000 : 0;

  const index = hitObject.isPlayerTwo ? 1 : 0;

  switch (hitObject.type) {
    case "health":
      setLives((prev) => {
        return prev.map((val, i) => {
          if (i !== index) return val;
          const incrementedValue = val >= 3 ? 3 : val + 1;
          return incrementedValue;
        });
      });
      setPoints((prev) => pointsUpdate(prev, index, bonus, 1000));
      playAudio(sounds.life);
      break;
    case "pointsSmall":
      setPoints((prev) => pointsUpdate(prev, index, bonus, 3000));
      playAudio(sounds.coin);
      break;
    case "pointsMedium":
      setPoints((prev) => pointsUpdate(prev, index, bonus, 5000));
      playAudio(sounds.coins);
      break;
    case "pointsLarge":
      setPoints((prev) => pointsUpdate(prev, index, bonus, 10000));
      playAudio(sounds.coinBag);
      break;
    case "shield":
      setShieldCounts(updateItemInArrayFunction(index, NEW_SHIELD_COUNT));
      setPoints((prev) => pointsUpdate(prev, index, bonus, 1000));
      playAudio(sounds.shield);
      break;
    case "slow":
      setSlowCount(NEW_SLOW_COUNT);
      setPoints((prev) => pointsUpdate(prev, index, bonus, 1000));
      if (sounds.clockTicking.paused) playAudio(sounds.timeSlow, 1);
      sounds.theme.playbackRate = 0.7;
      setTimeout(() => {
        if (sounds.clockTicking.paused) playAudio(sounds.clockTicking, 1);
      }, 1000);
      break;
  }
}

function pointsUpdate(
  prev: number[],
  index: number,
  bonus: number,
  baseValue: number
) {
  return prev.map((val, i) => (i === index ? val + baseValue + bonus : val));
}
