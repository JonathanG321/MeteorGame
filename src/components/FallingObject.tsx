import classNames from "classnames";
import { useContext } from "react";
import { createObjectStyle } from "../utils/lib";
import { FallingObject as TypeFallingObject } from "../utils/types";
import wing from "../assets/images/powerUps/Wing.png";
import heart from "../assets/images/powerUps/PixelHeart.png";
import pointsSmall from "../assets/images/powerUps/PixelCoin.gif";
import pointsMedium from "../assets/images/powerUps/PixelCrown.png";
import pointsLarge from "../assets/images/powerUps/PixelGemstone.gif";
import shield from "../assets/images/powerUps/PixelShield.png";
import hourglass from "../assets/images/powerUps/PixelHourglass.png";
import meteor from "../assets/images/PixelMeteor.gif";
import specialMeteor from "../assets/images/SpecialPixelMeteor.gif";
import { GameStateContext } from "../context/GameStateContext";

type Props = {
  object: TypeFallingObject;
};

export default function FallingObject({ object }: Props) {
  const { scale } = useContext(GameStateContext);
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
    case "flight":
      texture = wing;
      break;
  }

  const rotationStyle = {
    transform: `rotate(${object.rotationAngle}deg)`,
  };

  const graphicId = `?dummy="${object.id}"`;

  return (
    <div
      style={{ ...style, ...rotationStyle }}
      className={classNames("absolute", object.type)}
    >
      <img
        src={texture + graphicId}
        style={{
          marginBottom: object.type === "meteor" ? `${2 * scale}px` : 0,
        }}
        className="absolute bottom-0 left-0"
      />
    </div>
  );
}
