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
    this.load.image('background1', '../assets/mapaJogoVivo.png');
    this.load.image('background2', '../assets/Frame 1.png');
    this.load.image('indicator', '../assets/Exclamação.png');
    this.load.spritesheet('player', '../assets/Player.png', { frameWidth: 32, frameHeight: 32 });
  }

  function create() {
    this.currentBackground = 'background1';
    this.background = this.add.image(0, 0, this.currentBackground).setOrigin(0, 0);
    this.background.setDisplaySize(window.innerWidth, window.innerHeight);

    this.background2 = this.add.image(0, 0, 'background2');
    this.background2.setOrigin(0.5, 0.5);
    this.background2.setDisplaySize(window.innerWidth, window.innerHeight);
    this.background2.setVisible(false);
    this.background2.setPosition(window.innerWidth / 2, window.innerHeight / 2);

    this.player = this.physics.add.sprite(400, 300, 'player');
    this.player.setScale(4);
    this.player.setCollideWorldBounds(true);

    this.indicator = this.add.image(387, 487, 'indicator');
    this.indicator.setScale(0.3);
    this.indicatorActive = true;

    this.cursors = this.input.keyboard.createCursorKeys();
    this.keyE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);
    
    this.coordText = this.add.text(10, 10, 'X: 0, Y: 0', { font: '16px Arial', fill: '#ffffff' });
    
    this.canMove = true;
    
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
    if (this.canMove) {
      this.player.setVelocity(0);
      const baseSpeed = 200;
      const speedMultiplier = 2;
      const playerSpeed = baseSpeed * speedMultiplier;

      if (this.cursors.left.isDown) {
        this.player.setVelocityX(-playerSpeed);
        this.player.anims.play('walk_left', true);
        this.player.setFlipX(true);
      } else if (this.cursors.right.isDown) {
        this.player.setVelocityX(playerSpeed);
        this.player.anims.play('walk_right', true);
        this.player.setFlipX(false);
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

    if (Phaser.Input.Keyboard.JustDown(this.keyE)) {
      if (this.currentBackground === 'background1' &&
          Math.abs(this.player.x - 360) <= 50 &&
          Math.abs(this.player.y - 480) <= 50) {
        this.currentBackground = 'background2';
        this.player.setVisible(false);
        this.canMove = false;
        this.background.setVisible(false);
        this.background2.setVisible(true);
      } else if (this.currentBackground === 'background2') {
        this.currentBackground = 'background1';
        this.player.setVisible(true);
        this.canMove = true;
        this.background.setVisible(true);
        this.background2.setVisible(false);
      }
    }
    
    if (this.indicatorActive && Math.abs(this.player.x - 387) <= 30 && Math.abs(this.player.y - 487) <= 30) {
      this.indicator.setVisible(false);
      this.indicatorActive = false;
    }
    
    this.coordText.setText(`X: ${Math.round(this.player.x)}, Y: ${Math.round(this.player.y)}`);
  }
}
