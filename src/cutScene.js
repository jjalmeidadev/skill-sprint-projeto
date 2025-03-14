class CutScene extends Phaser.Scene {
    constructor() {
        // Chama o construtor da classe Phaser.Scene com a chave 'cutScene'
        super({ key: 'cutScene' });
    }

    preload() {
        // Carrega o vídeo da cutscene
        this.load.video('cutScene', '../assets/cutsceneVivo.mp4');
    }

    create() {
        // Adiciona o vídeo à cena, centralizando-o na tela
        this.video = this.add.video(width / 2, height / 2, 'cutScene').setOrigin(0.5);
        
        // Define a escala do vídeo para 50% do tamanho original
        this.video.setScale(0.5);

        // Chama o método para reproduzir a cutscene
        this.playCutScene();
    }

    playCutScene() {
        // Reproduz o vídeo da cutscene
        this.video.play(false);
        // Quando o vídeo terminar, inicia a próxima cena do jogo
        this.video.on('complete', () => {
            this.scene.start('gameplayTutorialScene'); // Troca para a cena 'tutorialScene'
        });
        
        // //Código comentado que permite pular a cutscene ao clicar na tela
        // this.input.on('pointerdown', () => {
        //     this.scene.stop('cutScene'),
        //     this.scene.start('tutorialScene');
        // });
    }
}

