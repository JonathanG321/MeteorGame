import { countDownTo0, isValidPosition, setPlayerValue } from "../utils/lib";
import { ContextValues, ObjectWithRefs } from "../utils/types";
import { STAGE_DIFFICULTY_SCALE } from "../utils/variables";

export default function frameCounterLogic(
  contextRefs: ObjectWithRefs<ContextValues>,
  contextValues: ContextValues
) {
  const { slowCount, players, gameStage } = contextRefs;
  const { setSlowCount, setPlayers, setGameCounter } = contextValues;

  const isSlow = slowCount.current > 0;
  const slowCountEffect = isSlow ? 20 : 10;

  setSlowCount((prev) => countDownTo0(prev, isSlow));

  function updatePoints(index: number) {
    setPlayers((prev) =>
      setPlayerValue(prev, index, {
        points: prev[index].points + slowCountEffect,
      })
    );
  }

  players.current.forEach((player, i) => {
    if (isValidPosition(player)) updatePoints(i);
  });

  setGameCounter((prev) => prev + (isSlow ? 1 : 2));

  const gameStageMultiplier =
    STAGE_DIFFICULTY_SCALE ** Math.min(gameStage.current, 5);

  return {
    slowCount: slowCount.current,
    gameStage: gameStage.current,
    gameStageMultiplier,
  };
}
