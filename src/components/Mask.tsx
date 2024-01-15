import classNames from "classnames";
import { MASK_FACTOR, METEOR_SIZE } from "../utils/variables";

type Props = {
  className?: string;
  top: number;
};

export default function Mask({ top, className }: Props) {
  return (
    <div
      style={{ height: METEOR_SIZE * MASK_FACTOR, top }}
      className={classNames("absolute z-20 w-full bg-white", className)}
    />
  );
}
