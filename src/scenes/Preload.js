import { Scene } from "phaser";

export class Preload extends Scene {
  constructor() {
    super("Preload");
  }

  preload() {
    this.load.setPath("assets/sprites");
    this.load.image("intro", "intro.png");
    this.load.image("background-day", "background-day.png");
    this.load.image("background-night", "background-night.png");
    this.load.image("tutorial", "tutorial.png");
    this.load.spritesheet("bird", "bird.png", {
      frameWidth: 102 / 3,
      frameHeight: 24,
    });
    this.load.image("ground", "ground.png");
    this.load.image("pipe", "pipe.png");
    this.load.image("gameover", "gameover.png");
    this.load.image("play-button", "play-button.png");
    this.load.image("play-button-pressed", "play-button-pressed.png");

    this.load.setPath("assets/audios");
    this.load.audio("wing", "wing.ogg");
    this.load.audio("hit", "hit.ogg");
    this.load.audio("point", "point.ogg");
    this.load.audio("score-spark", "score-spark.ogg");

    this.load.setPath("assets/fonts");
    this.load.font("flappy-bird", "flappy-bird.ttf");
  }

  create() {
    this.scene.start("Splash");
  }
}
