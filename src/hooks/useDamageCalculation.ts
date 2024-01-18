import { useEffect, useRef, useState } from "react";
import { FRAME_RATE, INVINCIBILITY_DURATION } from "../utils/variables";

const newInvincibleCount = Math.floor(INVINCIBILITY_DURATION * FRAME_RATE);

export default function useDamageCalculation(
  isHit: boolean,
  isGameOver: boolean
) {
  const [lives, setLives] = useState(3);
  const [invincibleCount, setInvincibleCount] = useState(0);

  useEffect(() => {
    if (isGameOver) return;

    const intervalId = setInterval(() => {
      if (invincibleCount <= 0 && isHit) {
        setLives((prevLives) => prevLives - 1);
        setInvincibleCount(newInvincibleCount);
      } else if (invincibleCount > 0) {
        setInvincibleCount((prevCount) => (prevCount > 0 ? prevCount - 1 : 0));
      }
    }, FRAME_RATE);

    return () => {
      clearInterval(intervalId);
    };
  }, [isHit, isGameOver, invincibleCount]);

  return { lives, setLives, setInvincibleCount, invincibleCount };
}
