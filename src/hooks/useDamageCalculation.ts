import { useEffect, useState } from "react";
import { FRAME_RATE, INVINCIBILITY_DURATION } from "../utils/variables";

const newInvincibleCount = Math.floor(INVINCIBILITY_DURATION * FRAME_RATE);

export default function useDamageCalculation(
  isHit: boolean,
  isGameOver: boolean
) {
  const [lives, setLives] = useState(3);
  const [invincibleCount, setInvincibleCount] = useState(0);
  const [shieldCount, setShieldCount] = useState(0);

  useEffect(() => {
    if (isGameOver) return;

    const intervalId = setInterval(() => {
      if (invincibleCount <= 0 && shieldCount <= 0 && isHit) {
        setLives((prevLives) => prevLives - 1);
        setInvincibleCount(newInvincibleCount);
      } else if (shieldCount > 0 && invincibleCount === 0 && isHit) {
        setShieldCount(0);
        setInvincibleCount(newInvincibleCount);
      }

      setInvincibleCount(countDownTo0);
      setShieldCount(countDownTo0);
    }, FRAME_RATE);

    return () => {
      clearInterval(intervalId);
    };
  }, [isHit, isGameOver, invincibleCount, shieldCount]);

  return {
    lives,
    setLives,
    setInvincibleCount,
    invincibleCount,
    setShieldCount,
    shieldCount,
  };
}

function countDownTo0(prevCount: number) {
  return prevCount > 0 ? prevCount - 1 : 0;
}
