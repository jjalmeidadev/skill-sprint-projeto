
class ElevadorScene extends Phaser.Scene {
  constructor() {
    // Chama o construtor da classe Phaser.Scene com a chave 'elevadorScene'
    super({ key: "elevadorScene" });
    this.canMove = true; // Controla se o jogador pode se mover
  }

  preload() {
    // Carrega as imagens e spritesheets necessárias para a cena
    this.load.image("backgroundelev", "../assets/bgelevadorvar1.jpg");
    this.load.image("backgroundelev2", "../assets/bgelevadorvar2.jpg");
    this.load.image("backgroundelev3", "../assets/bgelevadorvar3.jpg");
    this.load.spritesheet("player", "../assets/Player.png", {frameWidth: 32, frameHeight: 32,});
    
    this.load.image("painelinelev", "../assets/painelinelev.png");
    this.load.image("botaoestrategias", "../assets/botaoestrategias.png");
    this.load.image("botaooffice", "../assets/botaooffice.png");
    this.load.image("botaonegocios", "../assets/botaonegocios.png");
    this.load.image("botaopessoas", "../assets/botaopessoas.png");
    this.load.image("botaotech", "../assets/botaotech.png");
    this.load.image("botaorelacoes", "../assets/botaorelacoes.png");
  }

  create() {
    
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
    this.background.setDisplaySize(window.innerWidth, window.innerHeight);

    this.createPlayer();
    this.createPlayerAnimations();
    this.createButtonOffice();
    this.createButtonPessoas();
    this.createButtonEstrategias();
    this.createButtonNegocios();
    this.createButtonTech();
    this.createButtonRelacoes();
    // this.createButtonCima(); // Commented out as the method is not defined

    // Configuração do teclado (WASD + E para interação)
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

    if (
      Math.abs(this.player.x - this.proximidade.x) <= 50 &&
      Math.abs(this.player.y - this.proximidade.y) <= 50
    ) {
      this.botaoofficeel.setVisible(true);
      this.painelinelev.setVisible(true);
      this.botaopessoas.setVisible(true);
      this.botaoestrategias.setVisible(true);
      this.botaonegocios.setVisible(true);
      this.botaotech.setVisible(true);
      this.botaorelacoes.setVisible(true);
    } else {
      this.botaoofficeel.setVisible(false);
      this.painelinelev.setVisible(false);
      this.botaopessoas.setVisible(false);
      this.botaoestrategias.setVisible(false);
      this.botaonegocios.setVisible(false);
      this.botaotech.setVisible(false);
      this.botaorelacoes.setVisible(false);
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
    // Criar jogador
    this.player = this.physics.add.sprite(680, 120, "player");
    this.player.setScale(4);
    this.player.setCollideWorldBounds(true);

    // Adicionar limites para o mundo do jogo
    this.physics.world.setBounds(0, 0, window.innerWidth, window.innerHeight);
  }

  createPlayerAnimations() {
    // Animações do player
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
    // Adiciona o botão na posição especificada
    this.botaoofficeel = this.add.image(0, 0, "botaooffice").setOrigin(0, 0);
    this.botaoofficeel.setVisible(false);
    this.painelinelev = this.add.image(0, 0, "painelinelev").setOrigin(0, 0);
    this.painelinelev.setDisplaySize(window.innerWidth, window.innerHeight);
    this.painelinelev.setVisible(false);

    // Adiciona o botão na posição especificada
    this.botaoofficeel = this.add.image(553, 473, "botaooffice");
    this.botaoofficeel.setInteractive(); // Torna o botão interativo (clicável)
    this.botaoofficeel.setScale(1, 0.95); // Ajusta o tamanho do botão
    this.botaoofficeel.setVisible(false);

    // Adiciona um objeto invisível para verificar a proximidade
    this.proximidade = this.add.rectangle(510, 85, 105, 60, 0xff0000, 1);
    this.physics.add.existing(this.proximidade, true);

    this.botaoofficeel.on("pointerdown", () => {
      this.scene.stop("elevadorScene");
      this.scene.start("pessoasScene");
    });
  }

  createButtonPessoas() {
    // Adiciona o botão na posição especificada
    this.botaopessoas = this.add.image(0, 0, "botaopessoas").setOrigin(0, 0);
    this.botaopessoas.setVisible(false);

    // Adiciona o botão na posição especificada
    this.botaopessoas = this.add.image(753, 473, "botaopessoas");
    this.botaopessoas.setInteractive(); // Torna o botão interativo (clicável)
    this.botaopessoas.setScale(1, 0.95); // Ajusta o tamanho do botão
    this.botaopessoas.setVisible(false);

    this.botaopessoas.on("pointerdown", () => {
      this.scene.stop("elevadorScene");
      this.scene.start("officeScene");
    });
  }

  createButtonEstrategias() {
    // Adiciona o botão na posição especificada
    this.botaoestrategias = this.add.image(0, 0, "botaoestrategias").setOrigin(0, 0);
    this.botaoestrategias.setVisible(false);

    // Adiciona o botão na posição especificada
    this.botaoestrategias = this.add.image(553, 473, "botaoestrategias");
    this.botaoestrategias.setInteractive(); // Torna o botão interativo (clicável)
    this.botaoestrategias.setScale(1, 0.95); // Ajusta o tamanho do botão
    this.botaoestrategias.setVisible(false);

    this.botaoestrategias.on("pointerdown", () => {
      this.scene.stop("elevadorScene");
      this.scene.start("estrategiasScene");
    });
  }

  createButtonNegocios() {
    // Adiciona o botão na posição especificada
    this.botaonegocios = this.add.image(0, 0, "botaonegocios").setOrigin(0, 0);
    this.botaonegocios.setVisible(false);

    // Adiciona o botão na posição especificada
    this.botaonegocios = this.add.image(553, 473, "botaonegocios");
    this.botaonegocios.setInteractive(); // Torna o botão interativo (clicável)
    this.botaonegocios.setScale(1, 0.95); // Ajusta o tamanho do botão
    this.botaonegocios.setVisible(false);

    this.botaonegocios.on("pointerdown", () => {
      this.scene.stop("elevadorScene");
      this.scene.start("negociosScene");
    });
  }

  createButtonTech() {
    // Adiciona o botão na posição especificada
    this.botaotech = this.add.image(0, 0, "botaotech").setOrigin(0, 0);
    this.botaotech.setVisible(false);

    // Adiciona o botão na posição especificada
    this.botaotech = this.add.image(553, 473, "botaotech");
    this.botaotech.setInteractive(); // Torna o botão interativo (clicável)
    this.botaotech.setScale(1, 0.95); // Ajusta o tamanho do botão
    this.botaotech.setVisible(false);

    this.botaotech.on("pointerdown", () => {
      this.scene.stop("elevadorScene");
      this.scene.start("techScene");
    });
  }

  createButtonRelacoes() {
    // Adiciona o botão na posição especificada
    this.botaorelacoes = this.add.image(0, 0, "botaorelacoes").setOrigin(0, 0);
    this.botaorelacoes.setVisible(false);

    // Adiciona o botão na posição especificada
    this.botaorelacoes = this.add.image(553, 473, "botaorelacoes");
    this.botaorelacoes.setInteractive(); // Torna o botão interativo (clicável)
    this.botaorelacoes.setScale(1, 0.95); // Ajusta o tamanho do botão
    this.botaorelacoes.setVisible(false);

    this.botaorelacoes.on("pointerdown", () => {
      this.scene.stop("elevadorScene");
      this.scene.start("relacoesScene");
    });
  };
}

