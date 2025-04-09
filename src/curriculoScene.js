// Dados do Quiz VP Pessoas
const peopleQuestions = [
    {
        question: "O setor de Pessoas da Vivo valoriza currículos bem organizados e fáceis de ler. Qual das seguintes práticas melhora a estrutura do seu currículo?",
        options: [
            "Usar parágrafos longos para descrever cada experiência.",
            "Utilizar marcadores para destacar conquistas e habilidades.",
            "Incluir informações detalhadas sobre sua vida pessoal.",
            "Adicionar todas as experiências desde o primeiro emprego, sem priorizar as mais recentes."
        ],
        correct: 1,
        feedback: "Pense novamente! Um currículo bem estruturado facilita a leitura e destaca suas conquistas de forma clara. Qual alternativa faz isso melhor?"
    },
    {
        question: "Qual a importância de destacar soft skills no currículo?",
        options: [
            "São irrelevantes, apenas habilidades técnicas importam.",
            "Demonstram como o candidato se adapta e interage no ambiente de trabalho.",
            "Devem ser listadas de forma genérica, sem exemplos práticos.",
            "Devem substituir as experiências profissionais."
        ],
        correct: 1,
        feedback: "Reflita! Soft skills mostram como você se relaciona e se adapta no trabalho. Qual alternativa destaca isso de forma mais eficaz?"
    },
    {
        question: "Como adaptar o currículo para ser aprovado por um sistema ATS (Applicant Tracking System)?",
        options: [
            "Usando palavras-chave da descrição da vaga.",
            "Criando um design altamente visual e colorido.",
            "Usando apenas tópicos genéricos sobre experiências.",
            "Evitando títulos claros para as seções."
        ],
        correct: 0,
        feedback: "Pense melhor! Sistemas ATS buscam palavras-chave específicas. Qual alternativa reflete essa necessidade?"
    },
    {
        question: "O que é essencial para um currículo ser bem avaliado por um recrutador?",
        options: [
            "Um layout sofisticado e cheio de imagens.",
            "Listar apenas experiências, sem detalhar conquistas.",
            "Destacar resultados e competências alinhadas à vaga.",
            "Usar um texto longo e detalhado para cada experiência."
        ],
        correct: 2,
        feedback: "Reflita! Recrutadores valorizam resultados e competências alinhadas à vaga. Qual alternativa destaca isso?"
    },
    {
        question: "Qual erro pode prejudicar um candidato ao enviar um currículo?",
        options: [
            "Usar um e-mail profissional no contato.",
            "Adaptar o currículo para cada vaga.",
            "Expor informações de contato.",
            "Deixar informações desatualizadas ou incorretas."
        ],
        correct: 3,
        feedback: "Pense novamente! Informações desatualizadas ou incorretas podem prejudicar sua candidatura. Qual alternativa reflete isso?"
    }
];

// Dados do Quiz VP Estratégia
const strategyQuestions = [
    {
        question: "A inteligência artificial é usada por sistemas de recrutamento (ATS) para filtrar currículos. Qual das seguintes abordagens ajuda seu currículo a ser bem classificado nesses sistemas?",
        options: [
            "Inserir palavras-chave relevantes da vaga na seção de habilidades e experiência.",
            "Utilizar fontes decorativas e imagens para destacar sua personalidade.",
            "Escrever um currículo genérico sem adaptação para cada vaga.",
            "Enviar o currículo no corpo do e-mail ao invés de um arquivo estruturado."
        ],
        correct: 0,
        feedback: "Reflita! Sistemas ATS priorizam palavras-chave relevantes. Qual alternativa melhor atende a essa necessidade?"
    },
    {
        question: "O que pode tornar um candidato mais atrativo para uma vaga estratégica?",
        options: [
            "Demonstrar capacidade analítica e experiência em inovação.",
            "Usar um currículo sem foco e cheio de informações irrelevantes.",
            "Esconder experiências passadas para parecer mais flexível.",
            "Ignorar a personalização do currículo para cada oportunidade."
        ],
        correct: 0,
        feedback: "Pense novamente! Capacidade analítica e inovação são essenciais para vagas estratégicas. Qual alternativa destaca isso?"
    },
    {
        question: "Como destacar projetos de inovação no currículo?",
        options: [
            "Explicando a abordagem e os resultados obtidos.",
            "Apenas listando o nome dos projetos sem detalhes.",
            "Omitindo informações sobre desafios e aprendizados.",
            "Exagerando nos resultados para parecer mais impactante."
        ],
        correct: 0,
        feedback: "Reflita! Projetos de inovação devem ser claros e objetivos. Qual alternativa melhor descreve isso?"
    },
    {
        question: "Qual habilidade é essencial para atuar em novos negócios e IA?",
        options: [
            "Capacidade de adaptação e pensamento estratégico.",
            "Apenas habilidades operacionais sem visão de longo prazo.",
            "Criatividade sem aplicação prática.",
            "Exclusivamente experiência acadêmica sem prática no mercado."
        ],
        correct: 0,
        feedback: "Pense melhor! Adaptação e pensamento estratégico são cruciais. Qual alternativa reflete isso?"
    },
    {
        question: "Como um candidato pode demonstrar conhecimento em inteligência artificial no currículo?",
        options: [
            "Mencionando cursos, projetos e experiência na área.",
            "Apenas citando que tem interesse no assunto.",
            "Ignorando certificações para não parecer muito técnico.",
            "Evitando mencionar IA caso não tenha experiência direta."
        ],
        correct: 0,
        feedback: "Reflita! Cursos, projetos e experiência são fundamentais para demonstrar conhecimento. Qual alternativa destaca isso?"
    }
];

// Dados do Quiz VP Negócios
const businessQuestions = [
    {
        question: "Você deseja atuar na VP de Negócios da Vivo e percebe que a vaga enfatiza habilidades analíticas e gestão de projetos. Como você pode personalizar seu currículo para aumentar suas chances?",
        options: [
            "Destacar experiências passadas que demonstram suas habilidades analíticas e projetos liderados.",
            "Manter um currículo genérico para que sirva para qualquer vaga.",
            "Adicionar certificações e cursos, mesmo que não tenham relação com a vaga.",
            "Escrever experiências apenas com as funções desempenhadas, sem resultados obtidos."
        ],
        correct: 0,
        feedback: "Reflita! Destacar habilidades analíticas e projetos liderados é essencial. Qual alternativa reflete isso?"
    },
    {
        question: "O que é essencial para um currículo focado em vendas e negócios?",
        options: [
            "Destacar metas atingidas e impacto nos resultados.",
            "Apenas listar as empresas onde trabalhou sem detalhes.",
            "Usar um layout criativo sem estrutura clara.",
            "Omitir informações sobre clientes e mercado."
        ],
        correct: 0,
        feedback: "Pense novamente! Metas atingidas e impacto nos resultados são fundamentais. Qual alternativa reflete isso?"
    },
    {
        question: "Como descrever a experiência em negociação e vendas no currículo?",
        options: [
            "Demonstrando crescimento de receita e estratégias aplicadas.",
            "Apenas mencionando que trabalhou com vendas.",
            "Excluindo informações sobre indicadores de performance.",
            "Utilizando frases genéricas sem exemplos concretos."
        ],
        correct: 0,
        feedback: "Reflita! Crescimento de receita e estratégias aplicadas são essenciais. Qual alternativa reflete isso?"
    },
    {
        question: "Qual erro pode prejudicar um candidato na área comercial ao montar seu currículo?",
        options: [
            "Excluir números e métricas de performance.",
            "Destacar networking e relacionamento com clientes.",
            "Demonstrar experiência com estratégias de mercado.",
            "Incluir cases de sucesso relevantes."
        ],
        correct: 0,
        feedback: "Pense novamente! Números e métricas são fundamentais para demonstrar resultados. Qual alternativa reflete isso?"
    },
    {
        question: "Qual é um diferencial para um currículo na área de negócios?",
        options: [
            "Experiência em estratégias de crescimento e desenvolvimento de mercado.",
            "Listar apenas habilidades técnicas.",
            "Ignorar a importância de soft skills.",
            "Criar um currículo genérico sem adaptações para a vaga."
        ],
        correct: 0,
        feedback: "Reflita! Estratégias de crescimento e desenvolvimento de mercado são diferenciais. Qual alternativa reflete isso?"
    }
];

// Dados do Quiz VP Relações Institucionais
const relationsQuestions = [
    {
        question: "Um currículo eficaz precisa de uma comunicação clara e objetiva. Qual das opções abaixo é a melhor forma de descrever uma experiência profissional?",
        options: [
            '"Trabalhei na empresa X e fiz muitas atividades na área de marketing."',
            '"Responsável por marketing na empresa X, onde aumentei o engajamento digital em 40% por meio de campanhas estratégicas."',
            '"Atuei no setor de marketing, onde fazia postagens nas redes sociais."',
            '"Tenho experiência com marketing e sou uma pessoa criativa e proativa."'
        ],
        correct: 1,
        feedback: "Reflita! Descrever conquistas e resultados é essencial. Qual alternativa reflete isso?"
    },
    {
        question: "Qual fator é mais relevante em um currículo para uma vaga em sustentabilidade?",
        options: [
            "Experiência com projetos ESG e impacto social.",
            "Uso de palavras-chave sem relevância para a área.",
            "Apenas a formação acadêmica sem experiências práticas.",
            "Omitir participação em iniciativas ambientais."
        ],
        correct: 0,
        feedback: "Pense novamente! Projetos ESG e impacto social são altamente valorizados. Qual alternativa reflete isso?"
    },
    {
        question: "Como destacar experiência com relações institucionais no currículo?",
        options: [
            "Mencionando atuação com stakeholders e projetos de impacto.",
            "Apenas listando cargos sem descrição das atividades.",
            "Evitando detalhar parcerias estratégicas.",
            "Omitindo participação em políticas públicas e regulamentações."
        ],
        correct: 0,
        feedback: "Reflita! Atuação com stakeholders e projetos de impacto são essenciais. Qual alternativa reflete isso?"
    },
    {
        question: "Qual das seguintes ações melhora um currículo para a área de sustentabilidade?",
        options: [
            "Incluir certificações e especializações relevantes.",
            "Usar um layout poluído e desorganizado.",
            "Ignorar experiências de voluntariado e impacto social.",
            "Excluir informações sobre engajamento com ONGs."
        ],
        correct: 0,
        feedback: "Pense novamente! Certificações e especializações relevantes são diferenciais. Qual alternativa reflete isso?"
    },
    {
        question: "O que um recrutador dessa área (VP de Relações Institucionais e Sustentabilidade) espera ver no currículo?",
        options: [
            "Experiência com responsabilidade social e desenvolvimento sustentável.",
            "Apenas conhecimentos básicos sobre meio ambiente.",
            "Um currículo genérico, sem foco na área.",
            "Um documento com muitas páginas e informações irrelevantes."
        ],
        correct: 0,
        feedback: "Reflita! Experiência com responsabilidade social e desenvolvimento sustentável é essencial. Qual alternativa reflete isso?"
    }
];

// Dados do Quiz VP Tecnologia
const technologyQuestions = [
    {
        question: "O design do seu currículo pode influenciar na forma como ele é lido pelos sistemas automatizados (ATS). Qual das opções abaixo representa a melhor prática?",
        options: [
            "Usar tabelas e colunas para organizar informações de forma estilizada.",
            "Criar um currículo em formato de imagem ou PDF com elementos gráficos.",
            "Manter um layout limpo, com formatação simples e sem uso excessivo de cores ou gráficos.",
            "Utilizar fontes incomuns para destacar seu diferencial."
        ],
        correct: 2,
        feedback: "Pense novamente! Um layout limpo e simples é mais eficaz para sistemas ATS. Qual alternativa reflete isso?"
    },
    {
        question: "Qual é um elemento essencial para um currículo na área de TI?",
        options: [
            "Projetos desenvolvidos e conhecimento em tecnologias específicas.",
            "Apenas a lista de empresas onde trabalhou.",
            "Um design extremamente visual e sem estrutura clara.",
            "Ignorar certificações para focar apenas em experiência prática."
        ],
        correct: 0,
        feedback: "Reflita! Projetos desenvolvidos e conhecimento em tecnologias específicas são essenciais. Qual alternativa reflete isso?"
    },
    {
        question: "Como um profissional de TI pode demonstrar experiência prática no currículo?",
        options: [
            "Destacando projetos, certificações e metodologias utilizadas.",
            "Apenas mencionando que tem habilidades técnicas.",
            "Omitindo informações sobre ferramentas e tecnologias.",
            "Evitando links para portfólios ou GitHub."
        ],
        correct: 0,
        feedback: "Pense novamente! Projetos, certificações e metodologias são fundamentais. Qual alternativa reflete isso?"
    },
    {
        question: "Qual a melhor maneira de destacar conhecimento em cibersegurança no currículo?",
        options: [
            "Citando certificações como CISSP e projetos na área.",
            "Apenas mencionando interesse no tema.",
            "Excluindo informações sobre vulnerabilidades tratadas.",
            "Usando frases vagas sem comprovação de conhecimento."
        ],
        correct: 0,
        feedback: "Reflita! Certificações e projetos são essenciais para destacar conhecimento. Qual alternativa reflete isso?"
    },
    {
        question: "Qual erro deve ser evitado ao criar um currículo para a área de TI?",
        options: [
            "Listar todas as tecnologias já utilizadas sem organização.",
            "Incluir certificações e cursos relevantes.",
            "Organizar a experiência de forma cronológica e clara.",
            "Excluir informações sobre impacto dos projetos."
        ],
        correct: 0,
        feedback: "Pense novamente! Listar tecnologias sem organização torna o currículo confuso. Qual alternativa reflete isso?"
    }
];

// Variáveis globais
let currentQuestion = 0;
let progress = 0;
let score = 0;
const TIME_PER_QUESTION = 30; // Segundos para responder
let remainingTime = TIME_PER_QUESTION;
let timer;

// Classe para a cena inicial do currículo
class CurriculoScene extends Phaser.Scene {
    constructor() {
        super({ key: 'curriculoScene' });
        this.currentBackground = 'background';
        this.canMove = true;
    }

    init(data) {
        this.selectedSpriteSheet = data.selectedSpriteSheet;
       
    }

    preload() {
        // Carrega as imagens
        this.load.image('firstScreen', '../assets/primeiraTela.png');
        this.load.image('button01', '../assets/botao_vp_pessoas.png');
        this.load.image('button02', '../assets/botao_vp_estrategia.png');
        this.load.image('button03', '../assets/botao_vp_negocios.png');
        this.load.image('button04', '../assets/botao_vp_relacoes.png');
        this.load.image('button05', '../assets/botao_vp_tecnologia.png');
      
        // Carrega a fonte
        this.load.font('font', 'fonts/PixelifySans-VariableFont_wght.ttf');

        // Carrega os efeitos sonoros
        this.load.audio('correctSound', '../assets/sounds/476178__unadamlar__correct-choice.wav');
        this.load.audio('wrongSound', '../assets/sounds/700641__producing_raylite__incorrect-buzzer.wav');
        this.load.audio('clickSound', '../assets/sounds/687107__aphom000__mouse-2-button-fast-click.wav');
    }

    create() {

        this.events.on('stopWalkSound', () => { // Evento para parar o som de passos
            if (window.walkSound) {
                window.walkSound.stop();
            }
        });

        var width = 1520;
        var height = 753;

        // Imagem de fundo sem distorção
        const background = this.add.image(this.cameras.main.width / 2, this.cameras.main.height / 2, 'firstScreen');

        // Ajusta a escala para cobrir a tela mantendo a proporção
        this.scaleBackgroundImage(background);

        // Botão interativo com animação (fase Pessoas)
        const buttonVpPeople = this.add.image(
            width - 1020, height - 370,
            'button01'
        ).setInteractive().setScale(0.23);

        buttonVpPeople.on('pointerout', () => {
            buttonVpPeople.setScale(0.23);
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
                        // Efeito sonoro de clique
                        this.clickSound = this.sound.add('clickSound', { loop: false, volume: 10 });
                        this.clickSound.play();

                        this.scene.start('QuizVpPessoas', {selectedSpriteSheet: this.selectedSpriteSheet,});
                    });
                }
            });
        });

        // Botão interativo com animação (fase Estratégia)
        const buttonVpStrategy = this.add.image(
            width - 750, height - 370,
            'button02'
        ).setInteractive().setScale(0.23);

        buttonVpStrategy.on('pointerout', () => {
            buttonVpStrategy.setScale(0.23);
        });

        // Efeito de piscar ao clicar
        buttonVpStrategy.on('pointerdown', () => {
            this.tweens.add({
                targets: buttonVpStrategy,
                alpha: 0.6,
                duration: 100,
                yoyo: true,
                onComplete: () => {
                    // Fade out na câmera
                    this.cameras.main.fadeOut(500, 0, 0, 0, () => {
                        // Efeito sonoro de clique
                        this.clickSound = this.sound.add('clickSound', { loop: false, volume: 10 });
                        this.clickSound.play();

                        this.scene.start('QuizVpEstrategia', {selectedSpriteSheet: this.selectedSpriteSheet,});
                    });
                }
            });
        });

        // Botão interativo com animação (fase Negócios)
        const buttonVpBusiness = this.add.image(
            width - 480, height - 370,
            'button03'
        ).setInteractive().setScale(0.23);

        buttonVpBusiness.on('pointerout', () => {
            buttonVpBusiness.setScale(0.23);
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
                        // Efeito sonoro de clique
                        this.clickSound = this.sound.add('clickSound', { loop: false, volume: 10 });
                        this.clickSound.play();

                        this.scene.start('QuizVpNegocios', {selectedSpriteSheet: this.selectedSpriteSheet,});
                    });
                }
            });
        });

        // Botão interativo com animação (fase Relações)
        const buttonVpRelations = this.add.image(
            width - 1020, height - 270,
            'button04'
        ).setInteractive().setScale(0.23);

        buttonVpRelations.on('pointerout', () => {
            buttonVpRelations.setScale(0.23);
        });

        // Efeito de piscar ao clicar
        buttonVpRelations.on('pointerdown', () => {
            this.tweens.add({
                targets: buttonVpRelations,
                alpha: 0.6,
                duration: 100,
                yoyo: true,
                onComplete: () => {
                    // Fade out na câmera
                    this.cameras.main.fadeOut(500, 0, 0, 0, () => {
                        // Efeito sonoro de clique
                        this.clickSound = this.sound.add('clickSound', { loop: false, volume: 10 });
                        this.clickSound.play();

                        this.scene.start('QuizVpRelacoes', {selectedSpriteSheet: this.selectedSpriteSheet,});
                    });
                }
            });
        });

        // Botão interativo com animação (fase Tecnologia)
        const buttonVpTechnology = this.add.image(
            width - 750, height - 270,
            'button05'
        ).setInteractive().setScale(0.23);

        buttonVpTechnology.on('pointerout', () => {
            buttonVpTechnology.setScale(0.23);
        });

        // Efeito de piscar ao clicar
        buttonVpTechnology.on('pointerdown', () => {
            this.tweens.add({
                targets: buttonVpTechnology,
                alpha: 0.6,
                duration: 100,
                yoyo: true,
                onComplete: () => {
                    // Fade out na câmera
                    this.cameras.main.fadeOut(500, 0, 0, 0, () => {
                        // Efeito sonoro de clique
                        this.clickSound = this.sound.add('clickSound', { loop: false, volume: 10 });
                        this.clickSound.play();

                        this.scene.start('QuizVpTecnologia', {selectedSpriteSheet: this.selectedSpriteSheet,});
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
        this.questionTexts = []; // Armazena os textos da pergunta e alternativas
        this.optionButtons = []; // Armazena os botões das alternativas
    }

    preload() {
        // Carrega os recursos para o quiz
        this.load.font('font', 'fonts/PixelifySans-VariableFont_wght.ttf');
        this.load.image('QuizScreen', '../assets/TelaQuiz.png');
    }

    create() {
        // Transição suave
        this.cameras.main.fadeIn(1000);

        // Adicionar a imagem de fundo sem distorção
        const background = this.add.image(this.cameras.main.width / 2, this.cameras.main.height / 2, 'QuizScreen');
        this.scaleBackgroundImage(background);

        // Criar elementos de interface
        this.createProgressBar();
        this.createQuestionCounter();
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

    createQuestionCounter() {
        // Mostrar número da pergunta atual/total
        this.questionCounterText = this.add.text(
            this.sys.game.config.width - 150,
            50,
            `Question ${currentQuestion + 1}/${peopleQuestions.length}`,
            { fontSize: '30px', fill: '#000', fontFamily: 'font' }
        ).setOrigin(0.5);
    }

    createProgressBar() {
        // Container para a barra de progresso
        const progressBarContainer = this.add.rectangle(100, 50, 300, 24, 0xDDDDDD)
            .setOrigin(0, 0.5)
            .setStrokeStyle(2, 0x000000);

        // Barra de progresso roxa    
        this.progressBar = this.add.rectangle(102, 50, 0, 20, 0xB600B9)
            .setOrigin(0, 0.5);

        // Texto de progresso    
        this.progressText = this.add.text(
            420,
            50,
            `${progress}%`,
            { fontSize: '30px', fill: '#000', fontFamily: 'font', fontWeight: 'bold' }
        ).setOrigin(0, 0.5);
    }

    updateProgressBar() {
        // Atualizando a barra de progresso do quiz
        const maxWidth = 296;
        const newWidth = (progress / 100) * maxWidth;

        // Animar a barra de progresso
        this.tweens.add({
            targets: this.progressBar,
            width: newWidth,
            duration: 500,
            ease: 'Power2'
        });

        this.progressText.setText(`${progress}%`);
    }

    clearElements() {
        // Remove os textos da pergunta e alternativas
        this.questionTexts.forEach(text => text.destroy());
        this.questionTexts = [];

        // Remove os botões das alternativas
        this.optionButtons.forEach(button => button.destroy());
        this.optionButtons = [];
    }

    showQuestion() {
        // Limpa os elementos antigos
        this.clearElements();

        // Atualiza o contador de perguntas
        this.questionCounterText.setText(`Question ${currentQuestion + 1}/${peopleQuestions.length}`);

        const question = peopleQuestions[currentQuestion];

        // Posição do texto
        const questionText = this.add.text(
            this.sys.game.config.width / 2,
            150,
            question.question,
            {
                fontSize: '32px',
                fill: '#B600B9',
                fontFamily: 'font',
                fontWeight: 'bold',
                wordWrap: { width: this.sys.game.config.width - 150 },
                align: 'center'
            }
        ).setOrigin(0.5);

        this.questionTexts.push(questionText);

        // Posição do texto
        const startY = 250;
        const spacing = 50;

        question.options.forEach((option, index) => {
            // Aumentar altura para o padding e espaçamento
            const containerHeight = 70;
            const padding = 20;

            // Container da alternativa (retângulo) with increased height
            const buttonContainer = this.add.rectangle(
                this.sys.game.config.width / 2,
                startY + (index * (containerHeight + 10)), // Ajusto de espaçamento
                this.sys.game.config.width - 200,
                containerHeight,
                0xEAE8E8
            ).setStrokeStyle(2, 0x444444)
                .setInteractive();

            // Efeitos de hover
            buttonContainer.on('pointerover', () => {
                buttonContainer.fillColor = 0xDDDDDD;
                buttonContainer.setScale(1.02);
            });

            buttonContainer.on('pointerout', () => {
                buttonContainer.fillColor = 0xEAE8E8;
                buttonContainer.setScale(1);
            });

            // Evento de clique
            buttonContainer.on('pointerdown', () => {
                this.checkAnswer(index, buttonContainer);
            });

            // Texto com padding
            const optionText = this.add.text(
                this.sys.game.config.width / 2,
                startY + (index * (containerHeight + 10)), // Alinhamento com container
                `${index + 1}. ${option}`,
                {
                    fontSize: '28px',
                    fill: '#000',
                    fontFamily: 'font',
                    wordWrap: { width: this.sys.game.config.width - 220 - (padding * 2) },
                    padding: { x: padding, y: padding }
                }
            ).setOrigin(0.5);

            this.questionTexts.push(optionText);
            this.optionButtons.push(buttonContainer);
        });
    }

    checkAnswer(answer, clickedButton) {
        // Desativar interação com todos os botões
        this.optionButtons.forEach(button => {
            button.disableInteractive();
        });

        const question = peopleQuestions[currentQuestion]; 

        if (answer === question.correct) {
            // Resposta correta
            clickedButton.fillColor = 0x88FF88; // Verde claro

            // Efeito sonoro de correto
            this.correct = this.sound.add('correctSound', { loop: false, volume: 10 });
            this.correct.play();

            // Atualizar pontuação e progresso
            score += 100; // Pontuação fixa por resposta correta
            progress += 20;

            // Esperar um momento antes de seguir
            this.time.delayedCall(1500, () => {
                currentQuestion++;
                this.updateProgressBar();

                if (currentQuestion < peopleQuestions.length) {
                    // Próxima pergunta com transição
                    this.cameras.main.fadeOut(300, 0, 0, 0, () => {
                        this.cameras.main.fadeIn(300);
                        this.showQuestion();
                    });
                } else {
                    // Quiz completo
                    this.scene.start('CongratulationsSceneCurriculoVpPessoas', { score: score }, {selectedSpriteSheet: this.selectedSpriteSheet,});
                }
            });
        } else {
            // Resposta incorreta
            clickedButton.fillColor = 0xFF8888; // Vermelho claro

            // Efeito sonoro de errado
            this.wrong = this.sound.add('wrongSound', { loop: false, volume: 10 });
            this.wrong.play();

            // Posição do texto de feedback
            const feedbackText = this.add.text(
                this.sys.game.config.width / 2,
                this.sys.game.config.height - 100, 
                question.feedback,
                {
                    fontSize: '23px', 
                    fill: '#FF888',
                    fontFamily: 'font',
                    wordWrap: { width: this.sys.game.config.width - 100 },
                    align: 'center'
                }
            ).setOrigin(0.5);

            // Esperar um momento antes de permitir nova tentativa
            this.time.delayedCall(3000, () => {
                feedbackText.destroy(); // Remove o feedback
                this.showQuestion(); // Volta para a mesma pergunta
            });
        }
    }
}


// Classe para a cena de parabéns
class CongratulationsSceneCurriculoVpPessoas extends Phaser.Scene {
    constructor() {
        super({ key: 'CongratulationsSceneCurriculoVpPessoas' });
    }

    init(data) {
        this.finalScore = data.score || 0;
    }

    preload() {
        // Carregando recursos
        this.load.image('backgroundCongratulationsVpPeople', '../assets/parabens_cv_vpdepessoas.png');
    }

    create() {
        // Transição de entrada com efeito
        this.cameras.main.fadeIn(1000, 0, 0, 0);

        // Img de fundo sem distorção
        const background = this.add.image(this.cameras.main.width / 2, this.cameras.main.height / 2, 'backgroundCongratulationsVpPeople');
        this.scaleBackgroundImage(background);

        // Botão de texto para voltar
        const returnButton = this.add.rectangle(
            this.sys.game.config.width / 2,
            510,
            250,
            60,
            0xB600B9
        ).setStrokeStyle(2, 0x880088)
            .setInteractive();

        // Efeitos do botão
        returnButton.on('pointerover', () => {
            returnButton.fillColor = 0xC30DC7;
            returnButton.setScale(1.05);
        });

        returnButton.on('pointerout', () => {
            returnButton.fillColor = 0xB600B9;
            returnButton.setScale(1);
        });

        //Evento de clique
        returnButton.on('pointerdown', () => {
            // Efeito de clique
            this.tweens.add({
                targets: returnButton,
                scale: 0.95,
                duration: 100,
                yoyo: true,
                onComplete: () => {
                    // Reiniciar variáveis
                    currentQuestion = 0;
                    progress = 0;
                    score = 0;

                    // Fade out e iniciar o quiz
                    this.cameras.main.fadeOut(500, 0, 0, 0, () => {
                        // Efeito sonoro de clique
                        this.clickSound = this.sound.add('clickSound', { loop: false, volume: 10 });
                        this.clickSound.play();

                        this.scene.stop('CongratulationsSceneCurriculoVpPessoas');
                        this.scene.resume('officeScene', {selectedSpriteSheet: this.selectedSpriteSheet,});

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
                fill: '#000',
                fontFamily: 'font'
            }
        ).setOrigin(0.5);
    }



    // Completando o método
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
        this.questionTexts = []; // Armazena perguntas e alternativas
        this.optionButtons = []; // Armazena alternativas
    }

    preload() {
        // Carregando recursos para o jogo
        this.load.font('font', 'fonts/PixelifySans-VariableFont_wght.ttf');
        this.load.image('QuizScreen', '../assets/TelaQuiz.png');
    }

    create() {
        // Transição suave
        this.cameras.main.fadeIn(1000);

        // Adicionar imagem de fundo sem distorção
        const background = this.add.image(this.cameras.main.width / 2, this.cameras.main.height / 2, 'QuizScreen');
        this.scaleBackgroundImage(background);

        // Cria elementos na interface
        this.createProgressBar();
        this.createQuestionCounter();
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

    createQuestionCounter() {
        // Mostra número da pergunta atual/total
        this.questionCounterText = this.add.text(
            this.sys.game.config.width - 150,
            50,
            `Question ${currentQuestion + 1}/${strategyQuestions.length}`,
            { fontSize: '30px', fill: '#000', fontFamily: 'font' }
        ).setOrigin(0.5);
    }

    createProgressBar() {
        // Container para a barra de progresso
        const progressBarContainer = this.add.rectangle(100, 50, 300, 24, 0xDDDDDD)
            .setOrigin(0, 0.5)
            .setStrokeStyle(2, 0x000000);

        // Barra de progresso roxa
        this.progressBar = this.add.rectangle(102, 50, 0, 20, 0xB600B9)
            .setOrigin(0, 0.5);

        // Texto de progresso
        this.progressText = this.add.text(
            420,
            50,
            `${progress}%`,
            { fontSize: '30px', fill: '#000', fontFamily: 'font', fontWeight: 'bold' }
        ).setOrigin(0, 0.5);
    }

    updateProgressBar() {
        // Atualizando a barra de progresso do quiz
        const maxWidth = 296;
        const newWidth = (progress / 100) * maxWidth;

        // Animar a barra de progresso
        this.tweens.add({
            targets: this.progressBar,
            width: newWidth,
            duration: 500,
            ease: 'Power2'
        });

        this.progressText.setText(`${progress}%`);
    }

    clearElements() {
        // Remove os textos das perguntas e alternativas
        this.questionTexts.forEach(text => text.destroy());
        this.questionTexts = [];

        // Remove os botões das alternativas
        this.optionButtons.forEach(button => button.destroy());
        this.optionButtons = [];
    }

    showQuestion() {
        // Limpa os elementos antigos
        this.clearElements();

        // Atualiza o contador de perguntas
        this.questionCounterText.setText(`Question ${currentQuestion + 1}/${strategyQuestions.length}`);

        const question = strategyQuestions[currentQuestion];

        // Posição do texto de perguntas
        const questionText = this.add.text(
            this.sys.game.config.width / 2,
            150,
            question.question,
            {
                fontSize: '32px',
                fill: '#B600B9',
                fontFamily: 'font',
                fontWeight: 'bold',
                wordWrap: { width: this.sys.game.config.width - 150 },
                align: 'center'
            }
        ).setOrigin(0.5);

        this.questionTexts.push(questionText);

        // Posição dos textos (quiz)
        const startY = 250;
        const spacing = 50;

        question.options.forEach((option, index) => {
            // Altura aumentada
            const containerHeight = 70;
            const padding = 20;

            // Container da alternativa (retângulo) with increased height
            const buttonContainer = this.add.rectangle(
                this.sys.game.config.width / 2,
                startY + (index * (containerHeight + 10)), // Espaçamento ajustado
                this.sys.game.config.width - 200,
                containerHeight,
                0xEAE8E8
            ).setStrokeStyle(2, 0x444444)
                .setInteractive();

            // Efeitos de hover
            buttonContainer.on('pointerover', () => {
                buttonContainer.fillColor = 0xDDDDDD;
                buttonContainer.setScale(1.02);
            });

            buttonContainer.on('pointerout', () => {
                buttonContainer.fillColor = 0xEAE8E8;
                buttonContainer.setScale(1);
            });

            // Evento de clique
            buttonContainer.on('pointerdown', () => {
                this.checkAnswer(index, buttonContainer);
            });

            // Padding do texto
            const optionText = this.add.text(
                this.sys.game.config.width / 2,
                startY + (index * (containerHeight + 10)), // Alinhamento com container
                `${index + 1}. ${option}`,
                {
                    fontSize: '28px',
                    fill: '#000',
                    fontFamily: 'font',
                    wordWrap: { width: this.sys.game.config.width - 220 - (padding * 2) },
                    padding: { x: padding, y: padding }
                }
            ).setOrigin(0.5);

            this.questionTexts.push(optionText);
            this.optionButtons.push(buttonContainer);
        });
    }

    checkAnswer(answer, clickedButton) {
        // Desativar interação com todos os botões
        this.optionButtons.forEach(button => {
            button.disableInteractive();
        });

        const question = strategyQuestions[currentQuestion];

        if (answer === question.correct) {
            // Resposta correta
            clickedButton.fillColor = 0x88FF88; // Verde claro

            // Efeito sonoro de correto
            this.correct = this.sound.add('correctSound', { loop: false, volume: 10 });
            this.correct.play();

            // Atualizar pontuação e progresso
            score += 100; // Score fixo para acertos
            progress += 20;

            // Esperar um momento antes de seguir
            this.time.delayedCall(1500, () => {
                currentQuestion++;
                this.updateProgressBar();

                if (currentQuestion < strategyQuestions.length) {
                    // Próxima pergunta com transição
                    this.cameras.main.fadeOut(300, 0, 0, 0, () => {
                        this.cameras.main.fadeIn(300);
                        this.showQuestion();
                    });
                } else {
                    // Quiz completo
                    this.scene.start('CongratulationsSceneCurriculoVpEstrategia', { score: score }, {selectedSpriteSheet: this.selectedSpriteSheet,});
                }
            });
        } else {
            // Resposta incorreta
            clickedButton.fillColor = 0xFF8888; // Vermelho claro

            // Efeito sonoro de errado
            this.wrong = this.sound.add('wrongSound', { loop: false, volume: 10 });
            this.wrong.play();

            // Posição do texto de feedback do quiz
            const feedbackText = this.add.text(
                this.sys.game.config.width / 2,
                this.sys.game.config.height - 100, 
                question.feedback,
                {
                    fontSize: '23px', 
                    fill: '#FF888',
                    fontFamily: 'font',
                    wordWrap: { width: this.sys.game.config.width - 100 },
                    align: 'center'
                }
            ).setOrigin(0.5);

            // Esperar um momento antes de liberar uma nova tentativa
            this.time.delayedCall(3000, () => {
                feedbackText.destroy(); // Remove feedback
                this.showQuestion(); // Volta para a mesma pergunta
            });
        }
    }
}

// Classe para a cena de parabéns de Estratégia
class CongratulationsSceneCurriculoVpEstrategia extends Phaser.Scene {
    constructor() {
        super({ key: 'CongratulationsSceneCurriculoVpEstrategia' });
    }

    init(data) {
        this.finalScore = data.score || 0;
    }

    preload() {
        // Carregando recursos
        this.load.image('backgroundCongratulationsVpEstrategia', '../assets/parabens_cv_vpdeestrategia.png');
    }

    create() {
        // Transição de entrada com efeito
        this.cameras.main.fadeIn(1000, 0, 0, 0);

        // Imagem de fundo sem distorção
        const background = this.add.image(this.cameras.main.width / 2, this.cameras.main.height / 2, 'backgroundCongratulationsVpEstrategia');
        this.scaleBackgroundImage(background);

        // Botão de texto para voltar
        const returnButton = this.add.rectangle(
            width / 2,
            height - 210,
            250,
            60,
            0xB600B9
        ).setStrokeStyle(2, 0x880088)
            .setInteractive();

        // Efeitos do botão
        returnButton.on('pointerover', () => {
            returnButton.fillColor = 0xC30DC7;
            returnButton.setScale(1.05);
        });

        returnButton.on('pointerout', () => {
            returnButton.fillColor = 0xB600B9;
            returnButton.setScale(1);
        });

        // Evento de clique
        returnButton.on('pointerdown', () => {
            // Efeito de clique
            this.tweens.add({
                targets: returnButton,
                scale: 0.95,
                duration: 100,
                yoyo: true,
                onComplete: () => {
                    // Reiniciar variáveis
                    currentQuestion = 0;
                    progress = 0;
                    score = 0;

                    // Fade out e iniciar o quiz
                    this.cameras.main.fadeOut(500, 0, 0, 0, () => {
                        // Efeito sonoro de clique
                        this.clickSound = this.sound.add('clickSound', { loop: false, volume: 10 });
                        this.clickSound.play();

                        this.scene.stop('CongratulationsSceneCurriculoVpEstrategia');
                        this.scene.resume('officeScene', {selectedSpriteSheet: this.selectedSpriteSheet,});
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
                fill: '#000',
                fontFamily: 'font'
            }
        ).setOrigin(0.5);
    }
    // Completando o método
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
        this.questionTexts = []; // Armazena os textos das perguntas e alternativas 
        this.optionButtons = []; // Armazena alternativas 
    }

    preload() {
        // Carrega os recursos para o quiz
        this.load.font('font', 'fonts/PixelifySans-VariableFont_wght.ttf');
        this.load.image('QuizScreen', '../assets/TelaQuiz.png');
    }

    create() {
        // Transição suave
        this.cameras.main.fadeIn(1000);

        // Coloca imagem de fundo sem distorção
        const background = this.add.image(this.cameras.main.width / 2, this.cameras.main.height / 2, 'QuizScreen');
        this.scaleBackgroundImage(background);

        // Cria elementos da interface
        this.createProgressBar();
        this.createQuestionCounter();
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

    createQuestionCounter() {
        // Mostrar número da pergunta atual/total
        this.questionCounterText = this.add.text(
            this.sys.game.config.width - 150,
            50,
            `Question ${currentQuestion + 1}/${businessQuestions.length}`,
            { fontSize: '30px', fill: '#000', fontFamily: 'font' }
        ).setOrigin(0.5);
    }

    createProgressBar() {
        // Container para a barra de progresso
        const progressBarContainer = this.add.rectangle(100, 50, 300, 24, 0xDDDDDD)
            .setOrigin(0, 0.5)
            .setStrokeStyle(2, 0x000000);

        // Barra de progresso roxa
        this.progressBar = this.add.rectangle(102, 50, 0, 20, 0xB600B9)
            .setOrigin(0, 0.5);

        // Texto de progresso   
        this.progressText = this.add.text(
            420,
            50,
            `${progress}%`,
            { fontSize: '30px', fill: '#000', fontFamily: 'font', fontWeight: 'bold' }
        ).setOrigin(0, 0.5);
    }

    updateProgressBar() {
        // Atualizando a barra de progresso do quiz
        const maxWidth = 296;
        const newWidth = (progress / 100) * maxWidth;

        // Animar a barra de progresso
        this.tweens.add({
            targets: this.progressBar,
            width: newWidth,
            duration: 500,
            ease: 'Power2'
        });

        this.progressText.setText(`${progress}%`);
    }

    clearElements() {
        // Remove os textos das perguntas e alternativas 
        this.questionTexts.forEach(text => text.destroy());
        this.questionTexts = [];

        // Remove alternativas 
        this.optionButtons.forEach(button => button.destroy());
        this.optionButtons = [];
    }

    showQuestion() {
        // Limpa os elementos antigos
        this.clearElements();

        // Atualiza o contador de perguntas
        this.questionCounterText.setText(`Question ${currentQuestion + 1}/${businessQuestions.length}`);

        const question = businessQuestions[currentQuestion];

        // Posição do texto de perguntas
        const questionText = this.add.text(
            this.sys.game.config.width / 2,
            150,
            question.question,
            {
                fontSize: '32px',
                fill: '#B600B9',
                fontFamily: 'font',
                fontWeight: 'bold',
                wordWrap: { width: this.sys.game.config.width - 150 },
                align: 'center'
            }
        ).setOrigin(0.5);

        this.questionTexts.push(questionText);

        // Posição dos textos (quiz)
        const startY = 250;
        const spacing = 50;

        question.options.forEach((option, index) => {
            // Altura aumentada
            const containerHeight = 70;
            const padding = 20;

            // Container da alternativa (retângulo) with increased height
            const buttonContainer = this.add.rectangle(
                this.sys.game.config.width / 2,
                startY + (index * (containerHeight + 10)), // Espaçamento ajustado
                this.sys.game.config.width - 200,
                containerHeight,
                0xEAE8E8
            ).setStrokeStyle(2, 0x444444)
                .setInteractive();

            // Efeitos de hover
            buttonContainer.on('pointerover', () => {
                buttonContainer.fillColor = 0xDDDDDD;
                buttonContainer.setScale(1.02);
            });

            buttonContainer.on('pointerout', () => {
                buttonContainer.fillColor = 0xEAE8E8;
                buttonContainer.setScale(1);
            });

            // Evento de clique
            buttonContainer.on('pointerdown', () => {
                this.checkAnswer(index, buttonContainer);
            });

            // Padding do texto
            const optionText = this.add.text(
                this.sys.game.config.width / 2,
                startY + (index * (containerHeight + 10)), // Alinhamento com container
                `${index + 1}. ${option}`,
                {
                    fontSize: '28px',
                    fill: '#000',
                    fontFamily: 'font',
                    wordWrap: { width: this.sys.game.config.width - 220 - (padding * 2) },
                    padding: { x: padding, y: padding }
                }
            ).setOrigin(0.5);

            this.questionTexts.push(optionText);
            this.optionButtons.push(buttonContainer);
        });
    }

    checkAnswer(answer, clickedButton) {
        // Desativar interação com todos os botões
        this.optionButtons.forEach(button => {
            button.disableInteractive();
        });

        const question = businessQuestions[currentQuestion];

        if (answer === question.correct) {
            // Resposta correta
            clickedButton.fillColor = 0x88FF88; // Verde claro

            // Efeito sonoro de correto
            this.correct = this.sound.add('correctSound', { loop: false, volume: 10 });
            this.correct.play();

            // Atualizar pontuação e progresso
            score += 100; // Score fixo para cada pergunta acertada
            progress += 20;

            // Esperar um momento antes de prosseguir
            this.time.delayedCall(1500, () => {
                currentQuestion++;
                this.updateProgressBar();

                if (currentQuestion < businessQuestions.length) {
                    // Próxima pergunta com transição
                    this.cameras.main.fadeOut(300, 0, 0, 0, () => {
                        this.cameras.main.fadeIn(300);
                        this.showQuestion();
                    });
                } else {
                    // Quiz completo
                    this.scene.start('CongratulationsSceneCurriculoVpNegocios', { score: score }, {selectedSpriteSheet: this.selectedSpriteSheet,});
                }
            });
        } else {
            // Resposta errada
            clickedButton.fillColor = 0xFF8888; // Light red

            //Efeito sonoro de errado
            this.wrong = this.sound.add('wrongSound', { loop: false, volume: 10 });
            this.wrong.play();

            // Mostrar feedback explanatório
            const feedbackText = this.add.text(
                this.sys.game.config.width / 2,
                this.sys.game.config.height - 100, // Changed from "height/2 + 50" to "height - 100"
                question.feedback, // Adiciona a propriedade feedback para o objeto question
                {
                    fontSize: '23px', // Changed from '20px' to '23px'
                    fill: '#FF888',
                    fontFamily: 'font',
                    wordWrap: { width: this.sys.game.config.width - 100 },
                    align: 'center'
                }
            ).setOrigin(0.5);

            // Espera um momento antes de liberar uma nova tentativa
            this.time.delayedCall(3000, () => {
                feedbackText.destroy(); // Remove feedback
                this.showQuestion(); // Volta para a mesma pergunta
            });
        }
    }
}

// Class for the congratulations scene for Business
class CongratulationsSceneCurriculoVpNegocios extends Phaser.Scene {
    constructor() {
        super({ key: 'CongratulationsSceneCurriculoVpNegocios' });
    }

    init(data) {
        this.finalScore = data.score || 0;
    }

    preload() {
        // Carregando recursos
        this.load.image('backgroundCongratulationsVpNegocios', '../assets/parabens_cv_vpdenegocios.png');
    }

    create() {
        // Transição suave
        this.cameras.main.fadeIn(1000, 0, 0, 0);

        // Imagem de fundo sem distorção
        const background = this.add.image(this.cameras.main.width / 2, this.cameras.main.height / 2, 'backgroundCongratulationsVpNegocios');
        this.scaleBackgroundImage(background);

        // Texto do botão de volta
        const returnButton = this.add.rectangle(
            this.sys.game.config.width / 2,
            510,
            250,
            60,
            0xB600B9
        ).setStrokeStyle(2, 0x880088)
            .setInteractive();

        // Efeitos do botão
        returnButton.on('pointerover', () => {
            returnButton.fillColor = 0xC30DC7;
            returnButton.setScale(1.05);
        });

        returnButton.on('pointerout', () => {
            returnButton.fillColor = 0xB600B9;
            returnButton.setScale(1);
        });

        // Evento de clique
        returnButton.on('pointerdown', () => {
            // Efeito de clique
            this.tweens.add({
                targets: returnButton,
                scale: 0.95,
                duration: 100,
                yoyo: true,
                onComplete: () => {
                    // Reiniciando variáveis
                    currentQuestion = 0;
                    progress = 0;
                    score = 0;

                    // Fade out e começar o quiz
                    this.cameras.main.fadeOut(500, 0, 0, 0, () => {
                        // Som do efeito de clique
                        this.clickSound = this.sound.add('clickSound', { loop: false, volume: 10 });
                        this.clickSound.play();

                        this.scene.stop('CongratulationsSceneCurriculoVpNegocios');
                        this.scene.resume('officeScene', {selectedSpriteSheet: this.selectedSpriteSheet,});
                    });
                }
            });
        });

        // Texto do botão
        this.add.text(
            this.sys.game.config.width / 2,
            510,
            'Voltar ao escritório',
            {
                fontSize: '22px',
                fill: '#000',
                fontFamily: 'font'
            }
        ).setOrigin(0.5);
    }
    // Completando o método
    scaleBackgroundImage(image) {
        // Centralizando a imagem
        image.setOrigin(0.5);

        // Manter proporção e cobrir a tela
        const scaleX = this.cameras.main.width / image.width;
        const scaleY = this.cameras.main.height / image.height;
        const scale = Math.max(scaleX, scaleY);

        image.setScale(scale);
    }

}

// Class for the Quiz scene for Relations
class QuizVpRelacoes extends Phaser.Scene {
    constructor() {
        super({ key: 'QuizVpRelacoes' });
        this.questionTexts = []; // Guarda perguntas e alternativas
        this.optionButtons = []; // Guarda alternativas 
    }

    preload() {
        // Carrega recursos para o quiz
        this.load.font('font', 'fonts/PixelifySans-VariableFont_wght.ttf');
        this.load.image('QuizScreen', '../assets/TelaQuiz.png');
    }

    create() {
        // Transição suave 
        this.cameras.main.fadeIn(1000);

        // Colocar imagem de fundo sem distorção
        const background = this.add.image(this.cameras.main.width / 2, this.cameras.main.height / 2, 'QuizScreen');
        this.scaleBackgroundImage(background);

        // Criar elementos da interface
        this.createProgressBar();
        this.createQuestionCounter();
        this.showQuestion();
    }

    scaleBackgroundImage(image) {
        // Centralizando a imagem
        image.setOrigin(0.5);

        // Manter proporção e cobrir a tela
        const scaleX = this.cameras.main.width / image.width;
        const scaleY = this.cameras.main.height / image.height;
        const scale = Math.max(scaleX, scaleY);

        image.setScale(scale);
    }

    createQuestionCounter() {
        // Mostrar atual/ total número de perguntas
        this.questionCounterText = this.add.text(
            this.sys.game.config.width - 150,
            50,
            `Question ${currentQuestion + 1}/${relationsQuestions.length}`,
            { fontSize: '30px', fill: '#000', fontFamily: 'font' }
        ).setOrigin(0.5);
    }

    createProgressBar() {
        // Container for the progress bar
        const progressBarContainer = this.add.rectangle(100, 50, 300, 24, 0xDDDDDD)
            .setOrigin(0, 0.5)
            .setStrokeStyle(2, 0x000000);

        // Barra de progresso roxa   
        this.progressBar = this.add.rectangle(102, 50, 0, 20, 0xB600B9)
            .setOrigin(0, 0.5);

        // Texto de progresso   
        this.progressText = this.add.text(
            420,
            50,
            `${progress}%`,
            { fontSize: '30px', fill: '#000', fontFamily: 'font', fontWeight: 'bold' }
        ).setOrigin(0, 0.5);
    }

    updateProgressBar() {
        // Atualizando a barra de progresso
        const maxWidth = 296;
        const newWidth = (progress / 100) * maxWidth;

        // Animando a barra de progresso
        this.tweens.add({
            targets: this.progressBar,
            width: newWidth,
            duration: 500,
            ease: 'Power2'
        });

        this.progressText.setText(`${progress}%`);
    }

    clearElements() {
        // Remover perguntas e alternativas
        this.questionTexts.forEach(text => text.destroy());
        this.questionTexts = [];

        // Remover alternativas
        this.optionButtons.forEach(button => button.destroy());
        this.optionButtons = [];
    }

    showQuestion() {
        // Limpar elementos antigos
        this.clearElements();

        // Atualiza o contador de questões
        this.questionCounterText.setText(`Question ${currentQuestion + 1}/${relationsQuestions.length}`);

        const question = relationsQuestions[currentQuestion];

        // Posição do texto de perguntas
        const questionText = this.add.text(
            this.sys.game.config.width / 2,
            150,
            question.question,
            {
                fontSize: '32px',
                fill: '#B600B9',
                fontFamily: 'font',
                fontWeight: 'bold',
                wordWrap: { width: this.sys.game.config.width - 150 },
                align: 'center'
            }
        ).setOrigin(0.5);

        this.questionTexts.push(questionText);

        // Posição dos textos (quiz)
        const startY = 250;
        const spacing = 50;

        question.options.forEach((option, index) => {
            // Altura aumentada
            const containerHeight = 70;
            const padding = 20;

            // Container da alternativa (retângulo) with increased height
            const buttonContainer = this.add.rectangle(
                this.sys.game.config.width / 2,
                startY + (index * (containerHeight + 10)), // Espaçamento ajustado
                this.sys.game.config.width - 200,
                containerHeight,
                0xEAE8E8
            ).setStrokeStyle(2, 0x444444)
                .setInteractive();

            // Efeito de hover 
            buttonContainer.on('pointerover', () => {
                buttonContainer.fillColor = 0xDDDDDD;
                buttonContainer.setScale(1.02);
            });

            buttonContainer.on('pointerout', () => {
                buttonContainer.fillColor = 0xEAE8E8;
                buttonContainer.setScale(1);
            });

            // Evento de clique
            buttonContainer.on('pointerdown', () => {
                this.checkAnswer(index, buttonContainer);
            });

            // Padding do texto
            const optionText = this.add.text(
                this.sys.game.config.width / 2,
                startY + (index * (containerHeight + 10)), // Alinhamento com container
                `${index + 1}. ${option}`,
                {
                    fontSize: '28px',
                    fill: '#000',
                    fontFamily: 'font',
                    wordWrap: { width: this.sys.game.config.width - 220 - (padding * 2) },
                    padding: { x: padding, y: padding }
                }
            ).setOrigin(0.5);

            this.questionTexts.push(optionText);
            this.optionButtons.push(buttonContainer);
        });
    }

    checkAnswer(answer, clickedButton) {
        // Desativar interação com todos os botões
        this.optionButtons.forEach(button => {
            button.disableInteractive();
        });

        const question = relationsQuestions[currentQuestion];

        if (answer === question.correct) {
            // Resposta correta
            clickedButton.fillColor = 0x88FF88; // Verde claro

            // Efeito sonoro de correto
            this.correct = this.sound.add('correctSound', { loop: false, volume: 10 });
            this.correct.play();

            // Atualizar pontuação e progresso
            score += 100; // Score fixo para cada pergunta acertada
            progress += 20;

            // Esperar um momento antes de prosseguir
            this.time.delayedCall(1500, () => {
                currentQuestion++;
                this.updateProgressBar();

                if (currentQuestion < relationsQuestions.length) {
                    // Próxima pergunta com transição
                    this.cameras.main.fadeOut(300, 0, 0, 0, () => {
                        this.cameras.main.fadeIn(300);
                        this.showQuestion();
                    });
                } else {
                    // Quiz completo
                    this.scene.start('CongratulationsSceneCurriculoVpRelacoes', { score: score }, {selectedSpriteSheet: this.selectedSpriteSheet,});
                }
            });
        } else {
            // Resposta errada
            clickedButton.fillColor = 0xFF8888; // Light red

            //Efeito sonoro de errado
            this.wrong = this.sound.add('wrongSound', { loop: false, volume: 10 });
            this.wrong.play();

            // Mostrar feedback explanatório
            const feedbackText = this.add.text(
                this.sys.game.config.width / 2,
                this.sys.game.config.height - 100, // Changed from "height/2 + 50" to "height - 100"
                question.feedback, // Adiciona a propriedade feedback para o objeto question
                {
                    fontSize: '23px', // Changed from '20px' to '23px'
                    fill: '#FF888',
                    fontFamily: 'font',
                    wordWrap: { width: this.sys.game.config.width - 100 },
                    align: 'center'
                }
            ).setOrigin(0.5);

            // Espera um momento antes de liberar uma nova tentativa
            this.time.delayedCall(3000, () => {
                feedbackText.destroy(); // Remove feedback
                this.showQuestion(); // Volta para a mesma pergunta
            });
        }
    }
}


// Cena de Parabéns da Vp de Relações
class CongratulationsSceneCurriculoVpRelacoes extends Phaser.Scene {
    constructor() {
        super({ key: 'CongratulationsSceneCurriculoVpRelacoes' });
    }

    init(data) {
        this.finalScore = data.score || 0;
    }

    preload() {
        // Carregando recursos
        this.load.image('backgroundCongratulationsVpRelacoes', '../assets/parabens_cv_vpderelacoes.png');
    }

    create() {
        // Transição suave
        this.cameras.main.fadeIn(1000, 0, 0, 0);

        // Imagem de fundo sem distorção
        const background = this.add.image(this.cameras.main.width / 2, this.cameras.main.height / 2, 'backgroundCongratulationsVpRelacoes');
        this.scaleBackgroundImage(background);

        // Texto do botão de volta
        const returnButton = this.add.rectangle(
            width / 2,
            height - 210,
            250,
            60,
            0xB600B9
        ).setStrokeStyle(2, 0x880088)
            .setInteractive();

        // Efeitos do botão
        returnButton.on('pointerover', () => {
            returnButton.fillColor = 0xC30DC7;
            returnButton.setScale(1.05);
        });

        returnButton.on('pointerout', () => {
            returnButton.fillColor = 0xB600B9;
            returnButton.setScale(1);
        });

        // Evento de clique
        returnButton.on('pointerdown', () => {
            // Efeito de clique
            this.tweens.add({
                targets: returnButton,
                scale: 0.95,
                duration: 100,
                yoyo: true,
                onComplete: () => {
                    // Reiniciando variáveis
                    currentQuestion = 0;
                    progress = 0;
                    score = 0;

                    // Fade out e começar o quiz
                    this.cameras.main.fadeOut(500, 0, 0, 0, () => {
                        // Som do efeito de clique
                        this.clickSound = this.sound.add('clickSound', { loop: false, volume: 10 });
                        this.clickSound.play();

                        this.scene.stop('CongratulationsSceneCurriculoVpRelacoes');
                        this.scene.resume('officeScene', {selectedSpriteSheet: this.selectedSpriteSheet,});
                    });
                }
            });
        });

        // Texto do botão
        this.add.text(
            width / 2,
            height - 210,
            'Voltar ao escritório',
            {
                fontSize: '22px',
                fill: '#000',
                fontFamily: 'font'
            }
        ).setOrigin(0.5);
    }
    // Completando o método
    scaleBackgroundImage(image) {
        // Centralizando a imagem
        image.setOrigin(0.5);

        // Manter proporção e cobrir a tela
        const scaleX = this.cameras.main.width / image.width;
        const scaleY = this.cameras.main.height / image.height;
        const scale = Math.max(scaleX, scaleY);

        image.setScale(scale);
    }

}

// Cena do Quiz da VP de Tecnologia
class QuizVpTecnologia extends Phaser.Scene {
    constructor() {
        super({ key: 'QuizVpTecnologia' });
        this.questionTexts = []; // Guarda perguntas e alternativas
        this.optionButtons = []; // Guarda alternativas 
    }

    preload() {
        // Carrega recursos para o quiz
        this.load.font('font', 'fonts/PixelifySans-VariableFont_wght.ttf');
        this.load.image('QuizScreen', '../assets/TelaQuiz.png');
    }

    create() {
        // Transição suave 
        this.cameras.main.fadeIn(1000);

        // Colocar imagem de fundo sem distorção
        const background = this.add.image(this.cameras.main.width / 2, this.cameras.main.height / 2, 'QuizScreen');
        this.scaleBackgroundImage(background);

        // Criar elementos da interface
        this.createProgressBar();
        this.createQuestionCounter();
        this.showQuestion();
    }

    scaleBackgroundImage(image) {
        // Centralizando a imagem
        image.setOrigin(0.5);

        // Manter proporção e cobrir a tela
        const scaleX = this.cameras.main.width / image.width;
        const scaleY = this.cameras.main.height / image.height;
        const scale = Math.max(scaleX, scaleY);

        image.setScale(scale);
    }

    createQuestionCounter() {
        // Mostrar atual/ total número de perguntas
        this.questionCounterText = this.add.text(
            this.sys.game.config.width - 150,
            50,
            `Question ${currentQuestion + 1}/${technologyQuestions.length}`,
            { fontSize: '30px', fill: '#000', fontFamily: 'font' }
        ).setOrigin(0.5);
    }

    createProgressBar() {
        // Container for the progress bar
        const progressBarContainer = this.add.rectangle(100, 50, 300, 24, 0xDDDDDD)
            .setOrigin(0, 0.5)
            .setStrokeStyle(2, 0x000000);

        // Barra de progresso roxa   
        this.progressBar = this.add.rectangle(102, 50, 0, 20, 0xB600B9)
            .setOrigin(0, 0.5);

        // Texto de progresso   
        this.progressText = this.add.text(
            420,
            50,
            `${progress}%`,
            { fontSize: '30px', fill: '#000', fontFamily: 'font', fontWeight: 'bold' }
        ).setOrigin(0, 0.5);
    }

    updateProgressBar() {
        // Atualizando a barra de progresso
        const maxWidth = 296;
        const newWidth = (progress / 100) * maxWidth;

        // Animando a barra de progresso
        this.tweens.add({
            targets: this.progressBar,
            width: newWidth,
            duration: 500,
            ease: 'Power2'
        });

        this.progressText.setText(`${progress}%`);
    }

    clearElements() {
        // Remover perguntas e alternativas
        this.questionTexts.forEach(text => text.destroy());
        this.questionTexts = [];

        // Remover alternativas
        this.optionButtons.forEach(button => button.destroy());
        this.optionButtons = [];
    }

    showQuestion() {
        // Limpar elementos antigos
        this.clearElements();

        // Atualiza o contador de questões
        this.questionCounterText.setText(`Question ${currentQuestion + 1}/${technologyQuestions.length}`);

        const question = technologyQuestions[currentQuestion];

        // Posição do texto de perguntas
        const questionText = this.add.text(
            this.sys.game.config.width / 2,
            150,
            question.question,
            {
                fontSize: '32px',
                fill: '#B600B9',
                fontFamily: 'font',
                fontWeight: 'bold',
                wordWrap: { width: this.sys.game.config.width - 150 },
                align: 'center'
            }
        ).setOrigin(0.5);

        this.questionTexts.push(questionText);

        // Posição dos textos (quiz)
        const startY = 250;
        const spacing = 50;

        question.options.forEach((option, index) => {
            // Altura aumentada
            const containerHeight = 70;
            const padding = 20;

            // Container da alternativa (retângulo) with increased height
            const buttonContainer = this.add.rectangle(
                this.sys.game.config.width / 2,
                startY + (index * (containerHeight + 10)), // Espaçamento ajustado
                this.sys.game.config.width - 200,
                containerHeight,
                0xEAE8E8
            ).setStrokeStyle(2, 0x444444)
                .setInteractive();

            // Efeito de hover 
            buttonContainer.on('pointerover', () => {
                buttonContainer.fillColor = 0xDDDDDD;
                buttonContainer.setScale(1.02);
            });

            buttonContainer.on('pointerout', () => {
                buttonContainer.fillColor = 0xEAE8E8;
                buttonContainer.setScale(1);
            });

            // Evento de clique
            buttonContainer.on('pointerdown', () => {
                this.checkAnswer(index, buttonContainer);
            });

            // Padding do texto
            const optionText = this.add.text(
                this.sys.game.config.width / 2,
                startY + (index * (containerHeight + 10)), // Alinhamento com container
                `${index + 1}. ${option}`,
                {
                    fontSize: '28px',
                    fill: '#000',
                    fontFamily: 'font',
                    wordWrap: { width: this.sys.game.config.width - 220 - (padding * 2) },
                    padding: { x: padding, y: padding }
                }
            ).setOrigin(0.5);

            this.questionTexts.push(optionText);
            this.optionButtons.push(buttonContainer);
        });
    }

    checkAnswer(answer, clickedButton) {
        // Desativar interação com todos os botões
        this.optionButtons.forEach(button => {
            button.disableInteractive();
        });

        const question = technologyQuestions[currentQuestion];

        if (answer === question.correct) {
            // Resposta correta
            clickedButton.fillColor = 0x88FF88; // Verde claro

            // Efeito sonoro de correto
            this.correct = this.sound.add('correctSound', { loop: false, volume: 10 });
            this.correct.play();

            // Atualizar pontuação e progresso
            score += 100; // Score fixo para cada pergunta acertada
            progress += 20;

            // Esperar um momento antes de prosseguir
            this.time.delayedCall(1500, () => {
                currentQuestion++;
                this.updateProgressBar();

                if (currentQuestion < technologyQuestions.length) {
                    // Próxima pergunta com transição
                    this.cameras.main.fadeOut(300, 0, 0, 0, () => {
                        this.cameras.main.fadeIn(300);
                        this.showQuestion();
                    });
                } else {
                    // Quiz completo
                    this.scene.start('CongratulationsSceneCurriculoVpTecnologia', { score: score }, {selectedSpriteSheet: this.selectedSpriteSheet,});
                }
            });
        } else {
            // Resposta errada
            clickedButton.fillColor = 0xFF8888; // Light red

            //Efeito sonoro de errado
            this.wrong = this.sound.add('wrongSound', { loop: false, volume: 10 });
            this.wrong.play();

            // Mostrar feedback explanatório
            const feedbackText = this.add.text(
                this.sys.game.config.width / 2,
                this.sys.game.config.height - 100, // Changed from "height/2 + 50" to "height - 100"
                question.feedback, // Adiciona a propriedade feedback para o objeto question
                {
                    fontSize: '23px', 
                    fill: '#FF888',
                    fontFamily: 'font',
                    wordWrap: { width: this.sys.game.config.width - 100 },
                    align: 'center'
                }
            ).setOrigin(0.5);

            // Espera um momento antes de liberar uma nova tentativa
            this.time.delayedCall(3000, () => {
                feedbackText.destroy(); // Remove feedback
                this.showQuestion(); // Volta para a mesma pergunta
            });
        }
    }
}


// Cena de Parabéns da VP de tecnologia
class CongratulationsSceneCurriculoVpTecnologia extends Phaser.Scene {
    constructor() {
        super({ key: 'CongratulationsSceneCurriculoVpTecnologia' });
    }

    init(data) {
        this.finalScore = data.score || 0;
    }

    preload() {
        // Carregando recursos
        this.load.image('backgroundCongratulationsVpTecnologia', '../assets/parabens_cv_vpdetecnologia.png');
        this.load.audio("exclamationBubble", "../assets/sounds/somexclamacao.wav");

    }

    create() {
        // Transição suave
        this.cameras.main.fadeIn(1000, 0, 0, 0);

        this.exclamationBubble = this.sound.add("exclamationBubble");

        // Imagem de fundo sem distorção
        const background = this.add.image(this.cameras.main.width / 2, this.cameras.main.height / 2, 'backgroundCongratulationsVpTecnologia');
        this.scaleBackgroundImage(background);

        // Texto do botão de volta
        const returnButton = this.add.rectangle(
            width / 2,
            height - 210,
            250,
            60,
            0xB600B9
        ).setStrokeStyle(2, 0x880088)
            .setInteractive();

        // Efeitos do botão
        returnButton.on('pointerover', () => {
            returnButton.fillColor = 0xC30DC7;
            returnButton.setScale(1.05);
        });

        returnButton.on('pointerout', () => {
            returnButton.fillColor = 0xB600B9;
            returnButton.setScale(1);
        });

        // Evento de clique
        returnButton.on('pointerdown', () => {
            // Efeito de clique
            this.tweens.add({
                targets: returnButton,
                scale: 0.95,
                duration: 100,
                yoyo: true,
                onComplete: () => {
                    // Reiniciando variáveis
                    currentQuestion = 0;
                    progress = 0;
                    score = 0;

                    // Fade out e começar o quiz
                    this.cameras.main.fadeOut(500, 0, 0, 0, () => {
                        // Som do efeito de clique
                        this.clickSound = this.sound.add('clickSound', { loop: false, volume: 10 });
                        this.clickSound.play();

                        this.scene.stop('CongratulationsSceneCurriculoVpTecnologia');
                        this.scene.resume('officeScene', {selectedSpriteSheet: this.selectedSpriteSheet,});
                        this.exclamationBubble.play();

                    });
                }
            });
        });

        // Texto do botão
        this.add.text(
            width / 2,
            height - 210,
            'Voltar ao escritório',
            {
                fontSize: '22px',
                fill: '#000',
                fontFamily: 'font'
            }
        ).setOrigin(0.5);
    }
    // Completando o método
    scaleBackgroundImage(image) {
        // Centralizando a imagem
        image.setOrigin(0.5);

        // Manter proporção e cobrir a tela
        const scaleX = this.cameras.main.width / image.width;
        const scaleY = this.cameras.main.height / image.height;
        const scale = Math.max(scaleX, scaleY);

        image.setScale(scale);
    }

}