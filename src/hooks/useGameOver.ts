export function useGameOver(
  isDead: boolean,
  points: number,
  highScore: number,
  setHighScore: React.Dispatch<React.SetStateAction<number>>,
  setIsGameOver: React.Dispatch<React.SetStateAction<boolean>>
) {
  if (isDead && points > highScore) {
    setHighScore(points);
    localStorage.setItem("highScore", points.toString());
  } else if (isDead) {
    setIsGameOver(true);
  }
}
