class VpTecnologiaScene extends Phaser.Scene {
    constructor() {
        super({ key: 'vpTecnologiaScene' });
    }

    preload() {
        //Carrega o mapa do Tiled e os tilesets
        this.load.tilemapTiledJSON('vpTecnologia', '../assets/vp_tecnologia/mapa.json');
        this.load.image('decoracao', '../assets/mapaVPPessoas/decoracao.png');
        this.load.image('paredes', '../assets/mapaVPPessoas/paredes.png');
        this.load.spritesheet('player', '../assets/Player.png', { frameWidth: 32, frameHeight: 32 });

        this.load.audio('walkSound', '../assets/sounds/753292__vrymaa__footsteps-high-heels-hardwood-walk-run (mp3cut.net).wav');

    }

    create() {

        const width = this.cameras.main.width;
        const height = this.cameras.main.height;

        // Cria o mapa e as camadas
        const offsetX = this.scale.width - 1270;
        const map = this.make.tilemap({ key: "vpTecnologia", tileWidth: 25, tileHeight: 20 });
        const tileset1 = map.addTilesetImage("decoracao");
        const tileset2 = map.addTilesetImage("paredes");

        const layer1 = map.createLayer("paredePiso", tileset2, offsetX, 0).setScale(2.5);
        const layer2 = map.createLayer("tapete", tileset1, offsetX, 0).setScale(2.5);
        const layer3 = map.createLayer("parede", tileset2, offsetX, 0).setScale(2.5);
        const layer4 = map.createLayer("cadeira", tileset1, offsetX, 0).setScale(2.5);
        const layer5 = map.createLayer("tv", tileset1, offsetX, 0).setScale(2.5);
        const layer6 = map.createLayer("sofa", tileset1, offsetX, 0).setScale(2.5);
        const layer7 = map.createLayer("elevador", tileset1, offsetX, 0).setScale(2.5);

        let layers = [layer1, layer2, layer3, layer4, layer5, layer6, layer7];
        layers.forEach(layer => {
            layer.setCollisionByProperty({ collider: true });
        });

        this.createPlayer(width, height);
        this.createPlayerAnimations();

          // Configura colisões do jogador com camadas selecionadas
          this.physics.add.collider(this.player, layer1);
          this.physics.add.collider(this.player, layer3);
          this.physics.add.collider(this.player, layer4);
          this.physics.add.collider(this.player, layer5);
          this.physics.add.collider(this.player, layer6);

        //Config teclado
        this.teclas = this.input.keyboard.addKeys({
            up: Phaser.Input.Keyboard.KeyCodes.W,
            down: Phaser.Input.Keyboard.KeyCodes.S,
            left: Phaser.Input.Keyboard.KeyCodes.A,
            right: Phaser.Input.Keyboard.KeyCodes.D,
            interagir: Phaser.Input.Keyboard.KeyCodes.E,
            ENTER: Phaser.Input.Keyboard.KeyCodes.ENTER
        });

        this.walkSound = this.sound.add('walkSound', {loop: false, volume: 2});

    }

    update() {
        this.movePlayer();
    }

    createPlayer(width, height) {
        this.player = this.physics.add.sprite(width - 405, height - 100, "player");
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
}
