class OfficeScene extends Phaser.Scene {
  constructor() {
    super({ key: "officeScene" });
    this.canMove = true;
  }

  preload() {
    // Carrega imagens, spritesheets e demais ativos
    this.load.spritesheet("player", "../assets/Player.png", {
      frameWidth: 32,
      frameHeight: 32,
    });
    this.load.image("computerScreen", "../assets/tela_computador.png");
    this.load.image("computer", "../assets/computador.png");
    this.load.spritesheet("indicator", "../assets/exclamaçãoRoxa.png", {
      frameWidth: 254,
      frameHeight: 305,
    });

    // Carrega o mapa do Tiled e os tilesets
    this.load.tilemapTiledJSON(
      "escritorio",
      "../assets/mapaOffice/mapaOffice.json"
    );
    this.load.image("decoracao", "../assets/mapaOffice/decoracao.png");
    this.load.image("paredes", "../assets/mapaOffice/paredes.png");
    this.load.image("personalizado_vivo", "../assets/mapaOffice/personalizado_vivo.png");

    // Demais ativos
    this.load.image("vivita", "../assets/vivita.png");
    this.load.image("speechBubble", "../assets/balaoTexto.png");


    // Carrega o áudio da cena do escritório
    this.load.audio("officeMusic", "../assets/0320(1).MP3");
    this.load.audio('keySound', '../assets/sounds/computer-keyboard-typing-290582 (mp3cut.net).mp3');
    this.load.audio('indicatorSound', '../assets/sounds/497198_abacagi_bubble-pops (mp3cut.net).wav');
    this.load.audio('walkSound', '../assets/sounds/753292__vrymaa__footsteps-high-heels-hardwood-walk-run (mp3cut.net).wav');


  }

  create() {
    //skip elevador
    /* this.scene.start("elevadorScene");
     return;*/

     this.events.on('stopWalkSound', () => {
      if (this.walkSound && this.walkSound.isPlaying) {
          this.walkSound.stop(); // Para o som de passos
      }
  });

    const width = this.scale.width;
    const height = this.scale.height;

    // Transição suave
    this.cameras.main.fadeIn(1000);

    // Carrega os efeitos sonoros
    this.buttonClick = this.sound.add('buttonSound', { loop: false, volume: 10 });
    this.indicatorSound = this.sound.add('indicatorSound', { loop: true, volume: 1.5 });
    this.walkSound = this.sound.add('walkSound', { loop: false, volume: 2 });

    // Cria e inicia a música; se houver um tempo salvo, retoma a partir dele
    const startTime = OfficeScene.lastMusicTime || 0;
    this.officeMusic = this.sound.add("officeMusic", { loop: true });
    this.officeMusic.play({ seek: startTime });

    // Se a cena for pausada ou finalizada, salva o tempo atual e para a música
    this.events.on("shutdown", this.onShutdown, this);
    this.events.on("pause", this.onShutdown, this);

    //cria a animação
    this.anims.create({
      key: "exclaiming",
      frames: this.anims.generateFrameNumbers("indicator", { start: 0, end: 1 }),
      //velocidade da animação
      frameRate: 3,
      repeat: -1,
    });

    // Configuração do teclado
    this.keys = this.input.keyboard.addKeys({
      up: Phaser.Input.Keyboard.KeyCodes.W,
      down: Phaser.Input.Keyboard.KeyCodes.S,
      left: Phaser.Input.Keyboard.KeyCodes.A,
      right: Phaser.Input.Keyboard.KeyCodes.D,
      interact: Phaser.Input.Keyboard.KeyCodes.E,
      ENTER: Phaser.Input.Keyboard.KeyCodes.ENTER,
    });

    // Cria o mapa e as camadas
    const map = this.make.tilemap({ key: "escritorio", tileWidth: 25, tileHeight: 20 });
    const tileset1 = map.addTilesetImage("decoracao");
    const tileset2 = map.addTilesetImage("paredes");
    const tileset3 = map.addTilesetImage("personalizado_vivo");

    //Cria as camadas
    const offsetX = width - 1270;
    const floorLayer = map.createLayer("chao", tileset2, offsetX, 0).setScale(2.5);
    const leaderFloorLayer = map
      .createLayer("chaoLider", tileset1, offsetX, 0)
      .setScale(2.5);
    const wallLayer = map
      .createLayer("parede", tileset2, offsetX, 0)
      .setScale(2.5);
    const carpetLayer = map
      .createLayer("tapete", tileset3, offsetX, 0)
      .setScale(2.5);
    const leaderCarpetLayer = map
      .createLayer("tapeteLider", tileset1, offsetX, 0)
      .setScale(2.5);
    const finishLayer = map
      .createLayer("acabamento", tileset2, offsetX, 0)
      .setScale(2.5);
    const chairLayer = map
      .createLayer("cadeira", tileset1, offsetX, 0)
      .setScale(2.5);
    const backChairLayer = map
      .createLayer("cadeiraTras", tileset1, offsetX, 0)
      .setScale(2.5);
    const frameLayer = map
      .createLayer("quadro", tileset1, offsetX, 0)
      .setScale(2.5);
    const sofaLayer = map.createLayer("sofa", tileset1, offsetX, 0).setScale(2.5);
    const plantLayer = map
      .createLayer("planta", tileset1, offsetX, 0)
      .setScale(2.5);
    const doorLayer = map
      .createLayer("porta", tileset1, offsetX, 0)
      .setScale(2.5);
    const decorationLayer = map
      .createLayer("decoracao", tileset1, offsetX, 0)
      .setScale(2.5);

    //Ativa as colisões com base na propriedade 'collider' para todas as camadas
    floorLayer.setCollisionByProperty({ collider: true });
    leaderFloorLayer.setCollisionByProperty({ collider: true });
    wallLayer.setCollisionByProperty({ collider: true });
    carpetLayer.setCollisionByProperty({ collider: true });
    leaderCarpetLayer.setCollisionByProperty({ collider: true });
    finishLayer.setCollisionByProperty({ collider: true });
    chairLayer.setCollisionByProperty({ collider: true });
    backChairLayer.setCollisionByProperty({ collider: true });
    frameLayer.setCollisionByProperty({ collider: true });
    sofaLayer.setCollisionByProperty({ collider: true });
    plantLayer.setCollisionByProperty({ collider: true });
    doorLayer.setCollisionByProperty({ collider: true });
    decorationLayer.setCollisionByProperty({ collider: true });

    // Cria os elementos da cena
    this.addVivita(width, height);
    this.createComputer(width, height);
    this.createPlayer(width, height);
    this.createPlayerAnimations();

    // Configura colisões do jogador com camadas selecionadas
    this.physics.add.collider(this.player, wallLayer);
    this.physics.add.collider(this.player, chairLayer);
    this.physics.add.collider(this.player, backChairLayer);
    this.physics.add.collider(this.player, frameLayer);
    this.physics.add.collider(this.player, sofaLayer);

    // Define os limites do mundo com base na tela
    this.physics.world.setBounds(0, 0, width, height);

    // Texto para depuração, exibindo as coordenadas do jogador
    this.debugText = this.add.text(20, 20, "", {
      fontSize: "16px",
      fill: "#ffffff",
    });
  }

  onShutdown() {
    // Salva o tempo atual da música e a para quando a cena é pausada ou encerrada
    if (this.officeMusic && this.officeMusic.isPlaying) {
      OfficeScene.lastMusicTime = this.officeMusic.seek;
      this.officeMusic.stop();
    }
  }

  update() {
    this.movePlayer();

    // Verifica se o jogador está próximo do computador e pressionou 'E'
    if (Phaser.Input.Keyboard.JustDown(this.keys.interact)) {
      if (
        Math.abs(this.player.x - this.computer.x) <= 50 &&
        Math.abs(this.player.y - this.computer.y) <= 50
      ) {
        this.showComputerScreen();
        this.activeIndicator = false;
      }
    }

    // Se o jogador retornou da sala do líder, cria o botão do elevador
    if (this.returnedFromLeaderRoom && this.blockLoop === 0) {
      this.createUpButton();
    }

    if (this.activeIndicator == false) {
      this.indicatorSound.stop();
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
      if (moving) {
        this.walkSound.play();
      }
    }
  }

  createPlayer(width, height) {
    this.player = this.physics.add.sprite(width - 405, height - 100, "player");
    this.player.setScale(2.5);
  }

  createPlayerAnimations() {
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

  createUpButton() {
    this.blockLoop = 1;

    this.exclamation = this.physics.add
      .sprite(this.scale.width - 435, this.scale.height - 700, "indicator")
      .setScale(0.2);
    this.exclamation.setImmovable(true);
    this.exclamation.play("exclaiming");
    this.activeIndicator = true;
    if (this.activeIndicator) {
      this.indicatorSound.play();
    }

    this.elevatorBackground = this.add.image(0, 0, "elevatorBackground").setOrigin(0, 0);
    this.elevatorBackground.setDisplaySize(this.scale.width, this.scale.height);
    this.elevatorPanel = this.add
      .image(this.scale.width - 910, this.scale.height - 600, "elevatorPanel")
      .setOrigin(0, 0);
    this.elevatorBackground.setVisible(false);
    this.elevatorPanel.setVisible(false);

    this.upButton = this.add.image(
      this.scale.width - 680,
      this.scale.height - 400,
      "elevatorButton"
    );
    this.upButton.setInteractive();
    this.upButton.setScale(1);
    this.upButton.setVisible(false);

    this.upButton.on("pointerdown", () => {
      // Troca para a cena 'elevadorScene' – nesse caso, o OfficeScene será encerrada
      this.scene.stop("officeScene");
      this.scene.start("elevatorScene");
    });

    // Ao sobrepor o jogador na exclamação, vamos chamar onShutdown() antes de mudar para 'buttonElevatorScene'
    this.physics.add.overlap(this.player, this.exclamation, () => {
      this.activeIndicator = false;
      this.onShutdown(); // Salva o tempo e para a música
      this.scene.switch("buttonElevatorScene");
    });
  }

  createComputer(width, height) {
    this.computer = this.add
      .image(width - 1020, height - 100, "computer")
      .setScale(0.09)
      .setInteractive();
    this.computer.setFlipX(true);
  }

  addIndicatorAndComputer() {
    this.indicator = this.add
      .sprite(this.scale.width - 1020, this.scale.height - 150, "indicator")
      .setScale(0.2);
    this.indicator.play("exclaiming");
    this.activeIndicator = true;
    if (this.activeIndicator) {
      this.indicatorSound.play();
    }

    this.computer = this.add
      .image(this.scale.width - 1020, this.scale.height - 100, "computer")
      .setScale(0.09)
      .setInteractive();
    this.computer.setFlipX(true);

    this.computer.on("pointerover", () => {
      this.activeIndicator = false;
      this.indicatorSound.stop();
      this.walkSound.stop();
      this.computer.setTint(0xaaaaaa);
    });
    this.computer.on("pointerout", () => {
      this.activeIndicator = false;
      this.indicatorSound.stop();
      this.walkSound.stop();
      this.computer.clearTint();
    });
    this.computer.on("pointerdown", () => {
      this.activeIndicator = false;
      this.indicatorSound.stop();
      this.walkSound.stop();
      this.showComputerScreen();
    });
  }

  showComputerScreen() {
    this.activeIndicator = false;
    this.indicatorSound.stop();
    this.buttonClick.play();
    this.indicator.destroy();
    this.scene.get('officeScene').events.emit('stopWalkSound'); // Emite o evento
    this.scene.switch("curriculoScene");
    this.salaLider();
  }

  addVivita(width, height) {
    const vivita = this.add
      .image(width / 1.75, height / 3.2, "vivita")
      .setScale(0.09);

    this.exclamation = this.add
      .sprite(width / 1.75, height / 4.6, "indicator")
      .setScale(0.2);
    this.exclamation.play("exclaiming");
    this.activeIndicator = true;
    if (this.activeIndicator) {
      this.indicatorSound.play();
      this.walkSound.stop();
    }

    vivita.setInteractive();
    vivita.on("pointerdown", () => {
      this.showVivitaInteraction();
    });

    this.input.keyboard.on('keydown-E', () => {
      this.activeIndicator = false;
      if (
        Math.abs(this.player.x - vivita.x) <= 50 &&
        Math.abs(this.player.y - vivita.y) <= 50 &&
        !this.vivitaInteracted
      ) {
        this.showVivitaInteraction();
        this.vivitaInteracted = true;
        this.buttonClick.play();
      }
    });
  }

  showVivitaInteraction() {
    this.exclamation.setVisible(false);

    const vivitaDialogues = [
      "Olá! Você deve ser " + playerName + ", né?",
      "Fiquei sabendo que você quer mudar de carreira na Vivo.",
      "Vou te explicar o primeiro passo.",
      "Primeiro, você precisa criar seu currículo.",
      "Vá até o computador no escritório.",
      "Preencha seu currículo e depois entregue-o na sala da líder.",
      "Boa sorte!",
    ];

    const width = this.scale.width;
    const height = this.scale.height;
    const speechBubble = this.add.image(width / 1.55, height / 4.8, "speechBubble");
    const text = this.add.text(width / 1.68, height / 7, vivitaDialogues[0], {
      fontSize: "16px",
      fill: "#000000",
      wordWrap: { width: speechBubble.width - 20 },
    });

    let currentDialogueIndex = 0;
    this.input.keyboard.on("keydown-ENTER", () => {
      currentDialogueIndex++;
      if (currentDialogueIndex < vivitaDialogues.length) {
        text.setText(vivitaDialogues[currentDialogueIndex]);
        this.buttonClick.play();
      } else {
        speechBubble.setVisible(false);
        text.setVisible(false);
        this.input.keyboard.off("keydown-ENTER");
        this.addIndicatorAndComputer();
      }
    });
  }

  salaLider() {

    const width = this.scale.width;
    const height = this.scale.height;

    this.exclamation = this.physics.add.sprite(width - 1200, height - 500, 'indicator').setScale(0.2);
    this.exclamation.play('exclaiming');

    this.activeIndicator = true;
    this.indicatorSound = this.sound.add('indicatorSound', { loop: true, volume: 1.5 });
    this.indicatorSound.play();

    this.physics.add.overlap(this.player, this.exclamation, () => {
      if (!this.inTransition) {
        this.inTransition = true;
        this.walkSound.stop();
        this.returnedFromLeaderRoom = true;
        this.scene.get('officeScene').events.emit('stopWalkSound'); // Emite o evento
        this.blockLoop = 0;
        this.exclamation.setVisible(false);
        this.activeIndicator = false;
        this.indicatorSound.stop(); // Para o som quando há overlap
        this.walkSound.stop();
        this.events.emit('stopWalkSound'); // Para o som de passos quando há overlap
        this.scene.switch('salaLiderScene');
        this.scene.get('officeScene').events.emit('stopWalkSound'); // Emite o evento
      }
    });
  }
}

// Propriedade estática para armazenar o tempo de reprodução da música
OfficeScene.lastMusicTime = 0;
