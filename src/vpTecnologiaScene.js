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
    this.load.image("balloonText", "../assets/balaoTexto.png"); // Carrega a imagem do balão de texto
  }

  create() {
    this.add.rectangle(width - 2000, height - 2000, width, height, 0x2F052F).setOrigin(0).setScale(5); // Adiciona um retangulo de fundo

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
    this.createNPCWithBalloon(); // Adiciona a NPC com balão de fala
    this.createComputerIndicator(); // Configura o indicador para o computador

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

    if (this.keyEExample) {
      const distance = Phaser.Math.Distance.Between(this.player.x, this.player.y, 400, 300);
      if (distance > 50) { // Remove a tecla "E" se o jogador se afastar
        this.keyEExample.destroy();
        this.keyEExample = null;
      }
    }
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
    const npc = this.physics.add.sprite(957, 173, "npc"); // Adiciona o sprite da NPC
    npc.setScale(2.5); // Define o tamanho da NPC
    npc.setImmovable(true); // Define a NPC como imóvel para colisões

    const dialogues = [
      "Bem-vindo à VP de Tecnologia!",
      "Aqui você aprenderá sobre inovação e upskilling.",
      "Interaja com o computador para começar o mini-game.",
    ];

    let currentDialogueIndex = 0;

    // Adiciona a exclamação e a tecla "E" sobre a NPC
    const indicator = this.physics.add.sprite(npc.x, npc.y - 50, 'indicator').setScale(0.2);
    indicator.play("exclaiming");
    let keyE = this.add.image(npc.x, npc.y - 80, 'keyE').setScale(0.08).setVisible(false); // Inicialmente invisível

    this.physics.add.overlap(this.player, indicator, () => {
      const distance = Phaser.Math.Distance.Between(this.player.x, this.player.y, npc.x, npc.y);
      if (distance < 100) {
        keyE.setVisible(true); // Mostra a tecla "E" quando o jogador se aproxima
      } else {
        keyE.setVisible(false); // Esconde a tecla "E" quando o jogador se afasta
      }
    });

    const balloonText = this.add.image(npc.x, npc.y - 60, "balloonText").setScale(0.8).setVisible(false);
    const text = this.add.text(npc.x - 70, npc.y - 90, "", {
      fontSize: "14px",
      fill: "#000000",
      wordWrap: { width: balloonText.width - 20 },
    }).setVisible(false);

    const showDialogue = () => {
      if (currentDialogueIndex < dialogues.length) {
        balloonText.setVisible(true);
        text.setText(dialogues[currentDialogueIndex]).setVisible(true);
        currentDialogueIndex++;
      } else {
        balloonText.setVisible(false);
        text.setVisible(false);
        this.input.keyboard.off("keydown-ENTER", showDialogue);

        // Remove a exclamação e a tecla "E" da NPC
        indicator.destroy();
        keyE.destroy();

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
    this.add.image(1111, 381, "computer").setScale(0.1); // Apenas adiciona o computador sem mensagem
  }

  createComputerIndicator() {
    const indicator = this.physics.add.sprite(1111, 331, 'indicator').setScale(0.2).setVisible(false);
    indicator.play("exclaiming");
    const keyE = this.add.image(1111, 301, 'keyE').setScale(0.08).setVisible(false); // Inicialmente invisível

    this.physics.add.overlap(this.player, indicator, () => {
        const distance = Phaser.Math.Distance.Between(this.player.x, this.player.y, 1111, 381);
        if (distance < 100) {
            keyE.setVisible(true); // Mostra a tecla "E" quando o jogador se aproxima
            if (Phaser.Input.Keyboard.JustDown(this.keys.interagir)) {
                this.startMiniGame(); // Inicia o mini-game ao interagir
            }
        } else {
            keyE.setVisible(false); // Esconde a tecla "E" quando o jogador se afasta
        }
    });

    this.input.keyboard.on("keydown-E", () => {
        const distance = Phaser.Math.Distance.Between(this.player.x, this.player.y, 1111, 381);
        if (distance < 100) {
            this.startMiniGame(); // Inicia o mini-game ao pressionar "E" próximo ao computador
        }
    });

    this.computerIndicator = indicator;
    this.keyEComputer = keyE;
}

  activateComputerIndicator() {
    this.computerIndicator.setVisible(true);
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
      this.input.setDraggable(word);
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
    const buttonBack = this.add.image(width - 500, height - 680, "keyE").setScale(0.08);

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
}