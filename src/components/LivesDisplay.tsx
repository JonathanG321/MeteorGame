import classNames from "classnames";
import heart from "../assets/images/powerUps/PixelHeart.png";
import darkHeart from "../assets/images/powerUps/PixelHeartDark.png";

type Props = { lives: number; start?: boolean };

export default function LivesDisplay({ lives, start = false }: Props) {
  return (
    <div
      className={classNames("flex", {
        "justify-start": start,
        "items-start": start,
        "justify-end": !start,
        "items-end": !start,
      })}
    >
      {Array.from({ length: 3 }).map((_, i) => {
        return (
          <div key={i + heart} className="m-1 h-12 w-12">
            <img src={i < lives ? heart : darkHeart} width={48} height={48} />
          </div>
        );
      })}
    </div>
  );
}
