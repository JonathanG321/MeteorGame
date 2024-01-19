import { useEffect, useRef, useState } from "react";
import {
  FRAME_RATE,
  INVINCIBILITY_DURATION,
  SHIELD_WARNING_DURATION,
} from "../utils/variables";

const newInvincibleCount = INVINCIBILITY_DURATION * FRAME_RATE;

export default function useDamageCalculation(
  isHit: boolean,
  isGameOver: boolean
) {
  const [lives, setLives] = useState(3);
  const [invincibleCount, setInvincibleCount] = useState(0);
  const [shieldCount, setShieldCount] = useState(0);

  const isHitRef = useRef(isHit);
  const invincibleCountRef = useRef(invincibleCount);
  const shieldCountRef = useRef(shieldCount);

  useEffect(() => {
    if (isGameOver) return;
    isHitRef.current = isHit;
    invincibleCountRef.current = invincibleCount;
    shieldCountRef.current = shieldCount;
  }, [isHit, isGameOver, invincibleCount, shieldCount]);

  useEffect(() => {
    if (isGameOver) return;

    const intervalId = setInterval(() => {
      if (
        invincibleCountRef.current <= 0 &&
        shieldCountRef.current <= 0 &&
        isHitRef.current
      ) {
        setLives((prevLives) => prevLives - 1);
        setInvincibleCount(newInvincibleCount);
      } else if (
        shieldCountRef.current > SHIELD_WARNING_DURATION &&
        isHitRef.current
      ) {
        setShieldCount(SHIELD_WARNING_DURATION);
      }

      setInvincibleCount(countDownTo0);
      setShieldCount(countDownTo0);
    }, FRAME_RATE);

    return () => {
      clearInterval(intervalId);
    };
  }, [isGameOver]);

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
