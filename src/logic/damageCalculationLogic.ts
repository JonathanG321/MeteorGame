import {
  countDownTo0,
  playAudio,
  updateItemInArray,
  updateItemInArrayFunction,
} from "../utils/lib";
import sounds from "../utils/sounds";
import {
  ContextValues,
  NullablePosition,
  ObjectWithRefs,
  StateSetter,
} from "../utils/types";
import {
  NEW_INVINCIBLE_COUNT,
  NULL_POSITION,
  SHIELD_WARNING_DURATION,
} from "../utils/variables";

export default function damageCalculationLogic(
  contextRefs: ObjectWithRefs<ContextValues>,
  contextValues: ContextValues
) {
  const isSlow = !!contextRefs.slowCount.current;

  singleDamageCalc(contextValues, contextRefs, isSlow, 0);
  if (contextRefs.isTwoPlayers.current) {
    singleDamageCalc(contextValues, contextRefs, isSlow, 1);
  }
}

function singleDamageCalc(
  {
    setHeroOriginPoints,
    setInvincibleCounts,
    setLives,
    setShieldCounts,
  }: ContextValues,
  {
    invincibleCounts: {
      current: [invincibleCount1, invincibleCount2],
    },
    shieldCounts: {
      current: [shieldCount1, shieldCount2],
    },
    isHit: { current: isHit1 },
    isHitTwo: { current: isHit2 },
    lives: {
      current: [lives1, lives2],
    },
  }: ObjectWithRefs<ContextValues>,
  isSlow: boolean,
  index: number
) {
  const invincibleCount = index === 0 ? invincibleCount1 : invincibleCount2;
  const shieldCount = index === 0 ? shieldCount1 : shieldCount2;
  const isHit = index === 0 ? isHit1 : isHit2;
  const lives = index === 0 ? lives1 : lives2;

  const hasLivesRemaining = lives > 1;

  if (isHit) {
    const hasNoProtection = invincibleCount <= 0 && shieldCount <= 0;
    if (hasNoProtection) {
      handleHitWithoutProtection(
        hasLivesRemaining,
        index,
        setLives,
        setInvincibleCounts,
        setHeroOriginPoints
      );
    } else if (shieldCount > SHIELD_WARNING_DURATION) {
      handleHitWithShield(SHIELD_WARNING_DURATION, setShieldCounts, index);
    } else if (shieldCount > 0) {
      handleShieldActiveHit();
    }
  }

  updateCounter(index, invincibleCount, isSlow, setInvincibleCounts);
  updateCounter(index, shieldCount, isSlow, setShieldCounts);
}

function handleShieldActiveHit() {
  playAudio(sounds.shield);
}

function handleHitWithShield(
  shieldWarningDuration: number,
  setShieldCount: StateSetter<number[]>,
  index: number
) {
  setShieldCount((prev) =>
    updateItemInArray(prev, index, Math.min(prev[index], shieldWarningDuration))
  );
  playAudio(sounds.shield);
}

function handleHitWithoutProtection(
  hasLivesRemaining: boolean,
  index: number,
  setLives: StateSetter<number[]>,
  setInvincibleCount: StateSetter<number[]>,
  setHeroPosition: StateSetter<NullablePosition[]>
) {
  setLives((prev) => {
    return prev.map((val, i) => {
      if (!hasLivesRemaining)
        setHeroPosition(updateItemInArrayFunction(index, NULL_POSITION));
      if (index !== i) return val;
      return countDownTo0(val, true);
    });
  });
  playAudio(sounds.hit);
  if (hasLivesRemaining)
    setInvincibleCount(updateItemInArrayFunction(index, NEW_INVINCIBLE_COUNT));
}

function updateCounter(
  index: number,
  count: number,
  isSlow: boolean,
  setCount: StateSetter<number[]>
) {
  if (count > 0)
    setCount((prev) =>
      updateItemInArray(prev, index, countDownTo0(prev[index], isSlow))
    );
}
