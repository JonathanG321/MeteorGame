import classNames from "classnames";
import { createObjectStyle } from "../utils/lib";
import { FallingObject } from "../utils/types";
import heart from "../assets/images/powerUps/PixelHeart.png";
import pointsSmall from "../assets/images/powerUps/PixelCoin.gif";
import pointsMedium from "../assets/images/powerUps/PixelCrown.png";
import pointsLarge from "../assets/images/powerUps/PixelGemstone.gif";
import shield from "../assets/images/powerUps/PixelShield.png";
import hourglass from "../assets/images/powerUps/PixelHourglass.png";

export default function PowerUp({
  powerUpObject,
}: {
  powerUpObject: FallingObject;
}) {
  const style = createObjectStyle(powerUpObject);
  let texture = "";
  switch (powerUpObject.type) {
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
      className={classNames("absolute", powerUpObject.type)}
    >
      <img src={texture} className={classNames("absolute", "left-0")} />
    </div>
  );
}
