// Dados do Quiz
const perguntas = [
    {
        pergunta: "O setor de Pessoas da Vivo valoriza currículos bem organizados e fáceis de ler. Qual das seguintes práticas melhora a estrutura do seu currículo?",
        alternativas: [
            "Usar parágrafos longos para descrever cada experiência.",
            "Utilizar marcadores para destacar conquistas e habilidades.",
            "Incluir informações detalhadas sobre sua vida pessoal.",
            "Adicionar todas as experiências desde o primeiro emprego, sem priorizar as mais recentes."
        ],
        correta: 1,
        feedback: "Marcadores tornam o currículo mais legível e destacam suas conquistas de forma clara!"
    },
    {
        pergunta: "Qual a importância de destacar soft skills no currículo?",
        alternativas: [
            "São irrelevantes, apenas habilidades técnicas importam.",
            "Demonstram como o candidato se adapta e interage no ambiente de trabalho.",
            "Devem ser listadas de forma genérica, sem exemplos práticos.",
            "Devem substituir as experiências profissionais."
        ],
        correta: 1,
        feedback: "Soft skills mostram como você trabalha em equipe e se adapta a novos ambientes!"
    },
    {
        pergunta: "Como adaptar o currículo para ser aprovado por um sistema ATS (Applicant Tracking System)?",
        alternativas: [
            "Usando palavras-chave da descrição da vaga.",
            "Criando um design altamente visual e colorido.",
            "Usando apenas tópicos genéricos sobre experiências.",
            "Evitando títulos claros para as seções."
        ],
        correta: 0,
        feedback: "Palavras-chave da vaga ajudam seu currículo a passar pelos filtros automáticos!"
    },
    {
        pergunta: "O que é essencial para um currículo ser bem avaliado por um recrutador?",
        alternativas: [
            "Um layout sofisticado e cheio de imagens.",
            "Listar apenas experiências, sem detalhar conquistas.",
            "Destacar resultados e competências alinhadas à vaga.",
            "Usar um texto longo e detalhado para cada experiência."
        ],
        correta: 2,
        feedback: "Mostrar resultados concretos e habilidades relevantes para a vaga chama a atenção dos recrutadores!"
    },
    {
        pergunta: "Qual erro pode prejudicar um candidato ao enviar um currículo?",
        alternativas: [
            "Usar um e-mail profissional no contato.",
            "Adaptar o currículo para cada vaga.",
            "Excluir informações de contato.",
            "Deixar informações desatualizadas ou incorretas."
        ],
        correta: 2,
        feedback: "Informações desatualizadas ou incorretas mostram falta de atenção e podem eliminar sua candidatura!"
    }
];

// Variáveis globais
let perguntaAtual = 0;
let progresso = 0;
let pontuacao = 0;
const TEMPO_POR_PERGUNTA = 30; // Segundos para responder
let tempoRestante = TEMPO_POR_PERGUNTA;
let temporizador;

// Classe para a cena inicial do currículo
class CurriculoScene extends Phaser.Scene {
    constructor() {
        super({ key: 'curriculoScene' });
        this.currentBackground = 'background';
        this.canMove = true;
    }

    preload() {
        // Carrega as imagens
        this.load.image('primeiraTela', '../assets/primeiraTela.png');
        this.load.image('botao01', '../assets/botao_vp_pessoas.png');

        // Carrega a fonte
        this.load.font('FontePadrao', 'fonts/PixelifySans-VariableFont_wght.ttf');
    }

    create() {
        // Imagem de fundo sem distorção
        const fundo = this.add.image(this.cameras.main.width / 2, this.cameras.main.height / 2, 'primeiraTela');

        // Ajusta a escala para cobrir a tela mantendo a proporção
        this.scaleBackgroundImage(fundo);

        // Botão interativo com animação
        const botaoVpPessoas = this.add.image(
            400, 300,
            'botao01'
        ).setInteractive();

        botaoVpPessoas.on('pointerout', () => {
            botaoVpPessoas.setScale(1);
        });

        // Efeito de piscar ao clicar
        botaoVpPessoas.on('pointerdown', () => {
            this.tweens.add({
                targets: botaoVpPessoas,
                alpha: 0.6,
                duration: 100,
                yoyo: true,
                onComplete: () => {
                    // Fade out na câmera
                    this.cameras.main.fadeOut(500, 0, 0, 0, () => {
                        this.scene.start('QuizVpPessoas');
                    });
                }
            });
        });
    }

    // Método para ajustar a escala da imagem de fundo
    scaleBackgroundImage(image) {
        // Centraliza a imagem
        image.setOrigin(0.5);

        // Mantém a proporção e cobre a tela
        const scaleX = this.cameras.main.width / image.width;
        const scaleY = this.cameras.main.height / image.height;
        const scale = Math.max(scaleX, scaleY);

        image.setScale(scale);
    }
}

// Classe para a cena do Quiz
class QuizVpPessoas extends Phaser.Scene {
    constructor() {
        super({ key: 'QuizVpPessoas' });
        this.textosPergunta = []; // Armazena os textos da pergunta e alternativas
        this.botoesAlternativas = []; // Armazena os botões das alternativas
    }

    preload() {
        // Carrega os recursos para o quiz
        this.load.font('FontePadrao', 'fonts/PixelifySans-VariableFont_wght.ttf');
        this.load.image('TelaQuiz', '../assets/TelaQuiz.png');
    }

    create() {
        // Transição suave
        this.cameras.main.fadeIn(1000);

        // Adicionar a imagem de fundo sem distorção
        const fundo = this.add.image(this.cameras.main.width / 2, this.cameras.main.height / 2, 'TelaQuiz');
        this.scaleBackgroundImage(fundo);

        // Criar elementos de interface
        this.criarBarraProgresso();
        this.criarContadorPergunta();
        this.mostrarPergunta();
    }

    scaleBackgroundImage(image) {
        // Centraliza a imagem
        image.setOrigin(0.5);

        // Mantém a proporção e cobre a tela
        const scaleX = this.cameras.main.width / image.width;
        const scaleY = this.cameras.main.height / image.height;
        const scale = Math.max(scaleX, scaleY);

        image.setScale(scale);
    }

    criarContadorPergunta() {
        // Mostrar número da pergunta atual/total
        this.textoPerguntaNumero = this.add.text(
            this.sys.game.config.width - 150,
            50,
            `Pergunta ${perguntaAtual + 1}/${perguntas.length}`,
            { fontSize: '20px', fill: '#000', fontFamily: 'FontePadrao' }
        ).setOrigin(0.5);
    }

    criarBarraProgresso() {
        // Container para a barra de progresso
        const progressBarContainer = this.add.rectangle(100, 50, 300, 24, 0xDDDDDD)
            .setOrigin(0, 0.5)
            .setStrokeStyle(2, 0x000000);

        // Barra de progresso roxa    
        this.barraProgresso = this.add.rectangle(102, 50, 0, 20, 0xB600B9)
            .setOrigin(0, 0.5);

        // Texto de progresso    
        this.textoProgresso = this.add.text(
            420,
            50,
            `${progresso}%`,
            { fontSize: '20px', fill: '#000', fontFamily: 'FontePadrao', fontWeight: 'bold' }
        ).setOrigin(0, 0.5);
    }

    atualizarBarraProgresso() {
        // Atualizando a barra de progresso do quiz
        const larguraMaxima = 296;
        const novaLargura = (progresso / 100) * larguraMaxima;

        // Animar a barra de progresso
        this.tweens.add({
            targets: this.barraProgresso,
            width: novaLargura,
            duration: 500,
            ease: 'Power2'
        });

        this.textoProgresso.setText(`${progresso}%`);
    }

    limparElementos() {
        // Remove os textos da pergunta e alternativas
        this.textosPergunta.forEach(texto => texto.destroy());
        this.textosPergunta = [];

        // Remove os botões das alternativas
        this.botoesAlternativas.forEach(botao => botao.destroy());
        this.botoesAlternativas = [];
    }

    mostrarPergunta() {
        // Limpa os elementos antigos
        this.limparElementos();

        // Atualiza o contador de perguntas
        this.textoPerguntaNumero.setText(`Pergunta ${perguntaAtual + 1}/${perguntas.length}`);

        const pergunta = perguntas[perguntaAtual];

        // Exibindo a pergunta
        const textoPergunta = this.add.text(
            this.sys.game.config.width / 2,
            100,
            pergunta.pergunta,
            {
                fontSize: '22px',
                fill: '#B600B9',
                fontFamily: 'FontePadrao',
                fontWeight: 'bold',
                wordWrap: { width: this.sys.game.config.width - 150 },
                align: 'center'
            }
        ).setOrigin(0.5);

        this.textosPergunta.push(textoPergunta);

        // Exibindo alternativas
        const startY = 200;
        const spacing = 50;

        pergunta.alternativas.forEach((alternativa, index) => {
            // Container da alternativa (retângulo)
            const botaoContainer = this.add.rectangle(
                this.sys.game.config.width / 2,
                startY + (index * spacing),
                this.sys.game.config.width - 200,
                50,
                0xEAE8E8
            ).setStrokeStyle(2, 0x444444)
                .setInteractive();

            // Efeitos de hover
            botaoContainer.on('pointerover', () => {
                botaoContainer.fillColor = 0xDDDDDD;
                botaoContainer.setScale(1.02);
            });

            botaoContainer.on('pointerout', () => {
                botaoContainer.fillColor = 0xEAE8E8;
                botaoContainer.setScale(1);
            });

            // Evento de clique
            botaoContainer.on('pointerdown', () => {
                this.verificarResposta(index, botaoContainer);
            });

            // Texto da alternativa
            const textoAlternativa = this.add.text(
                this.sys.game.config.width / 2,
                startY + (index * spacing),
                `${index + 1}. ${alternativa}`,
                {
                    fontSize: '18px',
                    fill: '#000',
                    fontFamily: 'FontePadrao',
                    wordWrap: { width: this.sys.game.config.width - 220 }
                }
            ).setOrigin(0.5);

            this.textosPergunta.push(textoAlternativa);
            this.botoesAlternativas.push(botaoContainer);
        });
    }

    verificarResposta(resposta, botaoClicado) {
        // Desativar interação com todos os botões
        this.botoesAlternativas.forEach(botao => {
            botao.disableInteractive();
        });

        const pergunta = perguntas[perguntaAtual];

        if (resposta === pergunta.correta) {
            // Resposta correta
            botaoClicado.fillColor = 0x88FF88; // Verde claro

            // Mostrar feedback
            const textoFeedback = this.add.text(
                this.sys.game.config.width / 2,
                700,
                pergunta.feedback,
                {
                    fontSize: '22px',
                    fill: '#008800',
                    fontFamily: 'FontePadrao',
                    backgroundColor: '#E8F5E8',
                    padding: { x: 20, y: 10 }
                }
            ).setOrigin(0.5);

            // Animação de feedback
            this.tweens.add({
                targets: textoFeedback,
                scaleX: [0, 1],
                scaleY: [0, 1],
                duration: 300,
                ease: 'Back.out'
            });

            // Atualizar pontuação e progresso
            pontuacao += 100; // Pontuação fixa por resposta correta
            progresso += 20;

            // Esperar um momento antes de seguir
            this.time.delayedCall(1500, () => {
                perguntaAtual++;
                this.atualizarBarraProgresso();

                if (perguntaAtual < perguntas.length) {
                    // Próxima pergunta com transição
                    this.cameras.main.fadeOut(300, 0, 0, 0, () => {
                        this.cameras.main.fadeIn(300);
                        this.mostrarPergunta();
                    });
                } else {
                    // Quiz completo
                    this.scene.start('CongratulationsSceneCurriculoVpPessoas', { pontuacao: pontuacao });
                }
            });
        } else {
            // Resposta incorreta
            botaoClicado.fillColor = 0xFF8888; // Vermelho claro

            // Destacar alternativa correta
            this.botoesAlternativas[pergunta.correta].fillColor = 0x88FF88; // Verde claro

            // Esperar um momento e mostrar tela de game over
            this.time.delayedCall(1500, () => {
                this.scene.start('GameOverSceneCurriculo', { motivo: 'errou' });
            });
        }
    }
}

// Classe para a cena de Game Over
class GameOverSceneCurriculo extends Phaser.Scene {
    constructor() {
        super({ key: 'GameOverSceneCurriculo' });
    }

    init(data) {
        this.motivoGameOver = data.motivo || 'errou';
    }

    preload() {
        // Carregando recursos
        this.load.image('fundoGameOver', '../assets/gameover_curriculo.png');
    }

    create() {
        // Transição de entrada
        this.cameras.main.fadeIn(1000, 0, 0, 0);

        // Imagem de fundo sem distorção
        const fundo = this.add.image(this.cameras.main.width / 2, this.cameras.main.height / 2, 'fundoGameOver');
        this.scaleBackgroundImage(fundo);

        // Botão de texto para reiniciar
        const botaoReiniciar = this.add.rectangle(
            this.sys.game.config.width / 2,
            510,
            250,
            60,
            0xB600B9
        ).setStrokeStyle(2, 0x880088)
            .setInteractive();

        // Efeitos do botão
        botaoReiniciar.on('pointerover', () => {
            botaoReiniciar.fillColor = 0xC30DC7;
            botaoReiniciar.setScale(1.05);
        });

        botaoReiniciar.on('pointerout', () => {
            botaoReiniciar.fillColor = 0xB600B9;
            botaoReiniciar.setScale(1);
        });

        // Evento de clique
        botaoReiniciar.on('pointerdown', () => {
            // Efeito de click
            this.tweens.add({
                targets: botaoReiniciar,
                scale: 0.95,
                duration: 100,
                yoyo: true,
                onComplete: () => {
                    // Reiniciar variáveis
                    perguntaAtual = 0;
                    progresso = 0;
                    pontuacao = 0;

                    // Fade out e iniciar o quiz
                    this.cameras.main.fadeOut(500, 0, 0, 0, () => {
                        this.scene.start('QuizVpPessoas');
                    });
                }
            });
        });

        // Texto do botão
        this.add.text(
            this.sys.game.config.width / 2,
            510,
            'TENTAR NOVAMENTE',
            {
                fontSize: '22px',
                fill: '#FFF',
                fontFamily: 'FontePadrao'
            }
        ).setOrigin(0.5);
    }

    scaleBackgroundImage(image) {
        // Centraliza a imagem
        image.setOrigin(0.5);

        // Mantém a proporção e cobre a tela
        const scaleX = this.cameras.main.width / image.width;
        const scaleY = this.cameras.main.height / image.height;
        const scale = Math.max(scaleX, scaleY);
        image.setScale(scale);
    }
}

// Classe para a cena de parabéns
class CongratulationsSceneCurriculoVpPessoas extends Phaser.Scene {
    constructor() {
        super({ key: 'CongratulationsSceneCurriculoVpPessoas' });
    }

    init(data) {
        this.pontuacaoFinal = data.pontuacao || 0;
    }

    preload() {
        // Carregando recursos
        this.load.image('fundoCongratulationsVpPessoas', '../assets/parabens_cv_vpdepessoas.png');
    }

    create() {
        // Transição de entrada com efeito
        this.cameras.main.fadeIn(1000, 0, 0, 0);

        // Imagem de fundo sem distorção
        const fundo = this.add.image(this.cameras.main.width / 2, this.cameras.main.height / 2, 'fundoCongratulationsVpPessoas');
        this.scaleBackgroundImage(fundo);

        // Botão de texto para voltar
        const botaoVoltar = this.add.rectangle(
            this.sys.game.config.width / 2,
            510,
            250,
            60,
            0xB600B9
        ).setStrokeStyle(2, 0x880088)
            .setInteractive();

        // Efeitos do botão
        botaoVoltar.on('pointerover', () => {
            botaoVoltar.fillColor = 0xC30DC7;
            botaoVoltar.setScale(1.05);
        });

        botaoVoltar.on('pointerout', () => {
            botaoVoltar.fillColor = 0xB600B9;
            botaoVoltar.setScale(1);
        });

        // Evento de clique
        botaoVoltar.on('pointerdown', () => {
            // Efeito de click
            this.tweens.add({
                targets: botaoVoltar,
                scale: 0.95,
                duration: 100,
                yoyo: true,
                onComplete: () => {
                    // Reiniciar variáveis
                    perguntaAtual = 0;
                    progresso = 0;
                    pontuacao = 0;

                    // Fade out e iniciar o quiz
                    this.cameras.main.fadeOut(500, 0, 0, 0, () => {
                        this.scene.switch('officeScene');
                    });
                }
            });
        });

        // Texto do botão
        this.add.text(
            this.sys.game.config.width / 2,
            510,
            'VOLTAR AO ESCRITÓRIO',
            {
                fontSize: '22px',
                fill: '#FFF',
                fontFamily: 'FontePadrao'
            }
        ).setOrigin(0.5);
    }



    // Complete the scaleBackgroundImage method
    scaleBackgroundImage(image) {
        // Centraliza a imagem
        image.setOrigin(0.5);

        // Mantém a proporção e cobre a tela
        const scaleX = this.cameras.main.width / image.width;
        const scaleY = this.cameras.main.height / image.height;
        const scale = Math.max(scaleX, scaleY);

        image.setScale(scale);
    }

}



