export const FRAME_RATE = Math.floor(1000 / 60);
export const SCREEN_HEIGHT = 480;
export const SCREEN_WIDTH = 800;
export const HERO_SIZE = 20;
export const HERO_SPEED = 6;
export const HERO_JUMP_SPEED = 20;
export const HERO_GRAVITY = 1;
export const MAX_HERO_VELOCITY_DOWN = 10;
export const HERO_SPAWN_POINT = {
  X: SCREEN_WIDTH / 2 - HERO_SIZE,
  Y: SCREEN_HEIGHT - HERO_SIZE,
};
export const METEORS_PER_SECOND = 10;
export const OBJECT_GRAVITY = 10;
export const OBJECT_SIZE = 40;
export const OBJECT_COLLISION_THRESHOLD = 5;
export const OBJECT_STARTING_HEIGHT = -(OBJECT_SIZE * 2);
export const MASK_FACTOR = 2.5;
export const INVINCIBILITY_DURATION = 2; // This is in seconds

export const POWER_UP_SPAWN_RATE = 0.3; // amount of power-ups to spawn per second
export const POWER_UP_SPAWN_CHANCE = 50;
export const SHIELD_DURATION = 25; // This is in seconds
export const SHIELD_WARNING_DURATION = 3 * FRAME_RATE;

export const BASE_PRESSED_KEYS = {
  ArrowUp: false,
  ArrowDown: false,
  ArrowLeft: false,
  ArrowRight: false,
};
