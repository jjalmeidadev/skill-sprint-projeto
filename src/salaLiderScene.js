class SalaLider extends Phaser.Scene {
    constructor() {
        super({ key: 'salaLiderScene' });
    }
    preload() {
        // Carrega a sprite do jogador e da exclamação
        this.load.spritesheet('player', '../assets/Player.png', { frameWidth: 32, frameHeight: 32 });
        this.load.spritesheet('indicator', '../assets/spriteexclamação.png',{ frameWidth:254, frameHeight: 291 });

        // Carrega a vivita e o balão de texto
        this.load.image('vivita', '../assets/vivita.png');
        this.load.image('balaoTexto', '../assets/balaoTexto.png');

        // Carrega o mapa da sala do líder
        this.load.tilemapTiledJSON('salaLider', '../assets/mapaSalaLider/mapaSalaLider.json');
        this.load.image('decoracao', '../assets/mapaSalaLider/decoracao.png');
    }

    create() {
        this.cameras.main.fadeIn(1000); // Transição suave

        //cria a animação da exclamação
        this.anims.create({
            key: 'exclamando',
            frames: this.anims.generateFrameNumbers('indicator', { start: 0, end: 1 }),
            //velocidade da animação
            frameRate: 3,
            repeat: -1
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
        const map = this.make.tilemap({ key: "salaLider", tileWidth: 10, tileHeight: 6});

        // Adiciona o tileset utilizado no mapa
        const tileset = map.addTilesetImage("decoracao");

        const offsetX = width - 1170; // Offset para centralizar o mapa
        const offsetY = height - 650; // Offset para centralizar o mapa

        // Adiciona as camadas do mapa
        const layer1 = map.createLayer("chao", tileset, offsetX, offsetY).setScale(5);
        const layer2 = map.createLayer("tapete", tileset, offsetX, offsetY).setScale(5);
        const layer3 = map.createLayer("parede", tileset, offsetX, offsetY).setScale(5);
        const layer4 = map.createLayer("mesa", tileset, offsetX, offsetY).setScale(5);
        const layer5 = map.createLayer("decoracao", tileset, offsetX, offsetY).setScale(5);
        const layer6 = map.createLayer("pertences", tileset, offsetX, offsetY).setScale(5);

        // Torna as colisões criadas no Tiled válidas no jogo
        layer1.setCollisionByProperty({ collider: true });
        layer2.setCollisionByProperty({ collider: true });
        layer3.setCollisionByProperty({ collider: true });
        layer4.setCollisionByProperty({ collider: true });
        layer5.setCollisionByProperty({ collider: true });
        layer6.setCollisionByProperty({ collider: true });


        
        this.addLeader();
        this.createPlayer();
        this.createPlayerAnimations();

        // Configura colisões entre o jogador e algumas camadas selecionadas
        this.physics.add.collider(this.player, layer3);
        this.physics.add.collider(this.player, layer4);
        this.physics.add.collider(this.player, layer5);
        //this.physics.add.collider(this.player, this.vivita);
    }

    update() {
        // Atualiza o movimento do jogador
        this.movePlayer();
    }   

    movePlayer() {
        const velocidade = 150;
        let movendo = false;
    
        // Movimentação do jogador utilizando as teclas WASD
        if (this.teclas.left.isDown) {
          this.player.setVelocityX(-velocidade);
          this.player.anims.play("walk_left", true);
          this.player.setFlipX(true); // Vira o sprite para a esquerda
          movendo = true;
        } else if (this.teclas.right.isDown) {
          this.player.setVelocityX(velocidade);
          this.player.anims.play("walk_right", true);
          this.player.setFlipX(false); // Mantém o sprite para a direita
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
        }
      }

      createPlayer() {
        // Cria o sprite do jogador usando as dimensões da tela
        this.player = this.physics.add.sprite(width - 1050, height - 230, 'player');
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

      addLeader() {
        // Adiciona a vivita no jogo
        this.vivita = this.physics.add.sprite(width - 600, height - 300, 'vivita').setScale(0.18);
        this.vivita.setImmovable(true);
        this.vivita.setFlipX(true); // Vira a vivita para a esquerda
    
        // Adiciona a sprite da exclamação
        this.exclamation = this.add.sprite(width - 600, height - 400, 'indicator').setScale(0.3);
        this.exclamation.play('exclamando'); // Inicia a animação
        this.indicatorActive = true;
    
        // Torna a vivita interativa
        this.vivita.setInteractive();
        this.vivita.on('pointerdown', () => {
          this.showVivitaInteraction(); // Chama a função de interação com a vivita
        });
    
        // Adiciona um evento para a tecla 'E'
        this.input.keyboard.on('keydown-E', () => {
          // Verifica se o jogador está próximo da Vivita
          if (
            Math.abs(this.player.x - this.vivita.x) <= 50 &&
            Math.abs(this.player.y - this.vivita.y) <= 50 &&
            !this.vivitaInteracted // Verifica se a interação já ocorreu
          ) {
            // Chama a função de interação com a vivita
            this.showVivitaInteraction();
            this.vivitaInteracted = true; // Marca que a interação ocorreu
          }
        });
      }

      showVivitaInteraction() {
        this.exclamation.setVisible(false); // Deixa a exclamação da vivita invisível
    
        // Lista com as falas da vivita
        var speechVivita = ['Olá, Fulano! Tudo bem?', 
                            'Ah, então quer dizer que você quer migrar para uma nova VP? Que alegria!',
                            'Vou analisar seu currículo.',
                            'Vamos ver...', 
                            'Seu currículo está uma maravilha! Seguiu todas as diretrizes!',
                            'Vá até o elevador para conhecer as áreas internas da vivo!'];
    
        // Adiciona o balão da fala da vivita                    
        const balaoTexto = this.add.image(width - 730, height - 420, 'balaoTexto');
        balaoTexto.setFlipX(true);
    
        // Adiciona uma caixa de texto dentro do balão de texto
        const text = this.add.text(width - 815, height - 480, speechVivita[0], {
          fontSize: '16px',
          fill: '#000000',
          wordWrap: { width: balaoTexto.width - 20 }
        });
    
        // Lógica para alternar entre as falas
        let currentSpeechIndex = 0;
        this.input.keyboard.on('keydown-ENTER', () => { // As falas avançam apertando a tecla ENTER
          currentSpeechIndex++; // Soma 1 cada fez que uma fala passa
          if (currentSpeechIndex < speechVivita.length) { // Se a fala que está mostrando no momento estiver em uma posição menor do que o tamanho da lista, avança
            text.setText(speechVivita[currentSpeechIndex]); // Mostra a fala de acordo com a posição na lista
          } else {
            balaoTexto.setVisible(false); // Deixa o balão da fala da vivita invisível
            text.setVisible(false); // Deixa as falas invisíveis
    
            this.backToOffice(); // Chama a função que adiciona a exclamação no computador
          }
        });
      }

    backToOffice() {
      // Adiciona a sprite da exclamação
      this.exclamacao = this.physics.add.sprite(width - 1050, height - 230, 'indicator').setScale(0.3);
      this.exclamacao.setImmovable(true);
      this.exclamacao.play('exclamando'); // Inicia a animação
      this.indicatorActive = true;

      // Adiciona um overlap entre o player e a exclamation
      this.physics.add.overlap(this.player, this.exclamacao , () => {
        this.scene.switch('officeScene'); // Troca para a cena do escritório
    });
    }
}