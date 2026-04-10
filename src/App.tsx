import { Application, extend, useApplication, useTick } from "@pixi/react";
import {
  Assets,
  Container,
  Sprite,
  Texture,
  Text,
  Stage,
  Graphics,
} from "pixi.js";
import { useEffect, useRef, useState } from "react";
import "./main.css";
import Button from "./components/atoms/Button";

// extend tells @pixi/react what Pixi.js components are available
extend({
  Container,
  Sprite,
  Graphics,
  Text,
});

const BunnySprite = () => {
  const { app } = useApplication();

  // The Pixi.js `Sprite`
  const spriteRef = useRef<Sprite>(null);
  const [texture, setTexture] = useState(Texture.EMPTY);

  // Preload the sprite if it hasn't been loaded yet
  useEffect(() => {
    if (texture === Texture.EMPTY) {
      Assets.load("/assets/bunny.png").then((result) => {
        setTexture(result);
      });
    }
  }, [texture]);

  // Listen for animate update
  useTick((ticker) => {
    if (!spriteRef.current) return;
    // Just for fun, let's rotate mr rabbit a little.
    // * Delta is 1 if running at 100% performance *
    // * Creates frame-independent transformation *
    spriteRef.current.rotation += 0.1 * ticker.deltaTime;
  });

  return (
    <pixiSprite
      ref={spriteRef}
      texture={texture}
      anchor={0.5}
      x={app.screen.width / 2}
      y={app.screen.height / 2}
    />
  );
};

export default function App() {
  // We'll wrap our components with an <Application> component to provide
  // the Pxi.js Application context

  const canvasRef = useRef<HTMLDivElement>(null);
  return (
    <div className="appLayout">
      <section className="section mainSection">
        <div className="assetsLibrary">
          <h1>assets</h1>
        </div>
        <div className="canvasContainer" ref={canvasRef}>

        <Application background={"#1099bb"} resizeTo={canvasRef?.current}>
          <BunnySprite />
        </Application>
        </div>
        <div>
          <h1>idk</h1>
        </div>
      </section>

      <section>
        <h1>timeline</h1>
      </section>
    </div>
  );
}
