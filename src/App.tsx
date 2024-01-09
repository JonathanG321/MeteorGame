import { useState } from "react";
import Canvas from "./components/Canvas";
import $ from "jquery";

function App() {
  if (!window) return;
  // const [x, setX] = useState(0);
  // const [y, setY] = useState(0);
  const [delaying, setDelaying] = useState(false);
  document.addEventListener("keyup", (e) => {
    if (!delaying) {
      const hero = $("#hero");
      const top = parseInt(hero.css("top"));
      const left = parseInt(hero.css("left"));
      console.log(e.key);
      switch (e.key) {
        case "ArrowUp":
          if (top > 0) hero.css("top", (_, value) => parseInt(value) - 1);
        case "ArrowDown":
          if (top < 480) hero.css("top", (_, value) => parseInt(value) + 1);
        case "ArrowLeft":
          if (left > 0) hero.css("left", (_, value) => parseInt(value) - 1);
        case "ArrowRight":
          if (left < 800) hero.css("left", (_, value) => parseInt(value) + 1);
      }
      setDelaying(true);
      setTimeout(() => {
        setDelaying(false);
      }, 1000 / 30);
    }
  });
  // $("html").on("keydown", (e) => {
  //   if (!delaying) {
  //     switch (e.code) {
  //       case "ArrowUp":
  //         console.log("test");
  //         if (y > 0) setY(y - 1);
  //         break;
  //       case "ArrowDown":
  //         if (y < 480) setY(y + 1);
  //         break;
  //       case "ArrowLeft":
  //         if (x > 0) setX(x - 1);
  //         break;
  //       case "ArrowRight":
  //         if (x < 800) setX(x + 1);
  //         break;
  //     }
  //     setDelaying(true);
  //     setTimeout(() => {
  //       setDelaying(false);
  //     }, 1000 / 30);
  //   }
  // });

  return (
    <div className="flex h-screen w-full items-center justify-center">
      <Canvas>
        <div
          id="hero"
          style={{ top: 0, left: 0 }}
          className={`relative h-10 w-10 bg-red-500`}
        />
      </Canvas>
    </div>
  );
}

export default App;
