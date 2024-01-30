import { useEffect } from "react";
import { GameStateContext } from "./context/GameStateContext";
import Canvas from "./components/Canvas";
import Hero from "./components/Hero";
import Meteor from "./components/Meteor";
import Menu from "./components/Menu";
import Mask from "./components/Mask";
import HeaderBar from "./components/HeaderBar";
import PowerUp from "./components/PowerUp";
import hooks from "./hooks";
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
import {
  countDownTo0,
  getPowerUpList,
  isValidPosition,
  playAudio,
  resetAudio,
} from "./utils/lib";
import { clockTickingSound, themeSound, timeResumeSound } from "./utils/sounds";
import UI from "./components/UI";

function App() {
  const contextValues = hooks.useContextValues();

  const {
    isMainMenu,
    lives,
    isGameOver,
    livesTwo,
    setHighScore,
    setIsGameOver,
    setLives,
    setPoints,
    setShieldCount,
    setSlowCount,
    setInvincibleCount,
    setPowerUpPositions,
    setMeteorPositions,
    setHeroVelocityDown,
    setLastDirection,
    setHeroOriginPoint,
    setGameCounter,
    setHeroTwoOriginPoint,
    setLastDirectionTwo,
    setHeroVelocityDownTwo,
    setLivesTwo,
    setInvincibleCountTwo,
    setShieldCountTwo,
    setPointsTwo,
  } = contextValues;

  const contextRefs = hooks.useUpdatingRefsForObject(
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
    hooks.useGameOver(
      isDead,
      points > pointsTwo ? points : pointsTwo,
      contextRefs.highScore.current,
      setHighScore,
      setIsGameOver
    );
    if (gameStopped) return;

    const frameIntervalId = setInterval(() => {
      const currentSlowCount = contextRefs.slowCount.current;
      setSlowCount((prevValue) => countDownTo0(prevValue, !!currentSlowCount));
      if (lives !== 0)
        setPoints((prevValue) => prevValue + (currentSlowCount > 0 ? 20 : 10));
      if (livesTwo !== 0 && contextRefs.isTwoPlayers.current)
        setPointsTwo(
          (prevValue) => prevValue + (currentSlowCount > 0 ? 20 : 10)
        );
      setGameCounter((prevValue) => prevValue + (currentSlowCount > 0 ? 1 : 2));
      const gameStage = contextRefs.gameStage.current;
      const gameStageMultiplier =
        STAGE_DIFFICULTY_SCALE ** (gameStage <= 5 ? gameStage : 5);
      const powerUpList = getPowerUpList(gameStage);

      if (currentSlowCount === 75) playAudio(timeResumeSound, 1);
      if (currentSlowCount === 60) resetAudio(clockTickingSound);
      if (currentSlowCount === 1) themeSound.playbackRate = 1;

      if (isValidPosition(contextRefs.heroOriginPoint.current)) {
        hooks.useHeroMovementLogicX(
          contextRefs.heroOriginPoint.current.X,
          contextRefs.pressedKeys.current.ArrowLeft,
          contextRefs.pressedKeys.current.ArrowRight,
          !!currentSlowCount,
          contextRefs.lastDirection.current,
          setHeroOriginPoint,
          setLastDirection
        );
        hooks.useHeroMovementLogicY(
          contextRefs.heroOriginPoint.current.Y,
          contextRefs.pressedKeys.current.ArrowUp,
          contextRefs.pressedKeys.current.ArrowDown,
          contextRefs.heroVelocityDown.current,
          currentSlowCount,
          setHeroVelocityDown,
          setHeroOriginPoint
        );
      }
      if (
        contextRefs.isTwoPlayers.current &&
        isValidPosition(contextRefs.heroTwoOriginPoint.current)
      ) {
        hooks.useHeroMovementLogicX(
          contextRefs.heroTwoOriginPoint.current.X,
          contextRefs.pressedKeys.current.a,
          contextRefs.pressedKeys.current.d,
          !!currentSlowCount,
          contextRefs.lastDirectionTwo.current,
          setHeroTwoOriginPoint,
          setLastDirectionTwo
        );
        hooks.useHeroMovementLogicY(
          contextRefs.heroTwoOriginPoint.current.Y,
          contextRefs.pressedKeys.current.w,
          contextRefs.pressedKeys.current.s,
          contextRefs.heroVelocityDownTwo.current,
          currentSlowCount,
          setHeroVelocityDownTwo,
          setHeroTwoOriginPoint
        );
      }

      hooks.useDamageCalculation(
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
        hooks.useDamageCalculation(
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

      hooks.useSpawnFallingObject(
        setMeteorPositions,
        ["meteor"],
        contextRefs.mousePressPosition.current,
        METEOR_SPAWN_CHANCE,
        !!currentSlowCount,
        gameStageMultiplier * STAGE_DIFFICULTY_SCALE ** 2,
        gameStageMultiplier
      );
      hooks.useSpawnFallingObject(
        setPowerUpPositions,
        powerUpList,
        NULL_POSITION,
        POWER_UP_SPAWN_CHANCE,
        !!currentSlowCount,
        gameStageMultiplier * STAGE_DIFFICULTY_SCALE ** 2
      );

      const hitObject = hooks.useObjectGravity(
        contextRefs,
        gameStageMultiplier
      );

      hooks.usePowerUps(contextRefs, hitObject, gameStage);
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
