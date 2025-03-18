class OfficeScene extends Phaser.Scene {
  constructor() {
    // Chama o construtor da classe Phaser.Scene com a chave 'officeScene'
    super({ key: 'officeScene' });
    // this.currentBackground = 'background'; // Estado inicial
    this.canMove = true; // Controla se o jogador pode se mover
  }

  preload() {
    // Carrega imagens e spritesheets necessárias para a cena
    this.load.spritesheet('player', '../assets/Player.png', { frameWidth: 32, frameHeight: 32 });
    this.load.image('telaComputador', '../assets/tela_computador.png');
    this.load.image('computador', '../assets/computador.png');
    this.load.spritesheet('indicator', '../assets/spriteexclamação.png', { frameWidth: 254, frameHeight: 291 });

    // Carrega o mapa do tiled
    this.load.tilemapTiledJSON('escritorio', '../assets/mapaJogoVivo/mapaJogoVivo.json');
    this.load.image('decoracao', '../assets/mapaJogoVivo/decoracao.png');
    this.load.image('paredes', '../assets/mapaJogoVivo/paredes.png');
    this.load.image('personalizado_vivo', '../assets/mapaJogoVivo/personalizado_vivo.png');

    this.load.image('vivita', '../assets/vivita.png');
    this.load.image('balaoTexto', '../assets/balaoTexto.png');
  }

  create() {

//skip elevador
   // this.scene.start("elevadorScene");
    //return;

    this.cameras.main.fadeIn(1000); // Transição suave
    // Obtém as dimensões da tela
    const screenWidth = this.sys.game.config.width;
    const screenHeight = this.sys.game.config.height;
    // Adiciona a imagem de fundo e ajusta seu tamanho para preencher a tela
    // this.background = this.add.image(0, 0, 'background').setOrigin(0, 0);
    // this.background.setDisplaySize(window.innerWidth, window.innerHeight);

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
      interagir: Phaser.Input.Keyboard.KeyCodes.E
    });

    const map = this.make.tilemap({ key: "escritorio", tileWidth: 25, tileHeight: 20 });

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

    layer1.setCollisionByProperty({ collider: true });
    layer2.setCollisionByProperty({ collider: true });
    layer3.setCollisionByProperty({ collider: true });
    layer4.setCollisionByProperty({ collider: true });
    layer5.setCollisionByProperty({ collider: true });
    layer6.setCollisionByProperty({ collider: true });
    layer7.setCollisionByProperty({ collider: true });
    layer8.setCollisionByProperty({ collider: true });
    layer9.setCollisionByProperty({ collider: true });


    // Cria a tela do computador, o computador e o indicador de exclamação
    this.createComputerScreen();
    this.addComputerAndIndicator();
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
    this.coordText = this.add.text(20, 20, '', { fontSize: '16px', fill: '#ffffff' });
  }

  update() {
    // Atualiza o movimento do jogador
    this.movePlayer();

    // Verifica se a tecla 'E' foi pressionada perto do computador
    if (Phaser.Input.Keyboard.JustDown(this.teclas.interagir)) {
      if (
        Math.abs(this.player.x - this.computador.x) <= 50 &&
        Math.abs(this.player.y - this.computador.y) <= 50
      ) {
        this.showComputerScreen();
      }
    }

    // Se o jogador já voltou da salaLiderScene, cria o botão do elevador
    if (this.returnedFromSalaLider && this.blockLoop === 0) {
      this.createButtonCima();
    }
  }

  movePlayer() {
    const velocidade = 150; // Define a velocidade de movimento do jogador
    let movendo = false; // Variável para verificar se o jogador está se movendo

    // Movimentação do jogador utilizando as teclas WASD
    if (this.teclas.left.isDown) {
      this.player.setVelocityX(-velocidade); // Move o jogador para a esquerda
      this.player.anims.play("walk_left", true); // Toca a animação de andar para a esquerda
      this.player.setFlipX(true); // Vira o sprite para a esquerda
      movendo = true; // Define que o jogador está se movendo
    } else if (this.teclas.right.isDown) {
      this.player.setVelocityX(velocidade); // Move o jogador para a direita
      this.player.anims.play("walk_right", true); // Toca a animação de andar para a direita
      this.player.setFlipX(false); // Mantém o sprite para a direita
      movendo = true; // Define que o jogador está se movendo
    } else {
      this.player.setVelocityX(0); // Para o movimento horizontal do jogador
    }

    if (this.teclas.up.isDown) {
      this.player.setVelocityY(-velocidade); // Move o jogador para cima
      this.player.anims.play("walk_up", true); // Toca a animação de andar para cima
      movendo = true; // Define que o jogador está se movendo
    } else if (this.teclas.down.isDown) {
      this.player.setVelocityY(velocidade); // Move o jogador para baixo
      this.player.anims.play("walk_down", true); // Toca a animação de andar para baixo
      movendo = true; // Define que o jogador está se movendo
    } else {
      this.player.setVelocityY(0); // Para o movimento vertical do jogador
    }

    if (!movendo) {
      this.player.anims.stop(); // Para a animação se o jogador não estiver se movendo
    }
  }

  createPlayer() {
    // Cria o sprite do jogador usando as dimensões da tela
    this.player = this.physics.add.sprite(width - 405, height - 100, 'player');
    this.player.setScale(2.5);
  }

  createPlayerAnimations() {
    // Define a animação de andar para baixo
    this.anims.create({
      key: "walk_down", // Chave da animação
      frames: this.anims.generateFrameNumbers("player", { start: 0, end: 5 }), // Frames da animação
      frameRate: 10, // Taxa de quadros por segundo
      repeat: -1, // Repetir indefinidamente
    });

    // Define a animação de andar para a direita
    this.anims.create({
      key: "walk_right", // Chave da animação
      frames: this.anims.generateFrameNumbers("player", { start: 6, end: 11 }), // Frames da animação
      frameRate: 10, // Taxa de quadros por segundo
      repeat: -1, // Repetir indefinidamente
    });

    // Define a animação de andar para cima
    this.anims.create({
      key: "walk_up", // Chave da animação
      frames: this.anims.generateFrameNumbers("player", { start: 12, end: 17 }), // Frames da animação
      frameRate: 10, // Taxa de quadros por segundo
      repeat: -1, // Repetir indefinidamente
    });

    // Define a animação de andar para a esquerda
    this.anims.create({
      key: "walk_left", // Chave da animação
      frames: this.anims.generateFrameNumbers("player", { start: 6, end: 11 }), // Frames da animação
      frameRate: 10, // Taxa de quadros por segundo
      repeat: -1, // Repetir indefinidamente
    });
  }

  createButtonCima() {
    //Constante para evitar a criação repetida
    this.blockLoop = 1;

    // Adiciona a sprite da exclamação
    this.exclamacao = this.physics.add.sprite(width - 435, height - 700, "indicator").setScale(0.2);
    this.exclamacao.setImmovable(true);
    this.exclamacao.play("exclamando"); // Inicia a animação
    this.indicatorActive = true;

    // Cria a imagem de fundo do elevador e o painel
    this.bgelevoffice = this.add.image(0, 0, "bgElevOffice").setOrigin(0, 0);
    this.bgelevoffice.setDisplaySize(width, height);
    this.painelelev = this.add.image(width - 910, height - 600, "painelelev").setOrigin(0, 0);
    this.bgelevoffice.setVisible(false);
    this.painelelev.setVisible(false);

    // Cria o botão do elevador e o torna interativo
    this.botaoCima = this.add.image(width - 680, height - 400, "botaoElevOffice");
    this.botaoCima.setPosition(width - 680, height - 400);
    this.botaoCima.setInteractive();
    this.botaoCima.setScale(1);
    this.botaoCima.setVisible(false);

    // Ao clicar no botão, troca para a cena do elevador
    this.botaoCima.on("pointerdown", () => {
      this.scene.stop("officeScene");
      this.scene.start("elevadorScene");
    });
    // Adiciona um overlap entre o player e a exclamation
    this.physics.add.overlap(this.player, this.exclamacao, () => {
      this.scene.switch('buttonElevatorScene'); // Troca para a cena do escritório
    });
  }



  createComputer() {
    // Criar o computador na posição original
    this.computador = this.add.image(width - 1020, height - 100, 'computador').setScale(0.09).setInteractive();
    this.computador.setFlipX(true);
  }
    

  addIndicatorAndComputer() {
    // Adiciona a sprite da exclamação
    this.indicator = this.add.sprite(width - 1020, height - 150, 'indicator').setScale(0.2);
    this.indicator.play('exclamando'); // Inicia a animação
    this.indicatorActive = true;

    // Criar o computador na posição original
    this.computador = this.add.image(width - 1020, height - 100, 'computador').setScale(0.09).setInteractive();
    this.computador.setFlipX(true);
    // Criar o computador na posição original
    this.computador = this.add.image(width - 1020, height - 100, 'computador').setScale(0.09).setInteractive();
    this.computador.setFlipX(true);

    // Muda a cor do computador ao passar o mouse
    this.computador.on("pointerover", () => {
      this.computador.setTint(0xaaaaaa);
    });
    this.computador.on("pointerout", () => {
      this.computador.clearTint();
    });

    // Ao clicar no computador, exibe a tela correspondente
    this.computador.on("pointerdown", () => {
      this.showComputerScreen();
    });
  }

  showComputerScreen() {
    // Mostrar a tela do computador
    this.indicator.destroy();
    this.scene.switch("curriculoScene"); // Muda para a cena do curriculo
    this.salaLider(); // Chama a função que cria a sala do lider
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
        this.input.keyboard.off('keydown-ENTER'); //Impede que o usuario aperte ENTER apos o dialogo acabar
        this.addIndicatorAndComputer(); // Chama a função que adiciona a exclamação no computador
      }
    });
  }
   
  salaLider() {
    if (this.inTransition) return; // Evita múltiplas ativações do overlap

    // Adiciona a exclamação na porta da sala da líder
    this.exclamation = this.physics.add.sprite(width - 1200, height - 500, 'indicator').setScale(0.2);
    this.exclamation.play('exclamando'); // Inicia a animação
    this.indicatorActive = true;

    // Adiciona um overlap entre a exclamação e o player
    this.physics.add.overlap(this.player, this.exclamation, () => {
        if (!this.inTransition) { 
            this.inTransition = true;
            this.returnedFromSalaLider = true; // Marca que o jogador já foi para salaLiderScene
            this.blockLoop = 0;
            this.exclamation.setVisible(false);
            this.scene.switch('salaLiderScene'); // Troca para a cena do líder
        }
    });


  }
}

