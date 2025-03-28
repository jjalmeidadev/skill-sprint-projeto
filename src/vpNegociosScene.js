class VpNegociosScene extends Phaser.Scene {
    constructor() {
      super({ key: 'vpNegociosScene' });
      
    }

    preload() {
        // Carrega o mapa do Tiled e os tilesets
        this.load.tilemapTiledJSON('vpNegocios', '../assets/mapaVPNegocios/mapaVPNegocios.json');
        this.load.image('decoracao', '../assets/mapaVPNegocios/decoracao.png');
        this.load.image('paredes', '../assets/mapaVPNegocios/paredes.png');

        // Carrega imagens, spritesheets e demais ativos
        this.load.spritesheet('player', '../assets/personagens/skinsPlayer/player1all.png', { frameWidth: 16, frameHeight: 32 });

        // Carrega os efeitos sonoros
        this.load.audio('walkSound', '../assets/sounds/753292__vrymaa__footsteps-high-heels-hardwood-walk-run (mp3cut.net).wav');
        this.load.spritesheet("indicator", "../assets/exclamaçãoRoxa.png", {frameWidth: 254, frameHeight: 305,});
        this.load.image('keyE', '../assets/teclaE.png');
        this.load.audio('indicatorSound', '../assets/sounds/497198_abacagi_bubble-pops (mp3cut.net).wav');

        this.load.image("bgElevNegocios", "../assets/bgelevadoroffice.png");
        this.load.image("painelelev", "../assets/painelelevador.png");
        this.load.image("botaoElevNegocios", "../assets/botaocimaelevador.png");
    }

    create() {
        // Cria o mapa e as camadas
        const map = this.make.tilemap({ key: "vpNegocios", tileWidth: 25, tileHeight: 20 });
        const tileset1 = map.addTilesetImage("decoracao");
        const tileset2 = map.addTilesetImage("paredes");

        const offsetX = width - 1270;
        const layer1 = map.createLayer("chao", tileset2, offsetX, 0).setScale(2.5);
        const layer2 = map.createLayer("parede", tileset2, offsetX, 0).setScale(2.5);
        const layer3 = map.createLayer("acabamento", tileset2, offsetX, 0).setScale(2.5);
        const layer4 = map.createLayer("cadeiraTras", tileset1, offsetX, 0).setScale(2.5);
        const layer5 = map.createLayer("cadeira", tileset1, offsetX, 0).setScale(2.5);
        const layer6 = map.createLayer("mesa", tileset1, offsetX, 0).setScale(2.5);
        const layer7 = map.createLayer("servidor", tileset1, offsetX, 0).setScale(2.5);
        const layer8 = map.createLayer("sofa", tileset1, offsetX, 0).setScale(2.5);
        const layer9 = map.createLayer("planta", tileset1, offsetX, 0).setScale(2.5);
        const layer10 = map.createLayer("porta", tileset1, offsetX, 0).setScale(2.5);
        const layer11 = map.createLayer("decoracao", tileset1, offsetX, 0).setScale(2.5);

        [layer1, layer2, layer3, layer4, layer5, layer6, layer7, layer8, layer9, layer10, layer11].forEach(layer => {
        layer.setCollisionByProperty({ collider: true });
        });

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
        this.createAnimsIndicator();
        this.lastPosition = "down"
        this.createButtonVoltar(width, height);

        // Configura colisões do jogador com camadas selecionadas
        this.physics.add.collider(this.player, layer2);
        this.physics.add.collider(this.player, layer4);
        this.physics.add.collider(this.player, layer5);
        this.physics.add.collider(this.player, layer6);
        this.physics.add.collider(this.player, layer7);
        this.physics.add.collider(this.player, layer8);
        this.physics.add.collider(this.player, layer9);

        // Adiciona os efeitos sonoros
        this.walkSound = this.sound.add('walkSound', {loop: false, volume: 2});
        this.indicatorSound = this.sound.add('indicatorSound', {loop: true, volume: 1.5});
        this.buttonClick = this.sound.add('buttonSound', {loop: false, volume: 10});

    }

    update(){
        this.movePlayer();
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
    this.player = this.physics.add.sprite(width - 670, height - 660, 'player');
    this.player.setScale(2.5);
   }

  createAnimsIndicator() {
    //cria a animação
    this.anims.create({
     key: "exclamando",
      frames: this.anims.generateFrameNumbers("indicator", {start: 0, end: 1}),
       //velocidade da animação
      frameRate: 3,
      repeat: -1,
   });
  }

  createButtonVoltar(width, height) {
    const botaoVoltar = this.add.image(width - 670, height - 680, "keyE");
    botaoVoltar.setScale(0.2);

    this.input.keyboard.on("keydown-E", () => {
        const distancia = Phaser.Math.Distance.Between(
            this.player.x, this.player.y, botaoVoltar.x, botaoVoltar.y
        );

        if (distancia < 100) { // Ajuste o raio conforme necessário
            this.scene.stop("vpNegociosScene");
            this.scene.start("elevadorScene");
        }
    });
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
}

