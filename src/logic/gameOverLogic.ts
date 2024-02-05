import { StateSetter } from "../utils/types";
import sounds from "../utils/sounds";
import { playAudio, resetAudio } from "../utils/lib";

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
    resetAudio(sounds.clockTicking);
    resetAudio(sounds.timeResume);
    resetAudio(sounds.timeSlow);
    resetAudio(sounds.theme);
    playAudio(sounds.gameOver);
  }
}
