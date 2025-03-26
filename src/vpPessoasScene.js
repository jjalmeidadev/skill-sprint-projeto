class VpPessoasScene extends Phaser.Scene {
    constructor() {
      super({ key: 'vpPessoasScene' });
    }

//lembrar de criar os personagens 11 12 13 14 15 16 17 18 19 20 21 22 23 e add no jogo 
//6 sentados de frente
//3 sentados pra direta e 4 pra esquerda
//corrigir as coordenadas dos npcs
//verificar as layers

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

        this.load.spritesheet("npcReceptor", "../assets/personagens/LiderReading.png", { frameWidth: 16, frameHeight: 32, });         
        this.load.spritesheet("npc11", "../assets/personagens/VPpessoas/npc11.png", { frameWidth: 16, frameHeight: 32,});    
        this.load.spritesheet("npc12", "../assets/personagens/VPpessoas/npc12.png", { frameWidth: 16, frameHeight: 32,});   
        this.load.spritesheet("npc13", "../assets/personagens/VPpessoas/npc13.png", { frameWidth: 16, frameHeight: 32,});        
        this.load.spritesheet("npc14", "../assets/personagens/VPpessoas/npc14.png", { frameWidth: 16, frameHeight: 32,});      
        this.load.spritesheet("npc15", "../assets/personagens/VPpessoas/npc15.png", { frameWidth: 16, frameHeight: 32,});
        this.load.spritesheet("npc16", "../assets/personagens/VPpessoas/npc16.png", { frameWidth: 16, frameHeight: 32,});
        this.load.spritesheet("npc17", "../assets/personagens/VPpessoas/npc17.png", { frameWidth: 16, frameHeight: 32,});
        this.load.spritesheet("npc18", "../assets/personagens/VPpessoas/npc18.png", { frameWidth: 16, frameHeight: 32,});
        this.load.spritesheet("npc19", "../assets/personagens/VPpessoas/npc19.png", { frameWidth: 16, frameHeight: 32, });
        this.load.spritesheet("npc20", "../assets/personagens/VPpessoas/npc20.png", { frameWidth: 16, frameHeight: 32,});
        this.load.spritesheet("npc21", "../assets/personagens/VPpessoas/npc21.png", { frameWidth: 16, frameHeight: 32,});
        this.load.spritesheet("npc22", "../assets/personagens/VPpessoas/npc22.png", { frameWidth: 16, frameHeight: 32,});
        this.load.spritesheet("npc23", "../assets/personagens/VPpessoas/npc23.png", { frameWidth: 16, frameHeight: 32,});

        this.load.audio('PessoasMusic', '../assets/sounds/VPpessoas.mp3');
        this.load.audio('indicatorSound', '../assets/sounds/497198_abacagi_bubble-pops (mp3cut.net).wav');

        this.load.spritesheet('trash', '../assets/trash.png', {frameWidth: 267, frameHeight: 343});
        this.load.spritesheet('book', '../assets/assetsBookVPPessoas/book.png', {frameWidth: 835, frameHeight: 520});

        this.load.spritesheet("indicator", "../assets/exclamaçãoRoxa.png", {frameWidth: 254, frameHeight: 305,});
        this.load.image('keyE', '../assets/teclaE.png');
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

        
        // Configura colisões do jogador com camadas selecionadas
        this.physics.add.collider(this.player, layer2);
        this.physics.add.collider(this.player, layer3);
        this.physics.add.collider(this.player, layer4);
        this.physics.add.collider(this.player, layer5);
        this.physics.add.collider(this.player, layer6);
        this.physics.add.collider(this.player, layer7);
        this.physics.add.collider(this.player, layer9);

        // Adiciona os efeitos sonoros
        this.walkSound = this.sound.add('walkSound', {loop: false, volume: 10});

        // Cria a animação do indicador
        this.anims.create({
          key: "exclamando",
          frames: this.anims.generateFrameNumbers("indicator", {start: 0, end: 1}),
          frameRate: 3, // Velocidade da animação
          repeat: -1,
        });

        this.createTrash();
        this.createBook();
    }

    addNpc() {
      //Adiciona a npc no jogo
      this.npc11 = this.physics.add.sprite(width - 950, height - 200, 'npc11');
      this.npc11.setScale(2.0);
      this.npc11.setImmovable(true);
      this.createNpcAnimations();
      this.npc11.anims.play('Idle');
  
      this.npc12 = this.physics.add.sprite(width - 895, height - 105, 'npc12');
      this.npc12.setScale(2.0);
      this.npc12.setImmovable(true);
      this.createNpcAnimations();
      this.npc12.anims.play('npc12');
  
      this.npc13 = this.physics.add.sprite(width - 767, height - 105, 'npc13');
      this.npc13.setScale(2.0);
      this.npc13.setImmovable(true);
      this.createNpcAnimations();
      this.npc13.setFlipX(true);
      this.npc13.anims.play('npc13');
  
      this.npc14 = this.physics.add.sprite(width - 655, height - 145, 'npc14');
      this.npc14.setScale(2.0);
      this.npc14.setImmovable(true);
      this.createNpcAnimations();
      this.npc14.play('npc14');
  
      this.npc15 = this.physics.add.sprite(width - 1135, height - 145, 'npc15');
      this.npc15.setScale(2.0);
      this.npc15.setImmovable(true);
      this.createNpcAnimations();
      this.npc15.anims.play('npc15');
  
      this.npc16 = this.physics.add.sprite(width - 710, height - 200, 'npc16');
      this.npc16.setScale(2.0);
      this.npc16.setImmovable(true);
      this.createNpcAnimations();
      this.npc16.anims.play('npc16');

      this.npc17 = this.physics.add.sprite(width - 765, height - 250, 'npc17');
      this.npc17.setScale(2.0);
      this.npc17.setImmovable(true);
      this.createNpcAnimations();
      this.npc17.anims.play('npc17');

      this.npc18 = this.physics.add.sprite(width - 820, height - 300, 'npc18');
      this.npc18.setScale(2.0);
      this.npc18.setImmovable(true);
      this.createNpcAnimations();
      this.npc18.anims.play('npc18');

      this.npc19 = this.physics.add.sprite(width - 875, height - 350, 'npc19');
      this.npc19.setScale(2.0);
      this.npc19.setImmovable(true);
      this.createNpcAnimations();
      this.npc19.anims.play('npc19');

      this.npc20 = this.physics.add.sprite(width - 930, height - 400, 'npc20');
      this.npc20.setScale(2.0);
      this.npc20.setImmovable(true);
      this.createNpcAnimations();
      this.npc20.anims.play('npc20');

      this.npc21 = this.physics.add.sprite(width - 985, height - 450, 'npc21');
      this.npc21.setScale(2.0);
      this.npc21.setImmovable(true);
      this.createNpcAnimations();
      this.npc21.anims.play('npc21');

      this.npc22 = this.physics.add.sprite(width - 1040, height - 500, 'npc22');
      this.npc22.setScale(2.0);
      this.npc22.setImmovable(true);
      this.createNpcAnimations();
      this.npc22.anims.play('npc22');

      this.npc23 = this.physics.add.sprite(width - 1095, height - 550, 'npc23');
      this.npc23.setScale(2.0);
      this.npc23.setImmovable(true);
      this.createNpcAnimations();
      this.npc23.anims.play('npc23');
    
    }
    
    createNpcAnimations() { 
        this.anims.create({

          //sentado direita 1: 280-285, sentado esquerda 1: 286-291
          //setado direita 2: 336-341, sentado esquerda 2: 342-347
          //no celular: 392-403
          //lendo livro: 448-459
          //idle direita: 56-62
          //idle cima: 63-68
          //idle esquerda: 69-74
          //idle baixo: 75-80

          key: "npc11",//sentado direita 1
          frames: this.anims.generateFrameNumbers('npc11', { start: 280, end: 285 }),
          frameRate: 4,
          repeat: -1,
        });

        this.anims.create({
          key: "npc12",//sentado direita 2
          frames: this.anims.generateFrameNumbers('npc12', { start: 336, end: 341 }),
          frameRate: 4,
          repeat: -1,
        });

        this.anims.create({
          key: "npc13",//sentado esquerda 1
          frames: this.anims.generateFrameNumbers('npc13', { start: 286, end: 291 }),
          frameRate: 4,
          repeat: -1,
        });

        this.anims.create({
          key: "npc14",//sentado esquerda 2
          frames: this.anims.generateFrameNumbers('npc14', { start: 342, end: 347 }),
          frameRate: 4,
          repeat: -1,
        });

        this.anims.create({
          key: "npc15",//no celular
          frames: this.anims.generateFrameNumbers('npc15', { start: 392, end: 403 }),
          frameRate: 4,
          repeat: -1,
        });

        this.anims.create({
          key: "npc16",//lendo livro
          frames: this.anims.generateFrameNumbers('npc16', { start: 448, end: 459 }),
          frameRate: 4,
          repeat: -1,
        });

        this.anims.create({
          key: "npc17",//idle baixo
          frames: this.anims.generateFrameNumbers('npc17', { start: 75, end: 80 }),
          frameRate: 4,
          repeat: -1,
        });

        this.anims.create({
          key: "npc18",//idle baixo
          frames: this.anims.generateFrameNumbers('npc18', { start: 75, end: 80 }),
          frameRate: 4,
          repeat: -1,
        });

        this.anims.create({
          key: "npc19",//idle baixo
          frames: this.anims.generateFrameNumbers('npc19', { start: 75, end: 80 }),
          frameRate: 4,
          repeat: -1,
        });

        this.anims.create({
          key: "npc20",
          frames: this.anims.generateFrameNumbers('npc20', { start: 0, end: 5 }),
          frameRate: 4,
          repeat: -1,
        });

        this.anims.create({
          key: "npc21",
          frames: this.anims.generateFrameNumbers('npc21', { start: 0, end: 5 }),
          frameRate: 4,
          repeat: -1,
        });

        this.anims.create({
          key: "npc22",
          frames: this.anims.generateFrameNumbers('npc22', { start: 0, end: 5 }),
          frameRate: 4,
          repeat: -1,
        });

        this.anims.create({
          key: "npc23",
          frames: this.anims.generateFrameNumbers('npc23', { start: 0, end: 5 }),
          frameRate: 4,
          repeat: -1,
        });
      }

    update() {
      this.movePlayer();

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
      if (this.book) {
        const distBook = Phaser.Math.Distance.Between(
          this.player.x, this.player.y,
          this.book.x, this.book.y
        );
        this.canInteractWithBook = distBook < 50;

        if (distBook >= 50 && this.keyEBook) {
          this.keyEBook.destroy();
          this.keyEBook = null;
        }
      }

      // INTERAÇÃO
      if (this.canInteractWithTrash && Phaser.Input.Keyboard.JustDown(this.teclas.interagir)) {
        this.buttonClick = this.sound.add('buttonSound', { loop: false, volume: 10 });
        this.buttonClick.play();
        this.scene.pause();
        this.scene.launch('minigameTrashScene');
      }

      if (this.canInteractWithBook && Phaser.Input.Keyboard.JustDown(this.teclas.interagir)) {
        this.buttonClick = this.sound.add('buttonSound', { loop: false, volume: 10 });
        this.buttonClick.play();
        this.scene.pause();
        this.scene.launch('bookScene');
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
        this.createIndicatorTrash();
      
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
        const book = this.physics.add.sprite(width - 700, height - 350, 'book');
        book.setScale(0.06);
        book.setImmovable(true);
        this.createIndicatorBook();
      
        // Apenas overlap é necessário para ativar a possibilidade de interação
        this.physics.add.overlap(this.player, book, () => {
          this.canInteractWithBook = true;

          if (!this.keyEBook) {
            this.keyEBook = this.add.image(width - 700, height - 350, 'keyE').setScale(0.2);
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
        this.indicatorBook = this.physics.add.sprite(width - 700, height - 400, 'indicator');
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
