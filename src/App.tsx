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
import useScore from "./hooks/useScore";
import HeaderBar from "./components/HeaderBar";
import useClick from "./hooks/useClick";
import useDamageDetection from "./hooks/useDamageDetection";

function App() {
  const [heroOriginPoint, setHeroOriginPoint] = useState(HERO_SPAWN_POINT);
  const [isGameOver, setIsGameOver] = useState(false);
  const [isMainMenu, setIsMainMenu] = useState(true);
  const [heroVelocityDown, setHeroVelocityDown] = useState(0);
  const click = useClick();
  const meteor = useMeteorPositions(
    isGameOver || isMainMenu,
    click.mousePressPosition
  );
  const score = useScore(isGameOver || isMainMenu);
  const pressedKeys = usePressedKeys();
  const isHit = useDetectCollision(meteor.meteorPositions, heroOriginPoint);
  const lives = useDamageDetection(isHit, isGameOver);

  useEffect(() => {
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
        ...meteor,
        ...lives,
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
            {meteor.meteorPositions.map((position) => (
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
