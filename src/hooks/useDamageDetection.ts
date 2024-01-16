import { useEffect, useRef, useState } from "react";
import { FRAME_RATE, INVINCIBILITY_DURATION } from "../utils/variables";

const newInvincibleCount = Math.floor(INVINCIBILITY_DURATION * FRAME_RATE);

export default function useDamageDetection(
  isHit: boolean,
  isGameOver: boolean
) {
  const [lives, setLives] = useState(3);
  const [isInvincible, setIsInvincible] = useState(false);
  const [invincibleCount, setInvincibleCount] = useState(0);

  useEffect(() => {
    if (isGameOver || lives < 0) return;

    const intervalId = setInterval(() => {
      if (!isInvincible && isHit) {
        setLives((prevLives) => prevLives - 1);
        setIsInvincible(true);
        setInvincibleCount(newInvincibleCount);
      } else if (invincibleCount > 0) {
        setInvincibleCount((prevCount) => (prevCount > 0 ? prevCount - 1 : 0));
      } else if (isInvincible && invincibleCount === 0) {
        setIsInvincible(false);
      }
    }, FRAME_RATE);

    return () => {
      clearInterval(intervalId);
    };
  }, [isHit, isGameOver, isInvincible, invincibleCount]);

  return { lives, isInvincible, setLives, setIsInvincible };
}
