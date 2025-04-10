class OfficeScene extends Phaser.Scene {
  constructor() {
    super({ key: "officeScene" });
    this.width = 0;
    this.height = 0;
    this.canMove = true; // Indica se o jogador pode se mover
    this.vivitaInteracted = false; // Indica se o jogador já interagiu com a Vivita
    this.curriculumFinished = false; // Indica se o jogador já finalizou o currículo
    this.leaderRoomCreated = false; // Indica se a sala da líder já foi criada
    this.elevatorIndicatorCreated = false; // Indica se o indicador do elevador já foi criado
    this.buttonUpCreated = false; // Indica se o botão para subir no elevador já foi criado
    this.activeIndicators = []; // Vai guardar as exclamações visíveis
    this.hasPlayedCurriculum = false;  // Add new flag to track curriculum completion
  }

  init(data) {
    this.selectedSpriteSheet = data.selectedSpriteSheet;
    console.log('Selected Sprite Sheet:', this.selectedSpriteSheet);
  }

  preload() {
    this.load.spritesheet("npc7", "../assets/personagens/npc7.png", { frameWidth: 16, frameHeight: 32, }); // Carrega o spritesheet do NPC 7
    this.load.spritesheet("npc3", "../assets/personagens/npc3Sit.png", { frameWidth: 16, frameHeight: 32, }); // Carrega o spritesheet do NPC 3 sentado
    this.load.spritesheet("npc4", "../assets/personagens/npc4Sit.png", { frameWidth: 16, frameHeight: 32, }); // Carrega o spritesheet do NPC 4 sentado
    this.load.spritesheet("npc2", "../assets/personagens/npc2Sit.png", { frameWidth: 16, frameHeight: 32, }); // Carrega o spritesheet do NPC 2 sentado
    this.load.spritesheet("npc6", "../assets/personagens/npc6Sit.png", { frameWidth: 16, frameHeight: 32, }); // Carrega o spritesheet do NPC 6 sentado
    this.load.spritesheet("npc10", "../assets/personagens/npc10Lift.png", { frameWidth: 16, frameHeight: 32, }); // Carrega o spritesheet do NPC 10 no elevador
    this.load.spritesheet("vivita", "../assets/personagens/vivita.png", { frameWidth: 16, frameHeight: 32, }); // Carrega o spritesheet da Vivita
    this.load.spritesheet("indicator", "../assets/exclamaçãoRoxa.png", { frameWidth: 254, frameHeight: 305, }); // Carrega o spritesheet do indicador de exclamação

    this.load.tilemapTiledJSON("office", "../assets/mapaOffice/mapaOffice.json"); // Carrega o arquivo JSON do mapa do escritório
    this.load.image("decoracao", "../assets/mapaOffice/decoracao.png"); // Carrega o tileset de decoração
    this.load.image("paredes", "../assets/mapaOffice/paredes.png"); // Carrega o tileset de paredes
    this.load.image("personalizado_vivo", "../assets/mapaOffice/personalizado_vivo.png"); // Carrega o tileset personalizado da Vivo

    this.load.image("balloonText", "../assets/balaoTexto.png"); // Carrega a imagem do balão de texto
    this.load.image('keyE', '../assets/teclaE.png'); // Carrega a imagem da tecla E
    this.load.image('keyENTER', '../assets/keyEnter.png'); // Carrega a imagem da tecla ENTER
    this.load.image("computer", "../assets/computador.png"); // Carrega a imagem do computador

    this.load.audio("officeMusic", "../assets/0320(1).MP3"); // Carrega a música de fundo do escritório
    this.load.audio('keySound', '../assets/sounds/computer-keyboard-typing-290582 (mp3cut.net).mp3'); // Carrega o som de digitação no teclado

    this.load.audio('walkSound', '../assets/sounds/753292__vrymaa__footsteps-high-heels-hardwood-walk-run (mp3cut.net).wav'); // Carrega o som de passos

    this.load.image("bgElevOffice", "../assets/bgelevadoroffice.png"); // Carrega a imagem de fundo do elevador no escritório
    this.load.image("panelElev", "../assets/painelelevador.png"); // Carrega a imagem do painel do elevador
    this.load.image("buttonElevOffice", "../assets/botaocimaelevador.png"); // Carrega a imagem do botão para subir no elevador
    this.load.image("arrow", "../assets/seta.png");

    this.load.spritesheet('player', `../assets/personagens/skinsPlayer/players/${this.selectedSpriteSheet}.png`, { frameWidth: 16, frameHeight: 32, });
  }


  create() {
    this.cameras.main.fadeIn(1000); // Transição suave ao iniciar a cena

    this.events.on('stopWalkSound', () => { // Evento para parar o som de passos
      if (this.walkSound && this.walkSound.isPlaying) {
        this.walkSound.stop(); // Para o som de passos
      }
    });

    const startTime = OfficeScene.lastMusicTime || 0; // Recupera o tempo salvo da música ou inicia do começo
    this.officeMusic = this.sound.add("officeMusic", { loop: true }); // Adiciona a música de fundo do escritório
    this.officeMusic.play({ seek: startTime }); // Toca a música a partir do tempo salvo

    this.events.on("shutdown", this.onShutdown, this); // Evento para salvar o tempo da música ao encerrar a cena
    this.events.on("pause", this.onShutdown, this); // Evento para salvar o tempo da música ao pausar a cena

    this.buttonClick = this.sound.add('buttonSound', { loop: false, volume: 10 }); // Adiciona o som de clique de botão

    if (!this.walkSound) {
      this.walkSound = this.sound.add('walkSound', { loop: false, volume: 2 }); // Adiciona o som de passos, se ainda não existir
    }

    this.createMap(); // Criação do mapa e camadas
    this.createKeys(); // Configuração do teclado
    this.createPlayer(width, height); // Criação do jogador
    this.createPlayerAnimations(); // Criação das animações do jogador
    this.addNpc(); // Adiciona os NPCs ao jogo
    this.createNpcAnimations(); // Cria as animações dos NPCs
    this.createAnimsIndicator(); // Cria a animação do indicador de exclamação
    this.addVivita(width, height); // Adiciona a personagem Vivita ao jogo
    this.createComputer(width, height); // Adiciona o computador ao jogo
    this.lastPosition = "down"; // Define a posição inicial do jogador como "para baixo"
    this.createCollisions(); // Configura colisões do jogador com camadas selecionadas
    this.movePlayer();
    const layer14 = this.map.createLayer("superiorPorta", this.tileset2, this.offsetX, 0).setScale(2.5); // Cria a camada da porta superior

    this.events.on('resume', () => { // Evento para retomar a música ao retornar à cena
      if (!this.officeMusic || !this.officeMusic.isPlaying) { // Verifica se a música não está tocando
        this.officeMusic = this.sound.add("officeMusic", { loop: true }); // Adiciona a música de fundo do escritório
        this.officeMusic.play({ seek: OfficeScene.lastMusicTime || 0 }); // Toca a música a partir do tempo salvo
      }
    });

    // Dá zoom na tela do jogo e faz a câmera seguir o personagem
    this.cameras.main.startFollow(this.player); // Faz a câmera seguir o jogador
    this.cameras.main.setZoom(1.5); // Define o nível de zoom da câmera
    this.compassArrow = this.add.image(this.cameras.main.width / 2, 335, "arrow")
      .setScrollFactor(0)
      .setDepth(1000)
      .setScale(0.5)
      .setOrigin(0.5, 0.5); // centraliza a rotação
    // Ajuste de rotação baseado na orientação da imagem da seta
    this.arrowOffset = Phaser.Math.DegToRad(-180);
    this.events.on('resume', () => {
      if (this.compassArrow && this.activeIndicators.length > 0) { // Verifica se a seta da bússola e os indicadores ativos existem
        let closest = this.activeIndicators[0]; // Inicializa o indicador mais próximo como o primeiro ativo
        let minDist = Phaser.Math.Distance.Between(this.player.x, this.player.y, closest.x, closest.y); // Calcula a distância inicial

        for (let i = 1; i < this.activeIndicators.length; i++) { // Itera sobre os indicadores ativos
          const ind = this.activeIndicators[i]; // Calcula a distância entre o jogador e o indicador
          const d = Phaser.Math.Distance.Between(this.player.x, this.player.y, ind.x, ind.y); // Calcula a distância entre o jogador e o indicador
          if (d < minDist) { // Verifica se a distância atual é menor que a mínima
            closest = ind; // Atualiza o indicador mais próximo
            minDist = d; // Atualiza a distância mínima
          }
        }

        const angle = Phaser.Math.Angle.Between(this.player.x, this.player.y, closest.x, closest.y); // Calcula o ângulo entre o jogador e o indicador mais próximo
        this.compassArrow.setRotation(angle + this.arrowOffset); // Define a rotação da seta da bússola
      }
    });

    this.barrierDoor = this.add.rectangle(width - 1200, height - 500, 20, 20, 0x2F052F).setOrigin(0); // Adiciona um retângulo como barreira
    this.physics.add.existing(this.barrierDoor, true); // Ativa a física do retângulo
    this.physics.add.collider(this.player, this.barrierDoor); // Adiciona colisão entre o jogador e a barreira
    this.barrierDoor.setVisible(false); // Torna o retângulo invisível
  }

  createCollisions() {
    // Adiciona colisões entre o jogador e as camadas do mapa
    this.physics.add.collider(this.player, this.layer3);
    this.physics.add.collider(this.player, this.layer7);
    this.physics.add.collider(this.player, this.layer8);
    this.physics.add.collider(this.player, this.layer9);
    this.physics.add.collider(this.player, this.layer10);
    this.physics.add.collider(this.player, this.layer11);
    this.physics.add.collider(this.player, this.npc7);
    this.physics.add.collider(this.player, this.vivita);

    // Adiciona colisões entre o jogador e a barreira da porta
    this.player.setCollideWorldBounds(true);

    // Define as barreiras do mundo para que o jogador não saia da tela
    this.physics.world.setBounds(
      this.offsetX,          // Posição x alinhada ao mapa
      0,                     // Posição y alinhada ao mapa
      1270 * 2.5,           // Largura (map width * scale)
      720 * 2.5             // Altura (map height * scale)
    );
  }

  createAnimsIndicator() {
    this.anims.create({
      key: "exclaiming", // Nome da animação
      frames: this.anims.generateFrameNumbers("indicator", { start: 0, end: 1 }), // Define os quadros da animação usando o spritesheet "indicator"
      frameRate: 3, // Velocidade da animação (quadros por segundo)
      repeat: -1, // Faz a animação repetir indefinidamente
    });
  }

  createKeys() {
    this.keys = this.input.keyboard.addKeys({
      up: Phaser.Input.Keyboard.KeyCodes.W, // Tecla W para mover para cima
      down: Phaser.Input.Keyboard.KeyCodes.S, // Tecla S para mover para baixo
      left: Phaser.Input.Keyboard.KeyCodes.A, // Tecla A para mover para a esquerda
      right: Phaser.Input.Keyboard.KeyCodes.D, // Tecla D para mover para a direita
      interagir: Phaser.Input.Keyboard.KeyCodes.E, // Tecla E para interagir com objetos ou NPCs
      ENTER: Phaser.Input.Keyboard.KeyCodes.ENTER, // Tecla ENTER para avançar diálogos ou confirmar ações
    });
  }

  createMap() {
    const map = this.make.tilemap({ key: "office", tileWidth: 25, tileHeight: 20 }); // Cria o mapa usando o arquivo JSON com as dimensões dos tiles
    const tileset1 = map.addTilesetImage("decoracao"); // Adiciona o tileset de decoração ao mapa
    const tileset2 = map.addTilesetImage("paredes"); // Adiciona o tileset de paredes ao mapa
    const tileset3 = map.addTilesetImage("personalizado_vivo"); // Adiciona o tileset personalizado da Vivo ao mapa

    // Cria as camadas do mapa
    const offsetX = width - 1270; // Define o deslocamento horizontal para posicionar o mapa
    const layer1 = map.createLayer("chao", tileset2, offsetX, 0).setScale(2.5); // Cria a camada do chão e aplica escala
    const layer2 = map.createLayer("chaoLider", tileset1, offsetX, 0).setScale(2.5); // Cria a camada do chão da sala do líder e aplica escala
    const layer3 = map.createLayer("parede", tileset2, offsetX, 0).setScale(2.5); // Cria a camada de paredes e aplica escala
    const layer4 = map.createLayer("tapete", tileset3, offsetX, 0).setScale(2.5); // Cria a camada de tapetes e aplica escala
    const layer5 = map.createLayer("tapeteLider", tileset1, offsetX, 0).setScale(2.5); // Cria a camada de tapetes da sala do líder e aplica escala
    const layer6 = map.createLayer("acabamento", tileset2, offsetX, 0).setScale(2.5); // Cria a camada de acabamentos e aplica escala
    const layer7 = map.createLayer("cadeira", tileset1, offsetX, 0).setScale(2.5); // Cria a camada de cadeiras e aplica escala
    const layer8 = map.createLayer("cadeiraTras", tileset1, offsetX, 0).setScale(2.5); // Cria a camada de cadeiras traseiras e aplica escala
    const layer9 = map.createLayer("quadro", tileset1, offsetX, 0).setScale(2.5); // Cria a camada de quadros e aplica escala
    const layer10 = map.createLayer("sofa", tileset1, offsetX, 0).setScale(2.5); // Cria a camada de sofás e aplica escala
    const layer11 = map.createLayer("planta", tileset1, offsetX, 0).setScale(2.5); // Cria a camada de plantas e aplica escala
    const layer12 = map.createLayer("porta", tileset1, offsetX, 0).setScale(2.5); // Cria a camada de portas e aplica escala
    const layer13 = map.createLayer("decoracao", tileset1, offsetX, 0).setScale(2.5); // Cria a camada de decoração e aplica escala

    // Ativa as colisões com base na propriedade 'collider' para todas as camadas
    layer1.setCollisionByProperty({ collider: true }); // Ativa colisão para a camada de chão
    layer2.setCollisionByProperty({ collider: true }); // Ativa colisão para a camada de chão da sala do líder
    layer3.setCollisionByProperty({ collider: true }); // Ativa colisão para a camada de paredes
    layer4.setCollisionByProperty({ collider: true }); // Ativa colisão para a camada de tapetes
    layer5.setCollisionByProperty({ collider: true }); // Ativa colisão para a camada de tapetes da sala do líder
    layer6.setCollisionByProperty({ collider: true }); // Ativa colisão para a camada de acabamentos
    layer7.setCollisionByProperty({ collider: true }); // Ativa colisão para a camada de cadeiras
    layer8.setCollisionByProperty({ collider: true }); // Ativa colisão para a camada de cadeiras traseiras
    layer9.setCollisionByProperty({ collider: true }); // Ativa colisão para a camada de quadros
    layer10.setCollisionByProperty({ collider: true }); // Ativa colisão para a camada de sofás
    layer11.setCollisionByProperty({ collider: true }); // Ativa colisão para a camada de plantas
    layer12.setCollisionByProperty({ collider: true }); // Ativa colisão para a camada de portas
    layer13.setCollisionByProperty({ collider: true }); // Ativa colisão para a camada de decoração

    const layers = [layer1, layer2, layer3, layer4, layer5, layer6, layer7, layer8, layer9, layer10, layer11, layer12, layer13]; // Agrupa todas as camadas em um array
    layers.forEach((layer, index) => { // Itera sobre cada camada
      this[`layer${index + 1}`] = layer; // Atribui cada camada a uma propriedade dinâmica da classe
    });

    this.map = map; // Atribui o mapa à propriedade da classe
    this.tileset2 = tileset2; // Atribui o tileset de paredes à propriedade da classe
    this.offsetX = offsetX; // Atribui o deslocamento X à propriedade da classe
  }

  onShutdown() {
    if (this.officeMusic && this.officeMusic.isPlaying) { // Verifica se a música de fundo está tocando
      OfficeScene.lastMusicTime = this.officeMusic.seek; // Salva o tempo atual da música em uma propriedade estática
      this.officeMusic.stop(); // Para a música de fundo
    }
  }

  playButtonClick() {
    this.sound.play('buttonSound', { loop: false, volume: 10 }); // Reproduz o som de clique de botão uma vez com volume alto
  }

  keySound() {
    this.keySoundPlay = this.sound.add('keySound', { loop: false, volume: 10 }); // Adiciona o som de digitação no teclado com volume alto
    this.keySoundPlay.play(); // Reproduz o som de digitação no teclado
  }

  update() {

    this.movePlayer(); // Atualiza a posição do jogador com base nas teclas pressionadas

    if (this.returnedFromLeaderRoom && !this.elevatorIndicatorCreated) { // Verifica se o jogador retornou da sala do líder e se o indicador do elevador ainda não foi criado
      this.createElevatorIndicator(); // Cria o indicador do elevador
      this.elevatorIndicatorCreated = true; // Marca que o indicador do elevador foi criado
    }



    // Controle da Vivita
    if (this.vivita) { // Verifica se a Vivita existe
      const distVivita = Phaser.Math.Distance.Between(this.player.x, this.player.y, this.vivita.x, this.vivita.y);
      this.canInteractWithVivita = distVivita < 100;

      if (this.keyEVivita && distVivita > 100) { // Verifica se a distância é maior que 100
        this.keyEVivita.destroy(); // Se a distância for maior que 100, destrói a tecla E
        this.keyEVivita = null; // Define a tecla E como nula
        this.canInteractWithVivita = false; // Atualiza a variável de interação
      }
    }

    if (this.canInteractWithVivita && !this.vivitaInteracted && Phaser.Input.Keyboard.JustDown(this.keys.interagir)) { // Verifica se o jogador pode interagir com a Vivita e se ainda não interagiu
      this.vivitaInteracted = true; // Marca que o jogador interagiu com a Vivita
      if (this.keyEVivita) { // Verifica se a tecla E existe
        this.keyEVivita.destroy(); // Destroi a tecla E
        this.keyEVivita = null; // Define a tecla E como nula
      }

      // Exibe a tecla ENTER
      this.keyENTERVivita = this.add.image(this.vivita.x, this.vivita.y - 50, 'keyENTER').setScale(0.1).setDepth(1000); // Adiciona a tecla ENTER acima da Vivita

      this.buttonClick = this.sound.add('buttonSound', { loop: false, volume: 10 }); // Adiciona o som de clique de botão
      this.buttonClick.play(); // Reproduz o som de clique de botão
      this.showVivitaInteraction(); // Mostra a interação com a Vivita
    }
    // Controle do computador

    if (this.computer) { // Verifica se o computador existe
      const distComputer = Phaser.Math.Distance.Between(this.player.x, this.player.y, this.computer.x, this.computer.y); // Calcula a distância entre o jogador e o computador
      this.canInteractWithComputer = distComputer < 100; // Verifica se o jogador está próximo o suficiente para interagir com o computador

      if (distComputer >= 100 && this.keyEComputer) { // Verifica se a distância é maior que 100
        this.keyEComputer.destroy(); // Destroi a tecla E
        this.keyEComputer = null; // Define a tecla E como nula
      }
    }

    if (this.canInteractWithComputer && Phaser.Input.Keyboard.JustDown(this.keys.interagir) && !this.hasPlayedCurriculum) { // Verifica se o jogador pode interagir com o computador e se ainda não jogou o currículo
      this.buttonClick = this.sound.add('buttonSound', { loop: false, volume: 10 }); // Adiciona o som de clique de botão
      this.buttonClick.play(); // Reproduz o som de clique de botão
      this.scene.pause(); // Pausa a cena atual
      this.scene.launch('curriculoScene'); // Lança a cena do currículo
      this.curriculumFinished = true; // Marca que o currículo foi finalizado
      this.hasPlayedCurriculum = true; // Marca que o currículo foi jogado, então não pode ser jogado novamente
      if (this.keyEComputer) { // Verifica se a tecla E existe
        this.keyEComputer.destroy(); // Destroi a tecla E
        this.keyEComputer = null; // Define a tecla E como nula
      }
    }

    // Criação da sala do líder
    if (this.curriculumFinished && !this.canInteractWithComputer && !this.leaderRoomCreated) { // Verifica se o currículo foi finalizado e se o jogador não está mais interagindo com o computador
      this.leaderRoomCreated = true; // Marca que a sala do líder foi criada
      this.leaderRoom();
    }

    // Atualização da bússola
    if (this.compassArrow && this.activeIndicators.length > 0) { // Verifica se a seta da bússola e os indicadores ativos existem
      this.activeIndicators = this.activeIndicators.filter(i => i && i.active); // Filtra os indicadores ativos para remover os que não existem mais

      const closest = this.getClosestIndicator(); // // Obtém o indicador mais próximo do jogador
      if (closest) {
        const angle = Phaser.Math.Angle.Between(this.player.x, this.player.y, closest.x, closest.y); // Calcula o ângulo entre o jogador e o indicador mais próximo
        this.compassArrow.setRotation(angle + this.arrowOffset); // Define a rotação da seta da bússola
      }
    }
    this.updateArrowToIndicator(); // Atualiza a seta da bússola para o indicador mais próximo

  }
  getClosestIndicator() {
    if (this.activeIndicators.length === 0) return null; // Se não houver indicadores ativos, retorna nulo

    let closest = this.activeIndicators[0]; // Inicializa o indicador mais próximo como o primeiro ativo
    let minDist = Phaser.Math.Distance.Between(this.player.x, this.player.y, closest.x, closest.y); // Calcula a distância inicial

    for (let i = 1; i < this.activeIndicators.length; i++) { // Itera sobre os indicadores ativos
      const ind = this.activeIndicators[i]; // Calcula a distância entre o jogador e o indicador
      const d = Phaser.Math.Distance.Between(this.player.x, this.player.y, ind.x, ind.y); // Calcula a distância entre o jogador e o indicador
      if (d < minDist) { // Verifica se a distância atual é menor que a mínima
        closest = ind; // Atualiza o indicador mais próximo
        minDist = d; // Atualiza a distância mínima
      }
    }

    return closest; // Retorna o indicador mais próximo
  }




  movePlayer() {
    const speed = 150; // Define a velocidade do jogador
    let moving = false; // Variável para verificar se o jogador está se movendo

    if (this.keys.left.isDown) { // Verifica se a tecla para a esquerda está pressionada
      this.player.setVelocityX(-speed); // Move o jogador para a esquerda
      this.lastPosition = "left"; // Atualiza a última posição para "esquerda"
      this.player.anims.play("walk_left", true); // Reproduz a animação de andar para a esquerda
      moving = true; // Marca que o jogador está se movendo
    } else if (this.keys.right.isDown) { // Verifica se a tecla para a direita está pressionada
      this.player.setVelocityX(speed); // Move o jogador para a direita
      this.lastPosition = "right"; // Atualiza a última posição para "direita"
      this.player.anims.play("walk_right", true); // Reproduz a animação de andar para a direita
      moving = true; // Marca que o jogador está se movendo
    } else {
      this.player.setVelocityX(0); // Para o movimento horizontal do jogador
    }

    if (this.keys.up.isDown) { // Verifica se a tecla para cima está pressionada
      this.player.setVelocityY(-speed); // Move o jogador para cima
      this.lastPosition = "up"; // Atualiza a última posição para "cima"
      this.player.anims.play("walk_up", true); // Reproduz a animação de andar para cima
      moving = true; // Marca que o jogador está se movendo
    } else if (this.keys.down.isDown) { // Verifica se a tecla para baixo está pressionada
      this.player.setVelocityY(speed); // Move o jogador para baixo
      this.lastPosition = "down"; // Atualiza a última posição para "baixo"
      this.player.anims.play("walk_down", true); // Reproduz a animação de andar para baixo
      moving = true; // Marca que o jogador está se movendo
    } else {
      this.player.setVelocityY(0); // Para o movimento vertical do jogador
    }

    // Se o personagem parou, inicia a animação de stop_* em loop
    if (!moving) { // Verifica se o jogador não está se movendo
      switch (this.lastPosition) { // Verifica a última posição do jogador
        case "left": // Se a última posição foi "esquerda"
          this.player.anims.play("stop_left", true); // Reproduz a animação de parada para a esquerda
          break;
        case "right": // Se a última posição foi "direita"
          this.player.anims.play("stop_right", true); // Reproduz a animação de parada para a direita
          break;
        case "up": // Se a última posição foi "cima"
          this.player.anims.play("stop_up", true); // Reproduz a animação de parada para cima
          break;
        case "down": // Se a última posição foi "baixo"
        default: // Caso padrão (última posição foi "baixo")
          this.player.anims.play("stop_down", true); // Reproduz a animação de parada para baixo
          break;
      }
      if (this.walkSound && this.walkSound.isPlaying) { // Verifica se o som de passos está tocando
        this.walkSound.stop(); // Para o som de passos
      }
    } else {
      if (this.walkSound && !this.walkSound.isPlaying) { // Verifica se o som de passos não está tocando
        this.walkSound.play(); // Reproduz o som de passos
      }
    }
  }

  createPlayer(width, height) {
    this.player = this.physics.add.sprite(width - 405, height - 100, "player"); // Adiciona o sprite do jogador na posição inicial
    this.player.setScale(2); // Define a escala do jogador para aumentar o tamanho
  }

  createPlayerAnimations() {
    this.anims.create({
      key: "walk_down", // Nome da animação para andar para baixo
      frames: this.anims.generateFrameNumbers("player", { start: 130, end: 135 }), // Define os quadros da animação para andar para baixo
      frameRate: 10, // Velocidade da animação (quadros por segundo)
      repeat: -1, // Faz a animação repetir indefinidamente
    });
    this.anims.create({
      key: "walk_right", // Nome da animação para andar para a direita
      frames: this.anims.generateFrameNumbers("player", { start: 112, end: 117 }), // Define os quadros da animação para andar para a direita
      frameRate: 10, // Velocidade da animação (quadros por segundo)
      repeat: -1, // Faz a animação repetir indefinidamente
    });
    this.anims.create({
      key: "walk_up", // Nome da animação para andar para cima
      frames: this.anims.generateFrameNumbers("player", { start: 118, end: 123 }), // Define os quadros da animação para andar para cima
      frameRate: 10, // Velocidade da animação (quadros por segundo)
      repeat: -1, // Faz a animação repetir indefinidamente
    });
    this.anims.create({
      key: "walk_left", // Nome da animação para andar para a esquerda
      frames: this.anims.generateFrameNumbers("player", { start: 124, end: 129 }), // Define os quadros da animação para andar para a esquerda
      frameRate: 10, // Velocidade da animação (quadros por segundo)
      repeat: -1, // Faz a animação repetir indefinidamente
    });
    this.anims.create({
      key: "stop_down", // Nome da animação para parar olhando para baixo
      frames: this.anims.generateFrameNumbers("player", { start: 74, end: 79 }), // Define os quadros da animação para parar olhando para baixo
      frameRate: 5, // Velocidade da animação (quadros por segundo, mais lento)
      repeat: -1, // Faz a animação repetir indefinidamente
    });
    this.anims.create({
      key: "stop_right", // Nome da animação para parar olhando para a direita
      frames: this.anims.generateFrameNumbers("player", { start: 56, end: 61 }), // Define os quadros da animação para parar olhando para a direita
      frameRate: 5, // Velocidade da animação (quadros por segundo, mais lento)
      repeat: -1, // Faz a animação repetir indefinidamente
    });
    this.anims.create({
      key: "stop_up", // Nome da animação para parar olhando para cima
      frames: this.anims.generateFrameNumbers("player", { start: 62, end: 67 }), // Define os quadros da animação para parar olhando para cima
      frameRate: 5, // Velocidade da animação (quadros por segundo, mais lento)
      repeat: -1, // Faz a animação repetir indefinidamente
    });
    this.anims.create({
      key: "stop_left", // Nome da animação para parar olhando para a esquerda
      frames: this.anims.generateFrameNumbers("player", { start: 68, end: 73 }), // Define os quadros da animação para parar olhando para a esquerda
      frameRate: 5, // Velocidade da animação (quadros por segundo, mais lento)
      repeat: -1, // Faz a animação repetir indefinidamente
    });
  }

  createUpButton() {
    this.cameras.main.stopFollow(); // Para a câmera de seguir o jogador
    this.cameras.main.setZoom(1.2); // Ajusta o zoom da câmera para 1.2

    this.bgElevOffice = this.add.image(width - 1300, height - 1000, "bgElevOffice").setOrigin(0, 0); // Adiciona a imagem de fundo do elevador
    this.bgElevOffice.setDisplaySize(width, height); // Define o tamanho da imagem de fundo do elevador para preencher a tela
    this.panelElev = this.add.image(width - 610, height - 800, "panelElev").setOrigin(0, 0); // Adiciona o painel do elevador
    this.bgElevOffice.setVisible(false); // Torna a imagem de fundo do elevador invisível
    this.panelElev.setVisible(false); // Torna o painel do elevador invisível

    this.upButton = this.add.image(width - 440, height - 670, "buttonElevOffice"); // Adiciona o botão do elevador
    this.upButton.setInteractive(); // Torna o botão interativo
    this.upButton.setScale(1); // Define a escala do botão
    this.upButton.setVisible(true); // Torna o botão visível
    this.bgElevOffice.setVisible(true); // Torna a imagem de fundo do elevador visível
    this.panelElev.setVisible(true); // Torna o painel do elevador visível

    this.upButton.on("pointerdown", () => { // Adiciona um evento de clique no botão do elevador
      console.log("Transitioning to elevadorScene..."); // Log para depuração
      if (this.officeMusic && this.officeMusic.isPlaying) { // Verifica se a música de fundo do escritório está tocando
        console.log("Stopping officeMusic..."); // Log para depuração
        this.officeMusic.stop(); // Parar officeMusic
      } else {
        console.log("officeMusic is not playing or undefined."); // Log para depuração
      }
      this.scene.stop("officeScene"); // Pausa a cena atual
      this.scene.start("elevadorScene", { selectedSpriteSheet: this.selectedSpriteSheet, }); // Inicia a cena do elevador
    });
  }


  createElevatorIndicator() { // Cria o indicador do elevador
    this.elevatorIndicator = this.physics.add.sprite(width - 435, height - 700, "indicator").setScale(0.2); // Adiciona o indicador do elevador
    this.elevatorIndicator.setImmovable(true); // Define o indicador como imóvel
    this.elevatorIndicator.play("exclaiming"); // Reproduz a animação de exclamação no indicador
    this.activeIndicators.push(this.elevatorIndicator); // Adiciona o indicador à lista de indicadores ativos

    this.indicatorActive = true; // Marca o indicador como ativo


    this.physics.add.overlap(this.player, this.elevatorIndicator, () => { // Adiciona um evento de sobreposição entre o jogador e o indicador do elevador
      if (!this.buttonUpCreated) { // Verifica se o botão do elevador ainda não foi criado
        this.createUpButton(); // Cria o botão do elevador
        this.buttonUpCreated = true; // Marca que o botão do elevador foi criado

        this.elevatorIndicator.destroy(); // Destroi o indicador do elevador
        this.activeIndicators = this.activeIndicators.filter(i => i !== this.elevatorIndicator); // <- necessário
        // Remove o indicador da lista de indicadores ativos
      }
    });

  }

  createComputer(width, height) { // Cria o computador
    this.computer = this.add.image(width - 1020, height - 100, "computer").setScale(0.09); // Adiciona a imagem do computador
    this.computer.setInteractive(); // Torna o computador interativo
    this.computer.setFlipX(true); // Espelha a imagem do computador horizontalmente
  }

  addComputer() {
    const computer = this.physics.add.image(width - 1020, height - 100, "computer").setScale(0.09); // Adiciona a imagem do computador na posição especificada e ajusta a escala
    computer.setInteractive(); // Torna o computador interativo para detectar cliques ou interações
    computer.setFlipX(true); // Espelha a imagem do computador horizontalmente
    this.createIndicatorComputer(); // Cria o indicador de exclamação acima do computador

    this.physics.add.overlap(this.player, computer, () => { // Adiciona um evento de sobreposição entre o jogador e o computador
      // Only show E key if curriculum hasn't been played yet
      this.canInteractWithComputer = !this.hasPlayedCurriculum &&
        Phaser.Math.Distance.Between(this.player.x, this.player.y, computer.x, computer.y) < 100;

      if (this.canInteractWithComputer && !this.keyEComputer) { // Verifica se a tecla E ainda não foi exibida
        this.keyEComputer = this.add.image(width - 1020, height - 150, 'keyE').setScale(0.07); // Adiciona a tecla E acima do computador
      } else if (!this.canInteractWithComputer && this.keyEComputer) {
        this.keyEComputer.destroy();
        this.keyEComputer = null;
      }
    });

    this.computer = computer; // Salva o objeto do computador para usar no método update
  }

  createIndicatorComputer() {
    this.indicatorComputer = this.physics.add.sprite(width - 1020, height - 150, 'indicator'); // Adiciona o indicador de exclamação acima do computador
    this.indicatorComputer.setScale(0.2); // Ajusta a escala do indicador
    this.indicatorComputer.setImmovable(true); // Define o indicador como imóvel
    this.indicatorComputer.play("exclaiming"); // Reproduz a animação de exclamação no indicador
    this.activeIndicators.push(this.indicatorComputer);



    this.physics.add.overlap(this.player, this.indicatorComputer, () => { // Adiciona um evento de sobreposição entre o jogador e o indicador
      if (this.indicatorComputerActive) { // Verifica se o indicador está ativo

        this.indicatorComputer.destroy(); // Remove o indicador da tela
        this.indicatorComputerActive = false; // Marca o indicador como inativo
      }
    });

    this.indicatorComputerActive = true; // Marca o indicador como ativo
  }

  addNpc() {
    this.npc7 = this.physics.add.sprite(width - 950, height - 200, 'npc7'); // Cria o sprite da NPC 7 na posição especificada
    this.npc7.setScale(2.0); // Define a escala do sprite da NPC 7
    this.npc7.setImmovable(true); // Define a NPC 7 como imóvel
    this.createNpcAnimations(); // Cria as animações para os NPCs
    this.npc7.anims.play('Idle'); // Reproduz a animação "Idle" para a NPC 7

    this.npc3 = this.physics.add.sprite(width - 895, height - 105, 'npc3'); // Cria o sprite da NPC 3 na posição especificada
    this.npc3.setScale(2.0); // Define a escala do sprite da NPC 3
    this.npc3.setImmovable(true); // Define a NPC 3 como imóvel
    this.createNpcAnimations(); // Cria as animações para os NPCs
    this.npc3.anims.play('npc3'); // Reproduz a animação "npc3" para a NPC 3

    this.npc4 = this.physics.add.sprite(width - 767, height - 105, 'npc4'); // Cria o sprite da NPC 4 na posição especificada
    this.npc4.setScale(2.0); // Define a escala do sprite da NPC 4
    this.npc4.setImmovable(true); // Define a NPC 4 como imóvel
    this.createNpcAnimations(); // Cria as animações para os NPCs
    this.npc4.setFlipX(true); // Espelha horizontalmente o sprite da NPC 4
    this.npc4.anims.play('npc4'); // Reproduz a animação "npc4" para a NPC 4

    this.npc2 = this.physics.add.sprite(width - 655, height - 145, 'npc2'); // Cria o sprite da NPC 2 na posição especificada
    this.npc2.setScale(2.0); // Define a escala do sprite da NPC 2
    this.npc2.setImmovable(true); // Define a NPC 2 como imóvel
    this.createNpcAnimations(); // Cria as animações para os NPCs
    this.npc2.anims.play('npc2'); // Reproduz a animação "npc2" para a NPC 2

    this.npc6 = this.physics.add.sprite(width - 1135, height - 145, 'npc6'); // Cria o sprite da NPC 6 na posição especificada
    this.npc6.setScale(2.0); // Define a escala do sprite da NPC 6
    this.npc6.setImmovable(true); // Define a NPC 6 como imóvel
    this.createNpcAnimations(); // Cria as animações para os NPCs
    this.npc6.anims.play('npc6'); // Reproduz a animação "npc6" para a NPC 6

    this.npc10 = this.physics.add.sprite(width - 710, height - 200, 'npc10'); // Cria o sprite da NPC 10 na posição especificada
    this.npc10.setScale(2.0); // Define a escala do sprite da NPC 10
    this.npc10.setImmovable(true); // Define a NPC 10 como imóvel
    this.createNpcAnimations(); // Cria as animações para os NPCs
    this.npc10.anims.play('npc10'); // Reproduz a animação "npc10" para a NPC 10
  }

  createNpcAnimations() {
    if (!this.anims.exists("Idle")) { // Verifica se a animação "Idle" já existe
      this.anims.create({ // Cria a animação "Idle" para a NPC 7
        key: "Idle", // Nome da animação
        frames: this.anims.generateFrameNumbers('npc7', { start: 18, end: 23 }), // Define os quadros da animação
        frameRate: 4, // Velocidade da animação (quadros por segundo)
        repeat: -1, // Faz a animação repetir indefinidamente
      });
    }

    if (!this.anims.exists("npc3")) { // Verifica se a animação "npc3" já existe
      this.anims.create({ // Cria a animação "npc3" para a NPC 3
        key: "npc3", // Nome da animação
        frames: this.anims.generateFrameNumbers('npc3', { start: 6, end: 11 }), // Define os quadros da animação
        frameRate: 4, // Velocidade da animação (quadros por segundo)
        repeat: -1, // Faz a animação repetir indefinidamente
      });
    }

    if (!this.anims.exists("npc4")) { // Verifica se a animação "npc4" já existe
      this.anims.create({ // Cria a animação "npc4" para a NPC 4
        key: "npc4", // Nome da animação
        frames: this.anims.generateFrameNumbers('npc4', { start: 6, end: 11 }), // Define os quadros da animação
        frameRate: 4, // Velocidade da animação (quadros por segundo)
        repeat: -1, // Faz a animação repetir indefinidamente
      });
    }

    if (!this.anims.exists("npc2")) { // Verifica se a animação "npc2" já existe
      this.anims.create({ // Cria a animação "npc2" para a NPC 2
        key: "npc2", // Nome da animação
        frames: this.anims.generateFrameNumbers('npc2', { start: 6, end: 11 }), // Define os quadros da animação
        frameRate: 4, // Velocidade da animação (quadros por segundo)
        repeat: -1, // Faz a animação repetir indefinidamente
      });
    }

    if (!this.anims.exists("npc6")) { // Verifica se a animação "npc6" já existe
      this.anims.create({ // Cria a animação "npc6" para a NPC 6
        key: "npc6", // Nome da animação
        frames: this.anims.generateFrameNumbers('npc6', { start: 6, end: 11 }), // Define os quadros da animação
        frameRate: 4, // Velocidade da animação (quadros por segundo)
        repeat: -1, // Faz a animação repetir indefinidamente
      });
    }

    if (!this.anims.exists("npc10")) { // Verifica se a animação "npc10" já existe
      this.anims.create({ // Cria a animação "npc10" para a NPC 10
        key: "npc10", // Nome da animação
        frames: this.anims.generateFrameNumbers('npc10', { start: 42, end: 55 }), // Define os quadros da animação
        frameRate: 6, // Velocidade da animação (quadros por segundo)
        repeat: -1, // Faz a animação repetir indefinidamente
      });
    }
  }


  vivitaAnimations() {
    this.anims.create({ // Cria a animação para a Vivita
      key: "vivita", // Nome da animação
      frames: this.anims.generateFrameNumbers('vivita', { start: 18, end: 23 }), // Define os quadros da animação
      frameRate: 6, // Velocidade da animação (quadros por segundo)
      repeat: -1, // Faz a animação repetir indefinidamente
    });
  }

  addVivita() {
    const vivita = this.physics.add.sprite(width / 1.75, height / 3, "vivita"); // Cria o sprite da Vivita na posição especificada
    vivita.setScale(2.0); // Define a escala do sprite da Vivita
    vivita.setImmovable(true); // Define a Vivita como imóvel
    this.vivitaAnimations(); // Cria as animações para a Vivita
    vivita.play("vivita"); // Reproduz a animação "vivita" para a Vivita
    this.vivita = vivita; // Salva o objeto da Vivita para usar no método update

    this.createIndicatorVivita(); // Cria o indicador de exclamação

    this.canInteractWithVivita = false; // Marca que o jogador não pode interagir com a Vivita ainda

    // Overlap entre o jogador e a Vivita para habilitar a interação
    this.vivitaOverlap = this.physics.add.overlap(this.player, this.vivita, () => {
      this.canInteractWithVivita = true;
      // Aqui NÃO destruímos o indicador para que ele permaneça visível
      if (!this.keyEVivita) {
        this.keyEVivita = this.add.image(this.vivita.x, this.vivita.y - 50, 'keyE') // Adiciona a tecla E acima da Vivita
          .setScale(0.07) // Ajusta a escala da tecla E
          .setDepth(1000); // Define a profundidade da tecla E para que fique acima de outros elementos
      }
    });
  }

  createIndicatorVivita() {
    this.indicatorVivita = this.physics.add.sprite(width / 1.75, height / 3.8, 'indicator'); // Adiciona o indicador de exclamação acima da Vivita
    this.indicatorVivita.setScale(0.2); // Ajusta a escala do indicador
    this.indicatorVivita.setImmovable(true); // Define o indicador como imóvel
    this.indicatorVivita.play("exclaiming");

    this.activeIndicators.push(this.indicatorVivita); // <- aqui!
    this.indicatorVivitaActive = true; // Marca o indicador como ativo
  }

  showVivitaInteraction() {
    // Remove o indicador de exclamação da Vivita somente quando a interação é iniciada
    if (this.indicatorVivita && this.indicatorVivitaActive) {
      this.indicatorVivita.destroy();
      // Remove-o do array de indicadores ativos, se houver
      this.activeIndicators = this.activeIndicators.filter(ind => ind !== this.indicatorVivita);
      this.indicatorVivitaActive = false;
    }

    // Array com as falas da Vivita
    const speechVivita = [
      "Olá! Você deve ser " + playerName + ", né?",
      "Fiquei sabendo que você quer mudar de carreira na Vivo.",
      "Vou te explicar o primeiro passo.",
      "Primeiro, você precisa criar o seu currículo.",
      "Vá até o computador no escritório.",
      "Preencha seu currículo e depois entregue-o na sala da líder.",
      "Boa sorte!"
    ];

    // Cria o balão de diálogo e o texto inicial
    const balloonText = this.add.image(width / 1.55, height / 4.8, "balloonText");
    const text = this.add.text(width / 1.68, height / 7, speechVivita[0], { // Adiciona o texto inicial
      fontSize: "16px",
      fill: "#000000",
      wordWrap: { width: balloonText.width - 20 }
    });

    let currentSpeechIndex = 0; // Variável para controlar o índice da fala atual
    // Registra o evento para avançar o diálogo com a tecla ENTER
    this.input.keyboard.on("keydown-ENTER", () => {
      currentSpeechIndex++;
      if (currentSpeechIndex < speechVivita.length) {
        text.setText(speechVivita[currentSpeechIndex]);
        this.playButtonClick(); // Toca o som de clique do botão
      } else {
        // Finalizado o diálogo: oculta os elementos e remove o evento
        balloonText.setVisible(false); // Oculta o balão de diálogo
        text.setVisible(false); // Oculta o texto
        if (this.keyENTERVivita) { // Verifica se a tecla ENTER existe
          this.keyENTERVivita.destroy(); // Destroi a tecla ENTER
          this.keyENTERVivita = null; // Reseta a referência da tecla ENTER
        }
        this.input.keyboard.off("keydown-ENTER");
        this.addComputer(); // Prossegue para a próxima ação, por exemplo, adicionando o computador
      }
    });
  }

  leaderRoom() {
    if (this.inTransition) return; // Evita múltiplas transições simultâneas

    const width = this.sys.game.config.width; // Define a largura da tela
    const height = this.sys.game.config.height; // Define a altura da tela

    // Remove seta e indicadores anteriores
    if (this.compassArrow) { // Verifica se a seta da bússola existe
      this.compassArrow.destroy(); // Destroi a seta da bússola
      this.compassArrow = null;
    }

    this.activeIndicators.forEach(i => i.destroy());
    this.activeIndicators = [];

    // Cria nova exclamação
    this.exclamation = this.physics.add.sprite(width - 1200, height - 500, 'indicator').setScale(0.2);
    this.exclamation.play('exclaiming');
    this.activeIndicators.push(this.exclamation);
    this.targetIndicator = this.exclamation;




    // Cria nova seta (bússola)
    this.compassArrow = this.add.image(this.cameras.main.width / 2, 335, "arrow")
      .setScrollFactor(0)
      .setDepth(1000)
      .setScale(0.5)
      .setOrigin(0.5, 0.5);

    this.arrowOffset = Phaser.Math.DegToRad(-180);


    // Adiciona a lógica de rotação contínua no update (caso ainda não exista)


    // Overlap com indicador
    this.physics.add.overlap(this.player, this.exclamation, () => {
      if (!this.inTransition) {
        this.inTransition = true;
        this.walkSound.stop();
        this.returnedFromLeaderRoom = true;
        this.scene.get('officeScene').events.emit('stopWalkSound');
        this.blockLoop = 0;
        this.exclamation.setVisible(false);
        this.indicatorActive = false;

        this.walkSound.stop();
        this.events.emit('stopWalkSound');
        this.activeIndicators = this.activeIndicators.filter(i => i !== this.exclamation);
        this.scene.switch('salaLiderScene');

      }
    });
  }


  resume() {
    if (this.keyEComputer) { // Verifica se a tecla E associada ao computador está visível
      this.keyEComputer.destroy(); // Remove a tecla E da tela
      this.keyEComputer = null; // Reseta a referência da tecla E
    }
  }
  updateArrowToIndicator() {
    if (this.compassArrow) {
      if (this.activeIndicators.length > 0) {
        // Garante que o array só contenha indicadores ativos
        this.activeIndicators = this.activeIndicators.filter(ind => ind && ind.active);

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
        // Se não houver nenhum indicador ativo, a seta desaparece
        this.compassArrow.setVisible(false);
      }
    }
  }

  // Propriedade estática para armazenar o tempo de reprodução da música
  static lastMusicTime = 0;
}
