import { useState, useEffect } from "react";
import Canvas from "./components/Canvas";
import $ from "jquery";
import {
  frameRate,
  heroGravity,
  heroJumpHeight,
  heroSize,
  heroSpawnPoint,
  heroSpeed,
  maxHeroVelocityDown,
  screenHeight,
  screenWidth,
} from "./variables";

function App() {
  const [velocityDown, setVelocityDown] = useState(0);
  const [grounded, setGrounded] = useState(false);
  const [heroOriginPoint, setHeroOriginPoint] = useState(heroSpawnPoint);
  const [pressedKeys, setPressedKeys] = useState({
    ArrowUp: false,
    ArrowDown: false,
    ArrowLeft: false,
    ArrowRight: false,
  });

  function handleKeyDown(e: KeyboardEvent) {
    setPressedKeys((prevKeys) => ({ ...prevKeys, [e.key]: true }));
  }
  function handleKeyUp(e: KeyboardEvent) {
    setPressedKeys((prevKeys) => ({ ...prevKeys, [e.key]: false }));
  }

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("keyup", handleKeyUp);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  function heroControls() {
    const intervalId = setInterval(() => {
      const hero = $("#hero");
      let newX = parseInt(hero.css("left"));

      // handle controls
      if (pressedKeys["ArrowUp"] && grounded) {
        setGrounded(false);
        setVelocityDown(-heroJumpHeight);
      }
      if (pressedKeys["ArrowLeft"]) newX -= heroSpeed;
      if (pressedKeys["ArrowRight"]) newX += heroSpeed;

      if (newX < 0) newX = 0;
      if (newX > screenWidth - heroSize) newX = screenWidth - heroSize;

      setHeroOriginPoint({ ...heroOriginPoint, X: newX });
      hero.css("left", newX);
    }, frameRate);

    return () => {
      clearInterval(intervalId);
    };
  }

  function heroheroGravity() {
    const intervalId = setInterval(() => {
      const hero = $("#hero");
      let newY = parseInt(hero.css("top"));

      newY += velocityDown;

      if (newY < 0) newY = 0;
      if (newY > screenHeight - heroSize) {
        newY = screenHeight - heroSize;
        setGrounded(true);
        setVelocityDown(0);
      } else {
        if (velocityDown < maxHeroVelocityDown) {
          setVelocityDown(velocityDown + heroGravity);
        } else {
          setVelocityDown(maxHeroVelocityDown);
        }
      }

      setHeroOriginPoint({ ...heroOriginPoint, Y: newY });
      hero.css("top", newY);
    }, frameRate);

    return () => {
      clearInterval(intervalId);
    };
  }

  useEffect(heroControls, [pressedKeys, grounded, heroOriginPoint]);
  useEffect(heroheroGravity, [velocityDown, grounded, heroOriginPoint]);

  return (
    <div className="flex h-screen w-full items-center justify-center">
      <Canvas>
        <div
          id="hero"
          style={{ top: heroSpawnPoint.Y, left: heroSpawnPoint.X }}
          className={`relative h-[${heroSize}px] w-[${heroSize}px] bg-red-500`}
        />
      </Canvas>
    </div>
  );
}

export default App;
