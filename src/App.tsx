import { useEffect } from "react";
import { GameStateContext } from "./context/GameStateContext";
import Canvas from "./components/Canvas";
import Hero from "./components/Hero";
import Meteor from "./components/Meteor";
import Menu from "./components/Menu";
import Mask from "./components/Mask";
import HeaderBar from "./components/HeaderBar";
import PowerUp from "./components/PowerUp";
import UI from "./components/UI";
import {
  FRAME_RATE,
  MASK_FACTOR,
  OBJECT_SIZE,
  SCREEN_HEIGHT,
  SCREEN_WIDTH,
} from "./utils/variables";
import {
  isCountAtThreshold,
  isValidPosition,
  playAudio,
  resetAudio,
} from "./utils/lib";
import sounds from "./utils/sounds";
import spawnFallingObjectsLogic from "./logic/spawnFallingObjectsLogic";
import damageCalculationLogic from "./logic/damageCalculationLogic";
import powerUpsLogic from "./logic/powerUpsLogic";
import heroMovementLogicX from "./logic/heroMovementLogicX";
import heroMovementLogicY from "./logic/heroMovementLogicY";
import objectGravityLogic from "./logic/objectGravityLogic";
import gameOverLogic from "./logic/gameOverLogic";
import frameCounterLogic from "./logic/frameCounterLogic";
import useContextValues from "./hooks/useContextValues";
import useUpdatingRefsForObject from "./hooks/useUpdatingRefsForObject";

function App() {
  const contextValues = useContextValues();

  const {
    isMainMenu,
    lives,
    isGameOver,
    livesTwo,
    setHighScore,
    setIsGameOver,
  } = contextValues;

  const contextRefs = useUpdatingRefsForObject(
    contextValues,
    contextValues.isGameOver
  );

  useEffect(() => {
    const isDead = !contextRefs.isTwoPlayers.current
      ? lives === 0
      : lives === 0 && livesTwo === 0;
    const gameStopped = isDead || isMainMenu;
    const points = contextRefs.points.current;
    const pointsTwo = contextRefs.pointsTwo.current;
    gameOverLogic(
      isDead,
      points > pointsTwo ? points : pointsTwo,
      contextRefs.highScore.current,
      setHighScore,
      setIsGameOver
    );
    if (gameStopped) return;

    const frameIntervalId = setInterval(() => {
      const { slowCount, gameStage, gameStageMultiplier } = frameCounterLogic(
        contextRefs,
        contextValues
      );

      heroMovementLogicX(contextRefs, contextValues);
      heroMovementLogicY(contextRefs, contextValues);

      damageCalculationLogic(contextRefs, contextValues);

      spawnFallingObjectsLogic(contextRefs, contextValues, gameStageMultiplier);

      const hitObject = objectGravityLogic(contextRefs, gameStageMultiplier);
      powerUpsLogic(contextValues, hitObject, gameStage, slowCount);
    }, FRAME_RATE);
    return () => {
      clearInterval(frameIntervalId);
    };
  }, [lives, isMainMenu, isGameOver, livesTwo]);

  return (
    <GameStateContext.Provider value={contextValues}>
      <div className="flex h-screen w-full items-center justify-center overflow-hidden font-pix-con">
        <div
          className="relative"
          style={{ height: SCREEN_HEIGHT + 8, width: SCREEN_WIDTH + 8 }}
        >
          <Mask top={-(OBJECT_SIZE * MASK_FACTOR)}>
            <HeaderBar highScore={contextValues.highScore} />
          </Mask>
          <Canvas>
            <UI />
            {(isGameOver || isMainMenu) && <Menu />}
            {isValidPosition(contextValues.heroOriginPoint) && (
              <Hero
                heroOriginPoint={contextValues.heroOriginPoint}
                invincibleCount={contextValues.invincibleCount}
                lastDirection={contextValues.lastDirection}
                shieldCount={contextValues.shieldCount}
              />
            )}
            {contextValues.isTwoPlayers &&
              isValidPosition(contextValues.heroTwoOriginPoint) && (
                <Hero
                  heroOriginPoint={contextValues.heroTwoOriginPoint}
                  invincibleCount={contextValues.invincibleCountTwo}
                  lastDirection={contextValues.lastDirectionTwo}
                  shieldCount={contextValues.shieldCountTwo}
                  isPlayerTwo
                />
              )}
            {contextValues.meteorPositions.map((meteorObject) => (
              <Meteor key={meteorObject.id} meteorObject={meteorObject} />
            ))}
            {contextValues.powerUpPositions.map((object) => (
              <PowerUp key={object.id} object={object} />
            ))}
          </Canvas>
          <Mask top={SCREEN_HEIGHT} className="border-t-4 border-black" />
        </div>
      </div>
    </GameStateContext.Provider>
  );
}

export default App;
