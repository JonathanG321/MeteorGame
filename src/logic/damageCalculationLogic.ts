import { countDownTo0, playAudio } from "../utils/lib";
import sounds from "../utils/sounds";
import { NullablePosition, StateSetter } from "../utils/types";
import {
  NEW_INVINCIBLE_COUNT,
  NULL_POSITION,
  SHIELD_WARNING_DURATION,
} from "../utils/variables";

export default function damageCalculationLogic(
  invincibleCount: number,
  shieldCount: number,
  isHit: boolean,
  isSlow: boolean,
  lives: number,
  setLives: StateSetter<number>,
  setInvincibleCount: StateSetter<number>,
  setShieldCount: StateSetter<number>,
  setHeroPosition: StateSetter<NullablePosition>
) {
  const hasLivesRemaining = lives > 1;

  if (isHit) {
    const hasNoProtection = invincibleCount <= 0 && shieldCount <= 0;
    if (hasNoProtection) {
      handleHitWithoutProtection(
        hasLivesRemaining,
        setLives,
        setInvincibleCount,
        setHeroPosition
      );
    } else if (shieldCount > SHIELD_WARNING_DURATION) {
      handleHitWithShield(SHIELD_WARNING_DURATION, setShieldCount);
    } else if (shieldCount > 0) {
      handleShieldActiveHit();
    }
  }

  if (invincibleCount > 0)
    setInvincibleCount((prev) => countDownTo0(prev, isSlow));

  if (shieldCount > 0) setShieldCount((prev) => countDownTo0(prev, isSlow));
}

function handleShieldActiveHit() {
  playAudio(sounds.shield);
}

function handleHitWithShield(
  shieldWarningDuration: number,
  setShieldCount: StateSetter<number>
) {
  setShieldCount((prev) => Math.min(prev, shieldWarningDuration));
  playAudio(sounds.shield);
}

function handleHitWithoutProtection(
  hasLivesRemaining: boolean,
  setLives: StateSetter<number>,
  setInvincibleCount: StateSetter<number>,
  setHeroPosition: StateSetter<NullablePosition>
) {
  setLives((prev) => {
    if (prev === 1) setHeroPosition(NULL_POSITION);
    return countDownTo0(prev, true);
  });
  playAudio(sounds.hit);
  if (hasLivesRemaining) setInvincibleCount(NEW_INVINCIBLE_COUNT);
}
