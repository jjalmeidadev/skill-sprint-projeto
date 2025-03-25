class buttonElevatorScene extends Phaser.Scene {
    constructor() {
        super({ key: 'buttonElevatorScene' });
    }

    preload() {
        // Carrega os assets do primeiro botão do elevador
        this.load.image('buttonElevOffice', '../assets/botaocimaelevador.png');
        this.load.image('bgElevOffice', '../assets/bgelevadoroffice.png');
        this.load.image('displayelev', '../assets/painelelevador.png');

        // Carrega os efeitos sonoros
        this.load.audio('buttonSound', '../assets/sounds/687107__aphom000__mouse-2-button-fast-click.wav');

        // Adiciona os efeitos sonoros
        this.buttonClick = this.sound.add('buttonSound', {loop: false, volume: 10});
    }

    create() {
        this.sound.stopAll();

        // Adiciona o fundo e o painel do elevador
        this.bgelevoffice = this.add.image(width / 2, height / 2, "bgElevOffice");
        this.painelelev = this.add.image(width / 2, height / 2, "displayelev");

        // Adiciona o botão e configura para ser interativo
        this.buttonUP = this.add.image(width /2, height - 470, "buttonElevOffice"); 
        this.buttonUP.setInteractive(); // Torna o botão interativo (clicável)
        this.buttonUP.setScale(1); // Ajusta o tamanho do botão

        // Adiciona a interação para mudar de cena ao clicar no botão
        this.buttonUP.on("pointerdown", () => {
            this.buttonClick.play();
            this.scene.start("elevadorScene"); // Troca para a cena do elevador
        });
    }
}
