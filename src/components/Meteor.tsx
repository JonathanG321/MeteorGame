import { createObjectStyle } from "../utils/lib";
import { Position } from "../utils/types";
import { OBJECT_SIZE } from "../utils/variables";
import meteor from "../assets/PixelMeteor.gif";

export default function Meteor({ position }: { position: Position }) {
  const style = createObjectStyle(position, OBJECT_SIZE);
  return (
    <div
      style={{
        ...style,
        // backgroundImage: `url(${meteor})`,
        // backgroundRepeat: "no-repeat",
        // backgroundPosition: "bottom",
        // backgroundSize: "cover",
      }}
      className="meteor absolute"
    >
      <img src={meteor} className="absolute bottom-0" />
    </div>
  );
}
