class Config {
    constructor(phaser) {
        this.phaser = phaser
    }
    
    carregarAssets() { 
          //adiciona a imagem de fundo da cena de ajustes
    this.phaser.load.image('layoutAjustes', '../assets/assets_botoes/layoutAjustses.png');
    //adiciona imagem dos botões de ajustes
    this.phaser.load.image('botaoMais', '../assets/assets_botoes/botaoMais.png');
    this.phaser.load.image('botaoMenos', '../assets/assets_botoes/botaoMenos.png');
    //adiciona imagem do botão de retorno
    this.phaser.load.image('botaoVoltar', '../assets/assets_botoes/botoaX.png');
    }



}