class VpPessoasScene extends Phaser.Scene {
    constructor() {
      super({ key: 'vpPessoasScene' });

      this.minigameComplete = false;
      this.npcMovelFixedCreated = false;
    }

    preload() {
        // Carrega o mapa do Tiled e os tilesets
        this.load.tilemapTiledJSON('vpPessoas', '../assets/mapaVPPessoas/mapaVPPessoas.json');
        this.load.image('decoracao', '../assets/mapaVPPessoas/decoracao.png');
        this.load.image('paredes', '../assets/mapaVPPessoas/paredes.png');

        // Carrega imagens, spritesheets e demais ativos
        this.load.spritesheet('player', '../assets/personagens/skinsPlayer/player1all.png', { frameWidth: 16, frameHeight: 32 });

        // Carrega os efeitos sonoros
        this.load.audio('walkSound', '../assets/sounds/753292__vrymaa__footsteps-high-heels-hardwood-walk-run (mp3cut.net).wav');
        this.load.audio('PessoasMusic', '../assets/sounds/VPpessoas.mp3')
        this.load.spritesheet("indicator", "../assets/exclamaçãoRoxa.png", {frameWidth: 254, frameHeight: 305,});

        this.load.spritesheet("npcReceptor", "../assets/personagens/LiderReading.png", { frameWidth: 16, frameHeight: 32, });
          
        this.load.spritesheet("npc11", "../assets/personagens/VPpessoas/npc11.png", { frameWidth: 16, frameHeight: 32,});
    
        this.load.spritesheet("npc12", "../assets/personagens/VPpessoas/npc12.png", { frameWidth: 16, frameHeight: 32,});
    
        this.load.spritesheet("npc13", "../assets/personagens/VPpessoas/npc13.png", { frameWidth: 16, frameHeight: 32,});
          
        this.load.spritesheet("npc14", "../assets/personagens/VPpessoas/npc14.png", { frameWidth: 16, frameHeight: 32,});
          
        this.load.spritesheet("npc15", "../assets/personagens/VPpessoas/npc15.png", { frameWidth: 16, frameHeight: 32,});

        this.load.spritesheet("npc16", "../assets/personagens/VPpessoas/npc16.png", { frameWidth: 16, frameHeight: 32,});

        this.load.spritesheet("npc17", "../assets/personagens/VPpessoas/npc17.png", { frameWidth: 16, frameHeight: 32,});

        this.load.spritesheet("npc18", "../assets/personagens/VPpessoas/marimari.png", { frameWidth: 16, frameHeight: 32,});

        this.load.spritesheet("npc19", "../assets/personagens/VPpessoas/npc19.png", { frameWidth: 16, frameHeight: 32, });

        //this.load.spritesheet("npc20", "../assets/personagens/VPpessoas/npc20.png", { frameWidth: 16, frameHeight: 32,});

        this.load.spritesheet("npc23", "../assets/personagens/VPpessoas/npc23.png", { frameWidth: 16, frameHeight: 32,});
   
        this.load.audio('PessoasMusic', '../assets/sounds/VPpessoas.mp3');
        this.load.audio('indicatorSound', '../assets/sounds/497198_abacagi_bubble-pops (mp3cut.net).wav');

        this.load.spritesheet('trash', '../assets/trash.png', {frameWidth: 267, frameHeight: 343});
        this.load.spritesheet('book', '../assets/assetsBookVPPessoas/book.png', {frameWidth: 835, frameHeight: 520});

        this.load.spritesheet("indicator", "../assets/exclamaçãoRoxa.png", {frameWidth: 254, frameHeight: 305,});
        this.load.image('keyE', '../assets/teclaE.png');

        this.load.spritesheet("npcMovel", "../assets/personagens/VPpessoas/npcMovel.png", { frameWidth: 16, frameHeight: 32,});

        this.load.spritesheet("rafaela", "../assets/personagens/VPpessoas/npcRafaela.png", { frameWidth: 16, frameHeight: 32,});
        
        this.load.image("balaoTexto", "../assets/balaoTexto.png");
    }

    create() {
        // Cria o mapa e as camadas
        const map = this.make.tilemap({ key: "vpPessoas", tileWidth: 25, tileHeight: 20 });
        const tileset1 = map.addTilesetImage("decoracao");
        const tileset2 = map.addTilesetImage("paredes");

        const offsetX = width - 1270;
        const layer1 = map.createLayer("chao", tileset2, offsetX, 0).setScale(2.5);
        const layer2 = map.createLayer("parede", tileset2, offsetX, 0).setScale(2.5);
        const layer3 = map.createLayer("sofa", tileset1, offsetX, 0).setScale(2.5);
        const layer4 = map.createLayer("sofaTras", tileset1, offsetX, 0).setScale(2.5);
        const layer5 = map.createLayer("armario", tileset1, offsetX, 0).setScale(2.5);
        const layer6 = map.createLayer("cadeira", tileset1, offsetX, 0).setScale(2.5);
        this.addNpcLayer6();
        const layer7 = map.createLayer("mesa", tileset1, offsetX, 0).setScale(2.5);
        const layer8 = map.createLayer("elevador", tileset1, offsetX, 0).setScale(2.5);
        const layer9 = map.createLayer("planta", tileset1, offsetX, 0).setScale(2.5);
        const layer10 = map.createLayer("decoracao", tileset1, offsetX, 0).setScale(2.5);
        const layer11 = map.createLayer("acabamento", tileset2, offsetX, 0).setScale(2.5);


        [layer1, layer2, layer3, layer4, layer5, layer6, layer7, layer8, layer9, layer10, layer11].forEach(layer => {
        layer.setCollisionByProperty({ collider: true });
        });

        // Cria e inicia a música; se houver um tempo salvo, retoma a partir dele
      const startTime = VpPessoasScene.lastMusicTime || 0;
      this.PessoasMusic = this.sound.add("PessoasMusic", { loop: true });
      this.PessoasMusic.play({ seek: startTime });

        // Configuração do teclado
        this.teclas = this.input.keyboard.addKeys({
        up: Phaser.Input.Keyboard.KeyCodes.W,
        down: Phaser.Input.Keyboard.KeyCodes.S,
        left: Phaser.Input.Keyboard.KeyCodes.A,
        right: Phaser.Input.Keyboard.KeyCodes.D,
        interagir: Phaser.Input.Keyboard.KeyCodes.E,
        ENTER: Phaser.Input.Keyboard.KeyCodes.ENTER
        });

        this.createPlayer(width, height);
        this.createPlayerAnimations();
        this.addNpc();
        this.createNpcAnimations();
        this.lastPsition = "down"; // O personagem começa olhando para baixo
        this.createNpcMovel();
        this.addRafaela(width, height);
        
        // Configura colisões do jogador com camadas selecionadas
        this.physics.add.collider(this.player, layer2);
        this.physics.add.collider(this.player, layer3);
        this.physics.add.collider(this.player, layer4);
        this.physics.add.collider(this.player, layer5);
        this.physics.add.collider(this.player, layer6);
        this.physics.add.collider(this.player, layer7);
        this.physics.add.collider(this.player, layer9);
        this.physics.add.collider(this.player, this.rafaela);

        // Cria a animação do indicador
        this.anims.create({
          key: "exclamando",
          frames: this.anims.generateFrameNumbers("indicator", {start: 0, end: 1}),
          frameRate: 3, // Velocidade da animação
          repeat: -1,
        });

        this.createTrash();
        this.createBook();

        // Adiciona os efeitos sonoros
        this.buttonClick = this.sound.add('buttonSound', {loop: false, volume: 10});
        this.indicatorSound = this.sound.add('indicatorSound', {loop: true, volume: 10});
        this.walkSound = this.sound.add('walkSound', {loop: false, volume: 10});
      }

    createNpcMovel(){
      this.npcMovel = this.physics.add.sprite(width - 380, height - 520, 'npcMovel'); // Posição inicial
        this.npcMovel.setScale(2.5);
        this.npcMovel.setImmovable(true);
        this.createNpcAnimations();
        this.npcMovel.anims.play('npcMovelWalk');

        this.npcMovel.direcao = -1; // Começa indo para a esquerda
        this.npcMovel.velocidade = 180; // Velocidade do deslocamento
        this.npcMovel.posicaoInicial = this.npcMovel.x;
        this.npcMovel.distanciaMaxima = 320;
    }

    addNpcLayer6() {
      this.npc17 = this.physics.add.sprite(width - 810, height - 624, 'npc17');
      this.npc17.setScale(3.0);
      this.npc17.setImmovable(true);
      this.createNpcAnimations();
      this.npc17.anims.play('npc17');
  
      this.npc18 = this.physics.add.sprite(width - 970, height - 624, 'npc18');
      this.npc18.setScale(3.0);
      this.npc18.setImmovable(true);
      this.createNpcAnimations();
      this.npc18.anims.play('npc18'); 

      this.npc19 = this.physics.add.sprite(width - 1130, height - 624, 'npc19');
      this.npc19.setScale(3.0);
      this.npc19.setImmovable(true);
      this.createNpcAnimations();
      this.npc19.anims.play('npc19');
    }

    addNpc() {
      //Adiciona a npc no jogo
      this.npc11 = this.physics.add.sprite(width - 1070, height - 185, 'npc11');
      this.npc11.setScale(2.5);
      this.npc11.setImmovable(true);
      this.createNpcAnimations();
      this.npc11.anims.play('Idle');
  
      this.npc12 = this.physics.add.sprite(width - 885, height - 265, 'npc12');
      this.npc12.setScale(2.5);
      this.npc12.setImmovable(true);
      this.createNpcAnimations();
      this.npc12.anims.play('npc12');

      this.npc13 = this.physics.add.sprite(width - 1070, height - 265, 'npc13');
      this.npc13.setScale(2.5);
      this.npc13.setImmovable(true);
      this.createNpcAnimations();
      this.npc13.setFlipX(true);
      this.npc13.anims.play('npc13');
      
      this.npc14 = this.physics.add.sprite(width - 655, height - 265, 'npc14');
      this.npc14.setScale(2.5);
      this.npc14.setImmovable(true);
      this.createNpcAnimations();
      this.npc14.play('npc14');
  
      this.npc15 = this.physics.add.sprite(width - 885, height - 185, 'npc15');
      this.npc15.setScale(2.5);
      this.npc15.setImmovable(true);
      this.createNpcAnimations();
      this.npc15.anims.play('npc15');
  
      this.npc16 = this.physics.add.sprite(width - 487, height - 200, 'npc16');
      this.npc16.setScale(2.5);
      this.npc16.setImmovable(true);
      this.createNpcAnimations();
      this.npc16.anims.play('npc16');

      //this.npcMovel = this.physics.add.sprite(width - 830, height - 400, 'npcMovel');
      //this.npcMovel.setScale(2.0);
      //this.npcMovel.setImmovable(true);
      //this.createNpcAnimations();
      //this.npcMovel.anims.play('npcMovel');

      this.npc23 = this.physics.add.sprite(width - 1200, height - 350, 'npc23');
      this.npc23.setScale(2.5);
      this.npc23.setImmovable(true);
      this.createNpcAnimations();
      this.npc23.anims.play('npc23');
    
    }
    
    createNpcAnimations() { 
        this.anims.create({
          key: "npc11",//sentado direita 1
          frames: this.anims.generateFrameNumbers('npc11', { start: 0, end: 5 }),
          frameRate: 6,
          repeat: -1,
        });

        this.anims.create({
          key: "npc12",//sentado direita 2
          frames: this.anims.generateFrameNumbers('npc12', { start: 0, end: 5 }),
          frameRate: 4,
          repeat: -1,
        });

        this.anims.create({
          key: "npc13",//sentado esquerda 1
          frames: this.anims.generateFrameNumbers('npc13', { start: 6, end: 11 }),
          frameRate: 4,
          repeat: -1,
        });

        this.anims.create({
          key: "npc14",//sentado esquerda 2
          frames: this.anims.generateFrameNumbers('npc14', { start: 6, end: 11 }),
          frameRate: 4,
          repeat: -1,
        });

        this.anims.create({
          key: "npc15",//sentado esquerda
          frames: this.anims.generateFrameNumbers('npc15', { start: 0, end: 5 }),
          frameRate: 4,
          repeat: -1,
        });

        this.anims.create({
          key: "npc16",//lendo livro
          frames: this.anims.generateFrameNumbers('npc16', { start: 0, end: 11 }),
          frameRate: 4,
          repeat: -1,
        });

        this.anims.create({
          key: "npc17",//idle baixo
          frames: this.anims.generateFrameNumbers('npc17', { start: 18, end: 23 }),
          frameRate: 4,
          repeat: -1,
        });

        this.anims.create({
          key: "npc18",//idle baixo
          frames: this.anims.generateFrameNumbers('npc18', { start: 18, end: 23 }),
          frameRate: 4,
          repeat: -1,
        });

        this.anims.create({
          key: "npc19",//idle baixo
          frames: this.anims.generateFrameNumbers('npc19', { start: 18, end: 23 }),
          frameRate: 4,
          repeat: -1,
        });

        //this.anims.create({
          //key: "npc20",
          //frames: this.anims.generateFrameNumbers('npc20', { start: 18, end: 23 }),
         // frameRate: 4,
          //repeat: -1,
        //});

        this.anims.create({
          key: "npc23",
          frames: this.anims.generateFrameNumbers('npc23', { start: 0, end: 11 }),
          frameRate: 4,
          repeat: -1,
        });

        this.anims.create({
          key: "npcMovelWalk",
          frames: this.anims.generateFrameNumbers('npcMovel', { start: 124, end: 129 }),
          frameRate: 10,
          repeat: -1,
      });    
      
      this.anims.create({
        key: "exclamando",
        frames: this.anims.generateFrameNumbers("indicator", {start: 0, end: 1}),
        //velocidade da animação
        frameRate: 3,
        repeat: -1,
      });
      
      }
      
    update(){
        this.movePlayer();
        this.moveNpcMovel();

        // LIXO
      if (this.trash) {
        const distTrash = Phaser.Math.Distance.Between(
          this.player.x, this.player.y,
          this.trash.x, this.trash.y
        );
        this.canInteractWithTrash = distTrash < 50;

        if (distTrash >= 50 && this.keyETrash) {
          this.keyETrash.destroy();
          this.keyETrash = null;
        }
      }

      // LIVRO
      if (this.book && this.npcMovelInteractionFinished) {
        const distBook = Phaser.Math.Distance.Between(
          this.player.x, this.player.y,
          this.book.x, this.book.y
        );
        this.canInteractWithBook = distBook < 100;

        if (this.canInteractWithBook) {
          if (!this.keyEBook) {
            this.keyEBook = this.add.image(this.book.x, this.book.y - 40, 'keyE').setScale(0.2);
          }
        } else {
          if (this.keyEBook) {
            this.keyEBook.destroy();
            this.keyEBook = null;
          }
        }
      }

      // INTERAÇÃO
      if (this.canInteractWithTrash && Phaser.Input.Keyboard.JustDown(this.teclas.interagir)) {
        this.buttonClick = this.sound.add('buttonSound', { loop: false, volume: 10 });
        this.buttonClick.play();
        this.scene.pause();
        this.scene.launch('minigameTrashScene');
        this.minigameComplete = true;
      }


      if (this.canInteractWithBook && this.npcMovelInteractionFinished && Phaser.Input.Keyboard.JustDown(this.teclas.interagir)) {
        this.buttonClick.play();
        this.scene.pause();
        this.scene.launch('bookScene');
        this.createButtonVoltar();
      }

      if (this.canInteractWithNpcMovel && Phaser.Input.Keyboard.JustDown(this.teclas.interagir)) {
        if (!this.npcMovelInteracted) {
          if (this.keyENpcMovel) {
            this.keyENpcMovel.destroy();
            this.keyENpcMovel = null;
          }
      
          this.npcMovelInteracted = true;
          this.canInteractWithNpcMovel = false; // desativa flag
          this.showNpcMovelInteraction();
        }
      }

      // RAFAELA
      if (this.rafaela && this.indicatorRafaelaActive) {
        const distRafaela = Phaser.Math.Distance.Between(this.player.x, this.player.y, this.rafaela.x, this.rafaela.y);
        this.canInteractWithRafaela = distRafaela < 70;
      
        if (this.canInteractWithRafaela) {
          if (this.indicatorSoundRafaela && this.indicatorSoundRafaela.isPlaying) {
            this.indicatorSoundRafaela.stop();
          }
      
          if (this.exclamation) {
            this.exclamation.destroy();
          }
      
          this.indicatorRafaelaActive = false;
      
          if (!this.keyERafaela) {
            this.keyERafaela = this.add.image(this.rafaela.x, this.rafaela.y - 60, 'keyE').setScale(0.2);
          }
        } else {
          if (this.keyERafaela) {
            this.keyERafaela.destroy();
            this.keyERafaela = null;
          }
        }
      }

      if (this.returnedFromTrash) {
        // Desativa o movimento
        this.npcMovel.anims.stop(); // Para a animação de andar
        this.npcMovel.setFlipX(false); // Direção neutra
      }
    }

    indicatorSound() {
      this.exclaming = this.sound.add('indicatorSound', {loop: false, volume: 10});
      this.exclaming.play();
    }

    movePlayer() {
      const velocidade = 150;
      let movendo = false;
    
      if (this.teclas.left.isDown) {
        this.player.setVelocityX(-velocidade);
        this.lastPosition = "left"; 
        this.player.anims.play("walk_left", true);
        movendo = true;
      } else if (this.teclas.right.isDown) {
        this.player.setVelocityX(velocidade);
        this.lastPosition = "right";
        this.player.anims.play("walk_right", true);
        movendo = true;
      } else {
        this.player.setVelocityX(0);
      }
    
      if (this.teclas.up.isDown) {
        this.player.setVelocityY(-velocidade);
        this.lastPosition = "up";
        this.player.anims.play("walk_up", true);
        movendo = true;
      } else if (this.teclas.down.isDown) {
        this.player.setVelocityY(velocidade);
        this.lastPosition = "down";
        this.player.anims.play("walk_down", true);
        movendo = true;
      } else {
        this.player.setVelocityY(0);
      }
    
      // Se o personagem parou, inicia a animação de stop_* em loop
      if (!movendo) {
        switch (this.lastPosition) {
          case "left":
            this.player.anims.play("stop_left", true);
            break;
          case "right":
            this.player.anims.play("stop_right", true);
            break;
          case "up":
            this.player.anims.play("stop_up", true);
            break;
          case "down":
          default:
            this.player.anims.play("stop_down", true);
            break;
        }
        this.walkSound.stop();
      } else {
        if (!this.walkSound.isPlaying) {
          this.walkSound.play();
        }
      }
    }
    
    createPlayer(width, height) {
      this.player = this.physics.add.sprite(width - 508, height - 660, 'player');
      this.player.setScale(2.5);
    }

    createPlayerAnimations() {
        this.anims.create({
          key: "walk_down",
          frames: this.anims.generateFrameNumbers("player", { start: 130, end: 135 }),
          frameRate: 10,
          repeat: -1,
        });
        this.anims.create({
          key: "walk_right",
          frames: this.anims.generateFrameNumbers("player", { start: 112, end: 117 }),
          frameRate: 10,
          repeat: -1,
        });
        this.anims.create({
          key: "walk_up",
          frames: this.anims.generateFrameNumbers("player", { start: 118, end: 123 }),
          frameRate: 10,
          repeat: -1,
        });
        this.anims.create({
          key: "walk_left",
          frames: this.anims.generateFrameNumbers("player", { start: 124, end: 129 }),
          frameRate: 10,
          repeat: -1,
        });
        this.anims.create({
          key: "stop_down",
          frames: this.anims.generateFrameNumbers("player", { start: 74, end: 79 }), 
          frameRate: 5, // Mais lento
          repeat: -1, // Loop infinito
        });
        this.anims.create({
          key: "stop_right",
          frames: this.anims.generateFrameNumbers("player", { start: 56, end: 61 }),
          frameRate: 5,
          repeat: -1,
        });
        this.anims.create({
          key: "stop_up",
          frames: this.anims.generateFrameNumbers("player", { start: 62, end: 67 }),
          frameRate: 5,
          repeat: -1,
        });
        this.anims.create({
          key: "stop_left",
          frames: this.anims.generateFrameNumbers("player", { start: 68, end: 73 }),
          frameRate: 5,
          repeat: -1,
        });
        
        
        
      }

    moveNpcMovel() {
      // Se o jogador já voltou do Trash, não move mais o NPC
      if (this.returnedFromTrash) return;

      this.npcMovel.x += this.npcMovel.direcao * this.npcMovel.velocidade * this.game.loop.delta / 1000;

      if (this.npcMovel.x <= this.npcMovel.posicaoInicial - this.npcMovel.distanciaMaxima) {
        this.npcMovel.direcao = 1;
        this.npcMovel.setFlipX(true);
      } else if (this.npcMovel.x >= this.npcMovel.posicaoInicial) {
        this.npcMovel.direcao = -1;
        this.npcMovel.setFlipX(false);
      }
    }

    addNpcMovelFixo() {
      console.log("Adicionando NPC fixo");
      this.npcMovel = this.physics.add.sprite(width - 720, height - 430, 'npcMovel'); 
      this.npcMovel.setScale(2.5);
      this.npcMovel.setFlipX(true); // Vira o NPC para a esquerda
      this.npcMovel.setImmovable(true);
      this.npcMovel.anims.stop(); // Não executa a animação de andar
    
      // Aqui você pode até definir uma animação idle, se quiser, ou deixar sem animação
      // this.npcMovel.anims.play('npcMovelIdle');
    
      this.createIndicatorNpcMovel(); // Ativa o indicador
    }

    createIndicatorNpcMovel() {
      this.indicatorNpcMovel = this.physics.add.sprite(this.npcMovel.x, this.npcMovel.y - 50, 'indicator');
      this.indicatorNpcMovel.setScale(0.2);
      this.indicatorNpcMovel.setImmovable(true);
      this.indicatorNpcMovel.play("exclamando");
    
      this.physics.add.overlap(this.player, this.indicatorNpcMovel, () => {
        if (!this.npcMovelInteracted && !this.keyENpcMovel) {
          this.indicatorNpcMovel.destroy();
      
          this.keyENpcMovel = this.add.image(this.npcMovel.x, this.npcMovel.y - 40, 'keyE').setScale(0.2);
          this.canInteractWithNpcMovel = true;
        }

      });
    }

    showNpcMovelInteraction() {
      const falas = [
        "Nossa, muito obrigado, isso significava muito para mim!", 
        "Como recompensa eu vou mostrar as minhas anotações que irão te ajudar a se preparar para uma entrevista.", 
        "Vá até a mesa e pegue o caderno em cima dela, lá você encontrará dicas para ir bem em uma entrevista."
      ];
      const balaoTexto = this.add.image(this.npcMovel.x + 80, this.npcMovel.y - 80, "balaoTexto").setScale(0.9);
      const text = this.add.text(this.npcMovel.x + 2, this.npcMovel.y - 140, falas[0], {
        fontSize: "14px",
        fill: "#000000",
        wordWrap: { width: balaoTexto.width - 20 },
      });
    
      let currentIndex = 0;
      this.input.keyboard.on("keydown-ENTER", () => {
        currentIndex++;
        if (currentIndex < falas.length) {
          text.setText(falas[currentIndex]);
        } else {
          text.setVisible(false);
          balaoTexto.setVisible(false);
          this.input.keyboard.off("keydown-ENTER");
          this.npcMovelInteractionFinished = true; // <- flag de controle
          this.createBook(); // garante que o livro foi criado
          this.createIndicatorBook();
        }
      });
    }

    createRafaelaAnimations() {
      this.anims.create({
        key: "rafaela",
        frames: this.anims.generateFrameNumbers('rafaela', { start: 0, end: 11 }),
        frameRate: 4,
        repeat: -1,
      });
    }
    
    addRafaela(width, height) {
      const rafaela = this.physics.add.sprite(width - 400, height - 600, 'rafaela');
      rafaela.setScale(2.5);
      rafaela.setImmovable(true);
      this.rafaela = rafaela; // Salva a referência do sprite de Rafaela
      this.createRafaelaAnimations();
      this.rafaela.anims.play('rafaela');

      this.exclamation = this.physics.add.sprite(width - 400, height - 660, "indicator").setScale(0.2);
      this.exclamation.play("exclamando");

      this.indicatorSoundRafaela = this.sound.add('indicatorSound', { loop: true, volume: 10 });
      this.indicatorSoundRafaela.play();

      this.indicatorRafaelaActive = true; // Controle para não tocar várias vezes
    
      rafaela.setInteractive();
      rafaela.on("pointerdown", () => {
          this.showrafaelaInteraction();
        });
    
        this.input.keyboard.on('keydown-E', () => {
          this.indicatorActive = false;
          if (
            Math.abs(this.player.x - rafaela.x) <= 70 &&
            Math.abs(this.player.y - rafaela.y) <= 70 &&
            !this.rafaelaInteracted
          ) {
            this.showrafaelaInteraction();
            this.rafaelaInteracted = true;
            this.buttonClick.play();
        
            // Destroi a tecla E da Rafaela
            if (this.keyERafaela) {
              this.keyERafaela.destroy();
              this.keyERafaela = null;
            }
          }
        });
      
        
    }
    
    showrafaelaInteraction() {
        this.exclamation.setVisible(false);
    
        const speechrafaela = [
          "Olá! Bem-Vindo a Vice-Presidência de Pessoas", 
          "aqui você irá aprender a lidar com colaboradores e receber dicas para uma entrevista.",
          "Você pode notar que o Rodrigo está tendo uma crise", 
          "isso porque jogaram o porta retratos dele no lixo, você poderia ajudá-lo?",
          "Basta ir até a lixeira, coletar a imagem rasgada e melhorar o humor de Rodrigo com as carinhas felizes.",
          "Boa Sorte!",
        ];//add scipt

        const width = this.scale.width;
        const height = this.scale.height;
        const balaoTexto = this.add.image(width - 500, height - 680, "balaoTexto").setScale(0.9);
        balaoTexto.setFlipX(true); // Inverte a imagem para ficar do lado certo
        const text = this.add.text(width - 580, height - 737, speechrafaela[0], {
          fontSize: "14px",
          fill: "#000000",
          wordWrap: { width: balaoTexto.width - 20 },
        });
    
        let currentSpeechIndex = 0;
        this.input.keyboard.on("keydown-ENTER", () => {
          currentSpeechIndex++;
          if (currentSpeechIndex < speechrafaela.length) {
            text.setText(speechrafaela[currentSpeechIndex]);
            this.buttonClick.play();
          } else {
            balaoTexto.setVisible(false);
            text.setVisible(false);
            this.input.keyboard.off("keydown-ENTER");
            this.showIndicatorTrash();
          }
        });
      }

      showIndicatorTrash() {
        this.createIndicatorTrash(); // Ativa o indicador e som do lixo
      }
      
    onShutdown() {
      // Salva o tempo atual da música e a para quando a cena é pausada ou encerrada
        if (this.PessoasMusic && this.PessoasMusic.isPlaying) {
          VpPessoasScene.lastMusicTime = this.PessoasMusic.seek;
          this.PessoasMusic.stop();
        }
      }

      createTrash() {
        const trash = this.physics.add.sprite(width - 735, height - 570, 'trash');
        trash.setScale(0.1);
        trash.setImmovable(true);
        //this.createIndicatorTrash();
      
        // Apenas overlap é necessário para ativar a possibilidade de interação
        this.physics.add.overlap(this.player, trash, () => {
          this.canInteractWithTrash = true;
        
          if (!this.keyETrash) {
            this.keyETrash = this.add.image(width - 735, height - 610, 'keyE').setScale(0.2);
          }
        });
      
        // Detectar quando sai da zona de interação (usando evento de update com verificação de distância)
        this.trash = trash; // Salva o objeto para usar no update
      }

      createBook() {
        const book = this.physics.add.sprite(width - 700, height - 250, 'book');
        book.setScale(0.06);
        book.setImmovable(true);
        //this.createIndicatorBook();
      
        // Apenas overlap é necessário para ativar a possibilidade de interação
        this.physics.add.overlap(this.player, book, () => {
          this.canInteractWithBook = true;

          if (!this.keyEBook) {
            this.keyEBook = this.add.image(width - 700, height - 250, 'keyE').setScale(0.2);
          }
        });
      
        // Detectar quando sai da zona de interação (usando evento de update com verificação de distância)
        this.book = book; // Salva o objeto para usar no update
      }

      createIndicatorTrash() {
        this.indicatorTrash = this.physics.add.sprite(width - 740, height - 630, 'indicator');
        this.indicatorTrash.setScale(0.2);
        this.indicatorTrash.setImmovable(true);
        this.indicatorTrash.play("exclamando");
      
        // Toca o som de alerta
        this.indicatorSoundTrash = this.sound.add('indicatorSound', { loop: true, volume: 10 });
        this.indicatorSoundTrash.play();
      
        this.physics.add.overlap(this.player, this.indicatorTrash, () => {
          if (this.indicatorTrashActive) {
            this.indicatorSoundTrash.stop();
            this.indicatorTrash.destroy();
            this.indicatorTrashActive = false;
          }
        });
      
        this.indicatorTrashActive = true; // Flag de controle
      }

      createIndicatorBook() {
        this.indicatorBook = this.physics.add.sprite(width - 700, height - 300, 'indicator');
        this.indicatorBook.setScale(0.2);
        this.indicatorBook.setImmovable(true);
        this.indicatorBook.play("exclamando");
      
        // Toca o som de alerta
        this.indicatorSoundBook = this.sound.add('indicatorSound', { loop: true, volume: 10 });
        this.indicatorSoundBook.play();
      
        this.physics.add.overlap(this.player, this.indicatorBook, () => {
          if (this.indicatorBookActive) {
            this.indicatorSoundBook.stop();
            this.indicatorBook.destroy();
            this.indicatorBookActive = false;
          }
        });
      
        this.indicatorBookActive = true; // Flag de controle
      }

      resume() {
        if (this.keyETrash) {
          this.keyETrash.destroy();
          this.keyETrash = null;
        }
      
        if (this.keyEBook) {
          this.keyEBook.destroy();
          this.keyEBook = null;
        }
      
        // FLAG para detectar retorno do Trash
        if (this.rafaelaInteracted && !this.returnedFromTrash) {
          this.returnedFromTrash = true;
      
          if (this.npcMovel) {
            this.npcMovel.destroy(); // Destrói o NPC que estava andando
            this.npcMovel = null;
          }
      
          if (!this.npcMovelFixedCreated) {
            this.npcMovelFixedCreated = true;
            this.addNpcMovelFixo(); // Adiciona o novo NPC parado com botão
          }
        }
      }

      createButtonVoltar(width, height) {
        const botaoVoltar = this.add.image(width - 740, height - 480, "keyE");
        botaoVoltar.setInteractive();
        botaoVoltar.setScale(0.2);
        botaoVoltar.setDepth(1); // Coloca o botão acima de outros objetos
        this.input.keyboard.on("keydown-E", () => {
          this.scene.stop("vpPessoasScene");
          this.scene.start("elevadorScene");
       });
      }
}

// Propriedade estática para armazenar o tempo de reprodução da música
VpPessoasScene.lastMusicTime = 0;

class bookScene extends Phaser.Scene {
  constructor() {
      super({ key: 'bookScene' });
  }

  preload() {
      this.load.image('arrowYellow', '../assets/assetsBookVPPessoas/arrow_yellow.png');
      this.load.image('backgroundTable', '../assets/assetsBookVPPessoas/backgroundTable.png');
      this.load.image('bookTable', '../assets/assetsBookVPPessoas/caderno.png');
      this.load.image('column1', '../assets/assetsBookVPPessoas/coluna1.png');
      this.load.image('column2', '../assets/assetsBookVPPessoas/coluna2.png');
      this.load.image('column3', '../assets/assetsBookVPPessoas/coluna3.png');
      this.load.image('column4', '../assets/assetsBookVPPessoas/coluna4.png');
      this.load.image('column5', '../assets/assetsBookVPPessoas/coluna5.png');
      this.load.image('board', '../assets/assetsBookVPPessoas/prancheta.png');
      this.load.image('answer1', '../assets/assetsBookVPPessoas/topico1.png');
      this.load.image('answer2', '../assets/assetsBookVPPessoas/topico2.png');
      this.load.image('answer3', '../assets/assetsBookVPPessoas/topico3.png');
      this.load.image('answer4', '../assets/assetsBookVPPessoas/topico4.png');
      this.load.image('answer5', '../assets/assetsBookVPPessoas/topico5.png');

      this.load.audio('buttonSound', '../assets/sounds/687107__aphom000__mouse-2-button-fast-click.wav');
      this.load.audio('soundPaper', '../assets/sounds/484957__spacejoe__page-turns-2 (mp3cut.net).wav');
  }

  create() {
      this.add.image(width / 2, height / 2, 'backgroundTable').setScale(0.7);
      this.add.image(width - 960, height - 340, 'bookTable').setScale(0.7);

      this.createArrow();
      this.createColumns();
      this.createBoard();
  }

  buttonSound() {
    this.buttonClick = this.sound.add('buttonSound', {loop: false, volume: 10});
    this.buttonClick.play();
  }

  soundPaper() {
    this.pageTurn = this.sound.add('soundPaper', {loop: false, volume: 10});
    this.pageTurn.play();
  }

  createArrow() {
    const buttonArrow = this.add.image(width - 1200, height - 70, 'arrowYellow');
      buttonArrow.setInteractive();
      buttonArrow.setScale(0.8);
      buttonArrow.on('pointerdown', () => {
          this.buttonSound();
          this.scene.stop('bookScene');
          this.scene.resume('vpPessoasScene');
      });
  }

  createColumns() {
    const column1 = this.add.image(width - 1105, height - 490, 'column1').setScale(0.7);
    const column2 = this.add.image(width - 1118, height - 430, 'column2').setScale(0.7);
    const column3 = this.add.image(width - 1110, height - 355, 'column3').setScale(0.7);
    const column4 = this.add.image(width - 1108, height - 275, 'column4').setScale(0.7);
    const column5 = this.add.image(width - 1110, height - 200, 'column5').setScale(0.7);

    const columns = [column1, column2, column3, column4, column5];

    columns.forEach((column, index) => {
    column.setInteractive();

    column.on('pointerover', () => {
      column.setScale(0.8); // Aumenta o tamanho ao passar o cursor
    });

    column.on('pointerout', () => {
      column.setScale(0.7); // Volta ao tamanho normal ao tirar o cursor
    });

    column.on('pointerdown', () => {
      this.column = index + 1; // Define a coluna selecionada
      this.buttonSound();
      this.createBoard(); // Atualiza o quadro com base na coluna selecionada
    });
    });
  }

  createBoard() {
    this.add.image(width - 460, height - 377, 'board').setScale(0.7);

    switch (this.column) {
    case 1:
      this.add.image(width - 460, height - 377, 'answer1').setScale(0.7);
      this.soundPaper();
      break;
    case 2:
      this.add.image(width - 460, height - 377, 'answer2').setScale(0.7);
      this.soundPaper();
      break;
    case 3:
      this.add.image(width - 460, height - 377, 'answer3').setScale(0.7);
      this.soundPaper();
      break;
    case 4:
      this.add.image(width - 460, height - 377, 'answer4').setScale(0.7);
      this.soundPaper();
      break;
    case 5:
      this.add.image(width - 460, height - 377, 'answer5').setScale(0.7);
      this.soundPaper();
      break;
    }
  }
}
