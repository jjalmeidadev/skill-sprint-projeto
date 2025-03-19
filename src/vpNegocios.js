class VpNegociosScene extends Phaser.Scene {
    constructor() {
      super({ key: 'vpNegociosScene' });
    }

    preload() {
        // Carrega o mapa do Tiled e os tilesets
        this.load.tilemapTiledJSON('vpNegocios', '../assets/mapaVPNegocios/mapaVPNegocios.json');
        this.load.image('decoracao', '../assets/mapaVPNegocios/decoracao.png');
        this.load.image('paredes', '../assets/mapaVPNegocios/paredes.png');
    }

    create() {
        // Cria o mapa e as camadas
        const map = this.make.tilemap({ key: "vpNegocios", tileWidth: 25, tileHeight: 20 });
        const tileset1 = map.addTilesetImage("decoracao");
        const tileset2 = map.addTilesetImage("paredes");

        const offsetX = width - 1270;
        const layer1 = map.createLayer("chao", tileset2, offsetX, 0).setScale(2.5);
        const layer2 = map.createLayer("parede", tileset2, offsetX, 0).setScale(2.5);
        const layer3 = map.createLayer("acabamento", tileset2, offsetX, 0).setScale(2.5);
        const layer4 = map.createLayer("cadeiraTras", tileset1, offsetX, 0).setScale(2.5);
        const layer5 = map.createLayer("cadeira", tileset1, offsetX, 0).setScale(2.5);
        const layer6 = map.createLayer("mesa", tileset1, offsetX, 0).setScale(2.5);
        const layer7 = map.createLayer("servidor", tileset1, offsetX, 0).setScale(2.5);
        const layer8 = map.createLayer("sofa", tileset1, offsetX, 0).setScale(2.5);
        const layer9 = map.createLayer("planta", tileset1, offsetX, 0).setScale(2.5);
        const layer10 = map.createLayer("porta", tileset1, offsetX, 0).setScale(2.5);
        const layer11 = map.createLayer("decoracao", tileset1, offsetX, 0).setScale(2.5);

        [layer1, layer2, layer3, layer4, layer5, layer6, layer7, layer8, layer9, layer10, layer11].forEach(layer => {
        layer.setCollisionByProperty({ collider: true });
    });
    }
}