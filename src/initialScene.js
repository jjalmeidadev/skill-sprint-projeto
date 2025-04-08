class InitialScene extends Phaser.Scene {
  constructor() {
    super({ key: "initialScene" }); 
    this.vidroSlidePlayed = false; // Inicializa uma variável para rastrear se o som de "vidroslide" já foi tocado
    const config = {
      type: Phaser.AUTO, // Define o tipo de renderização como automático (Phaser escolhe entre WebGL e Canvas)
      width: 800, // Define a largura da tela do jogo
      height: 600, // Define a altura da tela do jogo
      pixelArt: true, // Habilita o modo de renderização para pixel art
      physics: {
        default: "arcade", // Define o sistema de física padrão como "arcade"
        arcade: {
          debug: false, // Desativa o modo de depuração para o sistema de física arcade
          gravity: { y: 0 }, // Define a gravidade no eixo Y como 0 (sem gravidade)
          fps: 60, // Define a taxa de quadros por segundo como 60
          fixedStep: true, // Habilita o uso de passos fixos para a simulação de física
        },
      },
      scene: InitialScene, // Define a cena inicial do jogo como "InitialScene"
    };
  }

  init(data) {
    this.selectedSpriteSheet = data.selectedSpriteSheet;
    ;
  }

  preload() {
    this.load.image("bg01", "../assets/assetsBackground/1.png"); // Carrega a imagem de fundo da camada 1
    this.load.image("bg02", "../assets/assetsBackground/2.png"); // Carrega a imagem de fundo da camada 2
    this.load.image("bg03", "../assets/assetsBackground/3.png"); // Carrega a imagem de fundo da camada 3
    this.load.image("bg04", "../assets/assetsBackground/4.png"); // Carrega a imagem de fundo da camada 4
    this.load.image("bg05", "../assets/assetsBackground/5.png"); // Carrega a imagem de fundo da camada 5
    this.load.image("bg06", "../assets/assetsBackground/6.png"); // Carrega a imagem de fundo da camada 6

    this.load.image("vivinho", "../assets/vivinho.png"); // Carrega a imagem do personagem "vivinho"
    this.load.image("title", "../assets/assetsBackground/titulo.png "); // Carrega a imagem do título da tela inicial

    this.load.image("buttonJogar", "../assets/assets_botoes/botaoJogar.png"); // Carrega a imagem do botão "Jogar"
    this.load.image("buttonCredits", "../assets/assets_botoes/botaoCreditos.png"); // Carrega a imagem do botão "Créditos"
    this.load.image("buttonSettings", "../assets/assets_botoes/botaoAjustes.png"); // Carrega a imagem do botão "Ajustes"
    this.load.image("layoutPlay", "../assets/assets_botoes/layoutPlay.png"); // Carrega a imagem do layout do botão "Play"

    this.load.spritesheet("birdEaster", "../assets/passaroeaster.png", { frameWidth: 75, frameHeight: 92 }); // Carrega o spritesheet do pássaro "birdeaster" com dimensões de cada frame
    this.load.spritesheet("meteor", "../assets/meteoroeaster.png", { frameWidth: 499, frameHeight: 500 }); // Carrega o spritesheet do meteoro com dimensões de cada frame
    this.load.spritesheet("explosion", "../assets/explosaoeaster.png", { frameWidth: 140, frameHeight: 100 }); // Carrega o spritesheet da explosão com dimensões de cada frame

    this.load.image("exploBird", "../assets/explodebird.png"); // Carrega a imagem do pássaro explodido

    this.load.audio("initialMusic", "../assets/Kevin MacLeod - Pixelland ♫ NO COPYRIGHT 8-bit Music.mp3"); // Carrega o áudio da música inicial em loop
    this.load.audio("buttonSound", "../assets/sounds/687107__aphom000__mouse-2-button-fast-click.wav"); // Carrega o som do clique do botão
    this.load.audio("vineBoom", "../assets/sounds/vineboom.mp3"); // Carrega o som do efeito "vineboom"
    this.load.audio("bumpVidro", "../assets/sounds/bumpvidro.mp3"); // Carrega o som de impacto no vidro
    this.load.audio("vidroSlide", "../assets/sounds/vidroslide.mp3"); // Carrega o som de arraste no vidro
  }

  create() {
    const width = this.scale.width; // Obtém a largura da tela
    const height = this.scale.height; // Obtém a altura da tela

    this.cameras.main.fadeIn(1000); // Aplica um efeito de fade-in na câmera principal

    this.bgs = []; // Cria um array para armazenar os fundos
    const speeds = [0.005, 0.05, 0.07, 0.08, 0.09, 0.1]; // Define as velocidades de movimento dos fundos
    for (let i = 0; i < 6; i++) {
      let bg = this.add.tileSprite(0, 0, 576, 324, `bg0${i + 1}`).setOrigin(0, 0).setScale(2.8); // Adiciona um fundo com tileSprite
      this.bgs.push({ sprite: bg, speed: speeds[i] }); // Adiciona o fundo e sua velocidade ao array
    }

    this.birdEaster = this.physics.add.sprite(width - (width + 105), height / 2.5, "birdEaster"); // Adiciona o sprite do pássaro "birdEaster"

    const birdEaster = this.birdEaster; // Referência ao pássaro
    this.birdEaster.v0 = 0; // Velocidade inicial do pássaro
    this.birdEaster.a = 20; // Aceleração do pássaro
    this.timeset = this.time.now; // Armazena o tempo atual

    this.meteor = this.physics.add.sprite(width + 200, height - 900, "meteor"); // Adiciona o sprite do meteoro
    const meteor = this.meteor; // Referência ao meteoro
    this.meteor.setFlipX(true); // Inverte o sprite horizontalmente
    meteor.setAngle(-20); // Define o ângulo inicial do meteoro
    this.meteor.setScale(0.4); // Reduz o tamanho do meteoro

    this.meteor.duration = 480; // Define a duração do movimento do meteoro em segundos

    this.meteor.xf = width / 3; // Posição final no eixo X
    this.meteor.x0 = width + 200; // Posição inicial no eixo X
    this.meteor.dS = this.meteor.xf - this.meteor.x0; // Deslocamento no eixo X
    this.meteor.v0y = 200; // Velocidade inicial no eixo Y
    this.meteor.v0x = 0; // Velocidade inicial no eixo X
    this.meteor.yf = height - 100; // Posição final no eixo Y
    this.meteor.y0 = height - 900; // Posição inicial no eixo Y
    this.meteor.a = (2 * (this.meteor.yf - this.meteor.y)) / this.meteor.duration ** 2; // Calcula a aceleração no eixo Y

    this.birdEaster.body.setEnable(true); // Habilita o corpo físico do pássaro
    this.meteor.body.setEnable(true); // Habilita o corpo físico do meteoro

    this.explosion = this.physics.add.sprite(width - 500, height / 2, "explosion"); // Adiciona o sprite da explosão

    const explosion = this.explosion; // Referência à explosão
    explosion.setScale(6); // Define o tamanho da explosão
    explosion.setCrop(70, 0, 500, 500); // Recorta a explosão para ajustar sua área visível

    this.anims.create({
      key: "fly", // Nome da animação
      frames: this.anims.generateFrameNumbers("birdEaster", { start: 0, end: 7 }), // Define os frames da animação
      frameRate: 10, // Taxa de quadros por segundo
      repeat: -1, // Repetição infinita
    });

    birdEaster.anims.play("fly", true); // Inicia a animação de voo do pássaro

    this.anims.create({
      key: "fall", // Nome da animação
      frames: this.anims.generateFrameNumbers("meteor", { start: 0, end: 7 }), // Define os frames da animação
      frameRate: 10, // Taxa de quadros por segundo
      repeat: -1, // Repetição infinita
    });

    meteor.anims.play("fall", true); // Inicia a animação de queda do meteoro

    this.anims.create({
      key: "explosion", // Nome da animação
      frames: this.anims.generateFrameNumbers("explosion", { start: 0, end: 7 }), // Define os frames da animação
      frameRate: 10, // Taxa de quadros por segundo
      repeat: 0, // Não repete
    });
    this.explosion.setVisible(false); // Torna a explosão invisível inicialmente

    this.initialMusic = this.sound.add("initialMusic", { loop: true, volume: 0.5 }); // Adiciona a música inicial com loop
    this.initialMusic.play(); // Toca a música inicial

    this.exploBird = this.add.image(width - 300, height - 430, "exploBird").setScale(0.5); // Adiciona o sprite do pássaro explodido
    this.exploBird.setVisible(false); // Torna o pássaro explodido invisível inicialmente
    this.exploBird.setDepth(1); // Define a profundidade do pássaro explodido

    this.events.on("shutdown", this.shutdown, this); // Registra o evento para encerrar a música ao sair da cena
    this.events.on("pause", this.shutdown, this); // Registra o evento para pausar a música ao pausar a cena

    this.add.image(width / 2, height / 4, "title").setScale(2.0); // Adiciona a imagem do título
    this.add.image(width / 2, height - 250, "layoutPlay").setScale(1.0); // Adiciona a imagem do layout do botão "Play"

    this.add.image(width - 100, height - 100, "vivinho").setScale(0.75); // Adiciona a imagem do personagem "vivinho"

    this.createButtonJogar(width, height); // Cria o botão "Jogar"
    this.createButtonCredits(width, height); // Cria o botão "Créditos"
    this.createButtonSettings(width, height); // Cria o botão "Ajustes"

    this.physics.add.collider(
      this.birdEaster, // Primeiro objeto da colisão
      this.meteor, // Segundo objeto da colisão
      (birdEaster, meteor) => {
        this.collision(birdEaster, meteor); // Chama a função de colisão ao detectar colisão
      },
      null, // Sem condições adicionais
      this // Contexto da cena
    );
  }

  collision = (birdEaster, meteor) => {
    birdEaster.setVelocity(0, 0); // Para o movimento do pássaro
    meteor.setVelocity(0, 0); // Para o movimento do meteoro

    // Efeito de mexer a câmera (comentado)
    // this.cameras.main.shake(300, 0.01);

    birdEaster.setActive(false); // Desativa o pássaro
    birdEaster.setVisible(false); // Torna o pássaro invisível

    meteor.setActive(false); // Desativa o meteoro
    meteor.setVisible(false); // Torna o meteoro invisível

    this.explosion.setActive(true); // Ativa a explosão
    this.explosion.setVisible(true); // Torna a explosão visível
    this.sound.play("vineBoom", { volume: 0.7 }); // Toca o som "vineBoom" com volume reduzido
    this.explosion.anims.play("explosion", true); // Inicia a animação da explosão
    this.explosion.on("animationcomplete", () => {
      this.explosion.setVisible(false); // Torna a explosão invisível após a animação
    });

    let size = [ // Define os tamanhos para o aumento gradual do pássaro
      1.1, 1.2, 1.3, 1.4, 1.5, 1.6, 1.7, 1.8, 1.9, 2.0, 2.1, 2.2, 2.3, 2.4, 2.5,
    ]; 

    this.exploBird.setVisible(true); // Torna o pássaro explodido visível

    for (let i = 0; i < size.length; i++) { // Aumento gradual do pássaro
      this.time.delayedCall(i * 100, () => {
        this.tweens1 = this.tweens.add({
          targets: this.exploBird, // Alvo da animação
          scale: size[i], // Define o tamanho atual do pássaro
          duration: 430, // Duração da animação
          ease: "Linear", // Tipo de interpolação linear
        });
      });

      this.tweens2 = this.tweens.add({ // Rotação do pássaro
        targets: this.exploBird, // Alvo da animação
        angle: 300, // Define o ângulo de rotação
        duration: 1300, // Duração da animação
        ease: "Linear", // Tipo de interpolação linear
        repeat: 0, // Não repete
      });
    }

    this.tweens3 = this.tweens.add({ // Trajeto do pássaro até o vidro do computador
      targets: this.exploBird, // Alvo da animação
      x: this.exploBird.x - 600, // Define a posição final no eixo X
      y: this.exploBird.y - 5, // Define a posição final no eixo Y
      duration: 1800, // Duração da animação
      ease: "Linear", // Tipo de interpolação linear
    });

    this.tweens3.on("complete", () => { // Toca o som de arraste no vidro
      this.sound.stopByKey("vidroSlide"); // Para o som "vidroSlide" se já estiver tocando
      this.sound.play("vidroSlide", { volume: 8 }); // Toca o som "vidroSlide" com volume aumentado
      this.vidroSlidePlayed = true; // Marca que o som foi tocado

      this.tweens4 = this.tweens.add({
        targets: this.exploBird, // Alvo da animação
        y: this.exploBird.y + 2000, // Move o pássaro para fora da tela no eixo Y
        duration: 7000, // Duração da animação
        ease: "Linear", // Tipo de interpolação linear
      });
    });
  };

  shutdown() {
    if (this.initialMusic && this.initialMusic.isPlaying) { // Interrompe a música ao encerrar ou pausar a cena
      this.initialMusic.stop(); // Para a música inicial se estiver tocando
    }
  }

  buttonSound() {
    this.buttonClick = this.sound.add("buttonSound", { loop: false, volume: 10 }); // Adiciona o som de clique do botão com volume alto
    this.buttonClick.play(); // Toca o som de clique do botão
  }

  createButtonJogar(width, height) {
    const buttonJogar = this.add.image(width / 2, height / 2 + 50, "buttonJogar"); // Adiciona a imagem do botão "Jogar" na posição especificada
    buttonJogar.setInteractive(); // Torna o botão interativo
    buttonJogar.setScale(0.7); // Define o tamanho do botão
    buttonJogar.on("pointerdown", () => {
      this.buttonSound(); // Toca o som de clique do botão
      this.shutdown(); // Para a música inicial
      this.scene.stop("initialScene"); // Para a cena inicial
      this.scene.start("PlayerSkin", {selectedSpriteSheet: this.selectedSpriteSheet,}); // Inicia a cena "PlayerSkin"
    });
  }

  createButtonCredits(width, height) {
    const buttonCredits = this.add.image(width / 2, height / 1.5, "buttonCredits"); // Adiciona a imagem do botão "Créditos" na posição especificada
    buttonCredits.setInteractive(); // Torna o botão interativo
    buttonCredits.setScale(1); // Define o tamanho do botão
    buttonCredits.on("pointerdown", () => {
      this.buttonSound(); // Toca o som de clique do botão
      this.shutdown(); // Para a música inicial
      this.scene.stop("initialScene"); // Para a cena inicial
      this.scene.switch("creditosScene", {selectedSpriteSheet: this.selectedSpriteSheet,}); // Alterna para a cena "creditosScene"
    });
  }

  createButtonSettings(width, height) {
    const buttonSettings = this.add.image(width / 2, height - 175, "buttonSettings"); // Adiciona a imagem do botão "Ajustes" na posição especificada
    buttonSettings.setInteractive(); // Torna o botão interativo
    buttonSettings.setScale(1); // Define o tamanho do botão
    buttonSettings.on("pointerdown", () => {
      this.buttonSound(); // Toca o som de clique do botão
      this.shutdown(); // Para a música inicial
      this.scene.stop("initialScene"); // Para a cena inicial
      this.scene.start("AjustesScene", {selectedSpriteSheet: this.selectedSpriteSheet,}); // Inicia a cena "ajusteScene"
    });
  }

  update(time, delta) {
    this.bgs.forEach((layer) => {
      layer.sprite.tilePositionX += layer.speed; // Move o fundo horizontalmente com base na velocidade de cada camada
    });

    let t = (time - this.timeset) / 1000; // Converte o tempo decorrido desde o início para segundos

    if (time - this.timeset >= 10000) { // Verifica se 10 segundos se passaram
      if (this.birdEaster) {
        this.birdEaster.anims.play("fly", true); // Reproduz a animação de voo do pássaro

        let t = Math.max(time - this.timeset - 10000) / 1000; // Converte o tempo decorrido após 10 segundos para segundos

        // Cálculo da velocidade com V = v0 + at
        let vbird = this.birdEaster.v0 + this.birdEaster.a * t; // Calcula a velocidade do pássaro com base na aceleração e tempo

        // Cálculo do deslocamento com x = x0 + V0t + 0.5at²
        this.birdEaster.x = width - (width + 35) + this.birdEaster.v0 * t + 0.5 * this.birdEaster.a * t * t; // Atualiza a posição X do pássaro
      }
    }

    if (time - this.timeset >= 19000) {
      if (this.meteor) {
        var speedMultiplier = 100; // Multiplicador de velocidade para ajustar a escala
        this.meteor.setVelocityX(
          // Cálculo da velocidade com V = delta S/t
          (this.meteor.dS / this.meteor.duration) * speedMultiplier // Define a velocidade no eixo X com base no deslocamento e duração
        );

        this.meteor.setVelocityY(
           // Cálculo da velocidade com V = v0 + at
          this.meteor.v0y + this.meteor.a * this.meteor.duration // Define a velocidade no eixo Y com base na aceleração e tempo
        );
      }
    }

    if (this.meteor.visible === true) { // Verifica se o meteoro está visível na cena
      console.log( // Atualiza a posição do meteoro no console
        "A posição do meteoro no eixo X é: " +
          // Utilizando S(t) = S₀ + v.t em MU
          (this.meteor.x + this.meteor.v0x * this.meteor.duration) + // Calcula a posição X do meteoro com base na velocidade inicial e tempo
          " A posição do meteoro no eixo Y é: " +
          // Utilizando S(t) = S₀ + V₀.t + (a.t²)/2
          (this.meteor.y + this.meteor.v0y * this.meteor.duration +
            (this.meteor.a * this.meteor.duration ** 2) / 2) + // Calcula a posição Y do meteoro com base na velocidade inicial, aceleração e tempo
          // Utilizando velocidade com V = delta S/t
          "A velocidade do meteoro no eixo X é: " +
          ((this.meteor.dS / this.meteor.duration) * speedMultiplier) + // Calcula a velocidade no eixo X com base no deslocamento e duração
          // Utilizando velocidade com V = v0 + at
          " A velocidade do meteoro no eixo Y é: " +
          (this.meteor.v0y + this.meteor.a * this.meteor.duration) // Calcula a velocidade no eixo Y com base na aceleração e tempo
      );
    }
  }
}
