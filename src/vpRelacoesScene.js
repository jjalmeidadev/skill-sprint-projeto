class VpRelacoesScene extends Phaser.Scene {
  constructor() {
    super({ key: "VpRelacoesScene" });
    this.canMove = true;
    this.enterShown = false;
    this.dialogActive = false;
    this.dialogReady = false;
    this.showingButtons = false;
    this.inputActive = false;
    this.elevatorIndicator = null;
    this.elevatorProximity = null;
    this.hasReset = false;
    this.enterPressText = null;
    this.currentSpeaker = null;
    this.finalDialogPlayed = false;
    this.onNext = null;
    this.musicarelainst = null; // Referência para a música de fundo
  }

  init(data) {
    this.selectedSpriteSheet = data.selectedSpriteSheet;
    
  }

  preload() {
    // Carregamento de todos os assets
    this.load.video("bgbase", "../assets/relainst1.mp4");
    this.load.video("bgman", "../assets/relainsthome.mp4");
    this.load.video("bgwom", "../assets/relainstmuie.mp4");

    this.load.spritesheet("indicator", "../assets/exclamaçãoRoxa.png", { frameWidth: 254, frameHeight: 291 });
    this.load.spritesheet('player', `../assets/personagens/skinsPlayer/players/${this.selectedSpriteSheet}.png`, {frameWidth: 16,frameHeight: 32,});
    // Carregamento de imagens e sons
    this.load.image("keyENTER", "../assets/keyEnter.png");
    this.load.audio("buttonSound", "../assets/sounds/687107__aphom000__mouse-2-button-fast-click.wav");
    this.load.audio("walkSound", "../assets/sounds/753292__vrymaa__footsteps-high-heels-hardwood-walk-run (mp3cut.net).wav");
    this.load.image('buttonYes', '../assets/botao_sim.png');
    this.load.image('buttonNo', '../assets/botao_nao.png');
    this.load.image('jobRotation', '../assets/planoCarreira.png');
    this.load.font('font', 'fonts/PixelifySans-VariableFont_wght.ttf');
    this.load.audio('keySound', '../assets/sounds/computer-keyboard-typing-290582 (mp3cut.net).mp3');
    this.load.audio('musica', '../assets/sounds/musicarelainst.wav');

    // Carregamento das imagens dos VPs
    this.load.image('vppessoascab', '../assets/cabecasrelainst/vppessoascab.png');
    this.load.image('vpnegociocab', '../assets/cabecasrelainst/vpnegociocab.png');
    this.load.image('vpestrategiacab', '../assets/cabecasrelainst/vpestrategiacab.png');
    this.load.image('vptechcab', '../assets/cabecasrelainst/vptechcab.png');
    this.load.image('vprelacoescab', '../assets/cabecasrelainst/vprelacoescab.png');
  }

  create() {
    const width = this.scale.width;
    const height = this.scale.height;

    // Configuração inicial da cena
    this.cameras.main.fadeIn(1000);
    this.physics.world.setBounds(0, 0, width, height);

    // Inicialização da música de fundo (em loop)
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

    // Configuração do jogador
    this.player = this.physics.add.sprite(width - 150, height / 1.5, "player");
    this.player.setScale(8);
    this.player.setDepth(1);
    this.player.setCollideWorldBounds(true);
    this.player.anims.play("stop_left", true);

    // Vídeos de fundo
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

    // Elementos do elevador (inicialmente invisíveis)
    this.keyENTERElevator = this.physics.add.sprite(width - 150, height / 1.5, "keyENTER")
      .setScale(0.2)
      .setImmovable(true)
      .setVisible(false);

    // Som de caminhada
    this.walkSound = this.sound.add("walkSound", { loop: false, volume: 2 });

    // Configurações iniciais
    this.createPlayerAnimations();
    this.createBarriers();
    this.lastPosition = "left";
    this.awaitingFinalDialogAction = null;
    this.currentFinalIndex = 0;
    this.currentDialogIndex = 0;
    this.optionSelected = false;
    this.overlayVisible = false;

    // Configuração dos controles do teclado
    this.keys = this.input.keyboard.addKeys({
      left: Phaser.Input.Keyboard.KeyCodes.A,
      right: Phaser.Input.Keyboard.KeyCodes.D,
      interagir: Phaser.Input.Keyboard.KeyCodes.E,
      ENTER: Phaser.Input.Keyboard.KeyCodes.ENTER,
    });

    // Configuração dos indicadores
    if (!this.anims.exists("exclaiming")) {
      this.anims.create({
        key: "exclaiming",
        frames: this.anims.generateFrameNumbers("indicator", { start: 0, end: 1 }),
        frameRate: 3,
        repeat: -1,
      });
    }

    // Indicador de interação principal
    this.indicatorrela = this.add.sprite(width / 2.0, height / 1.9, "indicator")
      .setScale(0.5)
      .play("exclaiming")
      .setVisible(true);

    // Indicador do elevador
    this.elevatorIndicator = this.add.sprite(width - 130, height / 1.8, "indicator")
      .setScale(0.5)
      .play("exclaiming")
      .setVisible(false);

    // Área de interação da cadeira
    this.keyENTERSeat = this.physics.add.sprite(width / 1.7, height / 1.5, "keyENTER")
      .setScale(0.2)
      .setImmovable(true)
      .setVisible(false);
    this.physics.add.collider(this.player, this.keyENTERSeat, this.onEnterCollision, null, this);
    
    // Área de interação do elevador
    this.elevatorProximity = this.physics.add.sprite(width - 100, height / 1.5, "keyENTER")
      .setScale(0.2)
      .setImmovable(true)
      .setVisible(false);
    this.physics.add.overlap(this.player, this.elevatorProximity, this.handleElevatorProximity, null, this);

    // Som do botão
    this.buttonClick = this.sound.add("buttonSound", { loop: false, volume: 10 });
    this.buttonClick.play();

    // Configuração dos diálogos
    this.dialogText = this.add.text(100, 100, '', { fontSize: '20px', wordWrap: { width: 600 } });
    this.inputText = null;
    this.inputTextBg = null;
    this.keywordLabel = null;
    this.playerName = playerName;
    this.completedPreviousPhases = true;

    this.physics.add.overlap(this.player, this.proximityrela, this.handleProximityOverlap, null, this);

    this.pressEnter();

    // Eventos de input
    this.input.on('pointerdown', (pointer) => {
      if (this.dialogActive && !this.showingButtons) {
        this.nextDialog();
      } else if (this.onNext && !this.inputActive) {
        const next = this.onNext;
        this.onNext = null;
        next();
      }
    });

    this.input.keyboard.on('keydown-ENTER', (event) => {
      if (this.inputActive) return;
      if (this.onNext) {
        const next = this.onNext;
        this.onNext = null;
        next();
      }
    });
 this.input.keyboard.disableGlobalCapture();

  }

  handleElevatorProximity() {
    if (this.hasReset && Phaser.Input.Keyboard.JustDown(this.keys.ENTER)) {
      // Para todos os sons antes da transição
      this.sound.stopAll();
      
      // Limpeza de elementos do DOM
      if (this.inputElement) {
        this.inputElement.remove();
        this.inputElement = null;
      }
      
      // Transição para a cena do elevador
      this.scene.start("elevadorScene", {
        fromScene: "VpRelacoesScene",
        playerName: this.playerName
      });
    }
  }

  resetPlayerToInitialState() {
    const width = this.scale.width;
    const height = this.scale.height;

    // Reseta a posição do jogador
    this.lastPosition = "right";
    this.player.setPosition(width - 550, height / 1.5);

    // Esconde elementos da cadeira
    if (this.keyENTERSeat) {
      this.keyENTERSeat.setVisible(false).setActive(false).setAlpha(0);
    }

    // Esconde elementos de diálogo
    if (this.dialogBox) this.dialogBox.setVisible(false);
    if (this.dialogText) this.dialogText.setVisible(false);
    if (this.currentSpeaker) this.currentSpeaker.destroy();
    if (this.inputElement) this.inputElement.style.display = 'none';
    if (this.keywordLabel) this.keywordLabel.setVisible(false);
    if (this.enterPressText) {
      this.enterPressText.destroy();
      this.enterPressText = null;
    }

    // Reseta os fundos
    this.bgbase.setVisible(true);
    this.bgwom.setVisible(false);
    this.bgman.setVisible(false);

    // Ativa elementos do jogador
    this.player.setActive(true).setVisible(true);
    this.indicatorrela.setActive(false).setVisible(false).setPosition(width + 400, height + 400);

    // Mostra indicador do elevador
    this.elevatorIndicator.setVisible(true);
    this.elevatorProximity.setVisible(false);

    // Reseta estados
    this.dialogActive = false;
    this.dialogReady = false;
    this.inputActive = false;
    this.hasReset = true;

    // Garante que a música está tocando
    if (this.musicarelainst && !this.musicarelainst.isPlaying) {
      this.musicarelainst.play();
    }
  }

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

    // Lógica dos indicadores
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

  typeText(text, onComplete) {
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
    this.indicatorrela.setVisible(false);
    this.keyENTERSeat.setVisible(true);
    this.enterShown = true;
  }

  pressEnter() {
    this.input.keyboard.on("keydown-ENTER", () => {
      if (this.inputActive) return;
      
      this.keyENTERSeat.setVisible(false);
      this.bgbase.setVisible(false);

      this.player.setActive(false).setVisible(false);
      this.keyENTERSeat.setActive(false).setVisible(false).setAlpha(0);
      this.indicatorrela.setActive(false).setVisible(false);

      if (this.player.texture.key === "playerwom") {
        this.bgwom.setVisible(true);
      } else if (this.player.texture.key === "player") {
        this.bgman.setVisible(true);
      }

      this.dialogReady = true;
      this.createDialogBox();
      this.showDialog();
      this.dialogActive = true;
    });
  }

  getDialogs() {
    const dialogs = [];

    dialogs.push(`VP de Pessoas: E olha só quem chegou, ${this.playerName}!`);
    dialogs.push("Sinta-se à vontade para participar desse encontro tão esperado! Aposto que a conversa com todos os VPs vai ser demais.");
    dialogs.push("Antes de darmos início à discussão, gostaria que nos dissesse se já realizou as outras fases disponíveis!");

    if (!this.completedPreviousPhases) {
      dialogs.push("Ah, que pena, a conversa pode ser mais construtiva se você conhece-las. Pedimos que explore elas antes de continuarmos aqui. Estaremos te esperando!");
      return dialogs;
    } else {
      dialogs.push("Que maravilha! Creio que já se sente muito capaz de atuar nos diversos setores da VIVO agora, espero que tenha aproveitado.");
    }

    dialogs.push("O que acha de realizarmos um desafio para testar suas skills recém adquiridas? É simples, você pode nos contar uma palavra chave que descreva a respectiva VP e como esta foi capaz de te impactar em dilemas de desempenho!");

    return dialogs;
  }

  showDialog() {
    this.dialogIndex = 0;
    this.dialogLines = this.getDialogs();
    this.updateSpeaker('vppessoascab');
    this.typeText(this.dialogLines[this.dialogIndex]);
  }

  updateSpeaker(vpHead) {
    if (this.currentSpeaker) {
      this.currentSpeaker.destroy();
    }
    const dialogX = this.cameras.main.width / 2 - (this.cameras.main.width / 2) / 2;
    const dialogY = this.cameras.main.height - (this.cameras.main.height / 5) - 50;
    this.currentSpeaker = this.add.image(dialogX + 80, dialogY + 40, vpHead).setScale(0.5);
  }

  nextDialog() {
    if (this.dialogIndex < this.dialogLines.length - 1) {
      this.dialogIndex++;
      
      if (this.dialogIndex === 0) {
        this.updateSpeaker('vppessoascab');
      } else if (this.dialogLines[this.dialogIndex].includes("Antes de darmos início")) {
        this.updateSpeaker('vppessoascab');
      }
      
      this.typeText(this.dialogLines[this.dialogIndex]);

      if (this.dialogLines[this.dialogIndex].includes("Antes de darmos início à discussão")) {
        this.showDecisionButtons();
        return;
      }

    } else {
      this.dialogActive = false;
      this.startKeywordChallenge();
    }
  }

  showDecisionButtons() {
    const dialogX = this.cameras.main.width / 2 - (this.cameras.main.width / 2) / 2;
    const dialogY = this.cameras.main.height - (this.cameras.main.height / 5) - 50;
    
    this.yesButton = this.add.image(dialogX + 200, dialogY + (this.cameras.main.height / 5) + 20, 'buttonYes')
      .setInteractive().setScale(0.6).setVisible(true);
    this.noButton = this.add.image(dialogX + 550, dialogY + (this.cameras.main.height / 5) + 20, 'buttonNo')
      .setInteractive().setScale(0.6).setVisible(true);
    this.showingButtons = true;

    this.yesButton.on('pointerdown', () => {
      this.hideDecisionButtons();
      this.awaitingFinalDialogAction = 'yes';
      this.dialogText.setText('');
      this.updateSpeaker('vppessoascab');

      this.typeText("Que maravilha! Creio que já se sente muito capaz de atuar nos diversos setores da VIVO agora, espero que tenha aproveitado.", () => {
        this.onNext = () => {
          this.updateSpeaker('vppessoascab');
          this.typeText("O que acha de realizarmos um desafio para testar suas skills recém adquiridas?", () => {
            this.onNext = () => {
              this.updateSpeaker('vppessoascab');
              this.typeText("E aí pessoal?", () => {
                this.onNext = () => {
                  this.startKeywordChallenge();
                };
              });
            };
          });
        };
      });
    });

    this.noButton.on('pointerdown', () => {
      this.yesButton.disableInteractive().setVisible(false);
      this.noButton.disableInteractive().setVisible(false);

      this.typeText("Ah, que pena, a conversa pode ser mais construtiva se você conhece-las. Pedimos que explore elas antes de continuarmos aqui. Estaremos te esperando!", () => {
        this.time.delayedCall(1000, () => {
          this.resetPlayerToInitialState();
        });
      });
    });
  }

  hideDecisionButtons() {
    this.yesButton.setVisible(false).disableInteractive();
    this.noButton.setVisible(false).disableInteractive();
    this.showingButtons = false;
  }

  createDialogBox() {
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

    this.startKeywordChallenge = () => {
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
    };

    this.showKeywordStep = () => {
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
    };

    this.dialogBox.setVisible(true);
    this.dialogText.setVisible(true);
  }

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

  createBarriers() {
    const width = this.scale.width;
    const height = this.scale.height;

    this.proximityrela = this.add.rectangle(width / 2, height / 1.5, width / 3.5, height / 5, 0xff0000, 0);
    this.physics.add.existing(this.proximityrela, true);
  }

  onEnterCollision() {
    this.keyENTERSeat.setVisible(true);
  }
}
