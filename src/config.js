import { AUTO, Scale, Game } from "phaser";
import { Preload } from "./scenes/Preload";
import { Splash } from "./scenes/Splash";
import { Tutorial } from "./scenes/Tutorial";
import { Game as MainGame } from "./scenes/Game";

const config = {
  type: AUTO,
  width: 288,
  height: 512,
  parent: "game-container",
  backgroundColor: "#000000",
  physics: {
    default: "arcade",
  },
  pixelArt: true,
  scale: {
    mode: Scale.FIT,
    autoCenter: Scale.CENTER_BOTH,
  },
  scene: [Preload, Splash, Tutorial, MainGame],
};

const StartGame = (parent) => {
  return new Game({ ...config, parent });
};

export default StartGame;
