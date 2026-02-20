import Phaser from "phaser";

export default class Tutorial extends Phaser.Scene {
  constructor() {
    super("Tutorial");
  }

  init() {
    this.gameHeight = this.game.config.height;
    this.gameWidth = this.game.config.width;
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
