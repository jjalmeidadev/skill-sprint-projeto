class CreditosScene extends Phaser.Scene {
    constructor() {
        super({key: 'creditosScene' });
    }

    preload() {
        // Carrega as imagens para a tela creditos
        this.load.image('backgroundCreditos', '../assets/créditos.png');
        this.load.image('arrow', '../assets/seta.png');
    }

    create() {
        // Adiciona a imagem de fundo
        this.add.image(width/2, height/2, 'backgroundCreditos').setScale(0.7);
        
        // Chama a função que cria a seta
        this.createSeta();
    }

    createSeta() {
        // Adiciona o botão 'Seta' na posição especificada
        const arrow = this.add.image(width - 1300, height - 700, 'arrow');
        arrow.setInteractive(); // Torna o botão interativo (clicável)
        arrow.setScale(1); // Ajusta o tamanho do botão
        arrow.on('pointerdown', () => {
            // Quando clica na seta, volta para tela inicial
            this.scene.stop('creditosScene');
            this.scene.start('initialScene');
        });
    }
}