import { useState, useEffect } from "react";
import Canvas from "./components/Canvas";
import { heroSize, heroSpawnPoint } from "./utils/variables";
import heroControls from "./behaviors/handleHeroControls";
import { handleHeroGravity } from "./behaviors/handleHeroGravity";
import addEventListeners from "./behaviors/addEventListeners";
import { Position } from "./utils/types";
import { handleMeteorGravity } from "./behaviors/handleMeteorGravity";
import { handleMeteorSpawning } from "./behaviors/handleMeteorSpawning";

function App() {
  const [velocityDown, setVelocityDown] = useState(0);
  const [isGrounded, setIsGrounded] = useState(false);
  const [heroOriginPoint, setHeroOriginPoint] = useState(heroSpawnPoint);
  const [meteorOriginPoints, setMeteorOriginPoints] = useState<Position[]>([]);
  const [pressedKeys, setPressedKeys] = useState({
    ArrowUp: false,
    ArrowDown: false,
    ArrowLeft: false,
    ArrowRight: false,
  });

  useEffect(() => addEventListeners(setPressedKeys), []);
  // useEffect(
  //   () => handleMeteorSpawning(meteorOriginPoints, setMeteorOriginPoints),
  //   [meteorOriginPoints]
  // );
  // useEffect(
  //   () => handleMeteorGravity(setMeteorOriginPoints),
  //   [meteorOriginPoints]
  // );
  useEffect(
    () =>
      heroControls(
        pressedKeys,
        isGrounded,
        heroOriginPoint,
        setIsGrounded,
        setVelocityDown,
        setHeroOriginPoint
      ),
    [pressedKeys, isGrounded, heroOriginPoint]
  );
  useEffect(
    () =>
      handleHeroGravity(
        velocityDown,
        heroOriginPoint,
        setIsGrounded,
        setVelocityDown,
        setHeroOriginPoint
      ),
    [velocityDown, isGrounded, heroOriginPoint]
  );

  return (
    <div className="flex h-screen w-full items-center justify-center">
      <Canvas>
        <div
          id="hero"
          style={{ top: heroSpawnPoint.Y, left: heroSpawnPoint.X }}
          className={`absolute h-[${heroSize}px] w-[${heroSize}px] bg-blue-500`}
        />
      </Canvas>
    </div>
  );
}

export default App;
