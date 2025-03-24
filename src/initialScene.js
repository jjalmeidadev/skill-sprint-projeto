class InitialScene extends Phaser.Scene {
    constructor() {
        super({ key: 'initialScene' });
    }

    preload() {
        // Carrega os ativos visuais
        this.load.image('bg01', '../assets/assetsBackground/1.png');
        this.load.image('bg02', '../assets/assetsBackground/2.png');
        this.load.image('bg03', '../assets/assetsBackground/3.png');
        this.load.image('bg04', '../assets/assetsBackground/4.png');
        this.load.image('bg05', '../assets/assetsBackground/5.png');
        this.load.image('bg06', '../assets/assetsBackground/6.png');
       
        this.load.image('titulo', '../assets/assetsBackground/titulo.png ');

        this.load.image('botaoJogar', '../assets/assets_botoes/botaoPlay.png');
        this.load.image('botaoCreditos', '../assets/assets_botoes/botaoCreditos.png');
        this.load.image('botaoAjustes', '../assets/assets_botoes/botaoAjustes.png');
        this.load.image('layoutPlay', '../assets/assets_botoes/layoutPlay.png');
        // Carrega o áudio da tela inicial
        this.load.audio('initialMusic', '../assets/Adventure Meme [ ezmp3.co ].mp3');
        this.load.audio('buttonSound', '../assets/sounds/687107__aphom000__mouse-2-button-fast-click.wav');
    }

    create() {
        const width = this.scale.width;
        const height = this.scale.height;
        this.cameras.main.fadeIn(1000);

        this.bgs = [];
        const speeds = [0.005, 0.05, 0.07, 0.08, 0.09, 0.1];
        for (let i = 0; i < 6; i++) {
            let bg = this.add.tileSprite(0, 0, 576, 324, `bg0${i + 1}`)
                .setOrigin(0, 0)
                .setScale(2.8);

            this.bgs.push({ sprite: bg, speed: speeds[i] });
        }

        // Inicia a música da tela inicial em loop
        this.initialMusic = this.sound.add('initialMusic', { loop: true, volume: 1 });
        this.initialMusic.play();

        // Registra os eventos para pausar a música ao sair/pausar a cena
        this.events.on('shutdown', this.shutdown, this);
        this.events.on('pause', this.shutdown, this);

        // Adiciona a imagem de fundo e ajusta seu tamanho
        this.add.image(width/2, height/4, 'titulo').setScale(2.0);
        this.add.image(width/2, height - 250, 'layoutPlay').setScale(1.0);

        // Cria os botões da tela inicial
        this.createButtonJogar(width, height);
        this.createButtonCreditos(width, height);
        this.createButtonAjustes(width, height);
    }

    shutdown() {
        // Interrompe a música ao encerrar ou pausar a cena
        if (this.initialMusic && this.initialMusic.isPlaying) {
            this.initialMusic.stop();
        }
    }

    buttonSound() {
        this.buttonClick = this.sound.add('buttonSound', {loop: false, volume: 10});
        this.buttonClick.play();
    }

    createButtonJogar(width, height) {
        const botaoJogar = this.add.image(width / 2, (height / 2) + 50, 'botaoJogar');
        botaoJogar.setInteractive();
        botaoJogar.setScale(1);
        botaoJogar.on('pointerdown', () => {
            this.buttonSound();
            this.shutdown();
            this.scene.stop('initialScene');
            this.scene.start('minigameTrashScene');
        });
    }

    createButtonCreditos(width, height) {
        const botaoCreditos = this.add.image(width / 2, height / 1.5, 'botaoCreditos');
        botaoCreditos.setInteractive();
        botaoCreditos.setScale(1);
        botaoCreditos.on('pointerdown', () => {
            this.buttonSound();
            this.shutdown();
            this.scene.stop('initialScene');
            this.scene.start('creditosScene');
        });
    }

    createButtonAjustes(width, height) {
        const botaoAjustes = this.add.image(width / 2, height - 175, 'botaoAjustes');
        botaoAjustes.setInteractive();
        botaoAjustes.setScale(1);
        botaoAjustes.on('pointerdown', () => {
            this.buttonSound();
            this.shutdown();
            this.scene.stop('initialScene');
            this.scene.start('ajusteScene');
        });
    }

    update() {
        this.bgs.forEach(layer => {
            layer.sprite.tilePositionX += layer.speed;
        });
    }
}
