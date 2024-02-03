import { NullablePosition, PressedKeys } from "./types";

export const BASE_FPS = 60;
export const FRAME_RATE = Math.floor(1000 / BASE_FPS);
export const NORMAL_FPS = BASE_FPS * 2;

export const STAGE_LENGTH = 50 * NORMAL_FPS;
export const STAGE_DIFFICULTY_SCALE = 1.25;
export const STARTING_STAGE = 4;
export const STARTING_POINT = STARTING_STAGE * STAGE_LENGTH - STAGE_LENGTH + 1;

export const SCREEN_HEIGHT = 480;
export const SCREEN_WIDTH = 800;

export const HERO_SIZE = 30;

export const WIDTH_MINUS_HERO = SCREEN_WIDTH - HERO_SIZE;
export const HEIGHT_MINUS_HERO = SCREEN_HEIGHT - HERO_SIZE;

export const HERO_SPEED = 6;
export const HERO_JUMP_SPEED = 20;
export const HERO_GRAVITY = 1;
export const MAX_HERO_VELOCITY_DOWN = 10;
export const HERO_SPAWN_POINT: NullablePosition = {
  X: SCREEN_WIDTH / 2 - HERO_SIZE,
  Y: HEIGHT_MINUS_HERO,
};
export const FIRST_PLAYER_SPAWN_POINT: NullablePosition = {
  X: SCREEN_WIDTH / 3 - HERO_SIZE,
  Y: HEIGHT_MINUS_HERO,
};
export const SECOND_PLAYER_SPAWN_POINT: NullablePosition = {
  X: (SCREEN_WIDTH / 3) * 2 - HERO_SIZE,
  Y: HEIGHT_MINUS_HERO,
};
export const NULL_POSITION: NullablePosition = {
  X: null,
  Y: null,
};

export const METEOR_SPAWN_CHANCE = 3; // chance for a meteor to actually spawn on attempt
export const SPECIAL_METEOR_SPAWN_CHANCE = 0.15; // chance for a special meteor to actually spawn on attempt
export const SPECIAL_METEOR_SPAWN_RANGE = 100;
export const SPECIAL_METEOR_EXPLOSION_CHANCE = 1;
export const OBJECT_GRAVITY = 2;
export const MIN_GRAVITY_INTERVAL = 0.5;
export const OBJECT_SIZE = 60;
export const SPECIAL_METEOR_SIZE = 110;
export const OBJECT_COLLISION_THRESHOLD = 8;
export const OBJECT_STARTING_HEIGHT = -(OBJECT_SIZE * 2);
export const MIN_OBJECT_SIZE_MODIFIER = -8;
export const MAX_OBJECT_SIZE_MODIFIER = 15;
export const OBJECT_SIZE_VARIATION = 0.25;
export const MASK_FACTOR = 2.5;

export const INVINCIBILITY_DURATION = 1; // This is in seconds
export const SHIELD_DURATION = 20; // This is in seconds
export const SLOW_DURATION = 10; // This is in seconds

export const SHIELD_WARNING_DURATION = 2 * NORMAL_FPS;
export const NEW_INVINCIBLE_COUNT = INVINCIBILITY_DURATION * NORMAL_FPS;
export const NEW_SHIELD_COUNT = SHIELD_DURATION * NORMAL_FPS;
export const NEW_SLOW_COUNT = SLOW_DURATION * BASE_FPS;

export const POWER_UP_SPAWN_CHANCE = 0.35; // chance of a powerUp actually spawn on attempt

export const BASE_PRESSED_KEYS: PressedKeys = {
  ArrowUp: false,
  ArrowDown: false,
  ArrowLeft: false,
  ArrowRight: false,
  a: false,
  w: false,
  s: false,
  d: false,
};
