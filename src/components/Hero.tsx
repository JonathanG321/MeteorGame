import { useContext, useEffect } from "react";
import classNames from "classnames";
import {
  FRAME_RATE,
  HERO_GRAVITY,
  HERO_JUMP_SPEED,
  HERO_SIZE,
  HERO_SPEED,
  MAX_HERO_VELOCITY_DOWN,
  SCREEN_HEIGHT,
  SCREEN_WIDTH,
} from "../utils/variables";
import { GameStateContext } from "../GameStateContext";
import { createObjectStyle } from "../utils/lib";

export default function Hero() {
  const {
    hero: { position },
    heroVelocityDown,
    setHeroVelocityDown,
    invincibleCount,
  } = useContext(GameStateContext);
  useHeroControls(heroVelocityDown, setHeroVelocityDown);
  const style = createObjectStyle(position, HERO_SIZE);
  return (
    <div
      id="hero"
      style={style}
      className={classNames(`absolute`, {
        "bg-green-500": invincibleCount > 0,
        "bg-blue-500": invincibleCount <= 0,
      })}
    />
  );
}

function useHeroControls(
  velocityDown: number,
  setVelocityDown: (newVelocity: number) => void
) {
  const { pressedKeys, hero, isGameOver, isMainMenu } =
    useContext(GameStateContext);
  useEffect(() => {
    if (isGameOver || isMainMenu) return;
    const intervalId = setInterval(() => {
      let newX = hero.position.X;
      if (pressedKeys.ArrowLeft) newX -= HERO_SPEED;
      if (pressedKeys.ArrowRight) newX += HERO_SPEED;
      if (newX < 0) newX = 0;
      if (newX > SCREEN_WIDTH - HERO_SIZE) newX = SCREEN_WIDTH - HERO_SIZE;
      if (newX !== hero.position.X) hero.updatePosition({ X: newX });
    }, FRAME_RATE);
    return () => {
      clearInterval(intervalId);
    };
  }, [
    hero.position.X,
    pressedKeys.ArrowLeft,
    pressedKeys.ArrowRight,
    isGameOver,
  ]);

  useEffect(() => {
    if (isGameOver || isMainMenu) return;
    const intervalId = setInterval(() => {
      if (
        hero.position.Y === SCREEN_HEIGHT - HERO_SIZE &&
        velocityDown !== 0 &&
        !pressedKeys.ArrowUp
      ) {
        setVelocityDown(0);
      } else if (
        pressedKeys.ArrowUp &&
        hero.position.Y === SCREEN_HEIGHT - HERO_SIZE
      ) {
        setVelocityDown(-HERO_JUMP_SPEED);
      } else if (
        velocityDown < MAX_HERO_VELOCITY_DOWN &&
        !pressedKeys.ArrowDown
      ) {
        setVelocityDown(velocityDown + HERO_GRAVITY);
      } else if (pressedKeys.ArrowDown) {
        setVelocityDown(velocityDown + HERO_GRAVITY * 2);
      } else {
        setVelocityDown(MAX_HERO_VELOCITY_DOWN);
      }

      let newY = hero.position.Y;

      newY += velocityDown;
      if (newY < 0) newY = 0;
      if (newY > SCREEN_HEIGHT - HERO_SIZE) newY = SCREEN_HEIGHT - HERO_SIZE;
      if (newY !== hero.position.Y) hero.updatePosition({ Y: newY });
    }, FRAME_RATE);
    return () => {
      clearInterval(intervalId);
    };
  }, [
    hero.position.Y,
    pressedKeys.ArrowUp,
    pressedKeys.ArrowDown,
    velocityDown,
    isGameOver,
  ]);
}
