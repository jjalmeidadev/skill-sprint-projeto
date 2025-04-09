class VpTecnologiaScene extends Phaser.Scene {
  constructor() {
    super({ key: 'vpTecnologiaScene' });
  }

  init(data) {
    this.selectedSpriteSheet = data.selectedSpriteSheet;
  }

  preload() {
    this.load.tilemapTiledJSON('vpTecnologia', '../assets/vp_tecnologia/mapa.json');
    this.load.image('decoracao', '../assets/mapaVPPessoas/decoracao.png');
    this.load.image('paredes', '../assets/mapaVPPessoas/paredes.png');
    this.load.spritesheet('player', `../assets/personagens/skinsPlayer/players/${this.selectedSpriteSheet}.png`, {frameWidth: 16,frameHeight: 32,});

    this.load.audio("bgMusic", "../assets/sounds/Funk-Modulator-RoccoW-_-Chiptune-_No-Copyright-Music_.mp3");

    this.load.audio('walkSound', '../assets/sounds/753292__vrymaa__footsteps-high-heels-hardwood-walk-run (mp3cut.net).wav');

    this.load.image("computer", "../assets/computador.png");
    this.load.image("box", "../assets/upskilling.png");
    this.load.image("word1", "../assets/upskillingBotão1.png");
    this.load.image("word2", "../assets/upskillingBotão2.png");
    this.load.image("word3", "../assets/upskillingBotão3.png");
    this.load.image("word4", "../assets/upskillingBotão4.png");
    this.load.spritesheet("npc", "../assets/personagens/npc7.png", {frameWidth: 16, frameHeight: 32, }); // Carrega o spritesheet do NPC 7
    this.load.spritesheet("indicator", "../assets/exclamaçãoRoxa.png", { frameWidth: 254, frameHeight: 305 }); // Carrega o spritesheet do indicador
    this.load.image('keyE', '../assets/teclaE.png'); // Carrega a imagem da tecla "E"
    this.load.image('keyEnter', '../assets/keyEnter.png'); // Add keyEnter image load here
    this.load.image("balloonText", "../assets/balaoTexto.png"); // Carrega a imagem do balão de texto
    this.load.image('levelTitle', '../assets/titulos/tituloVpTecnologia.png') // Carrega os asssets do titulo da fase
  }

  create() {
    this.add.rectangle(width - 2000, height - 2000, width, height, 0x2F052F).setOrigin(0).setScale(5); // Adiciona um retangulo de fundo

    // Initialize and play background music with better error handling
    try {
      if (!this.bgMusic) {
        this.bgMusic = this.sound.add("bgMusic", { 
          loop: true, 
          volume: 4,
          rate: 1
        });
      }
      if (!this.bgMusic.isPlaying) {
        this.bgMusic.play();
      }
    } catch (error) {
      console.warn("Could not play background music:", error);
    }

    // Create exclamation animation
    if (!this.anims.exists('exclaiming')) {
      this.anims.create({
        key: 'exclaiming',
        frames: this.anims.generateFrameNumbers('indicator', { start: 0, end: 1 }),
        frameRate: 3,
        repeat: -1
      });
    }

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

    // Create player first
    this.createPlayer(width, height);
    this.createPlayerAnimations();

    // Dá zoom na tela do jogo e faz a câmera seguir o personagem
    this.cameras.main.startFollow(this.player); // Faz a câmera seguir o jogador
    this.cameras.main.setZoom(2); // Define o nível de zoom da câmera

    // Then create barriers
    this.barriers = this.physics.add.staticGroup();
    
    // Top barrier
    this.barriers.create(width/2, 0, 'paredes')
      .setScale(width, 0.1)
      .setVisible(false)
      .refreshBody();
    
    // Bottom barrier  
    this.barriers.create(width/2, height, 'paredes')
      .setScale(width, 0.1)
      .setVisible(false)
      .refreshBody();
    
    // Left barrier
    this.barriers.create(0, height/2, 'paredes')
      .setScale(0.1, height)
      .setVisible(false)
      .refreshBody();
    
    // Right barrier
    this.barriers.create(width, height/2, 'paredes')
      .setScale(0.1, height)
      .setVisible(false)
      .refreshBody();

    // Add collisions after both player and barriers exist
    this.physics.add.collider(this.player, this.barriers);
    this.physics.add.collider(this.player, layers[0]);
    this.physics.add.collider(this.player, layers[2]);
    this.physics.add.collider(this.player, layers[3]);
    this.physics.add.collider(this.player, layers[4]);
    this.physics.add.collider(this.player, layers[5]);

    // Create remaining elements
    this.createComputer(width, height);
    this.createButtonBack(width, height);
    this.createNPCWithBalloon();
    this.createComputerIndicator();

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

    this.showTitle(); // Exibe o titulo da fase
  }

  update() {
    this.movePlayer();

    const pointer = this.input.activePointer;
    this.cursorCoordinatesText.setText(`X: ${pointer.worldX.toFixed(0)} Y: ${pointer.worldY.toFixed(0)}`);

    if (this.keyEExample) {
      const distance = Phaser.Math.Distance.Between(this.player.x, this.player.y, 400, 300);
      if (distance > 50) { // Remove a tecla "E" se o jogador se afastar
        this.keyEExample.destroy();
        this.keyEExample = null;
      }
    }
  }

  showTitle() {
    const titleImage = this.add.image(this.player.x, this.player.y - 150, 'levelTitle').setDepth(1000); // Adiciona a imagem de parabéns acima do jogador e define sua profundidade para garantir que fique acima de outros elementos
    titleImage.setScale(0.3); // Ajusta o tamanho da imagem de parabéns
  }

  createPlayer(width, height) {
    this.player = this.physics.add.sprite(width - 500, height - 640, "player");
    this.player.setScale(2.5);
  }

  createPlayerAnimations() {
    this.anims.create({
      key: "walk_down", // Chave para a animação de caminhar para baixo
      frames: this.anims.generateFrameNumbers("player", { start: 130, end: 135 }), // Define os frames da animação
      frameRate: 10, // Define a taxa de quadros por segundo
      repeat: -1, // Faz a animação repetir indefinidamente
    });
    this.anims.create({
      key: "walk_right", // Chave para a animação de caminhar para a direita
      frames: this.anims.generateFrameNumbers("player", { start: 112, end: 117 }), // Define os frames da animação
      frameRate: 10, // Define a taxa de quadros por segundo
      repeat: -1, // Faz a animação repetir indefinidamente
    });
    this.anims.create({
      key: "walk_up", // Chave para a animação de caminhar para cima
      frames: this.anims.generateFrameNumbers("player", { start: 118, end: 123 }), // Define os frames da animação
      frameRate: 10, // Define a taxa de quadros por segundo
      repeat: -1, // Faz a animação repetir indefinidamente
    });
    this.anims.create({
      key: "walk_left", // Chave para a animação de caminhar para a esquerda
      frames: this.anims.generateFrameNumbers("player", { start: 124, end: 129 }), // Define os frames da animação
      frameRate: 10, // Define a taxa de quadros por segundo
      repeat: -1, // Faz a animação repetir indefinidamente
    });
    this.anims.create({
      key: "stop_down", // Chave para a animação de parada olhando para baixo
      frames: this.anims.generateFrameNumbers("player", { start: 74, end: 79 }), // Define os frames da animação
      frameRate: 5, // Define a taxa de quadros por segundo (mais lento)
      repeat: -1, // Faz a animação repetir indefinidamente
    });
    this.anims.create({
      key: "stop_right", // Chave para a animação de parada olhando para a direita
      frames: this.anims.generateFrameNumbers("player", { start: 56, end: 61 }), // Define os frames da animação
      frameRate: 5, // Define a taxa de quadros por segundo
      repeat: -1, // Faz a animação repetir indefinidamente
    });
    this.anims.create({
      key: "stop_up", // Chave para a animação de parada olhando para cima
      frames: this.anims.generateFrameNumbers("player", { start: 62, end: 67 }), // Define os frames da animação
      frameRate: 5, // Define a taxa de quadros por segundo
      repeat: -1, // Faz a animação repetir indefinidamente
    });
    this.anims.create({
      key: "stop_left", // Chave para a animação de parada olhando para a esquerda
      frames: this.anims.generateFrameNumbers("player", { start: 68, end: 73 }), // Define os frames da animação
      frameRate: 5, // Define a taxa de quadros por segundo
      repeat: -1, // Faz a animação repetir indefinidamente
    });
  }


   movePlayer() {
    const speed = 150; // Define a velocidade do jogador
    let moving = false; // Variável para verificar se o jogador está se movendo

    if (this.keys.left.isDown) { // Verifica se a tecla para mover à esquerda está pressionada
      this.player.setVelocityX(-speed); // Move o jogador para a esquerda
      this.lastPosition = "left"; // Armazena a última direção como "esquerda"
      this.player.anims.play("walk_left", true); // Reproduz a animação de caminhar para a esquerda
      moving = true; // Define que o jogador está se movendo
    } else if (this.keys.right.isDown) { // Verifica se a tecla para mover à direita está pressionada
      this.player.setVelocityX(speed); // Move o jogador para a direita
      this.lastPosition = "right"; // Armazena a última direção como "direita"
      this.player.anims.play("walk_right", true); // Reproduz a animação de caminhar para a direita
      moving = true; // Define que o jogador está se movendo
    } else {
      this.player.setVelocityX(0); // Para o movimento horizontal do jogador
    }

    if (this.keys.up.isDown) { // Verifica se a tecla para mover para cima está pressionada
      this.player.setVelocityY(-speed); // Move o jogador para cima
      this.lastPosition = "up"; // Armazena a última direção como "cima"
      this.player.anims.play("walk_up", true); // Reproduz a animação de caminhar para cima
      moving = true; // Define que o jogador está se movendo
    } else if (this.keys.down.isDown) { // Verifica se a tecla para mover para baixo está pressionada
      this.player.setVelocityY(speed); // Move o jogador para baixo
      this.lastPosition = "down"; // Armazena a última direção como "baixo"
      this.player.anims.play("walk_down", true); // Reproduz a animação de caminhar para baixo
      moving = true; // Define que o jogador está se movendo
    } else {
      this.player.setVelocityY(0); // Para o movimento vertical do jogador
    }

    // Se o personagem parou, inicia a animação de stop_* em loop
    if (!moving) { // Verifica se o jogador não está se movendo
      switch (this.lastPosition) { // Verifica a última direção do jogador
        case "left": // Caso a última direção seja "esquerda"
          this.player.anims.play("stop_left", true); // Reproduz a animação de parada para a esquerda
          break;
        case "right": // Caso a última direção seja "direita"
          this.player.anims.play("stop_right", true); // Reproduz a animação de parada para a direita
          break;
        case "up": // Caso a última direção seja "cima"
          this.player.anims.play("stop_up", true); // Reproduz a animação de parada para cima
          break;
        case "down": // Caso a última direção seja "baixo"
        default: // Caso padrão (última direção "baixo")
          this.player.anims.play("stop_down", true); // Reproduz a animação de parada para baixo
          break;
      }
     // this.soundWalk.stop(); // Para o som de passos
    //} else {
     // if (!this.soundWalk.isPlaying) { // Verifica se o som de passos não está tocando
       // this.soundWalk.play(); // Reproduz o som de passos
      //}
    }
  }

  createNPC(width, height) {
    const npc = this.physics.add.sprite(957, 173, "npc"); // Use the correct sprite type and position
    npc.setScale(2.5); // Match the scale used in other scenes

    const dialogBox = this.add.graphics();
    dialogBox.fillStyle(0xffffff, 0.8); // White background with transparency
    dialogBox.fillRoundedRect(npc.x - 120, npc.y - 100, 240, 60, 10); // Rounded rectangle for the balloon
    dialogBox.setVisible(false);

    const dialogText = this.add.text(npc.x - 110, npc.y - 90, "", {
      fontSize: "14px",
      fill: "#000000", // Black text
      wordWrap: { width: 220 },
    }).setVisible(false); // Text inside the balloon

    const dialogues = [
      "Bem-vindo! Arraste as palavras para os locais corretos.",
      "Você pode tentar novamente se errar.",
      "Boa sorte no mini-game!",
    ];

    let currentDialogueIndex = 0;

    const showDialog = () => {
      if (currentDialogueIndex < dialogues.length) {
        dialogBox.setVisible(true); // Show the balloon
        dialogText.setText(dialogues[currentDialogueIndex]).setVisible(true); // Show the text
        currentDialogueIndex++;
        this.time.delayedCall(3000, () => {
          dialogBox.setVisible(false); // Hide the balloon after 3 seconds
          dialogText.setVisible(false); // Hide the text after 3 seconds
          if (currentDialogueIndex < dialogues.length) {
            showDialog(); // Show the next dialogue
          } else {
            this.allowComputerInteraction = true; // Allow interaction with the computer
          }
        });
      }
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

  createNPCWithBalloon() {
    const npc = this.physics.add.sprite(900, 173, "npc"); // Changed x from 957 to 857
    npc.setScale(2.5);
    npc.setImmovable(true);
    
    // Add collision between player and NPC
    this.physics.add.collider(this.player, npc);

    const dialogues = [
      "Bem-vindo(a) à VP de Tecnologia!",
      "Você aprenderá sobre reskilling e upskilling.",
      "Isso te ajudará no seu aprendizado contínuo na Vivo!",
      "Interaja com o computador para começar!",
    ];

    let currentDialogueIndex = 0;
    let isDialogueActive = false;

    // Adiciona a exclamação e a tecla "E" sobre a NPC
    const indicator = this.physics.add.sprite(npc.x, npc.y - 50, 'indicator').setScale(0.2);
    indicator.play("exclaiming");
    let keyE = this.add.image(npc.x, npc.y - 80, 'keyE').setScale(0.08).setVisible(false); // Inicialmente invisível
    let keyEnter = this.add.image(npc.x, npc.y - 80, 'keyEnter').setScale(0.1).setVisible(false);

    this.physics.add.overlap(this.player, indicator, () => {
      const distance = Phaser.Math.Distance.Between(this.player.x, this.player.y, npc.x, npc.y);
      if (distance < 100 && !isDialogueActive) {
        keyE.setVisible(true); // Mostra a tecla "E" quando o jogador se aproxima
      } else {
        keyE.setVisible(false); // Esconde a tecla "E" quando o jogador se afasta
      }
    });

    const balloonText = this.add.image(npc.x + 100, npc.y - 60, "balloonText").setScale(0.8).setVisible(false);
    const text = this.add.text(npc.x + 40, npc.y - 100, "", {
      fontSize: "12px",
      fill: "#000000",
      wordWrap: { width: balloonText.width - 50 },
    }).setVisible(false);

    const showDialogue = () => {
      if (currentDialogueIndex < dialogues.length) {
        isDialogueActive = true;
        indicator.setVisible(false);
        keyE.setVisible(false);
        keyEnter.setVisible(true);
        balloonText.setVisible(true);
        text.setText(dialogues[currentDialogueIndex]).setVisible(true);
        currentDialogueIndex++;
      } else {
        balloonText.setVisible(false);
        text.setVisible(false);
        keyEnter.setVisible(false);
        this.input.keyboard.off("keydown-ENTER", showDialogue);
        isDialogueActive = false;

        // Remove a exclamação e a tecla "E" da NPC
        indicator.destroy();
        keyE.destroy();
        keyEnter.destroy();

        // Ativa o indicador sobre o computador
        this.activateComputerIndicator();
      }
    };

    npc.setInteractive();
    npc.on("pointerdown", () => {
      currentDialogueIndex = 0; // Reinicia o índice das falas
      showDialogue();
      this.input.keyboard.on("keydown-ENTER", showDialogue); // Adiciona evento para avançar as falas com ENTER
    });

    this.input.keyboard.on("keydown-E", () => {
      const distance = Phaser.Math.Distance.Between(this.player.x, this.player.y, npc.x, npc.y);
      if (distance < 100) {
        currentDialogueIndex = 0; // Reinicia o índice das falas
        showDialogue();
        this.input.keyboard.on("keydown-ENTER", showDialogue); // Adiciona evento para avançar as falas com ENTER
      }
    });
  }

  createComputer(width, height) {
    this.add.image(985, 381, "computer").setScale(0.1); // Apenas adiciona o computador sem mensagem
  }

  createComputerIndicator() {
    const indicator = this.physics.add.sprite(985, 331, 'indicator').setScale(0.2).setVisible(false);
    indicator.play("exclaiming");
    
    // Adjusted keyE position to be higher above the computer
    const keyE = this.add.image(985, 301, 'keyE')
      .setScale(0.08)
      .setVisible(false)
      .setDepth(1); // Ensure keyE appears above other elements

    this.physics.add.overlap(this.player, indicator, () => {
        const distance = Phaser.Math.Distance.Between(this.player.x, this.player.y, 985, 381);
        if (distance < 100 && !this.miniGameActive) {  // Add check for miniGameActive
            keyE.setVisible(true);
            indicator.setVisible(true);
            if (Phaser.Input.Keyboard.JustDown(this.keys.interagir)) {
                this.miniGameActive = true;  // Set flag when minigame starts
                keyE.setVisible(false);      // Ensure keyE is hidden
                this.startMiniGame();
            }
        } else {
            keyE.setVisible(false);
            indicator.setVisible(false);
        }
    });

    // Keep both key E and indicator visible after computer interaction is activated
    this.input.keyboard.on("keydown-E", () => {
        const distance = Phaser.Math.Distance.Between(this.player.x, this.player.y, 1111, 381);
        if (distance < 100) {
            this.startMiniGame();
        }
    });

    this.computerIndicator = indicator;
    this.keyEComputer = keyE;
}

  activateComputerIndicator() {
    this.computerIndicator.setVisible(true);
  }

  startMiniGame() {
    // Hide key E when minigame starts
    if (this.keyEComputer) {
      this.keyEComputer.setVisible(false);
    }
    
    // Reset zoom and camera follow for mini-game
    this.cameras.main.stopFollow();
    this.cameras.main.setZoom(1);
    this.cameras.main.centerOn(this.cameras.main.width / 2, this.cameras.main.height / 2);

    // Add background image for the mini-game
    const background = this.add.image(this.cameras.main.width / 2, this.cameras.main.height / 2, "box").setScale(0.8);

    // Create draggable words with their initial positions - with smaller scale
    const words = [
      this.add.image(290, 400, "word1").setScale(0.7).setInteractive({ draggable: true }),
      this.add.image(290, 500, "word2").setScale(0.7).setInteractive({ draggable: true }),
      this.add.image(290, 300, "word3").setScale(0.7).setInteractive({ draggable: true }),
      this.add.image(290, 200, "word4").setScale(0.7).setInteractive({ draggable: true }),
    ];

    const initialPositions = [
      { x: 290, y: 400 },
      { x: 290, y: 500 },
      { x: 290, y: 300 },
      { x: 290, y: 200 },
    ];

    // Update drag handlers to work with multiple elements
    this.input.on('dragstart', (pointer, gameObject) => {
      this.children.bringToTop(gameObject);
    });

    this.input.on('drag', (pointer, gameObject, dragX, dragY) => {
      gameObject.x = dragX;
      gameObject.y = dragY;
    });

    // Define target areas for each word
    const targetAreas = [
      { x: 751, y: 200, word: "word1" },
      { x: 870, y: 290, word: "word2" },
      { x: 1004, y: 340, word: "word3" },
      { x: 693, y: 500, word: "word4" },
    ];

    // Create target areas as smaller rectangles with purple color
    targetAreas.forEach(area => {
      const target = this.add.rectangle(area.x, area.y, 70, 50, 0x800080, 0.5); // Initial color is purple
      area.target = target;
    });

    let placedCorrectly = [false, false, false, false];

    // Create a reusable speech balloon
    const speechBalloon = this.add.graphics();
    const speechText = this.add.text(0, 0, "", {
      fontSize: "14px",
      fill: "#000000", // Black text
      wordWrap: { width: 200 },
    }).setVisible(false);

    const showSpeechBalloon = (x, y, message) => {
      speechBalloon.clear();
      speechBalloon.fillStyle(0xffffff, 0.8); // White background with transparency
      speechBalloon.fillRoundedRect(x - 110, y - 50, 220, 40, 10);
      speechText.setText(message).setPosition(x - 100, y - 45).setVisible(true);
      this.time.delayedCall(2000, () => {
        speechBalloon.clear();
        speechText.setVisible(false);
      });
    };

    // Store instruction text in scene for later reference
    this.instruction = this.add.text(
      this.cameras.main.width / 2,
      100,
      'Posicione a palavra "novas" na posição correta!',
      {
        fontSize: '24px',
        fill: '#000000',
        backgroundColor: '#ffffff',
        padding: { x: 10, y: 5 }
      }
    ).setOrigin(0.5).setDepth(1);

    // Handle dragging logic
    this.input.on("drag", (pointer, gameObject, dragX, dragY) => {
      gameObject.setPosition(dragX, dragY);
    });

    // Handle drag end logic
    this.input.on("dragend", (pointer, gameObject) => {
      let correctPlacement = false;

      targetAreas.forEach((area, index) => {
        const distance = Phaser.Math.Distance.Between(gameObject.x, gameObject.y, area.x, area.y);

        if (
          distance < 50 && // Add a proximity check for the target
          gameObject.texture.key === area.word &&
          !placedCorrectly[index]
        ) {
          correctPlacement = true;
          placedCorrectly[index] = true;
          gameObject.setPosition(area.x, area.y); // Snap to target area
          gameObject.setTint(0x00ff00); // Highlight correct placement
          gameObject.disableInteractive(); // Make the word immovable
          area.target.setFillStyle(0x00ff00, 0.5); // Change target area color to green
          showSpeechBalloon(area.x, area.y - 50, "Correto!");
          
          // Remove instruction text specifically when word1 is placed correctly
          if (gameObject.texture.key === "word1" && this.instruction) {
            this.instruction.destroy();
          }
        }
      });

      if (!correctPlacement) {
        // Highlight incorrect placement
        const target = targetAreas.find(area => Phaser.Math.Distance.Between(gameObject.x, gameObject.y, area.x, area.y) < 50);
        if (target) {
          target.target.setFillStyle(0xff0000, 0.5); // Change target area color to red
          this.time.delayedCall(500, () => {
            target.target.setFillStyle(0x800080, 0.5); // Reset target area color to purple
          });
        }

        // Provide feedback for incorrect placement
        showSpeechBalloon(gameObject.x, gameObject.y - 50, "Errado! Tente novamente.");
        this.time.delayedCall(500, () => {
          const wordIndex = words.indexOf(gameObject);
          if (wordIndex !== -1) {
            gameObject.setPosition(initialPositions[wordIndex].x, initialPositions[wordIndex].y); // Reset to original position
            gameObject.clearTint(); // Remove the red tint
          }
        });
      }

      // Check if all words are placed correctly
      if (placedCorrectly.every(p => p)) {
        const overlay = this.add.rectangle(
          this.cameras.main.width / 2,
          this.cameras.main.height / 2,
          this.cameras.main.width,
          this.cameras.main.height,
          0x000000,
          0.7
        );

        const feedbackContainer = this.add.container(this.cameras.main.width / 2, this.cameras.main.height / 2);
        const feedbackBg = this.add.rectangle(0, 0, 800, 200, 0xB600B9, 0.9).setOrigin(0.5);
        feedbackBg.setStrokeStyle(4, 0xB600B9);

        const feedbackText = this.add.text(0, 0, 'Parabéns! Você montou corretamente o conceito de upskilling: aprender novas competências para desenvolvimento e aprendizado contínuo!', {
          fontSize: '24px',
          fill: '#000000',
          align: 'center',
          fontFamily: 'font',
          wordWrap: { width: 750 }
        }).setOrigin(0.5);

        feedbackContainer.add([feedbackBg, feedbackText]);

        this.time.delayedCall(8000, () => {
          this.tweens.add({
            targets: [overlay, feedbackContainer],
            alpha: 0,
            duration: 500,
            onComplete: () => {
              overlay.destroy();
              feedbackContainer.destroy();
              this.endMiniGame(background, words, targetAreas);
            }
          });
        });
      }
    });

    this.createCloseMiniGameButton();
  }

  showPositionSuccess(x, y) {
    const successContainer = this.add.container(x, y);
    const successBg = this.add.rectangle(0, 0, 200, 40, 0x00ff00, 0.8);
    const successText = this.add.text(0, 0, "Correto!", {
      fontSize: '16px',
      fill: '#000000'
    }).setOrigin(0.5);
    
    successContainer.add([successBg, successText]);
    
    this.tweens.add({
      targets: successContainer,
      alpha: 0,
      y: y - 20,
      duration: 1000,
      onComplete: () => successContainer.destroy()
    });
  }

  showPositionError(x, y, message = "Posição incorreta!") {
    const errorContainer = this.add.container(x, y);
    const errorBg = this.add.rectangle(0, 0, 200, 40, 0xff0000, 0.8);
    const errorText = this.add.text(0, 0, message, {
      fontSize: '16px',
      fill: '#ffffff'
    }).setOrigin(0.5);
    
    errorContainer.add([errorBg, errorText]);
    
    this.tweens.add({
      targets: errorContainer,
      alpha: 0,
      y: y - 20,
      duration: 1000,
      onComplete: () => errorContainer.destroy()
    });
  }

  resetWordPosition(gameObject, words, initialPositions) {
    const index = words.indexOf(gameObject);
    if (index !== -1) {
      gameObject.setPosition(initialPositions[index].x, initialPositions[index].y);
    }
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
      // Restore camera settings when closing mini-game
      this.cameras.main.startFollow(this.player);
      this.cameras.main.setZoom(2);
      this.scene.resume();
      this.scene.stop();
    });
  }

  createButtonBack(width, height) {
    const buttonBack = this.add.image(width - 500, height - 720, "keyE").setScale(0.08);

    this.input.keyboard.on("keydown-E", () => {
      const distance = Phaser.Math.Distance.Between(this.player.x, this.player.y, buttonBack.x, buttonBack.y);
      if (distance < 100) {
        this.sound.stopAll();

        this.registry.set('vpTecnologiaConcluida', true);
        const elevadorScene = this.scene.get("elevadorScene");
        elevadorScene.resumeFromTech = true;
        this.scene.stop("vpTecnologiaScene");
        this.scene.resume("elevadorScene");
      }
    });
  }

  createIndicators() {
    // Exemplo de indicador de interação
    this.indicatorExample = this.physics.add.sprite(400, 300, 'indicator'); // Adiciona o indicador na posição desejada
    this.indicatorExample.setScale(0.2); // Define o tamanho do indicador
    this.indicatorExample.play("exclaiming"); // Inicia a animação de exclamação

    this.physics.add.overlap(this.player, this.indicatorExample, () => {
      if (!this.keyEExample) { // Se a tecla "E" ainda não foi exibida
        this.keyEExample = this.add.image(400, 260, 'keyE').setScale(0.08); // Adiciona a tecla "E" acima do indicador
      }
    });
  }

  // Add cleanup method for when scene changes
  onShutdown() {
    if (this.bgMusic && this.bgMusic.isPlaying) {
      this.bgMusic.stop();
    }
  }

  shutdown() {
    if (this.bgMusic) {
      this.bgMusic.stop();
    }
  }
}