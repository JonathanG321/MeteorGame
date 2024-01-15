import { Position } from "../utils/types";
import { METEOR_SIZE } from "../utils/variables";

export default function Meteor({ position }: { position: Position }) {
  const style = {
    top: position.Y + "px",
    left: position.X + "px",
    height: METEOR_SIZE + "px",
    width: METEOR_SIZE + "px",
  };
  return <div style={style} className="meteor absolute bg-red-500" />;
}
