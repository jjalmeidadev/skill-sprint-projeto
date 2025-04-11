/**
 * Represents the buttonElevatorScene in a Phaser game.
 * This scene handles the display and interaction with an elevator button.
 * 
 * @class buttonElevatorScene
 * @extends {Phaser.Scene}
 */
/**
 * Representa a buttonElevatorScene, uma Phaser.Scene que lida com a interação do botão do elevador.
 * Esta cena exibe uma interface de elevador com um botão e realiza a transição para outra cena ao interagir.
 */
class buttonElevatorScene extends Phaser.Scene {
    constructor() {
        super({ key: 'buttonElevatorScene' });
    }
    
    init(data) {
        this.selectedSpriteSheet = data.selectedSpriteSheet;
        
    }

    preload() {
        this.load.image('buttonElevOffice', '../assets/botaocimaelevador.png'); // Carrega a imagem do botão do elevador
        this.load.image('bgElevOffice', '../assets/bgelevadoroffice.png'); // Carrega a imagem de fundo do elevador
        this.load.image('displayElev', '../assets/painelelevador.png'); // Carrega a imagem do painel do elevador

        this.load.audio('buttonSound', '../assets/sounds/687107__aphom000__mouse-2-button-fast-click.wav'); // Efeito sonoro do botão
        this.buttonClick = this.sound.add('buttonSound', {loop: false, volume: 10}); // Efeito sonoro do botão
    }

    create() {
        this.sound.stopAll(); // Para garantir que o som não fique tocando em segundo plano

        this.bgElevOffice = this.add.image(width/2, height/2, "bgElevOffice").setScale(width/900, height/550);  // Adiciona a imagem de fundo do elevador
        this.displayElev = this.add.image(width / 2, height / 2, "displayElev"); // Adiciona a imagem do painel do elevador

        this.buttonUP = this.add.image(width /2, height - 470, "buttonElevOffice"); // Adiciona a imagem do botão do elevador
        this.buttonUP.setInteractive(); // Torna o botão interativo (clicável)
        this.buttonUP.setScale(1); // Ajusta o tamanho do botão

        this.buttonUP.on("pointerdown", () => { // Adiciona o evento de clique
            this.buttonClick.play(); // Toca o som do botão
            this.scene.start("elevadorScene", {selectedSpriteSheet: this.selectedSpriteSheet,}); // Troca para a cena do elevador
        });
    }
}
