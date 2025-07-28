import { Scene } from "phaser";

export class Splash extends Scene {
  constructor() {
    super("Splash");
  }

  create() {
    this.add.image(0, 0, "intro").setOrigin(0);

    this.time.addEvent({
      delay: 3000,
      callback: () => this.scene.start("Tutorial"),
      callbackScope: this,
      loop: false,
    });
  }
}
