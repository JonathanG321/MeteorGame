import { useState, useEffect } from "react";
import Canvas from "./components/Canvas";
import {
  HERO_SPAWN_POINT,
  MASK_FACTOR,
  OBJECT_SIZE,
  SCREEN_HEIGHT,
  SCREEN_WIDTH,
} from "./utils/variables";
import Hero from "./components/Hero";
import usePressedKeys from "./hooks/usePressedKeys";
import useMeteorPositions from "./hooks/useMeteorPositions";
import Meteor from "./components/Meteor";
import useDetectCollision from "./hooks/useDetectCollision";
import { GameStateContext } from "./GameStateContext";
import Menu from "./components/Menu";
import Mask from "./components/Mask";
import useScore from "./hooks/useScore";
import HeaderBar from "./components/HeaderBar";
import useClick from "./hooks/useClick";
import useDamageCalculation from "./hooks/useDamageCalculation";
import usePowerUpPositions from "./hooks/usePowerupPositions";
import PowerUp from "./components/PowerUp";
import usePowerUps from "./hooks/usePowerUp";
import { FallingObjectType, Position } from "./utils/types";

function App() {
  const contextValues = getContextValues();

  const {
    hitObjectType,
    setLives,
    setHitObjectType,
    setHighScore,
    setIsGameOver,
    isGameOver,
    points,
    highScore,
    lives,
  } = contextValues;

  usePowerUps(hitObjectType, setLives, setHitObjectType);

  useEffect(() => {
    if (isGameOver && points > highScore) {
      setHighScore(points);
      localStorage.setItem("highScore", points.toString());
    }
    setIsGameOver(lives === 0);
  }, [lives, isGameOver, points, highScore]);

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
  const [heroOriginPoint, setHeroOriginPoint] = useState(HERO_SPAWN_POINT);
  const [isGameOver, setIsGameOver] = useState(false);
  const [isMainMenu, setIsMainMenu] = useState(true);
  const [hitObjectType, setHitObjectType] = useState<FallingObjectType | null>(
    null
  );
  const [heroVelocityDown, setHeroVelocityDown] = useState(0);
  const shouldStopGame = isGameOver || isMainMenu;
  const score = useScore(shouldStopGame);
  const pressedKeys = usePressedKeys();
  const click = useClick();
  const meteors = useMeteorPositions(shouldStopGame, click.mousePressPosition);
  const powerUps = usePowerUpPositions(
    shouldStopGame,
    click.mousePressPosition,
    heroOriginPoint,
    setHitObjectType
  );
  const isHit = !!useDetectCollision(meteors.meteorPositions, heroOriginPoint);
  const lives = useDamageCalculation(isHit, isGameOver);
  return {
    ...score,
    ...pressedKeys,
    ...powerUps,
    ...meteors,
    ...click,
    ...lives,
    isHit,
    heroVelocityDown,
    setHeroVelocityDown,
    heroOriginPoint,
    setHeroOriginPoint,
    isGameOver,
    setIsGameOver,
    isMainMenu,
    setIsMainMenu,
    hitObjectType,
    setHitObjectType,
    hero: {
      position: heroOriginPoint,
      updatePosition: (partialPosition: Partial<Position>) =>
        setHeroOriginPoint((oldValue) => ({
          ...oldValue,
          ...partialPosition,
        })),
    },
  };
}
