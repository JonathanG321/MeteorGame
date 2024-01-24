import { FallingObjectType, StateSetter } from "../utils/types";
import {
  FRAME_RATE,
  SHIELD_DURATION,
  SLOW_DURATION,
  NEW_SHIELD_COUNT,
  NEW_SLOW_COUNT,
} from "../utils/variables";

const newShieldCount = SHIELD_DURATION * FRAME_RATE;
const newSlowCount = SLOW_DURATION * FRAME_RATE;

export default function usePowerUps(
  hitObjectType: FallingObjectType | null,
  setLives: StateSetter<number>,
  setPoints: StateSetter<number>,
  setShieldCount: StateSetter<number>,
  setSlowCount: StateSetter<number>,
  setHitObjectType: StateSetter<FallingObjectType | null>
) {
  if (!hitObjectType) return;
  switch (hitObjectType) {
    case "health":
      setLives((previousLives) => (previousLives >= 3 ? 3 : previousLives + 1));
      setPoints((previousPoints) => previousPoints + 1000);
      break;
    case "pointsSmall":
      setPoints((previousPoints) => previousPoints + 3000);
      break;
    case "pointsMedium":
      setPoints((previousPoints) => previousPoints + 5000);
      break;
    case "pointsLarge":
      setPoints((previousPoints) => previousPoints + 10000);
      break;
    case "shield":
      setShieldCount(NEW_SHIELD_COUNT);
      setPoints((previousPoints) => previousPoints + 1000);
      break;
    case "slow":
      setSlowCount(NEW_SLOW_COUNT);
      setPoints((previousPoints) => previousPoints + 1000);
      break;
  }
  if (!!hitObjectType) setHitObjectType(null);
}
