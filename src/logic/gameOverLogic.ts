import { StateSetter } from "../utils/types";
import setSounds from "../utils/sounds";
import { playNewAudio, resetAudio } from "../utils/lib";
import gameOver from "../assets/sounds/GameOver.mp3";

export default function gameOverLogic(
  isGameOver: boolean,
  points: number,
  highScore: number,
  setHighScore: StateSetter<number>
) {
  if (isGameOver) {
    if (points > highScore) {
      setHighScore(points);
      localStorage.setItem("highScore", points.toString());
    }
    resetAudio(setSounds.clockTicking);
    resetAudio(setSounds.timeResume);
    resetAudio(setSounds.timeSlow);
    resetAudio(setSounds.theme);
    playNewAudio(gameOver);
  }
}
