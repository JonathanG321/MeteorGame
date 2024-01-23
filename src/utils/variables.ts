import { FallingObjectType } from "./types";

export const FPS = 60;
export const FRAME_RATE = Math.floor(1000 / FPS);
export const SCREEN_HEIGHT = 480;
export const SCREEN_WIDTH = 800;
export const HERO_SIZE = 30;
export const HERO_SPEED = 6;
export const HERO_JUMP_SPEED = 20;
export const HERO_GRAVITY = 1;
export const MAX_HERO_VELOCITY_DOWN = 10;
export const HERO_SPAWN_POINT = {
  X: SCREEN_WIDTH / 2 - HERO_SIZE,
  Y: SCREEN_HEIGHT - HERO_SIZE,
};
export const METEOR_SPAWN_CHANCE = 15; // chance of a meteor actually spawn on attempt
export const OBJECT_GRAVITY = 4;
export const OBJECT_SIZE = 60;
export const OBJECT_COLLISION_THRESHOLD = 8;
export const OBJECT_STARTING_HEIGHT = -(OBJECT_SIZE * 2);
export const MASK_FACTOR = 2.5;

export const INVINCIBILITY_DURATION = 1; // This is in seconds
export const SHIELD_DURATION = 20; // This is in seconds
export const SLOW_DURATION = 10; // This is in seconds

export const SHIELD_WARNING_DURATION = 3 * FPS;
export const NEW_INVINCIBLE_COUNT = INVINCIBILITY_DURATION * FPS * 2;
export const NEW_SHIELD_COUNT = SHIELD_DURATION * FPS * 2;
export const NEW_SLOW_COUNT = SLOW_DURATION * FPS;

export const POWER_UP_LIST: FallingObjectType[] = [
  "health",
  "pointsSmall",
  "pointsMedium",
  "pointsLarge",
  "shield",
  "slow",
];
export const POWER_UP_SPAWN_RATE = 0.3; // amount of attempts to spawn power-ups per second
export const POWER_UP_SPAWN_CHANCE = 2; // chance of a powerUp actually spawn on attempt

export const BASE_PRESSED_KEYS = {
  ArrowUp: false,
  ArrowDown: false,
  ArrowLeft: false,
  ArrowRight: false,
};
