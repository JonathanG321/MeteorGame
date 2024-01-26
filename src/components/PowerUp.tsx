import classNames from "classnames";
import { createObjectStyle } from "../utils/lib";
import { FallingObject } from "../utils/types";
import { OBJECT_SIZE } from "../utils/variables";
import heart from "../assets/images/powerUps/PixelHeart.png";
import pointsSmall from "../assets/images/powerUps/PixelCoin.gif";
import pointsMedium from "../assets/images/powerUps/PixelCrown.png";
import pointsLarge from "../assets/images/powerUps/PixelGemstone.gif";
import shield from "../assets/images/powerUps/PixelShield.png";
import hourglass from "../assets/images/powerUps/PixelHourglass.png";

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
      texture = hourglass;
      break;
  }
  return (
    <div
      style={style}
      {...style}
      className={classNames("absolute", object.type, {
        "bg-purple-500": object.type === "meteor",
      })}
    >
      <img src={texture} className={classNames("absolute", "left-0")} />
    </div>
  );
}
