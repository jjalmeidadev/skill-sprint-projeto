class OfficeScene extends Phaser.Scene {
  constructor() {
    super({ key: "officeScene" });
    this.canMove = true;
  }

  preload() {
    // Carrega imagens, spritesheets e demais ativos
    this.load.spritesheet("player", "../assets/personagens/skinsPlayer/player1all.png", {
      frameWidth: 16,
      frameHeight: 32,
    });

    this.load.spritesheet("npc7", "../assets/personagens/npc7.png", { 
      frameWidth: 16,
      frameHeight: 32,
    });

    this.load.spritesheet("npc3", "../assets/personagens/npc3Sit.png", { 
      frameWidth: 16,
      frameHeight: 32,
    });

    this.load.spritesheet("npc4", "../assets/personagens/npc4Sit.png", { 
      frameWidth: 16,
      frameHeight: 32,
    });

    this.load.spritesheet("npc2", "../assets/personagens/npc2Sit.png", { 
      frameWidth: 16,
      frameHeight: 32,
    });

    this.load.spritesheet("npc6", "../assets/personagens/npc6Sit.png", { 
      frameWidth: 16,
      frameHeight: 32,
    });

    this.load.spritesheet("npc10", "../assets/personagens/npc10Lift.png", { 
      frameWidth: 16,
      frameHeight: 32,
    });

    this.load.image("telaComputador", "../assets/tela_computador.png");
    this.load.image("computador", "../assets/computador.png");
    this.load.spritesheet("indicator", "../assets/exclamaçãoRoxa.png", {frameWidth: 254, frameHeight: 305,});

    // Carrega o mapa do Tiled e os tilesets
    this.load.tilemapTiledJSON("escritorio","../assets/mapaOffice/mapaOffice.json");

    this.load.image("decoracao", "../assets/mapaOffice/decoracao.png");
    this.load.image("paredes", "../assets/mapaOffice/paredes.png");
    this.load.image("personalizado_vivo", "../assets/mapaOffice/personalizado_vivo.png");
      
    // Demais ativos
    this.load.image("vivita", "../assets/personagens/vivita.png");
    this.load.image("balaoTexto", "../assets/balaoTexto.png");
    this.load.image('keyE', '../assets/teclaE.png');  

    // Carrega o áudio da cena do escritório
    this.load.audio("officeMusic", "../assets/0320(1).MP3");
    this.load.audio('keySound', '../assets/sounds/computer-keyboard-typing-290582 (mp3cut.net).mp3');
    this.load.audio('indicatorSound', '../assets/sounds/497198_abacagi_bubble-pops (mp3cut.net).wav');
    this.load.audio('walkSound', '../assets/sounds/753292__vrymaa__footsteps-high-heels-hardwood-walk-run (mp3cut.net).wav');

    
  }

  create() {
    //skip elevador
   /* this.scene.start("elevadorScene");
    return;*/

    if (this.walkSound && this.walkSound.isPlaying) {
      this.walkSound.stop();
  }

    const width = this.scale.width;
    const height = this.scale.height;

    // Transição suave
    this.cameras.main.fadeIn(1000);

    // Carrega os efeitos sonoros
    this.buttonClick = this.sound.add('buttonSound', {loop: false, volume: 10});
    this.indicatorSound = this.sound.add('indicatorSound', {loop: true, volume: 1.5});
    this.walkSound = this.sound.add('walkSound', {loop: false, volume: 2});

    // Cria e inicia a música; se houver um tempo salvo, retoma a partir dele
    const startTime = OfficeScene.lastMusicTime || 0;
    this.officeMusic = this.sound.add("officeMusic", { loop: true });
    this.officeMusic.play({ seek: startTime });

    // Se a cena for pausada ou finalizada, salva o tempo atual e para a música
    this.events.on("shutdown", this.onShutdown, this);
    this.events.on("pause", this.onShutdown, this);

    //cria a animação
    this.anims.create({
      key: "exclamando",
      frames: this.anims.generateFrameNumbers("indicator", {start: 0, end: 1}),
      //velocidade da animação
      frameRate: 3,
      repeat: -1,
    });

    // Configuração do teclado
    this.teclas = this.input.keyboard.addKeys({
      up: Phaser.Input.Keyboard.KeyCodes.W,
      down: Phaser.Input.Keyboard.KeyCodes.S,
      left: Phaser.Input.Keyboard.KeyCodes.A,
      right: Phaser.Input.Keyboard.KeyCodes.D,
      interagir: Phaser.Input.Keyboard.KeyCodes.E,
      ENTER: Phaser.Input.Keyboard.KeyCodes.ENTER,
    });

    // Cria o mapa e as camadas
    const map = this.make.tilemap({key: "escritorio", tileWidth: 25, tileHeight: 20});
    const tileset1 = map.addTilesetImage("decoracao");
    const tileset2 = map.addTilesetImage("paredes");
    const tileset3 = map.addTilesetImage("personalizado_vivo");

    //Cria as camadas
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

    //Ativa as colisões com base na propriedade 'collider' para todas as camadas
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

    // Cria os elementos da cena
    this.addVivita(width, height);
    this.createComputer(width, height);
    this.createPlayer(width, height);
    this.createPlayerAnimations();
    this.addNpc();
    this.createNpcAnimations();
    this.lastPosition = "down"

    // Configura colisões do jogador com camadas selecionadas
    this.physics.add.collider(this.player, layer3);
    this.physics.add.collider(this.player, layer7);
    this.physics.add.collider(this.player, layer8);
    this.physics.add.collider(this.player, layer9);
    this.physics.add.collider(this.player, layer10);
    this.physics.add.collider(this.player, layer11);
    this.physics.add.collider(this.player, this.npc7);

    // Define os limites do mundo com base na tela
    this.physics.world.setBounds(0, 0, width, height);

    // Texto para depuração, exibindo as coordenadas do jogador
    this.coordText = this.add.text(20, 20, "", {
      fontSize: "16px",
      fill: "#ffffff",
    });
  }

  onShutdown() {
    // Salva o tempo atual da música e a para quando a cena é pausada ou encerrada
    if (this.officeMusic && this.officeMusic.isPlaying) {
      OfficeScene.lastMusicTime = this.officeMusic.seek;
      this.officeMusic.stop();
    }
  }

  update() {
    this.movePlayer();

    // Se o jogador retornou da sala do líder, cria o botão do elevador
    if (this.returnedFromSalaLider && this.blockLoop === 0) {
      this.createButtonCima();
    }

    if(this.indicatorActive == false) {
      this.indicatorSound.stop();
    }

    // COMPUTADOR
    if (this.computer) {
      const distComputer = Phaser.Math.Distance.Between(
        this.player.x, this.player.y,
        this.computer.x, this.computer.y
      );
      this.canInteractWithComputer = distComputer < 100;

      if (distComputer >= 100 && this.keyEComputer) {
        this.keyEComputer.destroy();
        this.keyEComputer = null;
      }
    }

    // INTERAÇÃO COMPUTADOR
    if (this.canInteractWithComputer && Phaser.Input.Keyboard.JustDown(this.teclas.interagir)) {
      this.buttonClick = this.sound.add('buttonSound', { loop: false, volume: 10 });
      this.buttonClick.play();
      this.scene.pause();
      this.scene.launch('curriculoScene');
    }
  }

  movePlayer() {
    const velocidade = 150;
    let movendo = false;
  
    if (this.teclas.left.isDown) {
      this.player.setVelocityX(-velocidade);
      this.lastPosition = "left"; 
      this.player.anims.play("walk_left", true);
      movendo = true;
    } else if (this.teclas.right.isDown) {
      this.player.setVelocityX(velocidade);
      this.lastPosition = "right";
      this.player.anims.play("walk_right", true);
      movendo = true;
    } else {
      this.player.setVelocityX(0);
    }
  
    if (this.teclas.up.isDown) {
      this.player.setVelocityY(-velocidade);
      this.lastPosition = "up";
      this.player.anims.play("walk_up", true);
      movendo = true;
    } else if (this.teclas.down.isDown) {
      this.player.setVelocityY(velocidade);
      this.lastPosition = "down";
      this.player.anims.play("walk_down", true);
      movendo = true;
    } else {
      this.player.setVelocityY(0);
    }
  
    // Se o personagem parou, inicia a animação de stop_* em loop
    if (!movendo) {
      switch (this.lastPosition) {
        case "left":
          this.player.anims.play("stop_left", true);
          break;
        case "right":
          this.player.anims.play("stop_right", true);
          break;
        case "up":
          this.player.anims.play("stop_up", true);
          break;
        case "down":
        default:
          this.player.anims.play("stop_down", true);
          break;
      }
      this.walkSound.stop();
    } else {
      if (!this.walkSound.isPlaying) {
        this.walkSound.play();
      }
    }
  }

  createPlayer(width, height) {
    this.player = this.physics.add.sprite(width - 405, height - 100, "player");
    this.player.setScale(2);
  }

  createPlayerAnimations() {
    this.anims.create({
      key: "walk_down",
      frames: this.anims.generateFrameNumbers("player", { start: 130, end: 135 }),
      frameRate: 10,
      repeat: -1,
    });
    this.anims.create({
      key: "walk_right",
      frames: this.anims.generateFrameNumbers("player", { start: 112, end: 117 }),
      frameRate: 10,
      repeat: -1,
    });
    this.anims.create({
      key: "walk_up",
      frames: this.anims.generateFrameNumbers("player", { start: 118, end: 123 }),
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
      key: "stop_down",
      frames: this.anims.generateFrameNumbers("player", { start: 74, end: 79 }), 
      frameRate: 5, // Mais lento
      repeat: -1, // Loop infinito
    });
    this.anims.create({
      key: "stop_right",
      frames: this.anims.generateFrameNumbers("player", { start: 56, end: 61 }),
      frameRate: 5,
      repeat: -1,
    });
    this.anims.create({
      key: "stop_up",
      frames: this.anims.generateFrameNumbers("player", { start: 62, end: 67 }),
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

  createButtonCima() {
    this.blockLoop = 1;

    this.exclamacao = this.physics.add.sprite(width - 435, height - 700, "indicator").setScale(0.2);
    this.exclamacao.setImmovable(true);
    this.exclamacao.play("exclamando");
    this.indicatorActive = true;
    if(this.indicatorActive) {
        this.indicatorSound.play();
    }

    this.bgelevoffice = this.add.image(0, 0, "bgElevOffice").setOrigin(0, 0);
    this.bgelevoffice.setDisplaySize(width, height);
    this.painelelev = this.add.image(width - 910, height - 600, "painelelev").setOrigin(0, 0);
    this.bgelevoffice.setVisible(false);
    this.painelelev.setVisible(false);

    this.botaoCima = this.add.image(width - 680, height - 400, "botaoElevOffice"); 
  
    this.botaoCima.setInteractive();
    this.botaoCima.setScale(1);
    this.botaoCima.setVisible(false);

    this.botaoCima.on("pointerdown", () => {
      // Troca para a cena 'elevadorScene' – nesse caso, o OfficeScene será encerrada
      this.scene.stop("officeScene");
      this.scene.start("elevadorScene");
    });

    // Ao sobrepor o jogador na exclamação, vamos chamar onShutdown() antes de mudar para 'buttonElevatorScene'
    this.physics.add.overlap(this.player, this.exclamacao, () => {
      this.indicatorActive = false;
      this.onShutdown(); // Salva o tempo e para a música
      this.scene.switch("buttonElevatorScene");
    });
  }

  createComputer(width, height) {
    this.computador = this.add.image(width - 1020, height - 100, "computador").setScale(0.09);
    this.computador.setInteractive();
    this.computador.setFlipX(true);
  }

  addComputer() {
    const computer = this.physics.add.image(width - 1020, height - 100, "computador").setScale(0.09);
    computer.setInteractive();
    computer.setFlipX(true);
    this.createIndicatorComputer();

    // Apenas overlap é necessário para ativar a possibilidade de interação
    this.physics.add.overlap(this.player, computer, () => {
      this.canInteractWithComputer = true;
    
      if (!this.keyEComputer) {
        this.keyEComputer = this.add.image(width - 1020, height - 150, 'keyE').setScale(0.2);
      }
    });
  
    // Detectar quando sai da zona de interação (usando evento de update com verificação de distância)
    this.computer = computer; // Salva o objeto para usar no update
  }

  createIndicatorComputer() {
    this.indicatorComputer = this.physics.add.sprite(width - 1020, height - 150, 'indicator');
    this.indicatorComputer.setScale(0.2);
    this.indicatorComputer.setImmovable(true);
    this.indicatorComputer.play("exclamando");
  
    this.indicatorSoundComputer = this.sound.add('indicatorSound', { loop: true, volume: 10 });
    this.indicatorSoundComputer.play();
  
    this.physics.add.overlap(this.player, this.indicatorComputer, () => {
      if (this.indicatorComputerActive) {
        this.indicatorSoundComputer.stop();
        this.indicatorComputer.destroy();
        this.indicatorComputerActive = false;
      }
    });
  
    this.indicatorComputerActive = true;
  }

  addNpc() {
    //Adiciona a npc no jogo
    this.npc7 = this.physics.add.sprite(width - 950, height - 200, 'npc7');
    this.npc7.setScale(2.0);
    this.npc7.setImmovable(true);
    this.createNpcAnimations();
    this.npc7.anims.play('Idle');

    this.npc3 = this.physics.add.sprite(width - 895, height - 105, 'npc3');
    this.npc3.setScale(2.0);
    this.npc3.setImmovable(true);
    this.createNpcAnimations();
    this.npc3.anims.play('npc3');

    this.npc4 = this.physics.add.sprite(width - 767, height - 105, 'npc4');
    this.npc4.setScale(2.0);
    this.npc4.setImmovable(true);
    this.createNpcAnimations();
    this.npc4.setFlipX(true);
    this.npc4.anims.play('npc4');

    this.npc2 = this.physics.add.sprite(width - 655, height - 145, 'npc2');
    this.npc2.setScale(2.0);
    this.npc2.setImmovable(true);
    this.createNpcAnimations();
    this.npc2.anims.play('npc2');

    this.npc6 = this.physics.add.sprite(width - 1135, height - 145, 'npc6');
    this.npc6.setScale(2.0);
    this.npc6.setImmovable(true);
    this.createNpcAnimations();
    this.npc6.anims.play('npc6');

    this.npc10 = this.physics.add.sprite(width - 710, height - 200, 'npc10');
    this.npc10.setScale(2.0);
    this.npc10.setImmovable(true);
    this.createNpcAnimations();
    this.npc10.anims.play('npc10');
  }

  createNpcAnimations() { 
    this.anims.create({
      key: "Idle",
      frames: this.anims.generateFrameNumbers('npc7', { start: 18, end: 23 }),
      frameRate: 4,
      repeat: -1,
    });

    this.anims.create({
      key: "npc3",
      frames: this.anims.generateFrameNumbers('npc3', { start: 6, end: 11 }),
      frameRate: 4,
      repeat: -1,
    });

    this.anims.create({
      key: "npc4",
      frames: this.anims.generateFrameNumbers('npc4', { start: 6, end: 11 }),
      frameRate: 4,
      repeat: -1,
    });

    this.anims.create({
      key: "npc2",
      frames: this.anims.generateFrameNumbers('npc2', { start: 6, end: 11 }),
      frameRate: 4,
      repeat: -1,
    });

    this.anims.create({
      key: "npc6",
      frames: this.anims.generateFrameNumbers('npc6', { start: 6, end: 11 }),
      frameRate: 4,
      repeat: -1,
    });

    this.anims.create({
      key: "npc10",
      frames: this.anims.generateFrameNumbers('npc10', { start: 42, end: 55 }),
      frameRate: 6,
      repeat: -1,
    });

    this.anims.create({
      key: "vivita",
      frames: this.anims.generateFrameNumbers('vivita', { start: 18, end: 23 }),
      frameRate: 6,
      repeat: -1,
    });
  }

  
  addVivita(width, height) {
    const vivita = this.vivita = this.physics.add.sprite(width / 1.75, height / 3.2, 'vivita');
      this.vivita.setScale(2.0);
      this.vivita.setImmovable(true);
      this.createNpcAnimations();
      this.vivita.anims.play('vivita');

    this.exclamation = this.add.sprite(width / 1.75, height / 4.6, "indicator").setScale(0.2);
    this.exclamation.play("exclamando");
    this.indicatorActive = true;
    if(this.indicatorActive) {  
      this.indicatorSound.play();
      this.walkSound.stop();
    } 

    vivita.setInteractive();
    vivita.on("pointerdown", () => {
      this.showVivitaInteraction();
    });

    this.input.keyboard.on('keydown-E', () => {
      this.indicatorActive = false;
      if (
        Math.abs(this.player.x - vivita.x) <= 50 &&
        Math.abs(this.player.y - vivita.y) <= 50 &&
        !this.vivitaInteracted
      ) {
        this.showVivitaInteraction();
        this.vivitaInteracted = true;
        this.buttonClick.play();
      }
    });
  }
  showVivitaInteraction() {
    this.exclamation.setVisible(false);

    const speechVivita = [
      "Olá! Você deve ser " + playerName + ", né?",
      "Fiquei sabendo que você quer mudar de carreira na Vivo.",
      "Vou te explicar o primeiro passo.",
      "Primeiro, você precisa criar o seu currículo.",
      "Vá até o computador no escritório.",
      "Preencha seu currículo e depois entregue-o na sala do líder.",
      "Boa sorte!",
    ];

    const width = this.scale.width;
    const height = this.scale.height;
    const balaoTexto = this.add.image(width / 1.55, height / 4.8, "balaoTexto");
    const text = this.add.text(width / 1.68, height / 7, speechVivita[0], {
      fontSize: "16px",
      fill: "#000000",
      wordWrap: { width: balaoTexto.width - 20 },
    });

    let currentSpeechIndex = 0;
    this.input.keyboard.on("keydown-ENTER", () => {
      currentSpeechIndex++;
      if (currentSpeechIndex < speechVivita.length) {
        text.setText(speechVivita[currentSpeechIndex]);
        this.buttonClick.play();
      } else {
        balaoTexto.setVisible(false);
        text.setVisible(false);
        this.input.keyboard.off("keydown-ENTER");
        this.addComputer();
      }
    });
  }

  salaLider() {
    if (this.inTransition) return;

    const width = this.scale.width;
    const height = this.scale.height;

    this.exclamation = this.physics.add.sprite(width - 1200, height - 500, 'indicator').setScale(0.2);
    this.exclamation.play('exclamando');
    
    this.indicatorActive = true;
    this.indicatorSound = this.sound.add('indicatorSound', {loop: true, volume: 1.5});
    this.indicatorSound.play();

    this.physics.add.overlap(this.player, this.exclamation, () => {
        if (!this.inTransition) {
            this.inTransition = true;
            this.returnedFromSalaLider = true;
            this.blockLoop = 0;
            this.exclamation.setVisible(false);
            this.indicatorActive = false;
            this.indicatorSound.stop(); // Para o som quando há overlap
            this.scene.switch('salaLiderScene');
        }
    }); 
  }

  resume() {
    if (this.keyEComputer) {
      this.keyEComputer.destroy();
      this.keyEComputer = null;
    }
  }
}

// Propriedade estática para armazenar o tempo de reprodução da música
OfficeScene.lastMusicTime = 0;
