import classNames from "classnames";
import { createObjectStyle } from "../utils/lib";
import { FallingObject } from "../utils/types";
import { OBJECT_SIZE } from "../utils/variables";
import heart from "../assets/powerUps/PixelHeart.png";
import pointsSmall from "../assets/powerUps/BronzePixelTrophy.png";
import pointsMedium from "../assets/powerUps/SilverPixelTrophy.png";
import pointsLarge from "../assets/powerUps/GoldPixelTrophy.png";
import shield from "../assets/powerUps/PixelShield.png";
import clock from "../assets/powerUps/PixelClock.png";

export default function PowerUp({ object }: { object: FallingObject }) {
  const style = createObjectStyle(object, OBJECT_SIZE);
  let texture = "";
  switch (object.type) {
    case "health":
      texture = heart;
      break;
    case "pointsSmall":
      texture = pointsSmall;
      break;
    case "pointsMedium":
      texture = pointsMedium;
      break;
    case "pointsLarge":
      texture = pointsLarge;
      break;
    case "shield":
      texture = shield;
      break;
    case "slow":
      texture = clock;
      break;
  }
  return (
    <img
      src={texture}
      style={style}
      {...style}
      className={classNames("absolute", object.type, {
        "bg-purple-500": object.type === "meteor",
      })}
    />
  );
}
