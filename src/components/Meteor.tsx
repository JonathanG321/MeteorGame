import { createObjectStyle } from "../utils/lib";
import { FallingObject } from "../utils/types";
import meteor from "../assets/images/PixelMeteor.gif";
import specialMeteor from "../assets/images/SpecialPixelMeteor.gif";

type Props = {
  meteorObject: FallingObject;
};

export default function Meteor({ meteorObject }: Props) {
  const style = createObjectStyle(meteorObject);
  const graphic = meteorObject.type === "meteor" ? meteor : specialMeteor;
  return (
    <div style={style} className="meteor absolute">
      <img src={graphic} className="absolute bottom-0" />
    </div>
  );
}
