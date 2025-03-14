class CreditosScene extends Phaser.Scene {
    constructor() {
        super({key: 'creditosScene' });
    }

    preload() {
        // Carrega as imagens para a tela creditos
        this.load.image('fundoCreditos', '../assets/fundoCreditos.png');
        this.load.image('seta', '../assets/seta.png');
    }

    create() {
        // Adiciona a imagem de fundo
        this.add.image(width/2, height/2, 'fundoCreditos');
        
        // Chama a função que cria a seta
        this.createSeta();
    }

    createSeta() {
        // Adiciona o botão 'Seta' na posição especificada
        const seta = this.add.image(width - 1300, height - 700, 'seta');
        seta.setInteractive(); // Torna o botão interativo (clicável)
        seta.setScale(1); // Ajusta o tamanho do botão
        seta.on('pointerdown', () => {
            // Quando clica na seta, volta para tela inicial
            this.scene.stop('creditosScene');
            this.scene.start('initialScene');
        });
    }
}