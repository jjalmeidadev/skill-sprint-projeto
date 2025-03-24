class MinigameTrashScene extends Phaser.Scene {
    constructor() {
        super({key: 'minigameTrashScene'});
    }

    preload() {
        this.load.image('backgroundTrash', '../assets/assetsTrash/backgroundTrash.png'); // Carrega o fundo
        this.load.image('banana', '../assets/assetsTrash/banana.png'); // Carrega a banana
        this.load.image('bottle', '../assets/assetsTrash/bottle.png'); // Carrega a garrafa
        this.load.image('paper', '../assets/assetsTrash/paper.png'); // Carrega o papel
        this.load.image('head', '../assets/assetsTrash/head.png'); // Carrega a cabeça do vivinho
        this.load.image('body', '../assets/assetsTrash/body.png'); // Carrega o corpo do vivinho
        this.load.image('legs', '../assets/assetsTrash/legs.png'); // Carrega a perna do vivinho
        this.load.image('smileFace', '../assets/assetsTrash/smileFace.png'); // Carrega a carinha feliz
        this.load.spritesheet('hand', '../assets/assetsTrash/hand.png', { frameWidth: 287, frameHeight: 232 }); // Carrega a mão
        this.load.spritesheet('explosion', '../assets/assetsTrash/explosion.png', { frameWidth: 122, frameHeight: 127 }); // Carrega os sprites da explosão
    }

    create() {
        this.pontuacao = 0; // Inicializa a pontuação em 0
        //this.addBanana(); // Gera uma banana na cena
        //this.addBottle(); // Gera uma garrafa na cena
        //this.addPaper(); // Gera uma papel na cena

        this.add.image(width / 2, height / 2, 'backgroundTrash'); // Adiciona a imagem de fundo ao centro da cena

        this.hand = this.physics.add.sprite(width - 1350, height - 650, 'hand'); // Adiciona a mão na cena
        this.hand.setCollideWorldBounds(true); // Faz a mão colidir com os limites do mundo
        this.hand.setGravityY(100); // Define a gravidade no eixo Y para a mão
        this.hand.setAngle(0); // Define o ângulo da mão para 0 graus
        this.hand.setScale(0.6); // Define o tamanha da mão

        this.kesy = this.input.keyboard.addKeys({ A: 'A', W: 'W', S: 'S', D: 'D' }); // Cria teclas para entrada

        this.smile = this.physics.add.sprite(width - 200, height - 350, 'smileFace'); // Adiciona o sprite da estrela à cena.
        this.smile.setCollideWorldBounds(true); // Faz a estrela colidir com os limites do mundo.
        this.smile.setBounce(0.7); // Define o valor de quique para a estrela.
        this.smile.setScale(0.12); // Define o tamanho da carinha feliz
    }
}