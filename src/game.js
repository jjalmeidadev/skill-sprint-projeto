
// Configuração do jogo Phaser
const config = {
    type: Phaser.AUTO, // Tipo de renderização (AUTO permite que o Phaser escolha entre WebGL e Canvas)
    width: width, // Largura do jogo igual à largura da janela do navegador
    height: height, // Altura do jogo igual à altura da janela do navegador
    pixelArt: true,
    backgroundColor: 0x2f052f,
    scale: {
      mode: Phaser.Scale.FIT,  // Mantém a proporção e ajusta o jogo à tela sem cortar
      width: width, // Mantém a largura fixa
      height: height, // Mantém a altura fixa
      parent: 'game-container'  // Define um contêiner HTML específico
    },
    physics: {
        default: 'arcade', // Define o sistema de física padrão como 'arcade'
        arcade: {
            gravity: { y: 0 }, // Define a gravidade no eixo Y como 0 (sem gravidade)
            debug: false, // Desativa o modo de depuração da física
        }
    },
    
    scene: [
      InitialScene,
      AjusteScene,
      CreditosScene,
      CutScene,
      TutorialScene,
      OfficeScene,
      SalaLider,
      VpNegociosScene,
      VpPessoasScene,
      MinigameTrashScene,
      

      CurriculoScene,
      QuizVpPessoas,
      // GameOverSceneCurriculo,
      CongratulationsSceneCurriculoVpPessoas,
      QuizVpEstrategia,
      // GameOverSceneCurriculoEstrategia,
      CongratulationsSceneCurriculoVpEstrategia,
      QuizVpNegocios,
      // GameOverSceneCurriculoNegocios,
      CongratulationsSceneCurriculoVpNegocios,
      QuizVpRelacoes,
      // GameOverSceneCurriculoRelacoes,
      CongratulationsSceneCurriculoVpRelacoes,
      QuizVpTecnologia,
      // GameOverSceneCurriculoTecnologia,
      CongratulationsSceneCurriculoVpTecnologia,
      
      buttonElevatorScene,
      ElevadorScene, 
      GameplayTutorialScene
      
    ], // Lista das cenas do jogo
  };
  
  // Criação de uma nova instância do jogo Phaser com a configuração especificada
  const game = new Phaser.Game(config);
