import classNames from "classnames";
import heart from "../assets/images/powerUps/PixelHeart.png";
import darkHeart from "../assets/images/powerUps/PixelHeartDark.png";
import { useContext } from "react";
import { GameStateContext } from "../context/GameStateContext";

type Props = { lives: number; start?: boolean };

export default function LivesDisplay({ lives, start = false }: Props) {
  const { scale } = useContext(GameStateContext);

  const size = 48 * scale;

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
          <div
            key={i + heart}
            style={{ height: size, width: size }}
            className="m-1"
          >
            <img
              src={i < lives ? heart : darkHeart}
              width={size}
              height={size}
            />
          </div>
        );
      })}
    </div>
  );
}
