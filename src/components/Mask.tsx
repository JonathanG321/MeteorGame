import classNames from "classnames";
import { MASK_FACTOR, OBJECT_SIZE } from "../utils/variables";
import { PropsWithChildren } from "react";

type Props = PropsWithChildren<{
  className?: string;
  top: number;
}>;

export default function Mask({ top, className, children }: Props) {
  return (
    <div
      style={{ height: OBJECT_SIZE * MASK_FACTOR, top }}
      className={classNames(
        "absolute z-20 flex w-full flex-col justify-end bg-white",
        className
      )}
    >
      {children}
    </div>
  );
}
