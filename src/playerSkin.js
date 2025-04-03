/**
 * Classe que representa a cena de seleção de skins do jogador em um jogo Phaser.
 * Estende Phaser.Scene para criar uma cena personalizada para a seleção de skins.
 */
class PlayerSkinSelection extends Phaser.Scene {
    /**
     * Construtor da cena PlayerSkinSelection.
     * Inicializa a cena com uma chave única e configura propriedades iniciais.
     */
    constructor() {
        super({ key: "PlayerSkin" }); // Define a chave única para a cena.
        this.playerSkinSelection = null; // Placeholder para a lógica de seleção de skin do jogador.
    }

    /**
     * Chamado quando a cena é criada.
     * Inicializa o array para armazenar os sprites das skins e cria os sprites de seleção.
     */
    create() {
        this.person = []; // Array para armazenar os sprites das skins do jogador.

        for (let i = 1; i <= 4; i++) { // Loop para criar 4 opções de skins.
            const person = this.createPersonSprite(i); // Cria um sprite para cada skin.
            this.person.push(person); // Adiciona o sprite criado ao array.
        }
    }

    /**
     * Cria um sprite interativo para uma skin do jogador.
     * Configura interações de hover e clique para o sprite.
     * 
     * @param {number} index - O índice da skin a ser criada (1 a 4).
     * @returns {Phaser.GameObjects.Image} O sprite criado para a skin.
     */
    createPersonSprite(index) {
        // Cria um sprite de imagem para a skin em uma posição específica.
        const person = this.add.image(centerX - 270 + (180 * (index - 1)), centerY, `person${index}N`).setInteractive();
        person.setScale(1.2); // Ajusta o tamanho do sprite.

        // Altera a textura para o estado de hover quando o mouse está sobre o sprite.
        person.on('pointerover', () => {
            if (this.personSelected !== index) { // Garante que o efeito de hover não se aplique à skin selecionada.
                person.setTexture(`person${index}Select`);
            }
        });

        // Reverte a textura para o estado normal quando o mouse sai do sprite.
        person.on('pointerout', () => {
            if (this.personSelected !== index) { // Garante que o estado normal não se aplique à skin selecionada.
                person.setTexture(`person${index}N`);
            }
        });

        // Define a skin selecionada quando o sprite é clicado.
        person.on('pointerdown', () => this.selectPerson(index));

        return person; // Retorna o sprite criado.
    }
}
