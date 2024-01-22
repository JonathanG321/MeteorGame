import { countDownTo0 } from "../utils/lib";
import {
  NEW_INVINCIBLE_COUNT,
  SHIELD_WARNING_DURATION,
} from "../utils/variables";

export default function useDamageCalculation(
  invincibleCount: number,
  shieldCount: number,
  isHit: boolean,
  isSlow: boolean,
  setLives: React.Dispatch<React.SetStateAction<number>>,
  setInvincibleCount: React.Dispatch<React.SetStateAction<number>>,
  setShieldCount: React.Dispatch<React.SetStateAction<number>>
) {
  if (invincibleCount <= 0 && shieldCount <= 0 && isHit) {
    setLives((prev) => countDownTo0(prev, true));
    setInvincibleCount(NEW_INVINCIBLE_COUNT);
  } else if (shieldCount > SHIELD_WARNING_DURATION && isHit) {
    setShieldCount(SHIELD_WARNING_DURATION);
  }
  if (invincibleCount > 0)
    setInvincibleCount((prev) => countDownTo0(prev, isSlow));
  if (shieldCount > 0) setShieldCount((prev) => countDownTo0(prev, isSlow));
}
