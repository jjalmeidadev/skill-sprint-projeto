class SalaLider extends Phaser.Scene {
  constructor() {
    super({ key: "salaLiderScene" });
  }

  init(data) {
    this.selectedSpriteSheet = data.selectedSpriteSheet;
    console.log('Selected Sprite Sheet:', this.selectedSpriteSheet);
  }

  preload() {
    this.load.spritesheet('player', `../assets/personagens/skinsPlayer/players/${this.selectedSpriteSheet}.png`, {
        frameWidth: 32,
        frameHeight: 32,
    });
    this.load.spritesheet("indicator", "../assets/exclamaçãoRoxa.png", {frameWidth: 254,  frameHeight: 305 }); // Sprite da exclamação com dimensões de cada frame
    this.load.spritesheet("leader", "../assets/personagens/LiderReading.png", { frameWidth: 16, frameHeight: 32 }); // Sprite da líder com dimensões de cada frame

    this.load.tilemapTiledJSON('salaLider', '../assets/mapaSalaLider/mapaSalaLider.json'); // Arquivo JSON do mapa criado no Tiled
    this.load.image('decoracao', '../assets/mapaSalaLider/decoracao.png'); // Tileset usado no mapa da sala do líder

    this.load.audio('keySound', '../assets/sounds/computer-keyboard-typing-290582 (mp3cut.net).mp3'); // Som de digitação no teclado
    this.load.audio('indicatorSound', '../assets/sounds/497198_abacagi_bubble-pops (mp3cut.net).wav'); // Som do indicador (exclamação)
    this.load.audio('walkSound', '../assets/sounds/753292__vrymaa__footsteps-high-heels-hardwood-walk-run (mp3cut.net).wav'); // Som de passos do jogador
    this.load.audio("officeMusic", "../assets/0320(1).MP3"); // Música de fundo da sala do líder

    this.load.image('keyE', '../assets/teclaE.png'); // Imagem da tecla "E" para interação
    this.load.image('keyENTER', '../assets/keyEnter.png'); // Imagem da tecla "ENTER" para avançar nos diálogos
    this.load.image("textBalloon", "../assets/balaoTexto.png"); // Imagem do balão de texto usado nos diálogos
  }

  create() {
    this.sound.stopAll(); // Para todos os sons em execução

    this.cameras.main.fadeIn(1000); // Transição suave de fade-in ao iniciar a cena

    const startTime = OfficeScene.lastMusicTime || 0; // Recupera o tempo da música da cena anterior
    this.officeMusic = this.sound.add("officeMusic", { loop: true }); // Adiciona a música de fundo da sala do líder
    this.officeMusic.play({ seek: startTime }); // Reproduz a música de fundo a partir do ponto salvo

    this.buttonClick = this.sound.add('buttonSound', { loop: false, volume: 10 }); // Som de clique de botão
    this.walkSound = this.sound.add('walkSound', { loop: false, volume: 2 }); // Som de passos do jogador

    this.anims.create({ // Cria a animação da exclamação
      key: "exclaiming", // Nome da animação
      frames: this.anims.generateFrameNumbers("indicator", {
        start: 0, // Frame inicial
        end: 1, // Frame final
      }),
      frameRate: 3, // Velocidade da animação
      repeat: -1, // Repetição infinita
    });

    this.leaderInteracted = false; // Variável para controlar se a interação com a líder já ocorreu

    this.keys = this.input.keyboard.addKeys({ // Configuração do teclado (WASD + E para interação)
      up: Phaser.Input.Keyboard.KeyCodes.W, // Tecla W para mover para cima
      down: Phaser.Input.Keyboard.KeyCodes.S, // Tecla S para mover para baixo
      left: Phaser.Input.Keyboard.KeyCodes.A, // Tecla A para mover para a esquerda
      right: Phaser.Input.Keyboard.KeyCodes.D, // Tecla D para mover para a direita
      interagir: Phaser.Input.Keyboard.KeyCodes.E, // Tecla E para interação
    });

    this.input.keyboard.on('keydown-E', () => { // Evento para a tecla 'E'
      if (
        this.canInteractWithLeader && // Verifica se o jogador pode interagir com a líder
        !this.leaderInteracted // Verifica se a interação ainda não ocorreu
      ) {
        this.showLeaderInteraction(); // Mostra a interação com a líder
        this.buttonClick.play(); // Reproduz o som de clique
        this.leaderInteracted = true; // Marca que a interação ocorreu
    
        if (this.keyELeader) { // Remove a tecla E
          this.keyELeader.destroy(); // Remove a imagem da tecla E
          this.keyELeader = null; // Reseta a variável
        }
    
        if (!this.keyENTERLeader) { // Mostra a tecla ENTER acima da líder
          this.keyENTERLeader = this.add.image(this.leader.x, this.leader.y - 50, 'keyENTER').setScale(0.1).setDepth(1000); // Adiciona a imagem da tecla ENTER
        }
      }
    });
    
    const map = this.make.tilemap({key: "salaLider", tileWidth: 10, tileHeight: 6 }); // Adiciona o mapa da sala do líder
    const tileset = map.addTilesetImage("decoracao"); // Carrega o tileset de decoração

    const offsetX = width - 1170; // Offset para centralizar o mapa horizontalmente
    const offsetY = height - 650; // Offset para centralizar o mapa verticalmente
    const layer1 = map.createLayer("chao", tileset, offsetX, offsetY).setScale(5); // Camada do chão
    const layer2 = map.createLayer("tapete", tileset, offsetX, offsetY).setScale(5); // Camada do tapete
    const layer3 = map.createLayer("parede", tileset, offsetX, offsetY).setScale(5); // Camada das paredes
    const layer4 = map.createLayer("mesa", tileset, offsetX, offsetY).setScale(5); // Camada das mesas
    const layer5 = map.createLayer("decoracao", tileset, offsetX, offsetY).setScale(5); // Camada de decoração
    const layer6 = map.createLayer("pertences", tileset, offsetX, offsetY).setScale(5); // Camada de pertences

    layer1.setCollisionByProperty({ collider: true }); // Ativa colisão para a camada do chão
    layer2.setCollisionByProperty({ collider: true }); // Ativa colisão para a camada do tapete
    layer3.setCollisionByProperty({ collider: true }); // Ativa colisão para a camada das paredes
    layer4.setCollisionByProperty({ collider: true }); // Ativa colisão para a camada das mesas
    layer5.setCollisionByProperty({ collider: true }); // Ativa colisão para a camada de decoração
    layer6.setCollisionByProperty({ collider: true }); // Ativa colisão para a camada de pertences

    this.createLeaderAnimations(); // Cria as animações da líder
    this.addLeader(); // Adiciona a líder ao jogo
    this.canInteractWithLeader = false; // Inicialmente, o jogador não pode interagir com a líder

    this.createPlayer(); // Cria o jogador
    this.createPlayerAnimations(); // Cria as animações do jogador

    this.physics.add.collider(this.player, layer3); // Colisão com a camada das paredes
    this.physics.add.collider(this.player, layer4); // Colisão com a camada das mesas
    this.physics.add.collider(this.player, layer5); // Colisão com a camada de decoração
    this.physics.add.collider(this.player, this.leader); // Colisão com a líder
  }

  update() {
    this.movePlayer(); // Chama a função para movimentar o jogador

    if (this.indicatorActive == false) {
      this.indicatorSound.stop(); // Para o som do indicador se ele não estiver ativo
    }

    if (
      Math.abs(this.player.x - this.leader.x) <= 100 && // Verifica a proximidade horizontal do jogador com a líder
      Math.abs(this.player.y - this.leader.y) <= 100 && // Verifica a proximidade vertical do jogador com a líder
      !this.leaderInteracted // Verifica se a interação com a líder ainda não ocorreu
    ) {
      this.canInteractWithLeader = true; // Permite a interação com a líder
    
      if (!this.keyELeader) {
        this.keyELeader = this.add.image(this.leader.x, this.leader.y - 50, 'keyE').setScale(0.2).setDepth(1000); // Mostra a tecla E acima da líder
      }
    } else {
      this.canInteractWithLeader = false; // Desativa a interação com a líder
      if (this.keyELeader) {
        this.keyELeader.destroy(); // Remove a imagem da tecla E
        this.keyELeader = null; // Reseta a variável
      }
    }
  }

  movePlayer() {
    const speed = 150; // Define a velocidade de movimento do jogador
    let moving = false; // Variável para verificar se o jogador está se movendo

    if (this.keys.left.isDown) { // Verifica se a tecla "esquerda" está pressionada
      this.player.setVelocityX(-speed); // Move o jogador para a esquerda
      this.lastPosition = "left"; // Atualiza a última posição para "esquerda"
      this.player.anims.play("walk_left", true); // Reproduz a animação de andar para a esquerda
      moving = true; // Define que o jogador está se movendo
    } else if (this.keys.right.isDown) { // Verifica se a tecla "direita" está pressionada
      this.player.setVelocityX(speed); // Move o jogador para a direita
      this.lastPosition = "right"; // Atualiza a última posição para "direita"
      this.player.anims.play("walk_right", true); // Reproduz a animação de andar para a direita
      moving = true; // Define que o jogador está se movendo
    } else {
      this.player.setVelocityX(0); // Para o movimento horizontal do jogador
    }

    if (this.keys.up.isDown) { // Verifica se a tecla "cima" está pressionada
      this.player.setVelocityY(-speed); // Move o jogador para cima
      this.lastPosition = "up"; // Atualiza a última posição para "cima"
      this.player.anims.play("walk_up", true); // Reproduz a animação de andar para cima
      moving = true; // Define que o jogador está se movendo
    } else if (this.keys.down.isDown) { // Verifica se a tecla "baixo" está pressionada
      this.player.setVelocityY(speed); // Move o jogador para baixo
      this.lastPosition = "down"; // Atualiza a última posição para "baixo"
      this.player.anims.play("walk_down", true); // Reproduz a animação de andar para baixo
      moving = true; // Define que o jogador está se movendo
    } else {
      this.player.setVelocityY(0); // Para o movimento vertical do jogador
    }

    // Se o personagem parou, inicia a animação de stop_* em loop
    if (!moving) { // Verifica se o jogador não está se movendo
      switch (this.lastPosition) { // Verifica a última posição do jogador
        case "left": // Caso a última posição seja "esquerda"
          this.player.anims.play("stop_left", true); // Reproduz a animação de parado olhando para a esquerda
          break;
        case "right": // Caso a última posição seja "direita"
          this.player.anims.play("stop_right", true); // Reproduz a animação de parado olhando para a direita
          break;
        case "up": // Caso a última posição seja "cima"
          this.player.anims.play("stop_up", true); // Reproduz a animação de parado olhando para cima
          break;
        case "down": // Caso a última posição seja "baixo"
        default: // Caso padrão (última posição "baixo")
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

  createPlayer() {
    this.player = this.physics.add.sprite(width - 1050, height - 230, "player"); // Adiciona o sprite do jogador na posição inicial
    this.player.setScale(5); // Define o tamanho do jogador com escala 5
  }

  createPlayerAnimations() {
    this.anims.create({
      key: "walk_down", // Nome da animação para andar para baixo
      frames: this.anims.generateFrameNumbers("player", { start: 130, end: 135 }), // Define os frames da animação
      frameRate: 10, // Velocidade da animação
      repeat: -1, // Repetição infinita
    });
    this.anims.create({
      key: "walk_right", // Nome da animação para andar para a direita
      frames: this.anims.generateFrameNumbers("player", { start: 112, end: 117 }), // Define os frames da animação
      frameRate: 10, // Velocidade da animação
      repeat: -1, // Repetição infinita
    });
    this.anims.create({
      key: "walk_up", // Nome da animação para andar para cima
      frames: this.anims.generateFrameNumbers("player", { start: 118, end: 123 }), // Define os frames da animação
      frameRate: 10, // Velocidade da animação
      repeat: -1, // Repetição infinita
    });
    this.anims.create({
      key: "walk_left", // Nome da animação para andar para a esquerda
      frames: this.anims.generateFrameNumbers("player", { start: 124, end: 129 }), // Define os frames da animação
      frameRate: 10, // Velocidade da animação
      repeat: -1, // Repetição infinita
    });
    this.anims.create({
      key: "stop_down", // Nome da animação para parar olhando para baixo
      frames: this.anims.generateFrameNumbers("player", { start: 74, end: 79 }), // Define os frames da animação
      frameRate: 5, // Velocidade mais lenta para a animação de parada
      repeat: -1, // Loop infinito
    });
    this.anims.create({
      key: "stop_right", // Nome da animação para parar olhando para a direita
      frames: this.anims.generateFrameNumbers("player", { start: 56, end: 61 }), // Define os frames da animação
      frameRate: 5, // Velocidade mais lenta para a animação de parada
      repeat: -1, // Loop infinito
    });
    this.anims.create({
      key: "stop_up", // Nome da animação para parar olhando para cima
      frames: this.anims.generateFrameNumbers("player", { start: 62, end: 67 }), // Define os frames da animação
      frameRate: 5, // Velocidade mais lenta para a animação de parada
      repeat: -1, // Loop infinito
    });
    this.anims.create({
      key: "stop_left", // Nome da animação para parar olhando para a esquerda
      frames: this.anims.generateFrameNumbers("player", { start: 68, end: 73 }), // Define os frames da animação
      frameRate: 5, // Velocidade mais lenta para a animação de parada
      repeat: -1, // Loop infinito
    });
  }

  createLeaderAnimations() {
    this.anims.create({
      key: "drink", // Nome da animação para a líder bebendo
      frames: this.anims.generateFrameNumbers("leader", { start: 0, end: 11 }), // Define os frames da animação
      frameRate: 4, // Velocidade da animação
      repeat: -1, // Repetição infinita
    });
  }

  addLeader() {
    this.leader = this.physics.add.sprite(width - 600, height - 300, 'leader'); // Cria o sprite da líder na posição especificada
    this.leader.setScale(4.5); // Define a escala da líder
    this.leader.setFlipX(true); // Espelha a líder horizontalmente
    this.leader.setImmovable(true); // Define que a líder não pode ser movida por colisões
    this.leader.anims.play('drink'); // Inicia a animação de "beber" da líder

    this.exclamation = this.add.sprite(width - 600, height - 400, 'indicator').setScale(0.3); // Cria o sprite da exclamação acima da líder
    this.exclamation.play('exclaiming'); // Inicia a animação da exclamação
    this.indicatorActive = true; // Define que o indicador está ativo
    if (this.indicatorActive) { // Verifica se o indicador está ativo
      this.indicatorSound = this.sound.add('indicatorSound', { loop: true, volume: 1.5 }); // Adiciona o som do indicador
      this.indicatorSound.play(); // Reproduz o som do indicador
    }

    this.leader.setInteractive(); // Permite que a líder responda a interações do jogador
    this.leader.on('pointerdown', () => { // Adiciona um evento de clique na líder
      this.showLeaderInteraction(); // Chama a função de interação com a líder
    });

    if (
      this.canInteractWithLeader && // Verifica se o jogador pode interagir com a líder
      !this.leaderInteracted // Verifica se a interação com a líder ainda não ocorreu
    ) {
      this.showLeaderInteraction(); // Chama a função de interação com a líder
      this.buttonClick.play(); // Reproduz o som de clique
      this.leaderInteracted = true; // Marca que a interação com a líder ocorreu
    
      if (this.keyELeader) { // Verifica se a tecla E está visível
        this.keyELeader.destroy(); // Remove a imagem da tecla E
        this.keyELeader = null; // Reseta a variável da tecla E
      }
      if (!this.keyENTERLeader) { // Verifica se a tecla ENTER ainda não foi adicionada
        this.keyENTERLeader = this.add.image(this.leader.x, this.leader.y - 50, 'keyENTER').setScale(0.1).setDepth(1000); // Adiciona a imagem da tecla ENTER acima da líder
      }
    }
  }

  showLeaderInteraction() {
    this.exclamation.setVisible(false); // Remove a exclamação acima da líder
  
    const leaderDialog = [ // Define o diálogo da líder
      'Olá, ' + playerName + '! Tudo bem?', // Primeira fala da líder
      'Ah, então quer dizer que você quer migrar para uma nova VP? Que alegria!', // Segunda fala da líder
      'Vou analisar seu currículo.', // Terceira fala da líder
      'Vamos ver...', // Quarta fala da líder
      'Seu currículo está uma maravilha! Seguiu todas as diretrizes!', // Quinta fala da líder
      'Vá até o elevador para conhecer as áreas internas da vivo!' // Última fala da líder
    ];
  
    let currentDialogIndex = 0; // Índice atual do diálogo
    let textBalloon = this.add.image(width - 730, height - 420, 'textBalloon'); // Adiciona o balão de texto na posição especificada
    textBalloon.setFlipX(true).setVisible(true); // Espelha horizontalmente o balão e o torna visível
  
    let text = this.add.text(width - 815, height - 480, leaderDialog[0], { // Adiciona o texto inicial do diálogo
      fontSize: '16px', // Define o tamanho da fonte
      fill: '#000000', // Define a cor do texto
      wordWrap: { width: textBalloon.width - 20 } // Define a largura máxima para quebra de linha
    });
    text.setVisible(true); // Torna o texto visível
  
    this.input.keyboard.on('keydown-ENTER', () => { // Adiciona um evento para a tecla ENTER
      if (!textBalloon || !text) return; // Retorna se o balão ou texto não existirem
  
      currentDialogIndex++; // Incrementa o índice do diálogo
  
      if (currentDialogIndex < leaderDialog.length) { // Verifica se ainda há falas no diálogo
        text.setText(leaderDialog[currentDialogIndex]); // Atualiza o texto com a próxima fala
        this.buttonClick.play(); // Reproduz o som de clique
      } else {
        // Finaliza o diálogo
        textBalloon.setVisible(false); // Esconde o balão de texto
        text.setVisible(false); // Esconde o texto
        this.input.keyboard.off('keydown-ENTER'); // Remove o evento da tecla ENTER
        
        if (this.keyENTERLeader) { // Verifica se a tecla ENTER está visível
          this.keyENTERLeader.destroy(); // Remove a imagem da tecla ENTER
          this.keyENTERLeader = null; // Reseta a variável da tecla ENTER
        }
      
        this.showIndicatorToReturn(); // Mostra o indicador para retornar
      }
    });

  }

  showIndicatorToReturn() {
    this.exclamation = this.physics.add.sprite(width - 1050, height - 230, 'indicator').setScale(0.3); // Cria o sprite do indicador na posição especificada e ajusta a escala
    this.exclamation.setImmovable(true); // Define que o indicador não pode ser movido por colisões
    this.exclamation.play('exclaiming'); // Inicia a animação do indicador
    this.indicatorActive = true; // Marca que o indicador está ativo
  
    if (this.indicatorActive) { // Verifica se o indicador está ativo
      this.indicatorSound = this.sound.add('indicatorSound', { loop: true, volume: 1.5 }); // Adiciona o som do indicador com loop e volume ajustado
      this.indicatorSound.play(); // Reproduz o som do indicador
    }
  
    this.physics.add.overlap(this.player, this.exclamation, () => { // Adiciona uma verificação de sobreposição entre o jogador e o indicador
      if (this.indicatorActive) { // Verifica se o indicador ainda está ativo
        this.indicatorSound.stop(); // Para o som do indicador
        this.scene.get('officeScene').events.emit('stopWalkSound'); // Emite um evento para parar o som de passos na cena do escritório
        this.scene.switch('officeScene'); // Troca para a cena do escritório
        this.scene.get('officeScene').events.emit('stopWalkSound'); // Emite novamente o evento para garantir que o som de passos seja parado
        this.indicatorActive = false; // Marca que o indicador não está mais ativo
      }
    });
  }

  backToOffice() {
    this.exclamation = this.physics.add.sprite(width - 1050, height - 230, 'indicator').setScale(0.3); // Cria o sprite do indicador na posição especificada e ajusta a escala
    this.exclamation.setImmovable(true); // Define que o indicador não pode ser movido por colisões
    this.exclamation.play('exclaiming'); // Inicia a animação do indicador
    this.indicatorActive = true; // Marca que o indicador está ativo
    if (this.indicatorActive) { // Verifica se o indicador está ativo
      this.indicatorSound = this.sound.add('indicatorSound', { loop: true, volume: 1.5 }); // Adiciona o som do indicador com loop e volume ajustado
      this.indicatorSound.play(); // Reproduz o som do indicador
    }

    this.physics.add.overlap(this.player, this.exclamation, () => { // Adiciona uma verificação de sobreposição entre o jogador e o indicador
      this.indicatorActive = false; // Marca que o indicador não está mais ativo
    });

    this.scene.get('officeScene').events.emit('stopWalkSound'); // Emite um evento para parar o som de passos na cena do escritório
    this.scene.switch('officeScene'); // Troca para a cena do escritório
    this.scene.get('officeScene').events.emit('stopWalkSound'); // Emite novamente o evento para garantir que o som de passos seja parado
  }
}
