import { useState, useEffect } from "react";
import Canvas from "./components/Canvas";
import {
  HERO_SPAWN_POINT,
  MASK_FACTOR,
  METEOR_SIZE,
  SCREEN_HEIGHT,
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
import Score from "./components/Score";

function App() {
  const [heroOriginPoint, setHeroOriginPoint] = useState(HERO_SPAWN_POINT);
  const [isGameOver, setIsGameOver] = useState(false);
  const [isMainMenu, setIsMainMenu] = useState(true);
  const [heroVelocityDown, setHeroVelocityDown] = useState(0);
  const { meteorPositions, setMeteorPositions } = useMeteorPositions(
    isGameOver || isMainMenu
  );
  const { points, setPoints } = usePoints(isGameOver || isMainMenu);
  const { pressedKeys, setPressedKeys } = usePressedKeys();
  const isHit = useDetectCollision(meteorPositions, heroOriginPoint);

  useEffect(() => {
    setIsGameOver(isHit);
  }, [isHit]);

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
        <Canvas>
          <Mask
            top={-(METEOR_SIZE * MASK_FACTOR)}
            className="border-b-4 border-black"
          />
          {(isGameOver || isMainMenu) && <Menu />}
          <Score />
          <Hero />
          {meteorPositions.map((position) => (
            <Meteor key={position.id} position={position} />
          ))}
          <Mask top={SCREEN_HEIGHT} className="border-t-4 border-black" />
        </Canvas>
      </div>
    </GameStateContext.Provider>
  );
}

export default App;
