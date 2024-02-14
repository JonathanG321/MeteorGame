import { useContext } from "react";
import { GameStateContext } from "../context/GameStateContext";
import { HERO_SIZE, WARNING_DURATION } from "../utils/variables";
import {
  createObjectStyle,
  isValidPosition,
  shouldShowFlash,
} from "../utils/lib";
import { NullablePlayer } from "../utils/types";
import shield from "../assets/images/powerUps/PixelShield.png";
import wings from "../assets/images/powerUps/Wings.gif";
import knightRightImage from "../assets/images/heroSprites/PixelKnightRight.png";
import knightLeftImage from "../assets/images/heroSprites/PixelKnightLeft.png";
import knightTwoRightImage from "../assets/images/heroSprites/PixelKnightTwoRight.png";
import knightTwoLeftImage from "../assets/images/heroSprites/PixelKnightTwoLeft.png";
import classNames from "classnames";

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
  const { shieldCount, invincibleCount, direction, flightCount } = player;
  const shieldScale = 4 * gameScale;
  const wingScale = 15 * gameScale;

  const knightRight = isPlayerTwo ? knightTwoRightImage : knightRightImage;
  const knightLeft = isPlayerTwo ? knightTwoLeftImage : knightLeftImage;

  return (
    <div style={style} className="absolute">
      <PowerUpOverlay
        count={shieldCount}
        style={style}
        image={shield}
        imageScale={shieldScale}
        className="z-20 opacity-70"
      />
      <PowerUpOverlay
        count={flightCount}
        style={style}
        image={wings}
        imageScale={wingScale}
      />
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
          className="absolute z-10"
        />
      )}
    </div>
  );
}

type powerUpOverlayProps = {
  count: number;
  image: string;
  imageScale: number;
  style: {
    top: string;
    left: string;
    height: string;
    width: string;
  };
  className?: string;
};

function PowerUpOverlay({
  count,
  image,
  style,
  imageScale,
  className,
}: powerUpOverlayProps) {
  const { slowCount, scale: gameScale } = useContext(GameStateContext);
  const isPowerUpActive = count > 0;
  if (
    !isPowerUpActive ||
    (count < WARNING_DURATION && !shouldShowFlash(count, !!slowCount))
  )
    return null;
  const scaledOffset = 2 * gameScale;
  const heightNumber = parseInt(style.height.slice(0, -scaledOffset));
  const widthNumber = parseInt(style.width.slice(0, -scaledOffset));

  const height = heightNumber + imageScale * scaledOffset + "px";
  const width = widthNumber + imageScale * scaledOffset + "px";

  return (
    <img
      src={image}
      style={{
        top: -imageScale,
        left: -imageScale,
        height,
        minWidth: width,
      }}
      className={classNames("absolute", className)}
    />
  );
}
