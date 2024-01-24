import { StateSetter } from "../utils/types";

export default function useGameOver(
  isDead: boolean,
  points: number,
  highScore: number,
  setHighScore: StateSetter<number>,
  setIsGameOver: StateSetter<boolean>
) {
  if (isDead) {
    if (points > highScore) {
      setHighScore(points);
      localStorage.setItem("highScore", points.toString());
    }
    setIsGameOver(true);
  }
}
