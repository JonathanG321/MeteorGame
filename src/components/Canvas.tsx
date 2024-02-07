import { PropsWithChildren } from "react";
import classNames from "classnames";
import castle from "../assets/images/PixelCastle.png";

export default function Canvas({
  children,
  className,
  height,
  width,
  ...rest
}: PropsWithChildren<
  React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > & { height: number; width: number }
>) {
  return (
    <div
      id="canvas"
      {...rest}
      style={{
        height,
        width,
        backgroundImage: `url(${castle})`,
      }}
      className={classNames(
        `relative overflow-hidden border-x-4 border-b-4 border-black bg-cover bg-center bg-no-repeat`,
        className
      )}
    >
      {children}
    </div>
  );
}
