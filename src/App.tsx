import MeteorHero from "./components/MeteorHero";
import { GAME_HEIGHT, SCREEN_WIDTH } from "./utils/variables";
import bricks from "./assets/images/PixelBricks.jpeg";

export default function App() {
  return (
    <div
      style={{ backgroundImage: `url(${bricks})` }}
      className="flex h-screen w-full items-center justify-center bg-cover bg-center bg-no-repeat"
    >
      <MeteorHero height={GAME_HEIGHT} width={SCREEN_WIDTH} />
    </div>
  );
}
