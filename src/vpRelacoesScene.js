class VpRelacoesScene extends Phaser.Scene {
  constructor() {
    super({ key: "VpRelacoesScene" });
    this.canMove = true;
    this.enterShown = false; // Indica se a tecla ENTER está visível para interação
    this.dialogActive = false; // Controla se o diálogo está ativo
    this.dialogReady = false; // Verifica se o diálogo está pronto para ser exibido
    this.inputActive = false; // Controla o estado do input de palavras-chave
    this.elevatorIndicator = null; // Referência para o indicador do elevador
    this.elevatorProximity = null; // Área de proximidade do elevador
    this.hasReset = false; // Verifica se o jogador já resetou após o diálogo
    this.enterPressText = null; // Texto de pressionar ENTER
    this.currentSpeaker = null; // Referência para o speaker atual
    this.finalDialogPlayed = false; // Controla se o diálogo final foi mostrado
    this.onNext = null; // Callback para próxima ação
    this.musicarelainst = null; // Referência para a música de fundo
  }

  init(data) {
    this.selectedSpriteSheet = data.selectedSpriteSheet;
  }

  preload() {
    // Carrega todos os assets necessários para a cena
    this.load.video("bgbase", "../assets/relainst1.mp4");
    this.load.video("bgman", "../assets/relainsthome.mp4");
    this.load.video("bgwom", "../assets/relainstmuie.mp4");

    this.load.spritesheet("indicator", "../assets/exclamaçãoRoxa.png", { frameWidth: 254, frameHeight: 291 });
    this.load.spritesheet('player', `../assets/personagens/skinsPlayer/players/${this.selectedSpriteSheet}.png`, {frameWidth: 16,frameHeight: 32,});
    
    // Carrega imagens e sons
    this.load.image("keyENTER", "../assets/keyEnter.png");
    this.load.audio("buttonSound", "../assets/sounds/687107__aphom000__mouse-2-button-fast-click.wav");
    this.load.audio("walkSound", "../assets/sounds/753292__vrymaa__footsteps-high-heels-hardwood-walk-run (mp3cut.net).wav");
    this.load.image('jobRotation', '../assets/planoCarreira.png');
    this.load.font('font', 'fonts/PixelifySans-VariableFont_wght.ttf');
    this.load.audio('keySound', '../assets/sounds/computer-keyboard-typing-290582 (mp3cut.net).mp3');
    this.load.audio('musica', '../assets/sounds/musicarelainst.wav');

    // Carrega as imagens dos VPs
    this.load.image('vppessoascab', '../assets/cabecasrelainst/vppessoascab.png');
    this.load.image('vpnegociocab', '../assets/cabecasrelainst/vpnegociocab.png');
    this.load.image('vpestrategiacab', '../assets/cabecasrelainst/vpestrategiacab.png');
    this.load.image('vptechcab', '../assets/cabecasrelainst/vptechcab.png');
    this.load.image('vprelacoescab', '../assets/cabecasrelainst/vprelacoescab.png');
    this.load.image('levelTitle', '../assets/titulos/tituloVpRelacoes.png') // Carrega os asssets do titulo da fase
  }

  create() {
    // Configuração inicial da cena
    this.add.rectangle(width - 2000, height - 2000, width, height, 0x2F052F).setOrigin(0).setScale(5);
    this.cameras.main.fadeIn(1000);
    this.physics.world.setBounds(0, 0, width, height);

    // Inicializa a música de fundo em loop
    if (!this.musicarelainst) {
      this.musicarelainst = this.sound.add("musica", { 
        loop: true, 
        volume: 0.5 
      });
      this.sound.stopAll();
      this.musicarelainst.play();
    } else if (!this.musicarelainst.isPlaying) {
      this.musicarelainst.play();
    }

    // Configura o jogador
    this.player = this.physics.add.sprite(width - 150, height / 1.5, "player");
    this.player.setScale(8);
    this.player.setDepth(1);
    this.player.setCollideWorldBounds(true);
    this.player.anims.play("stop_left", true);

    // Configura os vídeos de fundo
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

    // Elementos do elevador
    this.keyENTERElevator = this.physics.add.sprite(width - 150, height / 1.5, "keyENTER")
      .setScale(0.2)
      .setImmovable(true)
      .setVisible(false);

    // Configura o som de caminhada
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

    // Configura os controles do teclado
    this.keys = this.input.keyboard.addKeys({
      left: Phaser.Input.Keyboard.KeyCodes.A,
      right: Phaser.Input.Keyboard.KeyCodes.D,
      interagir: Phaser.Input.Keyboard.KeyCodes.E,
      ENTER: Phaser.Input.Keyboard.KeyCodes.ENTER,
    });

    // Configura a animação do indicador
    if (!this.anims.exists("exclaiming")) {
      this.anims.create({
        key: "exclaiming",
        frames: this.anims.generateFrameNumbers("indicator", { start: 0, end: 1 }),
        frameRate: 3,
        repeat: -1,
      });
    }

    // Cria os indicadores de interação
    this.indicatorrela = this.add.sprite(width / 2.0, height / 1.9, "indicator")
      .setScale(0.5)
      .play("exclaiming")
      .setVisible(true);

    this.elevatorIndicator = this.add.sprite(width - 130, height / 1.8, "indicator")
      .setScale(0.5)
      .play("exclaiming")
      .setVisible(false);

    // Áreas de interação
    this.keyENTERSeat = this.physics.add.sprite(width / 1.7, height / 1.5, "keyENTER")
      .setScale(0.2)
      .setImmovable(true)
      .setVisible(false);
    this.physics.add.collider(this.player, this.keyENTERSeat, this.onEnterCollision, null, this);
    
    this.elevatorProximity = this.physics.add.sprite(width - 100, height / 1.5, "keyENTER")
      .setScale(0.2)
      .setImmovable(true)
      .setVisible(false);
    this.physics.add.overlap(this.player, this.elevatorProximity, this.handleElevatorProximity, null, this);

    // Configura o som do botão
    this.buttonClick = this.sound.add("buttonSound", { loop: false, volume: 10 });
    this.buttonClick.play();

    // Configura os elementos de diálogo
    this.dialogText = this.add.text(100, 100, '', { fontSize: '20px', wordWrap: { width: 600 } });
    this.inputText = null;
    this.inputTextBg = null;
    this.keywordLabel = null;
    this.playerName = playerName;
    this.completedPreviousPhases = true;

    this.physics.add.overlap(this.player, this.proximityrela, this.handleProximityOverlap, null, this);

    // Configura os listeners de input
    this.setupInputHandlers();
  }

  setupInputHandlers() {
    // Handler unificado para a tecla ENTER
    this.input.keyboard.on('keydown-ENTER', (event) => {
      // Prioriza o input de palavras-chave se estiver ativo
      if (this.inputActive) {
        event.stopPropagation();
        return;
      }

      // Inicia o diálogo se o jogador estiver na área de interação
      if (this.enterShown && !this.dialogActive && !this.dialogReady) {
        this.startDialog();
        return;
      }

      // Avança o diálogo se estiver ativo
      if (this.dialogActive) {
        event.stopPropagation();
        this.nextDialog();
        return;
      }

      // Executa callbacks pendentes
      if (this.onNext) {
        event.stopPropagation();
        const next = this.onNext;
        this.onNext = null;
        next();
      }

      // Interage com o elevador se estiver na área
      if (this.hasReset && this.physics.overlap(this.player, this.elevatorProximity)) {
        this.handleElevatorProximity();
      }
    });

    // Desabilita o capture global para evitar conflitos
    this.input.keyboard.disableGlobalCapture();
  }

  startDialog() {
    // Configura a cena para iniciar o diálogo
    this.keyENTERSeat.setVisible(false);
    this.bgbase.setVisible(false);

    this.player.setActive(false).setVisible(false);
    this.keyENTERSeat.setActive(false).setVisible(false).setAlpha(0);
    this.indicatorrela.setActive(false).setVisible(false);

    // Mostra o fundo correto baseado no personagem
    if (this.player.texture.key === "playerwom") {
      this.bgwom.setVisible(true);
    } else if (this.player.texture.key === "player") {
      this.bgman.setVisible(true);
    }

    // Prepara e mostra o diálogo
    this.dialogReady = true;
    this.createDialogBox();
    this.showDialog();
    this.dialogActive = true;
  }

  handleElevatorProximity() {
    if (this.hasReset && Phaser.Input.Keyboard.JustDown(this.keys.ENTER)) {
      // Limpa os sons e elementos do DOM antes da transição
      this.sound.stopAll();
      
      if (this.inputElement) {
        this.inputElement.remove();
        this.inputElement = null;
      }
      
      // Transiciona para a cena do elevador
      this.registry.set('vpRelacoesConcluida', true);
      const elevadorScene = this.scene.get("elevadorScene");
      elevadorScene.resumeFromRelations = true;
      this.scene.stop("VpRelacoesScene");
      this.scene.resume("elevadorScene");
    }
  }

  resetPlayerToInitialState() {
    // Reseta o jogador para o estado inicial
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
    if (this.inputElement) this.inputElement.style.display = 'none';
    if (this.keywordLabel) this.keywordLabel.setVisible(false);
    if (this.enterPressText) {
      this.enterPressText.destroy();
      this.enterPressText = null;
    }

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
  }

  update() {
    // Lógica de movimento do jogador
    const speed = 300;
    let moving = false;

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

    // Lógica dos indicadores de interação
    if (!this.physics.overlap(this.player, this.proximityrela)) {
      this.indicatorrela.setVisible(true);
      this.keyENTERSeat.setVisible(false);
      this.enterShown = false;
    }

    // Lógica do elevador
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
    const titleImage = this.add.image(width / 2, height / 2, 'levelTitle').setDepth(1000); // Adiciona a imagem de parabéns acima do jogador e define sua profundidade para garantir que fique acima de outros elementos
    titleImage.setScale(0.6); // Ajusta o tamanho da imagem de parabéns

    // Remove a imagem de parabéns após 3 segundos
    this.time.delayedCall(3000, () => { // Define um atraso de 3 segundos antes de executar a função
      titleImage.destroy(); // Remove a imagem de parabéns da tela
    });
  }

  typeText(text, onComplete) {
    // Exibe texto letra por letra (efeito de digitação)
    if (this.typingEvent) {
      this.typingEvent.remove();
      this.typingEvent = null;
    }

    this.dialogText.setText('');
    const chars = text.split('');
    let i = 0;

    this.typingEvent = this.time.addEvent({
      delay: 30,
      callback: () => {
        this.dialogText.text += chars[i];
        i++;
        if (i >= chars.length) {
          this.typingEvent.remove();
          this.typingEvent = null;
          if (onComplete) onComplete();
        }
      },
      loop: true
    });
  }

  handleProximityOverlap(player, proximity) {
    // Mostra o indicador quando o jogador está perto da área de interação
    this.indicatorrela.setVisible(false);
    this.keyENTERSeat.setVisible(true);
    this.enterShown = true;
  }

  getDialogs() {
    // Retorna os diálogos da cena
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

  showDialog() {
    // Inicia a exibição dos diálogos
    this.dialogIndex = 0;
    this.dialogLines = this.getDialogs();
    this.updateSpeaker('vppessoascab');
    this.typeText(this.dialogLines[this.dialogIndex]);
  }

  updateSpeaker(vpHead) {
    // Atualiza a imagem do speaker atual
    if (this.currentSpeaker) {
      this.currentSpeaker.destroy();
    }
    const dialogX = this.cameras.main.width / 2 - (this.cameras.main.width / 2) / 2;
    const dialogY = this.cameras.main.height - (this.cameras.main.height / 5) - 50;
    this.currentSpeaker = this.add.image(dialogX + 80, dialogY + 40, vpHead).setScale(0.5);
  }

  nextDialog() {
    // Avança para o próximo diálogo ou completa o atual
    if (this.typingEvent) {
      this.typingEvent.remove();
      this.typingEvent = null;
      this.dialogText.setText(this.dialogLines[this.dialogIndex]);
      return;
    }

    if (this.dialogIndex < this.dialogLines.length - 1) {
      this.dialogIndex++;
      this.typeText(this.dialogLines[this.dialogIndex]);
    } else {
      this.dialogActive = false;
      this.startKeywordChallenge();
    }
  }

  createDialogBox() {
    // Cria a caixa de diálogo na tela
    if (!this.dialogReady) return;

    const width = this.scale.width;
    const height = this.scale.height;

    const dialogWidth = width / 2;
    const dialogHeight = height / 5;
    const dialogX = this.cameras.main.width / 2 - dialogWidth / 2;
    const dialogY = this.cameras.main.height - dialogHeight - 50;

    this.dialogBox = this.add.graphics();
    this.dialogBox.fillStyle(0xff9e0d, 1);
    this.dialogBox.fillRoundedRect(dialogX, dialogY, dialogWidth, dialogHeight + 60, 10);

    this.dialogText = this.add.text(dialogX + 150, dialogY + 30, '', {
      fontSize: '20px',
      color: '#000000',
      fontFamily: 'font',
      wordWrap: { width: dialogWidth - 200 }
    }).setDepth(1);

    this.keywordLabel = this.add.text(width / 2, dialogY + 90, '', {
      fontFamily: 'Arial',
      fontSize: '22px',
      color: '#ffff66',
      fontStyle: 'bold'
    }).setOrigin(0.5).setVisible(false);

    // Configura o input para o desafio de palavras-chave
    this.setupKeywordInput(dialogX, dialogY);
    
    this.dialogBox.setVisible(true);
    this.dialogText.setVisible(true);
  }

  setupKeywordInput(dialogX, dialogY) {
    // Configura o elemento de input para palavras-chave
    this.inputElement = document.createElement('input');
    this.inputElement.type = 'text';
    Object.assign(this.inputElement.style, {
      position: 'absolute',
      padding: '10px',
      fontSize: '18px',
      borderRadius: '10px',
      border: '2px solid white',
      backgroundColor: '#000000',
      color: '#ffffff',
      outline: 'none',
      width: '300px',
      display: 'none',
      zIndex: 1000
    });
    document.body.appendChild(this.inputElement);

    this.updateInputPosition = () => {
      const keywordLabelBounds = this.keywordLabel.getBounds();
      this.inputElement.style.left = `${keywordLabelBounds.x + keywordLabelBounds.width / 2 - 150 - 115}px`;
      this.inputElement.style.top = `${keywordLabelBounds.y + keywordLabelBounds.height - 110}px`;
    };

    // Handler para o input de palavras-chave
    this.inputElement.addEventListener('keydown', (event) => {
      if (event.key === 'Enter') {
        event.preventDefault();
        event.stopPropagation();
        
        const resposta = this.inputElement.value.trim().toUpperCase();
        const etapa = this.keywordSteps[this.currentStep];

        if (resposta === etapa.keyword) {
          this.inputActive = false;
          this.dialogText.setText('');
          this.inputElement.style.display = 'none';
          this.keywordLabel.setVisible(false);

          this.typeText(etapa.success, () => {
            this.onNext = () => {
              this.typeText(etapa.next, () => {
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
              });
            };
          });
        } else {
          this.dialogText.setText('Tente de novo!');
          this.inputElement.value = '';
        }
      }
    });
  }

  startKeywordChallenge() {
    // Configura as etapas do desafio de palavras-chave
    this.keywordSteps = [
      {
        vp: 'VP de Relações',
        prompt: 'EMPATIA',
        success: 'Uma escolha certamente relevante para nosso cotidiano. Foi um valor que, de acordo com seu colega, foi aplicado diretamente por você quando o ajudou à aliviar seu nervosismo. Parabéns!',
        next: ' E vocês gente?',
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

    this.currentStep = 0;
    this.showKeywordStep();
  }

  showKeywordStep() {
    // Mostra uma etapa do desafio de palavras-chave
    const step = this.keywordSteps[this.currentStep];
    this.dialogText.setText(`${step.vp}: O que acha?`);
    this.keywordLabel.setText(`${step.prompt}`);
    this.keywordLabel.setVisible(true);
    this.updateSpeaker(step.head);
    
    this.inputActive = true;
    this.inputElement.style.display = 'block';
    this.inputElement.value = '';
    this.inputElement.focus();
    this.updateInputPosition();
  }

  createPlayerAnimations() {
    // Cria as animações do jogador
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

  createBarriers() {
    // Crea as barreiras e áreas de colisão
    const width = this.scale.width;
    const height = this.scale.height;

    this.proximityrela = this.add.rectangle(width / 2, height / 1.5, width / 3.5, height / 5, 0xff0000, 0);
    this.physics.add.existing(this.proximityrela, true);
  }

  onEnterCollision() {
    // Handler para colisão com a área de interação
    this.keyENTERSeat.setVisible(true);
  }
}