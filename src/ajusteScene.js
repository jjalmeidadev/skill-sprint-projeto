 class AjusteScene extends Phaser.Scene {
  constructor() {
    super({ key: 'ajusteScene' });
  }

  preload() {
    // Carrega os ativos visuais
    this.load.image('bg01', '../assets/assetsBackground/1.png');
    this.load.image('bg02', '../assets/assetsBackground/2.png');
    this.load.image('bg03', '../assets/assetsBackground/3.png');
    this.load.image('bg04', '../assets/assetsBackground/4.png');
    this.load.image('bg05', '../assets/assetsBackground/5.png');
    this.load.image('bg06', '../assets/assetsBackground/6.png');
     //adiciona a imagem de fundo da cena de ajustes
    this.load.image('layoutAjustes', '../assets/assets_botoes/layoutAjustses.png');
    //adiciona imagem dos botões de ajustes
    this.load.image('botaoMais', '../assets/assets_botoes/botaoMais.png');
    this.load.image('botaoMenos', '../assets/assets_botoes/botaoMenos.png');
    //adiciona imagem do botão de retorno
    this.load.image('botaoVoltar', '../assets/assets_botoes/botoaX.png');
    //adiciona o titulo do jogo 
    this.load.image('titulo', '../assets/assetsBackground/titulo.png ');
    // Carrega o áudio da tela inicial
    this.load.audio('initialMusic', '../assets/Adventure Meme [ ezmp3.co ].mp3');
    this.load.audio('buttonSound', '../assets/sounds/687107__aphom000__mouse-2-button-fast-click.wav');
  }

  create() {
    const width = this.scale.width;
    const height = this.scale.height;
        this.cameras.main.fadeIn(1000);

    this.bgs = [];
    const speeds = [0.005, 0.05, 0.07, 0.08, 0.09, 0.1];
        for (let i = 0; i < 6; i++) {
            let bg = this.add.tileSprite(0, 0, 576, 324, `bg0${i + 1}`)
                .setOrigin(0, 0)
                .setScale(2.8);

            this.bgs.push({ sprite: bg, speed: speeds[i] });
        }
    
        // Inicia a música da tela inicial em loop
     this.initialMusic = this.sound.add('initialMusic', { loop: true, volume: 1 });
     this.initialMusic.play();

     // Registra os eventos para pausar a música ao sair/pausar a cena
     this.events.on('shutdown', this.shutdown, this);
     this.events.on('pause', this.shutdown, this);
    
     //cria assets
     this.add.image(width/2, height/4, 'titulo').setScale(2.0);
     this.add.image(width/2, height - 250, 'layoutAjustes').setScale(1.0);

     // Cria os botões da tela inicial
     this.createButtonDiminuirVolume(width, height);
     this.createButtonAumentarVolume(width, height);
     this.createButtonVoltar(width, height);
 }

   createButtonVoltar(width, height) {
      const botaoVoltar = this.add.image((width / 2) + 190, height - 338, 'botaoVoltar');
        botaoVoltar.setInteractive();
        botaoVoltar.setScale(0.9);
        botaoVoltar.on('pointerdown', () => {
          this.buttonSound();
          this.shutdown();
          this.scene.stop('ajusteScene');
          this.scene.start('initialScene');
    });
}
    
    createButtonAumentarVolume(width, height) {
      const botaoMais = this.add.image((width / 2) - 60, (height / 2) + 200, 'botaoMais');
        botaoMais.setInteractive();
        botaoMais.setScale(1);
        botaoMais.on('pointerdown', () => {
          this.buttonSound();
          this.sound.volume += 0.5;
      });
    }

    createButtonDiminuirVolume(width, height) {
        const botaoMenos = this.add.image((width / 2) - 170  , (height / 2) + 200, 'botaoMenos');
            botaoMenos.setInteractive();
            botaoMenos.setScale(1);
            botaoMenos.on('pointerdown', () => {
              this.buttonSound(); 
              this.sound.volume -= 0.5;
        });
    }

    shutdown() {
        // Interrompe a música ao encerrar ou pausar a cena
        if (this.initialMusic && this.initialMusic.isPlaying) {
            this.initialMusic.stop();
        }
    }

    buttonSound() {
        this.buttonClick = this.sound.add('buttonSound', {loop: false, volume: 10});
        this.buttonClick.play();
    }

    update() {
        this.bgs.forEach(layer => {
            layer.sprite.tilePositionX += layer.speed;
        });
    }
}