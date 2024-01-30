import { useContext } from "react";
import { GameStateContext } from "../context/GameStateContext";
import { HERO_SIZE, SHIELD_WARNING_DURATION } from "../utils/variables";
import { createObjectStyle, shouldShowFlash } from "../utils/lib";
import { Direction, Position } from "../utils/types";
import shield from "../assets/images/powerUps/PixelShield.png";
import knightRightImage from "../assets/images/PixelKnightRight.png";
import knightLeftImage from "../assets/images/PixelKnightLeft.png";
import knightTwoRightImage from "../assets/images/PixelKnightTwoRight.png";
import knightTwoLeftImage from "../assets/images/PixelKnightTwoLeft.png";

type Props = {
  heroOriginPoint: Position;
  invincibleCount: number;
  shieldCount: number;
  lastDirection: Direction;
  isPlayerTwo?: boolean;
};

export default function Hero({
  heroOriginPoint,
  invincibleCount,
  shieldCount,
  lastDirection,
  isPlayerTwo = false,
}: Props) {
  const { slowCount } = useContext(GameStateContext);
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

  const knightRight = isPlayerTwo ? knightTwoRightImage : knightRightImage;
  const knightLeft = isPlayerTwo ? knightTwoLeftImage : knightLeftImage;

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
