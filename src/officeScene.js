class OfficeScene extends Phaser.Scene {
  constructor() {
    // Chama o construtor da classe Phaser.Scene com a chave 'officeScene'
    super({ key: 'officeScene' });
    this.currentBackground = 'background'; // Estado inicial
    this.canMove = true; // Controla se o jogador pode se mover
  }

  preload() {
    // Carrega as imagens e spritesheets necessárias para a cena
    this.load.image('background', '../assets/mapaJogoVivo.png');
    this.load.spritesheet('player', '../assets/Player.png', { frameWidth: 32, frameHeight: 32 });
    this.load.image('telaComputador', '../assets/tela_computador.png');
    this.load.image('computador', '../assets/computador.png');
    this.load.image('indicator', '../assets/Exclamação.png');
    this.load.image('botaoElevOffice', '../assets/botaocimaelevador.png');
    this.load.image('bgElevOffice', '../assets/bgelevadoroffice.png');
    this.load.image('painelelev', '../assets/painelelevador.png');
  }

  create() {

    // Obtém as dimensões da tela
    const screenWidth = this.sys.game.config.width;
    const screenHeight = this.sys.game.config.height;
    // Adiciona a imagem de fundo e ajusta seu tamanho para preencher a tela
    this.background = this.add.image(0, 0, 'background').setOrigin(0, 0);
    this.background.setDisplaySize(window.innerWidth, window.innerHeight);


    // Cria a tela do computador, o computador e o indicador de exclamação
    this.createComputerScreen();
    this.addComputerAndIndicator();
    this.createPlayer();
    this.createPlayerAnimations();
    this.createButtonCima();


    // Configuração do teclado (WASD + E para interação)
    this.teclas = this.input.keyboard.addKeys({
      up: Phaser.Input.Keyboard.KeyCodes.W,
      down: Phaser.Input.Keyboard.KeyCodes.S,
      left: Phaser.Input.Keyboard.KeyCodes.A,
      right: Phaser.Input.Keyboard.KeyCodes.D,
      interagir: Phaser.Input.Keyboard.KeyCodes.E
    });

    // Criar texto para coordenadas (debug)
    this.coordText = this.add.text(20, 20, '', { fontSize: '16px', fill: '#ffffff' });
  }

  update() {
    // Atualiza a posição do jogador a cada frame
    this.movePlayer();

    // Verifica se a tecla E foi pressionada e o jogador está perto do computador
    if (Phaser.Input.Keyboard.JustDown(this.teclas.interagir)) {
      if (
        Math.abs(this.player.x - this.computador.x) <= 50 &&
        Math.abs(this.player.y - this.computador.y) <= 50
      ) {
        this.showComputerScreen();
      }
    }

    // Esconder o indicador quando o jogador se aproximar do computador
    if (
      this.indicatorActive &&
      Math.abs(this.player.x - this.computador.x) <= 30 &&
      Math.abs(this.player.y - this.computador.y) <= 30
    ) {
      this.indicator.setVisible(false);
      this.indicatorActive = false;
    }

    // Atualizar coordenadas na tela
    this.coordText.setText(
      `X: ${Math.round(this.player.x)}, Y: ${Math.round(this.player.y)}`
    );

    // Verificar proximidade do jogador ao objeto invisível
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
    let velocidade = 150;
    let movendo = false;

    // Movimentação do player com WASD
    if (this.teclas.left.isDown) {
      this.player.setVelocityX(-velocidade);
      this.player.anims.play('walk_left', true);
      this.player.setFlipX(true); // Virar para a esquerda
      movendo = true;
    }
    else if (this.teclas.right.isDown) {
      this.player.setVelocityX(velocidade);
      this.player.anims.play('walk_right', true);
      this.player.setFlipX(false); // Manter normal para direita
      movendo = true;
    }
    else {
      this.player.setVelocityX(0);
    }

    if (this.teclas.up.isDown) {
      this.player.setVelocityY(-velocidade);
      this.player.anims.play('walk_up', true);
      movendo = true;
    }
    else if (this.teclas.down.isDown) {
      this.player.setVelocityY(velocidade);
      this.player.anims.play('walk_down', true);
      movendo = true;
    }
    else {
      this.player.setVelocityY(0);
    }

    if (!movendo) {
      this.player.anims.stop();
    }
  }

  createPlayer() {
    // Criar jogador
    this.player = this.physics.add.sprite(1350, 730, 'player');
    this.player.setScale(4);
    this.player.setCollideWorldBounds(true);

    // Adicionar limites para o mundo do jogo
    this.physics.world.setBounds(0, 0, window.innerWidth, window.innerHeight);
  }

  createPlayerAnimations() {
    // Animações do player
    this.anims.create({
      key: 'walk_down',
      frames: this.anims.generateFrameNumbers('player', { start: 0, end: 5 }),
      frameRate: 10,
      repeat: -1
    });

    this.anims.create({
      key: 'walk_right',
      frames: this.anims.generateFrameNumbers('player', { start: 6, end: 11 }),
      frameRate: 10,
      repeat: -1
    });

    this.anims.create({
      key: 'walk_up',
      frames: this.anims.generateFrameNumbers('player', { start: 12, end: 17 }),
      frameRate: 10,
      repeat: -1
    });

    this.anims.create({
      key: 'walk_left',
      frames: this.anims.generateFrameNumbers('player', { start: 6, end: 11 }),
      frameRate: 10,
      repeat: -1
    });
  }

  createComputerScreen() {
    // Criar tela do computador mas deixá-la invisível no início
    this.telaComputador = this.add.image(0, 0, 'telaComputador').setOrigin(0, 0);
    this.telaComputador.setDisplaySize(window.innerWidth, window.innerHeight);
    this.telaComputador.setVisible(false);
  }

  createButtonCima() {
    // Adiciona o botão 'Cima' na posição especificada
    this.bgelevoffice = this.add.image(0, 0, "bgElevOffice").setOrigin(0, 0);
    this.bgelevoffice.setDisplaySize(window.innerWidth, window.innerHeight);
    this.painelelev = this.add.image(510, 90, "painelelev").setOrigin(0, 0);
    this.bgelevoffice.setVisible(false);
    this.painelelev.setVisible(false);
    // Adiciona o botão 'Ajustes' na posição especificada
    const botaoCima = (this.botaoCima = this.add.image(680, 200, "botaoElevOffice"));
    this.botaoCima.setInteractive(); // Torna o botão interativo (clicável)
    this.botaoCima.setScale(1); // Ajusta o tamanho do botão
    this.botaoCima.setVisible(false);

    // Adiciona um objeto invisível para verificar a proximidade
    this.proximidade = this.add.rectangle(1250, 40, 10, 10, 0xff0000, 0);
    this.physics.add.existing(this.proximidade, true);

    botaoCima.on("pointerdown", () => {
      this.scene.stop("officeScene");
      this.scene.start('elevadorScene');
    });
  }

  addComputerAndIndicator() {
    // Definir as posições do computador e do indicador
    const x = 340;
    const y = 367;

    // Criar indicador de exclamação sobre o computador
    this.indicator = this.add.image(x + 70, y + 80, 'indicator').setScale(0.3);
    this.indicatorActive = true;

    // Criar o computador na posição original
    this.computador = this.add.image(x + 70, y + 95, 'computador').setScale(0.09).setInteractive();
    this.computador.setFlipX(true);

    // Tornar o computador interativo
    this.computador.on('pointerover', () => {
      this.computador.setTint(0xaaaaaa);
    });

    this.computador.on('pointerout', () => {
      this.computador.clearTint();
    });

    // Adicionar evento de clique no computador
    this.computador.on('pointerdown', () => {
      this.showComputerScreen();
    });
  }

  showComputerScreen() {
    // Mostrar a tela do computador
    this.scene.switch('curriculoScene');
  }
}
