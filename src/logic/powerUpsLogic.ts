import { isCountAtThreshold, playAudio, resetAudio } from "../utils/lib";
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
  const {
    setSlowCount,
    setLives,
    setLivesTwo,
    setPoints,
    setPointsTwo,
    setShieldCount,
    setShieldCountTwo,
  } = contextValues;
  const bonus = gameStage > 5 ? (gameStage - 5) * 1000 : 0;
  const isPlayerTwo = hitObject.isPlayerTwo;
  const setLivesFunc = isPlayerTwo ? setLivesTwo : setLives;
  const setPointsFunc = isPlayerTwo ? setPointsTwo : setPoints;
  const setShieldCountFunc = isPlayerTwo ? setShieldCountTwo : setShieldCount;

  switch (hitObject.type) {
    case "health":
      setLivesFunc((prev) => (prev >= 3 ? 3 : prev + 1));
      setPointsFunc((prev) => prev + 1000 + bonus);
      playAudio(sounds.life);
      break;
    case "pointsSmall":
      setPointsFunc((prev) => prev + 3000 + bonus);
      playAudio(sounds.coin);
      break;
    case "pointsMedium":
      setPointsFunc((prev) => prev + 5000 + bonus);
      playAudio(sounds.coins);
      break;
    case "pointsLarge":
      setPointsFunc((prev) => prev + 10000 + bonus);
      playAudio(sounds.coinBag);
      break;
    case "shield":
      setShieldCountFunc(NEW_SHIELD_COUNT);
      setPointsFunc((prev) => prev + 1000 + bonus);
      playAudio(sounds.shield);
      break;
    case "slow":
      setSlowCount(NEW_SLOW_COUNT);
      setPointsFunc((prev) => prev + 1000 + bonus);
      if (sounds.clockTicking.paused) playAudio(sounds.timeSlow, 1);
      sounds.theme.playbackRate = 0.7;
      setTimeout(() => {
        if (sounds.clockTicking.paused) playAudio(sounds.clockTicking, 1);
      }, 1000);
      break;
  }
}
