import { useEffect, useState } from "react";
import { pauseAudio, playNewAudio, resumeAudio } from "../utils/lib";
import setSounds from "../utils/sounds";
import uIBeep from "../assets/sounds/UIBeep.mp3";

export default function usePause() {
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    function togglePause(e: KeyboardEvent) {
      if (e.key === "p") {
        if (!isPaused) {
          setIsPaused(true);
          pauseAudio(setSounds.theme);
          pauseAudio(setSounds.clockTicking);
          pauseAudio(setSounds.timeResume);
        } else {
          setIsPaused(false);
          resumeAudio(setSounds.theme);
          resumeAudio(setSounds.clockTicking);
          resumeAudio(setSounds.timeResume);
        }
        playNewAudio(uIBeep);
      }
    }

    document.addEventListener("keyup", togglePause);

    return () => {
      document.removeEventListener("keyup", togglePause);
    };
  }, [isPaused]);

  return isPaused;
}
