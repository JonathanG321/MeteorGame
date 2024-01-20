import { useEffect } from "react";
import { GameStateContext } from "./context/GameStateContext";
import Canvas from "./components/Canvas";
import Hero from "./components/Hero";
import Meteor from "./components/Meteor";
import Menu from "./components/Menu";
import Mask from "./components/Mask";
import HeaderBar from "./components/HeaderBar";
import PowerUp from "./components/PowerUp";
import usePowerUps from "./hooks/usePowerUps";
import { useUpdatingRefsForObject } from "./hooks/useUpdatingRefsForObject";
import { useHeroMovementLogicX } from "./hooks/useHeroMovementLogicX";
import { useHeroMovementLogicY } from "./hooks/useHeroMovementLogicY";
import { useGameOver } from "./hooks/useGameOver";
import { useDamageCalculation } from "./hooks/useDamageCalculation";
import { useContextValues } from "./hooks/useContextValues";
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
import {
  countDownTo0,
  objectGravityInterval,
  spawnFallingObjectInterval,
} from "./utils/lib";

function App() {
  const contextValues = useContextValues();

  const {
    isMainMenu,
    lives,
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
  } = contextValues;

  const contextRefs = useUpdatingRefsForObject(
    contextValues,
    contextValues.isGameOver
  );

  useEffect(() => {
    const isDead = lives === 0;
    useGameOver(
      isDead,
      contextRefs.points.current,
      contextRefs.highScore.current,
      setHighScore,
      setIsGameOver
    );
    if (isDead || isMainMenu) return;

    const frameIntervalId = setInterval(() => {
      const currentSlowCount = contextRefs.slowCount.current;
      setSlowCount((prevValue) => countDownTo0(prevValue, !!currentSlowCount));
      setPoints((prevValue) => prevValue + (currentSlowCount > 0 ? 20 : 10));

      if (contextRefs.isHit.current) {
        useDamageCalculation(
          contextRefs.invincibleCount.current,
          contextRefs.shieldCount.current,
          currentSlowCount,
          setLives,
          setInvincibleCount,
          setShieldCount
        );
      }

      if (contextRefs.invincibleCount.current > 0)
        setInvincibleCount((prev) => countDownTo0(prev, !!currentSlowCount));
      if (contextRefs.shieldCount.current > 0)
        setShieldCount((prev) => countDownTo0(prev, !!currentSlowCount));

      if (!!contextRefs.hitObjectType.current)
        usePowerUps(
          contextRefs.hitObjectType.current,
          setLives,
          setPoints,
          setShieldCount,
          setSlowCount,
          setHitObjectType
        );

      useHeroMovementLogicX(
        contextRefs.heroOriginPoint.current.X,
        contextRefs.pressedKeys.current.ArrowLeft,
        contextRefs.pressedKeys.current.ArrowRight,
        !!currentSlowCount,
        contextRefs.hero.current.updatePosition
      );
      useHeroMovementLogicY(
        contextRefs.heroOriginPoint.current.Y,
        contextRefs.pressedKeys.current.ArrowUp,
        contextRefs.pressedKeys.current.ArrowDown,
        contextRefs.heroVelocityDown.current,
        currentSlowCount,
        setHeroVelocityDown,
        contextRefs.hero.current.updatePosition
      );

      spawnFallingObjectInterval(
        setMeteorPositions,
        ["meteor"],
        contextRefs.mousePressPosition.current,
        METEOR_SPAWN_CHANCE,
        !!currentSlowCount
      );
      spawnFallingObjectInterval(
        setPowerUpPositions,
        POWER_UP_LIST,
        { X: null, Y: null },
        POWER_UP_SPAWN_CHANCE,
        !!currentSlowCount
      );

      objectGravityInterval(
        setPowerUpPositions,
        setHitObjectType,
        contextRefs.heroOriginPoint.current,
        !!currentSlowCount,
        true
      );
      objectGravityInterval(
        setMeteorPositions,
        setHitObjectType,
        contextRefs.heroOriginPoint.current,
        !!currentSlowCount
      );
    }, FRAME_RATE);
    return () => {
      clearInterval(frameIntervalId);
    };
  }, [lives, isMainMenu]);

  return (
    <GameStateContext.Provider value={contextValues}>
      <div className="flex h-screen w-full items-center justify-center">
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
