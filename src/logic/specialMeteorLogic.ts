import { playAudio, randomInRange } from "../utils/lib";
import sounds from "../utils/sounds";
import { ContextValues, FallingObject, ObjectWithRefs } from "../utils/types";
import {
  SPECIAL_METEOR_SIZE,
  SPECIAL_METEOR_SPAWN_RANGE,
  SPECIAL_METEOR_EXPLOSION_CHANCE,
  SCREEN_HEIGHT,
} from "../utils/variables";

export default function specialMeteorLogic(
  contextRefs: ObjectWithRefs<ContextValues>,
  contextValues: ContextValues
) {
  const { fallingObjectPositions } = contextRefs;
  const { setFallingObjectPositions } = contextValues;
  fallingObjectPositions.current
    .filter((meteor) => meteor.type === "specialMeteor")
    .forEach((meteor) => {
      const meteorExplodesRandom =
        Math.random() * 100 < SPECIAL_METEOR_EXPLOSION_CHANCE;
      const meteorExplodesFall = meteor.Y + meteor.size / 2 > SCREEN_HEIGHT / 3;

      if (meteorExplodesRandom || meteorExplodesFall) {
        playAudio(sounds.meteorExplode, 0.3);
        setFallingObjectPositions((prev) => [
          ...prev.filter((object) => object.id !== meteor.id),
          ...createThreeNewMeteors(meteor),
        ]);
      }
    });
}

function createThreeNewMeteors(specialMeteor: FallingObject) {
  const newSize = SPECIAL_METEOR_SIZE * 0.6;
  const minPosition = specialMeteor.X - SPECIAL_METEOR_SPAWN_RANGE;
  const maxPosition = specialMeteor.X + SPECIAL_METEOR_SPAWN_RANGE;
  return Array.from({ length: 3 }).map(
    (): FallingObject => ({
      Y: specialMeteor.Y,
      X: randomInRange(minPosition, maxPosition),
      id: crypto.randomUUID(),
      type: "meteor",
      size: newSize,
      speed: specialMeteor.speed,
    })
  );
}
