class TutorialScene extends Phaser.Scene {
    constructor() {
        super({ key: 'tutorialScene' });

        // Lista das falas do Vivinho (tutorial)
        this.introducao = [
            "Olá! Qual é o seu nome?",
            "Vivinho: Olá, Fulano! Bem-vindo à Vivo! Somos a maior empresa de telecomunicações do Brasil! Parabéns por fazer parte do nosso time!",
            "Vivinho: Eu tenho uma importante missão: apresentar para você o plano de carreira interno da Vivo. Me diga, você conhece o plano de carreira da Vivo?"
        ];    

        this.perguntaCondicional = [
            "Vivinho: UAU! Que bom que você já sabe. Agora, quero te explicar uma coisa muito importante na sua jornada a partir de agora, o termo JOB ROTATION.",
            "Vivinho: Sem problemas! Vou te explicar um conceito importante: o JOB ROTATION. Para isso vamos continuar a nossa conversa."
        ];

        this.finalizacao = [
            "Vivinho: Observe esse esquema. Note que um jovem estagiário pode evoluir para… (mostrar esquema do desenvolvimento de carreira). Vamos mergulhar nisso nos próximos níveis!"
        ];

        this.currentLine = 0; // Índice da fala atual
        this.playerName = ""; // Nome do jogador
        this.opcaoSelecionada = false; // Indica se uma opção foi escolhida
        this.exibirImagem = false; // Indica se a imagem sobreposta deve aparecer
    }

    preload() {
        this.load.image('background', '../assets/mapaJogoVivo.png');
        this.load.image('vivinho', '../assets/vivinho.png');
        this.load.image('botaoSim', '../assets/botao_sim.png');
        this.load.image('botaoNao', '../assets/botao_nao.png');
        this.load.image('jobRotation', '../assets/job_rotation.png'); 
    }

    create() {
        this.background = this.add.image(0, 0, 'background').setOrigin(0, 0);
        this.background.setDisplaySize(this.cameras.main.width, this.cameras.main.height);
        
        this.createDialogBox();
        this.showDialog(); // Exibe a primeira fala

        // Criar a imagem sobreposta, mas deixá-la invisível
        this.sobreposicao = this.add.image(this.cameras.main.width / 2, this.cameras.main.height / 2 - 100, 'jobRotation');
        this.sobreposicao.setOrigin(0.5);
        this.sobreposicao.setScale(1); // Ajuste conforme necessário
        this.sobreposicao.setAlpha(0); // Deixa a imagem invisível

        // Adiciona interação para avançar o diálogo ao pressionar ENTER
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
        this.nome = document.createElement('input');
        this.nome.type = 'text';
        this.nome.placeholder = 'Digite seu nome...';
        this.nome.style.position = 'absolute';
        this.nome.style.width = '200px';
        this.nome.style.height = '30px';
        this.nome.style.fontSize = '18px';
        this.nome.style.background = '#fff';
        this.nome.style.border = '2px solid #ff9e0d';
        this.nome.style.borderRadius = '5px';
        this.nome.style.textAlign = 'center';
        this.nome.style.display = 'none';

        document.body.appendChild(this.nome);
    }

    showDialog() {
        if (this.currentLine === 0) {
            this.nome.style.display = 'block';
            this.nome.style.left = `${this.cameras.main.width / 2 - 100}px`;
            this.nome.style.top = `${this.cameras.main.height - 100}px`;
        } else {
            this.nome.style.display = 'none';
        }

        if (this.currentLine === 1 && this.playerName) {
            this.dialogText.setText(`Prazer em te conhecer, ${this.playerName}! Eu sou o Vivinho!`);
        } else if (this.currentLine === 2) {
            this.dialogText.setText(this.introducao[this.currentLine]);
            this.createChoiceButtons();
            this.opcaoSelecionada = false; // Resetar para impedir avanço sem escolha
        } else {
            this.dialogText.setText(this.introducao[this.currentLine]);
        }
    }

    createChoiceButtons() {
        if (this.botaoSim || this.botaoNao) return;

        // Definir as posições dos botões
        const x = this.cameras.main.width / 2 - 100;
        const y = this.cameras.main.height - 200;

        this.botaoSim = this.add.image(x, y + 125, 'botaoSim').setScale(0.6).setInteractive();
        this.botaoNao = this.add.image(x + 200, y + 125, 'botaoNao').setScale(0.65).setInteractive();

        this.botaoSim.on('pointerdown', () => this.chooseOption(0));
        this.botaoNao.on('pointerdown', () => this.chooseOption(1));
    }

    chooseOption(optionIndex) {
        if (this.botaoSim) this.botaoSim.destroy();
        if (this.botaoNao) this.botaoNao.destroy();

        this.botaoSim = null;
        this.botaoNao = null;

        this.opcaoSelecionada = true;

        this.dialogText.setText(this.perguntaCondicional[optionIndex]);

        // Próxima vez que apertar ENTER, mostrará a imagem sobreposta
        this.exibirImagem = true;
    }

    nextDialog() {
        if (this.currentLine === 0 && this.nome.value.trim() === "") {
            return;
        }

        if (this.currentLine === 0) {
            this.playerName = this.nome.value.trim();
            this.nome.style.display = 'none';
        }

        if (this.currentLine === 2 && !this.opcaoSelecionada) {
            return;
        }

        // Se a imagem precisa ser mostrada, exibe e aguarda ENTER novamente
        if (this.exibirImagem) {
            this.dialogText.setText(this.finalizacao[0]);
            this.sobreposicao.setAlpha(1); // Torna a imagem visível
            this.exibirImagem = false; // Para não mostrar novamente
            return;
        }

        // Se a imagem já foi mostrada, agora pode mudar para a próxima cena
        if (this.sobreposicao.alpha === 1) {
            this.scene.start('officeScene');
            return;
        }

        this.currentLine++;

        if (this.currentLine < this.introducao.length) {
            this.showDialog();
        }
    }
}