import { notEmpty, playAudio } from "../utils/lib";
import sounds from "../utils/sounds";
import {
  ContextValues,
  FallingObject,
  FallingObjectType,
  ObjectWithRefs,
} from "../utils/types";
import {
  SPECIAL_METEOR_SIZE,
  SPECIAL_METEOR_SPAWN_RANGE,
  SPECIAL_METEOR_EXPLOSION_CHANCE,
  SCREEN_HEIGHT,
  SCREEN_WIDTH,
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
      if (shouldSpecialMeteorExplode(meteor)) {
        playAudio(sounds.meteorExplode, 0.3);
        setFallingObjectPositions((prev) => [
          ...prev.filter((object) => object.id !== meteor.id),
          ...createThreeNewMeteors(meteor),
        ]);
      }
    });
}

function shouldSpecialMeteorExplode(meteor: FallingObject): boolean {
  const minExplodeHeight = 0;
  const atMinExplodeHeight = meteor.Y > minExplodeHeight;
  const meteorExplodesRandom =
    atMinExplodeHeight && Math.random() * 100 < SPECIAL_METEOR_EXPLOSION_CHANCE;
  const meteorExplodesFall = meteor.Y + meteor.size / 2 > SCREEN_HEIGHT / 3;

  return meteorExplodesRandom || meteorExplodesFall;
}

function createThreeNewMeteors(specialMeteor: FallingObject): FallingObject[] {
  const newSize = SPECIAL_METEOR_SIZE * 0.6;
  const minPosition = specialMeteor.X - SPECIAL_METEOR_SPAWN_RANGE;
  const maxPosition = specialMeteor.X + SPECIAL_METEOR_SPAWN_RANGE;

  const xPositions = [
    minPosition >= 0 ? minPosition : null,
    specialMeteor.X,
    maxPosition <= SCREEN_WIDTH - newSize ? maxPosition : null,
  ];

  return xPositions
    .map((X) => {
      if (!X) return;
      return {
        Y: specialMeteor.Y,
        X,
        id: crypto.randomUUID(),
        type: "meteor" as FallingObjectType,
        size: newSize,
        speed: specialMeteor.speed,
      };
    })
    .filter(notEmpty);
}
