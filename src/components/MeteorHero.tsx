import { useEffect } from "react";
import useContextValues from "../hooks/useContextValues";
import useUpdatingRefsForObject from "../hooks/useUpdatingRefsForObject";
import gameOverLogic from "../logic/gameOverLogic";
import frameCounterLogic from "../logic/frameCounterLogic";
import heroMovementLogicX from "../logic/heroMovementLogicX";
import heroMovementLogicY from "../logic/heroMovementLogicY";
import damageCalculationLogic from "../logic/damageCalculationLogic";
import spawnFallingObjectsLogic from "../logic/spawnFallingObjectsLogic";
import specialMeteorLogic from "../logic/specialMeteorLogic";
import objectGravityLogic from "../logic/objectGravityLogic";
import powerUpsLogic from "../logic/powerUpsLogic";
import { FRAME_RATE, HEADER_HEIGHT } from "../utils/variables";
import { GameStateContext } from "../context/GameStateContext";
import HeaderBar from "./HeaderBar";
import Canvas from "./Canvas";
import Menu from "./Menu";
import UI from "./UI";
import Hero from "./Hero";
import FallingObject from "./FallingObject";
import Animation from "./Animation";

type Props = { width: number; height: number };

function MeteorHero({ height, width }: Props) {
  const contextValues = useContextValues(height, width);
  const {
    isMainMenu,
    players,
    isGameOver,
    fallingObjectPositions,
    animationPositions,
    highScore,
    setHighScore,
  } = contextValues;

  const contextRefs = useUpdatingRefsForObject(contextValues, isGameOver);

  useEffect(() => {
    const gameStopped = isGameOver || isMainMenu;
    const points = contextRefs.players.current[0].points;
    const pointsTwo = contextRefs.players.current[1].points;
    gameOverLogic(
      isGameOver,
      points > pointsTwo ? points : pointsTwo,
      contextRefs.highScore.current,
      setHighScore
    );
    if (gameStopped) return;

    const frameIntervalId = setInterval(() => {
      const { gameStage, gameStageMultiplier } = frameCounterLogic(
        contextRefs,
        contextValues
      );

      heroMovementLogicX(contextRefs, contextValues);
      heroMovementLogicY(contextRefs, contextValues);

      damageCalculationLogic(contextRefs, contextValues);

      spawnFallingObjectsLogic(contextRefs, contextValues, gameStageMultiplier);
      specialMeteorLogic(contextRefs, contextValues);

      const hitObject = objectGravityLogic(contextRefs, gameStageMultiplier);
      powerUpsLogic(contextRefs, contextValues, hitObject, gameStage);
    }, FRAME_RATE);

    return () => {
      clearInterval(frameIntervalId);
    };
  }, [players[0].lives, players[1].lives, isMainMenu, isGameOver]);

  return (
    <div className="flex flex-col overflow-hidden font-pix-con">
      <GameStateContext.Provider value={contextValues}>
        <HeaderBar highScore={highScore} width={width} height={HEADER_HEIGHT} />
        <Canvas height={height - HEADER_HEIGHT} width={width}>
          {isGameOver || isMainMenu ? (
            <Menu />
          ) : (
            <>
              <UI />
              {players.map((player, i) => {
                return <Hero key={i} player={player} isPlayerTwo={i !== 0} />;
              })}
            </>
          )}
          {fallingObjectPositions.map((object) => (
            <FallingObject key={object.id} object={object} />
          ))}
          {animationPositions.map((animation) => (
            <Animation key={animation.id} animation={animation} />
          ))}
        </Canvas>
      </GameStateContext.Provider>
    </div>
  );
}

export default MeteorHero;
