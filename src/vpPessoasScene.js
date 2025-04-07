class VpPessoasScene extends Phaser.Scene {
    constructor() {
      super({ key: 'vpPessoasScene' });

      this.minigameComplete = false;
      this.npcMobileFixedCreated = false;
      this.elevatorTarget = null;
     
      this.arrowOffset = Phaser.Math.DegToRad(-180);
      this.activeIndicators = [];
    }

    init(data) {
      this.selectedSpriteSheet = data.selectedSpriteSheet;
     
    }

    preload() {
      this.load.tilemapTiledJSON('vpPessoas', '../assets/mapaVPPessoas/mapaVPPessoas.json'); // Carrega o mapa da VP Pessoas em formato JSON
      this.load.image('decoracao', '../assets/mapaVPPessoas/decoracao.png'); // Carrega a imagem de decoração do mapa
      this.load.image('paredes', '../assets/mapaVPPessoas/paredes.png'); // Carrega a imagem das paredes do mapa
      
      this.load.spritesheet("npcReceptor", "../assets/personagens/LiderReading.png", { frameWidth: 16, frameHeight: 32 }); // Carrega o spritesheet do NPC receptor
      this.load.spritesheet("npc11", "../assets/personagens/VPpessoas/npc11.png", { frameWidth: 16, frameHeight: 32 }); // Carrega o spritesheet do NPC 11
      this.load.spritesheet("npc12", "../assets/personagens/VPpessoas/npc12.png", { frameWidth: 16, frameHeight: 32 }); // Carrega o spritesheet do NPC 12
      this.load.spritesheet("npc13", "../assets/personagens/VPpessoas/npc13.png", { frameWidth: 16, frameHeight: 32 }); // Carrega o spritesheet do NPC 13
      this.load.spritesheet("npc14", "../assets/personagens/VPpessoas/npc14.png", { frameWidth: 16, frameHeight: 32 }); // Carrega o spritesheet do NPC 14
      this.load.spritesheet("npc15", "../assets/personagens/VPpessoas/npc15.png", { frameWidth: 16, frameHeight: 32 }); // Carrega o spritesheet do NPC 15
      this.load.spritesheet("npc16", "../assets/personagens/VPpessoas/npc16.png", { frameWidth: 16, frameHeight: 32 }); // Carrega o spritesheet do NPC 1
      this.load.spritesheet("npc17", "../assets/personagens/VPpessoas/npc17.png", { frameWidth: 16, frameHeight: 32 }); // Carrega o spritesheet do NPC 17
      this.load.spritesheet("npc18", "../assets/personagens/VPpessoas/marimari.png", { frameWidth: 16, frameHeight: 32 }); // Carrega o spritesheet do NPC 18
      this.load.spritesheet("npc19", "../assets/personagens/VPpessoas/npc19.png", { frameWidth: 16, frameHeight: 32 }); // Carrega o spritesheet do NPC 19
      this.load.spritesheet("npc23", "../assets/personagens/VPpessoas/npc23.png", { frameWidth: 16, frameHeight: 32 }); // Carrega o spritesheet do NPC 23
      this.load.spritesheet("npcMobile", "../assets/personagens/VPpessoas/npcMovel.png", { frameWidth: 16, frameHeight: 32 }); // Carrega o spritesheet do NPC móvel
      this.load.spritesheet("rafaela", "../assets/personagens/VPpessoas/npcRafaela.png", { frameWidth: 16, frameHeight: 32 }); // Carrega o spritesheet da NPC Rafaela

      this.load.audio('walkSound', '../assets/sounds/753292__vrymaa__footsteps-high-heels-hardwood-walk-run (mp3cut.net).wav'); // Carrega o som de passos
      this.load.audio('peopleMusic', '../assets/sounds/VPpessoas.mp3'); // Carrega a música de fundo da VP Pessoas 
      this.load.audio('indicatorSound', '../assets/sounds/497198_abacagi_bubble-pops (mp3cut.net).wav'); // Carrega o som do indicador de interação

      this.load.spritesheet('trash', '../assets/trash.png', {frameWidth: 267, frameHeight: 343}); // Carrega o spritesheet do objeto de lixo
      this.load.spritesheet('book', '../assets/assetsBookVPPessoas/book.png', {frameWidth: 835, frameHeight: 520}); // Carrega o spritesheet do objeto livro
      
      this.load.spritesheet('player', `../assets/personagens/skinsPlayer/players/${this.selectedSpriteSheet}.png`, {frameWidth: 16, frameHeight: 32, });

      this.load.spritesheet("indicator", "../assets/exclamaçãoRoxa.png", {frameWidth: 254, frameHeight: 305}); // Carrega o spritesheet do indicador de interação

      this.load.image('keyE', '../assets/teclaE.png'); // Carrega a imagem da tecla "E" para interação
      this.load.image('keyENTER', '../assets/keyEnter.png'); // Carrega a imagem da tecla "ENTER" para interação
      this.load.image("balloonText", "../assets/balaoTexto.png"); // Carrega a imagem do balão de texto

      this.load.image("bgElevPessoas", "../assets/bgelevadoroffice.png"); // Carrega a imagem de fundo do elevador
      this.load.image("panelElev", "../assets/painelelevador.png"); // Carrega a imagem do painel do elevador
      this.load.image("buttonElevPesssoas", "../assets/botaocimaelevador.png"); // Carrega a imagem do botão do elevador
      this.load.image("arrow", "../assets/seta.png");
    
    }

  create() {
    const width = this.sys.game.config.width;
  const height = this.sys.game.config.height;
    const map = this.make.tilemap({ key: "vpPessoas", tileWidth: 25, tileHeight: 20 }); // Cria o mapa com as dimensões dos tiles
    const tileset1 = map.addTilesetImage("decoracao"); // Adiciona o tileset de decoração
    const tileset2 = map.addTilesetImage("paredes"); // Adiciona o tileset de paredes

    const offsetX = width - 1270; // Define a posição x das camadas
    const layer1 = map.createLayer("chao", tileset2, offsetX, 0).setScale(2.5); // Cria a camada do chão
    const layer2 = map.createLayer("parede", tileset2, offsetX, 0).setScale(2.5); // Cria a camada de paredes
    const layer3 = map.createLayer("sofa", tileset1, offsetX, 0).setScale(2.5); // Cria a camada de sofás
    const layer4 = map.createLayer("sofaTras", tileset1, offsetX, 0).setScale(2.5); // Cria a camada de sofás traseiros
    const layer5 = map.createLayer("armario", tileset1, offsetX, 0).setScale(2.5); // Cria a camada de armários
    const layer6 = map.createLayer("cadeira", tileset1, offsetX, 0).setScale(2.5); // Cria a camada de cadeiras
    this.addNpcLayer6(); // Adiciona NPCs na camada 6
    const layer7 = map.createLayer("mesa", tileset1, offsetX, 0).setScale(2.5); // Cria a camada de mesas
    const layer8 = map.createLayer("elevador", tileset1, offsetX, 0).setScale(2.5); // Cria a camada do elevador
    const layer9 = map.createLayer("planta", tileset1, offsetX, 0).setScale(2.5); // Cria a camada de plantas
    const layer10 = map.createLayer("decoracao", tileset1, offsetX, 0).setScale(2.5); // Cria a camada de decoração
    const layer11 = map.createLayer("acabamento", tileset2, offsetX, 0).setScale(2.5); // Cria a camada de acabamento

    [layer1, layer2, layer3, layer4, layer5, layer6, layer7, layer8, layer9, layer10, layer11].forEach(layer => {
      layer.setCollisionByProperty({ collider: true }); // Define colisão para as camadas com a propriedade "collider"
    });

    const startTime = VpPessoasScene.lastMusicTime || 0; // Obtém o tempo salvo da música ou inicia do início
    this.peopleMusic = this.sound.add("peopleMusic", { loop: true }); // Adiciona a música de fundo em loop
    this.peopleMusic.play({ seek: startTime }); // Toca a música a partir do tempo salvo

    this.keys = this.input.keyboard.addKeys({
      up: Phaser.Input.Keyboard.KeyCodes.W, // Tecla W para mover para cima
      down: Phaser.Input.Keyboard.KeyCodes.S, // Tecla S para mover para baixo
      left: Phaser.Input.Keyboard.KeyCodes.A, // Tecla A para mover para a esquerda
      right: Phaser.Input.Keyboard.KeyCodes.D, // Tecla D para mover para a direita
      interagir: Phaser.Input.Keyboard.KeyCodes.E, // Tecla E para interagir
      ENTER: Phaser.Input.Keyboard.KeyCodes.ENTER // Tecla ENTER para confirmar
    });

    this.createPlayer(width, height); // Cria o jogador
    this.createPlayerAnimations(); // Cria as animações do jogador
    this.addNpc(); // Adiciona os NPCs
    this.createNpcAnimations(); // Cria as animações dos NPCs
    this.lastPosition = "down"; // O personagem começa olhando para baixo
    this.createNpcMobile(); // Cria o NPC móvel
    this.addRafaela(width, height); // Adiciona a NPC Rafaela
    this.createAnimsIndicator(); // Cria as animações do indicador

    this.physics.add.collider(this.player, layer2); // Colisão com a camada de paredes
    this.physics.add.collider(this.player, layer3); // Colisão com a camada de sofás
    this.physics.add.collider(this.player, layer4); // Colisão com a camada de sofás traseiros
    this.physics.add.collider(this.player, layer5); // Colisão com a camada de armários
    this.physics.add.collider(this.player, layer6); // Colisão com a camada de cadeiras
    this.physics.add.collider(this.player, layer7); // Colisão com a camada de mesas
    this.physics.add.collider(this.player, layer9); // Colisão com a camada de plantas
    this.physics.add.collider(this.player, this.rafaela); // Colisão com a NPC Rafaela

    this.anims.create({
      key: "exclaiming", // Nome da animação
      frames: this.anims.generateFrameNumbers("indicator", { start: 0, end: 1 }), // Frames da animação
      frameRate: 3, // Velocidade da animação
      repeat: -1, // Repetição infinita
    });

    this.createTrash(); // Cria o objeto de lixo
    this.createBook(); // Cria o objeto livro

    this.buttonClick = this.sound.add('buttonSound', { loop: false, volume: 10 }); // Som de clique de botão
    this.indicatorSound = this.sound.add('indicatorSound', { loop: true, volume: 10 }); // Som do indicador
    this.walkSound = this.sound.add('walkSound', { loop: false, volume: 10 }); // Som de passos

    this.rafaelaInteracted = false; // Flag para verificar se Rafaela foi interagida
    this.keyEnterRafaela = null; // Inicializa a tecla ENTER para Rafaela como nula

    this.npcMobileInteracted = false; // Flag para verificar se o NPC móvel foi interagido
    this.keyEnterNpcMobile = null; // Inicializa a tecla ENTER para o NPC móvel como nula

    // Dá zoom na tela do jogo e faz a visão seguir o personagem
    this.cameras.main.startFollow(this.player); // Faz a câmera seguir o jogador
    this.cameras.main.setZoom(2); // Define o zoom da câmera
    this.elevatorTarget = {
      x: width - 430, 
      y: height - 570
    };
    this.compassArrow = this.add.image(
      this.cameras.main.width / 2,  335, "arrow" )
      .setScrollFactor(0)  // fixa na tela, não desloca com o mapa
      .setDepth(1000)      // acima de todos os elementos
      .setScale(0.5)
      .setOrigin(0.5, 0.5);
  }

  createAnimsIndicator() {
    this.anims.create({
      key: "exclaiming", // Nome da animação
      frames: this.anims.generateFrameNumbers("indicator", { start: 0, end: 1 }), // Frames da animação
      frameRate: 3, // Velocidade da animação
      repeat: -1, // Repetição infinita
    });
  }
      
  createNpcMobile() {
    this.npcMobile = this.physics.add.sprite(width - 380, height - 520, 'npcMobile'); // Adiciona o NPC móvel na posição inicial
    this.npcMobile.setScale(2.5); // Define o tamanho do NPC móvel
    this.npcMobile.setImmovable(true); // Define o NPC como imóvel para colisões
    this.createNpcAnimations(); // Cria as animações do NPC móvel
    this.npcMobile.anims.play('npcMobileWalk'); // Inicia a animação de caminhada do NPC móvel

    this.npcMobile.direction = -1; // Define a direção inicial do NPC (esquerda)
    this.npcMobile.velocity = 180; // Define a velocidade de movimento do NPC
    this.npcMobile.initialPosition = this.npcMobile.x; // Salva a posição inicial do NPC
    this.npcMobile.maxDistance = 320; // Define a distância máxima que o NPC pode se mover
  }

  addNpcLayer6() {
    this.npc17 = this.physics.add.sprite(width - 810, height - 624, 'npc17'); // Adiciona o NPC 17 na camada 6
    this.npc17.setScale(3.0); // Define o tamanho do NPC 17
    this.npc17.setImmovable(true); // Define o NPC 17 como imóvel para colisões
    this.createNpcAnimations(); // Cria as animações do NPC 17
    this.npc17.anims.play('npc17'); // Inicia a animação do NPC 17

    this.npc18 = this.physics.add.sprite(width - 970, height - 624, 'npc18'); // Adiciona o NPC 18 na camada 6
    this.npc18.setScale(3.0); // Define o tamanho do NPC 18
    this.npc18.setImmovable(true); // Define o NPC 18 como imóvel para colisões
    this.createNpcAnimations(); // Cria as animações do NPC 18
    this.npc18.anims.play('npc18'); // Inicia a animação do NPC 18

    this.npc19 = this.physics.add.sprite(width - 1130, height - 624, 'npc19'); // Adiciona o NPC 19 na camada 6
    this.npc19.setScale(3.0); // Define o tamanho do NPC 19
    this.npc19.setImmovable(true); // Define o NPC 19 como imóvel para colisões
    this.createNpcAnimations(); // Cria as animações do NPC 19
    this.npc19.anims.play('npc19'); // Inicia a animação do NPC 19
  }

  addNpc() {
    this.npc11 = this.physics.add.sprite(width - 1070, height - 185, 'npc11'); // Adiciona o NPC 11 na posição especificada
    this.npc11.setScale(2.5); // Define o tamanho do NPC 11
    this.npc11.setImmovable(true); // Define o NPC 11 como imóvel para colisões
    this.createNpcAnimations(); // Cria as animações do NPC 11
    this.npc11.anims.play('Idle'); // Inicia a animação "Idle" para o NPC 11

    this.npc12 = this.physics.add.sprite(width - 885, height - 265, 'npc12'); // Adiciona o NPC 12 na posição especificada
    this.npc12.setScale(2.5); // Define o tamanho do NPC 12
    this.npc12.setImmovable(true); // Define o NPC 12 como imóvel para colisões
    this.createNpcAnimations(); // Cria as animações do NPC 12
    this.npc12.anims.play('npc12'); // Inicia a animação "npc12" para o NPC 12

    this.npc13 = this.physics.add.sprite(width - 1070, height - 265, 'npc13'); // Adiciona o NPC 13 na posição especificada
    this.npc13.setScale(2.5); // Define o tamanho do NPC 13
    this.npc13.setImmovable(true); // Define o NPC 13 como imóvel para colisões
    this.createNpcAnimations(); // Cria as animações do NPC 13
    this.npc13.setFlipX(true); // Vira o NPC 13 horizontalmente
    this.npc13.anims.play('npc13'); // Inicia a animação "npc13" para o NPC 13
    
    this.npc14 = this.physics.add.sprite(width - 655, height - 265, 'npc14'); // Adiciona o NPC 14 na posição especificada
    this.npc14.setScale(2.5); // Define o tamanho do NPC 14
    this.npc14.setImmovable(true); // Define o NPC 14 como imóvel para colisões
    this.createNpcAnimations(); // Cria as animações do NPC 14
    this.npc14.play('npc14'); // Inicia a animação "npc14" para o NPC 14

    this.npc15 = this.physics.add.sprite(width - 885, height - 185, 'npc15'); // Adiciona o NPC 15 na posição especificada
    this.npc15.setScale(2.5); // Define o tamanho do NPC 15
    this.npc15.setImmovable(true); // Define o NPC 15 como imóvel para colisões
    this.createNpcAnimations(); // Cria as animações do NPC 15
    this.npc15.anims.play('npc15'); // Inicia a animação "npc15" para o NPC 15

    this.npc16 = this.physics.add.sprite(width - 487, height - 200, 'npc16'); // Adiciona o NPC 16 na posição especificada
    this.npc16.setScale(2.5); // Define o tamanho do NPC 16
    this.npc16.setImmovable(true); // Define o NPC 16 como imóvel para colisões
    this.createNpcAnimations(); // Cria as animações do NPC 16
    this.npc16.anims.play('npc16'); // Inicia a animação "npc16" para o NPC 16

    this.npc23 = this.physics.add.sprite(width - 1200, height - 350, 'npc23'); // Adiciona o NPC 23 na posição especificada
    this.npc23.setScale(2.5); // Define o tamanho do NPC 23
    this.npc23.setImmovable(true); // Define o NPC 23 como imóvel para colisões
    this.createNpcAnimations(); // Cria as animações do NPC 23
    this.npc23.anims.play('npc23'); // Inicia a animação "npc23" para o NPC 23
  }
  
  createNpcAnimations() { 
      this.anims.create({
        key: "npc11", // Nome da animação para o NPC 11
        frames: this.anims.generateFrameNumbers('npc11', { start: 0, end: 5 }), // Define os frames da animação
        frameRate: 6, // Velocidade da animação
        repeat: -1, // Repetição infinita
      });

      this.anims.create({
        key: "npc12", // Nome da animação para o NPC 12
        frames: this.anims.generateFrameNumbers('npc12', { start: 0, end: 5 }), // Define os frames da animação
        frameRate: 4, // Velocidade da animação
        repeat: -1, // Repetição infinita
      });

      this.anims.create({
        key: "npc13", // Nome da animação para o NPC 13
        frames: this.anims.generateFrameNumbers('npc13', { start: 6, end: 11 }), // Define os frames da animação
        frameRate: 4, // Velocidade da animação
        repeat: -1, // Repetição infinita
      });

      this.anims.create({
        key: "npc14", // Nome da animação para o NPC 14
        frames: this.anims.generateFrameNumbers('npc14', { start: 6, end: 11 }), // Define os frames da animação
        frameRate: 4, // Velocidade da animação
        repeat: -1, // Repetição infinita
      });

      this.anims.create({
        key: "npc15", // Nome da animação para o NPC 15
        frames: this.anims.generateFrameNumbers('npc15', { start: 0, end: 5 }), // Define os frames da animação
        frameRate: 4, // Velocidade da animação
        repeat: -1, // Repetição infinita
      });

      this.anims.create({
        key: "npc16", // Nome da animação para o NPC 16
        frames: this.anims.generateFrameNumbers('npc16', { start: 0, end: 11 }), // Define os frames da animação
        frameRate: 4, // Velocidade da animação
        repeat: -1, // Repetição infinita
      });

      this.anims.create({
        key: "npc17", // Nome da animação para o NPC 17
        frames: this.anims.generateFrameNumbers('npc17', { start: 18, end: 23 }), // Define os frames da animação
        frameRate: 4, // Velocidade da animação
        repeat: -1, // Repetição infinita
      });

      this.anims.create({
        key: "npc18", // Nome da animação para o NPC 18
        frames: this.anims.generateFrameNumbers('npc18', { start: 18, end: 23 }), // Define os frames da animação
        frameRate: 4, // Velocidade da animação
        repeat: -1, // Repetição infinita
      });

      this.anims.create({
        key: "npc19", // Nome da animação para o NPC 19
        frames: this.anims.generateFrameNumbers('npc19', { start: 18, end: 23 }), // Define os frames da animação
        frameRate: 4, // Velocidade da animação
        repeat: -1, // Repetição infinita
      });

      this.anims.create({
        key: "npc23", // Nome da animação para o NPC 23
        frames: this.anims.generateFrameNumbers('npc23', { start: 0, end: 11 }), // Define os frames da animação
        frameRate: 4, // Velocidade da animação
        repeat: -1, // Repetição infinita
      });

      this.anims.create({
        key: "npcMobileWalk", // Nome da animação para o NPC móvel
        frames: this.anims.generateFrameNumbers('npcMobile', { start: 124, end: 129 }), // Define os frames da animação
        frameRate: 10, // Velocidade da animação
        repeat: -1, // Repetição infinita
    });    
    
    this.anims.create({
      key: "exclaiming", // Nome da animação para o indicador de interação
      frames: this.anims.generateFrameNumbers("indicator", {start: 0, end: 1}), // Define os frames da animação
      frameRate: 3, // Velocidade da animação
      repeat: -1, // Repetição infinita
    });
    
    }
      
    update() {
      this.movePlayer(); // Move o jogador com base nas teclas pressionadas
      this.moveNpcMobile(); // Move o NPC móvel de acordo com sua lógica
    
      // LIXO
      if (this.trash) {
        const distTrash = Phaser.Math.Distance.Between(
          this.player.x, this.player.y,
          this.trash.x, this.trash.y
        );
        this.canInteractWithTrash = distTrash < 50;
        if (distTrash >= 50 && this.keyETrash) {
          this.keyETrash.destroy();
          this.keyETrash = null;
        }
      }
    
      // LIVRO
      if (this.book && this.npcMobileInteractionFinished) {
        const distBook = Phaser.Math.Distance.Between(
          this.player.x, this.player.y,
          this.book.x, this.book.y
        ); // Calcula a distância entre o jogador e o livro
        this.canInteractWithBook = distBook < 100; // Permite interação se a distância for menor que 100

        if (this.canInteractWithBook) { // Se o jogador estiver próximo do livro
          if (!this.keyEBook) { // Se o ícone da tecla "E" ainda não foi criado
            this.keyEBook = this.add.image(this.book.x, this.book.y - 40, 'keyE').setScale(0.07); // Adiciona o ícone da tecla "E"
          }
        } else {
          if (this.keyEBook) {
            this.keyEBook.destroy();
            this.keyEBook = null;
            const bookRead = this.registry.get('bookRead');
            if (bookRead && !this.botaoVoltar) {
              this.createButtonBack();
            }
          }
        }
      }
    
      // ATUALIZAÇÃO DA SETA – se houver indicadores ativos, aponta para o mais próximo;
      // caso contrário, a seta desaparece.
      if (this.compassArrow) {
        // Remove os indicadores que não estão mais ativos
        this.activeIndicators = this.activeIndicators.filter(ind => ind.active);
        if (this.activeIndicators.length > 0) {
          const closest = this.getClosestIndicator();
          if (closest) {
            const angle = Phaser.Math.Angle.Between(
              this.player.x, this.player.y,
              closest.x, closest.y
            );
            this.compassArrow.setRotation(angle + this.arrowOffset);
          }
          // Garante que a seta esteja visível se houver indicadores
          this.compassArrow.setVisible(true);
        } else {
          // Se não houver nenhum indicador ativo, esconde a seta
          this.compassArrow.setVisible(false);
        }
      }
    
      // INTERAÇÃO COM O LIXO
      if (this.canInteractWithTrash && Phaser.Input.Keyboard.JustDown(this.keys.interagir)) {
        this.buttonClick = this.sound.add('buttonSound', { loop: false, volume: 10 });
        this.buttonClick.play();
        this.scene.pause();
        this.scene.launch('minigameTrashScene');
        this.minigameComplete = true;
      }
    
      // INTERAÇÃO COM O LIVRO
      if (this.canInteractWithBook && this.npcMobileInteractionFinished && Phaser.Input.Keyboard.JustDown(this.keys.interagir)) {
        this.buttonClick.play();
        this.scene.pause();
        this.scene.launch('bookScene');
        this.createButtonBack();
      }
    
      // INTERAÇÃO COM O NPC MÓVEL
      if (this.canInteractWithNpcMobile && Phaser.Input.Keyboard.JustDown(this.keys.interagir)) {
        if (!this.npcMobileInteracted) {
          if (this.keyENpcMobile) {
            this.keyENpcMobile.destroy();
            this.keyENpcMobile = null;
          }
          if (!this.keyEnterNpcMobile) {
            this.keyEnterNpcMobile = this.add.image(this.npcMobile.x - 20, this.npcMobile.y - 50, 'keyENTER').setScale(0.1).setDepth(1000); 
          }
          this.npcMobileInteracted = true;
          this.canInteractWithNpcMobile = false;
          this.showNpcMobileInteraction();
        }
      }
    
      // INTERAÇÃO COM RAFAELA
      if (this.rafaela && this.indicatorRafaelaActive) {
        const distRafaela = Phaser.Math.Distance.Between(this.player.x, this.player.y, this.rafaela.x, this.rafaela.y);
        this.canInteractWithRafaela = distRafaela < 70;
        if (this.canInteractWithRafaela) {
          if (this.indicatorSoundRafaela && this.indicatorSoundRafaela.isPlaying) {
            this.indicatorSoundRafaela.stop();
          }
          if (this.exclamation) {
            this.exclamation.destroy();
          }

          this.indicatorRafaelaActive = false; // Desativa o indicador de Rafaela

          if (!this.keyERafaela) { // Se o ícone da tecla "E" ainda não foi criado
            this.keyERafaela = this.add.image(this.rafaela.x, this.rafaela.y - 60, 'keyE').setScale(0.07); // Adiciona o ícone da tecla "E"
          }
        } else {
          if (this.keyERafaela) {
            this.keyERafaela.destroy();
            this.keyERafaela = null;
          }
        }
      }
    
      if (this.returnedFromTrash) {
        this.npcMobile.anims.stop();
        this.npcMobile.setFlipX(false);
      }
    }
    
    indicatorSound() {
      this.exclaming = this.sound.add('indicatorSound', { loop: false, volume: 10 }); // Adiciona o som do indicador com volume e sem loop
      this.exclaming.play(); // Toca o som do indicador
    }

    movePlayer() {
      const speed = 150; // Define a velocidade do jogador
      let moving = false; // Flag para verificar se o jogador está se movendo

      if (this.keys.left.isDown) { // Verifica se a tecla para mover para a esquerda está pressionada
        this.player.setVelocityX(-speed); // Move o jogador para a esquerda
        this.lastPosition = "left"; // Salva a última posição como "esquerda"
        this.player.anims.play("walk_left", true); // Toca a animação de andar para a esquerda
        moving = true; // Marca que o jogador está se movendo
      } else if (this.keys.right.isDown) { // Verifica se a tecla para mover para a direita está pressionada
        this.player.setVelocityX(speed); // Move o jogador para a direita
        this.lastPosition = "right"; // Salva a última posição como "direita"
        this.player.anims.play("walk_right", true); // Toca a animação de andar para a direita
        moving = true; // Marca que o jogador está se movendo
      } else {
        this.player.setVelocityX(0); // Para o movimento horizontal do jogador
      }

      if (this.keys.up.isDown) { // Verifica se a tecla para mover para cima está pressionada
        this.player.setVelocityY(-speed); // Move o jogador para cima
        this.lastPosition = "up"; // Salva a última posição como "cima"
        this.player.anims.play("walk_up", true); // Toca a animação de andar para cima
        moving = true; // Marca que o jogador está se movendo
      } else if (this.keys.down.isDown) { // Verifica se a tecla para mover para baixo está pressionada
        this.player.setVelocityY(speed); // Move o jogador para baixo
        this.lastPosition = "down"; // Salva a última posição como "baixo"
        this.player.anims.play("walk_down", true); // Toca a animação de andar para baixo
        moving = true; // Marca que o jogador está se movendo
      } else {
        this.player.setVelocityY(0); // Para o movimento vertical do jogador
      }

      // Se o personagem parou, inicia a animação de stop_* em loop
      if (!moving) { // Verifica se o jogador não está se movendo
        switch (this.lastPosition) { // Verifica a última posição do jogador
          case "left":
            this.player.anims.play("stop_left", true); // Toca a animação de parada olhando para a esquerda
            break;
          case "right":
            this.player.anims.play("stop_right", true); // Toca a animação de parada olhando para a direita
            break;
          case "up":
            this.player.anims.play("stop_up", true); // Toca a animação de parada olhando para cima
            break;
          case "down":
          default:
            this.player.anims.play("stop_down", true); // Toca a animação de parada olhando para baixo
            break;
        }
        this.walkSound.stop(); // Para o som de passos
      } else {
        if (!this.walkSound.isPlaying) { // Verifica se o som de passos não está tocando
          this.walkSound.play(); // Toca o som de passos
        }
      }
    }

    createPlayer(width, height) {
      this.player = this.physics.add.sprite(width - 508, height - 660, 'player'); // Adiciona o sprite do jogador na posição inicial
      this.player.setScale(2.5); // Define o tamanho do jogador
    }

    createPlayerAnimations() {
      this.anims.create({
        key: "walk_down", // Nome da animação para andar para baixo
        frames: this.anims.generateFrameNumbers("player", { start: 130, end: 135 }), // Define os frames da animação para andar para baixo
        frameRate: 10, // Velocidade da animação
        repeat: -1, // Repetição infinita
      });
      this.anims.create({
        key: "walk_right", // Nome da animação para andar para a direita
        frames: this.anims.generateFrameNumbers("player", { start: 112, end: 117 }), // Define os frames da animação para andar para a direita
        frameRate: 10, // Velocidade da animação
        repeat: -1, // Repetição infinita
      });
      this.anims.create({
        key: "walk_up", // Nome da animação para andar para cima
        frames: this.anims.generateFrameNumbers("player", { start: 118, end: 123 }), // Define os frames da animação para andar para cima
        frameRate: 10, // Velocidade da animação
        repeat: -1, // Repetição infinita
      });
      this.anims.create({
        key: "walk_left", // Nome da animação para andar para a esquerda
        frames: this.anims.generateFrameNumbers("player", { start: 124, end: 129 }), // Define os frames da animação para andar para a esquerda
        frameRate: 10, // Velocidade da animação
        repeat: -1, // Repetição infinita
      });
      this.anims.create({
        key: "stop_down", // Nome da animação para parar olhando para baixo
        frames: this.anims.generateFrameNumbers("player", { start: 74, end: 79 }), // Define os frames da animação para parar olhando para baixo
        frameRate: 5, // Velocidade mais lenta para a animação de parada
        repeat: -1, // Loop infinito
      });
      this.anims.create({
        key: "stop_right", // Nome da animação para parar olhando para a direita
        frames: this.anims.generateFrameNumbers("player", { start: 56, end: 61 }), // Define os frames da animação para parar olhando para a direita
        frameRate: 5, // Velocidade mais lenta para a animação de parada
        repeat: -1, // Loop infinito
      });
      this.anims.create({
        key: "stop_up", // Nome da animação para parar olhando para cima
        frames: this.anims.generateFrameNumbers("player", { start: 62, end: 67 }), // Define os frames da animação para parar olhando para cima
        frameRate: 5, // Velocidade mais lenta para a animação de parada
        repeat: -1, // Loop infinito
      });
      this.anims.create({
        key: "stop_left", // Nome da animação para parar olhando para a esquerda
        frames: this.anims.generateFrameNumbers("player", { start: 68, end: 73 }), // Define os frames da animação para parar olhando para a esquerda
        frameRate: 5, // Velocidade mais lenta para a animação de parada
        repeat: -1, // Loop infinito
      });
    }

    moveNpcMobile() {
      // Se o jogador já voltou do Trash, não move mais o NPC
      if (this.returnedFromTrash) return; // Verifica se o jogador já voltou do minijogo do lixo e interrompe o movimento do NPC móvel

      this.npcMobile.x += this.npcMobile.direction * this.npcMobile.velocity * this.game.loop.delta / 1000; // Move o NPC móvel na direção e velocidade definidas, ajustando pelo delta time do jogo

      if (this.npcMobile.x <= this.npcMobile.initialPosition - this.npcMobile.maxDistance) { // Verifica se o NPC atingiu a distância máxima para a esquerda
        this.npcMobile.direction = 1; // Altera a direção para a direita
        this.npcMobile.setFlipX(true); // Vira o sprite do NPC para a direita
      } else if (this.npcMobile.x >= this.npcMobile.initialPosition) { // Verifica se o NPC voltou à posição inicial
        this.npcMobile.direction = -1; // Altera a direção para a esquerda
        this.npcMobile.setFlipX(false); // Vira o sprite do NPC para a esquerda
      }
    }

    addNpcMobileFixo() {
      console.log("Adicionando NPC fixo"); // Loga no console que o NPC fixo está sendo adicionado
      this.npcMobile = this.physics.add.sprite(width - 720, height - 430, 'npcMobile'); // Adiciona o NPC fixo na posição especificada
      this.npcMobile.setScale(2.5); // Define o tamanho do NPC fixo
      this.npcMobile.setFlipX(true); // Vira o NPC fixo para a esquerda
      this.npcMobile.setImmovable(true); // Define o NPC fixo como imóvel para colisões
      this.npcMobile.anims.stop(); // Para qualquer animação em execução no NPC fixo

      this.createIndicatorNpcMobile(); // Ativa o indicador de interação para o NPC fixo
    }

    createIndicatorNpcMobile() {
      this.indicatorNpcMobile = this.physics.add.sprite(this.npcMobile.x, this.npcMobile.y - 50, 'indicator'); // Adiciona o indicador de interação acima do NPC móvel
      this.indicatorNpcMobile.setScale(0.2); // Define o tamanho do indicador
      this.indicatorNpcMobile.setImmovable(true); // Define o indicador como imóvel para colisões
      this.indicatorNpcMobile.play("exclaiming"); // Inicia a animação de exclamação do indicador

      this.physics.add.overlap(this.player, this.indicatorNpcMobile, () => { // Adiciona detecção de sobreposição entre o jogador e o indicador
        if (!this.npcMobileInteracted && !this.keyENpcMobile) { // Verifica se o NPC móvel ainda não foi interagido e se a tecla "E" não foi exibida
          this.indicatorNpcMobile.destroy(); // Remove o indicador de interação

          this.keyENpcMobile = this.add.image(this.npcMobile.x, this.npcMobile.y - 40, 'keyE').setScale(0.07); // Adiciona o ícone da tecla "E" acima do NPC móvel
          this.canInteractWithNpcMobile = true; // Permite interação com o NPC móvel
        }
      });
    }

    showNpcMobileInteraction() {
      const speech = [ // Define as falas do NPC móvel
        "Nossa, muito obrigado, isso significava muito para mim!", // Primeira fala
        "Como recompensa eu vou mostrar as minhas anotações que irão te ajudar a se preparar para uma entrevista.", // Segunda fala
        "Vá até a mesa e pegue o caderno em cima dela, lá você encontrará dicas para ir bem em uma entrevista." // Terceira fala
      ];
      const balloonText = this.add.image(this.npcMobile.x + 80, this.npcMobile.y - 80, "balloonText").setScale(0.9); // Adiciona o balão de fala acima do NPC móvel
      const text = this.add.text(this.npcMobile.x + 2, this.npcMobile.y - 140, speech[0], { // Adiciona o texto da primeira fala no balão
        fontSize: "14px", // Define o tamanho da fonte
        fill: "#000000", // Define a cor do texto
        wordWrap: { width: balloonText.width - 20 }, // Define a largura máxima para quebra de linha
      });

      let currentIndex = 0; // Inicializa o índice da fala atual
      this.input.keyboard.on("keydown-ENTER", () => { // Adiciona evento para a tecla "ENTER"
        currentIndex++; // Avança para a próxima fala
        if (currentIndex < speech.length) { // Verifica se ainda há falas restantes
          text.setText(speech[currentIndex]); // Atualiza o texto com a próxima fala
        } else { // Se todas as falas foram exibidas
          text.setVisible(false); // Esconde o texto
          balloonText.setVisible(false); // Esconde o balão de fala
          this.input.keyboard.off("keydown-ENTER"); // Remove o evento da tecla "ENTER"

          if (this.keyEnterNpcMobile) { // Verifica se o ícone da tecla "ENTER" existe
            this.keyEnterNpcMobile.destroy(); // Remove o ícone da tecla "ENTER"
            this.keyEnterNpcMobile = null; // Reseta a referência do ícone
          }

          this.npcMobileInteractionFinished = true; // Marca que a interação com o NPC móvel foi concluída
          this.createBook(); // Cria o objeto livro
          this.createIndicatorBook(); // Cria o indicador de interação para o livro
        }
      });
    }

    createRafaelaAnimations() {
      this.anims.create({
        key: "rafaela", // Nome da animação para Rafaela
        frames: this.anims.generateFrameNumbers('rafaela', { start: 0, end: 11 }), // Define os frames da animação de Rafaela
        frameRate: 4, // Velocidade da animação
        repeat: -1, // Repetição infinita
      });
    }
    
    addRafaela(width, height) {
      const rafaela = this.physics.add.sprite(width - 400, height - 600, 'rafaela');
      rafaela.setScale(2.5);
      rafaela.setImmovable(true);
      this.rafaela = rafaela;
      this.createRafaelaAnimations();
      this.rafaela.anims.play('rafaela');
    
      // Cria a exclamação acima da Rafaela
      this.exclamation = this.physics.add.sprite(width - 400, height - 660, "indicator").setScale(0.2);
      this.exclamation.play("exclaiming");
      // ADIÇÃO: Adiciona a exclamação ao array de indicadores ativos
      this.activeIndicators.push(this.exclamation);
    
      this.indicatorSoundRafaela = this.sound.add('indicatorSound', { loop: true, volume: 10 });
      this.indicatorSoundRafaela.play();
    
      this.indicatorRafaelaActive = true;
    
      rafaela.setInteractive();
      rafaela.on("pointerdown", () => {
        this.showRafaelaInteraction();
      });
    
      this.input.keyboard.on('keydown-E', () => {
        if (this.canInteractWithRafaela && !this.rafaelaInteracted) {
          this.rafaelaInteracted = true;
          this.buttonClick.play();
          this.showRafaelaInteraction();
    
          if (this.keyERafaela) {
            this.keyERafaela.destroy();
            this.keyERafaela = null;
          }
    
          if (!this.keyEnterRafaela) {
            this.keyEnterRafaela = this.add.image(this.rafaela.x, this.rafaela.y - 60, 'keyENTER').setScale(0.1).setDepth(1000);
          }
        }
      });
    }    
    getClosestIndicator() {
      if (this.activeIndicators.length === 0) return null;
      let closest = this.activeIndicators[0];
      let minDist = Phaser.Math.Distance.Between(this.player.x, this.player.y, closest.x, closest.y);
      for (let i = 1; i < this.activeIndicators.length; i++) {
        let indicator = this.activeIndicators[i];
        let dist = Phaser.Math.Distance.Between(this.player.x, this.player.y, indicator.x, indicator.y);
        if (dist < minDist) {
          closest = indicator;
          minDist = dist;
        }
      }
      return closest;
    }
    
    showRafaelaInteraction() {
      this.exclamation.setVisible(false); // Esconde o ícone de exclamação acima de Rafaela

      const speechRafaela = [
        "Olá! Bem-Vindo a Vice-Presidência de Pessoas", // Primeira fala de Rafaela
        "aqui você irá aprender a lidar com colaboradores e receber dicas para uma entrevista.", // Segunda fala de Rafaela
        "Você pode notar que o Rodrigo está tendo uma crise", // Terceira fala de Rafaela
        "isso porque jogaram o porta retratos dele no lixo, você poderia ajudá-lo?", // Quarta fala de Rafaela
        "Basta ir até a lixeira, coletar a imagem rasgada e melhorar o humor de Rodrigo com as carinhas felizes.", // Quinta fala de Rafaela
        "Boa Sorte!", // Última fala de Rafaela
      ]; // Array contendo as falas de Rafaela

      const width = this.scale.width; // Obtém a largura da tela
      const height = this.scale.height; // Obtém a altura da tela
      const balloonText = this.add.image(width - 500, height - 680, "balloonText").setScale(0.9); // Adiciona o balão de fala acima de Rafaela
      balloonText.setFlipX(true); // Inverte a imagem do balão para o lado correto
      const text = this.add.text(width - 580, height - 737, speechRafaela[0], { // Adiciona o texto da primeira fala no balão
        fontSize: "14px", // Define o tamanho da fonte
        fill: "#000000", // Define a cor do texto
        wordWrap: { width: balloonText.width - 20 }, // Define a largura máxima para quebra de linha
      });

      let currentSpeechIndex = 0; // Inicializa o índice da fala atual
      this.input.keyboard.on("keydown-ENTER", () => { // Adiciona evento para a tecla "ENTER"
        currentSpeechIndex++; // Avança para a próxima fala
        if (currentSpeechIndex < speechRafaela.length) { // Verifica se ainda há falas restantes
          text.setText(speechRafaela[currentSpeechIndex]); // Atualiza o texto com a próxima fala
          this.buttonClick.play(); // Toca o som de clique
        } else { // Se todas as falas foram exibidas
          balloonText.setVisible(false); // Esconde o balão de fala
          text.setVisible(false); // Esconde o texto
          this.input.keyboard.off("keydown-ENTER"); // Remove o evento da tecla "ENTER"

          if (this.keyEnterRafaela) { // Verifica se o ícone da tecla "ENTER" existe
            this.keyEnterRafaela.destroy(); // Remove o ícone da tecla "ENTER"
            this.keyEnterRafaela = null; // Reseta a referência do ícone
          }

          this.showIndicatorTrash(); // Mostra o indicador de interação com o lixo
       


        }
      });
    }

    showIndicatorTrash() {
      this.createIndicatorTrash(); // Ativa o indicador e som do lixo
      
    }
      
    onShutdown() {
      // Salva o tempo atual da música e a para quando a cena é pausada ou encerrada
      if (this.peopleMusic && this.peopleMusic.isPlaying) { // Verifica se a música de fundo está tocando
        VpPessoasScene.lastMusicTime = this.peopleMusic.seek; // Salva o tempo atual da música
        this.peopleMusic.stop(); // Para a música de fundo
      }
    }

    createTrash() {
      // Cria o sprite do lixo (sem exclamação)
      this.trash = this.physics.add.sprite(width - 735, height - 570, 'trash');
      this.trash.setScale(0.1);
      this.trash.setImmovable(true);
    
      // Configura o overlap para permitir a interação com o lixo
      this.physics.add.overlap(this.player, this.trash, () => {
        this.canInteractWithTrash = true;
        if (!this.keyETrash) {
          this.keyETrash = this.add.image(this.trash.x, this.trash.y - 40, 'keyE').setScale(0.07);
        }
      });
    }
    
    showIndicatorTrash() {
      // Cria o indicador de exclamação acima do lixo somente após o diálogo
      this.trashIndicator = this.physics.add.sprite(this.trash.x, this.trash.y - 60, 'indicator');
      this.trashIndicator.setScale(0.2);
      this.trashIndicator.setImmovable(true);
      this.trashIndicator.play("exclaiming");
    
      // Adiciona o indicador ao array de indicadores ativos para que a seta aponte para ele
      this.activeIndicators.push(this.trashIndicator);
    
      // Toca o som de alerta para o indicador
      this.indicatorSoundTrash = this.sound.add('indicatorSound', { loop: true, volume: 10 });
      this.indicatorSoundTrash.play();
    
      // Configura o overlap para que, se o jogador tocar no indicador, ele desapareça
      this.physics.add.overlap(this.player, this.trashIndicator, () => {
        if (this.indicatorTrashActive) {
          this.indicatorSoundTrash.stop();
          this.trashIndicator.destroy();
          this.indicatorTrashActive = false;
        }
      });
    
      this.indicatorTrashActive = true;
    }
    
    

    createBook() {
      const book = this.physics.add.sprite(width - 700, height - 250, 'book'); // Adiciona o sprite do livro na posição especificada
      book.setScale(0.06); // Define o tamanho do sprite do livro
      book.setImmovable(true); // Define o livro como imóvel para colisões

      this.physics.add.overlap(this.player, book, () => { // Adiciona detecção de sobreposição entre o jogador e o livro
        this.canInteractWithBook = true; // Permite interação com o livro

        if (!this.keyEBook) { // Verifica se o ícone da tecla "E" ainda não foi criado
          this.keyEBook = this.add.image(width - 700, height - 250, 'keyE').setScale(0.07); // Adiciona o ícone da tecla "E" acima do livro
        }
      });

      // Detectar quando sai da zona de interação (usando evento de update com verificação de distância)
      this.book = book; // Salva o objeto do livro para usar no método update
    }

    createIndicatorBook() {
      this.indicatorBook = this.physics.add.sprite(width - 700, height - 300, 'indicator');
      this.indicatorBook.setScale(0.2);
      this.indicatorBook.setImmovable(true);
      this.indicatorBook.play("exclaiming");
    
      // ADICIONE ESTA LINHA:
      this.activeIndicators.push(this.indicatorBook);
    
      // Som e overlap...
      this.indicatorSoundBook = this.sound.add('indicatorSound', { loop: true, volume: 10 });
      this.indicatorSoundBook.play();
    
      this.physics.add.overlap(this.player, this.indicatorBook, () => {
        if (this.indicatorBookActive) {
          this.indicatorSoundBook.stop();
          this.indicatorBook.destroy();
          this.indicatorBookActive = false;
        }
      });
    
      this.indicatorBookActive = true;
    }
    

    

    createButtonBack() {
      console.log("Adicionando botão de voltar"); // Loga no console que o botão de voltar está sendo adicionado
      if (this.botaoVoltar) return; // impede criar mais de uma vez

      this.botaoVoltar = this.add.image(width - 508, height - 660, "keyE"); // Adiciona o botão de voltar na posição especificada
      this.botaoVoltar.setScale(0.07); // Define o tamanho do botão de voltar
      this.botaoVoltar.setDepth(1000); // Coloca o botão acima de outros objetos

      this.input.keyboard.on("keydown-E", () => { // Adiciona evento para a tecla "E"
        const distancia = Phaser.Math.Distance.Between(
          this.player.x, this.player.y, // Posição do jogador
          this.botaoVoltar.x, this.botaoVoltar.y // Posição do botão de voltar
        );

      if (distancia < 100) { // Verifica se o jogador está próximo do botão de voltar
        // Pausa todos os sons da cena
        this.sound.stopAll();

        this.scene.stop("vpPessoasScene"); // Para a cena atual
        this.scene.start("elevadorScene", {selectedSpriteSheet: this.selectedSpriteSheet,}); // Inicia a cena do elevador
      }
      });
    }

    resume() {
      if (this.keyETrash) { // Verifica se o ícone da tecla "E" do lixo existe
        this.keyETrash.destroy(); // Remove o ícone da tecla "E" do lixo
        this.keyETrash = null; // Reseta a referência do ícone
      }

      if (this.keyEBook) { // Verifica se o ícone da tecla "E" do livro existe
        this.keyEBook.destroy(); // Remove o ícone da tecla "E" do livro
        this.keyEBook = null; // Reseta a referência do ícone
      }

      if (this.rafaelaInteracted && !this.returnedFromTrash) { // Verifica se Rafaela foi interagida e o jogador ainda não voltou do minijogo do lixo
        this.returnedFromTrash = true; // Marca que o jogador voltou do minijogo do lixo

        if (this.npcMobile) { // Verifica se o NPC móvel existe
          this.npcMobile.destroy(); // Remove o NPC móvel
          this.npcMobile = null; // Reseta a referência do NPC móvel
        }

        if (!this.npcMobileFixedCreated) { // Verifica se o NPC fixo ainda não foi criado
          this.npcMobileFixedCreated = true; // Marca que o NPC fixo foi criado
          this.addNpcMobileFixo(); // Adiciona o NPC fixo
        }
      }

      // Se o livro foi lido pela primeira vez, ativa a tecla "E" do elevador
      const bookRead = this.registry.get('bookRead'); // Verifica se o livro foi lido
      if (bookRead && !this.botaoVoltar) { // Se o livro foi lido e o botão de voltar ainda não foi criado
        this.createButtonBack(); // Cria o botão de voltar
      }
    }
}

// Propriedade estática para armazenar o tempo de reprodução da música
VpPessoasScene.lastMusicTime = 0;

class bookScene extends Phaser.Scene {
  constructor() {
    super({ key: 'bookScene' });
  }

  preload() {
    this.load.image('arrowYellow', '../assets/assetsBookVPPessoas/arrow_yellow.png'); // Carrega a imagem da seta amarela
    this.load.image('backgroundTable', '../assets/assetsBookVPPessoas/backgroundTable.png'); // Carrega a imagem do fundo da mesa
    this.load.image('bookTable', '../assets/assetsBookVPPessoas/caderno.png'); // Carrega a imagem do caderno
    this.load.image('column1', '../assets/assetsBookVPPessoas/coluna1.png'); // Carrega a imagem da coluna 1
    this.load.image('column2', '../assets/assetsBookVPPessoas/coluna2.png'); // Carrega a imagem da coluna 2
    this.load.image('column3', '../assets/assetsBookVPPessoas/coluna3.png'); // Carrega a imagem da coluna 3
    this.load.image('column4', '../assets/assetsBookVPPessoas/coluna4.png'); // Carrega a imagem da coluna 4
    this.load.image('column5', '../assets/assetsBookVPPessoas/coluna5.png'); // Carrega a imagem da coluna 5
    this.load.image('board', '../assets/assetsBookVPPessoas/prancheta.png'); // Carrega a imagem da prancheta
    this.load.image('answer1', '../assets/assetsBookVPPessoas/topico1.png'); // Carrega a imagem da resposta 1
    this.load.image('answer2', '../assets/assetsBookVPPessoas/topico2.png'); // Carrega a imagem da resposta 2
    this.load.image('answer3', '../assets/assetsBookVPPessoas/topico3.png'); // Carrega a imagem da resposta 3
    this.load.image('answer4', '../assets/assetsBookVPPessoas/topico4.png'); // Carrega a imagem da resposta 4
    this.load.image('answer5', '../assets/assetsBookVPPessoas/topico5.png'); // Carrega a imagem da resposta 5

    this.load.audio('buttonSound', '../assets/sounds/687107__aphom000__mouse-2-button-fast-click.wav'); // Carrega o som de clique do botão
    this.load.audio('soundPaper', '../assets/sounds/484957__spacejoe__page-turns-2 (mp3cut.net).wav'); // Carrega o som de virar página
  }

  create() {
    this.add.image(width / 2, height / 2, 'backgroundTable').setScale(0.7); // Adiciona a imagem de fundo da mesa e ajusta o tamanho
    this.add.image(width - 960, height - 340, 'bookTable').setScale(0.7); // Adiciona a imagem do caderno e ajusta o tamanho

    this.createArrow(); // Cria a seta para voltar
    this.createColumns(); // Cria as colunas interativas
    this.createBoard(); // Cria o quadro para exibir as respostas
  }

  buttonSound() {
    this.buttonClick = this.sound.add('buttonSound', { loop: false, volume: 10 }); // Adiciona o som de clique do botão
    this.buttonClick.play(); // Toca o som de clique do botão
  }

  soundPaper() {
    this.pageTurn = this.sound.add('soundPaper', { loop: false, volume: 10 }); // Adiciona o som de virar página
    this.pageTurn.play(); // Toca o som de virar página
  }

  createArrow() {
    const buttonArrow = this.add.image(width - 1200, height - 70, 'arrowYellow'); // Adiciona a seta amarela na posição especificada
    buttonArrow.setInteractive(); // Torna a seta interativa para cliques
    buttonArrow.setScale(0.8); // Define o tamanho da seta
    buttonArrow.on('pointerdown', () => { // Adiciona evento de clique na seta
      this.buttonSound(); // Toca o som de clique do botão

      // Sinaliza que o livro foi lido
      this.registry.set('bookRead', true); // Define no registro que o livro foi lido

      this.scene.stop('bookScene'); // Para a cena atual do livro

      // Acessa a cena principal e chama o método resume() manualmente
      const principalScene = this.scene.get('vpPessoasScene'); // Obtém a cena principal
      principalScene.resume(); // Chama o método resume() da cena principal

      this.scene.resume('vpPessoasScene'); // Retoma a cena principal visualmente
    });
  }

  createColumns() {
    const column1 = this.add.image(width - 1105, height - 490, 'column1').setScale(0.7); // Adiciona a coluna 1 na posição especificada e define o tamanho
    const column2 = this.add.image(width - 1118, height - 430, 'column2').setScale(0.7); // Adiciona a coluna 2 na posição especificada e define o tamanho
    const column3 = this.add.image(width - 1110, height - 355, 'column3').setScale(0.7); // Adiciona a coluna 3 na posição especificada e define o tamanho
    const column4 = this.add.image(width - 1108, height - 275, 'column4').setScale(0.7); // Adiciona a coluna 4 na posição especificada e define o tamanho
    const column5 = this.add.image(width - 1100, height - 200, 'column5').setScale(0.7); // Adiciona a coluna 5 na posição especificada e define o tamanho

    const columns = [column1, column2, column3, column4, column5]; // Cria um array com todas as colunas

    columns.forEach((column, index) => { // Itera sobre cada coluna
      column.setInteractive(); // Torna a coluna interativa para cliques

      column.on('pointerover', () => { // Adiciona evento ao passar o cursor sobre a coluna
        column.setScale(0.8); // Aumenta o tamanho da coluna ao passar o cursor
      });

      column.on('pointerout', () => { // Adiciona evento ao tirar o cursor da coluna
        column.setScale(0.7); // Volta ao tamanho normal da coluna
      });

      column.on('pointerdown', () => { // Adiciona evento de clique na coluna
        this.column = index + 1; // Define a coluna selecionada com base no índice
        this.buttonSound(); // Toca o som de clique do botão
        this.createBoard(); // Atualiza o quadro com base na coluna selecionada
      });
    });
  }

  createBoard() {
    this.add.image(width - 460, height - 377, 'board').setScale(0.7); // Adiciona a imagem do quadro na posição especificada e ajusta o tamanho

    switch (this.column) { // Verifica qual coluna foi selecionada
      case 1:
        this.add.image(width - 460, height - 377, 'answer1').setScale(0.7); // Adiciona a imagem da resposta 1 no quadro e ajusta o tamanho
        this.soundPaper(); // Toca o som de virar página
        break;
      case 2:
        this.add.image(width - 460, height - 377, 'answer2').setScale(0.7); // Adiciona a imagem da resposta 2 no quadro e ajusta o tamanho
        this.soundPaper(); // Toca o som de virar página
        break;
      case 3:
        this.add.image(width - 460, height - 377, 'answer3').setScale(0.7); // Adiciona a imagem da resposta 3 no quadro e ajusta o tamanho
        this.soundPaper(); // Toca o som de virar página
        break;
      case 4:
        this.add.image(width - 460, height - 377, 'answer4').setScale(0.7); // Adiciona a imagem da resposta 4 no quadro e ajusta o tamanho
        this.soundPaper(); // Toca o som de virar página
        break;
      case 5:
        this.add.image(width - 460, height - 377, 'answer5').setScale(0.7); // Adiciona a imagem da resposta 5 no quadro e ajusta o tamanho
        this.soundPaper(); // Toca o som de virar página
        break;
    }
  }
}

VpPessoasScene.lastMusicTime = 0;
