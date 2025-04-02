class PlayerSkinSelection extends Phaser.scene { 
    constructor() {
        super({ key: "PlayerSkin" });
        this.playerSkinSelection = null
    }
    
    create() {
        this.player = []; // Array para armazenar os sprites das skins

    for (let i = 1; i <= 4; i++) {
        const player = this.add.image(100 * i, 200, `person${i}I`);
        this.player.push(player); // Adiciona o sprite ao array
    }
    }

}