import classNames from "classnames";
import { MASK_FACTOR, OBJECT_SIZE, SCREEN_HEIGHT } from "../utils/variables";
import { PropsWithChildren } from "react";

type Props = PropsWithChildren<{
  className?: string;
  right?: number;
  left?: number;
}>;

export default function SideMask({ right, left, className, children }: Props) {
  const maskWidth = OBJECT_SIZE * MASK_FACTOR;
  return (
    <div
      style={{
        width: maskWidth,
        right,
        left,
        height: SCREEN_HEIGHT + maskWidth * 2,
        top: -maskWidth,
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
