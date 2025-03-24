class SalaLider extends Phaser.Scene {
  constructor() {
    super({ key: "salaLiderScene" });
  }
  preload() {
    // Carrega a sprite do jogador e da exclamação
    this.load.spritesheet("player", "../assets/Player.png", {
      frameWidth: 32,
      frameHeight: 32,
    });
    this.load.spritesheet("indicator", "../assets/exclamaçãoRoxa.png", {
      frameWidth: 254,
      frameHeight: 305,
    });
    this.load.spritesheet("leader", "../assets/lider_spritesheet.png", {
      frameWidth: 16,
      frameHeight: 16,
    });

    // Carrega o balão de texto
    this.load.image("balaoTexto", "../assets/balaoTexto.png");

        // Carrega o mapa da sala do líder
        this.load.tilemapTiledJSON('salaLider', '../assets/mapaSalaLider/mapaSalaLider.json');
        this.load.image('decoracao', '../assets/mapaSalaLider/decoracao.png');

        // Carrega os efeitos sonoros
        this.load.audio('keySound', '../assets/sounds/computer-keyboard-typing-290582 (mp3cut.net).mp3');
        this.load.audio('indicatorSound', '../assets/sounds/497198_abacagi_bubble-pops (mp3cut.net).wav');
        this.load.audio('walkSound', '../assets/sounds/753292__vrymaa__footsteps-high-heels-hardwood-walk-run (mp3cut.net).wav');
        this.load.audio('talkSound', '../assets/sounds/talkSound.wav'
        )
    }

    create() {
        this.cameras.main.fadeIn(1000); // Transição suave

        // Carrega os efeitos sonoros
        this.buttonClick = this.sound.add('buttonSound', {loop: false, volume: 10});
        this.walkSound = this.sound.add('walkSound', {loop: false, volume: 10});

    //cria a animação da exclamação
    this.anims.create({
      key: "exclamando",
      frames: this.anims.generateFrameNumbers("indicator", {
        start: 0,
        end: 1,
      }),
      //velocidade da animação
      frameRate: 3,
      repeat: -1,
    });

    // Configuração do teclado (WASD + E para interação)
    this.teclas = this.input.keyboard.addKeys({
      up: Phaser.Input.Keyboard.KeyCodes.W,
      down: Phaser.Input.Keyboard.KeyCodes.S,
      left: Phaser.Input.Keyboard.KeyCodes.A,
      right: Phaser.Input.Keyboard.KeyCodes.D,
      interagir: Phaser.Input.Keyboard.KeyCodes.E,
    });

    // Adiciona o mapa da sala do líder
    const map = this.make.tilemap({
      key: "salaLider",
      tileWidth: 10,
      tileHeight: 6,
    });

    // Adiciona o tileset utilizado no mapa
    const tileset = map.addTilesetImage("decoracao");

    const offsetX = width - 1170; // Offset para centralizar o mapa
    const offsetY = height - 650; // Offset para centralizar o mapa

    // Adiciona as camadas do mapa
    const layer1 = map
      .createLayer("chao", tileset, offsetX, offsetY)
      .setScale(5);
    const layer2 = map
      .createLayer("tapete", tileset, offsetX, offsetY)
      .setScale(5);
    const layer3 = map
      .createLayer("parede", tileset, offsetX, offsetY)
      .setScale(5);
    const layer4 = map
      .createLayer("mesa", tileset, offsetX, offsetY)
      .setScale(5);
    const layer5 = map
      .createLayer("decoracao", tileset, offsetX, offsetY)
      .setScale(5);
    const layer6 = map
      .createLayer("pertences", tileset, offsetX, offsetY)
      .setScale(5);

    // Torna as colisões criadas no Tiled válidas no jogo
    layer1.setCollisionByProperty({ collider: true });
    layer2.setCollisionByProperty({ collider: true });
    layer3.setCollisionByProperty({ collider: true });
    layer4.setCollisionByProperty({ collider: true });
    layer5.setCollisionByProperty({ collider: true });
    layer6.setCollisionByProperty({ collider: true });

    this.createLeaderAnimations();
    this.addLeader();
    this.createPlayer();
    this.createPlayerAnimations();

    // Configura colisões entre o jogador e algumas camadas selecionadas
    this.physics.add.collider(this.player, layer3);
    this.physics.add.collider(this.player, layer4);
    this.physics.add.collider(this.player, layer5);
    this.physics.add.collider(this.player, this.leader);
  }

    update() {
        // Atualiza o movimento do jogador
        this.movePlayer();

        if(this.indicatorActive == false) {
          this.indicatorSound.stop();
        }
    }   

    movePlayer() {
      const velocidade = 150;
      let movendo = false;

      if (this.teclas.left.isDown) {
        this.player.setVelocityX(-velocidade);
        this.player.anims.play("walk_left", true);
        this.player.setFlipX(true);
        movendo = true;
      } else if (this.teclas.right.isDown) {
        this.player.setVelocityX(velocidade);
        this.player.anims.play("walk_right", true);
        this.player.setFlipX(false);
        movendo = true;
      } else {
        this.player.setVelocityX(0);
      }

      if (this.teclas.up.isDown) {
        this.player.setVelocityY(-velocidade);
        this.player.anims.play("walk_up", true);
        movendo = true;
      } else if (this.teclas.down.isDown) {
        this.player.setVelocityY(velocidade);
        this.player.anims.play("walk_down", true);
        movendo = true;
      } else {
        this.player.setVelocityY(0);
      }

      if (!movendo) {
        this.player.anims.stop();
        this.walkSound.stop();
      } else {
        if (!this.walkSound.isPlaying) {
        this.walkSound.play();
        }
      }
    }

  createPlayer() {
    // Cria o sprite do jogador usando as dimensões da tela
    this.player = this.physics.add.sprite(width - 1050, height - 230, "player");
    this.player.setScale(5);
  }

  createPlayerAnimations() {
    // Define as animações do jogador
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
  }

  createLeaderAnimations() {
    this.anims.create({
      key: "drink",
      frames: this.anims.generateFrameNumbers("leader", { start: 16, end: 19 }),
      frameRate: 4,
      repeat: -1,
    });
  }

      addLeader() {
        //Adiciona a líder no jogo
        this.leader = this.physics.add.sprite(width - 600, height - 300, 'leader');
        this.leader.setScale(5.5);
        this.leader.setFlipX(true);
        this.leader.setImmovable(true);
        this.leader.anims.play('drink');

    
        // Adiciona a sprite da exclamação
        this.exclamation = this.add.sprite(width - 600, height - 400, 'indicator').setScale(0.3);
        this.exclamation.play('exclamando'); // Inicia a animação
        this.indicatorActive = true;
        if(this.indicatorActive) {
          this.indicatorSound = this.sound.add('indicatorSound', {loop: true, volume: 10});
          this.indicatorSound.play();
        } 
    
        // Torna a leader interativa
        this.leader.setInteractive();
        this.leader.on('pointerdown', () => {
          this.showLeaderInteraction(); // Chama a função de interação com a leader
        });
    
        // Adiciona um evento para a tecla 'E'
        this.input.keyboard.on('keydown-E', () => {
          this.indicatorActive = false;
          // Verifica se o jogador está próximo da leader
          if (
            Math.abs(this.player.x - this.leader.x) <= 150 &&
            Math.abs(this.player.y - this.leader.y) <= 150 &&
            !this.leaderInteracted // Verifica se a interação já ocorreu
          ) {
            // Chama a função de interação com a leader
            this.showLeaderInteraction();
            this.buttonClick.play();
            this.leaderInteracted = true; // Marca que a interação ocorreu
          }
        });
      }

      showLeaderInteraction() {
        this.exclamation.setVisible(false); // Remove a exclamação
    
        var speechLeader = [
            'Olá, Fulano! Tudo bem?', 
            'Ah, então quer dizer que você quer migrar para uma nova VP? Que alegria!',
            'Vou analisar seu currículo.',
            'Vamos ver...', 
            'Seu currículo está uma maravilha! Seguiu todas as diretrizes!',
            'Vá até o elevador para conhecer as áreas internas da vivo!'
        ];
    
        let currentSpeechIndex = 0;
        let audio = this.sound.add('talkSound', { volume: 10});
        let balaoTexto, text;
    
        // Evento para iniciar o diálogo ao pressionar "E"
        this.input.keyboard.on('keydown-E', () => {
            if (!balaoTexto) { // Evita iniciar o diálogo várias vezes
                // Adiciona o balão de fala
                balaoTexto = this.add.image(width - 730, height - 420, 'balaoTexto');
                balaoTexto.setFlipX(true);
                balaoTexto.setVisible(true);
    
                // Adiciona a caixa de texto dentro do balão
                text = this.add.text(width - 815, height - 480, speechLeader[0], {
                    fontSize: '16px',
                    fill: '#000000',
                    wordWrap: { width: balaoTexto.width - 20 }
                });
                text.setVisible(true);
    
                // Inicia o áudio ao começar o diálogo
                audio.play();
            }
        });
    
        // Evento para avançar o diálogo com "ENTER"
        this.input.keyboard.on('keydown-ENTER', () => { 
            if (!balaoTexto || !text) return; // Se o diálogo não começou, ignora
    
            currentSpeechIndex++; 
    
            if (currentSpeechIndex < speechLeader.length) { 
                audio.stop(); // Para o áudio antes de reiniciar
                audio.play(); // Toca novamente para a nova fala
    
                text.setText(speechLeader[currentSpeechIndex]); // Atualiza o texto
                this.buttonClick.play();
            } else {
                // Finaliza o diálogo
                balaoTexto.setVisible(false);
                text.setVisible(false);
                audio.stop(); // Para o áudio ao final
                this.input.keyboard.off('keydown-ENTER'); // Desativa ENTER após o diálogo
                this.input.keyboard.off('keydown-E'); // Impede reiniciar o diálogo
                this.backToOffice();
            }
        });
    }
    

    backToOffice() {
      // Adiciona a sprite da exclamação
      this.exclamacao = this.physics.add.sprite(width - 1050, height - 230, 'indicator').setScale(0.3);
      this.exclamacao.setImmovable(true);
      this.exclamacao.play('exclamando'); // Inicia a animação
      this.indicatorActive = true;
      if(this.indicatorActive) {
        this.indicatorSound = this.sound.add('indicatorSound', {loop: true, volume: 10});
        this.indicatorSound.play();
      } 

      // Adiciona um overlap entre o player e a exclamation
      this.physics.add.overlap(this.player, this.exclamacao , () => {
        this.indicatorActive = false;
        this.scene.switch('officeScene'); // Troca para a cena do escritório
    });
  }
}
