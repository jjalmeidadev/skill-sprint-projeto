class InitialScene extends Phaser.Scene {
  constructor() {
    super({ key: "initialScene" });
    this.vidroslidePlayed = false;
    const config = {
      type: Phaser.AUTO,
      width: 800,
      height: 600,
      physics: {
        default: "arcade",
        arcade: {
          debug: false, 
          gravity: { y: 0 },
          fps: 60, 
          fixedStep: true, 
        },
      },
      scene: InitialScene,
    };
  }

  preload() {
    // Carrega os ativos visuais
    this.load.image("bg01", "../assets/assetsBackground/1.png");
    this.load.image("bg02", "../assets/assetsBackground/2.png");
    this.load.image("bg03", "../assets/assetsBackground/3.png");
    this.load.image("bg04", "../assets/assetsBackground/4.png");
    this.load.image("bg05", "../assets/assetsBackground/5.png");
    this.load.image("bg06", "../assets/assetsBackground/6.png");
    this.load.image("vivinho", "../assets/vivinho.png");

    this.load.image("titulo", "../assets/assetsBackground/titulo.png ");

    this.load.image("botaoJogar", "../assets/assets_botoes/botaoPlay.png");
    this.load.image( "botaoCreditos", "../assets/assets_botoes/botaoCreditos.png" );
    this.load.image("botaoAjustes", "../assets/assets_botoes/botaoAjustes.png");
    this.load.image("layoutPlay", "../assets/assets_botoes/layoutPlay.png");
    this.load.spritesheet("birdeaster", "../assets/passaroeaster.png", { frameWidth: 75, frameHeight: 92, });
    this.load.spritesheet("meteoro", "../assets/meteoroeaster.png", { frameWidth: 499, frameHeight: 500, });
    this.load.spritesheet("explosao", "../assets/explosaoeaster.png", { frameWidth: 140, frameHeight: 100, });

    this.load.image("explobird", "../assets/explodebird.png");
    // Carrega o áudio da tela inicial
    this.load.audio( "initialMusic", "../assets/Kevin MacLeod - Pixelland ♫ NO COPYRIGHT 8-bit Music.mp3" );
    this.load.audio( "buttonSound", "../assets/sounds/687107__aphom000__mouse-2-button-fast-click.wav" );
    this.load.audio("vineboom", "../assets/sounds/vineboom.mp3");
    this.load.audio("bumpvidro", "../assets/sounds/bumpvidro.mp3");
    this.load.audio("vidroslide", "../assets/sounds/vidroslide.mp3");
  }

  create() {
    const width = this.scale.width;
    const height = this.scale.height;

    this.cameras.main.fadeIn(1000);
    //
    this.bgs = [];
    const speeds = [0.005, 0.05, 0.07, 0.08, 0.09, 0.1];
    for (let i = 0; i < 6; i++) {
      let bg = this.add.tileSprite(0, 0, 576, 324, `bg0${i + 1}`).setOrigin(0, 0).setScale(2.8);
      this.bgs.push({ sprite: bg, speed: speeds[i] });
    }

    this.birdeaster = this.physics.add.sprite(width - (width + 105), height / 2.5, "birdeaster" );

    const birdeaster = this.birdeaster;
    this.birdeaster.v0 = 0;
    this.birdeaster.a = 20;
    this.timeset = this.time.now;

     this.meteoro = this.physics.add.sprite(
       width + 200,
       height - 900,
       "meteoro"
     );
     const meteoro = this.meteoro;
     this.meteoro.setFlipX(true);
     meteoro.setAngle(-20);
     this.meteoro.setScale(0.4);

     this.meteoro.duracao = 480; //segundos

     this.meteoro.xf = width / 3;
     this.meteoro.x0 = width + 200;
     this.meteoro.dS = this.meteoro.xf - this.meteoro.x0;
     this.meteoro.v0y = 200;
     this.meteoro.v0x = 0;
     this.meteoro.yf = height - 100;
     this.meteoro.y0 = height - 900;
     this.meteoro.a =
       (2 * (this.meteoro.yf - this.meteoro.y)) / this.meteoro.duracao ** 2;

    this.birdeaster.body.setEnable(true);
    this.meteoro.body.setEnable(true);

    this.explosao = this.physics.add.sprite( width - 500, height / 2, "explosao" );
   
    const explosao = this.explosao;
    this.explosao.setScale(6);
    this.explosao.setCrop(70, 0, 500, 500);

    this.anims.create({
      key: "fly",
      frames: this.anims.generateFrameNumbers("birdeaster", {
        start: 0,
        end: 7,
      }),
      frameRate: 10,
      repeat: -1,
    });

    birdeaster.anims.play("fly", true);

    this.anims.create({
      key: "fall",
      frames: this.anims.generateFrameNumbers("meteoro", {
        start: 0,
        end: 7,
      }),
      frameRate: 10,
      repeat: -1,
    });

    meteoro.anims.play("fall", true);

    this.anims.create({
      key: "explosao",
      frames: this.anims.generateFrameNumbers("explosao", {
        start: 0,
        end: 7,
      }),
      frameRate: 10,
      repeat: 0,
    });
    this.explosao.setVisible(false);

    // Inicia a música da tela inicial em loop
    this.initialMusic = this.sound.add("initialMusic", { loop: true, volume: 2, });
    this.initialMusic.play();

    this.explobird = this.add.image(width - 300, height - 430, "explobird").setScale(0.5);
    this.explobird.setVisible(false);
    this.explobird.setDepth(1);

    // Registra os eventos para pausar a música ao sair/pausar a cena
    this.events.on("shutdown", this.shutdown, this);
    this.events.on("pause", this.shutdown, this);

    // Adiciona a imagem de fundo e ajusta seu tamanho
    this.add.image(width / 2, height / 4, "titulo").setScale(2.0);
    this.add.image(width / 2, height - 250, "layoutPlay").setScale(1.0);

    this.add.image(width - 100, height - 100, "vivinho").setScale(0.75);

    // Cria os botões da tela inicial
    this.createButtonJogar(width, height);
    this.createButtonCreditos(width, height);
    this.createButtonAjustes(width, height);

    this.physics.add.collider(
      this.birdeaster,
      this.meteoro,
      (birdeaster, meteoro) => {
        this.collision(birdeaster, meteoro);
      },
      null,
      this
    );
  }

  collision = (birdeaster, meteoro) => {
    birdeaster.setVelocity(0, 0);
    meteoro.setVelocity(0, 0);

    // Efeito de mexer a cam
    // this.cameras.main.shake(300, 0.01);

    birdeaster.setActive(false); // Deixa inativo
    birdeaster.setVisible(false); // Deixar invisível

    meteoro.setActive(false); // Deixa inativo
    meteoro.setVisible(false); // Deixar invisível

    this.explosao.setActive(true);
    this.explosao.setVisible(true);
    this.sound.play("vineboom", { volume: 0.3 });
    this.explosao.anims.play("explosao", true);
    this.explosao.on("animationcomplete", () => {
      this.explosao.setVisible(false);
    });
    let size = [
      1.1, 1.2, 1.3, 1.4, 1.5, 1.6, 1.7, 1.8, 1.9, 2.0, 2.1, 2.2, 2.3, 2.4, 2.5,
    ];
    this.explobird.setVisible(true);

    //Aumento gradual do pássaro
    for (let i = 0; i < size.length; i++) {
      this.time.delayedCall(i * 100, () => {
        this.tweens1 = this.tweens.add({
          targets: this.explobird,
          scale: size[i],
          duration: 430,
          ease: "Linear",
        });
      });

      //Rotação do pássaro
      this.tweens2 = this.tweens.add({
        targets: this.explobird,
        angle: 300, 
        duration: 1300, 
        ease: "Linear", 
        repeat: 0, 
      });
    }

 //Trajeto do pássaro até o vidro do computador
    this.tweens3 = this.tweens.add({
      targets: this.explobird,
      x: this.explobird.x - 600,
      y: this.explobird.y - 5,
      duration: 1800,
      ease: "Linear",
    });

    // Toca o som de arraste no vidro
    this.tweens3.on("complete", () => {
      this.sound.stopByKey("vidroslide");
      this.sound.play("vidroslide", { volume: 3 });
      this.vidroslidePlayed = true;

      this.tweens4 = this.tweens.add({
        targets: this.explobird,
        y: this.explobird.y + 2000,
        duration: 7000,
        ease: "Linear",
      });
    });
  };

  shutdown() {
    // Interrompe a música ao encerrar ou pausar a cena
    if (this.initialMusic && this.initialMusic.isPlaying) {
      this.initialMusic.stop();
    }
  }

  buttonSound() {
    this.buttonClick = this.sound.add("buttonSound", {loop: false, volume: 10, });
    this.buttonClick.play();
  }

  createButtonJogar(width, height) {
    const botaoJogar = this.add.image(width / 2, height / 2 + 50, "botaoJogar");
    botaoJogar.setInteractive();
    botaoJogar.setScale(1);
    botaoJogar.on("pointerdown", () => {
      this.buttonSound();
      this.shutdown();
      this.scene.stop("initialScene");
      this.scene.start("cutScene");
    });
  }

  createButtonCreditos(width, height) {
    const botaoCreditos = this.add.image(width / 2, height / 1.5, "botaoCreditos" );
    botaoCreditos.setInteractive();
    botaoCreditos.setScale(1);
    botaoCreditos.on("pointerdown", () => {
      this.buttonSound();
      this.shutdown();
      this.scene.stop("initialScene");
      this.scene.switch("creditosScene");
    });
  }

  createButtonAjustes(width, height) {
    const botaoAjustes = this.add.image( width / 2, height - 175, "botaoAjustes" );
    botaoAjustes.setInteractive();
    botaoAjustes.setScale(1);
    botaoAjustes.on("pointerdown", () => {
      this.buttonSound();
      this.shutdown();
      this.scene.stop("initialScene");
      this.scene.start("ajusteScene");
    });
  }

  update(time, delta) {
    this.bgs.forEach((layer) => {
      layer.sprite.tilePositionX += layer.speed;
    });

    let t = (time - this.timeset) / 1000; // Converter para segundos

    // Verificar se 10 segundos passaram
    if (time - this.timeset >= 10000) {
      if ((this.birdeaster)) {
        this.birdeaster.anims.play("fly", true);

        let t = Math.max(time - this.timeset - 10000) / 1000; // Conversão pra segundos e subtração de 30

        // Cálculo da velocidade com V = v0 + at
        let vbird = this.birdeaster.v0 + this.birdeaster.a * t;

        //Cálculo do deslocamento com x = x0 + V0t + 0.5at²
        this.birdeaster.x = width - (width + 35) + this.birdeaster.v0 * t + 0.5 * this.birdeaster.a * t * t; // Cálculo da velocidade com V = delta S/t
      }
    }

     if (time - this.timeset >= 19000) {
       if (this.meteoro) {
         // Cálculo da velocidade com V = delta S/t

         var speedMultiplier = 100;
         this.meteoro.setVelocityX(
           (this.meteoro.dS / this.meteoro.duracao) * speedMultiplier
         );

         // Cálculo da velocidade com V = v0 + at

         this.meteoro.setVelocityY(
           this.meteoro.v0y + this.meteoro.a * this.meteoro.duracao
         );
       }
     }

      if (this.meteoro.visible === true) {
        console.log(
          "A posição do meteoro no eixo X é: " +
            // Utilizando S(t) = S₀ + v.t em MU
            (this.meteoro.x + this.meteoro.v0x * this.meteoro.duracao) +
            " A posição do meteoro no eixo Y é: " +
            // Utilizando S(t) = S₀ + V₀.t + (a.t²)/2
          (this.meteoro.y + this.meteoro.v0y * this.meteoro.duracao +
            (this.meteoro.a * this.meteoro.duracao ** 2) / 2) +
            // Utilizando velocidade com V = delta S/t
            "A velocidade do meteoro no eixo X é: " +
            ((this.meteoro.dS / this.meteoro.duracao) * speedMultiplier) +
            // Utilizando velocidade com V = v0 + at
            " A velocidade do meteoro no eixo Y é: " +
            (this.meteoro.v0y + this.meteoro.a * this.meteoro.duracao)
        );
      }
  }
}
