import { countDownTo0, isValidPosition, setPlayerValue } from "../utils/lib";
import {
  ContextValues,
  NullablePlayer,
  ObjectWithRefs,
  StateSetter,
} from "../utils/types";
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

  players.current.forEach((player, index) =>
    processPlayer(player, index, slowCountEffect, setPlayers)
  );

  setGameCounter((prev) => prev + (isSlow ? 1 : 2));

  const gameStageMultiplier =
    STAGE_DIFFICULTY_SCALE ** Math.min(gameStage.current, 5);

  return {
    slowCount: slowCount.current,
    gameStage: gameStage.current,
    gameStageMultiplier,
  };
}

function updatePlayerPoints(
  playerIndex: number,
  slowCountEffect: number,
  setPlayers: StateSetter<NullablePlayer[]>
) {
  setPlayers((prevPlayers) =>
    setPlayerValue(prevPlayers, playerIndex, {
      points: prevPlayers[playerIndex].points + slowCountEffect,
    })
  );
}

function processPlayer(
  player: NullablePlayer,
  index: number,
  slowCountEffect: number,
  setPlayers: StateSetter<NullablePlayer[]>
) {
  if (isValidPosition(player)) {
    updatePlayerPoints(index, slowCountEffect, setPlayers);
  }
}
