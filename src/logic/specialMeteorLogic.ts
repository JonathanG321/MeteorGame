import {
  calcRotationAngle,
  notEmpty,
  playAudio,
  playNewAudio,
} from "../utils/lib";
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
  EXPLOSION_SIZE_OFFSET,
  EXPLOSION_HEIGHT_OFFSET,
} from "../utils/variables";
import meteorExplode from "../assets/sounds/MeteorExplode.mp3";

export default function specialMeteorLogic(
  contextRefs: ObjectWithRefs<ContextValues>,
  contextValues: ContextValues
) {
  const { fallingObjectPositions } = contextRefs;
  const {
    setFallingObjectPositions,
    setAnimationPositions,
    screenHeight,
    scale,
  } = contextValues;

  fallingObjectPositions.current
    .filter((meteor) => meteor.type === "specialMeteor")
    .forEach((meteor) => {
      if (shouldSpecialMeteorExplode(meteor, screenHeight)) {
        playNewAudio(meteorExplode, 0.3);
        setAnimationPositions((prev) => addNewMeteor(prev, meteor, scale));
        setFallingObjectPositions((prev) => [
          ...prev.filter((object) => object.id !== meteor.id),
          ...createThreeNewMeteors(meteor, scale),
        ]);
      }
    });
}

function shouldSpecialMeteorExplode(
  meteor: FallingObject,
  screenHeight: number
): boolean {
  const minExplodeHeight = 0;
  const atMinExplodeHeight = meteor.Y > minExplodeHeight;
  const meteorExplodesRandom =
    atMinExplodeHeight && Math.random() * 100 < SPECIAL_METEOR_EXPLOSION_CHANCE;
  const meteorExplodesFall = meteor.Y + meteor.size / 2 > screenHeight / 3;

  return meteorExplodesRandom || meteorExplodesFall;
}

function createThreeNewMeteors(
  specialMeteor: FallingObject,
  scale: number
): FallingObject[] {
  const specialMeteorSize = SPECIAL_METEOR_SIZE * scale;
  const newSize = specialMeteorSize * 0.6;

  const angles = [-SPECIAL_METEOR_SPAWN_ANGLE, 0, SPECIAL_METEOR_SPAWN_ANGLE];

  return angles
    .map((offset) => {
      return {
        Y: specialMeteor.Y,
        X: specialMeteor.X + specialMeteorSize / 2 - newSize / 2,
        id: crypto.randomUUID(),
        type: "meteor" as FallingObjectType,
        size: newSize,
        speed: specialMeteor.speed,
        angleOffset: offset,
        rotationAngle: calcRotationAngle(offset, specialMeteor.speed),
      };
    })
    .filter(notEmpty);
}

function addNewMeteor(
  prev: Animation[],
  meteor: FallingObject,
  scale: number
): Animation[] {
  return [
    ...prev,
    {
      Y:
        meteor.Y -
        (EXPLOSION_SIZE_OFFSET * scale) / 2 +
        EXPLOSION_HEIGHT_OFFSET * scale,
      X: Math.max(meteor.X - (EXPLOSION_SIZE_OFFSET * scale) / 2, 0),
      id: crypto.randomUUID(),
      type: "explosion",
      size: SPECIAL_METEOR_SIZE * scale + EXPLOSION_SIZE_OFFSET * scale,
    },
  ];
}
