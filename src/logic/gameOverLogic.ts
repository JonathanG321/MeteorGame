import { StateSetter } from "../utils/types";
import {
  clockTickingSound,
  gameOverSound,
  themeSound,
  timeResumeSound,
  timeSlowSound,
} from "../utils/sounds";
import { playAudio, resetAudio } from "../utils/lib";

export default function gameOverLogic(
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
    resetAudio(clockTickingSound);
    resetAudio(timeResumeSound);
    resetAudio(timeSlowSound);
    resetAudio(themeSound);
    playAudio(gameOverSound);
    setIsGameOver(true);
  }
}
