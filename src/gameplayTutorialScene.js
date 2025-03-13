class GameplayTutorialScene extends Phaser.Scene {
    constructor() {
        super({ 
            key: 'gameplayTutorialScene',
            backgroundColor: '#61088d' // Cor de fundo definida aqui no objeto de configuração
        });
    }

    preload() {
        // Carregar a imagem de instrução

        // Carrega a fonte
        this.load.font('FontePadrao', 'fonts/PixelifySans-VariableFont_wght.ttf');
        this.load.image('introducao', '../assets/instrucao.png');
    }

    create() {
        // Definir a cor de fundo diretamente no método create
        this.cameras.main.setBackgroundColor('#61088d');
        
        this.cameras.main.fadeIn(1000); // Efeito de transição para a cena

        //const { width, height } = this.scale; // Obter dimensões da tela
        const tutorialImg = this.add.image(width / 2, height / 2, 'introducao').setOrigin(0.5); // Posicionamento da imagem


        // Ajuste de escala para manter as proporções corretas
        const scaleX = width / tutorialImg.width;
        const scaleY = height / tutorialImg.height;
        const scale = Math.min(scaleX, scaleY);
        tutorialImg.setScale(scale);

        // Função para iniciar a próxima cena (quando o jogador clica ou aperta ENTER)
        const startNextScene = () => {
            this.cameras.main.fadeOut(1000); // Efeito de transição para sair da cena
            this.cameras.main.once('camerafadeoutcomplete', () => {
                this.scene.start('tutorialScene'); // Troca para a cena principal do jogo
            });
        };

        // Detectar clique na tela
        this.input.on('pointerdown', startNextScene);

        // Detectar a tecla ENTER para avançar
        this.input.keyboard.on('keydown-ENTER', startNextScene);

        // Texto de instrução para o jogador
        this.add.text(
            width / 2, // Posicionamento centralizado
            height - 100, // A 100px do fundo
            'Clique ou pressione ENTER para continuar', // Texto de instrução
            { 
                fontSize: '24px', 
                fill: '#ffffff',
                fontFamily: '"FontePadrao", Arial, sans-serif', // Fonte personalizada
                backgroundColor: '#000000', // Fundo do texto para maior visibilidade
                padding: { x: 10, y: 5 } // Espaçamento do texto
            }
        ).setOrigin(0.5); // Centraliza o texto
    }
}
