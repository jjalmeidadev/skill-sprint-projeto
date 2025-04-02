class VpEstrategiaScene extends Phaser.Scene {
  constructor() {
    super({ key: 'VpEstrategiaScene' });
    this.interactionCount = 0; // Initialize counter
  }

  preload() {
    this.load.tilemapTiledJSON('map_estrategia', '../assets/mapaVpEstrategia/map_estrategia.json'); // Carrega o arquivo JSON do mapa criado no Tiled
    this.load.image('decoracao', '../assets/mapaVpEstrategia/decoracao.png'); // Carrega o tileset de decoração
    this.load.image('paredes', '../assets/mapaVpEstrategia/paredes.png'); // Carrega o tileset de paredes
    this.load.image('personalizado_vivo', '../assets/mapaVpEstrategia/personalizado_vivo.png'); // Carrega o tileset personalizado

    this.load.spritesheet('player', '../assets/Player.png', { frameWidth: 32, frameHeight: 32 }); // Carrega o spritesheet do jogador com dimensões de cada frame
    this.load.image('npc', '../assets/viviane_liderr.png'); // Carrega a imagem da NPC
    this.load.image('keyE', '../assets/teclaE.png'); // Carrega a imagem da tecla "E" para interação
    this.load.image("balloonText", "../assets/balaoTexto.png"); // Carrega a imagem do balão de fala da NPC

    this.load.audio('walkSound', '../assets/sounds/753292__vrymaa__footsteps-high-heels-hardwood-walk-run (mp3cut.net).wav'); // Carrega o som de passos
    this.load.audio("strategyMusic", "../assets/Kevin-MacLeod-Itty-Bitty-8-Bit-♫-NO-COPYRIGHT-8-bit-Music.mp3"); // Carrega a música de fundo da cena
    this.load.spritesheet("indicator", "../assets/exclamaçãoRoxa.png", { frameWidth: 254, frameHeight: 305 }); // Carrega a exclamação
    this.load.image('keyEnter', '../assets/keyEnter.png'); // Carrega a imagem da tecla Enter
    this.load.spritesheet('npcIdle', '../assets/personagens/skinsPlayer/Player4Idle.png', { frameWidth: 16, frameHeight: 32 });
    this.load.spritesheet('npcIdle2', '../assets/personagens/skinsPlayer/Player4Idle.png', { frameWidth: 16, frameHeight: 32 });
    this.load.spritesheet('npcIdle3', '../assets/personagens/skinsPlayer/Player4Idle.png', { frameWidth: 16, frameHeight: 32 }); // Carrega o spritesheet do NPC 1
  }

  init(data) {
    this.showThankYou = data && data.showThankYou; // Flag to show "Obrigado!" dialogue
  }

  create() {
    // Inicializa a variável de controle
    this.npcInteractionComplete = false;
    const width = this.cameras.main.width; // Obtém a largura da câmera principal
    const height = this.cameras.main.height; // Obtém a altura da câmera principal

    const startTime = VpEstrategiaScene.lastMusicTime || 0; // Recupera o tempo salvo da música ou inicia do início
    this.strategyMusic = this.sound.add("strategyMusic", { loop: true }); // Adiciona a música de fundo com loop
    this.strategyMusic.play({ seek: startTime }); // Toca a música a partir do tempo salvo

    const map = this.make.tilemap({ key: "map_estrategia", tileWidth: 25, tileHeight: 20 }); // Cria o mapa 
    const tileset1 = map.addTilesetImage("decoracao"); // Adiciona o tileset de decoração
    const tileset2 = map.addTilesetImage("paredes"); // Adiciona o tileset de paredes
    const tileset3 = map.addTilesetImage("personalizado_vivo"); // Adiciona o tileset personalizado

    const offsetX = width - 1270; // Define a posição x para as camadas
    const layer1 = map.createLayer("chao", tileset2, offsetX, 0).setScale(2.5); // Cria a camada de chão e ajusta o tamanho
    const layer2 = map.createLayer("parede", tileset2, offsetX, 0).setScale(2.5); // Cria a camada de paredes e ajusta o tamanho
    const layer3 = map.createLayer("porta_elevador", tileset1, offsetX, 0).setScale(2.5); // Cria a camada de porta do elevador e ajusta o tamanho
    const layer4 = map.createLayer("decoracao_com_barreiras", tileset1, offsetX, 0).setScale(2.5); // Cria a camada de decoração com barreiras e ajusta o tamanho
    const layer5 = map.createLayer("decoracao_sem_barreiras", tileset1, offsetX, 0).setScale(2.5); // Cria a camada de decoração sem barreiras e ajusta o tamanho
    const layer6 = map.createLayer("personalizado_vivo_Sem_barreiras", tileset3, offsetX, 0).setScale(2.5); // Cria a camada personalizada sem barreiras e ajusta o tamanho

    [layer1, layer2, layer3, layer4, layer5, layer6].forEach(layer => {
      layer.setCollisionByProperty({ collider: true }); // Define colisões para as camadas com a propriedade "collider"
    });

    this.createPlayer(width, height); // Cria o jogador na cena
    this.createPlayerAnimations(); // Cria as animações do jogador
    this.createButtonBack(width, height); // Cria o botão de retorno para outra cena

    this.physics.add.collider(this.player, layer2); // Colisão do jogador com a camada de paredes
    this.physics.add.collider(this.player, layer4); // Colisão do jogador com a camada de decoração com barreiras
    this.physics.add.collider(this.player, layer5); // Colisão do jogador com a camada de decoração sem barreira

    this.npc = this.physics.add.sprite(width - 800, height - 500, 'npc'); // Adiciona a NPC na cena
    this.npc.setScale(0.9); // Ajusta o tamanho da NPC
    this.npc.body.immovable = true; // Faz a NPC ficar parada

    this.physics.add.collider(this.player, this.npc); // Adiciona colisão entre o jogador e a NPC

    if (!this.anims.exists("exclaiming")) {
      this.anims.create({
        key: "exclaiming",
        frames: this.anims.generateFrameNumbers("indicator", { start: 0, end: 1 }),
        frameRate: 3,
        repeat: -1
      });
    } //Animação da exclamação

    this.keys = this.input.keyboard.addKeys({ // Configuração do teclado
      up: Phaser.Input.Keyboard.KeyCodes.W, // Tecla W para mover para cima
      down: Phaser.Input.Keyboard.KeyCodes.S, // Tecla S para mover para baixo
      left: Phaser.Input.Keyboard.KeyCodes.A, // Tecla A para mover para a esquerda
      right: Phaser.Input.Keyboard.KeyCodes.D, // Tecla D para mover para a direita
      interagir: Phaser.Input.Keyboard.KeyCodes.E, // Tecla E para interagir
      ENTER: Phaser.Input.Keyboard.KeyCodes.ENTER // Tecla Enter para avançar diálogos
    });

    this.keyEnter = this.add.image(0, 0, 'keyEnter').setScale(0.2);
    this.keyEnter.setVisible(false); // Inicialmente oculta a imagem da tecla Enter

    this.exclamation = this.physics.add.sprite(this.npc.x, this.npc.y - 80, "indicator").setScale(0.3);
    this.exclamation.play("exclaiming"); // Reproduz a animação da exclamação
    this.exclamation.setImmovable(true); // Define que a exclamação não pode ser movida

    this.physics.add.overlap(this.player, this.exclamation, () => {
      if (!this.activeDialogue && this.keyEnter) { // Certifica-se de que this.keyEnter está definido
        this.keyEnter.setVisible(true); // Exibe a tecla Enter
        this.startDialogue([
          "Olá! Que bom que você chegou!",
          "Bem-vindo à sala da VP de Estratégia!",
          "Meu nome é Viviane e sou líder de carreiras aqui na Vivo.",
          "Estamos em um momento único na empresa!",
          "Acabamos de lançar um programa exclusivo.",
          "Queremos acelerar talentos como você!",
          "Mas tem um porém...",
          "As inscrições fecham em 24h!",
          "Só quem montar um plano estratégico para funcionários HOJE garante a vaga!",
          "Você tem 2 minutos para ajudar três talentos a escolherem seus próximos passos de carreira.",
          "Planeje com cuidado!",
          "Cada decisão impacta o crescimento deles na empresa!",
          "Siga as exclamações para ajudá-los."
        ], this.npc); // Passa a NPC principal como referência

        this.exclamation.destroy(); // Remove a exclamação da NPC principal
      }
    });

    if (!this.anims.exists('npc_idle')) {
      this.anims.create({
        key: 'npc_idle',
        frames: this.anims.generateFrameNumbers('npcIdle', { start: 18, end: 23 }), // Corrected frames for npcIdle animation
        frameRate: 5, // Taxa de quadros por segundo
        repeat: -1 // Faz a animação repetir indefinidamente
      });
    }

    this.npcIdle = this.physics.add.sprite(this.npc.x + 200, this.npc.y + 30, 'npcIdle'); // Adiciona o NPC na cena
    this.npcIdle.setScale(2.5); // Ajusta o tamanho do NPC
    this.npcIdle.play('npc_idle'); // Reproduz a animação IDLE
    this.npcIdle.body.immovable = true; // Faz o NPC ficar parado

    // Create npcIdle2
    this.npcIdle2 = this.physics.add.sprite(this.npc.x + 380, this.npc.y + 350, 'npcIdle');
    this.npcIdle2.setScale(2.5);
    this.npcIdle2.play('npc_idle');
    this.npcIdle2.body.immovable = true;

    // Create npcIdle3
    this.npcIdle3 = this.physics.add.sprite(this.npc.x - 310, this.npc.y + 295, 'npcIdle');
    this.npcIdle3.setScale(2.5);
    this.npcIdle3.play('npc_idle');
    this.npcIdle3.body.immovable = true;

    // Add collisions for new NPCs
    this.physics.add.collider(this.player, this.npcIdle2);
    this.physics.add.collider(this.player, this.npcIdle3);

    // Show "Obrigado!" dialogue immediately after returning from minigame
    if (this.showThankYou) {
      this.time.delayedCall(500, () => {
        this.startDialogue(["Obrigado!"], this.npcIdle); // Trigger dialogue
      });
    }

    this.keyEnterIdle = this.add.image(this.npcIdle.x + 50, this.npcIdle.y - 100, 'keyEnter').setScale(0.2);
    this.keyEnterIdle.setVisible(false); // Deixa a tecla Enter invisível inicialmente

    this.keyEnterIdle2 = this.add.image(this.npcIdle2.x + 50, this.npcIdle2.y - 100, 'keyEnter').setScale(0.2);
    this.keyEnterIdle2.setVisible(false);

    this.keyEnterIdle3 = this.add.image(this.npcIdle3.x + 50, this.npcIdle3.y - 100, 'keyEnter').setScale(0.2);
    this.keyEnterIdle3.setVisible(false);

    this.physics.add.collider(this.player, this.npcIdle); // Adiciona colisão entre o jogador e o NPC

    this.walkSound = this.sound.add('walkSound', { loop: false, volume: 2 }); // Adiciona o som de passos com volume ajustado

    this.activeDialogue = false; // Define o estado inicial do diálogo como inativo

    // Adiciona a exclamação e tecla Enter ao npcIdle
    this.exclamationIdle = this.physics.add.sprite(this.npcIdle.x, this.npcIdle.y - 80, "indicator").setScale(0.3);
    this.exclamationIdle.play("exclaiming");
    this.exclamationIdle.setImmovable(true);
    this.exclamationIdle.setVisible(false); // Deixa a exclamação invisível inicialmente

    this.exclamationIdle2 = this.physics.add.sprite(this.npcIdle2.x, this.npcIdle2.y - 80, "indicator").setScale(0.3);
    this.exclamationIdle2.play("exclaiming");
    this.exclamationIdle2.setImmovable(true);
    this.exclamationIdle2.setVisible(false);

    this.exclamationIdle3 = this.physics.add.sprite(this.npcIdle3.x, this.npcIdle3.y - 80, "indicator").setScale(0.3);
    this.exclamationIdle3.play("exclaiming");
    this.exclamationIdle3.setImmovable(true);
    this.exclamationIdle3.setVisible(false);

    // Interação com o npcIdle
    this.physics.add.overlap(this.player, this.exclamationIdle, () => {
      if (!this.npcInteractionComplete) {
        return; // Bloqueia a interação se o jogador não tiver interagido com a NPC principal
      }

      if (!this.activeDialogue && this.keyEnterIdle) { // Check if this.keyEnterIdle is defined
        this.keyEnterIdle.setVisible(true); // Exibe a tecla Enter ao interagir com o npcIdle
        this.startDialogue([
          `E aí, ${this.nome}!`,
          'Sou o Carlos do time comercial.',
          'Tenho vontade de virar gestor, mas não sei qual o caminho certo aqui na Vivo.',
          'Você entende como funciona Carreira em Y? Pode me dar uma força?'
        ], this.npcIdle); // Passa o npcIdle como referência

        this.exclamationIdle.destroy(); // Remove a exclamação do npcIdle
        this.keyEnterIdle.setVisible(false); // Oculta a tecla Enter após o início do diálogo
      }
    });

    // Interação com o npcIdle2
    this.physics.add.overlap(this.player, this.exclamationIdle2, () => {
      if (!this.npcInteractionComplete) {
        return; // Bloqueia a interação se o jogador não tiver interagido com a NPC principal
      }

      if (!this.activeDialogue && this.keyEnterIdle2) {
        this.keyEnterIdle2.setVisible(true); // Exibe a tecla Enter ao interagir com o npcIdle2
        this.startDialogue([
          'Oi! Eu sou a Ana.',
          'Trabalho com desenvolvimento aqui na Vivo.',
          'Adoro programar, mas estou meio perdida...',
          'Será que você pode me ajudar a entender como crescer na área técnica?',
          'Quero virar especialista, mas não sei por onde começar!'
        ], this.npcIdle2); // Passa o npcIdle2 como referência


        this.exclamationIdle2.destroy(); // Remove a exclamação do npcIdle2
        this.keyEnterIdle2.setVisible(false); // Oculta a tecla Enter após o início do diálogo
      }
    });
    // Interação com o npcIdle3
    this.physics.add.overlap(this.player, this.exclamationIdle3, () => {
      if (!this.npcInteractionComplete) {
        return; // Bloqueia a interação se o jogador não tiver interagido com a NPC principal
      }

      if (!this.activeDialogue && this.keyEnterIdle3) {
        this.keyEnterIdle3.setVisible(true); // Exibe a tecla Enter ao interagir com o npcIdle3
        this.startDialogue([
          `Oi, ${this.nome}! Eu sou a Mariana, trabalho no SAC.`,
          'Estou em dúvida sobre minha próxima certificação.',
          'Aqui na Vivo dá pra crescer e ganhar benefícios melhores,',
          'mas eu não entendo direito como funciona.',
          'Será que aumento vem antes ou depois da promoção?',
          'Você pode me mostrar a ordem das coisas?'
        ], this.npcIdle3); // Passa o npcIdle3 como referência

        this.exclamationIdle3.destroy(); // Remove a exclamação do npcIdle3
        this.keyEnterIdle3.setVisible(false); // Oculta a tecla Enter após o início do diálogo
      }
    });

    // Dá zoom na tela do jogo e faz a câmera seguir o personagem
    this.cameras.main.startFollow(this.player); // Faz a câmera seguir o jogador
    this.cameras.main.setZoom(2); // Define o nível de zoom da câmera

    // Create the HUD with improved styling
    const hudContainer = this.add.container(16, 16);
    hudContainer.setScrollFactor(0);

    // Add background with stroke
    const hudBg = this.add.rectangle(0, 0, 100, 40, 0x000000, 0.7);
    hudBg.setStrokeStyle(2, 0xB600B9);

    this.progressText = this.add.text(50, 20, '0/3', {
      fontSize: '24px',
      fill: '#FFFFFF',
      fontFamily: 'font',
    }).setOrigin(0.5);

    hudContainer.add([hudBg, this.progressText]);
    hudContainer.setVisible(false); // Initially hidden
    this.progressHUD = hudContainer;
  }

  update() {
    this.movePlayer(); // Atualiza o movimento do jogador

    const distance = Phaser.Math.Distance.Between(this.player.x, this.player.y, this.npc.x, this.npc.y);// Verifica se o jogador está próximo da NPC
  }

  startDialogue(speechNpc, npc) {
    if (!npc) {
      console.error("NPC não definido ao iniciar o diálogo.");
      return;
    }

    this.activeDialogue = true; // Impede que o diálogo seja iniciado novamente enquanto está ativo

    let indexCurrentSpeech = 0; // Índice da fala atual

    // Posiciona o balão de fala com base no NPC (principal ou npcIdle)
    const balloonText = this.add.image(npc.x + 90, npc.y - 100, "balloonText").setOrigin(0.5).setScale(1);
    const text = this.add.text(npc.x + 90, npc.y - 120, speechNpc[indexCurrentSpeech], {
      fontSize: "16px",
      fill: "#000000",
      wordWrap: { width: balloonText.width - 20 },
      align: "center",
      fontFamily: "font"
    }).setOrigin(0.5);

    const nextSpeech = () => {
      indexCurrentSpeech++;
      if (indexCurrentSpeech < speechNpc.length) {
        text.setText(speechNpc[indexCurrentSpeech]); // Atualiza o texto com a próxima fala
      } else {
        balloonText.destroy(); // Remove o balão de fala
        text.destroy(); // Remove o texto
        this.input.keyboard.off("keydown-ENTER", nextSpeech); // Remove o evento de tecla
        this.keyEnter.setVisible(false); // Oculta a tecla Enter
        this.activeDialogue = false; // Permite iniciar outro diálogo no futuro

        // Exibe as exclamações nos NPCs após o diálogo com a NPC principal
        if (npc === this.npc) {
          this.exclamationIdle.setVisible(true); // Torna a exclamação do npcIdle visível
          this.exclamationIdle2.setVisible(true); // Torna a exclamação do npcIdle2 visível
          this.exclamationIdle3.setVisible(true); // Torna a exclamação do npcIdle3 visível
          this.npcInteractionComplete = true; // Permite a interação com os outros NPCs
          this.progressHUD.setVisible(true); // Show HUD after main NPC dialogue
        }

        // Update counter after each NPC interaction
        if (npc !== this.npc && !this.showThankYou) {
          this.interactionCount++;
          this.progressText.setText(`${this.interactionCount}/3`);
          this.scene.switch("minigameEstrategia" + (npc === this.npcIdle ? "Carlos" : npc === this.npcIdle2 ? "Ana" : "Mariana"));
        }
      }
    };

    this.input.keyboard.on("keydown-ENTER", nextSpeech); // Adiciona o evento para avançar as falas ao pressionar Enter
  }

  movePlayer() {
    const speed = 150; // Define a velocidade do jogador
    let moving = false; // Variável para verificar se o jogador está se movendo

    if (this.keys.left.isDown) { // Verifica se a tecla para mover à esquerda está pressionada
      this.player.setVelocityX(-speed); // Move o jogador para a esquerda
      this.lastPosition = "left"; // Armazena a última direção como "esquerda"
      this.player.anims.play("walk_left", true); // Reproduz a animação de caminhar para a esquerda
      moving = true; // Define que o jogador está se movendo
    } else if (this.keys.right.isDown) { // Verifica se a tecla para mover à direita está pressionada
      this.player.setVelocityX(speed); // Move o jogador para a direita
      this.lastPosition = "right"; // Armazena a última direção como "direita"
      this.player.anims.play("walk_right", true); // Reproduz a animação de caminhar para a direita
      moving = true; // Define que o jogador está se movendo
    } else {
      this.player.setVelocityX(0); // Para o movimento horizontal do jogador
    }

    if (this.keys.up.isDown) { // Verifica se a tecla para mover para cima está pressionada
      this.player.setVelocityY(-speed); // Move o jogador para cima
      this.lastPosition = "up"; // Armazena a última direção como "cima"
      this.player.anims.play("walk_up", true); // Reproduz a animação de caminhar para cima
      moving = true; // Define que o jogador está se movendo
    } else if (this.keys.down.isDown) { // Verifica se a tecla para mover para baixo está pressionada
      this.player.setVelocityY(speed); // Move o jogador para baixo
      this.lastPosition = "down"; // Armazena a última direção como "baixo"
      this.player.anims.play("walk_down", true); // Reproduz a animação de caminhar para baixo
      moving = true; // Define que o jogador está se movendo
    } else {
      this.player.setVelocityY(0); // Para o movimento vertical do jogador
    }

    // Se o personagem parou, inicia a animação de stop_* em loop
    if (!moving) { // Verifica se o jogador não está se movendo
      switch (this.lastPosition) { // Verifica a última direção do jogador
        case "left": // Caso a última direção seja "esquerda"
          this.player.anims.play("stop_left", true); // Reproduz a animação de parada para a esquerda
          break;
        case "right": // Caso a última direção seja "direita"
          this.player.anims.play("stop_right", true); // Reproduz a animação de parada para a direita
          break;
        case "up": // Caso a última direção seja "cima"
          this.player.anims.play("stop_up", true); // Reproduz a animação de parada para cima
          break;
        case "down": // Caso a última direção seja "baixo"
        default: // Caso padrão (última direção "baixo")
          this.player.anims.play("stop_down", true); // Reproduz a animação de parada para baixo
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
    this.player = this.physics.add.sprite(width - 670, height - 660, 'player'); // Adiciona o sprite do jogador na posição especificada
    this.player.setScale(2.5); // Ajusta o tamanho do jogador
  }

  onShutdown() {
    if (this.PeopleMusic && this.PeopleMusic.isPlaying) { // Verifica se a música está tocando
      VpPessoasScene.lastMusicTime = this.PeopleMusic.seek; // Salva o tempo atual da música
      this.PeopleMusic.stop(); // Para a música
    }
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

  createButtonBack(width, height) {
    const buttonBack = this.add.image(width - 700, height - 680, "keyE"); // Adiciona a imagem do botão de retorno na posição especificada
    buttonBack.setScale(0.2); // Ajusta o tamanho da imagem do botão de retorno

    this.input.keyboard.on("keydown-E", () => { // Adiciona um evento para a tecla "E"
      const distance = Phaser.Math.Distance.Between( // Calcula a distância entre o jogador e o botão de retorno
        this.player.x, this.player.y, buttonBack.x, buttonBack.y // Coordenadas do jogador e do botão
      );

      if (distance < 100) { // Verifica se o jogador está próximo o suficiente do botão (raio de 100)
        this.scene.stop("VpEstrategiaScene"); // Para a cena atual
        this.scene.start("elevadorScene"); // Inicia a cena do elevador
      }
    });
  }
}

// Propriedade estática para armazenar o tempo de reprodução da músic
VpEstrategiaScene.lastMusicTime = 0;

class minigameEstrategiaCarlos extends Phaser.Scene {
  constructor() {
    super({ key: "minigameEstrategiaCarlos" });
    this.currentNPC = 0; // Track current NPC (0: Ana, 1: Carlos, 2: Mariana)
    this.npcData = [
      {
        name: 'Carlos',
        elements: [
          { text: 'Entrar como Analista Comercial', color: 0x000000 },
          { text: 'Virar Coordenador de Vendas', color: 0x000000 },
          { text: 'Fazer treinamento de liderança', color: 0x000000 },
          { text: 'Virar Gerente (Carreira em Y)', color: 0x000000 }
        ],
        feedback: 'Certíssimo! Este é o caminho do líder na Vivo: Analista → Coordenador → Gerente. Você ganha bônus por resultados (PLR) e acesso a treinamentos exclusivos para crescer na empresa. Carlos está muito agradecido! Ele disse que quer te pagar um café qualquer dia. Parabéns por ajudá-lo no seu planejamento de carreira!'
      }
    ];
  }

  preload() {
    this.load.audio('success', '../assets/sounds/success.mp3');
    this.load.audio('error', '../assets/sounds/error.mp3');
    this.load.image('background', '../assets/background_vpestrategia_minigame.png'); // Fixed path
    this.load.image('arrow', '../assets/arrow.png');
  }

  create() {
    // Get game dimensions
    this.gameWidth = this.cameras.main.width;
    this.gameHeight = this.cameras.main.height;
    this.createGameElements();
  }

  createGameElements() {
    // Add background image
    this.add.image(this.gameWidth / 2, this.gameHeight / 2, 'background')
      .setDisplaySize(this.gameWidth, this.gameHeight)
      .setOrigin(0.5);

    // Add white overlay with 50% opacity
    this.add.rectangle(
      this.gameWidth / 2,
      this.gameHeight / 2,
      this.gameWidth,
      this.gameHeight,
      0xFFFFFF,
      0.5
    );

    const currentNPCData = this.npcData[this.currentNPC];

    // Centered header - adjusted for full screen
    const headerBg = this.add.rectangle(this.gameWidth / 2, 80, this.gameWidth * 0.8, 120, 0x000000, 0.1);

    this.add.text(this.gameWidth / 2, 90, `Organize a carreira de ${currentNPCData.name}`, {
      fontSize: '32px',
      fill: '#000000',
      fontStyle: 'bold',
      fontFamily: 'font'
    }).setOrigin(0.5);

    // Centered instructions - adjusted position
    this.add.text(this.gameWidth / 2, 160, 'Carlos precisa de sua ajuda! Clique e arraste os elementos na ordem correta do início ao fim da carreira.', {
      fontSize: '29px',
      fill: '#000000',
      fontFamily: 'font'
    }).setOrigin(0.5);

    // Create centered drop zones - adjusted for full width
    this.dropZones = [];
    const zoneWidth = 200;
    const totalWidth = zoneWidth * 4;
    const spacing = 50;
    const startX = (this.gameWidth - (totalWidth + spacing * 3)) / 2;

    for (let i = 0; i < 4; i++) {
      const x = startX + (zoneWidth + spacing) * i + zoneWidth / 2;
      const y = this.gameHeight / 2 - 50;

      if (i < 3) {
        const arrow = this.add.image(x + zoneWidth / 2 + spacing / 2, y, 'arrow').setScale(0.4);
        arrow.setTint(0x000000);
      }

      // Create depth effect with multiple layers
      const shadowZone = this.add.rectangle(x + 4, y + 4, zoneWidth, 120, 0x000000, 0.2);
      const baseZone = this.add.rectangle(x, y, zoneWidth, 120, 0xE6B3FF, 0.3); // Lighter purple base
      const zone = this.add.rectangle(x, y, zoneWidth, 120, 0xE6B3FF, 0.8); // Lighter purple top

      // Add inner shadow effect
      zone.setStrokeStyle(2, 0x000000, 0.2);
      zone.setInteractive();
      zone.correctIndex = i;

      // Add depth effect with gradient
      const gradient = this.add.rectangle(x, y + 2, zoneWidth - 4, 116, 0xD9A3FF, 0.4); // Slightly darker for depth

      this.add.text(x, y - 80, `${i + 1}`, {
        fontSize: '32px',
        fill: '#000000',
        fontStyle: 'bold'
      }).setOrigin(0.5);

      // Group all visual elements
      const zoneGroup = [shadowZone, baseZone, gradient, zone];
      this.dropZones.push(zone);
    }

    // Create draggable elements with matching color scheme
    const shuffledElements = Phaser.Utils.Array.Shuffle([...currentNPCData.elements]);

    this.dragElements = shuffledElements.map((element, index) => {
      const x = startX + (zoneWidth + spacing) * index + zoneWidth / 2;
      const y = this.gameHeight - 150;

      // Change back to original purple color (0xB600B9) for draggable elements
      const background = this.add.rectangle(0, 0, zoneWidth, 120, 0xB600B9);
      background.setStrokeStyle(2, 0x000000, 0.3);

      const text = this.add.text(0, 0, element.text, {
        fontSize: '18px',
        fill: '#000000',
        align: 'center',
        fontFamily: 'font',
        wordWrap: { width: zoneWidth - 20 }
      }).setOrigin(0.5);

      const container = this.add.container(x, y, [background, text]);
      container.setSize(zoneWidth, 120);
      container.setInteractive({ draggable: true });
      container.originalIndex = currentNPCData.elements.indexOf(element);
      container.originalX = x;
      container.originalY = y;

      // Hover effect
      container.on('pointerover', () => {
        this.tweens.add({
          targets: container,
          scaleX: 1.05,
          scaleY: 1.05,
          duration: 100
        });
      });

      container.on('pointerout', () => {
        this.tweens.add({
          targets: container,
          scaleX: 1,
          scaleY: 1,
          duration: 100
        });
      });

      return container;
    });

    // Setup drag events
    this.input.on('dragstart', (pointer, gameObject) => {
      gameObject.setDepth(1);
    });

    this.input.on('drag', (pointer, gameObject, dragX, dragY) => {
      gameObject.x = dragX;
      gameObject.y = dragY;
    });

    this.input.on('dragend', (pointer, gameObject) => {
      gameObject.setDepth(0);
      const dropZone = this.findOverlappingZone(gameObject);

      if (dropZone) {
        if (dropZone.correctIndex === gameObject.originalIndex) {
          gameObject.x = dropZone.x;
          gameObject.y = dropZone.y;
          gameObject.input.draggable = false;
          this.showPositionSuccess(gameObject); // Mostra feedback de sucesso
          this.checkCompletion();
        } else {
          this.showPositionError(gameObject); // Mostra feedback de posição incorreta
          this.tweens.add({
            targets: gameObject,
            x: gameObject.originalX,
            y: gameObject.originalY,
            duration: 300,
            ease: 'Back.easeOut'
          });
        }
      } else {
        this.tweens.add({
          targets: gameObject,
          x: gameObject.originalX,
          y: gameObject.originalY,
          duration: 300,
          ease: 'Back.easeOut'
        });
      }
    });
  }


  showPositionError(gameObject) {
    if (this.positionErrorContainer) {
      this.positionErrorContainer.destroy();
    }

    this.positionErrorContainer = this.add.container(
      this.gameWidth / 2,
      this.gameHeight / 2 + 50
    );

    // Add outer stroke for a subtle border effect
    const errorBorder = this.add.rectangle(0, 0, 404, 64, 0xFF6B6B);
    const errorBg = this.add.rectangle(0, 0, 400, 60, 0xFFA7A7, 1);
    errorBg.setStrokeStyle(2, 0xFF8888, 1); // Inner stroke slightly lighter

    const errorText = this.add.text(0, 0, 'Posição incorreta!', {
      fontSize: '20px',
      fill: '#800000', // Darker red text for better contrast
      fontFamily: 'font'
    }).setOrigin(0.5);

    this.positionErrorContainer.add([errorBorder, errorBg, errorText]);

    this.tweens.add({
      targets: this.positionErrorContainer,
      alpha: 0,
      y: this.positionErrorContainer.y - 20,
      duration: 500,
      delay: 1500,
      ease: 'Power2',
      onComplete: () => {
        this.positionErrorContainer.destroy();
      }
    });
  }

  showPositionSuccess(gameObject) {
    if (this.positionSuccessContainer) {
      this.positionSuccessContainer.destroy();
    }

    this.positionSuccessContainer = this.add.container(
      this.gameWidth / 2,
      this.gameHeight / 2 + 50
    );

    // Add outer stroke for a subtle border effect
    const successBorder = this.add.rectangle(0, 0, 404, 64, 0x2E8B57);
    const successBg = this.add.rectangle(0, 0, 400, 60, 0x90EE90, 1);
    successBg.setStrokeStyle(2, 0x98FB98, 1); // Inner stroke slightly lighter

    const successText = this.add.text(0, 0, 'Posição correta!', {
      fontSize: '20px',
      fill: '#006400', // Darker green text for better contrast
      fontFamily: 'font'
    }).setOrigin(0.5);

    this.positionSuccessContainer.add([successBorder, successBg, successText]);

    this.tweens.add({
      targets: this.positionSuccessContainer,
      alpha: 0,
      y: this.positionSuccessContainer.y - 20,
      duration: 500,
      delay: 1500,
      ease: 'Power2',
      onComplete: () => this.positionSuccessContainer.destroy()
    });
  }

  showSuccess() {
    if (this.feedbackContainer) {
      this.feedbackContainer.destroy();
    }

    // Create centered overlay
    const overlay = this.add.rectangle(
      this.gameWidth / 2,
      this.gameHeight / 2,
      this.gameWidth,
      this.gameHeight,
      0x000000,
      0.7
    );

    // Create centered container
    this.feedbackContainer = this.add.container(this.gameWidth / 2, this.gameHeight / 2);

    // Create feedback background with proper size
    const feedbackBg = this.add.rectangle(
      0,
      0,
      800,  // Increased width
      200,  // Adjusted height
      0xB600B9,
      0.9
    ).setOrigin(0.5);
    feedbackBg.setStrokeStyle(4, 0xB600B9);

    // Create centered text
    const feedbackText = this.add.text(
      0,
      0,
      this.npcData[this.currentNPC].feedback,
      {
        fontSize: '24px',
        fill: '#FFFFFF',
        align: 'center',
        fontFamily: 'font',
        wordWrap: { width: 750 }  // Adjusted wrap width
      }
    ).setOrigin(0.5);  // This centers the text both horizontally and vertically

    // Add elements to container
    this.feedbackContainer.add([feedbackBg, feedbackText]);

    // Increased display time to 8 seconds
    this.time.delayedCall(8000, () => {
      this.tweens.add({
        targets: [overlay, this.feedbackContainer],
        alpha: 0,
        duration: 500,
        onComplete: () => {
          overlay.destroy();
          this.feedbackContainer.destroy();
          this.scene.switch('VpEstrategiaScene', { showThankYou: true });
        }
      });
    });
  }

  showError(gameObject) {
    if (this.errorContainer) {
      this.errorContainer.destroy(); // Remove qualquer contêiner de erro existente
    }

    // Cria o contêiner de erro
    this.errorContainer = this.add.container(400, 200);

    const errorBg = this.add.rectangle(0, 0, 400, 60, 0xFF0000, 0.2); // Fundo do erro
    errorBg.setStrokeStyle(2, 0xFF0000); // Borda vermelha

    const errorText = this.add.text(0, 0, 'Ordem incorreta! Tente novamente.', {
      fontSize: '20px',
      fill: '#CC0000',
      fontFamily: 'font'
    }).setOrigin(0.5); // Texto centralizado

    this.errorContainer.add([errorBg, errorText]); // Adiciona o fundo e o texto ao contêiner
    this.sound.play('error'); // Toca o som de erro

    // Animação para desaparecer o contêiner de erro após 2 segundos
    this.tweens.add({
      targets: this.errorContainer,
      alpha: 0, // Reduz a opacidade para 0
      y: 180, // Move o contêiner ligeiramente para cima
      duration: 500, // Duração da animação (0.5 segundos)
      delay: 1500, // Espera 1.5 segundos antes de iniciar a animação
      ease: 'Power2', // Tipo de animação
      onComplete: () => {
        this.errorContainer.destroy(); // Remove o contêiner de erro após a animação
      }
    });
  }

  findOverlappingZone(gameObject) {
    return this.dropZones.find(zone => {
      const distance = Phaser.Math.Distance.Between(gameObject.x, gameObject.y, zone.x, zone.y);
      return distance < 50;
    });
  }

  checkCompletion() {
    const allCorrect = this.dragElements.every(element => {
      const dropZone = this.findOverlappingZone(element);
      return dropZone && dropZone.correctIndex === element.originalIndex;
    });

    if (allCorrect) {
      this.showSuccess();
    }
  }
}


class minigameEstrategiaAna extends Phaser.Scene {
  constructor() {
    super({ key: "minigameEstrategiaAna" });
    this.currentNPC = 0; // Track current NPC (0: Ana, 1: Carlos, 2: Mariana)
    this.npcData = [
      {
        name: 'Ana',
        elements: [
          { text: 'Primeiro cargo como Dev Júnior', color: 0x000000 },
          { text: 'Investir em certificação Cloud', color: 0x000000 },
          { text: 'Promoção para Dev Pleno', color: 0x000000 },
          { text: 'Alcançar o nível Expert (Carreira Y)', color: 0x000000 }
        ],
        feedback: 'Sequência correta! Ana seguirá como especialista técnica: Júnior (base) → Pleno (projetos complexos) → Expert (referência técnica). Ela está animada para focar em código e te manda um meme de agradecimento!'
      }
    ];
  }

  preload() {
    this.load.audio('success', '../assets/sounds/success.mp3');
    this.load.audio('error', '../assets/sounds/error.mp3');
    this.load.image('background', '../assets/background_vpestrategia_minigame.png'); // Fixed path
    this.load.image('arrow', '../assets/arrow.png');
  }

  create() {
    // Get game dimensions
    this.gameWidth = this.cameras.main.width;
    this.gameHeight = this.cameras.main.height;
    this.createGameElements();
  }

  createGameElements() {
    // Add background image
    this.add.image(this.gameWidth / 2, this.gameHeight / 2, 'background')
      .setDisplaySize(this.gameWidth, this.gameHeight)
      .setOrigin(0.5);

    // Add white overlay with 50% opacity
    this.add.rectangle(
      this.gameWidth / 2,
      this.gameHeight / 2,
      this.gameWidth,
      this.gameHeight,
      0xFFFFFF,
      0.5
    );

    const currentNPCData = this.npcData[this.currentNPC];

    // Centered header - adjusted for full screen
    const headerBg = this.add.rectangle(this.gameWidth / 2, 80, this.gameWidth * 0.8, 120, 0x000000, 0.1);

    this.add.text(this.gameWidth / 2, 90, `Organize a carreira de ${currentNPCData.name}`, {
      fontSize: '32px',
      fill: '#000000',
      fontStyle: 'bold',
      fontFamily: 'font'
    }).setOrigin(0.5);

    // Centered instructions - adjusted position
    this.add.text(this.gameWidth / 2, 160, 'Ana precisa de sua ajuda! Clique e arraste os elementos na ordem correta do início ao fim da carreira.', {
      fontSize: '29px',
      fill: '#000000',
      fontFamily: 'font'
    }).setOrigin(0.5);

    // Create centered drop zones - adjusted for full width
    this.dropZones = [];
    const zoneWidth = 200;
    const totalWidth = zoneWidth * 4;
    const spacing = 50;
    const startX = (this.gameWidth - (totalWidth + spacing * 3)) / 2;

    for (let i = 0; i < 4; i++) {
      const x = startX + (zoneWidth + spacing) * i + zoneWidth / 2;
      const y = this.gameHeight / 2 - 50;

      if (i < 3) {
        const arrow = this.add.image(x + zoneWidth / 2 + spacing / 2, y, 'arrow').setScale(0.4);
        arrow.setTint(0x000000);
      }

      // Create depth effect with multiple layers
      const shadowZone = this.add.rectangle(x + 4, y + 4, zoneWidth, 120, 0x000000, 0.2);
      const baseZone = this.add.rectangle(x, y, zoneWidth, 120, 0xE6B3FF, 0.3); // Lighter purple base
      const zone = this.add.rectangle(x, y, zoneWidth, 120, 0xE6B3FF, 0.8); // Lighter purple top

      // Add inner shadow effect
      zone.setStrokeStyle(2, 0x000000, 0.2);
      zone.setInteractive();
      zone.correctIndex = i;

      // Add depth effect with gradient
      const gradient = this.add.rectangle(x, y + 2, zoneWidth - 4, 116, 0xD9A3FF, 0.4); // Slightly darker for depth

      this.add.text(x, y - 80, `${i + 1}`, {
        fontSize: '32px',
        fill: '#000000',
        fontStyle: 'bold'
      }).setOrigin(0.5);

      // Group all visual elements
      const zoneGroup = [shadowZone, baseZone, gradient, zone];
      this.dropZones.push(zone);
    }

    // Create draggable elements with matching color scheme
    const shuffledElements = Phaser.Utils.Array.Shuffle([...currentNPCData.elements]);

    this.dragElements = shuffledElements.map((element, index) => {
      const x = startX + (zoneWidth + spacing) * index + zoneWidth / 2;
      const y = this.gameHeight - 150;

      // Change back to original purple color (0xB600B9) for draggable elements
      const background = this.add.rectangle(0, 0, zoneWidth, 120, 0xB600B9);
      background.setStrokeStyle(2, 0x000000, 0.3);

      const text = this.add.text(0, 0, element.text, {
        fontSize: '18px',
        fill: '#000000',
        align: 'center',
        fontFamily: 'font',
        wordWrap: { width: zoneWidth - 20 }
      }).setOrigin(0.5);

      const container = this.add.container(x, y, [background, text]);
      container.setSize(zoneWidth, 120);
      container.setInteractive({ draggable: true });
      container.originalIndex = currentNPCData.elements.indexOf(element);
      container.originalX = x;
      container.originalY = y;

      // Hover effect
      container.on('pointerover', () => {
        this.tweens.add({
          targets: container,
          scaleX: 1.05,
          scaleY: 1.05,
          duration: 100
        });
      });

      container.on('pointerout', () => {
        this.tweens.add({
          targets: container,
          scaleX: 1,
          scaleY: 1,
          duration: 100
        });
      });

      return container;
    });

    // Setup drag events
    this.input.on('dragstart', (pointer, gameObject) => {
      gameObject.setDepth(1);
    });

    this.input.on('drag', (pointer, gameObject, dragX, dragY) => {
      gameObject.x = dragX;
      gameObject.y = dragY;
    });

    this.input.on('dragend', (pointer, gameObject) => {
      gameObject.setDepth(0);
      const dropZone = this.findOverlappingZone(gameObject);

      if (dropZone) {
        if (dropZone.correctIndex === gameObject.originalIndex) {
          gameObject.x = dropZone.x;
          gameObject.y = dropZone.y;
          gameObject.input.draggable = false;
          this.showPositionSuccess(gameObject); // Mostra feedback de sucesso
          this.checkCompletion();
        } else {
          this.showPositionError(gameObject); // Mostra feedback de posição incorreta
          this.tweens.add({
            targets: gameObject,
            x: gameObject.originalX,
            y: gameObject.originalY,
            duration: 300,
            ease: 'Back.easeOut'
          });
        }
      } else {
        this.tweens.add({
          targets: gameObject,
          x: gameObject.originalX,
          y: gameObject.originalY,
          duration: 300,
          ease: 'Back.easeOut'
        });
      }
    });
  }


  showPositionError(gameObject) {
    if (this.positionErrorContainer) {
      this.positionErrorContainer.destroy();
    }

    this.positionErrorContainer = this.add.container(
      this.gameWidth / 2,
      this.gameHeight / 2 + 50
    );

    // Add outer stroke for a subtle border effect
    const errorBorder = this.add.rectangle(0, 0, 404, 64, 0xFF6B6B);
    const errorBg = this.add.rectangle(0, 0, 400, 60, 0xFFA7A7, 1);
    errorBg.setStrokeStyle(2, 0xFF8888, 1); // Inner stroke slightly lighter

    const errorText = this.add.text(0, 0, 'Posição incorreta!', {
      fontSize: '20px',
      fill: '#800000', // Darker red text for better contrast
      fontFamily: 'font'
    }).setOrigin(0.5);

    this.positionErrorContainer.add([errorBorder, errorBg, errorText]);

    this.tweens.add({
      targets: this.positionErrorContainer,
      alpha: 0,
      y: this.positionErrorContainer.y - 20,
      duration: 500,
      delay: 1500,
      ease: 'Power2',
      onComplete: () => {
        this.positionErrorContainer.destroy();
      }
    });
  }

  showPositionSuccess(gameObject) {
    if (this.positionSuccessContainer) {
      this.positionSuccessContainer.destroy();
    }

    this.positionSuccessContainer = this.add.container(
      this.gameWidth / 2,
      this.gameHeight / 2 + 50
    );

    // Add outer stroke for a subtle border effect
    const successBorder = this.add.rectangle(0, 0, 404, 64, 0x2E8B57);
    const successBg = this.add.rectangle(0, 0, 400, 60, 0x90EE90, 1);
    successBg.setStrokeStyle(2, 0x98FB98, 1); // Inner stroke slightly lighter

    const successText = this.add.text(0, 0, 'Posição correta!', {
      fontSize: '20px',
      fill: '#006400', // Darker green text for better contrast
      fontFamily: 'font'
    }).setOrigin(0.5);

    this.positionSuccessContainer.add([successBorder, successBg, successText]);

    this.tweens.add({
      targets: this.positionSuccessContainer,
      alpha: 0,
      y: this.positionSuccessContainer.y - 20,
      duration: 500,
      delay: 1500,
      ease: 'Power2',
      onComplete: () => this.positionSuccessContainer.destroy()
    });
  }

  showSuccess() {
    if (this.feedbackContainer) {
      this.feedbackContainer.destroy();
    }

    // Create centered overlay
    const overlay = this.add.rectangle(
      this.gameWidth / 2,
      this.gameHeight / 2,
      this.gameWidth,
      this.gameHeight,
      0x000000,
      0.7
    );

    // Create centered container
    this.feedbackContainer = this.add.container(this.gameWidth / 2, this.gameHeight / 2);

    // Create feedback background with proper size
    const feedbackBg = this.add.rectangle(
      0,
      0,
      800,  // Increased width
      200,  // Adjusted height
      0xB600B9,
      0.9
    ).setOrigin(0.5);
    feedbackBg.setStrokeStyle(4, 0xB600B9);

    // Create centered text
    const feedbackText = this.add.text(
      0,
      0,
      this.npcData[this.currentNPC].feedback,
      {
        fontSize: '24px',
        fill: '#FFFFFF',
        align: 'center',
        fontFamily: 'font',
        wordWrap: { width: 750 }  // Adjusted wrap width
      }
    ).setOrigin(0.5);  // This centers the text both horizontally and vertically

    // Add elements to container
    this.feedbackContainer.add([feedbackBg, feedbackText]);

    // Increased display time to 8 seconds
    this.time.delayedCall(8000, () => {
      this.tweens.add({
        targets: [overlay, this.feedbackContainer],
        alpha: 0,
        duration: 500,
        onComplete: () => {
          overlay.destroy();
          this.feedbackContainer.destroy();
          this.scene.switch('VpEstrategiaScene', { showThankYou: true });
        }
      });
    });
  }

  showError(gameObject) {
    if (this.errorContainer) {
      this.errorContainer.destroy(); // Remove qualquer contêiner de erro existente
    }

    // Cria o contêiner de erro
    this.errorContainer = this.add.container(400, 200);

    const errorBg = this.add.rectangle(0, 0, 400, 60, 0xFF0000, 0.2); // Fundo do erro
    errorBg.setStrokeStyle(2, 0xFF0000); // Borda vermelha

    const errorText = this.add.text(0, 0, 'Ordem incorreta! Tente novamente.', {
      fontSize: '20px',
      fill: '#CC0000',
      fontFamily: 'font'
    }).setOrigin(0.5); // Texto centralizado

    this.errorContainer.add([errorBg, errorText]); // Adiciona o fundo e o texto ao contêiner
    this.sound.play('error'); // Toca o som de erro

    // Animação para desaparecer o contêiner de erro após 2 segundos
    this.tweens.add({
      targets: this.errorContainer,
      alpha: 0, // Reduz a opacidade para 0
      y: 180, // Move o contêiner ligeiramente para cima
      duration: 500, // Duração da animação (0.5 segundos)
      delay: 1500, // Espera 1.5 segundos antes de iniciar a animação
      ease: 'Power2', // Tipo de animação
      onComplete: () => {
        this.errorContainer.destroy(); // Remove o contêiner de erro após a animação
      }
    });
  }

  findOverlappingZone(gameObject) {
    return this.dropZones.find(zone => {
      const distance = Phaser.Math.Distance.Between(gameObject.x, gameObject.y, zone.x, zone.y);
      return distance < 50;
    });
  }

  checkCompletion() {
    const allCorrect = this.dragElements.every(element => {
      const dropZone = this.findOverlappingZone(element);
      return dropZone && dropZone.correctIndex === element.originalIndex;
    });

    if (allCorrect) {
      this.showSuccess();
    }
  }
}

class minigameEstrategiaMariana extends Phaser.Scene {
  constructor() {
    super({ key: "minigameEstrategiaMariana" });
    this.currentNPC = 0; // Track current NPC (0: Ana, 1: Carlos, 2: Mariana)
    this.npcData = [
      {
        name: 'Mariana',
        elements: [
          { text: 'Atendente SAC', color: 0x00A0E3 },
          { text: 'Participar do Programa de Talentos', color: 0x00A0E3 },
          { text: 'Certificação em Experiência do Cliente', color: 0x00A0E3 },
          { text: 'Líder de Novos Colaboradores', color: 0x00A0E3 }
        ],
        feedback: 'Mariana seguiu perfeitamente o plano de carreira da Vivo! Como Líder de Novos Colaboradores, agora tem remuneração ampliada (salário + bônus por performance) e benefícios como capacitação contínua. Este caso mostra como na Vivo, crescimento vertical e horizontal andam juntos!'
      }
    ];
  }

  preload() {
    this.load.audio('success', '../assets/sounds/success.mp3');
    this.load.audio('error', '../assets/sounds/error.mp3');
    this.load.image('background', '../assets/background_vpestrategia_minigame.png'); // Fixed path
    this.load.image('arrow', '../assets/arrow.png');
  }

  create() {
    // Get game dimensions
    this.gameWidth = this.cameras.main.width;
    this.gameHeight = this.cameras.main.height;
    this.createGameElements();
  }

  createGameElements() {
    // Add background image
    this.add.image(this.gameWidth / 2, this.gameHeight / 2, 'background')
      .setDisplaySize(this.gameWidth, this.gameHeight)
      .setOrigin(0.5);

    // Add white overlay with 50% opacity
    this.add.rectangle(
      this.gameWidth / 2,
      this.gameHeight / 2,
      this.gameWidth,
      this.gameHeight,
      0xFFFFFF,
      0.5
    );

    const currentNPCData = this.npcData[this.currentNPC];

    // Centered header - adjusted for full screen
    const headerBg = this.add.rectangle(this.gameWidth / 2, 80, this.gameWidth * 0.8, 120, 0x000000, 0.1);

    this.add.text(this.gameWidth / 2, 90, `Organize a carreira de ${currentNPCData.name}`, {
      fontSize: '32px',
      fill: '#000000',
      fontStyle: 'bold',
      fontFamily: 'font'
    }).setOrigin(0.5);

    // Centered instructions - adjusted position
    this.add.text(this.gameWidth / 2, 160, 'Mariana precisa de sua ajuda! Clique e arraste os elementos na ordem correta do início ao fim da carreira.', {
      fontSize: '29px',
      fill: '#000000',
      fontFamily: 'font'
    }).setOrigin(0.5);

    // Create centered drop zones - adjusted for full width
    this.dropZones = [];
    const zoneWidth = 200;
    const totalWidth = zoneWidth * 4;
    const spacing = 50;
    const startX = (this.gameWidth - (totalWidth + spacing * 3)) / 2;

    for (let i = 0; i < 4; i++) {
      const x = startX + (zoneWidth + spacing) * i + zoneWidth / 2;
      const y = this.gameHeight / 2 - 50;

      if (i < 3) {
        const arrow = this.add.image(x + zoneWidth / 2 + spacing / 2, y, 'arrow').setScale(0.4);
        arrow.setTint(0x000000);
      }

      // Create depth effect with multiple layers
      const shadowZone = this.add.rectangle(x + 4, y + 4, zoneWidth, 120, 0x000000, 0.2);
      const baseZone = this.add.rectangle(x, y, zoneWidth, 120, 0xE6B3FF, 0.3); // Lighter purple base
      const zone = this.add.rectangle(x, y, zoneWidth, 120, 0xE6B3FF, 0.8); // Lighter purple top

      // Add inner shadow effect
      zone.setStrokeStyle(2, 0x000000, 0.2);
      zone.setInteractive();
      zone.correctIndex = i;

      // Add depth effect with gradient
      const gradient = this.add.rectangle(x, y + 2, zoneWidth - 4, 116, 0xD9A3FF, 0.4); // Slightly darker for depth

      this.add.text(x, y - 80, `${i + 1}`, {
        fontSize: '32px',
        fill: '#000000',
        fontStyle: 'bold'
      }).setOrigin(0.5);

      // Group all visual elements
      const zoneGroup = [shadowZone, baseZone, gradient, zone];
      this.dropZones.push(zone);
    }

    // Create draggable elements with matching color scheme
    const shuffledElements = Phaser.Utils.Array.Shuffle([...currentNPCData.elements]);

    this.dragElements = shuffledElements.map((element, index) => {
      const x = startX + (zoneWidth + spacing) * index + zoneWidth / 2;
      const y = this.gameHeight - 150;

      // Change back to original purple color (0xB600B9) for draggable elements
      const background = this.add.rectangle(0, 0, zoneWidth, 120, 0xB600B9);
      background.setStrokeStyle(2, 0x000000, 0.3);

      const text = this.add.text(0, 0, element.text, {
        fontSize: '18px',
        fill: '#000000',
        align: 'center',
        fontFamily: 'font',
        wordWrap: { width: zoneWidth - 20 }
      }).setOrigin(0.5);

      const container = this.add.container(x, y, [background, text]);
      container.setSize(zoneWidth, 120);
      container.setInteractive({ draggable: true });
      container.originalIndex = currentNPCData.elements.indexOf(element);
      container.originalX = x;
      container.originalY = y;

      // Hover effect
      container.on('pointerover', () => {
        this.tweens.add({
          targets: container,
          scaleX: 1.05,
          scaleY: 1.05,
          duration: 100
        });
      });

      container.on('pointerout', () => {
        this.tweens.add({
          targets: container,
          scaleX: 1,
          scaleY: 1,
          duration: 100
        });
      });

      return container;
    });

    // Setup drag events
    this.input.on('dragstart', (pointer, gameObject) => {
      gameObject.setDepth(1);
    });

    this.input.on('drag', (pointer, gameObject, dragX, dragY) => {
      gameObject.x = dragX;
      gameObject.y = dragY;
    });

    this.input.on('dragend', (pointer, gameObject) => {
      gameObject.setDepth(0);
      const dropZone = this.findOverlappingZone(gameObject);

      if (dropZone) {
        if (dropZone.correctIndex === gameObject.originalIndex) {
          gameObject.x = dropZone.x;
          gameObject.y = dropZone.y;
          gameObject.input.draggable = false;
          this.showPositionSuccess(gameObject); // Mostra feedback de sucesso
          this.checkCompletion();
        } else {
          this.showPositionError(gameObject); // Mostra feedback de posição incorreta
          this.tweens.add({
            targets: gameObject,
            x: gameObject.originalX,
            y: gameObject.originalY,
            duration: 300,
            ease: 'Back.easeOut'
          });
        }
      } else {
        this.tweens.add({
          targets: gameObject,
          x: gameObject.originalX,
          y: gameObject.originalY,
          duration: 300,
          ease: 'Back.easeOut'
        });
      }
    });
  }


  showPositionError(gameObject) {
    if (this.positionErrorContainer) {
      this.positionErrorContainer.destroy();
    }

    this.positionErrorContainer = this.add.container(
      this.gameWidth / 2,
      this.gameHeight / 2 + 50
    );

    // Add outer stroke for a subtle border effect
    const errorBorder = this.add.rectangle(0, 0, 404, 64, 0xFF6B6B);
    const errorBg = this.add.rectangle(0, 0, 400, 60, 0xFFA7A7, 1);
    errorBg.setStrokeStyle(2, 0xFF8888, 1); // Inner stroke slightly lighter

    const errorText = this.add.text(0, 0, 'Posição incorreta!', {
      fontSize: '20px',
      fill: '#800000', // Darker red text for better contrast
      fontFamily: 'font'
    }).setOrigin(0.5);

    this.positionErrorContainer.add([errorBorder, errorBg, errorText]);

    this.tweens.add({
      targets: this.positionErrorContainer,
      alpha: 0,
      y: this.positionErrorContainer.y - 20,
      duration: 500,
      delay: 1500,
      ease: 'Power2',
      onComplete: () => {
        this.positionErrorContainer.destroy();
      }
    });
  }

  showPositionSuccess(gameObject) {
    if (this.positionSuccessContainer) {
      this.positionSuccessContainer.destroy();
    }

    this.positionSuccessContainer = this.add.container(
      this.gameWidth / 2,
      this.gameHeight / 2 + 50
    );

    // Add outer stroke for a subtle border effect
    const successBorder = this.add.rectangle(0, 0, 404, 64, 0x2E8B57);
    const successBg = this.add.rectangle(0, 0, 400, 60, 0x90EE90, 1);
    successBg.setStrokeStyle(2, 0x98FB98, 1); // Inner stroke slightly lighter

    const successText = this.add.text(0, 0, 'Posição correta!', {
      fontSize: '20px',
      fill: '#006400', // Darker green text for better contrast
      fontFamily: 'font'
    }).setOrigin(0.5);

    this.positionSuccessContainer.add([successBorder, successBg, successText]);

    this.tweens.add({
      targets: this.positionSuccessContainer,
      alpha: 0,
      y: this.positionSuccessContainer.y - 20,
      duration: 500,
      delay: 1500,
      ease: 'Power2',
      onComplete: () => this.positionSuccessContainer.destroy()
    });
  }

  showSuccess() {
    if (this.feedbackContainer) {
      this.feedbackContainer.destroy();
    }

    // Create centered overlay
    const overlay = this.add.rectangle(
      this.gameWidth / 2,
      this.gameHeight / 2,
      this.gameWidth,
      this.gameHeight,
      0x000000,
      0.7
    );

    // Create centered container
    this.feedbackContainer = this.add.container(this.gameWidth / 2, this.gameHeight / 2);

    // Create feedback background with proper size
    const feedbackBg = this.add.rectangle(
      0,
      0,
      800,  // Increased width
      200,  // Adjusted height
      0xB600B9,
      0.9
    ).setOrigin(0.5);
    feedbackBg.setStrokeStyle(4, 0xB600B9);

    // Create centered text
    const feedbackText = this.add.text(
      0,
      0,
      this.npcData[this.currentNPC].feedback,
      {
        fontSize: '24px',
        fill: '#FFFFFF',
        align: 'center',
        fontFamily: 'font',
        wordWrap: { width: 750 }  // Adjusted wrap width
      }
    ).setOrigin(0.5);  // This centers the text both horizontally and vertically

    // Add elements to container
    this.feedbackContainer.add([feedbackBg, feedbackText]);

    // Increased display time to 8 seconds
    this.time.delayedCall(8000, () => {
      this.tweens.add({
        targets: [overlay, this.feedbackContainer],
        alpha: 0,
        duration: 500,
        onComplete: () => {
          overlay.destroy();
          this.feedbackContainer.destroy();
          this.scene.switch('VpEstrategiaScene', { showThankYou: true });
        }
      });
    });
  }

  showError(gameObject) {
    if (this.errorContainer) {
      this.errorContainer.destroy(); // Remove qualquer contêiner de erro existente
    }

    // Cria o contêiner de erro
    this.errorContainer = this.add.container(400, 200);

    const errorBg = this.add.rectangle(0, 0, 400, 60, 0xFF0000, 0.2); // Fundo do erro
    errorBg.setStrokeStyle(2, 0xFF0000); // Borda vermelha

    const errorText = this.add.text(0, 0, 'Ordem incorreta! Tente novamente.', {
      fontSize: '20px',
      fill: '#CC0000',
      fontFamily: 'font'
    }).setOrigin(0.5); // Texto centralizado

    this.errorContainer.add([errorBg, errorText]); // Adiciona o fundo e o texto ao contêiner
    this.sound.play('error'); // Toca o som de erro

    // Animação para desaparecer o contêiner de erro após 2 segundos
    this.tweens.add({
      targets: this.errorContainer,
      alpha: 0, // Reduz a opacidade para 0
      y: 180, // Move o contêiner ligeiramente para cima
      duration: 500, // Duração da animação (0.5 segundos)
      delay: 1500, // Espera 1.5 segundos antes de iniciar a animação
      ease: 'Power2', // Tipo de animação
      onComplete: () => {
        this.errorContainer.destroy(); // Remove o contêiner de erro após a animação
      }
    });
  }

  findOverlappingZone(gameObject) {
    return this.dropZones.find(zone => {
      const distance = Phaser.Math.Distance.Between(gameObject.x, gameObject.y, zone.x, zone.y);
      return distance < 50;
    });
  }

  checkCompletion() {
    const allCorrect = this.dragElements.every(element => {
      const dropZone = this.findOverlappingZone(element);
      return dropZone && dropZone.correctIndex === element.originalIndex;
    });

    if (allCorrect) {
      this.showSuccess();
    }
  }
}