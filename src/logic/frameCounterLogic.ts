import { countDownTo0, getPowerUpList } from "../utils/lib";
import { ContextValues, ObjectWithRefs } from "../utils/types";
import { STAGE_DIFFICULTY_SCALE } from "../utils/variables";

export default function frameCounterLogic(
  contextRefs: ObjectWithRefs<ContextValues>,
  contextValues: ContextValues
) {
  const { slowCount, lives, livesTwo, isTwoPlayers, gameStage } = contextRefs;
  const { setSlowCount, setPoints, setPointsTwo, setGameCounter } =
    contextValues;

  const currentSlowCount = slowCount.current;
  const slowCountEffect = currentSlowCount > 0 ? 20 : 10;

  setSlowCount((prevValue) => countDownTo0(prevValue, !!currentSlowCount));

  if (lives.current !== 0)
    setPoints((prevValue) => prevValue + slowCountEffect);
  if (isTwoPlayers && livesTwo.current !== 0)
    setPointsTwo((prevValue) => prevValue + slowCountEffect);

  setGameCounter((prevValue) => prevValue + (currentSlowCount > 0 ? 1 : 2));

  const gameStageMultiplier =
    STAGE_DIFFICULTY_SCALE ** (gameStage.current <= 5 ? gameStage.current : 5);

  return {
    slowCount: currentSlowCount,
    gameStage: gameStage.current,
    gameStageMultiplier,
  };
}
