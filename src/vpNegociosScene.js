class VpNegociosScene extends Phaser.Scene {
    constructor() {
      super({ key: 'vpNegociosScene' });
      
    }

    preload() {
        this.load.tilemapTiledJSON('vpNegocios', '../assets/mapaVPNegocios/mapaVPNegocios.json'); // Carrega o arquivo JSON do mapa criado no Tiled
        this.load.image('decoracao', '../assets/mapaVPNegocios/decoracao.png'); // Carrega a imagem do tileset de decoração
        this.load.image('paredes', '../assets/mapaVPNegocios/paredes.png'); // Carrega a imagem do tileset de paredes

        this.load.spritesheet('player', '../assets/personagens/skinsPlayer/player1all.png', { frameWidth: 16, frameHeight: 32 }); // Carrega o spritesheet do jogador com dimensões de cada frame
        this.load.spritesheet("indicator", "../assets/exclamaçãoRoxa.png", {frameWidth: 254, frameHeight: 305,}); // Carrega o spritesheet do indicador de exclamação
        
        this.load.audio('indicatorSound', '../assets/sounds/497198_abacagi_bubble-pops (mp3cut.net).wav'); // Carrega o som do indicador de interação
        this.load.audio('walkSound', '../assets/sounds/753292__vrymaa__footsteps-high-heels-hardwood-walk-run (mp3cut.net).wav'); // Carrega o som de passos

        this.load.image('keyE', '../assets/teclaE.png'); // Carrega a imagem da tecla "E"
        this.load.image("bgElevNegocios", "../assets/bgelevadoroffice.png"); // Carrega a imagem de fundo do elevador
        this.load.image("panelElev", "../assets/painelelevador.png"); // Carrega a imagem do painel do elevador
        this.load.image("buttonElevNegocios", "../assets/botaocimaelevador.png"); // Carrega a imagem do botão do elevador
    }

    create() {
      const map = this.make.tilemap({ key: "vpNegocios", tileWidth: 25, tileHeight: 20 }); // Cria o mapa
      const tileset1 = map.addTilesetImage("decoracao"); // Adiciona o tileset de decoração ao mapa
      const tileset2 = map.addTilesetImage("paredes"); // Adiciona o tileset de paredes ao mapa

      const offsetX = width - 1270; // Define a posição x para as camadas
      const layer1 = map.createLayer("chao", tileset2, offsetX, 0).setScale(2.5); // Cria a camada "chao" e ajusta o tamanho
      const layer2 = map.createLayer("parede", tileset2, offsetX, 0).setScale(2.5); // Cria a camada "parede" e ajusta o tamanho
      const layer3 = map.createLayer("acabamento", tileset2, offsetX, 0).setScale(2.5); // Cria a camada "acabamento" e ajusta o tamanho
      const layer4 = map.createLayer("cadeiraTras", tileset1, offsetX, 0).setScale(2.5); // Cria a camada "cadeiraTras" e ajusta o tamanho
      const layer5 = map.createLayer("cadeira", tileset1, offsetX, 0).setScale(2.5); // Cria a camada "cadeira" e ajusta o tamanho
      const layer6 = map.createLayer("mesa", tileset1, offsetX, 0).setScale(2.5); // Cria a camada "mesa" e ajusta o tamanho
      const layer7 = map.createLayer("servidor", tileset1, offsetX, 0).setScale(2.5); // Cria a camada "servidor" e ajusta o tamanho
      const layer8 = map.createLayer("sofa", tileset1, offsetX, 0).setScale(2.5); // Cria a camada "sofa" e ajusta o tamanho
      const layer9 = map.createLayer("planta", tileset1, offsetX, 0).setScale(2.5); // Cria a camada "planta" e ajusta o tamanho
      const layer10 = map.createLayer("porta", tileset1, offsetX, 0).setScale(2.5); // Cria a camada "porta" e ajusta o tamanho
      const layer11 = map.createLayer("decoracao", tileset1, offsetX, 0).setScale(2.5); // Cria a camada "decoracao" e ajusta o tamanho

      [layer1, layer2, layer3, layer4, layer5, layer6, layer7, layer8, layer9, layer10, layer11].forEach(layer => {
      layer.setCollisionByProperty({ collider: true }); // Define colisões para as camadas com a propriedade "collider"
      });

      this.keys = this.input.keyboard.addKeys({
      up: Phaser.Input.Keyboard.KeyCodes.W, // Tecla W para mover para cima
      down: Phaser.Input.Keyboard.KeyCodes.S, // Tecla S para mover para baixo
      left: Phaser.Input.Keyboard.KeyCodes.A, // Tecla A para mover para a esquerda
      right: Phaser.Input.Keyboard.KeyCodes.D, // Tecla D para mover para a direita
      interagir: Phaser.Input.Keyboard.KeyCodes.E, // Tecla E para interagir
      ENTER: Phaser.Input.Keyboard.KeyCodes.ENTER // Tecla ENTER para ações adicionais
      });

      this.createPlayer(width, height); // Cria o jogador na posição inicial
      this.createPlayerAnimations(); // Cria as animações do jogador
      this.createAnimsIndicator(); // Cria a animação do indicador
      this.lastPosition = "down"; // Define a posição inicial do jogador como "down"
      this.createButtonBack(width, height); // Cria o botão de retorno

      this.physics.add.collider(this.player, layer2); // Colisão com a camada "parede"
      this.physics.add.collider(this.player, layer4); // Colisão com a camada "cadeiraTras"
      this.physics.add.collider(this.player, layer5); // Colisão com a camada "cadeira"
      this.physics.add.collider(this.player, layer6); // Colisão com a camada "mesa"
      this.physics.add.collider(this.player, layer7); // Colisão com a camada "servidor"
      this.physics.add.collider(this.player, layer8); // Colisão com a camada "sofa"
      this.physics.add.collider(this.player, layer9); // Colisão com a camada "planta"

      this.walkSound = this.sound.add('walkSound', {loop: false, volume: 2}); // Som de passos
      this.indicatorSound = this.sound.add('indicatorSound', {loop: true, volume: 1.5}); // Som do indicador de interação
      this.buttonClick = this.sound.add('buttonSound', {loop: false, volume: 10}); // Som do clique do botão

      // Dá zoom na tela do jogo e faz a câmera seguir o personagem
      this.cameras.main.startFollow(this.player); // Faz a câmera seguir o jogador
      this.cameras.main.setZoom(2); // Define o nível de zoom da câmera
    }

    update() { 
      this.movePlayer(); // Atualiza o movimento do jogador
    }

    movePlayer() {
      const speed = 150; // Define a velocidade do jogador
      let moving = false; // Variável para verificar se o jogador está se movendo
    
      if (this.keys.left.isDown) { // Verifica se a tecla "A" está pressionada
      this.player.setVelocityX(-speed); // Move o jogador para a esquerda
      this.lastPosition = "left"; // Atualiza a última posição para "esquerda"
      this.player.anims.play("walk_left", true); // Reproduz a animação de andar para a esquerda
      moving = true; // Define que o jogador está se movendo
      } else if (this.keys.right.isDown) { // Verifica se a tecla "D" está pressionada
      this.player.setVelocityX(speed); // Move o jogador para a direita
      this.lastPosition = "right"; // Atualiza a última posição para "direita"
      this.player.anims.play("walk_right", true); // Reproduz a animação de andar para a direita
      moving = true; // Define que o jogador está se movendo
      } else {
      this.player.setVelocityX(0); // Para o movimento horizontal do jogador
      }
    
      if (this.keys.up.isDown) { // Verifica se a tecla "W" está pressionada
      this.player.setVelocityY(-speed); // Move o jogador para cima
      this.lastPosition = "up"; // Atualiza a última posição para "cima"
      this.player.anims.play("walk_up", true); // Reproduz a animação de andar para cima
      moving = true; // Define que o jogador está se movendo
      } else if (this.keys.down.isDown) { // Verifica se a tecla "S" está pressionada
      this.player.setVelocityY(speed); // Move o jogador para baixo
      this.lastPosition = "down"; // Atualiza a última posição para "baixo"
      this.player.anims.play("walk_down", true); // Reproduz a animação de andar para baixo
      moving = true; // Define que o jogador está se movendo
      } else {
      this.player.setVelocityY(0); // Para o movimento vertical do jogador
      }
    
      if (!moving) { // Verifica se o jogador não está se movendo
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

    createPlayer(width, height) {
      this.player = this.physics.add.sprite(width - 670, height - 660, 'player'); // Cria o sprite do jogador na posição inicial
      this.player.setScale(2.5); // Ajusta o tamanho do jogador
    }

    createAnimsIndicator() {
      this.anims.create({
      key: "exclaiming", // Define a chave da animação como "exclaiming"
        frames: this.anims.generateFrameNumbers("indicator", {start: 0, end: 1}), // Gera os quadros da animação a partir do spritesheet "indicator"
        //velocidade da animação
        frameRate: 3, // Define a taxa de quadros por segundo da animação
        repeat: -1, // Faz a animação repetir indefinidamente
    });
    }

    createButtonBack(width, height) {
      const buttonBack = this.add.image(width - 670, height - 680, "keyE"); // Adiciona a imagem da tecla "E" na posição especificada
      buttonBack.setScale(0.2); // Reduz o tamanho da imagem para 20% do tamanho original

      this.input.keyboard.on("keydown-E", () => { // Adiciona um evento para quando a tecla "E" for pressionada
          const distance = Phaser.Math.Distance.Between( // Calcula a distância entre o jogador e o botão
              this.player.x, this.player.y, buttonBack.x, buttonBack.y // Coordenadas do jogador e do botão
          );

          if (distance < 100) { // Verifica se o jogador está dentro de um raio de 100 pixels do botão
              this.scene.stop("vpNegociosScene"); // Para a cena atual "vpNegociosScene"
              this.scene.start("elevadorScene"); // Inicia a cena "elevadorScene"
          }
      });
    }

  createPlayerAnimations() {
    this.anims.create({
      key: "walk_down", // Define a animação para andar para baixo
        frames: this.anims.generateFrameNumbers("player", { start: 130, end: 135 }), // Define os quadros da animação para andar para baixo
        frameRate: 10, // Define a taxa de quadros por segundo
         repeat: -1, // Faz a animação repetir indefinidamente
    });
    this.anims.create({
       key: "walk_right", // Define a animação para andar para a direita
         frames: this.anims.generateFrameNumbers("player", { start: 112, end: 117 }), // Define os quadros da animação para andar para a direita
         frameRate: 10, // Define a taxa de quadros por segundo
      repeat: -1, // Faz a animação repetir indefinidamente
    });
    this.anims.create({
       key: "walk_up", // Define a animação para andar para cima
        frames: this.anims.generateFrameNumbers("player", { start: 118, end: 123 }), // Define os quadros da animação para andar para cima
        frameRate: 10, // Define a taxa de quadros por segundo
      repeat: -1, // Faz a animação repetir indefinidamente
     });
    this.anims.create({
      key: "walk_left", // Define a animação para andar para a esquerda
        frames: this.anims.generateFrameNumbers("player", { start: 124, end: 129 }), // Define os quadros da animação para andar para a esquerda
        frameRate: 10, // Define a taxa de quadros por segundo
      repeat: -1, // Faz a animação repetir indefinidamente
    });
    this.anims.create({
      key: "stop_down", // Define a animação para o jogador parado olhando para baixo
        frames: this.anims.generateFrameNumbers("player", { start: 74, end: 79 }), // Define os quadros da animação para parado olhando para baixo
        frameRate: 5, // Define uma taxa de quadros mais lenta
      repeat: -1, // Faz a animação repetir indefinidamente
    });
    this.anims.create({
      key: "stop_right", // Define a animação para o jogador parado olhando para a direita
       frames: this.anims.generateFrameNumbers("player", { start: 56, end: 61 }), // Define os quadros da animação para parado olhando para a direita
       frameRate: 5, // Define uma taxa de quadros mais lenta
      repeat: -1, // Faz a animação repetir indefinidamente
    });
    this.anims.create({
      key: "stop_up", // Define a animação para o jogador parado olhando para cima
        frames: this.anims.generateFrameNumbers("player", { start: 62, end: 67 }), // Define os quadros da animação para parado olhando para cima
        frameRate: 5, // Define uma taxa de quadros mais lenta
      repeat: -1, // Faz a animação repetir indefinidamente
    });
    this.anims.create({
      key: "stop_left", // Define a animação para o jogador parado olhando para a esquerda
        frames: this.anims.generateFrameNumbers("player", { start: 68, end: 73 }), // Define os quadros da animação para parado olhando para a esquerda
        frameRate: 5, // Define uma taxa de quadros mais lenta
      repeat: -1, // Faz a animação repetir indefinidamente
    });
  }
}

