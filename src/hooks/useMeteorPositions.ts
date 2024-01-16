import { useEffect, useRef, useState } from "react";
import { NullablePosition, PositionWithID } from "../utils/types";
import {
  FRAME_RATE,
  METEOR_GRAVITY,
  METEOR_SIZE,
  METEOR_STARTING_HEIGHT,
  METEORS_PER_SECOND,
  SCREEN_HEIGHT,
  SCREEN_WIDTH,
} from "../utils/variables";

export default function useMeteorPositions(
  isGameOver: boolean,
  mousePressPosition: NullablePosition
) {
  const [meteorPositions, setMeteorPositions] = useState<PositionWithID[]>([]);
  const latestMousePressPosition = useRef<NullablePosition>(mousePressPosition);

  useEffect(() => {
    latestMousePressPosition.current = mousePressPosition;
  }, [mousePressPosition]);

  useEffect(() => {
    if (isGameOver) return;

    const spawnIntervalId = setInterval(() => {
      const mouseX = latestMousePressPosition.current.X;

      let newMeteorX = mouseX
        ? mouseX - METEOR_SIZE / 2
        : Math.round(Math.random() * (SCREEN_WIDTH - METEOR_SIZE));

      if (newMeteorX < 0) {
        newMeteorX = 0;
      } else if (newMeteorX > SCREEN_WIDTH - METEOR_SIZE) {
        newMeteorX = SCREEN_WIDTH - METEOR_SIZE;
      }

      const newMeteorPosition = {
        Y: METEOR_STARTING_HEIGHT,
        X: newMeteorX,
        id: crypto.randomUUID(),
      };
      setMeteorPositions((oldValue) => oldValue.concat([newMeteorPosition]));
    }, 1000 / METEORS_PER_SECOND);

    const gravityIntervalId = setInterval(() => {
      setMeteorPositions((oldValue) =>
        oldValue
          .map((meteor) => ({ ...meteor, Y: meteor.Y + 1 }))
          .filter((meteor) => meteor.Y <= SCREEN_HEIGHT + METEOR_SIZE)
      );
    }, FRAME_RATE / METEOR_GRAVITY);

    return () => {
      clearInterval(spawnIntervalId);
      clearInterval(gravityIntervalId);
    };
  }, [isGameOver]);

  return { meteorPositions, setMeteorPositions };
}
