import MeteorHero from "./components/MeteorHero";
import { GAME_HEIGHT, SCREEN_WIDTH } from "./utils/variables";
import parchment from "./assets/images/PixelParchment.png";

export default function App() {
  return (
    <div
      style={{ backgroundImage: `url(${parchment})` }}
      className="flex h-screen w-full items-center justify-center bg-cover bg-center bg-no-repeat"
    >
      <MeteorHero height={GAME_HEIGHT} width={SCREEN_WIDTH} />
    </div>
  );
}
