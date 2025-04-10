class VpEstrategiaScene extends Phaser.Scene {
  constructor() {
    super({ key: 'VpEstrategiaScene' });
    this.interactionCount = 0; // Contador de interações com minigames
    this.finalInteractionTriggered = false; // Flag para garantir que a interação final seja configurada apenas uma vez
    this.npcInteractionsCount = 0; // Contador para interações com NPCs
    this.finalInteractionComplete = false; // Flag para interação final
    this.sceneTransitions = 0; // Contador de transições
    this.completedMinigames = new Set(); // Rastrear minigames completados
    this.eKeyInteractions = 0; // Contador para interações específicas com a tecla E
    this.interactedWith = {
      npcIdle: false,
      npcIdle2: false,
      npcIdle3: false,
      mug: false,
      mobile: false,
      sheet: false
    };
    this.vivianeInteracted = false;
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
    this.load.spritesheet('npcIdle', '../assets/personagens/skinsPlayer/players/Player4Idle.png', { frameWidth: 16, frameHeight: 32 });
    this.load.image('npcIdle2', '../assets/ana.png');
    this.load.image('npcIdle3', '../assets/mariana.png');
    this.load.image('mug', '../assets/mug.png'); // Adiciona imagem da caneca
    this.load.image('mobile', '../assets/mobile.png'); // Adiciona imagem do celular
    this.load.image('meme_estrategia', '../assets/meme_estrategia.jpg'); // Adiciona imagem do meme
    this.load.image('sheet', '../assets/sheet.png'); // Adiciona imagem da folha
    this.load.image('notes', '../assets/notes.png'); // Adiciona imagem das anotações
    this.load.image('levelTitle', '../assets/titulos/tituloVpEstrategias.png') // Carrega os asssets do titulo da fase
    this.load.image('arrow', '../assets/seta.png');
  }

  init(data) {
    this.showThankYou = data && data.showThankYou;

    // Verifica se está retornando de um minigame
    if (data && data.showThankYou) {
      this.interactionCount++;

      // Se completou todos os 3 minigames, configura a interação final
      if (this.interactionCount === 3 && !this.finalInteractionTriggered) {
        this.finalInteractionTriggered = true; // Garante que a interação final seja configurada apenas uma vez
        this.setupFinalInteraction();
      }
    }
  }

  setupFinalInteraction() {
    // Cria a exclamação para a NPC principal
    const finalExclamation = this.physics.add.sprite(this.npc.x, this.npc.y - 80, "indicator").setScale(0.3);
    finalExclamation.play("exclaiming");
    finalExclamation.setImmovable(true);

    // Configura o overlap para a interação final
    this.physics.add.overlap(this.player, finalExclamation, () => {
      if (!this.activeDialogue) {
        this.startDialogue([
          "Parabéns! Você fez um excelente trabalho!",
          "Ajudou nossos três talentos a planejarem suas carreiras.",
          "Isso prova que você tem visão estratégica e sabe orientar pessoas.",
          "Você está aprovado(a) para o programa!",
          "Vamos crescer juntos aqui na Vivo!",
          "Aguarde mais informações por e-mail.",
          "Até breve!"
        ], this.npc);

        finalExclamation.destroy(); // Remove a exclamação após a interação
      }
    });
  }

  create() {
    this.add.rectangle(width - 2000, height - 2000, width, height, 0x2F052F).setOrigin(0).setScale(5); // Adiciona um retangulo de fundo

    // Inicializa a variável de controle
    this.npcInteractionComplete = false;

    const startTime = VpEstrategiaScene.lastMusicTime || 0; // Recupera o tempo salvo da música ou inicia do início
    this.strategyMusic = this.sound.add("strategyMusic", { loop: true }); // Adiciona a música de fundo com loop
    this.strategyMusic.play({ seek: startTime }); // Toca a música a partir do tempo salvo

    const map = this.make.tilemap({ key: "map_estrategia", tileWidth: 25, tileHeight: 20 }); // Cria o mapa 
    const tilesetDecoracao = map.addTilesetImage("decoracao"); // Adiciona o tileset de decoração
    const tilesetParedes = map.addTilesetImage("paredes"); // Adiciona o tileset de paredes
    const tilesetPersonalizado = map.addTilesetImage("personalizado_vivo"); // Adiciona o tileset personalizado

    const offsetX = width - 1270; // Define a posição x para as camadas
    const layerChao = map.createLayer("chao", tilesetParedes, offsetX, 0).setScale(2.5); // Cria a camada de chão e ajusta o tamanho
    const layerParede = map.createLayer("parede", tilesetParedes, offsetX, 0).setScale(2.5); // Cria a camada de paredes e ajusta o tamanho
    const layerPortaElevador = map.createLayer("porta_elevador", tilesetDecoracao, offsetX, 0).setScale(2.5); // Cria a camada de porta do elevador e ajusta o tamanho
    const layerDecoracaoComBarreiras = map.createLayer("decoracao_com_barreiras", tilesetDecoracao, offsetX, 0).setScale(2.5); // Cria a camada de decoração com barreiras e ajusta o tamanho
    const layerDecoracaoSemBarreiras = map.createLayer("decoracao_sem_barreiras", tilesetDecoracao, offsetX, 0).setScale(2.5); // Cria a camada de decoração sem barreiras e ajusta o tamanho
    const layerPersonalizadoSemBarreiras = map.createLayer("personalizado_vivo_Sem_barreiras", tilesetPersonalizado, offsetX, 0).setScale(2.5); // Cria a camada personalizada sem barreiras e ajusta o tamanho

    [layerChao, layerParede, layerPortaElevador, layerDecoracaoComBarreiras, layerDecoracaoSemBarreiras, layerPersonalizadoSemBarreiras].forEach(layer => {
      layer.setCollisionByProperty({ collider: true }); // Define colisões para as camadas com a propriedade "collider"
    });

    this.createPlayer(width, height); // Cria o jogador na cena
    this.createPlayerAnimations(); // Cria as animações do jogador

    this.physics.add.collider(this.player, layerParede); // Colisão do jogador com a camada de paredes
    this.physics.add.collider(this.player, layerDecoracaoComBarreiras); // Colisão do jogador com a camada de decoração com barreiras
    this.physics.add.collider(this.player, layerDecoracaoSemBarreiras); // Colisão do jogador com a camada de decoração sem barreira

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
    } // Animação da exclamação

    this.keys = this.input.keyboard.addKeys({ // Configuração do teclado
      up: Phaser.Input.Keyboard.KeyCodes.W, // Tecla W para mover para cima
      down: Phaser.Input.Keyboard.KeyCodes.S, // Tecla S para mover para baixo
      left: Phaser.Input.Keyboard.KeyCodes.A, // Tecla A para mover para a esquerda
      right: Phaser.Input.Keyboard.KeyCodes.D, // Tecla D para mover para a direita
      interagir: Phaser.Input.Keyboard.KeyCodes.E, // Tecla E para interagir
      ENTER: Phaser.Input.Keyboard.KeyCodes.ENTER // Tecla Enter para avançar diálogos
    });

    this.keyEnter = this.add.image(0, 0, 'keyEnter').setScale(0.1);
    this.keyEnter.setVisible(false); // Inicialmente oculta a imagem da tecla Enter

    this.exclamation = this.physics.add.sprite(this.npc.x, this.npc.y - 80, "indicator").setScale(0.2);
    this.exclamation.play("exclaiming"); // Reproduz a animação da exclamação
    this.exclamation.setImmovable(true); // Define que a exclamação não pode ser movida
    this.arrow = this.add.image(this.cameras.main.width / 2, 335, "arrow")
    .setScale(0.5)
    .setOrigin(0.5, 0.5)
    .setDepth(1000);
    this.arrow.setScrollFactor(0); // Fixa a seta na tela
  
  
    this.physics.add.overlap(this.player, this.exclamation, () => {
      if (!this.activeDialogue && !this.vivianeInteracted) {
        this.exclamation.setVisible(false); // Remove a exclamação
        this.keyEMain.setVisible(true);     // Mostra a tecla E
    
        if (this.keys.interagir.isDown) {
          this.keyEMain.setVisible(false); // Esconde a tecla E após interação
          this.vivianeInteracted = true;   // Marca que já interagiu
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
            "Ajude três talentos a escolherem seus próximos passos de carreira.",
            "Faça isso o mais rápido possível!",
            "Siga as exclamações para ajudá-los.",
            "Não esqueça de coletar os mimos que eles te oferecerão em agradecimento. :)"
          ], this.npc);
          this.exclamation.destroy();
        }
      }
    });

    if (!this.anims.exists('npc_idle')) {
      this.anims.create({
        key: 'npc_idle',
        frames: this.anims.generateFrameNumbers('npcIdle', { start: 18, end: 23 }), // Corrigido frames para animação npcIdle
        frameRate: 5, // Taxa de quadros por segundo
        repeat: -1 // Faz a animação repetir indefinidamente
      });
    }

    this.npcIdle = this.physics.add.sprite(this.npc.x + 200, this.npc.y + 30, 'npcIdle'); // Adiciona o NPC na cena
    this.npcIdle.setScale(2.5); // Ajusta o tamanho do NPC
    this.npcIdle.play('npc_idle'); // Reproduz a animação IDLE
    this.npcIdle.body.immovable = true; // Faz o NPC ficar parado

    // Cria npcIdle2
    this.npcIdle2 = this.physics.add.sprite(this.npc.x + 380, this.npc.y + 350, 'npcIdle2');
    this.npcIdle2.setScale(0.1);
    this.npcIdle2.body.immovable = true;

    // Cria npcIdle3
    this.npcIdle3 = this.physics.add.sprite(this.npc.x - 310, this.npc.y + 295, 'npcIdle3');
    this.npcIdle3.setScale(0.1);
    this.npcIdle3.body.immovable = true;

    // Adiciona colisões para os novos NPCs
    this.physics.add.collider(this.player, this.npcIdle2);
    this.physics.add.collider(this.player, this.npcIdle); // Adiciona colisão para npcIdle
    this.physics.add.collider(this.player, this.npcIdle3); // Adiciona colisão para npcIdle3

    // Mostra diálogo "Obrigado!" imediatamente após retornar do minigame
    if (this.showThankYou) {
      this.time.delayedCall(500, () => {
        this.startDialogue(["Obrigado!"], this.npcIdle); // Dispara diálogo
      });
    }

    this.keyEnterIdle = this.add.image(this.npcIdle.x - 50, this.npcIdle.y - 100, 'keyEnter').setScale(0.1);
    this.keyEnterIdle.setVisible(false); // Deixa a tecla Enter invisível inicialmente

    this.keyEnterIdle2 = this.add.image(this.npcIdle2.x - 50, this.npcIdle2.y - 100, 'keyEnter').setScale(0.1);
    this.keyEnterIdle2.setVisible(false);

    this.keyEnterIdle3 = this.add.image(this.npcIdle3.x - 50, this.npcIdle3.y - 100, 'keyEnter').setScale(0.1);
    this.keyEnterIdle3.setVisible(false);

    this.physics.add.collider(this.player, this.npcIdle); // Adiciona colisão entre o jogador e o NPC

    this.soundWalk = this.sound.add('walkSound', { loop: false, volume: 2 }); // Adiciona o som de passos com volume ajustado

    this.activeDialogue = false; // Define o estado inicial do diálogo como inativo

    // Adiciona a exclamação e tecla Enter ao npcIdle
    this.exclamationIdle = this.physics.add.sprite(this.npcIdle.x, this.npcIdle.y - 80, "indicator").setScale(0.2);
    this.exclamationIdle.play("exclaiming");
    this.exclamationIdle.setImmovable(true);
    this.exclamationIdle.setVisible(false); // Deixa a exclamação invisível inicialmente

    this.exclamationIdle2 = this.physics.add.sprite(this.npcIdle2.x, this.npcIdle2.y - 80, "indicator").setScale(0.2);
    this.exclamationIdle2.play("exclaiming");
    this.exclamationIdle2.setImmovable(true);
    this.exclamationIdle2.setVisible(false);

    this.exclamationIdle3 = this.physics.add.sprite(this.npcIdle3.x, this.npcIdle3.y - 80, "indicator").setScale(0.2);
    this.exclamationIdle3.play("exclaiming");
    this.exclamationIdle3.setImmovable(true);
    this.exclamationIdle3.setVisible(false);

    // Adiciona as imagens da tecla E para cada NPC (ajustando posição Y)
    this.keyEMain = this.add.image(this.npc.x, this.npc.y - 50, 'keyE').setScale(0.05); // Alterado de 0.2 para 0.1
    this.keyEMain.setVisible(false);

    this.keyEIdle = this.add.image(this.npcIdle.x, this.npcIdle.y - 50, 'keyE').setScale(0.05); // Alterado de 0.2 para 0.1
    this.keyEIdle.setVisible(false);

    this.keyEIdle2 = this.add.image(this.npcIdle2.x, this.npcIdle2.y - 50, 'keyE').setScale(0.05); // Alterado de 0.2 para 0.1
    this.keyEIdle2.setVisible(false);

    this.keyEIdle3 = this.add.image(this.npcIdle3.x, this.npcIdle3.y - 50, 'keyE').setScale(0.05); // Alterado de 0.2 para 0.1
    this.keyEIdle3.setVisible(false);

    // Cria contêiner da caneca com exclamação e tecla E
    this.mugContainer = this.add.container(this.npcIdle.x + 50, this.npcIdle.y);

    this.mugSprite = this.add.image(0, 0, 'mug')
      .setScale(1)
      .setVisible(false);

    this.mugExclamation = this.physics.add.sprite(0, -40, "indicator")
      .setScale(0.15)
      .setVisible(false);

    this.keyEMug = this.add.image(0, -60, 'keyE').setScale(0.05); // Alterado de 0.2 para 0.1
    this.keyEMug.setVisible(false);

    this.mugContainer.add([this.mugSprite, this.mugExclamation, this.keyEMug]);

    // Adiciona interação com a caneca
    this.input.keyboard.on('keydown-E', () => {
      if (this.mugSprite.visible && !this.activeDialogue && !this.interactedWith.mug) {
        const distanceMug = Phaser.Math.Distance.Between(
          this.player.x, this.player.y,
          this.mugContainer.x, this.mugContainer.y
        );

        if (distanceMug < 100) {
          this.interactedWith.mug = true;
          this.eKeyInteractions++;
          this.checkCompletionDialogue();
          this.keyEMug.destroy(); // Esconde a tecla E após a interação
          this.exclamationIdle2.setVisible(true);
          
          const overlay = this.add.rectangle(
            0, 0,
            this.cameras.main.width * 2,
            this.cameras.main.height * 2,
            0x000000, 0.5
          );

          const messageContainer = this.add.container(this.cameras.main.width / 2, this.cameras.main.height / 2);
          messageContainer.setScrollFactor(0); // Fixa na tela

          // Alterada posição Y de -120 para -80 para mover o ícone da caneca mais baixo
          const mugIcon = this.add.image(0, -80, 'mug')
            .setScale(2.5);

          // Adiciona fundo
          const messageBg = this.add.rectangle(0, 50, 550, 100, 0xB600B9, 0.9)
            .setOrigin(0.5);
          messageBg.setStrokeStyle(4, 0xB600B9);

          // Adiciona texto mais curto
          const messageText = this.add.text(0, 50,
            "Você tomou o café da gratidão! Estava delicioso.", {
            fontSize: '18px',
            fill: '#000000',
            align: 'center'
          }).setOrigin(0.5);

          messageContainer.add([mugIcon, messageBg, messageText]);

          // Remove mensagem e sobreposição após 4 segundos
          this.time.delayedCall(4000, () => {
            overlay.destroy();
            messageContainer.destroy();
          });

          this.mugExclamation.destroy();
          this.keyEMug.setVisible(false);
        }
      }
    });

    // Cria contêiner do celular com exclamação e tecla E
    this.mobileContainer = this.add.container(this.npcIdle2.x + 50, this.npcIdle2.y);

    this.mobileSprite = this.add.image(0, 0, 'mobile')
      .setScale(0.1)
      .setVisible(false);

    this.mobileExclamation = this.physics.add.sprite(0, -40, "indicator")
      .setScale(0.15)
      .setVisible(false);

    this.keyEMobile = this.add.image(0, -60, 'keyE').setScale(0.05); // Alterado de 0.2 para 0.1
    this.keyEMobile.setVisible(false);

    this.mobileContainer.add([this.mobileSprite, this.mobileExclamation, this.keyEMobile]);

    // Adiciona interação com o celular
    this.input.keyboard.on('keydown-E', () => {
      if (this.mobileSprite.visible && !this.activeDialogue && !this.interactedWith.mobile) {
        const distanceMobile = Phaser.Math.Distance.Between(
          this.player.x, this.player.y,
          this.mobileContainer.x, this.mobileContainer.y
        );

        if (distanceMobile < 100) {
          this.interactedWith.mobile = true;
          this.eKeyInteractions++;
          this.checkCompletionDialogue();
          this.keyEMobile.setVisible(false);
          this.keyEMobile.destroy(); // <- DESTRUIÇÃO DA TECLA E
          this.exclamationIdle3.setVisible(true); // <- ATIVA EXCLAMAÇÃO DA MARIANA
          const overlay = this.add.rectangle(
            0, 0,
            this.cameras.main.width * 2,
            this.cameras.main.height * 2,
            0x000000, 0.5
          );

          const messageContainer = this.add.container(this.cameras.main.width / 2, this.cameras.main.height / 2);
          messageContainer.setScrollFactor(0);

          const memeIcon = this.add.image(0, -80, 'meme_estrategia')
            .setScale(0.3);

          // Cria texto primeiro para obter seus limites
          const messageText = this.add.text(0, 50,
            "Você recebeu um meme da Ana! Riram bastante e isso melhorou o dia de trabalho em 100%.", {
            fontSize: '15px',
            fill: '#000000',
            align: 'center',
            wordWrap: { width: 400 }
          }).setOrigin(0.5);

          // Obtém limites do texto para dimensionar fundo
          const textBounds = messageText.getBounds();

          // Cria fundo que corresponde exatamente ao tamanho do texto
          const messageBg = this.add.rectangle(0, 50, textBounds.width + 20, textBounds.height + 10, 0xB600B9, 0.9)
            .setOrigin(0.5);
          messageBg.setStrokeStyle(2, 0xB600B9);

          messageContainer.add([memeIcon, messageBg, messageText]);

          this.time.delayedCall(4000, () => {
            overlay.destroy();
            messageContainer.destroy();
          });

          this.mobileExclamation.destroy();
          this.keyEMobile.setVisible(false);
        }
      }
    });

    // Cria contêiner da folha com exclamação e tecla E
    this.sheetContainer = this.add.container(this.npcIdle3.x + 50, this.npcIdle3.y);

    this.sheetSprite = this.add.image(0, 0, 'sheet')
      .setScale(0.1)
      .setVisible(false);

    this.sheetExclamation = this.physics.add.sprite(0, -40, "indicator")
      .setScale(0.15)
      .setVisible(false);

    this.keyESheet = this.add.image(0, -60, 'keyE').setScale(0.05); // Alterado de 0.2 para 0.1
    this.keyESheet.setVisible(false);

    this.sheetContainer.add([this.sheetSprite, this.sheetExclamation, this.keyESheet]);

    // Adiciona interação com a folha
    this.input.keyboard.on('keydown-E', () => {
      if (this.sheetSprite.visible && !this.activeDialogue && !this.interactedWith.sheet) {
        const distanceSheet = Phaser.Math.Distance.Between(
          this.player.x, this.player.y,
          this.sheetContainer.x, this.sheetContainer.y
        );

        if (distanceSheet < 100) {
          this.interactedWith.sheet = true;
          this.eKeyInteractions++;
          this.checkCompletionDialogue();
          this.keyESheet.setVisible(false);
          this.keyESheet.destroy(); // remove a tecla E após interação
          const overlay = this.add.rectangle(
            0, 0,
            this.cameras.main.width * 2,
            this.cameras.main.height * 2,
            0x000000, 0.5
          );

          const messageContainer = this.add.container(this.cameras.main.width / 2, this.cameras.main.height / 2);
          messageContainer.setScrollFactor(0);

          const notesIcon = this.add.image(0, 0, 'notes') // Alterado Y de -80 para 0 e adicionado setOrigin para centralização perfeita
            .setScale(0.5)
            .setOrigin(0.5);

          messageContainer.add([notesIcon]);

          // Remove mensagem e sobreposição após 5 segundos
          this.time.delayedCall(5000, () => {
            overlay.destroy();
            messageContainer.destroy();
          });

          this.sheetExclamation.destroy();
          this.keyESheet.setVisible(false);
        }
      }
    });

    // Interação com o npcIdle
    this.physics.add.overlap(this.player, this.exclamationIdle, () => {
      if (!this.npcInteractionComplete || this.activeDialogue || this.interactedWith.npcIdle) return;
    
      // Quando o jogador se aproxima, remove a exclamação e mostra a tecla E
      this.exclamationIdle.setVisible(false);
      this.keyEIdle.setVisible(true);
    
      if (this.keys.interagir.isDown) {
        this.keyEIdle.destroy(); // Destrói a tecla E
        this.interactedWith.npcIdle = true;
        this.eKeyInteractions++;
        this.checkCompletionDialogue();
    
        this.startDialogue([
          `E aí, ${playerName}!`,
          'Sou o Carlos do time comercial.',
          'Tenho vontade de virar gestor, mas não sei qual o caminho certo aqui na Vivo.',
          'Você entende como funciona Carreira em Y? Pode me dar uma força?'
        ], this.npcIdle);
    
        this.exclamationIdle.destroy(); // Remove a exclamação após a interação
      }
    });

    // Interação com o npcIdle2
    this.physics.add.overlap(this.player, this.exclamationIdle2, () => {
      if (!this.npcInteractionComplete || this.activeDialogue || this.interactedWith.npcIdle2) return;
    
      // Quando o jogador se aproxima, remove a exclamação e mostra a tecla E
      this.exclamationIdle2.setVisible(false);
      this.keyEIdle2.setVisible(true);
    
      if (this.keys.interagir.isDown) {
        this.keyEIdle2.destroy(); // Remove a tecla E
        this.interactedWith.npcIdle2 = true;
        this.eKeyInteractions++;
        this.checkCompletionDialogue();
    
        this.startDialogue([
          'Oi! Eu sou a Ana.',
          'Trabalho com desenvolvimento aqui na Vivo.',
          'Adoro programar, mas estou meio perdida...',
          'Será que você pode me ajudar a entender como crescer na área técnica?',
          'Quero virar especialista, mas não sei por onde começar!'
        ], this.npcIdle2);
    
        this.exclamationIdle2.destroy(); // Remove a exclamação
      }
    });

    // Interação com o npcIdle3
    this.physics.add.overlap(this.player, this.exclamationIdle3, () => {
      if (!this.npcInteractionComplete || this.activeDialogue || this.interactedWith.npcIdle3) return;
    
      this.exclamationIdle3.setVisible(false); // Some com o indicador ao chegar perto
      this.keyEIdle3.setVisible(true); // Mostra a tecla E
    
      if (this.keys.interagir.isDown) {
        this.keyEIdle3.destroy(); // Remove a tecla E
        this.interactedWith.npcIdle3 = true;
        this.eKeyInteractions++;
        this.checkCompletionDialogue();
    
        this.startDialogue([
          `Oi, ${playerName}! Eu sou a Mariana, trabalho no SAC.`,
          'Estou em dúvida sobre minha próxima certificação.',
          'Aqui na Vivo dá pra crescer e ganhar benefícios melhores,',
          'mas eu não entendo direito como funciona.',
          'Você pode me mostrar a ordem das coisas?'
        ], this.npcIdle3);
    
        this.exclamationIdle3.destroy(); // Remove a exclamação
      }
    });

    // Se já completou os 3 minigames, configura a interação final imediatamente
    if (this.interactionCount === 3 && !this.finalInteractionTriggered) {
      this.finalInteractionTriggered = true;
      this.setupFinalInteraction();
    }

    // Dá zoom na tela do jogo e faz a câmera seguir o personagem
    this.cameras.main.startFollow(this.player); // Faz a câmera seguir o jogador
    this.cameras.main.setZoom(2); // Define o nível de zoom da câmera

    this.barrierDoor = this.add.rectangle(width - 800, height - 720, 20, 20, 0x2F052F).setOrigin(0); // Adiciona um retângulo como barreira
    this.physics.add.existing(this.barrierDoor, true); // Ativa a física do retângulo
    this.physics.add.collider(this.player, this.barrierDoor); // Adiciona colisão entre o jogador e a barreira
    this.barrierDoor.setVisible(false); // Torna o retângulo invisível

    this.showTitle(); // Exibe o titulo da fase
  }

  update() {
    this.movePlayer(); // Atualiza o movimento do jogador

    // Verifica distância para cada NPC e mostra/esconde tecla E
    const distanceMain = Phaser.Math.Distance.Between(
      this.player.x, this.player.y,
      this.npc.x, this.npc.y
    );
    this.keyEMain.setVisible(distanceMain < 100 && !this.vivianeInteracted);

    const distanceIdle = Phaser.Math.Distance.Between(
      this.player.x, this.player.y,
      this.npcIdle.x, this.npcIdle.y
    );
    this.keyEIdle.setVisible(distanceIdle < 100 && this.npcInteractionComplete);

    const distanceIdle2 = Phaser.Math.Distance.Between(
      this.player.x, this.player.y,
      this.npcIdle2.x, this.npcIdle2.y
    );
    this.keyEIdle2.setVisible(distanceIdle2 < 100 && this.npcInteractionComplete);

    const distanceIdle3 = Phaser.Math.Distance.Between(
      this.player.x, this.player.y,
      this.npcIdle3.x, this.npcIdle3.y
    );
    this.keyEIdle3.setVisible(distanceIdle3 < 100 && this.npcInteractionComplete);

    // Verifica distância para a caneca e mostra/esconde tecla E
    if (this.mugSprite.visible) {
      const distanceMug = Phaser.Math.Distance.Between(
        this.player.x, this.player.y,
        this.mugContainer.x, this.mugContainer.y
      );
      this.keyEMug.setVisible(distanceMug < 100);
    }

    // Verifica distância para o celular e mostra/esconde tecla E
    if (this.mobileSprite.visible) {
      const distanceMobile = Phaser.Math.Distance.Between(
        this.player.x, this.player.y,
        this.mobileContainer.x, this.mobileContainer.y
      );
    
      if (distanceMobile < 100 && this.mobileExclamation.visible) {
        this.mobileExclamation.setVisible(false);
        this.keyEMobile.setVisible(true);
      }
    
      if (distanceMobile >= 100) {
        this.keyEMobile.setVisible(false);
      }
    }

    // Verifica distância para a folha e mostra/esconde tecla E
    if (this.sheetSprite.visible) {
      const distanceSheet = Phaser.Math.Distance.Between(
        this.player.x, this.player.y,
        this.sheetContainer.x, this.sheetContainer.y
      );
    
      if (distanceSheet < 100 && this.sheetExclamation.visible) {
        this.sheetExclamation.setVisible(false);
        this.keyESheet.setVisible(true);
      }
    
      if (distanceSheet >= 100) {
        this.keyESheet.setVisible(false);
      }
    }
    this.updateArrowToNearestIndicator();

    if (this.finalExclamation && this.finalExclamation.active) {
      const distanceFinal = Phaser.Math.Distance.Between(
        this.player.x, this.player.y,
        this.finalExclamation.x, this.finalExclamation.y
      );
    
      if (distanceFinal < 100) {
        this.finalExclamation.destroy(); // Remove o indicador
        this.keyEFinal.setVisible(true); // Mostra a tecla E
      }
    }
    
    if (this.keyEFinal && this.keyEFinal.visible && this.keys.interagir.isDown && !this.activeDialogue) {
      this.keyEFinal.destroy(); // Remove a tecla E
    
      // Cria o diálogo final
      const balloonX = this.npc.x + 90;
      const balloonY = this.npc.y - 100;
      const textY = this.npc.y - 120;
    
      const balloonText = this.add.image(balloonX, balloonY, "balloonText")
        .setOrigin(0.5)
        .setScale(1);
    
      const text = this.add.text(balloonX, textY,
        "Parabéns! Fase VP de Estratégia concluída!", {
        fontSize: "16px",
        fill: "#000000",
        wordWrap: { width: balloonText.width - 20 },
        align: "center"
      }).setOrigin(0.5);
    
      const enterKey = this.add.image(
        balloonX + balloonText.width / 2 - 207,
        balloonY + 20,
        'keyEnter'
      ).setScale(0.1);
    
      const removeDialogue = () => {
        balloonText.destroy();
        text.destroy();
        enterKey.destroy();
        this.input.keyboard.off('keydown-ENTER', removeDialogue);
        this.createButtonBack(width, height);
      };
    
      this.input.keyboard.on('keydown-ENTER', removeDialogue);
    }

    // Verifica distância para a caneca e controla exibição
    if (
      this.mugSprite.visible &&
      this.mugExclamation &&
      this.mugExclamation.active &&
      !this.interactedWith.mug
    ) {
      const distanceMug = Phaser.Math.Distance.Between(
        this.player.x, this.player.y,
        this.mugContainer.x, this.mugContainer.y
      );
    
      if (distanceMug < 100) {
        this.mugExclamation.destroy(); // Remove o indicador
        this.keyEMug.setVisible(true); // Mostra a tecla E (que será destruída depois)
      }
    }
  }

  showTitle() {
    const titleImage = this.add.image(this.player.x, this.player.y - 130, 'levelTitle').setDepth(1000); // Adiciona a imagem de parabéns acima do jogador e define sua profundidade para garantir que fique acima de outros elementos
    titleImage.setScale(0.3); // Ajusta o tamanho da imagem de parabéns
  }

  startDialogue(speechNpc, npc) {
    if (!npc) {
      console.error("NPC não definido ao iniciar o diálogo.");
      return;
    }

    this.activeDialogue = true;
    let indexCurrentSpeech = 0;

    // Configurações específicas de balão para cada NPC
    let balloonX = npc.x + 90;
    let balloonY = npc.y - 100;
    let textY = npc.y - 120;

    // Ajustes específicos para cada NPC
    if (npc === this.npcIdle) {
      balloonX = npc.x + 80;
      balloonY = npc.y - 90;
      textY = npc.y - 110;
    } else if (npc === this.npcIdle2) {
      balloonX = npc.x + 80;
      balloonY = npc.y - 90;
      textY = npc.y - 110;
    } else if (npc === this.npcIdle3) {
      balloonX = npc.x + 80;
      balloonY = npc.y - 90;
      textY = npc.y - 110;
    }

    // Cria o balão de fala
    const balloonText = this.add.image(balloonX, balloonY, "balloonText")
      .setOrigin(0.5)
      .setScale(1);

    // Adiciona tecla ENTER ao lado direito do balão
    const enterKey = this.add.image(
      balloonX + balloonText.width / 2 - 207,
      balloonY + 20,
      'keyEnter'
    ).setScale(0.1);

    const text = this.add.text(balloonX, textY, speechNpc[indexCurrentSpeech], {
      fontSize: "16px",
      fill: "#000000",
      wordWrap: { width: balloonText.width - 20 },
      align: "center"
    }).setOrigin(0.5);

    const nextSpeech = () => {
      indexCurrentSpeech++;
      if (indexCurrentSpeech < speechNpc.length) {
        text.setText(speechNpc[indexCurrentSpeech]);
      } else {
        balloonText.destroy();
        text.destroy();
        enterKey.destroy(); // Remove a tecla ENTER junto com o balão
        this.input.keyboard.off("keydown-ENTER", nextSpeech);
        this.activeDialogue = false;

        if (npc === this.npc) {
          this.exclamationIdle.setVisible(true);
          this.npcInteractionComplete = true;
        } else {
          if (npc === this.npcIdle) {
            // Mostra caneca e sua exclamação
            this.mugContainer.setPosition(this.player.x, this.player.y);
            this.mugSprite.setVisible(true);
            this.mugExclamation.setVisible(true);
            this.mugExclamation.play("exclaiming");
            this.scene.switch('minigameEstrategiaCarlos');
          } else if (npc === this.npcIdle2) {
            // Posiciona o mobile na posição do player
            this.mobileContainer.setPosition(this.player.x, this.player.y);
            this.mobileSprite.setVisible(true);
            this.mobileExclamation.setVisible(true);
            this.mobileExclamation.play("exclaiming");
            this.scene.switch('minigameEstrategiaAna');
           } else if (npc === this.npcIdle3) {
            // Posiciona a folha na posição atual do player
            this.sheetContainer.setPosition(this.player.x, this.player.y);
            this.sheetSprite.setVisible(true);
            this.sheetExclamation.setVisible(true);
            this.sheetExclamation.play("exclaiming");
            this.scene.switch('minigameEstrategiaMariana');
          }
        }
      }
    };

    this.input.keyboard.on("keydown-ENTER", nextSpeech);
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
      this.soundWalk.stop(); // Para o som de passos
    } else {
      if (!this.soundWalk.isPlaying) { // Verifica se o som de passos não está tocando
        this.soundWalk.play(); // Reproduz o som de passos
      }
    }
  }
  updateArrowToNearestIndicator() {
    if (!this.arrow || !this.player) return;
  
    const indicators = [
      this.exclamation,
      this.exclamationIdle,
      this.exclamationIdle2,
      this.exclamationIdle3,
      this.mugExclamation,
      this.mobileExclamation,
      this.sheetExclamation
    ].filter(ind => ind && ind.visible && ind.active);
  
    if (indicators.length === 0) {
      this.arrow.setVisible(false);
      return;
    }
  
    this.arrow.setVisible(true);
  
    const nearestIndicator = indicators.reduce((closest, current) => {
      const distCurrent = Phaser.Math.Distance.Between(this.player.x, this.player.y, current.x, current.y);
      const distClosest = Phaser.Math.Distance.Between(this.player.x, this.player.y, closest.x, closest.y);
      return distCurrent < distClosest ? current : closest;
    });
  
    let targetX = nearestIndicator.x;
    let targetY = nearestIndicator.y;
  
    // Corrigir posição se estiver dentro de container
    if (nearestIndicator.parentContainer) {
      targetX += nearestIndicator.parentContainer.x;
      targetY += nearestIndicator.parentContainer.y;
    }
  
    const angle = Phaser.Math.Angle.Between(this.player.x, this.player.y, targetX, targetY);
    this.arrow.setRotation(angle + Math.PI);
  }
  
  
  
  createPlayer(width, height) {
    this.player = this.physics.add.sprite(width - 790, height - 660, 'player'); // Adiciona o sprite do jogador na posição especificada
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
    const exclamation = this.physics.add.sprite(width - 800, height - 700, "indicator");
    exclamation.play("exclaiming"); // Reproduz a animação de exclamação
    exclamation.setScale(0.2);
    exclamation.setImmovable(true); // Evita que o objeto se mova com colisões

    // Adiciona o overlap entre player e exclamation
    this.physics.add.overlap(this.player, exclamation, () => {
      // Lógica de troca de cena
      this.sound.stopAll();
  
      this.registry.set('vpEstrategiaConcluida', true);
      const elevadorScene = this.scene.get("elevadorScene");
      elevadorScene.resumeFromStrategies = true;
  
      this.scene.stop("VpEstrategiaScene");
      this.scene.resume("elevadorScene");
    }, null, this);
  }

  checkCompletionDialogue() {
    console.log("Interações com a tecla E:", this.eKeyInteractions);
    console.log("Interagiu com:", this.interactedWith);
  
    if (this.eKeyInteractions === 6 && !this.finalInteractionComplete) {
      this.finalInteractionComplete = true;
  
      // Cria exclamação acima da NPC
      this.finalExclamation = this.physics.add.sprite(this.npc.x, this.npc.y - 80, "indicator")
        .setScale(0.2);
      this.finalExclamation.play("exclaiming");
      this.finalExclamation.setImmovable(true);
  
      // Cria tecla E (oculta inicialmente)
      this.keyEFinal = this.add.image(this.npc.x, this.npc.y - 50, 'keyE')
        .setScale(0.05)
        .setVisible(false);
    }
  }
}

// Propriedade estática para armazenar o tempo de reprodução da música
VpEstrategiaScene.lastMusicTime = 0;

class minigameEstrategiaCarlos extends Phaser.Scene {
  constructor() {
    super({ key: "minigameEstrategiaCarlos" });
    this.currentNPC = 0; // 
    this.npcData = [
      {
        name: 'Carlos',
        elements: [
          { text: 'Entrar como Analista Comercial', color: 0x000000 },
          { text: 'Virar Coordenador de Vendas', color: 0x000000 },
          { text: 'Fazer treinamento de liderança', color: 0x000000 },
          { text: 'Virar Gerente (Carreira em Y)', color: 0x000000 }
        ],
        feedback: 'Certíssimo! Este é o caminho do líder na Vivo: Analista → Coordenador → Gerente. Você ganha bônus por resultados (PLR) e acesso a treinamentos exclusivos para crescer na empresa. Carlos está muito agradecido! Por isso, ele disse que quer te pagar um café. COLETE O CAFÉ OFERECIDO POR SEU AMIGO CARLOS! Parabéns por ajudá-lo no seu planejamento de carreira!'
      }
    ];
  }

  preload() {
    this.load.audio('success', '../assets/sounds/success.mp3');
    this.load.audio('error', '../assets/sounds/error.mp3');
    this.load.image('background', '../assets/background_vpestrategia_minigame.png');
    this.load.image('arrow', '../assets/arrow.png');
  }

  create() {
    // Dimensões do jogo
    this.gameWidth = this.cameras.main.width;
    this.gameHeight = this.cameras.main.height;
    this.createGameElements();
  }

  createGameElements() {
    // Imagem de fundo
    this.add.image(this.gameWidth / 2, this.gameHeight / 2, 'background')
      .setDisplaySize(this.gameWidth, this.gameHeight)
      .setOrigin(0.5);

    // Colocar branco com opacidade de 50%
    this.add.rectangle(
      this.gameWidth / 2,
      this.gameHeight / 2,
      this.gameWidth,
      this.gameHeight,
      0xFFFFFF,
      0.5
    );

    const currentNPCData = this.npcData[this.currentNPC];

    // Cabeçalho no centro
    const headerBg = this.add.rectangle(this.gameWidth / 2, 80, this.gameWidth * 0.8, 120, 0x000000, 0.1);

    this.add.text(this.gameWidth / 2, 90, `Organize a carreira de ${currentNPCData.name}`, {
      fontSize: '32px',
      fill: '#000000',
      fontStyle: 'bold',
      fontFamily: 'font'
    }).setOrigin(0.5);

    // Instruções centralizadas
    this.add.text(this.gameWidth / 2, 160, 'Carlos precisa de sua ajuda! Clique e arraste os elementos na ordem correta do início ao fim da carreira.', {
      fontSize: '29px',
      fill: '#000000',
      fontFamily: 'font'
    }).setOrigin(0.5);

    // Drop zones do minigame centralizadas
    this.dropZones = [];
    const zoneWidth = 200;
    const totalWidth = zoneWidth * 4;
    const spacing = 50;
    const startX = (this.gameWidth - (totalWidth + spacing * 3)) / 2;

    for (let i = 0; i < 4; i++) {
      const x = startX + (zoneWidth + spacing) * i + zoneWidth / 2;
      const y = this.gameHeight / 2 - 50;

      if (i < 3) {
        const arrow = this.add.image(x + zoneWidth / 2 + spacing / 2, y, 'arrow')
          .setScale(0.4)
          .setFlipX(true); // Add flip
        arrow.setTint(0x000000);
      }

      // Efeito de produndidade
      const shadowZone = this.add.rectangle(x + 4, y + 4, zoneWidth, 120, 0x000000, 0.2);
      const baseZone = this.add.rectangle(x, y, zoneWidth, 120, 0xE6B3FF, 0.3); // Roxo claro base
      const zone = this.add.rectangle(x, y, zoneWidth, 120, 0xE6B3FF, 0.8); // Roxo claro top

      // Sombra
      zone.setStrokeStyle(2, 0x000000, 0.2);
      zone.setInteractive();
      zone.correctIndex = i;

      // Profundidade com gradiente
      const gradient = this.add.rectangle(x, y + 2, zoneWidth - 4, 116, 0xD9A3FF, 0.4);

      this.add.text(x, y - 80, `${i + 1}`, {
        fontSize: '32px',
        fill: '#000000',
        fontStyle: 'bold',
        fontFamily: 'font'
      }).setOrigin(0.5);

      // Agrupando todos os elementos visuais
      const zoneGroup = [shadowZone, baseZone, gradient, zone];
      this.dropZones.push(zone);
    }

    // Cria elementos draggable
    const shuffledElements = Phaser.Utils.Array.Shuffle([...currentNPCData.elements]);

    this.dragElements = shuffledElements.map((element, index) => {
      const x = startX + (zoneWidth + spacing) * index + zoneWidth / 2;
      const y = this.gameHeight - 150;

      // Cor roxa
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

      // Efeito Hover
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

    // Eventos de drag (para o minigame de arrastar elementos)
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

    const errorBorder = this.add.rectangle(0, 0, 404, 64, 0xFF6B6B);
    const errorBg = this.add.rectangle(0, 0, 400, 60, 0xFFA7A7, 1);
    errorBg.setStrokeStyle(2, 0xFF8888, 1); // Traço interno ligeiramente mais claro

    const errorText = this.add.text(0, 0, 'Posição incorreta!', {
      fontSize: '20px',
      fill: '#800000', // Texto vermelho mais escuro para melhor contraste
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

    const successBorder = this.add.rectangle(0, 0, 404, 64, 0x2E8B57);
    const successBg = this.add.rectangle(0, 0, 400, 60, 0x90EE90, 1);
    successBg.setStrokeStyle(2, 0x98FB98, 1); // Traço interno ligeiramente mais claro

    const successText = this.add.text(0, 0, 'Posição correta!', {
      fontSize: '20px',
      fill: '#006400', // Texto verde mais escuro para melhor contraste
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

    // Criar sobreposição centralizada
    const overlay = this.add.rectangle(
      this.gameWidth / 2,
      this.gameHeight / 2,
      this.gameWidth,
      this.gameHeight,
      0x000000,
      0.7
    );

    // Criar contêiner centralizado
    this.feedbackContainer = this.add.container(this.gameWidth / 2, this.gameHeight / 2);

    // Crie um plano de fundo de feedback com tamanho adequado
    const feedbackBg = this.add.rectangle(
      0,
      0,
      800,  // Largura aumentada
      200,  // Altura ajustada
      0xB600B9,
      0.9
    ).setOrigin(0.5);
    feedbackBg.setStrokeStyle(4, 0xB600B9);

    // Cria texto centralizado
    const feedbackText = this.add.text(
      0,
      0,
      this.npcData[this.currentNPC].feedback,
      {
        fontSize: '24px',
        fill: '#000000',
        align: 'center',
        fontFamily: 'font',
        wordWrap: { width: 750 }  // largura de envoltório ajustada
      }
    ).setOrigin(0.5);  // Isso centraliza o texto horizontalmente e verticalmente

    // Addiciona elementos ao container
    this.feedbackContainer.add([feedbackBg, feedbackText]);

    // Tempo de exibição aumentado para 8 segundos
    this.time.delayedCall(8000, () => {
      this.tweens.add({
        targets: [overlay, this.feedbackContainer],
        alpha: 0,
        duration: 500,
        onComplete: () => {
          overlay.destroy();
          this.feedbackContainer.destroy();
          this.scene.get('VpEstrategiaScene').events.emit('completedCarlosMinigame');
          this.scene.switch('VpEstrategiaScene', { showThankYou: true });
        }
      });
    });
  }

  showError(gameObject) {
    if (this.errorContainer) {
      this.errorContainer.destroy(); // Remova qualquer contêiner de erro existente
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
    this.currentNPC = 0; // Rastrear NPC atual (0: Ana, 1: Carlos, 2: Mariana)
    this.npcData = [
      {
        name: 'Ana',
        elements: [
          { text: 'Primeiro cargo como Dev Júnior', color: 0x000000 },
          { text: 'Investir em certificação Cloud', color: 0x000000 },
          { text: 'Promoção para Dev Pleno', color: 0x000000 },
          { text: 'Alcançar o nível Expert (Carreira Y)', color: 0x000000 }
        ],
        feedback: 'Sequência correta! Ana seguirá como especialista técnica: Júnior (base) → Pleno (projetos complexos) → Expert (referência técnica). Ela está animada para focar em código e te manda um meme de agradecimento! COLETE O MEME DA GRATIDÃO INTERAGINDO COM O CELULAR!'
      }
    ];
  }

  preload() {
    this.load.audio('success', '../assets/sounds/success.mp3');
    this.load.audio('error', '../assets/sounds/error.mp3');
    this.load.image('background', '../assets/background_vpestrategia_minigame.png'); // Caminho fixo
    this.load.image('arrow', '../assets/arrow.png');
  }

  create() {
    // Obtenha as dimensões do jogo
    this.gameWidth = this.cameras.main.width;
    this.gameHeight = this.cameras.main.height;
    this.createGameElements();
  }

  createGameElements() {
    // Adicionar imagem de fundo
    this.add.image(this.gameWidth / 2, this.gameHeight / 2, 'background')
      .setDisplaySize(this.gameWidth, this.gameHeight)
      .setOrigin(0.5);

    // Adicionar sobreposição branca com 50% de opacidade
    this.add.rectangle(
      this.gameWidth / 2,
      this.gameHeight / 2,
      this.gameWidth,
      this.gameHeight,
      0xFFFFFF,
      0.5
    );

    const currentNPCData = this.npcData[this.currentNPC];

    // Cabeçalho centralizado
    const headerBg = this.add.rectangle(this.gameWidth / 2, 80, this.gameWidth * 0.8, 120, 0x000000, 0.1);

    this.add.text(this.gameWidth / 2, 90, `Organize a carreira de ${currentNPCData.name}`, {
      fontSize: '32px',
      fill: '#000000',
      fontStyle: 'bold',
      fontFamily: 'font'
    }).setOrigin(0.5);

    // Instruções centralizadas
    this.add.text(this.gameWidth / 2, 160, 'Ana precisa de sua ajuda! Clique e arraste os elementos na ordem correta do início ao fim da carreira.', {
      fontSize: '29px',
      fill: '#000000',
      fontFamily: 'font'
    }).setOrigin(0.5);

    // Drop zones centralizadas
    this.dropZones = [];
    const zoneWidth = 200;
    const totalWidth = zoneWidth * 4;
    const spacing = 50;
    const startX = (this.gameWidth - (totalWidth + spacing * 3)) / 2;

    for (let i = 0; i < 4; i++) {
      const x = startX + (zoneWidth + spacing) * i + zoneWidth / 2;
      const y = this.gameHeight / 2 - 50;

      if (i < 3) {
        const arrow = this.add.image(x + zoneWidth / 2 + spacing / 2, y, 'arrow')
          .setScale(0.4)
          .setFlipX(true); // Add flip
        arrow.setTint(0x000000);
      }

      // Efeito de profundidade com várias camadas
      const shadowZone = this.add.rectangle(x + 4, y + 4, zoneWidth, 120, 0x000000, 0.2);
      const baseZone = this.add.rectangle(x, y, zoneWidth, 120, 0xE6B3FF, 0.3); // Roxo claro base
      const zone = this.add.rectangle(x, y, zoneWidth, 120, 0xE6B3FF, 0.8); // Roxo claro top

      // Adicionar efeito de sombra inner
      zone.setStrokeStyle(2, 0x000000, 0.2);
      zone.setInteractive();
      zone.correctIndex = i;

      // Profundidade com gradiente
      const gradient = this.add.rectangle(x, y + 2, zoneWidth - 4, 116, 0xD9A3FF, 0.4);

      this.add.text(x, y - 80, `${i + 1}`, {
        fontSize: '32px',
        fill: '#000000',
        fontStyle: 'bold',
        fontFamily: 'font'
      }).setOrigin(0.5);

      // Agrupar todos os elementos visuais
      const zoneGroup = [shadowZone, baseZone, gradient, zone];
      this.dropZones.push(zone);
    }

    // Cria elementos draggable
    const shuffledElements = Phaser.Utils.Array.Shuffle([...currentNPCData.elements]);

    this.dragElements = shuffledElements.map((element, index) => {
      const x = startX + (zoneWidth + spacing) * index + zoneWidth / 2;
      const y = this.gameHeight - 150;

      // Roxo nos elementos draggable
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

      // Efeito hover
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

    // Eventos drag (para o minigame de arrastar elementos)
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

    // Borda
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

    // Borda
    const successBorder = this.add.rectangle(0, 0, 404, 64, 0x2E8B57);
    const successBg = this.add.rectangle(0, 0, 400, 60, 0x90EE90, 1);
    successBg.setStrokeStyle(2, 0x98FB98, 1); // Inner stroke slightly lighter

    const successText = this.add.text(0, 0, 'Posição correta!', {
      fontSize: '20px',
      fill: '#006400', // Contraste do verde
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

    // Overlay centralizado
    const overlay = this.add.rectangle(
      this.gameWidth / 2,
      this.gameHeight / 2,
      this.gameWidth,
      this.gameHeight,
      0x000000,
      0.7
    );

    // Container centralizado
    this.feedbackContainer = this.add.container(this.gameWidth / 2, this.gameHeight / 2);

    // Fundo de feedback
    const feedbackBg = this.add.rectangle(
      0,
      0,
      800,  // Largura
      200,  // Altura
      0xB600B9,
      0.9
    ).setOrigin(0.5);
    feedbackBg.setStrokeStyle(4, 0xB600B9);

    // Texto centralizado
    const feedbackText = this.add.text(
      0,
      0,
      this.npcData[this.currentNPC].feedback,
      {
        fontSize: '24px',
        fill: '#000000',
        align: 'center',
        fontFamily: 'font',
        wordWrap: { width: 750 }  // Adjusted wrap width
      }
    ).setOrigin(0.5);  // Centralizar verticalmente e horizontalmente

    // Add elementos no container
    this.feedbackContainer.add([feedbackBg, feedbackText]);

    // Tempo de display -> 8 segundos
    this.time.delayedCall(8000, () => {
      this.tweens.add({
        targets: [overlay, this.feedbackContainer],
        alpha: 0,
        duration: 500,
        onComplete: () => {
          overlay.destroy();
          this.feedbackContainer.destroy();
          this.scene.get('VpEstrategiaScene').events.emit('completedAnaMinigame');
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
    this.currentNPC = 0; // 
    this.npcData = [
      {
        name: 'Mariana',
        elements: [
          { text: 'Atendente SAC', color: 0x00A0E3 },
          { text: 'Participar do Programa de Talentos', color: 0x00A0E3 },
          { text: 'Certificação em Experiência do Cliente', color: 0x00A0E3 },
          { text: 'Líder de Novos Colaboradores', color: 0x00A0E3 }
        ],
        feedback: 'Mariana seguiu perfeitamente o plano de carreira da Vivo! Como Líder de Novos Colaboradores, agora tem remuneração ampliada (salário + bônus por performance) e benefícios como capacitação contínua. Este caso mostra como na Vivo, crescimento vertical e horizontal andam juntos! Ela ficou muito grata por sua ajuda, então te mostrou suas anotações sobre uma aula de planejamento de carreira! COLETE AS ANOTAÇÕES!'
      }
    ];
  }

  preload() {
    this.load.audio('success', '../assets/sounds/success.mp3');
    this.load.audio('error', '../assets/sounds/error.mp3');
    this.load.image('background', '../assets/background_vpestrategia_minigame.png'); // Caminho fixado
    this.load.image('arrow', '../assets/arrow.png');
  }

  create() {
    // Dimensões do jogo
    this.gameWidth = this.cameras.main.width;
    this.gameHeight = this.cameras.main.height;
    this.createGameElements();
  }

  createGameElements() {
    // Add imagem de fundo
    this.add.image(this.gameWidth / 2, this.gameHeight / 2, 'background')
      .setDisplaySize(this.gameWidth, this.gameHeight)
      .setOrigin(0.5);

    // Adicionar sobreposição branca com 50% de opacidade
    this.add.rectangle(
      this.gameWidth / 2,
      this.gameHeight / 2,
      this.gameWidth,
      this.gameHeight,
      0xFFFFFF,
      0.5
    );

    const currentNPCData = this.npcData[this.currentNPC];

    // Cabeçalho centralizado
    const headerBg = this.add.rectangle(this.gameWidth / 2, 80, this.gameWidth * 0.8, 120, 0x000000, 0.1);

    this.add.text(this.gameWidth / 2, 90, `Organize a carreira de ${currentNPCData.name}`, {
      fontSize: '32px',
      fill: '#000000',
      fontStyle: 'bold',
      fontFamily: 'font'
    }).setOrigin(0.5);

    // Instruções centralizadas
    this.add.text(this.gameWidth / 2, 160, 'Mariana precisa de sua ajuda! Clique e arraste os elementos na ordem correta do início ao fim da carreira.', {
      fontSize: '29px',
      fill: '#000000',
      fontFamily: 'font'
    }).setOrigin(0.5);

    // Drop zones centralizadas
    this.dropZones = [];
    const zoneWidth = 200;
    const totalWidth = zoneWidth * 4;
    const spacing = 50;
    const startX = (this.gameWidth - (totalWidth + spacing * 3)) / 2;

    for (let i = 0; i < 4; i++) {
      const x = startX + (zoneWidth + spacing) * i + zoneWidth / 2;
      const y = this.gameHeight / 2 - 50;

      if (i < 3) {
        const arrow = this.add.image(x + zoneWidth / 2 + spacing / 2, y, 'arrow')
          .setScale(0.4)
          .setFlipX(true); // Add flip
        arrow.setTint(0x000000);
      }

      // Efeito de profundidade com várias camadas
      const shadowZone = this.add.rectangle(x + 4, y + 4, zoneWidth, 120, 0x000000, 0.2);
      const baseZone = this.add.rectangle(x, y, zoneWidth, 120, 0xE6B3FF, 0.3); // Roxo claro base
      const zone = this.add.rectangle(x, y, zoneWidth, 120, 0xE6B3FF, 0.8); // Roxo claro top

      // Adicionar efeito de sombra inner
      zone.setStrokeStyle(2, 0x000000, 0.2);
      zone.setInteractive();
      zone.correctIndex = i;

      // Profundidade com gradiente
      const gradient = this.add.rectangle(x, y + 2, zoneWidth - 4, 116, 0xD9A3FF, 0.4); // Slightly darker for depth

      this.add.text(x, y - 80, `${i + 1}`, {
        fontSize: '32px',
        fill: '#000000',
        fontStyle: 'bold',
        fontFamily: 'font'
      }).setOrigin(0.5);

      // Agrupar todos os elementos visuais
      const zoneGroup = [shadowZone, baseZone, gradient, zone];
      this.dropZones.push(zone);
    }

    // Cria elementos draggable
    const shuffledElements = Phaser.Utils.Array.Shuffle([...currentNPCData.elements]);

    this.dragElements = shuffledElements.map((element, index) => {
      const x = startX + (zoneWidth + spacing) * index + zoneWidth / 2;
      const y = this.gameHeight - 150;

      // Roxo nos elementos draggable
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

      // Efeito hover
      container.on('pointerover', () => {
        this.tweens.add({
          targets: container,
          scaleX: 1,
          scaleY: 1,
          duration: 100
        });
      });

      return container;
    });

    // Eventos drag (para o minigame de arrastar elementos)
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

    // Borda
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

    // Borda
    const successBorder = this.add.rectangle(0, 0, 404, 64, 0x2E8B57);
    const successBg = this.add.rectangle(0, 0, 400, 60, 0x90EE90, 1);
    successBg.setStrokeStyle(2, 0x98FB98, 1); // Inner stroke slightly lighter

    const successText = this.add.text(0, 0, 'Posição correta!', {
      fontSize: '20px',
      fill: '#006400', // Contraste do verde
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

    // Overlay centralizado
    const overlay = this.add.rectangle(
      this.gameWidth / 2,
      this.gameHeight / 2,
      this.gameWidth,
      this.gameHeight,
      0x000000,
      0.7
    );

    // Container centralizado
    this.feedbackContainer = this.add.container(this.gameWidth / 2, this.gameHeight / 2);

    // Fundo de feedback
    const feedbackBg = this.add.rectangle(
      0,
      0,
      800,  // Largura
      200,  // Altura
      0xB600B9,
      0.9
    ).setOrigin(0.5);
    feedbackBg.setStrokeStyle(4, 0xB600B9);

    // Texto centralizado
    const feedbackText = this.add.text(
      0,
      0,
      this.npcData[this.currentNPC].feedback,
      {
        fontSize: '24px',
        fill: '#000000',
        align: 'center',
        fontFamily: 'font',
        wordWrap: { width: 750 }  // Adjusted wrap width
      }
    ).setOrigin(0.5);  // Centralizar verticalmente e horizontalmente

    // Add elementos no container
    this.feedbackContainer.add([feedbackBg, feedbackText]);

    // Tempo de display -> 8 segundos
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
