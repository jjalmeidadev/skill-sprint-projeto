class VpEstrategiaScene extends Phaser.Scene {
    constructor() {
        super({ key: 'VpEstrategiaScene' });
    }

    preload() {
        this.load.tilemapTiledJSON('map_estrategia', '../assets/mapaVpEstrategia/map_estrategia.json'); // Carrega o arquivo JSON do mapa criado no Tiled
        this.load.image('decoracao', '../assets/mapaVpEstrategia/decoracao.png'); // Carrega o tileset de decoração
        this.load.image('paredes', '../assets/mapaVpEstrategia/paredes.png'); // Carrega o tileset de paredes
        this.load.image('personalizado_vivo', '../assets/mapaVpEstrategia/personalizado_vivo.png'); // Carrega o tileset personalizado
        
        this.load.spritesheet('player', '../assets/Player.png', { frameWidth: 32, frameHeight: 32 }); // Carrega o spritesheet do jogador com dimensões de cada frame
        this.load.image('npc', '../assets/viviane_lider.png'); // Carrega a imagem da NPC
        this.load.image('keyE', '../assets/teclaE.png'); // Carrega a imagem da tecla "E" para interação
        this.load.image("balloonText", "../assets/balaoTexto.png"); // Carrega a imagem do balão de fala da NPC

        this.load.audio('walkSound', '../assets/sounds/753292__vrymaa__footsteps-high-heels-hardwood-walk-run (mp3cut.net).wav'); // Carrega o som de passos
        this.load.audio("strategyMusic", "../assets/Kevin-MacLeod-Itty-Bitty-8-Bit-♫-NO-COPYRIGHT-8-bit-Music.mp3"); // Carrega a música de fundo da cena
    }

    create() {
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
      this.physics.add.collider(this.player, layer5); // Colisão do jogador com a camada de decoração sem barreiras

      this.npc = this.physics.add.sprite(width - 800, height - 500, 'npc'); // Adiciona a NPC na cena
      this.npc.setScale(1.7); // Ajusta o tamanho da NPC
      this.npc.body.immovable = true; // Faz a NPC ficar parada

      this.physics.add.collider(this.player, this.npc); // Adiciona colisão entre o jogador e a NPC

      this.keys = this.input.keyboard.addKeys({ // Configuração do teclado
        up: Phaser.Input.Keyboard.KeyCodes.W, // Tecla W para mover para cima
        down: Phaser.Input.Keyboard.KeyCodes.S, // Tecla S para mover para baixo
        left: Phaser.Input.Keyboard.KeyCodes.A, // Tecla A para mover para a esquerda
        right: Phaser.Input.Keyboard.KeyCodes.D, // Tecla D para mover para a direita
        interagir: Phaser.Input.Keyboard.KeyCodes.E, // Tecla E para interagir
        ENTER: Phaser.Input.Keyboard.KeyCodes.ENTER // Tecla Enter para avançar diálogos
      });

      this.walkSound = this.sound.add('walkSound', { loop: false, volume: 2 }); // Adiciona o som de passos com volume ajustado

      this.activeDialogue = false; // Define o estado inicial do diálogo como inativo

      // Dá zoom na tela do jogo e faz a câmera seguir o personagem
      this.cameras.main.startFollow(this.player); // Faz a câmera seguir o jogador
      this.cameras.main.setZoom(2); // Define o nível de zoom da câmera
    }

    update() {
      this.movePlayer(); // Atualiza o movimento do jogador

      
      const distance = Phaser.Math.Distance.Between(this.player.x, this.player.y, this.npc.x, this.npc.y);// Verifica se o jogador está próximo da NPC

      if (distance < 100 && this.keys.interagir.isDown && !this.activeDialogue) { // Verifica se o jogador está próximo, pressionou a tecla de interação e o diálogo não está ativo
        const speechNpc = [ // Array com as falas da NPC
          "Olá! Que bom que você chegou!", // Primeira fala
          "Bem-vindo à sala da VP de Estratégia!", // Segunda fala
          "Meu nome é Viviane e sou líder de carreiras aqui na Vivo.", // Terceira fala
          "Estamos em um momento único na empresa!", // Quarta fala
          "Acabamos de lançar um programa exclusivo", // Quinta fala
          "Queremos acelerar talentos como você!", // Sexta fala
          "Mas tem um porém...", // Sétima fala
          "As inscrições fecham em 24h!", // Oitava fala
          "Só quem montar um plano estratégico para funcionários HOJE garante a vaga!", // Nona fala
          "Você tem 2 minutos para ajudar três talentos a escolher seus próximos passos de carreira.", // Décima fala
          "Planeje com cuidado!", // Décima primeira fala
          "Cada decisão impacta o crescimento deles na empresa!", // Décima segunda fala
          "Siga as exclamações para ajudá-los." // Décima terceira fala
        ];
        this.startDialogue(speechNpc); // Inicia o diálogo com as falas da NPC
      }
    }

    startDialogue(speechNpc) {
      this.activeDialogue = true; // Impede que o diálogo seja iniciado novamente enquanto está ativo

      let indexCurrentSpeech = 0; // Índice da fala atual

      const balloonText = this.add.image(this.npc.x + 90, this.npc.y - 100, "balloonText").setOrigin(0.5).setScale(1); // Adiciona a imagem do balão de fala acima da NPC
      const text = this.add.text(this.npc.x + 100, this.npc.y - 120, speechNpc[indexCurrentSpeech], { // Adiciona o texto inicial da fala
        fontSize: "16px", // Define o tamanho da fonte
        fill: "#000000", // Define a cor do texto
        wordWrap: { width: balloonText.width - 20 }, // Define a largura máxima para quebra de linha
        align: "center", // Centraliza o texto
        fontFamily: "font" // Define a fonte do texto
      }).setOrigin(0.5); // Centraliza o texto no balão

      const nextSpeech = () => {
        indexCurrentSpeech++; // Incrementa o índice da fala atual
        if (indexCurrentSpeech < speechNpc.length) { // Verifica se ainda há falas restantes
          text.setText(speechNpc[indexCurrentSpeech]); // Atualiza o texto com a próxima fala
        } else {
          balloonText.destroy(); // Remove o balão de fala
          text.destroy(); // Remove o texto
          this.input.keyboard.off("keydown-ENTER", nextSpeech); // Remove o evento de tecla
          this.activeDialogue = false; // Permite iniciar outro diálogo no futuro
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

      createButtonBack() {
        console.log("Adicionando botão de voltar"); // Loga no console que o botão de voltar está sendo adicionado
        this.buttonBack = this.add.image(width - 808, height - 660, "keyE"); // Adiciona o botão de voltar na posição especificada
        this.buttonBack.setScale(0.2); // Define o tamanho do botão de voltar
        this.buttonBack.setDepth(1000); // Coloca o botão acima de outros objetos
      
        this.input.keyboard.on("keydown-E", () => { // Adiciona evento para a tecla "E"
          const distancia = Phaser.Math.Distance.Between(
            this.player.x, this.player.y, // Posição do jogador
            this.buttonBack.x, this.buttonBack.y // Posição do botão de voltar
          );
      
          if (distancia < 100) { // Verifica se o jogador está próximo do botão de voltar
            // Pausa todos os sons ativos na cena
            this.sound.sounds.forEach(sound => {
              if (sound.isPlaying) {
                sound.pause();
              }
            });
      
            this.scene.stop("VpEstrategiaScene"); // Para a cena atual
            this.scene.start("elevadorScene"); // Inicia a cena do elevador
          }
        });
      }
}

// Propriedade estática para armazenar o tempo de reprodução da músic
VpEstrategiaScene.lastMusicTime = 0;
