import {
  countDownTo0,
  isValidPosition,
  playNewAudio,
  setPlayerValue,
} from "../utils/lib";
import {
  ContextValues,
  ObjectWithRefs,
  NullablePlayer,
  StateSetter,
  NullablePosition,
} from "../utils/types";
import {
  NEW_INVINCIBLE_COUNT,
  SHIELD_HIT_DELAY,
  WARNING_DURATION,
} from "../utils/variables";
import hit from "../assets/sounds/Hit.mp3";
import shield from "../assets/sounds/Shield.mp3";

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
    isHits: {
      current: [isHit1, isHit2],
    },
  }: ObjectWithRefs<ContextValues>,
  isSlow: boolean
) {
  players.forEach((player, index) => {
    if (!isValidPosition(player)) return;
    const { invincibleCount, shieldCount, shieldInvincibility } = player;
    const isHit = index === 0 ? isHit1 : isHit2;

    if (isHit) {
      const hasNoProtection = invincibleCount <= 0 && shieldCount <= 0;
      if (hasNoProtection) {
        handleHitWithoutProtection(index, setPlayers);
      } else if (shieldCount > WARNING_DURATION) {
        handleHitWithShield(WARNING_DURATION, setPlayers, index);
      } else if (shieldCount > 0 && shieldInvincibility <= 0) {
        handleShieldActiveHit();
      }
    }
    const wasHitWithShield =
      isHit && shieldCount > 0 && shieldInvincibility <= 0;
    setPlayers((prev) => {
      return setPlayerValue(prev, index, {
        invincibleCount: countDownTo0(prev[index].invincibleCount, isSlow),
        shieldCount: countDownTo0(prev[index].shieldCount, isSlow),
        flightCount: countDownTo0(prev[index].flightCount, isSlow),
        shieldInvincibility: wasHitWithShield
          ? SHIELD_HIT_DELAY
          : countDownTo0(prev[index].shieldInvincibility, isSlow),
      });
    });
  });
}

function handleShieldActiveHit() {
  playNewAudio(shield);
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
  playNewAudio(shield);
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
  playNewAudio(hit);
}
