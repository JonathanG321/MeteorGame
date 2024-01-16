import { PropsWithChildren } from "react";
import classNames from "classnames";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "../utils/variables";

export default function Canvas({
  children,
  className,
  ...rest
}: PropsWithChildren<
  React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>
>) {
  return (
    <div className="border-x-4 border-black">
      <div
        id="canvas"
        {...rest}
        style={{ height: SCREEN_HEIGHT, width: SCREEN_WIDTH }}
        className={classNames("relative", className)}
      >
        {children}
      </div>
    </div>
  );
}
