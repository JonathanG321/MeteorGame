import { useEffect, useState } from "react";
import { pauseAudio, resumeAudio } from "../utils/lib";
import sounds from "../utils/sounds";

export default function usePause() {
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    function togglePause(e: KeyboardEvent) {
      if (e.key === "p") {
        if (!isPaused) {
          setIsPaused(true);
          pauseAudio(sounds.theme);
          pauseAudio(sounds.clockTicking);
          pauseAudio(sounds.timeResume);
        } else {
          setIsPaused(false);
          resumeAudio(sounds.theme);
          resumeAudio(sounds.clockTicking);
          resumeAudio(sounds.timeResume);
        }
      }
    }

    document.addEventListener("keyup", togglePause);

    return () => {
      document.removeEventListener("keyup", togglePause);
    };
  }, [isPaused]);

  return isPaused;
}
