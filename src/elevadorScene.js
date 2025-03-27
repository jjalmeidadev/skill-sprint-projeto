class ElevadorScene extends Phaser.Scene {
  constructor() {
    // Chama o construtor da classe Phaser.Scene com a chave 'elevadorScene'
    super({ key: "elevadorScene" });
    this.canMove = true; // Controla se o jogador pode se mover
    this.panelElevShown = false;
  }

  preload() {
    // Carrega as imagens e spritesheets necessárias para a cena
    this.load.image("backgroundElev", "../assets/bgelevadorvar1.png");
    this.load.image("backgroundElev2", "../assets/bgelevadorvar2.jpg");
    this.load.image("backgroundElev3", "../assets/bgelevadorvar3.jpg");
    this.load.spritesheet("player", "../assets/Player.png", { frameWidth: 32, frameHeight: 32 });
    
    this.load.image("panelElev", "../assets/painelinelev.png");
    this.load.image("buttonStrategies", "../assets/botaoestrategias.png");
    this.load.image("buttonOffice", "../assets/botaooffice.png");
    this.load.image("buttonBusiness", "../assets/botaonegocios.png");
    this.load.image("buttonPeople", "../assets/botaopessoas.png");
    this.load.image("buttonTech", "../assets/botaotech.png");
    this.load.image("buttonRelations", "../assets/botaorelacoes.png");
    this.load.video("videoElev1", "../assets/videoelev1.mp4");
    this.load.video("videoElev2", "../assets/videoelev2.mp4");
    this.load.video("videoElev3", "../assets/videoelev3.mp4");

    // Carrega o áudio específico para o elevador
    this.load.audio('elevatorAudio', '../assets/Local Forecast - Elevator [ ezmp3.co ].mp3');
    
    // Se o sprite 'indicator' não estiver sendo carregado em outra cena, descomente a linha abaixo:
    this.load.spritesheet("indicator", "../assets/spriteexclamação.png", { frameWidth: 254, frameHeight: 291 });

    // Carrega os efeitos sonoros
    this.load.audio('indicatorSound', '../assets/sounds/497198_abacagi_bubble-pops (mp3cut.net).wav');
    this.load.audio('buttonSound', '../assets/sounds/687107__aphom000__mouse-2-button-fast-click.wav');
    this.load.audio('walkSound', '../assets/sounds/753292__vrymaa__footsteps-high-heels-hardwood-walk-run (mp3cut.net).wav');
    this.load.audio("excBubble", "../assets/sounds/somexclamacao.wav");
  }

  create() {
    const width = this.scale.width;
    const height = this.scale.height;

    this.excBubble = this.sound.add("excBubble", {
      loop: false,
      volume: 10,
    });

    // Audio toca sempre que a cena inicia
    this.excBubble.play();

    // Registra os eventos para pausar o áudio sempre que a cena for interrompida
    this.events.on("shutdown", this.shutdown, this);
    this.events.on("pause", this.shutdown, this);

    // Adiciona os efeitos sonoros
    this.buttonClick = this.sound.add('buttonSound', { loop: false, volume: 10 });
    this.indicatorSound = this.sound.add('indicatorSound', { loop: true, volume: 1.5 });
    this.walkSound = this.sound.add('walkSound', { loop: false, volume: 2 });

    // Starts the elevator audio in a loop
    this.elevatorSound = this.sound.add("elevatorAudio", {
      loop: true, // Configures to play in a loop
      volume: 0.5, // Sets the music volume
    });
    this.elevatorSound.play();
    
    // Creates the animation for the indicator (if it doesn't already exist)
    if (!this.anims.exists("exclaiming")) {
      this.anims.create({
        key: "exclaiming",
        frames: this.anims.generateFrameNumbers("indicator", {
          start: 0,
          end: 1,
        }),
        frameRate: 3,
        repeat: -1,
      });
    }

    this.cameras.main.fadeIn(1000); // Transition effect for the scene

    // Randomly selects one of the loaded background images
    const backgrounds = ["backgroundElev"];
    const randomBackground = Phaser.Math.RND.pick(backgrounds);
    this.background = this.add.image(0, 0, randomBackground).setOrigin(0, 0);
    this.background.setDisplaySize(width, height);

    // Plays random commercials on the TV
    const videos = ["videoElev1", "videoElev2", "videoElev3"];
    const randomVideo = Phaser.Math.RND.pick(videos);
    this.video = this.add.video(width - 561, height - 594, randomVideo).setOrigin(0.5);
    this.video.setDisplaySize(width / 45, height / 31);
    this.video.setAngle(32.7);
    this.video.play(false);
    this.video.on('complete', () => {
      const nextVideoKey = Phaser.Math.RND.pick(["../assets/videoelev1.mp4", "../assets/videoelev2.mp4", "../assets/videoelev3.mp4"]);
      this.video.loadURL(nextVideoKey);
      this.video.play(false);
    });

    // Creates the indicator sprite ("exclaiming")
    this.indicator = this.add
      .sprite(width - 955, height - 660, "indicator")
      .setScale(0.3);
    this.indicator.play("exclaiming");
    this.indicatorActive = true;

    // Scene element creation
    this.createPlayer();
    this.createPlayerAnimations();
    this.createButtonOffice(width, height);
    this.createButtonPeople(width, height);
    this.createButtonStrategies(width, height);
    this.createButtonBusiness(width, height);
    this.createButtonTech(width, height);
    this.createButtonRelations(width, height);
    this.createBarriers();

    // this.createButtonUp(); // Commented out as the method is not defined

    // Keyboard configuration (WASD + E for interaction)
    this.keys = this.input.keyboard.addKeys({
      up: Phaser.Input.Keyboard.KeyCodes.W,
      down: Phaser.Input.Keyboard.KeyCodes.S,
      left: Phaser.Input.Keyboard.KeyCodes.A,
      right: Phaser.Input.Keyboard.KeyCodes.D,
    });

    // Sets the game world boundaries
    this.physics.world.setBounds(0, 0, width, height);
  }

  update() {
    // Updates the player's position
    this.movePlayer();

    const width = this.scale.width;
    const height = this.scale.height;
    const closeToButtons =
      Math.abs(this.player.x - this.proximity.x) <= 50 &&
      Math.abs(this.player.y - this.proximity.y) <= 50;

    if (closeToButtons) {
      if (!this.panelElevShown) {
        this.indicatorSound.stop();
        this.indicator.setVisible(false); // Hides the indicator only the first time
        this.panelElevShown = true; // Marks that the panel has been shown at least once
      }

      // Displays the panel and buttons when nearby
      this.panelElev.setVisible(true);
      this.buttonOfficeEl.setVisible(true);
      this.buttonPeople.setVisible(true);
      this.buttonStrategies.setVisible(true);
      this.buttonBusiness.setVisible(true);
      this.buttonTech.setVisible(true);
      this.buttonRelations.setVisible(true);
    } else {
      // Hides the panel and buttons when far away
      this.panelElev.setVisible(false);
      this.buttonOfficeEl.setVisible(false);
      this.buttonPeople.setVisible(false);
      this.buttonStrategies.setVisible(false);
      this.buttonBusiness.setVisible(false);
      this.buttonTech.setVisible(false);
      this.buttonRelations.setVisible(false);

      // The indicator only reappears if the panel has never been shown
      if (!this.panelElevShown) {
        this.indicator.setVisible(true);
      }
    }
  }

  shutdown() {
    // Stops the elevator audio when the scene ends or pauses
    if (this.elevatorSound && this.elevatorSound.isPlaying) {
      this.elevatorSound.stop();
    }
  }

  movePlayer() {
    const speed = 150;
    let moving = false;

    if (this.keys.left.isDown) {
      this.player.setVelocityX(-speed);
      this.player.anims.play("walk_left", true);
      this.player.setFlipX(true);
      moving = true;
    } else if (this.keys.right.isDown) {
      this.player.setVelocityX(speed);
      this.player.anims.play("walk_right", true);
      this.player.setFlipX(false);
      moving = true;
    } else {
      this.player.setVelocityX(0);
    }

    if (this.keys.up.isDown) {
      this.player.setVelocityY(-speed);
      this.player.anims.play("walk_up", true);
      moving = true;
    } else if (this.keys.down.isDown) {
      this.player.setVelocityY(speed);
      this.player.anims.play("walk_down", true);
      moving = true;
    } else {
      this.player.setVelocityY(0);
    }

    if (!moving) {
      this.player.anims.stop();
      this.walkSound.stop();
    } else {
      if (!this.walkSound.isPlaying) {
        this.walkSound.play();
      }
    }
  }

  createBarriers() {
    this.barrier = this.add.rectangle(width - 760, height - 40, 620, 120, 0xff0000, 0);
    this.physics.add.existing(this.barrier, true);
    this.physics.add.collider(this.player, this.barrier);

    this.barrier1 = this.add.rectangle(width - 500, height - 20, 20, 1400, 0xff0000, 0);
    this.physics.add.existing(this.barrier1, true);
    this.physics.add.collider(this.player, this.barrier1);

    this.barrier2 = this.add.rectangle(width - 1100, height - 20, 20, 1400, 0xff0000, 0);
    this.physics.add.existing(this.barrier2, true);
    this.physics.add.collider(this.player, this.barrier2);

    this.barrier3 = this.add.rectangle(width - 610, height - 610, 420, 20, 0xff0000, 0);
    this.physics.add.existing(this.barrier3, true);
    this.physics.add.collider(this.player, this.barrier3);
  }

  createPlayer() {
    // Creates the player
    this.player = this.physics.add.sprite(width / 2, height / 2, "player");
    this.player.setScale(6);
    this.player.setCollideWorldBounds(true);
    // Adds boundaries for the game world
    this.physics.world.setBounds(0, 0, width, height);
  }

  createPlayerAnimations() {
    // Player animations
    this.anims.create({
      key: "walk_down",
      frames: this.anims.generateFrameNumbers("player", { start: 0, end: 5 }),
      frameRate: 10,
      repeat: -1,
    });
    this.anims.create({
      key: "walk_right",
      frames: this.anims.generateFrameNumbers("player", { start: 6, end: 11 }),
      frameRate: 10,
      repeat: -1,
    });
    this.anims.create({
      key: "walk_up",
      frames: this.anims.generateFrameNumbers("player", { start: 12, end: 17 }),
      frameRate: 10,
      repeat: -1,
    });
    this.anims.create({
      key: "walk_left",
      frames: this.anims.generateFrameNumbers("player", { start: 6, end: 11 }),
      frameRate: 10,
      repeat: -1,
    });
  }

  createButtonOffice(width, height) {
    // Creates the panel and proximity area
    this.panelElev = this.add.image(0, 0, "panelElev").setOrigin(0, 0);
    this.panelElev.setDisplaySize(width, height);
    this.panelElev.setVisible(false);

    // Adds the exclamation sprite
    this.indicator = this.add
      .sprite(width - 955, height - 660, "indicator")
      .setScale(0.3);
    this.indicator.play("exclaiming"); // Starts the animation
    this.indicatorActive = true;
    if (this.indicatorActive) {
      this.indicatorSound.play();
    }

    // Adds the interactive button
    this.buttonOfficeEl = this.add.image(width - 905, height - 160, "buttonOffice");
    this.buttonOfficeEl.setInteractive();
    this.buttonOfficeEl.setScale(1.2, 1.15);
    this.buttonOfficeEl.setVisible(false);

    // Adds an invisible object to check proximity
    this.proximity = this.add.rectangle(width - 955, height - 650, 105, 70, 0xff0000, 0);
    this.physics.add.existing(this.proximity, true);

    this.buttonOfficeEl.on("pointerdown", () => {
      this.buttonClick.play();
      this.shutdown();
      this.scene.stop("elevadorScene");
      this.scene.start("officeScene");
    });
  }

  createButtonPeople(width, height) {
    // Button People
    this.buttonPeople = this.add.image(0, 0, "buttonPeople").setOrigin(0, 0);
    this.buttonPeople.setVisible(false);

    this.buttonPeople = this.add.image(width - 620, height - 160, "buttonPeople");
    this.buttonPeople.setInteractive();
    this.buttonPeople.setScale(1.2, 1.15);
    this.buttonPeople.setVisible(false);

    this.buttonPeople.on("pointerdown", () => {
      this.buttonClick.play();
      this.shutdown();
      this.scene.stop("elevadorScene");
      this.scene.start("vpPessoasScene");
    });
  }

  createButtonStrategies(width, height) {
    // Button Strategies
    this.buttonStrategies = this.add.image(0, 0, "buttonStrategies").setOrigin(0, 0);
    this.buttonStrategies.setVisible(false);

    this.buttonStrategies = this.add.image(width - 620, height - 392, "buttonStrategies");
    this.buttonStrategies.setInteractive();
    this.buttonStrategies.setScale(1.2, 1.15);
    this.buttonStrategies.setVisible(false);

    this.buttonStrategies.on("pointerdown", () => {
      this.buttonClick.play();
      this.shutdown();
      this.scene.stop("elevadorScene");
      this.scene.start("VpEstrategiaScene");
    });
  }

  createButtonBusiness(width, height) {
    // Button Business
    this.buttonBusiness = this.add.image(0, 0, "buttonBusiness").setOrigin(0, 0);
    this.buttonBusiness.setVisible(false);

    this.buttonBusiness = this.add.image(width - 910, height - 393, "buttonBusiness");
    this.buttonBusiness.setInteractive();
    this.buttonBusiness.setScale(1.2, 1.15);
    this.buttonBusiness.setVisible(false);

    this.buttonBusiness.on("pointerdown", () => {
      this.buttonClick.play();
      this.shutdown();
      this.scene.stop("elevadorScene");
      this.scene.start("vpNegociosScene");
    });
  }

  createButtonTech(width, height) {
    // Button Tech
    this.buttonTech = this.add.image(0, 0, "buttonTech").setOrigin(0, 0);
    this.buttonTech.setVisible(false);

    this.buttonTech = this.add.image(width - 906, height - 602, "buttonTech");
    this.buttonTech.setInteractive();
    this.buttonTech.setScale(1.2, 1.15);
    this.buttonTech.setVisible(false);

    this.buttonTech.on("pointerdown", () => {
      this.buttonClick.play();
      this.shutdown();
      this.scene.stop("elevadorScene");
      this.scene.start("vpTecnologiaScene");
    });
  }

  createButtonRelations(width, height) {
    // Button Relations
    this.buttonRelations = this.add.image(0, 0, "buttonRelations").setOrigin(0, 0);
    this.buttonRelations.setVisible(false);

    this.buttonRelations = this.add.image(width - 610, height - 605, "buttonRelations");
    this.buttonRelations.setInteractive();
    this.buttonRelations.setScale(1.2, 1.15);
    this.buttonRelations.setVisible(false);

    this.buttonRelations.on("pointerdown", () => {
      this.buttonClick.play();
      this.shutdown();
      this.scene.stop("elevadorScene");
      this.scene.start("relacoesScene");
    });
  }
}

