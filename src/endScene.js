class EndScene extends Phaser.Scene {
    constructor() {
        super({key: "endScene"}); // Define a chave única para a cena.
    }

    init(data) {
        this.selectedSpriteSheet = data.selectedSpriteSheet;
        //this.fromScene = data.fromScene || null; // Captura de onde o player veio
      }

    preload() {
        this.load.image("bg01", "../assets/assetsBackground/1.png"); // Carrega a imagem de fundo da camada 1
        this.load.image("bg02", "../assets/assetsBackground/2.png"); // Carrega a imagem de fundo da camada 2
        this.load.image("bg03", "../assets/assetsBackground/3.png"); // Carrega a imagem de fundo da camada 3
        this.load.image("bg04", "../assets/assetsBackground/4.png"); // Carrega a imagem de fundo da camada 4
        this.load.image("bg05", "../assets/assetsBackground/5.png"); // Carrega a imagem de fundo da camada 5
        this.load.image("bg06", "../assets/assetsBackground/6.png"); // Carrega a imagem de fundo da camada 6
        this.load.spritesheet('player', `../assets/personagens/skinsPlayer/players/${this.selectedSpriteSheet}.png`, {frameWidth: 16,frameHeight: 32,}); // Carrega o spritesheet do player
        this.load.image('thanksForPlaying', '../assets/thanksForPlaying.png'); // Carrega a imagem de agradecimento
        this.load.image('buttonPlayAgain', '../assets/buttonPlayAgain.png'); // Carrega o botão de jogar novamente
    }

    create() {
        this.bgs = []; // Cria um array para armazenar os fundos
        const speeds = [0.005, 0.05, 0.07, 0.08, 0.09, 0.1]; // Define as velocidades de movimento dos fundos
        for (let i = 0; i < 6; i++) {
        let bg = this.add.tileSprite(0, 0, 576, 324, `bg0${i + 1}`).setOrigin(0, 0).setScale(2.8); // Adiciona um fundo com tileSprite
        this.bgs.push({ sprite: bg, speed: speeds[i] }); // Adiciona o fundo e sua velocidade ao array
        }

        this.createPlayerAnimation(); // Cria a animação do jogador
        this.createPlayer(); // Cria o player
        
        this.add.image(width / 2, height / 2 - 200, 'thanksForPlaying'); // Adiciona a imagem de agradecimento ao centro da tela
        this.createButtonBack()
    }

    update() {
        this.bgs.forEach((layer) => {
            layer.sprite.tilePositionX += layer.speed; // Move o fundo horizontalmente com base na velocidade de cada camada
          });
    }

    createPlayer() {
        this.player = this.physics.add.sprite(width / 2, height - 250, "player"); // Cria o sprite do jogador no centro da tela
        this.player.setScale(6); // Ajusta o tamanho do jogador
        this.player.anims.play("stop_down");
    }

    createPlayerAnimation() {
        this.anims.create({ // Cria a animação de parado olhando para baixo
            key: "stop_down", // Nome da animação
            frames: this.anims.generateFrameNumbers("player", { start: 74, end: 79 }), // Define os frames da animação
            frameRate: 5, // Taxa de quadros mais lenta para animação de parado
            repeat: -1, // Repetição infinita
        }); 
    }

    createButtonBack() {
        const buttonPlayAgain = this.add.image(width / 2, height - 100, 'buttonPlayAgain').setInteractive(); // Cria o botão de jogar novamente
        buttonPlayAgain.setScale(0.5); // Ajusta o tamanho do botão
        buttonPlayAgain.on('pointerup', () => { // Adiciona evento de clique no botão
            window.location.reload(); // Recarrega a página
        });
    }
}