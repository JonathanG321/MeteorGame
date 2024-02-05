import classNames from "classnames";
import { createObjectStyle } from "../utils/lib";
import { FallingObject as TypeFallingObject } from "../utils/types";
import heart from "../assets/images/powerUps/PixelHeart.png";
import pointsSmall from "../assets/images/powerUps/PixelCoin.gif";
import pointsMedium from "../assets/images/powerUps/PixelCrown.png";
import pointsLarge from "../assets/images/powerUps/PixelGemstone.gif";
import shield from "../assets/images/powerUps/PixelShield.png";
import hourglass from "../assets/images/powerUps/PixelHourglass.png";
import meteor from "../assets/images/PixelMeteor.gif";
import specialMeteor from "../assets/images/SpecialPixelMeteor.gif";

type Props = {
  object: TypeFallingObject;
};

export default function FallingObject({ object }: Props) {
  const style = createObjectStyle(object);
  let texture = "";
  switch (object.type) {
    case "meteor":
      texture = meteor;
      break;
    case "specialMeteor":
      texture = specialMeteor;
      break;
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
      className={classNames("absolute", object.type)}
    >
      <img
        src={texture + `?dummy="${object.id}"`}
        className="absolute bottom-0 left-0"
      />
    </div>
  );
}
