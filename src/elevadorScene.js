class ElevadorScene extends Phaser.Scene {
    constructor() {
        // Chama o construtor da classe Phaser.Scene com a chave 'officeScene'
        super({ key: 'elevadorScene' });
        this.currentBackground = 'background'; // Estado inicial do background
    }
}
