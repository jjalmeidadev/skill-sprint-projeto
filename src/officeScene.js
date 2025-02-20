class officeScene extends Phaser.Scene {
	constructor() {
		super({ key: 'officeScene' });
	}


    preload() {
        this.load.image('background', '../assets/mapaJogoVivo.png');
		this.load.spritesheet('player', '../assets/Player.png', { frameWidth: 32, frameHeight: 32 });
    }
    
    create() {
        this.background = this.add.image(0, 0, 'background').setOrigin(0, 0);
    	this.background.setDisplaySize(window.innerWidth, window.innerHeight);
		
		this.player = this.physics.add.sprite(1350, 730, 'player');
    	this.player.setScale(4); 
    	this.player.setCollideWorldBounds(true);

		this.teclado = this.input.keyboard.createCursorKeys();

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

		this.input.on('pointerdown', () => {
		this.scene.stop('officeScene'),
		this.scene.start('tutorialScene')
		})
	}

	update() {
		//movimenta para a esquerda
		if (this.teclado.left.isDown) {
			this.player.setVelocityX(-150);
			this.player.anims.play('walk_left', true);
			this.player.setFlipX(true);
		}
		//movimenta para a direita
		else if (this.teclado.right.isDown) {
			this.player.setVelocityX(150);
			this.player.anims.play('walk_right', true);
			this.player.setFlipX(false);
		}
		//sem movimento, fica parado
		else if (this.teclado.up.isDown) {
			this.player.setVelocityY(-150);
			this.player.anims.play('walk_up', true);
		}
		else if(this.teclado.down.isDown) {
			this.player.setVelocityY(150);
			this.player.anims.play('walk_down', true);
		}
		else {
			this.player.setVelocityX(0);
			this.player.setVelocityY(0);
			this.player.anims.stop()
		}
	}
}