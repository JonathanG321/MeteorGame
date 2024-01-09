import { PropsWithChildren } from "react";
import classNames from "classnames";

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
      className={classNames(
        "h-[30rem] w-[50rem] border-4 border-black",
        className
      )}
    >
      {children}
    </div>
  );
}
