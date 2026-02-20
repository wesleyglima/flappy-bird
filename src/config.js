import Preload from "./scenes/Preload";
import Tutorial from "./scenes/Tutorial";
import Game from "./scenes/Game";

const config = {
  type: Phaser.AUTO,
  width: 288,
  height: 512,
  parent: "game-container",
  backgroundColor: "#000000",
  physics: {
    default: "arcade",
  },
  pixelArt: true,
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
  scene: [Preload, Tutorial, Game],
};

const StartGame = (parent) => {
  return new Phaser.Game({ ...config, parent });
};

export default StartGame;
