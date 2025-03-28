class ElevadorScene extends Phaser.Scene {
  constructor() {
    // Chama o construtor da classe Phaser.Scene com a chave 'elevadorScene'
    super({ key: "elevadorScene" });
    this.canMove = true; // Controla se o jogador pode se mover
    this.panelElevShown = false;
  }

  preload() {
    // Carrega as imagens e spritesheets necessárias para a cena
    this.load.image("backgroundelev", "../assets/bgelevadorvar1.png");
    this.load.image("backgroundelev2", "../assets/bgelevadorvar2.jpg");
    this.load.image("backgroundelev3", "../assets/bgelevadorvar3.jpg");
    this.load.spritesheet("player", "../assets/personagens/skinsPlayer/player1all.png", { frameWidth: 16, frameHeight: 32, });
    
    this.load.image("painelinelev", "../assets/painelinelev.png");
    this.load.image("botaoestrategias", "../assets/botaoestrategias.png");
    this.load.image("botaooffice", "../assets/botaooffice.png");
    this.load.image("botaonegocios", "../assets/botaonegocios.png");
    this.load.image("botaopessoas", "../assets/botaopessoas.png");
    this.load.image("botaotech", "../assets/botaotech.png");
    this.load.image("botaorelacoes", "../assets/botaorelacoes.png");
    this.load.video("videoelev1", "../assets/videoelev1.mp4");
    this.load.video("videoelev2", "../assets/videoelev2.mp4");
    this.load.video("videoelev3", "../assets/videoelev3.mp4");

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

    this.excbubble = this.sound.add("excbubble", {loop: false, volume: 10,});

    // Audio toca sempre que a cena inicia
    this.excBubble.play();

    // Registra os eventos para pausar o áudio sempre que a cena for interrompida
    this.events.on("shutdown", this.shutdown, this);
    this.events.on("pause", this.shutdown, this);

    // Adiciona os efeitos sonoros
    this.buttonClick = this.sound.add('buttonSound', { loop: false, volume: 10 });
    this.indicatorSound = this.sound.add('indicatorSound', { loop: true, volume: 1.5 });
    this.walkSound = this.sound.add('walkSound', { loop: false, volume: 2 });

    // Inicia o áudio do elevador em loop
    this.elevatorSound = this.sound.add("elevatorAudio", {loop: true, volume: 0.5,});
    
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

    // Cria a sprite do indicador ("exclamando")
    this.indicator = this.add.sprite(width - 955, height - 660, "indicator").setScale(0.3);
    this.indicator.play("exclamando");
    this.indicatorActive = true;

    // Criação dos elementos da cena
    this.createPlayer(width, height);
    this.createPlayerAnimations();
    this.createButtonOffice(width, height);
    this.createButtonPeople(width, height);
    this.createButtonStrategies(width, height);
    this.createButtonBusiness(width, height);
    this.createButtonTech(width, height);
    this.createButtonRelations(width, height);
    this.createBarriers();
    this.lastPosition = "up"

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
    const velocidade = 150;
    let movendo = false;
  
    if (this.teclas.left.isDown) {
      this.player.setVelocityX(-velocidade);
      this.lastPosition = "left"; 
      this.player.anims.play("walk_left", true);
      movendo = true;
    } else if (this.teclas.right.isDown) {
      this.player.setVelocityX(velocidade);
      this.lastPosition = "right";
      this.player.anims.play("walk_right", true);
      movendo = true;
    } else {
      this.player.setVelocityX(0);
    }
  
    if (this.teclas.up.isDown) {
      this.player.setVelocityY(-velocidade);
      this.lastPosition = "up";
      this.player.anims.play("walk_up", true);
      movendo = true;
    } else if (this.teclas.down.isDown) {
      this.player.setVelocityY(velocidade);
      this.lastPosition = "down";
      this.player.anims.play("walk_down", true);
      moving = true;
    } else {
      this.player.setVelocityY(0);
    }
  
    // Se o personagem parou, inicia a animação de stop_* em loop
    if (!movendo) {
      switch (this.lastPosition) {
        case "left":
          this.player.anims.play("stop_left", true);
          break;
        case "right":
          this.player.anims.play("stop_right", true);
          break;
        case "up":
          this.player.anims.play("stop_up", true);
          break;
        case "down":
        default:
          this.player.anims.play("stop_down", true);
          break;
      }
      this.walkSound.stop();
    } else {
      if (!this.walkSound.isPlaying) {
        this.walkSound.play();
      }
    }
  }

  createBarriers() {
    this.barreira = this.add.rectangle( width - 760, height - 40, 620, 120, 0xff0000, 0 );

    this.physics.add.existing(this.barreira, true);
    this.physics.add.collider(this.player, this.barreira);


    this.barreira1 = this.add.rectangle( width - 500, height - 20, 20, 1400, 0xff0000, 0 );
   
    this.physics.add.existing(this.barreira1, true);
    this.physics.add.collider(this.player, this.barreira1);

    this.barreira2 = this.add.rectangle( width - 1100, height - 20, 20, 1400, 0xff0000, 0 );
   
    this.physics.add.existing(this.barreira2, true);
    this.physics.add.collider(this.player, this.barreira2);

    this.barreira3 = this.add.rectangle( width - 610, height - 610, 420, 20, 0xff0000, 0 );
   
    this.physics.add.existing(this.barreira3, true);
    this.physics.add.collider(this.player, this.barreira3);
  }

  createPlayer(width, height) {
    this.player = this.physics.add.sprite(width / 2, height / 2, "player");
    this.player.setScale(6);
    this.player.setCollideWorldBounds(true);
    // Adds boundaries for the game world
    this.physics.world.setBounds(0, 0, width, height);
  }

  createPlayerAnimations() {
    this.anims.create({
      key: "walk_down",
      frames: this.anims.generateFrameNumbers("player", { start: 130, end: 135 }),
      frameRate: 10,
      repeat: -1,
    });
    this.anims.create({
      key: "walk_right",
      frames: this.anims.generateFrameNumbers("player", { start: 112, end: 117 }),
      frameRate: 10,
      repeat: -1,
    });
    this.anims.create({
      key: "walk_up",
      frames: this.anims.generateFrameNumbers("player", { start: 118, end: 123 }),
      frameRate: 10,
      repeat: -1,
    });
    this.anims.create({
      key: "walk_left",
      frames: this.anims.generateFrameNumbers("player", { start: 124, end: 129 }),
      frameRate: 10,
      repeat: -1,
    });
    this.anims.create({
      key: "stop_down",
      frames: this.anims.generateFrameNumbers("player", { start: 74, end: 79 }), 
      frameRate: 5, // Mais lento
      repeat: -1, // Loop infinito
    });
    this.anims.create({
      key: "stop_right",
      frames: this.anims.generateFrameNumbers("player", { start: 56, end: 61 }),
      frameRate: 5,
      repeat: -1,
    });
    this.anims.create({
      key: "stop_up",
      frames: this.anims.generateFrameNumbers("player", { start: 62, end: 67 }),
      frameRate: 5,
      repeat: -1,
    });
    this.anims.create({
      key: "stop_left",
      frames: this.anims.generateFrameNumbers("player", { start: 68, end: 73 }),
      frameRate: 5,
      repeat: -1,
    });
    
    
    
  }

  createButtonOffice(width, height) {
    // Creates the panel and proximity area
    this.panelElev = this.add.image(0, 0, "panelElev").setOrigin(0, 0);
    this.panelElev.setDisplaySize(width, height);
    this.panelElev.setVisible(false);

    // Adiciona a sprite da exclamação
    this.indicator = this.add.sprite(width - 955, height - 660, "indicator").setScale(0.3);
    this.indicator.play("exclamando"); // Inicia a animação
    this.indicatorActive = true;
    if (this.indicatorActive) {
      this.indicatorSound.play();
    }

    // Adiciona o botão interativo
    this.botaoofficeel = this.add.image(width - 905, height - 160, "botaooffice");
    this.botaoofficeel.setInteractive();
    this.botaoofficeel.setScale(1.2, 1.15);
    this.botaoofficeel.setVisible(false);

    // Adiciona um objeto invisível para verificar a proximidade
    this.proximidade = this.add.rectangle(width - 955, height - 650, 105, 70, 0xff0000, 0);
    this.physics.add.existing(this.proximidade, true);

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

    this.botaopessoas = this.add.image( width - 620, height - 160, "botaopessoas" );
   
    this.botaopessoas.setInteractive();
    this.botaopessoas.setScale(1.2, 1.15);
    this.botaopessoas.setVisible(false);

    this.buttonPeople.on("pointerdown", () => {
      this.buttonClick.play();
      this.shutdown();
      this.scene.stop("elevadorScene");
      this.scene.start("vpPessoasScene");
    });
  }

  createButtonEstrategias(width, height) {
    // Botão Estratégias
    this.botaoestrategias = this.add.image(0, 0, "botaoestrategias").setOrigin(0, 0);
    this.botaoestrategias.setVisible(false);

    this.botaoestrategias = this.add.image( width - 620, height - 392, "botaoestrategias" );
   
    this.botaoestrategias.setInteractive();
    this.botaoestrategias.setScale(1.2, 1.15);
    this.botaoestrategias.setVisible(false);

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

    this.botaonegocios = this.add.image( width - 910, height - 393, "botaonegocios" );
   
    this.botaonegocios.setInteractive();
    this.botaonegocios.setScale(1.2, 1.15);
    this.botaonegocios.setVisible(false);

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

    this.botaorelacoes = this.add.image( width - 610, height - 605, "botaorelacoes" );
    this.botaorelacoes.setInteractive();
    this.botaorelacoes.setScale(1.2, 1.15);
    this.botaorelacoes.setVisible(false);

    this.buttonRelations.on("pointerdown", () => {
      this.buttonClick.play();
      this.shutdown();
      this.scene.stop("elevadorScene");
      this.scene.start("relacoesScene");
    });
  }
}

