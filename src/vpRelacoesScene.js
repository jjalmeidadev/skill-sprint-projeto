class VpRelacoesScene extends Phaser.Scene {
  constructor() {
    super({ key: "VpRelacoesScene" });
    this.canMove = true; // Controla se o jogador pode se mover
  }

  preload() {
    this.load.video("bgbase", "assets/images/relainst1.mp4");
    this.load.video("bgman", "assets/images/relainsthomi.mp4");
    this.load.video("bgwom", "assets/images/relainstmuie.mp4");

    this.load.spritesheet("player", "../assets/personagens/skinsPlayer/player1all.png", {
      frameWidth: 16,
      frameHeight: 32,
    });
  }

  create() {
    this.cameras.main.fadeIn(1000); // Aplica um efeito de transição para a cena

    const width = this.scale.width; // Obtém a largura da tela
    const height = this.scale.height; // Obtém a altura da tela

    // Criando o jogador
    this.player = this.physics.add.sprite(400, 300, "player");

    // Criando vídeo base
    this.bgbase = this.add.video(width / 2, height / 2, "bgbase").setOrigin(0).setScale(1.5);
    this.bgbase.setDisplaySize(width, height);
    this.bgbase.play(true);

    // Verifica a skin do jogador para trocar o vídeo
    if (this.player.texture.key === "player") {
      // Se for a skin padrão, mantém o bgbase ativo
    } else if (this.player.texture.key === "playermulher") {
      this.bgbase.stop();
      this.bgwom = this.add.video(0, 0, "bgwom").setOrigin(0).setScale(1.5);
      this.bgwom.play(true);
    } else {
      this.bgbase.stop();
      this.bgman = this.add.video(0, 0, "bgman").setOrigin(0).setScale(1.5);
      this.bgman.play(true);
    }
  }

  createButtonOffice(width, height) {
    otão
    
    
  }

  update() {

    this.movePlayer(); // Atualiza a posição do jogador

    const width = this.scale.width; // Obtém a largura da tela
    const height = this.scale.height; // Obtém a altura da tela

    const closeToButtons =
      Math.abs(this.player.x - this.proximity.x) <= 50 && // Verifica a proximidade no eixo X
      Math.abs(this.player.y - this.proximity.y) <= 50;   // Verifica a proximidade no eixo Y
  }

 

  movePlayer() {
    const speed = 150; // Define a velocidade de movimento do jogador
    let moving = false; // Variável para verificar se o jogador está se movendo
  
    if (this.keys.left.isDown) { // Verifica se a tecla "esquerda" está pressionada
      this.player.setVelocityX(-speed); // Move o jogador para a esquerda
      this.lastPosition = "left"; // Atualiza a última posição para "esquerda"
      this.player.anims.play("walk_left", true); // Reproduz a animação de andar para a esquerda
      moving = true; // Marca que o jogador está se movendo
    } else if (this.keys.right.isDown) { // Verifica se a tecla "direita" está pressionada
      this.player.setVelocityX(speed); // Move o jogador para a direita
      this.lastPosition = "right"; // Atualiza a última posição para "direita"
      this.player.anims.play("walk_right", true); // Reproduz a animação de andar para a direita
      moving = true; // Marca que o jogador está se movendo
    } else {
      this.player.setVelocityX(0); // Para o movimento horizontal do jogador
    }
    
    if (!moving) { // Se o jogador não está se movendo, reproduz a animação de "parado" correspondente
      switch (this.lastPosition) { // Verifica a última posição do jogador
        case "left":
          this.player.anims.play("stop_left", true); // Reproduz a animação de parado olhando para a esquerda
          break;
        case "right":
          this.player.anims.play("stop_right", true); // Reproduz a animação de parado olhando para a direita
          break;
      }
      this.walkSound.stop(); // Para o som de passos
    } else {
      if (!this.walkSound.isPlaying) { // Verifica se o som de passos não está tocando
        this.walkSound.play(); // Reproduz o som de passos
      }
    }
  }

  createBarriers() {

    this.proximity = this.add.rectangle(width - 955, height - 650, 105, 70, 0xff0000, 0); // Adiciona um retângulo invisível para detectar proximidade
    this.physics.add.existing(this.proximity, true); // Adiciona física à área de proximidade

    /*
    
        this.barrier = this.add.rectangle(width - 760, height - 40, 620, 120, 0xff0000, 0); // Cria uma barreira horizontal na parte inferior da tela
        this.physics.add.existing(this.barrier, true); // Adiciona física à barreira, tornando-a estática
        this.physics.add.collider(this.player, this.barrier); // Adiciona colisão entre o jogador e a barreira
        
        this.barrier1 = this.add.rectangle(width - 500, height - 20, 20, 1400, 0xff0000, 0); // Cria uma barreira vertical no lado direito da tela
        this.physics.add.existing(this.barrier1, true); // Adiciona física à barreira, tornando-a estática
        this.physics.add.collider(this.player, this.barrier1); // Adiciona colisão entre o jogador e a barreira*/

  }
}
