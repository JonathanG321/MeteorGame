import classNames from "classnames";
import { MASK_FACTOR, OBJECT_SIZE, SCREEN_HEIGHT } from "../utils/variables";
import { PropsWithChildren } from "react";

type Props = PropsWithChildren<{
  className?: string;
  right?: number;
  left?: number;
}>;

export default function SideMask({ right, left, className, children }: Props) {
  return (
    <div
      style={{
        width: OBJECT_SIZE * MASK_FACTOR,
        right,
        left,
        height: SCREEN_HEIGHT * 1.5,
        top: -OBJECT_SIZE * MASK_FACTOR,
      }}
      className={classNames(
        "absolute z-20 flex w-full flex-col justify-end border-black bg-white",
        className
      )}
    >
      {children}
    </div>
  );
}
