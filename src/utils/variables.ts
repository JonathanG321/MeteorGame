export const FRAME_RATE = 1000 / 60;
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
export const METEOR_SIZE = 40;
export const METEORS_PER_SECOND = 10;
export const METEOR_GRAVITY = 10;
export const METEOR_STARTING_HEIGHT = -(METEOR_SIZE * 2);
export const METEOR_COLLISION_THRESHOLD = 5;
export const MASK_FACTOR = 2.5;
export const INVINCIBILITY_DURATION = 2; // This is in seconds

export const BASE_PRESSED_KEYS = {
  ArrowUp: false,
  ArrowDown: false,
  ArrowLeft: false,
  ArrowRight: false,
};
