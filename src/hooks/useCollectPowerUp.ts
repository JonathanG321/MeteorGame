import { FallingObject } from "../utils/types";

export default function useCollectPowerUp(
  powerUps: FallingObject[],
  setPowerUps: (powerUps: FallingObject[]) => void,
  hitPowerUpId: string
) {
  setPowerUps(powerUps.filter((powerUp) => powerUp.id !== hitPowerUpId));
}
