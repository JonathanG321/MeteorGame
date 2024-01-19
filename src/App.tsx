import { useEffect } from "react";
import Canvas from "./components/Canvas";
import {
  FRAME_RATE,
  MASK_FACTOR,
  METEORS_PER_SECOND,
  NEW_INVINCIBLE_COUNT,
  OBJECT_GRAVITY,
  OBJECT_SIZE,
  POWER_UP_LIST,
  POWER_UP_SPAWN_CHANCE,
  SCREEN_HEIGHT,
  SCREEN_WIDTH,
  SHIELD_WARNING_DURATION,
} from "./utils/variables";
import Hero from "./components/Hero";
import usePressedKeys from "./hooks/usePressedKeys";
import Meteor from "./components/Meteor";
import useDetectCollision from "./hooks/useDetectCollision";
import { GameStateContext } from "./context/GameStateContext";
import Menu from "./components/Menu";
import Mask from "./components/Mask";
import HeaderBar from "./components/HeaderBar";
import useClick from "./hooks/useClick";
import PowerUp from "./components/PowerUp";
import usePowerUps from "./hooks/usePowerUps";
import { ContextValues, Position } from "./utils/types";
import useBasicState from "./hooks/useBasicState";
import { useUpdatingRefsForObject } from "./hooks/useUpdatingRefsForObject";
import {
  countDownTo0,
  objectGravityInterval,
  spawnFallingObjectInterval,
} from "./utils/lib";
import { useHeroMovementLogicX } from "./hooks/useHeroMovementLogicX";
import { useHeroMovementLogicY } from "./hooks/useHeroMovementLogicY";
import { useGameOver } from "./hooks/useGameOver";
import { useDamageCalculation } from "./hooks/useDamageCalculation";

function App() {
  const contextValues = getContextValues();

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
      setSlowCount((prevValue) => (prevValue > 0 ? prevValue - 1 : 0));
      setPoints((prevValue) => prevValue + 10);

      if (contextRefs.isHit.current) {
        useDamageCalculation(
          contextRefs.invincibleCount.current,
          contextRefs.shieldCount.current,
          setLives,
          setInvincibleCount,
          setShieldCount
        );
      }

      if (contextRefs.invincibleCount.current > 0)
        setInvincibleCount((prev) => prev - 1);
      if (contextRefs.shieldCount.current > 0)
        setShieldCount((prev) => prev - 1);

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
        contextRefs.hero.current.updatePosition
      );
      useHeroMovementLogicY(
        contextRefs.heroOriginPoint.current.Y,
        contextRefs.pressedKeys.current.ArrowUp,
        contextRefs.pressedKeys.current.ArrowDown,
        contextRefs.heroVelocityDown.current,
        setHeroVelocityDown,
        contextRefs.hero.current.updatePosition
      );

      spawnFallingObjectInterval(
        setMeteorPositions,
        ["meteor"],
        contextRefs.mousePressPosition.current,
        30
      );
      spawnFallingObjectInterval(
        setPowerUpPositions,
        POWER_UP_LIST,
        { X: null, Y: null },
        POWER_UP_SPAWN_CHANCE
      );

      objectGravityInterval(
        setPowerUpPositions,
        setHitObjectType,
        contextRefs.heroOriginPoint.current,
        true
      );
      objectGravityInterval(
        setMeteorPositions,
        setHitObjectType,
        contextRefs.heroOriginPoint.current
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

function getContextValues(): ContextValues {
  const basicState = useBasicState();
  const { heroOriginPoint } = basicState;
  const pressedKeys = usePressedKeys();
  const click = useClick();

  const isHit = !!useDetectCollision(
    basicState.meteorPositions,
    heroOriginPoint
  );

  return {
    ...basicState,
    ...pressedKeys,
    ...click,
    isHit,
    hero: {
      position: heroOriginPoint,
      updatePosition: (partialPosition: Partial<Position>) =>
        basicState.setHeroOriginPoint((oldValue) => ({
          ...oldValue,
          ...partialPosition,
        })),
    },
  };
}
