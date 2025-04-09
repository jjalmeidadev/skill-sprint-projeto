class VpNegociosScene extends Phaser.Scene {
    constructor() {
      super({ key: 'vpNegociosScene' });
      this.npc15ChipCollected = false; // Variável para controlar se o chip do NPC 15 foi coletado
      // Adicione as linhas abaixo:
    this.activeIndicators = []; // Array para armazenar os indicadores ativos (ex.: indicadores de NPCs)
    this.arrowOffset = Phaser.Math.DegToRad(-180); // Offset para ajustar a rotação da seta
    }

    init(data) {
      this.selectedSpriteSheet = data.selectedSpriteSheet;
    }

  preload() {
      this.load.tilemapTiledJSON('vpNegocios', '../assets/mapaVPNegocios/mapaVPNegocios.json'); // Carrega o arquivo JSON do mapa criado no Tiled
      this.load.image('decoracao', '../assets/mapaVPNegocios/decoracao.png'); // Carrega a imagem do tileset de decoração
      this.load.image('paredes', '../assets/mapaVPNegocios/paredes.png'); // Carrega a imagem do tileset de paredes

      this.load.spritesheet('player', `../assets/personagens/skinsPlayer/players/${this.selectedSpriteSheet}.png`, {frameWidth: 16,frameHeight: 32,});
      this.load.spritesheet("indicator", "../assets/exclamaçãoRoxa.png", {frameWidth: 254, frameHeight: 305,}); // Carrega o spritesheet do indicador de exclamação
      this.load.spritesheet('chip', '../assets/minigameVpNegocios/chip.png', {frameWidth: 520, frameHeight: 520}); // Carrega o spritesheet do chip
      this.load.spritesheet('letterA', '../assets/minigameVpNegocios/letterA.png', {frameWidth: 288, frameHeight: 301}); // Carrega o spritesheet da Letra A
      this.load.spritesheet('letterB', '../assets/minigameVpNegocios/letterB.png', {frameWidth: 250, frameHeight: 297}); // Carrega o spritesheet da letra B

      this.load.spritesheet("npc14", "../assets/personagens/VPpessoas/npc14.png", { frameWidth: 16, frameHeight: 32 }); // Carrega o spritesheet do NPC 14
      this.load.spritesheet("npc15", "../assets/personagens/VPpessoas/npc15.png", { frameWidth: 16, frameHeight: 32 }); // Carrega o spritesheet do NPC 15
      this.load.spritesheet("npc10", "../assets/personagens/npc10Lift.png", {frameWidth: 16,  frameHeight: 32, }); // Carrega o spritesheet do NPC 10 no elevador
      this.load.spritesheet("npc16", "../assets/personagens/VPpessoas/npc16.png", { frameWidth: 16, frameHeight: 32 }); // Carrega o spritesheet do NPC 1
      this.load.spritesheet("npc23", "../assets/personagens/VPpessoas/npc23.png", { frameWidth: 16, frameHeight: 32 }); // Carrega o spritesheet do NPC 23

      //this.load.audio('indicatorSound', '../assets/sounds/497198_abacagi_bubble-pops (mp3cut.net).wav'); // Carrega o som do indicador de interação
      this.load.audio('walkSound', '../assets/sounds/753292__vrymaa__footsteps-high-heels-hardwood-walk-run (mp3cut.net).wav'); // Carrega o som de passos
      this.load.audio('correctSound', '../assets/sounds/476178__unadamlar__correct-choice.wav'); // Carrega o som de resposta correta
      this.load.audio('wrongSound', '../assets/sounds/700641__producing_raylite__incorrect-buzzer.wav'); // Carrega o som de resposta errada
      this.load.audio('peopleMusic', '../assets/sounds/VPpessoas.mp3'); // Carrega a música de fundo da VP Pessoas
      this.load.audio('keySound', '../assets/sounds/computer-keyboard-typing-290582 (mp3cut.net).mp3'); // Carrega o som de digitação no teclado 
      this.load.audio('collectSound', '../assets/sounds/476178__unadamlar__correct-choice.wav'); // Carrega o efeito de coletar

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
      this.load.image('arrow', '../assets/seta.png'); // Carrega a imagem do chip
      this.load.image('levelTitle', '../assets/titulos/tituloVpNegocios.png') // Carrega os asssets do titulo da fase
    }

  create() {
    this.add.rectangle(width - 2000, height - 2000, width, height, 0x2F052F).setOrigin(0).setScale(5); // Adiciona um retangulo de fundo
    this.collectedChips = 0; // contador inicial

    const minigameWiresCompleted = this.registry.get('minigameWiresCompleted') || false; // Verifica se o minigame foi concluído anteriormente, usando o registro global para armazenar o estado.

    const savedPosition = this.registry.get('playerPosition'); // Obtém a posição salva do jogador, se existir, do registro global.
    if (savedPosition) {
        this.player.setPosition(savedPosition.x, savedPosition.y); // Restaura a posição do jogador para a posição salva.
    } else {
        this.createPlayer(width, height); // Cria o jogador na posição inicial caso não haja uma posição salva.
    }

    if (minigameWiresCompleted) {
        console.log("Minigame Wires já foi concluído. Progresso restaurado."); // Exibe no console que o minigame já foi concluído e o progresso foi restaurado.
        
        if (this.crashedWire) {
        this.crashedWire.destroy(); // Remove o sprite do servidor quebrado, pois o minigame já foi concluído.
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

    const startTime = VpPessoasScene.lastMusicTime || 0; // Obtém o tempo salvo da música ou inicia do início
    this.peopleMusic = this.sound.add("peopleMusic", { loop: true }); // Adiciona a música de fundo em loop
    this.peopleMusic.play({ seek: startTime }); // Toca a música a partir do tempo salvo

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

    this.chipText = this.add.text(width - 429, height - 230, `${this.collectedChips}/5`, { // Adiciona um texto na tela para exibir a quantidade de chips coletados
      fontSize: '14px', // Define o tamanho da fonte do texto
      fill: '#ffffff', // Define a cor do texto como branco
      fontFamily: 'Arial', // Define a fonte do texto como Arial
      padding: { x: 10, y: 5 } // Adiciona um espaçamento interno ao texto
    }).setDepth(1000); // Define a profundidade do texto para garantir que ele fique acima de outros elementos

    this.add.image(width - 410, height - 245, 'chip').setScale(0.03); // Adiciona uma imagem de chip ao lado do contador de chips e ajusta seu tamanho

    this.createLocker(); // Chama o método para criar o locker no mapa

    this.screwDriverCollected = false; // Inicializa a variável indicando que a chave de fenda ainda não foi coletada

    this.createServer(); // Chama o método para criar o servidor quebrado no mapa
    // Depois de criar o locker e antes de finalizar o create():
    this.compassArrow = this.add.image(this.cameras.main.width / 2, 335, 'arrow')
    .setScrollFactor(0)        // Para que a seta fique fixa na tela
    .setDepth(1000)            // Para que fique acima de outros objetos
    .setScale(0.5)
    .setOrigin(0.5, 0.5);

    this.showTitle(); // Exibe o titulo na tela
  }

  onShutdown() {
    // Salva o tempo atual da música e a para quando a cena é pausada ou encerrada
    if (this.peopleMusic && this.peopleMusic.isPlaying) { // Verifica se a música de fundo está tocando
      VpNegociosScene.lastMusicTime = this.peopleMusic.seek; // Salva o tempo atual da música
      this.peopleMusic.stop(); // Para a música de fundo
    }
  }

  keySound() {
    this.keySoundPlay = this.sound.add('keySound', { loop: false, volume: 10 }); // Adiciona o som de digitação no teclado com volume alto
    this.keySoundPlay.play(); // Reproduz o som de digitação no teclado
  }

  collectSound() {
    this.collected = this.sound.add('collectSound', { loop: false, volume: 10 }); // Adiciona o som de coleta com volume e sem loop
    this.collected.play(); // Reproduz o som de coleta
  }

  update() {
    this.movePlayer(); // Chama a função para mover o jogador

    // Verifica se a chave de fenda existe antes de tentar manipulá-la
    if (this.screwDriver && this.screwDriverCollected) {
      this.screwDriver.x = this.player.x; // Atualiza a posição horizontal
      this.screwDriver.y = this.player.y + 25; // Atualiza a posição vertical
    }

    if (this.canInteractWithNpc15 && Phaser.Input.Keyboard.JustDown(this.keys.interagir)) { // Verifica se o jogador pode interagir com o NPC 15 e se a tecla de interação foi pressionada
      if (!this.npc15Interacted) { // Verifica se o NPC 15 ainda não foi interagido
        if (this.keyENpc15) { // Verifica se a tecla "E" está visível para interação
      this.keyENpc15.destroy(); // Remove a tecla "E" da tela
      this.keyENpc15 = null; // Reseta a referência da tecla "E"
        }
      
        if (!this.keyEnterNpc15) { // Verifica se a tecla "ENTER" ainda não foi criada
      this.keyEnterNpc15 = this.add.image(this.npc15.x - 40, this.npc15.y - 40, 'keyENTER').setScale(0.1).setDepth(1000); // Adiciona a tecla "ENTER" ao lado do NPC 15
        }
      
        this.npc15Interacted = true; // Marca que o NPC 15 foi interagido
        this.canInteractWithNpc15 = false; // Impede novas interações com o NPC 15 por enquanto
        this.keySound(); // Toca o som de interação
        this.npc15Question(); // Chama o diálogo com o NPC 15
      }
    }

    if(this.collectedChips === 4) { // Verifica se o jogador coletou 4 chips
      this.locker.destroy(); // Remove o locker do mapa
    }

    // Verifica se o jogador coletou todos os 5 chips
    if (this.collectedChips === 5 && !this.congratulationsShown) { // Verifica se o jogador coletou 5 chips e se a mensagem de parabéns ainda não foi exibida
      this.showCongratulations(); // Exibe a imagem de parabéns
      this.congratulationsShown = true; // Garante que a imagem será exibida apenas uma vez
    }
  // Atualização da bússola (seta)
  if (this.compassArrow) {
    // Filtra os indicadores ativos
    this.activeIndicators = this.activeIndicators.filter(ind => ind && ind.active);
    if (this.activeIndicators.length > 0) {
      const closest = this.getClosestIndicator();
      if (closest) {
        const angle = Phaser.Math.Angle.Between(
          this.player.x, this.player.y,
          closest.x, closest.y
        );
        this.compassArrow.setRotation(angle + this.arrowOffset);
        this.compassArrow.setVisible(true);
      }
      } else {
        this.compassArrow.setVisible(false);
      }
    }
  }

  showTitle() {
    const titleImage = this.add.image(this.player.x, this.player.y - 130, 'levelTitle').setDepth(1000); // Adiciona a imagem de parabéns acima do jogador e define sua profundidade para garantir que fique acima de outros elementos
    titleImage.setScale(0.3); // Ajusta o tamanho da imagem de parabéns
  }

  getClosestIndicator() {
    if (this.activeIndicators.length === 0) return null;
    let closest = this.activeIndicators[0];
    let minDist = Phaser.Math.Distance.Between(this.player.x, this.player.y, closest.x, closest.y);
    for (let i = 1; i < this.activeIndicators.length; i++) {
      const ind = this.activeIndicators[i];
      const d = Phaser.Math.Distance.Between(this.player.x, this.player.y, ind.x, ind.y);
      if (d < minDist) {
        closest = ind;
        minDist = d;
      }
    }
    return closest;
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
        this.keySound();
        this.sound.stopAll();

        this.registry.set('vpBusinessConcluida', true);
        const elevadorScene = this.scene.get("elevadorScene");
        elevadorScene.resumeFromBusiness = true;
        this.scene.stop("vpNegociosScene");
        this.scene.resume("elevadorScene");
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

    this.npc10 = this.physics.add.sprite( width - 380, height - 580, 'npc10'); // Cria o sprite da NPC 10 na posição especificada
    this.npc10.setScale(2.5); // Define a escala do sprite da NPC 10
    this.npc10.setImmovable(true); // Define a NPC 10 como imóvel
    this.createNpcAnimations(); // Cria as animações para os NPCs
    this.npc10.anims.play('npc10'); // Reproduz a animação "npc10" para a NPC 10

    this.npc16 = this.physics.add.sprite(width - 1045, height - 680, 'npc16'); // Adiciona o NPC 16 na posição especificada
    this.npc16.setScale(2.5); // Define o tamanho do NPC 16
    this.npc16.setImmovable(true); // Define o NPC 16 como imóvel para colisões
    this.createNpcAnimations(); // Cria as animações do NPC 16
    this.npc16.anims.play('npc16'); // Inicia a animação "npc16" para o NPC 16
    this.createIndicatorNpc16();

    this.npc23 = this.physics.add.sprite(width - 1180, height - 565, 'npc23'); // Adiciona o NPC 23 na posição especificada
    this.npc23.setScale(2.5); // Define o tamanho do NPC 23
    this.npc23.setImmovable(true); // Define o NPC 23 como imóvel para colisões
    this.createNpcAnimations(); // Cria as animações do NPC 23
    this.npc23.anims.play('npc23'); // Inicia a animação "npc23" para o NPC 23
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

    this.anims.create({
      key: "npc16", // Nome da animação para o NPC 16
      frames: this.anims.generateFrameNumbers('npc16', { start: 0, end: 11 }), // Define os frames da animação
      frameRate: 4, // Velocidade da animação
      repeat: -1, // Repetição infinita
    });

    this.anims.create({
      key: "npc23", // Nome da animação para o NPC 23
      frames: this.anims.generateFrameNumbers('npc23', { start: 0, end: 11 }), // Define os frames da animação
      frameRate: 4, // Velocidade da animação
      repeat: -1, // Repetição infinita
    });
  }  

  createIndicatorNpc16() {
    this.indicatorNpc16 = this.physics.add.sprite(this.npc16.x, this.npc16.y - 50, 'indicator'); // Cria o sprite do indicador acima do NPC 16
    this.indicatorNpc16.setScale(0.2); // Define o tamanho do indicador
    this.indicatorNpc16.setImmovable(true); // Define o indicador como imóvel
    this.indicatorNpc16.play("exclaiming"); // Reproduz a animação de exclamação para o indicador

    this.events.on('update', () => { // Adiciona um evento que será executado a cada atualização do jogo
    const distance = Phaser.Math.Distance.Between(this.player.x, this.player.y, this.npc16.x, this.npc16.y); // Calcula a distância entre o jogador e o NPC 16

    if (distance < 100 && !this.keyENpc16 && !this.npc16Interacted) { // Verifica se o jogador está próximo do NPC 16 e se a tecla E ainda não foi exibida
      if (this.indicatorNpc16) { // Verifica se o indicador ainda existe
      this.indicatorNpc16.destroy(); // Remove o indicador
      this.indicatorNpc16 = null; // Reseta a referência do indicador
      }

      this.keyENpc16 = this.add.image(this.npc16.x, this.npc16.y - 40, 'keyE').setScale(0.07).setDepth(1000); // Adiciona a tecla E acima do NPC 16
      this.canInteractWithNpc16 = true; // Permite a interação com o NPC 16
    } else if (distance >= 100 && this.keyENpc16) { // Verifica se o jogador se afastou do NPC 16 e se a tecla E está visível
      this.keyENpc16.destroy(); // Remove a tecla E
      this.keyENpc16 = null; // Reseta a referência da tecla E
      this.canInteractWithNpc16 = false; // Impede a interação com o NPC 16
    }
    });

    // Adiciona a interação com o NPC 16
    this.input.keyboard.on("keydown-E", () => { // Adiciona um evento para quando a tecla E for pressionada
    if (this.canInteractWithNpc16) { // Verifica se o jogador pode interagir com o NPC 16
      this.canInteractWithNpc16 = false; // Impede novas interações enquanto a atual está em andamento

      if (this.keyENpc16) { // Verifica se a tecla E está visível
      this.keyENpc16.destroy(); // Remove a tecla E
      this.keyENpc16 = null; // Reseta a referência da tecla E
      }

      this.npc16Interacted = true; // Marca que o NPC 16 foi interagido
      this.keySound(); // Toca o som de interação
      this.createDialogNpc16(); // Chama o método para exibir o diálogo do NPC 16
    }
    });
    this.activeIndicators.push(this.indicatorNpc16);

  }

  createIndicatorNpc23() {
    console.log("createIndicatorNpc23 called"); // Adiciona um log para verificar se a função está sendo chamada
    this.indicatorNpc23 = this.physics.add.sprite(this.npc23.x, this.npc23.y - 50, 'indicator'); // Cria um sprite de indicador acima do NPC 23
    this.indicatorNpc23.setScale(0.2); // Define o tamanho do indicador
    this.indicatorNpc23.setImmovable(true); // Define o indicador como imóvel
    this.indicatorNpc23.play("exclaiming"); // Reproduz a animação de exclamação para o indicador

    this.events.on('update', () => { // Adiciona um evento que será executado a cada atualização do jogo
    const distance = Phaser.Math.Distance.Between(this.player.x, this.player.y, this.npc23.x, this.npc23.y); // Calcula a distância entre o jogador e o NPC 23

    if (distance < 100 && !this.keyENpc23) { // Verifica se o jogador está próximo do NPC 23 e se a tecla E ainda não foi exibida
      if (this.indicatorNpc23) { // Verifica se o indicador ainda existe
      this.indicatorNpc23.destroy(); // Remove o indicador
      this.indicatorNpc23 = null; // Reseta a referência do indicador
      }

      this.keyENpc23 = this.add.image(this.npc23.x, this.npc23.y - 40, 'keyE').setScale(0.07); // Adiciona a tecla E acima do NPC 23
      this.canInteractWithNpc23 = true; // Permite a interação com o NPC 23
    } else if (distance >= 100 && this.keyENpc23) { // Verifica se o jogador se afastou do NPC 23 e se a tecla E está visível
      this.keyENpc23.destroy(); // Remove a tecla E
      this.keyENpc23 = null; // Reseta a referência da tecla E
      this.canInteractWithNpc23 = false; // Impede a interação com o NPC 23
    }
    });

    // Adiciona a interação com o NPC 23
    this.input.keyboard.on("keydown-E", () => { // Adiciona um evento para quando a tecla E for pressionada
    this.keySound(); // Toca o som de interação
    if (this.canInteractWithNpc23 && !this.npc23Interacted) { // Verifica se o jogador pode interagir com o NPC 23 e se ele ainda não foi interagido
      this.canInteractWithNpc23 = false; // Impede novas interações enquanto a atual está em andamento
      this.npc23Interacted = true; // Marca que o NPC 23 foi interagido

      if (this.keyENpc23) { // Verifica se a tecla E está visível
      this.keyENpc23.destroy(); // Remove a tecla E
      this.keyENpc23 = null; // Reseta a referência da tecla E
      }

      this.createCongratulationsNpc23(); // Chama o método para exibir o diálogo de parabéns
    } else if (this.keyENpc23) { // Caso a tecla E ainda esteja visível
      this.keyENpc23.destroy(); // Garante que a tecla E seja destruída
      this.keyENpc23 = null; // Reseta a referência da tecla E
    }
    });
    this.activeIndicators.push(this.indicatorNpc23);

  }

  createDialogNpc16() {
    const speech = [ // Array contendo as falas do NPC 16
    "Ei, ainda bem que você chegou! Estamos com um problemão nos servidores da área B2B.", // Primeira fala
    "Esses servidores são essenciais para manter os serviços corporativos da Vivo funcionando.", // Segunda fala
    "As conexões de grandes empresas, atendimento dedicado, soluções de nuvem, tudo passa por eles!", // Terceira fala
    "Quando eles caem, empresas inteiras podem ficar offline. Imagina um hospital ou um banco sem conexão... ", // Quarta fala
    "Preciso que você vá até a sala de manutenção e fale com o Jorge.", // Quinta fala
    "Ele vai te entregar uma chave de fenda especial que você vai usar para consertar os servidores.", // Sexta fala
    "Confio em você! A sala de manutenção fica do seu lado direito. Corre lá!" // Sétima fala
    ];

    const dialogBalloon = this.add.image(this.npc16.x + 50, this.npc16.y - 50, "balloonText").setScale(0.8); // Adiciona um balão de diálogo acima do NPC 16
    const dialogText = this.add.text(this.npc16.x - 15, this.npc16.y - 100, speech[0], { // Adiciona o texto inicial do diálogo
    fontSize: "10px", // Define o tamanho da fonte
    fill: "#000000", // Define a cor do texto como preto
    wordWrap: { width: dialogBalloon.width - 50 }, // Define a largura máxima para quebra de linha
    });

    const keyEnter = this.add.image(this.npc16.x - 40, this.npc16.y - 40, 'keyENTER').setScale(0.1).setDepth(1000); // Adiciona a tecla ENTER ao lado do NPC 16

    let currentIndex = 0; // Índice atual do diálogo

    const advanceDialog = () => { // Função para avançar o diálogo
    currentIndex++; // Incrementa o índice do diálogo
    if (currentIndex < speech.length) { // Verifica se ainda há falas no array
    dialogText.setText(speech[currentIndex]); // Atualiza o texto do diálogo
    this.keySound(); // Toca o som de interação
    } else {
    // Remove o balão de diálogo e a tecla ENTER
    this.keySound(); // Toca o som de interação
    dialogBalloon.destroy(); // Remove o balão de diálogo
    dialogText.destroy(); // Remove o texto do diálogo
    keyEnter.destroy(); // Remove a tecla ENTER
    this.createIndicatorNpc10(); // Cria o indicador para o NPC 10
    this.input.keyboard.off("keydown-ENTER", advanceDialog); // Remove o evento de pressionar ENTER
    }
    };

    // Adiciona o evento para avançar o diálogo com a tecla ENTER
    this.input.keyboard.on("keydown-ENTER", advanceDialog); // Adiciona o evento para avançar o diálogo ao pressionar ENTER
  }

  createCongratulationsNpc23() {
    const speech = [ // Array contendo as falas do NPC 23
    "Ufa! Os servidores estão de volta ao ar! Você salvou o dia.", // Primeira fala
    "Já começaram a chegar alertas de normalização nos sistemas. As soluções corporativas da Vivo voltaram a funcionar perfeitamente.", // Segunda fala
    "Nossos clientes B2B dependem desses serviços pra manter empresas, hospitais, escolas e até órgãos públicos conectados.", // Terceira fala
    "Parabéns pelo trabalho. E obrigada por agir tão rápido — você mostrou agilidade e responsabilidade." // Quarta fala
    ];

    const dialogBalloon = this.add.image(this.npc23.x + 50, this.npc23.y - 50, "balloonText").setScale(0.8).setDepth(1000); // Adiciona um balão de diálogo acima do NPC 23
    const dialogText = this.add.text(this.npc23.x - 15, this.npc23.y - 100, speech[0], { // Adiciona o texto inicial do diálogo
    fontSize: "10px", // Define o tamanho da fonte
    fill: "#000000", // Define a cor do texto como preto
    wordWrap: { width: dialogBalloon.width - 50 }, // Define a largura máxima para quebra de linha
    });
    dialogText.setDepth(1000); // Define a profundidade do texto para garantir que ele fique acima de outros elementos

    const keyEnter = this.add.image(this.npc23.x - 40, this.npc23.y - 40, 'keyENTER').setScale(0.1).setDepth(1000); // Adiciona a tecla ENTER ao lado do NPC 23

    let currentIndex = 0; // Índice atual do diálogo

    const advanceDialog = () => { // Função para avançar o diálogo
    currentIndex++; // Incrementa o índice do diálogo
    if (currentIndex < speech.length) { // Verifica se ainda há falas no array
      dialogText.setText(speech[currentIndex]); // Atualiza o texto do diálogo
      this.keySound(); // Toca o som de interação
    } else {
      // Remove o balão de diálogo e a tecla ENTER
      this.keySound(); // Toca o som de interação
      dialogBalloon.destroy(); // Remove o balão de diálogo
      dialogText.destroy(); // Remove o texto do diálogo
      keyEnter.destroy(); // Remove a tecla ENTER
      this.createIndicatorNpc15(); // Ativa o indicador para o NPC 15
      this.input.keyboard.off("keydown-ENTER", advanceDialog); // Remove o evento de pressionar ENTER
    }
    };

    // Adiciona o evento para avançar o diálogo com a tecla ENTER
    this.input.keyboard.on("keydown-ENTER", advanceDialog); // Adiciona o evento para avançar o diálogo ao pressionar ENTER
  }

  createServer() {
    this.crashedWire = this.physics.add.sprite(width - 1170, height - 220, 'crashedWire').setScale(0.06); // Adiciona o sprite do fio quebrado na posição especificada e ajusta seu tamanho
    this.crashedWire.setImmovable(true); // Define o fio quebrado como imóvel para colisões

    // Adiciona o overlap entre o jogador e o fio quebrado
    this.physics.add.overlap(this.player, this.crashedWire, () => {
      if (!this.keyECrashedWire && this.screwDriverCollected) { // Verifica se a tecla "E" não foi exibida e se a chave de fenda foi coletada
        this.keyECrashedWire = this.add.image(this.crashedWire.x, this.crashedWire.y - 40, 'keyE').setScale(0.07).setDepth(1000); // Adiciona a tecla "E" acima do fio quebrado
        this.canInteractWithCrashedWire = true; // Permite a interação com o fio quebrado
      }
    });

    // Remove a tecla "E" se o jogador se afasta do fio quebrado
    this.physics.add.overlap(this.player, this.crashedWire, null, (player, wire) => {
      const distance = Phaser.Math.Distance.Between(player.x, player.y, wire.x, wire.y); // Calcula a distância entre o jogador e o fio quebrado
      if (distance > 100 && this.keyECrashedWire) { // Verifica se o jogador está a mais de 100 pixels de distância e se a tecla "E" está visível
        this.keyECrashedWire.destroy(); // Remove a tecla "E"
        this.keyECrashedWire = null; // Reseta a referência da tecla "E"
        this.canInteractWithCrashedWire = false; // Impede a interação com o fio quebrado
      }
      return true; // Retorna verdadeiro para continuar verificando o overlap
    }, this);

    // Adiciona a interação com o fio quebrado ao pressionar a tecla "E"
    this.input.keyboard.on("keydown-E", () => {
      if (this.canInteractWithCrashedWire) { // Verifica se o jogador pode interagir com o fio quebrado
        this.canInteractWithCrashedWire = false; // Impede novas interações enquanto a atual está em andamento

        if (this.keyECrashedWire) { // Verifica se a tecla "E" está visível
          this.keyECrashedWire.destroy(); // Remove a tecla "E"
          this.keyECrashedWire = null; // Reseta a referência da tecla "E"
        }

        if (this.screwDriver) { // Verifica se a chave de fenda está presente
          this.screwDriver.destroy(); // Remove a chave de fenda
          this.screwDriver = null; // Reseta a referência da chave de fenda
          this.screwDriverCollected = false; // Reseta o estado indicando que a chave de fenda foi coletada
        }

        this.scene.pause('vpNegociosScene'); // Pausa a cena principal
        this.scene.launch('minigameWires'); // Inicia a cena do minigame de fios
      }
    });
  }

  createIndicatorNpc10() {
    this.indicatorNpc10 = this.physics.add.sprite(this.npc10.x, this.npc10.y - 50, 'indicator'); // Cria um sprite de indicador acima do NPC 10
    this.indicatorNpc10.setScale(0.2); // Define o tamanho do indicador
    this.indicatorNpc10.setImmovable(true); // Define o indicador como imóvel
    this.indicatorNpc10.play("exclaiming"); // Reproduz a animação de exclamação para o indicador
  
    this.physics.add.overlap(this.player, this.npc10, () => { // Adiciona um evento de overlap entre o jogador e o NPC 10
      if (!this.npc10Interacted && !this.keyENpc10 && !this.Npc10ChipCollected) { // Verifica se o NPC 10 ainda não foi interagido, a tecla E não está visível e o chip não foi coletado
        if (this.indicatorNpc10) { // Verifica se o indicador ainda existe
          this.indicatorNpc10.destroy(); // Remove o indicador
          this.indicatorNpc10 = null; // Reseta a referência do indicador
        }
  
        this.keyENpc10 = this.add.image(this.npc10.x, this.npc10.y - 40, 'keyE').setScale(0.07).setDepth(1000); // Adiciona a tecla E acima do NPC 10
        this.canInteractWithNpc10 = true; // Permite a interação com o NPC 10
      }
    });
  
    // Remove a tecla E se o jogador se afasta do NPC 10
    this.physics.add.overlap(this.player, this.npc10, null, (player, npc) => { // Adiciona um evento de overlap para verificar a distância entre o jogador e o NPC 10
      const distance = Phaser.Math.Distance.Between(player.x, player.y, npc.x, npc.y); // Calcula a distância entre o jogador e o NPC 10
      if (distance > 100 && this.keyENpc10) { // Verifica se o jogador está a mais de 100 pixels de distância e se a tecla E está visível
        this.keyENpc10.destroy(); // Remove a tecla E
        this.keyENpc10 = null; // Reseta a referência da tecla E
        this.canInteractWithNpc10 = false; // Impede a interação com o NPC 10
      }
      return true; // Retorna verdadeiro para continuar verificando o overlap
    }, this);
  
    // Adiciona a interação com o NPC 10 ao pressionar a tecla E
    this.input.keyboard.on("keydown-E", () => { // Adiciona um evento para quando a tecla E for pressionada
      this.keySound(); // Toca o som de interação
      if (this.canInteractWithNpc10) { // Verifica se o jogador pode interagir com o NPC 10
        this.canInteractWithNpc10 = false; // Impede novas interações enquanto a atual está em andamento
  
        if (this.keyENpc10) { // Verifica se a tecla E está visível
          this.keyENpc10.destroy(); // Remove a tecla E
          this.keyENpc10 = null; // Reseta a referência da tecla E
        }
  
        this.npc10Interacted = true; // Marca que o NPC 10 foi interagido
        this.showNpc10Dialog(); // Chama o método para exibir o diálogo do NPC 10
      }
    });
    this.activeIndicators.push(this.indicatorNpc10);

  }

  showNpc10Dialog() {
    const speech = [ // Array contendo as falas do NPC 10
      "Ah, você que veio ajudar com os servidores, né?", // Primeira fala
      "Aqui está a chave de fenda. Mas cuidado: ela não é uma chave comum — ela tem um sensor de segurança para não danificar os componentes internos.", // Segunda fala
      "Quando chegar na sala dos servidores, procure o painel com os fios danificados. É ali que tá o problema.", // Terceira fala
      "E lembra: sem esses servidores funcionando, os clientes corporativos da Vivo ficam no escuro. Capricha aí!", // Quarta fala
      "Vai lá e mostra do que você é capaz!" // Quinta fala
    ];

    const dialogBalloon = this.add.image(this.npc10.x + 50, this.npc10.y - 50, "balloonText").setScale(0.8); // Adiciona um balão de diálogo acima do NPC 10
    const dialogText = this.add.text(this.npc10.x - 15, this.npc10.y - 100, speech[0], { // Adiciona o texto inicial do diálogo
      fontSize: "10px", // Define o tamanho da fonte do texto
      fill: "#000000", // Define a cor do texto como preto
      wordWrap: { width: dialogBalloon.width - 50 }, // Define a largura máxima para quebra de linha
    });

    // Adiciona a tecla ENTER ao lado do balão de diálogo
    const keyEnter = this.add.image(this.npc10.x - 40, this.npc10.y - 40, 'keyENTER').setScale(0.1).setDepth(1000); // Adiciona a tecla ENTER ao lado do NPC 10

    let currentIndex = 0; // Índice atual do diálogo

    const advanceDialog = () => { // Função para avançar o diálogo
      currentIndex++; // Incrementa o índice do diálogo
      if (currentIndex < speech.length) { // Verifica se ainda há falas no array
        dialogText.setText(speech[currentIndex]); // Atualiza o texto do diálogo
        this.keySound(); // Toca o som de interação
      } else {
        // Remove o balão de diálogo e a tecla ENTER
        this.keySound(); // Toca o som de interação
        dialogBalloon.destroy(); // Remove o balão de diálogo
        dialogText.destroy(); // Remove o texto do diálogo
        keyEnter.destroy(); // Remove a tecla ENTER
        this.input.keyboard.off("keydown-ENTER", advanceDialog); // Remove o evento de pressionar ENTER

        this.addScrewDriver(); // Adiciona a chave de fenda ao lado do jogador
      }
    };

    // Adiciona o evento para avançar o diálogo com a tecla ENTER
    this.input.keyboard.on("keydown-ENTER", advanceDialog); // Adiciona o evento para avançar o diálogo ao pressionar ENTER
  }

  addScrewDriver() {
  // Cria o sprite da chave de fenda ao lado do jogador
  this.screwDriver = this.physics.add.sprite(this.player.x + 20, this.player.y, 'screwDriver').setScale(0.08);
  this.screwDriver.setDepth(1000);
  this.screwDriver.setFlipX(true);

  // Faz a chave de fenda seguir o jogador
  this.physics.add.overlap(this.player, this.screwDriver, () => {
    if (this.screwDriver) {
      this.screwDriver.x = this.player.x;
      this.screwDriver.y = this.player.y + 25;
    }
  });

  // Atualiza a orientação baseada no movimento do jogador
  this.events.on('update', () => {
    if (this.screwDriver) {
      if (this.keys.left.isDown) {
        this.screwDriver.setFlipX(true);
      } else if (this.keys.right.isDown) {
        this.screwDriver.setFlipX(false);
      }
    }
  });

  this.screwDriverCollected = true;
  
  // Chama a função para adicionar indicador após pegar a chave
  this.addWireIndicator();
}

addWireIndicator() {
  // Posição fixa acima da área dos fios (servidor)
  const wirePosition = { 
    x: width - 1170,  // Mesmo X do servidor quebrado
    y: height - 200   // Ajuste Y para posicionar acima dos fios
  };
  
  // Cria o sprite do indicador
  const wireIndicator = this.physics.add.sprite(
    wirePosition.x, 
    wirePosition.y - 50, // Posiciona 50px acima dos fios
    'indicator'
  );
  
  // Configurações visuais do indicador
  wireIndicator.setScale(0.2);
  wireIndicator.setImmovable(true);
  wireIndicator.play("exclaiming");
  wireIndicator.setDepth(999); // Garante que fique acima dos fios
  
  // Adiciona ao array de indicadores ativos para a bússola
  this.activeIndicators.push(wireIndicator);
  
  // Lógica de interação quando jogador se aproxima
  this.physics.add.overlap(this.player, wireIndicator, () => {
    const distance = Phaser.Math.Distance.Between(
      this.player.x, 
      this.player.y, 
      wireIndicator.x, 
      wireIndicator.y
    );
    
    // Mostra tecla E quando próximo
    if (distance < 100 && !this.wireIndicatorKeyE) {
      wireIndicator.destroy();
      this.wireIndicatorKeyE = this.add.image(
        wireIndicator.x, 
        wireIndicator.y - 10, 
        'keyE'
      )
      .setScale(0.07)
      .setDepth(1000);
      
      this.canInteractWithWireIndicator = true;
    }
  });
  
  // Remove a tecla E quando jogador se afasta
  this.physics.add.overlap(this.player, wireIndicator, null, (player, indicator) => {
    const distance = Phaser.Math.Distance.Between(
      player.x, 
      player.y, 
      indicator.x, 
      indicator.y
    );
    
    if (distance > 100 && this.wireIndicatorKeyE) {
      this.wireIndicatorKeyE.destroy();
      this.wireIndicatorKeyE = null;
      this.canInteractWithWireIndicator = false;
    }
    return true;
  }, this);
  
  // Lógica ao pressionar E
  this.input.keyboard.on("keydown-E", () => {
    if (this.canInteractWithWireIndicator && this.wireIndicatorKeyE) {
      this.keySound();
      this.wireIndicatorKeyE.destroy();
      this.wireIndicatorKeyE = null;
      this.canInteractWithWireIndicator = false;
      
      // Remove do array de indicadores ativos
      this.activeIndicators = this.activeIndicators.filter(
        ind => ind !== wireIndicator
      );
      
      // Adicione aqui qualquer lógica adicional de recompensa
    }
  });
}
  
  createIndicatorNpc15() {
    this.indicatorNpc15 = this.physics.add.sprite(this.npc15.x, this.npc15.y - 50, 'indicator'); // Cria um sprite de indicador acima do NPC 15
    this.indicatorNpc15.setScale(0.2); // Ajusta o tamanho do indicador
    this.indicatorNpc15.setImmovable(true); // Define o indicador como imóvel
    this.indicatorNpc15.play("exclaiming"); // Reproduz a animação de exclamação para o indicador
  
    this.physics.add.overlap(this.player, this.npc15, () => { // Adiciona um evento de overlap entre o jogador e o NPC 15
    if (!this.npc15Interacted && !this.keyENpc15 && !this.npc15ChipCollected) { // Verifica se o NPC 15 ainda não foi interagido, a tecla E não está visível e o chip não foi coletado
      if (this.indicatorNpc15) { // Verifica se o indicador ainda existe
      this.indicatorNpc15.destroy(); // Remove o indicador
      this.indicatorNpc15 = null; // Reseta a referência do indicador
      }
  
      this.keyENpc15 = this.add.image(this.npc15.x, this.npc15.y - 40, 'keyE').setScale(0.07).setDepth(1000); // Adiciona a tecla E acima do NPC 15
      this.canInteractWithNpc15 = true; // Permite a interação com o NPC 15
    }
    });
  
    // Remove a tecla E se o player se afasta
    this.physics.add.overlap(this.player, this.npc15, null, (player, npc) => { // Adiciona um evento de overlap para verificar a distância entre o jogador e o NPC 15
    const distance = Phaser.Math.Distance.Between(player.x, player.y, npc.x, npc.y); // Calcula a distância entre o jogador e o NPC 15
    if (distance > 100 && this.keyENpc15) { // Verifica se o jogador está a mais de 100 pixels de distância e se a tecla E está visível
      this.keyENpc15.destroy(); // Remove a tecla E
      this.keyENpc15 = null; // Reseta a referência da tecla E
      this.canInteractWithNpc15 = false; // Impede a interação com o NPC 15
    }
    return true; // Retorna verdadeiro para continuar verificando o overlap
    }, this);
    this.activeIndicators.push(this.indicatorNpc15);

  }

  createChips() {
    this.chips = this.physics.add.group(); // Cria um grupo para os chips, permitindo manipulação em conjunto

    // Adiciona 5 chips em posições fixas
    const chipPositions = [
    { x: width - 850, y: height - 270 }, // Chip da planta - primeiro
    { x: width - 720, y: height - 130 }, // Chip na mesa esquerda inferior - segundo
    { x: width - 370, y: height - 50 }, // Chip na direita perto da parede - terceiro
    { x: width - 370, y: height - 320 } // Chip na salinha do 5G - quinto
    ];

    chipPositions.forEach(pos => { // Itera sobre as posições definidas
    const chip = this.chips.create(pos.x, pos.y, 'chip'); // Cria um chip na posição especificada
    chip.setScale(0.06); // Ajusta o tamanho do chip
    });

    // Adiciona o overlap entre o jogador e os chips
    this.physics.add.overlap(this.player, this.chips, this.collectChip, null, this); // Detecta colisão entre o jogador e os chips
  }

  collectChip(player, chip) {
    this.collectSound(); // Toca o som de coleta
    chip.destroy(); // Remove o chip coletado
    this.collectedChips += 1; // Incrementa o contador de chips em 1
    this.chipText.setText(`${this.collectedChips}/5`); // Atualiza o texto na tela com a quantidade de chips coletados
  }
  
  createNpc15Chip() {
    // Verifica se o chip já foi criado ou coletado
    if (this.npc15ChipCollected || this.npc15ChipCreated) return; // Impede a criação do chip se ele já foi criado ou coletado
  
    console.log("Chip do NPC 15 criado"); // Loga no console que o chip foi criado
  
    // Marca que o chip foi criado
    this.npc15ChipCreated = true; // Define que o chip foi criado
  
    const chipPosition = { x: width - 470, y: height - 310 }; // Posição fixa do chip do NPC 15
    const chip = this.chips.create(chipPosition.x, chipPosition.y, 'chip'); // Cria o chip na posição especificada
    chip.setScale(0.06); // Ajusta o tamanho do chip
  
    // Adiciona o overlap entre o jogador e o chip
    this.physics.add.overlap(this.player, chip, (player, chip) => { // Detecta colisão entre o jogador e o chip
      chip.destroy(); // Remove o chip coletado
      this.collectedChips += 1; // Incrementa o contador de chips em 1
      this.chipText.setText(`${this.collectedChips}/5`); // Atualiza o texto na tela com a quantidade de chips coletados
      this.npc15ChipCollected = true; // Marca o chip como coletado
    }, null, this);
  }


npc15Question() {
  if (this.npc15ChipCollected) return; // Verifica se o chip do NPC 15 já foi coletado e, se sim, retorna sem executar o restante do código.

  const speech = [ // Define um array com as falas do NPC 15.
    "Olá, seja Bem-Vindo a área da B2B da Vivo!", // Primeira fala do NPC 15.
    "Aqui você vai conhecer os conceitos de B2B e B2C.", // Segunda fala do NPC 15.
    "Vamos começar coletando os chips de internet para desbloquear os 5G mais rápido do Brasil!", // Terceira fala do NPC 15.
    "Mas antes eu tenho uma pergunta para você, para responde-lá é só apertar ENTER na opção correta.", // Quarta fala do NPC 15.
    "Você sabe quais são os principais serviços oferecidos pela Vivo para clientes B2C?" // Quinta fala do NPC 15.
  ];

  this.npc15DialogBalloon = this.add.image(this.npc15.x + 50, this.npc15.y - 50, "balloonText").setScale(0.8); // Adiciona um balão de diálogo acima do NPC 15.
  this.npc15DialogText = this.add.text(this.npc15.x - 15, this.npc15.y - 100, speech[0], { // Adiciona o texto inicial do diálogo.
    fontSize: "10px", // Define o tamanho da fonte do texto.
    fill: "#000000", // Define a cor do texto como preto.
    wordWrap: { width: this.npc15DialogBalloon.width - 50 }, // Define a largura máxima para quebra de linha no texto.
  });

  let currentIndex = 0; // Inicializa o índice atual do diálogo como 0.

  const enterNpc15 = () => { // Define uma função para avançar o diálogo ao pressionar ENTER.
    currentIndex++; // Incrementa o índice do diálogo.
    if (currentIndex < speech.length) { // Verifica se ainda há falas no array.
      this.npc15DialogText.setText(speech[currentIndex]); // Atualiza o texto do diálogo com a próxima fala.
      this.keySound(); // Toca o som de interação.
    } else { // Caso todas as falas tenham sido exibidas.
      this.npc15DialogText.setVisible(false); // Esconde o texto do diálogo.
      this.npc15DialogBalloon.setVisible(false); // Esconde o balão de diálogo.
      this.input.keyboard.off("keydown-ENTER", enterNpc15); // Remove o evento de pressionar ENTER.

      if (this.keyEnterNpc15) { // Verifica se a tecla ENTER está visível.
        this.keyEnterNpc15.destroy(); // Remove a tecla ENTER.
        this.keyEnterNpc15 = null; // Reseta a referência da tecla ENTER.
        this.createOptions(); // Chama o método para criar as opções letterA e letterB.
      }
    }
  };

  this.input.keyboard.on("keydown-ENTER", enterNpc15); // Adiciona o evento para avançar o diálogo ao pressionar ENTER.
}

handleCorrectAnswer(callback) {
  console.log("Resposta correta!"); // Exibe no console que a resposta está correta
  this.sound.play('correctSound'); // Toca o som de resposta correta

  const feedbackSpeechCorrect = [ // Define um array com as falas de feedback para a resposta correta
    "Correto! Esses são exatamente os serviços focados no consumidor final, que é o público-alvo do modelo B2C (business to consumer).", // Primeira fala
    "Como recompensa vou te entregar um chip para te ajudar nessa aventura." // Segunda fala
  ];

  const feedbackBalloon = this.add.image(this.npc15.x + 50, this.npc15.y - 50, "balloonText").setScale(0.8); // Adiciona um balão de diálogo acima do NPC 15
  const feedbackText = this.add.text(this.npc15.x - 15, this.npc15.y - 100, feedbackSpeechCorrect[0], { // Adiciona o texto inicial do feedback
      fontSize: "10px", // Define o tamanho da fonte do texto
      fill: "#000000", // Define a cor do texto como preto
      wordWrap: { width: feedbackBalloon.width - 50 }, // Define a largura máxima para quebra de linha no texto
  });

  const feedbackKeyEnter = this.add.image(this.npc15.x - 40, this.npc15.y - 40, 'keyENTER').setScale(0.1).setDepth(1000); // Adiciona a tecla ENTER ao lado do NPC 15

  let feedbackIndex = 0; // Inicializa o índice atual do feedback como 0

  const destroyFeedback = () => { // Define uma função para destruir os elementos de feedback
      this.keySound(); // Toca o som de interação
      if (feedbackBalloon) feedbackBalloon.destroy(); // Remove o balão de feedback, se existir
      if (feedbackText) feedbackText.destroy(); // Remove o texto de feedback, se existir
      if (feedbackKeyEnter) feedbackKeyEnter.destroy(); // Remove a tecla ENTER, se existir
  };

  const advanceFeedback = () => { // Define uma função para avançar o feedback ao pressionar ENTER
      feedbackIndex++; // Incrementa o índice do feedback
      if (feedbackIndex < feedbackSpeechCorrect.length) { // Verifica se ainda há falas no array
          feedbackText.setText(feedbackSpeechCorrect[feedbackIndex]); // Atualiza o texto do feedback com a próxima fala
          this.keySound(); // Toca o som de interação
      } else { // Caso todas as falas tenham sido exibidas
          destroyFeedback(); // Remove os elementos de feedback
          this.createNpc15Chip(); // Cria o chip do NPC 15 como recompensa
          this.input.keyboard.off("keydown-ENTER", advanceFeedback); // Remove o evento de pressionar ENTER

          // Executa o callback, se fornecido
          if (callback) callback(); // Chama o callback, se ele existir
      }
  };

  this.input.keyboard.on("keydown-ENTER", advanceFeedback); // Adiciona o evento para avançar o feedback ao pressionar ENTER
}

handleIncorrectAnswer(callback) {
  console.log("Resposta incorreta!"); // Exibe no console que a resposta está incorreta
  this.sound.play('wrongSound'); // Toca o som de resposta incorreta

  const feedbackSpeechWrong = [ // Define um array com as falas de feedback para a resposta incorreta
      "Incorreto. Esses serviços são voltados para empresas e fazem parte do modelo B2B (business to business), não para o consumidor final.", // Primeira fala
      "Tente novamente e escolha a opção correta!" // Segunda fala
  ];

  const feedbackBalloon = this.add.image(this.npc15.x + 50, this.npc15.y - 50, "balloonText").setScale(0.8); // Adiciona um balão de diálogo acima do NPC 15
  const feedbackText = this.add.text(this.npc15.x - 15, this.npc15.y - 100, feedbackSpeechWrong[0], { // Adiciona o texto inicial do feedback
      fontSize: "10px", // Define o tamanho da fonte do texto
      fill: "#000000", // Define a cor do texto como preto
      wordWrap: { width: feedbackBalloon.width - 50 }, // Define a largura máxima para quebra de linha no texto
  });

  const feedbackKeyEnter = this.add.image(this.npc15.x - 40, this.npc15.y - 40, 'keyENTER').setScale(0.1).setDepth(1000); // Adiciona a tecla ENTER ao lado do NPC 15

  let feedbackIndex = 0; // Inicializa o índice atual do feedback como 0

  const destroyFeedback = () => { // Define uma função para destruir os elementos de feedback
      this.keySound(); // Toca o som de interação
      if (feedbackBalloon) feedbackBalloon.destroy(); // Remove o balão de feedback, se existir
      if (feedbackText) feedbackText.destroy(); // Remove o texto de feedback, se existir
      if (feedbackKeyEnter) feedbackKeyEnter.destroy(); // Remove a tecla ENTER, se existir
  };

  const advanceFeedback = () => { // Define uma função para avançar o feedback ao pressionar ENTER
      feedbackIndex++; // Incrementa o índice do feedback
      if (feedbackIndex < feedbackSpeechWrong.length) { // Verifica se ainda há falas no array
          feedbackText.setText(feedbackSpeechWrong[feedbackIndex]); // Atualiza o texto do feedback com a próxima fala
          this.keySound(); // Toca o som de interação
      } else { // Caso todas as falas tenham sido exibidas
          destroyFeedback(); // Remove os elementos de feedback
          this.input.keyboard.off("keydown-ENTER", advanceFeedback); // Remove o evento de pressionar ENTER

          // Recria as opções sem criar o chip
          this.createOptions(); // Chama o método para recriar as opções letterA e letterB

          // Executa o callback, se fornecido
          if (callback) callback(); // Chama o callback, se ele existir
      }
  };

  this.input.keyboard.on("keydown-ENTER", advanceFeedback); // Adiciona o evento para avançar o feedback ao pressionar ENTER
}

createOptions() {
  this.input.keyboard.off("keydown-ENTER"); // Remove qualquer evento anterior associado à tecla ENTER para evitar conflitos.

  const letterA = this.physics.add.sprite(width - 590, height - 330, 'letterA'); // Adiciona a opção "A" como um sprite no mapa.
  letterA.setScale(0.1); // Define o tamanho do sprite da opção "A".
  letterA.setImmovable(); // Define que a opção "A" não pode ser movida.

  const letterB = this.physics.add.sprite(width - 510, height - 330, 'letterB'); // Adiciona a opção "B" como um sprite no mapa.
  letterB.setScale(0.1); // Define o tamanho do sprite da opção "B".
  letterB.setImmovable(); // Define que a opção "B" não pode ser movida.

  let activeTextA = null; // Variável para armazenar o texto ativo associado à opção "A".
  let activeTextB = null; // Variável para armazenar o texto ativo associado à opção "B".
  let keyEnterA = null; // Variável para armazenar a tecla ENTER associada à opção "A".
  let keyEnterB = null; // Variável para armazenar a tecla ENTER associada à opção "B".

  const destroyText = (activeText) => { // Função para destruir o texto ativo.
    if (activeText) { // Verifica se há texto ativo.
      activeText.balloonText.destroy(); // Remove o balão de texto.
      activeText.displayedText.destroy(); // Remove o texto exibido.
    }
  };

  const destroyKeyEnter = (keyEnter) => { // Função para destruir a tecla ENTER.
    if (keyEnter) { // Verifica se a tecla ENTER existe.
      keyEnter.destroy(); // Remove a tecla ENTER.
    }
  };

  const destroyOptions = () => { // Função para destruir as opções.
    letterA.destroy(); // Remove a opção "A".
    letterB.destroy(); // Remove a opção "B".
    destroyText(activeTextA); // Remove o texto ativo da opção "A".
    destroyText(activeTextB); // Remove o texto ativo da opção "B".
    destroyKeyEnter(keyEnterA); // Remove a tecla ENTER da opção "A".
    destroyKeyEnter(keyEnterB); // Remove a tecla ENTER da opção "B".
  };

  const destroyCreateOptions = () => { // Função para destruir as opções e remover eventos associados.
    destroyOptions(); // Chama a função para destruir as opções.
    this.input.keyboard.off("keydown-ENTER"); // Remove o evento associado à tecla ENTER.
  };

  // Remove listeners antigos para evitar conflitos
  if (this.enterKeyListenerA) { // Verifica se há um listener associado à opção "A".
    this.input.keyboard.off("keydown-ENTER", this.enterKeyListenerA); // Remove o listener associado à tecla ENTER para a opção "A".
    this.enterKeyListenerA = null; // Reseta a referência do listener.
  }
  if (this.enterKeyListenerB) { // Verifica se há um listener associado à opção "B".
    this.input.keyboard.off("keydown-ENTER", this.enterKeyListenerB); // Remove o listener associado à tecla ENTER para a opção "B".
    this.enterKeyListenerB = null; // Reseta a referência do listener.
  }

  // Lógica para a letterA
  this.physics.add.overlap(this.player, letterA, () => { // Adiciona um evento de overlap entre o jogador e a opção "A".
    const distance = Phaser.Math.Distance.Between(this.player.x, this.player.y, letterA.x, letterA.y); // Calcula a distância entre o jogador e a opção "A".
    if (distance < 20) { // Verifica se o jogador está próximo da opção "A".
      if (!activeTextA) { // Verifica se o texto ativo da opção "A" ainda não foi criado.
        const balloonText = this.add.image(letterA.x + 80, letterA.y - 80, "balloonText").setScale(0.8); // Adiciona um balão de texto acima da opção "A".
        const displayedText = this.add.text( // Adiciona o texto explicativo da opção "A".
          letterA.x + 10,
          letterA.y - 132,
          "Planos de celular pré e pós-pago, internet banda larga residencial (Vivo Fibra), TV por assinatura, serviços digitais (Vivo Play) e apps de streaming.",
          {
            fontSize: "10px", // Define o tamanho da fonte do texto.
            fill: "#000000", // Define a cor do texto como preto.
            wordWrap: { width: balloonText.width - 40 }, // Define a largura máxima para quebra de linha no texto.
          }
        );

        activeTextA = { balloonText, displayedText }; // Armazena o balão e o texto como texto ativo da opção "A".
      }
      if (!keyEnterA) { // Verifica se a tecla ENTER associada à opção "A" ainda não foi criada.
        keyEnterA = this.add.image(letterA.x, letterA.y - 40, 'keyENTER').setScale(0.06).setDepth(1000); // Adiciona a tecla ENTER acima da opção "A".
      }

      // Adiciona evento para pressionar ENTER na letterA
      if (!this.enterKeyListenerA) { // Verifica se o listener para a tecla ENTER ainda não foi criado.
        this.enterKeyListenerA = this.input.keyboard.on("keydown-ENTER", () => { // Adiciona um evento para pressionar ENTER.
          if (activeTextA) { // Verifica se há texto ativo na opção "A".
            destroyCreateOptions(); // Destrói as opções.
            this.handleCorrectAnswer(); // Chama o método handleCorrectAnswer para tratar a resposta correta.
            this.input.keyboard.off("keydown-ENTER", this.enterKeyListenerA); // Remove o listener associado à tecla ENTER.
            this.enterKeyListenerA = null; // Reseta a referência do listener.
          }
        });
      }
    } else { // Caso o jogador se afaste da opção "A".
      if (activeTextA) { // Verifica se há texto ativo na opção "A".
        destroyText(activeTextA); // Remove o texto ativo da opção "A".
        activeTextA = null; // Reseta a referência do texto ativo.
      }
      if (keyEnterA) { // Verifica se a tecla ENTER está visível.
        destroyKeyEnter(keyEnterA); // Remove a tecla ENTER.
        keyEnterA = null; // Reseta a referência da tecla ENTER.
      }
    }
  });

  // Lógica para a letterB
  this.physics.add.overlap(this.player, letterB, () => { // Adiciona um evento de overlap entre o jogador e a opção "B".
    const distance = Phaser.Math.Distance.Between(this.player.x, this.player.y, letterB.x, letterB.y); // Calcula a distância entre o jogador e a opção "B".
    if (distance < 20) { // Verifica se o jogador está próximo da opção "B".
      if (!activeTextB) { // Verifica se o texto ativo da opção "B" ainda não foi criado.
        const balloonText = this.add.image(letterB.x + 80, letterB.y - 80, "balloonText").setScale(0.8); // Adiciona um balão de texto acima da opção "B".
        const displayedText = this.add.text( // Adiciona o texto explicativo da opção "B".
          letterB.x + 10,
          letterB.y - 132,
          "Soluções de conectividade corporativa, serviços em nuvem, redes privadas, IoT empresarial e consultoria em transformação digital.",
          {
            fontSize: "10px", // Define o tamanho da fonte do texto.
            fill: "#000000", // Define a cor do texto como preto.
            wordWrap: { width: balloonText.width - 40 }, // Define a largura máxima para quebra de linha no texto.
          }
        );

        activeTextB = { balloonText, displayedText }; // Armazena o balão e o texto como texto ativo da opção "B".
      }
      if (!keyEnterB) { // Verifica se a tecla ENTER associada à opção "B" ainda não foi criada.
        keyEnterB = this.add.image(letterB.x, letterB.y - 40, 'keyENTER').setScale(0.06).setDepth(1000); // Adiciona a tecla ENTER acima da opção "B".
      }

      // Adiciona evento para pressionar ENTER na letterB
      if (!this.enterKeyListenerB) { // Verifica se o listener para a tecla ENTER ainda não foi criado.
        this.enterKeyListenerB = this.input.keyboard.on("keydown-ENTER", () => { // Adiciona um evento para pressionar ENTER.
          if (activeTextB) { // Verifica se há texto ativo na opção "B".
            destroyCreateOptions(); // Destrói as opções.
            this.handleIncorrectAnswer(() => { // Chama o método handleIncorrectAnswer para tratar a resposta incorreta.
                this.input.keyboard.off("keydown-ENTER", this.enterKeyListenerB); // Remove o listener associado à tecla ENTER.
                this.enterKeyListenerB = null; // Reseta a referência do listener.
            });
          }
        });
      }
    } else { // Caso o jogador se afaste da opção "B".
      if (activeTextB) { // Verifica se há texto ativo na opção "B".
        destroyText(activeTextB); // Remove o texto ativo da opção "B".
        activeTextB = null; // Reseta a referência do texto ativo.
      }
      if (keyEnterB) { // Verifica se a tecla ENTER está visível.
        destroyKeyEnter(keyEnterB); // Remove a tecla ENTER.
        keyEnterB = null; // Reseta a referência da tecla ENTER.
      }
    }
  });
}

createLocker() {
  this.locker = this.physics.add.sprite(width - 350, height - 220, 'locker').setScale(0.09); // Cria o sprite do locker na posição especificada e ajusta seu tamanho
  this.locker.setImmovable(true); // Define o locker como imóvel para colisões
  this.physics.add.collider(this.player, this.locker, () => { // Adiciona uma colisão entre o jogador e o locker
    console.log("Player colidiu com o locker!"); // Exibe uma mensagem no console quando o jogador colide com o locker
    // Adicione aqui qualquer lógica adicional para a colisão
  });
}

showCongratulations() {
  const congratulationsImage = this.add.image(this.player.x, this.player.y - 150, 'congratulations5G').setDepth(1000); // Adiciona a imagem de parabéns acima do jogador e define sua profundidade para garantir que fique acima de outros elementos
  congratulationsImage.setScale(0.3); // Ajusta o tamanho da imagem de parabéns

  // Remove a imagem de parabéns após 3 segundos
  this.time.delayedCall(3000, () => { // Define um atraso de 3 segundos antes de executar a função
      congratulationsImage.destroy(); // Remove a imagem de parabéns da tela
  });
}
}

class MinigameWires extends Phaser.Scene {
constructor() {
  super({ key: 'minigameWires' });
}

preload() {
  this.load.image('serverBackground', '../assets/assetsWires/serverBackground.png'); // Carrega a imagem de fundo do servidor para o minigame
  this.load.image('backgroundMinigame', '../assets/assetsWires/backgroundMinigame.png'); // Carrega a imagem de fundo adicional para o minigame
  this.load.image('blueWireConnected', '../assets/assetsWires/fioAzulGrande.png'); // Carrega a imagem do fio azul conectado (grande)
  this.load.image('blueWireDisconnected', '../assets/assetsWires/fioAzulPequeno.png'); // Carrega a imagem do fio azul desconectado (pequeno)
  this.load.image('redWireConnected', '../assets/assetsWires/fioVermelhoGrande.png'); // Carrega a imagem do fio vermelho conectado (grande)
  this.load.image('redWireDisconnected', '../assets/assetsWires/fioVermelhoPequeno.png'); // Carrega a imagem do fio vermelho desconectado (pequeno)
  this.load.image('yellowWireConnected', '../assets/assetsWires/fioAmareloGrande.png'); // Carrega a imagem do fio amarelo conectado (grande)
  this.load.image('yellowWireDisconnected', '../assets/assetsWires/fioAmareloPequeno.png'); // Carrega a imagem do fio amarelo desconectado (pequeno)
  this.load.image('pinkWireConnected', '../assets/assetsWires/fioRosaGrande.png'); // Carrega a imagem do fio rosa conectado (grande)
  this.load.image('pinkWireDisconnected', '../assets/assetsWires/fioRosaPequeno.png'); // Carrega a imagem do fio rosa desconectado (pequeno)
  this.load.image('endPointBlue', '../assets/assetsWires/endPointBlue.png'); // Carrega a imagem do ponto de conexão final para o fio azul
  this.load.image('endPointRed', '../assets/assetsWires/endPointRed.png'); // Carrega a imagem do ponto de conexão final para o fio vermelho
  this.load.image('endPointYellow', '../assets/assetsWires/endPointYellow.png'); // Carrega a imagem do ponto de conexão final para o fio amarelo
  this.load.image('endPointPink', '../assets/assetsWires/endPointPink.png'); // Carrega a imagem do ponto de conexão final para o fio rosa

  this.load.audio('collectSound', '../assets/sounds/476178__unadamlar__correct-choice.wav'); // Carrega o efeito sonoro de coleta
  this.load.audio('correctSound', '../assets/sounds/476178__unadamlar__correct-choice.wav'); // Carrega o som de resposta correta
}

collectSound() {
  this.collected = this.sound.add('collectSound', { loop: false, volume: 10 }); // Adiciona o som de coleta com volume e sem loop
  this.collected.play(); // Reproduz o som de coleta
}

create() {
  this.add.image(width / 2, height / 2, 'serverBackground').setScale(1.8); // Adiciona a imagem do servidor
  this.add.image(width / 2, height / 2, 'backgroundMinigame').setScale(0.55); // Adiciona a imagem do minigame
  // Posições iniciais dos fios (esquerda da tela)
  this.startPoints = {
    blue: { x: width - 1100, y: height - 450 }, // Adiciona o fio azul na tela
    red: { x: width - 1100, y: height - 250 }, // Adiciona o vermelho azul na tela
    yellow: { x: width - 1100, y: height - 350 }, // Adiciona o fio amarelo na tela
    pink: { x: width - 1100, y: height - 550 } // Adiciona o fio rosa na tela
  };

  // Conectores (direita da tela)
  this.endPoints = {
    blue: this.add.sprite(width - 420, height - 550, 'endPointBlue').setScale(0.2), // Adiciona o ponto de conecxão azul na tela
    red: this.add.sprite(width - 420, height - 450, 'endPointRed').setScale(0.2), // Adiciona o ponto de conecxão vermelho na tela
    yellow: this.add.sprite(width - 420, height - 350, 'endPointYellow').setScale(0.2), // Adiciona o ponto de conecxão amarelo na tela
    pink: this.add.sprite(width - 420, height - 250, 'endPointPink').setScale(0.2) // Adiciona o ponto de conecxão rosa na tela
  };

  this.wires = {}; // Criação dos fios curtos (arrastáveis) e fios longos (para esticar)

  Object.keys(this.startPoints).forEach(color => { // Itera sobre as cores dos fios
    let pos = this.startPoints[color]; // Posição inicial do fio

    let shortWire = this.add.sprite(pos.x, pos.y, `${color}WireDisconnected`).setInteractive(); // Cria o fio desconectado e o torna interativo
    shortWire.setData('color', color); // Define a cor do fio como dado do objeto
    shortWire.setScale(3); // Ajusta o tamanho do fio
    this.input.setDraggable(shortWire); // Define o fio como arrrastável

    let longWire = this.add.sprite(pos.x, pos.y, `${color}WireConnected`).setOrigin(0, 0.5).setVisible(false); // Cria o fio conectado         

    this.wires[color] = { short: shortWire, long: longWire }; // Aramazena os fios curtos e longos em um objeto
  });

  // Eventos drag-and-drop
  this.input.on('dragstart', this.onDragStart, this); // Inicia o arrasto
  this.input.on('drag', this.onDrag, this); // Arrasta o fio
  this.input.on('dragend', this.onDragEnd, this); // Finaliza o arrasto
}

onDragStart(pointer, gameObject) { // Inicia o arrasto do fio
  const color = gameObject.getData('color'); // Obtém a cor do fio
  this.wires[color].long.setVisible(true); // Torna o fio longo visível
}

onDrag(pointer, gameObject, dragX, dragY) { // Arrasta o fio
  const color = gameObject.getData('color'); // Obtém a cor do fio
  const start = this.startPoints[color]; // Obtém a posição inicial do fio
  const wireLong = this.wires[color].long; // Obtém o fio longo correspondente
  wireLong.setScale(3); // Ajusta o tamanho do fio longo

  gameObject.x = dragX; // Atualiza a posição do fio curto
  gameObject.y = dragY; // Atualiza a posição do fio curto

  const distance = Phaser.Math.Distance.Between(start.x, start.y, dragX, dragY); // Calcula a distância entre o ponto inicial e o ponto arrastado
  const angle = Phaser.Math.Angle.Between(start.x, start.y, dragX, dragY); // Calcula o ângulo entre o ponto inicial e o ponto arrastado

  wireLong.x = start.x; // Define a posição x do fio longo
  wireLong.y = start.y; // Define a posição x do fio longo
  wireLong.displayWidth = distance; // Atualiza a largura do fio longo com base na distância arrastada
  wireLong.rotation = angle; // Define a rotação do fio longo com base no ângulo calculado
}

onDragEnd(pointer, gameObject) { // Finaliza o arrasto do fio
  const color = gameObject.getData('color'); // Obtém a cor do fio
  const endPoint = this.endPoints[color]; // Obtém o ponto de conexão correspondente
  const wireLong = this.wires[color].long; // Obtém o fio longo correspondente

  const distToEnd = Phaser.Math.Distance.Between(gameObject.x, gameObject.y, endPoint.x, endPoint.y); // Calcula a distância entre o ponto arrastado e o ponto de conexão

  if (distToEnd < 50) { // Verifica se o fio está próximo do ponto de conexão
    gameObject.x = endPoint.x; // Atualiza a posição x do fio curto para o ponto de conexão
    gameObject.y = endPoint.y; // Atualiza a posição y do fio curto para o ponto de conexão
    gameObject.disableInteractive(); // Desabilita a interatividade do fio curto

    const distance = Phaser.Math.Distance.Between(this.startPoints[color].x, this.startPoints[color].y, endPoint.x, endPoint.y); // Calcula a distância entre o ponto inicial e o ponto de conexão
    const angle = Phaser.Math.Angle.Between(this.startPoints[color].x, this.startPoints[color].y, endPoint.x, endPoint.y); // Calcula o ângulo entre o ponto inicial e o ponto de conexão

    wireLong.displayWidth = distance; // Atualiza a largura do fio longo com base na distância arrastada
    wireLong.rotation = angle; // Define a rotação do fio longo com base no ângulo calculado

    console.log(`Fio ${color} conectado com sucesso!`); // Exibe uma mensagem no console indicando que o fio foi conectado com sucesso
    this.collectSound(); // Toca o som de coleta
    this.checkCompletion(); // Verifica se todos os fios foram conectados
  } else {
    this.tweens.add({ // Adiciona uma animação de retorno do fio curto para a posição inicial
      targets: gameObject, // Define o alvo da animação como o fio curto
      x: this.startPoints[color].x, // Define a posição x inicial do fio curto
      y: this.startPoints[color].y, // Define a posição y inicial do fio curto
      duration: 300, // Define a duração da animação 
      ease: 'Power2' // Define o tipo de easing da animação
    });

    wireLong.setVisible(false); // Esconde o fio longo
  }
}

checkCompletion() { 
  const allConnected = Object.values(this.wires).every(wire => !wire.short.input.enabled); // Verifica se todos os fios curtos estão desconectados (ou seja, se todos foram conectados com sucesso)

  if (allConnected) {
      console.log("Minigame concluído com sucesso!"); // Exibe uma mensagem no console indicando que o minigame foi concluído com sucesso
      this.sound.play('correctSound'); // Toca o som de resposta correta

      const completionText = this.add.text(width / 2, height / 2, "Minigame Concluído!", { // Exibe uma mensagem de conclusão
          fontSize: "32px", // Define o tamanho da fonte
          fill: "#ffffff", // Define a cor do texto como branco
          fontFamily: "Arial",  // Define a fonte
      }).setOrigin(0.5); // Centraliza o texto na tela

      // Adiciona um pequeno atraso antes de retornar à cena principal
      this.time.delayedCall(2000, () => {
          completionText.destroy(); // Remove a mensagem de conclusão
          this.scene.stop('minigameWires'); // Para a cena do minigame
          const mainScene = this.scene.get('vpNegociosScene'); // Obtém a cena principal
          mainScene.scene.resume(); // Retoma a cena principal
          mainScene.createIndicatorNpc23(); // Chama o método para criar o indicador do NPC 16
      });
  }
}
}
