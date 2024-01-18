import classNames from "classnames";
import { createObjectStyle } from "../utils/lib";
import { FallingObject } from "../utils/types";
import { OBJECT_SIZE } from "../utils/variables";
import heart from "../assets/PixelHeart.png";
import pointsSmall from "../assets/BronzePixelTrophy.png";
import pointsMedium from "../assets/SilverPixelTrophy.png";
import pointsLarge from "../assets/GoldPixelTrophy.png";

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
