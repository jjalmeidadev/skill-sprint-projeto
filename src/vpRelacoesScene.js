class VpRelacoesScene extends Phaser.Scene {
  constructor() {
    super({ key: "VpRelacoesScene" });
    // Variáveis de controle do jogo
    this.canMove = true;
    this.enterShown = false;
    this.dialogActive = false;
    this.dialogReady = false;
    this.inputActive = false;
    this.elevatorIndicator = null;
    this.elevatorProximity = null;
    this.hasReset = false;
    this.enterPressText = null;
    this.currentSpeaker = null;
    this.finalDialogPlayed = false;
    this.onNext = null;
    this.musicarelainst = null;
    this.currentStep = 0;
    this.enterDialogIcon = null;
    
    // Configuração das etapas de diálogo e palavras-chave
    this.keywordSteps = [
      {
        vp: 'VP de Relações',
        prompt: 'EMPATIA',
        success: 'Uma escolha certamente relevante para nosso cotidiano. Foi um valor que, de acordo com seu colega, foi aplicado diretamente por você quando o ajudou à aliviar seu nervosismo. Parabéns!',
        next: 'E vocês gente?',
        keyword: 'EMPATIA',
        head: 'vprelacoescab'
      },
      {
        vp: 'VP de Negócios',
        prompt: 'CURIOSIDADE',
        success: 'Certeiro! Carregar consigo um desejo de explorar novas possibilidades e materiais é essencial para seu desenvolvimento a longo prazo, ação que você praticou na coleta de chips!',
        next: 'Não há duas sem três, né?',
        keyword: 'CURIOSIDADE',
        head: 'vpnegociocab'
      },
      {
        vp: 'VP de Estratégia',
        prompt: 'COLABORAÇÃO',
        success: 'Exato! O que mais poderia elevar seu repertório a não ser ajudar outros colaboradores em suas tarefas? Atitude tomada com primor por sua parte.',
        next: 'Não se esqueça dela!',
        keyword: 'COLABORAÇÃO',
        head: 'vpestrategiacab'
      },
      {
        vp: 'VP de Tecnologia',
        prompt: 'PRODUTIVIDADE',
        success: 'Mas é claro! Ter disposição para lidar com prazos de maneira eficiente, buscando sempre a inovação e qualidade na funcionalidade dos produtos é indispensável, e nem preciso dizer que você demonstrou essa virtude com excelência na resolução de desafios!',
        next: '-Com isso, finalizamos nossa reunião de hoje, e junto do aprendizado que você adquiriu, gostaríamos de expressar nossa gratidão por seus esforços e grande expectativa no que irá construir de agora em diante! Conte conosco para qualquer dúvida durante sua trilha.',
        keyword: 'PRODUTIVIDADE',
        head: 'vptechcab'
      }
    ];
  }

  init(data) {
    // Recebe dados da cena anterior
    this.selectedSpriteSheet = data.selectedSpriteSheet;
    this.playerSelected = data.playerSelected; // Índice do personagem selecionado (1-4)
  }

  preload() {
    // Carrega os vídeos de fundo
    this.load.video("bgbase", "../assets/relainst1.mp4");
    this.load.video("bgman", "../assets/relainsthome.mp4"); // Fundo para personagem masculino
    this.load.video("bgwom", "../assets/relainstmuie.mp4"); // Fundo para personagem feminino

    // Carrega assets do jogo
    this.load.spritesheet("indicator", "../assets/exclamaçãoRoxa.png", { frameWidth: 254, frameHeight: 291 });
    this.load.spritesheet('player', `../assets/personagens/skinsPlayer/players/${this.selectedSpriteSheet}.png`, {frameWidth: 16,frameHeight: 32});
    
    // Carrega imagens e sons
    this.load.image("keyENTER", "../assets/keyEnter.png");
    this.load.image('keyENTERPurple', '../assets/keyEnterPurple.png'); 
    this.load.audio("buttonSound", "../assets/sounds/687107__aphom000__mouse-2-button-fast-click.wav");
    this.load.audio("walkSound", "../assets/sounds/753292__vrymaa__footsteps-high-heels-hardwood-walk-run (mp3cut.net).wav");
    this.load.image('jobRotation', '../assets/planoCarreira.png');
    this.load.font('font', 'fonts/PixelifySans-VariableFont_wght.ttf');
    this.load.audio('keySound', '../assets/sounds/computer-keyboard-typing-290582 (mp3cut.net).mp3');
    this.load.audio('musica', '../assets/sounds/musicarelainst.wav');

    // Carrega cabeças dos VPs
    this.load.image('vppessoascab', '../assets/cabecasrelainst/vppessoascab.png');
    this.load.image('vpnegociocab', '../assets/cabecasrelainst/vpnegociocab.png');
    this.load.image('vpestrategiacab', '../assets/cabecasrelainst/vpestrategiacab.png');
    this.load.image('vptechcab', '../assets/cabecasrelainst/vptechcab.png');
    this.load.image('vprelacoescab', '../assets/cabecasrelainst/vprelacoescab.png');
    this.load.image('levelTitleRelacoes', '../assets/titulos/tituloVpRelacoes.png') // Carrega os asssets do titulo da fase
  }

  create() {
    // Configuração inicial da cena
    this.add.rectangle(width - 2000, height - 2000, width, height, 0x2F052F).setOrigin(0).setScale(5);
    this.cameras.main.fadeIn(1000);
    this.physics.world.setBounds(0, 0, width, height);

    // Configura música de fundo
    if (!this.musicarelainst) {
      this.musicarelainst = this.sound.add("musica", { loop: true, volume: 0.5 });
      this.sound.stopAll();
      this.musicarelainst.play();
    } else if (!this.musicarelainst.isPlaying) {
      this.musicarelainst.play();
    }

    // Cria o personagem do jogador
    this.player = this.physics.add.sprite(width - 150, height / 1.5, "player");
    this.player.setScale(8);
    this.player.setDepth(1);
    this.player.setCollideWorldBounds(true);
    this.player.anims.play("stop_left", true);

    // Configura os fundos de vídeo
    this.bgbase = this.add.video(width / 2, height / 2, "bgbase");
    this.bgbase.setDisplaySize(width / 3, height / 1.5);
    this.bgbase.play(true);

    this.bgwom = this.add.video(width / 2, height / 2, "bgwom");
    this.bgwom.setDisplaySize(width / 3, height / 1.5);
    this.bgwom.play(true);
    this.bgwom.setVisible(false);

    this.bgman = this.add.video(width / 2, height / 2, "bgman");
    this.bgman.setDisplaySize(width / 3, height / 1.5);
    this.bgman.play(true);
    this.bgman.setVisible(false);

    // Configura elementos de interação
    this.keyENTERElevator = this.physics.add.sprite(width - 150, height / 1.5, "keyENTER")
      .setScale(0.2)
      .setImmovable(true)
      .setVisible(false);

    this.walkSound = this.sound.add("walkSound", { loop: false, volume: 2 });

    // Cria animações e barreiras
    this.createPlayerAnimations();
    this.createBarriers();
    this.lastPosition = "left";
    this.awaitingFinalDialogAction = null;
    this.currentFinalIndex = 0;
    this.currentDialogIndex = 0;
    this.optionSelected = false;
    this.overlayVisible = false;

    // Configura controles do teclado
    this.keys = this.input.keyboard.addKeys({
      left: Phaser.Input.Keyboard.KeyCodes.A,
      right: Phaser.Input.Keyboard.KeyCodes.D,
      interagir: Phaser.Input.Keyboard.KeyCodes.E,
      ENTER: Phaser.Input.Keyboard.KeyCodes.ENTER,
    });

    // Listener para tecla ENTER
    this.input.keyboard.on('keydown', (event) => {
      if (event.keyCode === Phaser.Input.Keyboard.KeyCodes.ENTER) {
        this.handleEnterKey();
      }
    });

    // Animação do indicador de exclamação
    if (!this.anims.exists("exclaiming")) {
      this.anims.create({
        key: "exclaiming",
        frames: this.anims.generateFrameNumbers("indicator", { start: 0, end: 1 }),
        frameRate: 3,
        repeat: -1,
      });
    }

    // Configura indicadores visuais
    this.indicatorrela = this.add.sprite(width / 2.0, height / 1.9, "indicator")
      .setScale(0.5)
      .play("exclaiming")
      .setVisible(true);

    this.elevatorIndicator = this.add.sprite(width - 130, height / 1.8, "indicator")
      .setScale(0.5)
      .play("exclaiming")
      .setVisible(false);

    // Configura interação com assento
    this.keyENTERSeat = this.physics.add.sprite(width / 1.7, height / 1.5, "keyENTER")
      .setScale(0.2)
      .setImmovable(true)
      .setVisible(false);
    this.physics.add.collider(this.player, this.keyENTERSeat, this.onEnterCollision, null, this);
    
    // Configura interação com elevador
    this.elevatorProximity = this.physics.add.sprite(width - 100, height / 1.5, "keyENTER")
      .setScale(0.2)
      .setImmovable(true)
      .setVisible(false);
    this.physics.add.overlap(this.player, this.elevatorProximity, this.handleElevatorProximity, null, this);

    // Configura som de botão
    this.buttonClick = this.sound.add("buttonSound", { loop: false, volume: 10 });
    this.buttonClick.play();

    // Configura texto de diálogo
    this.dialogText = this.add.text(100, 100, '', { fontSize: '20px', wordWrap: { width: 600 } });
    this.playerName = playerName;
    this.completedPreviousPhases = true;

    // Configura área de interação
    this.physics.add.overlap(this.player, this.proximityrela, this.handleProximityOverlap, null, this);
  }

  // Manipula pressionamento da tecla ENTER
  handleEnterKey() {
    if (this.inputActive) return;

    if (this.dialogActive) {
      this.nextDialog();
      return;
    }

    if (this.onNext) {
      const next = this.onNext;
      this.onNext = null;
      next();
      return;
    }

    if (this.hasReset && this.physics.overlap(this.player, this.elevatorProximity)) {
      this.handleElevatorProximity();
      return;
    }

    if (this.enterShown && !this.dialogActive && !this.dialogReady) {
      this.startDialog();
    }
  }

  // Inicia o diálogo
  startDialog() {
    this.keyENTERSeat.setVisible(false);
    this.bgbase.setVisible(false);

    this.player.setActive(false).setVisible(false);
    this.keyENTERSeat.setActive(false).setVisible(false).setAlpha(0);
    this.indicatorrela.setActive(false).setVisible(false);

    // Mostra o fundo correto baseado no personagem selecionado
    if (this.selectedSpriteSheet.includes("player2") || this.selectedSpriteSheet.includes("player3")) { // Personagem feminino
      this.bgwom.setVisible(true);
    } else if (this.selectedSpriteSheet.includes("player1") || this.selectedSpriteSheet.includes("player4")) { // Personagem masculino
      this.bgman.setVisible(true);
    } else {
      // Padrão para outros personagens
      this.bgbase.setVisible(true);
    }

    this.dialogReady = true;
    this.createDialogBox();
    this.showDialog();
    this.dialogActive = true;
  }

  // Manipula interação com elevador
  handleElevatorProximity() {
    if (this.hasReset && Phaser.Input.Keyboard.JustDown(this.keys.ENTER)) {
      this.sound.stopAll();
      
      if (this.inputElement) {
        this.inputElement.remove();
        this.inputElement = null;
      }
      
      this.registry.set('vpRelacoesConcluida', true);
      const elevadorScene = this.scene.get("elevadorScene");
      elevadorScene.resumeFromRelations = true;
      this.scene.stop("VpRelacoesScene");
      this.scene.resume("elevadorScene");
    }
  }

  // Reseta o jogador para o estado inicial
  resetPlayerToInitialState() {
    const width = this.scale.width;
    const height = this.scale.height;

    this.lastPosition = "right";
    this.player.setPosition(width - 550, height / 1.5);

    if (this.keyENTERSeat) {
      this.keyENTERSeat.setVisible(false).setActive(false).setAlpha(0);
    }

    if (this.dialogBox) this.dialogBox.setVisible(false);
    if (this.dialogText) this.dialogText.setVisible(false);
    if (this.currentSpeaker) this.currentSpeaker.destroy();
    if (this.keywordLabel) this.keywordLabel.setVisible(false);
    if (this.enterPressText) {
      this.enterPressText.destroy();
      this.enterPressText = null;
    }

    // Restaura o fundo base
    this.bgbase.setVisible(true);
    this.bgwom.setVisible(false);
    this.bgman.setVisible(false);

    this.player.setActive(true).setVisible(true);
    this.indicatorrela.setActive(false).setVisible(false).setPosition(width + 400, height + 400);

    this.elevatorIndicator.setVisible(true);
    this.elevatorProximity.setVisible(false);

    this.dialogActive = false;
    this.dialogReady = false;
    this.inputActive = false;
    this.hasReset = true;

    if (this.musicarelainst && !this.musicarelainst.isPlaying) {
      this.musicarelainst.play();
    }

    if (this.enterDialogIcon) {
      this.enterDialogIcon.setVisible(false);
      this.enterDialogIcon.destroy();
      this.enterDialogIcon = null;
    }
  }

  // Atualiza o estado do jogo a cada frame
  update() {
    const speed = 300;
    let moving = false;

    // Controles de movimento
    if (this.keys.left.isDown) {
      this.player.setVelocityX(-speed);
      this.lastPosition = "left";
      this.player.anims.play("walk_left", true);
      moving = true;
    } else if (this.keys.right.isDown) {
      this.player.setVelocityX(speed);
      this.lastPosition = "right";
      this.player.anims.play("walk_right", true);
      moving = true;
    } else {
      this.player.setVelocityX(0);
    }

    // Animação quando parado
    if (!moving) {
      switch (this.lastPosition) {
        case "left":
          this.player.anims.play("stop_left", true);
          break;
        case "right":
          this.player.anims.play("stop_right", true);
          break;
      }
      this.walkSound.stop();
    } else {
      if (!this.walkSound.isPlaying) {
        this.walkSound.play();
      }
    }

    // Atualiza indicadores de interação
    if (!this.physics.overlap(this.player, this.proximityrela)) {
      this.indicatorrela.setVisible(true);
      this.keyENTERSeat.setVisible(false);
      this.enterShown = false;
    }

    // Atualiza estado do elevador
    if (this.hasReset && this.physics.overlap(this.player, this.elevatorProximity)) {
      if (!this.enterPressText) {
        this.keyENTERElevator.setActive(true).setVisible(true).setAlpha(1);
        this.elevatorIndicator.setVisible(false);
      }
    } else if (this.enterPressText) {
      this.enterPressText.destroy();
      this.enterPressText = null;
    }
  }

  showTitle() {
    const titleImage = this.add.image(width / 2, height / 2, 'levelTitleRelacoes').setDepth(1000); // Adiciona a imagem de parabéns acima do jogador e define sua profundidade para garantir que fique acima de outros elementos
    titleImage.setScale(0.6); // Ajusta o tamanho da imagem de parabéns

    // Remove a imagem de parabéns após 3 segundos
    this.time.delayedCall(3000, () => { // Define um atraso de 3 segundos antes de executar a função
      titleImage.destroy(); // Remove a imagem de parabéns da tela
    });
  }

  // Manipula sobreposição com área de interação
  handleProximityOverlap(player, proximity) {
    this.indicatorrela.setVisible(false);
    this.keyENTERSeat.setVisible(true);
    this.enterShown = true;
  }

  // Retorna os diálogos para a cena atual
  getDialogs() {
    const dialogs = [];

    dialogs.push(`VP de Pessoas: E olha só quem chegou, ${this.playerName}!`);
    dialogs.push("Sinta-se à vontade para participar desse encontro tão esperado! Aposto que a conversa com todos os VPs vai ser demais.");
    dialogs.push("Antes de darmos início à discussão, gostaria que nos dissesse se já realizou as outras fases disponíveis!");

    if (!this.completedPreviousPhases) {
      dialogs.push("Ah, que pena, a conversa pode ser mais construtiva se você conhece-las. Pedimos que explore elas antes de continuarmos aqui. Estaremos te esperando!");
      return dialogs;
    } else {
      dialogs.push("Sim? Que maravilha! Creio que já se sente muito capaz de atuar nos diversos setores da VIVO agora, espero que tenha aproveitado.");
    }

    dialogs.push("O que acha de realizarmos um desafio para testar suas skills recém adquiridas? É simples, você pode nos contar uma palavra chave que descreva a respectiva VP e como esta foi capaz de te impactar em dilemas de desempenho!");

    return dialogs;
  }

  // Mostra o diálogo na tela
  showDialog() {
    this.dialogIndex = 0;
    this.dialogLines = this.getDialogs();
    this.updateSpeaker('vppessoascab');
    this.dialogText.setText(this.dialogLines[this.dialogIndex]);
  }

  // Atualiza o sprite do falante atual
  updateSpeaker(vpHead) {
    if (this.currentSpeaker) {
      this.currentSpeaker.destroy();
    }
    const dialogX = this.cameras.main.width / 2 - (this.cameras.main.width / 2) / 2;
    const dialogY = this.cameras.main.height - (this.cameras.main.height / 5) - 50;
    this.currentSpeaker = this.add.image(dialogX + 80, dialogY + 40, vpHead).setScale(0.5);
  }

  // Avança para o próximo diálogo
  nextDialog() {
    if (this.dialogIndex < this.dialogLines.length - 1) {
      this.dialogIndex++;
      this.dialogText.setText(this.dialogLines[this.dialogIndex]);
    } else {
      this.dialogActive = false;
      this.startKeywordChallenge();
    }
  }

  // Cria a caixa de diálogo
  createDialogBox() {
    if (!this.dialogReady) return;

    const width = this.scale.width;
    const height = this.scale.height;

    const dialogWidth = width / 2;
    const dialogHeight = height / 5;
    const dialogX = this.cameras.main.width / 2 - dialogWidth / 2;
    const dialogY = this.cameras.main.height - dialogHeight - 50;

    // Cria os gráficos da caixa de diálogo
    this.dialogBox = this.add.graphics();
    this.dialogBox.fillStyle(0xff9e0d, 1);
    this.dialogBox.fillRoundedRect(dialogX, dialogY, dialogWidth, dialogHeight + 60, 10);

    // Configura o texto do diálogo
    this.dialogText = this.add.text(dialogX + 150, dialogY + 30, '', {
      fontSize: '20px',
      color: '#000000',
      fontFamily: 'font',
      wordWrap: { width: dialogWidth - 200 }
    }).setDepth(1);

    this.setupKeywordInput(dialogX, dialogY);
    
    this.dialogBox.setVisible(true);
    this.dialogText.setVisible(true);

    // Ícone da tecla ENTER no canto inferior direito
    this.enterDialogIcon = this.add.image(width - 420, height - 50, 'keyENTERPurple')
    .setScale(0.15)
    .setScrollFactor(0)
    .setDepth(1000)
    .setVisible(true); // Visível durante o diálogo
  }

  // Configura a entrada de texto para palavras-chave
  setupKeywordInput(dialogX, dialogY) {
    // Caixa de entrada de texto
    this.inputBackground = this.add.graphics();
    this.inputBackground.fillStyle(0xffffff);
    this.inputBackground.fillRoundedRect(dialogX + 150, dialogY + 110, 500, 40, 10);
    this.inputBackground.lineStyle(2, 0xffff00, 1);
    this.inputBackground.strokeRoundedRect(dialogX + 150, dialogY + 110, 500, 40, 10);
    this.inputBackground.setVisible(false);

    // Texto de placeholder
    this.placeholderText = this.add.text(dialogX + 160, dialogY + 115, 'Digite a palavra-chave...', { 
      font: '20px font',
      fill: '#888888'
    }).setVisible(false);

    // Texto digitado pelo jogador
    this.keywordText = this.add.text(dialogX + 160, dialogY + 115, '', { 
      font: '20px font',
      fill: '#000000'
    }).setVisible(false);

    // Label do prompt
    this.keywordLabel = this.add.text(width / 2, dialogY + 80, '', {
      fontFamily: 'Arial',
      fontSize: '22px',
      color: '#ffff66',
      fontStyle: 'bold'
    }).setOrigin(0.5).setVisible(false);

    // Mapeamento de caracteres especiais em português
    const caracteresEspeciais = {
      'Ç': 'Ç', 'ç': 'Ç',
      'Ã': 'A', 'ã': 'A', 
      'Õ': 'O', 'õ': 'O',
      'Â': 'A', 'â': 'A',
      'Ê': 'E', 'ê': 'E',
      'Î': 'I', 'î': 'I',
      'Ô': 'O', 'ô': 'O',
      'Û': 'U', 'û': 'U',
      'Á': 'A', 'á': 'A',
      'É': 'E', 'é': 'E',
      'Í': 'I', 'í': 'I',
      'Ó': 'O', 'ó': 'O',
      'Ú': 'U', 'ú': 'U',
      'À': 'A', 'à': 'A',
      'è': 'E', 'È': 'E',
      'ì': 'I', 'Ì': 'I',
      'ò': 'O', 'Ò': 'O',
      'ù': 'U', 'Ù': 'U',
      '~': '~'
    };

    // Listener para entrada de teclado
    this.input.keyboard.on('keydown', event => {
      if (this.inputActive) {
        if (event.keyCode === 8 && this.keywordText.text.length > 0) {
          // Backspace
          this.keywordText.text = this.keywordText.text.substr(0, this.keywordText.text.length - 1);
        }
        else if (event.keyCode === 32 || (event.keyCode >= 48 && event.keyCode <= 90)) {
          // Letras e números padrão
          this.keywordText.text += event.key.toUpperCase();
        }
        else if (caracteresEspeciais[event.key]) {
          // Caracteres especiais em português
          this.keywordText.text += caracteresEspeciais[event.key];
        }

        this.placeholderText.setVisible(this.keywordText.text.length === 0);

        if (event.keyCode === 13) {
          this.checkKeywordAnswer();
        }
      }
    });
  }

  // Verifica a resposta do jogador
  checkKeywordAnswer() {
    if (!this.inputActive || this.keywordText.text.length === 0) return;

    const resposta = this.keywordText.text.trim();
    const etapa = this.keywordSteps[this.currentStep];

    if (resposta === etapa.keyword) {
      this.inputActive = false;
      this.keywordText.text = '';
      this.placeholderText.setVisible(false);
      this.inputBackground.setVisible(false);
      this.keywordLabel.setVisible(false);

      this.dialogText.setText(etapa.success);
      this.onNext = () => {
        this.dialogText.setText(etapa.next);
        this.onNext = () => {
          this.currentStep++;
          if (this.currentStep < this.keywordSteps.length) {
            this.showKeywordStep();
          } else {
            if (!this.finalDialogPlayed) {
              this.onNext = () => {
                this.finalDialogPlayed = true;
                this.resetPlayerToInitialState();
              };
            } else {
              this.resetPlayerToInitialState();
            }
          }
        };
      };
    } else {
      this.dialogText.setText('Tente de novo!');
      this.keywordText.text = '';
      this.placeholderText.setVisible(true);
    }
  }

  // Inicia o desafio de palavras-chave
  startKeywordChallenge() {
    this.currentStep = 0;
    this.showKeywordStep();
  }

  // Mostra a etapa atual do desafio de palavras-chave
  showKeywordStep() {
    const step = this.keywordSteps[this.currentStep];
    this.dialogText.setText(`${step.vp}: O que acha?`);
    this.keywordLabel.setText(step.prompt);
    this.updateSpeaker(step.head);
    
    this.inputActive = true;
    this.inputBackground.setVisible(true);
    this.placeholderText.setVisible(true);
    this.keywordText.setVisible(true);
    this.keywordLabel.setVisible(true);
    this.keywordText.text = '';
  }

  // Cria animações do jogador
  createPlayerAnimations() {
    this.anims.create({
      key: "walk_right",
      frames: this.anims.generateFrameNumbers("player", { start: 112, end: 117 }),
      frameRate: 10,
      repeat: -1,
    });

    this.anims.create({
      key: "walk_left",
      frames: this.anims.generateFrameNumbers("player", { start: 124, end: 129 }),
      frameRate: 10,
      repeat: -1,
    });

    this.anims.create({
      key: "stop_right",
      frames: this.anims.generateFrameNumbers("player", { start: 56, end: 61 }),
      frameRate: 5,
      repeat: -1,
    });

    this.anims.create({
      key: "stop_left",
      frames: this.anims.generateFrameNumbers("player", { start: 68, end: 73 }),
      frameRate: 5,
      repeat: -1,
    });
  }

  // Cria barreiras e áreas de colisão
  createBarriers() {
    const width = this.scale.width;
    const height = this.scale.height;

    this.proximityrela = this.add.rectangle(width / 2, height / 1.5, width / 3.5, height / 5, 0xff0000, 0);
    this.physics.add.existing(this.proximityrela, true);
  }

  // Manipula colisão com a tecla ENTER
  onEnterCollision() {
    this.keyENTERSeat.setVisible(true);
  }
}
