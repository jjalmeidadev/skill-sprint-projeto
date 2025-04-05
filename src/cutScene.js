class CutScene extends Phaser.Scene {
    constructor() {
        super({ key: 'cutScene' });
    }
    
    init(data) {
        this.selectedSpriteSheet = data.selectedSpriteSheet;
        console.log('Selected Sprite Sheet:', this.selectedSpriteSheet);
    }
    
    preload() {
        this.load.video('cutScene', '../assets/cutsceneVivo.mp4'); // Carrega o vídeo da cutscene
    }

    create() {   
        this.cutScene = this.add.video(width / 2, height / 2, 'cutScene').setOrigin(0.5); // Adiciona o vídeo à cena, centralizando-o na tela   
        this.cutScene.setScale(0.4); // Define a escala do vídeo para 50% do tamanho original
        
        this.playCutScene(); // Chama o método para reproduzir a cutscene
    }

    playCutScene() {
        this.cutScene.play(false); // Reproduz o vídeo da cutscene

        this.cutScene.on('complete', () => { // Quando o vídeo terminar, inicia a próxima cena do jogo
            this.scene.start('gameplayTutorialScene', {selectedSpriteSheet: this.selectedSpriteSheet,}); // Troca para a cena 'gameplayTutorialScene'
        });
        
        //Código comentado que permite pular a cutscene ao clicar na tela
         /*this.input.on('pointerdown', () => { // Se o jogador clicar na tela, pula a cutscene
            this.scene.stop('cutScene'), // Para a cena atual
             this.scene.start('tutorialScene'); // Inicia a cena 'tutorialScene'
         });*/
    }
}

