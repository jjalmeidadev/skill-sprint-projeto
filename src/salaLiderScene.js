class SalaLider extends Phaser.Scene {
    constructor() {
        super({ key: 'salaLider' });
    }
    preload() {
        this.load.tilemapTiledJSON('salaLider', '../assets/mapaJogoVivo/mapaJogoVivo.json');
        this.load.image('decoracao', '../assets/mapaSalaLider/decoracao.png');
    }
}