const startScreen = document.getElementById('startScreen');
const startButton = document.getElementById('startButton');
const videoContainer = document.createElement('div');
const videoElement = document.createElement('video');

videoElement.src = '../assets/cutsceneVivo.mp4';
videoElement.controls = false;
videoElement.autoplay = false;
videoElement.style.width = '100%';
videoElement.style.height = '100%';
videoElement.style.position = 'absolute';
videoElement.style.top = '0';
videoElement.style.left = '0';

videoContainer.style.position = 'fixed';
videoContainer.style.width = '100%';
videoContainer.style.height = '100%';
videoContainer.style.top = '0';
videoContainer.style.left = '0';
videoContainer.style.zIndex = '1000';
videoContainer.style.display = 'none';
videoContainer.appendChild(videoElement);
document.body.appendChild(videoContainer);

startButton.addEventListener('click', () => {
  startScreen.style.display = 'none';
  videoContainer.style.display = 'block';
  videoElement.play();
});

videoElement.addEventListener('ended', () => {
  videoContainer.style.display = 'none';
  startGame();
});

function startGame() {
  const config = {
    type: Phaser.AUTO,
    width: window.innerWidth,
    height: window.innerHeight,
    physics: {
      default: 'arcade',
      arcade: {
        gravity: { y: 0 },
        debug: false,
      }
    },
    scene: {
      preload: preload,
      create: create,
      update: update
    }
  };

  var game = new Phaser.Game(config);

  function preload() {
    // Carrega uma imagem de fundo de alta qualidade
    this.load.image('background', '../assets/mapaJogoVivo.png');
    this.load.spritesheet('player', '../assets/Player.png', { frameWidth: 32, frameHeight: 32 });
  }

  function create() {
    // Ajusta o background para cobrir toda a tela com alta qualidade
    this.background = this.add.image(0, 0, 'background').setOrigin(0, 0);
    this.background.setDisplaySize(window.innerWidth, window.innerHeight);

    // Adiciona o player
    this.player = this.physics.add.sprite(400, 300, 'player');
    this.player.setScale(4); // Aumenta a proporção do player em 3x
    this.player.setCollideWorldBounds(true); // Impede que o player saia da tela

    // Configura as teclas de controle
    this.cursors = this.input.keyboard.createCursorKeys();

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

  function update() {
    // Reseta a velocidade do player
    this.player.setVelocity(0);

    // Define a velocidade base do player
    const baseSpeed = 200;
    const speedMultiplier = 2;
    const playerSpeed = baseSpeed * speedMultiplier;

    // Controle de movimento e animação
    if (this.cursors.left.isDown) {
      this.player.setVelocityX(-playerSpeed);
      this.player.anims.play('walk_left', true);
      this.player.setFlipX(true); // Espelha o sprite para a esquerda
    } else if (this.cursors.right.isDown) {
      this.player.setVelocityX(playerSpeed);
      this.player.anims.play('walk_right', true);
      this.player.setFlipX(false); // Não espelha o sprite para a direita
    } else if (this.cursors.up.isDown) {
      this.player.setVelocityY(-playerSpeed);
      this.player.anims.play('walk_up', true);
    } else if (this.cursors.down.isDown) {
      this.player.setVelocityY(playerSpeed);
      this.player.anims.play('walk_down', true);
    } else {
      this.player.anims.stop();
    }
  }
}