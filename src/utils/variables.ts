import { FallingObjectType } from "./types";

export const BASE_FPS = 60;
export const FRAME_RATE = Math.floor(1000 / BASE_FPS);
export const NORMAL_FPS = BASE_FPS * 2;
export const STAGE_LENGTH = 60 * NORMAL_FPS;
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
export const METEOR_SPAWN_CHANCE = 3; // chance of a meteor actually spawn on attempt
export const OBJECT_GRAVITY = 2;
export const OBJECT_SIZE = 60;
export const OBJECT_COLLISION_THRESHOLD = 8;
export const OBJECT_STARTING_HEIGHT = -(OBJECT_SIZE * 2);
export const MASK_FACTOR = 2.5;

export const INVINCIBILITY_DURATION = 1; // This is in seconds
export const SHIELD_DURATION = 20; // This is in seconds
export const SLOW_DURATION = 10; // This is in seconds

export const SHIELD_WARNING_DURATION = 2 * NORMAL_FPS;
export const NEW_INVINCIBLE_COUNT = INVINCIBILITY_DURATION * NORMAL_FPS;
export const NEW_SHIELD_COUNT = SHIELD_DURATION * NORMAL_FPS;
export const NEW_SLOW_COUNT = SLOW_DURATION * BASE_FPS;

export const POWER_UP_LIST: FallingObjectType[] = [
  "health",
  "pointsSmall",
  "pointsMedium",
  "pointsLarge",
  "shield",
  "slow",
];
export const POWER_UP_SPAWN_CHANCE = 0.35; // chance of a powerUp actually spawn on attempt

export const BASE_PRESSED_KEYS = {
  ArrowUp: false,
  ArrowDown: false,
  ArrowLeft: false,
  ArrowRight: false,
};
