import { MutableRefObject, useEffect, useRef } from "react";
import Canvas from "./components/Canvas";
import {
  FRAME_RATE,
  MASK_FACTOR,
  METEORS_PER_SECOND,
  OBJECT_SIZE,
  POWER_UP_SPAWN_CHANCE,
  POWER_UP_SPAWN_RATE,
  SCREEN_HEIGHT,
  SCREEN_WIDTH,
} from "./utils/variables";
import Hero from "./components/Hero";
import usePressedKeys from "./hooks/usePressedKeys";
import Meteor from "./components/Meteor";
import useDetectCollision from "./hooks/useDetectCollision";
import { GameStateContext } from "./context/GameStateContext";
import Menu from "./components/Menu";
import Mask from "./components/Mask";
import useScore from "./hooks/useScore";
import HeaderBar from "./components/HeaderBar";
import useClick from "./hooks/useClick";
import useDamageCalculation from "./hooks/useDamageCalculation";
import PowerUp from "./components/PowerUp";
import usePowerUps from "./hooks/usePowerUps";
import { ContextValues, Position } from "./utils/types";
import useFallingObjectPositions from "./hooks/useFallingObjectPositions";
import useBasicState from "./hooks/useBasicState";
import useContextRefsUpdates from "./hooks/useContextRefsUpdates";
import { useUpdatingRefsForObject } from "./hooks/useUpdatingRefsForObject";

function App() {
  const contextValues = getContextValues();

  const { setHighScore, setIsGameOver, isGameOver, lives } = contextValues;

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
    const slowIntervalId = setInterval(() => {
      contextValues.setSlowCount((prevValue) =>
        prevValue > 0 ? prevValue - 1 : 0
      );
    }, FRAME_RATE);
    return () => {
      clearInterval(slowIntervalId);
    };
  }, [lives]);

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
  const { shouldStopGame, heroOriginPoint, hitObjectType, setHitObjectType } =
    basicState;
  const score = useScore(shouldStopGame);
  const pressedKeys = usePressedKeys();
  const click = useClick();

  const {
    objectPositions: meteorPositions,
    setObjectPositions: setMeteorPositions,
  } = useFallingObjectPositions(
    shouldStopGame,
    basicState.slowCount,
    click.mousePressPosition,
    METEORS_PER_SECOND,
    ["meteor"]
  );

  const {
    objectPositions: powerUpPositions,
    setObjectPositions: setPowerUpPositions,
  } = useFallingObjectPositions(
    shouldStopGame,
    basicState.slowCount,
    { X: null, Y: null },
    POWER_UP_SPAWN_RATE,
    [
      // "health", "pointsSmall", "pointsMedium", "pointsLarge", "shield",
      "slow",
    ],
    {
      spawnChance: POWER_UP_SPAWN_CHANCE,
      isCollectible: true,
      heroOriginPoint,
      setHitObjectType,
    }
  );

  const isHit = !!useDetectCollision(meteorPositions, heroOriginPoint);
  const lives = useDamageCalculation(isHit, shouldStopGame);

  usePowerUps(
    hitObjectType,
    lives.setLives,
    score.setPoints,
    lives.setShieldCount,
    basicState.setSlowCount,
    setHitObjectType
  );

  return {
    ...basicState,
    ...score,
    ...pressedKeys,
    ...click,
    ...lives,
    isHit,
    powerUpPositions,
    setPowerUpPositions,
    meteorPositions,
    setMeteorPositions,
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
