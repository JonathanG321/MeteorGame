import { playAudio } from "../utils/lib";
import {
  clockTickingSound,
  coinSound,
  coinsSound,
  coinBagSound,
  timeSlowSound,
  shieldSound,
  lifeSound,
  themeSound,
} from "../utils/sounds";
import { FallingObjectType, StateSetter } from "../utils/types";
import { NEW_SHIELD_COUNT, NEW_SLOW_COUNT } from "../utils/variables";

export default function usePowerUps(
  hitObjectType: FallingObjectType | null,
  isHeroTwo: boolean,
  gameStage: number,
  setLives: StateSetter<number>,
  setPoints: StateSetter<number>,
  setShieldCount: StateSetter<number>,
  setLivesTwo: StateSetter<number>,
  setPointsTwo: StateSetter<number>,
  setShieldCountTwo: StateSetter<number>,
  setSlowCount: StateSetter<number>
) {
  const setPointsFunc = isHeroTwo ? setPointsTwo : setPoints;
  const setLivesFunc = isHeroTwo ? setLivesTwo : setLives;
  const setShieldCountFunc = isHeroTwo ? setShieldCountTwo : setShieldCount;
  if (!hitObjectType) return;
  const bonus = gameStage > 5 ? (gameStage - 5) * 1000 : 0;
  switch (hitObjectType) {
    case "health":
      setLivesFunc((previousLives) =>
        previousLives >= 3 ? 3 : previousLives + 1
      );
      setPointsFunc((previousPoints) => previousPoints + 1000 + bonus);
      playAudio(lifeSound);
      break;
    case "pointsSmall":
      setPointsFunc((previousPoints) => previousPoints + 3000 + bonus);
      playAudio(coinSound);
      break;
    case "pointsMedium":
      setPointsFunc((previousPoints) => previousPoints + 5000 + bonus);
      playAudio(coinsSound);
      break;
    case "pointsLarge":
      setPointsFunc((previousPoints) => previousPoints + 10000 + bonus);
      playAudio(coinBagSound);
      break;
    case "shield":
      setShieldCountFunc(NEW_SHIELD_COUNT);
      setPointsFunc((previousPoints) => previousPoints + 1000 + bonus);
      playAudio(shieldSound);
      break;
    case "slow":
      setSlowCount(NEW_SLOW_COUNT);
      setPointsFunc((previousPoints) => previousPoints + 1000 + bonus);
      playAudio(timeSlowSound, 1);
      themeSound.playbackRate = 0.7;
      setTimeout(() => {
        playAudio(clockTickingSound, 1);
      }, 1000);
      break;
  }
}
