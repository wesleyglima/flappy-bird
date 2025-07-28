import { Scene } from "phaser";

export class Tutorial extends Scene {
  constructor() {
    super("Tutorial");
  }

  get gameHeight() {
    return this.game.config.height;
  }

  get gameWidth() {
    return this.game.config.width;
  }

  create() {
    this.add.image(0, 0, "background-day").setOrigin(0);
    this.add
      .image(this.gameWidth / 2, this.gameHeight / 2, "tutorial")
      .setInteractive({ cursor: "pointer " })
      .on("pointerdown", () => this.startGame());

    this.input.keyboard.on("keydown-SPACE", () => this.startGame());
  }

  startGame() {
    this.scene.start("Game");
  }
}
