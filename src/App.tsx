import { useState, useEffect } from "react";
import Canvas from "./components/Canvas";
import { HERO_SPAWN_POINT } from "./utils/variables";
import Hero from "./components/Hero";
import usePressedKeys from "./hooks/usePressedKeys";
import useMeteorPositions from "./hooks/useMeteorPositions";
import Meteor from "./components/Meteor";
import useDetectCollision from "./hooks/useDetectCollision";
import { GameStateContext } from "./GameStateContext";
import GameOverScreen from "./components/GameOverScreen";

function App() {
  const [heroOriginPoint, setHeroOriginPoint] = useState(HERO_SPAWN_POINT);
  const [isGameOver, setIsGameOver] = useState(false);
  const { meteorPositions, setMeteorPositions } =
    useMeteorPositions(isGameOver);
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
          {isGameOver && <GameOverScreen />}
          <Hero />
          {meteorPositions.map((position) => (
            <Meteor key={position.id} position={position} />
          ))}
        </Canvas>
      </div>
    </GameStateContext.Provider>
  );
}

export default App;
