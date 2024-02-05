import {
  isCountAtThreshold,
  isValidPosition,
  playAudio,
  resetAudio,
  setPlayerValue,
} from "../utils/lib";
import sounds from "../utils/sounds";
import {
  ContextValues,
  FallingObjectType,
  Position,
  ObjectWithRefs,
} from "../utils/types";
import {
  NEW_SHIELD_COUNT,
  NEW_SLOW_COUNT,
  POINTS_ANIMATION_WIDTH,
} from "../utils/variables";

export default function powerUpsLogic(
  contextRefs: ObjectWithRefs<ContextValues>,
  contextValues: ContextValues,
  hitObject: { type: FallingObjectType | null; isPlayerTwo: boolean },
  gameStage: number
) {
  const { slowCount, players } = contextRefs;
  handleSlowCountEffects(slowCount.current);
  if (!hitObject.type) return;

  const bonus = calculateBonus(gameStage);
  const index = hitObject.isPlayerTwo ? 1 : 0;
  const player = players.current[index];

  if (!isValidPosition(player)) return;

  switch (hitObject.type) {
    case "health":
      handlePowerUp(contextValues, index, bonus, player, "life", 1000);
      break;
    case "pointsSmall":
    case "pointsMedium":
    case "pointsLarge":
      const baseValue = getBasePointsValue(hitObject.type);
      handlePowerUp(contextValues, index, bonus, player, "points", baseValue);
      const sound = getPointsAudio(hitObject.type);
      if (sound) playAudio(sound);
      break;
    case "shield":
      handlePowerUp(contextValues, index, bonus, player, "shield", 1000);
      break;
    case "slow":
      handleSlowPowerUp(contextValues, index, bonus, player);
      break;
  }
}

function handlePowerUp(
  { setPlayers, setAnimationPositions }: ContextValues,
  index: number,
  bonus: number,
  position: Position,
  type: "life" | "points" | "shield",
  pointsValue: number
) {
  setPlayers((prev) =>
    setPlayerValue(prev, index, {
      ...(type === "life" ? { lives: Math.min(3, prev[index].lives + 1) } : {}),
      ...(type === "shield" ? { shieldCount: NEW_SHIELD_COUNT } : {}),
      points: prev[index].points + pointsValue + bonus,
    })
  );
  setAnimationPositions((prev) => [
    ...prev,
    {
      ...position,
      id: crypto.randomUUID(),
      points: pointsValue + bonus,
      size: POINTS_ANIMATION_WIDTH,
      type: "points",
    },
  ]);
  if (type === "points") return;
  playAudio(type === "shield" ? sounds.shield : sounds.life);
}

function handleSlowPowerUp(
  { setSlowCount, setPlayers, setAnimationPositions }: ContextValues,
  index: number,
  bonus: number,
  position: Position
) {
  setSlowCount(NEW_SLOW_COUNT);
  setPlayers((prev) =>
    setPlayerValue(prev, index, {
      points: prev[index].points + 1000 + bonus,
    })
  );
  setAnimationPositions((prev) => [
    ...prev,
    {
      ...position,
      id: crypto.randomUUID(),
      points: 1000 + bonus,
      size: POINTS_ANIMATION_WIDTH,
      type: "points",
    },
  ]);

  if (sounds.clockTicking.paused) playAudio(sounds.timeSlow, 1);
  sounds.theme.playbackRate = 0.7;

  setTimeout(() => {
    if (sounds.clockTicking.paused) playAudio(sounds.clockTicking, 1);
  }, 1000);
}

function handleSlowCountEffects(slowCount: number) {
  if (isCountAtThreshold(slowCount, 75)) playAudio(sounds.timeResume, 1);
  if (isCountAtThreshold(slowCount, 60)) resetAudio(sounds.clockTicking);
  if (isCountAtThreshold(slowCount, 1)) sounds.theme.playbackRate = 1;
}

function calculateBonus(gameStage: number): number {
  return gameStage > 5 ? (gameStage - 5) * 1000 : 0;
}

function getBasePointsValue(type: FallingObjectType): number {
  switch (type) {
    case "pointsSmall":
      return 3000;
    case "pointsMedium":
      return 5000;
    case "pointsLarge":
      return 10000;
    default:
      return 0;
  }
}

function getPointsAudio(type: FallingObjectType): HTMLAudioElement | null {
  switch (type) {
    case "pointsSmall":
      return sounds.coin;
    case "pointsMedium":
      return sounds.coins;
    case "pointsLarge":
      return sounds.coinBag;
    default:
      return null;
  }
}
