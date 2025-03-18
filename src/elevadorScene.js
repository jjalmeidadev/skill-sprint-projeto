
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
    this.load.spritesheet("player", "../assets/Player.png", { frameWidth: 32, frameHeight: 32, });
    
    this.load.image("painelinelev", "../assets/painelinelev.png");
    this.load.image("botaoestrategias", "../assets/botaoestrategias.png");
    this.load.image("botaooffice", "../assets/botaooffice.png");
    this.load.image("botaonegocios", "../assets/botaonegocios.png");
    this.load.image("botaopessoas", "../assets/botaopessoas.png");
    this.load.image("botaotech", "../assets/botaotech.png");
    this.load.image("botaorelacoes", "../assets/botaorelacoes.png");

    // Carrega o áudio específico para o elevador
    this.load.audio('elevatorAudio', '../assets/Local Forecast - Elevator [ ezmp3.co ].mp3');
    
    // Se o sprite 'indicator' não estiver sendo carregado em outra cena, descomente a linha abaixo:
    this.load.spritesheet("indicator", "../assets/spriteexclamação.png", { frameWidth: 254, frameHeight: 291 });
  }

  create() {
    const width = this.scale.width;
    const height = this.scale.height;

    // Registra os eventos para pausar o áudio sempre que a cena for interrompida
    this.events.on('shutdown', this.shutdown, this);
    this.events.on('pause', this.shutdown, this);

    // Inicia o áudio do elevador em loop
    this.elevatorSound = this.sound.add('elevatorAudio', {
      loop: true,
      volume: 0.5
    });
    this.elevatorSound.play();

    // Cria a animação para o indicador (caso ainda não exista)
    if (!this.anims.exists("exclamando")) {
      this.anims.create({
        key: "exclamando",
        frames: this.anims.generateFrameNumbers("indicator", { start: 0, end: 1 }),
        frameRate: 3,
        repeat: -1,
      });
    }

    this.cameras.main.fadeIn(1000); // Efeito de transição para a cena

    // Seleciona aleatoriamente uma das imagens de fundo
    const backgrounds = ["backgroundelev", "backgroundelev2", "backgroundelev3"];
    const randomBackground = Phaser.Math.RND.pick(backgrounds);
    this.background = this.add.image(0, 0, randomBackground).setOrigin(0, 0);
    this.background.setDisplaySize(width, height);

    // Cria a sprite do indicador ("exclamando")
    this.indicator = this.add.sprite(width - 955, height - 660, "indicator").setScale(0.3);
    this.indicator.play("exclamando");
    this.indicatorActive = true;

    this.createPlayer();
    this.createPlayerAnimations();
    this.createButtonOffice(width, height);
    this.createButtonPessoas(width, height);
    this.createButtonEstrategias(width, height);
    this.createButtonNegocios(width, height);
    this.createButtonTech(width, height);
    this.createButtonRelacoes(width, height);

    // Configuração do teclado (WASD + E para interação)
    this.teclas = this.input.keyboard.addKeys({
      up: Phaser.Input.Keyboard.KeyCodes.W,
      down: Phaser.Input.Keyboard.KeyCodes.S,
      left: Phaser.Input.Keyboard.KeyCodes.A,
      right: Phaser.Input.Keyboard.KeyCodes.D,
    });

    // Define os limites do mundo do jogo
    this.physics.world.setBounds(0, 0, width, height);
  }

  update() {
    // Atualiza a posição do jogador
    this.movePlayer();

    const width = this.scale.width;
    const height = this.scale.height;
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
    // Interrompe o áudio do elevador ao encerrar ou pausar a cena
    if (this.elevatorSound && this.elevatorSound.isPlaying) {
      this.elevatorSound.stop();
    }
  }

  movePlayer() {
    const velocidade = 150;
    let movendo = false;

    if (this.teclas.left.isDown) {
      this.player.setVelocityX(-velocidade);
      this.player.anims.play("walk_left", true);
      this.player.setFlipX(true);
      movendo = true;
    } else if (this.teclas.right.isDown) {
      this.player.setVelocityX(velocidade);
      this.player.anims.play("walk_right", true);
      this.player.setFlipX(false);
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
    const width = this.scale.width;
    const height = this.scale.height;
    // Cria o jogador e define os limites do mundo
    this.player = this.physics.add.sprite(680, 120, "player");
    this.player.setScale(4);
    this.player.setCollideWorldBounds(true);
    // Adicionar limites para o mundo do jogo
    this.physics.world.setBounds(0, 0, width, height);
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

  createButtonOffice(width, height) {
    // Cria o painel e a área de proximidade
    this.painelinelev = this.add.image(0, 0, "painelinelev").setOrigin(0, 0);
    this.painelinelev.setDisplaySize(width, height);
    this.painelinelev.setVisible(false);

    this.proximidade = this.add.rectangle(width - 955, height - 650, 105, 70, 0xff0000, 0);
    this.physics.add.existing(this.proximidade, true);

    // Cria o botão para a OfficeScene
    this.botaoofficeel = this.add.image(width - 905, height - 160, "botaooffice");
    this.botaoofficeel.setInteractive(); // Torna o botão interativo (clicável)
    this.botaoofficeel.setScale(1.2, 1.15); // Ajusta o tamanho do botão
    this.botaoofficeel.setVisible(false);

    this.botaoofficeel.on("pointerdown", () => {
      this.shutdown();
      this.scene.stop("elevadorScene");
      this.scene.start("officeScene");
    });
  }

  createButtonPessoas(width, height) {
    // Botão Pessoas
    this.botaopessoas = this.add.image(width - 620, height - 160, "botaopessoas");
    this.botaopessoas.setInteractive(); // Torna o botão interativo (clicável)
    this.botaopessoas.setScale(1.2, 1.15); // Ajusta o tamanho do botão
    this.botaopessoas.setVisible(false);

    this.botaopessoas.on("pointerdown", () => {
      this.shutdown();
      this.scene.stop("elevadorScene");
      this.scene.start("officeScene");
    });
  }

  createButtonEstrategias(width, height) {
    // Botão Estratégias
    this.botaoestrategias = this.add.image(width - 620, height - 392, "botaoestrategias");
    this.botaoestrategias.setInteractive(); // Torna o botão interativo (clicável)
    this.botaoestrategias.setScale(1.2, 1.15); // Ajusta o tamanho do botão
    this.botaoestrategias.setVisible(false);

    this.botaoestrategias.on("pointerdown", () => {
      this.shutdown();
      this.scene.stop("elevadorScene");
      this.scene.start("estrategiasScene");
    });
  }

  createButtonNegocios(width, height) {
    // Botão Negócios
    this.botaonegocios = this.add.image(width - 910, height - 393, "botaonegocios");
    this.botaonegocios.setInteractive(); // Torna o botão interativo (clicável)
    this.botaonegocios.setScale(1.2, 1.15); // Ajusta o tamanho do botão
    this.botaonegocios.setVisible(false);

    this.botaonegocios.on("pointerdown", () => {
      this.shutdown();
      this.scene.stop("elevadorScene");
      this.scene.start("negociosScene");
    });
  }

  createButtonTech(width, height) {
    // Botão Tech
    this.botaotech = this.add.image(width - 906, height - 602, "botaotech");
    this.botaotech.setInteractive(); // Torna o botão interativo (clicável)
    this.botaotech.setScale(1.2, 1.15); //ajusta o tamanho do botão
    this.botaotech.setVisible(false);

    this.botaotech.on("pointerdown", () => {
      this.shutdown();
      this.scene.stop("elevadorScene");
      this.scene.start("techScene");
    });
  }

  createButtonRelacoes(width, height) {
    // Botão Relações
    this.botaorelacoes = this.add.image(width - 610, height - 605, "botaorelacoes");
    this.botaorelacoes.setInteractive(); // Torna o botão interativo (clicável)
    this.botaorelacoes.setScale(1.2, 1.15); // Ajusta o tamanho do botão
    this.botaorelacoes.setVisible(false);

    this.botaorelacoes.on("pointerdown", () => {
      this.shutdown();
      this.scene.stop("elevadorScene");
      this.scene.start("relacoesScene");
    });
  };
}

