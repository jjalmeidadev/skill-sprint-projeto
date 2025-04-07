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
            "Vivinho: UAU! Que bom que você já sabe.",
            "Vivinho: O plano de carreira da Vivo visa desenvolver talentos e promover crescimento profissional.",
            "Vivinho: O principal objetivo do plano de carreira da Vivo é desenvolver e reter talentos, proporcionando crescimento profissional por meio de capacitação, mobilidade interna e participação em projetos estratégicos.",
            "Vivinho: A empresa busca formar líderes e especialistas alinhados aos seus valores e desafios do setor.",
            "Vivinho: Por isso, irei te guiar para se desenvolver na Vivo!"
        ];

        //Lista de falas finais do tutorial
        this.finalDialog = [
            "Vivinho: Observe esse esquema. Note que um novo talento pode evoluir para diversos cargos na Vivo. Vamos mergulhar nisso nos próximos níveis!",
            "Vivinho: Além disso, a Vivo usa a plataforma Gupy para gerenciar seus processos seletivos, permitindo que candidatos cadastrem currículos, participem de testes e acompanhem o andamento das vagas."
        ];

        this.currentFinalIndex = 0; //Controla a fala atual das falas finais
        this.currentDialogIndex = 0; //Controla a fala atual do tutorial
        this.optionSelected = false; //Controla se o jogador escolheu uma opção
        this.overlayVisible = false; //Controla se a imagem de sobreposição foi exibida
    }

    init(data) {
        this.selectedSpriteSheet = data.selectedSpriteSheet;
        console.log('Selected Sprite Sheet:', this.selectedSpriteSheet);
    }

    preload() {
        this.load.image('vivinho', '../assets/vivinho.png'); // Carrega a imagem do personagem Vivinho
        this.load.image('buttonYes', '../assets/botao_sim.png'); // Carrega a imagem do botão "Sim"
        this.load.image('buttonNo', '../assets/botao_nao.png'); // Carrega a imagem do botão "Não"
        this.load.image('jobRotation', '../assets/planoCarreira.png'); // Carrega a imagem do plano de carreira (Job Rotation)
        this.load.font('font', 'fonts/PixelifySans-VariableFont_wght.ttf'); // Carrega a fonte personalizada para o texto

        this.load.tilemapTiledJSON('escritorio', '../assets/mapaOffice/mapaOffice.json'); // Carrega o mapa do escritório em formato JSON
        this.load.image('decoracao', '../assets/mapaOffice/decoracao.png'); // Carrega a imagem de decoração do mapa
        this.load.image('paredes', '../assets/mapaOffice/paredes.png'); // Carrega a imagem das paredes do mapa
        this.load.image('personalizado_vivo', '../assets/mapaOffice/personalizado_vivo.png'); // Carrega a imagem personalizada da Vivo para o mapa

        this.load.audio('keySound', '../assets/sounds/computer-keyboard-typing-290582 (mp3cut.net).mp3'); // Carrega o som de digitação no teclado
        this.load.audio('buttonSound', '../assets/sounds/687107__aphom000__mouse-2-button-fast-click.wav'); // Carrega o som de clique do botão

        this.load.image('keyENTERPurple', '../assets/keyEnterPurple.png'); // Carrega a imagem da tecla ENTER
    }

    create() {
        this.cameras.main.fadeIn(1000, 0, 0, 0); //Transição de entrada

        const map = this.make.tilemap({ key: "escritorio", tileWidth: 25, tileHeight: 20 }); // Cria o mapa do escritório com base no arquivo JSON
        const tileset1 = map.addTilesetImage("decoracao"); // Adiciona o tileset de decoração
        const tileset2 = map.addTilesetImage("paredes"); // Adiciona o tileset de paredes
        const tileset3 = map.addTilesetImage("personalizado_vivo"); // Adiciona o tileset personalizado da Vivo

        const offsetX = width - 1270; // Define a posição do x para as camadas
        const layer1 = map.createLayer("chao", tileset2, offsetX, 0).setScale(2.5); // Cria a camada de chão
        const layer2 = map.createLayer("chaoLider", tileset1, offsetX, 0).setScale(2.5); // Cria a camada de chão do líder
        const layer3 = map.createLayer("parede", tileset2, offsetX, 0).setScale(2.5); // Cria a camada de paredes
        const layer4 = map.createLayer("tapete", tileset3, offsetX, 0).setScale(2.5); // Cria a camada de tapete
        const layer5 = map.createLayer("tapeteLider", tileset1, offsetX, 0).setScale(2.5); // Cria a camada de tapete do líder
        const layer6 = map.createLayer("acabamento", tileset2, offsetX, 0).setScale(2.5); // Cria a camada de acabamento
        const layer7 = map.createLayer("cadeira", tileset1, offsetX, 0).setScale(2.5); // Cria a camada de cadeiras
        const layer8 = map.createLayer("cadeiraTras", tileset1, offsetX, 0).setScale(2.5); // Cria a camada de cadeiras traseiras
        const layer9 = map.createLayer("quadro", tileset1, offsetX, 0).setScale(2.5); // Cria a camada de quadros
        const layer10 = map.createLayer("sofa", tileset1, offsetX, 0).setScale(2.5); // Cria a camada de sofás
        const layer11 = map.createLayer("planta", tileset1, offsetX, 0).setScale(2.5); // Cria a camada de plantas
        const layer12 = map.createLayer("porta", tileset1, offsetX, 0).setScale(2.5); // Cria a camada de portas
        const layer13 = map.createLayer("decoracao", tileset1, offsetX, 0).setScale(2.5); // Cria a camada de decoração

        layer1.setCollisionByProperty({ collider: true }); // Ativa colisão para a camada de chão
        layer2.setCollisionByProperty({ collider: true }); // Ativa colisão para a camada de chão do líder
        layer3.setCollisionByProperty({ collider: true }); // Ativa colisão para a camada de paredes
        layer4.setCollisionByProperty({ collider: true }); // Ativa colisão para a camada de tapete
        layer5.setCollisionByProperty({ collider: true }); // Ativa colisão para a camada de tapete do líder
        layer6.setCollisionByProperty({ collider: true }); // Ativa colisão para a camada de acabamento
        layer7.setCollisionByProperty({ collider: true }); // Ativa colisão para a camada de cadeiras
        layer8.setCollisionByProperty({ collider: true }); // Ativa colisão para a camada de cadeiras traseiras
        layer9.setCollisionByProperty({ collider: true }); // Ativa colisão para a camada de quadros
        layer10.setCollisionByProperty({ collider: true }); // Ativa colisão para a camada de sofás
        layer11.setCollisionByProperty({ collider: true }); // Ativa colisão para a camada de plantas
        layer12.setCollisionByProperty({ collider: true }); // Ativa colisão para a camada de portas
        layer13.setCollisionByProperty({ collider: true }); // Ativa colisão para a camada de decoração

        this.createDialogBox(); // Cria a caixa de diálogo
        this.showDialog(); // Exibe a primeira fala do diálogo

        this.overlayImage = this.add.image(width / 2, height / 2 - 100, 'jobRotation'); // Adiciona a imagem de sobreposição
        this.overlayImage.setOrigin(0.5); // Centraliza a origem da imagem
        this.overlayImage.setScale(0.5); // Redimensiona a imagem
        this.overlayImage.setAlpha(0); // Torna a imagem invisível inicialmente

        this.inputBackground = this.add.graphics(); // Cria um gráfico para o fundo do input
        this.inputBackground.fillStyle(0xffffff); // Define a cor de preenchimento como branco
        this.inputBackground.fillRoundedRect(width - 1000, height - 130, 500, 50, 10); // Desenha um retângulo arredondado
        this.inputBackground.lineStyle(2, 0xffff00, 1); // Define a borda do retângulo como amarela
        this.inputBackground.strokeRoundedRect(width - 1000, height - 130, 500, 50, 10); // Desenha a borda do retângulo arredondado

        const placeholderText = this.add.text(width - 990, height - 130, 'Digite seu nome aqui...', { font: '25px font', fill: '#000000' }); // Adiciona um texto de placeholder para o input

        this.textEntry = this.add.text(width - 990, height - 130, '', { font: '25px font', fill: '#000000' }); // Adiciona o texto que será digitado pelo jogador

        this.input.keyboard.on('keydown', event => { // Adiciona um evento para capturar as teclas pressionadas
            if (event.keyCode === 8 && this.textEntry.text.length > 0) { // Verifica se a tecla Backspace foi pressionada
                this.textEntry.text = this.textEntry.text.substr(0, this.textEntry.text.length - 1); // Remove o último caractere do texto
            }
            else if (event.keyCode === 32 || (event.keyCode >= 48 && event.keyCode <= 90)) { // Verifica se a tecla pressionada é um caractere válido
                this.textEntry.text += event.key; // Adiciona o caractere ao texto
            }

            //Remover o placeholder quando o jogador começar a digitar
            if (this.textEntry.text.length > 0) { // Verifica se o texto não está vazio
                placeholderText.setVisible(false); // Esconde o texto de placeholder
            } else {
                placeholderText.setVisible(true); // Mostra o texto de placeholder
            }

            if (this.textEntry.text.length > 0) {
                placeholderText.setVisible(false);
                if (this.currentDialogIndex !== 2) {
                    this.keyEnterIcon.setVisible(true);
                } else {
                    this.keyEnterIcon.setVisible(false); // Garante que ela continue oculta na fala 2
                }
            } else {
                placeholderText.setVisible(true);
                this.keyEnterIcon.setVisible(false);
            }
        });

        this.input.keyboard.on('keydown-ENTER', () => { // Adiciona um evento para capturar a tecla ENTER
            this.nextDialog(); // Avança para o próximo diálogo
            this.buttonClick = this.sound.add('keySound', { loop: false, volume: 10 }); // Adiciona o som de clique da tecla
            this.buttonClick.play(); // Reproduz o som de clique
        });

        this.keyEnterIcon.setVisible(false); // Esconde a tecla ENTER inicialmente
    }

    createDialogBox() {
        const dialogWidth = width / 2; // Define a largura da caixa de diálogo como metade da largura da tela
        const dialogHeight = height / 5; // Define a altura da caixa de diálogo como um quinto da altura da tela
        const x = this.cameras.main.width / 2 - dialogWidth / 2; // Calcula a posição X centralizada para a caixa de diálogo
        const y = this.cameras.main.height - dialogHeight - 50; // Calcula a posição Y para posicionar a caixa de diálogo na parte inferior da tela

        this.dialogBox = this.add.graphics(); // Adiciona um gráfico para desenhar a caixa de diálogo
        this.dialogBox.fillStyle(0xff9e0d, 1); // Define a cor de preenchimento da caixa de diálogo como laranja
        this.dialogBox.fillRoundedRect(x, y, dialogWidth, dialogHeight, 10); // Desenha um retângulo arredondado para a caixa de diálogo

        this.characterSprite = this.add.image(x + 80, y + 40, 'vivinho').setScale(0.5); // Adiciona a imagem do personagem Vivinho na caixa de diálogo

        this.dialogText = this.add.text(x + 150, y + 30, '', { // Adiciona um texto vazio na caixa de diálogo
            fontSize: '20px', // Define o tamanho da fonte do texto
            color: '#000000', // Define a cor do texto como preto
            fontFamily: 'font', // Define a fonte personalizada
            wordWrap: { width: 600 } // Define a largura máxima para quebra automática de linha
        });

        this.keyEnterIcon = this.add.image(x + dialogWidth - 40, y + dialogHeight - 33, 'keyENTERPurple'); // Adiciona a imagem da tecla ENTER
        this.keyEnterIcon.setScale(0.12).setDepth(1000); // Redimensiona a tecla ENTER e define sua profundidade para estar acima de outros elementos
    }

    showDialog() {
        const x = width / 2 - 100; // Define a posição X para centralizar o texto
        const y = height / 1.2; // Define a posição Y para posicionar o texto na parte inferior da tela
    
        if (this.currentDialogIndex === 1 && playerName) { // Verifica se está na segunda fala e se o nome do jogador foi definido
            this.dialogText.setText(`Prazer em te conhecer, ${playerName}! Eu sou o Vivinho!`); // Exibe uma mensagem personalizada com o nome do jogador
        } else if (this.currentDialogIndex === 2) { // Verifica se está na terceira fala
            this.dialogText.setText(this.introduction[this.currentDialogIndex]); // Exibe a fala correspondente da introdução
            this.createChoiceButtons(); // Cria os botões de escolha (SIM/NÃO)
            this.optionSelected = false; // Reseta o estado de seleção de opção
    
            if (this.keyEnterIcon) { // Verifica se a tecla ENTER foi criada
                this.keyEnterIcon.setVisible(false); // Esconde a tecla ENTER
            }
        } else {
            this.dialogText.setText(this.introduction[this.currentDialogIndex]); // Exibe a fala correspondente da introdução

            if (this.keyEnterIcon && this.currentDialogIndex !== 2) {
                this.keyEnterIcon.setVisible(true);
            }
        }
    }

    createChoiceButtons() {
        if (this.buttonYes || this.buttonNo) return; // Se os botões já existem, não cria novamente

        const x = width / 2 - 100; // Calcula a posição X para centralizar os botões
        const y = height - 200; // Calcula a posição Y para posicionar os botões na parte inferior da tela

        this.buttonYes = this.add.image(x, y + 125, 'buttonYes').setScale(0.6).setInteractive(); // Adiciona o botão "Sim" e o torna interativo
        this.buttonNo = this.add.image(x + 200, y + 125, 'buttonNo').setScale(0.65).setInteractive(); // Adiciona o botão "Não" e o torna interativo

        this.buttonYes.on('pointerdown', () => { // Adiciona um evento de clique ao botão "Sim"
            this.buttonClick = this.sound.add('buttonSound', { loop: false, volume: 10 }); // Adiciona o som de clique
            this.buttonClick.play(); // Reproduz o som de clique
            this.chooseOption(0); // Chama a função para processar a escolha "Sim"
        });

        this.buttonNo.on('pointerdown', () => { // Adiciona um evento de clique ao botão "Não"
            this.buttonClick = this.sound.add('buttonSound', { loop: false, volume: 10 }); // Adiciona o som de clique
            this.buttonClick.play(); // Reproduz o som de clique
            this.chooseOption(1); // Chama a função para processar a escolha "Não"
        });
    }

    chooseOption(optionIndex) {
        if (this.buttonYes) this.buttonYes.destroy(); // Remove o botão "Sim" da tela
        if (this.buttonNo) this.buttonNo.destroy(); // Remove o botão "Não" da tela

        this.buttonYes = null; // Reseta a referência do botão "Sim"
        this.buttonNo = null; // Reseta a referência do botão "Não"

        this.optionSelected = true; // Indica que o jogador escolheu uma opção

        if (optionIndex === 1) { // Se o jogador escolheu "Não"
            this.currentConditionalIndex = 1; // Começa a exibir as falas condicionais a partir do índice 1
            this.dialogText.setText(this.conditionalDialog[this.currentConditionalIndex]); // Atualiza o texto do diálogo com a fala condicional
            if (this.keyEnterIcon) this.keyEnterIcon.setVisible(true);
        } else { // Se o jogador escolheu "Sim"
            this.currentConditionalIndex = -1; // Evita o loop de exibição das falas condicionais
            this.dialogText.setText(this.conditionalDialog[0]); // Atualiza o texto do diálogo com a primeira fala condicional
            if (this.keyEnterIcon) this.keyEnterIcon.setVisible(true);
            this.yesSelected = true; // Marca que o jogador escolheu "Sim"
            this.overlayVisible = false; // Esconde a imagem de sobreposição
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
            return;
        }
    
        // Diálogo da opção "Sim"
        if (this.yesSelected) {
            if (!this.overlayVisible) {
                this.dialogText.setText(this.finalDialog[0]);
                this.overlayImage.setAlpha(1);
                this.overlayVisible = true;
                if (this.keyEnterIcon) this.keyEnterIcon.setVisible(true);
                this.currentDialogIndex = 99;
                return;
            }
            if (this.currentFinalIndex < this.finalDialog.length - 1) {
                this.currentFinalIndex++;
                this.dialogText.setText(this.finalDialog[this.currentFinalIndex]);
                if (this.keyEnterIcon) this.keyEnterIcon.setVisible(true);
                this.currentDialogIndex = 99;
                return;
            }
            this.scene.start('officeScene', {selectedSpriteSheet: this.selectedSpriteSheet}); // Vai para a mesma cena para ambos
            return;
        }
    
        // Diálogo da opção "Não"
        if (this.optionSelected && this.currentConditionalIndex >= 0 && this.currentConditionalIndex < this.conditionalDialog.length - 1) {
            this.currentConditionalIndex++;
            this.dialogText.setText(this.conditionalDialog[this.currentConditionalIndex]);

            this.currentDialogIndex = 99;
            if (this.keyEnterIcon) this.keyEnterIcon.setVisible(true);
            return;
        }
    
        // Final do diálogo "Não", transição para o finalDialog
        if (this.optionSelected && this.currentConditionalIndex === this.conditionalDialog.length - 1) {
            this.dialogText.setText(this.finalDialog[0]);
            this.overlayImage.setAlpha(1);
            this.overlayVisible = true;
            if (this.keyEnterIcon) this.keyEnterIcon.setVisible(true);
            this.currentDialogIndex = 99;
            this.currentConditionalIndex++; // Marca que entrou nessa fase
            return;
        }
    
        // Exibe falas finais depois da tela de job rotation
        if (this.overlayVisible && this.overlayImage.alpha === 1) {
            if (this.currentFinalIndex < this.finalDialog.length - 1) {
                this.currentFinalIndex++;
                this.dialogText.setText(this.finalDialog[this.currentFinalIndex]);
                if (this.keyEnterIcon) this.keyEnterIcon.setVisible(true); 
                return;
            }
            this.scene.start('officeScene', {selectedSpriteSheet: this.selectedSpriteSheet,}); // Unificado para ir sempre para officeScene
            return;
        }
    
        this.currentDialogIndex++;
        if (this.currentDialogIndex < this.introduction.length) {
            if (this.currentDialogIndex === 2 && this.keyEnterIcon) {
                this.keyEnterIcon.setVisible(false);
            } else if (this.keyEnterIcon) {
                this.keyEnterIcon.setVisible(true);
            }
            this.showDialog();
        }
    }
}
