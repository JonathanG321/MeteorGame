import { countDownTo0, playAudio } from "../utils/lib";
import { hitSound, shieldSound } from "../utils/sounds";
import { StateSetter } from "../utils/types";
import {
  NEW_INVINCIBLE_COUNT,
  SHIELD_WARNING_DURATION,
} from "../utils/variables";

export default function useDamageCalculation(
  invincibleCount: number,
  shieldCount: number,
  isHit: boolean,
  isSlow: boolean,
  lives: number,
  setLives: StateSetter<number>,
  setInvincibleCount: StateSetter<number>,
  setShieldCount: StateSetter<number>
) {
  if (invincibleCount <= 0 && shieldCount <= 0 && isHit) {
    setLives((prev) => countDownTo0(prev, true));
    playAudio(hitSound);
    if (lives > 1) setInvincibleCount(NEW_INVINCIBLE_COUNT);
  } else if (shieldCount > SHIELD_WARNING_DURATION && isHit) {
    setShieldCount(SHIELD_WARNING_DURATION);
    playAudio(shieldSound);
  } else if (!!shieldCount && isHit) {
    playAudio(shieldSound);
  }
  if (invincibleCount > 0)
    setInvincibleCount((prev) => countDownTo0(prev, isSlow));
  if (shieldCount > 0) setShieldCount((prev) => countDownTo0(prev, isSlow));
}
