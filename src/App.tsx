import { useEffect, useRef } from "react";
import Canvas from "./components/Canvas";
import {
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
import usePowerUps from "./hooks/usePowerUp";
import { Position } from "./utils/types";
import useFallingObjectPositions from "./hooks/useFallingObjectPositions";
import useBasicState from "./hooks/useBasicState";

function App() {
  const contextValues = getContextValues();

  const { setHighScore, setIsGameOver, isGameOver, points, highScore, lives } =
    contextValues;

  useEffect(() => {
    if (isGameOver && points > highScore) {
      setHighScore(points);
      localStorage.setItem("highScore", points.toString());
    }
    setIsGameOver(lives === 0);
  }, [points, lives, isGameOver, highScore]);

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

function getContextValues() {
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
    click.mousePressPosition,
    METEORS_PER_SECOND,
    ["meteor"]
  );

  const {
    objectPositions: powerUpPositions,
    setObjectPositions: setPowerUpPositions,
  } = useFallingObjectPositions(
    shouldStopGame,
    { X: null, Y: null },
    POWER_UP_SPAWN_RATE,
    ["health", "pointsSmall", "pointsMedium", "pointsLarge", "shield"],
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
