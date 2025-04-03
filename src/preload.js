class PreloadSist extends Phaser.Scene {
    constructor() {
        super('preloadSist');
        this.assetsLoaded = false;
    }

    preload () {
    //PLAYERS
    this.load.spritesheet('person1', '../assets/personagens/skinsPlayer/players/person1.png');
    this.load.spritesheet('person2', '../assets/personagens/skinsPlayer/players/person2.png');
    this.load.spritesheet('person3', '../assets/personagens/skinsPlayer/players/person3.png');
    this.load.spritesheet('person4', '../assets/personagens/skinsPlayer/players/person4.png');
    //CARREGA A IMAGEM DOS PLAYERS NA PLAYERSKIN
    this.load.image('person1I', '../assets/personagens/playerSkins/person1I.png');
    this.load.image('person2I', '../assets/personagens/playerSkins/person2I.png');
    this.load.image('person3I', '../assets/personagens/playerSkins/person3I.png');
    this.load.image('person4I', '../assets/personagens/playerSkins/person4I.png');
    this.load.image('person1Select', '../assets/personagens/playerSkins/person1Select.png');
    this.load.image('person2Select', '../assets/personagens/playerSkins/person2Select.png');
    this.load.image('person3Select', '../assets/personagens/playerSkins/person3Select.png');
    this.load.image('person4Select', '../assets/personagens/playerSkins/person4Select.png');
    //BACKGROUND
    this.load.image("bg01", "../assets/assetsBackground/1.png"); // Carrega a imagem de fundo da camada 1
    this.load.image("bg02", "../assets/assetsBackground/2.png"); // Carrega a imagem de fundo da camada 2
    this.load.image("bg03", "../assets/assetsBackground/3.png"); // Carrega a imagem de fundo da camada 3
    this.load.image("bg04", "../assets/assetsBackground/4.png"); // Carrega a imagem de fundo da camada 4
    this.load.image("bg05", "../assets/assetsBackground/5.png"); // Carrega a imagem de fundo da camada 5
    this.load.image("bg06", "../assets/assetsBackground/6.png"); // Carrega a imagem de fundo da camada 6
    //MUSICAS
    this.load.audio("initialMusic", "../assets/Kevin MacLeod - Pixelland ♫ NO COPYRIGHT 8-bit Music.mp3"); // Carrega o áudio da música inicial em loop
    this.load.audio("buttonSound", "../assets/sounds/687107__aphom000__mouse-2-button-fast-click.wav"); // Carrega o som do clique do botão
    this.load.audio("vineBoom", "../assets/sounds/vineboom.mp3"); // Carrega o som do efeito "vineboom"
    this.load.audio("bumpVidro", "../assets/sounds/bumpvidro.mp3"); // Carrega o som de impacto no vidro
    this.load.audio("vidroSlide", "../assets/sounds/vidroslide.mp3"); // Carrega o som de arraste no vidro   
   

    // Verificação de carregamento
    this.load.on('complete', () => {
        this.assetsLoaded = true; // Atualiza a variável quando o carregamento terminar
        this.ajustarElementosDOM(); // Ajusta os elementos DOM após o carregamento
    });

    // Garante que a função de ajuste seja chamada após o carregamento das fontes
    document.fonts.load('10pt "SaboFilled"').then(() => {
        this.ajustarElementosDOM(); // Ajusta os elementos DOM após o carregamento das fontes
    });
}

create() {
    this.scale.on('resize', this.ajustarElementosDOM, this); // Ajusta os elementos DOM ao redimensionar
    this.ajustarElementosDOM(); // Ajusta imediatamente para garantir que tudo está correto
}
}
