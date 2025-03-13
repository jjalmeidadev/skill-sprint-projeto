class OfficeScene extends Phaser.Scene {
  constructor() {
    // Chama o construtor da classe Phaser.Scene com a chave 'officeScene'
    super({ key: 'officeScene' });
    this.canMove = true; // Controla se o jogador pode se mover
  }

  preload() {
    // Carrega imagens e spritesheets necessárias para a cena
    this.load.image('background', '../assets/mapaJogoVivo.png');
    this.load.spritesheet('player', '../assets/Player.png', { frameWidth: 32, frameHeight: 32 });
    this.load.image('telaComputador', '../assets/tela_computador.png');
    this.load.image('computador', '../assets/computador.png');
    this.load.image('indicator', '../assets/Exclamação.png');
    this.load.image('botaoElevOffice', '../assets/botaocimaelevador.png');
    this.load.image('bgElevOffice', '../assets/bgelevadoroffice.png');
    this.load.image('painelelev', '../assets/painelelevador.png');
    this.load.tilemapTiledJSON("escritorio", "../assets/mapaJogoVivo/mapaJogoVivo.json");
    this.load.image("decoracao", "../assets/mapaJogoVivo/decoracao.png");
    this.load.image("paredes", "../assets/mapaJogoVivo/paredes.png");
    this.load.image("personalizado_vivo", "../assets/mapaJogoVivo/personalizado_vivo.png");
  }

  create() {
    // Efeito de fade na câmera ao iniciar a cena
    this.cameras.main.fadeIn(1000);

    // Armazena as dimensões da tela em propriedades da instância
    this.screenWidth = this.sys.game.config.width;
    this.screenHeight = this.sys.game.config.height;

    // Cria o tilemap e as camadas
    const map = this.make.tilemap({ key: "escritorio", tileWidth: 25, tileHeight: 20 });
    const tileset1 = map.addTilesetImage("decoracao");
    const tileset2 = map.addTilesetImage("paredes");
    const tileset3 = map.addTilesetImage("personalizado_vivo");

    const offsetX = this.screenWidth - 1270;
    const layer1 = map.createLayer("chao", tileset2, offsetX, 0).setScale(2.5);
    const layer2 = map.createLayer("chaoLider", tileset1, offsetX, 0).setScale(2.5);
    const layer3 = map.createLayer("tapetes", tileset3, offsetX, 0).setScale(2.5);
    const layer4 = map.createLayer("tapeteLider", tileset1, offsetX, 0).setScale(2.5);
    const layer5 = map.createLayer("paredes", tileset2, offsetX, 0).setScale(2.5);
    const layer6 = map.createLayer("detalhesParede", tileset2, offsetX, 0).setScale(2.5);
    const layer7 = map.createLayer("decoracao", tileset1, offsetX, 0).setScale(2.5);
    const layer8 = map.createLayer("plantas", tileset1, offsetX, 0).setScale(2.5);
    const layer9 = map.createLayer("portas", tileset1, offsetX, 0).setScale(2.5);

    // Ativa colisões com base na propriedade 'collider' para todas as camadas
    layer1.setCollisionByProperty({ collider: true });
    layer2.setCollisionByProperty({ collider: true });
    layer3.setCollisionByProperty({ collider: true });
    layer4.setCollisionByProperty({ collider: true });
    layer5.setCollisionByProperty({ collider: true });
    layer6.setCollisionByProperty({ collider: true });
    layer7.setCollisionByProperty({ collider: true });
    layer8.setCollisionByProperty({ collider: true });
    layer9.setCollisionByProperty({ collider: true });

    // Cria a tela do computador, o computador com o indicador, o jogador, as animações e o botão
    this.createComputerScreen();
    this.addComputerAndIndicator();
    this.createPlayer();
    this.createPlayerAnimations();
    this.createButtonCima();

    // Configura colisões entre o jogador e algumas camadas selecionadas
    this.physics.add.collider(this.player, layer5);
    // this.physics.add.collider(this.player, layer6);
    this.physics.add.collider(this.player, layer7);
    this.physics.add.collider(this.player, layer8);

    // Define os limites do mundo do jogo usando as dimensões da tela
    this.physics.world.setBounds(0, 0, this.screenWidth, this.screenHeight);

    // Texto para depuração, exibindo as coordenadas do jogador
    this.coordText = this.add.text(20, 20, "", {
      fontSize: "16px",
      fill: "#ffffff",
    });

    // Cria a animação do indicador (apenas uma instância)
    this.anims.create({
      key: "exclamando",
      frames: this.anims.generateFrameNumbers("indicator", { start: 0, end: 1 }),
      frameRate: 3,
      repeat: -1,
    });

    // Configura os controles do teclado (WASD + E para interação)
    this.teclas = this.input.keyboard.addKeys({
      up: Phaser.Input.Keyboard.KeyCodes.W,
      down: Phaser.Input.Keyboard.KeyCodes.S,
      left: Phaser.Input.Keyboard.KeyCodes.A,
      right: Phaser.Input.Keyboard.KeyCodes.D,
      interagir: Phaser.Input.Keyboard.KeyCodes.E,
    });
  }

  update() {
    // Atualiza o movimento do jogador
    this.movePlayer();

    // Verifica se a tecla 'E' foi pressionada perto do computador
    if (Phaser.Input.Keyboard.JustDown(this.teclas.interagir)) {
      if (
        Math.abs(this.player.x - this.computador.x) <= 50 &&
        Math.abs(this.player.y - this.computador.y) <= 50
      ) {
        this.showComputerScreen();
      }
    }

    // Esconde o indicador caso o jogador esteja próximo a ele
    if (
      this.indicatorActive &&
      Math.abs(this.player.x - this.indicator.x) <= 30 &&
      Math.abs(this.player.y - this.indicator.y) <= 30
    ) {
      this.indicator.setVisible(false);
      this.indicatorActive = false;
    };

  

    // Verifica a proximidade do jogador com o objeto invisível para exibir o botão
    if (
      Math.abs(this.player.x - this.proximidade.x) <= 50 &&
      Math.abs(this.player.y - this.proximidade.y) <= 50
    ) {
      this.botaoCima.setVisible(true);
      this.bgelevoffice.setVisible(true);
      this.painelelev.setVisible(true);
    } else {
      this.botaoCima.setVisible(false);
      this.bgelevoffice.setVisible(false);
      this.painelelev.setVisible(false);
    }
  }

  movePlayer() {
    const velocidade = 150;
    let movendo = false;

    // Movimentação do jogador utilizando as teclas WASD
    if (this.teclas.left.isDown) {
      this.player.setVelocityX(-velocidade);
      this.player.anims.play("walk_left", true);
      this.player.setFlipX(true); // Vira o sprite para a esquerda
      movendo = true;
    } else if (this.teclas.right.isDown) {
      this.player.setVelocityX(velocidade);
      this.player.anims.play("walk_right", true);
      this.player.setFlipX(false); // Mantém o sprite para a direita
      movendo = true;
    } else {
      this.player.setVelocityX(0);
    }

    if (this.teclas.up.isDown) {
      this.player.setVelocityY(-velocidade);
      this.player.anims.play("walk_up", true);
      movendo = true;
    } else if (this.teclas.down.isDown) {
      this.player.setVelocityY(velocidade);
      this.player.anims.play("walk_down", true);
      movendo = true;
    } else {
      this.player.setVelocityY(0);
    }

    if (!movendo) {
      this.player.anims.stop();
    }
  }

  createPlayer() {
    // Cria o sprite do jogador usando as dimensões da tela
    this.player = this.physics.add.sprite(
      this.screenWidth - 405,
      this.screenHeight - 100,
      'player'
    );
    this.player.setScale(2.5);
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

  createComputerScreen() {
    // Cria a tela do computador (inicialmente oculta)
    this.telaComputador = this.add.image(0, 0, "telaComputador").setOrigin(0, 0);
    this.telaComputador.setDisplaySize(this.screenWidth, this.screenHeight);
    this.telaComputador.setVisible(false);
  }

  createButtonCima() {
    // Cria a imagem de fundo do elevador e o painel
    this.bgelevoffice = this.add.image(0, 0, "bgElevOffice").setOrigin(0, 0);
    this.bgelevoffice.setDisplaySize(this.screenWidth, this.screenHeight);
    this.painelelev = this.add.image(510, 90, "painelelev").setOrigin(0, 0);
    this.bgelevoffice.setVisible(false);
    this.painelelev.setVisible(false);

    // Cria o botão do elevador e o torna interativo
    this.botaoCima = this.add.image(680, 200, "botaoElevOffice");
    this.botaoCima.setInteractive();
    this.botaoCima.setScale(1);
    this.botaoCima.setVisible(false);

    // Cria um retângulo invisível para detectar a proximidade do jogador
    this.proximidade = this.add.rectangle(1250, 40, 10, 10, 0xff0000, 0);
    this.physics.add.existing(this.proximidade, true);

    // Ao clicar no botão, troca para a cena do elevador
    this.botaoCima.on("pointerdown", () => {
      this.scene.stop("officeScene");
      this.scene.start("elevadorScene");
    });
  }

  addComputerAndIndicator() {
    // Cria o indicador (exclamação) acima do computador e inicia sua animação
    this.indicator = this.add.sprite(
      this.screenWidth - 1020,
      this.screenHeight - 120,
      'indicator'
    ).setScale(0.2);
    this.indicator.play('exclamando');
    this.indicatorActive = true;

    // Cria a imagem do computador e a torna interativa
    this.computador = this.add.image(
      this.screenWidth - 1020,
      this.screenHeight - 100,
      'computador'
    ).setScale(0.09).setInteractive();
    this.computador.setFlipX(true);

    // Muda a cor do computador ao passar o mouse
    this.computador.on("pointerover", () => {
      this.computador.setTint(0xaaaaaa);
    });
    this.computador.on("pointerout", () => {
      this.computador.clearTint();
    });

    // Ao clicar no computador, exibe a tela correspondente
    this.computador.on("pointerdown", () => {
      this.showComputerScreen();
    });
  }

  showComputerScreen() {
    // Alterna para a cena da tela do computador
    this.scene.switch("curriculoScene");
  }
}