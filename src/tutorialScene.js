class tutorialScene extends Phaser.Scene {
    constructor() {
        super({ key: 'tutorialScene' });

        //lista das falas do vivinho(tutorial)
        this.dialogLines = [
            "Olá! Qual é o seu nome?",
            "Vivinho: Olá, Fulano! Bem-vindo à Vivo! Somos a maior empresa de telecomunicações do Brasil! Parabéns por fazer parte do nosso time!",
            "Vivinho: Eu tenho uma importante missão: apresentar para você o plano de carreira interno da Vivo. Me diga, você conhece o plano de carreira da Vivo?",
            "Evite obstáculos e colete pontos pelo caminho!",
            "Está pronto? Então vamos lá!"
        ];
        

        this.perguntaLine = [
            "Vivinho: UAU! Que bom que você já sabe. Agora, quero aproveitar para te explicar uma coisa muito importante na sua jornada a partir de agora, o termo JOB ROTATION.",
            "Vivinho: Sem problemas! Vou te explicar um conceito importante: o JOB ROTATION.",
        ];
        this.finalLines = [
            "Vivinho: Observe esse esquema. Note que um jovem estagiário pode evoluir para… (mostrar esquema do desenvolvimento de carreira). Vamos mergulhar nisso nos próximos níveis!"
        ];

        this.currentLine = 0; // Índice da fala atual
        this.playerName = ""; //nome do jogador
    }

    preload() {
        this.load.image('background', '../assets/mapaJogoVivo.png');
        this.load.image('vivinho', '../assets/vivinho.png');
        this.load.image('botaoSim', '../assets/botao_sim.png');
        this.load.image('botaoNao', '../assets/botao_nao.png');
    }

    create() {
        this.background = this.add.image(0, 0, 'background').setOrigin(0, 0);
        this.background.setDisplaySize(this.cameras.main.width, this.cameras.main.height);
        
        this.createDialogBox();
        this.showDialog(); // Exibe a primeira fala

        // Adiciona interação para avançar o diálogo ao pressionar ESPAÇO
        this.input.keyboard.on('keydown-ENTER', () => this.nextDialog());
    }

    createDialogBox() {
        const dialogWidth = 800;
        const dialogHeight = 150;
        const x = this.cameras.main.width / 2 - dialogWidth / 2;
        const y = this.cameras.main.height - dialogHeight - 50;

        // Criar o fundo da caixa de diálogo
        this.dialogBox = this.add.graphics();
        this.dialogBox.fillStyle(0xff9e0d, 1);
        this.dialogBox.fillRoundedRect(x, y, dialogWidth, dialogHeight, 10);

        // Adicionar a imagem do personagem
        this.vivinhoSprite = this.add.image(x + 80, y + 40, 'vivinho').setScale(0.5);

        // Criar o texto da fala
        this.dialogText = this.add.text(x + 150, y + 30, '', {
            fontSize: '20px',
            color: '#ffffff',
            fontFamily: 'Arial',
            wordWrap: { width: 600 }
        });

        // Criar campo de entrada (input) para o nome do jogador
        this.nameInput = document.createElement('input');
        this.nameInput.type = 'text';
        this.nameInput.placeholder = 'Digite seu nome...';
        this.nameInput.style.position = 'absolute';
        this.nameInput.style.width = '200px';
        this.nameInput.style.height = '30px';
        this.nameInput.style.fontSize = '18px';
        this.nameInput.style.background = '#fff';
        this.nameInput.style.border = '2px solid #ff9e0d';
        this.nameInput.style.borderRadius = '5px';
        this.nameInput.style.textAlign = 'center';

        document.body.appendChild(this.nameInput);
    }

    showDialog() {
        if(this.currentLine == 0) {
            this.nameInput.style.left = `${this.cameras.main.width / 2 - 100}px`;
            this.nameInput.style.top = `${this.cameras.main.height - 100}px`;
        } 
        if (this.currentLine === 1 && this.playerName) {
            this.dialogText.setText(`Prazer em te conhecer, ${this.playerName}! Eu sou o Vivinho!`);
        } else if (this.currentLine == 2) {
            //exibi a pergunta e mostra os botões
            this.dialogText.setText(this.dialogLines[this.currentLine]);
            this.createChoiceButtons();
        }
        else {
            this.dialogText.setText(this.dialogLines[this.currentLine]);
        }
    }

    createChoiceButtons() {
        this.botaoSim = this.add.image(700, 700, 'botaoSim').setScale(0.6).setInteractive();
        this.botaoNao = this.add.image(850, 698, 'botaoNao').setScale(0.65).setInteractive();

        this.botaoSim.on('pointerdown', () => this.chooseOption(0));
        this.botaoNao.on('pointerdown', () => this.chooseOption(1));
    }

    chooseOption(optionIndex) {
        //remove os botoes da tela
        this.botaoSim.destroy();
        this.botaoNao.destroy();

        //define a nova fala de acordo com a escolha
        this.dialogText.setText(this.perguntaLines[optionIndex]);

        //apos a fala seguir para a proxima parte
        this.time.delayedCall(3000, () => {
            this.dialogText.setText(this.finalLines[0]);
            this.time.delayedCall(300, () => {
                this.scene.start('officeScene');
            });
        });
    }

    nextDialog() {
        if (this.currentLine === 0 && this.nameInput.value.trim() === "") {
            return; // Impede de avançar se o nome estiver vazio
        }

        if (this.currentLine === 0) {
            this.playerName = this.nameInput.value.trim(); // Salva o nome do jogador
            this.nameInput.style.display = 'none'; // Esconde o campo de input
        }
        this.currentLine++; // Avança para a próxima fala

        if (this.currentLine < this.dialogLines.length) {
            this.showDialog(); // Exibe a nova fala
        } else {
            // Se as falas acabarem, inicia a próxima cena do jogo
            this.scene.start('GameScene'); 
        }
    }
}

