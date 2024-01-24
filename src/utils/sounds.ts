import timeSlow from "../assets/sounds/TimeSlow.mp3";
import timeResume from "../assets/sounds/TimeResume.mp3";
import clockTicking from "../assets/sounds/ClockTicking.mp3";
import coin from "../assets/sounds/Coin.mp3";
import coins from "../assets/sounds/Coins.mp3";
import coinBag from "../assets/sounds/CoinBag.mp3";
import hit from "../assets/sounds/Hit.mp3";
import shield from "../assets/sounds/Shield.mp3";
import life from "../assets/sounds/Life.mp3";
import theme from "../assets/sounds/Theme.mp3";
import gameOver from "../assets/sounds/GameOver.mp3";
import jump from "../assets/sounds/Jump.mp3";

export const themeSound = new Audio(theme);
export const gameOverSound = new Audio(gameOver);
export const jumpSound = new Audio(jump);
export const hitSound = new Audio(hit);
export const coinSound = new Audio(coin);
export const coinsSound = new Audio(coins);
export const coinBagSound = new Audio(coinBag);
export const timeResumeSound = new Audio(timeResume);
export const timeSlowSound = new Audio(timeSlow);
export const clockTickingSound = new Audio(clockTicking);
export const shieldSound = new Audio(shield);
export const lifeSound = new Audio(life);
