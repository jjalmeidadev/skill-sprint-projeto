class TutorialScene extends Phaser.Scene {
    constructor() {
        super({ key: 'tutorialScene' });

        //Lista de falas do vivinho(tutorial)
        this.introduction = [
            "Olá! Qual é o seu nome?",
            "Vivinho: Olá, " + playerName + "! Bem-vindo à Vivo! Somos a maior empresa de telecomunicações do Brasil! Parabéns por fazer parte do nosso time!",
            "Vivinho: Eu tenho uma importante missão: apresentar para você o plano de carreira interno da Vivo. Me diga, você conhece o plano de carreira da Vivo?"
        ];

        //Lista das falas condicionais baseadas na resposta do jogador
        this.conditionalDialog = [
            "Vivinho: UAU! Que bom que você já sabe. Agora, quero te explicar uma coisa muito importante na sua jornada a partir de agora, o termo JOB ROTATION.",
            "Vivinho: Na Vivo, o termo JOB ROTATION se refere a uma estratégia de desenvolvimento profissional em que as pessoas estagiarias têm a oportunidade de atuar temporariamente em diferentes áreas da empresa.",
            "Vivinho: O principal objetivo desse programa é ampliar a visão sistêmica do negócio, desenvolver novas habilidades e preparar os funcionários para se tornarem futuros gestores e líderes.",
            "Vivinho: Por isso, irei te guiar para ser um líder na Vivo!"
        ];

        //Lista de falas finais do tutorial
        this.finalDialog = [
            "Vivinho: Observe esse esquema. Note que um novo talento pode evoluir para diversos cargos e realizar o job rotation na Vivo. Vamos mergulhar nisso nos próximos níveis!",
            "Vivinho: Além disso, a Vivo usa a plataforma Gupy para gerenciar seus processos seletivos, permitindo que candidatos cadastrem currículos, participem de testes e acompanhem o andamento das vagas."
        ];

        this.currentFinalIndex = 0; //Controla a fala atual das falas finais
        this.currentDialogIndex = 0; //Controla a fala atual do tutorial
        this.optionSelected = false; //Controla se o jogador escolheu uma opção
        this.overlayVisible = false; //Controla se a imagem de sobreposição foi exibida
    }

    preload() {
        //Carrega as imagens e sons necessários para a cena
        this.load.image('vivinho', '../assets/vivinho.png');
        this.load.image('buttonYes', '../assets/botao_sim.png');
        this.load.image('buttonNo', '../assets/botao_nao.png');
        this.load.image('jobRotation', '../assets/planoCarreira.png');
        this.load.font('defaultFont', 'fonts/PixelifySans-VariableFont_wght.ttf');

        this.load.tilemapTiledJSON('escritorio', '../assets/mapaOffice/mapaOffice.json');
        this.load.image('decoracao', '../assets/mapaOffice/decoracao.png');
        this.load.image('paredes', '../assets/mapaOffice/paredes.png');
        this.load.image('personalizado_vivo', '../assets/mapaOffice/personalizado_vivo.png');

        this.load.audio('keySound', '../assets/sounds/computer-keyboard-typing-290582 (mp3cut.net).mp3');
        this.load.audio('buttonSound', '../assets/sounds/687107__aphom000__mouse-2-button-fast-click.wav');

        this.load.image('keyENTER', '../assets/keyEnter.png');  
    }

    create() {
        //Transição de entrada
        this.cameras.main.fadeIn(1000, 0, 0, 0);

        //Cria mapa do tiled
        const map = this.make.tilemap({ key: "escritorio", tileWidth: 25, tileHeight: 20 });
        const tileset1 = map.addTilesetImage("decoracao");
        const tileset2 = map.addTilesetImage("paredes");
        const tileset3 = map.addTilesetImage("personalizado_vivo");

        //Cria as camadas do mapa
        const offsetX = width - 1270;
        const layer1 = map.createLayer("chao", tileset2, offsetX, 0).setScale(2.5);
        const layer2 = map.createLayer("chaoLider", tileset1, offsetX, 0).setScale(2.5);
        const layer3 = map.createLayer("parede", tileset2, offsetX, 0).setScale(2.5);
        const layer4 = map.createLayer("tapete", tileset3, offsetX, 0).setScale(2.5);
        const layer5 = map.createLayer("tapeteLider", tileset1, offsetX, 0).setScale(2.5);
        const layer6 = map.createLayer("acabamento", tileset2, offsetX, 0).setScale(2.5);
        const layer7 = map.createLayer("cadeira", tileset1, offsetX, 0).setScale(2.5);
        const layer8 = map.createLayer("cadeiraTras", tileset1, offsetX, 0).setScale(2.5);
        const layer9 = map.createLayer("quadro", tileset1, offsetX, 0).setScale(2.5);
        const layer10 = map.createLayer("sofa", tileset1, offsetX, 0).setScale(2.5);
        const layer11 = map.createLayer("planta", tileset1, offsetX, 0).setScale(2.5);
        const layer12 = map.createLayer("porta", tileset1, offsetX, 0).setScale(2.5);
        const layer13 = map.createLayer("decoracao", tileset1, offsetX, 0).setScale(2.5);

        //Deixa o collider criado no tiled ativo
        layer1.setCollisionByProperty({ collider: true });
        layer2.setCollisionByProperty({ collider: true });
        layer3.setCollisionByProperty({ collider: true });
        layer4.setCollisionByProperty({ collider: true });
        layer5.setCollisionByProperty({ collider: true });
        layer6.setCollisionByProperty({ collider: true });
        layer7.setCollisionByProperty({ collider: true });
        layer8.setCollisionByProperty({ collider: true });
        layer9.setCollisionByProperty({ collider: true });
        layer10.setCollisionByProperty({ collider: true });
        layer11.setCollisionByProperty({ collider: true });
        layer12.setCollisionByProperty({ collider: true });
        layer13.setCollisionByProperty({ collider: true });

        //Cria a caixa de dialogo e exibe a primeira fala
        this.createDialogBox();
        this.showDialog();

        //Cria imagem sobreposta, mas deixa invisível
        this.overlayImage = this.add.image(width / 2, height / 2 - 100, 'jobRotation');
        this.overlayImage.setOrigin(0.5);
        this.overlayImage.setScale(0.5);
        this.overlayImage.setAlpha(0);

        //Adicionando um retângulo arredondado para o input de texto
        this.inputBackground = this.add.graphics();
        this.inputBackground.fillStyle(0xffffff);
        this.inputBackground.fillRoundedRect(width - 1000, height - 130, 500, 50, 10);
        this.inputBackground.lineStyle(2, 0xffff00, 1);
        this.inputBackground.strokeRoundedRect(width - 1000, height - 130, 500, 50, 10);

        //Placeholder do input de texto
        const placeholderText = this.add.text(width - 990, height - 130, 'Digite seu nome aqui...', { font: '25px defaultFont', fill: '#000000' });

        //Adicionando o texto digitado
        this.textEntry = this.add.text(width - 990, height - 130, '', { font: '25px defaultFont', fill: '#000000' });

        //Evento de teclado para o input de texto
        this.input.keyboard.on('keydown', event => {
            if (event.keyCode === 8 && this.textEntry.text.length > 0) {
                this.textEntry.text = this.textEntry.text.substr(0, this.textEntry.text.length - 1);
            }
            else if (event.keyCode === 32 || (event.keyCode >= 48 && event.keyCode <= 90)) {
                this.textEntry.text += event.key;
            }

            //Remover o placeholder quando o jogador começar a digitar
            if (this.textEntry.text.length > 0) {
                placeholderText.setVisible(false);
            } else {
                placeholderText.setVisible(true);
            }

            if (this.textEntry.text.length > 0) {
                placeholderText.setVisible(false);
                this.keyEnterIcon.setVisible(true); // Mostra a tecla ENTER
            } else {
                placeholderText.setVisible(true);
                this.keyEnterIcon.setVisible(false); // Esconde novamente
            }
        });

        //Adiciona interação com o botão ENTER para avançar o diálogo	
        this.input.keyboard.on('keydown-ENTER', () => {
            this.nextDialog();
            this.buttonClick = this.sound.add('keySound', { loop: false, volume: 10 });
            this.buttonClick.play();
        });

        this.keyEnterIcon.setVisible(false);
    }

    createDialogBox() {
        const dialogWidth = width / 2;
        const dialogHeight = height / 5;
        const x = this.cameras.main.width / 2 - dialogWidth / 2;
        const y = this.cameras.main.height - dialogHeight - 50;

        //Cria o fundo da caixa de diálogo
        this.dialogBox = this.add.graphics();
        this.dialogBox.fillStyle(0xff9e0d, 1);
        this.dialogBox.fillRoundedRect(x, y, dialogWidth, dialogHeight, 10);

        //Adiciona a imagem do personagem 
        this.characterSprite = this.add.image(x + 80, y + 40, 'vivinho').setScale(0.5);

        //Cria o texto da caixa de diálogo
        this.dialogText = this.add.text(x + 150, y + 30, '', {
            fontSize: '20px',
            color: '#000000',
            fontFamily: 'defaultFont',
            wordWrap: { width: 600 }
        });

        // Adiciona a tecla ENTER no canto inferior direito da caixa de diálogo
        this.keyEnterIcon = this.add.image(x + dialogWidth - 40, y + dialogHeight - 33, 'keyENTER');
        this.keyEnterIcon.setScale(0.12).setDepth(1000);
    }

    showDialog() {
        const x = width / 2 - 100;
        const y = height / 1.2;
    
        if (this.currentDialogIndex === 1 && playerName) {
            this.dialogText.setText(`Prazer em te conhecer, ${playerName}! Eu sou o Vivinho!`);
        } else if (this.currentDialogIndex === 2) {
            this.dialogText.setText(this.introduction[this.currentDialogIndex]);
            this.createChoiceButtons();
            this.optionSelected = false;
    
            // Esconde a tecla ENTER quando aparecem os botões SIM/NÃO
            if (this.keyEnterIcon) {
                this.keyEnterIcon.setVisible(false);
            }
        } else {
            this.dialogText.setText(this.introduction[this.currentDialogIndex]);
        }
    }

    createChoiceButtons() {
        if (this.buttonYes || this.buttonNo) return;

        //Define a posição dos botões
        const x = width / 2 - 100;
        const y = height - 200;

        //Cria o botão SIM e NÃO
        this.buttonYes = this.add.image(x, y + 125, 'buttonYes').setScale(0.6).setInteractive();
        this.buttonNo = this.add.image(x + 200, y + 125, 'buttonNo').setScale(0.65).setInteractive();

        //Define ação ao clicar nos botões
        this.buttonYes.on('pointerdown', () => {
            this.buttonClick = this.sound.add('buttonSound', { loop: false, volume: 10 });
            this.buttonClick.play();
            this.chooseOption(0)
        });

        this.buttonNo.on('pointerdown', () => {
            this.buttonClick = this.sound.add('buttonSound', { loop: false, volume: 10 });
            this.buttonClick.play();
            this.chooseOption(1)
        });
    }

    chooseOption(optionIndex) {
        //Destroi os botões de escolha
        if (this.buttonYes) this.buttonYes.destroy();
        if (this.buttonNo) this.buttonNo.destroy();

        this.buttonYes = null;
        this.buttonNo = null;

        this.optionSelected = true; //Indica que o jogador escolheu uma opção

        if (optionIndex === 1) { //Se o jogador escolheu NÃO
            this.currentConditionalIndex = 1; //Começa a exibir as falas condicionais
            this.dialogText.setText(this.conditionalDialog[this.currentConditionalIndex]);
        } else { //Se o jogador escolheu SIM
            this.currentConditionalIndex = -1; //Evita o loop de exibição das falas condicionais
            this.dialogText.setText(this.conditionalDialog[0]);
            this.yesSelected = true; //Marca que o jogador escolheu SIM
            this.overlayVisible = false; //Esconde a imagem de sobreposição
        }
    }

    nextDialog() {
        if (this.currentDialogIndex === 0 && this.textEntry.text.trim() === "") {
            return; // Se o nome não foi preenchido, não avança
        }
    
        if (this.currentDialogIndex === 0) {
            playerName = this.textEntry.text.trim();
            this.textEntry.setVisible(false);
            this.inputBackground.setVisible(false);
            this.keyEnterIcon.setVisible(false);
        }
    
        if (this.currentDialogIndex === 2 && !this.optionSelected) {
            return; // Se o jogador não escolheu uma opção, não avança
        }
    
        // Novo fluxo para "Sim"
        if (this.yesSelected) {
            if (!this.overlayVisible) {
                this.dialogText.setText(this.finalDialog[0]);
                this.overlayImage.setAlpha(1);
                this.overlayVisible = true;
                return;
            }
            if (this.currentFinalIndex < this.finalDialog.length - 1) {
                this.currentFinalIndex++;
                this.dialogText.setText(this.finalDialog[this.currentFinalIndex]);
                return;
            }
            this.scene.start('officeScene');
            return;
        }
    
        // Fluxo para "Não"
        if (this.optionSelected && this.currentConditionalIndex >= 0 && this.currentConditionalIndex < this.conditionalDialog.length - 1) {
            this.currentConditionalIndex++;
            this.dialogText.setText(this.conditionalDialog[this.currentConditionalIndex]);
            return;
        }
    
        if (this.optionSelected && this.currentConditionalIndex === this.conditionalDialog.length - 1) {
            this.dialogText.setText(this.finalDialog[0]);
            this.overlayImage.setAlpha(1);
            this.overlayVisible = true;
            this.currentConditionalIndex++;
            return;
        }
    
        if (this.overlayVisible && this.overlayImage.alpha === 1) {
            if (this.currentFinalIndex < this.finalDialog.length - 1) {
                this.currentFinalIndex++;
                this.dialogText.setText(this.finalDialog[this.currentFinalIndex]);
                return;
            }
            this.scene.start('officeScene2');
            return;
        }
    
        // Avança o diálogo normalmente
        this.currentDialogIndex++;
        if (this.currentDialogIndex < this.introduction.length) {
    
            // Aqui está o ponto certo para esconder o ENTER na fala 2
            if (this.currentDialogIndex === 2 && this.keyEnterIcon) {
                this.keyEnterIcon.setVisible(false);
            }
    
            this.showDialog();
        }
    }
}