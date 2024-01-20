import { FallingObjectType } from "../utils/types";
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
  hitObjectType: FallingObjectType,
  setLives: React.Dispatch<React.SetStateAction<number>>,
  setPoints: React.Dispatch<React.SetStateAction<number>>,
  setShieldCount: React.Dispatch<React.SetStateAction<number>>,
  setSlowCount: React.Dispatch<React.SetStateAction<number>>,
  setHitObjectType: React.Dispatch<
    React.SetStateAction<FallingObjectType | null>
  >
) {
  switch (hitObjectType) {
    case "health":
      setLives((previousLives) => (previousLives >= 3 ? 3 : previousLives + 1));
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
      break;
    case "slow":
      setSlowCount(NEW_SLOW_COUNT);
      break;
  }
  if (!!hitObjectType) setHitObjectType(null);
}
