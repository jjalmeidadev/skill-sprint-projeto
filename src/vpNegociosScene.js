class VpNegociosScene extends Phaser.Scene {
    constructor() {
      super({ key: 'vpNegociosScene' });
      this.npc15ChipCollected = false; // Variável para controlar se o chip do NPC 15 foi coletado
    }

    preload() {
        this.load.tilemapTiledJSON('vpNegocios', '../assets/mapaVPNegocios/mapaVPNegocios.json'); // Carrega o arquivo JSON do mapa criado no Tiled
        this.load.image('decoracao', '../assets/mapaVPNegocios/decoracao.png'); // Carrega a imagem do tileset de decoração
        this.load.image('paredes', '../assets/mapaVPNegocios/paredes.png'); // Carrega a imagem do tileset de paredes

        this.load.spritesheet('player', '../assets/personagens/skinsPlayer/player1all.png', { frameWidth: 16, frameHeight: 32 }); // Carrega o spritesheet do jogador com dimensões de cada frame
        this.load.spritesheet("indicator", "../assets/exclamaçãoRoxa.png", {frameWidth: 254, frameHeight: 305,}); // Carrega o spritesheet do indicador de exclamação
        this.load.spritesheet('chip', '../assets/minigameVpNegocios/chip.png', {frameWidth: 520, frameHeight: 520}); // Carrega o spritesheet do chip
        this.load.spritesheet('letterA', '../assets/minigameVpNegocios/letterA.png', {frameWidth: 288, frameHeight: 301}); // Carrega o spritesheet da Letra A
        this.load.spritesheet('letterB', '../assets/minigameVpNegocios/letterB.png', {frameWidth: 250, frameHeight: 297}); // Carrega o spritesheet da letra B

        this.load.spritesheet("npc14", "../assets/personagens/VPpessoas/npc14.png", { frameWidth: 16, frameHeight: 32 }); // Carrega o spritesheet do NPC 14
        this.load.spritesheet("npc15", "../assets/personagens/VPpessoas/npc15.png", { frameWidth: 16, frameHeight: 32 }); // Carrega o spritesheet do NPC 15
        this.load.spritesheet("npc10", "../assets/personagens/npc10Lift.png", {frameWidth: 16,  frameHeight: 32, }); // Carrega o spritesheet do NPC 10 no elevador

        //this.load.audio('indicatorSound', '../assets/sounds/497198_abacagi_bubble-pops (mp3cut.net).wav'); // Carrega o som do indicador de interação
        this.load.audio('walkSound', '../assets/sounds/753292__vrymaa__footsteps-high-heels-hardwood-walk-run (mp3cut.net).wav'); // Carrega o som de passos
        this.load.audio('correctSound', '../assets/sounds/476178__unadamlar__correct-choice.wav'); // Carrega o som de resposta correta
        this.load.audio('wrongSound', '../assets/sounds/700641__producing_raylite__incorrect-buzzer.wav'); // Carrega o som de resposta errada

        this.load.image('keyE', '../assets/teclaE.png'); // Carrega a imagem da tecla "E" para interação
        this.load.image('keyENTER', '../assets/keyEnter.png'); // Carrega a imagem da tecla "ENTER" para interação
        this.load.image("balloonText", "../assets/balaoTexto.png"); // Carrega a imagem do balão de texto
        this.load.image('locker', '../assets/minigameVpNegocios/locker.png'); // Carrega a imagem do cadeado
        this.load.image('congratulations5G', '../assets/minigameVpNegocios/congratulations5G.png'); // Carrega a image de parabens por coletar os 5 chips
        this.load.image('crashedWire', '../assets/assetsWires/crashedWire.png'); // Carrega a imagem dos fios quebrados
        this.load.image("bgElevNegocios", "../assets/bgelevadoroffice.png"); // Carrega a imagem de fundo do elevador
        this.load.image("panelElev", "../assets/painelelevador.png"); // Carrega a imagem do painel do elevador
        this.load.image("buttonElevNegocios", "../assets/botaocimaelevador.png"); // Carrega a imagem do botão do elevador
        this.load.image('screwDriver', '../assets/minigameVpNegocios/screwdriver.png') // Carrega a imagem da chave de fenda
    }

    create() {
      this.collectedChips = 0; // contador inicial

      // Verifica se o minigame foi concluído
      const minigameWiresCompleted = this.registry.get('minigameWiresCompleted') || false;
      // Verifica se há uma posição salva do jogador
      const savedPosition = this.registry.get('playerPosition');
      if (savedPosition) {
          this.player.setPosition(savedPosition.x, savedPosition.y); // Restaura a posição do jogador
      } else {
          this.createPlayer(width, height); // Cria o jogador na posição inicial
      }

      if (minigameWiresCompleted) {
          console.log("Minigame Wires já foi concluído. Progresso restaurado.");
          // Aqui você pode ajustar o estado do jogo, como remover o crashedWire ou exibir algo diferente
          if (this.crashedWire) {
              this.crashedWire.destroy(); // Remove o servidor quebrado
          }
      }

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
      this.createChips(); // Cria os chips 
      this.addNpc(); // Cria os NPCs no mapa

      this.physics.add.collider(this.player, layer2); // Colisão com a camada "parede"
      this.physics.add.collider(this.player, layer3); // Colisão com a camada "acabamento"
      this.physics.add.collider(this.player, layer4); // Colisão com a camada "cadeiraTras"
      this.physics.add.collider(this.player, layer5); // Colisão com a camada "cadeira"
      this.physics.add.collider(this.player, layer6); // Colisão com a camada "mesa"
      this.physics.add.collider(this.player, layer7); // Colisão com a camada "servidor"
      this.physics.add.collider(this.player, layer8); // Colisão com a camada "sofa"
      this.physics.add.collider(this.player, layer9); // Colisão com a camada "planta"
      const layer12 = map.createLayer("batente", tileset2, offsetX, 0).setScale(2.5); // Cria a camada "batente" depois de criar o player

      this.walkSound = this.sound.add('walkSound', {loop: false, volume: 2}); // Som de passos
      //this.indicatorSound = this.sound.add('indicatorSound', {loop: true, volume: 1.5}); // Som do indicador de interação
      this.buttonClick = this.sound.add('buttonSound', {loop: false, volume: 10}); // Som do clique do botão

      // Dá zoom na tela do jogo e faz a câmera seguir o personagem
      this.cameras.main.startFollow(this.player); // Faz a câmera seguir o jogador
      this.cameras.main.setZoom(2); // Define o nível de zoom da câmera

      this.chipText = this.add.text(width - 429, height - 230, `${this.collectedChips}/5`, {
        fontSize: '14px',
        fill: '#ffffff',
        fontFamily: 'Arial',
        //backgroundColor: 'rgba(0, 0, 0, 0.5)',
        padding: { x: 10, y: 5 }
      }).setDepth(1000);

      this.add.image(width - 410, height - 245, 'chip').setScale(0.03);
      this.createLocker();

      this.screwDriverCollected = false; // Inicializa como falso, indicando que a chave de fenda ainda não foi coletada
      this.createServer();
    }

    update() {
      this.movePlayer();

      // Verifica se a chave de fenda existe antes de tentar manipulá-la
      if (this.screwDriver && this.screwDriverCollected) {
        this.screwDriver.x = this.player.x; // Atualiza a posição horizontal
        this.screwDriver.y = this.player.y + 25; // Atualiza a posição vertical
      }

      if (this.canInteractWithNpc15 && Phaser.Input.Keyboard.JustDown(this.keys.interagir)) {
        if (!this.npc15Interacted) {
          if (this.keyENpc15) {
            this.keyENpc15.destroy();
            this.keyENpc15 = null;
          }
    
          if (!this.keyEnterNpc15) {
            this.keyEnterNpc15 = this.add.image(this.npc15.x - 40, this.npc15.y - 40, 'keyENTER').setScale(0.1).setDepth(1000);
          }
    
          this.npc15Interacted = true;
          this.canInteractWithNpc15 = false;
          this.npc15Question(); // Chama o diálogo com o NPC
        }
      }

      if(this.collectedChips === 4) {
        this.locker.destroy();
      }

          // Verifica se o jogador coletou todos os 5 chips
    if (this.collectedChips === 5 && !this.congratulationsShown) {
      this.showCongratulations(); // Exibe a imagem de parabéns
      this.congratulationsShown = true; // Garante que a imagem será exibida apenas uma vez
  }
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
      buttonBack.setScale(0.07); // Reduz o tamanho da imagem para 20% do tamanho original

      this.input.keyboard.on("keydown-E", () => { // Adiciona um evento para quando a tecla "E" for pressionada
      const distance = Phaser.Math.Distance.Between( // Calcula a distância entre o jogador e o botão
      this.player.x, this.player.y, buttonBack.x, buttonBack.y // Coordenadas do jogador e do botão
      );

      if (distance < 100) { // Verifica se o jogador está dentro de um raio de 100 pixels do botão
      // Pausa todos os sons da cena
      this.sound.stopAll();
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


    addNpc() {
      this.npc14 = this.physics.add.sprite(width - 470, height - 370, 'npc14'); // Adiciona o NPC 14 na posição especificada
      this.npc14.setScale(2.5); // Define o tamanho do NPC 14
      this.npc14.setImmovable(true); // Define o NPC 14 como imóvel para colisões
      this.createNpcAnimations(); // Cria as animações do NPC 14
      this.npc14.play('npc14'); // Inicia a animação "npc14" para o NPC 14

      this.npc15 = this.physics.add.sprite(width - 550, height - 370, 'npc15'); // Adiciona o NPC 15 na posição especificada
      this.npc15.setScale(2.5); // Define o tamanho do NPC 15
      this.npc15.setImmovable(true); // Define o NPC 15 como imóvel para colisões
      this.createNpcAnimations(); // Cria as animações do NPC 15
      this.npc15.anims.play('npc15'); // Inicia a animação "npc15" para o NPC 15
      this.createIndicatorNpc15(); // Ativa o indicador para o NPC
      //this.createCollisionNpc();

      this.npc10 = this.physics.add.sprite( width - 380, height - 580, 'npc10'); // Cria o sprite da NPC 10 na posição especificada
      this.npc10.setScale(2.5); // Define a escala do sprite da NPC 10
      this.npc10.setImmovable(true); // Define a NPC 10 como imóvel
      this.createNpcAnimations(); // Cria as animações para os NPCs
      this.npc10.anims.play('npc10'); // Reproduz a animação "npc10" para a NPC 10
      this.createIndicatorNpc10();
    }

    createNpcAnimations() { 
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

      this.anims.create({ // Cria a animação "npc10" para a NPC 10
        key: "npc10", // Nome da animação
        frames: this.anims.generateFrameNumbers('npc10', { start: 42, end: 55 }), // Define os quadros da animação
        frameRate: 6, // Velocidade da animação (quadros por segundo)
        repeat: -1, // Faz a animação repetir indefinidamente
      });
    }  

    createCollisionNpc() {
      this.physics.add.collider(this.player, this.npc14) // Colisão com o "NPC 14"
      this.physics.add.collider(this.player, this.npc15) // Colisão com o "NPC 15"
    }

    createServer() {
      this.crashedWire = this.physics.add.sprite(width - 1170, height - 220, 'crashedWire').setScale(0.06);
      this.crashedWire.setImmovable(true);

      // Adiciona o overlap entre o jogador e o crashedWire
      this.physics.add.overlap(this.player, this.crashedWire, () => {
          if (!this.keyECrashedWire && this.screwDriverCollected) { // Verifica se a chave de fenda foi coletada
              this.keyECrashedWire = this.add.image(this.crashedWire.x, this.crashedWire.y - 40, 'keyE').setScale(0.07).setDepth(1000);
              this.canInteractWithCrashedWire = true;
          }
      });

      // Remove a tecla E se o player se afasta
      this.physics.add.overlap(this.player, this.crashedWire, null, (player, wire) => {
          const distance = Phaser.Math.Distance.Between(player.x, player.y, wire.x, wire.y);
          if (distance > 100 && this.keyECrashedWire) {
              this.keyECrashedWire.destroy();
              this.keyECrashedWire = null;
              this.canInteractWithCrashedWire = false;
          }
          return true;
      }, this);

      // Adiciona a interação com o crashedWire
      this.input.keyboard.on("keydown-E", () => {
          if (this.canInteractWithCrashedWire) {
              this.canInteractWithCrashedWire = false;

              if (this.keyECrashedWire) {
                  this.keyECrashedWire.destroy(); // Remove a tecla E
                  this.keyECrashedWire = null;
              }

              if (this.screwDriver) {
                  this.screwDriver.destroy(); // Remove a chave de fenda
                  this.screwDriver = null;
                  this.screwDriverCollected = false; // Reseta o estado da chave de fenda
              }

              this.scene.pause('vpNegociosScene'); // Pausa a cena principal
              this.scene.launch('minigameWires'); // Inicia a cena do minigame
          }
      });
    }

    createIndicatorNpc10() {
      this.indicatorNpc10 = this.physics.add.sprite(this.npc10.x, this.npc10.y - 50, 'indicator');
      this.indicatorNpc10.setScale(0.2);
      this.indicatorNpc10.setImmovable(true);
      this.indicatorNpc10.play("exclaiming");
  
      this.physics.add.overlap(this.player, this.npc10, () => {
          if (!this.npc10Interacted && !this.keyENpc10 && !this.Npc10ChipCollected) {
              if (this.indicatorNpc10) {
                  this.indicatorNpc10.destroy();
                  this.indicatorNpc10 = null;
              }
  
              this.keyENpc10 = this.add.image(this.npc10.x, this.npc10.y - 40, 'keyE').setScale(0.07).setDepth(1000);
              this.canInteractWithNpc10 = true;
          }
      });
  
      // Remove a tecla E se o player se afasta
      this.physics.add.overlap(this.player, this.npc10, null, (player, npc) => {
          const distance = Phaser.Math.Distance.Between(player.x, player.y, npc.x, npc.y);
          if (distance > 100 && this.keyENpc10) {
              this.keyENpc10.destroy();
              this.keyENpc10 = null;
              this.canInteractWithNpc10 = false;
          }
          return true;
      }, this);
  
      // Adiciona a interação com o NPC 10
      this.input.keyboard.on("keydown-E", () => {
          if (this.canInteractWithNpc10) {
              this.canInteractWithNpc10 = false;
  
              if (this.keyENpc10) {
                  this.keyENpc10.destroy(); // Remove a tecla E
                  this.keyENpc10 = null;
              }
  
              this.npc10Interacted = true; // Marca que o NPC 10 foi interagido
              this.showNpc10Dialog(); // Chama o método para exibir o diálogo
          }
      });
    }

    showNpc10Dialog() {
      const speech = [
          "Olá! Bem-vindo à área de negócios!",
          "Aqui você pode aprender mais sobre os serviços oferecidos.",
          "Explore o ambiente e colete os chips para desbloquear novas informações!"
      ];

      const dialogBalloon = this.add.image(this.npc10.x + 50, this.npc10.y - 50, "balloonText").setScale(0.8);
      const dialogText = this.add.text(this.npc10.x - 15, this.npc10.y - 100, speech[0], {
          fontSize: "10px",
          fill: "#000000",
          wordWrap: { width: dialogBalloon.width - 50 },
      });

      // Adiciona a tecla ENTER ao lado do balão de diálogo
      const keyEnter = this.add.image(this.npc10.x - 40, this.npc10.y - 40, 'keyENTER').setScale(0.1).setDepth(1000);

      let currentIndex = 0;

      const advanceDialog = () => {
          currentIndex++;
          if (currentIndex < speech.length) {
              dialogText.setText(speech[currentIndex]); // Atualiza o texto do diálogo
          } else {
              // Remove o balão de diálogo e a tecla ENTER
              dialogBalloon.destroy();
              dialogText.destroy();
              keyEnter.destroy();
              this.input.keyboard.off("keydown-ENTER", advanceDialog);

              this.addScrewDriver(); // Adiciona a chave de fenda ao lado do jogador
          }
      };

      // Adiciona o evento para avançar o diálogo com a tecla ENTER
      this.input.keyboard.on("keydown-ENTER", advanceDialog);
    }

    addScrewDriver() {
      // Cria o sprite da chave de fenda ao lado do jogador
      this.screwDriver = this.physics.add.sprite(this.player.x + 20, this.player.y, 'screwDriver').setScale(0.08);
      this.screwDriver.setDepth(1000); // Garante que a chave de fenda fique acima de outros elementos
      this.screwDriver.setFlipX(true); // Vira a chave de fenda no eixo X inicialmente
  
      // Atualiza a posição da chave de fenda para seguir o jogador
      this.physics.add.overlap(this.player, this.screwDriver, () => {
          if (this.screwDriver) {
              this.screwDriver.x = this.player.x; // Ajusta a posição horizontal
              this.screwDriver.y = this.player.y + 25; // Ajusta a posição vertical
          }
      });
  
      // Atualiza a orientação da chave de fenda com base no movimento do jogador
      this.events.on('update', () => {
          if (this.screwDriver) {
              if (this.keys.left.isDown) {
                  this.screwDriver.setFlipX(true); // Vira a chave de fenda para a esquerda
              } else if (this.keys.right.isDown) {
                  this.screwDriver.setFlipX(false); // Vira a chave de fenda para a direita
              }
          }
      });
  
      // Marca que a chave de fenda foi coletada
      this.screwDriverCollected = true;
    }

    createIndicatorNpc15() {
      this.indicatorNpc15 = this.physics.add.sprite(this.npc15.x, this.npc15.y - 50, 'indicator');
      this.indicatorNpc15.setScale(0.2);
      this.indicatorNpc15.setImmovable(true);
      this.indicatorNpc15.play("exclaiming");
    
      this.physics.add.overlap(this.player, this.npc15, () => {
        if (!this.npc15Interacted && !this.keyENpc15 && !this.npc15ChipCollected) {
          if (this.indicatorNpc15) {
            this.indicatorNpc15.destroy();
            this.indicatorNpc15 = null;
          }
    
          this.keyENpc15 = this.add.image(this.npc15.x, this.npc15.y - 40, 'keyE').setScale(0.07).setDepth(1000);
          this.canInteractWithNpc15 = true;
        }
      });
    
      // Remove a tecla E se o player se afasta
      this.physics.add.overlap(this.player, this.npc15, null, (player, npc) => {
        const distance = Phaser.Math.Distance.Between(player.x, player.y, npc.x, npc.y);
        if (distance > 100 && this.keyENpc15) {
          this.keyENpc15.destroy();
          this.keyENpc15 = null;
          this.canInteractWithNpc15 = false;
        }
        return true;
      }, this);
    }

    createChips() {
      this.chips = this.physics.add.group(); // Cria um grupo para os chips

      // Adiciona 5 chips em posições fixas
      const chipPositions = [
        { x: width - 850, y: height - 270 }, // Chip da planta - primeiro
        { x: width - 720, y: height - 130 }, // Chip na mesa esquerda inferior - segundo
        { x: width - 370, y: height - 50 }, // Chip na direita perto da parede - terceiro
        { x: width - 370, y: height - 320 } // Chip na salinha do 5G - quinto
      ];

      chipPositions.forEach(pos => {
        const chip = this.chips.create(pos.x, pos.y, 'chip'); // Cria um chip na posição especificada
        chip.setScale(0.06); // Ajusta o tamanho do chip
      });

      // Adiciona o overlap entre o jogador e os chips
      this.physics.add.overlap(this.player, this.chips, this.collectChip, null, this);
    }

    collectChip(player, chip) {
      chip.destroy(); // Remove o chip coletado
      this.collectedChips += 1; // Incrementa o contador de chips em 1
      this.chipText.setText(`${this.collectedChips}/5`); // Atualiza o texto na tela
    }
    
    createNpc15Chip() {
      // Verifica se o chip já foi criado ou coletado
      if (this.npc15ChipCollected || this.npc15ChipCreated) return;
  
      console.log("Chip do NPC 15 criado");
  
      // Marca que o chip foi criado
      this.npc15ChipCreated = true;
  
      const chipPosition = { x: width - 470, y: height - 310 }; // Posição fixa do chip do NPC 15
      const chip = this.chips.create(chipPosition.x, chipPosition.y, 'chip'); // Cria o chip
      chip.setScale(0.06); // Ajusta o tamanho do chip
  
      // Adiciona o overlap entre o jogador e o chip
      this.physics.add.overlap(this.player, chip, (player, chip) => {
          chip.destroy(); // Remove o chip coletado
          this.collectedChips += 1; // Incrementa o contador de chips em 1
          this.chipText.setText(`${this.collectedChips}/5`); // Atualiza o texto na tela
          this.npc15ChipCollected = true; // Marca o chip como coletado
      }, null, this);
  }
  

  npc15Question() {
    if (this.npc15ChipCollected) return;
  
    const speech = [
      "Olá, seja Bem-Vindo a área da B2B da Vivo!",
      "Aqui você vai conhecer os conceitos de B2B e B2C.",
      "Vamos começar coletando os chips de internet para desbloquear os 5G mais rápido do Brasil!",
      "Mas antes eu tenho uma pergunta para você, para responde-lá é só apertar ENTER na opção correta.",
      "Você sabe quais são os principais serviços oferecidos pela Vivo para clientes B2C?"
    ];
  
    this.npc15DialogBalloon = this.add.image(this.npc15.x + 50, this.npc15.y - 50, "balloonText").setScale(0.8);
    this.npc15DialogText = this.add.text(this.npc15.x - 15, this.npc15.y - 100, speech[0], {
      fontSize: "10px",
      fill: "#000000",
      wordWrap: { width: this.npc15DialogBalloon.width - 50 },
    });
  
    let currentIndex = 0;
  
    const enterNpc15 = () => {
      currentIndex++;
      if (currentIndex < speech.length) {
        this.npc15DialogText.setText(speech[currentIndex]);
      } else {
        this.npc15DialogText.setVisible(false);
        this.npc15DialogBalloon.setVisible(false);
        this.input.keyboard.off("keydown-ENTER", enterNpc15);
  
        if (this.keyEnterNpc15) {
          this.keyEnterNpc15.destroy();
          this.keyEnterNpc15 = null;
          this.createOptions(); // Cria letterA e letterB
        }
      }
    };
  
    this.input.keyboard.on("keydown-ENTER", enterNpc15);
  }

  handleCorrectAnswer(callback) {
    console.log("Resposta correta!");
    this.sound.play('correctSound'); // Toca o som de resposta correta

    const feedbackSpeechCorrect = [
      "Correto! Esses são exatamente os serviços focados no consumidor final, que é o público-alvo do modelo B2C (business to consumer).",
      "Como recompensa vou te entregar um chip para te ajudar nessa aventura."
    ];

    const feedbackBalloon = this.add.image(this.npc15.x + 50, this.npc15.y - 50, "balloonText").setScale(0.8);
    const feedbackText = this.add.text(this.npc15.x - 15, this.npc15.y - 100, feedbackSpeechCorrect[0], {
        fontSize: "10px",
        fill: "#000000",
        wordWrap: { width: feedbackBalloon.width - 50 },
    });

    const feedbackKeyEnter = this.add.image(this.npc15.x - 40, this.npc15.y - 40, 'keyENTER').setScale(0.1).setDepth(1000);

    let feedbackIndex = 0;

    const destroyFeedback = () => {
        if (feedbackBalloon) feedbackBalloon.destroy();
        if (feedbackText) feedbackText.destroy();
        if (feedbackKeyEnter) feedbackKeyEnter.destroy();
    };

    const advanceFeedback = () => {
        feedbackIndex++;
        if (feedbackIndex < feedbackSpeechCorrect.length) {
            feedbackText.setText(feedbackSpeechCorrect[feedbackIndex]);
        } else {
            destroyFeedback();
            this.createNpc15Chip();
            this.input.keyboard.off("keydown-ENTER", advanceFeedback);

            // Executa o callback, se fornecido
            if (callback) callback();
        }
    };

    this.input.keyboard.on("keydown-ENTER", advanceFeedback);
  }

  handleIncorrectAnswer(callback) {
    console.log("Resposta incorreta!");
    this.sound.play('wrongSound'); // Toca o som de resposta incorreta

    const feedbackSpeechWrong = [
        "Incorreto. Esses serviços são voltados para empresas e fazem parte do modelo B2B (business to business), não para o consumidor final.",
        "Tente novamente e escolha a opção correta!"
    ];

    const feedbackBalloon = this.add.image(this.npc15.x + 50, this.npc15.y - 50, "balloonText").setScale(0.8);
    const feedbackText = this.add.text(this.npc15.x - 15, this.npc15.y - 100, feedbackSpeechWrong[0], {
        fontSize: "10px",
        fill: "#000000",
        wordWrap: { width: feedbackBalloon.width - 50 },
    });

    const feedbackKeyEnter = this.add.image(this.npc15.x - 40, this.npc15.y - 40, 'keyENTER').setScale(0.1).setDepth(1000);

    let feedbackIndex = 0;

    const destroyFeedback = () => {
        if (feedbackBalloon) feedbackBalloon.destroy();
        if (feedbackText) feedbackText.destroy();
        if (feedbackKeyEnter) feedbackKeyEnter.destroy();
    };

    const advanceFeedback = () => {
        feedbackIndex++;
        if (feedbackIndex < feedbackSpeechWrong.length) {
            feedbackText.setText(feedbackSpeechWrong[feedbackIndex]);
        } else {
            destroyFeedback();
            this.input.keyboard.off("keydown-ENTER", advanceFeedback);

            // Recria as opções sem criar o chip
            this.createOptions();

            // Executa o callback, se fornecido
            if (callback) callback();
        }
    };

    this.input.keyboard.on("keydown-ENTER", advanceFeedback);
  }

  createOptions() {
    this.input.keyboard.off("keydown-ENTER");

    const letterA = this.physics.add.sprite(width - 590, height - 330, 'letterA');
    letterA.setScale(0.1);
    letterA.setImmovable();

    const letterB = this.physics.add.sprite(width - 510, height - 330, 'letterB');
    letterB.setScale(0.1);
    letterB.setImmovable();

    let activeTextA = null;
    let activeTextB = null;
    let keyEnterA = null;
    let keyEnterB = null;

    const destroyText = (activeText) => {
      if (activeText) {
        activeText.balloonText.destroy();
        activeText.displayedText.destroy();
      }
    };

    const destroyKeyEnter = (keyEnter) => {
      if (keyEnter) {
        keyEnter.destroy();
      }
    };

    const destroyOptions = () => {
      letterA.destroy();
      letterB.destroy();
      destroyText(activeTextA);
      destroyText(activeTextB);
      destroyKeyEnter(keyEnterA);
      destroyKeyEnter(keyEnterB);
    };

    const destroyCreateOptions = () => {
      destroyOptions();
      this.input.keyboard.off("keydown-ENTER");
    };

    // Lógica para a letterA
    this.physics.add.overlap(this.player, letterA, () => {
      const distance = Phaser.Math.Distance.Between(this.player.x, this.player.y, letterA.x, letterA.y);
      if (distance < 20) {
        if (!activeTextA) {
          const balloonText = this.add.image(letterA.x + 80, letterA.y - 80, "balloonText").setScale(0.8);
          const displayedText = this.add.text(
            letterA.x + 10,
            letterA.y - 132,
            "Planos de celular pré e pós-pago, internet banda larga residencial (Vivo Fibra), TV por assinatura, serviços digitais (Vivo Play) e apps de streaming.",
            {
              fontSize: "10px",
              fill: "#000000",
              wordWrap: { width: balloonText.width - 40 },
            }
          );

          activeTextA = { balloonText, displayedText };
        }
        if (!keyEnterA) {
          keyEnterA = this.add.image(letterA.x, letterA.y - 40, 'keyENTER').setScale(0.06).setDepth(1000);
        }

        // Adiciona evento para pressionar ENTER na letterA
        if (!this.enterKeyListenerA) {
          this.enterKeyListenerA = this.input.keyboard.on("keydown-ENTER", () => {
            if (activeTextA) {
              destroyCreateOptions(); // Destrói as opções
              this.handleCorrectAnswer(); // Chama o método handleCorrectAnswer
              this.input.keyboard.off("keydown-ENTER", this.enterKeyListenerA);
              this.enterKeyListenerA = null;
            }
          });
        }
      } else {
        if (activeTextA) {
          destroyText(activeTextA);
          activeTextA = null;
        }
        if (keyEnterA) {
          destroyKeyEnter(keyEnterA);
          keyEnterA = null;
        }
      }
    });

    // Lógica para a letterB
    this.physics.add.overlap(this.player, letterB, () => {
      const distance = Phaser.Math.Distance.Between(this.player.x, this.player.y, letterB.x, letterB.y);
      if (distance < 20) {
        if (!activeTextB) {
          const balloonText = this.add.image(letterB.x + 80, letterB.y - 80, "balloonText").setScale(0.8);
          const displayedText = this.add.text(
            letterB.x + 10,
            letterB.y - 132,
            "Soluções de conectividade corporativa, serviços em nuvem, redes privadas, IoT empresarial e consultoria em transformação digital.",
            {
              fontSize: "10px",
              fill: "#000000",
              wordWrap: { width: balloonText.width - 40 },
            }
          );

          activeTextB = { balloonText, displayedText };
        }
        if (!keyEnterB) {
          keyEnterB = this.add.image(letterB.x, letterB.y - 40, 'keyENTER').setScale(0.06).setDepth(1000);
        }

        // Adiciona evento para pressionar ENTER na letterB
        if (!this.enterKeyListenerB) {
          this.enterKeyListenerB = this.input.keyboard.on("keydown-ENTER", () => {
            if (activeTextB) {
              destroyCreateOptions(); // Destrói as opções
              this.handleIncorrectAnswer(() => {
                  this.input.keyboard.off("keydown-ENTER", this.enterKeyListenerB);
                  this.enterKeyListenerB = null;
              });
            }
          });
        }
      } else {
        if (activeTextB) {
          destroyText(activeTextB);
          activeTextB = null;
        }
        if (keyEnterB) {
          destroyKeyEnter(keyEnterB);
          keyEnterB = null;
        }
      }
    });
  }

  createLocker() {
    this.locker = this.physics.add.sprite(width - 370, height - 220, 'locker').setScale(0.09);
    this.locker.setImmovable(true); // Define o locker como imóvel para colisões
    this.physics.add.collider(this.player, this.locker, () => {
      console.log("Player colidiu com o locker!");
      // Adicione aqui qualquer lógica adicional para a colisão
    });
  }

  showCongratulations() {
    const congratulationsImage = this.add.image(this.player.x, this.player.y - 150, 'congratulations5G').setDepth(1000);
    congratulationsImage.setScale(0.3); // Ajusta o tamanho da imagem, se necessário

    // Remove a imagem de parabéns após 3 segundos
    this.time.delayedCall(3000, () => {
        congratulationsImage.destroy();
    });
  }
}

class MinigameWires extends Phaser.Scene {
  constructor() {
    super({ key: 'minigameWires' });
  }

  preload() {
    this.load.image('serverBackground', '../assets/assetsWires/serverBackground.png');
    this.load.image('backgroundMinigame', '../assets/assetsWires/backgroundMinigame.png');
    this.load.image('blueWireConnected', '../assets/assetsWires/fioAzulGrande.png');
    this.load.image('blueWireDisconnected', '../assets/assetsWires/fioAzulPequeno.png');
    this.load.image('redWireConnected', '../assets/assetsWires/fioVermelhoGrande.png');
    this.load.image('redWireDisconnected', '../assets/assetsWires/fioVermelhoPequeno.png');
    this.load.image('yellowWireConnected', '../assets/assetsWires/fioAmareloGrande.png');
    this.load.image('yellowWireDisconnected', '../assets/assetsWires/fioAmareloPequeno.png');
    this.load.image('pinkWireConnected', '../assets/assetsWires/fioRosaGrande.png');
    this.load.image('pinkWireDisconnected', '../assets/assetsWires/fioRosaPequeno.png');
    this.load.image('endPointBlue', '../assets/assetsWires/endPointBlue.png');
    this.load.image('endPointRed', '../assets/assetsWires/endPointRed.png');
    this.load.image('endPointYellow', '../assets/assetsWires/endPointYellow.png');
    this.load.image('endPointPink', '../assets/assetsWires/endPointPink.png');
  }

  create() {
    this.add.image(width / 2, height / 2, 'serverBackground').setScale(1.8);
    this.add.image(width / 2, height / 2, 'backgroundMinigame').setScale(0.55);
    // Posições iniciais dos fios (esquerda da tela)
    this.startPoints = {
      blue: { x: width - 1100, y: height - 450 },
      red: { x: width - 1100, y: height - 250 },
      yellow: { x: width - 1100, y: height - 350 },
      pink: { x: width - 1100, y: height - 550 }
    };

    // Conectores (direita da tela)
    this.endPoints = {
      blue: this.add.sprite(width - 420, height - 550, 'endPointBlue').setScale(0.2),
      red: this.add.sprite(width - 420, height - 450, 'endPointRed').setScale(0.2),
      yellow: this.add.sprite(width - 420, height - 350, 'endPointYellow').setScale(0.2),
      pink: this.add.sprite(width - 420, height - 250, 'endPointPink').setScale(0.2)
    };

    // Criação dos fios curtos (arrastáveis) e fios longos (para esticar)
    this.wires = {};

    Object.keys(this.startPoints).forEach(color => {
      let pos = this.startPoints[color];

      let shortWire = this.add.sprite(pos.x, pos.y, `${color}WireDisconnected`).setInteractive();
      shortWire.setData('color', color);
      shortWire.setScale(3);
      this.input.setDraggable(shortWire);

      let longWire = this.add.sprite(pos.x, pos.y, `${color}WireConnected`)
                         .setOrigin(0, 0.5)
                         .setVisible(false);

      this.wires[color] = { short: shortWire, long: longWire };
    });

    // Eventos drag-and-drop
    this.input.on('dragstart', this.onDragStart, this);
    this.input.on('drag', this.onDrag, this);
    this.input.on('dragend', this.onDragEnd, this);
  }

  onDragStart(pointer, gameObject) {
    const color = gameObject.getData('color');
    this.wires[color].long.setVisible(true);
  }

  onDrag(pointer, gameObject, dragX, dragY) {
    const color = gameObject.getData('color');
    const start = this.startPoints[color];
    const wireLong = this.wires[color].long;
    wireLong.setScale(3);

    gameObject.x = dragX;
    gameObject.y = dragY;

    const distance = Phaser.Math.Distance.Between(start.x, start.y, dragX, dragY);
    const angle = Phaser.Math.Angle.Between(start.x, start.y, dragX, dragY);

    wireLong.x = start.x;
    wireLong.y = start.y;
    wireLong.displayWidth = distance;
    wireLong.rotation = angle;
  }

  onDragEnd(pointer, gameObject) {
    const color = gameObject.getData('color');
    const endPoint = this.endPoints[color];
    const wireLong = this.wires[color].long;

    const distToEnd = Phaser.Math.Distance.Between(gameObject.x, gameObject.y, endPoint.x, endPoint.y);

    if (distToEnd < 50) {
      gameObject.x = endPoint.x;
      gameObject.y = endPoint.y;
      gameObject.disableInteractive();

      const distance = Phaser.Math.Distance.Between(this.startPoints[color].x, this.startPoints[color].y, endPoint.x, endPoint.y);
      const angle = Phaser.Math.Angle.Between(this.startPoints[color].x, this.startPoints[color].y, endPoint.x, endPoint.y);

      wireLong.displayWidth = distance;
      wireLong.rotation = angle;

      console.log(`Fio ${color} conectado com sucesso!`);
      this.checkCompletion();
    } else {
      this.tweens.add({
        targets: gameObject,
        x: this.startPoints[color].x,
        y: this.startPoints[color].y,
        duration: 300,
        ease: 'Power2'
      });

      wireLong.setVisible(false);
    }
  }

  checkCompletion() {
    const allConnected = Object.values(this.wires).every(wire => !wire.short.input.enabled);

    if (allConnected) {
        console.log("Minigame concluído com sucesso!");
  
        // Exibe uma mensagem de conclusão
        const completionText = this.add.text(width / 2, height / 2, "Minigame Concluído!", {
            fontSize: "32px",
            fill: "#ffffff",
            fontFamily: "Arial",
        }).setOrigin(0.5);
  
        // Adiciona um pequeno atraso antes de retornar à cena principal
        this.time.delayedCall(2000, () => {
            completionText.destroy(); // Remove a mensagem de conclusão
            this.scene.stop('minigameWires'); // Para a cena do minigame
            this.scene.resume('vpNegociosScene'); // Retoma a cena principal sem reiniciá-la
        });
    }
  }
}

