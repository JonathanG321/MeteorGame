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
  POWER_UP_SPAWN_RATE,
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
  } = contextValues;

  const contextRefs = useUpdatingRefsForObject(
    contextValues,
    contextValues.isGameOver
  );

  useEffect(() => {
    const isDead = lives === 0;
    const currentPoints = contextRefs.points.current;
    if (isDead && currentPoints > contextRefs.highScore.current) {
      setHighScore(currentPoints);
      localStorage.setItem("highScore", currentPoints.toString());
    } else if (isDead) {
      setIsGameOver(true);
    }
    if (isDead || isMainMenu) return;

    const spawnSpeed = 1000 / METEORS_PER_SECOND;
    const gravity = FRAME_RATE / OBJECT_GRAVITY;

    const spawningIntervalId = setInterval(() => {
      spawnFallingObjectInterval(
        setMeteorPositions,
        ["meteor"],
        contextRefs.mousePressPosition.current,
        100
      );
      spawnFallingObjectInterval(
        setPowerUpPositions,
        POWER_UP_LIST,
        { X: null, Y: null },
        1
      );
    }, spawnSpeed);

    const gravityIntervalId = setInterval(() => {
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
    }, gravity);

    const incrementingIntervalId = setInterval(() => {
      setSlowCount((prevValue) => (prevValue > 0 ? prevValue - 1 : 0));
      setPoints((prevValue) => prevValue + 10);
      if (
        contextRefs.invincibleCount.current <= 0 &&
        contextRefs.shieldCount.current <= 0 &&
        contextRefs.isHit.current
      ) {
        setLives(countDownTo0);
        setInvincibleCount(NEW_INVINCIBLE_COUNT);
      } else if (
        contextRefs.shieldCount.current > SHIELD_WARNING_DURATION &&
        contextRefs.isHit.current
      ) {
        setShieldCount(SHIELD_WARNING_DURATION);
      }

      setInvincibleCount(countDownTo0);
      setShieldCount(countDownTo0);

      usePowerUps(
        contextRefs.hitObjectType.current,
        setLives,
        setPoints,
        setShieldCount,
        setSlowCount,
        setHitObjectType
      );
    }, FRAME_RATE);
    return () => {
      clearInterval(incrementingIntervalId);
      clearInterval(spawningIntervalId);
      clearInterval(gravityIntervalId);
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
