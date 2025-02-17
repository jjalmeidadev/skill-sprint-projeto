class tutorialScene extends Phaser.Scene {
    constructor() {
        super({ key: 'tutorialScene'};)
    }

    preload() {
        //carrega a imagem do vivinho
        this.load.image('vivinho', 'assets/vivinho.png');
    }
}

