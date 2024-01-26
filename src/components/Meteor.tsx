import { createObjectStyle } from "../utils/lib";
import { FallingObject } from "../utils/types";
import meteor from "../assets/images/PixelMeteor.gif";

type Props = {
  meteorObject: FallingObject;
};

export default function Meteor({ meteorObject }: Props) {
  const style = createObjectStyle(meteorObject);
  return (
    <div style={style} className="meteor absolute">
      <img src={meteor} className="absolute bottom-0" />
    </div>
  );
}
