import MeteorHero from "./components/MeteorHero";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "./utils/variables";

export default function App() {
  return <MeteorHero height={SCREEN_HEIGHT} width={SCREEN_WIDTH} />;
}
