// Dados do Quiz VP pessoas
const questionsPeople = [
    {
        question: "O setor de Pessoas da Vivo valoriza currículos bem organizados e fáceis de ler. Qual das seguintes práticas melhora a estrutura do seu currículo?",
        options: [
            "Usar parágrafos longos para descrever cada experiência.",
            "Utilizar marcadores para destacar conquistas e habilidades.",
            "Incluir informações detalhadas sobre sua vida pessoal.",
            "Adicionar todas as experiências desde o primeiro emprego, sem priorizar as mais recentes."
        ],
        question: 1
    },
    {
        question: "Qual a importância de destacar soft skills no currículo?",
        options: [
            "São irrelevantes, apenas habilidades técnicas importam.",
            "Demonstram como o candidato se adapta e interage no ambiente de trabalho.",
            "Devem ser listadas de forma genérica, sem exemplos práticos.",
            "Devem substituir as experiências profissionais."
        ],
        question: 1
    },
    {
        question: "Como adaptar o currículo para ser aprovado por um sistema ATS (Applicant Tracking System)?",
        options: [
            "Usando palavras-chave da descrição da vaga.",
            "Criando um design altamente visual e colorido.",
            "Usando apenas tópicos genéricos sobre experiências.",
            "Evitando títulos claros para as seções."
        ],
        question: 0
    },
    {
        question: "O que é essencial para um currículo ser bem avaliado por um recrutador?",
        options: [
            "Um layout sofisticado e cheio de imagens.",
            "Listar apenas experiências, sem detalhar conquistas.",
            "Destacar resultados e competências alinhadas à vaga.",
            "Usar um texto longo e detalhado para cada experiência."
        ],
        question: 2
    },
    {
        question: "Qual erro pode prejudicar um candidato ao enviar um currículo?",
        options: [
            "Usar um e-mail profissional no contato.",
            "Adaptar o currículo para cada vaga.",
            "Excluir informações de contato.",
            "Deixar informações desatualizadas ou incorretas."
        ],
        question: 2
    }
];

// Dados do Quiz VP Estratégia
const questionsEstrategy = [
    {
        question: "A inteligência artificial é usada por sistemas de recrutamento (ATS) para filtrar currículos. Qual das seguintes abordagens ajuda seu currículo a ser bem classificado nesses sistemas?",
        options: [
            "Inserir palavras-chave relevantes da vaga na seção de habilidades e experiência.",
            "Utilizar fontes decorativas e imagens para destacar sua personalidade.",
            "Escrever um currículo genérico sem adaptação para cada vaga.",
            "Enviar o currículo no corpo do e-mail ao invés de um arquivo estruturado."
        ],
        question: 0,
    },
    {
        question: "O que pode tornar um candidato mais atrativo para uma vaga estratégica?",
        options: [
            "Demonstrar capacidade analítica e experiência em inovação. ",
            "Usar um currículo sem foco e cheio de informações irrelevantes.",
            "Esconder experiências passadas para parecer mais flexível.",
            "Ignorar a personalização do currículo para cada oportunidade."
        ],
        question: 0
    },
    {
        question: "Como destacar projetos de inovação no currículo?",
        options: [
            "Explicando a abordagem e os resultados obtidos.",
            "Apenas listando o nome dos projetos sem detalhes.",
            "Omitindo informações sobre desafios e aprendizados.",
            "Exagerando nos resultados para parecer mais impactante."
        ],
        question: 0
    },
    {
        question: "Qual habilidade é essencial para atuar em novos negócios e IA?",
        options: [
            "Capacidade de adaptação e pensamento estratégico.",
            "Apenas habilidades operacionais sem visão de longo prazo.",
            "Criatividade sem aplicação prática.",
            "Exclusivamente experiência acadêmica sem prática no mercado."
        ],
        question: 0
    },
    {
        question: "Como um candidato pode demonstrar conhecimento em inteligência artificial no currículo?",
        options: [
            "Mencionando cursos, projetos e experiência na área.",
            "Apenas citando que tem interesse no assunto.",
            "Ignorando certificações para não parecer muito técnico.",
            "Evitando mencionar IA caso não tenha experiência direta."
        ],
        question: 0
    }
];

// Dados do Quiz VP Negócios
const questionsBusiness = [
    {
        question: "Você deseja atuar na VP de Negócios da Vivo e percebe que a vaga enfatiza habilidades analíticas e gestão de projetos. Como você pode personalizar seu currículo para aumentar suas chances?",
        options: [
            "Destacar experiências passadas que demonstram suas habilidades analíticas e projetos liderados.",
            "Manter um currículo genérico para que sirva para qualquer vaga.",
            "Adicionar certificações e cursos, mesmo que não tenham relação com a vaga.",
            "Escrever experiências apenas com as funções desempenhadas, sem resultados obtidos."
        ],
        question: 0,
    },
    {
        question: "O que é essencial para um currículo focado em vendas e negócios?",
        options: [
            "Destacar metas atingidas e impacto nos resultados. ",
            "Apenas listar as empresas onde trabalhou sem detalhes.",
            "Usar um layout criativo sem estrutura clara.",
            "Omitir informações sobre clientes e mercado."
        ],
        question: 0
    },
    {
        question: "Como descrever a experiência em negociação e vendas no currículo?",
        options: [
            "Demonstrando crescimento de receita e estratégias aplicadas.",
            "Apenas mencionando que trabalhou com vendas.",
            "Excluindo informações sobre indicadores de performance.",
            "Utilizando frases genéricas sem exemplos concretos."
        ],
        question: 0
    },
    {
        question: "Qual erro pode prejudicar um candidato na área comercial ao montar seu currículo?",
        options: [
            "Excluir números e métricas de performance.",
            "Destacar networking e relacionamento com clientes.",
            "Demonstrar experiência com estratégias de mercado.",
            "Incluir cases de sucesso relevantes."
        ],
        question: 0
    },
    {
        question: "Qual é um diferencial para um currículo na área de negócios?",
        options: [
            "Experiência em estratégias de crescimento e desenvolvimento de mercado.",
            "Listar apenas habilidades técnicas.",
            "Ignorar a importância de soft skills.",
            "Criar um currículo genérico sem adaptações para a vaga."
        ],
        question: 0
    }
];

// Dados do Quiz VP Relações Institucionais
const questionsRelationships = [
    {
        question: "Um currículo eficaz precisa de uma comunicação clara e objetiva. Qual das opções abaixo é a melhor forma de descrever uma experiência profissional?",
        options: [
            '"Trabalhei na empresa X e fiz muitas atividades na área de marketing."',
            '"Responsável por marketing na empresa X, onde aumentei o engajamento digital em 40% por meio de campanhas estratégicas."',
            '"Atuei no setor de marketing, onde fazia postagens nas redes sociais."',
            '"Tenho experiência com marketing e sou uma pessoa criativa e proativa."'
        ],
        question: 1,
    },
    {
        question: "Qual fator é mais relevante em um currículo para uma vaga em sustentabilidade?",
        options: [
            "Experiência com projetos ESG e impacto social.",
            "Uso de palavras-chave sem relevância para a área.",
            "Apenas a formação acadêmica sem experiências práticas.",
            "Omitir participação em iniciativas ambientais."
        ],
        question: 0
    },
    {
        question: "Como destacar experiência com relações institucionais no currículo?",
        options: [
            "Mencionando atuação com stakeholders e projetos de impacto.",
            "Apenas listando cargos sem descrição das atividades.",
            "Evitando detalhar parcerias estratégicas.",
            "Omitindo participação em políticas públicas e regulamentações."
        ],
        question: 0
    },
    {
        question: "Qual das seguintes ações melhora um currículo para a área de sustentabilidade?",
        options: [
            "Incluir certificações e especializações relevantes.",
            "Usar um layout poluído e desorganizado.",
            "Ignorar experiências de voluntariado e impacto social.",
            "Excluir informações sobre engajamento com ONGs."
        ],
        question: 0
    },
    {
        question: "O que um recrutador dessa área (VP de Relações Institucionais e Sustentabilidade) espera ver no currículo?",
        options: [
            "Experiência com responsabilidade social e desenvolvimento sustentável.",
            "Apenas conhecimentos básicos sobre meio ambiente.",
            "Um currículo genérico, sem foco na área.",
            "Um documento com muitas páginas e informações irrelevantes."
        ],
        question: 0
    }
];

// Dados do Quiz VP Tecnologia
const questionsTech = [
    {
        question: "O design do seu currículo pode influenciar na forma como ele é lido pelos sistemas automatizados (ATS). Qual das opções abaixo representa a melhor prática?",
        options: [
            'Usar tabelas e colunas para organizar informações de forma estilizada.',
            'Criar um currículo em formato de imagem ou PDF com elementos gráficos.',
            'Manter um layout limpo, com formatação simples e sem uso excessivo de cores ou gráficos.',
            'Utilizar fontes incomuns para destacar seu diferencial.'
        ],
        question: 2,
    },
    {
        question: "Qual é um elemento essencial para um currículo na área de TI?",
        options: [
            "Projetos desenvolvidos e conhecimento em tecnologias específicas.",
            "Apenas a lista de empresas onde trabalhou.",
            "Um design extremamente visual e sem estrutura clara.",
            "Ignorar certificações para focar apenas em experiência prática."
        ],
        question: 0
    },
    {
        question: "Como um profissional de TI pode demonstrar experiência prática no currículo?",
        options: [
            "Destacando projetos, certificações e metodologias utilizadas.",
            "Apenas mencionando que tem habilidades técnicas.",
            "Omitindo informações sobre ferramentas e tecnologias.",
            "Evitando links para portfólios ou GitHub."
        ],
        question: 0
    },
    {
        question: "Qual a melhor maneira de destacar conhecimento em cibersegurança no currículo?",
        options: [
            "Citando certificações como CISSP e projetos na área.",
            "Apenas mencionando interesse no tema.",
            "Excluindo informações sobre vulnerabilidades tratadas.",
            "Usando frases vagas sem comprovação de conhecimento."
        ],
        question: 0
    },
    {
        question: "Qual erro deve ser evitado ao criar um currículo para a área de TI?",
        options: [
            "Listar todas as tecnologias já utilizadas sem organização.",
            "Incluir certificações e cursos relevantes.",
            "Organizar a experiência de forma cronológica e clara.",
            "Excluir informações sobre impacto dos projetos."
        ],
        question: 0
    }
];

// Variáveis globais
let presentQuestion = 0;
let progress = 0;
let points = 0;
const timePerQuestion = 30; // Segundos para responder
let timeLeft = timePerQuestion;
let timer;

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
        this.load.image('botao02', '../assets/botao_vp_estrategia.png');
        this.load.image('botao03', '../assets/botao_vp_negocios.png');
        this.load.image('botao04', '../assets/botao_vp_relacoes.png');
        this.load.image('botao05', '../assets/botao_vp_tecnologia.png');

        // Carrega a fonte
        this.load.font('FontePadrao', 'fonts/PixelifySans-VariableFont_wght.ttf');
    }

    create() {
        var width = 1520;
        var height = 753;

        // Imagem de backgroundGame sem distorção
        const backgroundGame = this.add.image(this.cameras.main.width / 2, this.cameras.main.height / 2, 'primeiraTela');

        // Ajusta a escala para cobrir a tela mantendo a proporção
        this.scaleBackgroundImage(backgroundGame);

        // Botão interativo com animação (fase Pessoas)
        const buttonVpPeople = this.add.image(
            width - 1020, height - 370,
            'botao01'
        ).setInteractive();

        buttonVpPeople.on('pointerout', () => {
            buttonVpPeople.setScale(1);
        });

        // Efeito de piscar ao clicar
        buttonVpPeople.on('pointerdown', () => {
            this.tweens.add({
                targets: buttonVpPeople,
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

        // Botão interativo com animação (fase Estratégia)
        const buttonVpEstrategy = this.add.image(
            width - 780, height - 370,
            'botao02'
        ).setInteractive();

        buttonVpEstrategy.on('pointerout', () => {
            buttonVpEstrategy.setScale(1);
        });

        // Efeito de piscar ao clicar
        buttonVpEstrategy.on('pointerdown', () => {
            this.tweens.add({
                targets: buttonVpEstrategy,
                alpha: 0.6,
                duration: 100,
                yoyo: true,
                onComplete: () => {
                    // Fade out na câmera
                    this.cameras.main.fadeOut(500, 0, 0, 0, () => {
                        this.scene.start('QuizVpEstrategia');
                    });
                }
            });
        });

        // Botão interativo com animação (fase Negócios)
        const buttonVpBusiness = this.add.image(
            width - 500, height - 370,
            'botao03'
        ).setInteractive();

        buttonVpBusiness.on('pointerout', () => {
            buttonVpBusiness.setScale(1);
        });

        // Efeito de piscar ao clicar
        buttonVpBusiness.on('pointerdown', () => {
            this.tweens.add({
                targets: buttonVpBusiness,
                alpha: 0.6,
                duration: 100,
                yoyo: true,
                onComplete: () => {
                    // Fade out na câmera
                    this.cameras.main.fadeOut(500, 0, 0, 0, () => {
                        this.scene.start('QuizVpNegocios');
                    });
                }
            });
        });

        // Botão interativo com animação (fase Relações)
        const buttonVpRelationships = this.add.image(
            width - 1020, height - 270,
            'botao04'
        ).setInteractive();

        buttonVpRelationships.on('pointerout', () => {
            buttonVpRelationships.setScale(1);
        });

        // Efeito de piscar ao clicar
        buttonVpRelationships.on('pointerdown', () => {
            this.tweens.add({
                targets: buttonVpRelationships,
                alpha: 0.6,
                duration: 100,
                yoyo: true,
                onComplete: () => {
                    // Fade out na câmera
                    this.cameras.main.fadeOut(500, 0, 0, 0, () => {
                        this.scene.start('QuizVpRelacoes');
                    });
                }
            });
        });

        // Botão interativo com animação (fase Tecnologia)
        const buttonVpTech = this.add.image(
            width - 755, height - 270,
            'botao05'
        ).setInteractive();

        buttonVpTech.on('pointerout', () => {
            buttonVpTech.setScale(1);
        });

        // Efeito de piscar ao clicar
        buttonVpTech.on('pointerdown', () => {
            this.tweens.add({
                targets: buttonVpTech,
                alpha: 0.6,
                duration: 100,
                yoyo: true,
                onComplete: () => {
                    // Fade out na câmera
                    this.cameras.main.fadeOut(500, 0, 0, 0, () => {
                        this.scene.start('QuizVpTecnologia');
                    });
                }
            });
        });

    }

    // Método para ajustar a escala da imagem de backgroundGame
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
        this.questionTexts = []; // Armazena os textos da question e options
        this.optionsButtons = []; // Armazena os botões das options
    }

    preload() {
        // Carrega os recursos para o quiz
        this.load.font('FontePadrao', 'fonts/PixelifySans-VariableFont_wght.ttf');
        this.load.image('TelaQuiz', '../assets/TelaQuiz.png');
    }

    create() {
        // Transição suave
        this.cameras.main.fadeIn(1000);

        // Adicionar a imagem de backgroundGame sem distorção
        const backgroundGame = this.add.image(this.cameras.main.width / 2, this.cameras.main.height / 2, 'TelaQuiz');
        this.scaleBackgroundImage(backgroundGame);

        // Criar elementos de interface
        this.createProgressBar();
        this.createQuestionsCounter();
        this.showQuestion();
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

    createQuestionsCounter() {
        // Mostrar número da question atual/total
        this.textQuestionNumber = this.add.text(
            this.sys.game.config.width - 150,
            50,
            `Pergunta ${presentQuestion + 1}/${questionsPeople.length}`,
            { fontSize: '20px', fill: '#000', fontFamily: 'FontePadrao' }
        ).setOrigin(0.5);
    }

    createProgressBar() {
        // Container para a barra de progress
        const progressBarContainer = this.add.rectangle(100, 50, 300, 24, 0xDDDDDD)
            .setOrigin(0, 0.5)
            .setStrokeStyle(2, 0x000000);

        // Barra de progress roxa    
        this.progressBar = this.add.rectangle(102, 50, 0, 20, 0xB600B9)
            .setOrigin(0, 0.5);

        // Texto de progress    
        this.progressText = this.add.text(
            420,
            50,
            `${progress}%`,
            { fontSize: '20px', fill: '#000', fontFamily: 'FontePadrao', fontWeight: 'bold' }
        ).setOrigin(0, 0.5);
    }

    updateProgressBar() {
        // Atualizando a barra de progress do quiz
        const maxHeight = 296;
        const newWidth = (progress / 100) * maxHeight;

        // Animar a barra de progress
        this.tweens.add({
            targets: this.progressBar,
            width: newWidth,
            duration: 500,
            ease: 'Power2'
        });

        this.progressText.setText(`${progress}%`);
    }

    cleanElements() {
        // Remove os textos da question e options
        this.questionTexts.forEach(texto => texto.destroy());
        this.questionTexts = [];

        // Remove os botões das options
        this.optionsButtons.forEach(btn => btn.destroy());
        this.optionsButtons = [];
    }

    showQuestion() {
        // Limpa os elementos antigos
        this.cleanElements();

        // Atualiza o contador de perguntas
        this.textQuestionNumber.setText(`Pergunta ${presentQuestion + 1}/${questionsPeople.length}`);

        const question = questionsPeople[presentQuestion];

        // Exibindo a question
        const questionText = this.add.text(
            this.sys.game.config.width / 2,
            100,
            question.question,
            {
                fontSize: '22px',
                fill: '#B600B9',
                fontFamily: 'FontePadrao',
                fontWeight: 'bold',
                wordWrap: { width: this.sys.game.config.width - 150 },
                align: 'center'
            }
        ).setOrigin(0.5);

        this.questionTexts.push(questionText);

        // Exibindo options
        const startY = 200;
        const spacing = 50;

        question.options.forEach((alternative, index) => {
            // Container da alternative (retângulo)
            const containerButton = this.add.rectangle(
                this.sys.game.config.width / 2,
                startY + (index * spacing),
                this.sys.game.config.width - 200,
                50,
                0xEAE8E8
            ).setStrokeStyle(2, 0x444444)
                .setInteractive();

            // Efeitos de hover
            containerButton.on('pointerover', () => {
                containerButton.fillColor = 0xDDDDDD;
                containerButton.setScale(1.02);
            });

            containerButton.on('pointerout', () => {
                containerButton.fillColor = 0xEAE8E8;
                containerButton.setScale(1);
            });

            // Evento de clique
            containerButton.on('pointerdown', () => {
                this.checkAnswer(index, containerButton);
            });

            // Texto da alternative
            const alternativeText = this.add.text(
                this.sys.game.config.width / 2,
                startY + (index * spacing),
                `${index + 1}. ${alternative}`,
                {
                    fontSize: '18px',
                    fill: '#000',
                    fontFamily: 'FontePadrao',
                    wordWrap: { width: this.sys.game.config.width - 220 }
                }
            ).setOrigin(0.5);

            this.questionTexts.push(alternativeText);
            this.optionsButtons.push(containerButton);
        });
    }

    checkAnswer(answerr, clickedButton) {
        // Desativar interação com todos os botões
        this.optionsButtons.forEach(btn => {
            btn.disableInteractive();
        });

        const question = questionsPeople[presentQuestion];

        if (answerr === question.question) {
            // Resposta question
            clickedButton.fillColor = 0x88FF88; // Verde claro

            // Atualizar pontuação e progress
            points += 100; // Pontuação fixa por answerr question
            progress += 20;

            // Esperar um momento antes de seguir
            this.time.delayedCall(1500, () => {
                presentQuestion++;
                this.updateProgressBar();

                if (presentQuestion < questionsPeople.length) {
                    // Próxima question com transição
                    this.cameras.main.fadeOut(300, 0, 0, 0, () => {
                        this.cameras.main.fadeIn(300);
                        this.showQuestion();
                    });
                } else {
                    // Quiz completo
                    this.scene.start('CongratulationsSceneCurriculoVpPessoas', { points: points });
                }
            });
        } else {
            // Resposta incorreta
            clickedButton.fillColor = 0xFF8888; // Vermelho claro

            // Destacar alternative question
            this.optionsButtons[question.question].fillColor = 0x88FF88; // Verde claro

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

        // Imagem de backgroundGame sem distorção
        const backgroundGame = this.add.image(this.cameras.main.width / 2, this.cameras.main.height / 2, 'fundoGameOver');
        this.scaleBackgroundImage(backgroundGame);

        // Botão de texto para reiniciar
        const restartButton = this.add.rectangle(
            this.sys.game.config.width / 2,
            510,
            250,
            60,
            0xB600B9
        ).setStrokeStyle(2, 0x880088)
            .setInteractive();

        // Efeitos do botão
        restartButton.on('pointerover', () => {
            restartButton.fillColor = 0xC30DC7;
            restartButton.setScale(1.05);
        });

        restartButton.on('pointerout', () => {
            restartButton.fillColor = 0xB600B9;
            restartButton.setScale(1);
        });

        // Evento de clique
        restartButton.on('pointerdown', () => {
            // Efeito de click
            this.tweens.add({
                targets: restartButton,
                scale: 0.95,
                duration: 100,
                yoyo: true,
                onComplete: () => {
                    // Reiniciar variáveis
                    presentQuestion = 0;
                    progress = 0;
                    points = 0;

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
        this.finalPoints = data.points || 0;
    }

    preload() {
        // Carregando recursos
        this.load.image('fundoCongratulationsVpPessoas', '../assets/parabens_cv_vpdepessoas.png');
    }

    create() {
        // Transição de entrada com efeito
        this.cameras.main.fadeIn(1000, 0, 0, 0);

        // Imagem de backgroundGame sem distorção
        const backgroundGame = this.add.image(this.cameras.main.width / 2, this.cameras.main.height / 2, 'fundoCongratulationsVpPessoas');
        this.scaleBackgroundImage(backgroundGame);

        // Botão de texto para voltar
        const backButton = this.add.rectangle(
            this.sys.game.config.width / 2,
            510,
            250,
            60,
            0xB600B9
        ).setStrokeStyle(2, 0x880088)
            .setInteractive();

        // Efeitos do botão
        backButton.on('pointerover', () => {
            backButton.fillColor = 0xC30DC7;
            backButton.setScale(1.05);
        });

        backButton.on('pointerout', () => {
            backButton.fillColor = 0xB600B9;
            backButton.setScale(1);
        });

        // Evento de clique
        backButton.on('pointerdown', () => {
            // Efeito de click
            this.tweens.add({
                targets: backButton,
                scale: 0.95,
                duration: 100,
                yoyo: true,
                onComplete: () => {
                    // Reiniciar variáveis
                    presentQuestion = 0;
                    progress = 0;
                    points = 0;

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

// Classe para a cena do Quiz de Estratégia
class QuizVpEstrategia extends Phaser.Scene {
    constructor() {
        super({ key: 'QuizVpEstrategia' });
        this.questionTexts = []; // Armazena os textos da question e options
        this.optionsButtons = []; // Armazena os botões das options
    }

    preload() {
        // Carrega os recursos para o quiz
        this.load.font('FontePadrao', 'fonts/PixelifySans-VariableFont_wght.ttf');
        this.load.image('TelaQuiz', '../assets/TelaQuiz.png');
    }

    create() {
        // Transição suave
        this.cameras.main.fadeIn(1000);

        // Adicionar a imagem de backgroundGame sem distorção
        const backgroundGame = this.add.image(this.cameras.main.width / 2, this.cameras.main.height / 2, 'TelaQuiz');
        this.scaleBackgroundImage(backgroundGame);

        // Criar elementos de interface
        this.createProgressBar();
        this.createQuestionsCounter();
        this.showQuestion();
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

    createQuestionsCounter() {
        // Mostrar número da question atual/total
        this.textQuestionNumber = this.add.text(
            this.sys.game.config.width - 150,
            50,
            `Pergunta ${presentQuestion + 1}/${questionsEstrategy.length}`,
            { fontSize: '20px', fill: '#000', fontFamily: 'FontePadrao' }
        ).setOrigin(0.5);
    }

    createProgressBar() {
        // Container para a barra de progress
        const progressBarContainer = this.add.rectangle(100, 50, 300, 24, 0xDDDDDD)
            .setOrigin(0, 0.5)
            .setStrokeStyle(2, 0x000000);

        // Barra de progress roxa    
        this.progressBar = this.add.rectangle(102, 50, 0, 20, 0xB600B9)
            .setOrigin(0, 0.5);

        // Texto de progress    
        this.progressText = this.add.text(
            420,
            50,
            `${progress}%`,
            { fontSize: '20px', fill: '#000', fontFamily: 'FontePadrao', fontWeight: 'bold' }
        ).setOrigin(0, 0.5);
    }

    updateProgressBar() {
        // Atualizando a barra de progress do quiz
        const maxHeight = 296;
        const newWidth = (progress / 100) * maxHeight;

        // Animar a barra de progress
        this.tweens.add({
            targets: this.progressBar,
            width: newWidth,
            duration: 500,
            ease: 'Power2'
        });

        this.progressText.setText(`${progress}%`);
    }

    cleanElements() {
        // Remove os textos da question e options
        this.questionTexts.forEach(texto => texto.destroy());
        this.questionTexts = [];

        // Remove os botões das options
        this.optionsButtons.forEach(btn => btn.destroy());
        this.optionsButtons = [];
    }

    showQuestion() {
        // Limpa os elementos antigos
        this.cleanElements();

        // Atualiza o contador de perguntas
        this.textQuestionNumber.setText(`Pergunta ${presentQuestion + 1}/${questionsEstrategy.length}`);

        const question = questionsEstrategy[presentQuestion];

        // Exibindo a question
        const questionText = this.add.text(
            this.sys.game.config.width / 2,
            100,
            question.question,
            {
                fontSize: '22px',
                fill: '#B600B9',
                fontFamily: 'FontePadrao',
                fontWeight: 'bold',
                wordWrap: { width: this.sys.game.config.width - 150 },
                align: 'center'
            }
        ).setOrigin(0.5);

        this.questionTexts.push(questionText);

        // Exibindo options
        const startY = 200;
        const spacing = 50;

        question.options.forEach((alternative, index) => {
            // Container da alternative (retângulo)
            const containerButton = this.add.rectangle(
                this.sys.game.config.width / 2,
                startY + (index * spacing),
                this.sys.game.config.width - 200,
                50,
                0xEAE8E8
            ).setStrokeStyle(2, 0x444444)
                .setInteractive();

            // Efeitos de hover
            containerButton.on('pointerover', () => {
                containerButton.fillColor = 0xDDDDDD;
                containerButton.setScale(1.02);
            });

            containerButton.on('pointerout', () => {
                containerButton.fillColor = 0xEAE8E8;
                containerButton.setScale(1);
            });

            // Evento de clique
            containerButton.on('pointerdown', () => {
                this.checkAnswer(index, containerButton);
            });

            // Texto da alternative
            const alternativeText = this.add.text(
                this.sys.game.config.width / 2,
                startY + (index * spacing),
                `${index + 1}. ${alternative}`,
                {
                    fontSize: '18px',
                    fill: '#000',
                    fontFamily: 'FontePadrao',
                    wordWrap: { width: this.sys.game.config.width - 220 }
                }
            ).setOrigin(0.5);

            this.questionTexts.push(alternativeText);
            this.optionsButtons.push(containerButton);
        });
    }

    checkAnswer(answerr, clickedButton) {
        // Desativar interação com todos os botões
        this.optionsButtons.forEach(btn => {
            btn.disableInteractive();
        });

        const question = questionsEstrategy[presentQuestion];

        if (answerr === question.question) {
            // Resposta question
            clickedButton.fillColor = 0x88FF88; // Verde claro

            // Atualizar pontuação e progress
            points += 100; // Pontuação fixa por answerr question
            progress += 20;

            // Esperar um momento antes de seguir
            this.time.delayedCall(1500, () => {
                presentQuestion++;
                this.updateProgressBar();

                if (presentQuestion < questionsEstrategy.length) {
                    // Próxima question com transição
                    this.cameras.main.fadeOut(300, 0, 0, 0, () => {
                        this.cameras.main.fadeIn(300);
                        this.showQuestion();
                    });
                } else {
                    // Quiz completo
                    this.scene.start('CongratulationsSceneCurriculoVpEstrategia', { points: points });
                }
            });
        } else {
            // Resposta incorreta
            clickedButton.fillColor = 0xFF8888; // Vermelho claro

            // Destacar alternative question
            this.optionsButtons[question.question].fillColor = 0x88FF88; // Verde claro

            // Esperar um momento e mostrar tela de game over
            this.time.delayedCall(1500, () => {
                this.scene.start('GameOverSceneCurriculoEstrategia', { motivo: 'errou' });
            });
        }
    }
}

// Classe para a cena de Game Over de Estratégia
class GameOverSceneCurriculoEstrategia extends Phaser.Scene {
    constructor() {
        super({ key: 'GameOverSceneCurriculoEstrategia' });
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

        // Imagem de backgroundGame sem distorção
        const backgroundGame = this.add.image(this.cameras.main.width / 2, this.cameras.main.height / 2, 'fundoGameOver');
        this.scaleBackgroundImage(backgroundGame);

        // Botão de texto para reiniciar
        const restartButton = this.add.rectangle(
            this.sys.game.config.width / 2,
            510,
            250,
            60,
            0xB600B9
        ).setStrokeStyle(2, 0x880088)
            .setInteractive();

        // Efeitos do botão
        restartButton.on('pointerover', () => {
            restartButton.fillColor = 0xC30DC7;
            restartButton.setScale(1.05);
        });

        restartButton.on('pointerout', () => {
            restartButton.fillColor = 0xB600B9;
            restartButton.setScale(1);
        });

        // Evento de clique
        restartButton.on('pointerdown', () => {
            // Efeito de click
            this.tweens.add({
                targets: restartButton,
                scale: 0.95,
                duration: 100,
                yoyo: true,
                onComplete: () => {
                    // Reiniciar variáveis
                    presentQuestion = 0;
                    progress = 0;
                    points = 0;

                    // Fade out e iniciar o quiz
                    this.cameras.main.fadeOut(500, 0, 0, 0, () => {
                        this.scene.start('QuizVpEstrategia');
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

// Classe para a cena de parabéns de Estratégia
class CongratulationsSceneCurriculoVpEstrategia extends Phaser.Scene {
    constructor() {
        super({ key: 'CongratulationsSceneCurriculoVpEstrategia' });
    }

    init(data) {
        this.finalPoints = data.points || 0;
    }

    preload() {
        // Carregando recursos
        this.load.image('fundoCongratulationsVpEstrategia', '../assets/parabens_cv_vpdeestrategia.png');
    }

    create() {
        // Transição de entrada com efeito
        this.cameras.main.fadeIn(1000, 0, 0, 0);

        // Imagem de backgroundGame sem distorção
        const backgroundGame = this.add.image(this.cameras.main.width / 2, this.cameras.main.height / 2, 'fundoCongratulationsVpEstrategia');
        this.scaleBackgroundImage(backgroundGame);

        // Botão de texto para voltar
        const backButton = this.add.rectangle(
            width / 2,
            height - 210,
            250,
            60,
            0xB600B9
        ).setStrokeStyle(2, 0x880088)
            .setInteractive();

        // Efeitos do botão
        backButton.on('pointerover', () => {
            backButton.fillColor = 0xC30DC7;
            backButton.setScale(1.05);
        });

        backButton.on('pointerout', () => {
            backButton.fillColor = 0xB600B9;
            backButton.setScale(1);
        });

        // Evento de clique
        backButton.on('pointerdown', () => {
            // Efeito de click
            this.tweens.add({
                targets: backButton,
                scale: 0.95,
                duration: 100,
                yoyo: true,
                onComplete: () => {
                    // Reiniciar variáveis
                    presentQuestion = 0;
                    progress = 0;
                    points = 0;

                    // Fade out e iniciar o quiz
                    this.cameras.main.fadeOut(500, 0, 0, 0, () => {
                        this.scene.switch('officeScene');
                    });
                }
            });
        });

        // Texto do botão
        this.add.text(
            width / 2,
            height - 210,
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

// Classe para a cena do Quiz de Negócios
class QuizVpNegocios extends Phaser.Scene {
    constructor() {
        super({ key: 'QuizVpNegocios' });
        this.questionTexts = []; // Armazena os textos da question e options
        this.optionsButtons = []; // Armazena os botões das options
    }

    preload() {
        // Carrega os recursos para o quiz
        this.load.font('FontePadrao', 'fonts/PixelifySans-VariableFont_wght.ttf');
        this.load.image('TelaQuiz', '../assets/TelaQuiz.png');
    }

    create() {
        // Transição suave
        this.cameras.main.fadeIn(1000);

        // Adicionar a imagem de backgroundGame sem distorção
        const backgroundGame = this.add.image(this.cameras.main.width / 2, this.cameras.main.height / 2, 'TelaQuiz');
        this.scaleBackgroundImage(backgroundGame);

        // Criar elementos de interface
        this.createProgressBar();
        this.createQuestionsCounter();
        this.showQuestion();
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

    createQuestionsCounter() {
        // Mostrar número da question atual/total
        this.textQuestionNumber = this.add.text(
            this.sys.game.config.width - 150,
            50,
            `Pergunta ${presentQuestion + 1}/${questionsBusiness.length}`,
            { fontSize: '20px', fill: '#000', fontFamily: 'FontePadrao' }
        ).setOrigin(0.5);
    }

    createProgressBar() {
        // Container para a barra de progress
        const progressBarContainer = this.add.rectangle(100, 50, 300, 24, 0xDDDDDD)
            .setOrigin(0, 0.5)
            .setStrokeStyle(2, 0x000000);

        // Barra de progress roxa    
        this.progressBar = this.add.rectangle(102, 50, 0, 20, 0xB600B9)
            .setOrigin(0, 0.5);

        // Texto de progress    
        this.progressText = this.add.text(
            420,
            50,
            `${progress}%`,
            { fontSize: '20px', fill: '#000', fontFamily: 'FontePadrao', fontWeight: 'bold' }
        ).setOrigin(0, 0.5);
    }

    updateProgressBar() {
        // Atualizando a barra de progress do quiz
        const maxHeight = 296;
        const newWidth = (progress / 100) * maxHeight;

        // Animar a barra de progress
        this.tweens.add({
            targets: this.progressBar,
            width: newWidth,
            duration: 500,
            ease: 'Power2'
        });

        this.progressText.setText(`${progress}%`);
    }

    cleanElements() {
        // Remove os textos da question e options
        this.questionTexts.forEach(texto => texto.destroy());
        this.questionTexts = [];

        // Remove os botões das options
        this.optionsButtons.forEach(btn => btn.destroy());
        this.optionsButtons = [];
    }

    showQuestion() {
        // Limpa os elementos antigos
        this.cleanElements();

        // Atualiza o contador de perguntas
        this.textQuestionNumber.setText(`Pergunta ${presentQuestion + 1}/${questionsBusiness.length}`);

        const question = questionsBusiness[presentQuestion];

        // Exibindo a question
        const questionText = this.add.text(
            this.sys.game.config.width / 2,
            100,
            question.question,
            {
                fontSize: '22px',
                fill: '#B600B9',
                fontFamily: 'FontePadrao',
                fontWeight: 'bold',
                wordWrap: { width: this.sys.game.config.width - 150 },
                align: 'center'
            }
        ).setOrigin(0.5);

        this.questionTexts.push(questionText);

        // Exibindo options
        const startY = 200;
        const spacing = 50;

        question.options.forEach((alternative, index) => {
            // Container da alternative (retângulo)
            const containerButton = this.add.rectangle(
                this.sys.game.config.width / 2,
                startY + (index * spacing),
                this.sys.game.config.width - 200,
                50,
                0xEAE8E8
            ).setStrokeStyle(2, 0x444444)
                .setInteractive();

            // Efeitos de hover
            containerButton.on('pointerover', () => {
                containerButton.fillColor = 0xDDDDDD;
                containerButton.setScale(1.02);
            });

            containerButton.on('pointerout', () => {
                containerButton.fillColor = 0xEAE8E8;
                containerButton.setScale(1);
            });

            // Evento de clique
            containerButton.on('pointerdown', () => {
                this.checkAnswer(index, containerButton);
            });

            // Texto da alternative
            const alternativeText = this.add.text(
                this.sys.game.config.width / 2,
                startY + (index * spacing),
                `${index + 1}. ${alternative}`,
                {
                    fontSize: '18px',
                    fill: '#000',
                    fontFamily: 'FontePadrao',
                    wordWrap: { width: this.sys.game.config.width - 220 }
                }
            ).setOrigin(0.5);

            this.questionTexts.push(alternativeText);
            this.optionsButtons.push(containerButton);
        });
    }

    checkAnswer(answerr, clickedButton) {
        // Desativar interação com todos os botões
        this.optionsButtons.forEach(btn => {
            btn.disableInteractive();
        });

        const question = questionsBusiness[presentQuestion];

        if (answerr === question.question) {
            // Resposta question
            clickedButton.fillColor = 0x88FF88; // Verde claro

            // Atualizar pontuação e progress
            points += 100; // Pontuação fixa por answerr question
            progress += 20;

            // Esperar um momento antes de seguir
            this.time.delayedCall(1500, () => {
                presentQuestion++;
                this.updateProgressBar();

                if (presentQuestion < questionsBusiness.length) {
                    // Próxima question com transição
                    this.cameras.main.fadeOut(300, 0, 0, 0, () => {
                        this.cameras.main.fadeIn(300);
                        this.showQuestion();
                    });
                } else {
                    // Quiz completo
                    this.scene.start('CongratulationsSceneCurriculoVpNegocios', { points: points });
                }
            });
        } else {
            // Resposta incorreta
            clickedButton.fillColor = 0xFF8888; // Vermelho claro

            // Destacar alternative question
            this.optionsButtons[question.question].fillColor = 0x88FF88; // Verde claro

            // Esperar um momento e mostrar tela de game over
            this.time.delayedCall(1500, () => {
                this.scene.start('GameOverSceneCurriculoNegocios', { motivo: 'errou' });
            });
        }
    }
}

// Classe para a cena de Game Over de Negócios
class GameOverSceneCurriculoNegocios extends Phaser.Scene {
    constructor() {
        super({ key: 'GameOverSceneCurriculoNegocios' });
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

        // Imagem de backgroundGame sem distorção
        const backgroundGame = this.add.image(this.cameras.main.width / 2, this.cameras.main.height / 2, 'fundoGameOver');
        this.scaleBackgroundImage(backgroundGame);

        // Botão de texto para reiniciar
        const restartButton = this.add.rectangle(
            this.sys.game.config.width / 2,
            510,
            250,
            60,
            0xB600B9
        ).setStrokeStyle(2, 0x880088)
            .setInteractive();

        // Efeitos do botão
        restartButton.on('pointerover', () => {
            restartButton.fillColor = 0xC30DC7;
            restartButton.setScale(1.05);
        });

        restartButton.on('pointerout', () => {
            restartButton.fillColor = 0xB600B9;
            restartButton.setScale(1);
        });

        // Evento de clique
        restartButton.on('pointerdown', () => {
            // Efeito de click
            this.tweens.add({
                targets: restartButton,
                scale: 0.95,
                duration: 100,
                yoyo: true,
                onComplete: () => {
                    // Reiniciar variáveis
                    presentQuestion = 0;
                    progress = 0;
                    points = 0;

                    // Fade out e iniciar o quiz
                    this.cameras.main.fadeOut(500, 0, 0, 0, () => {
                        this.scene.start('QuizVpNegocios');
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

// Classe para a cena de parabéns de Negócios
class CongratulationsSceneCurriculoVpNegocios extends Phaser.Scene {
    constructor() {
        super({ key: 'CongratulationsSceneCurriculoVpNegocios' });
    }

    init(data) {
        this.finalPoints = data.points || 0;
    }

    preload() {
        // Carregando recursos
        this.load.image('fundoCongratulationsVpNegocios', '../assets/parabens_cv_vpdenegocios.png');
    }

    create() {
        // Transição de entrada com efeito
        this.cameras.main.fadeIn(1000, 0, 0, 0);

        // Imagem de backgroundGame sem distorção
        const backgroundGame = this.add.image(this.cameras.main.width / 2, this.cameras.main.height / 2, 'fundoCongratulationsVpNegocios');
        this.scaleBackgroundImage(backgroundGame);

        // Botão de texto para voltar
        const backButton = this.add.rectangle(
            this.sys.game.config.width / 2,
            510,
            250,
            60,
            0xB600B9
        ).setStrokeStyle(2, 0x880088)
            .setInteractive();

        // Efeitos do botão
        backButton.on('pointerover', () => {
            backButton.fillColor = 0xC30DC7;
            backButton.setScale(1.05);
        });

        backButton.on('pointerout', () => {
            backButton.fillColor = 0xB600B9;
            backButton.setScale(1);
        });

        // Evento de clique
        backButton.on('pointerdown', () => {
            // Efeito de click
            this.tweens.add({
                targets: backButton,
                scale: 0.95,
                duration: 100,
                yoyo: true,
                onComplete: () => {
                    // Reiniciar variáveis
                    presentQuestion = 0;
                    progress = 0;
                    points = 0;

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

// Classe para a cena do Quiz de Relações
class QuizVpRelacoes extends Phaser.Scene {
    constructor() {
        super({ key: 'QuizVpRelacoes' });
        this.questionTexts = []; // Armazena os textos da question e options
        this.optionsButtons = []; // Armazena os botões das options
    }

    preload() {
        // Carrega os recursos para o quiz
        this.load.font('FontePadrao', 'fonts/PixelifySans-VariableFont_wght.ttf');
        this.load.image('TelaQuiz', '../assets/TelaQuiz.png');
    }

    create() {
        // Transição suave
        this.cameras.main.fadeIn(1000);

        // Adicionar a imagem de backgroundGame sem distorção
        const backgroundGame = this.add.image(this.cameras.main.width / 2, this.cameras.main.height / 2, 'TelaQuiz');
        this.scaleBackgroundImage(backgroundGame);

        // Criar elementos de interface
        this.createProgressBar();
        this.createQuestionsCounter();
        this.showQuestion();
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

    createQuestionsCounter() {
        // Mostrar número da question atual/total
        this.textQuestionNumber = this.add.text(
            this.sys.game.config.width - 150,
            50,
            `Pergunta ${presentQuestion + 1}/${questionsRelationships.length}`,
            { fontSize: '20px', fill: '#000', fontFamily: 'FontePadrao' }
        ).setOrigin(0.5);
    }

    createProgressBar() {
        // Container para a barra de progress
        const progressBarContainer = this.add.rectangle(100, 50, 300, 24, 0xDDDDDD)
            .setOrigin(0, 0.5)
            .setStrokeStyle(2, 0x000000);

        // Barra de progress roxa    
        this.progressBar = this.add.rectangle(102, 50, 0, 20, 0xB600B9)
            .setOrigin(0, 0.5);

        // Texto de progress    
        this.progressText = this.add.text(
            420,
            50,
            `${progress}%`,
            { fontSize: '20px', fill: '#000', fontFamily: 'FontePadrao', fontWeight: 'bold' }
        ).setOrigin(0, 0.5);
    }

    updateProgressBar() {
        // Atualizando a barra de progress do quiz
        const maxHeight = 296;
        const newWidth = (progress / 100) * maxHeight;

        // Animar a barra de progress
        this.tweens.add({
            targets: this.progressBar,
            width: newWidth,
            duration: 500,
            ease: 'Power2'
        });

        this.progressText.setText(`${progress}%`);
    }

    cleanElements() {
        // Remove os textos da question e options
        this.questionTexts.forEach(texto => texto.destroy());
        this.questionTexts = [];

        // Remove os botões das options
        this.optionsButtons.forEach(btn => btn.destroy());
        this.optionsButtons = [];
    }

    showQuestion() {
        // Limpa os elementos antigos
        this.cleanElements();

        // Atualiza o contador de perguntas
        this.textQuestionNumber.setText(`Pergunta ${presentQuestion + 1}/${questionsRelationships.length}`);

        const question = questionsRelationships[presentQuestion];

        // Exibindo a question
        const questionText = this.add.text(
            this.sys.game.config.width / 2,
            100,
            question.question,
            {
                fontSize: '22px',
                fill: '#B600B9',
                fontFamily: 'FontePadrao',
                fontWeight: 'bold',
                wordWrap: { width: this.sys.game.config.width - 150 },
                align: 'center'
            }
        ).setOrigin(0.5);

        this.questionTexts.push(questionText);

        // Exibindo options
        const startY = 200;
        const spacing = 50;

        question.options.forEach((alternative, index) => {
            // Container da alternative (retângulo)
            const containerButton = this.add.rectangle(
                this.sys.game.config.width / 2,
                startY + (index * spacing),
                this.sys.game.config.width - 200,
                50,
                0xEAE8E8
            ).setStrokeStyle(2, 0x444444)
                .setInteractive();

            // Efeitos de hover
            containerButton.on('pointerover', () => {
                containerButton.fillColor = 0xDDDDDD;
                containerButton.setScale(1.02);
            });

            containerButton.on('pointerout', () => {
                containerButton.fillColor = 0xEAE8E8;
                containerButton.setScale(1);
            });

            // Evento de clique
            containerButton.on('pointerdown', () => {
                this.checkAnswer(index, containerButton);
            });

            // Texto da alternative
            const alternativeText = this.add.text(
                this.sys.game.config.width / 2,
                startY + (index * spacing),
                `${index + 1}. ${alternative}`,
                {
                    fontSize: '18px',
                    fill: '#000',
                    fontFamily: 'FontePadrao',
                    wordWrap: { width: this.sys.game.config.width - 220 }
                }
            ).setOrigin(0.5);

            this.questionTexts.push(alternativeText);
            this.optionsButtons.push(containerButton);
        });
    }

    checkAnswer(answerr, clickedButton) {
        // Desativar interação com todos os botões
        this.optionsButtons.forEach(btn => {
            btn.disableInteractive();
        });

        const question = questionsRelationships[presentQuestion];

        if (answerr === question.question) {
            // Resposta question
            clickedButton.fillColor = 0x88FF88; // Verde claro

            // Atualizar pontuação e progress
            points += 100; // Pontuação fixa por answerr question
            progress += 20;

            // Esperar um momento antes de seguir
            this.time.delayedCall(1500, () => {
                presentQuestion++;
                this.updateProgressBar();

                if (presentQuestion < questionsRelationships.length) {
                    // Próxima question com transição
                    this.cameras.main.fadeOut(300, 0, 0, 0, () => {
                        this.cameras.main.fadeIn(300);
                        this.showQuestion();
                    });
                } else {
                    // Quiz completo
                    this.scene.start('CongratulationsSceneCurriculoVpRelacoes', { points: points });
                }
            });
        } else {
            // Resposta incorreta
            clickedButton.fillColor = 0xFF8888; // Vermelho claro

            // Destacar alternative question
            this.optionsButtons[question.question].fillColor = 0x88FF88; // Verde claro

            // Esperar um momento e mostrar tela de game over
            this.time.delayedCall(1500, () => {
                this.scene.start('GameOverSceneCurriculoRelacoes', { motivo: 'errou' });
            });
        }
    }
}

// Classe para a cena de Game Over de Relações
class GameOverSceneCurriculoRelacoes extends Phaser.Scene {
    constructor() {
        super({ key: 'GameOverSceneCurriculoRelacoes' });
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

        // Imagem de backgroundGame sem distorção
        const backgroundGame = this.add.image(this.cameras.main.width / 2, this.cameras.main.height / 2, 'fundoGameOver');
        this.scaleBackgroundImage(backgroundGame);

        // Botão de texto para reiniciar
        const restartButton = this.add.rectangle(
            this.sys.game.config.width / 2,
            510,
            250,
            60,
            0xB600B9
        ).setStrokeStyle(2, 0x880088)
            .setInteractive();

        // Efeitos do botão
        restartButton.on('pointerover', () => {
            restartButton.fillColor = 0xC30DC7;
            restartButton.setScale(1.05);
        });

        restartButton.on('pointerout', () => {
            restartButton.fillColor = 0xB600B9;
            restartButton.setScale(1);
        });

        // Evento de clique
        restartButton.on('pointerdown', () => {
            // Efeito de click
            this.tweens.add({
                targets: restartButton,
                scale: 0.95,
                duration: 100,
                yoyo: true,
                onComplete: () => {
                    // Reiniciar variáveis
                    presentQuestion = 0;
                    progress = 0;
                    points = 0;

                    // Fade out e iniciar o quiz
                    this.cameras.main.fadeOut(500, 0, 0, 0, () => {
                        this.scene.start('QuizVpRelacoes');
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

// Classe para a cena de parabéns de Relações
class CongratulationsSceneCurriculoVpRelacoes extends Phaser.Scene {
    constructor() {
        super({ key: 'CongratulationsSceneCurriculoVpRelacoes' });
    }

    init(data) {
        this.finalPoints = data.points || 0;
    }

    preload() {
        // Carregando recursos
        this.load.image('fundoCongratulationsVpRelacoes', '../assets/parabens_cv_vpderelacoes.png');
    }

    create() {
        // Transição de entrada com efeito
        this.cameras.main.fadeIn(1000, 0, 0, 0);

        // Imagem de backgroundGame sem distorção
        const backgroundGame = this.add.image(this.cameras.main.width / 2, this.cameras.main.height / 2, 'fundoCongratulationsVpRelacoes');
        this.scaleBackgroundImage(backgroundGame);

        // Botão de texto para voltar
        const backButton = this.add.rectangle(
            width / 2,
            height - 210,
            250,
            60,
            0xB600B9
        ).setStrokeStyle(2, 0x880088)
            .setInteractive();

        // Efeitos do botão
        backButton.on('pointerover', () => {
            backButton.fillColor = 0xC30DC7;
            backButton.setScale(1.05);
        });

        backButton.on('pointerout', () => {
            backButton.fillColor = 0xB600B9;
            backButton.setScale(1);
        });

        // Evento de clique
        backButton.on('pointerdown', () => {
            // Efeito de click
            this.tweens.add({
                targets: backButton,
                scale: 0.95,
                duration: 100,
                yoyo: true,
                onComplete: () => {
                    // Reiniciar variáveis
                    presentQuestion = 0;
                    progress = 0;
                    points = 0;

                    // Fade out e iniciar o quiz
                    this.cameras.main.fadeOut(500, 0, 0, 0, () => {
                        this.scene.switch('officeScene');
                    });
                }
            });
        });

        // Texto do botão
        this.add.text(
            width / 2,
            height - 210,
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

// Classe para a cena do Quiz de Tecnologia
class QuizVpTecnologia extends Phaser.Scene {
    constructor() {
        super({ key: 'QuizVpTecnologia' });
        this.questionTexts = []; // Armazena os textos da question e options
        this.optionsButtons = []; // Armazena os botões das options
    }

    preload() {
        // Carrega os recursos para o quiz
        this.load.font('FontePadrao', 'fonts/PixelifySans-VariableFont_wght.ttf');
        this.load.image('TelaQuiz', '../assets/TelaQuiz.png');
    }

    create() {
        // Transição suave
        this.cameras.main.fadeIn(1000);

        // Adicionar a imagem de backgroundGame sem distorção
        const backgroundGame = this.add.image(this.cameras.main.width / 2, this.cameras.main.height / 2, 'TelaQuiz');
        this.scaleBackgroundImage(backgroundGame);

        // Criar elementos de interface
        this.createProgressBar();
        this.createQuestionsCounter();
        this.showQuestion();
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

    createQuestionsCounter() {
        // Mostrar número da question atual/total
        this.textQuestionNumber = this.add.text(
            this.sys.game.config.width - 150,
            50,
            `Pergunta ${presentQuestion + 1}/${questionsTech.length}`,
            { fontSize: '20px', fill: '#000', fontFamily: 'FontePadrao' }
        ).setOrigin(0.5);
    }

    createProgressBar() {
        // Container para a barra de progress
        const progressBarContainer = this.add.rectangle(100, 50, 300, 24, 0xDDDDDD)
            .setOrigin(0, 0.5)
            .setStrokeStyle(2, 0x000000);

        // Barra de progress roxa    
        this.progressBar = this.add.rectangle(102, 50, 0, 20, 0xB600B9)
            .setOrigin(0, 0.5);

        // Texto de progress    
        this.progressText = this.add.text(
            420,
            50,
            `${progress}%`,
            { fontSize: '20px', fill: '#000', fontFamily: 'FontePadrao', fontWeight: 'bold' }
        ).setOrigin(0, 0.5);
    }

    updateProgressBar() {
        // Atualizando a barra de progress do quiz
        const maxHeight = 296;
        const newWidth = (progress / 100) * maxHeight;

        // Animar a barra de progress
        this.tweens.add({
            targets: this.progressBar,
            width: newWidth,
            duration: 500,
            ease: 'Power2'
        });

        this.progressText.setText(`${progress}%`);
    }

    cleanElements() {
        // Remove os textos da question e options
        this.questionTexts.forEach(texto => texto.destroy());
        this.questionTexts = [];

        // Remove os botões das options
        this.optionsButtons.forEach(btn => btn.destroy());
        this.optionsButtons = [];
    }

    showQuestion() {
        // Limpa os elementos antigos
        this.cleanElements();

        // Atualiza o contador de perguntas
        this.textQuestionNumber.setText(`Pergunta ${presentQuestion + 1}/${questionsTech.length}`);

        const question = questionsTech[presentQuestion];

        // Exibindo a question
        const questionText = this.add.text(
            this.sys.game.config.width / 2,
            100,
            question.question,
            {
                fontSize: '22px',
                fill: '#B600B9',
                fontFamily: 'FontePadrao',
                fontWeight: 'bold',
                wordWrap: { width: this.sys.game.config.width - 150 },
                align: 'center'
            }
        ).setOrigin(0.5);

        this.questionTexts.push(questionText);

        // Exibindo options
        const startY = 200;
        const spacing = 50;

        question.options.forEach((alternative, index) => {
            // Container da alternative (retângulo)
            const containerButton = this.add.rectangle(
                this.sys.game.config.width / 2,
                startY + (index * spacing),
                this.sys.game.config.width - 200,
                50,
                0xEAE8E8
            ).setStrokeStyle(2, 0x444444)
                .setInteractive();

            // Efeitos de hover
            containerButton.on('pointerover', () => {
                containerButton.fillColor = 0xDDDDDD;
                containerButton.setScale(1.02);
            });

            containerButton.on('pointerout', () => {
                containerButton.fillColor = 0xEAE8E8;
                containerButton.setScale(1);
            });

            // Evento de clique
            containerButton.on('pointerdown', () => {
                this.checkAnswer(index, containerButton);
            });

            // Texto da alternative
            const alternativeText = this.add.text(
                this.sys.game.config.width / 2,
                startY + (index * spacing),
                `${index + 1}. ${alternative}`,
                {
                    fontSize: '18px',
                    fill: '#000',
                    fontFamily: 'FontePadrao',
                    wordWrap: { width: this.sys.game.config.width - 220 }
                }
            ).setOrigin(0.5);

            this.questionTexts.push(alternativeText);
            this.optionsButtons.push(containerButton);
        });
    }

    checkAnswer(answerr, clickedButton) {
        // Desativar interação com todos os botões
        this.optionsButtons.forEach(btn => {
            btn.disableInteractive();
        });

        const question = questionsTech[presentQuestion];

        if (answerr === question.question) {
            // Resposta question
            clickedButton.fillColor = 0x88FF88; // Verde claro

            // Atualizar pontuação e progress
            points += 100; // Pontuação fixa por answerr question
            progress += 20;

            // Esperar um momento antes de seguir
            this.time.delayedCall(1500, () => {
                presentQuestion++;
                this.updateProgressBar();

                if (presentQuestion < questionsTech.length) {
                    // Próxima question com transição
                    this.cameras.main.fadeOut(300, 0, 0, 0, () => {
                        this.cameras.main.fadeIn(300);
                        this.showQuestion();
                    });
                } else {
                    // Quiz completo
                    this.scene.start('CongratulationsSceneCurriculoVpTecnologia', { points: points });
                }
            });
        } else {
            // Resposta incorreta
            clickedButton.fillColor = 0xFF8888; // Vermelho claro

            // Destacar alternative question
            this.optionsButtons[question.question].fillColor = 0x88FF88; // Verde claro

            // Esperar um momento e mostrar tela de game over
            this.time.delayedCall(1500, () => {
                this.scene.start('GameOverSceneCurriculoTecnologia', { motivo: 'errou' });
            });
        }
    }
}

// Classe para a cena de Game Over de Tecnologia
class GameOverSceneCurriculoTecnologia extends Phaser.Scene {
    constructor() {
        super({ key: 'GameOverSceneCurriculoTecnologia' });
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

        // Imagem de backgroundGame sem distorção
        const backgroundGame = this.add.image(this.cameras.main.width / 2, this.cameras.main.height / 2, 'fundoGameOver');
        this.scaleBackgroundImage(backgroundGame);

        // Botão de texto para reiniciar
        const restartButton = this.add.rectangle(
            this.sys.game.config.width / 2,
            510,
            250,
            60,
            0xB600B9
        ).setStrokeStyle(2, 0x880088)
            .setInteractive();

        // Efeitos do botão
        restartButton.on('pointerover', () => {
            restartButton.fillColor = 0xC30DC7;
            restartButton.setScale(1.05);
        });

        restartButton.on('pointerout', () => {
            restartButton.fillColor = 0xB600B9;
            restartButton.setScale(1);
        });

        // Evento de clique
        restartButton.on('pointerdown', () => {
            // Efeito de click
            this.tweens.add({
                targets: restartButton,
                scale: 0.95,
                duration: 100,
                yoyo: true,
                onComplete: () => {
                    // Reiniciar variáveis
                    presentQuestion = 0;
                    progress = 0;
                    points = 0;

                    // Fade out e iniciar o quiz
                    this.cameras.main.fadeOut(500, 0, 0, 0, () => {
                        this.scene.start('QuizVpTecnologia');
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

// Classe para a cena de parabéns de Tecnologia
class CongratulationsSceneCurriculoVpTecnologia extends Phaser.Scene {
    constructor() {
        super({ key: 'CongratulationsSceneCurriculoVpTecnologia' });
    }

    init(data) {
        this.finalPoints = data.points || 0;
    }

    preload() {
        // Carregando recursos
        this.load.image('fundoCongratulationsVpTecnologia', '../assets/parabens_cv_vpdetecnologia.png');
    }

    create() {
        // Transição de entrada com efeito
        this.cameras.main.fadeIn(1000, 0, 0, 0);

        // Imagem de backgroundGame sem distorção
        const backgroundGame = this.add.image(this.cameras.main.width / 2, this.cameras.main.height / 2, 'fundoCongratulationsVpTecnologia');
        this.scaleBackgroundImage(backgroundGame);

        // Botão de texto para voltar
        const backButton = this.add.rectangle(
            width / 2,
            height - 210,
            250,
            60,
            0xB600B9
        ).setStrokeStyle(2, 0x880088)
            .setInteractive();

        // Efeitos do botão
        backButton.on('pointerover', () => {
            backButton.fillColor = 0xC30DC7;
            backButton.setScale(1.05);
        });

        backButton.on('pointerout', () => {
            backButton.fillColor = 0xB600B9;
            backButton.setScale(1);
        });

        // Evento de clique
        backButton.on('pointerdown', () => {
            // Efeito de click
            this.tweens.add({
                targets: backButton,
                scale: 0.95,
                duration: 100,
                yoyo: true,
                onComplete: () => {
                    // Reiniciar variáveis
                    presentQuestion = 0;
                    progress = 0;
                    points = 0;

                    // Fade out e iniciar o quiz
                    this.cameras.main.fadeOut(500, 0, 0, 0, () => {
                        this.scene.switch('officeScene');
                    });
                }
            });
        });

        // Texto do botão
        this.add.text(
            width / 2,
            height - 210,
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