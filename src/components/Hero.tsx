import { useContext } from "react";
import classNames from "classnames";
import { HERO_SIZE, SHIELD_WARNING_DURATION } from "../utils/variables";
import { GameStateContext } from "../context/GameStateContext";
import { createObjectStyle } from "../utils/lib";
import shield from "../assets/PixelShield.png";

export default function Hero() {
  const {
    hero: { position },
    invincibleCount,
    shieldCount,
  } = useContext(GameStateContext);
  const style = createObjectStyle(position, HERO_SIZE);
  const scale = 4;
  const newHeightNumber = parseInt(style.height.slice(0, -2));
  const newWidthNumber = parseInt(style.width.slice(0, -2));
  const newHeight = newHeightNumber + scale * 2 + "px";
  const newWidth = newWidthNumber + scale * 2 + "px";
  return (
    <div style={style} className="absolute">
      {!!shieldCount &&
        (shieldCount > SHIELD_WARNING_DURATION ||
          (shieldCount * 2) % 4 === 0 ||
          (shieldCount * 2) % 3 === 0) && (
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
      <div
        id="hero"
        style={{ height: style.height, width: style.width }}
        className={classNames("absolute", {
          "bg-green-500": invincibleCount > 0,
          "bg-blue-500": invincibleCount <= 0,
        })}
      />
    </div>
  );
}
