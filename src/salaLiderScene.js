class SalaLider extends Phaser.Scene {
  constructor() {
    super({ key: "salaLiderScene" });
  }
  preload() {
    // Carrega a sprite do jogador e da exclamação
    this.load.spritesheet("player", "../assets/Player.png", {
      frameWidth: 32,
      frameHeight: 32,
    });
    this.load.spritesheet("indicator", "../assets/exclamaçãoRoxa.png", {
      frameWidth: 254,
      frameHeight: 305,
    });
    this.load.spritesheet("leader", "../assets/personagens/LiderReading.png", {
      frameWidth: 16,
      frameHeight: 32,
    });

    // Carrega o balão de texto
    this.load.image("textBalloon", "../assets/balaoTexto.png");

    // Carrega o mapa da sala do líder
    this.load.tilemapTiledJSON('salaLider', '../assets/mapaSalaLider/mapaSalaLider.json');
    this.load.image('decoracao', '../assets/mapaSalaLider/decoracao.png');

    // Carrega os efeitos sonoros
    this.load.audio('keySound', '../assets/sounds/computer-keyboard-typing-290582 (mp3cut.net).mp3');
    this.load.audio('indicatorSound', '../assets/sounds/497198_abacagi_bubble-pops (mp3cut.net).wav');
    this.load.audio('walkSound', '../assets/sounds/753292__vrymaa__footsteps-high-heels-hardwood-walk-run (mp3cut.net).wav');
    this.load.audio('talkSound', '../assets/sounds/talkSound.wav');
    this.load.audio("officeMusic", "../assets/0320(1).MP3");

  }

  create() {
    this.sound.stopAll();

    this.cameras.main.fadeIn(1000); // Transição suave

    const startTime = OfficeScene.lastMusicTime || 0;
    this.officeMusic = this.sound.add("officeMusic", { loop: true });
    this.officeMusic.play({ seek: startTime });

    // Carrega os efeitos sonoros
    this.buttonClick = this.sound.add('buttonSound', { loop: false, volume: 10 });
    this.walkSound = this.sound.add('walkSound', { loop: false, volume: 2 });

    //cria a animação da exclamação
    this.anims.create({
      key: "exclamando",
      frames: this.anims.generateFrameNumbers("indicator", {
        start: 0,
        end: 1,
      }),
      //velocidade da animação
      frameRate: 3,
      repeat: -1,
    });

    // Configuração inicial
    this.leaderInteracted = false; // Variável para controlar se a interação já ocorreu

    // Configuração do teclado (WASD + E para interação)
    this.keyboards = this.input.keyboard.addKeys({
      up: Phaser.Input.Keyboard.KeyCodes.W,
      down: Phaser.Input.Keyboard.KeyCodes.S,
      left: Phaser.Input.Keyboard.KeyCodes.A,
      right: Phaser.Input.Keyboard.KeyCodes.D,
      interagir: Phaser.Input.Keyboard.KeyCodes.E,
    });

    // Evento para a tecla 'E'
    this.input.keyboard.on('keydown-E', () => {
      if (
        Math.abs(this.player.x - this.leader.x) <= 150 &&
        Math.abs(this.player.y - this.leader.y) <= 150 &&
        !this.leaderInteracted // Verifica se a interação já ocorreu
      ) {
        this.showLeaderInteraction(); // Chama a função de interação com a líder
        this.leaderInteracted = true; // Marca que a interação ocorreu
      }
    });

    // Adiciona o mapa da sala do líder
    const map = this.make.tilemap({
      key: "salaLider",
      tileWidth: 10,
      tileHeight: 6,
    });

    // Adiciona o tileset utilizado no mapa
    const tileset = map.addTilesetImage("decoracao");

    const offsetX = width - 1170; // Offset para centralizar o mapa
    const offsetY = height - 650; // Offset para centralizar o mapa

    // Adiciona as camadas do mapa
    const layer1 = map
      .createLayer("chao", tileset, offsetX, offsetY)
      .setScale(5);
    const layer2 = map
      .createLayer("tapete", tileset, offsetX, offsetY)
      .setScale(5);
    const layer3 = map
      .createLayer("parede", tileset, offsetX, offsetY)
      .setScale(5);
    const layer4 = map
      .createLayer("mesa", tileset, offsetX, offsetY)
      .setScale(5);
    const layer5 = map
      .createLayer("decoracao", tileset, offsetX, offsetY)
      .setScale(5);
    const layer6 = map
      .createLayer("pertences", tileset, offsetX, offsetY)
      .setScale(5);

    // Torna as colisões criadas no Tiled válidas no jogo
    layer1.setCollisionByProperty({ collider: true });
    layer2.setCollisionByProperty({ collider: true });
    layer3.setCollisionByProperty({ collider: true });
    layer4.setCollisionByProperty({ collider: true });
    layer5.setCollisionByProperty({ collider: true });
    layer6.setCollisionByProperty({ collider: true });

    this.createLeaderAnimations();
    this.addLeader();
    this.createPlayer();
    this.createPlayerAnimations();

    // Configura colisões entre o jogador e algumas camadas selecionadas
    this.physics.add.collider(this.player, layer3);
    this.physics.add.collider(this.player, layer4);
    this.physics.add.collider(this.player, layer5);
    this.physics.add.collider(this.player, this.leader);
  }

  update() {
    // Atualiza o movimento do jogador
    this.movePlayer();

    if (this.indicatorActive == false) {
      this.indicatorSound.stop();
    }
  }

  movePlayer() {
    const velocidade = 150;
    let movendo = false;

    if (this.keyboards.left.isDown) {
      this.player.setVelocityX(-velocidade);
      this.player.anims.play("walk_left", true);
      this.player.setFlipX(true);
      movendo = true;
    } else if (this.keyboards.right.isDown) {
      this.player.setVelocityX(velocidade);
      this.player.anims.play("walk_right", true);
      this.player.setFlipX(false);
      movendo = true;
    } else {
      this.player.setVelocityX(0);
    }

    if (this.keyboards.up.isDown) {
      this.player.setVelocityY(-velocidade);
      this.player.anims.play("walk_up", true);
      movendo = true;
    } else if (this.keyboards.down.isDown) {
      this.player.setVelocityY(velocidade);
      this.player.anims.play("walk_down", true);
      movendo = true;
    } else {
      this.player.setVelocityY(0);
    }

    if (!movendo) {
      this.player.anims.stop();
      this.walkSound.stop();
    } else {
      if (!this.walkSound.isPlaying) {
        this.walkSound.play();
      }
    }
  }

  createPlayer() {
    // Cria o sprite do jogador usando as dimensões da tela
    this.player = this.physics.add.sprite(width - 1050, height - 230, "player");
    this.player.setScale(5);
  }

  createPlayerAnimations() {
    // Define as animações do jogador
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

  createLeaderAnimations() {
    this.anims.create({
      key: "drink",
      frames: this.anims.generateFrameNumbers("leader", { start: 0, end: 11 }),
      frameRate: 4,
      repeat: -1,
    });
  }

  addLeader() {
    //Adiciona a líder no jogo
    this.leader = this.physics.add.sprite(width - 600, height - 300, 'leader');
    this.leader.setScale(4.5);
    this.leader.setFlipX(true);
    this.leader.setImmovable(true);
    this.leader.anims.play('drink');


    // Adiciona a sprite da exclamação
    this.exclamation = this.add.sprite(width - 600, height - 400, 'indicator').setScale(0.3);
    this.exclamation.play('exclamando'); // Inicia a animação
    this.indicatorActive = true;
    if (this.indicatorActive) {
      this.indicatorSound = this.sound.add('indicatorSound', { loop: true, volume: 1.5 });
      this.indicatorSound.play();
    }

    // Torna a leader interativa
    this.leader.setInteractive();
    this.leader.on('pointerdown', () => {
      this.showLeaderInteraction(); // Chama a função de interação com a leader
    });

    // Adiciona um evento para a tecla 'E'
    this.input.keyboard.on('keydown-E', () => {
      this.indicatorActive = false;
      // Verifica se o jogador está próximo da leader
      if (
        Math.abs(this.player.x - this.leader.x) <= 150 &&
        Math.abs(this.player.y - this.leader.y) <= 150 &&
        !this.leaderInteracted // Verifica se a interação já ocorreu
      ) {
        // Chama a função de interação com a leader
        this.showLeaderInteraction();
        this.buttonClick.play();
        this.leaderInteracted = true; // Marca que a interação ocorreu
      }
    });
  }

  showLeaderInteraction() {
    this.exclamation.setVisible(false); // Remove a exclamação

    var leaderDialog = [
      'Olá, ' + playerName + '! Tudo bem?',
      'Ah, então quer dizer que você quer migrar para uma nova VP? Que alegria!',
      'Vou analisar seu currículo.',
      'Vamos ver...',
      'Seu currículo está uma maravilha! Seguiu todas as diretrizes!',
      'Vá até o elevador para conhecer as áreas internas da vivo!'
    ];

    let currentDialogIndex = 0;
    const audio = this.sound.add('talkSound', { volume: 1 });
    let textBalloon, text;

    // Adiciona o balão de fala
    if (!textBalloon) {
      textBalloon = this.add.image(width - 730, height - 420, 'textBalloon');
      textBalloon.setFlipX(true);
      textBalloon.setVisible(true);

      // Adiciona a caixa de texto dentro do balão
      text = this.add.text(width - 815, height - 480, leaderDialog[0], {
        fontSize: '16px',
        fill: '#000000',
        wordWrap: { width: textBalloon.width - 20 }
      });
      text.setVisible(true);

      // Inicia o áudio ao começar o diálogo
      audio.play();
    }

    // Evento para avançar o diálogo com "ENTER"
    this.input.keyboard.on('keydown-ENTER', () => {
      if (!textBalloon || !text) return; // Se o diálogo não começou, ignora

      currentDialogIndex++;

      if (currentDialogIndex < leaderDialog.length) {
        audio.stop(); // Para o áudio antes de reiniciar
        audio.play(); // Toca novamente para a nova fala

        text.setText(leaderDialog[currentDialogIndex]); // Atualiza o texto
        this.buttonClick.play();
      } else {
        // Finaliza o diálogo
        textBalloon.setVisible(false);
        text.setVisible(false);
        audio.stop(); // Para o áudio ao final
        this.input.keyboard.off('keydown-ENTER'); // Desativa ENTER após o diálogo
        this.backToOffice();
      }
    });
  }


  backToOffice() {
    // Adiciona a sprite da exclamação
    this.exclamation = this.physics.add.sprite(width - 1050, height - 230, 'indicator').setScale(0.3);
    this.exclamation.setImmovable(true);
    this.exclamation.play('exclamando'); // Inicia a animação
    this.indicatorActive = true;
    if (this.indicatorActive) {
      this.indicatorSound = this.sound.add('indicatorSound', { loop: true, volume: 1.5 });
      this.indicatorSound.play();
    }

    // Adiciona um overlap entre o player e a exclamation
    this.physics.add.overlap(this.player, this.exclamation, () => {
      this.indicatorActive = false;
    });

    this.scene.get('officeScene').events.emit('stopWalkSound'); // Emite o evento
    this.scene.switch('officeScene'); // Retorna para a OfficeScene
    this.scene.get('officeScene').events.emit('stopWalkSound'); // Emite o evento
  }
}
