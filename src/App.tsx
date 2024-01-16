import { useState, useEffect } from "react";
import Canvas from "./components/Canvas";
import {
  HERO_SPAWN_POINT,
  MASK_FACTOR,
  METEOR_SIZE,
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
import usePoints from "./hooks/usePoints";
import Score from "./components/ScoreDisplay";
import HeaderBar from "./components/HeaderBar";
import useClick from "./hooks/useClick";

function App() {
  const [highScore, setHighScore] = useState(
    parseInt(localStorage.getItem("highScore") ?? "0")
  );
  const [heroOriginPoint, setHeroOriginPoint] = useState(HERO_SPAWN_POINT);
  const [isGameOver, setIsGameOver] = useState(false);
  const [isMainMenu, setIsMainMenu] = useState(true);
  const [heroVelocityDown, setHeroVelocityDown] = useState(0);
  const { meteorPositions, setMeteorPositions } = useMeteorPositions(
    isGameOver || isMainMenu
  );
  const { points, setPoints } = usePoints(isGameOver || isMainMenu);
  const { pressedKeys, setPressedKeys } = usePressedKeys();
  const { mousePressPosition, setMousePressPosition } = useClick();
  const isHit = useDetectCollision(meteorPositions, heroOriginPoint);

  useEffect(() => {
    if (isHit && points > highScore) {
      setHighScore(points);
      localStorage.setItem("highScore", points.toString());
    }
    setIsGameOver(isHit);
  }, [isHit]);

  return (
    <GameStateContext.Provider
      value={{
        mousePressPosition,
        setMousePressPosition,
        highScore,
        setHighScore,
        isGameOver,
        setIsGameOver,
        isMainMenu,
        setIsMainMenu,
        setHeroOriginPoint,
        heroVelocityDown,
        setHeroVelocityDown,
        points,
        setPoints,
        hero: {
          position: heroOriginPoint,
          updatePosition: (partialPosition) =>
            setHeroOriginPoint((oldValue) => ({
              ...oldValue,
              ...partialPosition,
            })),
        },
        setMeteorPositions,
        setPressedKeys,
        pressedKeys,
        meteorPositions,
      }}
    >
      <div className="flex h-screen w-full items-center justify-center">
        <div
          className="relative"
          style={{ height: SCREEN_HEIGHT + 8, width: SCREEN_WIDTH + 8 }}
        >
          <Mask top={-(METEOR_SIZE * MASK_FACTOR)}>
            <HeaderBar />
          </Mask>
          <Canvas>
            {(isGameOver || isMainMenu) && <Menu />}
            <Hero />
            {meteorPositions.map((position) => (
              <Meteor key={position.id} position={position} />
            ))}
          </Canvas>
          <Mask top={SCREEN_HEIGHT} className="border-t-4 border-black" />
        </div>
      </div>
    </GameStateContext.Provider>
  );
}

export default App;
