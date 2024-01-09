import { useState, useEffect } from "react";
import Canvas from "./components/Canvas";
import $ from "jquery";

const heroSize = 40;
const heroSpeed = 6;
const frameRate = 1000 / 60;
const screenHeight = 480;
const screenWidth = 800;
const jumpHeight = 20;
const gravity = 2;
const maxVelocityDown = 10;

function App() {
  const [velocityDown, setVelocityDown] = useState(0);
  const [grounded, setGrounded] = useState(false);
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
      let newY = parseInt(hero.css("top"));
      let newX = parseInt(hero.css("left"));

      // handle controls
      if (pressedKeys["ArrowUp"] && grounded) {
        setGrounded(false);
        setVelocityDown(-jumpHeight);
      }
      if (pressedKeys["ArrowLeft"]) newX -= heroSpeed;
      if (pressedKeys["ArrowRight"]) newX += heroSpeed;

      if (newX < 0) newX = 0;
      if (newX > screenWidth - heroSize) newX = screenWidth - heroSize;

      hero.css("top", newY);
      hero.css("left", newX);
    }, frameRate);

    return () => {
      clearInterval(intervalId);
    };
  }

  function heroGravity() {
    const intervalId = setInterval(() => {
      const hero = $("#hero");
      let newY = parseInt(hero.css("top"));
      let newX = parseInt(hero.css("left"));

      newY += velocityDown;

      if (newY < 0) newY = 0;
      if (newY > screenHeight - heroSize) {
        newY = screenHeight - heroSize;
        setGrounded(true);
        setVelocityDown(0);
      } else {
        if (velocityDown < maxVelocityDown) {
          setVelocityDown(velocityDown + gravity);
        } else {
          setVelocityDown(maxVelocityDown);
        }
      }

      hero.css("top", newY);
      hero.css("left", newX);
    }, frameRate);

    return () => {
      clearInterval(intervalId);
    };
  }

  useEffect(heroControls, [pressedKeys, grounded]);
  useEffect(heroGravity, [velocityDown, grounded]);

  return (
    <div className="flex h-screen w-full items-center justify-center">
      <Canvas>
        <div
          id="hero"
          style={{ top: 0, left: 0 }}
          className={`relative h-[${heroSize}px] w-[${heroSize}px] bg-red-500`}
        />
      </Canvas>
    </div>
  );
}

export default App;
