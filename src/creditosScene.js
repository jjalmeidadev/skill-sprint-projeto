class CreditosScene extends Phaser.Scene {
    constructor() {
        super({key: 'creditosScene' });
    }

    preload() {
        this.load.image('fundoCreditos', '../assets/fundoCreditos.png');
        this.load.image('seta', '../assets/seta.png');
    }

    create() {
        this.add.image(width/2, height/2, 'fundoCreditos');
        
        this.createSeta();
    }

    createSeta() {
        // Adiciona o botão 'Seta' na posição especificada
        const seta = this.add.image(width - 1300, height - 700, 'seta');
        seta.setInteractive(); // Torna o botão interativo (clicável)
        seta.setScale(1); // Ajusta o tamanho do botão
        seta.on('pointerdown', () => {
            // Define a ação ao clicar no botão: para a cena atual e inicia a cena 'cutScene'
            this.scene.stop('creditosScene');
            this.scene.start('initialScene');
        });
    }
}