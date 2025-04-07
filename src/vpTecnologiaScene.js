class VpTecnologiaScene extends Phaser.Scene {
  constructor() {
      super({ key: 'vpTecnologiaScene' });
  }

  preload() {
      //Carrega o mapa do Tiled e os tilesets
      this.load.tilemapTiledJSON('vpTecnologia', '../assets/vp_tecnologia/mapa.json'); // Carrega o arquivo JSON do mapa
      this.load.image('decoracao', '../assets/mapaVPPessoas/decoracao.png'); // Carrega a imagem do tileset de decoração
      this.load.image('paredes', '../assets/mapaVPPessoas/paredes.png'); // Carrega a imagem do tileset de paredes
      this.load.spritesheet('player', '../assets/Player.png', { frameWidth: 32, frameHeight: 32 }); // Carrega o spritesheet do jogador

      this.load.audio('walkSound', '../assets/sounds/753292__vrymaa__footsteps-high-heels-hardwood-walk-run (mp3cut.net).wav'); // Carrega o som de passos

      //assets para o mini game
      this.load.image("box","../assets/upskilling.png");//carrega o fundo do mini game
      this.load.image("word1", "../assets/upskillingBotão1.png");//Carrega a botão 1
      this.load.image("word2", "../assets/upskillingBotão2.png");//Carrega o botão 2
      this.load.image("word3", "../assets/upskillingBotão3.png");//Carrega o botão 3
      this.load.image("word4", "../assets/upskillingBotão4.png");//Carrega o botão 4
  }

  create() {
    const width = this.cameras.main.width; // Obtém a largura da câmera principal
    const height = this.cameras.main.height; // Obtém a altura da câmera principal

    const offsetX = this.scale.width - 1270; // Define a posição x parra as camadas
    const map = this.make.tilemap({ key: "vpTecnologia", tileWidth: 25, tileHeight: 20 }); // Cria o mapa usando o JSON carregado
    const tileset1 = map.addTilesetImage("decoracao"); // Adiciona o tileset de decoração ao mapa
    const tileset2 = map.addTilesetImage("paredes"); // Adiciona o tileset de paredes ao mapa

    const layer1 = map.createLayer("paredePiso", tileset2, offsetX, 0).setScale(2.5); // Cria a camada de piso e paredes
    const layer2 = map.createLayer("tapete", tileset1, offsetX, 0).setScale(2.5); // Cria a camada de tapete
    const layer3 = map.createLayer("parede", tileset2, offsetX, 0).setScale(2.5); // Cria a camada de paredes
    const layer4 = map.createLayer("cadeira", tileset1, offsetX, 0).setScale(2.5); // Cria a camada de cadeiras
    const layer5 = map.createLayer("tv", tileset1, offsetX, 0).setScale(2.5); // Cria a camada de TVs
    const layer6 = map.createLayer("sofa", tileset1, offsetX, 0).setScale(2.5); // Cria a camada de sofás
    const layer7 = map.createLayer("elevador", tileset1, offsetX, 0).setScale(2.5); // Cria a camada de elevadores

    let layers = [layer1, layer2, layer3, layer4, layer5, layer6, layer7]; // Agrupa todas as camadas em uma lista
    layers.forEach(layer => {
        layer.setCollisionByProperty({ collider: true }); // Configura colisão para as camadas com a propriedade "collider"
    });

    this.physics.world.setBounds(0, 0, width, height); // Define os limites do mundo para coincidir com as dimensões da câmera

    this.createPlayer(width, height); // Cria o jogador
    this.player.setCollideWorldBounds(true); // Faz o jogador colidir com os limites do mundo

    this.createPlayerAnimations(); // Cria as animações do jogador
    this.createButtonBack(width, height);//cria botão de voltar

    this.physics.add.collider(this.player, layer1); // Configura colisão com a camada de piso e paredes
    this.physics.add.collider(this.player, layer3); // Configura colisão com a camada de paredes
    this.physics.add.collider(this.player, layer4); // Configura colisão com a camada de cadeiras
    this.physics.add.collider(this.player, layer5); // Configura colisão com a camada de TVs
    this.physics.add.collider(this.player, layer6); // Configura colisão com a camada de sofás

    this.keys = this.input.keyboard.addKeys({
        up: Phaser.Input.Keyboard.KeyCodes.W, // Tecla W para mover para cima
        down: Phaser.Input.Keyboard.KeyCodes.S, // Tecla S para mover para baixo
        left: Phaser.Input.Keyboard.KeyCodes.A, // Tecla A para mover para a esquerda
        right: Phaser.Input.Keyboard.KeyCodes.D, // Tecla D para mover para a direita
        interagir: Phaser.Input.Keyboard.KeyCodes.E, // Tecla E para interagir
        ENTER: Phaser.Input.Keyboard.KeyCodes.ENTER // Tecla Enter para ações adicionais
    });

    this.walkSound = this.sound.add('walkSound', {loop: false, volume: 2}); // Adiciona o som de passos com volume e sem loop
  }

  update() {
      this.movePlayer(); // Atualiza o movimento do jogador a cada frame
  }

  createPlayer(width, height) {
      this.player = this.physics.add.sprite(width - 405, height - 100, "player"); // Cria o sprite do jogador com posição inicial
      this.player.setScale(2.5); // Ajusta o tamanho do jogador
    }
  
  createPlayerAnimations() {
    // Walking animations
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

    // Idle animations
    this.anims.create({
      key: "idle_down",
      frames: this.anims.generateFrameNumbers("player", { start: 74, end: 79 }),
      frameRate: 5,
      repeat: -1,
    });
    this.anims.create({
      key: "idle_up",
      frames: this.anims.generateFrameNumbers("player", { start: 62, end: 67 }),
      frameRate: 5,
      repeat: -1,
    });
    this.anims.create({
      key: "idle_right",
      frames: this.anims.generateFrameNumbers("player", { start: 56, end: 61 }),
      frameRate: 5,
      repeat: -1,
    });
    this.anims.create({
      key: "idle_left",
      frames: this.anims.generateFrameNumbers("player", { start: 68, end: 73 }),
      frameRate: 5,
      repeat: -1,
    });
  }

  movePlayer() {
    const speed = 150;
    let moving = false;
    this.lastDirection = this.lastDirection || 'down'; // Default direction

    if (this.keys.left.isDown) {
      this.player.setVelocityX(-speed);
      this.player.anims.play("walk_left", true);
      this.lastDirection = 'left';
      moving = true;
    } else if (this.keys.right.isDown) {
      this.player.setVelocityX(speed);
      this.player.anims.play("walk_right", true);
      this.lastDirection = 'right';
      moving = true;
    } else {
      this.player.setVelocityX(0);
    }

    if (this.keys.up.isDown) {
      this.player.setVelocityY(-speed);
      this.player.anims.play("walk_up", true);
      this.lastDirection = 'up';
      moving = true;
    } else if (this.keys.down.isDown) {
      this.player.setVelocityY(speed);
      this.player.anims.play("walk_down", true);
      this.lastDirection = 'down';
      moving = true;
    } else {
      this.player.setVelocityY(0);
    }

    if (!moving) {
      this.player.anims.play(`idle_${this.lastDirection}`, true);
      this.walkSound.stop();
    } else if (!this.walkSound.isPlaying) {
      this.walkSound.play();
    }
  }

  createButtonBack(width, height) {
    const buttonBack = this.add.image(width - 700, height - 680, "keyE"); // Adiciona a imagem do botão de retorno na posição especificada
    buttonBack.setScale(0.2); // Ajusta o tamanho da imagem do botão de retorno
    
    this.input.keyboard.on("keydown-E", () => { // Adiciona um evento para a tecla "E"
    const distance = Phaser.Math.Distance.Between( // Calcula a distância entre o jogador e o botão de retorno
        this.player.x, this.player.y, buttonBack.x, buttonBack.y // Coordenadas do jogador e do botão
    );
    
    if (distance < 100) { // Verifica se o jogador está próximo o suficiente do botão (raio de 100)
      // Pausa todos os sons da cena
      this.sound.stopAll();

      this.scene.stop("vpTecnologiaScene"); // Para a cena atual
      this.scene.start("elevadorScene"); // Inicia a cena do elevador
    }
    });
  }
}
