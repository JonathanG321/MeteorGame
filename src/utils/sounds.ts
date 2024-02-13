import timeSlow from "../assets/sounds/TimeSlow.mp3";
import timeResume from "../assets/sounds/TimeResume.mp3";
import clockTicking from "../assets/sounds/ClockTicking.mp3";
import theme from "../assets/sounds/Theme.mp3";

const themeSound = new Audio(theme);

themeSound.loop = true;

export default {
  theme: themeSound,
  timeResume: new Audio(timeResume),
  timeSlow: new Audio(timeSlow),
  clockTicking: new Audio(clockTicking),
};
