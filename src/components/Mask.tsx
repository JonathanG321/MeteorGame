import classNames from "classnames";
import { MASK_FACTOR, OBJECT_SIZE, SCREEN_WIDTH } from "../utils/variables";
import { PropsWithChildren } from "react";

type Props = PropsWithChildren<{
  className?: string;
  top: number;
}>;

export default function Mask({ top, className, children }: Props) {
  return (
    <div
      style={{
        height: OBJECT_SIZE * MASK_FACTOR,
        top,
        left: -4,
        width: SCREEN_WIDTH + 8,
      }}
      className={classNames(
        "absolute z-30 flex flex-col justify-end bg-white",
        className
      )}
    >
      {children}
    </div>
  );
}
