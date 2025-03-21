class InitialScene extends Phaser.Scene {
    constructor() {
        super({ key: 'initialScene' });
    }

    preload() {
        // Carrega os ativos visuais
        this.load.image('telaInicial', '../assets/tela_inicial.png');
        this.load.image('botaoJogar', '../assets/botao_jogar.png');
        this.load.image('botaoCreditos', '../assets/botao_creditos.png');
        this.load.image('botaoAjustes', '../assets/botao_ajustes.png');
        // Carrega o áudio da tela inicial
        this.load.audio('initialMusic', '../assets/Adventure Meme [ ezmp3.co ].mp3');
        this.load.audio('buttonSound', '../assets/sounds/687107__aphom000__mouse-2-button-fast-click.wav');
    }

    create() {
        const width = this.scale.width;
        const height = this.scale.height;
        this.cameras.main.fadeIn(1000);

        // Inicia a música da tela inicial em loop
        this.initialMusic = this.sound.add('initialMusic', { loop: true, volume: 1 });
        this.initialMusic.play();

        // Registra os eventos para pausar a música ao sair/pausar a cena
        this.events.on('shutdown', this.shutdown, this);
        this.events.on('pause', this.shutdown, this);

        // Adiciona a imagem de fundo e ajusta seu tamanho
        this.add.image(width/2, height/2, 'telaInicial').setScale(1.8);

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
            this.scene.start('cutScene');
        });
    }

    createButtonCreditos(width, height) {
        const botaoCreditos = this.add.image(width / 3.5, height / 1.3, 'botaoCreditos');
        botaoCreditos.setInteractive();
        botaoCreditos.setScale(1.2);
        botaoCreditos.on('pointerdown', () => {
            this.buttonSound();
            this.shutdown();
            this.scene.stop('initialScene');
            this.scene.start('creditosScene');
        });
    }

    createButtonAjustes(width, height) {
        const botaoAjustes = this.add.image(width / 1.45, height / 1.34, 'botaoAjustes');
        botaoAjustes.setInteractive();
        botaoAjustes.setScale(1.4);
        botaoAjustes.on('pointerdown', () => {
            this.buttonSound();
            this.shutdown();
            this.scene.stop('initialScene');
            this.scene.start('cutScene');
        });
    }
}
