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
  OBJECT_SIZE,
  POWER_UP_LIST,
  POWER_UP_SPAWN_CHANCE,
  SCREEN_HEIGHT,
  SCREEN_WIDTH,
} from "./utils/variables";
import { countDownTo0 } from "./utils/lib";

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
    setHitObjectType,
    setInvincibleCount,
    setPowerUpPositions,
    setMeteorPositions,
    setHeroVelocityDown,
    setLastDirection,
    setHeroOriginPoint,
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

      hooks.usePowerUps(
        contextRefs.hitObjectType.current,
        setLives,
        setPoints,
        setShieldCount,
        setSlowCount,
        setHitObjectType
      );

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

      hooks.useSpawnFallingObject(
        setMeteorPositions,
        ["meteor"],
        contextRefs.mousePressPosition.current,
        METEOR_SPAWN_CHANCE,
        !!currentSlowCount
      );
      hooks.useSpawnFallingObject(
        setPowerUpPositions,
        POWER_UP_LIST,
        { X: null, Y: null },
        POWER_UP_SPAWN_CHANCE,
        !!currentSlowCount
      );

      hooks.useObjectGravity(
        setPowerUpPositions,
        setHitObjectType,
        contextRefs.heroOriginPoint.current,
        !!currentSlowCount,
        true
      );
      hooks.useObjectGravity(
        setMeteorPositions,
        setHitObjectType,
        contextRefs.heroOriginPoint.current,
        !!currentSlowCount
      );
    }, FRAME_RATE);
    return () => {
      clearInterval(frameIntervalId);
    };
  }, [lives, isMainMenu, isGameOver]);

  return (
    <GameStateContext.Provider value={contextValues}>
      <div className="flex h-screen w-full items-center justify-center overflow-hidden">
        <div
          className="relative"
          style={{ height: SCREEN_HEIGHT + 8, width: SCREEN_WIDTH + 8 }}
        >
          <Mask top={-(OBJECT_SIZE * MASK_FACTOR)}>
            <HeaderBar />
          </Mask>
          <Canvas>
            {(contextValues.isGameOver || contextValues.isMainMenu) && <Menu />}
            <Hero />
            {contextValues.meteorPositions.map((position) => (
              <Meteor key={position.id} position={position} />
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
