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

        this.cameras.main.fadeIn(1000); // Aplica um efeito de fade-in na câmera principal
    
        this.bgs = []; // Cria um array para armazenar os fundos
        const speeds = [0.005, 0.05, 0.07, 0.08, 0.09, 0.1]; // Define as velocidades de movimento dos fundos
        for (let i = 0; i < 6; i++) {
          let bg = this.add.tileSprite(0, 0, 576, 324, `bg0${i + 1}`).setOrigin(0, 0).setScale(2.8); // Adiciona um fundo com tileSprite
          this.bgs.push({ sprite: bg, speed: speeds[i] }); // Adiciona o fundo e sua velocidade ao array
        }

        this.initialMusic = this.sound.add("initialMusic", { loop: true, volume: 0.5 }); // Adiciona a música inicial com loop
        this.initialMusic.play(); // Toca a música inicial
    }

    update() {
        this.bgs.forEach(bg => {
            bg.sprite.tilePositionX += bg.speed; // Move os fundos para dar efeito de paralaxe
        });
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
        const person = this.add.image(width / 2 - 270 + (180 * (index - 1)), height / 2, `person${index}I`).setInteractive();
        person.setScale(0.8); // Ajusta o tamanho do sprite.

        // Altera a textura para o estado de hover quando o mouse está sobre o sprite.
        person.on('pointerover', () => {
            if (this.personSelected !== index) { // Garante que o efeito de hover não se aplique à skin selecionada.
                person.setTexture(`person${index}Select`);
                person.setScale(1.5);
            }
        });

        // Reverte a textura para o estado normal quando o mouse sai do sprite.
        person.on('pointerout', () => {
            if (this.personSelected !== index) { // Garante que o estado normal não se aplique à skin selecionada.
                person.setTexture(`person${index}I`);
                person.setScale(0.8);
            }
        });

        // Define a skin selecionada quando o sprite é clicado.
        person.on('pointerdown', () => this.selectPerson(index));

        return person; // Retorna o sprite criado.
    }

    /**
    * Atualiza a textura e a escala de uma skin específica.
    *
    * @param {number} index - O índice da skin a ser atualizada.
    * @param {string} texture - O nome da textura a ser aplicada.
    * @param {number} scale - O novo tamanho do sprite.
    */
    updatePersonTexture(index, texture, scale) {
        this.person[index - 1].setTexture(texture);
        this.person[index - 1].setScale(scale);
    }

    selectPerson(index) {
    if (this.personSelected !== undefined) { 
         // Reverte a textura do sprite anteriormente selecionado para o estado normal.
         const previousPerson = this.personSelected;
        this.person[previousPerson - 1].setTexture(`person${previousPerson}I`);
    }
    this.personSelected = index; // Atualiza o índice da skin selecionada.
        // Atualiza a textura do sprite selecionado para o estado de seleção.
    this.person[index - 1].setTexture(`person${index}Select`);

          // Aplica a animação de escala
    this.tweens.add({
        targets: this.person[index - 1],
        scale: { from: 0.8, to: 1.5 }, // Aumenta o tamanho e volta
        duration: 150,
        yoyo: true,
        ease: 'Sine.easeInOut'
    });
    }

    buttonSound() {
        this.buttonClick = this.sound.add("buttonSound", { loop: false, volume: 10 }); // Adiciona o som de clique do botão com volume alto
        this.buttonClick.play(); // Toca o som de clique do botão
    }
    
    createButtonPlay(width, height) {
    const buttonPlay = this.add.image(width / 2, height / 2 + 50, "buttonPlay"); // Adiciona a imagem do botão "Jogar" na posição especificada
    buttonPlay.setInteractive(); // Torna o botão interativo
    buttonPlay.setScale(1); // Define o tamanho do botão
    buttonPlay.on("pointerdown", () => {
        this.buttonSound(); // Toca o som de clique do botão
        this.shutdown(); // Para a música inicial
        this.scene.stop("PlayerSkin"); // Para a cena inicial
        this.scene.start("cutScene"); // Inicia a cena "cutScene"
    });
    }

    /**
     * Inicia o jogo com a skin selecionada e o nome do jogador.
     * Certifica-se de que ambos foram definidos antes de iniciar a próxima cena.
     */
    startGame() {
        if (this.personSelected) {
            this.scene.start('cutScene', {
                personSelected: this.personSelected,
            });
        }
    }
}
