/**
 * A classe CutScene representa uma cena do Phaser responsável por exibir um vídeo de cutscene.
 * Esta cena gerencia a reprodução de um vídeo e realiza a transição para a próxima cena ao final
 * da reprodução ou quando o usuário interage com a tela.
 */
class CutScene extends Phaser.Scene {
    /**
     * Construtor da classe CutScene.
     * Inicializa a cena com uma chave única.
     */
    constructor() {
        super({ key: 'cutScene' });
    }

    /**
     * Inicializa a cena com os dados passados da cena anterior.
     * @param {Object} data - Dados passados para a cena.
     * @param {string} data.selectedSpriteSheet - A sprite sheet selecionada para ser usada na próxima cena.
     */
    init(data) {
        this.selectedSpriteSheet = data.selectedSpriteSheet;
    }

    /**
     * Pré-carrega os recursos necessários para a cutscene.
     * Carrega o arquivo de vídeo que será exibido durante a cutscene.
     */
    preload() {
        this.load.video('cutScene', '../assets/cutsceneVivo.mp4'); // Carrega o arquivo de vídeo da cutscene.
    }

    /**
     * Cria a cutscene adicionando o vídeo à cena e configurando suas propriedades.
     * Chama o método para reproduzir a cutscene.
     */
    create() {
        this.cutScene = this.add.video(width / 2, height / 2, 'cutScene').setOrigin(0.5); // Adiciona o vídeo à cena e o centraliza.
        this.cutScene.setScale(0.4); // Define a escala do vídeo para 40% do tamanho original.

        this.playCutScene(); // Inicia a reprodução da cutscene.
    }

    /**
     * Reproduz o vídeo da cutscene e gerencia as transições para a próxima cena.
     * Permite pular a cutscene clicando na tela.
     */
    playCutScene() {
        this.cutScene.play(false); // Reproduz o vídeo da cutscene sem loop.

        this.cutScene.on('complete', () => { // Escuta o evento de conclusão do vídeo.
            this.scene.start('gameplayTutorialScene', { selectedSpriteSheet: this.selectedSpriteSheet }); // Transita para a cena 'gameplayTutorialScene'.
        });

        this.input.on('pointerdown', () => { // Escuta o evento de clique (mouse ou toque) na tela.
            this.scene.stop('cutScene'); // Para a cutscene atual.
            this.scene.start('gameplayTutorialScene', { selectedSpriteSheet: this.selectedSpriteSheet }); // Transita para a cena 'gameplayTutorialScene'.
        });
    }
}

