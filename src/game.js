
const config = { // Configuração do jogo Phaser
  type: Phaser.AUTO, // Define o tipo de renderização (Phaser.AUTO escolhe automaticamente entre WebGL e Canvas)
  width: width, // Define a largura do jogo com base na largura da janela do navegador
  height: height, // Define a altura do jogo com base na altura da janela do navegador
  pixelArt: true, // Ativa o modo pixel art para gráficos retro
  backgroundColor: 0x2f052f, // Define a cor de fundo do jogo como um tom específico de roxo
  scale: {
    mode: Phaser.Scale.FIT,  // Ajusta o jogo para caber na tela mantendo a proporção
    width: width, // Define a largura fixa do jogo
    height: height, // Define a altura fixa do jogo
    parent: 'game-container'  // Especifica o ID do contêiner HTML onde o jogo será renderizado
  },
  physics: {
    default: 'arcade', // Define o sistema de física padrão como 'arcade'
    arcade: {
      gravity: { y: 0 }, // Define a gravidade no eixo Y como 0 (sem gravidade)
      debug: false, // Desativa o modo de depuração da física para evitar sobrecarga visual
    }
  },
  scene: [ // Lista de cenas do jogo
    InitialScene, // Cena inicial do jogo
    PlayerSkinSelection,//Cena de escolha de personagens
    AjusteScene, // Cena de ajustes ou configurações
    CreditosScene, // Cena de créditos do jogo

    CutScene, // Cena de transição ou narrativa
    GameplayTutorialScene, // Cena de tutorial de gameplay
    TutorialScene, // Cena de tutorial para ensinar o jogador
    
    OfficeScene, // Cena do escritório 
    CurriculoScene, // Cena relacionada ao currículo
    QuizVpPessoas, // Cena de quiz do VP de Pessoas
    CongratulationsSceneCurriculoVpPessoas, // Cena de parabéns após o currículo do VP de Pessoas
    QuizVpEstrategia, // Cena de quiz do VP de Estratégia
    CongratulationsSceneCurriculoVpEstrategia, // Cena de parabéns após o currículo do VP de Estratégia
    QuizVpNegocios, // Cena de quiz do VP de Negócios
    CongratulationsSceneCurriculoVpNegocios, // Cena de parabéns após o currículo do VP de Negócios
    QuizVpRelacoes, // Cena de quiz do VP de Relações
    CongratulationsSceneCurriculoVpRelacoes, // Cena de parabéns após o currículo do VP de Relações
    QuizVpTecnologia, // Cena de quiz do VP de Tecnologia
    CongratulationsSceneCurriculoVpTecnologia, // Cena de parabéns após o currículo do VP de Tecnologia  
    SalaLider, // Cena da sala do líder

    buttonElevatorScene, // Cena do botão do elevador
    ElevadorScene, // Cena do elevador
    VpRelacoesScene, // Cena do VP de Relações

    VpPessoasScene, // Cena do VP de Pessoas
    MinigameTrashScene, // Cena de minigame relacionado a lixo
    GameOverMinigameTrashScene, // Cena de game over do minigame de lixo
    CongratulationsMinigameScene, // Cena de parabéns após completar o minigame
    bookScene, // Cena relacionada a um livro
    
    VpNegociosScene, // Cena do VP de Negócios
    MinigameWires, // Cena do minigame de fios

    VpEstrategiaScene,
    minigameEstrategiaCarlos, // Cena do VP de Estratégia
    minigameEstrategiaMariana,
    minigameEstrategiaAna,

    VpTecnologiaScene, // Cena do VP de Tecnologia
    EndScene // Cena de finalização do jogo
  ], 
};
  
  const game = new Phaser.Game(config); // Criação de uma nova instância do jogo Phaser com a configuração especificada
