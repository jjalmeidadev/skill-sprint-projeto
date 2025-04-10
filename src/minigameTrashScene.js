class MinigameTrashScene extends Phaser.Scene {
    constructor() {
        super({ key: 'minigameTrashScene' });
    }

    init(data) {
        this.selectedSpriteSheet = data.selectedSpriteSheet;

    }

    preload() {
        this.load.image('backgroundTrash', '../assets/assetsTrash/backgroundTrash.png'); // Carrega o fundo
        this.load.spritesheet('banana', '../assets/assetsTrash/banana.png', { frameWidth: 498, frameHeight: 316 }); // Carrega a banana
        this.load.spritesheet('bottle', '../assets/assetsTrash/bottle.png', { frameWidth: 85, frameHeight: 233 }); // Carrega a garrafa
        this.load.spritesheet('paper', '../assets/assetsTrash/paper.png', { frameWidth: 495, frameHeight: 490 }); // Carrega o papel
        this.load.spritesheet('head', '../assets/assetsTrash/head.png', { frameWidth: 377, frameHeight: 210 }); // Carrega a cabeça do vivinho
        this.load.spritesheet('body', '../assets/assetsTrash/body.png', { frameWidth: 377, frameHeight: 171 }); // Carrega o corpo do vivinho
        this.load.spritesheet('legs', '../assets/assetsTrash/legs.png', { frameWidth: 377, frameHeight: 205 }); // Carrega a perna do vivinho
        this.load.spritesheet('smileFace', '../assets/assetsTrash/smileFace.png', { frameWidth: 472, frameHeight: 464 }); // Carrega a carinha feliz
        this.load.spritesheet('hand', '../assets/assetsTrash/hand.png', { frameWidth: 267, frameHeight: 162 }); // Carrega a mão

        this.load.audio('collectSound', '../assets/sounds/476178__unadamlar__correct-choice.wav'); // Carrega o efeito de coletar
    }

    create() {
        this.background = this.add.tileSprite(0, 0, width, height, 'backgroundTrash').setOrigin(0, 0); // Adiciona a imagem de fundo ao centro da cena

        this.happiness = 0; // Inicializa a pontuação em 0
        this.vivinho = 0; // Contador de partes do vivinho

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
        this.updateProgressBar(); // Inicializa com progresso em 0

        this.vivinhoBarBackground = this.add.graphics(); // Barra de progresso das partes do Vivinho
        this.vivinhoBarBackground.fillStyle(0x808080, 1); // Fundo cinza
        this.vivinhoBarBackground.fillRect(width - 1450, height - 690, 300, 30); // Barra logo abaixo da felicidade

        this.vivinhoProgressBar = this.add.graphics(); // Cria o objeto gráfico
        this.updateVivinhoProgressBar(); // Inicializa com progresso 0

        this.physics.add.overlap(this.hand, this.smile, this.collectSmile, null, this); // Adiciona detecção de sobreposição entre a mão e as carinhas

        this.time.addEvent({ // Cria um evento temporizado que gera lixo a cada 3 segundos
            delay: 3000, // Define o intervalo de tempo entre cada execução do evento (3 segundos)
            callback: this.spawnRandomTrash, // Define a função que será chamada para gerar lixo
            callbackScope: this, // Define o escopo do callback para a instância atual da cena
            loop: true // Faz o evento se repetir indefinidamente
        });

        this.time.addEvent({ // Cria um evento temporizado que gera partes do vivinho a cada 2,5 segundos
            delay: 2500, // Define o intervalo de tempo entre cada execução do evento (2,5 segundos)
            callback: this.spawnRandomVivinho, // Define a função que será chamada para gerar partes do vivinho
            callbackScope: this, // Define o escopo do callback para a instância atual da cena
            loop: true // Faz o evento se repetir indefinidamente
        });

        this.headSpawned = false; // Inicializa a variável indicando que a cabeça do vivinho ainda não foi gerada
        this.bodySpawned = false; // Inicializa a variável indicando que o corpo do vivinho ainda não foi gerado
        this.legsSpawned = false; // Inicializa a variável indicando que as pernas do vivinho ainda não foram geradas
    }

    update() {
        let moving = false; // Inicializa a variável de movimento

        if (this.vivinho === 3 && this.happiness >= 5) { // Verifica se todas as partes do Vivinho foram coletadas e se a felicidade é suficiente
            this.time.delayedCall(200, () => { // Aguarda 200ms antes de executar a próxima ação
                this.scene.start('congratulationsMinigameScene', { selectedSpriteSheet: this.selectedSpriteSheet }); // Inicia a cena de parabéns
            });
        }

        const movements = [
            { key: 'W', velocity: { x: 0, y: -300 }, angle: 270 }, // Movimento para cima
            { key: 'S', velocity: { x: 0, y: 300 }, angle: 90 }, // Movimento para baixo
            { key: 'D', velocity: { x: 300, y: 0 }, angle: 0 }, // Movimento para a direita
            { key: 'A', velocity: { x: -300, y: 0 }, angle: 180 }, // Movimento para a esquerda
        ]; // Define os movimentos para as teclas

        movements.forEach(mov => {
            if (this.keys[mov.key].isDown) { // Verifica se a tecla correspondente está pressionada
                this.hand.setVelocity(mov.velocity.x, mov.velocity.y); // Define a velocidade da mão
                this.hand.setAngle(mov.angle); // Define o ângulo da mão
                moving = true; // Define que a mão está se movendo
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

        this.background.tilePositionX += 0.5; // Move o fundo horizontalmente para criar o efeito de movimento
    }

    collectSmile(hand, smile) { // Função para coletar a carinnha feliz
        smile.setVisible(false); // Oculta a carinha
        smile.disableBody(true, true); // Desativa o corpo físico da carinha
        this.happiness += 1; // Incrementa a pontuação em 1
        this.updateProgressBar(); // Atualiza a barra de progresso de felicidade

        this.time.delayedCall(1000, () => { // Aguarda 1 segundo antes de executar a função
            let posY = Phaser.Math.Between(50, this.sys.game.config.height - 50); // Gera uma posição Y aleatória para a carinha
            let posX = Phaser.Math.Between(50, this.sys.game.config.width - 50); // Gera uma posição X aleatória para a carinha
            this.smile.setPosition(1500, posY); // Define a posição da carinha no eixo X e Y
            this.smile.setVisible(true); // Torna a carinha visível novamente
            this.smile.enableBody(true, 1500, posY, true, true); // Reativa o corpo físico da carinha
        });

        this.collected = this.sound.add('collectSound', { loop: false, volume: 10 }); // Adiciona o som de coleta
        this.collected.play(); // Reproduz o som de coleta
    }

    addHead() {
        let posY = Phaser.Math.Between(50, this.sys.game.config.height - 50); // Gera uma posição Y aleatória para a carinha
        let posX = Phaser.Math.Between(50, this.sys.game.config.width - 50); // Gera uma posição X aleatória para a carinha

        this.head = this.physics.add.sprite(1500, posY, 'head'); // Adiciona o sprite da carinha à cena
        this.head.setCollideWorldBounds(true); // Faz a carinha colidir com os limites do mundo
        this.head.setBounce(0.7); // Define o valor de quique para a carinha
        this.head.setScale(0.5); // Define o tamanho da carinha feliz
        this.head.setGravityX(-100); // Define a gravidade do eixo X para a carinha feliz
    }

    addBody() {
        let posY = Phaser.Math.Between(50, this.sys.game.config.height - 50); // Gera uma posição Y aleatória para a carinha
        let posX = Phaser.Math.Between(50, this.sys.game.config.width - 50); // Gera uma posição X aleatória para a carinha

        this.body = this.physics.add.sprite(1500, posY, 'body'); // Adiciona o sprite da carinha à cena
        this.body.setCollideWorldBounds(true); // Faz a carinha colidir com os limites do mundo
        this.body.setBounce(0.7); // Define o valor de quique para a carinha
        this.body.setScale(0.5); // Define o tamanho da carinha feliz
        this.body.setGravityX(-100); // Define a gravidade do eixo X para a carinha feliz
    }

    addLegs() {
        let posY = Phaser.Math.Between(50, this.sys.game.config.height - 50); // Gera uma posição Y aleatória para a carinha
        let posX = Phaser.Math.Between(50, this.sys.game.config.width - 50); // Gera uma posição X aleatória para a carinha

        this.legs = this.physics.add.sprite(1500, posY, 'legs'); // Adiciona o sprite da carinha à cena
        this.legs.setCollideWorldBounds(true); // Faz a carinha colidir com os limites do mundo
        this.legs.setBounce(0.7); // Define o valor de quique para a carinha
        this.legs.setScale(0.5); // Define o tamanho da carinha feliz
        this.legs.setGravityX(-100); // Define a gravidade do eixo X para a carinha feliz
    }

    addBanana() {
        let posY = Phaser.Math.Between(50, this.sys.game.config.height - 50); // Gera uma posição Y aleatória para a banana
        let posX = Phaser.Math.Between(50, this.sys.game.config.width - 50); // Gera uma posição X aleatória para a banana
        this.banana = this.physics.add.sprite(1500, posY, 'banana'); // Adiciona o sprite da banana à cena
        this.banana.setVelocityX(-200); // Define a velocidade da banana
        this.banana.setScale(0.28); // Define o tamanho da banana
        this.bananaExists = true; // Variável de controle
    }

    addBottle() {
        let posY = Phaser.Math.Between(50, this.sys.game.config.height - 50); // Gera uma posição Y aleatória para a garrafa
        let posX = Phaser.Math.Between(50, this.sys.game.config.width - 50); // Gera uma posição X aleatória para a garrfa
        this.bottle = this.physics.add.sprite(1500, posY, 'bottle'); // Adiciona o sprite do garrafa à cena
        this.bottle.setVelocityX(-200); // Define a velocidade da garrafa
        this.bottle.setScale(0.5); // Define o tamanho da garrafa
        this.bottleExists = true; // Variável de controle
    }

    addPaper() {
        let posY = Phaser.Math.Between(50, this.sys.game.config.height - 50); // Gera uma posição Y aleatória para o papel
        let posX = Phaser.Math.Between(50, this.sys.game.config.width - 50); // Gera uma posição X aleatória para o papel
        this.paper = this.physics.add.sprite(1500, posY, 'paper'); // Adiciona o sprite do papel à cena
        this.paper.setVelocityX(-200); // Define a velocidade do papel
        this.paper.setScale(0.2); // Define o tamanha do papel
        this.paperExists = true; // Variável de controle
    }

    crash(hand, trash) {
        this.physics.pause(); // Pausa a física do jogo
        this.hand.setVisible(false); // Oculta a mão
        this.scene.start('gameOverMinigameTrashScene', { pontuacao: this.score }, { selectedSpriteSheet: this.selectedSpriteSheet }); // Inicia a cena de Game Over
    };

    collectVivinho(hand, part) {
        if (this.headCollected && part === this.head) { // Verifica se a cabeça foi coletada e se a parte atual é a cabeça
            this.headCollected = false; // Marca que a cabeça não está mais coletada
            this.head.setVisible(false); // Torna a cabeça invisível
            this.head.disableBody(true, true); // Desativa o corpo físico da cabeça
            this.vivinho += 1; // Incrementa o contador de partes do Vivinho
            this.updateVivinhoProgressBar(); // Atualiza a barra de progresso do Vivinho
        } else if (this.bodyCollected && part === this.body) { // Verifica se o corpo foi coletado e se a parte atual é o corpo
            this.bodyCollected = false; // Marca que o corpo não está mais coletado
            this.body.setVisible(false); // Torna o corpo invisível
            this.body.disableBody(true, true); // Desativa o corpo físico do corpo
            this.vivinho += 1; // Incrementa o contador de partes do Vivinho
            this.updateVivinhoProgressBar(); // Atualiza a barra de progresso do Vivinho
        } else if (this.legsCollected && part === this.legs) { // Verifica se as pernas foram coletadas e se a parte atual é as pernas
            this.legsCollected = false; // Marca que as pernas não estão mais coletadas
            this.legs.setVisible(false); // Torna as pernas invisíveis
            this.legs.disableBody(true, true); // Desativa o corpo físico das pernas
            this.vivinho += 1; // Incrementa o contador de partes do Vivinho
            this.updateVivinhoProgressBar(); // Atualiza a barra de progresso do Vivinho
        }

        this.collected = this.sound.add('collectSound', { loop: false, volume: 10 }); // Adiciona o som de coleta com volume e sem loop
        this.collected.play(); // Reproduz o som de coleta
    }

    spawnRandomTrash() {
        const randomTrash = Phaser.Math.Between(0, 2); // Gera um número aleatório entre 0 e 2 para decidir o tipo de lixo

        switch (randomTrash) {
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
    spawnRandomVivinho() {
        const randomVivinho = Phaser.Math.Between(0, 2); // Gera um número aleatório entre 0 e 2 para decidir qual parte do Vivinho será gerada

        switch (randomVivinho) {
            case 0: // Caso o número aleatório seja 0
                if (!this.headSpawned) { // Verifica se a cabeça ainda não foi gerada
                    this.addHead(); // Adiciona a cabeça do Vivinho à cena
                    this.physics.add.overlap(this.hand, this.head, this.collectVivinho, null, this); // Adiciona detecção de sobreposição entre a mão e a cabeça
                    this.headCollected = true; // Marca que a cabeça pode ser coletada
                    this.headSpawned = true; // Marca que a cabeça foi gerada
                }
                break;
            case 1: // Caso o número aleatório seja 1
                if (!this.bodySpawned) { // Verifica se o corpo ainda não foi gerado
                    this.addBody(); // Adiciona o corpo do Vivinho à cena
                    this.physics.add.overlap(this.hand, this.body, this.collectVivinho, null, this); // Adiciona detecção de sobreposição entre a mão e o corpo
                    this.bodyCollected = true; // Marca que o corpo pode ser coletado
                    this.bodySpawned = true; // Marca que o corpo foi gerado
                }
                break;
            case 2: // Caso o número aleatório seja 2
                if (!this.legsSpawned) { // Verifica se as pernas ainda não foram geradas
                    this.addLegs(); // Adiciona as pernas do Vivinho à cena
                    this.physics.add.overlap(this.hand, this.legs, this.collectVivinho, null, this); // Adiciona detecção de sobreposição entre a mão e as pernas
                    this.legsCollected = true; // Marca que as pernas podem ser coletadas
                    this.legsSpawned = true; // Marca que as pernas foram geradas
                }
                break;
        }
    }

    updateProgressBar() {
        const max = 5; // Define o valor máximo de felicidade
        const percentage = Phaser.Math.Clamp(this.happiness / max, 0, 1); // Calcula a porcentagem de felicidade, garantindo que esteja entre 0 e 1
        const barWidth = 300; // Define a largura da barra de progresso
        const barHeight = 30; // Define a altura da barra de progresso

        this.progressBar.clear(); // Limpa o gráfico da barra de progresso anterior
        this.progressBar.fillStyle(0xFED308, 1); // Define a cor da barra de progresso (amarelo)
        this.progressBar.fillRect(width - 1450, height - 730, barWidth * percentage, barHeight); // Desenha a barra de progresso com base na porcentagem de felicidade
    }

    updateVivinhoProgressBar() {
        const maxParts = 3; // Cabeça, corpo e pernas
        const percentage = Phaser.Math.Clamp(this.vivinho / maxParts, 0, 1); // Calcula a porcentagem do vivinho, garantindo que esteja entre 0 e 1
        const barWidth = 300; // Define a largura da barra de progresso
        const barHeight = 30; // Define a altura da barra de progresso

        this.vivinhoProgressBar.clear();
        this.vivinhoProgressBar.fillStyle(0x670099, 1); // Define a cor da barra de progresso (roxo)
        this.vivinhoProgressBar.fillRect(width - 1450, height - 690, barWidth * percentage, barHeight);
    }
}

class GameOverMinigameTrashScene extends Phaser.Scene {
    constructor() {
        super({ key: 'gameOverMinigameTrashScene' });
    }

    preload() {
        this.load.image('purple', '../assets/assetsTrash/purple.png'); // Carrega a imagem de fundo roxa
        this.load.image('mud', '../assets/assetsTrash/mud.png'); // Carrega a imagem de lama
        this.load.image('gameOver', '../assets/assetsTrash/gameOver.png'); // Carrega a imagem de "Game Over"
        this.load.image('buttonRestart', '../assets/assetsTrash/buttonRestart.png'); // Carrega a imagem do botão de reiniciar

        this.load.audio('buttonSound', '../assets/sounds/687107__aphom000__mouse-2-button-fast-click.wav'); // Carrega o som do clique do botão
    }

    create() {
        this.add.image(width / 2, height / 2, 'purple'); // Adiciona a imagem de fundo roxa ao centro da tela

        this.addMud(); // Chama a função para adicionar a imagem de lama
        this.addGameOver(); // Chama a função para adicionar a imagem de "Game Over"
        this.createButtonRestart(); // Chama a função para criar o botão de reiniciar
    }

    buttonSound() {
        this.buttonClick = this.sound.add('buttonSound', { loop: false, volume: 10 }); // Adiciona o som do clique do botão com volume e sem loop
        this.buttonClick.play(); // Reproduz o som do clique do botão
    }

    addMud() {
        this.mud = this.add.image(width / 2, height / 2, 'mud'); // Adiciona a imagem de lama ao centro da tela
        this.mud.setScale(0); // Inicializa a escala da imagem de lama como 0 para criar um efeito de splash
        this.tweens.add({
            targets: this.mud, // Define a imagem de lama como alvo da animação
            scale: 1, // Define a escala final como 1
            duration: 500, // Define a duração da animação como 500ms
            ease: 'Bounce.easeOut' // Define o tipo de animação como "Bounce.easeOut"
        });
    }

    addGameOver() {
        this.gameOver = this.add.image(width / 2, height / 2, 'gameOver'); // Adiciona a imagem de "Game Over" ao centro da tela
        this.gameOver.setScale(0); // Inicializa a escala da imagem de "Game Over" como 0 para criar um efeito de splash
        this.tweens.add({
            targets: this.gameOver, // Define a imagem de "Game Over" como alvo da animação
            scale: 1, // Define a escala final como 1
            duration: 500, // Define a duração da animação como 500ms
            ease: 'Bounce.easeOut' // Define o tipo de animação como "Bounce.easeOut"
        });
    }

    createButtonRestart() {
        const buttonRestart = this.add.image(width / 2, height - 250, 'buttonRestart'); // Adiciona o botão de reiniciar na parte inferior da tela
        buttonRestart.setInteractive(); // Torna o botão interativo
        buttonRestart.setScale(0.7); // Define a escala do botão como 0.7
        buttonRestart.on('pointerdown', () => { // Adiciona um evento de clique ao botão
            this.buttonSound(); // Reproduz o som do clique do botão
            this.scene.stop('gameOverMinigameTrashScene'); // Para a cena de "Game Over"
            this.scene.start('minigameTrashScene', { selectedSpriteSheet: this.selectedSpriteSheet, }); // Reinicia a cena do minijogo
        });
    }
}

class CongratulationsMinigameScene extends Phaser.Scene {
    constructor() {
        super({ key: 'congratulationsMinigameScene' })
    }

    preload() {
        this.load.image('congratulation', '../assets/assetsTrash/parabens.png'); // Carrega a imagem de parabéns
        this.load.image('vivinhoComplete', '../assets/assetsTrash/moldura.png'); // Carrega a imagem do Vivinho completo
        this.load.image('buttonBack', '../assets/assetsTrash/buttonBack.png'); // Carrega a imagem do botão de voltar
        this.load.audio('buttonSound', '../assets/sounds/687107__aphom000__mouse-2-button-fast-click.wav'); // Carrega o som do clique do botão
    }

    create() {
        this.addCongratulation(); // Adiciona a imagem de parabéns à cena
        this.addVivinhoComplete(); // Adiciona a imagem do Vivinho completo à cena
        this.createButtonBack(); // Cria o botão de voltar
    }

    buttonSound() {
        this.buttonClick = this.sound.add('buttonSound', { loop: false, volume: 10 }); // Adiciona o som do clique do botão com volume e sem loop
        this.buttonClick.play(); // Reproduz o som do clique do botão
    }

    addCongratulation() {
        this.congratulation = this.add.image(width / 2, height - 600, 'congratulation'); // Adiciona a imagem de parabéns ao centro superior da tela
        this.congratulation.setScale(0); // Inicializa com escala 0 para criar um efeito de splash
        this.tweens.add({
            targets: this.congratulation, // Define a imagem de parabéns como alvo da animação
            scale: 1, // Define a escala final como 1
            duration: 500, // Define a duração da animação como 500ms
            ease: 'Bounce.easeOut' // Define o tipo de animação como "Bounce.easeOut"
        });
    }

    addVivinhoComplete() {
        this.vivinhoComplete = this.add.image(width / 2, height - 300, 'vivinhoComplete'); // Adiciona a imagem do Vivinho completo ao centro da tela
        this.vivinhoComplete.setScale(0); // Inicializa com escala 0 para criar um efeito de splash
        this.tweens.add({
            targets: this.vivinhoComplete, // Define a imagem do Vivinho completo como alvo da animação
            scale: 0.7, // Define a escala final como 0.7
            angle: 360, // Adiciona uma rotação completa de 360 graus
            duration: 1000, // Define a duração da animação como 1000ms
            ease: 'Bounce.easeOut' // Define o tipo de animação como "Bounce.easeOut"
        });
    }

    createButtonBack() {
        const buttonBack = this.add.image(width / 2, height - 80, 'buttonBack'); // Adiciona o botão de voltar na parte inferior da tela
        buttonBack.setInteractive(); // Torna o botão interativo
        buttonBack.setScale(1.2); // Define a escala do botão como 0.7
        buttonBack.on('pointerdown', () => { // Adiciona um evento de clique ao botão
            this.buttonSound(); // Reproduz o som do clique do botão
            this.scene.stop('congratulationsMinigameScene'); // Para a cena de parabéns

            const vpScene = this.scene.get('vpPessoasScene'); // Obtém a cena 'vpPessoasScene'
            vpScene.resume(); // Chama o método resume definido na cena 'vpPessoasScene'
            this.scene.resume('vpPessoasScene'); // Retoma o fluxo normal da cena 'vpPessoasScene'
        });
    }
}