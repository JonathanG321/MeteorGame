import { PropsWithChildren } from "react";
import classNames from "classnames";
import castle from "../assets/images/PixelCastle.png";
import { BORDER_WIDTH } from "../utils/variables";

export default function Canvas({
  children,
  className,
  height,
  width,
  scale,
  ...rest
}: PropsWithChildren<
  React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > & { height: number; width: number; scale: number }
>) {
  const borderStyle = `${BORDER_WIDTH * scale}px`;
  return (
    <div
      id="canvas"
      {...rest}
      style={{
        height,
        width,
        borderLeftWidth: borderStyle,
        borderRightWidth: borderStyle,
        borderBottomWidth: borderStyle,
        borderTop: 0,
        backgroundImage: `url(${castle})`,
      }}
      className={classNames(
        `relative overflow-hidden border-black bg-cover bg-center bg-no-repeat`,
        className
      )}
    >
      {children}
    </div>
  );
}
