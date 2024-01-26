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
  gameStage: number,
  setLives: StateSetter<number>,
  setPoints: StateSetter<number>,
  setShieldCount: StateSetter<number>,
  setSlowCount: StateSetter<number>
) {
  if (!hitObjectType) return;
  const bonus = gameStage > 5 ? (gameStage - 5) * 1000 : 0;
  switch (hitObjectType) {
    case "health":
      setLives((previousLives) => (previousLives >= 3 ? 3 : previousLives + 1));
      setPoints((previousPoints) => previousPoints + 1000 + bonus);
      playAudio(lifeSound);
      break;
    case "pointsSmall":
      setPoints((previousPoints) => previousPoints + 3000 + bonus);
      playAudio(coinSound);
      break;
    case "pointsMedium":
      setPoints((previousPoints) => previousPoints + 5000 + bonus);
      playAudio(coinsSound);
      break;
    case "pointsLarge":
      setPoints((previousPoints) => previousPoints + 10000 + bonus);
      playAudio(coinBagSound);
      break;
    case "shield":
      setShieldCount(NEW_SHIELD_COUNT);
      setPoints((previousPoints) => previousPoints + 1000 + bonus);
      playAudio(shieldSound);
      break;
    case "slow":
      setSlowCount(NEW_SLOW_COUNT);
      setPoints((previousPoints) => previousPoints + 1000 + bonus);
      playAudio(timeSlowSound, 1);
      themeSound.playbackRate = 0.7;
      setTimeout(() => {
        playAudio(clockTickingSound, 1);
      }, 1000);
      break;
  }
}
