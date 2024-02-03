import { randomInRange } from "../utils/lib";
import { ContextValues, FallingObject, ObjectWithRefs } from "../utils/types";
import {
  SPECIAL_METEOR_SIZE,
  SPECIAL_METEOR_SPAWN_RANGE,
  SPECIAL_METEOR_EXPLOSION_CHANCE,
} from "../utils/variables";

export default function specialMeteorLogic(
  contextRefs: ObjectWithRefs<ContextValues>,
  contextValues: ContextValues
) {
  const { meteorPositions } = contextRefs;
  const { setMeteorPositions } = contextValues;
  meteorPositions.current
    .filter((meteor) => meteor.type === "specialMeteor")
    .forEach((meteor) => {
      if (Math.random() * 100 < SPECIAL_METEOR_EXPLOSION_CHANCE) {
        setMeteorPositions((prev) =>
          prev.filter((object) => object.id !== meteor.id)
        );
        setMeteorPositions((prev) => [
          ...prev,
          ...createThreeNewMeteors(meteor),
        ]);
      }
    });
}

function createThreeNewMeteors(specialMeteor: FallingObject) {
  const newSize = SPECIAL_METEOR_SIZE / 2;
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
