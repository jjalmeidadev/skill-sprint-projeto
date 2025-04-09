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

    init(data) {
        this.selectedSpriteSheet = data.selectedSpriteSheet;
        
    }

    preload() { 
        // Define um método chamado 'preload', geralmente usado em frameworks como Phaser para carregar recursos antes do jogo começar.
        for (let i = 1; i <= 4; i++) { 
            // Inicia um loop que vai de 1 a 4, usado para carregar múltiplas imagens de forma dinâmica.
            this.load.image(`player${i}I`, `../assets/personagens/playerSkins/player${i}I.png`); 
            // Carrega uma imagem com o identificador `person${i}I` (ex.: person1I, person2I, etc.) 
            // e especifica o caminho do arquivo correspondente na pasta de assets.
            this.load.image(`player${i}Select`, `../assets/personagens/playerSkins/player${i}Select.png`); 
            // Carrega outra imagem com o identificador `person${i}Select` (ex.: person1Select, person2Select, etc.) 
            // e especifica o caminho do arquivo correspondente na pasta de assets.
            this.load.spritesheet('player', `../assets/personagens/skinsPlayer/players/${this.selectedSpriteSheet}.png`, {frameWidth: 16,frameHeight: 32,});
        }

        // Certifique-se de carregar os fundos também
        for (let i = 1; i <= 6; i++) {
        this.load.image(`bg0${i}`, `../assets/backgrounds/bg0${i}.png`); 
        }

        this.load.image('buttonStart', '../assets/assets_botoes/botaoStart.png');
        this.load.image('ttSkin', '../assets/assets_objetos/escolhaSeuPersonagem.png')
    }
    

    /**
     * Chamado quando a cena é criada.
     * Inicializa o array para armazenar os sprites das skins e cria os sprites de seleção.
     */
    create() {
        const width = this.cameras.main.width;
        const height = this.cameras.main.height;

        // Adiciona a imagem ao centro da tela, ajustando a posição vertical
        this.add.image(width / 2, height / 2 - 250, 'ttSkin');
        this.player = []; // Array para armazenar os sprites das skins do jogador.

        for (let i = 1; i <= 4; i++) { // Loop para criar 4 opções de skins.
            const player = this.createPlayerSprite(i); // Cria um sprite para cada skin.
            player.setDepth(3); // Garante que os botões fiquem acima do fundo
            this.player.push(player); // Adiciona o sprite criado ao array.
        }

        this.cameras.main.fadeIn(1000); // Aplica um efeito de fade-in na câmera principal
        this.createPlayerSprite();
        this.createButtonStart(width, height);
        
        this.bgs = []; // Array para armazenar os fundos
        const speeds = [0.005, 0.05, 0.07, 0.08, 0.09, 0.1]; // Velocidades de movimento dos fundos
            
        for (let i = 0; i < 6; i++) {
            let bg = this.add.tileSprite(0, 0, this.scale.width, this.scale.height, `bg0${i + 1}`)
            .setOrigin(0, 0)
            .setScale(2.8)
            .setDepth(-1); // Definir um depth negativo pode ajudar a manter os fundos atrás de outros objetos
        
        this.bgs.push({ sprite: bg, speed: speeds[i] });
        }

        // Certifique-se de que a câmera começa com um fade-in
        this.cameras.main.fadeIn(1000);
        
        this.initialMusic = this.sound.add("initialMusic", { loop: true, volume: 0.5 }); // Adiciona a música inicial com loop
        this.initialMusic.play(); // Toca a música inicial

        this.events.on("shutdown", this.shutdown, this); // Registra o evento para encerrar a música ao sair da cena
        this.events.on("pause", this.shutdown, this); // Registra o evento para pausar a música ao pausar a cena
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
    createPlayerSprite(index) {
        // Calcula o espaçamento dinâmico para centralizar as sprites na largura do mapa.
        const totalSprites = 4; // Número total de sprites.
        const spriteWidth = 150; // Largura aproximada de cada sprite.
        const spacing = (this.scale.width - (spriteWidth * totalSprites)) / (totalSprites + 1); // Espaçamento dinâmico.

        // Calcula a posição horizontal do sprite com base no índice e no espaçamento.
        const xPosition = spacing + (spriteWidth / 2) + (index - 1) * (spriteWidth + spacing);

        const player = this.add.image(
            xPosition, 
            this.scale.height / 2, 
            `player${index}I`
        ).setInteractive();
        player.setScale(0.8); // Ajusta o tamanho do sprite.

        // Altera a textura para o estado de hover quando o mouse está sobre o sprite.
        player.on('pointerover', () => {
            if (this.playerSelected !== index) { // Garante que o efeito de hover não se aplique à skin selecionada.
                player.setTexture(`player${index}Select`);
                player.setScale(1);
            }
        });

        // Reverte a textura para o estado normal quando o mouse sai do sprite.
        player.on('pointerout', () => {
            if (this.playerSelected !== index) { // Garante que o estado normal não se aplique à skin selecionada.
                player.setTexture(`player${index}I`);
                player.setScale(0.8);
            }
        });

        // Define a skin selecionada quando o sprite é clicado.
        player.on('pointerdown', () => this.selectPlayer(index));

        return player; // Retorna o sprite criado.
    }

    /**
    * Atualiza a textura e a escala de uma skin específica.
    *
    * @param {number} index - O índice da skin a ser atualizada.
    * @param {string} texture - O nome da textura a ser aplicada.
    * @param {number} scale - O novo tamanho do sprite.
    */
    updatePlayerTexture(index, texture, scale) {
        this.player[index - 1].setTexture(texture);
        this.player[index - 1].setScale(scale);
    }

    selectPlayer(index) {
    if (this.playerSelected !== undefined) { 
         // Reverte a textura do sprite anteriormente selecionado para o estado normal.
         const previousPlayer = this.playerSelected;
        this.player[previousPlayer - 1].setTexture(`player${previousPlayer}I`);
    }
    this.playerSelected = index; // Atualiza o índice da skin selecionada.
    this.selectedSpriteSheet = `player${index}`; // Armazena a spritesheet correspondente.
        // Atualiza a textura do sprite selecionado para o estado de seleção.
    this.player[index - 1].setTexture(`player${index}Select`);

          // Aplica a animação de escala
    this.tweens.add({
        targets: this.player[index - 1],
        scale: { from: 0.8, to: 1.3 }, // Aumenta o tamanho e volta
        duration: 150,
        yoyo: true,
        ease: 'Sine.easeInOut'
    });
    }

    buttonSound() {
        this.buttonClick = this.sound.add("buttonSound", { loop: false, volume: 10 }); // Adiciona o som de clique do botão com volume alto
        this.buttonClick.play(); // Toca o som de clique do botão
    }

    shutdown() {
        if (this.initialMusic && this.initialMusic.isPlaying) { // Interrompe a música ao encerrar ou pausar a cena
          this.initialMusic.stop(); // Para a música inicial se estiver tocando
        }
    }
    
    buttonSound() {
        this.buttonClick = this.sound.add("buttonSound", { loop: false, volume: 10 }); // Adiciona o som de clique do botão com volume alto
        this.buttonClick.play(); // Toca o som de clique do botão
    }
    
    createButtonStart(width, height) {
    const buttonStart = this.add.image(width / 2, height / 2 + 250, "buttonStart"); // Adiciona a imagem do botão "Jogar" na posição especificada
    buttonStart.setInteractive(); // Torna o botão interativo
    buttonStart.setScale(1); // Define o tamanho do botão
    buttonStart.on("pointerdown", () => {
        this.buttonSound(); // Toca o som de clique do botão
        this.shutdown(); // Para a música inicial
        this.scene.stop("PlayerSkin"); // Para a cena inicial
        this.scene.start("cutScene", {selectedSpriteSheet: this.selectedSpriteSheet,}); // Inicia a cena "cutScene"
    });
    }

    /**
     * Inicia o jogo com a skin selecionada e o nome do jogador.
     * Certifica-se de que ambos foram definidos antes de iniciar a próxima cena.
     */
    startGame() {
        if (this.playerSelected) {
            this.scene.start('cutScene', {playerSelected: this.playerSelected,selectedSpriteSheet: this.selectedSpriteSheet, // Passa a spritesheet selecionada para a próxima cena.
            });
        }
    }
}
