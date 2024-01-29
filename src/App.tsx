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
  isValidPosition,
  playAudio,
  resetAudio,
} from "./utils/lib";
import { clockTickingSound, themeSound, timeResumeSound } from "./utils/sounds";
import { FallingObjectType } from "./utils/types";
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

      const hisObjectType = hooks.useObjectGravity(
        setPowerUpPositions,
        contextRefs.heroOriginPoint.current,
        !!currentSlowCount,
        gameStageMultiplier,
        true
      );
      hooks.useObjectGravity(
        setMeteorPositions,
        contextRefs.heroOriginPoint.current,
        !!currentSlowCount,
        gameStageMultiplier
      );

      hooks.usePowerUps(
        hisObjectType,
        gameStage,
        setLives,
        setPoints,
        setShieldCount,
        setSlowCount
      );
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
            {(contextValues.isGameOver || contextValues.isMainMenu) && <Menu />}
            <Hero />
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

function getPowerUpList(gameStage: number) {
  let powerUpList: FallingObjectType[] = ["pointsSmall", "health"];
  if (gameStage >= 2) powerUpList = powerUpList.concat(["pointsMedium"]);
  if (gameStage >= 3) powerUpList = powerUpList.concat(["shield"]);
  if (gameStage >= 4)
    powerUpList = powerUpList.concat(["pointsLarge", "pointsSmall"]);
  if (gameStage >= 5)
    powerUpList = powerUpList.concat(["slow", "pointsMedium", "pointsSmall"]);
  return powerUpList;
}
