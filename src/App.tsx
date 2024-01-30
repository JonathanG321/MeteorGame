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
    const isDead = lives === 0;
    const gameStopped = isDead || isMainMenu;
    hooks.useGameOver(
      isDead,
      contextRefs.points.current,
      contextRefs.highScore.current,
      setHighScore,
      setIsGameOver
    );
    if (gameStopped) return;

    const frameIntervalId = setInterval(() => {
      const currentSlowCount = contextRefs.slowCount.current;
      setSlowCount((prevValue) => countDownTo0(prevValue, !!currentSlowCount));
      setPoints((prevValue) => prevValue + (currentSlowCount > 0 ? 20 : 10));
      setPointsTwo((prevValue) => prevValue + (currentSlowCount > 0 ? 20 : 10));
      setGameCounter((prevValue) => prevValue + (currentSlowCount > 0 ? 1 : 2));
      const gameStage = contextRefs.gameStage.current;
      const gameStageMultiplier =
        STAGE_DIFFICULTY_SCALE ** (gameStage <= 5 ? gameStage : 5);
      const powerUpList = getPowerUpList(gameStage);

      hooks.useDamageCalculation(
        contextRefs.invincibleCount.current,
        contextRefs.shieldCount.current,
        contextRefs.isHit.current,
        !!currentSlowCount,
        contextRefs.lives.current,
        setLives,
        setInvincibleCount,
        setShieldCount
      );

      if (contextRefs.slowCount.current === 75) playAudio(timeResumeSound, 1);
      if (contextRefs.slowCount.current === 60) resetAudio(clockTickingSound);
      if (contextRefs.slowCount.current === 1) themeSound.playbackRate = 1;

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
        setPowerUpPositions,
        contextRefs.heroOriginPoint.current,
        contextRefs.heroTwoOriginPoint.current,
        !!currentSlowCount,
        gameStageMultiplier,
        true
      );
      hooks.useObjectGravity(
        setMeteorPositions,
        contextRefs.heroOriginPoint.current,
        contextRefs.heroTwoOriginPoint.current,
        !!currentSlowCount,
        gameStageMultiplier
      );

      hooks.usePowerUps(
        hitObject.hitObjectType,
        hitObject.isHeroTwo,
        gameStage,
        setLives,
        setPoints,
        setShieldCount,
        setLivesTwo,
        setPointsTwo,
        setShieldCountTwo,
        setSlowCount
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
          setShieldCountTwo
        );
        if (isValidPosition(contextRefs.heroTwoOriginPoint.current)) {
          hooks.useHeroMovementLogicX(
            contextRefs.heroTwoOriginPoint.current.X,
            contextRefs.pressedKeys.current.KeyA,
            contextRefs.pressedKeys.current.KeyD,
            !!currentSlowCount,
            contextRefs.lastDirectionTwo.current,
            setHeroTwoOriginPoint,
            setLastDirectionTwo
          );
          hooks.useHeroMovementLogicY(
            contextRefs.heroTwoOriginPoint.current.Y,
            contextRefs.pressedKeys.current.KeyW,
            contextRefs.pressedKeys.current.KeyS,
            contextRefs.heroVelocityDownTwo.current,
            currentSlowCount,
            setHeroVelocityDownTwo,
            setHeroTwoOriginPoint
          );
        }
      }
    }, FRAME_RATE);
    return () => {
      clearInterval(frameIntervalId);
    };
  }, [lives, isMainMenu, isGameOver]);

  return (
    <GameStateContext.Provider value={contextValues}>
      <div className="flex h-screen w-full items-center justify-center overflow-hidden font-pix-con">
        <div
          className="relative"
          style={{ height: SCREEN_HEIGHT + 8, width: SCREEN_WIDTH + 8 }}
        >
          <Mask top={-(OBJECT_SIZE * MASK_FACTOR)}>
            <HeaderBar />
          </Mask>
          <Canvas>
            <UI />
            {(isGameOver || isMainMenu) && <Menu />}
            <Hero
              heroOriginPoint={contextValues.heroOriginPoint}
              invincibleCount={contextValues.invincibleCount}
              lastDirection={contextValues.lastDirection}
              shieldCount={contextValues.shieldCount}
            />
            {contextValues.isTwoPlayers && (
              <Hero
                heroOriginPoint={contextValues.heroTwoOriginPoint}
                invincibleCount={contextValues.invincibleCountTwo}
                lastDirection={contextValues.lastDirectionTwo}
                shieldCount={contextValues.shieldCountTwo}
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
