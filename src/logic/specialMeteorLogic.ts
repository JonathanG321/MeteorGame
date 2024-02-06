import { notEmpty, playAudio } from "../utils/lib";
import sounds from "../utils/sounds";
import {
  ContextValues,
  FallingObject,
  FallingObjectType,
  ObjectWithRefs,
  Animation,
} from "../utils/types";
import {
  SPECIAL_METEOR_SIZE,
  SPECIAL_METEOR_SPAWN_ANGLE,
  SPECIAL_METEOR_EXPLOSION_CHANCE,
  SCREEN_HEIGHT,
  EXPLOSION_SIZE_OFFSET,
  EXPLOSION_HEIGHT_OFFSET,
} from "../utils/variables";

export default function specialMeteorLogic(
  contextRefs: ObjectWithRefs<ContextValues>,
  contextValues: ContextValues
) {
  const { fallingObjectPositions } = contextRefs;
  const { setFallingObjectPositions, setAnimationPositions } = contextValues;

  fallingObjectPositions.current
    .filter((meteor) => meteor.type === "specialMeteor")
    .forEach((meteor) => {
      if (shouldSpecialMeteorExplode(meteor)) {
        playAudio(sounds.meteorExplode, 0.3);
        setAnimationPositions((prev) => addNewMeteor(prev, meteor));
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

  const angles = [-SPECIAL_METEOR_SPAWN_ANGLE, 0, SPECIAL_METEOR_SPAWN_ANGLE];

  return angles
    .map((Offset) => {
      return {
        Y: specialMeteor.Y,
        X: specialMeteor.X,
        id: crypto.randomUUID(),
        type: "meteor" as FallingObjectType,
        size: newSize,
        speed: specialMeteor.speed,
        angleOffset: Offset,
      };
    })
    .filter(notEmpty);
}

function addNewMeteor(prev: Animation[], meteor: FallingObject): Animation[] {
  return [
    ...prev,
    {
      Y: meteor.Y - EXPLOSION_SIZE_OFFSET / 2 + EXPLOSION_HEIGHT_OFFSET,
      X: Math.max(meteor.X - EXPLOSION_SIZE_OFFSET / 2, 0),
      id: crypto.randomUUID(),
      type: "explosion",
      size: SPECIAL_METEOR_SIZE + EXPLOSION_SIZE_OFFSET,
    },
  ];
}
