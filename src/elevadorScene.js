class ElevadorScene extends Phaser.Scene {
  constructor() {
    // Chama o construtor da classe Phaser.Scene com a chave 'elevadorScene'
    super({ key: "elevadorScene" });
    this.canMove = true; // Controla se o jogador pode se mover
    this.painelinelevShown = false;
  }

  preload() {
    // Carrega as imagens e spritesheets necessárias para a cena
    this.load.image("backgroundelev", "../assets/bgelevadorvar1.jpg");
    this.load.image("backgroundelev2", "../assets/bgelevadorvar2.jpg");
    this.load.image("backgroundelev3", "../assets/bgelevadorvar3.jpg");
    this.load.spritesheet("player", "../assets/Player.png", { 
      frameWidth: 32, 
      frameHeight: 32,
    });
    
    this.load.image("painelinelev", "../assets/painelinelev.png");
    this.load.image("botaoestrategias", "../assets/botaoestrategias.png");
    this.load.image("botaooffice", "../assets/botaooffice.png");
    this.load.image("botaonegocios", "../assets/botaonegocios.png");
    this.load.image("botaopessoas", "../assets/botaopessoas.png");
    this.load.image("botaotech", "../assets/botaotech.png");
    this.load.image("botaorelacoes", "../assets/botaorelacoes.png");

    // Carrega o áudio específico para o elevador
    this.load.audio('elevatorAudio', '../assets/Local Forecast - Elevator [ ezmp3.co ].mp3');
  }

  create() {
    // Inicia o áudio do elevador em loop
    this.elevatorSound = this.sound.add('elevatorAudio', {
      loop: true,  // Configura para tocar em loop
      volume: 0.5  // Define o volume da música
    });
    this.elevatorSound.play();

    // Cria a animação para o indicador
    this.anims.create({
      key: "exclamando",
      frames: this.anims.generateFrameNumbers("indicator", {
        start: 0,
        end: 1,
      }),
      frameRate: 3,
      repeat: -1,
    });

    this.cameras.main.fadeIn(1000); // Efeito de transição para a cena

    // Seleciona aleatoriamente uma das imagens de fundo carregadas
    const backgrounds = [
      "backgroundelev",
      "backgroundelev2",
      "backgroundelev3",
    ];
    const randomBackground = Phaser.Math.RND.pick(backgrounds);

    // Adiciona a imagem de fundo e ajusta seu tamanho para preencher a tela
    this.background = this.add.image(0, 0, randomBackground).setOrigin(0, 0);
    this.background.setDisplaySize(width, height);

    // Criação dos elementos da cena
    this.createPlayer();
    this.createPlayerAnimations();
    this.createButtonOffice();
    this.createButtonPessoas();
    this.createButtonEstrategias();
    this.createButtonNegocios();
    this.createButtonTech();
    this.createButtonRelacoes();
    // this.createButtonCima(); // Commented out as the method is not defined

    // Configuração do teclado (WASD para movimentação)
    this.teclas = this.input.keyboard.addKeys({
      up: Phaser.Input.Keyboard.KeyCodes.W,
      down: Phaser.Input.Keyboard.KeyCodes.S,
      left: Phaser.Input.Keyboard.KeyCodes.A,
      right: Phaser.Input.Keyboard.KeyCodes.D,
    });
  }

  update() {
    // Atualiza a posição do jogador a cada frame
    this.movePlayer();

    const closeToButtons =
      Math.abs(this.player.x - this.proximidade.x) <= 50 &&
      Math.abs(this.player.y - this.proximidade.y) <= 50;

    if (closeToButtons) {
      if (!this.painelinelevShown) {
        this.indicator.setVisible(false); // Esconde o indicador apenas na primeira vez
        this.painelinelevShown = true; // Marca que o painel já foi mostrado pelo menos uma vez
      }

      // Exibe o painel e os botões quando perto
      this.painelinelev.setVisible(true);
      this.botaoofficeel.setVisible(true);
      this.botaopessoas.setVisible(true);
      this.botaoestrategias.setVisible(true);
      this.botaonegocios.setVisible(true);
      this.botaotech.setVisible(true);
      this.botaorelacoes.setVisible(true);
    } else {
      // Esconde o painel e os botões quando longe
      this.painelinelev.setVisible(false);
      this.botaoofficeel.setVisible(false);
      this.botaopessoas.setVisible(false);
      this.botaoestrategias.setVisible(false);
      this.botaonegocios.setVisible(false);
      this.botaotech.setVisible(false);
      this.botaorelacoes.setVisible(false);

      // O indicador só reaparece se o painel nunca tiver sido mostrado
      if (!this.painelinelevShown) {
        this.indicator.setVisible(true);
      }
    }
  }
  
  shutdown() {
    // Para o áudio quando a cena for encerrada
    if (this.elevatorSound) {
      this.elevatorSound.stop();
    }
  }

  movePlayer() {
    let velocidade = 150;
    let movendo = false;

    // Movimentação do player com WASD
    if (this.teclas.left.isDown) {
      this.player.setVelocityX(-velocidade);
      this.player.anims.play("walk_left", true);
      this.player.setFlipX(true); // Virar para a esquerda
      movendo = true;
    } else if (this.teclas.right.isDown) {
      this.player.setVelocityX(velocidade);
      this.player.anims.play("walk_right", true);
      this.player.setFlipX(false); // Manter normal para direita
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
    // Cria o jogador
    this.player = this.physics.add.sprite(680, 120, "player");
    this.player.setScale(4);
    this.player.setCollideWorldBounds(true);

    // Define os limites do mundo do jogo
    this.physics.world.setBounds(0, 0, width, height);
  }

  createPlayerAnimations() {
    // Animações do jogador
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

  createButtonOffice() {
    // Adiciona o botão e o painel
    this.botaoofficeel = this.add.image(0, 0, "botaooffice").setOrigin(0, 0);
    this.botaoofficeel.setVisible(false);
    this.painelinelev = this.add.image(0, 0, "painelinelev").setOrigin(0, 0);
    this.painelinelev.setDisplaySize(width, height);
    this.painelinelev.setVisible(false);

    // Adiciona a sprite da exclamação
    this.indicator = this.add.sprite(width - 955, height - 660, "indicator").setScale(0.3);
    this.indicator.play('exclamando'); // Inicia a animação
    this.indicatorActive = true;

    // Adiciona o botão interativo
    this.botaoofficeel = this.add.image(width - 905, height - 160, "botaooffice");
    this.botaoofficeel.setInteractive();
    this.botaoofficeel.setScale(1.2, 1.15);
    this.botaoofficeel.setVisible(false);

    // Adiciona um objeto invisível para verificar a proximidade
    this.proximidade = this.add.rectangle(width - 955, height - 650, 105, 70, 0xff0000, 0);
    this.physics.add.existing(this.proximidade, true);

    this.botaoofficeel.on("pointerdown", () => {
      this.scene.stop("elevadorScene");
      this.scene.start("officeScene");
    });
  }

  createButtonPessoas() {
    // Botão Pessoas
    this.botaopessoas = this.add.image(0, 0, "botaopessoas").setOrigin(0, 0);
    this.botaopessoas.setVisible(false);

    this.botaopessoas = this.add.image(width - 620, height - 160, "botaopessoas");
    this.botaopessoas.setInteractive();
    this.botaopessoas.setScale(1.2, 1.15);
    this.botaopessoas.setVisible(false);

    this.botaopessoas.on("pointerdown", () => {
      this.scene.stop("elevadorScene");
      this.scene.start("officeScene");
    });
  }

  createButtonEstrategias() {
    // Botão Estratégias
    this.botaoestrategias = this.add.image(0, 0, "botaoestrategias").setOrigin(0, 0);
    this.botaoestrategias.setVisible(false);

    this.botaoestrategias = this.add.image(width - 620, height - 392, "botaoestrategias");
    this.botaoestrategias.setInteractive();
    this.botaoestrategias.setScale(1.2, 1.15);
    this.botaoestrategias.setVisible(false);

    this.botaoestrategias.on("pointerdown", () => {
      this.scene.stop("elevadorScene");
      this.scene.start("estrategiasScene");
    });
  }

  createButtonNegocios() {
    // Botão Negócios
    this.botaonegocios = this.add.image(0, 0, "botaonegocios").setOrigin(0, 0);
    this.botaonegocios.setVisible(false);

    this.botaonegocios = this.add.image(width - 910, height - 393, "botaonegocios");
    this.botaonegocios.setInteractive();
    this.botaonegocios.setScale(1.2, 1.15);
    this.botaonegocios.setVisible(false);

    this.botaonegocios.on("pointerdown", () => {
      this.scene.stop("elevadorScene");
      this.scene.start("negociosScene");
    });
  }

  createButtonTech() {
    // Botão Tech
    this.botaotech = this.add.image(0, 0, "botaotech").setOrigin(0, 0);
    this.botaotech.setVisible(false);

    this.botaotech = this.add.image(width - 906, height - 602, "botaotech");
    this.botaotech.setInteractive();
    this.botaotech.setScale(1.2, 1.15);
    this.botaotech.setVisible(false);

    this.botaotech.on("pointerdown", () => {
      this.scene.stop("elevadorScene");
      this.scene.start("techScene");
    });
  }

  createButtonRelacoes() {
    // Botão Relações
    this.botaorelacoes = this.add.image(0, 0, "botaorelacoes").setOrigin(0, 0);
    this.botaorelacoes.setVisible(false);

    this.botaorelacoes = this.add.image(width - 610, height - 605, "botaorelacoes");
    this.botaorelacoes.setInteractive();
    this.botaorelacoes.setScale(1.2, 1.15);
    this.botaorelacoes.setVisible(false);

    this.botaorelacoes.on("pointerdown", () => {
      this.scene.stop("elevadorScene");
      this.scene.start("relacoesScene");
    });
  }
}
