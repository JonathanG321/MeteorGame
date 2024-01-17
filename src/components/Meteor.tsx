import { createObjectStyle } from "../utils/lib";
import { Position } from "../utils/types";
import { OBJECT_SIZE } from "../utils/variables";

export default function Meteor({ position }: { position: Position }) {
  const style = createObjectStyle(position, OBJECT_SIZE);
  return <div style={style} className="meteor absolute bg-red-500" />;
}
