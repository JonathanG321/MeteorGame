import { useEffect } from "react";
import { GameStateContext } from "./context/GameStateContext";
import Canvas from "./components/Canvas";
import Hero from "./components/Hero";
import Meteor from "./components/Meteor";
import Menu from "./components/Menu";
import Mask from "./components/Mask";
import HeaderBar from "./components/HeaderBar";
import PowerUp from "./components/PowerUp";
import {
  FRAME_RATE,
  MASK_FACTOR,
  METEOR_SPAWN_CHANCE,
  NULL_POSITION,
  OBJECT_SIZE,
  POWER_UP_SPAWN_CHANCE,
  SCREEN_HEIGHT,
  SCREEN_WIDTH,
  STAGE_DIFFICULTY_SCALE,
} from "./utils/variables";
import { isValidPosition, playAudio, resetAudio } from "./utils/lib";
import sounds from "./utils/sounds";
import UI from "./components/UI";
import spawnFallingObjectLogic from "./logic/spawnFallingObjectLogic";
import damageCalculationLogic from "./logic/damageCalculationLogic";
import powerUpsLogic from "./logic/powerUpsLogic";
import heroMovementLogicX from "./logic/heroMovementLogicX";
import heroMovementLogicY from "./logic/heroMovementLogicY";
import objectGravityLogic from "./logic/objectGravityLogic";
import gameOverLogic from "./logic/gameOverLogic";
import useContextValues from "./hooks/useContextValues";
import useUpdatingRefsForObject from "./hooks/useUpdatingRefsForObject";
import frameCounterLogic from "./logic/frameCounterLogic";

function App() {
  const contextValues = useContextValues();

  const {
    isMainMenu,
    lives,
    isGameOver,
    livesTwo,
    setHighScore,
    setIsGameOver,
    setLives,
    setShieldCount,
    setInvincibleCount,
    setPowerUpPositions,
    setMeteorPositions,
    setHeroOriginPoint,
    setHeroTwoOriginPoint,
    setLivesTwo,
    setInvincibleCountTwo,
    setShieldCountTwo,
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
      const { currentSlowCount, gameStage, gameStageMultiplier, powerUpList } =
        frameCounterLogic(contextRefs, contextValues);

      if (currentSlowCount === 75) playAudio(sounds.timeResume, 1);
      if (currentSlowCount === 60) resetAudio(sounds.clockTicking);
      if (currentSlowCount === 1) sounds.theme.playbackRate = 1;

      heroMovementLogicX(contextRefs, contextValues);
      heroMovementLogicY(contextRefs, contextValues);

      damageCalculationLogic(
        contextRefs.invincibleCount.current,
        contextRefs.shieldCount.current,
        contextRefs.isHit.current,
        !!currentSlowCount,
        contextRefs.lives.current,
        setLives,
        setInvincibleCount,
        setShieldCount,
        setHeroOriginPoint
      );
      if (contextRefs.isTwoPlayers.current) {
        damageCalculationLogic(
          contextRefs.invincibleCountTwo.current,
          contextRefs.shieldCountTwo.current,
          contextRefs.isHitTwo.current,
          !!currentSlowCount,
          contextRefs.livesTwo.current,
          setLivesTwo,
          setInvincibleCountTwo,
          setShieldCountTwo,
          setHeroTwoOriginPoint
        );
      }

      spawnFallingObjectLogic(
        setMeteorPositions,
        ["meteor"],
        contextRefs.mousePressPosition.current,
        METEOR_SPAWN_CHANCE,
        !!currentSlowCount,
        gameStageMultiplier * STAGE_DIFFICULTY_SCALE ** 2,
        gameStageMultiplier
      );
      spawnFallingObjectLogic(
        setPowerUpPositions,
        powerUpList,
        NULL_POSITION,
        POWER_UP_SPAWN_CHANCE,
        !!currentSlowCount,
        gameStageMultiplier * STAGE_DIFFICULTY_SCALE ** 2
      );

      const hitObject = objectGravityLogic(contextRefs, gameStageMultiplier);

      powerUpsLogic(contextRefs, hitObject, gameStage);
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
