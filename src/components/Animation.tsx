import classNames from "classnames";
import { Animation } from "../utils/types";
import pointsSmall from "../assets/images/powerUps/PixelCoin.gif";
import explosion from "../assets/images/PixelExplosion.gif";
import { useContext, useEffect, useState } from "react";
import { GameStateContext } from "../context/GameStateContext";
import { createObjectStyle } from "../utils/lib";
import { POINTS_ANIMATION_DURATION } from "../utils/variables";

type Props = {
  animation: Animation;
};

export default function FallingObject({ animation }: Props) {
  const { setAnimationPositions, scale } = useContext(GameStateContext);
  const [offset, setOffset] = useState(0);
  const style = createObjectStyle({ ...animation, Y: animation.Y - offset });
  let points: number | null = null;

  if (animation.type === "points") points = animation.points;

  useEffect(() => {
    const intervalId = setInterval(() => setOffset((prev) => prev + 1), 40);
    setTimeout(() => {
      setAnimationPositions((prev) =>
        prev.filter((ani) => ani.id !== animation.id)
      );
    }, POINTS_ANIMATION_DURATION);
    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return (
    <div
      style={style}
      className={classNames(
        "font-outline-1 absolute flex text-white",
        animation.type
      )}
    >
      {animation.type === "points" && (
        <>
          <div>+{animation.points}</div>
          <img
            src={pointsSmall}
            style={{
              marginTop: `${5 * scale}px`,
              height: `${17 * scale}px`,
              width: `${17 * scale}px`,
            }}
          />
        </>
      )}
      {animation.type === "explosion" && (
        <img
          src={explosion + `?dummy="${animation.id}"`}
          className="absolute bottom-0 left-0"
        />
      )}
    </div>
  );
}
