class OfficeScene extends Phaser.Scene {
    constructor() {
        // Chama o construtor da classe Phaser.Scene com a chave 'officeScene'
        super({ key: 'officeScene' });
        this.canMove = true; // Controla se o jogador pode se mover
    }

    preload() {
        // Carrega as imagens e spritesheets necessárias para a cena
        //this.load.image('background', '../assets/mapaJogoVivo.png');
        this.load.spritesheet('player', '../assets/Player.png', { frameWidth: 32, frameHeight: 32 });
        this.load.image('telaComputador', '../assets/tela_computador.png');
        this.load.image('computador', '../assets/computador.png');
        this.load.image('indicator', '../assets/Exclamação.png');

        this.load.tilemapTiledJSON('escritorio', '../assets/mapaJogoVivo/mapaJogoVivo.json');
        this.load.image('decoracao', '../assets/mapaJogoVivo/decoracao.png');
        this.load.image('paredes', '../assets/mapaJogoVivo/paredes.png');
        this.load.image('personalizado_vivo', '../assets/mapaJogoVivo/personalizado_vivo.png');
    }

    create() {
        // Configuração do teclado (WASD + E para interação)
        this.teclas = this.input.keyboard.addKeys({
            up: Phaser.Input.Keyboard.KeyCodes.W,
            down: Phaser.Input.Keyboard.KeyCodes.S,
            left: Phaser.Input.Keyboard.KeyCodes.A,
            right: Phaser.Input.Keyboard.KeyCodes.D,
            interagir: Phaser.Input.Keyboard.KeyCodes.E
        });

        const map = this.make.tilemap({ key: "escritorio", tileWidth: 25, tileHeight: 20});

        const tileset1 = map.addTilesetImage("decoracao");
        const tileset2 = map.addTilesetImage("paredes");
        const tileset3 = map.addTilesetImage("personalizado_vivo");


        const layer1 = map.createLayer("chao", tileset2, width - 1270, 0).setScale(2.5);
        const layer2 = map.createLayer("chaoLider", tileset1, width - 1270, 0).setScale(2.5);
        const layer3 = map.createLayer("tapetes", tileset3, width - 1270, 0).setScale(2.5);
        const layer4 = map.createLayer("tapeteLider", tileset1, width - 1270, 0).setScale(2.5);
        const layer5 = map.createLayer("paredes", tileset2, width - 1270, 0).setScale(2.5);
        const layer6 = map.createLayer("detalhesParede", tileset2, width - 1270, 0).setScale(2.5);
        const layer7 = map.createLayer("decoracao", tileset1, width - 1270, 0).setScale(2.5);
        const layer8 = map.createLayer("plantas", tileset1, width - 1270, 0).setScale(2.5);
        const layer9 = map.createLayer("portas", tileset1, width - 1270, 0).setScale(2.5);

        layer1.setCollisionByProperty({ collider: true});
        layer2.setCollisionByProperty({ collider: true});
        layer3.setCollisionByProperty({ collider: true});
        layer4.setCollisionByProperty({ collider: true});
        layer5.setCollisionByProperty({ collider: true});
        layer6.setCollisionByProperty({ collider: true});
        layer7.setCollisionByProperty({ collider: true});
        layer8.setCollisionByProperty({ collider: true});
        layer9.setCollisionByProperty({ collider: true});

       


        // Cria a tela do computador, o computador e o indicador de exclamação
        this.createComputerScreen();
        this.addComputerAndIndicator();
        this.createPlayer();
        this.createPlayerAnimations();

        this.physics.add.collider(this.player, layer5);
        //this.physics.add.collider(this.player, layer6);
        this.physics.add.collider(this.player, layer7);
        this.physics.add.collider(this.player, layer8);
    }

    update() {
        // Atualiza a posição do jogador a cada frame
        this.movePlayer();

        // Verifica se a tecla E foi pressionada e o jogador está perto do computador
        if (Phaser.Input.Keyboard.JustDown(this.teclas.interagir)) {
            if (Math.abs(this.player.x - (this.computador.x)) <= 50 && Math.abs(this.player.y - (this.computador.y)) <= 50) {
                this.showComputerScreen();
            }
        }

        // Esconder o indicador quando o jogador se aproximar do computador
        if (this.indicatorActive && Math.abs(this.player.x - (this.computador.x)) <= 30 && Math.abs(this.player.y - (this.computador.y)) <= 30) {
            this.indicator.setVisible(false);
            this.indicatorActive = false;
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
        this.player = this.physics.add.sprite(width - 700, height - 300, 'player');
        this.player.setScale(2.5);
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

    addComputerAndIndicator() {
        // Criar indicador de exclamação sobre o computador
        this.indicator = this.add.image(width - 1020, height - 150, 'indicator').setScale(0.3);
        this.indicatorActive = true;

        // Criar o computador na posição original
        this.computador = this.add.image(width - 1030, height - 100, 'computador').setScale(0.09).setInteractive();
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
        this.telaComputador.setVisible(true);
        this.player.setVisible(false);
        this.computador.setVisible(false);
        this.indicator.setVisible(false);   
    }
}


