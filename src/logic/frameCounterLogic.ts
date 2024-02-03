import { countDownTo0, updateItemInArray } from "../utils/lib";
import { ContextValues, ObjectWithRefs } from "../utils/types";
import { STAGE_DIFFICULTY_SCALE } from "../utils/variables";

export default function frameCounterLogic(
  contextRefs: ObjectWithRefs<ContextValues>,
  contextValues: ContextValues
) {
  const { slowCount, lives, isTwoPlayers, gameStage } = contextRefs;
  const { setSlowCount, setPoints, setGameCounter } = contextValues;

  const isSlow = slowCount.current > 0;
  const slowCountEffect = isSlow ? 20 : 10;

  setSlowCount((prev) => countDownTo0(prev, isSlow));

  function updatePoints(index: number) {
    setPoints(updatePointsFunc(slowCountEffect, index));
  }

  if (lives.current[0] !== 0) updatePoints(0);
  if (isTwoPlayers && lives.current[1] !== 0) updatePoints(1);

  setGameCounter((prev) => prev + (isSlow ? 1 : 2));

  const gameStageMultiplier =
    STAGE_DIFFICULTY_SCALE ** Math.min(gameStage.current, 5);

  return {
    slowCount: slowCount.current,
    gameStage: gameStage.current,
    gameStageMultiplier,
  };
}

function updatePointsFunc(slowCountEffect: number, index: number) {
  return (prev: any[]) =>
    updateItemInArray(prev, index, prev[index] + slowCountEffect);
}
