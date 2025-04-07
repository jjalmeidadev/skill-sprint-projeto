class SalaLider extends Phaser.Scene {
  constructor() {
    super({ key: "salaLiderScene" });
  }

  init(data) {
    this.selectedSpriteSheet = data.selectedSpriteSheet;
    
  }

  preload() {
    this.load.spritesheet('player', `../assets/personagens/skinsPlayer/players/${this.selectedSpriteSheet}.png`, {frameWidth: 16, frameHeight: 32, }); // Sprite do jogador com dimensões de cada frame
    this.load.spritesheet("indicator", "../assets/exclamaçãoRoxa.png", {frameWidth: 254,  frameHeight: 305 }); // Sprite da exclamação com dimensões de cada frame
    this.load.spritesheet("leader", "../assets/personagens/LiderReading.png", { frameWidth: 16, frameHeight: 32 }); // Sprite da líder com dimensões de cada frame

    this.load.tilemapTiledJSON('salaLider', '../assets/mapaSalaLider/mapaSalaLider.json');
    this.load.image('decoracao', '../assets/mapaSalaLider/decoracao.png');

    this.load.audio('keySound', '../assets/sounds/computer-keyboard-typing-290582 (mp3cut.net).mp3');
   
    this.load.audio('walkSound', '../assets/sounds/753292__vrymaa__footsteps-high-heels-hardwood-walk-run (mp3cut.net).wav');
    this.load.audio("officeMusic", "../assets/0320(1).MP3");

    this.load.image('keyE', '../assets/teclaE.png');
    this.load.image('keyENTER', '../assets/keyEnter.png');
    this.load.image("textBalloon", "../assets/balaoTexto.png");
  }
 
  create() { 
    this.sound.stopAll();
    this.cameras.main.fadeIn(1000);

    const startTime = OfficeScene.lastMusicTime || 0; // Obtém o tempo de início da música do escritório
    this.officeMusic = this.sound.add("officeMusic", { loop: true }); // Adiciona a música do escritório
    this.officeMusic.play({ seek: startTime });  // Inicia a música do escritório a partir do tempo salvo

    this.buttonClick = this.sound.add('buttonSound', { loop: false, volume: 10 }); // Som do clique do botão
    this.walkSound = this.sound.add('walkSound', { loop: false, volume: 2 }); // Som dos passos

    this.anims.create({ // Cria animação para a tecla E
      key: "exclaiming",
      frames: this.anims.generateFrameNumbers("indicator", { start: 0, end: 1 }),
      frameRate: 3,
      repeat: -1,
    });

    this.leaderInteracted = false; // Variável para controlar se o jogador já interagiu com o líder

    this.keys = this.input.keyboard.addKeys({ // Define as teclas de controle
      up: Phaser.Input.Keyboard.KeyCodes.W,
      down: Phaser.Input.Keyboard.KeyCodes.S,
      left: Phaser.Input.Keyboard.KeyCodes.A,
      right: Phaser.Input.Keyboard.KeyCodes.D,
      interagir: Phaser.Input.Keyboard.KeyCodes.E,
    });

    this.input.keyboard.on('keydown-E', () => { // Evento para tecla E
      if (this.canInteractWithLeader && !this.leaderInteracted) {
        this.showLeaderInteraction();
        this.buttonClick.play();
        this.leaderInteracted = true;
        if (this.keyELeader) {
          this.keyELeader.destroy();
          this.keyELeader = null;
        }
        if (!this.keyENTERLeader) {
          this.keyENTERLeader = this.add.image(this.leader.x, this.leader.y - 50, 'keyENTER').setScale(0.13).setDepth(1000);
        }
      }
    });

    // Define variáveis para criar os limites do mundo do jogo
    const boundaryOffsetX = width - 1170;  // Calcula o deslocamento X baseado na largura da tela
    const boundaryOffsetY = height - 650;  // Calcula o deslocamento Y baseado na altura da tela
    const boundaryWidth = 1170;            // Define a largura da área jogável
    const boundaryHeight = 500;            // Define a altura da área jogável (reduzida para criar barreira superior)

    // Cria uma barreira invisível na parte inferior da tela
    const bottomWall = this.add.rectangle(
      boundaryOffsetX + boundaryWidth/2,   // Posiciona a barreira no centro horizontal da área
      boundaryOffsetY + boundaryHeight - 30,// Posiciona a barreira verticalmente (30 pixels acima)
      boundaryWidth,                       // Define a largura da barreira
      20,                                  // Define a altura da barreira
      0x000000,                           // Cor da barreira (preto)
      0                                   // Transparência total (invisível)
    );
    this.physics.add.existing(bottomWall, true); // Adiciona física estática à barreira

    // Define os limites físicos do mundo do jogo
    this.physics.world.setBounds(boundaryOffsetX, boundaryOffsetY, boundaryWidth, boundaryHeight);

    // Configura e carrega o mapa do jogo
    const map = this.make.tilemap({ key: "salaLider", tileWidth: 10, tileHeight: 6 }); // Cria o mapa usando o arquivo JSON
    const tileset = map.addTilesetImage("decoracao");   // Adiciona o conjunto de tiles de decoração
    const offsetX = width - 1170;                       // Define o deslocamento X para as camadas
    const offsetY = height - 650;                       // Define o deslocamento Y para as camadas

    // Cria as diferentes camadas do mapa
    const layer1 = map.createLayer("chao", tileset, offsetX, offsetY).setScale(5);        // Camada do chão
    const layer2 = map.createLayer("tapete", tileset, offsetX, offsetY).setScale(5);      // Camada do tapete
    const layer3 = map.createLayer("parede", tileset, offsetX, offsetY).setScale(5);      // Camada das paredes
    const layer4 = map.createLayer("mesa", tileset, offsetX, offsetY).setScale(5);        // Camada das mesas
    const layer5 = map.createLayer("decoracao", tileset, offsetX, offsetY).setScale(5);   // Camada de decoração
    const layer6 = map.createLayer("pertences", tileset, offsetX, offsetY).setScale(5);   // Camada de pertences

    // Configura colisões para cada camada do mapa
    layer1.setCollisionByProperty({ collider: true });  // Ativa colisões na camada do chão
    layer2.setCollisionByProperty({ collider: true });  // Ativa colisões na camada do tapete
    layer3.setCollisionByProperty({ collider: true });  // Ativa colisões na camada das paredes
    layer4.setCollisionByProperty({ collider: true });  // Ativa colisões na camada das mesas
    layer5.setCollisionByProperty({ collider: true });  // Ativa colisões na camada de decoração
    layer6.setCollisionByProperty({ collider: true });  // Ativa colisões na camada de pertences

    this.createLeaderAnimations(); // Cria animações para o líder
    this.addLeader(); // Adiciona o líder ao jogo
    this.canInteractWithLeader = false; // Variável para controlar a interação com o líder

    this.createPlayer(); // Cria o jogador
    this.createPlayerAnimations(); 

    // Adiciona colisão com os limites do mundo logo após a criação do jogador
    this.player.setCollideWorldBounds(true);

    this.physics.add.collider(this.player, layer3);
    this.physics.add.collider(this.player, layer4);
    this.physics.add.collider(this.player, layer5);
    this.physics.add.collider(this.player, this.leader);

    // Limpa o som do indicador ao sair da cena
    this.events.on('shutdown', () => {
      if (this.indicatorSound) {
        this.indicatorSound.stop();
        this.indicatorSound.destroy();
        this.indicatorSound = null;
      }
    });
  }

  update() {
    this.movePlayer(); // Atualiza a movimentação do jogador a cada frame

    if (!this.indicatorActive && this.indicatorSound) { // Som da Exclamação
      this.indicatorSound.stop();
      this.indicatorSound.destroy();
      this.indicatorSound = null;
    }

    if (
      Math.abs(this.player.x - this.leader.x) <= 100 &&
      Math.abs(this.player.y - this.leader.y) <= 100 &&
      !this.leaderInteracted
    ) {
      this.canInteractWithLeader = true;
      if (!this.keyELeader) {
        this.keyELeader = this.add.image(this.leader.x, this.leader.y - 50, 'keyE').setScale(0.09).setDepth(1000);
      }
    } else {
      this.canInteractWithLeader = false;
      if (this.keyELeader) {
        this.keyELeader.destroy();
        this.keyELeader = null;
      }
    }
  }

  movePlayer() { // Movimentação do jogador
    const speed = 150;
    let moving = false;

    if (this.keys.left.isDown) { // Verifica se a tecla para esquerda está pressionada
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

    if (this.keys.up.isDown) { // Verifica se a tecla para cima está pressionada
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

    if (!moving) { // Se o jogador não está se movendo
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

  createPlayer() { // Cria o jogador
    this.player = this.physics.add.sprite(width - 1050, height - 230, "player");
    this.player.setScale(5);
  }

  createPlayerAnimations() { // Cria animações para o jogador
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

  createLeaderAnimations() { // Cria animações para o líder
    this.anims.create({
      key: "drink",
      frames: this.anims.generateFrameNumbers("leader", { start: 0, end: 11 }),
      frameRate: 4,
      repeat: -1,
    });
  }

  addLeader() {
    this.leader = this.physics.add.sprite(width - 600, height - 300, 'leader');
    this.leader.setScale(4.5);
    this.leader.setFlipX(true);
    this.leader.setImmovable(true);
    this.leader.anims.play('drink');

    // Cria a exclamação acima da líder
    this.exclamation = this.add.sprite(width - 600, height - 400, 'indicator').setScale(0.3);
    this.exclamation.play('exclaiming');
    this.indicatorActive = true;

    this.leader.setInteractive();
    this.leader.on('pointerdown', () => {
      this.showLeaderInteraction();
    });
  }

  showLeaderInteraction() {
    // Ao iniciar a interação, para e destrói o som do indicador (se existir)
    if (this.indicatorSound) {
      this.indicatorSound.stop();
      this.indicatorSound.destroy();
      this.indicatorSound = null;
    }
    if (this.exclamation) {
      this.exclamation.setVisible(false);
    }

    const leaderDialog = [ // Diálogo do líder
      'Olá, ' + playerName + '! Tudo bem?',
      'Ah, então quer dizer que você quer migrar para uma nova VP? Que alegria!',
      'Vou analisar seu currículo.',
      'Vamos ver...',
      'Seu currículo está uma maravilha! Seguiu todas as diretrizes!',
      'Vá até o elevador para conhecer as áreas internas da vivo!'
    ];

    let currentDialogIndex = 0; // Índice do diálogo atual
    let textBalloon = this.add.image(width - 730, height - 420, 'textBalloon');
    textBalloon.setFlipX(true).setVisible(true);

    let text = this.add.text(width - 815, height - 480, leaderDialog[0], {
      fontSize: '16px',
      fill: '#000000',
      wordWrap: { width: textBalloon.width - 20 }
    });
    text.setVisible(true);

    this.input.keyboard.on('keydown-ENTER', () => {
      if (!textBalloon || !text) return;
      currentDialogIndex++;
      if (currentDialogIndex < leaderDialog.length) {
        text.setText(leaderDialog[currentDialogIndex]);
        this.buttonClick.play();
      } else {
        textBalloon.setVisible(false);
        text.setVisible(false);
        this.input.keyboard.off('keydown-ENTER');
        if (this.keyENTERLeader) {
          this.keyENTERLeader.destroy();
          this.keyENTERLeader = null;
        }
        this.showIndicatorToReturn(); // Chama a função para mostrar o indicador de retorno
      }
    });
  }

  showIndicatorToReturn() {
    // Cria um novo indicador para retornar à cena do escritório
    if (this.exclamation) {
      this.exclamation.destroy();
    }
    this.exclamation = this.physics.add.sprite(width - 1050, height - 230, 'indicator').setScale(0.3);
    this.exclamation.setImmovable(true);
    this.exclamation.play('exclaiming');
    this.indicatorActive = true;

    this.physics.add.overlap(this.player, this.exclamation, () => { // Verifica a sobreposição entre o jogador e o indicador
      if (this.indicatorActive) {
        this.scene.get('officeScene').events.emit('stopWalkSound');
        this.scene.switch('officeScene');
        this.scene.get('officeScene').events.emit('stopWalkSound');
        this.indicatorActive = false;
      }
    });
  }

  backToOffice() { // Função para voltar à cena do escritório
    if (this.exclamation) {
      this.exclamation.destroy();
    }
    this.exclamation = this.physics.add.sprite(width - 1050, height - 230, 'indicator').setScale(0.3);
    this.exclamation.setImmovable(true);
    this.exclamation.play('exclaiming');
    this.indicatorActive = true;

   

    this.physics.add.overlap(this.player, this.exclamation, () => {
      if (this.indicatorActive && this.indicatorSound) {
        this.indicatorSound.stop();
        this.indicatorSound.destroy();
        this.indicatorActive = false;
      }
    });
    
    this.registry.set('selectedSpriteSheet', this.selectedSpriteSheet); // Salva o dado no Data Manager
    this.scene.get('officeScene').events.emit('stopWalkSound');
    this.scene.switch('officeScene');
    this.scene.get('officeScene').events.emit('stopWalkSound');
  }
}
