class VpPessoasScene extends Phaser.Scene {
    constructor() {
      super({ key: 'vpPessoasScene' });
    }

    preload() {
        // Carrega o mapa do Tiled e os tilesets
        this.load.tilemapTiledJSON('vpPessoas', '../assets/mapaVPPessoas/mapaVPPessoas.json');
        this.load.image('decoracao', '../assets/mapaVPPessoas/decoracao.png');
        this.load.image('paredes', '../assets/mapaVPPessoas/paredes.png');
    }

    create() {
        // Cria o mapa e as camadas
        const map = this.make.tilemap({ key: "vpPessoas", tileWidth: 25, tileHeight: 20 });
        const tileset1 = map.addTilesetImage("decoracao");
        const tileset2 = map.addTilesetImage("paredes");

        const offsetX = width - 1270;
        const layer1 = map.createLayer("chao", tileset2, offsetX, 0).setScale(2.5);
        const layer2 = map.createLayer("parede", tileset2, offsetX, 0).setScale(2.5);
        const layer3 = map.createLayer("sofa", tileset1, offsetX, 0).setScale(2.5);
        const layer4 = map.createLayer("sofaTras", tileset1, offsetX, 0).setScale(2.5);
        const layer5 = map.createLayer("armario", tileset1, offsetX, 0).setScale(2.5);
        const layer6 = map.createLayer("cadeira", tileset1, offsetX, 0).setScale(2.5);
        const layer7 = map.createLayer("mesa", tileset1, offsetX, 0).setScale(2.5);
        const layer8 = map.createLayer("elevador", tileset1, offsetX, 0).setScale(2.5);
        const layer9 = map.createLayer("planta", tileset1, offsetX, 0).setScale(2.5);
        const layer10 = map.createLayer("decoracao", tileset1, offsetX, 0).setScale(2.5);

        [layer1, layer2, layer3, layer4, layer5, layer6, layer7, layer8, layer9, layer10].forEach(layer => {
        layer.setCollisionByProperty({ collider: true });
    });
    }
}