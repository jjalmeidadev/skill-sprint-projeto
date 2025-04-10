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
    this.load.spritesheet('player', `../assets/personagens/skinsPlayer/players/${this.selectedSpriteSheet}.png`, { frameWidth: 16, frameHeight: 32, });

    this.load.audio("bgMusic", "../assets/sounds/Funk-Modulator-RoccoW-_-Chiptune-_No-Copyright-Music_.mp3");
    this.load.audio('walkSound', '../assets/sounds/753292__vrymaa__footsteps-high-heels-hardwood-walk-run (mp3cut.net).wav');
    this.load.audio('correctSound', '../assets/sounds/476178__unadamlar__correct-choice.wav');
    this.load.audio('wrongSound', '../assets/sounds/700641__producing_raylite__incorrect-buzzer.wav');
    this.load.audio('keySound', '../assets/sounds/computer-keyboard-typing-290582 (mp3cut.net).mp3');

    this.load.image("computer", "../assets/computador.png");
    this.load.image("box", "../assets/upskilling.png");
    this.load.image("word1", "../assets/upskillingBotão1.png");
    this.load.image("word2", "../assets/upskillingBotão2.png");
    this.load.image("word3", "../assets/upskillingBotão3.png");
    this.load.image("word4", "../assets/upskillingBotão4.png");
    this.load.spritesheet("npcTech", "../assets/personagens/npc7.png", { frameWidth: 16, frameHeight: 32, });
    this.load.spritesheet("indicator", "../assets/exclamaçãoRoxa.png", { frameWidth: 254, frameHeight: 305 });
    this.load.image('keyE', '../assets/teclaE.png');
    this.load.image('keyEnter', '../assets/keyEnter.png');
    this.load.image("balloonText", "../assets/balaoTexto.png");
    this.load.image('levelTitleTech', '../assets/titulos/tituloVpTecnologia.png');
  }

  create() {
    // Adicione estas linhas no início do create() se não estiverem definidas
    const width = this.scale.width;
    const height = this.scale.height;

    this.add.rectangle(width - 2000, height - 2000, width, height, 0x2F052F).setOrigin(0).setScale(5);
    this.miniGameActive = false;

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
    this.cameras.main.startFollow(this.player);
    this.cameras.main.setZoom(2);

    // Then create barriers
    this.barriers = this.physics.add.staticGroup();

    // Top barrier
    this.barriers.create(width / 2, 0, 'paredes')
      .setScale(width, 0.1)
      .setVisible(false)
      .refreshBody();

    // Bottom barrier  
    this.barriers.create(width / 2, height, 'paredes')
      .setScale(width, 0.1)
      .setVisible(false)
      .refreshBody();

    // Left barrier
    this.barriers.create(0, height / 2, 'paredes')
      .setScale(0.1, height)
      .setVisible(false)
      .refreshBody();

    // Right barrier
    this.barriers.create(width, height / 2, 'paredes')
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
    this.createNPCWithBalloon();

    this.keys = this.input.keyboard.addKeys({
      up: Phaser.Input.Keyboard.KeyCodes.W,
      down: Phaser.Input.Keyboard.KeyCodes.S,
      left: Phaser.Input.Keyboard.KeyCodes.A,
      right: Phaser.Input.Keyboard.KeyCodes.D,
      interagir: Phaser.Input.Keyboard.KeyCodes.E,
      ENTER: Phaser.Input.Keyboard.KeyCodes.ENTER
    });

    this.computerIndicatorDestroyed = false;

    this.walkSound = this.sound.add('walkSound', { loop: false, volume: 2 });

    this.cursorCoordinatesText = this.add.text(10, 10, '', { fontSize: '16px', fill: '#000000', fontFamily: 'font' });
    this.cursorCoordinatesText.setDepth(1000);

    this.barrierDoor = this.add.rectangle(width - 520, height - 720, 20, 20, 0x2F052F).setOrigin(0); // Adiciona um retângulo como barreira
    this.physics.add.existing(this.barrierDoor, true); // Ativa a física do retângulo
    this.physics.add.collider(this.player, this.barrierDoor); // Adiciona colisão entre o jogador e a barreira
    this.barrierDoor.setVisible(false); // Torna o retângulo invisível

    this.showTitle();
  }

  update() {
    this.movePlayer();

    const pointer = this.input.activePointer;
    this.cursorCoordinatesText.setText(`X: ${pointer.worldX.toFixed(0)} Y: ${pointer.worldY.toFixed(0)}`);

    // Interação com o computador
    if (this.keyEComputer) {
      const distance = Phaser.Math.Distance.Between(this.player.x, this.player.y, 985, 381);
    
      if (distance < 100 && !this.miniGameActive) {
        this.keyEComputer.setVisible(true);
    
        // Destrói o indicador se ainda não foi destruído
        if (this.computerIndicator && !this.computerIndicatorDestroyed) {
          this.computerIndicator.destroy();
          this.computerIndicator = null;
          this.computerIndicatorDestroyed = true;
        }
    
        if (Phaser.Input.Keyboard.JustDown(this.keys.interagir)) {
          this.miniGameActive = true;
          if (this.keyEComputer) {
            this.keyEComputer.destroy();
            this.keyEComputer = null;
          }
          this.startMiniGame();
        }
      } else if (this.keyEComputer && this.keyEComputer.active) {
        this.keyEComputer.setVisible(false);
      }
    }
  }

  keySound() {
    this.keySoundPlay = this.sound.add('keySound', { loop: false, volume: 10 }); // Adiciona o som de digitação no teclado com volume alto
    this.keySoundPlay.play(); // Reproduz o som de digitação no teclado
  }

  showTitle() {
    const titleImage = this.add.image(this.player.x, this.player.y - 150, 'levelTitleTech').setDepth(1000);
    titleImage.setScale(0.3);

    // Adiciona um fade out para o título após alguns segundos
    this.time.delayedCall(3000, () => {
      this.tweens.add({
        targets: titleImage,
        alpha: 0,
        duration: 1000,
        onComplete: () => titleImage.destroy()
      });
    });
  }

  createPlayer(width, height) {
    this.player = this.physics.add.sprite(width - 500, height - 640, "player");
    this.player.setScale(2.5);
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
      frameRate: 5,
      repeat: -1,
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

  movePlayer() {
    const speed = 150;
    let moving = false;

    if (this.keys.left.isDown) {
      this.player.setVelocityX(-speed);
      this.lastPosition = "left";
      this.player.anims.play("walk_left", true);
      moving = true;
    } else if (this.keys.right.isDown) {
      this.player.setVelocityX(speed);
      this.lastPosition = "right";
      this.player.anims.play("walk_right", true);
      moving = true;
    } else {
      this.player.setVelocityX(0);
    }

    if (this.keys.up.isDown) {
      this.player.setVelocityY(-speed);
      this.lastPosition = "up";
      this.player.anims.play("walk_up", true);
      moving = true;
    } else if (this.keys.down.isDown) {
      this.player.setVelocityY(speed);
      this.lastPosition = "down";
      this.player.anims.play("walk_down", true);
      moving = true;
    } else {
      this.player.setVelocityY(0);
    }

    if (!moving) {
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

      if (this.walkSound && this.walkSound.isPlaying) {
        this.walkSound.stop();
      }
    } else {
      if (this.walkSound && !this.walkSound.isPlaying) {
        this.walkSound.play();
      }
    }
  }

  createNPCWithBalloon() {
    const npc = this.physics.add.sprite(900, 173, "npcTech");
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
      wordWrap: { width: balloonText.width - 50 }
    }).setVisible(false);

    const showDialogue = () => {
      if (currentDialogueIndex < dialogues.length) {
        this.keySound();
        isDialogueActive = true;
        indicator.setVisible(false);
        keyE.setVisible(false);
        keyEnter.setVisible(true);
        balloonText.setVisible(true);
        text.setText(dialogues[currentDialogueIndex]).setVisible(true);
        currentDialogueIndex++;
      } else {
        this.createComputerIndicator();
        this.keySound();
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
    this.add.image(985, 381, "computer").setScale(0.1).setFlipX(true); // Apenas adiciona o computador sem mensagem
  }

  createComputerIndicator(visible = true) {
    // Criar o indicator inicialmente invisível
    const indicator = this.physics.add.sprite(985, 331, 'indicator')
      .setScale(0.2)
      .setVisible(visible);

    if (visible) {
      indicator.play("exclaiming");
    }

    // Apenas a keyE que ficará invisível inicialmente
    const keyE = this.add.image(985, 301, 'keyE').setScale(0.08).setVisible(false).setDepth(1);

    this.computerIndicatorDestroyed = false;

    // Verificar distância no overlap para mostrar tecla E
    this.physics.add.overlap(this.player, indicator, () => {
      if (!indicator.visible) return;

      const distance = Phaser.Math.Distance.Between(this.player.x, this.player.y, 985, 381);
      if (distance < 100 && !this.miniGameActive) {
        keyE.setVisible(true);
      } else {
        keyE.setVisible(false);
      }
    });

    this.input.keyboard.on("keydown-E", () => {
      if (!indicator.visible) return;

      const distance = Phaser.Math.Distance.Between(this.player.x, this.player.y, 985, 381);
      if (distance < 100 && !this.miniGameActive) {
        this.miniGameActive = true;
        this.keySound();
        keyE.setVisible(false);
        this.startMiniGame();
      }
    });

    this.computerIndicator = indicator;
    this.keyEComputer = keyE;
  }

  activateComputerIndicator() {
    if (this.computerIndicator && !this.computerIndicator.visible) {
      this.computerIndicator.setVisible(true);
      this.computerIndicator.play("exclaiming");
    }
  }

  startMiniGame() {
    // Pausar o movimento do jogador durante o minigame
    this.player.setVelocity(0, 0);

    // Reset zoom and camera follow for mini-game
    this.cameras.main.stopFollow();
    this.cameras.main.setZoom(1);
    this.cameras.main.centerOn(this.cameras.main.width / 2, this.cameras.main.height / 2);

    // Criar um container para todos os elementos do minigame (facilita a limpeza depois)
    this.miniGameContainer = this.add.container(0, 0);

    // Add semi-transparent overlay
    const overlay = this.add.rectangle(
      this.cameras.main.width / 2,
      this.cameras.main.height / 2,
      this.cameras.main.width,
      this.cameras.main.height,
      0x000000,
      0.7
    );
    this.miniGameContainer.add(overlay);

    // Add background image for the mini-game
    const background = this.add.image(
      this.cameras.main.width / 2,
      this.cameras.main.height / 2,
      "box"
    ).setScale(0.8);
    this.miniGameContainer.add(background);

    // MINIGAME MELHORADO: Criar caixas alvo
    const targetBoxes = [
      { x: width - 760, y: height - 544, word: "word1" },
      { x: width - 654, y: height - 459, word: "word2" },
      { x: width - 515, y: height - 418, word: "word3" },
      { x: width - 822, y: height - 247, word: "word4" },
    ];

    // Criar caixas de destino visualmente distintas
    targetBoxes.forEach(box => {
      // Criar um retângulo como caixa alvo
      const target = this.add.rectangle(box.x, box.y, 100, 33, 0x800080);
      box.target = target;
      this.miniGameContainer.add(target);
    });

    // Criar palavras arrastáveis - todas disponíveis desde o início
    const words = [
      this.add.image(width - 1210, height - 350, "word1").setScale(0.5).setInteractive({ draggable: true }),
      this.add.image(width - 1210, height - 550, "word2").setScale(0.5).setInteractive({ draggable: true }),
      this.add.image(width - 1210, height - 250, "word3").setScale(0.5).setInteractive({ draggable: true }),
      this.add.image(width - 1210, height - 450, "word4").setScale(0.5).setInteractive({ draggable: true }),
    ];

    this.miniGameContainer.add(words);

    // Guardar posições iniciais para retorno em caso de erro
    const initialPositions = [
      { x: width - 1210, y: height - 350 },
      { x: width - 1210, y: height - 550 },
      { x: width - 1210, y: height - 250 },
      { x: width - 1210, y: height - 450 },
    ];

    // Título do minigame
    const gameTitle = this.add.text(
      this.cameras.main.width / 2,
      12,
      'Arraste cada conceito para sua posição correta! Leia atentamente.',
      {
        fontSize: '25px',
        fill: '#000000',
        backgroundColor: '#8A2BE2',
        padding: { x: 20, y: 15 },
        align: 'center',
        fontFamily: 'font'
      }
    ).setOrigin(0.5);
    this.miniGameContainer.add(gameTitle);

    // Sistema de feedback
    const feedbackText = this.add.text(
      this.cameras.main.width / 2,
      150,
      '',
      {
        fontSize: '18px',
        fill: '#000000',
        backgroundColor: '#000000',
        padding: { x: 15, y: 8 },
        align: 'center',
        fontFamily: 'font'
      }
    ).setOrigin(0.5).setVisible(false);
    this.miniGameContainer.add(feedbackText);

    // Mostrar feedback temporário
    const showFeedback = (message, color = '#000000') => {
      feedbackText.setText(message);
      feedbackText.setBackgroundColor(color);
      feedbackText.setVisible(true);

      this.time.delayedCall(2000, () => {
        feedbackText.setVisible(false);
      });
    };

    // Controle de acertos
    let placedCorrectly = [false, false, false, false];
    let completeCount = 0;

    // Lógica de drag e drop
    this.input.on('dragstart', (pointer, gameObject) => {
      this.children.bringToTop(gameObject);
    });

    this.input.on('drag', (pointer, gameObject, dragX, dragY) => {
      gameObject.x = dragX;
      gameObject.y = dragY;
    });

    this.input.on('dragend', (pointer, gameObject) => {
      let correctPlacement = false;
      const wordIndex = words.indexOf(gameObject);

      targetBoxes.forEach((box, index) => {
        const distance = Phaser.Math.Distance.Between(gameObject.x, gameObject.y, box.x, box.y);

        if (distance < 50 && gameObject.texture.key === box.word) {
          correctPlacement = true;
          if (!placedCorrectly[wordIndex]) {
            placedCorrectly[wordIndex] = true;
            completeCount++;
          }

          gameObject.setPosition(box.x, box.y);
          gameObject.input.enabled = false; // Desabilitar futuros drags
          box.target.setFillStyle(0x00FF00, 0.5); // Verde para indicar acerto

          showFeedback("Correto!", "#00FF00");
          this.correct = this.sound.add('correctSound', { loop: false, volume: 10 });
          this.correct.play();

          // Se todas as palavras estiverem corretas
          if (completeCount === 4) {
            this.time.delayedCall(1000, () => this.showMiniGameSuccess());
          }
        }
      });

      if (!correctPlacement) {
        // Verificar se foi colocado em alguma caixa errada
        const wrongTarget = targetBoxes.find(box =>
          Phaser.Math.Distance.Between(gameObject.x, gameObject.y, box.x, box.y) < 50);

        if (wrongTarget) {
          wrongTarget.target.setFillStyle(0xFF0000, 0.5); // Vermelho para indicar erro

          // Resetar a cor depois de um tempo
          this.time.delayedCall(500, () => {
            if (!placedCorrectly.some((placed, idx) =>
              placed && words[idx].texture.key === wrongTarget.word)) {
              wrongTarget.target.setFillStyle(0x800080);
            }
          });

          showFeedback("Incorreto! Tente novamente.", "#8B0000");
          this.wrong = this.sound.add('wrongSound', { loop: false, volume: 10 });
          this.wrong.play();
        }

        // Retornar à posição inicial
        gameObject.setPosition(initialPositions[wordIndex].x, initialPositions[wordIndex].y);
      }
    });

    // Adicionar botão de fechar/voltar
    const closeButton = this.add.image(
      this.cameras.main.width - 40,
      40,
      'keyE'
    ).setScale(0.15).setInteractive();

    closeButton.on('pointerup', () => {
      this.closeMiniGame();
    });

    this.miniGameContainer.add(closeButton);

    // Adicionar texto explicativo ao botão
    const closeText = this.add.text(
      this.cameras.main.width - 40,
      70,
      'Fechar',
      { fontSize: '14px', fill: '#000000', fontFamily: 'font' }
    ).setOrigin(0.5);

    this.miniGameContainer.add(closeText);
  }

  showMiniGameSuccess() {
    // Overlay de sucesso
    const successOverlay = this.add.rectangle(
      this.cameras.main.width / 2,
      this.cameras.main.height / 2,
      this.cameras.main.width,
      this.cameras.main.height,
      0x000000,
      0.8
    );

    const successContainer = this.add.container(this.cameras.main.width / 2, this.cameras.main.height / 2);
    const successBg = this.add.rectangle(0, 0, 800, 300, 0xB600B9, 0.9).setOrigin(0.5);

    const successTitle = this.add.text(0, -100, 'PARABÉNS!', {
      fontSize: '40px',
      fill: '#000000',
      fontStyle: 'bold',
      fontFamily: 'font'
    }).setOrigin(0.5);

    const successText = this.add.text(0, 0,
      'Você montou corretamente o conceito de upskilling:\n\n' +
      'Aprender NOVAS COMPETÊNCIAS para DESENVOLVIMENTO\n' +
      'e APRENDIZADO CONTÍNUO!',
      {
        fontSize: '24px',
        fill: '#000000',
        align: 'center',
        fontFamily: 'font'
      }
    ).setOrigin(0.5);

    const continueText = this.add.text(0, 100, 'Pressione ENTER para continuar', {
      fontSize: '18px',
      fill: '#000000',
      fontFamily: 'font'
    }).setOrigin(0.5);

    successContainer.add([successBg, successTitle, successText, continueText]);

    // Piscar o texto de continuar
    this.tweens.add({
      targets: continueText,
      alpha: 0,
      duration: 800,
      yoyo: true,
      repeat: -1
    });

    // Adicionar evento de teclado para continuar
    const enterKey = this.input.keyboard.addKey('ENTER');
    enterKey.on('down', () => {
      successContainer.destroy();
      successOverlay.destroy();
      this.closeMiniGame();
    });

    // Também permitir clique para continuar
    successBg.setInteractive();
    successBg.on('pointerdown', () => {
      successContainer.destroy();
      successOverlay.destroy();
      this.closeMiniGame();
    });
  }

  closeMiniGame() {
    // Limpar todos os elementos do minigame
    if (this.miniGameContainer) {
      this.miniGameContainer.destroy();
    }

    // Remover todos os listeners de input do minigame
    this.input.off('dragstart');
    this.input.off('drag');
    this.input.off('dragend');

  }

  // Restaurar o jogo principal

  closeMiniGame() {

    // Limpar todos os elementos do minigame
    if (this.miniGameContainer) {
      this.miniGameContainer.destroy(true); // O parâmetro true garante a destruição completa
      this.miniGameContainer = null;
    }

    // Remover todos os listeners de input do minigame
    this.input.off('dragstart');
    this.input.off('drag');
    this.input.off('dragend');

    // Restaurar o jogo principal
    this.miniGameActive = false;
    this.cameras.main.startFollow(this.player);
    this.cameras.main.setZoom(2);

    // Garantir que o indicador do computador fique visível novamente
    if (this.computerIndicator) {
      this.computerIndicator.setVisible(true);
    }
    this.createButtonBack();

  }

  createButtonBack() {
    // Cria o sprite da exclamação (ou mantenha o nome buttonBack se preferir)
    const exclamation = this.physics.add.sprite(width - 520, height - 680, "indicator");
    exclamation.play("exclaiming"); // Reproduz a animação de exclamação
    exclamation.setScale(0.2);
    exclamation.setImmovable(true); // Evita que o objeto se mova com colisões
  
    // Adiciona o overlap entre player e exclamation
    this.physics.add.overlap(this.player, exclamation, () => {
      // Lógica de troca de cena
      this.sound.stopAll();
  
      this.registry.set('vpTecnologiaConcluida', true);
      const elevadorScene = this.scene.get("elevadorScene");
      elevadorScene.resumeFromTech = true;
  
      this.scene.stop("vpTecnologiaScene");
      this.scene.resume("elevadorScene");
    }, null, this);
  }
}