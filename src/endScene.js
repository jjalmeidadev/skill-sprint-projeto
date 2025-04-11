/**
 * Representa a cena final do jogo, exibindo uma mensagem de agradecimento,
 * o sprite do jogador, animações de fundo e um botão para reiniciar o jogo.
 * Esta cena também destaca os nomes dos contribuidores em um loop.
 * 
 * @class EndScene
 * @extends {Phaser.Scene}
 * 
 * @constructor
 * - Inicializa a cena com uma chave única "endScene".
 * 
 * @method init
 * - Recebe dados da cena anterior, incluindo o spritesheet selecionado do jogador.
 * 
 * @method preload
 * - Carrega todos os recursos necessários para a cena, incluindo camadas de fundo,
 *   spritesheet do jogador, imagem de agradecimento, imagem do botão, nomes dos
 *   contribuidores e música de fundo.
 * 
 * @method create
 * - Configura a cena:
 *   - Cria camadas de fundo com efeito de paralaxe e velocidades diferentes.
 *   - Adiciona o sprite do jogador e sua animação.
 *   - Exibe uma mensagem de agradecimento no centro da tela.
 *   - Cria um botão para reiniciar o jogo.
 *   - Exibe os nomes dos contribuidores e inicia um loop para destacá-los
 *     sequencialmente.
 *   - Reproduz a música de fundo em loop.
 * 
 * @method update
 * - Atualiza a posição das camadas de fundo para criar o efeito de rolagem paralaxe.
 * 
 * @method highlightNextName
 * - Destaca o próximo nome do contribuidor na lista, aumentando sua escala.
 * - Redefine a escala de todos os outros nomes para o tamanho normal.
 * - Percorre os nomes sequencialmente em loop.
 * 
 * @method createPlayer
 * - Cria o sprite do jogador em uma posição fixa na tela.
 * - Define sua escala e reproduz a animação de inatividade.
 * 
 * @method createPlayerAnimation
 * - Define a animação de inatividade para o sprite do jogador, usando frames
 *   específicos do spritesheet.
 * 
 * @method createButtonBack
 * - Cria um botão interativo para reiniciar o jogo.
 * - Recarrega a página quando o botão é clicado.
 */
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
        this.load.image('anne', '../assets/names/anne.png'); // Carrega a imagem de Anne
        this.load.image('arthur', '../assets/names/arthur.png'); // Carrega a imagem de Arthur
        this.load.image('jaime', '../assets/names/jaime.png'); // Carrega a imagem de Jaime
        this.load.image('marcela', '../assets/names/marcela.png'); // Carrega a imagem de Marcela
        this.load.image('mike', '../assets/names/mike.png'); // Carrega a imagem de Mike
        this.load.image('sophia', '../assets/names/sophia.png'); // Carrega a imagem de Sophia
        this.load.audio("initialMusic", "../assets/Kevin MacLeod - Pixelland ♫ NO COPYRIGHT 8-bit Music.mp3"); // Carrega o áudio da música inicial em loop
    }

    create() {
        this.bgs = []; // Cria um array para armazenar os fundos
        const speeds = [0.005, 0.05, 0.07, 0.08, 0.09, 0.1]; // Define as velocidades de movimento dos fundos
        for (let i = 0; i < 6; i++) { // Cria 6 fundos
        let bg = this.add.tileSprite(0, 0, 576, 324, `bg0${i + 1}`).setOrigin(0, 0).setScale(2.8); // Adiciona um fundo com tileSprite
        this.bgs.push({ sprite: bg, speed: speeds[i] }); // Adiciona o fundo e sua velocidade ao array
        }

        this.createPlayerAnimation(); // Cria a animação do jogador
        this.createPlayer(); // Cria o player
        
        this.add.image(width / 2, height / 2 - 200, 'thanksForPlaying'); // Adiciona a imagem de agradecimento ao centro da tela
        this.createButtonBack(); // Cria o botão de jogar novamente

        this.nameKeys = ['anne', 'arthur', 'jaime', 'marcela', 'mike', 'sophia']; // Array com os nomes
        this.nameSprites = []; // Array para armazenar os sprites dos nomes
        this.currentHighlightIndex = 0; // Índice do nome atual em destaque
        
        const centerX = width / 2; // Centraliza o texto na tela
        const startY = height / 2 - ((this.nameKeys.length - 1) * 25) + 20; // centraliza a lista
        const spacing = 30; // Define o espaçamento entre os nomes
        
        this.nameKeys.forEach((key, index) => {
            const nameImage = this.add.image(centerX, startY + index * spacing, key).setScale(0.3); // Adiciona cada nome na tela
            this.nameSprites.push(nameImage); // Coloca os nomes
        });
        
        // Inicia o loop de destaque
        this.time.addEvent({
            delay: 2000,
            callback: this.highlightNextName,
            callbackScope: this,
            loop: true
        });

        this.initialMusic = this.sound.add("initialMusic", { loop: true, volume: 0.5 }); // Adiciona a música inicial com loop
        this.initialMusic.play(); // Toca a música inicial
    }

    update() {
        this.bgs.forEach((layer) => {
            layer.sprite.tilePositionX += layer.speed; // Move o fundo horizontalmente com base na velocidade de cada camada
          });
    }

    highlightNextName() {
        // Volta todos para o tamanho normal
        this.nameSprites.forEach(sprite => {
            this.tweens.add({
                targets: sprite,
                scale: 0.3,
                duration: 300,
                ease: 'Power1'
            });
        });
    
        // Destaca o próximo nome
        const spriteToHighlight = this.nameSprites[this.currentHighlightIndex];
        this.tweens.add({
            targets: spriteToHighlight,
            scale: 0.5,
            duration: 300,
            ease: 'Power1'
        });
    
        // Atualiza o índice para o próximo nome
        this.currentHighlightIndex = (this.currentHighlightIndex + 1) % this.nameSprites.length;
    }

    createPlayer() {
        this.player = this.physics.add.sprite(width / 2, height - 250, "player"); // Cria o sprite do jogador no centro da tela
        this.player.setScale(6); // Ajusta o tamanho do jogador
        this.player.anims.play("stop_down"); // Animação do player
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