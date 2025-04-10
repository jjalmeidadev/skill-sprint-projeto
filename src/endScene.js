class EndScene extends Phaser.Scene {
    constructor() {
        super({key: "endScene"}); // Define a chave única para a cena.
    }

    preload() {
        this.load.image("bg01", "../assets/assetsBackground/1.png"); // Carrega a imagem de fundo da camada 1
        this.load.image("bg02", "../assets/assetsBackground/2.png"); // Carrega a imagem de fundo da camada 2
        this.load.image("bg03", "../assets/assetsBackground/3.png"); // Carrega a imagem de fundo da camada 3
        this.load.image("bg04", "../assets/assetsBackground/4.png"); // Carrega a imagem de fundo da camada 4
        this.load.image("bg05", "../assets/assetsBackground/5.png"); // Carrega a imagem de fundo da camada 5
        this.load.image("bg06", "../assets/assetsBackground/6.png"); // Carrega a imagem de fundo da camada 6
    }

    create() {
        this.bgs = []; // Cria um array para armazenar os fundos
        const speeds = [0.005, 0.05, 0.07, 0.08, 0.09, 0.1]; // Define as velocidades de movimento dos fundos
        for (let i = 0; i < 6; i++) {
        let bg = this.add.tileSprite(0, 0, 576, 324, `bg0${i + 1}`).setOrigin(0, 0).setScale(2.8); // Adiciona um fundo com tileSprite
        this.bgs.push({ sprite: bg, speed: speeds[i] }); // Adiciona o fundo e sua velocidade ao array
        }
    }

    update() {
        this.bgs.forEach((layer) => {
            layer.sprite.tilePositionX += layer.speed; // Move o fundo horizontalmente com base na velocidade de cada camada
          });
    }
}