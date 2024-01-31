import { playAudio } from "../utils/lib";
import sounds from "../utils/sounds";
import {
  ContextValues,
  FallingObjectType,
  ObjectWithRefs,
} from "../utils/types";
import { NEW_SHIELD_COUNT, NEW_SLOW_COUNT } from "../utils/variables";

export default function powerUpsLogic(
  contextRefs: ObjectWithRefs<ContextValues>,
  hitObject: { type: FallingObjectType | null; isPlayerTwo: boolean },
  gameStage: number
) {
  if (!hitObject.type) return;
  const {
    setSlowCount: { current: setSlowCount },
    setLives: { current: setLives },
    setLivesTwo: { current: setLivesTwo },
    setPoints: { current: setPoints },
    setPointsTwo: { current: setPointsTwo },
    setShieldCount: { current: setShieldCount },
    setShieldCountTwo: { current: setShieldCountTwo },
  } = contextRefs;
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
      playAudio(sounds.timeSlow, 1);
      sounds.theme.playbackRate = 0.7;
      setTimeout(() => {
        playAudio(sounds.clockTicking, 1);
      }, 1000);
      break;
  }
}
