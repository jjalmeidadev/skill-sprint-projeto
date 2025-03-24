class MinigameTrashScene extends Phaser.Scene {
    constructor() {
        super({key: 'minigameTrashScene'});
    }

    preload() {
        this.load.image('backgroundTrash', '../assets/assetsTrash/backgroundTrash.png'); // Carrega o fundo
        this.load.spritesheet('banana', '../assets/assetsTrash/banana.png', { frameWidth: 520, frameHeight: 520 }); // Carrega a banana
        this.load.spritesheet('bottle', '../assets/assetsTrash/bottle.png', { frameWidth: 520, frameHeight: 520 }); // Carrega a garrafa
        this.load.spritesheet('paper', '../assets/assetsTrash/paper.png', { frameWidth: 519, frameHeight: 519 }); // Carrega o papel
        this.load.spritesheet('head', '../assets/assetsTrash/head.png', { frameWidth: 377, frameHeight: 210 }); // Carrega a cabeça do vivinho
        this.load.spritesheet('body', '../assets/assetsTrash/body.png', { frameWidth: 377, frameHeight: 171 }); // Carrega o corpo do vivinho
        this.load.spritesheet('legs', '../assets/assetsTrash/legs.png', { frameWidth: 377, frameHeight: 205 }); // Carrega a perna do vivinho
        this.load.spritesheet('smileFace', '../assets/assetsTrash/smileFace.png', { frameWidth: 497, frameHeight: 518 }); // Carrega a carinha feliz
        this.load.spritesheet('hand', '../assets/assetsTrash/hand.png', { frameWidth: 287, frameHeight: 232 }); // Carrega a mão
        this.load.spritesheet('explosion', '../assets/assetsTrash/explosion.png', { frameWidth: 122, frameHeight: 127 }); // Carrega os sprites da explosão
    }

    create() {
        this.add.image(width / 2, height / 2, 'backgroundTrash'); // Adiciona a imagem de fundo ao centro da cena

        this.happiness = 0; // Inicializa a pontuação em 0

        this.hand = this.physics.add.sprite(width - 1350, height - 650, 'hand'); // Adiciona a mão na cena
        this.hand.setCollideWorldBounds(true); // Faz a mão colidir com os limites do mundo
        this.hand.setGravityY(100); // Define a gravidade no eixo Y para a mão
        this.hand.setAngle(0); // Define o ângulo da mão para 0 graus
        this.hand.setScale(0.6); // Define o tamanha da mão

        this.keys = this.input.keyboard.addKeys({ A: 'A', W: 'W', S: 'S', D: 'D' }); // Cria teclas para entrada

        this.smile = this.physics.add.sprite(width - 200, height - 350, 'smileFace'); // Adiciona o sprite da carinha à cena
        this.smile.setCollideWorldBounds(true); // Faz a carinha colidir com os limites do mundo
        this.smile.setBounce(0.7); // Define o valor de quique para a carinha
        this.smile.setScale(0.12); // Define o tamanho da carinha feliz
        this.smile.setGravityX(-100); // Define a gravidade do eixo X para a carinha feliz
       
        this.progressBarBackground = this.add.graphics(); // Barra de progresso
        this.progressBarBackground.fillStyle(0x808080, 1); // Fundo Cinza
        this.progressBarBackground.fillRect(width - 1450, height - 730, 300, 30); // Cria a barra de progresso

        this.progressBar = this.add.graphics();
        this.updateProgressBar(); // inicializa com progresso em 0

        this.physics.add.overlap(this.hand, this.smile, this.collectSmile, null, this); // Adiciona detecção de sobreposição entre a mão e as carinhas

        this.anims.create({ // Cria a animação da explosão
            key: "explosion",
            frames: this.anims.generateFrameNumbers('explosion', { start: 0, end: 8 }),
            frameRate: 10,
            repeat: 0,
          });

        // Evento que gera lixo a cada 5 segundos
        this.time.addEvent({
        delay: 3000,
        callback: this.spawnRandomTrash,
        callbackScope: this,
        loop: true
    });
    }

    update() {
        let movendo = false; // Inicializa a variável de movimento

        const movimentos = [
            { key: 'W', velocity: { x: 0, y: -250 }},
            { key: 'S', velocity: { x: 0, y: 250 }},
            { key: 'D', velocity: { x: 250, y: 0 }},
            { key: 'A', velocity: { x: -250, y: 0 }},
        ]; // Define os movimentos para as teclas

        movimentos.forEach(mov => {
            if (this.keys[mov.key].isDown) {
                this.hand.setVelocity(mov.velocity.x, mov.velocity.y); // Define a velocidade da mão
                movendo = true; // Define que a mão está se movendo
            }
        });

        if (this.banana && this.banana.x < 0) { // Verifica se a banana existe e se saiu da tela pelo lado esquerdo
            this.banana.destroy(); // Destroi o sprite da banana
            this.banana = null; // Define a variável banana como null
        }
        
        if (this.bottle && this.bottle.x < 0) { // Verifica se a garrafa existe e se saiu da tela pelo lado esquerdo
            this.bottle.destroy(); // Destroi o sprite da garrafa
            this.bottle = null; // Define a variável bottle como null
        }
        
        if (this.paper && this.paper.x < 0) { // Verifica se o papel existe e se saiu da tela pelo lado esquerdo
            this.paper.destroy(); // Destroi o sprite do papel
            this.paper = null; // Define a variável paper como null
        }
    }

    // Função para coletar a carinnha feliz
    collectSmile(hand, smile) {
        smile.setVisible(false); // Oculta a carinha
        smile.disableBody(true, true); // Desativa o corpo físico da carinha
        this.happiness += 1; // Incrementa a pontuação em 1
        this.updateProgressBar();

        this.time.delayedCall(1000, () => {
            let posY = Phaser.Math.Between(50, this.sys.game.config.height - 50); // Gera uma posição Y aleatória para a carinha
            let posX = Phaser.Math.Between(50, this.sys.game.config.width - 50); // Gera uma posição X aleatória para a carinha
            this.smile.setPosition(1500, posY); // Define a posição da carinha
            this.smile.setVisible(true); // Torna a carinha visível
            this.smile.enableBody(true, 1500, posY, true, true); // Ativa o corpo físico da carinha
        });
    }

    // Função para gerar uma banana
    addBanana() {
        let posY = Phaser.Math.Between(50, this.sys.game.config.height - 50); // Gera uma posição Y aleatória para a banana
        let posX = Phaser.Math.Between(50, this.sys.game.config.width - 50); // Gera uma posição X aleatória para a banana
        this.banana = this.physics.add.sprite(1500, posY, 'banana'); // Adiciona o sprite da banana à cena
        this.banana.setVelocityX(-200); // Define a velocidade da banana
        this.banana.setScale(0.28); // Define o tamanho da banana
        this.bananaExists = true; // Variável de controle
    }

    // Função para gerar uma garrafa
    addBottle() {
        let posY = Phaser.Math.Between(50, this.sys.game.config.height - 50); // Gera uma posição Y aleatória para a garrafa
        let posX = Phaser.Math.Between(50, this.sys.game.config.width - 50); // Gera uma posição X aleatória para a garrfa
        this.bottle = this.physics.add.sprite(1500, posY, 'bottle'); // Adiciona o sprite do garrafa à cena
        this.bottle.setVelocityX(-200); // Define a velocidade da garrafa
        this.bottle.setScale(0.5); // Define o tamanho da garrafa
        this.bottleExists = true; // Variável de controle
    }

     // Função para gerar uma banana
     addPaper() {
        let posY = Phaser.Math.Between(50, this.sys.game.config.height - 50); // Gera uma posição Y aleatória para o papel
        let posX = Phaser.Math.Between(50, this.sys.game.config.width - 50); // Gera uma posição X aleatória para o papel
        this.paper = this.physics.add.sprite(1500, posY, 'paper'); // Adiciona o sprite do papel à cena
        this.paper.setVelocityX(-200); // Define a velocidade do papel
        this.paper.setScale(0.2); // Define o tamanha do papel
        this.paperExists = true; // Variável de controle
    }

    // Função para tratar a colisão da mão com a banana
    crash(hand, trash) {
        this.physics.pause(); // Pausa a física do jogo.
        this.hand.setVisible(false); // Oculta a nave.
        let explosao = this.add.sprite(this.hand.x, this.hand.y, 'explosion'); // Adiciona o sprite da explosão à cena.
        explosao.anims.play('explosion'); // Inicia a animação de explosão.
        explosao.on('animationcomplete', () => {
            this.scene.start('initialScene', { pontuacao: this.score }); // Inicia a cena de Game Over
        });
    }

    // Função para gerar lixo aleatório
    spawnRandomTrash() {
        const lixoAleatorio = Phaser.Math.Between(0, 2); // Gera um número aleatório entre 0 e 2 para decidir o tipo de lixo
    
        switch (lixoAleatorio) {
            case 0: // Caso o número seja 0
                this.addBanana(); // Adiciona uma banana à cena
                this.physics.add.collider(this.hand, this.banana, this.crash, null, this); // Adiciona colisão entre a mão e a banana
                break;
            case 1: // Caso o número seja 1
                this.addBottle(); // Adiciona uma garrafa à cena
                this.physics.add.collider(this.hand, this.bottle, this.crash, null, this); // Adiciona colisão entre a mão e a garrafa
                break;
            case 2: // Caso o número seja 2
                this.addPaper(); // Adiciona um papel à cena
                this.physics.add.collider(this.hand, this.paper, this.crash, null, this); // Adiciona colisão entre a mão e o papel
                break;
        }
    }
    

    updateProgressBar() {
        const max = 10; // Define o valor máximo de felicidade
        const percentage = Phaser.Math.Clamp(this.happiness / max, 0, 1); // Calcula a porcentagem de felicidade, garantindo que esteja entre 0 e 1
        const barWidth = 300; // Define a largura da barra de progresso
        const barHeight = 30; // Define a altura da barra de progresso

        this.progressBar.clear(); // Limpa o gráfico da barra de progresso anterior
        this.progressBar.fillStyle(0x00ff00, 1); // Define a cor da barra de progresso (verde)
        this.progressBar.fillRect(width - 1450, height - 730, barWidth * percentage, barHeight); // Desenha a barra de progresso com base na porcentagem de felicidade
    }
}