import {
  countDownTo0,
  isValidPosition,
  playAudio,
  setPlayerValue,
} from "../utils/lib";
import sounds from "../utils/sounds";
import {
  ContextValues,
  ObjectWithRefs,
  NullablePlayer,
  StateSetter,
  NullablePosition,
} from "../utils/types";
import {
  NEW_INVINCIBLE_COUNT,
  SHIELD_WARNING_DURATION,
} from "../utils/variables";

export default function damageCalculationLogic(
  contextRefs: ObjectWithRefs<ContextValues>,
  contextValues: ContextValues
) {
  const isSlow = !!contextRefs.slowCount.current;

  damageCalc(contextValues, contextRefs, isSlow);
}

function damageCalc(
  { setPlayers }: ContextValues,
  {
    players: { current: players },
    isHit: { current: isHit1 },
    isHitTwo: { current: isHit2 },
  }: ObjectWithRefs<ContextValues>,
  isSlow: boolean
) {
  players.forEach((player, index) => {
    if (!isValidPosition(player)) return;
    const { invincibleCount, shieldCount } = player;
    const isHit = index === 0 ? isHit1 : isHit2;

    if (isHit) {
      const hasNoProtection = invincibleCount <= 0 && shieldCount <= 0;
      if (hasNoProtection) {
        handleHitWithoutProtection(index, setPlayers);
      } else if (shieldCount > SHIELD_WARNING_DURATION) {
        handleHitWithShield(SHIELD_WARNING_DURATION, setPlayers, index);
      } else if (shieldCount > 0) {
        handleShieldActiveHit();
      }
    }
    setPlayers((prev) => {
      return setPlayerValue(prev, index, {
        invincibleCount: countDownTo0(prev[index].invincibleCount, isSlow),
        shieldCount: countDownTo0(prev[index].shieldCount, isSlow),
      });
    });
  });
}

function handleShieldActiveHit() {
  playAudio(sounds.shield);
}

function handleHitWithShield(
  shieldWarningDuration: number,
  setPlayers: StateSetter<NullablePlayer[]>,
  index: number
) {
  setPlayers((prev) =>
    setPlayerValue(prev, index, {
      shieldCount: Math.min(prev[index].shieldCount, shieldWarningDuration),
    })
  );
  playAudio(sounds.shield);
}

function handleHitWithoutProtection(
  index: number,
  setPlayers: StateSetter<NullablePlayer[]>
) {
  setPlayers((prev) => {
    return prev.map((player, i) => {
      if (index !== i) return player;
      const hasLivesRemaining = player.lives > 1;
      const newPosition = {
        X: hasLivesRemaining ? player.X : null,
        Y: hasLivesRemaining ? player.Y : null,
      } as NullablePosition;
      return {
        ...player,
        ...newPosition,
        lives: countDownTo0(player.lives, true),
        invincibleCount: hasLivesRemaining ? NEW_INVINCIBLE_COUNT : 0,
      };
    });
  });
  playAudio(sounds.hit);
}
