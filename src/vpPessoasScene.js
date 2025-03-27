class VpPessoasScene extends Phaser.Scene {
    constructor() {
      super({ key: 'vpPessoasScene' });
    }

    preload() {
        // Carrega o mapa do Tiled e os tilesets
        this.load.tilemapTiledJSON('vpPessoas', '../assets/mapaVPPessoas/mapaVPPessoas.json');
        this.load.image('decoracao', '../assets/mapaVPPessoas/decoracao.png');
        this.load.image('paredes', '../assets/mapaVPPessoas/paredes.png');    

        // Carrega imagens, spritesheets e demais ativos
        this.load.spritesheet('player', '../assets/Player.png', { frameWidth: 32, frameHeight: 32 });

        // Carrega os efeitos sonoros
        this.load.audio('walkSound', '../assets/sounds/753292__vrymaa__footsteps-high-heels-hardwood-walk-run (mp3cut.net).wav');
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

      createPlayer(width, height) {
        this.player = this.physics.add.sprite(width - 508, height - 660, 'player');
        this.player.setScale(2.5);
      }

      createPlayerAnimations() {
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
