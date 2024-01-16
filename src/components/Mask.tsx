import classNames from "classnames";
import { MASK_FACTOR, METEOR_SIZE } from "../utils/variables";
import { PropsWithChildren } from "react";

type Props = PropsWithChildren<{
  className?: string;
  top: number;
}>;

export default function Mask({ top, className, children }: Props) {
  const height =
    METEOR_SIZE * MASK_FACTOR > 80 ? METEOR_SIZE * MASK_FACTOR : 80;
  return (
    <div
      style={{ height: METEOR_SIZE * MASK_FACTOR, top }}
      className={classNames(
        "absolute z-20 flex w-full flex-col justify-end bg-white",
        className
      )}
    >
      {children}
    </div>
  );
}
