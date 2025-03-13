class InitialScene extends Phaser.Scene {

    constructor() {
        // Chama o construtor da classe Phaser.Scene com a chave 'initialScene'
        super({ key: 'initialScene' });
    }

    preload() {
        // Carrega as imagens necessárias para a cena inicial
        this.load.image('telaInicial', '../assets/tela_inicial.png');
        this.load.image('botaoJogar', '../assets/botao_jogar.png');
        this.load.image('botaoCreditos', '../assets/botao_creditos.png');
        this.load.image('botaoAjustes', '../assets/botao_ajustes.png');
    }

    create() {
        this.cameras.main.fadeIn(1000); // Transição suave
        // Adiciona a imagem de fundo 'telaInicial' e ajusta seu tamanho para preencher a tela
        this.add.image(width/2, height/2, 'telaInicial').setScale(1.8);

        // Cria os botões na tela inicial
        this.createButtonJogar();
        this.createButtonCreditos();
        this.createButtonAjustes();
    }

    createButtonJogar() {
        // Adiciona o botão 'Jogar' na posição especificada
        const botaoJogar = this.add.image(width / 2, (height / 2) + 50, 'botaoJogar');
        botaoJogar.setInteractive(); // Torna o botão interativo (clicável)
        botaoJogar.setScale(1); // Ajusta o tamanho do botão
        botaoJogar.on('pointerdown', () => {
            // Define a ação ao clicar no botão: para a cena atual e inicia a cena 'cutScene'
            this.scene.stop('initialScene');
            this.scene.start('officeScene');
            //this.scene.start('officeScene');
        });
    }

    createButtonCreditos() {
        // Adiciona o botão 'Créditos' na posição especificada
        const botaoCreditos = this.add.image(width / 3.5, height / 1.3, 'botaoCreditos');
        botaoCreditos.setInteractive(); // Torna o botão interativo (clicável)
        botaoCreditos.setScale(1.2); // Ajusta o tamanho do botão
        botaoCreditos.on('pointerdown', () => {
            // Define a ação ao clicar no botão: para a cena atual e inicia a cena 'cutScene'
            this.scene.stop('initialScene');
            this.scene.start('creditosScene');
        });
    }

    createButtonAjustes() {
        // Adiciona o botão 'Ajustes' na posição especificada
        const botaoAjustes = this.add.image(width / 1.45, height / 1.34, 'botaoAjustes');
        botaoAjustes.setInteractive(); // Torna o botão interativo (clicável)
        botaoAjustes.setScale(1.4); // Ajusta o tamanho do botão
        botaoAjustes.on('pointerdown', () => {
            // Define a ação ao clicar no botão: para a cena atual e inicia a cena 'cutScene'
            this.scene.stop('initialScene');
            this.scene.start('cutScene');
        });
    }
}
