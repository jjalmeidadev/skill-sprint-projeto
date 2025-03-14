class buttonElevatorScene extends Phaser.Scene {
    constructor() {
        super({ key: 'buttonElevatorScene' });
    }

    preload() {
        // Carrega os assets do primeiro botão do elevador
        this.load.image('botaoElevOffice', '../assets/botaocimaelevador.png');
        this.load.image('bgElevOffice', '../assets/bgelevadoroffice.png');
        this.load.image('painelelev', '../assets/painelelevador.png');
    }

    create() {
        // Adiciona o fundo e o painel do elevador
        this.bgelevoffice = this.add.image(width / 2, height / 2, "bgElevOffice");
        this.painelelev = this.add.image(width / 2, height / 2, "painelelev");

        // Adiciona o botão e configura para ser interativo
        this.botaoCima = this.add.image(width / 2, height / 2 + 100, "botaoElevOffice"); 
        this.botaoCima.setInteractive(); // Torna o botão interativo (clicável)
        this.botaoCima.setScale(1); // Ajusta o tamanho do botão

        // Adiciona a interação para mudar de cena ao clicar no botão
        this.botaoCima.on("pointerdown", () => {
            this.scene.start("elevadorScene"); // Troca para a cena do elevador
        });
    }
}
