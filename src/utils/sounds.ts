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

export default {
  theme: new Audio(theme),
  gameOver: new Audio(gameOver),
  jump: new Audio(jump),
  hit: new Audio(hit),
  coin: new Audio(coin),
  coins: new Audio(coins),
  coinBag: new Audio(coinBag),
  timeResume: new Audio(timeResume),
  timeSlow: new Audio(timeSlow),
  clockTicking: new Audio(clockTicking),
  shield: new Audio(shield),
  life: new Audio(life),
};
