import { useContext } from "react";
import { HERO_SIZE, SHIELD_WARNING_DURATION } from "../utils/variables";
import { GameStateContext } from "../context/GameStateContext";
import {
  createObjectStyle,
  isValidPosition,
  shouldShowFlash,
} from "../utils/lib";
import shield from "../assets/images/powerUps/PixelShield.png";
import knightRight from "../assets/images/PixelKnightRight.png";
import knightLeft from "../assets/images/PixelKnightLeft.png";
import { Direction, NullablePosition } from "../utils/types";

type Props = {
  heroOriginPoint: NullablePosition;
  invincibleCount: number;
  shieldCount: number;
  lastDirection: Direction;
};

export default function Hero({
  heroOriginPoint,
  invincibleCount,
  shieldCount,
  lastDirection,
}: Props) {
  const { slowCount } = useContext(GameStateContext);
  if (!isValidPosition(heroOriginPoint)) return null;
  const style = createObjectStyle({
    ...heroOriginPoint,
    size: HERO_SIZE,
    id: "",
  });
  const scale = 4;
  const newHeightNumber = parseInt(style.height.slice(0, -2));
  const newWidthNumber = parseInt(style.width.slice(0, -2));
  const newHeight = newHeightNumber + scale * 2 + "px";
  const newWidth = newWidthNumber + scale * 2 + "px";

  return (
    <div style={style} className="absolute">
      {!!shieldCount &&
        (shieldCount > SHIELD_WARNING_DURATION ||
          shouldShowFlash(shieldCount, !!slowCount)) && (
          <img
            src={shield}
            style={{
              top: -scale,
              left: -scale,
              height: newHeight,
              minWidth: newWidth,
            }}
            height={newHeightNumber}
            width={newWidthNumber}
            className="absolute z-20 opacity-70"
          />
        )}
      {shouldShowFlash(invincibleCount, !!slowCount) && (
        <div
          id="hero"
          style={{
            height: style.height,
            width: style.width,
            backgroundImage: `url(${
              lastDirection === "right" ? knightRight : knightLeft
            })`,
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            backgroundSize: "cover",
          }}
          className="absolute"
        />
      )}
    </div>
  );
}
