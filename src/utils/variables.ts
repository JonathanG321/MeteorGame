import { NullablePosition, Player, NullablePlayer, PressedKeys } from "./types";

export const HEADER_HEIGHT = 80;
export const SCREEN_HEIGHT = 480;

export const GAME_HEIGHT = SCREEN_HEIGHT + HEADER_HEIGHT;
export const SCREEN_WIDTH = 800;
export const WIDTH_SCALE = SCREEN_WIDTH / GAME_HEIGHT;
export const BORDER_WIDTH = 4;

export const BASE_FPS = 60;
export const FRAME_RATE = Math.floor(1000 / BASE_FPS);
export const NORMAL_FPS = BASE_FPS * 2;

export const STAGE_LENGTH = 50 * NORMAL_FPS;
export const STAGE_DIFFICULTY_SCALE = 1.25;
export const STARTING_STAGE = 1;
export const STARTING_POINT = STARTING_STAGE * STAGE_LENGTH - STAGE_LENGTH + 1;

export const HERO_SIZE = 30;

export const WIDTH_MINUS_HERO = SCREEN_WIDTH - HERO_SIZE - BORDER_WIDTH * 2;
export const HEIGHT_MINUS_HERO = SCREEN_HEIGHT - HERO_SIZE - BORDER_WIDTH;

export const HERO_SPEED = 6;
export const HERO_JUMP_SPEED = 20;
export const HERO_FLIGHT_SPEED = 7;
export const HERO_GRAVITY = 1;
export const MAX_HERO_VELOCITY_DOWN = 10;

export const METEOR_SPAWN_CHANCE = 3; // chance for a meteor to actually spawn on attempt
export const SPECIAL_METEOR_SPAWN_CHANCE = 0.15; // chance for a special meteor to actually spawn on attempt
export const SPECIAL_METEOR_SPAWN_ANGLE = 1;
export const SPECIAL_METEOR_EXPLOSION_CHANCE = 1;
export const OBJECT_GRAVITY = 2;
export const MIN_GRAVITY_INTERVAL = 0.5;
export const OBJECT_SIZE = 60;
export const SPECIAL_METEOR_SIZE = 110;
export const OBJECT_COLLISION_THRESHOLD = 0.25; // this is a percentage of the objects radius
export const OBJECT_STARTING_HEIGHT = -(OBJECT_SIZE * 2);
export const MIN_OBJECT_SIZE_MODIFIER = -8;
export const MAX_OBJECT_SIZE_MODIFIER = 15;
export const OBJECT_SIZE_VARIATION = 0.25;
export const OBJECT_ANGLE_VARIATION = 1;
export const MASK_FACTOR = 2.5;

export const NULL_POSITION: NullablePosition = {
  X: null,
  Y: null,
};

export const INVINCIBILITY_DURATION = 1; // This is in seconds
export const SHIELD_DURATION = 20; // This is in seconds
export const FLIGHT_DURATION = 15; // This is in seconds
export const SHIELD_HIT_DELAY = 30; // This is in frames
export const SLOW_DURATION = 10; // This is in seconds

export const WARNING_DURATION = 2 * NORMAL_FPS;
export const NEW_INVINCIBLE_COUNT = INVINCIBILITY_DURATION * NORMAL_FPS;
export const NEW_SHIELD_COUNT = SHIELD_DURATION * NORMAL_FPS;
export const NEW_FLIGHT_COUNT = FLIGHT_DURATION * NORMAL_FPS;
export const NEW_SLOW_COUNT = SLOW_DURATION * BASE_FPS;

export const POWER_UP_SPAWN_CHANCE = 0.35; // chance of a powerUp actually spawn on attempt

export const POINTS_ANIMATION_WIDTH = 100;
export const POINTS_ANIMATION_DURATION = 40;
export const POINTS_ANIMATION_OFFSET_X = 30;
export const POINTS_ANIMATION_OFFSET_Y = 20;
export const EXPLOSION_ANIMATION_DURATION = 1000;
export const EXPLOSION_SIZE_OFFSET = 50;
export const EXPLOSION_HEIGHT_OFFSET = 20;
export const HALF_OVER_PI = 180 / Math.PI;

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
