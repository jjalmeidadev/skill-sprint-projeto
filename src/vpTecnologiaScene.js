class VpTecnologiaScene extends Phaser.Scene {
  constructor() {
    super({ key: 'vpTecnologiaScene' });
  }

  preload() {
    this.load.tilemapTiledJSON('vpTecnologia', '../assets/vp_tecnologia/mapa.json');
    this.load.image('decoracao', '../assets/mapaVPPessoas/decoracao.png');
    this.load.image('paredes', '../assets/mapaVPPessoas/paredes.png');
    this.load.spritesheet('player', '../assets/Player.png', { frameWidth: 32, frameHeight: 32 });

    this.load.audio('walkSound', '../assets/sounds/753292__vrymaa__footsteps-high-heels-hardwood-walk-run (mp3cut.net).wav');

    this.load.image("computer", "../assets/computador.png");
    this.load.image("box", "../assets/upskilling.png");
    this.load.image("word1", "../assets/upskillingBotão1_0.png");
    this.load.image("word2", "../assets/upskillingBotão2_0.png");
    this.load.image("word3", "../assets/upskillingBotão3_0.png");
    this.load.image("word4", "../assets/upskillingBotão4_0.png");
    this.load.spritesheet("npc", "../assets/personagens/skinsPlayer/Player2Walk.png", { frameWidth: 32, frameHeight: 32 }); // Load NPC asset
  }

  create() {
    const width = this.cameras.main.width;
    const height = this.cameras.main.height;

    const offsetX = this.scale.width - 1270;
    const map = this.make.tilemap({ key: "vpTecnologia", tileWidth: 25, tileHeight: 20 });
    const tileset1 = map.addTilesetImage("decoracao");
    const tileset2 = map.addTilesetImage("paredes");

    const layers = [
      map.createLayer("paredePiso", tileset2, offsetX, 0).setScale(2.5),
      map.createLayer("tapete", tileset1, offsetX, 0).setScale(2.5),
      map.createLayer("parede", tileset2, offsetX, 0).setScale(2.5),
      map.createLayer("cadeira", tileset1, offsetX, 0).setScale(2.5),
      map.createLayer("tv", tileset1, offsetX, 0).setScale(2.5),
      map.createLayer("sofa", tileset1, offsetX, 0).setScale(2.5),
      map.createLayer("elevador", tileset1, offsetX, 0).setScale(2.5),
    ];

    layers.forEach(layer => {
      layer.setCollisionByProperty({ collider: true });
    });

    this.createPlayer(width, height);
    this.createPlayerAnimations();
    this.createComputer(width, height);
    this.createButtonBack(width, height);
    this.createNPC(width, height); // Add NPC creation

    this.physics.add.collider(this.player, layers[0]);
    this.physics.add.collider(this.player, layers[2]);
    this.physics.add.collider(this.player, layers[3]);
    this.physics.add.collider(this.player, layers[4]);
    this.physics.add.collider(this.player, layers[5]);

    this.keys = this.input.keyboard.addKeys({
      up: Phaser.Input.Keyboard.KeyCodes.W,
      down: Phaser.Input.Keyboard.KeyCodes.S,
      left: Phaser.Input.Keyboard.KeyCodes.A,
      right: Phaser.Input.Keyboard.KeyCodes.D,
      interagir: Phaser.Input.Keyboard.KeyCodes.E,
      ENTER: Phaser.Input.Keyboard.KeyCodes.ENTER
    });

    this.walkSound = this.sound.add('walkSound', { loop: false, volume: 2 });

    this.cursorCoordinatesText = this.add.text(10, 10, '', { fontSize: '16px', fill: '#000000' }); // Set text color to black
    this.cursorCoordinatesText.setDepth(1000); // Ensure it is above other elements
  }

  update() {
    this.movePlayer();

    const pointer = this.input.activePointer;
    this.cursorCoordinatesText.setText(`X: ${pointer.worldX.toFixed(0)} Y: ${pointer.worldY.toFixed(0)}`);
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
    } else if (!this.walkSound.isPlaying) {
      this.walkSound.play();
    }
  }

  createNPC(width, height) {
    const npc = this.physics.add.sprite(957, 173, "npc"); // Use the correct sprite type and position
    npc.setScale(2.5); // Match the scale used in other scenes

    const dialogBox = this.add.graphics();
    dialogBox.fillStyle(0x000000, 0.8); // Black background with transparency
    dialogBox.fillRoundedRect(npc.x - 120, npc.y - 100, 240, 60, 10); // Rounded rectangle for the balloon
    dialogBox.setVisible(false);

    const dialogText = this.add.text(npc.x - 110, npc.y - 90, "Bem-vindo! Arraste as palavras para os locais corretos.", {
      fontSize: "14px",
      fill: "#ffffff",
      wordWrap: { width: 220 },
    }).setVisible(false); // Text inside the balloon

    const showDialog = () => {
      dialogBox.setVisible(true); // Show the balloon
      dialogText.setVisible(true); // Show the text
      this.time.delayedCall(3000, () => {
        dialogBox.setVisible(false); // Hide the balloon after 3 seconds
        dialogText.setVisible(false); // Hide the text after 3 seconds
        this.allowComputerInteraction = true; // Allow interaction with the computer
      });
    };

    npc.setInteractive();
    npc.on("pointerdown", showDialog);

    this.input.keyboard.on("keydown-E", () => {
      const distance = Phaser.Math.Distance.Between(this.player.x, this.player.y, npc.x, npc.y);
      if (distance < 100) {
        showDialog();
      }
    });

    this.allowComputerInteraction = false; // Initially disable computer interaction
  }

  createComputer(width, height) {
    const computer = this.add.image(1111, 381, "computer").setScale(0.1); // Updated position and further reduced scale

    const interactWithComputer = () => {
      if (this.allowComputerInteraction) {
        this.startMiniGame();
      } else {
        const warningText = this.add.text(computer.x - 100, computer.y - 50, "Fale com o NPC primeiro!", {
          fontSize: "16px",
          fill: "#ff0000",
          backgroundColor: "#000000",
          padding: { x: 10, y: 5 },
        });
        this.time.delayedCall(2000, () => warningText.destroy()); // Remove warning after 2 seconds
      }
    };

    computer.setInteractive();
    computer.on("pointerdown", interactWithComputer);

    this.input.keyboard.on("keydown-E", () => {
      const distance = Phaser.Math.Distance.Between(this.player.x, this.player.y, computer.x, computer.y);
      if (distance < 100) {
        interactWithComputer();
      }
    });
  }

  startMiniGame() {
    // Add background image for the mini-game
    const background = this.add.image(this.cameras.main.width / 2, this.cameras.main.height / 2, "box").setScale(0.8);

    // Create draggable words with their initial positions
    const words = [
      this.add.image(290, 400, "word1").setInteractive(),
      this.add.image(290, 500, "word2").setInteractive(),
      this.add.image(290, 300, "word3").setInteractive(),
      this.add.image(290, 200, "word4").setInteractive(),
    ];

    const initialPositions = [
      { x: 290, y: 400 },
      { x: 290, y: 500 },
      { x: 290, y: 300 },
      { x: 290, y: 200 },
    ];

    // Enable dragging for words
    words.forEach(word => {
      this.input.setDraggable(word); // Allow dragging any word in any order
    });

    // Define target areas for each word
    const targetAreas = [
      { x: 751, y: 200, word: "word1" },
      { x: 870, y: 290, word: "word2" },
      { x: 1004, y: 340, word: "word3" },
      { x: 691, y: 520, word: "word4" },
    ];

    // Create target areas as smaller rectangles with purple color
    targetAreas.forEach(area => {
      const target = this.add.rectangle(area.x, area.y, 70, 50, 0x800080, 0.5); // Initial color is purple
      area.target = target;
    });

    let placedCorrectly = [false, false, false, false];

    // Handle dragging logic
    this.input.on("drag", (pointer, gameObject, dragX, dragY) => {
      gameObject.setPosition(dragX, dragY);
    });

    // Handle drag end logic
    this.input.on("dragend", (pointer, gameObject) => {
      let correctPlacement = false;

      targetAreas.forEach((area, index) => {
        const gameObjectBounds = gameObject.getBounds();
        const targetBounds = area.target.getBounds();

        if (
          Phaser.Geom.Intersects.RectangleToRectangle(gameObjectBounds, targetBounds) &&
          gameObject.texture.key === area.word &&
          !placedCorrectly[index]
        ) {
          correctPlacement = true;
          placedCorrectly[index] = true;
          gameObject.setPosition(area.x, area.y); // Snap to target area
          gameObject.setTint(0x00ff00); // Highlight correct placement
          gameObject.disableInteractive(); // Make the word immovable
          area.target.setFillStyle(0x00ff00, 0.5); // Change target area color to green
        }
      });

      if (!correctPlacement) {
        // Highlight incorrect placement
        const target = targetAreas.find(area => Phaser.Geom.Intersects.RectangleToRectangle(gameObject.getBounds(), area.target.getBounds()));
        if (target) {
          target.target.setFillStyle(0xff0000, 0.5); // Change target area color to red
          this.time.delayedCall(500, () => {
            target.target.setFillStyle(0x800080, 0.5); // Reset target area color to purple
          });
        }

        // Reset word to its initial position
        const wordIndex = words.indexOf(gameObject);
        if (wordIndex !== -1) {
          this.time.delayedCall(500, () => {
            gameObject.setPosition(initialPositions[wordIndex].x, initialPositions[wordIndex].y);
            gameObject.clearTint();
          });
        }
      }

      // Check if all words are placed correctly
      if (placedCorrectly.every(p => p)) {
        this.endMiniGame(background, words, targetAreas);
      }
    });

    this.createCloseMiniGameButton();
  }

  restartMiniGame(background, words, targetAreas) {
    // Destroy all elements and restart the mini-game
    background.destroy();
    words.forEach(word => word.destroy());
    targetAreas.forEach(area => area.target.destroy());
    this.startMiniGame();
  }

  endMiniGame(background, words, targetAreas) {
    // Remove all elements from the mini-game
    background.destroy();
    words.forEach(word => word.destroy());
    targetAreas.forEach(area => area.target.destroy());

    // Add logic to proceed after the mini-game ends
    console.log("Mini-game completed!");
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
    const buttonBack = this.add.image(width - 700, height - 680, "keyE").setScale(0.2);

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