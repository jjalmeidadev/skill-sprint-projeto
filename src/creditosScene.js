class CreditosScene extends Phaser.Scene {
    constructor() {
        super({ key: 'creditosScene' });
    }

    init(data) {
        this.selectedSpriteSheet = data.selectedSpriteSheet;

    }

    preload() {
        this.load.image('backgroundCreditos', '../assets/créditos.png'); // Carrega a imagem de fundo
        this.load.image('arrow', '../assets/seta.png'); // Carrega a imagem da seta
    }

    create() {
        this.add.image(width / 2, height / 2, 'backgroundCreditos').setScale(0.7); // Adiciona a imagem de fundo

        this.createArrow(); // Chama a função que cria a seta
    }

    createArrow() {
        const arrow = this.add.image(width - 1300, height - 700, 'arrow'); // Adiciona o botão 'Seta' na posição especificada
        arrow.setInteractive(); // Torna o botão interativo (clicável)
        arrow.setScale(1); // Ajusta o tamanho do botão
        arrow.on('pointerdown', () => { // Adiciona um evento de clique no botão
            this.scene.stop('creditosScene'); // Para a cena de créditos
            this.scene.start('initialScene', { selectedSpriteSheet: this.selectedSpriteSheet, }); // Inicia a cena inicial
        });
    }
}