import { useEffect, useState } from "react";
import { FRAME_RATE } from "../utils/variables";

export default function useScore(isGameOver: boolean) {
  const [points, setPoints] = useState(0);
  const [highScore, setHighScore] = useState(
    parseInt(localStorage.getItem("highScore") ?? "0")
  );

  useEffect(() => {
    if (isGameOver) return;

    const intervalId = setInterval(() => {
      setPoints(points + 10);
    }, FRAME_RATE);

    return () => {
      clearInterval(intervalId);
    };
  }, [isGameOver, points]);

  return { points, setPoints, highScore, setHighScore };
}
