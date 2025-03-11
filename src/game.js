
// Configuração do jogo Phaser
const config = {
    type: Phaser.AUTO, // Tipo de renderização (AUTO permite que o Phaser escolha entre WebGL e Canvas)
    width: window.innerWidth, // Largura do jogo igual à largura da janela do navegador
    height: window.innerHeight, // Altura do jogo igual à altura da janela do navegador
    scale: {
      mode: Phaser.Scale.FIT, //Ajustar para caber na tela sem distorcer
    },
    pixelArt: true,
    autoCenter: Phaser.Scale.CENTER, // Centralizar a tela de jogo
    physics: {
      default: "arcade", // Define o sistema de física padrão como 'arcade'
      arcade: {
        gravity: { y: 0 }, // Define a gravidade no eixo Y como 0 (sem gravidade)
        debug: false, // Desativa o modo de depuração da física
        },
      
    },
    scene: [
      InitialScene,
      CutScene,
      TutorialScene,
      OfficeScene,
      CurriculoScene,
      QuizVpPessoas,
      GameOverSceneCurriculo,
      CongratulationsSceneCurriculoVpPessoas,
      QuizVpEstrategia,
      GameOverSceneCurriculoEstrategia,
      CongratulationsSceneCurriculoVpEstrategia,
      QuizVpNegocios,
      GameOverSceneCurriculoNegocios,
      CongratulationsSceneCurriculoVpNegocios,
      QuizVpRelacoes,
      GameOverSceneCurriculoRelacoes,
      CongratulationsSceneCurriculoVpRelacoes,
      ElevadorScene, 
      GameplayTutorialScene
    ], // Lista das cenas do jogo
  };
  
  // Criação de uma nova instância do jogo Phaser com a configuração especificada
  const game = new Phaser.Game(config);