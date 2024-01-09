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
    <div className="border-4 border-black">
      <div
        id="canvas"
        {...rest}
        className={classNames("relative h-[30rem] w-[50rem]", className)}
      >
        {children}
      </div>
    </div>
  );
}
