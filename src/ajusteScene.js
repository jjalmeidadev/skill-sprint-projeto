/**
 * Classe AjusteScene representa a cena de ajustes do jogo, onde o jogador pode alterar configurações como volume e retornar à cena inicial.
 * Esta classe utiliza o framework Phaser para criar e gerenciar a cena.
 */
class AjusteScene extends Phaser.Scene {
  /**
   * Construtor da classe AjusteScene.
   * Define a chave da cena como 'ajusteScene'.
   */
  constructor() {
    super({ key: 'ajusteScene' });
  }

  /**
   * Método init é chamado antes da cena ser carregada.
   * @param {Object} data - Dados passados para a cena, incluindo o sprite selecionado.
   */
  init(data) {
    this.selectedSpriteSheet = data.selectedSpriteSheet; // Armazena o sprite selecionado para uso posterior.
  }

  /**
   * Método preload carrega todos os recursos necessários para a cena, como imagens, sons e músicas.
   */
  preload() {
    // Carrega imagens de fundo, layout, botões e título.
    this.load.image('bg01', '../assets/assetsBackground/1.png');
    this.load.image('bg02', '../assets/assetsBackground/2.png');
    this.load.image('bg03', '../assets/assetsBackground/3.png');
    this.load.image('bg04', '../assets/assetsBackground/4.png');
    this.load.image('bg05', '../assets/assetsBackground/5.png');
    this.load.image('bg06', '../assets/assetsBackground/6.png');

    this.load.image('layoutSettings', '../assets/assets_botoes/layoutAjustses.png'); // Carrega a imagem do layout de ajustes
    this.load.image('buttonUp', '../assets/assets_botoes/botaoMais.png'); // Carrega a imagem do botão de aumentar volume
    this.load.image('buttonDown', '../assets/assets_botoes/botaoMenos.png'); // Carrega a imagem do botão de diminuir volume
    this.load.image('buttonBack', '../assets/assets_botoes/botoaX.png'); // Carrega a imagem do botão de voltar
    this.load.image('title', '../assets/assetsBackground/titulo.png '); // Carrega a imagem do título do jogo

    this.load.audio('initialMusic', '../assets/Adventure Meme [ ezmp3.co ].mp3'); // Carrega a música da tela inicial
    this.load.audio('buttonSound', '../assets/sounds/687107__aphom000__mouse-2-button-fast-click.wav'); // Carrega o som do botão
  }

  /**
   * Método create é chamado após o preload e configura os elementos visuais e interativos da cena.
   */
  create() {
    const width = this.scale.width; // Obtém a largura da tela.
    const height = this.scale.height; // Obtém a altura da tela.
    this.cameras.main.fadeIn(1000); // Aplica um efeito de fade-in na câmera principal.

    this.bgs = []; // Cria um array para armazenar os planos de fundo
    const speeds = [0.005, 0.05, 0.07, 0.08, 0.09, 0.1]; // Define as velocidades de movimento para cada camada de fundo
    for (let i = 0; i < 6; i++) {
      let bg = this.add.tileSprite(0, 0, 576, 324, `bg0${i + 1}`) // Adiciona uma camada de fundo como um tileSprite
        .setOrigin(0, 0) // Define a origem do sprite no canto superior esquerdo
        .setScale(2.8); // Ajusta o tamanho do sprite

      this.bgs.push({ sprite: bg, speed: speeds[i] }); // Adiciona o sprite e sua velocidade ao array de planos de fundo
    }

    // Inicia a música da tela inicial em loop
    this.initialMusic = this.sound.add('initialMusic', { loop: true, volume: 1 }); // Carrega a música inicial com loop ativado e volume definido
    this.initialMusic.play(); // Reproduz a música inicial

    // Registra os eventos para pausar a música ao sair/pausar a cena
    this.events.on('shutdown', this.shutdown, this); // Adiciona um evento para interromper a música ao encerrar a cena
    this.events.on('pause', this.shutdown, this); // Adiciona um evento para interromper a música ao pausar a cena

    // Cria os elementos visuais da cena
    this.add.image(width / 2, height / 4, 'title').setScale(2.0); // Adiciona o título do jogo no topo da tela
    this.add.image(width / 2, height - 250, 'layoutSettings').setScale(2.0); // Adiciona o layout de ajustes no centro da tela

    // Cria os botões da tela inicial
    this.createButtonVolumeDown(width, height); // Cria o botão para diminuir o volume
    this.createButtonVolumeUp(width, height); // Cria o botão para aumentar o volume
    this.createButtonBack(width, height); // Cria o botão para voltar à cena inicial
  }

  /**
   * Cria o botão de retorno à cena inicial.
   * @param {number} width - Largura da tela.
   * @param {number} height - Altura da tela.
   */
  createButtonBack(width, height) {
    const buttonBack = this.add.image((width / 2) + 215, height - 350, 'buttonBack');
    buttonBack.setInteractive(); // Torna o botão interativo
    buttonBack.setScale(1.5); // Ajusta o tamanho do botão
    buttonBack.on('pointerdown', () => { // Adiciona um evento ao clicar no botão
      this.buttonSound(); // Reproduz o som do clique do botão
      this.shutdown(); // Interrompe a música da cena
      this.scene.stop('ajusteScene'); // Para a cena atual
      this.scene.start('initialScene', { selectedSpriteSheet: this.selectedSpriteSheet, }); // Inicia a cena inicial
    });
  }

  /**
   * Cria o botão para aumentar o volume.
   * @param {number} width - Largura da tela.
   * @param {number} height - Altura da tela.
   */
  createButtonVolumeUp(width, height) {
    // Adiciona o botão para aumentar o volume
    const buttonUp = this.add.image((width / 2) + 77, (height / 2) + 194.3, 'buttonUp');
    buttonUp.setInteractive(); // Torna o botão interativo
    buttonUp.setScale(1.3); // Ajusta o tamanho do botão
    buttonUp.on('pointerdown', () => { // Adiciona um evento ao clicar no botão
      this.buttonSound(); // Reproduz o som do clique do botão
      this.sound.volume += 0.5; // Aumenta o volume do som em 0.5
    });
  }

  /**
   * Cria o botão para diminuir o volume.
   * @param {number} width - Largura da tela.
   * @param {number} height - Altura da tela.
   */
  createButtonVolumeDown(width, height) {
    // Adiciona o botão para diminuir o volume
    const buttonDown = this.add.image((width / 2) - 80, (height / 2) + 194.3, 'buttonDown');
    buttonDown.setInteractive(); // Torna o botão interativo
    buttonDown.setScale(1.3); // Ajusta o tamanho do botão
    buttonDown.on('pointerdown', () => { // Adiciona um evento ao clicar no botão
      this.buttonSound(); // Reproduz o som do clique do botão
      this.sound.volume -= 0.5; // Diminui o volume do som em 0.5
    });
  }

  /**
   * Método shutdown é chamado para interromper a música ao encerrar ou pausar a cena.
   */
  shutdown() {
    // Interrompe a música ao encerrar ou pausar a cena
    if (this.initialMusic && this.initialMusic.isPlaying) { // Verifica se a música está tocando
      this.initialMusic.stop(); // Para a música
    }
  }

  buttonSound() {
    // Reproduz o som do clique do botão
    this.buttonClick = this.sound.add('buttonSound', { loop: false, volume: 10 }); // Adiciona o som do botão com volume definido
    this.buttonClick.play(); // Reproduz o som do botão
  }

  /**
   * Método update é chamado a cada frame para atualizar os elementos da cena.
   * Atualiza a posição dos planos de fundo para criar o efeito de paralaxe.
   */
  update() {
    // Atualiza a posição dos planos de fundo para criar o efeito de paralaxe
    this.bgs.forEach(layer => {
      layer.sprite.tilePositionX += layer.speed; // Move cada camada de fundo com base na sua velocidade
    });
  }
}