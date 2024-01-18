import { FallingObjectType } from "../utils/types";

export default function usePowerUps(
  hitObjectType: FallingObjectType | null,
  setLives: React.Dispatch<React.SetStateAction<number>>,
  setPoints: React.Dispatch<React.SetStateAction<number>>,
  setHitObjectType: React.Dispatch<
    React.SetStateAction<FallingObjectType | null>
  >
) {
  switch (hitObjectType) {
    case "health":
      setLives((previousLives) => (previousLives >= 3 ? 3 : previousLives + 1));
      break;
    case "pointsSmall":
      setPoints((previousPoints) => previousPoints + 3000);
      break;
    case "pointsMedium":
      setPoints((previousPoints) => previousPoints + 5000);
      break;
    case "pointsLarge":
      setPoints((previousPoints) => previousPoints + 10000);
      break;
  }
  if (!!hitObjectType) setHitObjectType(null);
}
