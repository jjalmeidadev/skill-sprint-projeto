class cutScene extends Phaser.Scene {
    constructor() {
      super({ key: 'cutScene' });
    }
  
    preload() {
      // Carrega o vídeo da cutscene
      this.load.video('cutscene', '../assets/cutsceneVivo.mp4');
    }
  
    create() {
      // Adiciona o vídeo à cena
      this.video = this.add.video(this.cameras.main.width / 2, this.cameras.main.height / 2, 'cutscene');
      this.video.setOrigin(0.5);
      this.video.setDisplaySize(window.innerWidth, window.innerHeight);
      this.video.setScale(0.5); // Diminui o tamanho do vídeo para 50% do original
      this.video.play(false);
  
      // Quando o vídeo terminar, inicia a próxima cena do jogo
      /*this.video.on('complete', () => {
        this.scene.start('startScene'); // Troca para a cena principal do jogo
      });*/

      this.input.on('pointerdown', () => {
		this.scene.stop('cutScene'),
		this.scene.start('officeScene')
		})
    }
  }
 
  