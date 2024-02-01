import { countDownTo0 } from "../utils/lib";
import { ContextValues, ObjectWithRefs } from "../utils/types";
import { STAGE_DIFFICULTY_SCALE } from "../utils/variables";

export default function frameCounterLogic(
  contextRefs: ObjectWithRefs<ContextValues>,
  contextValues: ContextValues
) {
  const { slowCount, lives, livesTwo, isTwoPlayers, gameStage } = contextRefs;
  const { setSlowCount, setPoints, setPointsTwo, setGameCounter } =
    contextValues;

  const isSlow = slowCount.current > 0;
  const slowCountEffect = isSlow ? 20 : 10;

  setSlowCount((prevValue) => countDownTo0(prevValue, isSlow));

  if (lives.current !== 0)
    setPoints((prevValue) => prevValue + slowCountEffect);
  if (isTwoPlayers && livesTwo.current !== 0)
    setPointsTwo((prevValue) => prevValue + slowCountEffect);

  setGameCounter((prevValue) => prevValue + (isSlow ? 1 : 2));

  const gameStageMultiplier =
    STAGE_DIFFICULTY_SCALE ** (gameStage.current <= 5 ? gameStage.current : 5);

  return {
    slowCount: slowCount.current,
    gameStage: gameStage.current,
    gameStageMultiplier,
  };
}
