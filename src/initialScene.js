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
        // Adiciona a imagem de fundo 'telaInicial' e ajusta seu tamanho para preencher a tela
        this.add.image(0, 0, 'telaInicial').setOrigin(0, 0).setDisplaySize(window.innerWidth, window.innerHeight);

        // Cria os botões na tela inicial
        this.createButtonJogar();
        this.createButtonCreditos();
        this.createButtonAjustes();
    }

    createButtonJogar() {
        // Adiciona o botão 'Jogar' na posição especificada
        const botaoJogar = this.add.image(this.cameras.main.width / 2, this.cameras.main.height / 2 + 50, 'botaoJogar');
        botaoJogar.setInteractive(); // Torna o botão interativo (clicável)
        botaoJogar.setScale(1.5); // Ajusta o tamanho do botão
        botaoJogar.on('pointerdown', () => {
            // Define a ação ao clicar no botão: para a cena atual e inicia a cena 'cutScene'
            this.scene.stop('initialScene');
            //this.scene.start('cutScene');
            this.scene.start('officeScene');
        });
    }

    createButtonCreditos() {
        // Adiciona o botão 'Créditos' na posição especificada
        const botaoCreditos = this.add.image(this.cameras.main.width / 3.5, this.cameras.main.height / 1.3, 'botaoCreditos');
        botaoCreditos.setInteractive(); // Torna o botão interativo (clicável)
        botaoCreditos.setScale(1.7); // Ajusta o tamanho do botão
        botaoCreditos.on('pointerdown', () => {
            // Define a ação ao clicar no botão: para a cena atual e inicia a cena 'cutScene'
            this.scene.stop('initialScene');
            this.scene.start('cutScene');
        });
    }

    createButtonAjustes() {
        // Adiciona o botão 'Ajustes' na posição especificada
        const botaoAjustes = this.add.image(this.cameras.main.width / 1.45, this.cameras.main.height / 1.34, 'botaoAjustes');
        botaoAjustes.setInteractive(); // Torna o botão interativo (clicável)
        botaoAjustes.setScale(1.9); // Ajusta o tamanho do botão
        botaoAjustes.on('pointerdown', () => {
            // Define a ação ao clicar no botão: para a cena atual e inicia a cena 'cutScene'
            this.scene.stop('initialScene');
            this.scene.start('cutScene');
        });
    }
}
