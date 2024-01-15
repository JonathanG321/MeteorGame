import { useEffect, useState } from "react";
import { PositionWithID } from "../utils/types";
import {
  FRAME_RATE,
  METEOR_GRAVITY,
  METEOR_SIZE,
  METEOR_STARTING_HEIGHT,
  METEORS_PER_SECOND,
  SCREEN_HEIGHT,
  SCREEN_WIDTH,
} from "../utils/variables";

export default function useMeteorPositions(isGameOver: boolean) {
  const [meteorPositions, setMeteorPositions] = useState<PositionWithID[]>([]);

  useEffect(() => {
    if (isGameOver) return;

    const spawnIntervalId = setInterval(() => {
      const newMeteorPosition = {
        Y: METEOR_STARTING_HEIGHT,
        X: Math.round(Math.random() * (SCREEN_WIDTH - METEOR_SIZE)),
        id: crypto.randomUUID(),
      };
      setMeteorPositions((oldValue) => oldValue.concat([newMeteorPosition]));
    }, 1000 / METEORS_PER_SECOND);

    const gravityIntervalId = setInterval(() => {
      setMeteorPositions((oldValue) =>
        oldValue
          .map((meteor) => ({ ...meteor, Y: meteor.Y + 1 }))
          .filter((meteor) => meteor.Y <= SCREEN_HEIGHT - METEOR_SIZE)
      );
    }, FRAME_RATE / METEOR_GRAVITY);

    return () => {
      clearInterval(spawnIntervalId);
      clearInterval(gravityIntervalId);
    };
  }, [isGameOver]);

  return meteorPositions;
}
