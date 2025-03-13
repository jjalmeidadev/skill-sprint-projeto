class TutorialScene extends Phaser.Scene {
    constructor() {
        // Chama o construtor da classe Phaser.Scene com a chave 'tutorialScene'
        super({ key: 'tutorialScene' });

        // Lista das falas do Vivinho (tutorial)
        this.introducao = [
            "Olá! Qual é o seu nome?",
            "Vivinho: Olá, Fulano! Bem-vindo à Vivo! Somos a maior empresa de telecomunicações do Brasil! Parabéns por fazer parte do nosso time!",
            "Vivinho: Eu tenho uma importante missão: apresentar para você o plano de carreira interno da Vivo. Me diga, você conhece o plano de carreira da Vivo?"
        ];

        // Lista das falas condicionais baseadas na resposta do jogador
        this.perguntaCondicional = [
            "Vivinho: UAU! Que bom que você já sabe. Agora, quero te explicar uma coisa muito importante na sua jornada a partir de agora, o termo JOB ROTATION.",
            "Vivinho: Na Vivo, o termo JOB ROTATION se refere a uma estratégia de desenvolvimento profissional em que os colaboradores têm a oportunidade de atuar temporariamente em diferentes áreas da empresa.",
            "Vivinho: O principal objetivo desse programa é ampliar a visão sistêmica do negócio, desenvolver novas habilidades e preparar os funcionários para futuras posições de liderança.",
            "Vivinho: Por isso, irei te guiar para ser um líder na Vivo!"

        ];

        // Lista das falas de finalização do tutorial
        this.finalizacao = [
            "Vivinho: Observe esse esquema. Note que um jovem estagiário pode evoluir para diversos cargos e realizar o job rotation na Vivo. Vamos mergulhar nisso nos próximos níveis!"
        ];

        this.currentLine = 0; // Índice da fala atual
        //this.playerName = ""; // Nome do jogador
        this.opcaoSelecionada = false; // Indica se uma opção foi escolhida
        this.exibirImagem = false; // Indica se a imagem sobreposta deve aparecer
    }

    preload() {
        // Carrega as imagens necessárias para a cena do tutorial
        this.load.image('vivinho', '../assets/vivinho.png');
        this.load.image('botaoSim', '../assets/botao_sim.png');
        this.load.image('botaoNao', '../assets/botao_nao.png');
        this.load.image('jobRotation', '../assets/jobRotationVivo.png');
        this.load.font('FontePadrao', 'fonts/PixelifySans-VariableFont_wght.ttf'); // Fonte do jogo

        this.load.tilemapTiledJSON('escritorio', '../assets/mapaJogoVivo/mapaJogoVivo.json');
        this.load.image('decoracao', '../assets/mapaJogoVivo/decoracao.png');
        this.load.image('paredes', '../assets/mapaJogoVivo/paredes.png');
        this.load.image('personalizado_vivo', '../assets/mapaJogoVivo/personalizado_vivo.png');
    }

    create() {
        const map = this.make.tilemap({ key: "escritorio", tileWidth: 25, tileHeight: 20});

        const tileset1 = map.addTilesetImage("decoracao");
        const tileset2 = map.addTilesetImage("paredes");
        const tileset3 = map.addTilesetImage("personalizado_vivo");

        const layer1 = map.createLayer("chao", tileset2, width - 1270, 0).setScale(2.5);
        const layer2 = map.createLayer("chaoLider", tileset1, width - 1270, 0).setScale(2.5);
        const layer3 = map.createLayer("tapetes", tileset3, width - 1270, 0).setScale(2.5);
        const layer4 = map.createLayer("tapeteLider", tileset1, width - 1270, 0).setScale(2.5);
        const layer5 = map.createLayer("paredes", tileset2, width - 1270, 0).setScale(2.5);
        const layer6 = map.createLayer("detalhesParede", tileset2, width - 1270, 0).setScale(2.5);
        const layer7 = map.createLayer("decoracao", tileset1, width - 1270, 0).setScale(2.5);
        const layer8 = map.createLayer("plantas", tileset1, width - 1270, 0).setScale(2.5);
        const layer9 = map.createLayer("portas", tileset1, width - 1270, 0).setScale(2.5);

        layer1.setCollisionByProperty({ collider: true});
        layer2.setCollisionByProperty({ collider: true});
        layer3.setCollisionByProperty({ collider: true});
        layer4.setCollisionByProperty({ collider: true});
        layer5.setCollisionByProperty({ collider: true});
        layer6.setCollisionByProperty({ collider: true});
        layer7.setCollisionByProperty({ collider: true});
        layer8.setCollisionByProperty({ collider: true});
        layer9.setCollisionByProperty({ collider: true});

        // Cria a caixa de diálogo e exibe a primeira fala
        this.createDialogBox();
        this.showDialog();

        // Cria a imagem sobreposta, mas deixá-la invisível
        this.sobreposicao = this.add.image(width / 2, height / 2 - 100, 'jobRotation');
        this.sobreposicao.setOrigin(0.5);
        this.sobreposicao.setScale(0.5); // Ajuste conforme necessário
        this.sobreposicao.setAlpha(0); // Deixa a imagem invisível

        // Adiciona interação para avançar o diálogo ao pressionar ENTER
        this.input.keyboard.on('keydown-ENTER', () => this.nextDialog());
    }

    createDialogBox() {
        const dialogWidth = width/2;
        const dialogHeight = height/5;
        const x = this.cameras.main.width / 2 - dialogWidth / 2;
        const y = this.cameras.main.height - dialogHeight - 50;

        // Cria o fundo da caixa de diálogo
        this.dialogBox = this.add.graphics();
        this.dialogBox.fillStyle(0xff9e0d, 1);
        this.dialogBox.fillRoundedRect(x, y, dialogWidth, dialogHeight, 10);

        // Adiciona a imagem do personagem
        this.vivinhoSprite = this.add.image(x + 80, y + 40, 'vivinho').setScale(0.5);

        // Cria o texto da fala
        this.dialogText = this.add.text(x + 150, y + 30, '', {
            fontSize: '20px',
            color: '#ffffff',
            fontFamily: 'FontePadrao',
            wordWrap: { width: 600 }
        });

        // Cria campo de entrada (input) para o nome do jogador
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
        this.nome.style.fontFamily = 'FontePadrao';

        document.body.appendChild(this.nome);
    }

    showDialog() {
        const x = width / 2 - 100;
        const y = height/1.2;

        if (this.currentLine === 0) {
            // Exibe o campo de entrada para o nome do jogador
            this.nome.style.display = 'block';
            this.nome.style.left = `${width-1000}px`;
            this.nome.style.top = `${height - 300}px`;
        } else {
            // Esconde o campo de entrada para o nome do jogador
            this.nome.style.display = 'none';
        }

        if (this.currentLine === 1 && playerName) {
            // Exibe a fala de boas-vindas com o nome do jogador
            this.dialogText.setText(`Prazer em te conhecer, ${playerName}! Eu sou o Vivinho!`);
        } else if (this.currentLine === 2) {
            // Exibe a fala e cria os botões de escolha
            this.dialogText.setText(this.introducao[this.currentLine]);
            this.createChoiceButtons();
            this.opcaoSelecionada = false; // Reseta para impedir avanço sem escolha
        } else {
            // Exibe a fala atual
            this.dialogText.setText(this.introducao[this.currentLine]);
        }
    }

    createChoiceButtons() {
        if (this.botaoSim || this.botaoNao) return;

        // Define as posições dos botões
        const x = width / 2 - 100;
        const y = height - 200;

        // Cria o botão 'Sim'
        this.botaoSim = this.add.image(x, y + 125, 'botaoSim').setScale(0.6).setInteractive();
        // Cria o botão 'Não'
        this.botaoNao = this.add.image(x + 200, y + 125, 'botaoNao').setScale(0.65).setInteractive();

        // Define a ação ao clicar no botão 'Sim'
        this.botaoSim.on('pointerdown', () => this.chooseOption(0));
        // Define a ação ao clicar no botão 'Não'
        this.botaoNao.on('pointerdown', () => this.chooseOption(1));
    }

    chooseOption(optionIndex) {
        // Destroi os botões após a escolha
        if (this.botaoSim) this.botaoSim.destroy();
        if (this.botaoNao) this.botaoNao.destroy();
    
        this.botaoSim = null;
        this.botaoNao = null;
    
        this.opcaoSelecionada = true; // Indica que uma opção foi escolhida
    
        if (optionIndex === 1) { // Se escolheu "Não"
            this.currentCondicionalLine = 1; // Começa na primeira fala condicional
            this.dialogText.setText(this.perguntaCondicional[this.currentCondicionalLine]); // Exibe a primeira fala
        } else { // Se escolheu "Sim"
            this.currentCondicionalLine = -1; // Evita o loop de diálogo condicional
            this.dialogText.setText(this.perguntaCondicional[0]); // Mostra apenas a fala de índice 0
            this.simSelecionado = true; // Marca que "Sim" foi escolhido
            this.exibirImagem = false; // A imagem ainda não aparece, precisa de ENTER primeiro
        }
    }
    
    nextDialog() {
        if (this.currentLine === 0 && this.nome.value.trim() === "") {
            return; // Se o nome não foi preenchido, não avança
        }
    
        if (this.currentLine === 0) {
            playerName = this.nome.value.trim();
            this.nome.style.display = 'none';
        }
    
        if (this.currentLine === 2 && !this.opcaoSelecionada) {
            return; // Se nenhuma opção foi selecionada, não avança
        }
    
        // **Novo fluxo para "Sim"**: Primeiro ENTER exibe a imagem, segundo ENTER muda de cena
        if (this.simSelecionado) {
            if (!this.exibirImagem) {
                this.dialogText.setText(this.finalizacao[0]); // Exibe fala final antes da troca de cena
                this.sobreposicao.setAlpha(1); // Exibe a imagem sobreposta
                this.exibirImagem = true; // Marca que a imagem foi exibida
                return;
            }
            this.scene.start('officeScene'); // Segundo ENTER leva para a próxima cena
            return;
        }
    
        // Se o jogador escolheu "Não" e ainda há falas na lista condicional
        if (this.opcaoSelecionada && this.currentCondicionalLine >= 0 && this.currentCondicionalLine < this.perguntaCondicional.length - 1) {
            this.currentCondicionalLine++;
            this.dialogText.setText(this.perguntaCondicional[this.currentCondicionalLine]);
            return;
        }
    
        // Se a última fala condicional foi exibida, mostra a imagem sobreposta
        if (this.opcaoSelecionada && this.currentCondicionalLine === this.perguntaCondicional.length - 1) {
            this.dialogText.setText(this.finalizacao[0]);
            this.sobreposicao.setAlpha(1); // Exibe a imagem
            this.exibirImagem = true;
            this.currentCondicionalLine++; // Permite avanço após a imagem
            return;
        }
    
        // Se a imagem já foi mostrada e ENTER for pressionado novamente, troca de cena
        if (this.exibirImagem && this.sobreposicao.alpha === 1) {
            this.scene.start('officeScene');
            return;
        }
    
        // Avança o diálogo normal
        this.currentLine++;
        if (this.currentLine < this.introducao.length) {
            this.showDialog();
        }
    }
    
    
    
    
}
