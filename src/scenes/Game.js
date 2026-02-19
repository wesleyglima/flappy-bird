import Phaser from "phaser";

export default class Game extends Phaser.Scene {
  constructor() {
    super("Game");

    this.isGameRunning = true;
    this.isDayTime = true;
    this.dayNightCycleEventTimeDelay = 1000 * 60;
    this.birdGravity = 600;
    this.birdFlappyVelocity = 300;
    this.pipesSpawnEventTimeDelay = 1500;
    this.pipesVelocity = 200;
    this.spaceBetweenPipesRange = [100, 120];
    this.pairPipes = [];
  }

  get gameHeight() {
    return this.game.config.height;
  }

  get gameWidth() {
    return this.game.config.width;
  }

  create() {
    this.createAnimations();
    this.createSoundEffects();
    this.createBackground();
    this.createDayNightCycleEventTime();
    this.createGround();
    this.createBird();
    this.createControls();
    this.createGroups();
    this.createPipesSpawnEventTime();
    this.createCollisions();
    this.createScore();
  }

  update() {
    if (!this.isGameRunning) return;

    this.background.tilePositionX += 0.5;

    const { space } = this.cursors;

    const isSpaceJustDown = Phaser.Input.Keyboard.JustDown(space);

    if (isSpaceJustDown) this.flappyBird();

    if (this.bird.getBounds().top <= 0) this.gameOver();

    this.pipes.getChildren().forEach((pipe) => {
      if (pipe.getBounds().right <= 0) {
        this.pairPipes.push(pipe);

        if (this.pairPipes.length === 2) {
          this.increaseScore();
          this.pairPipes = [];
        }

        pipe.destroy();
      }
    });
  }

  createAnimations() {
    this.anims.create({
      key: "flying-bird",
      frames: this.anims.generateFrameNumbers("bird", {
        start: 0,
        end: 2,
      }),
      frameRate: 12,
      repeat: -1,
    });
  }

  createSoundEffects() {
    this.flappySound = this.sound.add("wing");
    this.hitSound = this.sound.add("hit");
    this.pointSound = this.sound.add("point");
    this.scoreSparkSound = this.sound.add("score-spark");
  }

  createBackground() {
    this.background = this.add
      .tileSprite(0, 0, this.gameWidth, this.gameHeight, "background-day")
      .setOrigin(0);
  }

  toogleDayNight() {
    this.isDayTime = !this.isDayTime;

    const backgroundTextureKey = this.isDayTime
      ? "background-day"
      : "background-night";

    this.background.setTexture(backgroundTextureKey);
  }

  createDayNightCycleEventTime() {
    this.dayNightCycleEventTime = this.time.addEvent({
      delay: this.dayNightCycleEventTimeDelay,
      callback: this.toogleDayNight,
      callbackScope: this,
      loop: true,
    });
  }

  createGround() {
    this.ground = this.physics.add
      .sprite(0, this.gameHeight, "ground")
      .setOrigin(0, 1)
      .setImmovable()
      .setDepth(1);
  }

  createBird() {
    this.bird = this.physics.add
      .sprite(
        this.gameWidth * 0.15,
        (this.gameHeight - this.ground.height) / 2,
        "bird",
      )
      .setBodySize(26, 20)
      .setCollideWorldBounds()
      .setGravityY(this.birdGravity)
      .play("flying-bird");
  }

  flappyBird() {
    this.bird.setVelocityY(-this.birdFlappyVelocity);
    this.flappySound.play();
  }

  createControls() {
    this.cursors = this.input.keyboard.createCursorKeys();
  }

  createGroups() {
    this.pipes = this.physics.add.group({
      immovable: true,
      velocityX: -this.pipesVelocity,
    });
  }

  createPipes() {
    const spaceBetweenPipes = Phaser.Math.Between(
      ...this.spaceBetweenPipesRange,
    );

    const pipeVerticalPosition = Phaser.Math.Between(
      30,
      this.gameHeight - this.ground.height - 30 - spaceBetweenPipes,
    );

    this.pipes
      .create(this.gameWidth, pipeVerticalPosition, "pipe")
      .setOrigin(0, 1)
      .setFlipY(true);

    this.pipes
      .create(this.gameWidth, pipeVerticalPosition + spaceBetweenPipes, "pipe")
      .setOrigin(0);
  }

  createPipesSpawnEventTime() {
    this.pipesSpawnEventTime = this.time.addEvent({
      delay: this.pipesSpawnEventTimeDelay,
      callback: this.createPipes,
      callbackScope: this,
      loop: true,
    });
  }

  createPlayButton() {
    this.playButton = this.add
      .image(
        this.gameWidth / 2,
        (this.gameHeight - this.ground.height) / 2 + 64,
        "play-button",
      )
      .setDepth(1)
      .setInteractive({
        cursor: "pointer",
      })
      .setScale(1.2)
      .on("pointerover", () =>
        this.playButton.setTexture("play-button-pressed"),
      )
      .on("pointerout", () => this.playButton.setTexture("play-button"))
      .on("pointerdown", () => this.scene.restart());
  }

  gameOver() {
    this.isGameRunning = false;
    this.hitSound.play();
    this.bird.setTint(0xff0000);
    this.physics.pause();
    this.anims.remove("flying-bird");
    this.dayNightCycleEventTime.destroy();
    this.pipesSpawnEventTime.destroy();
    this.add.image(
      this.gameWidth / 2,
      (this.gameHeight - this.ground.height) / 2,
      "gameover",
    );
    this.createPlayButton();
  }

  createCollisions() {
    this.physics.add.collider(
      this.bird,
      this.ground,
      this.gameOver,
      null,
      this,
    );

    this.physics.add.collider(this.bird, this.pipes, this.gameOver, null, this);
  }

  createScore() {
    this.score = 0;

    this.scoreText = this.add
      .text(this.gameWidth / 2, 64, `${this.score}`, {
        align: "center",
        color: "#ffffff",
        fontFamily: "flappy-bird",
        fontSize: 36,
        stroke: "#444",
        strokeThickness: 8,
      })
      .setOrigin(0.5)
      .setDepth(1);
  }

  increaseScore() {
    this.score++;
    this.scoreText.setText(`${this.score}`);

    if (this.score % 10 === 0) this.scoreSparkSound.play();
    else this.pointSound.play();
  }
}
