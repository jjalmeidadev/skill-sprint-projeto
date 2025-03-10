class CurriculoScene extends Phaser.Scene {
    constructor() {
        // Chama o construtor da classe Phaser.Scene com a chave 'curriculoScene'
        super({ key: 'curriculoScene' });
        this.currentBackground = 'background'; // Define o estado inicial do fundo
        this.canMove = true; // Controla se o jogador pode se mover
    }

    preload() {
        // Carrega a imagem necessária para a cena do currículo
        this.load.image('primeiraTela', 'assets/assetsBackground/primeiraTela.png');
    }

    create() {
        // Adiciona a imagem de fundo 'primeiraTela' e define a origem no canto superior esquerdo
        const fundo = this.add.image(0, 0, 'primeiraTela').setOrigin(0, 0);

        // Redimensiona a imagem para cobrir toda a tela
        fundo.setDisplaySize(this.sys.game.config.width, this.sys.game.config.height);
    }

    update() {
        
    }
}