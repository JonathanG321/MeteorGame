import { PropsWithChildren } from "react";
import classNames from "classnames";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "../utils/variables";
import castle from "../assets/images/PixelCastle.png";

export default function Canvas({
  children,
  className,
  ...rest
}: PropsWithChildren<
  React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>
>) {
  return (
    <div
      id="canvas"
      {...rest}
      style={{
        height: SCREEN_HEIGHT,
        width: SCREEN_WIDTH,
        backgroundImage: `url(${castle})`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundSize: "cover",
      }}
      className={classNames("relative", className)}
    >
      {children}
    </div>
  );
}
