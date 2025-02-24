class officeScene extends Phaser.Scene {
	constructor() {
		super({ key: 'officeScene' });
	}


    preload() {
        this.load.image('background', '../assets/mapaJogoVivo.png');
		this.load.image('background2', '../assets/Frame 1.png');
		this.load.spritesheet('player', '../assets/Player.png', { frameWidth: 32, frameHeight: 32 });
		this.load.image('indicator', '../assets/Exclamação.png');
    }
    
    create() {
        this.background = this.add.image(0, 0, 'background').setOrigin(0, 0);
    	this.background.setDisplaySize(window.innerWidth, window.innerHeight);

		this.background2 = this.add.image(0, 0, 'background2');
    	this.background2.setOrigin(0.5, 0.5);
    	this.background2.setDisplaySize(window.innerWidth, window.innerHeight);
    	this.background2.setVisible(false);
    	this.background2.setPosition(window.innerWidth / 2, window.innerHeight / 2);
		
		this.player = this.physics.add.sprite(1350, 730, 'player');
    	this.player.setScale(4); 
    	this.player.setCollideWorldBounds(true);

		this.indicator = this.add.image(387, 487, 'indicator');
		this.indicator.setScale(0.3);
		this.indicatorActive = true;

		this.teclado = this.input.keyboard.createCursorKeys();
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

		if (Phaser.Input.Keyboard.JustDown(this.keyE)) {
			if (this.currentBackground === 'background1' && Math.abs(this.player.x - 360) <= 50 && Math.abs(this.player.y - 480) <= 50) {
				this.currentBackground = 'background2';
			  	this.player.setVisible(false);
			  	this.canMove = false;
			  	this.background.setVisible(false);
			  	this.background2.setVisible(true);
			} 
			else if (this.currentBackground === 'background2') {
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