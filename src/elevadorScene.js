class ElevadorScene extends Phaser.Scene {
  constructor() {
    super({ key: "elevadorScene" });
    this.canMove = true; // Controla se o jogador pode se mover
    this.panelElevShown = false; // Controla se o painel do elevador foi mostrado
    this.ready = false; // <- flag de prontidão
  }

  init(data) {
    this.selectedSpriteSheet = data.selectedSpriteSheet;
    this.fromScene = data.fromScene || null; // Captura de onde o player veio
  }

  preload() {
    this.load.image("backgroundElev", "../assets/bgelevadorvar1.png"); // Carrega a imagem de fundo do elevador
    this.load.image("backgroundElev2", "../assets/bgelevadorvar2.jpg"); // Carrega a imagem de fundo do elevador
    this.load.image("backgroundElev3", "../assets/bgelevadorvar3.jpg"); // Carrega a imagem de fundo do elevador
    
    this.load.image("panelElev", "../assets/painelinelev.png"); // Carrega a imagem do painel do elevador
    this.load.image("buttonStrategies", "../assets/botaoestrategias.png"); // Carrega a imagem do botão de estratégias
    this.load.image("buttonOffice", "../assets/botaooffice.png"); // Carrega a imagem do botão de escritório
    this.load.image("buttonBusiness", "../assets/botaonegocios.png"); // Carrega a imagem do botão de negócios
    this.load.image("buttonPeople", "../assets/botaopessoas.png"); // Carrega a imagem do botão de pessoas
    this.load.image("buttonTech", "../assets/botaotech.png"); // Carrega a imagem do botão de tecnologia
    this.load.image("buttonRelations", "../assets/botaorelacoes.png"); // Carrega a imagem do botão de relações
    this.load.image("checkButton", "../assets/check.png"); // Carrega a imagem do check

    this.load.video("videoElev1", "../assets/videoelev1.mp4"); // Carrega o vídeo do elevador
    this.load.video("videoElev2", "../assets/videoelev2.mp4"); // Carrega o vídeo do elevador
    this.load.video("videoElev3", "../assets/videoelev3.mp4"); // Carrega o vídeo do elevador
    
    this.load.spritesheet("indicator", "../assets/exclamaçãoRoxa.png", { frameWidth: 254, frameHeight: 291 }); // Carrega a sprite do indicador
    this.load.spritesheet('player', `../assets/personagens/skinsPlayer/players/${this.selectedSpriteSheet}.png`, {frameWidth: 16,frameHeight: 32,});
    
    this.load.audio('elevatorAudio', '../assets/Local Forecast - Elevator [ ezmp3.co ].mp3'); // Carrega o áudio do elevador
   
    this.load.audio('buttonSound', '../assets/sounds/687107__aphom000__mouse-2-button-fast-click.wav'); // Carrega o áudio do botão
    this.load.audio('walkSound', '../assets/sounds/753292__vrymaa__footsteps-high-heels-hardwood-walk-run (mp3cut.net).wav'); // Carrega o áudio dos passos

  }

  create() {
    const width = this.scale.width; // Obtém a largura da tela
    const height = this.scale.height; // Obtém a altura da tela

    

    this.events.on("shutdown", this.shutdown, this); // Evento para quando a cena for encerrada
    this.events.on("pause", this.shutdown, this); // Evento para quando a cena for pausada
    this.buttonClick = this.sound.add('buttonSound', { loop: false, volume: 10 }); // Som do clique do botão
    this.walkSound = this.sound.add('walkSound', { loop: false, volume: 2 }); // Som dos passos do jogador
    this.elevatorSound = this.sound.add("elevatorAudio", { loop: true, volume: 0.5 }); // Inicia o áudio do elevador em loop
    this.sound.stopAll();
    this.elevatorSound.play(); // Toca o som do elevador
    if (!this.anims.exists("exclaiming")) { // Cria a animação do indicador, caso ainda não exista
      this.anims.create({
        key: "exclaiming", // Nome da animação
        frames: this.anims.generateFrameNumbers("indicator", { start: 0, end: 1 }), // Frames da animação
        frameRate: 3, // Taxa de quadros por segundo
        repeat: -1, // Repetição infinita
      });
    }

    this.cameras.main.fadeIn(1000); // Aplica um efeito de transição para a cena

    const backgrounds = ["backgroundElev"]; // Seleciona aleatoriamente uma das imagens de fundo carregadas
    const randomBackground = Phaser.Math.RND.pick(backgrounds); // Escolhe um fundo aleatório
    this.background = this.add.image(0, 0, randomBackground).setOrigin(0, 0); // Adiciona a imagem de fundo
    this.background.setDisplaySize(width, height); // Ajusta o tamanho da imagem ao tamanho da tela

    const videos = ["videoElev1", "videoElev2", "videoElev3"]; // Seleciona e reproduz aleatoriamente um dos vídeos carregados
    const randomVideo = Phaser.Math.RND.pick(videos); // Escolhe um vídeo aleatório
    this.video = this.add.video(width - 561, height - 594, randomVideo).setOrigin(0.5); // Adiciona o vídeo
    this.video.setDisplaySize(width / 45, height / 31); // Ajusta o tamanho do vídeo
    this.video.setAngle(32.7); // Define o ângulo do vídeo
    this.video.play(false); // Reproduz o vídeo sem loop
    this.video.on('complete', () => { // Quando o vídeo termina, carrega e reproduz outro vídeo aleatório
      const nextVideoKey = Phaser.Math.RND.pick(["../assets/videoelev1.mp4", "../assets/videoelev2.mp4", "../assets/videoelev3.mp4"]);
      this.video.loadURL(nextVideoKey); // Carrega o próximo vídeo
      this.video.play(false); // Reproduz o próximo vídeo
    });

    this.indicator = this.add.sprite(width - 955, height - 660, "indicator").setScale(0.3); // Adiciona a sprite do indicador
    this.indicator.play("exclaiming"); // Inicia a animação do indicador
    this.indicatorActive = true; // Define o indicador como ativo


    this.createPlayer(width, height); // Cria o jogador
    this.createPlayerAnimations(); // Cria as animações do jogador
    this.createButtonOffice(width, height); // Cria o botão do escritório
    this.createButtonPeople(width, height); // Cria o botão de pessoas
    this.createButtonStrategies(width, height); // Cria o botão de estratégias
    this.createButtonBusiness(width, height); // Cria o botão de negócios
    this.createButtonTech(width, height); // Cria o botão de tecnologia
    this.createButtonRelations(width, height); // Cria o botão de relações
    this.createBarriers(); // Cria as barreiras de colisão
    this.lastPosition = "up"; // Define a última posição do jogador como "cima"

    this.keys = this.input.keyboard.addKeys({ // Configuração do teclado (WASD + E para interação)
      up: Phaser.Input.Keyboard.KeyCodes.W, // Tecla W para cima
      down: Phaser.Input.Keyboard.KeyCodes.S, // Tecla S para baixo
      left: Phaser.Input.Keyboard.KeyCodes.A, // Tecla A para esquerda
      right: Phaser.Input.Keyboard.KeyCodes.D, // Tecla D para direita
      interagir: Phaser.Input.Keyboard.KeyCodes.E, // Tecla E para interação
      ENTER: Phaser.Input.Keyboard.KeyCodes.ENTER, // Tecla ENTER
    });

    this.physics.world.setBounds(0, 0, width, height); // Define os limites do mundo do jogo

    this.events.on("resume", () => {
      this.resetPlayerPosition(); // Reposiciona o jogador ao retornar
    });

    this.ready = true; // Define a cena como pronta para interação
  }

  update() {
    if (!this.ready || !this.player || !this.player.body) return;

    this.movePlayer(); // Atualiza a posição do jogador

    const width = this.scale.width; // Obtém a largura da tela
    const height = this.scale.height; // Obtém a altura da tela

    const closeToButtons =
      Math.abs(this.player.x - this.proximity.x) <= 50 && // Verifica a proximidade no eixo X
      Math.abs(this.player.y - this.proximity.y) <= 50;   // Verifica a proximidade no eixo Y

    if (closeToButtons) { // Se o jogador estiver próximo dos botões
      if (!this.panelElevShown) { // Se o painel do elevador ainda não foi mostrado      
      
        this.indicator.setVisible(false); // Esconde o indicador (apenas na primeira vez)
        this.panelElevShown = true; // Marca que o painel foi mostrado pelo menos uma vez
      }
      
      this.panelElev.setVisible(true); // Exibe o painel quando o jogador está próximo
      this.buttonOfficeEl.setVisible(true); // Exibe o botão do escritório quando o jogador está próximo
      this.check.setVisible(true); // Exibe o botão de check quando o jogador está próximo

      this.buttonPeople.setVisible(true); // Exibe o botão de pessoas quando o jogador está próximo
      if (this.checkPeopleActive && this.checkPeople) {
        this.checkPeople.setVisible(true);
      }

      this.buttonStrategies.setVisible(true); // Exibe o botão de estratégias quando o jogador está próximo
      if (this.checkStrategiesActive && this.checkStrategies) {
        this.checkStrategies.setVisible(true);
      }

      this.buttonBusiness.setVisible(true); // Exibe o botão de negócios quando o jogador está próximo
      if (this.checkBusinessActive && this.checkBusiness) {
        this.checkBusiness.setVisible(true);
      }

      this.buttonTech.setVisible(true); // Exibe o botão de tecnologia quando o jogador está próximo
      this.buttonRelations.setVisible(true); // Exibe o botão de relações quando o jogador está próximo

      this.player.setVisible(false);

    } else {
      this.panelElev.setVisible(false); // Esconde o painel quando o jogador está longe
      this.buttonOfficeEl.setVisible(false); // Esconde o botão do escritório quando o jogador está longe
      this.check.setVisible(false); // Exibe o botão de check quando o jogador está próximo

      this.buttonPeople.setVisible(false); // Esconde o botão de pessoas quando o jogador está longe
      if (this.checkPeople) {
        this.checkPeople.setVisible(false);
      }
      
      this.buttonStrategies.setVisible(false); // Esconde o botão de estratégias quando o jogador está longe
      if (this.checkStrategies) {
        this.checkStrategies.setVisible(false);
      }

      this.buttonBusiness.setVisible(false); // Esconde o botão de negócios quando o jogador está longe
      if (this.checkBusiness) {
        this.checkBusiness.setVisible(false);
      }

      this.buttonTech.setVisible(false); // Esconde o botão de tecnologia quando o jogador está longe
      this.buttonRelations.setVisible(false); // Esconde o botão de relações quando o jogador está longe

      if (!this.panelElevShown) { // O indicador só reaparece se o painel nunca foi mostrado
        this.indicator.setVisible(true); // Mostra o indicador novamente
      }

      this.player.setVisible(true);
    }

    if (this.resumeFromPessoas && this.buttonPeople && this.checkPeople) {
      const concluida = this.registry.get('vpPessoasConcluida') === true;
    
      if (concluida) {
        this.checkPeopleActive = true;
        this.buttonPeople.disableInteractive();
        // check só aparece quando estiver perto, o update já cuida disso
      }
    
      this.resumeFromPessoas = false; // reseta a flag
    }

    if (this.resumeFromStrategies && this.buttonStrategies && this.checkStrategies) {
      const concluida = this.registry.get('vpEstrategiaConcluida') === true;
    
      if (concluida) {
        this.checkStrategiesActive = true;
        this.buttonStrategies.disableInteractive();
        // check só aparece quando estiver perto, o update já cuida disso
      }
    
      this.resumeFromStrategies = false; // reseta a flag
    }

    if (this.resumeFromBusiness && this.buttonBusiness && this.checkBusiness) {
      const concluida = this.registry.get('vpBusinessConcluida') === true;
    
      if (concluida) {
        this.checkBusinessActive = true;
        this.buttonBusiness.disableInteractive();
        // check só aparece quando estiver perto, o update já cuida disso
      }
    
      this.resumeFromBusiness = false; // reseta a flag
    }
  }

  shutdown() {
    if (this.elevatorSound && this.elevatorSound.isPlaying) { // Para o áudio do elevador quando a cena termina ou é pausada
      this.elevatorSound.stop(); // Para o som do elevador
    }
  }

  movePlayer() {
    if (!this.player || !this.player.body) return;

    const speed = 150; // Define a velocidade de movimento do jogador
    let moving = false; // Variável para verificar se o jogador está se movendo
  
    if (this.keys.left.isDown) { // Verifica se a tecla "esquerda" está pressionada
      this.player.setVelocityX(-speed); // Move o jogador para a esquerda
      this.lastPosition = "left"; // Atualiza a última posição para "esquerda"
      this.player.anims.play("walk_left", true); // Reproduz a animação de andar para a esquerda
      moving = true; // Marca que o jogador está se movendo
    } else if (this.keys.right.isDown) { // Verifica se a tecla "direita" está pressionada
      this.player.setVelocityX(speed); // Move o jogador para a direita
      this.lastPosition = "right"; // Atualiza a última posição para "direita"
      this.player.anims.play("walk_right", true); // Reproduz a animação de andar para a direita
      moving = true; // Marca que o jogador está se movendo
    } else {
      this.player.setVelocityX(0); // Para o movimento horizontal do jogador
    }
  
    if (this.keys.up.isDown) { // Verifica se a tecla "cima" está pressionada
      this.player.setVelocityY(-speed); // Move o jogador para cima
      this.lastPosition = "up"; // Atualiza a última posição para "cima"
      this.player.anims.play("walk_up", true); // Reproduz a animação de andar para cima
      moving = true; // Marca que o jogador está se movendo
    } else if (this.keys.down.isDown) { // Verifica se a tecla "baixo" está pressionada
      this.player.setVelocityY(speed); // Move o jogador para baixo
      this.lastPosition = "down"; // Atualiza a última posição para "baixo"
      this.player.anims.play("walk_down", true); // Reproduz a animação de andar para baixo
      moving = true; // Marca que o jogador está se movendo
    } else {
      this.player.setVelocityY(0); // Para o movimento vertical do jogador
    }
    
    if (!moving) { // Se o jogador não está se movendo, reproduz a animação de "parado" correspondente
      switch (this.lastPosition) { // Verifica a última posição do jogador
        case "left":
          this.player.anims.play("stop_left", true); // Reproduz a animação de parado olhando para a esquerda
          break;
        case "right":
          this.player.anims.play("stop_right", true); // Reproduz a animação de parado olhando para a direita
          break;
        case "up":
          this.player.anims.play("stop_up", true); // Reproduz a animação de parado olhando para cima
          break;
        case "down":
        default:
          this.player.anims.play("stop_down", true); // Reproduz a animação de parado olhando para baixo
          break;
      }
      this.walkSound.stop(); // Para o som de passos
    } else {
      if (!this.walkSound.isPlaying) { // Verifica se o som de passos não está tocando
        this.walkSound.play(); // Reproduz o som de passos
      }
    }
  }

  createBarriers() {
    this.barrier = this.add.rectangle(width - 760, height - 40, 620, 120, 0xff0000, 0); // Cria uma barreira horizontal na parte inferior da tela
    this.physics.add.existing(this.barrier, true); // Adiciona física à barreira, tornando-a estática
    this.physics.add.collider(this.player, this.barrier); // Adiciona colisão entre o jogador e a barreira
    
    this.barrier1 = this.add.rectangle(width - 500, height - 20, 20, 1400, 0xff0000, 0); // Cria uma barreira vertical no lado direito da tela
    this.physics.add.existing(this.barrier1, true); // Adiciona física à barreira, tornando-a estática
    this.physics.add.collider(this.player, this.barrier1); // Adiciona colisão entre o jogador e a barreira

    this.barrier2 = this.add.rectangle(width - 1100, height - 20, 20, 1400, 0xff0000, 0); // Cria uma barreira vertical no lado esquerdo da tela
    this.physics.add.existing(this.barrier2, true); // Adiciona física à barreira, tornando-a estática
    this.physics.add.collider(this.player, this.barrier2); // Adiciona colisão entre o jogador e a barreira

    this.barrier3 = this.add.rectangle(width - 610, height - 610, 420, 20, 0xff0000, 0); // Cria uma barreira horizontal na parte superior da tela
    this.physics.add.existing(this.barrier3, true); // Adiciona física à barreira, tornando-a estática
    this.physics.add.collider(this.player, this.barrier3); // Adiciona colisão entre o jogador e a barreira
  }

  createPlayer(width, height) {
    this.player = this.physics.add.sprite(width / 2, height / 2, "player"); // Cria o sprite do jogador no centro da tela
    this.player.setScale(6); // Ajusta o tamanho do jogador
    this.player.setCollideWorldBounds(true); // Impede que o jogador saia dos limites do mundo
    
    this.physics.world.setBounds(0, 0, width, height); // Define os limites do mundo do jogo para colisões
  }

  cleanupScene() {
  // Remove event listeners
  this.input.keyboard.off('keydown-ENTER');
  this.input.off('pointerdown');

  // Stop any ongoing sounds
  if (this.elevatorSound && this.elevatorSound.isPlaying) {
    this.elevatorSound.stop();
  }
  if (this.indicatorSound && this.indicatorSound.isPlaying) {
    this.indicatorSound.stop();
  }
  if (this.walkSound && this.walkSound.isPlaying) {
    this.walkSound.stop();
  }

  // Stop animations
  if (this.indicator) {
    this.indicator.stop();
    this.indicator.destroy();
  }

  // Destroy UI elements
  if (this.panelElev) this.panelElev.destroy();
  if (this.buttonOfficeEl) this.buttonOfficeEl.destroy();
  if (this.buttonPeople) this.buttonPeople.destroy();
  if (this.buttonStrategies) this.buttonStrategies.destroy();
  if (this.buttonBusiness) this.buttonBusiness.destroy();
  if (this.buttonTech) this.buttonTech.destroy();
  if (this.buttonRelations) this.buttonRelations.destroy();

  // Destroy physics objects
  if (this.proximity) this.proximity.destroy();
  if (this.barrier) this.barrier.destroy();
  if (this.barrier1) this.barrier1.destroy();
  if (this.barrier2) this.barrier2.destroy();
  if (this.barrier3) this.barrier3.destroy();

  // Reset variables
  this.panelElevShown = false;
  this.indicatorActive = false;
}

  createPlayerAnimations() {
    this.anims.create({ // Cria a animação de andar para baixo
      key: "walk_down", // Nome da animação
      frames: this.anims.generateFrameNumbers("player", { start: 130, end: 135 }), // Define os frames da animação
      frameRate: 10, // Taxa de quadros por segundo
      repeat: -1, // Repetição infinita
    });

    this.anims.create({ // Cria a animação de andar para a direita
      key: "walk_right", // Nome da animação
      frames: this.anims.generateFrameNumbers("player", { start: 112, end: 117 }), // Define os frames da animação
      frameRate: 10, // Taxa de quadros por segundo
      repeat: -1, // Repetição infinita
    });

    this.anims.create({ // Cria a animação de andar para cima
      key: "walk_up", // Nome da animação
      frames: this.anims.generateFrameNumbers("player", { start: 118, end: 123 }), // Define os frames da animação
      frameRate: 10, // Taxa de quadros por segundo
      repeat: -1, // Repetição infinita
    });

    this.anims.create({ // Cria a animação de andar para a esquerda
      key: "walk_left", // Nome da animação
      frames: this.anims.generateFrameNumbers("player", { start: 124, end: 129 }), // Define os frames da animação
      frameRate: 10, // Taxa de quadros por segundo
      repeat: -1, // Repetição infinita
    });

    this.anims.create({ // Cria a animação de parado olhando para baixo
      key: "stop_down", // Nome da animação
      frames: this.anims.generateFrameNumbers("player", { start: 74, end: 79 }), // Define os frames da animação
      frameRate: 5, // Taxa de quadros mais lenta para animação de parado
      repeat: -1, // Repetição infinita
    });

    this.anims.create({ // Cria a animação de parado olhando para a direita
      key: "stop_right", // Nome da animação
      frames: this.anims.generateFrameNumbers("player", { start: 56, end: 61 }), // Define os frames da animação
      frameRate: 5, // Taxa de quadros mais lenta para animação de parado
      repeat: -1, // Repetição infinita
    });

    this.anims.create({ // Cria a animação de parado olhando para cima
      key: "stop_up", // Nome da animação
      frames: this.anims.generateFrameNumbers("player", { start: 62, end: 67 }), // Define os frames da animação
      frameRate: 5, // Taxa de quadros mais lenta para animação de parado
      repeat: -1, // Repetição infinita
    });

    this.anims.create({ // Cria a animação de parado olhando para a esquerda
      key: "stop_left", // Nome da animação
      frames: this.anims.generateFrameNumbers("player", { start: 68, end: 73 }), // Define os frames da animação
      frameRate: 5, // Taxa de quadros mais lenta para animação de parado
      repeat: -1, // Repetição infinita
    });
  }

  createButtonOffice(width, height) {
    this.panelElev = this.add.image(0, 0, "panelElev").setOrigin(0, 0); // Cria a imagem do painel do elevador
    this.panelElev.setDisplaySize(width, height); // Ajusta o tamanho do painel para caber na tela
    this.panelElev.setVisible(false); // Inicialmente esconde o painel

    this.indicator = this.add.sprite(width - 955, height - 660, "indicator").setScale(0.3); // Posiciona e escala o indicador
    this.indicator.play("exclaiming"); // Inicia a animação do indicador
    this.indicatorActive = true; // Marca o indicador como ativo
    
    this.buttonOfficeEl = this.add.image(width - 905, height - 160, "buttonOffice"); // Adiciona o botão interativo do escritório
    this.buttonOfficeEl.setInteractive(); // Torna o botão interativo
    this.buttonOfficeEl.setScale(1.2, 1.15); // Ajusta o tamanho do botão
    this.buttonOfficeEl.setVisible(false); // Inicialmente esconde o botão

    this.check = this.add.image(width - 905, height - 160, "checkButton"); // Adiciona o botão interativo do escritório
    this.check.setInteractive(); // Torna o botão interativo
    this.check.setScale(0.6); // Ajusta o tamanho do botão
    this.check.setVisible(false); // Inicialmente esconde o botão
    
    this.proximity = this.add.rectangle(width - 955, height - 650, 105, 70, 0xff0000, 0); // Adiciona um retângulo invisível para detectar proximidade
    this.physics.add.existing(this.proximity, true); // Adiciona física à área de proximidade

    /*this.buttonOfficeEl.on("pointerdown", () => { // Adiciona um evento de clique ao botão do escritório
      this.buttonClick.play(); // Toca o som de clique do botão
      this.scene.stop("elevadorScene"); // Para a cena atual
      this.scene.start("officeScene", {selectedSpriteSheet: this.selectedSpriteSheet,}); // Inicia a cena do escritório
    });*/
  }

  createButtonPeople(width, height) {
  const returnedVpPessoas = this.fromScene === "vpPessoasScene";
  const levelDone = this.registry.get('vpPessoasConcluida') === true;

  this.buttonPeople = this.add.image(width - 620, height - 160, "buttonPeople");
  this.buttonPeople.setInteractive();
  this.buttonPeople.setScale(1.2, 1.15);
  this.buttonPeople.setVisible(false);

  this.checkPeople = this.add.image(width - 620, height - 160, "checkButton");
  this.checkPeople.setScale(0.6);
  this.checkPeople.setVisible(false); // Por padrão, invisível
  this.checkPeopleActive = (this.fromScene === "vpPessoasScene" && this.registry.get('vpPessoasConcluida'));

  // Se voltou da VP Pessoas e ela está marcada como concluída, mostra o check
  if (returnedVpPessoas && levelDone) {
    this.checkPeople.setVisible(true);
    this.buttonPeople.disableInteractive();
  }

  if (!levelDone) {
    this.buttonPeople.on("pointerdown", () => {
      this.buttonClick.play();
      this.shutdown();
      this.scene.pause("elevadorScene");
      this.scene.launch("vpPessoasScene", { selectedSpriteSheet: this.selectedSpriteSheet });
    });
  }
}

  createButtonStrategies(width, height) {
    const returnedVpStrategies = this.fromScene === "VpEstrategiaScene";
    const levelDone = this.registry.get('vpEstrategiaConcluida') === true;

    this.buttonStrategies = this.add.image(0, 0, "buttonStrategies").setOrigin(0, 0); // Cria o botão de Estratégias
    this.buttonStrategies.setVisible(false); // Inicialmente esconde o botão

    this.buttonStrategies = this.add.image(width - 620, height - 392, "buttonStrategies"); // Posiciona o botão
    this.buttonStrategies.setInteractive(); // Torna o botão interativo
    this.buttonStrategies.setScale(1.2, 1.15); // Ajusta o tamanho do botão
    this.buttonStrategies.setVisible(false); // Inicialmente esconde o botão

    this.checkStrategies = this.add.image(width - 620, height - 392, "checkButton");
    this.checkStrategies.setScale(0.6);
    this.checkStrategies.setVisible(false); // Por padrão, invisível
    this.checkStrategiesActive = (this.fromScene === "VpEstrategiaScene" && this.registry.get('vpEstrategiaConcluida'));

    if (returnedVpStrategies && levelDone) {
      this.checkStrategies.setVisible(true);
      this.buttonStrategies.disableInteractive();
    }

    if (!levelDone) {
      this.buttonStrategies.on("pointerdown", () => {
        this.buttonClick.play();
        this.shutdown();
        this.scene.pause("elevadorScene");
        this.scene.launch("VpEstrategiaScene", { selectedSpriteSheet: this.selectedSpriteSheet });
      });
    }
  }

  createButtonBusiness(width, height) {
    const returnedVpBusiness = this.fromScene === "vpNegociosScene";
    const levelDone = this.registry.get('vpBusinessConcluida') === true;

    this.buttonBusiness = this.add.image(0, 0, "buttonBusiness").setOrigin(0, 0); // Cria o botão de Negócios
    this.buttonBusiness.setVisible(false); // Inicialmente esconde o botão

    this.buttonBusiness = this.add.image(width - 910, height - 393, "buttonBusiness"); // Posiciona o botão
    this.buttonBusiness.setInteractive(); // Torna o botão interativo
    this.buttonBusiness.setScale(1.2, 1.15); // Ajusta o tamanho do botão
    this.buttonBusiness.setVisible(false); // Inicialmente esconde o botão

    this.checkBusiness = this.add.image(width - 910, height - 393, "checkButton");
    this.checkBusiness.setScale(0.6);
    this.checkBusiness.setVisible(false); // Por padrão, invisível
    this.checkBusinessActive = (this.fromScene === "vpNegociosScene" && this.registry.get('vpBusinessConcluida'));

    if (returnedVpBusiness && levelDone) {
      this.checkBusiness.setVisible(true);
      this.buttonBusiness.disableInteractive();
    }

    if (!levelDone) {
      this.buttonBusiness.on("pointerdown", () => {
        this.buttonClick.play();
        this.shutdown();
        this.scene.pause("elevadorScene");
        this.scene.launch("vpNegociosScene", { selectedSpriteSheet: this.selectedSpriteSheet });
      });
    }
  }

  createButtonTech(width, height) {
    this.buttonTech = this.add.image(0, 0, "buttonTech").setOrigin(0, 0); // Cria o botão de Tecnologia
    this.buttonTech.setVisible(false); // Inicialmente esconde o botão

    this.buttonTech = this.add.image(width - 906, height - 602, "buttonTech"); // Posiciona o botão
    this.buttonTech.setInteractive(); // Torna o botão interativo
    this.buttonTech.setScale(1.2, 1.15); // Ajusta o tamanho do botão
    this.buttonTech.setVisible(false); // Inicialmente esconde o botão

    this.buttonTech.on("pointerdown", () => { // Adiciona um evento de clique ao botão de Tecnologia
      this.buttonClick.play(); // Toca o som de clique do botão
      this.shutdown(); // Finaliza a cena atual
      this.scene.stop("elevadorScene"); // Para a cena atual
      this.scene.start("vpTecnologiaScene", {selectedSpriteSheet: this.selectedSpriteSheet,}); // Inicia a cena de Tecnologia
    });
  }

  createButtonRelations(width, height) {
    this.buttonRelations = this.add.image(0, 0, "buttonRelations").setOrigin(0, 0); // Cria o botão de Relações
    this.buttonRelations.setVisible(false); // Inicialmente esconde o botão

    this.buttonRelations = this.add.image(width - 610, height - 605, "buttonRelations"); // Posiciona o botão
    this.buttonRelations.setInteractive(); // Torna o botão interativo
    this.buttonRelations.setScale(1.2, 1.15); // Ajusta o tamanho do botão
    this.buttonRelations.setVisible(false); // Inicialmente esconde o botão

    this.buttonRelations.on("pointerdown", () => { // Adiciona um evento de clique ao botão de Relações
      this.buttonClick.play(); // Toca o som de clique do botão
      
    // Call cleanup logic
      this.cleanupScene();
      
      this.shutdown(); // Finaliza a cena atual
      this.scene.stop("elevadorScene"); // Para a cena atual
      this.scene.start("VpRelacoesScene", {selectedSpriteSheet: this.selectedSpriteSheet,}); // Inicia a cena de Relações
    });
  }

  resetPlayerPosition() {
    // Destroi o player antigo se existir
    if (this.player) {
      this.player.destroy();
    }

    // Cria novo player
    this.player = this.physics.add.sprite(width / 2, height / 2, "player");
    this.player.setScale(6);
    this.player.setCollideWorldBounds(true);

    // Reaplica colisões
    if (this.barrier) this.physics.add.collider(this.player, this.barrier);
    if (this.barrier1) this.physics.add.collider(this.player, this.barrier1);
    if (this.barrier2) this.physics.add.collider(this.player, this.barrier2);
    if (this.barrier3) this.physics.add.collider(this.player, this.barrier3);
  }
}
