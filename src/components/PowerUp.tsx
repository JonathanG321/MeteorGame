import classNames from "classnames";
import { createObjectStyle } from "../utils/lib";
import { FallingObject } from "../utils/types";
import { OBJECT_SIZE } from "../utils/variables";
import heart from "../assets/PixelHeart.png";

export default function PowerUp({ object }: { object: FallingObject }) {
  const style = createObjectStyle(object, OBJECT_SIZE);
  let texture = "";
  switch (object.type) {
    case "health":
      texture = heart;
      break;
  }
  return (
    <img
      src={texture}
      style={style}
      className={classNames("absolute", object.type, {
        "bg-purple-500": object.type !== "health",
      })}
    />
  );
}
