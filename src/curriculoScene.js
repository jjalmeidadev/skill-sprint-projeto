class curriculoScene extends Phaser.Scene {
    constructor() {
        super({ key: 'curriculoScene' });
        this.currentBackground = 'background'; // Definir o estado inicial
        this.canMove = true; // Controla se o jogador pode se mover
    }

    preload() {
        this.load.image('background', '../assets/mapaJogoVivo.png');
        this.load.image('telaComputador', '../assets/tela_computador.png');
        this.load.image('computador', '../assets/computador.png');
        this.load.image('indicator', '../assets/Exclamação.png');
        this.load.image('player', '../assets/Player.png');
    }

    create() {
        // Criar background inicial
        this.background = this.add.image(0, 0, 'background').setOrigin(0, 0);
        this.background.setDisplaySize(window.innerWidth, window.innerHeight);

        // Criar tela do computador mas deixá-la invisível no início
        this.telaComputador = this.add.image(0, 0, 'telaComputador').setOrigin(0, 0);
        this.telaComputador.setDisplaySize(window.innerWidth, window.innerHeight);
        this.telaComputador.setVisible(false); // Esconde a tela do computador

        // Criar indicador de exclamação sobre o computador
        this.indicator = this.add.image(510, 550, 'indicator').setScale(0.3);
        this.indicatorActive = true;

        // Criar o computador como um botão interativo
        this.computador = this.add.image(510, 580, 'computador').setScale(0.09).setInteractive();
        this.computador.setFlipX(true);

        this.player = this.physics.add.sprite(1350, 730, 'player');
    	this.player.setScale(4); 
    	this.player.setCollideWorldBounds(true);

        // Teclado
        this.keyE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);

        // Tornar o computador interativo
        this.computador.on('pointerover', () => {
            this.computador.setTint(0xaaaaaa); // Efeito ao passar o mouse
        });

        this.computador.on('pointerout', () => {
            this.computador.clearTint();
        });

        this.computador.on('pointerdown', () => {
            this.toggleComputador();
        });
    }

    update() {
        // Verifica se a tecla E foi pressionada e o jogador está perto do computador
        if (Phaser.Input.Keyboard.JustDown(this.keyE)) {
            if (Math.abs(this.player.x - 510) <= 50 && Math.abs(this.player.y - 580) <= 50) {
                this.toggleComputador();
            }
        }

        // Esconder o indicador quando o jogador se aproximar do computador
        if (this.indicatorActive && Math.abs(this.player.x - 510) <= 30 && Math.abs(this.player.y - 580) <= 30) {
            this.indicator.setVisible(false);
            this.indicatorActive = false;
        }

        // Atualizar coordenadas na tela
        this.coordText.setText(`X: ${Math.round(this.player.x)}, Y: ${Math.round(this.player.y)}`);
    }

    toggleComputador() {
        if (this.currentBackground === 'background') {
            this.currentBackground = 'telaComputador';
            this.canMove = false;
            this.player.setVisible(false); // Esconder jogador
            this.background.setVisible(false);
            this.telaComputador.setVisible(true);
        } else {
            this.currentBackground = 'background';
            this.canMove = true;
            this.player.setVisible(true);
            this.background.setVisible(true);
            this.telaComputador.setVisible(false);
        }
    }
}

