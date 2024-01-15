import { useState, createContext, useEffect } from "react";
import Canvas from "./components/Canvas";
import { HERO_SPAWN_POINT } from "./utils/variables";
import { Position, PositionWithID } from "./utils/types";
import Hero from "./components/Hero";
import usePressedKeys from "./hooks/usePressedKeys";
import useMeteorPositions from "./hooks/useMeteorPositions";
import Meteor from "./components/Meteor";
import useDetectCollision from "./hooks/useDetectCollision";
import { GameStateContext } from "./GameStateContext";

function App() {
  const [heroOriginPoint, setHeroOriginPoint] = useState(HERO_SPAWN_POINT);
  const [isGameOver, setIsGameOver] = useState(false);
  const meteorPositions = useMeteorPositions(isGameOver);
  const pressedKeys = usePressedKeys();
  const isHit = useDetectCollision(meteorPositions, heroOriginPoint);

  useEffect(() => {
    setIsGameOver(isHit);
  }, [isHit]);

  return (
    <GameStateContext.Provider
      value={{
        isGameOver,
        hero: {
          position: heroOriginPoint,
          updatePosition: (partialPosition) =>
            setHeroOriginPoint((oldValue) => ({
              ...oldValue,
              ...partialPosition,
            })),
        },
        pressedKeys,
        meteorPositions,
      }}
    >
      <div className="flex h-screen w-full items-center justify-center">
        <Canvas>
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
