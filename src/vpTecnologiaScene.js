class VpTecnologiaScene extends Phaser.Scene {
  constructor() {
      super({ key: 'vpTecnologiaScene' });
  }

  init(data) {
    this.selectedSpriteSheet = data.selectedSpriteSheet;
   
  }

  preload() {
      //Carrega o mapa do Tiled e os tilesets
      this.load.tilemapTiledJSON('vpTecnologia', '../assets/vp_tecnologia/mapa.json'); // Carrega o arquivo JSON do mapa
      this.load.image('decoracao', '../assets/mapaVPPessoas/decoracao.png'); // Carrega a imagem do tileset de decoração
      this.load.image('paredes', '../assets/mapaVPPessoas/paredes.png'); // Carrega a imagem do tileset de paredes
      this.load.spritesheet('player', `../assets/personagens/skinsPlayer/players/${this.selectedSpriteSheet}.png`, {frameWidth: 16,frameHeight: 32,});

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

    this.createPlayer(width, height); // Cria o jogador
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
      this.anims.create({
        key: "walk_down", // Chave para a animação de caminhar para baixo
        frames: this.anims.generateFrameNumbers("player", { start: 130, end: 135 }), // Define os frames da animação
        frameRate: 10, // Define a taxa de quadros por segundo
        repeat: -1, // Faz a animação repetir indefinidamente
      });
      this.anims.create({
        key: "walk_right", // Chave para a animação de caminhar para a direita
        frames: this.anims.generateFrameNumbers("player", { start: 112, end: 117 }), // Define os frames da animação
        frameRate: 10, // Define a taxa de quadros por segundo
        repeat: -1, // Faz a animação repetir indefinidamente
      });
      this.anims.create({
        key: "walk_up", // Chave para a animação de caminhar para cima
        frames: this.anims.generateFrameNumbers("player", { start: 118, end: 123 }), // Define os frames da animação
        frameRate: 10, // Define a taxa de quadros por segundo
        repeat: -1, // Faz a animação repetir indefinidamente
      });
      this.anims.create({
        key: "walk_left", // Chave para a animação de caminhar para a esquerda
        frames: this.anims.generateFrameNumbers("player", { start: 124, end: 129 }), // Define os frames da animação
        frameRate: 10, // Define a taxa de quadros por segundo
        repeat: -1, // Faz a animação repetir indefinidamente
      });
      this.anims.create({
        key: "stop_down", // Chave para a animação de parada olhando para baixo
        frames: this.anims.generateFrameNumbers("player", { start: 74, end: 79 }), // Define os frames da animação
        frameRate: 5, // Define a taxa de quadros por segundo (mais lento)
        repeat: -1, // Faz a animação repetir indefinidamente
      });
      this.anims.create({
        key: "stop_right", // Chave para a animação de parada olhando para a direita
        frames: this.anims.generateFrameNumbers("player", { start: 56, end: 61 }), // Define os frames da animação
        frameRate: 5, // Define a taxa de quadros por segundo
        repeat: -1, // Faz a animação repetir indefinidamente
      });
      this.anims.create({
        key: "stop_up", // Chave para a animação de parada olhando para cima
        frames: this.anims.generateFrameNumbers("player", { start: 62, end: 67 }), // Define os frames da animação
        frameRate: 5, // Define a taxa de quadros por segundo
        repeat: -1, // Faz a animação repetir indefinidamente
      });
      this.anims.create({
        key: "stop_left", // Chave para a animação de parada olhando para a esquerda
        frames: this.anims.generateFrameNumbers("player", { start: 68, end: 73 }), // Define os frames da animação
        frameRate: 5, // Define a taxa de quadros por segundo
        repeat: -1, // Faz a animação repetir indefinidamente
      });
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
      this.scene.start("elevadorScene", {selectedSpriteSheet: this.selectedSpriteSheet,}); // Inicia a cena do elevador
    }
  });
  }
}

