import { useEffect, useRef, useState } from "react";
import { FRAME_RATE } from "../utils/variables";

export default function useScore(isGameOver: boolean) {
  const [points, setPoints] = useState(0);
  const [highScore, setHighScore] = useState(
    parseInt(localStorage.getItem("highScore") ?? "0")
  );

  const pointsRef = useRef(points);

  useEffect(() => {
    if (isGameOver) return;
    pointsRef.current = points;
  }, [points, isGameOver]);

  useEffect(() => {
    if (isGameOver) return;

    const intervalId = setInterval(() => {
      setPoints(pointsRef.current + 10);
    }, FRAME_RATE);

    return () => {
      clearInterval(intervalId);
    };
  }, [isGameOver]);

  return { points, setPoints, highScore, setHighScore };
}
