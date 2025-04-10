class GameplayTutorialScene extends Phaser.Scene {
    constructor() {
        super({
            key: 'gameplayTutorialScene',
            backgroundColor: '#670099' // Cor de fundo definida aqui no objeto de configuração
        });
    }

    init(data) {
        this.selectedSpriteSheet = data.selectedSpriteSheet;

    }

    preload() {
        this.load.font('font', 'fonts/PixelifySans-VariableFont_wght.ttf'); // Carrega a fonte

        this.load.image('introduction', '../assets/instrucao.png'); // Carrega a imagem de introdução

        this.load.audio('buttonSound', '../assets/sounds/687107__aphom000__mouse-2-button-fast-click.wav'); // Efeito sonoro de clique
        this.load.audio('keySound', '../assets/sounds/computer-keyboard-typing-290582 (mp3cut.net).mp3'); // Efeito sonoros de tecla

        this.load.spritesheet('player', `../assets/personagens/skinsPlayer/players/${this.selectedSpriteSheet}.png`, { frameWidth: 16, frameHeight: 32, });
    }


    create() {
        this.cameras.main.setBackgroundColor('#61088d'); // Define a cor de fundo diretamente no método create

        this.cameras.main.fadeIn(1000); // Aplica um efeito de transição de fade-in ao iniciar a cena

        const { width, height } = this.scale; // Obtém as dimensões da tela (largura e altura)
        const tutorialImg = this.add.image(width / 2, height / 2, 'introduction').setOrigin(0.5); // Adiciona a imagem de introdução centralizada na tela

        const scaleX = width / tutorialImg.width; // Calcula a escala horizontal
        const scaleY = height / tutorialImg.height; // Calcula a escala vertical
        const scale = Math.min(scaleX, scaleY); // Escolhe a menor escala para manter a proporção
        tutorialImg.setScale(scale); // Aplica a escala calculada à imagem

        const startNextScene = () => { // Função para iniciar a próxima cena (quando o jogador clica ou aperta ENTER)
            this.cameras.main.fadeOut(1000); // Aplica um efeito de transição de fade-out ao sair da cena
            this.cameras.main.once('camerafadeoutcomplete', () => { // Aguarda o término do fade-out
                this.scene.start('tutorialScene', { selectedSpriteSheet: this.selectedSpriteSheet, }); // Inicia a próxima cena chamada 'tutorialScene'
            });
        };

        this.input.on('pointerdown', () => { // Detecta clique na tela
            this.buttonClick = this.sound.add('buttonSound', { loop: false, volume: 10 }); // Adiciona o som de clique do botão
            this.buttonClick.play(); // Reproduz o som do botão
            startNextScene(); // Chama a função para iniciar a próxima cena
        });

        this.input.keyboard.on('keydown-ENTER', () => { // Detecta a tecla ENTER para avançar
            this.buttonClick = this.sound.add('keySound', { loop: false, volume: 10 }); // Adiciona o som de pressionar a tecla
            this.buttonClick.play(); // Reproduz o som da tecla
            startNextScene(); // Chama a função para iniciar a próxima cena
        });

        this.add.text( // Adiciona um texto de instrução para o jogador
            width / 2, // Define a posição horizontal centralizada
            height - 100, // Define a posição vertical a 100px do fundo da tela
            'Clique ou pressione ENTER para continuar', // Define o texto de instrução
            {
                fontSize: '24px', // Define o tamanho da fonte
                fill: '#000000', // Define a cor do texto
                fontFamily: '"font", Arial, sans-serif', // Define a fonte personalizada
                backgroundColor: '#ffffff', // Define a cor de fundo do texto para maior visibilidade
                padding: { x: 10, y: 5 } // Define o espaçamento interno do texto
            }
        ).setOrigin(0.5); // Centraliza o texto em relação ao ponto de origem
    }
}

