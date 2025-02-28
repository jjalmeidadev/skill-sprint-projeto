class CutScene extends Phaser.Scene {
    constructor() {
      super({ key: 'cutScene' });
    }

    preload() {
      // Carrega o vídeo da cutscene
      this.load.video('cutScene', '../assets/cutsceneVivo.mp4');
    }
  
    create() {
      // Adiciona o vídeo à cena
      this.video = this.add.video(this.cameras.main.width / 2, this.cameras.main.height / 2, 'cutScene').setOrigin(0.5);
      this.video.setDisplaySize(window.innerWidth, window.innerHeight);
      this.video.setScale(0.5); // Diminui o tamanho do vídeo para 50% do original

      this.playCutScene();
      };
		
    playCutScene() {
      this.video.play(false);
       // Quando o vídeo terminar, inicia a próxima cena do jogo
        this.video.on('complete', () => {
        this.scene.start('tutorialScene'); // Troca para a cena principal do jogo
      });
    } 
  }
 
        /*this.input.on('pointerdown', () => {
		  this.scene.stop('cutScene'),
		  this.scene.start('tutorialScene')*/
  