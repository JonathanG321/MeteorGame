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
import useCollectPowerUp from "./hooks/useCollectPowerup";

function App() {
  const [heroOriginPoint, setHeroOriginPoint] = useState(HERO_SPAWN_POINT);
  const [isGameOver, setIsGameOver] = useState(false);
  const [isMainMenu, setIsMainMenu] = useState(true);
  const [heroVelocityDown, setHeroVelocityDown] = useState(0);
  const click = useClick();
  const meteors = useMeteorPositions(
    isGameOver || isMainMenu,
    click.mousePressPosition
  );
  const powerUps = usePowerUpPositions(
    isGameOver || isMainMenu,
    click.mousePressPosition,
    heroOriginPoint
  );
  const score = useScore(isGameOver || isMainMenu);
  const pressedKeys = usePressedKeys();
  const isHit = !!useDetectCollision(meteors.meteorPositions, heroOriginPoint);
  // const hitPowerUpId = useDetectCollision(
  //   powerUps.powerUpPositions,
  //   heroOriginPoint
  // );
  const lives = useDamageCalculation(isHit, isGameOver);

  useEffect(() => {
    // useCollectPowerUp(
    //   powerUps.powerUpPositions,
    //   powerUps.setPowerUpPositions,
    //   hitPowerUpId
    // );
    // powerUps.setPowerUpPositions(
    //   powerUps.powerUpPositions.filter((powerUp) => powerUp.id !== hitPowerUpId)
    // );

    if (isGameOver && score.points > score.highScore) {
      score.setHighScore(score.points);
      localStorage.setItem("highScore", score.points.toString());
    }
    setIsGameOver(lives.lives === 0);
  }, [lives.lives, isGameOver, score.points, score.highScore]);

  return (
    <GameStateContext.Provider
      value={{
        isGameOver,
        setIsGameOver,
        isMainMenu,
        setIsMainMenu,
        setHeroOriginPoint,
        heroVelocityDown,
        setHeroVelocityDown,
        hero: {
          position: heroOriginPoint,
          updatePosition: (partialPosition) =>
            setHeroOriginPoint((oldValue) => ({
              ...oldValue,
              ...partialPosition,
            })),
        },
        ...click,
        ...score,
        ...pressedKeys,
        ...powerUps,
        ...meteors,
        ...lives,
      }}
    >
      <div className="flex h-screen w-full items-center justify-center">
        <div
          className="relative"
          style={{ height: SCREEN_HEIGHT + 8, width: SCREEN_WIDTH + 8 }}
        >
          <Mask top={-(OBJECT_SIZE * MASK_FACTOR)}>
            <HeaderBar />
          </Mask>
          <Canvas>
            {(isGameOver || isMainMenu) && <Menu />}
            <Hero />
            {meteors.meteorPositions.map((position) => (
              <Meteor key={position.id} position={position} />
            ))}
            {powerUps.powerUpPositions.map((object) => (
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
