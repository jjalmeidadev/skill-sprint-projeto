class OfficeScene extends Phaser.Scene {
  constructor() {
    // Chama o construtor da classe Phaser.Scene com a chave 'officeScene'
    super({ key: 'officeScene' });
   // this.currentBackground = 'background'; // Estado inicial
    this.canMove = true; // Controla se o jogador pode se mover
  }

  preload() {
    // Carrega as imagens e spritesheets necessárias para a cena
    this.load.image('background', '../assets/mapaJogoVivo.png');
    this.load.spritesheet('player', '../assets/Player.png', { frameWidth: 32, frameHeight: 32 });
    this.load.image('telaComputador', '../assets/tela_computador.png');
    this.load.image('computador', '../assets/computador.png');
    this.load.spritesheet('indicator', '../assets/spriteexclamação.png',{ frameWidth:254, frameHeight: 291 });

    this.load.image('botaoElevOffice', '../assets/botaocimaelevador.png');
    this.load.image('bgElevOffice', '../assets/bgelevadoroffice.png');
    this.load.image('painelelev', '../assets/painelelevador.png');

    this.load.tilemapTiledJSON('escritorio', '../assets/mapaJogoVivo/mapaJogoVivo.json');
    this.load.image('decoracao', '../assets/mapaJogoVivo/decoracao.png');
    this.load.image('paredes', '../assets/mapaJogoVivo/paredes.png');
    this.load.image('personalizado_vivo', '../assets/mapaJogoVivo/personalizado_vivo.png');

    this.load.image('vivita', '../assets/vivita.png');
    this.load.image('balaoTexto', '../assets/balaoTexto.png');
  }

  create() {
    this.cameras.main.fadeIn(1000); // Transição suave

    //cria a animação
    this.anims.create({
      key: 'exclamando',
      frames: this.anims.generateFrameNumbers('indicator', { start: 0, end: 1 }),
      //velocidade da animação
      frameRate: 3,
      repeat: -1
    });

        // Configuração do teclado (WASD + E para interação)
        this.teclas = this.input.keyboard.addKeys({
            up: Phaser.Input.Keyboard.KeyCodes.W,
            down: Phaser.Input.Keyboard.KeyCodes.S,
            left: Phaser.Input.Keyboard.KeyCodes.A,
            right: Phaser.Input.Keyboard.KeyCodes.D,
            interagir: Phaser.Input.Keyboard.KeyCodes.E,
        });

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


        // Cria a tela do computador, o computador e o indicador de exclamação
        this.addVivita();
        this.createComputer();
        //this.addIndicatorAndComputer();
        this.createPlayer();
        this.createPlayerAnimations();
        this.createButtonCima();

        this.physics.add.collider(this.player, layer5);
        //this.physics.add.collider(this.player, layer6);
        this.physics.add.collider(this.player, layer7);
        this.physics.add.collider(this.player, layer8);
        
        // Adicionar limites para o mundo do jogo
        this.physics.world.setBounds(0, 0, window.innerWidth, window.innerHeight);

        // Criar texto para coordenadas (debug)
        this.coordText = this.add.text(20, 20, "", {
      fontSize: "16px",
      fill: "#ffffff",
    });
    }

  update() {
    // Atualiza a posição do jogador a cada frame
    this.movePlayer();

    // Verifica se a tecla E foi pressionada e o jogador está perto do computador
    if (Phaser.Input.Keyboard.JustDown(this.teclas.interagir)) {
      if (
        Math.abs(this.player.x - this.computador.x) <= 50 &&
        Math.abs(this.player.y - this.computador.y) <= 50
      ) {
        this.showComputerScreen();
      }
    }

    // Atualizar coordenadas na tela
    this.coordText.setText(
      `X: ${Math.round(this.player.x)}, Y: ${Math.round(this.player.y)}`
    );

    // Verificar proximidade do jogador ao objeto invisível
    if (
      Math.abs(this.player.x - this.proximidade.x) <= 50 &&
      Math.abs(this.player.y - this.proximidade.y) <= 50
    ) {
      this.botaoCima.setVisible(true);
      this.bgelevoffice.setVisible(true);
      this.painelelev.setVisible(true);
    } else {
      this.botaoCima.setVisible(false);
      this.bgelevoffice.setVisible(false);
      this.painelelev.setVisible(false);
    }
  }

  movePlayer() {
    let velocidade = 150;
    let movendo = false;

    // Movimentação do player com WASD
    if (this.teclas.left.isDown) {
      this.player.setVelocityX(-velocidade);
      this.player.anims.play("walk_left", true);
      this.player.setFlipX(true); // Virar para a esquerda
      movendo = true;
    } else if (this.teclas.right.isDown) {
      this.player.setVelocityX(velocidade);
      this.player.anims.play("walk_right", true);
      this.player.setFlipX(false); // Manter normal para direita
      movendo = true;
    } else {
      this.player.setVelocityX(0);
    }

    if (this.teclas.up.isDown) {
      this.player.setVelocityY(-velocidade);
      this.player.anims.play("walk_up", true);
      movendo = true;
    } else if (this.teclas.down.isDown) {
      this.player.setVelocityY(velocidade);
      this.player.anims.play("walk_down", true);
      movendo = true;
    } else {
      this.player.setVelocityY(0);
    }

    if (!movendo) {
      this.player.anims.stop();
    }
  }

  createPlayer() {
    // Criar jogador
    this.player = this.physics.add.sprite(width - 405, height - 100, 'player');
    this.player.setScale(2.5);
    //this.player.setCollideWorldBounds(true);
  }

  createPlayerAnimations() {
    // Animações do player
    this.anims.create({
      key: "walk_down",
      frames: this.anims.generateFrameNumbers("player", { start: 0, end: 5 }),
      frameRate: 10,
      repeat: -1,
    });

    this.anims.create({
      key: "walk_right",
      frames: this.anims.generateFrameNumbers("player", { start: 6, end: 11 }),
      frameRate: 10,
      repeat: -1,
    });

    this.anims.create({
      key: "walk_up",
      frames: this.anims.generateFrameNumbers("player", { start: 12, end: 17 }),
      frameRate: 10,
      repeat: -1,
    });

    this.anims.create({
      key: "walk_left",
      frames: this.anims.generateFrameNumbers("player", { start: 6, end: 11 }),
      frameRate: 10,
      repeat: -1,
    });
  }

  createButtonCima() {
      // Adiciona o botão 'Cima' na posição especificada
      this.bgelevoffice = this.add.image(0, 0, "bgElevOffice").setOrigin(0, 0);
      this.bgelevoffice.setDisplaySize(window.innerWidth, window.innerHeight);
      this.painelelev = this.add.image(510, 90, "painelelev").setOrigin(0, 0);
      this.bgelevoffice.setVisible(false);
      this.painelelev.setVisible(false);

      // Adiciona o botão 'Ajustes' na posição especificada
      const botaoCima = (this.botaoCima = this.add.image(680, 200, "botaoElevOffice"));
      this.botaoCima.setInteractive(); // Torna o botão interativo (clicável)
      this.botaoCima.setScale(1); // Ajusta o tamanho do botão
      this.botaoCima.setVisible(false);

      // Adiciona um objeto invisível para verificar a proximidade
      this.proximidade = this.add.rectangle(1250, 40, 10, 10, 0xff0000, 0);
      this.physics.add.existing(this.proximidade, true);

      botaoCima.on("pointerdown", () => {
        this.scene.stop("officeScene");
        this.scene.start('elevadorScene');
      });
    }

  createComputer() {
    // Criar tela do computador mas deixá-la invisível no início
    this.computador = this.add.image(width - 1020, height - 100, 'computador').setScale(0.09);
    this.computador.setFlipX(true);
  }

  addIndicatorAndComputer() {
    // Criar indicator de exclamação sobre o computador
    this.indicator = this.add.sprite(width - 1020, height - 150, 'indicator').setScale(0.2);
    this.indicator.play('exclamando'); // Inicia a animação
    this.indicatorActive = true;

    // Criar o computador na posição original
    this.computador = this.add.image(width - 1020, height - 100, 'computador').setScale(0.09).setInteractive();
    this.computador.setFlipX(true);

    // Tornar o computador interativo
    this.computador.on("pointerover", () => {
      this.computador.setTint(0xaaaaaa);
    });

    this.computador.on("pointerout", () => {
      this.computador.clearTint();
    });

    // Adicionar evento de clique no computador
    this.computador.on("pointerdown", () => {
      this.showComputerScreen();
    });
  }

  showComputerScreen() {
    // Mostrar a tela do computador
    this.scene.switch('curriculoScene');
  }

  addVivita() {
    // Adiciona a vivita no jogo
    var vivita = this.add.image(width/1.75, height/3.2, 'vivita').setScale(0.09);

    // Adiciona a sprite da exclamação
    this.exclamation = this.add.sprite(width/1.75, height/4.6, 'indicator').setScale(0.2);
    this.exclamation.play('exclamando'); // Inicia a animação
    this.indicatorActive = true;

    // Torna a vivita interativa
    vivita.setInteractive();
    vivita.on('pointerdown', () => {
      this.showVivitaInteraction(); // Chama a função de interação com a vivita
    });

    // Adiciona um evento para a tecla 'E'
    this.input.keyboard.on('keydown-E', () => {
      // Verifica se o jogador está próximo da Vivita
      if (
        Math.abs(this.player.x - vivita.x) <= 50 &&
        Math.abs(this.player.y - vivita.y) <= 50 &&
        !this.vivitaInteracted // Verifica se a interação já ocorreu
      ) {
        // Chama a função de interação com a vivita
        this.showVivitaInteraction();
        this.vivitaInteracted = true; // Marca que a interação ocorreu
      }
    });
  }

  showVivitaInteraction() {
    this.exclamation.setVisible(false); // Deixa a exclamação da vivita invisível

    // Lista com as falas da vivita
    var speechVivita = ['Olá! Você deve ser Fulano, né?', 
                        'Fiquei sabendo que você quer mudar de carreira na Vivo.',
                        'Vou te explicar o primeiro passo.', 
                        'Primeiro, você precisa criar o seu currículo.',
                        'Vá até o computador no escritório.',
                        'Preencha seu currículo e depois entregue-o na sala do líder.',
                        'Boa sorte!'];

    // Adiciona o balão da fala da vivita                    
    const balaoTexto = this.add.image(width/1.55, height/4.8, 'balaoTexto');

    // Adiciona uma caixa de texto dentro do balão de texto
    const text = this.add.text(width/1.68, height/7, speechVivita[0], {
      fontSize: '16px',
      fill: '#000000',
      wordWrap: { width: balaoTexto.width - 20 }
    });

    // Lógica para alternar entre as falas
    let currentSpeechIndex = 0;
    this.input.keyboard.on('keydown-ENTER', () => { // As falas avançam apertando a tecla ENTER
      currentSpeechIndex++; // Soma 1 cada fez que uma fala passa
      if (currentSpeechIndex < speechVivita.length) { // Se a fala que está mostrando no momento estiver em uma posição menor do que o tamanho da lista, avança
        text.setText(speechVivita[currentSpeechIndex]); // Mostra a fala de acordo com a posição na lista
      } else {
        balaoTexto.setVisible(false); // Deixa o balão da fala da vivita invisível
        text.setVisible(false); // Deixa as falas invisíveis

        this.addIndicatorAndComputer(); // Chama a função que adiciona a exclamação no computador
      }
    });
  }
  }

