class curriculoScene extends Phaser.Scene {
    constructor() {
        super({ key: 'curriculoScene' });
        this.currentBackground = 'background'; // Definir o estado inicial
        this.canMove = true; // Controla se o jogador pode se mover
    }

    preload() {
        this.load.image('primeiraTela', '../assets/primeiraTela.png');

    }

    create() {
        const fundo = this.add.image(0, 0, 'primeiraTela').setOrigin(0, 0); // Define a origem no canto superior esquerdo

        // Redimensiona a imagem para cobrir toda a tela
        fundo.setDisplaySize(this.sys.game.config.width, this.sys.game.config.height);
    }

    update() {

    }
}



