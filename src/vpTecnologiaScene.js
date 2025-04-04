class VpTecnologiaScene extends Phaser.Scene {
  constructor() {
    super({ key: 'vpTecnologiaScene' });
  }

  preload() {
    // Carrega o mapa do Tiled e os tilesets
    this.load.tilemapTiledJSON('vpTecnologia', '../assets/vp_tecnologia/mapa.json');
    this.load.image('decoracao', '../assets/mapaVPPessoas/decoracao.png');
    this.load.image('paredes', '../assets/mapaVPPessoas/paredes.png');
    this.load.spritesheet('player', '../assets/Player.png', { frameWidth: 32, frameHeight: 32 });

    this.load.audio('walkSound', '../assets/sounds/753292__vrymaa__footsteps-high-heels-hardwood-walk-run (mp3cut.net).wav');

    // Assets do computador
    this.load.image("computer", "../assets/computador.png");

    // Assets para o mini-game
    this.load.image("box", "../assets/upskilling.png");
    this.load.image("word1", "../assets/upskillingBotão1.png");
    this.load.image("word2", "../assets/upskillingBotão2.png");
    this.load.image("word3", "../assets/upskillingBotão3.png");
    this.load.image("word4", "../assets/upskillingBotão4.png");
  }

  create() {
    const width = this.cameras.main.width;
    const height = this.cameras.main.height;

    const offsetX = this.scale.width - 1270;
    const map = this.make.tilemap({ key: "vpTecnologia", tileWidth: 25, tileHeight: 20 });
    const tileset1 = map.addTilesetImage("decoracao");
    const tileset2 = map.addTilesetImage("paredes");

    const layer1 = map.createLayer("paredePiso", tileset2, offsetX, 0).setScale(2.5);
    const layer2 = map.createLayer("tapete", tileset1, offsetX, 0).setScale(2.5);
    const layer3 = map.createLayer("parede", tileset2, offsetX, 0).setScale(2.5);
    const layer4 = map.createLayer("cadeira", tileset1, offsetX, 0).setScale(2.5);
    const layer5 = map.createLayer("tv", tileset1, offsetX, 0).setScale(2.5);
    const layer6 = map.createLayer("sofa", tileset1, offsetX, 0).setScale(2.5);
    const layer7 = map.createLayer("elevador", tileset1, offsetX, 0).setScale(2.5);

    let layers = [layer1, layer2, layer3, layer4, layer5, layer6, layer7];
    layers.forEach(layer => {
      layer.setCollisionByProperty({ collider: true });
    });

    this.createPlayer(width, height);
    this.createPlayerAnimations();
    this.createComputer(width, height); // Adiciona o computador
    this.createButtonBack(width, height);

    this.physics.add.collider(this.player, layer1);
    this.physics.add.collider(this.player, layer3);
    this.physics.add.collider(this.player, layer4);
    this.physics.add.collider(this.player, layer5);
    this.physics.add.collider(this.player, layer6);

    this.keys = this.input.keyboard.addKeys({
      up: Phaser.Input.Keyboard.KeyCodes.W,
      down: Phaser.Input.Keyboard.KeyCodes.S,
      left: Phaser.Input.Keyboard.KeyCodes.A,
      right: Phaser.Input.Keyboard.KeyCodes.D,
      interagir: Phaser.Input.Keyboard.KeyCodes.E,
      ENTER: Phaser.Input.Keyboard.KeyCodes.ENTER
    });

    this.walkSound = this.sound.add('walkSound', { loop: false, volume: 2 });
  }

  update() {
    this.movePlayer();
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

  createComputer(width, height) {
    const computer = this.add.image(width / 2, height / 2, "computer").setScale(0.2);
    computer.setInteractive();

    computer.on("pointerdown", () => {
      this.startMiniGame();
    });

    this.input.keyboard.on("keydown-E", () => {
      const distance = Phaser.Math.Distance.Between(this.player.x, this.player.y, computer.x, computer.y);
      if (distance < 100) {
        this.startMiniGame();
      }
    });
  }

  startMiniGame() {
    const box = this.add.image(this.cameras.main.width / 2, this.cameras.main.height / 2, "box").setScale(0.8);

    const words = [
      this.add.image(200, 200, "word1").setInteractive(),
      this.add.image(300, 200, "word2").setInteractive(),
      this.add.image(400, 200, "word3").setInteractive(),
      this.add.image(500, 200, "word4").setInteractive(),
    ];

    Phaser.Utils.Array.Shuffle(words);

    //torna as palavras arrastáveis

    words.forEach(word => {
      this.input.setDraggable(word);
    });

    //Cria áreas de destino específicas para cada palavra
    const targetAreas = [
      {x: 400, y: 300, word: "word1"},
      {x: 500, y: 300, word: "word2"},
      {x: 600, y: 300, word: "word3"},
      {x: 700, y: 300, word: "word4"},
    ];

    targetAreas.forEach(area => {
      const target = this.add.rectangle(area.x, area.y, 100, 100, 0x000ff, 0.5);
      this.physics.add.existing(target, true);
      area.target = target; //Salva a refao objeto da área
    })

    //Evento de arrastar 
    this.input.on("dragstart", (pointer, gameObject) => {
      gameObject.setScale(0.9);
    });

    this.input.on("drag", (pointer, gameObject, dragX, dragY) => {
      gameObject.x = dragX;
      gameObject.y = dragY;
    });

    this.input.on("dragend", (pointer, gameObject) => {
      gameObject.setScale(1);
    });

    //Verifica se a palavra foi solta na area correta
    let placedCorrectly = false;
    targetAreas.forEach(area => {
      const bounds = area.target.getBounds();
      if(
        gameObject.x > bounds.x &&
        gameObject.x < bounds.x + bounds.width &&
        gameObject.y > bounds.y &&
        gameObject.y < bounds.y + bounds.height
      ) {
        if( gameObject.texture.key === area.word)
        gameObject.setTint(0x00ff00);
      placedCorrectly = true;
      } else {
        gameObject.setTint(0xff0000);
      }
    });

    if(!placedCorrectly){
      gameObject.clearTint();
    }
    this.createCloseMiniGameButton();
  }

  createCloseMiniGameButton() {
    const closeButton = this.add.image(this.cameras.main.width - 50, this.cameras.main.height - 50, "word1").setScale(0.2);
    closeButton.setInteractive();

    closeButton.on("pointerdown", () => {
      this.scene.resume();
      this.scene.stop();
    });
  }

  createButtonBack(width, height) {
    const buttonBack = this.add.image(width - 700, height - 680, "keyE");
    buttonBack.setScale(0.2);

    this.input.keyboard.on("keydown-E", () => {
      const distance = Phaser.Math.Distance.Between(this.player.x, this.player.y, buttonBack.x, buttonBack.y);
      if (distance < 100) {
        this.sound.stopAll();
        this.scene.stop("vpTecnologiaScene");
        this.scene.start("elevadorScene");
      }
    });
  }
}