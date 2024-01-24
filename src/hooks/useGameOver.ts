export default function useGameOver(
  isDead: boolean,
  points: number,
  highScore: number,
  setHighScore: React.Dispatch<React.SetStateAction<number>>,
  setIsGameOver: React.Dispatch<React.SetStateAction<boolean>>
) {
  if (isDead) {
    if (points > highScore) {
      setHighScore(points);
      localStorage.setItem("highScore", points.toString());
    }
    setIsGameOver(true);
  }
}
