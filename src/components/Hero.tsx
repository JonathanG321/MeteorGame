import { useContext } from "react";
import { GameStateContext } from "../context/GameStateContext";
import { HERO_SIZE, SHIELD_WARNING_DURATION } from "../utils/variables";
import {
  createObjectStyle,
  isValidPosition,
  shouldShowFlash,
} from "../utils/lib";
import { NullablePlayer } from "../utils/types";
import shield from "../assets/images/powerUps/PixelShield.png";
import knightRightImage from "../assets/images/heroSprites/PixelKnightRight.png";
import knightLeftImage from "../assets/images/heroSprites/PixelKnightLeft.png";
import knightTwoRightImage from "../assets/images/heroSprites/PixelKnightTwoRight.png";
import knightTwoLeftImage from "../assets/images/heroSprites/PixelKnightTwoLeft.png";

type Props = {
  player: NullablePlayer;
  isPlayerTwo?: boolean;
};

export default function Hero({ player, isPlayerTwo = false }: Props) {
  const { slowCount, scale: gameScale } = useContext(GameStateContext);
  if (!isValidPosition(player)) return null;
  const style = createObjectStyle({
    ...player,
    size: HERO_SIZE * gameScale,
    id: "",
  });
  const { shieldCount, invincibleCount, direction } = player;
  const shieldScale = 4 * gameScale;
  const newHeightNumber = parseInt(style.height.slice(0, -(2 * gameScale)));
  const newWidthNumber = parseInt(style.width.slice(0, -(2 * gameScale)));
  const newHeight = newHeightNumber + shieldScale * 2 + "px";
  const newWidth = newWidthNumber + shieldScale * 2 + "px";

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
              top: -shieldScale,
              left: -shieldScale,
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
              direction === "right" ? knightRight : knightLeft
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
