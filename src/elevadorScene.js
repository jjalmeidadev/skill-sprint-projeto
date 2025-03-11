
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
    this.load.spritesheet("player", "../assets/Player.png", {
      frameWidth: 32,
      frameHeight: 32,
    });
  }

  create() {
    // Seleciona aleatoriamente uma das imagens de fundo carregadas
    const backgrounds = ["backgroundelev", "backgroundelev2", "backgroundelev3"];
    const randomBackground = Phaser.Math.RND.pick(backgrounds);

    // Adiciona a imagem de fundo e ajusta seu tamanho para preencher a tela
    this.background = this.add.image(0, 0, randomBackground).setOrigin(0, 0);
    this.background.setDisplaySize(window.innerWidth, window.innerHeight);

    this.createPlayer();
    this.createPlayerAnimations();
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
}
