import { FallingObjectType } from "../utils/types";

export default function usePowerUps(
  hitObjectType: FallingObjectType | null,
  setLives: React.Dispatch<React.SetStateAction<number>>,
  setHitObjectType: React.Dispatch<
    React.SetStateAction<FallingObjectType | null>
  >
) {
  if (hitObjectType === "health") {
    setLives((previousLives) => (previousLives >= 3 ? 3 : previousLives + 1));
    setHitObjectType(null);
  }
}
